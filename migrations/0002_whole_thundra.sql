DROP INDEX IF EXISTS "blogs_slug_unique";--> statement-breakpoint
DROP INDEX IF EXISTS "slug_idx";--> statement-breakpoint
ALTER TABLE `blogs` ALTER COLUMN "created_at" TO "created_at" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `blogs_slug_unique` ON `blogs` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `slug_idx` ON `blogs` (`slug`);--> statement-breakpoint
ALTER TABLE `blogs` ALTER COLUMN "updated_at" TO "updated_at" text NOT NULL;