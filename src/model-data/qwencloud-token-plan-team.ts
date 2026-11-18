import type { ModelDescriptor } from "../model-catalogs";
import { qwencloudCatalog } from "./qwencloud-shared";

// QwenCloud Token Plan Team (Singapore) model catalog. Membership per the
// Token Plan team plan overview page.
// Descriptors live in qwencloud-shared.ts; see its maintenance notes.
const regionModels = [
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
];

export const models: ModelDescriptor[] = qwencloudCatalog(regionModels);
