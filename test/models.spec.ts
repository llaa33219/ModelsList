import { SELF } from "cloudflare:test";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { modelCatalogs } from "../src/model-catalogs";
import { getModelsResponse, type ModelSourceFetch } from "../src/models";
import { providers } from "../src/providers";

const request = new Request("https://example.com/openrouter/models");
const cache = { match: vi.fn(), put: vi.fn() };

beforeEach(() => {
  cache.match.mockReset().mockResolvedValue(undefined);
  cache.put.mockReset().mockResolvedValue(undefined);
});

describe("model catalogs", () => {
  it("has a unique slug and catalog for every provider", () => {
    expect(new Set(providers.map(({ slug }) => slug)).size).toBe(providers.length);
    expect(Object.keys(modelCatalogs).sort()).toEqual(
      providers.map(({ slug }) => slug).sort(),
    );
    expect(providers.find(({ slug }) => slug === "opencode-zen")?.name).toBe(
      "OpenCode Zen",
    );
  });

  it("returns complete OpenRouter model metadata", async () => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({
        data: [
          {
            id: "example/model",
            name: "Example Model",
            created: 1700000000,
            context_length: 128000,
            architecture: {
              input_modalities: ["text", "image"],
              output_modalities: ["text"],
            },
            top_provider: { max_completion_tokens: 16384 },
            reasoning: {
              mandatory: false,
              default_enabled: true,
              supported_efforts: ["low", "high"],
              default_effort: "high",
            },
          },
        ],
      });

    const response = await getModelsResponse(
      request,
      modelCatalogs.openrouter,
      "openrouter",
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      object: "list",
      data: [
        {
          id: "example/model",
          name: "Example Model",
          object: "model",
          created: 1700000000,
          owned_by: "openrouter",
          context_length: 128000,
          architecture: {
            input_modalities: ["text", "image"],
            output_modalities: ["text"],
          },
          top_provider: { max_completion_tokens: 16384 },
          reasoning: {
            mandatory: false,
            default_enabled: true,
            supported_efforts: ["low", "high"],
            default_effort: "high",
          },
          reasoning_options: [],
        },
      ],
    });
  });

  it.each([
    ["opencode-zen", "opencode", "zen-model"],
    ["opencode-go", "opencode-go", "go-model"],
  ])("converts only the %s models.dev catalog", async (slug, key, id) => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({
        [key]: {
          models: {
            [id]: {
              id,
              name: "Example Model",
              modalities: { input: ["text", "image"], output: ["text"] },
              limit: { context: 200000, output: 32000 },
              reasoning: true,
              reasoning_options: [
                { type: "effort", values: ["low", "high"] },
                { type: "budget_tokens", min: 1024 },
              ],
            },
            "retired-model": { id: "retired-model", status: "deprecated" },
          },
        },
        other: { models: { ignored: { id: "ignored" } } },
      });

    const response = await getModelsResponse(
      request,
      modelCatalogs[slug],
      slug,
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      object: "list",
      data: [
        {
          id,
          name: "Example Model",
          object: "model",
          created: 0,
          owned_by: slug,
          architecture: {
            input_modalities: ["text", "image"],
            output_modalities: ["text"],
          },
          context_length: 200000,
          top_provider: { max_completion_tokens: 32000 },
          reasoning: {
            mandatory: true,
            default_enabled: true,
            supported_efforts: ["low", "high"],
            default_effort: null,
          },
          reasoning_options: [
            { type: "effort", values: ["low", "high"] },
            { type: "budget_tokens", min: 1024 },
          ],
        },
      ],
    });
  });

  it("normalizes optional, disabled, and toggle-only reasoning without invented efforts", async () => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({
        opencode: {
          models: {
            optional: {
              id: "optional",
              name: "Optional Reasoning",
              modalities: { input: ["text"], output: ["text"] },
              limit: { context: 1000, output: 100 },
              reasoning: true,
              reasoning_options: [{ type: "effort", values: ["none", "high"] }],
            },
            disabled: {
              id: "disabled",
              name: "No Reasoning",
              modalities: { input: ["text"], output: ["text"] },
              limit: { context: 1000, output: 100 },
              reasoning: false,
            },
            toggle: {
              id: "toggle",
              name: "Toggle Reasoning",
              modalities: { input: ["text"], output: ["text"] },
              limit: { context: 1000 },
              reasoning: true,
              reasoning_options: [{ type: "toggle" }],
            },
          },
        },
      });

    const response = await getModelsResponse(
      request,
      modelCatalogs["opencode-zen"],
      "opencode-zen",
      sourceFetch,
      cache as unknown as Cache,
    );
    const body = (await response.json()) as {
      data: Array<{
        reasoning: unknown;
        top_provider: { max_completion_tokens: number | null };
      }>;
    };

    expect(response.status).toBe(200);
    expect(body.data.map(({ reasoning }) => reasoning)).toEqual([
      {
        mandatory: false,
        default_enabled: true,
        supported_efforts: ["none", "high"],
        default_effort: null,
      },
      {
        mandatory: false,
        default_enabled: false,
        supported_efforts: [],
        default_effort: null,
      },
      {
        mandatory: false,
        default_enabled: true,
        supported_efforts: [],
        default_effort: null,
      },
    ]);
    expect(body.data[2].top_provider.max_completion_tokens).toBeNull();
  });

  it("keeps NVIDIA NIM static without fetching the featured list", async () => {
    expect(modelCatalogs["nvidia-nim"]).toEqual({ type: "static", models: [] });
    const sourceFetch = vi.fn();
    const response = await getModelsResponse(
      request,
      modelCatalogs["nvidia-nim"],
      "nvidia-nim",
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ object: "list", data: [] });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  it("returns an empty static catalog without external requests", async () => {
    const sourceFetch = vi.fn();
    const response = await getModelsResponse(
      request,
      modelCatalogs.minimax,
      "minimax",
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ object: "list", data: [] });
    expect(sourceFetch).not.toHaveBeenCalled();
  });

  it("returns 502 without caching an invalid upstream response", async () => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({ data: [{ id: 123 }] });

    const response = await getModelsResponse(
      request,
      modelCatalogs.openrouter,
      "openrouter",
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(502);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(cache.put).not.toHaveBeenCalled();
  });

  it("returns 404 for unknown model providers", async () => {
    const response = await SELF.fetch("https://example.com/unknown/models");
    expect(response.status).toBe(404);
  });
});
