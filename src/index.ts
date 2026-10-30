import { providers } from "./providers";

export default {
  fetch(request: Request): Response {
    const url = new URL(request.url);

    if (url.pathname !== "/") {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method !== "GET") {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { Allow: "GET" },
      });
    }

    return new Response(JSON.stringify(providers), {
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  },
} satisfies ExportedHandler;
