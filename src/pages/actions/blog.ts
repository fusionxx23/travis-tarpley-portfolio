import type { APIRoute } from "astro";
import { uploadImageFile } from "../../libs/s3";
import { getSession } from "auth-astro/server";
import { createBlog, deleteBlog } from "../../libs/blogs";
import { createSlug } from "../../libs/utils";
import z from "zod";
export const prerender = false;
export const DELETE: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const formData = await request.formData();
  console.log(formData);
  const id = z.string().parse(formData.get("id") as string);
  console.log("DELETING BLOG", id);
  if (!session?.user) {
    return new Response("", { status: 403 });
  }
  if (id) {
    try {
      const resp = await deleteBlog(parseInt(id));
      console.log(resp.rows);
    } catch (e) {
      console.error(e);
      return new Response("", { status: 500 });
    }
  } else {
    return new Response("", { status: 404 });
  }

  return new Response("Success", { status: 200 });
};

export const POST: APIRoute = async ({ request }) => {
  if (import.meta.env.MODE !== "development") {
    return new Response("Uploader not available", {
      status: 404,
    });
  }
  const session = await getSession(request);
  if (!session?.user) {
    return new Response("", { status: 403 });
  }
  const formData = await request.formData();

  const data = {
    file: formData.get("file") as File,
    blog: formData.get("blog") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
  };
  if (!data.file) throw new Error("No file provided");
  if (!data.blog) throw new Error("No Blog provided");
  const file = Buffer.from(await data.file.arrayBuffer());
  let imageKey = "";
  if (data.file.type) {
    if (data.file.type === "image/png") {
      const res = await uploadImageFile({
        body: file,
        fileExtension: "png",
      });
      if (res?.key) {
        imageKey = res.key;
      }
    } else if (data.file.type === "image/jpg") {
      const res = await uploadImageFile({
        body: file,
        fileExtension: "jpg",
      });
      if (res?.key) {
        imageKey = res.key;
      }
    } else if (data.file.type === "image/jpeg") {
      const res = await uploadImageFile({
        body: file,
        fileExtension: "jpeg",
      });
      if (res?.key) {
        imageKey = res.key;
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Image must be png or jpg.",
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  }

  const response = await createBlog({
    title: data.title,
    description: data.description,
    imageKey,
    blogContent: data.blog,
    createdAt: Date.now().toString(),
    updatedAt: Date.now().toString(),
    slug: createSlug(data.title),
  });
  if (response.rows) {
    return new Response(
      JSON.stringify({ success: false }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
