import { db } from "..";
import {
  blogTable,
  type InsertBlog,
  type SelectBlog,
} from "./table";
import { desc, eq, sql } from "drizzle-orm";
import z from "zod";
const count = z.object({
  "COUNT(*)": z.number(),
});
/**
 * Retrieves the total number of blogs in the database.
 *
 * @param boolean [published=true] - Determines whether to count only published blogs.
 *   - If `true`, counts only blogs marked as published.
 *   - If `false`, counts all blogs regardless of their published status.
 * @returns zod.SafeParseReturnType{data: {'COUNT(*)':number}} - A safe-parsed result containing the count of blogs.
 */
export async function getTotalAmountOfBlogs(
  published = true,
) {
  if (published) {
    const result = await db.get(
      sql`SELECT COUNT(*) FROM blogs WHERE published = true;`,
    );
    const safe = count.safeParse(result);
    return safe;
  } else {
    const result = await db.get(
      sql`SELECT COUNT(*) FROM blogs;`,
    );
    const safe = count.safeParse(result);
    return safe;
  }
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

export async function getPublishedBlogs(
  offset = 0,
  limit = 10,
) {
  const blogs = await db
    .select()
    .from(blogTable)
    .limit(limit)
    .offset(offset)
    .where(eq(blogTable.published, true))
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
  unpublish,
}: {
  id: SelectBlog["id"];
  unpublish: boolean;
}) {
  const resp = await db
    .update(blogTable)
    .set({ published: !unpublish })
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
