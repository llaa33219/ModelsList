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

  it("returns OpenRouter models in OpenAI format", async () => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({
        data: [
          { id: "example/model", created: 1700000000 },
          { id: "example/model", created: 1700000000 },
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
          object: "model",
          created: 1700000000,
          owned_by: "openrouter",
        },
      ],
    });
  });

  it.each([
    ["opencode-zen", "opencode", "Zen Model"],
    ["opencode-go", "opencode-go", "Go Model"],
  ])("only reads the %s catalog from models.dev", async (slug, key, id) => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({
        [key]: {
          models: {
            [id]: { id },
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
      data: [{ id, object: "model", created: 0, owned_by: slug }],
    });
  });

  it("reads NVIDIA featured models from the official asset", async () => {
    const sourceFetch: ModelSourceFetch = async () =>
      Response.json({ "featured-models": [{ model: "nvidia/example" }] });

    const response = await getModelsResponse(
      request,
      modelCatalogs["nvidia-nim"],
      "nvidia-nim",
      sourceFetch,
      cache as unknown as Cache,
    );

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      object: "list",
      data: [
        { id: "nvidia/example", object: "model", created: 0, owned_by: "nvidia-nim" },
      ],
    });
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
