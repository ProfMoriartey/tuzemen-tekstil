"use client";

import { Download } from "lucide-react";
import { format } from "date-fns";
import type { SampleRequestRecord } from "./RequestCard";

// 1. Define the exact shape of the JSON items
interface RequestedItem {
  id: number;
  name: string;
  quantity: number;
}

export default function ExportButton({
  requests,
}: {
  requests: SampleRequestRecord[];
}) {
  function handleExport() {
    if (requests.length === 0) return;

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

    const csvRows = requests.map((req) => {
      // 2. Cast the items to our strict interface instead of any[]
      const itemsString = (req.items as RequestedItem[])
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

    const csvContent = [headers.join(","), ...csvRows].join("\n");

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
      <span className="hidden sm:inline">
        {requests.length > 0
          ? `Export Selected (${requests.length})`
          : "Export CSV"}
      </span>
    </button>
  );
}
