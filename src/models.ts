import type { ModelCatalog, ModelDescriptor } from "./model-catalogs";

interface OpenAIModel {
  id: string;
  object: "model";
  created: number;
  owned_by: string;
}

const CACHE_SECONDS = 300;
const UPSTREAM_TIMEOUT_MS = 10_000;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function uniqueModels(models: ModelDescriptor[]): ModelDescriptor[] {
  const unique = new Map<string, ModelDescriptor>();
  for (const model of models) {
    if (!unique.has(model.id)) unique.set(model.id, model);
  }
  return [...unique.values()];
}

function parseOpenRouter(value: unknown): ModelDescriptor[] {
  if (!isRecord(value) || !Array.isArray(value.data)) {
    throw new Error("OpenRouter returned an invalid model list.");
  }

  return value.data.map((model) => {
    if (!isRecord(model) || typeof model.id !== "string" || !model.id) {
      throw new Error("OpenRouter returned a model without a valid ID.");
    }
    return {
      id: model.id,
      ...(typeof model.created === "number" ? { created: model.created } : {}),
    };
  });
}

function parseModelsDev(value: unknown, providerKey: string): ModelDescriptor[] {
  if (!isRecord(value) || !isRecord(value[providerKey])) {
    throw new Error(`models.dev has no ${providerKey} catalog.`);
  }
  const models = value[providerKey].models;
  if (!isRecord(models)) {
    throw new Error(`models.dev returned an invalid ${providerKey} model list.`);
  }

  return Object.values(models).flatMap((model) => {
    if (!isRecord(model) || typeof model.id !== "string" || !model.id) {
      throw new Error(`models.dev returned a ${providerKey} model without a valid ID.`);
    }
    return model.status === "deprecated" ? [] : [{ id: model.id }];
  });
}

function parseNvidiaFeatured(value: unknown): ModelDescriptor[] {
  if (!isRecord(value) || !Array.isArray(value["featured-models"])) {
    throw new Error("NVIDIA returned an invalid featured model list.");
  }

  return value["featured-models"].map((model) => {
    if (!isRecord(model) || typeof model.model !== "string" || !model.model) {
      throw new Error("NVIDIA returned a featured model without a valid ID.");
    }
    return { id: model.model };
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
    case "nvidia-featured":
      return uniqueModels(parseNvidiaFeatured(body));
  }
}

function modelListResponse(models: ModelDescriptor[], providerSlug: string): Response {
  const data: OpenAIModel[] = models.map(({ id, created }) => ({
    id,
    object: "model",
    created: created ?? 0,
    owned_by: providerSlug,
  }));
  return Response.json(
    { object: "list", data },
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
