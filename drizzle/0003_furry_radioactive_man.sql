ALTER TABLE "designs" ADD COLUMN "composition" varchar(255);--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "width" integer;--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "weight" integer;--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "has_leadband" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "fabric_type" varchar(255);--> statement-breakpoint
ALTER TABLE "designs" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;