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
import { models as qwencloud_token_plan_personal_models } from "./model-data/qwencloud-token-plan-personal";
import { models as qwencloud_token_plan_team_models } from "./model-data/qwencloud-token-plan-team";
import { models as qwencloud_payg_ap_southeast_1_models } from "./model-data/qwencloud-payg-ap-southeast-1";
import { models as qwencloud_payg_cn_beijing_models } from "./model-data/qwencloud-payg-cn-beijing";
import { models as qwencloud_payg_eu_central_1_models } from "./model-data/qwencloud-payg-eu-central-1";
import { models as qwencloud_payg_cn_hongkong_models } from "./model-data/qwencloud-payg-cn-hongkong";
import { models as qwencloud_payg_ap_northeast_1_models } from "./model-data/qwencloud-payg-ap-northeast-1";
import { models as qwencloud_payg_us_east_1_models } from "./model-data/qwencloud-payg-us-east-1";
export interface ModelArchitecture {
  input_modalities: string[];
  output_modalities: string[];
}

export interface ModelTopProvider {
  max_completion_tokens: number | null;
  nim_endpoint_max_tokens?: number | null;
  nim_endpoint_max_tokens_default?: number | null;
}

export interface ModelReasoning {
  mandatory: boolean;
  default_enabled: boolean;
  supported_efforts: string[];
  default_effort: string | null;
}

export type ReasoningOption =
  | { type: "toggle" }
  | {
      type: "effort";
      values: string[];
      parameter?: "reasoning_effort" | "reasoning_strength";
      aliases?: Record<string, string>;
      numeric?: { min: number; max: number };
    }
  | { type: "budget_tokens"; min?: number; max?: number };

export interface ModelDescriptor {
  id: string;
  name: string;
  architecture: ModelArchitecture;
  context_length: number;
  top_provider: ModelTopProvider;
  reasoning: ModelReasoning;
  reasoning_options: ReasoningOption[];
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

// Static catalogs contain only confirmed, complete records from provider_models_slim.json;
// the QwenCloud catalogs are sourced from docs.qwencloud.com instead.
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
  "qwencloud-token-plan-personal": staticCatalog(qwencloud_token_plan_personal_models),
  "qwencloud-token-plan-team": staticCatalog(qwencloud_token_plan_team_models),
  "qwencloud-payg-ap-southeast-1": staticCatalog(qwencloud_payg_ap_southeast_1_models),
  "qwencloud-payg-cn-beijing": staticCatalog(qwencloud_payg_cn_beijing_models),
  "qwencloud-payg-eu-central-1": staticCatalog(qwencloud_payg_eu_central_1_models),
  "qwencloud-payg-cn-hongkong": staticCatalog(qwencloud_payg_cn_hongkong_models),
  "qwencloud-payg-ap-northeast-1": staticCatalog(qwencloud_payg_ap_northeast_1_models),
  "qwencloud-payg-us-east-1": staticCatalog(qwencloud_payg_us_east_1_models),
};
