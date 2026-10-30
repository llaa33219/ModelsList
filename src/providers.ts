export type CompatibilityFormat =
  | "openai"
  | "anthropic"
  | "openai-responses"
  | "google-genai"
  | "typesafe"
  | (string & {});

export interface ProviderFormat {
  format: CompatibilityFormat;
  baseUrl: string;
}

export interface ModelListEndpoint {
  url: string;
  format: CompatibilityFormat;
}

export interface Provider {
  name: string;
  formats: ProviderFormat[];
  modelLists?: ModelListEndpoint[];
}

export const providers: readonly Provider[] = [
  {
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
  },
  {
    name: "Z.AI Coding Plan",
    formats: [
      { format: "anthropic", baseUrl: "https://api.z.ai/api/anthropic" },
      { format: "openai", baseUrl: "https://api.z.ai/api/coding/paas/v4" },
      { format: "openai-responses", baseUrl: "https://api.z.ai/api/v1" },
    ],
    modelLists: [
      { url: "https://api.z.ai/api/coding/paas/v4/models", format: "openai" },
    ],
  },
  {
    name: "Kimi Code Plan",
    formats: [
      { format: "openai", baseUrl: "https://api.kimi.ai/coding/v1" },
      { format: "openai-responses", baseUrl: "https://api.kimi.ai/coding/v1/responses" },
      { format: "anthropic", baseUrl: "https://api.kimi.ai/coding/" },
    ],
    modelLists: [
      { url: "https://api.kimi.com/coding/v1/models", format: "openai" },
    ],
  },
  {
    name: "Z.AI",
    formats: [
      { format: "openai", baseUrl: "https://api.z.ai/api/paas/v4" },
    ],
    modelLists: [
      { url: "https://api.z.ai/api/paas/v4/models", format: "openai" },
    ],
  },
  {
    name: "Kimi",
    formats: [
      { format: "openai", baseUrl: "https://api.moonshot.ai/v1" },
      { format: "openai-responses", baseUrl: "https://api.moonshot.ai/v1/responses" },
      { format: "anthropic", baseUrl: "https://api.moonshot.ai/anthropic" },
    ],
    modelLists: [
      { url: "https://api.moonshot.ai/v1/models", format: "openai" },
    ],
  },
  {
    name: "Xiaomi Token Plan SGP",
    formats: [
      { format: "openai", baseUrl: "https://token-plan-sgp.xiaomimimo.com/v1" },
      { format: "anthropic", baseUrl: "https://token-plan-sgp.xiaomimimo.com/anthropic" },
    ],
    modelLists: [
      { url: "https://token-plan-sgp.xiaomimimo.com/v1/models", format: "openai" },
    ],
  },
  {
    name: "Xiaomi MiMo",
    formats: [
      { format: "openai", baseUrl: "https://api.xiaomimimo.com/v1" },
      { format: "openai-responses", baseUrl: "https://api.xiaomimimo.com/v1/responses" },
      { format: "anthropic", baseUrl: "https://api.xiaomimimo.com/anthropic" },
    ],
    modelLists: [
      { url: "https://api.xiaomimimo.com/v1/models", format: "openai" },
    ],
  },
  {
    name: "OpenRouter",
    formats: [
      { format: "openai", baseUrl: "https://openrouter.ai/api/v1" },
      { format: "openai-responses", baseUrl: "https://openrouter.ai/api/v1/responses" },
      { format: "typesafe", baseUrl: "https://openrouter.ai/api/alpha/decisions" },
    ],
    modelLists: [
      { url: "https://openrouter.ai/api/v1/models", format: "openai" },
    ],
  },
  {
    name: "DeepSeek",
    formats: [
      { format: "openai", baseUrl: "https://api.deepseek.com" },
      { format: "anthropic", baseUrl: "https://api.deepseek.com/anthropic" },
      { format: "openai-responses", baseUrl: "https://api.deepseek.com/responses" },
    ],
    modelLists: [
      { url: "https://api.deepseek.com/models", format: "openai" },
    ],
  },
  {
    name: "Alibaba Token Plan Personal",
    formats: [
      { format: "openai", baseUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1" },
      { format: "anthropic", baseUrl: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://token-plan.ap-southeast-1.maas.aliyuncs.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "StepFun",
    formats: [
      { format: "openai", baseUrl: "https://api.stepfun.ai/v1" },
      { format: "anthropic", baseUrl: "https://api.stepfun.ai" },
      { format: "openai-responses", baseUrl: "https://api.stepfun.ai/v1/responses" },
    ],
    modelLists: [
      { url: "https://api.stepfun.ai/v1/models", format: "openai" },
    ],
  },
  {
    name: "Step Plan",
    formats: [
      { format: "openai", baseUrl: "https://api.stepfun.ai/step_plan/v1" },
      { format: "anthropic", baseUrl: "https://api.stepfun.ai/step_plan" },
    ],
    modelLists: [
      { url: "https://api.stepfun.com/step_plan/v1/models", format: "openai" },
    ],
  },
  {
    name: "OpenCode Zen",
    formats: [
      { format: "openai", baseUrl: "https://opencode.ai/zen/v1" },
      { format: "openai-responses", baseUrl: "https://opencode.ai/zen/v1/responses" },
      { format: "anthropic", baseUrl: "https://opencode.ai/zen/v1/messages" },
      { format: "typesafe", baseUrl: "https://opencode.ai/zen/v1/systemone" },
    ],
    modelLists: [
      { url: "https://opencode.ai/zen/v1/models", format: "openai" },
    ],
  },
  {
    name: "OpenCode Go",
    formats: [
      { format: "openai", baseUrl: "https://opencode.ai/inference/go/openai/v1" },
      { format: "openai-responses", baseUrl: "https://opencode.ai/inference/go/openai/v1/responses" },
      { format: "anthropic", baseUrl: "https://opencode.ai/inference/go/anthropic" },
    ],
    modelLists: [
      { url: "https://opencode.ai/zen/go/v1/models", format: "openai" },
    ],
  },
];
