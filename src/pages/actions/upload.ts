import type { APIRoute } from "astro";
import { uploadImageFile } from "../../libs/s3";
import { DB_API_URL } from "../../data/constants";

export const prerender = false;

const FILE_TYPE_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

export const POST: APIRoute = async ({
  request,
  url,
  redirect,
}) => {
  if (import.meta.env.MODE !== "development") {
    return new Response("Uploader not available", {
      status: 404,
    });
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

  const response = await fetch(DB_API_URL + "/blog", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.BEARER}`,
    },
    body: JSON.stringify({
      title: data.title,
      description: data.description,
      blogContent: data.blog,
      imageKey,
    }),
  });
  console.log(response);
  if (response.status !== 200) {
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
