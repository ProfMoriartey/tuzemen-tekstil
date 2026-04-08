"use client";

import { useTranslations } from "next-intl";
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
  const t = useTranslations("FilterLeadband");
  const isDesktop = variant === "desktop";

  return (
    <div className={isDesktop ? "mb-6" : ""}>
      <h3
        className={
          isDesktop
            ? "mb-3 text-sm font-semibold tracking-wider text-theme-text uppercase"
            : "mb-4 text-lg font-semibold"
        }
      >
        {t("title")}
      </h3>
      <Select value={value} onValueChange={(val) => onChange(val ?? "all")}>
        <SelectTrigger className={isDesktop ? "w-full" : ""}>
          <SelectValue placeholder={t("placeholder")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">{t("options.all")}</SelectItem>
          <SelectItem value="yes">{t("options.yes")}</SelectItem>
          <SelectItem value="no">{t("options.no")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
