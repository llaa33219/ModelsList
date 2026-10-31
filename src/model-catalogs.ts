export interface ModelArchitecture {
  input_modalities: string[];
  output_modalities: string[];
}

export interface ModelTopProvider {
  max_completion_tokens: number | null;
}

export interface ModelReasoning {
  mandatory: boolean;
  default_enabled: boolean;
  supported_efforts: string[];
  default_effort: string | null;
}

export interface ModelDescriptor {
  id: string;
  name: string;
  architecture: ModelArchitecture;
  context_length: number;
  top_provider: ModelTopProvider;
  reasoning: ModelReasoning;
  reasoning_options: unknown[];
  created?: number;
}

interface StaticCatalog {
  type: "static";
  models: ModelDescriptor[];
}

interface AutomaticCatalog {
  type: "automatic";
  source: "openrouter" | "models-dev";
  url: string;
  providerKey?: "opencode" | "opencode-go";
}

export type ModelCatalog = StaticCatalog | AutomaticCatalog;

const staticCatalog = (): StaticCatalog => ({ type: "static", models: [] });

// Static catalogs stay empty until complete model metadata is supplied.
// models.dev is used only for the two OpenCode-owned catalogs below.
export const modelCatalogs: Readonly<Record<string, ModelCatalog>> = {
  minimax: staticCatalog(),
  "zai-coding-plan": staticCatalog(),
  "kimi-code-plan": staticCatalog(),
  zai: staticCatalog(),
  kimi: staticCatalog(),
  "xiaomi-token-plan-sgp": staticCatalog(),
  "xiaomi-mimo": staticCatalog(),
  openrouter: {
    type: "automatic",
    source: "openrouter",
    url: "https://openrouter.ai/api/v1/models",
  },
  deepseek: staticCatalog(),
  "alibaba-token-plan-personal": staticCatalog(),
  stepfun: staticCatalog(),
  "step-plan": staticCatalog(),
  "opencode-zen": {
    type: "automatic",
    source: "models-dev",
    url: "https://models.dev/api.json",
    providerKey: "opencode",
  },
  "opencode-go": {
    type: "automatic",
    source: "models-dev",
    url: "https://models.dev/api.json",
    providerKey: "opencode-go",
  },
  longcat: staticCatalog(),
  "krafton-raon": staticCatalog(),
  "nvidia-nim": staticCatalog(),
};
