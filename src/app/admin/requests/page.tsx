import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { desc, ilike, or } from "drizzle-orm";
import { db } from "~/server/db";
import { sampleRequests } from "~/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import RequestCard from "./RequestCard";
import SearchRequests from "./SearchRequests";

export default async function AdminRequestsPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  // Capture the search term from the URL
  const query = searchParams?.q || "";

  // Fetch from database with optional search filtering
  const requests = await db.query.sampleRequests.findMany({
    where: query
      ? or(
          ilike(sampleRequests.name, `%${query}%`),
          ilike(sampleRequests.company, `%${query}%`),
        )
      : undefined,
    orderBy: [desc(sampleRequests.createdAt)],
  });

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          Sample Requests
        </h1>

        <div className="flex w-full items-center gap-4 md:w-auto">
          <SearchRequests />
          <div className="shrink-0 rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 uppercase">
            Total: {requests.length}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            timeAgo={formatDistanceToNow(request.createdAt, {
              addSuffix: true,
            })}
          />
        ))}

        {requests.length === 0 && (
          <div className="rounded-xl border bg-white py-20 text-center">
            <p className="font-medium text-slate-500">
              {query
                ? "No requests match your search."
                : "No sample requests received yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
