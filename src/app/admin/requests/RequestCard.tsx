"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Package,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import StatusDropdown from "./StatusDropdown";

// 1. Define the shape of the individual fabric items
interface RequestedItem {
  id: number;
  name: string;
  imageUrl: string | null;
  quantity: number;
}

// 2. Define the shape of the main database record
export interface SampleRequestRecord {
  id: number;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  address: string;
  notes: string | null;
  items: unknown; // Drizzle returns JSON as 'unknown' by default
  status: string;
  createdAt: Date;
}

export default function RequestCard({
  request,
  timeAgo,
}: {
  request: SampleRequestRecord;
  timeAgo: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  // 3. Safely cast the JSON array to our typed interface
  const requestedItems = request.items as RequestedItem[];

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm transition-all">
      {/* Header Row */}
      <div className="flex flex-col gap-4 border-b bg-slate-50 px-6 py-4 md:flex-row md:items-center">
        {/* Clickable Area for Expansion */}
        <div
          className="group flex flex-1 cursor-pointer items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <h2 className="group-hover:text-theme-accent text-lg font-bold text-slate-900 uppercase transition-colors">
              {request.company
                ? `${request.company} (${request.name})`
                : request.name}
            </h2>
            <p className="text-sm font-medium text-slate-500">
              Requested {timeAgo}
            </p>
          </div>

          <div className="group-hover:text-theme-accent mr-4 text-slate-400 transition-colors">
            {isOpen ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Status Dropdown */}
        <div className="flex shrink-0 items-center">
          <StatusDropdown
            requestId={request.id}
            currentStatus={request.status}
          />
        </div>
      </div>

      {/* Expandable Content Grid */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-top-2 grid grid-cols-1 gap-8 bg-white p-6 duration-200 lg:grid-cols-3">
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
                <span className="text-sm text-slate-700">{request.phone}</span>
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
              {/* 4. We now map over the safely typed requestedItems array */}
              {requestedItems.map((item, idx) => (
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
      )}
    </div>
  );
}
