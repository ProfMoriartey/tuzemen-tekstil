"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Filter, ArrowUpDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "~/components/ui/select";

import FilterChecklist from "./filter-logic/FilterChecklist";
import FilterLeadband from "./filter-logic/FilterLeadband";

export default function StorefrontFilter({
  availableColors,
  availableCategories,
  availableWidths,
}: {
  availableColors: string[];
  availableCategories: string[];
  availableWidths: number[];
}) {
  const t = useTranslations("StorefrontFilter");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentColors =
    searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const currentCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  const currentWidths =
    searchParams.get("widths")?.split(",").filter(Boolean) ?? [];
  const currentLeadband = searchParams.get("leadband") ?? "all";

  const currentSort = searchParams.get("sort") ?? "name";
  const currentOrder = searchParams.get("order") ?? "asc";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [localColors, setLocalColors] = useState<string[]>(currentColors);
  const [localCategories, setLocalCategories] =
    useState<string[]>(currentCategories);
  const [localWidths, setLocalWidths] = useState<string[]>(currentWidths);
  const [localLeadband, setLocalLeadband] = useState<string>(currentLeadband);
  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(name, value);
      else params.delete(name);
      return params.toString();
    },
    [searchParams],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        router.push(`${pathname}?${createQueryString("q", searchTerm)}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch, pathname, router, createQueryString]);

  const sortedColors = useMemo(() => {
    return [...availableColors].sort((a, b) => {
      const aSelected = localColors.includes(a);
      const bSelected = localColors.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.localeCompare(b);
    });
  }, [availableColors, localColors]);

  const sortedCategories = useMemo(() => {
    return [...availableCategories].sort((a, b) => {
      const aSelected = localCategories.includes(a);
      const bSelected = localCategories.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.localeCompare(b);
    });
  }, [availableCategories, localCategories]);

  function handleColorToggle(color: string, checked: boolean) {
    if (checked) setLocalColors([...localColors, color]);
    else setLocalColors(localColors.filter((c) => c !== color));
  }

  function handleCategoryToggle(category: string, checked: boolean) {
    if (checked) setLocalCategories([...localCategories, category]);
    else setLocalCategories(localCategories.filter((c) => c !== category));
  }

  function handleWidthToggle(widthStr: string, checked: boolean) {
    if (checked) setLocalWidths([...localWidths, widthStr]);
    else setLocalWidths(localWidths.filter((w) => w !== widthStr));
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (localColors.length > 0) params.set("colors", localColors.join(","));
    else params.delete("colors");

    if (localCategories.length > 0)
      params.set("categories", localCategories.join(","));
    else params.delete("categories");

    if (localWidths.length > 0) params.set("widths", localWidths.join(","));
    else params.delete("widths");

    if (localLeadband !== "all") params.set("leadband", localLeadband);
    else params.delete("leadband");

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  function clearFilters() {
    setLocalColors([]);
    setLocalCategories([]);
    setLocalWidths([]);
    setLocalLeadband("all");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("colors");
    params.delete("categories");
    params.delete("widths");
    params.delete("leadband");

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  function handleSortChange(value: string | null) {
    if (!value) return;
    const [sort, order] = value.split("-");
    if (!sort || !order) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("order", order);
    router.push(pathname + "?" + params.toString());
  }

  return (
    <div className="w-full">
      {/* Mobile Header & Dialog */}
      <div className="mb-6 flex gap-2 md:hidden">
        <Input
          placeholder={t("search.placeholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />

        <Select
          value={`${currentSort}-${currentOrder}`}
          onValueChange={handleSortChange}
        >
          <SelectTrigger
            className="flex w-10 shrink-0 justify-center border-slate-200 px-0"
            aria-label={t("sort.label")}
          >
            <ArrowUpDown className="h-4 w-4 text-slate-700" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name-asc">{t("sort.az")}</SelectItem>
            <SelectItem value="name-desc">{t("sort.za")}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-h-[90vh] w-[90vw] max-w-106.25 overflow-y-auto rounded-lg p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">{t("dialog.title")}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-2">
              <FilterLeadband
                value={localLeadband}
                onChange={setLocalLeadband}
                variant="mobile"
              />
              <div className="border-t border-slate-100" />
              <FilterChecklist
                title={t("sections.widths")}
                items={availableWidths}
                selectedItems={localWidths}
                onToggle={handleWidthToggle}
                idPrefix="mobile-width"
                variant="mobile"
                emptyMessage={t("sections.noWidths")}
                suffix=" cm"
              />
              <div className="border-t border-slate-100" />
              <FilterChecklist
                title={t("sections.categories")}
                items={sortedCategories}
                selectedItems={localCategories}
                onToggle={handleCategoryToggle}
                idPrefix="mobile-cat"
                variant="mobile"
                emptyMessage={t("sections.noCategories")}
              />
              <div className="border-t border-slate-100" />
              <FilterChecklist
                title={t("sections.colors")}
                items={sortedColors}
                selectedItems={localColors}
                onToggle={handleColorToggle}
                idPrefix="mobile-color"
                variant="mobile"
                emptyMessage={t("sections.noColors")}
              />
            </div>

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-slate-100 bg-white pt-4">
              <Button onClick={applyFilters} className="w-full">
                {t("actions.apply")}
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                {t("actions.clear")}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden space-y-8 md:block">
        <div>
          <h3 className="mb-4 text-lg font-semibold">{t("search.title")}</h3>
          <div className="mb-4 flex gap-2">
            <Input
              placeholder={t("search.placeholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Select
              value={`${currentSort}-${currentOrder}`}
              onValueChange={handleSortChange}
            >
              <SelectTrigger
                className="flex w-10 shrink-0 justify-center border-slate-200 px-0"
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
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <FilterLeadband
            value={localLeadband}
            onChange={setLocalLeadband}
            variant="desktop"
          />
          <FilterChecklist
            title={t("sections.widths")}
            items={availableWidths}
            selectedItems={localWidths}
            onToggle={handleWidthToggle}
            idPrefix="desktop-width"
            variant="desktop"
            emptyMessage={t("sections.noWidths")}
            suffix=" cm"
          />
          <FilterChecklist
            title={t("sections.categories")}
            items={sortedCategories}
            selectedItems={localCategories}
            onToggle={handleCategoryToggle}
            idPrefix="desktop-cat"
            variant="desktop"
            emptyMessage={t("sections.noCategories")}
          />
          <FilterChecklist
            title={t("sections.colors")}
            items={sortedColors}
            selectedItems={localColors}
            onToggle={handleColorToggle}
            idPrefix="desktop-color"
            variant="desktop"
            emptyMessage={t("sections.noColors")}
          />

          <div className="flex flex-col gap-3 border-t pt-4">
            <Button onClick={applyFilters} className="w-full">
              {t("actions.apply")}
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full">
              {t("actions.clear")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
