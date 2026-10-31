export interface ModelDescriptor {
  id: string;
  created?: number;
}

interface StaticCatalog {
  type: "static";
  models: ModelDescriptor[];
}

interface AutomaticCatalog {
  type: "automatic";
  source: "openrouter" | "models-dev" | "nvidia-featured";
  url: string;
  providerKey?: "opencode" | "opencode-go";
}

export type ModelCatalog = StaticCatalog | AutomaticCatalog;

const staticCatalog = (): StaticCatalog => ({ type: "static", models: [] });

// Static catalogs are intentionally empty until their model IDs are supplied.
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
  "nvidia-nim": {
    type: "automatic",
    source: "nvidia-featured",
    url: "https://assets.ngc.nvidia.com/products/api-catalog/featured-models.json",
  },
};
