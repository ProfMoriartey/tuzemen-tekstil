"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Filter } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export default function StorefrontFilter({
  availableColors,
  availableCategories,
}: {
  availableColors: string[];
  availableCategories: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentColors =
    searchParams.get("colors")?.split(",").filter(Boolean) ?? [];
  const currentCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) ?? [];

  const [searchTerm, setSearchTerm] = useState(currentSearch);
  const [localColors, setLocalColors] = useState<string[]>(currentColors);
  const [localCategories, setLocalCategories] =
    useState<string[]>(currentCategories);
  const [isOpen, setIsOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
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
    if (checked) {
      setLocalColors([...localColors, color]);
    } else {
      setLocalColors(localColors.filter((c) => c !== color));
    }
  }

  function handleCategoryToggle(category: string, checked: boolean) {
    if (checked) {
      setLocalCategories([...localCategories, category]);
    } else {
      setLocalCategories(localCategories.filter((c) => c !== category));
    }
  }

  function applyFilters() {
    const params = new URLSearchParams(searchParams.toString());

    if (localColors.length > 0) {
      params.set("colors", localColors.join(","));
    } else {
      params.delete("colors");
    }

    if (localCategories.length > 0) {
      params.set("categories", localCategories.join(","));
    } else {
      params.delete("categories");
    }

    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  function clearFilters() {
    setLocalColors([]);
    setLocalCategories([]);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("colors");
    params.delete("categories");
    router.push(pathname + "?" + params.toString());
    setIsOpen(false);
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex gap-2 md:hidden">
        <Input
          placeholder="Search fabrics by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Button
          variant="outline"
          size="icon"
          className="shrink-0"
          onClick={() => setIsOpen(true)}
        >
          <Filter className="h-4 w-4" />
        </Button>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="w-[90vw] max-w-106.25 rounded-lg p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-xl">Filter Products</DialogTitle>
            </DialogHeader>

            <div className="space-y-8 py-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold">Categories</h3>
                <div className="scrollbar-thin max-h-[25vh] space-y-3 overflow-y-auto pr-2">
                  {sortedCategories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        className="cursor-pointer"
                        id={`mobile-cat-${category}`}
                        checked={localCategories.includes(category)}
                        onCheckedChange={(checked) =>
                          handleCategoryToggle(category, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`mobile-cat-${category}`}
                        className="flex-1 cursor-pointer py-1 text-sm font-medium"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                  {sortedCategories.length === 0 && (
                    <p className="py-2 text-sm text-slate-500">
                      No categories found.
                    </p>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100" />

              <div>
                <h3 className="mb-4 text-lg font-semibold">Colors</h3>
                <div className="scrollbar-thin max-h-[25vh] space-y-3 overflow-y-auto pr-2">
                  {sortedColors.map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        className="cursor-pointer"
                        id={`mobile-color-${color}`}
                        checked={localColors.includes(color)}
                        onCheckedChange={(checked) =>
                          handleColorToggle(color, checked === true)
                        }
                      />
                      <Label
                        htmlFor={`mobile-color-${color}`}
                        className="flex-1 cursor-pointer py-1 text-sm font-medium"
                      >
                        {color}
                      </Label>
                    </div>
                  ))}
                  {sortedColors.length === 0 && (
                    <p className="py-2 text-sm text-slate-500">
                      No colors found.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-6">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="hidden space-y-8 md:block">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Search</h3>
          <Input
            placeholder="Search fabrics by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">Categories</h3>
            <div className="scrollbar-thin max-h-50 space-y-3 overflow-y-auto pr-2">
              {sortedCategories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    className="cursor-pointer"
                    id={`desktop-cat-${category}`}
                    checked={localCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryToggle(category, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`desktop-cat-${category}`}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {category}
                  </Label>
                </div>
              ))}
              {sortedCategories.length === 0 && (
                <p className="text-sm text-slate-500">No categories.</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-4 text-lg font-semibold">Colors</h3>
            <div className="scrollbar-thin max-h-50 space-y-3 overflow-y-auto pr-2">
              {sortedColors.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <Checkbox
                    className="cursor-pointer"
                    id={`desktop-color-${color}`}
                    checked={localColors.includes(color)}
                    onCheckedChange={(checked) =>
                      handleColorToggle(color, checked === true)
                    }
                  />
                  <Label
                    htmlFor={`desktop-color-${color}`}
                    className="cursor-pointer text-sm font-medium"
                  >
                    {color}
                  </Label>
                </div>
              ))}
              {sortedColors.length === 0 && (
                <p className="text-sm text-slate-500">No colors.</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-4">
            <Button onClick={applyFilters} className="w-full">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters} className="w-full">
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
