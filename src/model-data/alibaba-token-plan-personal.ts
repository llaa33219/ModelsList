import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
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
      "max_completion_tokens": 384000
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
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
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
      "max_completion_tokens": 384000
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
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
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
      "max_completion_tokens": 384000
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
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
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
      "max_completion_tokens": 384000
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
  {
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
      "max_completion_tokens": 384000
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
  {
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
    "context_length": 1000000,
    "top_provider": {
      "max_completion_tokens": 131072
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
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
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
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
    "id": "qwen3.6-flash",
    "name": "qwen3.6-flash",
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
  {
    "id": "qwen3.7-max",
    "name": "qwen3.7-max",
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
        "type": "budget_tokens"
      }
    ]
  },
  {
    "id": "qwen3.7-plus",
    "name": "qwen3.7-plus",
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
  {
    "id": "qwen3.8-flash",
    "name": "qwen3.8-flash",
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
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  },
  {
    "id": "qwen3.8-max",
    "name": "qwen3.8-max",
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
      "mandatory": false,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "medium",
        "xhigh"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "medium",
          "xhigh"
        ]
      },
      {
        "type": "toggle"
      }
    ]
  }
];
