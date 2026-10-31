import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "mimo-v2.6-flash",
    "name": "mimo-v2.6-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "audio",
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
    "id": "mimo-v2.6-pro",
    "name": "mimo-v2.6-pro",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "audio",
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
    "id": "mimo-v2.6-pro-ultraspeed",
    "name": "mimo-v2.6-pro-ultraspeed",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "audio",
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
  }
];
