"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Button } from "~/components/ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

// Import the newly extracted components
import SearchAndSort from "./filter-logic/SearchAndSort";
import FilterContent from "./filter-logic/FilterContent";

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

  // Debounced search with Pagination Reset fix
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) params.set("q", searchTerm);
        else params.delete("q");

        params.set("page", "1"); // Reset page on search
        router.push(`${pathname}?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, currentSearch, pathname, router, searchParams]);

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

  // Apply filters with Pagination Reset fix
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

    params.set("page", "1"); // Reset page on filter application

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  // Clear filters with Pagination Reset fix
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

    params.set("page", "1"); // Reset page on clear

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  // Sort change with Pagination Reset fix
  function handleSortChange(value: string | null) {
    if (!value) return;
    const [sort, order] = value.split("-");
    if (!sort || !order) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sort);
    params.set("order", order);
    params.set("page", "1"); // Reset page on sort

    router.push(pathname + "?" + params.toString());
  }

  return (
    <div className="w-full">
      {/* Mobile Layout */}
      <div className="mb-6 flex gap-2 md:hidden">
        <div className="flex-1">
          <SearchAndSort
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentSortOrder={`${currentSort}-${currentOrder}`}
            onSortChange={handleSortChange}
          />
        </div>

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

            <div className="py-2">
              <FilterContent
                variant="mobile"
                localLeadband={localLeadband}
                setLocalLeadband={setLocalLeadband}
                availableWidths={availableWidths}
                localWidths={localWidths}
                handleWidthToggle={handleWidthToggle}
                sortedCategories={sortedCategories}
                localCategories={localCategories}
                handleCategoryToggle={handleCategoryToggle}
                sortedColors={sortedColors}
                localColors={localColors}
                handleColorToggle={handleColorToggle}
              />
            </div>

            <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-slate-100 bg-white pt-4">
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

      {/* Desktop Layout */}
      <div className="hidden space-y-8 md:block">
        <div>
          <h3 className="mb-4 text-lg font-semibold">{t("search.title")}</h3>
          <SearchAndSort
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentSortOrder={`${currentSort}-${currentOrder}`}
            onSortChange={handleSortChange}
          />
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <FilterContent
            variant="desktop"
            localLeadband={localLeadband}
            setLocalLeadband={setLocalLeadband}
            availableWidths={availableWidths}
            localWidths={localWidths}
            handleWidthToggle={handleWidthToggle}
            sortedCategories={sortedCategories}
            localCategories={localCategories}
            handleCategoryToggle={handleCategoryToggle}
            sortedColors={sortedColors}
            localColors={localColors}
            handleColorToggle={handleColorToggle}
          />

          <div className="mt-6 flex flex-col gap-3 border-t pt-6">
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
