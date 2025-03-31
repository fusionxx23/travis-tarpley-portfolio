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
    // check if session exists
    const email = session?.user?.email;
    if (email) {
      if (email === import.meta.env.EMAIL) {
        return next();
      } else {
        // Imposter is trying to login
        // Redirect to homepage
        return new Response(null, {
          status: 303,
          headers: { Location: "/" },
        });
      }
    }
    // Session not found
    return new Response(null, {
      status: 303,
      headers: { Location: "/login" },
    });
  }
  if (rootPath.toLowerCase() === "login") {
    const session = await getSession(context.request);
    if (session?.user?.email === import.meta.env.EMAIL) {
      return new Response(null, {
        status: 303,
        headers: { Location: "/admin" },
      });
    }
    return next();
  }
  return next();
};
