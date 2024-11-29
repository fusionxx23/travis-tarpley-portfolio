import type { MiddlewareHandler } from "astro";
import { getSession } from "auth-astro/server";

export const onRequest: MiddlewareHandler = async (
  context,
  next,
) => {
  const paths = context.url.pathname.split("/");
  const rootPath = paths[1];
  const isAdminAction =
    rootPath.toLowerCase() === "action" &&
    paths[2].toLowerCase() === "admin";

  if (rootPath.toLowerCase() === "admin" || isAdminAction) {
    const session = await getSession(context.request);
    if (session?.user?.email === import.meta.env.EMAIL) {
      return next();
    } else {
      return new Response(null, {
        status: 307,
        headers: { Location: "/" },
      });
    }
  }
  return next();
};
