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
  // ZOD THIS
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
      updateBlog(parseInt(data.id), {
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
    await deployVercel();
    return { success: true };
  } else {
    const res = await uploadImageFile({ file: data.file });
    const blogResp = await getBlogFromId({
      id: parseInt(data.id),
    });
    await deleteBlogFiles({ key: blogResp.imageKey });
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
        return {
          success: false,
          error: "Failed to update blog.",
        };
      }
      await deployVercel();
      return { success: true };
    } else {
      return {
        success: false,
        error: "Failed to upload image.",
      };
    }
  }
}
