import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { desc, ilike, or } from "drizzle-orm";
import { db } from "~/server/db";
import { sampleRequests } from "~/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import SearchRequests from "./SearchRequests";
import RequestsClientList from "./RequestsClientList";

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string }>;
}) {
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  const query = (await searchParams)?.q ?? "";

  const rawRequests = await db.query.sampleRequests.findMany({
    where: query
      ? or(
          ilike(sampleRequests.name, `%${query}%`),
          ilike(sampleRequests.company, `%${query}%`),
          ilike(sampleRequests.status, `%${query}%`),
        )
      : undefined,
    orderBy: [desc(sampleRequests.createdAt)],
  });

  // Format the dates on the server before passing them to the interactive client component
  const formattedRequests = rawRequests.map((req) => ({
    ...req,
    timeAgo: formatDistanceToNow(req.createdAt, { addSuffix: true }),
  }));

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          Sample Requests
        </h1>

        <div className="flex w-full flex-wrap items-center gap-3 md:w-auto">
          <SearchRequests />

          <div className="shrink-0 rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 uppercase">
            Total: {formattedRequests.length}
          </div>
        </div>
      </div>

      {/* Render the new interactive wrapper */}
      <RequestsClientList requests={formattedRequests} query={query} />
    </div>
  );
}
