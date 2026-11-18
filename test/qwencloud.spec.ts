import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import { modelCatalogs, type ModelDescriptor } from "../src/model-catalogs";
import { providers } from "../src/providers";
import { models as alibabaModels } from "../src/model-data/alibaba-token-plan-personal";
import { models as personalModels } from "../src/model-data/qwencloud-token-plan-personal";
import { models as teamModels } from "../src/model-data/qwencloud-token-plan-team";
import { models as paygApSoutheast1Models } from "../src/model-data/qwencloud-payg-ap-southeast-1";
import { models as paygCnBeijingModels } from "../src/model-data/qwencloud-payg-cn-beijing";
import { models as paygEuCentral1Models } from "../src/model-data/qwencloud-payg-eu-central-1";
import { models as paygCnHongkongModels } from "../src/model-data/qwencloud-payg-cn-hongkong";
import { models as paygApNortheast1Models } from "../src/model-data/qwencloud-payg-ap-northeast-1";
import { models as paygUsEast1Models } from "../src/model-data/qwencloud-payg-us-east-1";

const provider = (slug: string) =>
  providers.find((candidate) => candidate.slug === slug);

const catalogModules: Readonly<Record<string, ModelDescriptor[]>> = {
  "qwencloud-token-plan-personal": personalModels,
  "qwencloud-token-plan-team": teamModels,
  "qwencloud-payg-ap-southeast-1": paygApSoutheast1Models,
  "qwencloud-payg-cn-beijing": paygCnBeijingModels,
  "qwencloud-payg-eu-central-1": paygEuCentral1Models,
  "qwencloud-payg-cn-hongkong": paygCnHongkongModels,
  "qwencloud-payg-ap-northeast-1": paygApNortheast1Models,
  "qwencloud-payg-us-east-1": paygUsEast1Models,
};

