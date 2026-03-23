import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { sampleRequests } from "~/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import RequestCard from "./RequestCard";

export default async function AdminRequestsPage() {
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  const requests = await db.query.sampleRequests.findMany({
    orderBy: [desc(sampleRequests.createdAt)],
  });

  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 uppercase">
          Sample Requests
        </h1>
        <div className="rounded-md bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600 uppercase">
          Total: {requests.length}
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
              No sample requests received yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
