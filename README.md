# AI Provider Directory

A minimal Cloudflare Worker that returns a hard-coded list of AI providers and OpenAI-compatible model catalogs. There is no database or HTML interface. Provider metadata requests are local; automatic model catalogs fetch their designated public upstream sources.

The directory currently contains 17 hard-coded providers. The Worker does not contact those providers when returning their configured metadata.

## Production

The provider directory is available at **https://modelslist.blp.sh/**. The source repository is **https://github.com/llaa33219/ModelsList**.

## API

`GET /` returns the provider array directly, without a wrapper object:

```json
[
  {
    "name": "Example Provider",
    "slug": "example-provider",
    "formats": [
      {
        "format": "openai",
        "baseUrl": "https://api.example.com/v1"
      }
    ],
    "modelLists": [
      {
        "url": "https://api.example.com/v1/models",
        "format": "openai",
        "source": "official"
      },
      {
        "url": "https://modelslist.blp.sh/example-provider/models",
        "format": "openai",
        "source": "modelslist"
      }
    ]
  }
]
```

The actual response contains all records from `src/providers.ts`; the record above illustrates the response shape only. Entries with `source: "modelslist"` are **ModelsList-curated endpoints**, not official provider APIs. They use `format: "openai"` with additional curated model metadata. Entries with `source: "official"` are official provider endpoints and retain their original compatibility formats.

Unknown paths return `404 Not Found`. Methods other than `GET` return `405 Method Not Allowed`.

## Model catalogs

`GET /{provider-slug}/models` returns an OpenAI-compatible model list enriched with the metadata needed to select and call a model. Every returned model has these fields:

- `id` and `name`: Model identifier and display name.
- `architecture.input_modalities` and `architecture.output_modalities`: Multimodal input and output support.
- `context_length`: Context window in tokens.
- `top_provider.max_completion_tokens`: Maximum output tokens, or `null` when unknown.
- `reasoning`: `mandatory`, `default_enabled`, `supported_efforts`, and `default_effort`. A model without reasoning options has `supported_efforts: []` and `default_effort: null`.
- `reasoning_options`: Reasoning controls including effort values, toggles, and token budgets. OpenCode options are preserved from its source; OpenRouter entries use an empty array because its API provides normalized reasoning settings instead. An effort option may specify `parameter: "reasoning_strength"` instead of the default `reasoning_effort`, plus provider-specific effort aliases.

```json
{
  "object": "list",
  "data": [
    {
      "id": "example/model",
      "name": "Example Model",
      "architecture": {
        "input_modalities": ["text", "image"],
        "output_modalities": ["text"]
      },
      "context_length": 128000,
      "top_provider": { "max_completion_tokens": 16384 },
      "reasoning": {
        "mandatory": false,
        "default_enabled": true,
        "supported_efforts": ["low", "high"],
        "default_effort": "high"
      },
      "reasoning_options": [],
      "object": "model",
      "created": 1700000000,
      "owned_by": "openrouter"
    }
  ]
}
```

This example is illustrative, not a real model record. A source failure returns HTTP `502` with a JSON error and is not cached. Automatic responses are cached per Cloudflare data center for five minutes.

Only three catalogs are automatic:

| Provider | Source |
| --- | --- |
| OpenRouter | `https://openrouter.ai/api/v1/models` |
| OpenCode Zen | Only the `opencode` entry in `https://models.dev/api.json`, excluding deprecated models |
| OpenCode Go | Only the `opencode-go` entry in `https://models.dev/api.json`, excluding deprecated models |

**models.dev is deliberately not used for any other provider.** NVIDIA NIM does not use the featured-model marketing asset. Its static catalog uses the dedicated `nvidia_nim_chat_models.json` source instead. It and the other 13 providers use static/manual catalogs split into provider-specific files under `src/model-data/`.

The static catalogs are built from `provider_models_slim.json`, which contains 201 source rows. Only rows marked `사용 가능` with complete, recognized metadata are included: 84 models across 14 providers. Records marked unsupported, deprecated, scheduled for retirement, indirectly auto-routed, needing verification, or containing `미확인`/`미공개` metadata are excluded. Source-only groups without registered provider endpoints, MiniMax Token Plan and Alibaba Token Plan Team, are not silently assigned to other providers.

NIM includes 18 currently served chat models with complete context, output, modality, and reasoning metadata from its dedicated source; unknown, unserved, and retired NIM records are excluded. Its `model_name` field supplies display names. Each static file exports `ModelDescriptor[]` from `src/model-data/<provider-slug>.ts`. For the other 13 providers, the model ID is used as the display name because `provider_models_slim.json` has no separate display-name field; output modality is `text` for these text LLM records. Explicit reasoning efforts, on/off toggles, token budgets, mandatory/default behavior, and documented effort aliases are preserved without inventing unknown defaults. Kimi and Kimi Code Plan model IDs remove any leading `kimi-` used in the source, including `for-coding` and `for-coding-highspeed`. The source file remains unchanged for auditing and future imports.

## Provider data

Edit `src/providers.ts` to add records to the `providers` array. Each record has this shape:

```ts
{
  name: string;
  slug: string;
  formats: Array<{
    format: string;
    baseUrl: string;
  }>;
  modelLists?: Array<{
    url: string;
    format: string;
    source: "official" | "modelslist";
  }>;
}
```

- `name`: The provider's display name.
- `slug`: The stable identifier used by the model catalog endpoint.
- `formats`: One entry for each supported API compatibility format and its base URL.
- `modelLists`: Optional model-list endpoints with compatibility format and provenance. `source` distinguishes `official` provider URLs from ModelsList-curated URLs; it does not change the wire format. Multiple endpoints can be supplied for providers that support more than one format.

Standard provider format identifiers are `openai`, `anthropic`, `openai-responses`, `google-genai`, and `typesafe`. ModelsList-curated endpoints also use `openai`; their separate `source` field identifies their provenance. Other format identifiers are accepted for custom provider formats.

## Local development

Requirements: Node.js 22 or later and npm.

```sh
npm install
npm run dev
```

Open `http://localhost:8787/` to read the JSON response.

## Verification

```sh
npm run check
```

This runs TypeScript type checking and endpoint tests in the Cloudflare Workers Vitest environment.

## Deployment

Authenticate Wrangler with the Cloudflare account that will own the Worker, then deploy:

```sh
npx wrangler login
npm run deploy
```
