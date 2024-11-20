import { db } from "../models/db";
import {
  blogTable,
  type InsertBlog,
  type SelectBlog,
} from "../models";
import { desc, eq } from "drizzle-orm";

export async function getBlogs() {
  const blogs = await db
    .select()
    .from(blogTable)
    .orderBy(desc(blogTable.id));
  console.log(blogs, "BLOGS");
  return blogs;
}
export async function getBlogFromSlug({
  slug,
}: {
  slug: SelectBlog["slug"];
}) {
  const resp = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.slug, slug));
  return resp;
}

export async function createBlog(blog: InsertBlog) {
  const resp = await db.insert(blogTable).values(blog);
  return resp;
}
export async function deleteBlog(id: SelectBlog["id"]) {}
export async function updateBlog(
  id: SelectBlog["id"],
  data: Partial<Omit<SelectBlog, "id">>,
) {
  const resp = await db
    .update(blogTable)
    .set(data)
    .where(eq(blogTable.id, id));
  return resp;
}
