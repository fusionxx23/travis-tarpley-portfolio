import { error } from "node_modules/astro/dist/core/logger/core";
import {
  getBlogFromId,
  updateBlog,
} from "../db/blog/queries";
import { deleteBlogFiles, uploadImageFile } from "../s3";
import { deployVercel } from "../utils";
import z from "zod";
const FormDataSchema = z.object({
  file: z.instanceof(File, {
    message: "Expected a File instance",
  }),
  blog: z.string(),
  title: z.string(),
  description: z.string(),
  id: z.string(),
});
export async function putBlog({
  formData,
}: {
  formData: FormData;
}): Promise<{ error?: string; success: boolean }> {
  const data = {
    file: formData.get("file") as File,
    blog: formData.get("blog") as string,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    id: formData.get("id") as string,
  };
  const blogData = FormDataSchema.safeParse(data);

  if (!blogData.success) {
    return {
      success: false,
      error: "Incorrect form data.",
    };
  }

  const { blog, title, description } = blogData.data;
  // Use same image if no file was uploaded
  if (data.file.size === 0) {
    try {
      updateBlog(Number.parseInt(data.id), {
        blogContent: blog,
        title,
        description,
        updatedAt: Date.now().toString(),
      });
    } catch (e) {
      console.log(e);
      return {
        success: false,
        error: "Failed to update blog.",
      };
    }
    try {
      await deployVercel();
    } catch (e) {
      console.error(e);
    }
    return { success: true };
  }
  let key: string | undefined = "";
  try {
    const res = await uploadImageFile({
      file: data.file,
    });
    key = res?.key;
    const blogResp = await getBlogFromId({
      id: Number.parseInt(data.id),
    });
    await deleteBlogFiles({ key: blogResp.imageKey });
  } catch (e) {
    console.error(e);
    return {
      success: false,
      error: "Failed to delete blog files.",
    };
  }

  if (key) {
    try {
      updateBlog(Number.parseInt(data.id), {
        blogContent: blog,
        title,
        description,
        imageKey: key,
        updatedAt: Date.now().toString(),
      });
    } catch (e) {
      console.error(e);
      return {
        success: false,
        error: "Failed to update blog.",
      };
    }
    try {
      await deployVercel();
    } catch (e) {
      console.error(e);
    }
    return { success: true };
  }

  return {
    success: false,
    error: "Failed to upload image.",
  };
}
