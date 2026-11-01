import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "deepseek-ai/deepseek-v4.1-flash",
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
    "context_length": 1048576,
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
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "toggle"
      },
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
  {
    "id": "google/diffusiongemma-26b-a4b-it",
    "name": "diffusiongemma-26b-a4b-it",
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
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  {
    "id": "google/gemma-4-31b-it",
    "name": "gemma-4-31b-it",
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
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  {
    "id": "meta/llama-3.2-11b-vision-instruct",
    "name": "llama-3.2-11b-vision-instruct",
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
    "name": "llama-3.2-90b-vision-instruct",
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
    "name": "llama-guard-4-12b",
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
    "name": "muse-glimmer-30b",
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
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "high",
        "xhigh"
      ],
      "default_effort": "high"
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "high",
          "xhigh"
        ],
        "parameter": "reasoning_strength",
        "aliases": {
          "low": "low",
          "medium": "medium",
          "high": "high",
          "xhigh": "xhigh"
        }
      }
    ]
  },
  {
    "id": "minimaxai/minimax-m3.1-flash",
    "name": "minimax-m3.1-flash",
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
      "max_completion_tokens": 524288
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
      "default_effort": "max"
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
    "id": "mistralai/mistral-large-4-1t-a52b",
    "name": "Mistral Large 4",
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
      "max_completion_tokens": 262144
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
    "id": "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning",
    "name": "nemotron-3-nano-omni-30b-a3b-reasoning",
    "architecture": {
      "input_modalities": [
        "video",
        "audio",
        "image",
        "text"
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
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  },
  {
    "id": "nvidia/nemotron-3-super-120b-a12b",
    "name": "nemotron-3-super-120b-a12b",
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
      "max_completion_tokens": 1048576
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
    "id": "nvidia/nemotron-3-ultra-550b-a55b",
    "name": "nemotron-3-ultra-550b-a55b",
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
      "max_completion_tokens": 1048576
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
    "id": "nvidia/nemotron-3.5-content-safety",
    "name": "nemotron-3.5-content-safety",
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
      "max_completion_tokens": 8192
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
    "id": "nvidia/nemotron-3.5-lightning-30b-a3b",
    "name": "nemotron-3.5-lightning-30b-a3b",
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
      "max_completion_tokens": 1048576
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
    "id": "nvidia/nemotron-3.5-super-vl-120b-a12b",
    "name": "nemotron-3.5-super-vl-120b-a12b",
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
      "max_completion_tokens": 1048576
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
    "id": "openai/gpt-oss-20b",
    "name": "gpt-oss-20b",
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
    "name": "laguna-xs-2.1",
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
  {
    "id": "stepfun-ai/step-5-preview",
    "name": "Step 5 Preview",
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
      "max_completion_tokens": 65536
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
  }
];
