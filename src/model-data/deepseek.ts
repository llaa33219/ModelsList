import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "deepseek-flash",
    "name": "deepseek-flash",
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
  }
];
