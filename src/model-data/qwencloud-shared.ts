import type { ModelDescriptor } from "../model-catalogs";
import { models as alibabaModels } from "./alibaba-token-plan-personal";

// QwenCloud catalogs share one descriptor map. Region/plan catalogs are ID lists
// over this map. qwen3.7-max/qwen4-max/qwen4-max-preview are imported from
// alibaba-token-plan-personal.ts — update them THERE. kimi-k2.5/k2.6/k2.7-code
// output totals follow the Alibaba Token Plan Team slim rows. When QwenCloud
// docs change a model, update the shared descriptor once; every catalog
// containing that ID picks it up.

// qwen3.7-max, qwen4-max and qwen4-max-preview are single-sourced from the
// Alibaba Token Plan Personal catalog (identical characteristics; update there).
function reuseFromAlibaba(id: string): ModelDescriptor {
  const model = alibabaModels.find((candidate) => candidate.id === id);
  if (!model) throw new Error(`Missing Alibaba Token Plan Personal model: ${id}.`);
  return model;
}

// The qwen3.5 open-source slugs and qwen3.6-27b/qwen3.6-35b-a3b/qwen3.8-27b
// publish input modalities as a single space-joined string in the source specs;
// they are recorded here as separate entries.

// Documented doc conflicts and their resolutions (reviewer-verified 2026-11):
// - glm-5.2 default effort: the Anthropic doc says max, the Responses doc says
//   high, and the OpenAI chat doc is silent -> default_effort null (no invented
//   default); sibling glm-5.2-fast-preview is null for the same reason.
// - qwen3.6-flash default ON per thinking.md; vision.md says thinking is OFF
//   for vision calls -> thinking.md wins for the general default.
// - DeepSeek thinking_budget: the DeepSeek guide lists it (393216) but the chat
//   API reference excludes DeepSeek from thinking_budget support -> no
//   budget_tokens option (API reference wins).
// - glm-5.3-prime: the price page Mode column says hybrid ("Non-Thinking and
//   Thinking modes"); the model page blurb says "three thinking levels" and the
//   chat doc says the glm-5.3 series always performs thinking -> price page Mode
//   column wins -> hybrid with a toggle.
// - qwen-plus-character region split: Singapore 131072 context; Beijing,
//   Frankfurt, Hong Kong, Tokyo and Virginia 32768 (model page region tabs).
// - qwen-plus-2024-12-20 / qwen-plus-2025-01-12 (Beijing price rows) are
//   excluded: no model pages exist, i.e. incomplete metadata per repo
//   convention.

