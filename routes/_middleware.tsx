import { FreshContext } from "$fresh/server.ts";
import { getCookies } from "$std/http/cookie.ts";

const includePaths = [
    "/post"
];

export async function handler(
  req: Request,
  ctx: FreshContext,
) {
  const url = new URL(req.url);

  // 指定URL以外の除外 & コンテンツ以外除外
  if (
    !includePaths.includes(url.pathname) ||
    url.pathname.includes(".")
  ) return await ctx.next();

  const cookies = getCookies(req.headers);
  const isAllowed = cookies.auth === Deno.env.get("AuthCookieName");

  if (!isAllowed) {
    const headers = new Headers();
    headers.set("location", "/login");
    return new Response(null, { status: 303, headers });
  }

  return await ctx.next();
}