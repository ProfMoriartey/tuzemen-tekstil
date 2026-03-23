"use client";

import { useState } from "react";
import RequestCard, { type SampleRequestRecord } from "./RequestCard";
import ExportButton from "./ExportButton";

// We define a new type that includes the pre-formatted date string
export type FormattedRequestRecord = SampleRequestRecord & { timeAgo: string };

export default function RequestsClientList({
  requests,
  query,
}: {
  requests: FormattedRequestRecord[];
  query: string;
}) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

  // Toggle a single checkbox
  const toggleSelect = (id: number) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  // Toggle the 'Select All' checkbox
  const toggleSelectAll = () => {
    if (selectedIds.size === requests.length) {
      setSelectedIds(new Set()); // Unselect all
    } else {
      setSelectedIds(new Set(requests.map((r) => r.id))); // Select all
    }
  };

  // Filter the full list down to just what is checked
  const selectedRequests = requests.filter((r) => selectedIds.has(r.id));

  return (
    <div className="space-y-4">
      {/* Action Bar (Select All & Export) */}
      {requests.length > 0 && (
        <div className="flex items-center justify-between rounded-xl border bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="selectAll"
              checked={
                selectedIds.size === requests.length && requests.length > 0
              }
              onChange={toggleSelectAll}
              className="text-theme-accent focus:ring-theme-accent h-5 w-5 cursor-pointer rounded border-slate-300"
            />
            <label
              htmlFor="selectAll"
              className="cursor-pointer text-sm font-bold text-slate-700 uppercase select-none"
            >
              Select All ({selectedIds.size})
            </label>
          </div>

          <ExportButton requests={selectedRequests} />
        </div>
      )}

      {/* The List of Cards */}
      <div className="space-y-4">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            timeAgo={request.timeAgo}
            isSelected={selectedIds.has(request.id)}
            onToggleSelect={() => toggleSelect(request.id)}
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
