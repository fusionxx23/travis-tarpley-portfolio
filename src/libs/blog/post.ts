import z from "zod";
import { uploadImageFile } from "../s3";
import { createBlog } from "../db/blog/queries";
import { createSlug } from "../utils";
const FormDataSchema = z.object({
  file: z.instanceof(File, {
    message: "Expected a File instance",
  }),
  blog: z.string(),
  title: z.string(),
  description: z.string(),
});

export async function postBlog({
  formData,
}: {
  formData: FormData;
}) {
  if (import.meta.env.MODE !== "development") {
    return new Response("Uploader not available", {
      status: 404,
    });
  }
  const data = {
    file: formData.get("file"),
    blog: formData.get("blog"),
    title: formData.get("title"),
    description: formData.get("description"),
  };
  const parsed = FormDataSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "Incorrect form data.",
    };
  }
  const safeData = parsed.data;
  let imageKey = "";
  if (safeData.file) {
    const resp = await uploadImageFile({
      file: safeData.file,
    });
    if (resp?.key) {
      imageKey = resp.key;
    } else {
      return {
        succes: false,
        error: "Failed to upload image.",
      };
    }
  } else {
    return { success: false, error: "No image provided." };
  }
  try {
    const response = await createBlog({
      title: safeData.title,
      description: safeData.description,
      imageKey,
      blogContent: safeData.blog,
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
      slug: createSlug(safeData.title),
    });
    if (response.rows) {
      await fetch(import.meta.env.VERCEL_DEPLOY_HOOK, {
        method: "POST",
      }).then((r) => r.json());
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "Failed to create blog.",
    };
  }
  return { success: true };
}
