import type { MiddlewareHandler } from "astro";
import { getSession } from "auth-astro/server";

export const onRequest: MiddlewareHandler = async (
  context,
  next,
) => {
  const paths = context.url.pathname.split("/");
  const rootPath = paths[1];

  if (rootPath.toLowerCase() === "admin") {
    const session = await getSession(context.request);
    if (session?.user?.email === import.meta.env.EMAIL) {
      return next();
    }
    return new Response(null, {
      status: 307,
      headers: { Location: "/" },
    });
  }
  if (rootPath.toLowerCase() === "login") {
    const session = await getSession(context.request);
    if (session?.user?.email === import.meta.env.EMAIL) {
      return new Response(null, {
        status: 307,
        headers: { Location: "/admin" },
      });
    }
    return next();
  }
  return next();
};
