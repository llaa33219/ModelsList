import sourceJson from "../provider_models_slim.json";
import nvidiaSourceJson from "../nvidia_nim_official_chat.json";
import previousNvidiaSourceJson from "../nvidia_nim_chat_models.json";
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

interface NvidiaSourceRow {
  model_id: string;
  model_name?: string;
  context_tokens: number | string;
  input_modalities: string;
  output_modalities: string;
  reasoning: string;
  reasoning_control: string;
  output_ceiling: number | string;
  nim_endpoint_max_tokens: number | string;
  nim_endpoint_max_tokens_default: number | string;
  live_status: string;
  eol_date: string;
}

const nvidiaSource = nvidiaSourceJson as {
  chat_count: number;
  chat_models: NvidiaSourceRow[];
  all_models: NvidiaSourceRow[];
};
const previousNvidiaSource = previousNvidiaSourceJson as {
  chat_models: Array<{
    model_id: string;
    model_name: string;
    context_tokens: number | string;
    input_modalities: string;
    output_modalities: string;
    reasoning: string;
    reasoning_control: string;
  }>;
};

function nvidiaContextTokens(row: NvidiaSourceRow): number | null {
  return typeof row.context_tokens === "number" ? row.context_tokens : null;
}

function nvidiaMaxOutputTokens(row: NvidiaSourceRow): number | null {
  return typeof row.output_ceiling === "number" ? row.output_ceiling : null;
}

function nvidiaPreviousRow(row: NvidiaSourceRow) {
  return previousNvidiaSource.chat_models.find(
    (candidate) => candidate.model_id === row.model_id,
  );
}

function nvidiaModalities(row: NvidiaSourceRow, direction: "input" | "output"): string[] {
  const previous = nvidiaPreviousRow(row);
  const value = direction === "input"
    ? row.input_modalities.trim() || previous?.input_modalities || ""
    : row.output_modalities.trim() || previous?.output_modalities || "";
  const names: Record<string, string> = {
    Text: "text", Image: "image", Video: "video", Audio: "audio",
    PDF: "pdf", Json: "json", text: "text", image: "image", video: "video", audio: "audio",
  };
  return value.split(",").map((part) => names[part.trim()]);
}

function nvidiaDisplayName(row: NvidiaSourceRow): string {
  return nvidiaPreviousRow(row)?.model_name ?? row.model_id;
}

function nvidiaReasoningControl(row: NvidiaSourceRow): string {
  return row.reasoning_control || nvidiaPreviousRow(row)?.reasoning_control || "";
}

function nvidiaReasoningEnabled(row: NvidiaSourceRow): boolean {
  return row.reasoning === "지원" ||
    (row.reasoning === "미공개" && Boolean(row.reasoning_control)) ||
    (row.reasoning === "미공개" && nvidiaPreviousRow(row)?.reasoning === "지원");
}

function expectedNvidiaRows(): Array<NvidiaSourceRow & { supplemental?: boolean }> {
  const rows: Array<NvidiaSourceRow & { supplemental?: boolean }> = nvidiaSource.chat_models.filter((row) => {
    const previous = nvidiaPreviousRow(row);
    return (
      row.live_status === "정상 제공 (API 키 필요)" &&
      !row.eol_date &&
      nvidiaContextTokens(row) !== null &&
      nvidiaMaxOutputTokens(row) !== null &&
      nvidiaModalities(row, "input").every(Boolean) &&
      nvidiaModalities(row, "input").length > 0 &&
      nvidiaModalities(row, "output").every(Boolean) &&
      nvidiaModalities(row, "output").length > 0 &&
      (row.reasoning === "지원" || row.reasoning === "미지원" ||
        previous?.reasoning === "지원" || previous?.reasoning === "미지원" ||
        Boolean(nvidiaReasoningControl(row)))
    );
  });
  const supplemental = nvidiaSource.all_models.find(
    ({ model_id }) => model_id === "nvidia/nemotron-parse-2.0",
  );
  if (supplemental) rows.push({ ...supplemental, supplemental: true });
  return rows.sort((a, b) => a.model_id.localeCompare(b.model_id));
}

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
  if ((slug === "kimi" || slug === "kimi-code-plan") && sourceId.startsWith("kimi-")) {
    return sourceId.slice("kimi-".length);
  }
  return sourceId;
}

