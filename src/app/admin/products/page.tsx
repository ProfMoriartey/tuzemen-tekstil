import { getDesignsWithVariants } from "~/server/actions/fabrics";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import DeleteFabricButton from "./DeleteFabricButton";

export default async function AdminProductsPage() {
  const designs = await getDesignsWithVariants();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Fabric Inventory</h1>
        <Button asChild>
          <Link href="/admin/products/new">Add New Fabric</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border">
        <Table className="min-w-150">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Variants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {designs.map((design) => (
              <TableRow key={design.id}>
                <TableCell className="font-medium">{design.name}</TableCell>
                <TableCell>{design.category ?? "None"}</TableCell>
                <TableCell>{design.variants.length} colors</TableCell>
                <TableCell className="space-x-2 text-right">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/products/${design.id}`}>Edit</Link>
                  </Button>
                  <DeleteFabricButton id={design.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
