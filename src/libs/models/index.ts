import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const blogTable = sqliteTable(
  "blogs",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    description: text("description").notNull(),
    blogContent: text("blogContent").notNull(),
    slug: text("slug").unique().notNull(),
    imageKey: text("imageKey").notNull(),
    published: integer({ mode: "boolean" }).default(false),
    createdAt: text("created_at").notNull(),
    updatedAt: text("updated_at").notNull(),
  },
  (table) => {
    return {
      slugIndex: uniqueIndex("slug_idx").on(table.slug),
    };
  },
);

export type InsertBlog = typeof blogTable.$inferInsert;
export type SelectBlog = typeof blogTable.$inferSelect;
