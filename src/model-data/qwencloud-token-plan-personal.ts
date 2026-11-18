import type { ModelDescriptor } from "../model-catalogs";
import { qwencloudCatalog } from "./qwencloud-shared";

// QwenCloud Token Plan Personal (Singapore) model catalog. Membership per the
// Token Plan personal plan overview page.
// Descriptors live in qwencloud-shared.ts; see its maintenance notes.
const regionModels = [
  "deepseek-v4-flash-0731",
  "deepseek-v4-pro",
  "deepseek-v4-pro-0813",
  "deepseek-v4.1-flash",
  "deepseek-v4.1-flash-1017",
  "glm-5.2",
  "glm-5.3",
  "qwen3.6-flash",
  "qwen3.7-max",
  "qwen3.7-plus",
  "qwen3.8-flash",
  "qwen3.8-max",
  "qwen4-max",
  "qwen4-max-preview",
];

export const models: ModelDescriptor[] = qwencloudCatalog(regionModels);
