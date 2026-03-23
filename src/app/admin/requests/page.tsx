import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";
import { db } from "~/server/db";
import { sampleRequests } from "~/server/db/schema";
import { formatDistanceToNow } from "date-fns";
import { Mail, Phone, MapPin, Package } from "lucide-react";

export default async function AdminRequestsPage() {
  // 1. Verify Admin Access
  const user = await currentUser();
  if (user?.publicMetadata?.role !== "admin") {
    redirect("/");
  }

  // 2. Fetch Requests from Database
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

      <div className="space-y-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="overflow-hidden rounded-xl border bg-white shadow-sm"
          >
            {/* Header / Status Bar */}
            <div className="flex flex-col justify-between gap-4 border-b bg-slate-50 px-6 py-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-bold text-slate-900 uppercase">
                  {request.company
                    ? `${request.company} (${request.name})`
                    : request.name}
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  Requested{" "}
                  {formatDistanceToNow(request.createdAt, { addSuffix: true })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                    request.status === "pending"
                      ? "bg-amber-100 text-amber-800"
                      : request.status === "contacted"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-3">
              {/* Contact Info Column */}
              <div className="col-span-1 space-y-4">
                <h3 className="mb-2 text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Contact Details
                </h3>

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-4 w-4 text-slate-400" />
                  <a
                    href={`mailto:${request.email}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {request.email}
                  </a>
                </div>

                {request.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="mt-1 h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-700">
                      {request.phone}
                    </span>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 text-slate-400" />
                  <span className="text-sm leading-relaxed whitespace-pre-line text-slate-700">
                    {request.address}
                  </span>
                </div>
              </div>

              {/* Requested Items Column */}
              <div className="col-span-1 lg:col-span-2">
                <h3 className="mb-4 text-sm font-bold tracking-wider text-slate-400 uppercase">
                  Requested Hangers
                </h3>
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  {(request.items as any[]).map((item: any, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 rounded border bg-slate-50 p-3"
                    >
                      <div className="rounded bg-slate-200 p-2 text-slate-500">
                        <Package className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-slate-900">
                          {item.name}
                        </span>
                        <span className="text-xs font-medium text-slate-500 uppercase">
                          Qty: {item.quantity}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>

                {request.notes && (
                  <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4">
                    <h4 className="mb-1 text-xs font-bold text-amber-800 uppercase">
                      Customer Notes
                    </h4>
                    <p className="text-sm leading-relaxed text-amber-900">
                      {request.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="rounded-xl border bg-white py-20 text-center">
            <p className="text-slate-500">No sample requests received yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
