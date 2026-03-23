CREATE TABLE "sample_requests" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"company" varchar(255),
	"email" varchar(255) NOT NULL,
	"phone" varchar(255),
	"address" text NOT NULL,
	"notes" text,
	"items" jsonb NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
