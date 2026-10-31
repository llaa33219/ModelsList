import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "deepseek-ai/deepseek-v4.1-flash",
    "name": "deepseek-ai/deepseek-v4.1-flash",
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
      "max_completion_tokens": 384000
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "none",
        "low",
        "high",
        "max"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "none",
          "low",
          "high",
          "max"
        ]
      }
    ]
  },
  {
    "id": "google/diffusiongemma-26b-a4b-it",
    "name": "google/diffusiongemma-26b-a4b-it",
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
    "context_length": 250000,
    "top_provider": {
      "max_completion_tokens": 32768
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
      }
    ]
  },
  {
    "id": "google/gemma-4-31b-it",
    "name": "google/gemma-4-31b-it",
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
    "context_length": 256000,
    "top_provider": {
      "max_completion_tokens": 16384
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
  {
    "id": "google/google-paligemma",
    "name": "google/google-paligemma",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
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
  {
    "id": "meta/llama-3.2-11b-vision-instruct",
    "name": "meta/llama-3.2-11b-vision-instruct",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
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
  {
    "id": "meta/llama-3.2-90b-vision-instruct",
    "name": "meta/llama-3.2-90b-vision-instruct",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
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
  {
    "id": "meta/llama-guard-4-12b",
    "name": "meta/llama-guard-4-12b",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 163840,
    "top_provider": {
      "max_completion_tokens": 16384
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  {
    "id": "meta/muse-glimmer-30b",
    "name": "meta/muse-glimmer-30b",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 131072,
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
          "max"
        ]
      }
    ]
  },
  {
    "id": "minimaxai/minimax-m3.1-flash",
    "name": "minimaxai/minimax-m3.1-flash",
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
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 131072
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
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
          "low",
          "medium",
          "high",
          "xhigh",
          "max"
        ]
      }
    ]
  },
  {
    "id": "nvidia/llama-3.1-nemotron-safety-guard-8b-v3",
    "name": "nvidia/llama-3.1-nemotron-safety-guard-8b-v3",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
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
  {
    "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "name": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video",
        "audio"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 256000,
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
      }
    ]
  },
  {
    "id": "nvidia/nemotron-3-ultra-550b-a55b",
    "name": "nvidia/nemotron-3-ultra-550b-a55b",
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
      "default_enabled": true,
      "supported_efforts": [
        "none",
        "medium",
        "high"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "none",
          "medium",
          "high"
        ]
      }
    ]
  },
  {
    "id": "nvidia/nemotron-3.5-content-safety",
    "name": "nvidia/nemotron-3.5-content-safety",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
    "top_provider": {
      "max_completion_tokens": 8192
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
  {
    "id": "nvidia/nemotron-3.5-lightning-30b-a3b",
    "name": "nvidia/nemotron-3.5-lightning-30b-a3b",
    "architecture": {
      "input_modalities": [
        "text"
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
  {
    "id": "nvidia/nemotron-3.5-super-vl-120b-a12b",
    "name": "nvidia/nemotron-3.5-super-vl-120b-a12b",
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
    "context_length": 1048576,
    "top_provider": {
      "max_completion_tokens": 8192
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
  {
    "id": "nvidia/nemotron-voicechat",
    "name": "nvidia/nemotron-voicechat",
    "architecture": {
      "input_modalities": [
        "text",
        "audio"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 128000,
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
  {
    "id": "openai/gpt-oss-20b",
    "name": "openai/gpt-oss-20b",
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
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "high"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "high"
        ]
      }
    ]
  },
  {
    "id": "poolside/laguna-xs-2.1",
    "name": "poolside/laguna-xs-2.1",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 16384
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  {
    "id": "stepfun-ai/step-5-preview",
    "name": "stepfun-ai/step-5-preview",
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
      "max_completion_tokens": 65536
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
      }
    ]
  },
  {
    "id": "z-ai/glm-5.3-flash",
    "name": "z-ai/glm-5.3-flash",
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
      "default_effort": null
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
  }
];
