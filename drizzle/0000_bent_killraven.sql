CREATE TABLE "designs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"category" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "variants" (
	"id" serial PRIMARY KEY NOT NULL,
	"design_id" integer NOT NULL,
	"color" varchar(255) NOT NULL,
	"sku" varchar(255) NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "variants" ADD CONSTRAINT "variants_design_id_designs_id_fk" FOREIGN KEY ("design_id") REFERENCES "public"."designs"("id") ON DELETE no action ON UPDATE no action;