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
  source: "official" | "modelslist";
}

export interface Provider {
  name: string;
  slug: string;
  formats: ProviderFormat[];
  modelLists?: ModelListEndpoint[];
}

type ProviderEndpoint = Omit<Provider, "modelLists"> & {
  modelLists?: Array<Omit<ModelListEndpoint, "source">>;
};

const providerEndpoints: readonly ProviderEndpoint[] = [
  {
    name: "MiniMax",
    slug: "minimax",
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
    slug: "zai-coding-plan",
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
    slug: "kimi-code-plan",
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
    slug: "zai",
    formats: [
      { format: "openai", baseUrl: "https://api.z.ai/api/paas/v4" },
    ],
    modelLists: [
      { url: "https://api.z.ai/api/paas/v4/models", format: "openai" },
    ],
  },
  {
    name: "Kimi",
    slug: "kimi",
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
    slug: "xiaomi-token-plan-sgp",
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
    slug: "xiaomi-mimo",
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
    slug: "openrouter",
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
    slug: "deepseek",
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
    slug: "alibaba-token-plan-personal",
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
    slug: "stepfun",
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
    slug: "step-plan",
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
    slug: "opencode-zen",
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
    slug: "opencode-go",
    formats: [
      { format: "openai", baseUrl: "https://opencode.ai/inference/go/openai/v1" },
      { format: "openai-responses", baseUrl: "https://opencode.ai/inference/go/openai/v1/responses" },
      { format: "anthropic", baseUrl: "https://opencode.ai/inference/go/anthropic" },
    ],
    modelLists: [
      { url: "https://opencode.ai/zen/go/v1/models", format: "openai" },
    ],
  },
  {
    name: "LongCat",
    slug: "longcat",
    formats: [
      { format: "openai", baseUrl: "https://api.longcat.ai/openai/v1" },
      { format: "openai-responses", baseUrl: "https://api.longcat.ai/openai/v1/responses" },
      { format: "anthropic", baseUrl: "https://api.longcat.ai/anthropic" },
    ],
    modelLists: [
      { url: "https://api.longcat.ai/openai/v1/models", format: "openai" },
    ],
  },
  {
    name: "Krafton Raon",
    slug: "krafton-raon",
    formats: [
      { format: "openai", baseUrl: "https://raon-api.krafton.ai/v1" },
      { format: "openai-responses", baseUrl: "https://raon-api.krafton.ai/v1/responses" },
      { format: "anthropic", baseUrl: "https://raon-api.krafton.ai" },
    ],
    modelLists: [
      { url: "https://raon-api.krafton.ai/v1/models", format: "openai" },
    ],
  },
  {
    name: "NVIDIA NIM",
    slug: "nvidia-nim",
    formats: [
      { format: "openai", baseUrl: "https://integrate.api.nvidia.com/v1" },
      { format: "openai-responses", baseUrl: "https://integrate.api.nvidia.com/v1/responses" },
    ],
    modelLists: [
      { url: "https://integrate.api.nvidia.com/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Token Plan Personal (Singapore)",
    slug: "qwencloud-token-plan-personal",
    formats: [
      { format: "openai", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://token-plan.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
      { url: "https://token-plan.maas.qwencloudapi.com/apps/anthropic/v1/models", format: "anthropic" },
    ],
  },
  {
    // Same endpoint as the Personal plan; the plan is identified by the API key.
    name: "QwenCloud Token Plan Team (Singapore)",
    slug: "qwencloud-token-plan-team",
    formats: [
      { format: "openai", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://token-plan.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://token-plan.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
      { url: "https://token-plan.maas.qwencloudapi.com/apps/anthropic/v1/models", format: "anthropic" },
    ],
  },
  {
    // The typesafe format is exposed only in the two decision-model regions
    // (Singapore and Beijing). The payg anthropic endpoints expose no
    // /v1/models (verified 404), so only the OpenAI-compatible list is used.
    name: "QwenCloud Pay-as-you-go (Singapore)",
    slug: "qwencloud-payg-ap-southeast-1",
    formats: [
      { format: "openai", baseUrl: "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://ap-southeast-1.maas.qwencloudapi.com/apps/anthropic" },
      { format: "typesafe", baseUrl: "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1/systemone" },
    ],
    modelLists: [
      { url: "https://ap-southeast-1.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Pay-as-you-go (Beijing)",
    slug: "qwencloud-payg-cn-beijing",
    formats: [
      { format: "openai", baseUrl: "https://cn-beijing.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://cn-beijing.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://cn-beijing.maas.qwencloudapi.com/apps/anthropic" },
      { format: "typesafe", baseUrl: "https://cn-beijing.maas.qwencloudapi.com/compatible-mode/v1/systemone" },
    ],
    modelLists: [
      { url: "https://cn-beijing.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Pay-as-you-go (Frankfurt)",
    slug: "qwencloud-payg-eu-central-1",
    formats: [
      { format: "openai", baseUrl: "https://eu-central-1.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://eu-central-1.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://eu-central-1.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://eu-central-1.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Pay-as-you-go (Hong Kong)",
    slug: "qwencloud-payg-cn-hongkong",
    formats: [
      { format: "openai", baseUrl: "https://cn-hongkong.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://cn-hongkong.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://cn-hongkong.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://cn-hongkong.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Pay-as-you-go (Tokyo)",
    slug: "qwencloud-payg-ap-northeast-1",
    formats: [
      { format: "openai", baseUrl: "https://ap-northeast-1.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://ap-northeast-1.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://ap-northeast-1.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://ap-northeast-1.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
  {
    name: "QwenCloud Pay-as-you-go (Virginia)",
    slug: "qwencloud-payg-us-east-1",
    formats: [
      { format: "openai", baseUrl: "https://us-east-1.maas.qwencloudapi.com/compatible-mode/v1" },
      { format: "openai-responses", baseUrl: "https://us-east-1.maas.qwencloudapi.com/compatible-mode/v1/responses" },
      { format: "anthropic", baseUrl: "https://us-east-1.maas.qwencloudapi.com/apps/anthropic" },
    ],
    modelLists: [
      { url: "https://us-east-1.maas.qwencloudapi.com/compatible-mode/v1/models", format: "openai" },
    ],
  },
];

// ModelsList-curated endpoints use OpenAI-compatible envelopes with additional
// model metadata. Keep the original provider endpoints alongside them.
export const providers: readonly Provider[] = providerEndpoints.map((provider) => ({
  ...provider,
  modelLists: [
    ...(provider.modelLists ?? []).map((endpoint) => ({
      ...endpoint,
      source: "official" as const,
    })),
    {
      url: `https://modelslist.blp.sh/${provider.slug}/models`,
      format: "openai",
      source: "modelslist" as const,
    },
  ],
}));
