"use client";

import { useTransition } from "react";
import { updateRequestStatus } from "~/server/actions/admin";

export default function StatusDropdown({
  requestId,
  currentStatus,
}: {
  requestId: number;
  currentStatus: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateRequestStatus(requestId, newStatus);
    });
  }

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      disabled={isPending}
      className={`cursor-pointer rounded-full border-none px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-opacity outline-none focus:ring-2 focus:ring-offset-2 ${
        currentStatus === "pending"
          ? "bg-amber-100 text-amber-800 focus:ring-amber-500"
          : currentStatus === "contacted"
            ? "bg-blue-100 text-blue-800 focus:ring-blue-500"
            : "bg-green-100 text-green-800 focus:ring-green-500"
      } ${isPending ? "opacity-50" : "opacity-100"}`}
    >
      <option value="pending">Pending</option>
      <option value="contacted">Contacted</option>
      <option value="shipped">Shipped</option>
    </select>
  );
}
