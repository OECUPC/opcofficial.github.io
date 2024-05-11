import { Handlers } from "$fresh/server.ts";
import { setCookie } from "$std/http/cookie.ts";

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    const form = await req.formData();

    const headers = new Headers();
    if (form.get("password") === Deno.env.get("AuthPassword")) {
      setCookie(headers, {
        name: "auth",
        value: Deno.env.get("AuthCookieName") || "",
        maxAge: 31536000,
        sameSite: "Lax",
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/post");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      headers.set("location", "/login");
      return new Response(null, {
        status: 303,
        headers
      });
    }
  },
};