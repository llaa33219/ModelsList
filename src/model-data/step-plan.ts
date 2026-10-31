import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "step-3.5-flash",
    "name": "step-3.5-flash",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 256000,
    "top_provider": {
      "max_completion_tokens": 256000
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high"
        ]
      }
    ]
  },
  {
    "id": "step-3.5-flash-2603",
    "name": "step-3.5-flash-2603",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 256000,
    "top_provider": {
      "max_completion_tokens": 256000
    },
    "reasoning": {
      "mandatory": true,
      "default_enabled": true,
      "supported_efforts": [
        "low",
        "high"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "low",
          "high"
        ]
      }
    ]
  },
  {
    "id": "step-3.7-flash",
    "name": "step-3.7-flash",
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
      "max_completion_tokens": 256000
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
    "id": "step-5-preview",
    "name": "step-5-preview",
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
    "id": "step-router-v1",
    "name": "step-router-v1",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 256000,
    "top_provider": {
      "max_completion_tokens": 256000
    },
    "reasoning": {
      "mandatory": false,
      "default_enabled": false,
      "supported_efforts": [],
      "default_effort": null
    },
    "reasoning_options": []
  }
];
