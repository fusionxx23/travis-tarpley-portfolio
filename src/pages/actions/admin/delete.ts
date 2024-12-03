import { deleteBlog, getBlogFromId } from "@/libs/blogs";
import { deleteBlogFiles } from "@/libs/s3";
import type { APIRoute } from "astro";
import z from "zod";
export const prerender = false;
export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const id = z.string().parse(formData.get("id") as string);
  if (id) {
    try {
      const blog = await getBlogFromId({
        id: parseInt(id),
      });
      if (!blog.imageKey) {
        return new Response("", { status: 404 });
      }
      const imageKey = blog.imageKey;
      await deleteBlog(parseInt(id));
      await deleteBlogFiles({
        key: imageKey,
      });
    } catch (e) {
      console.log("here");
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
