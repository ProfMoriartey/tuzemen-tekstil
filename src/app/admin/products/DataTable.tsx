"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import DeleteFabricButton from "./DeleteFabricButton";

export default function DataTable({ initialData }: { initialData: any[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("q") ?? "";
  const currentSort = searchParams.get("sort") ?? "createdAt";
  const currentOrder = searchParams.get("order") ?? "desc";

  const [searchTerm, setSearchTerm] = useState(currentSearch);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
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

  function handleSort(column: string) {
    const isAscending = currentSort === column && currentOrder === "asc";
    const newOrder = isAscending ? "desc" : "asc";

    let url = `${pathname}?${createQueryString("sort", column)}`;

    const params = new URLSearchParams(url.split("?")[1]);
    params.set("order", newOrder);

    router.push(`${pathname}?${params.toString()}`);
  }

  function SortIndicator({ column }: { column: string }) {
    if (currentSort !== column) return null;
    return <span className="ml-1">{currentOrder === "asc" ? "↑" : "↓"}</span>;
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search fabrics, categories, descriptions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md"
      />

      <div className="overflow-hidden rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort("name")}
              >
                Name <SortIndicator column="name" />
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-slate-50"
                onClick={() => handleSort("category")}
              >
                Category <SortIndicator column="category" />
              </TableHead>
              <TableHead
                className="hidden cursor-pointer hover:bg-slate-50 md:table-cell"
                onClick={() => handleSort("variants")}
              >
                Variants <SortIndicator column="variants" />
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="py-8 text-center text-slate-500"
                >
                  No fabrics found.
                </TableCell>
              </TableRow>
            ) : (
              initialData.map((design) => (
                <TableRow key={design.id}>
                  <TableCell className="font-medium">{design.name}</TableCell>
                  <TableCell>{design.category ?? "None"}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {design.variants.length} colors
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/products/${design.id}`}>Edit</Link>
                      </Button>
                      <DeleteFabricButton id={design.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
