import { models as minimax_models } from "./model-data/minimax";
import { models as zai_coding_plan_models } from "./model-data/zai-coding-plan";
import { models as kimi_code_plan_models } from "./model-data/kimi-code-plan";
import { models as zai_models } from "./model-data/zai";
import { models as kimi_models } from "./model-data/kimi";
import { models as xiaomi_token_plan_sgp_models } from "./model-data/xiaomi-token-plan-sgp";
import { models as xiaomi_mimo_models } from "./model-data/xiaomi-mimo";
import { models as deepseek_models } from "./model-data/deepseek";
import { models as alibaba_token_plan_personal_models } from "./model-data/alibaba-token-plan-personal";
import { models as stepfun_models } from "./model-data/stepfun";
import { models as step_plan_models } from "./model-data/step-plan";
import { models as longcat_models } from "./model-data/longcat";
import { models as krafton_raon_models } from "./model-data/krafton-raon";
import { models as nvidia_nim_models } from "./model-data/nvidia-nim";
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

const staticCatalog = (models: ModelDescriptor[]): StaticCatalog => ({
  type: "static",
  models,
});

// Static catalogs contain only confirmed, complete records from provider_models_slim.json.
// models.dev is used only for the two OpenCode-owned catalogs below.
export const modelCatalogs: Readonly<Record<string, ModelCatalog>> = {
  minimax: staticCatalog(minimax_models),
  "zai-coding-plan": staticCatalog(zai_coding_plan_models),
  "kimi-code-plan": staticCatalog(kimi_code_plan_models),
  zai: staticCatalog(zai_models),
  kimi: staticCatalog(kimi_models),
  "xiaomi-token-plan-sgp": staticCatalog(xiaomi_token_plan_sgp_models),
  "xiaomi-mimo": staticCatalog(xiaomi_mimo_models),
  openrouter: {
    type: "automatic",
    source: "openrouter",
    url: "https://openrouter.ai/api/v1/models",
  },
  deepseek: staticCatalog(deepseek_models),
  "alibaba-token-plan-personal": staticCatalog(alibaba_token_plan_personal_models),
  stepfun: staticCatalog(stepfun_models),
  "step-plan": staticCatalog(step_plan_models),
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
  longcat: staticCatalog(longcat_models),
  "krafton-raon": staticCatalog(krafton_raon_models),
  "nvidia-nim": staticCatalog(nvidia_nim_models),
};
