import type { ModelDescriptor } from "../model-catalogs";
import { qwencloudCatalog } from "./qwencloud-shared";

// QwenCloud pay-as-you-go Frankfurt region catalog. Membership per the
// model-prices page Germany (Frankfurt) region tab.
// Descriptors live in qwencloud-shared.ts; see its maintenance notes.
const regionModels = [
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
];

// qwen-plus-character runs with a reduced context window (32768) outside
// Singapore; the shared descriptor keeps the Singapore value (131072).
const regionOverrides: Record<string, Partial<ModelDescriptor>> = {
  "qwen-plus-character": { context_length: 32768 },
};

export const models: ModelDescriptor[] = qwencloudCatalog(regionModels, regionOverrides);
