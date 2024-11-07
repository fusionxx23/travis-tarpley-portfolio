import type { APIRoute } from "astro";
import { uploadFile } from "../../libs/s3";

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
    url: formData.get("url") as string,
    id: formData.get("id") as string,
    alt: formData.get("alt") as string,
    filename: formData.get("filename") as string,
  };

  if (!data.file) throw new Error("No file provided");
  if (!data.url) throw new Error("No URL provided");
  if (!data.id) throw new Error("No ID provided");
  if (!data.filename)
    throw new Error("No filename provided");

  const file = Buffer.from(await data.file.arrayBuffer());
  await uploadFile({ body: file });
  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
};
