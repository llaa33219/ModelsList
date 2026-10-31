# AI Provider Directory

A minimal Cloudflare Worker that returns a hard-coded list of AI providers as JSON. There is no database, external API request, or HTML interface.

The directory currently contains 17 hard-coded providers. The Worker does not contact those providers; it only returns their configured metadata.

## Production

The provider directory is available at **https://modelslist.blp.sh/**. The source repository is **https://github.com/llaa33219/ModelsList**.

## API

`GET /` returns the provider array directly, without a wrapper object:

```json
[
  {
    "name": "Example Provider",
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

## Provider data

Edit `src/providers.ts` to add records to the `providers` array. Each record has this shape:

```ts
{
  name: string;
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
