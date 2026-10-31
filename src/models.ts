import type { ModelCatalog, ModelDescriptor } from "./model-catalogs";

const CACHE_SECONDS = 300;
const UPSTREAM_TIMEOUT_MS = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredRecord(value: unknown, label: string): Record<string, unknown> {
  if (!isRecord(value)) throw new Error(`${label} must be an object.`);
  return value;
}

function requiredString(value: unknown, label: string): string {
  if (typeof value !== "string" || !value) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value;
}

function requiredNumber(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    throw new Error(`${label} must be a non-negative finite number.`);
  }
  return value;
}

function requiredStringArray(value: unknown, label: string): string[] {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array.`);
  return value.map((entry, index) => requiredString(entry, `${label}[${index}]`));
}

function nullableNumber(value: unknown, label: string): number | null {
  return value === null || value === undefined ? null : requiredNumber(value, label);
}

function uniqueModels(models: ModelDescriptor[]): ModelDescriptor[] {
  const unique = new Map<string, ModelDescriptor>();
  for (const model of models) {
    if (!unique.has(model.id)) unique.set(model.id, model);
  }
  return [...unique.values()];
}

function parseOpenRouter(value: unknown): ModelDescriptor[] {
  const root = requiredRecord(value, "OpenRouter response");
  if (!Array.isArray(root.data)) throw new Error("OpenRouter data must be an array.");

  return root.data.map((entry, index) => {
    const model = requiredRecord(entry, `OpenRouter model ${index}`);
    const architecture = requiredRecord(model.architecture, `${model.id} architecture`);
    const topProvider = requiredRecord(model.top_provider, `${model.id} top_provider`);
    const reasoning = isRecord(model.reasoning) ? model.reasoning : {};

    return {
      id: requiredString(model.id, "OpenRouter model ID"),
      name: requiredString(model.name, `${model.id} name`),
      architecture: {
        input_modalities: requiredStringArray(
          architecture.input_modalities,
          `${model.id} input modalities`,
        ),
        output_modalities: requiredStringArray(
          architecture.output_modalities,
          `${model.id} output modalities`,
        ),
      },
      context_length: requiredNumber(model.context_length, `${model.id} context length`),
      top_provider: {
        max_completion_tokens: nullableNumber(
          topProvider.max_completion_tokens,
          `${model.id} maximum output tokens`,
        ),
      },
      reasoning: {
        mandatory: reasoning.mandatory === true,
        default_enabled: reasoning.default_enabled === true,
        supported_efforts: requiredStringArray(
          reasoning.supported_efforts ?? [],
          `${model.id} reasoning efforts`,
        ),
        default_effort:
          reasoning.default_effort === null || reasoning.default_effort === undefined
            ? null
            : requiredString(reasoning.default_effort, `${model.id} default effort`),
      },
      reasoning_options: [],
      ...(typeof model.created === "number" && Number.isFinite(model.created)
        ? { created: model.created }
        : {}),
    };
  });
}

function parseModelsDev(value: unknown, providerKey: string): ModelDescriptor[] {
  const root = requiredRecord(value, "models.dev response");
  const provider = requiredRecord(root[providerKey], `models.dev ${providerKey}`);
  const models = requiredRecord(provider.models, `models.dev ${providerKey} models`);

  return Object.values(models).flatMap((entry) => {
    const model = requiredRecord(entry, `models.dev ${providerKey} model`);
    const id = requiredString(model.id, `models.dev ${providerKey} model ID`);
    if (model.status === "deprecated") return [];

    const modalities = requiredRecord(model.modalities, `${id} modalities`);
    const limit = requiredRecord(model.limit, `${id} limits`);
    const reasoningOptions = model.reasoning_options ?? [];
    if (!Array.isArray(reasoningOptions)) {
      throw new Error(`${id} reasoning_options must be an array.`);
    }
    const effortOption = reasoningOptions.find(
      (option) => isRecord(option) && option.type === "effort",
    );
    const efforts = isRecord(effortOption)
      ? requiredStringArray(effortOption.values ?? [], `${id} reasoning efforts`)
      : [];
    const toggleOption = reasoningOptions.find(
      (option) => isRecord(option) && option.type === "toggle",
    );
    return [
      {
        id,
        name: requiredString(model.name, `${id} name`),
        architecture: {
          input_modalities: requiredStringArray(modalities.input, `${id} input modalities`),
          output_modalities: requiredStringArray(
            modalities.output,
            `${id} output modalities`,
          ),
        },
        context_length: requiredNumber(limit.context, `${id} context length`),
        top_provider: {
          max_completion_tokens:
            limit.output === undefined ? null : requiredNumber(limit.output, `${id} output limit`),
        },
        reasoning: {
          mandatory:
            model.reasoning === true &&
            toggleOption === undefined &&
            !efforts.includes("none"),
          default_enabled: model.reasoning === true,
          supported_efforts: efforts,
          default_effort: null,
        },
        reasoning_options: reasoningOptions,
      },
    ];
  });
}

export type ModelSourceFetch = (url: string, init: RequestInit) => Promise<Response>;

async function fetchModels(
  catalog: ModelCatalog,
  sourceFetch: ModelSourceFetch,
): Promise<ModelDescriptor[]> {
  if (catalog.type === "static") return catalog.models;

  const response = await sourceFetch(catalog.url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`Model source returned HTTP ${response.status}.`);
  const body: unknown = await response.json();

  switch (catalog.source) {
    case "openrouter":
      return uniqueModels(parseOpenRouter(body));
    case "models-dev":
      if (!catalog.providerKey) throw new Error("Missing models.dev provider key.");
      return uniqueModels(parseModelsDev(body, catalog.providerKey));
  }
}

function modelListResponse(models: ModelDescriptor[], providerSlug: string): Response {
  return Response.json(
    {
      object: "list",
      data: models.map((model) => ({
        ...model,
        object: "model",
        created: model.created ?? 0,
        owned_by: providerSlug,
      })),
    },
    { headers: { "Cache-Control": `public, max-age=${CACHE_SECONDS}` } },
  );
}

export async function getModelsResponse(
  request: Request,
  catalog: ModelCatalog,
  providerSlug: string,
  sourceFetch: ModelSourceFetch = fetch,
  cache: Cache = caches.default,
): Promise<Response> {
  if (catalog.type === "static") return modelListResponse(catalog.models, providerSlug);

  const url = new URL(request.url);
  url.search = "";
  const cacheKey = new Request(url.toString(), { method: "GET" });

  try {
    const cached = await cache.match(cacheKey);
    if (cached) return cached;
  } catch (error) {
    console.error(`Unable to read the ${providerSlug} model cache:`, error);
  }

  let response: Response;
  try {
    response = modelListResponse(
      await fetchModels(catalog, sourceFetch),
      providerSlug,
    );
  } catch (error) {
    console.error(`Unable to load ${providerSlug} models:`, error);
    return Response.json(
      {
        error: {
          message: "The model source is temporarily unavailable.",
          type: "upstream_error",
        },
      },
      { status: 502, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    await cache.put(cacheKey, response.clone());
  } catch (error) {
    console.error(`Unable to cache ${providerSlug} models:`, error);
  }
  return response;
}
