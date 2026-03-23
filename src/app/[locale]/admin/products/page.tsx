import { getFilteredDesigns } from "~/server/actions/filter";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import DataTable from "./DataTable";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; sort?: string; order?: string }>;
}) {
  const query = (await searchParams).q ?? "";
  const sort = (await searchParams).sort ?? "createdAt";
  const order = ((await searchParams).order as "asc" | "desc") ?? "desc";

  const designs = await getFilteredDesigns(query, sort, order);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Fabric Inventory</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add New Fabric</Link>
        </Button>
      </div>

      <DataTable initialData={designs} />
    </div>
  );
}
