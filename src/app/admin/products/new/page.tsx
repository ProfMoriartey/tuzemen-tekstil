import { createFabric } from "~/server/actions/fabrics";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import Link from "next/link";

export default function NewFabricPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Fabric</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/products">Cancel</Link>
        </Button>
      </div>

      <form
        action={createFabric}
        className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
      >
        <div className="space-y-2">
          <Label htmlFor="name">Fabric Name</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder="Enter design name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="e.g. Velvet, Cotton, Silk"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the fabric pattern and texture"
            className="min-h-30"
          />
        </div>

        <div className="flex justify-end border-t pt-4">
          <Button type="submit" className="w-full md:w-auto">
            Save Fabric Design
          </Button>
        </div>
      </form>
    </div>
  );
}
