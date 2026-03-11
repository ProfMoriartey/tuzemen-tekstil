"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface FilterLeadbandProps {
  value: string;
  onChange: (val: string) => void;
  variant: "mobile" | "desktop";
}

export default function FilterLeadband({
  value,
  onChange,
  variant,
}: FilterLeadbandProps) {
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "mb-6" : ""}>
      <h3
        className={
          isDesktop
            ? "mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase"
            : "mb-4 text-lg font-semibold"
        }
      >
        Leadband
      </h3>
      <Select value={value} onValueChange={(val) => onChange(val ?? "all")}>
        <SelectTrigger className={isDesktop ? "w-full" : ""}>
          <SelectValue placeholder="Select requirement" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any</SelectItem>
          <SelectItem value="yes">Yes (Included)</SelectItem>
          <SelectItem value="no">No</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
