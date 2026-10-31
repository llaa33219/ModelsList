import type { ModelDescriptor } from "../model-catalogs";

export const models: ModelDescriptor[] = [
  {
    "id": "glm-4.5",
    "name": "glm-4.5",
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
      "max_completion_tokens": 98304
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
    "id": "glm-4.5-air",
    "name": "glm-4.5-air",
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
      "max_completion_tokens": 98304
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
    "id": "glm-4.5-flash",
    "name": "glm-4.5-flash",
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
      "max_completion_tokens": 98304
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
    "id": "glm-4.5v",
    "name": "glm-4.5v",
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
    "context_length": 64000,
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
    "id": "glm-4.6",
    "name": "glm-4.6",
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
    "id": "glm-4.6v",
    "name": "glm-4.6v",
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
    "context_length": 128000,
    "top_provider": {
      "max_completion_tokens": 32768
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
    "id": "glm-4.6v-flash",
    "name": "glm-4.6v-flash",
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
    "context_length": 128000,
    "top_provider": {
      "max_completion_tokens": 32768
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
    "id": "glm-4.7",
    "name": "glm-4.7",
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
    "id": "glm-4.7-flash",
    "name": "glm-4.7-flash",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 200000,
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
    "id": "glm-4.7-flashx",
    "name": "glm-4.7-flashx",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 200000,
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
    "context_length": 204800,
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
    "id": "glm-5-turbo",
    "name": "glm-5-turbo",
    "architecture": {
      "input_modalities": [
        "text"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 200000,
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
    "context_length": 200000,
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
        "max",
        "xhigh",
        "high",
        "medium",
        "low",
        "minimal",
        "none"
      ],
      "default_effort": null
    },
    "reasoning_options": [
      {
        "type": "effort",
        "values": [
          "max",
          "xhigh",
          "high",
          "medium",
          "low",
          "minimal",
          "none"
        ],
        "aliases": {
          "none": "disabled",
          "minimal": "disabled",
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
  {
    "id": "glm-5.3-flash",
    "name": "glm-5.3-flash",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video",
        "pdf"
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
  {
    "id": "glm-5.3-flashx",
    "name": "glm-5.3-flashx",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video",
        "pdf"
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
  {
    "id": "glm-5v-turbo",
    "name": "glm-5v-turbo",
    "architecture": {
      "input_modalities": [
        "text",
        "image",
        "video",
        "pdf"
      ],
      "output_modalities": [
        "text"
      ]
    },
    "context_length": 200000,
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
