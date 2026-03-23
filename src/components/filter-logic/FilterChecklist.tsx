"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";

interface FilterChecklistProps {
  title: string;
  items: (string | number)[];
  selectedItems: string[];
  onToggle: (item: string, checked: boolean) => void;
  idPrefix: string;
  variant: "mobile" | "desktop";
  emptyMessage?: string;
  suffix?: string;
}

export default function FilterChecklist({
  title,
  items,
  selectedItems,
  onToggle,
  idPrefix,
  variant,
  emptyMessage,
  suffix = "",
}: FilterChecklistProps) {
  const t = useTranslations("FilterChecklist");
  const isDesktop = variant === "desktop";
  const displayEmptyMessage = emptyMessage ?? t("defaultEmpty");

  return (
    <div className={isDesktop ? "mb-6" : ""}>
      <h3
        className={
          isDesktop
            ? "mb-3 text-sm font-semibold tracking-wider text-slate-500 uppercase"
            : "mb-4 text-lg font-semibold"
        }
      >
        {title}
      </h3>
      <div
        className={`scrollbar-thin space-y-3 overflow-y-auto pr-2 ${isDesktop ? "max-h-40" : "max-h-[20vh]"}`}
      >
        {items.map((item) => {
          const itemStr = item.toString();
          return (
            <div key={itemStr} className="flex items-center space-x-2">
              <Checkbox
                id={`${idPrefix}-${itemStr}`}
                checked={selectedItems.includes(itemStr)}
                onCheckedChange={(checked) =>
                  onToggle(itemStr, checked === true)
                }
              />
              <Label
                htmlFor={`${idPrefix}-${itemStr}`}
                className={`cursor-pointer text-sm font-medium ${!isDesktop ? "flex-1 py-1" : ""}`}
              >
                {itemStr}
                {suffix}
              </Label>
            </div>
          );
        })}
        {items.length === 0 && (
          <p className={`text-sm text-slate-500 ${!isDesktop ? "py-2" : ""}`}>
            {displayEmptyMessage}
          </p>
        )}
      </div>
    </div>
  );
}
