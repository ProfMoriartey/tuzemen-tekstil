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
      <Select value={value} onValueChange={(val) => onChange(val ?? "All")}>
        <SelectTrigger className={isDesktop ? " text-theme-primary w-full" : "text-theme-primary"}>
          <SelectValue placeholder={t("placeholder")} />
        </SelectTrigger>
        <SelectContent className="text-theme-primary bg-theme-bg">
          <SelectItem value="All">{t("options.all")}</SelectItem>
          <SelectItem value="Yes">{t("options.yes")}</SelectItem>
          <SelectItem value="No">{t("options.no")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
