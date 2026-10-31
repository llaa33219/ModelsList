import { modelCatalogs } from "./model-catalogs";
import { getModelsResponse } from "./models";
import { providers } from "./providers";

function jsonError(status: number, message: string): Response {
  return Response.json(
    { error: { message, type: "invalid_request_error" } },
    { status },
  );
}

export default {
  async fetch(request: Request): Promise<Response> {
    if (request.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET" },
      });
    }

    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new Response(JSON.stringify(providers), {
        headers: { "Content-Type": "application/json; charset=utf-8" },
      });
    }

    const match = /^\/([^/]+)\/models\/?$/.exec(url.pathname);
    if (match) {
      const provider = providers.find(({ slug }) => slug === match[1]);
      if (!provider) return jsonError(404, "Provider not found.");
      const catalog = modelCatalogs[provider.slug];
      if (!catalog) return jsonError(404, "Model catalog not found.");
      return getModelsResponse(request, catalog, provider.slug);
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler;