// Sorted membership per the final audited lists in
// .miniouto/qwencloud-research/{token-plan-membership,region-membership}.json.
const membership: Readonly<Record<string, string[]>> = {
  "qwencloud-token-plan-personal": [
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.2",
    "glm-5.3",
    "qwen3.6-flash",
    "qwen3.7-max",
    "qwen3.7-plus",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen4-max",
    "qwen4-max-preview",
  ],

  "qwencloud-token-plan-team": [
    "MiniMax-M2.5",
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5",
    "glm-5.1",
    "glm-5.2",
    "glm-5.3",
    "kimi-k2.5",
    "kimi-k2.6",
    "kimi-k2.7-code",
    "qwen3.6-flash",
    "qwen3.6-plus",
    "qwen3.7-max",
    "qwen3.7-plus",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen4-max",
    "qwen4-max-preview",
  ],

  "qwencloud-payg-ap-southeast-1": [
    "ZHIPU/GLM-5.2",
    "ZHIPU/GLM-5.3",
    "decision-model-preview",
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.1",
    "glm-5.2",
    "glm-5.2-fast-preview",
    "glm-5.3",
    "glm-5.3-prime",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "kimi/kimi-k3",
    "qwen-flash",
    "qwen-flash-2025-07-28",
    "qwen-flash-character",
    "qwen-max",
    "qwen-plus",
    "qwen-plus-2025-01-25",
    "qwen-plus-2025-04-28",
    "qwen-plus-2025-07-14",
    "qwen-plus-2025-12-01",
    "qwen-plus-character",
    "qwen-plus-character-ja",
    "qwen-plus-latest",
    "qwen3-coder-flash",
    "qwen3-coder-flash-2025-07-28",
    "qwen3-vl-plus",
    "qwen3.5-122b-a10b",
    "qwen3.5-27b",
    "qwen3.5-35b-a3b",
    "qwen3.5-397b-a17b",
    "qwen3.5-flash",
    "qwen3.5-flash-2026-02-23",
    "qwen3.5-plus",
    "qwen3.5-plus-2026-02-15",
    "qwen3.5-plus-2026-04-20",
    "qwen3.6-27b",
    "qwen3.6-35b-a3b",
    "qwen3.6-flash",
    "qwen3.6-flash-2026-04-16",
    "qwen3.6-plus",
    "qwen3.6-plus-2026-04-02",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-17",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-max-2026-06-08",
    "qwen3.7-max-preview",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-2.4t-a95b",
    "qwen3.8-27b",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],

  "qwencloud-payg-cn-beijing": [
    "MiniMax-M2.5",
    "decision-model-preview",
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5",
    "glm-5.1",
    "glm-5.2",
    "glm-5.2-fast-preview",
    "glm-5.3",
    "glm-5.3-prime",
    "kimi-k2.5",
    "kimi-k2.6",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "qwen-flash",
    "qwen-flash-2025-07-28",
    "qwen-flash-character",
    "qwen-max",
    "qwen-plus",
    "qwen-plus-2025-01-25",
    "qwen-plus-2025-04-28",
    "qwen-plus-2025-07-14",
    "qwen-plus-2025-12-01",
    "qwen-plus-character",
    "qwen-plus-latest",
    "qwen3-coder-flash",
    "qwen3-coder-flash-2025-07-28",
    "qwen3-vl-plus",
    "qwen3.5-122b-a10b",
    "qwen3.5-27b",
    "qwen3.5-35b-a3b",
    "qwen3.5-397b-a17b",
    "qwen3.5-flash",
    "qwen3.5-flash-2026-02-23",
    "qwen3.5-plus",
    "qwen3.5-plus-2026-02-15",
    "qwen3.5-plus-2026-04-20",
    "qwen3.6-27b",
    "qwen3.6-35b-a3b",
    "qwen3.6-flash",
    "qwen3.6-flash-2026-04-16",
    "qwen3.6-plus",
    "qwen3.6-plus-2026-04-02",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-max-2026-06-08",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-2.4t-a95b",
    "qwen3.8-27b",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],

  "qwencloud-payg-eu-central-1": [
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.1",
    "glm-5.2",
    "glm-5.3",
    "kimi-k2.5",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "qwen-flash",
    "qwen-flash-2025-07-28",
    "qwen-plus",
    "qwen-plus-2025-12-01",
    "qwen-plus-character",
    "qwen3-coder-flash",
    "qwen3-coder-flash-2025-07-28",
    "qwen3-vl-plus",
    "qwen3.5-122b-a10b",
    "qwen3.5-27b",
    "qwen3.5-35b-a3b",
    "qwen3.5-397b-a17b",
    "qwen3.5-flash",
    "qwen3.5-flash-2026-02-23",
    "qwen3.5-plus",
    "qwen3.5-plus-2026-02-15",
    "qwen3.6-35b-a3b",
    "qwen3.6-flash",
    "qwen3.6-flash-2026-04-16",
    "qwen3.6-plus",
    "qwen3.6-plus-2026-04-02",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-max-2026-06-08",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],

  "qwencloud-payg-cn-hongkong": [
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.2",
    "glm-5.3",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "qwen-plus",
    "qwen-plus-2025-12-01",
    "qwen-plus-character",
    "qwen3-vl-plus",
    "qwen3.5-flash",
    "qwen3.5-flash-2026-02-23",
    "qwen3.6-flash",
    "qwen3.6-plus",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-max-2026-06-08",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],

  "qwencloud-payg-ap-northeast-1": [
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.1",
    "glm-5.3",
    "kimi-k2.5",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "qwen-plus-character",
    "qwen3.6-flash",
    "qwen3.6-flash-2026-04-16",
    "qwen3.6-plus",
    "qwen3.6-plus-2026-04-02",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],

  "qwencloud-payg-us-east-1": [
    "deepseek-v4-flash-0731",
    "deepseek-v4-pro",
    "deepseek-v4-pro-0813",
    "deepseek-v4.1-flash",
    "deepseek-v4.1-flash-1017",
    "glm-5.1",
    "glm-5.2",
    "glm-5.3",
    "kimi-k2.5",
    "kimi-k2.7-code",
    "kimi-k3",
    "kimi-k3.1-pro",
    "qwen-flash",
    "qwen-flash-2025-07-28",
    "qwen-flash-character",
    "qwen-plus",
    "qwen-plus-2025-12-01",
    "qwen-plus-character",
    "qwen3-coder-flash",
    "qwen3-coder-flash-2025-07-28",
    "qwen3-vl-plus",
    "qwen3.5-122b-a10b",
    "qwen3.5-27b",
    "qwen3.5-35b-a3b",
    "qwen3.5-397b-a17b",
    "qwen3.5-flash",
    "qwen3.5-flash-2026-02-23",
    "qwen3.5-plus",
    "qwen3.5-plus-2026-02-15",
    "qwen3.6-35b-a3b",
    "qwen3.6-flash",
    "qwen3.6-flash-2026-04-16",
    "qwen3.6-plus",
    "qwen3.6-plus-2026-04-02",
    "qwen3.7-flash",
    "qwen3.7-flash-2026-07-15",
    "qwen3.7-max",
    "qwen3.7-max-2026-05-20",
    "qwen3.7-max-2026-06-08",
    "qwen3.7-plus",
    "qwen3.7-plus-2026-05-26",
    "qwen3.8-flash",
    "qwen3.8-max",
    "qwen3.8-max-0902",
    "qwen4-max",
  ],
};

const paygProviders = [
  ["QwenCloud Pay-as-you-go (Singapore)", "qwencloud-payg-ap-southeast-1", "ap-southeast-1", true],
  ["QwenCloud Pay-as-you-go (Beijing)", "qwencloud-payg-cn-beijing", "cn-beijing", true],
  ["QwenCloud Pay-as-you-go (Frankfurt)", "qwencloud-payg-eu-central-1", "eu-central-1", false],
  ["QwenCloud Pay-as-you-go (Hong Kong)", "qwencloud-payg-cn-hongkong", "cn-hongkong", false],
  ["QwenCloud Pay-as-you-go (Tokyo)", "qwencloud-payg-ap-northeast-1", "ap-northeast-1", false],
  ["QwenCloud Pay-as-you-go (Virginia)", "qwencloud-payg-us-east-1", "us-east-1", false],
] as const;

const byId = (models: ModelDescriptor[], id: string) =>
  models.find((model) => model.id === id);

describe("QwenCloud providers", () => {
  it("registers the 8 QwenCloud providers with documented endpoints", () => {
    const tokenPlanFormats = [
      { format: "openai", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://token-plan.maas.qwencloudapi.com/apps/anthropic" },
    ];
    const tokenPlanOfficialModelLists = [
      { url: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai", source: "official" },
      { url: "https://token-plan.maas.qwencloudapi.com/apps/anthropic/v1/models", format: "anthropic", source: "official" },
    ];

    expect(provider("qwencloud-token-plan-personal")).toEqual({
      name: "QwenCloud Token Plan Personal (Singapore)",
      slug: "qwencloud-token-plan-personal",
      formats: tokenPlanFormats,
      modelLists: [
        ...tokenPlanOfficialModelLists,
        { url: "https://modelslist.blp.sh/qwencloud-token-plan-personal/models", format: "openai", source: "modelslist" },
      ],
    });
    expect(provider("qwencloud-token-plan-team")).toEqual({
      name: "QwenCloud Token Plan Team (Singapore)",
      slug: "qwencloud-token-plan-team",
      formats: tokenPlanFormats,
      modelLists: [
        ...tokenPlanOfficialModelLists,
        { url: "https://modelslist.blp.sh/qwencloud-token-plan-team/models", format: "openai", source: "modelslist" },
      ],
    });

    for (const [name, slug, region, typesafe] of paygProviders) {
      expect(provider(slug), name).toEqual({
        name,
        slug,
        formats: [
          { format: "openai", baseUrl: `https://${region}.maas.qwencloudapi.com/compatible-mode/v1` },
          { format: "openai-responses", baseUrl: `https://${region}.maas.qwencloudapi.com/compatible-mode/v1/responses` },
          { format: "anthropic", baseUrl: `https://${region}.maas.qwencloudapi.com/apps/anthropic` },
          ...(typesafe
            ? [{ format: "typesafe", baseUrl: `https://${region}.maas.qwencloudapi.com/compatible-mode/v1/systemone` }]
            : []),
        ],
        modelLists: [
          { url: `https://${region}.maas.qwencloudapi.com/compatible-mode/v1/models`, format: "openai", source: "official" },
          { url: `https://modelslist.blp.sh/${slug}/models`, format: "openai", source: "modelslist" },
        ],
      });
    }
  });

  it("shares the Token Plan endpoint between Personal and Team", () => {
    expect(provider("qwencloud-token-plan-personal")?.formats).toEqual(
      provider("qwencloud-token-plan-team")?.formats,
    );
    expect(provider("qwencloud-token-plan-personal")?.modelLists?.slice(0, 2)).toEqual(
      provider("qwencloud-token-plan-team")?.modelLists?.slice(0, 2),
    );
  });

  it("builds catalogs from the shared map with exact membership", () => {
    for (const [slug, models] of Object.entries(catalogModules)) {
      const ids = models.map(({ id }) => id);
      expect(ids, slug).toEqual(membership[slug]);
      expect(new Set(ids).size, slug).toBe(ids.length);
    }
  });

  it("single-sources qwen3.7-max, qwen4-max and qwen4-max-preview from the Alibaba catalog", () => {
    for (const id of ["qwen3.7-max", "qwen4-max", "qwen4-max-preview"]) {
      const alibaba = byId(alibabaModels, id);
      expect(alibaba, id).toBeDefined();
      // Both Token Plan catalogs contain all three reused IDs.
      expect(byId(personalModels, id), id).toBe(alibaba);
      expect(byId(teamModels, id), id).toBe(alibaba);
      // The payg regions only list qwen3.7-max and qwen4-max; wherever they
      // appear, the descriptor must still be the Alibaba record itself.
      for (const [slug, models] of Object.entries(catalogModules)) {
        if (slug.startsWith("qwencloud-payg")) {
          const match = byId(models, id);
          if (match) expect(match, `${slug}/${id}`).toBe(alibaba);
        }
      }
    }
  });

  it("keeps decision-model-preview only in Singapore and Beijing payg catalogs", () => {
    expect(byId(paygApSoutheast1Models, "decision-model-preview")).toBeDefined();
    expect(byId(paygCnBeijingModels, "decision-model-preview")).toBeDefined();
    for (const [slug, models] of Object.entries(catalogModules)) {
      if (slug === "qwencloud-payg-ap-southeast-1" || slug === "qwencloud-payg-cn-beijing") {
        continue;
      }
      expect(byId(models, "decision-model-preview"), slug).toBeUndefined();
    }
    const model = byId(paygApSoutheast1Models, "decision-model-preview");
    expect(model?.context_length).toBe(65536);
    expect(model?.top_provider.max_completion_tokens).toBe(0);
  });

  it("applies the qwen-flash-character region split", () => {
    // qwen-flash-character is served only in Singapore, Beijing and Virginia.
    for (const [slug, models] of Object.entries(catalogModules)) {
      const model = byId(models, "qwen-flash-character");
      const reduced =
        slug === "qwencloud-payg-cn-beijing" || slug === "qwencloud-payg-us-east-1";
      if (!model) {
        expect(
          [
            "qwencloud-token-plan-personal",
            "qwencloud-token-plan-team",
            "qwencloud-payg-eu-central-1",
            "qwencloud-payg-cn-hongkong",
            "qwencloud-payg-ap-northeast-1",
          ],
          slug,
        ).toContain(slug);
        continue;
      }
      expect(model.context_length, slug).toBe(reduced ? 8192 : 32768);
      expect(model.top_provider.max_completion_tokens, slug).toBe(reduced ? 4096 : 32768);
    }
    // The reduced split is documented as Beijing+Virginia vs all other regions;
    // Frankfurt/Hong Kong/Tokyo do not serve the model at all.
  });

  it("applies the qwen-plus-character region split", () => {
    // Singapore keeps the full 131072 context; the other five serving regions
    // run 32768. max_completion_tokens is 32768 everywhere.
    for (const [slug, models] of Object.entries(catalogModules)) {
      const model = byId(models, "qwen-plus-character");
      if (!model) {
        expect(
          ["qwencloud-token-plan-personal", "qwencloud-token-plan-team"],
          slug,
        ).toContain(slug);
        continue;
      }
      expect(model.context_length, slug).toBe(
        slug === "qwencloud-payg-ap-southeast-1" ? 131072 : 32768,
      );
      expect(model.top_provider.max_completion_tokens, slug).toBe(32768);
    }
  });

  it("preserves documented thinking semantics", () => {
    const glm53 = byId(paygApSoutheast1Models, "glm-5.3");
    expect(glm53?.reasoning).toEqual({
      mandatory: true,
      default_enabled: true,
      supported_efforts: ["low", "high", "max"],
      default_effort: "max",
    });
    expect(glm53?.reasoning_options).toEqual([
      { type: "effort", values: ["low", "high", "max"] },
    ]);

    // glm-5.3-prime is hybrid per the price page Mode column (toggle present),
    // while glm-5.2 records no invented default effort (docs disagree).
    const glm53Prime = byId(paygCnBeijingModels, "glm-5.3-prime");
    expect(glm53Prime?.reasoning.mandatory).toBe(false);
    expect(glm53Prime?.reasoning_options).toEqual([
      { type: "effort", values: ["low", "high", "max"] },
      { type: "toggle" },
    ]);

    const glm52 = byId(paygApSoutheast1Models, "glm-5.2");
    expect(glm52?.reasoning.default_effort).toBeNull();

    // qwen-plus-2025-12-01 is a default-off hybrid, so it needs the toggle.
    const qwenPlus1201 = byId(paygApSoutheast1Models, "qwen-plus-2025-12-01");
    expect(qwenPlus1201?.reasoning_options).toEqual([
      { type: "toggle" },
      { type: "budget_tokens", max: 81920 },
    ]);

    const kimiK27Code = byId(paygApSoutheast1Models, "kimi-k2.7-code");
    expect(kimiK27Code?.reasoning.mandatory).toBe(true);
    expect(kimiK27Code?.reasoning_options).toEqual([{ type: "budget_tokens" }]);

    const qwen38Max = byId(personalModels, "qwen3.8-max");
    expect(qwen38Max?.reasoning.default_effort).toBe("xhigh");
    expect(qwen38Max?.reasoning_options).toEqual([
      {
        type: "effort",
        values: ["low", "medium", "xhigh"],
        aliases: { max: "xhigh", high: "xhigh", minimal: "low", none: "disabled" },
      },
      { type: "toggle" },
      { type: "budget_tokens", max: 262144 },
    ]);

    const deepseekV4Pro = byId(personalModels, "deepseek-v4-pro");
    expect(deepseekV4Pro?.reasoning.supported_efforts).toEqual(["high", "max"]);
    expect(deepseekV4Pro?.reasoning.default_effort).toBe("high");

    const minimax = byId(teamModels, "MiniMax-M2.5");
    expect(minimax?.reasoning.mandatory).toBe(true);
    expect(minimax?.reasoning_options).toEqual([]);
  });

  it("excludes non-LLM and unconfirmed models", () => {
    const forbidden = (id: string): boolean =>
      id === "auto" ||
      id.startsWith("qwen-image") ||
      id.startsWith("wan") ||
      id.startsWith("happyhorse") ||
      id.startsWith("qwen-audio") ||
      id.startsWith("mindlab/") ||
      id.startsWith("deepseek-r1-distill") ||
      id === "qwen-long" ||
      id === "qwen3.8-max-preview" ||
      id.startsWith("qwen2-vl");
    for (const [slug, models] of Object.entries(catalogModules)) {
      expect(models.filter(({ id }) => forbidden(id)), slug).toEqual([]);
    }
    expect(
      Object.keys(modelCatalogs).filter((slug) => slug.startsWith("qwencloud")),
    ).toEqual(Object.keys(catalogModules));
  });
});

interface WorkerModel {
  id: string;
  object: string;
  owned_by: string;
  top_provider?: { max_completion_tokens: number | null };
}

// Published catalog sizes; must stay in sync with the modules above.
const expectedCounts: Readonly<Record<string, number>> = {
  "qwencloud-token-plan-personal": 14,
  "qwencloud-token-plan-team": 21,
  "qwencloud-payg-ap-southeast-1": 62,
  "qwencloud-payg-cn-beijing": 60,
  "qwencloud-payg-eu-central-1": 44,
  "qwencloud-payg-cn-hongkong": 28,
  "qwencloud-payg-ap-northeast-1": 26,
  "qwencloud-payg-us-east-1": 45,
};

describe("QwenCloud worker endpoints", () => {
  it("serves every catalog at GET /<slug>/models", async () => {
    for (const [slug, models] of Object.entries(catalogModules)) {
      const response = await SELF.fetch(`https://example.com/${slug}/models`);
      const body = (await response.json()) as {
        object: string;
        data: WorkerModel[];
      };

      expect(response.status, slug).toBe(200);
      expect(body.object, slug).toBe("list");
      expect(body.data, slug).toHaveLength(expectedCounts[slug]);
      expect(body.data, slug).toHaveLength(models.length);
      for (const entry of body.data) {
        expect(entry.owned_by, slug).toBe(slug);
        expect(entry.object, slug).toBe("model");
      }
      const ids = body.data.map(({ id }) => id);
      expect(ids, slug).toEqual(models.map(({ id }) => id));
      expect([...ids].sort(), slug).toEqual(ids);
      expect(new Set(ids).size, slug).toBe(ids.length);
    }
  });

  it("round-trips the shared qwen4-max descriptor in the personal catalog", async () => {
    const response = await SELF.fetch(
      "https://example.com/qwencloud-token-plan-personal/models",
    );
    const body = (await response.json()) as { data: WorkerModel[] };
    const alibaba = alibabaModels.find(({ id }) => id === "qwen4-max");

    expect(alibaba).toBeDefined();
    expect(body.data.find(({ id }) => id === "qwen4-max")).toEqual(
      alibaba && {
        ...alibaba,
        object: "model",
        created: 0,
        owned_by: "qwencloud-token-plan-personal",
      },
    );
  });

  it("keeps decision-model-preview output-free in ap-southeast-1", async () => {
    const response = await SELF.fetch(
      "https://example.com/qwencloud-payg-ap-southeast-1/models",
    );
    const body = (await response.json()) as { data: WorkerModel[] };
    const model = body.data.find(({ id }) => id === "decision-model-preview");

    expect(model?.top_provider?.max_completion_tokens).toBe(0);
  });
});
