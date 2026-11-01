import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "adept/fuyu-8b",
    "name": "fuyu-8b",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 16384,
    "top_provider": {
      "max_completion_tokens": 1024,
      "nim_endpoint_max_tokens": 1024,
      "nim_endpoint_max_tokens_default": 1024
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
      "max_completion_tokens": 1048576,
      "nim_endpoint_max_tokens": 1048576,
      "nim_endpoint_max_tokens_default": 262144
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "35",
        "36",
        "37",
        "38",
        "39",
        "40",
        "41",
        "42",
        "43",
        "44",
        "45",
        "46",
        "47",
        "48",
        "49",
        "50",
        "51",
        "52",
        "53",
        "54",
        "55",
        "56",
        "57",
        "58",
        "59",
        "60",
        "61",
        "62",
        "63",
        "64",
        "65",
        "66",
        "67",
        "68",
        "69",
        "70",
        "71",
        "72",
        "73",
        "74",
        "75",
        "76",
        "77",
        "78",
        "79",
        "80",
        "81",
        "82",
        "83",
        "84",
        "85",
        "86",
        "87",
        "88",
        "89",
        "90",
        "91",
        "92",
        "93",
        "94",
        "95",
        "96",
        "97",
        "98",
        "99",
        "100"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30",
          "31",
          "32",
          "33",
          "34",
          "35",
          "36",
          "37",
          "38",
          "39",
          "40",
          "41",
          "42",
          "43",
          "44",
          "45",
          "46",
          "47",
          "48",
          "49",
          "50",
          "51",
          "52",
          "53",
          "54",
          "55",
          "56",
          "57",
          "58",
          "59",
          "60",
          "61",
          "62",
          "63",
          "64",
          "65",
          "66",
          "67",
          "68",
          "69",
          "70",
          "71",
          "72",
          "73",
          "74",
          "75",
          "76",
          "77",
          "78",
          "79",
          "80",
          "81",
          "82",
          "83",
          "84",
          "85",
          "86",
          "87",
          "88",
          "89",
          "90",
          "91",
          "92",
          "93",
          "94",
          "95",
          "96",
          "97",
          "98",
          "99",
          "100"
        ],
        "numeric": {
          "min": 1,
          "max": 100
        }
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
      "max_completion_tokens": 32768,
      "nim_endpoint_max_tokens": 32768,
      "nim_endpoint_max_tokens_default": 4096
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
      "max_completion_tokens": 262144,
      "nim_endpoint_max_tokens": null,
      "nim_endpoint_max_tokens_default": null
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
      "max_completion_tokens": 8192,
      "nim_endpoint_max_tokens": 8192,
      "nim_endpoint_max_tokens_default": 512
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
      "max_completion_tokens": 8192,
      "nim_endpoint_max_tokens": 8192,
      "nim_endpoint_max_tokens_default": 512
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
      "max_completion_tokens": 30,
      "nim_endpoint_max_tokens": 30,
      "nim_endpoint_max_tokens_default": 5
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
      "max_completion_tokens": 16384,
      "nim_endpoint_max_tokens": 16384,
      "nim_endpoint_max_tokens_default": 8192
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
    "id": "microsoft/phi-3-vision-128k-instruct",
    "name": "phi-3-vision-128k-instruct",
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
      "max_completion_tokens": 2048,
      "nim_endpoint_max_tokens": 2048,
      "nim_endpoint_max_tokens_default": 1024
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
      "max_completion_tokens": 65536,
      "nim_endpoint_max_tokens": 65536,
      "nim_endpoint_max_tokens_default": 16384
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
      "max_completion_tokens": 262144,
      "nim_endpoint_max_tokens": 262144,
      "nim_endpoint_max_tokens_default": 4096
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
    "id": "nvidia/ising-calibration-1.5-31b",
    "name": "ising-calibration-1.5-31b",
    "architecture": {
      "input_modalities": [
        "text",
        "image"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 262144,
    "top_provider": {
      "max_completion_tokens": 32768,
      "nim_endpoint_max_tokens": 32768,
      "nim_endpoint_max_tokens_default": 32768
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
      "max_completion_tokens": 65536,
      "nim_endpoint_max_tokens": 65536,
      "nim_endpoint_max_tokens_default": 65536
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
      "max_completion_tokens": 1048576,
      "nim_endpoint_max_tokens": null,
      "nim_endpoint_max_tokens_default": null
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
      "max_completion_tokens": 32768,
      "nim_endpoint_max_tokens": 32768,
      "nim_endpoint_max_tokens_default": 16384
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
    "id": "nvidia/nemotron-3.5-bolt-e4b",
    "name": "Nemotron 3.5 Bolt E4B",
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
      "max_completion_tokens": 65536,
      "nim_endpoint_max_tokens": 65536,
      "nim_endpoint_max_tokens_default": 1024
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
      "max_completion_tokens": 4096,
      "nim_endpoint_max_tokens": 4096,
      "nim_endpoint_max_tokens_default": 512
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
      "max_completion_tokens": 32768,
      "nim_endpoint_max_tokens": 32768,
      "nim_endpoint_max_tokens_default": 16384
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
      "max_completion_tokens": 131072,
      "nim_endpoint_max_tokens": 131072,
      "nim_endpoint_max_tokens_default": 16384
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
    "id": "nvidia/nemotron-parse-2.0",
    "name": "nemotron-parse-2.0",
    "architecture": {
      "input_modalities": [
        "image",
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 9000,
    "top_provider": {
      "max_completion_tokens": 8192,
      "nim_endpoint_max_tokens": 8192,
      "nim_endpoint_max_tokens_default": 3500
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
    "context_length": 128000,
    "top_provider": {
      "max_completion_tokens": 4096,
      "nim_endpoint_max_tokens": 4096,
      "nim_endpoint_max_tokens_default": 4096
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
      "max_completion_tokens": 16384,
      "nim_endpoint_max_tokens": 16384,
      "nim_endpoint_max_tokens_default": 8192
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
      "max_completion_tokens": 1048576,
      "nim_endpoint_max_tokens": 1048576,
      "nim_endpoint_max_tokens_default": 4096
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
    "id": "z-ai/glm-5.3-flash",
    "name": "glm-5.3-flash",
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
      "max_completion_tokens": 1048576,
      "nim_endpoint_max_tokens": null,
      "nim_endpoint_max_tokens_default": null
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
  }
];
