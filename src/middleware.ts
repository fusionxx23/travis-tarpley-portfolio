import type { MiddlewareHandler } from "astro";
import { getSession } from "auth-astro/server";

export const onRequest: MiddlewareHandler = async (
  context,
  next,
) => {
  const rootPath = context.url.pathname.split("/")[1];
  if (rootPath.toLowerCase() === "admin") {
    const session = await getSession(context.request);
    if (session?.user?.email !== import.meta.env.EMAIL) {
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
