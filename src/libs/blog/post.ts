import z from "zod";
import { uploadImageFile } from "../s3";
import { createBlog } from "../db/blog/queries";
import { createSlug, deployVercel } from "../utils";
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
    let key: string | undefined;
    try {
      const resp = await uploadImageFile({
        file: safeData.file,
      });
      key = resp?.key;
    } catch (e) {
      console.error(e, "Upload Image");
      return { success: false, error: "" };
    }
    if (key) {
      imageKey = key;
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
      await deployVercel();
    }
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to create blog.",
    };
  }
  try {
    await deployVercel();
  } catch (e) {
    console.error(e, "Failed webhook.");
  }
  return { success: true };
}
