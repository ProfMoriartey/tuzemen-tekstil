"use client";

import { useTranslations } from "next-intl";
import FilterChecklist from "./FilterChecklist";
import FilterLeadband from "./FilterLeadband";

interface FilterContentProps {
  variant: "mobile" | "desktop";
  localLeadband: string;
  setLocalLeadband: (val: string) => void;
  availableWidths: number[];
  localWidths: string[];
  handleWidthToggle: (val: string, checked: boolean) => void;
  sortedCategories: string[];
  localCategories: string[];
  handleCategoryToggle: (val: string, checked: boolean) => void;
  sortedColors: string[];
  localColors: string[];
  handleColorToggle: (val: string, checked: boolean) => void;
}

export default function FilterContent({
  variant,
  localLeadband,
  setLocalLeadband,
  availableWidths,
  localWidths,
  handleWidthToggle,
  sortedCategories,
  localCategories,
  handleCategoryToggle,
  sortedColors,
  localColors,
  handleColorToggle,
}: FilterContentProps) {
  const t = useTranslations("StorefrontFilter");

  return (
    <div className="flex flex-col gap-6">
      <FilterLeadband
        value={localLeadband}
        onChange={setLocalLeadband}
        variant={variant}
      />
      <div className="border-t border-theme-border" />
      <FilterChecklist
        title={t("sections.widths")}
        items={availableWidths}
        selectedItems={localWidths}
        onToggle={handleWidthToggle}
        idPrefix={`${variant}-width`}
        variant={variant}
        emptyMessage={t("sections.noWidths")}
        suffix=" cm"
      />
      <div className="border-t border-theme-border" />
      <FilterChecklist
        title={t("sections.categories")}
        items={sortedCategories}
        selectedItems={localCategories}
        onToggle={handleCategoryToggle}
        idPrefix={`${variant}-cat`}
        variant={variant}
        emptyMessage={t("sections.noCategories")}
      />
      <div className="border-t border-theme-border" />
      <FilterChecklist
        title={t("sections.colors")}
        items={sortedColors}
        selectedItems={localColors}
        onToggle={handleColorToggle}
        idPrefix={`${variant}-color`}
        variant={variant}
        emptyMessage={t("sections.noColors")}
      />
    </div>
  );
}
