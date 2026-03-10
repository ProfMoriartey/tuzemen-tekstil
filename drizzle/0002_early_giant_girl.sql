ALTER TABLE "designs" ALTER COLUMN "display_image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "variants" ALTER COLUMN "sku" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "variants" ALTER COLUMN "image_url" DROP NOT NULL;