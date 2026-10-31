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
        "format": "openai"
      }
    ]
  }
]
```

The actual response contains all records from `src/providers.ts`; the record above illustrates the response shape only.

Unknown paths return `404 Not Found`. Methods other than `GET` return `405 Method Not Allowed`.


## Model catalogs

`GET /{provider-slug}/models` returns an OpenAI-compatible model list. For example, `GET /openrouter/models` returns:

```json
{
  "object": "list",
  "data": [
    {
      "id": "openai/gpt-example",
      "object": "model",
      "created": 1700000000,
      "owned_by": "openrouter"
    }
  ]
}
```

The example model ID is illustrative. `created` is `0` when the source does not provide a timestamp, and `owned_by` is the provider slug. A source failure returns HTTP `502` with a JSON error and is not cached. Automatic responses are cached per Cloudflare data center for five minutes. models.dev entries marked `deprecated` are excluded.

Automatic catalogs use only these public sources:

| Provider | Source |
| --- | --- |
| OpenRouter | `https://openrouter.ai/api/v1/models` |
| OpenCode Zen | Only the `opencode` entry in `https://models.dev/api.json` |
| OpenCode Go | Only the `opencode-go` entry in `https://models.dev/api.json` |
| NVIDIA NIM | `https://assets.ngc.nvidia.com/products/api-catalog/featured-models.json` |

**models.dev is deliberately not used for any other provider.** The other 13 providers use static catalogs in `src/model-catalogs.ts`; these initially return `{ "object": "list", "data": [] }` until model IDs are supplied. Source adapters and OpenAI response conversion live in `src/models.ts`.

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
  }>;
}
```

- `name`: The provider's display name.
- `slug`: The stable identifier used by the model catalog endpoint.
- `formats`: One entry for each supported API compatibility format and its base URL.
- `modelLists`: Optional model-list endpoints and their compatibility formats. Multiple endpoints can be supplied for providers that support more than one format.

Standard format identifiers are `openai`, `anthropic`, `openai-responses`, `google-genai`, and `typesafe`. Other format identifiers are also accepted, so custom formats can use their own names.

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
