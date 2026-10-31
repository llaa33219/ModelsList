import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { providers } from "../src/providers";

describe("provider directory", () => {
  it("returns the provider list as a top-level JSON array", async () => {
    const response = await SELF.fetch("https://example.com/");

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe(
      "application/json; charset=utf-8",
    );
    expect(await response.json()).toEqual(providers);
  });

  it("includes all 17 providers with their endpoints and formats", () => {
    expect(providers).toHaveLength(17);
    expect(providers.map(({ name }) => name)).toEqual([
      "MiniMax",
      "Z.AI Coding Plan",
      "Kimi Code Plan",
      "Z.AI",
      "Kimi",
      "Xiaomi Token Plan SGP",
      "Xiaomi MiMo",
      "OpenRouter",
      "DeepSeek",
      "Alibaba Token Plan Personal",
      "StepFun",
      "Step Plan",
      "OpenCode Zen",
      "OpenCode Go",
      "LongCat",
      "Krafton Raon",
      "NVIDIA NIM",
    ]);
    expect(providers[0]).toEqual({
      name: "MiniMax",
      slug: "minimax",
      formats: [
        { format: "openai-responses", baseUrl: "https://api.minimax.io/v1/responses" },
        { format: "openai", baseUrl: "https://api.minimax.io/v1" },
        { format: "anthropic", baseUrl: "https://api.minimax.io/anthropic" },
      ],
      modelLists: [
        { url: "https://api.minimax.io/anthropic/v1/models", format: "anthropic", source: "official" },
        { url: "https://api.minimax.io/v1/models", format: "openai", source: "official" },
        { url: "https://modelslist.blp.sh/minimax/models", format: "openai", source: "modelslist" },
      ],
    });
    expect(providers[13]).toEqual({
      name: "OpenCode Go",
      slug: "opencode-go",
      formats: [
        { format: "openai", baseUrl: "https://opencode.ai/inference/go/openai/v1" },
        { format: "openai-responses", baseUrl: "https://opencode.ai/inference/go/openai/v1/responses" },
        { format: "anthropic", baseUrl: "https://opencode.ai/inference/go/anthropic" },
      ],
      modelLists: [
        { url: "https://opencode.ai/zen/go/v1/models", format: "openai", source: "official" },
        { url: "https://modelslist.blp.sh/opencode-go/models", format: "openai", source: "modelslist" },
      ],
    });
  });

  it("labels the ModelsList-curated endpoint for every provider", () => {
    for (const provider of providers) {
      expect(provider.modelLists?.every(({ source }) => source === "official" || source === "modelslist")).toBe(true);
      expect(provider.modelLists).toContainEqual({
        url: `https://modelslist.blp.sh/${provider.slug}/models`,
        format: "openai",
        source: "modelslist",
      });
    }
  });

  it("returns 404 for unknown paths", async () => {
    const response = await SELF.fetch("https://example.com/providers");

    expect(response.status).toBe(404);
  });

  it("rejects non-GET requests", async () => {
    const response = await SELF.fetch("https://example.com/", {
      method: "POST",
    });

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET");
  });
});

describe("newly added providers", () => {
  it.each([
    {
      name: "LongCat",
      base: "https://api.longcat.ai/openai/v1",
      anthropicBase: "https://api.longcat.ai/anthropic",
    },
    {
      name: "Krafton Raon",
      base: "https://raon-api.krafton.ai/v1",
      anthropicBase: "https://raon-api.krafton.ai",
    },
    {
      name: "NVIDIA NIM",
      base: "https://integrate.api.nvidia.com/v1",
    },
  ])("registers $name with the supplied URLs", ({ name, base, anthropicBase }) => {
    const provider = providers.find((candidate) => candidate.name === name);

    expect(provider).toBeDefined();
    expect(provider?.formats).toEqual([
      { format: "openai", baseUrl: base },
      { format: "openai-responses", baseUrl: `${base}/responses` },
      ...(anthropicBase
        ? [{ format: "anthropic", baseUrl: anthropicBase }]
        : []),
    ]);
    expect(provider?.modelLists).toEqual([
      { url: `${base}/models`, format: "openai", source: "official" },
      {
        url: `https://modelslist.blp.sh/${provider?.slug}/models`,
        format: "openai",
        source: "modelslist",
      },
    ]);
  });
});
