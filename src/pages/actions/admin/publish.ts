import { publishBlogFromId } from "@/libs/blogs";
import type { APIRoute } from "astro";
import z from "zod";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const id = z.string().parse(formData.get("id") as string);
  if (id) {
    try {
      publishBlogFromId({ id: Number.parseInt(id) });
    } catch (e) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  } else {
    return new Response("", { status: 404 });
  }

  return new Response("Success", {
    status: 302,
    headers: { Location: "/admin" },
  });
};
