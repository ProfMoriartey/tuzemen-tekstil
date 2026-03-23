"use client";

import { Download } from "lucide-react";
import { format } from "date-fns";
import type { SampleRequestRecord } from "./RequestCard";

export default function ExportButton({
  requests,
}: {
  requests: SampleRequestRecord[];
}) {
  function handleExport() {
    if (requests.length === 0) return;

    // 1. Define CSV Headers
    const headers = [
      "ID",
      "Date",
      "Status",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Address",
      "Requested Items",
      "Notes",
    ];

    // 2. Helper to safely escape CSV fields containing commas or quotes
    const escapeCsv = (val: string | null | undefined) => {
      if (!val) return '""';
      const stringVal = String(val);
      if (
        stringVal.includes('"') ||
        stringVal.includes(",") ||
        stringVal.includes("\n")
      ) {
        return `"${stringVal.replace(/"/g, '""')}"`;
      }
      return stringVal;
    };

    // 3. Map database records into CSV rows
    const csvRows = requests.map((req) => {
      // Format the items array into a single readable string
      // e.g., "2x ACCENT, 1x SHEER"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const itemsString = (req.items as any[])
        .map((item) => `${item.quantity}x ${item.name}`)
        .join(", ");

      return [
        req.id,
        format(new Date(req.createdAt), "yyyy-MM-dd HH:mm"),
        req.status,
        escapeCsv(req.name),
        escapeCsv(req.company),
        escapeCsv(req.email),
        escapeCsv(req.phone),
        escapeCsv(req.address),
        escapeCsv(itemsString),
        escapeCsv(req.notes),
      ].join(",");
    });

    // 4. Combine headers and rows
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 5. Trigger the browser download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download",
      `tuzemen-requests-${format(new Date(), "yyyy-MM-dd")}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      onClick={handleExport}
      disabled={requests.length === 0}
      className="hover:text-theme-accent flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-bold tracking-wider text-slate-700 uppercase transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download className="h-4 w-4" />
      {/* Updated text logic to show the count */}
      <span className="hidden sm:inline">
        {requests.length > 0
          ? `Export Selected (${requests.length})`
          : "Export CSV"}
      </span>
    </button>
  );
}
