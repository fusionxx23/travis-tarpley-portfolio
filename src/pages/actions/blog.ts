import type { APIRoute } from "astro";
import { uploadImageFile } from "../../libs/s3";
import { getSession } from "auth-astro/server";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../../libs/blogs";
import { createSlug } from "../../libs/utils";
import z from "zod";
export const prerender = false;
export const DELETE: APIRoute = async ({ request }) => {
  const session = await getSession(request);

  const formData = await request.formData();
  const id = z.string().parse(formData.get("id") as string);
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
export const PUT: APIRoute = async ({ request }) => {
  const session = await getSession(request);
  if (!session?.user) {
    return new Response("", { status: 403 });
  }
  const formData = await request.formData();
  // ZOD THIS
  const data = {
    file: formData.get("file") as File,
    blog: formData.get("blog") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    id: formData.get("id") as string,
  };
  if (!data.blog) throw new Error("No Blog provided");
  if (!data.title) throw new Error("No Title provided");
  if (!data.description)
    throw new Error("No Description provided");

  // Use same image if no file was uploaded
  const { blog, title, description } = data;
  console.log(data.file, "DATA FILE");
  if (data.file.size === 0) {
    try {
      updateBlog(parseInt(data.id), {
        blogContent: blog,
        title,
        description,
        updatedAt: Date.now().toString(),
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    const res = await uploadImageFile({ file: data.file });
    if (res?.key) {
      try {
        updateBlog(parseInt(data.id), {
          blogContent: blog,
          title,
          description,
          imageKey: res.key,
          updatedAt: Date.now().toString(),
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to upload image.",
        }),
        { status: 200 },
      );
    }
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
  });
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
  console.log(data, "DATA");
  if (!data.file) throw new Error("No file provided");
  if (!data.blog) throw new Error("No Blog provided");
  if (!data.title) throw new Error("No Title provided");
  if (!data.description)
    throw new Error("No Description provided");
  let imageKey = "";
  if (data.file) {
    const resp = await uploadImageFile({ file: data.file });
    if (resp?.key) {
      imageKey = resp.key;
    } else {
      return new Response(
        JSON.stringify({
          succes: false,
          error: "Failed to upload image.",
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        error: "No image provided.",
      }),
      { headers: { "Content-Type": "application/json" } },
    );
  }
  try {
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
        JSON.stringify({ success: true }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch (e) {
    console.log(e);
  }

  return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
  });
};