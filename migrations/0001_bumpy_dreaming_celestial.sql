DROP INDEX IF EXISTS "blogs_slug_unique";--> statement-breakpoint
ALTER TABLE `blogs` ALTER COLUMN "created_at" TO "created_at" text;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
ALTER TABLE `blogs` ALTER COLUMN "updated_at" TO "updated_at" text;