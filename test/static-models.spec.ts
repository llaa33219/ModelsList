import sourceJson from "../provider_models_slim.json";
import { describe, expect, it } from "vitest";
import { modelCatalogs, type ModelDescriptor } from "../src/model-catalogs";

interface SourceRow {
  공급자: string;
  "모델 ID": string;
  "최대 컨텍스트": number;
  "최대 출력 토큰": number;
  "멀티모달 입력": string;
  "추론 강도 설정": string;
  상태: string;
}

const providerNames: Readonly<Record<string, string>> = {
  minimax: "MiniMax",
  "zai-coding-plan": "Z.AI Coding Plan",
  "kimi-code-plan": "Kimi Code Plan",
  zai: "Z.AI",
  kimi: "Kimi (Moonshot AI)",
  "xiaomi-token-plan-sgp": "Xiaomi Token Plan (Singapore)",
  "xiaomi-mimo": "Xiaomi MiMo",
  deepseek: "DeepSeek",
  "alibaba-token-plan-personal": "Alibaba Token Plan (Personal)",
  stepfun: "StepFun",
  "step-plan": "Step Plan",
  longcat: "LongCat",
  "krafton-raon": "Krafton Raon",
  "nvidia-nim": "NVIDIA NIM",
};

const source = sourceJson as { row_count: number; models: SourceRow[] };

function expectedRows(slug: string): SourceRow[] {
  return source.models.filter(
    (row) =>
      row.공급자 === providerNames[slug] &&
      row.상태 === "사용 가능" &&
      !Object.values(row).some((value) =>
        ["미확인", "미공개", "확인 필요"].includes(String(value)),
      ) &&
      typeof row["최대 컨텍스트"] === "number" &&
      typeof row["최대 출력 토큰"] === "number",
  );
}

function exposedModelId(slug: string, sourceId: string): string {
  if (slug === "kimi" && sourceId.startsWith("kimi-")) {
    return sourceId.slice("kimi-".length);
  }
  return sourceId;
}

function validateModel(model: ModelDescriptor): void {
  expect(model.id).not.toBe("");
  expect(model.name).toBe(model.id);
  expect(model.context_length).toBeGreaterThan(0);
  expect(model.top_provider.max_completion_tokens).toBeGreaterThan(0);
  expect(model.architecture.input_modalities.length).toBeGreaterThan(0);
  expect(model.architecture.output_modalities).toEqual(["text"]);
  expect(typeof model.reasoning.mandatory).toBe("boolean");
  expect(typeof model.reasoning.default_enabled).toBe("boolean");
  expect(Array.isArray(model.reasoning.supported_efforts)).toBe(true);
  expect(Array.isArray(model.reasoning_options)).toBe(true);
  expect(model.reasoning.default_effort === null ||
    model.reasoning.supported_efforts.includes(model.reasoning.default_effort)).toBe(true);
}

describe("static model imports", () => {
  it("preserves GLM-5.2 effort aliases and applies consistent reasoning semantics", () => {
    const catalog = modelCatalogs.zai;
    expect(catalog.type).toBe("static");
    if (catalog.type !== "static") return;
    const glm52 = catalog.models.find(({ id }) => id === "glm-5.2");
    expect(glm52?.reasoning_options).toContainEqual({
      type: "effort",
      values: ["max", "xhigh", "high", "medium", "low", "minimal", "none"],
      aliases: {
        none: "disabled",
        minimal: "disabled",
        low: "high",
        medium: "high",
        xhigh: "max",
      },
    });

    for (const { models } of Object.values(modelCatalogs).filter(
      (candidate) => candidate.type === "static",
    )) {
      for (const model of models) {
        const hasToggle = model.reasoning_options.some(
          (option) =>
            typeof option === "object" && option !== null &&
            "type" in option && option.type === "toggle",
        );
        expect(model.reasoning.mandatory).toBe(
          model.reasoning.default_enabled && !hasToggle &&
            !model.reasoning.supported_efforts.includes("none"),
        );
      }
    }
  });

  it("uses callable Kimi model IDs without the kimi- prefix", () => {
    const catalog = modelCatalogs.kimi;
    expect(catalog.type).toBe("static");
    if (catalog.type !== "static") return;
    expect(catalog.models.map(({ id }) => id)).toEqual([
      "k2.6",
      "k2.7-code",
      "k2.7-code-highspeed",
      "k3",
      "k3.1-pro",
      "k3.1-pro-highspeed",
    ]);
    const codePlan = modelCatalogs["kimi-code-plan"];
    expect(codePlan.type).toBe("static");
    if (codePlan.type !== "static") return;
    expect(codePlan.models.map(({ id }) => id)).toEqual([
      "k3",
      "k3-256k",
      "k3.1-pro",
      "k3.1-pro-highspeed",
      "kimi-for-coding",
      "kimi-for-coding-highspeed",
    ]);
  });

  it("keeps the original source row count unchanged", () => {
    expect(source.row_count).toBe(201);
    expect(source.models).toHaveLength(201);
  });

  it.each(Object.keys(providerNames))(
    "imports only confirmed available %s records with complete metadata",
    (slug) => {
      const catalog = modelCatalogs[slug];
      expect(catalog.type).toBe("static");
      if (catalog.type !== "static") return;

      const expected = expectedRows(slug);
      expect(catalog.models.map(({ id }) => id)).toEqual(
        expected.map((row) => exposedModelId(slug, row["모델 ID"])),
      );
      expect(new Set(catalog.models.map(({ id }) => id)).size).toBe(catalog.models.length);
      catalog.models.forEach((model, index) => {
        validateModel(model);
        expect(model.context_length).toBe(expected[index]["최대 컨텍스트"]);
        expect(model.top_provider.max_completion_tokens).toBe(
          expected[index]["최대 출력 토큰"],
        );
      });
    },
  );
});
