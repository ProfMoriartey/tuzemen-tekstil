"use client";

import { useTranslations } from "next-intl";
import { Input } from "~/components/ui/input";
import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

interface SearchAndSortProps {
  searchTerm: string;
  onSearchChange: (val: string) => void;
  currentSortOrder: string;
  onSortChange: (val: string | null) => void;
}

export default function SearchAndSort({
  searchTerm,
  onSearchChange,
  currentSortOrder,
  onSortChange,
}: SearchAndSortProps) {
  const t = useTranslations("StorefrontFilter");

  return (
    <div className="flex gap-2">
      <Input
        placeholder={t("search.placeholder")}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />

      <Select value={currentSortOrder} onValueChange={onSortChange}>
        <SelectTrigger
          className="flex w-10 shrink-0 justify-center border-theme-border px-0"
          aria-label={t("sort.label")}
        >
          <ArrowUpDown className="h-4 w-4 text-slate-700" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name-asc">{t("sort.az")}</SelectItem>
          <SelectItem value="name-desc">{t("sort.za")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
