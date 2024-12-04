import { db } from "../models/db";
import {
  blogTable,
  type InsertBlog,
  type SelectBlog,
} from "../models";
import { desc, eq, sql } from "drizzle-orm";
import z from "zod";
const count = z.object({
  "COUNT(*)": z.number(),
});
export async function getTotalAmountOfBlogs() {
  const result = await db.get(
    sql`SELECT COUNT(*) FROM blogs;`,
  );
  const safe = count.safeParse(result);
  console.log(safe, "SAFE");
  return safe;
}
export async function getBlogs(offset = 0, limit = 10) {
  const blogs = await db
    .select()
    .from(blogTable)
    .limit(limit)
    .offset(offset)
    .orderBy(desc(blogTable.id));
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
export async function publishBlogFromId({
  id,
}: {
  id: SelectBlog["id"];
}) {
  const resp = await db
    .update(blogTable)
    .set({ published: true })
    .where(eq(blogTable.id, id));
  return resp;
}
export async function getBlogFromId({
  id,
}: {
  id: SelectBlog["id"];
}) {
  const resp = await db
    .select()
    .from(blogTable)
    .where(eq(blogTable.id, id))
    .limit(1);
  return resp[0] || null;
}
export async function createBlog(blog: InsertBlog) {
  const resp = await db.insert(blogTable).values(blog);
  return resp;
}
export async function deleteBlog(id: SelectBlog["id"]) {
  const resp = await db
    .delete(blogTable)
    .where(eq(blogTable.id, id));
  return resp;
}
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