function validateModel(model: ModelDescriptor): void {
  expect(model.id).not.toBe("");
  expect(model.name).not.toBe("");
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
      "for-coding",
      "for-coding-highspeed",
    ]);
  });

  it("uses the cleaned NIM source and preserves its display names", () => {
    expect(nvidiaSource.chat_count).toBe(94);
    expect(expectedNvidiaRows()).toHaveLength(24);
    const catalog = modelCatalogs["nvidia-nim"];
    expect(catalog.type).toBe("static");
    if (catalog.type !== "static") return;
    expect(catalog.models.find(({ id }) => id === "mistralai/mistral-large-4-1t-a52b")?.name).toBe(
      "Mistral Large 4",
    );
    expect(catalog.models.map(({ id }) => id)).not.toContain("google/google-paligemma");
    expect(catalog.models.map(({ id }) => id)).toContain("z-ai/glm-5.3-flash");
  });

  it("keeps the original source row count unchanged", () => {
    expect(source.row_count).toBe(201);
    expect(source.models).toHaveLength(201);
  });

  it("uses official NIM endpoint ceilings and explicit compatible supplements", () => {
    expect(expectedNvidiaRows().filter((row) => !row.supplemental)).toHaveLength(23);
    expect(expectedNvidiaRows().filter((row) => row.reasoning === "미공개").map(
      ({ model_id }) => model_id,
    )).toEqual(["z-ai/glm-5.3-flash"]);
    expect(expectedNvidiaRows().filter((row) => row.supplemental).map(
      ({ model_id }) => model_id,
    )).toEqual(["nvidia/nemotron-parse-2.0"]);
  });

  it.each(Object.keys(providerNames))(
    "imports only confirmed available %s records with complete metadata",
    (slug) => {
      const catalog = modelCatalogs[slug];
      expect(catalog.type).toBe("static");
      if (catalog.type !== "static") return;

      if (slug === "nvidia-nim") {
        const expected = expectedNvidiaRows();
        expect(catalog.models.map(({ id }) => id)).toEqual(
          expected.map((row) => row.model_id),
        );
        expect(new Set(catalog.models.map(({ id }) => id)).size).toBe(catalog.models.length);
        catalog.models.forEach((model, index) => {
          validateModel(model);
          const row = expected[index];
          expect(model.name).toBe(nvidiaDisplayName(row));
          expect(model.context_length).toBe(nvidiaContextTokens(row));
          expect(model.top_provider.max_completion_tokens).toBe(nvidiaMaxOutputTokens(row));
          expect(model.architecture.input_modalities).toEqual(nvidiaModalities(row, "input"));
          expect(model.architecture.output_modalities).toEqual(nvidiaModalities(row, "output"));
          expect(model.reasoning.default_enabled).toBe(nvidiaReasoningEnabled(row));
          expect(model.top_provider.nim_endpoint_max_tokens).toBe(
            typeof row.nim_endpoint_max_tokens === "number"
              ? row.nim_endpoint_max_tokens
              : null,
          );
          expect(model.top_provider.nim_endpoint_max_tokens_default).toBe(
            typeof row.nim_endpoint_max_tokens_default === "number"
              ? row.nim_endpoint_max_tokens_default
              : null,
          );
          if (nvidiaReasoningControl(row)) {
            expect(model.reasoning_options.length).toBeGreaterThan(0);
            const match = /reasoning_(effort|strength)(?:\s+수치형)?=([^\s(]+)|reasoning_(effort|strength)\s+수치형\s+(\d+~\d+)/.exec(
              nvidiaReasoningControl(row),
            );
            expect(match).not.toBeNull();
            const parameter = `reasoning_${match?.[1] ?? match?.[3]}`;
            const effortsValue = match?.[2] ?? match?.[4];
            const efforts = effortsValue?.includes("~")
              ? effortsValue.split("~").flatMap((value, index, bounds) => {
                  if (index === 1) return [];
                  const [min, max] = bounds.map(Number);
                  return Array.from({ length: max - min + 1 }, (_, i) => String(min + i));
                })
              : match?.[2].split("|");
            expect(model.reasoning.supported_efforts).toEqual(efforts);
            expect(model.reasoning_options).toContainEqual(
              expect.objectContaining({
                type: "effort",
                values: efforts,
                ...(parameter === "reasoning_strength" ? { parameter } : {}),
              }),
            );
            const defaultMatch = /\(기본(?:값)? ([^),\s]+)/.exec(
              nvidiaReasoningControl(row),
            );
            expect(model.reasoning.default_effort).toBe(defaultMatch?.[1] ?? null);
            expect(model.reasoning.supported_efforts).toEqual(efforts);
            const hasToggle = model.reasoning_options.some(
              (option) => option.type === "toggle",
            );
            expect(model.reasoning.mandatory).toBe(
              !hasToggle && !efforts?.includes("none"),
            );
          }
        });
        return;
      }

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
