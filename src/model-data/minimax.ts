import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "MiniMax-M3",
    "name": "MiniMax-M3",
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
    "id": "MiniMax-M3.1-Flash",
    "name": "MiniMax-M3.1-Flash",
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
  }
];