export const qwencloudModels: Record<string, ModelDescriptor> = {
  "MiniMax-M2.5": {
    "id": "MiniMax-M2.5",
    "name": "MiniMax-M2.5",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 204800,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "ZHIPU/GLM-5.2": {
    "id": "ZHIPU/GLM-5.2",
    "name": "ZHIPU/GLM-5.2",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      }
    ]
  },
  "ZHIPU/GLM-5.3": {
    "id": "ZHIPU/GLM-5.3",
    "name": "ZHIPU/GLM-5.3",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ]
      }
    ]
  },
  "decision-model-preview": {
    "id": "decision-model-preview",
    "name": "decision-model-preview",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 65536,
    "top_provider": {
      "max_completion_tokens": 0
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "deepseek-v4-flash-0731": {
    "id": "deepseek-v4-flash-0731",
    "name": "deepseek-v4-flash-0731",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 393216
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ],
        "aliases": {
          "medium": "high",
          "xhigh": "high"
        }
      },
      {
        "type": "toggle"
      }
    ]
  },
  "deepseek-v4-pro": {
    "id": "deepseek-v4-pro",
    "name": "deepseek-v4-pro",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 393216
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "high",
        "max"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "high",
          "max"
        ],
        "aliases": {
          "low": "high",
          "medium": "high",
          "xhigh": "max"
        }
      },
      {
        "type": "toggle"
      }
    ]
  },
  "deepseek-v4-pro-0813": {
    "id": "deepseek-v4-pro-0813",
    "name": "deepseek-v4-pro-0813",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 393216
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ],
        "aliases": {
          "medium": "high",
          "xhigh": "high"
        }
      },
      {
        "type": "toggle"
      }
    ]
  },
  "deepseek-v4.1-flash": {
    "id": "deepseek-v4.1-flash",
    "name": "deepseek-v4.1-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 393216
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ],
        "aliases": {
          "minimal": "low",
          "medium": "high",
          "xhigh": "high",
          "ultra": "max"
        }
      },
      {
        "type": "toggle"
      }
    ]
  },
  "deepseek-v4.1-flash-1017": {
    "id": "deepseek-v4.1-flash-1017",
    "name": "deepseek-v4.1-flash-1017",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 393216
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ],
        "aliases": {
          "minimal": "low",
          "medium": "high",
          "xhigh": "high",
          "ultra": "max"
        }
      },
      {
        "type": "toggle"
      }
    ]
  },
  "glm-5": {
    "id": "glm-5",
    "name": "glm-5",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 202752,
    "top_provider": {
      "max_completion_tokens": 16384
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "high",
        "max"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "high",
          "max"
        ],
        "aliases": {
          "low": "high",
          "medium": "high",
          "xhigh": "max"
        }
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 32768
      }
    ]
  },
  "glm-5.1": {
    "id": "glm-5.1",
    "name": "glm-5.1",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 202745,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "none",
        "minimal",
        "low",
        "medium",
        "high",
        "xhigh"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "none",
          "minimal",
          "low",
          "medium",
          "high",
          "xhigh"
        ]
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "glm-5.2": {
    "id": "glm-5.2",
    "name": "glm-5.2",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "none",
        "minimal",
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "none",
          "minimal",
          "low",
          "medium",
          "high",
          "xhigh",
          "max"
        ]
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "glm-5.2-fast-preview": {
    "id": "glm-5.2-fast-preview",
    "name": "glm-5.2-fast-preview",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "none",
        "minimal",
        "low",
        "medium",
        "high",
        "xhigh",
        "max"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "none",
          "minimal",
          "low",
          "medium",
          "high",
          "xhigh",
          "max"
        ]
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "glm-5.3": {
    "id": "glm-5.3",
    "name": "glm-5.3",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ]
      }
    ]
  },
  "glm-5.3-prime": {
    "id": "glm-5.3-prime",
    "name": "glm-5.3-prime",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high",
        "max"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high",
          "max"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  "kimi-k2.5": {
    "id": "kimi-k2.5",
    "name": "kimi-k2.5",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 98304
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "kimi-k2.6": {
    "id": "kimi-k2.6",
    "name": "kimi-k2.6",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 262144
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "kimi-k2.7-code": {
    "id": "kimi-k2.7-code",
    "name": "kimi-k2.7-code",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 262144
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "budget_tokens"
      }
    ]
  },
  "kimi-k3": {
    "id": "kimi-k3",
    "name": "kimi-k3",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 1048576
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "max",
        "high",
        "low"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "max",
          "high",
          "low"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  "kimi-k3.1-pro": {
    "id": "kimi-k3.1-pro",
    "name": "kimi-k3.1-pro",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 1048576
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "max",
        "high",
        "medium",
        "low"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "max",
          "high",
          "medium",
          "low"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  "kimi/kimi-k3": {
    "id": "kimi/kimi-k3",
    "name": "kimi/kimi-k3",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 1048576
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "max"
      ],
      "default_effort": "max"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "max"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  "qwen-flash": {
    "id": "qwen-flash",
    "name": "qwen-flash",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen-flash-2025-07-28": {
    "id": "qwen-flash-2025-07-28",
    "name": "qwen-flash-2025-07-28",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen-flash-character": {
    "id": "qwen-flash-character",
    "name": "qwen-flash-character",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 32768,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen-max": {
    "id": "qwen-max",
    "name": "qwen-max",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 32768,
    "top_provider": {
      "max_completion_tokens": 8192
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen-plus": {
    "id": "qwen-plus",
    "name": "qwen-plus",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen-plus-2025-01-25": {
    "id": "qwen-plus-2025-01-25",
    "name": "qwen-plus-2025-01-25",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 131072,
    "top_provider": {
      "max_completion_tokens": 8192
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen-plus-2025-04-28": {
    "id": "qwen-plus-2025-04-28",
    "name": "qwen-plus-2025-04-28",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 131072,
    "top_provider": {
      "max_completion_tokens": 16384
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen-plus-2025-07-14": {
    "id": "qwen-plus-2025-07-14",
    "name": "qwen-plus-2025-07-14",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 131072,
    "top_provider": {
      "max_completion_tokens": 16384
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen-plus-2025-12-01": {
    "id": "qwen-plus-2025-12-01",
    "name": "qwen-plus-2025-12-01",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen-plus-character": {
    "id": "qwen-plus-character",
    "name": "qwen-plus-character",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 131072,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen-plus-character-ja": {
    "id": "qwen-plus-character-ja",
    "name": "qwen-plus-character-ja",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 8192,
    "top_provider": {
      "max_completion_tokens": 4096
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen-plus-latest": {
    "id": "qwen-plus-latest",
    "name": "qwen-plus-latest",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3-coder-flash": {
    "id": "qwen3-coder-flash",
    "name": "qwen3-coder-flash",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen3-coder-flash-2025-07-28": {
    "id": "qwen3-coder-flash-2025-07-28",
    "name": "qwen3-coder-flash-2025-07-28",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  "qwen3-vl-plus": {
    "id": "qwen3-vl-plus",
    "name": "qwen3-vl-plus",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 32768
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-122b-a10b": {
    "id": "qwen3.5-122b-a10b",
    "name": "qwen3.5-122b-a10b",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-27b": {
    "id": "qwen3.5-27b",
    "name": "qwen3.5-27b",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-35b-a3b": {
    "id": "qwen3.5-35b-a3b",
    "name": "qwen3.5-35b-a3b",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-397b-a17b": {
    "id": "qwen3.5-397b-a17b",
    "name": "qwen3.5-397b-a17b",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-flash": {
    "id": "qwen3.5-flash",
    "name": "qwen3.5-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-flash-2026-02-23": {
    "id": "qwen3.5-flash-2026-02-23",
    "name": "qwen3.5-flash-2026-02-23",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-plus": {
    "id": "qwen3.5-plus",
    "name": "qwen3.5-plus",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-plus-2026-02-15": {
    "id": "qwen3.5-plus-2026-02-15",
    "name": "qwen3.5-plus-2026-02-15",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.5-plus-2026-04-20": {
    "id": "qwen3.5-plus-2026-04-20",
    "name": "qwen3.5-plus-2026-04-20",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen3.6-27b": {
    "id": "qwen3.6-27b",
    "name": "qwen3.6-27b",
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens"
      }
    ]
  },
  "qwen3.6-35b-a3b": {
    "id": "qwen3.6-35b-a3b",
    "name": "qwen3.6-35b-a3b",
    "architecture": {
      "input_modalities": [
        "image",
        "text",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.6-flash": {
    "id": "qwen3.6-flash",
    "name": "qwen3.6-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.6-flash-2026-04-16": {
    "id": "qwen3.6-flash-2026-04-16",
    "name": "qwen3.6-flash-2026-04-16",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.6-plus": {
    "id": "qwen3.6-plus",
    "name": "qwen3.6-plus",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.6-plus-2026-04-02": {
    "id": "qwen3.6-plus-2026-04-02",
    "name": "qwen3.6-plus-2026-04-02",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 65536
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 81920
      }
    ]
  },
  "qwen3.7-flash": {
    "id": "qwen3.7-flash",
    "name": "qwen3.7-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.7-flash-2026-07-15": {
    "id": "qwen3.7-flash-2026-07-15",
    "name": "qwen3.7-flash-2026-07-15",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.7-max-2026-05-17": {
    "id": "qwen3.7-max-2026-05-17",
    "name": "qwen3.7-max-2026-05-17",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-max-2026-05-20": {
    "id": "qwen3.7-max-2026-05-20",
    "name": "qwen3.7-max-2026-05-20",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-max-2026-06-08": {
    "id": "qwen3.7-max-2026-06-08",
    "name": "qwen3.7-max-2026-06-08",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-max-preview": {
    "id": "qwen3.7-max-preview",
    "name": "qwen3.7-max-preview",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-plus": {
    "id": "qwen3.7-plus",
    "name": "qwen3.7-plus",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-plus-2026-05-26": {
    "id": "qwen3.7-plus-2026-05-26",
    "name": "qwen3.7-plus-2026-05-26",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.8-2.4t-a95b": {
    "id": "qwen3.8-2.4t-a95b",
    "name": "qwen3.8-2.4t-a95b",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": "xhigh"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ],
        "aliases": {
          "max": "xhigh",
          "high": "xhigh",
          "minimal": "low",
          "none": "disabled"
        }
      },
      {
        "type": "budget_tokens",
        "max": 131072
      }
    ]
  },
  "qwen3.8-27b": {
    "id": "qwen3.8-27b",
    "name": "qwen3.8-27b",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": "xhigh"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ],
        "aliases": {
          "max": "xhigh",
          "high": "xhigh",
          "minimal": "low",
          "none": "disabled"
        }
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.8-flash": {
    "id": "qwen3.8-flash",
    "name": "qwen3.8-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": "xhigh"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ],
        "aliases": {
          "max": "xhigh",
          "high": "xhigh",
          "minimal": "low",
          "none": "disabled"
        }
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.8-max": {
    "id": "qwen3.8-max",
    "name": "qwen3.8-max",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": "xhigh"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ],
        "aliases": {
          "max": "xhigh",
          "high": "xhigh",
          "minimal": "low",
          "none": "disabled"
        }
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.8-max-0902": {
    "id": "qwen3.8-max-0902",
    "name": "qwen3.8-max-0902",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": "xhigh"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ],
        "aliases": {
          "max": "xhigh",
          "high": "xhigh",
          "minimal": "low",
          "none": "disabled"
        }
      },
      {
        "type": "toggle"
      },
      {
        "type": "budget_tokens",
        "max": 262144
      }
    ]
  },
  "qwen3.7-max": reuseFromAlibaba("qwen3.7-max"),
  "qwen4-max": reuseFromAlibaba("qwen4-max"),
  "qwen4-max-preview": reuseFromAlibaba("qwen4-max-preview"),
};

// Maps QwenCloud model IDs to their shared descriptors, applies per-region
// overrides, and returns the catalog sorted by model ID.
export function qwencloudCatalog(
  ids: string[],
  overrides: Record<string, Partial<ModelDescriptor>> = {},
): ModelDescriptor[] {
  return ids
    .map((id) => {
      const model = qwencloudModels[id];
      if (!model) throw new Error(`Unknown QwenCloud model ID: ${id}.`);
      const override = overrides[id];
      return override ? { ...model, ...override } : model;
    })
    .sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
}
