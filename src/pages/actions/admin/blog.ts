import {
  createBlog,
  getBlogFromId,
  updateBlog,
} from "@/libs/blogs";
import {
  deleteBlogFiles,
  uploadImageFile,
} from "@/libs/s3";
import { createSlug } from "@/libs/utils";
import type { APIRoute } from "astro";
export const prerender = false;
async function deployVercel() {
  const resp = await fetch(
    import.meta.env.VERCEL_DEPLOY_HOOK,
    {
      method: "POST",
    },
  ).then((r) => r.json());
  return resp;
}
function jsonErrorResponse({
  message,
}: {
  message: string;
}) {
  return new Response(
    JSON.stringify({
      success: false,
      error: message,
    }),
    { status: 200 },
  );
}

const successJson = new Response(
  JSON.stringify({
    success: true,
  }),
  { status: 200 },
);

export const PUT: APIRoute = async ({ request }) => {
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
      return jsonErrorResponse({
        message: `Failed to update blog.`,
      });
    }

    await deployVercel();
    return successJson;
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
        return jsonErrorResponse({
          message: "Failed to update blog.",
        });
      }
      await deployVercel();
      return successJson;
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
};

export const POST: APIRoute = async ({ request }) => {
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
      await fetch(import.meta.env.VERCEL_DEPLOY_HOOK, {
        method: "POST",
      }).then((r) => r.json());
      return successJson;
    }
  } catch (e) {
    console.log(e);
  }

  return new Response(JSON.stringify({ success: false }), {
    headers: { "Content-Type": "application/json" },
  });
};
