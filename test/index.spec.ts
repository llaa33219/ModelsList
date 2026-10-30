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

  it("includes all 14 providers with their endpoints and formats", () => {
    expect(providers).toHaveLength(14);
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
    ]);
    expect(providers[0]).toEqual({
      name: "MiniMax",
      formats: [
        { format: "openai-responses", baseUrl: "https://api.minimax.io/v1/responses" },
        { format: "openai", baseUrl: "https://api.minimax.io/v1" },
        { format: "anthropic", baseUrl: "https://api.minimax.io/anthropic" },
      ],
      modelLists: [
        { url: "https://api.minimax.io/anthropic/v1/models", format: "anthropic" },
        { url: "https://api.minimax.io/v1/models", format: "openai" },
      ],
    });
    expect(providers[13]).toEqual({
      name: "OpenCode Go",
      formats: [
        { format: "openai", baseUrl: "https://opencode.ai/inference/go/openai/v1" },
        { format: "openai-responses", baseUrl: "https://opencode.ai/inference/go/openai/v1/responses" },
        { format: "anthropic", baseUrl: "https://opencode.ai/inference/go/anthropic" },
      ],
      modelLists: [
        { url: "https://opencode.ai/zen/go/v1/models", format: "openai" },
      ],
    });
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
