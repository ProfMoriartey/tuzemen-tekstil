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

import SearchAndSort from "./filter-logic/SearchAndSort";
import FilterContent from "./filter-logic/FilterContent";

export default function StorefrontFilter({
  availableColors,
  availableCategories,
  availableWidths,
  availableTypes, // <-- ADDED PROP
}: {
  availableColors: string[];
  availableCategories: string[];
  availableWidths: number[];
  availableTypes: string[]; // <-- ADDED TYPE
}) {
  const t = useTranslations("StorefrontFilter");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentColors = searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const currentCategories = searchParams.get("categories")?.split(",").filter(Boolean) ?? [];
  const currentWidths = searchParams.get("widths")?.split(",").filter(Boolean) ?? [];
  // <-- PARSED TYPES FROM URL
  const currentTypes = searchParams.get("types")?.split(",").filter(Boolean) ?? [];
  const currentLeadband = searchParams.get("leadband") ?? "all";
  const currentSort = searchParams.get("sort") ?? "name";
  const currentOrder = searchParams.get("order") ?? "asc";

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [localColors, setLocalColors] = useState<string[]>(currentColors);
  const [localCategories, setLocalCategories] = useState<string[]>(currentCategories);
  const [localWidths, setLocalWidths] = useState<string[]>(currentWidths);
  // <-- ADDED LOCAL STATE FOR TYPES
  const [localTypes, setLocalTypes] = useState<string[]>(currentTypes); 
  const [localLeadband, setLocalLeadband] = useState<string>(currentLeadband);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm !== currentSearch) {
        const params = new URLSearchParams(searchParams.toString());
        if (searchTerm) params.set("q", searchTerm);
        else params.delete("q");

        params.set("page", "1"); 
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

  // <-- ADDED SORTING LOGIC FOR TYPES
  const sortedTypes = useMemo(() => {
    return [...availableTypes].sort((a, b) => {
      const aSelected = localTypes.includes(a);
      const bSelected = localTypes.includes(b);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.localeCompare(b);
    });
  }, [availableTypes, localTypes]);

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

  // <-- ADDED TOGGLE HANDLER FOR TYPES
  function handleTypeToggle(typeStr: string, checked: boolean) {
    if (checked) setLocalTypes([...localTypes, typeStr]);
    else setLocalTypes(localTypes.filter((t) => t !== typeStr));
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (localColors.length > 0) params.set("colors", localColors.join(","));
    else params.delete("colors");

    if (localCategories.length > 0) params.set("categories", localCategories.join(","));
    else params.delete("categories");

    if (localWidths.length > 0) params.set("widths", localWidths.join(","));
    else params.delete("widths");

    // <-- ADDED TO URL PARAMS
    if (localTypes.length > 0) params.set("types", localTypes.join(","));
    else params.delete("types");

    if (localLeadband !== "all") params.set("leadband", localLeadband);
    else params.delete("leadband");

    params.set("page", "1");

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  function clearFilters() {
    setLocalColors([]);
    setLocalCategories([]);
    setLocalWidths([]);
    setLocalTypes([]); // <-- CLEAR TYPES
    setLocalLeadband("all");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("colors");
    params.delete("categories");
    params.delete("widths");
    params.delete("types"); // <-- REMOVE FROM URL
    params.delete("leadband");

    params.set("page", "1");

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
    params.set("page", "1");

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
          className="shrink-0 h-9 w-10"
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
                // <-- PASSED TO FILTER CONTENT (MOBILE)
                sortedTypes={sortedTypes}
                localTypes={localTypes}
                handleTypeToggle={handleTypeToggle}
              />
            </div>

            <div className="sticky bottom-0 mt-6 flex flex-col gap-3 border-t border-theme-border bg-theme-bg pt-4">
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
          <h3 className="mb-4 text-lg text-theme-primary font-semibold">{t("search.title")}</h3>
          <SearchAndSort
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            currentSortOrder={`${currentSort}-${currentOrder}`}
            onSortChange={handleSortChange}
          />
        </div>

        <div className="rounded-lg border bg-theme-bg p-4 shadow-sm">
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
            // <-- PASSED TO FILTER CONTENT (DESKTOP)
            sortedTypes={sortedTypes}
            localTypes={localTypes}
            handleTypeToggle={handleTypeToggle}
          />

          <div className=" mt-6 flex flex-col gap-3 border-t pt-6">
            <Button  onClick={applyFilters} className="w-full">
              {t("actions.apply")}
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full bg-theme-secondary text-theme-primary">
              {t("actions.clear")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}