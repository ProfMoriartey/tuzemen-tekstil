"use client";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Checkbox } from "~/components/ui/checkbox";
import { updateFabricDetails } from "~/server/actions/fabrics";

export default function FabricDetailsForm({
  designId,
  initialName,
  initialCategory,
  initialDescription,
  initialFabricType,
  initialComposition,
  initialWidth,
  initialWeight,
  initialHasLeadband,
}: {
  designId: number;
  initialName: string;
  initialCategory: string | null;
  initialDescription: string | null;
  initialFabricType: string | null;
  initialComposition: string | null;
  initialWidth: number | null;
  initialWeight: number | null;
  initialHasLeadband: boolean | null;
}) {
  return (
    <form
      action={updateFabricDetails}
      className="mb-8 space-y-6 rounded-lg border bg-white p-6 shadow-sm"
    >
      <h2 className="text-xl font-bold">Primary Details</h2>

      <input type="hidden" name="id" value={designId} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name (Required)</Label>
          <Input id="name" name="name" defaultValue={initialName} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={initialCategory ?? ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fabricType">Fabric Type</Label>
          <Input
            id="fabricType"
            name="fabricType"
            defaultValue={initialFabricType ?? ""}
            placeholder="e.g., SHEER"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="composition">Composition</Label>
          <Input
            id="composition"
            name="composition"
            defaultValue={initialComposition ?? ""}
            placeholder="e.g., %100 PES"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="width">Width (cm)</Label>
          <Input
            id="width"
            name="width"
            type="number"
            defaultValue={initialWidth ?? ""}
            placeholder="320"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (g/m²)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            defaultValue={initialWeight ?? ""}
            placeholder="100"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={initialDescription ?? ""}
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="hasLeadband"
          name="hasLeadband"
          defaultChecked={initialHasLeadband === true}
          value="on"
        />
        <Label htmlFor="hasLeadband" className="cursor-pointer">
          This fabric includes a leadband
        </Label>
      </div>

      <div className="border-t pt-4">
        <Button type="submit" className="w-full">
          Save Details
        </Button>
      </div>
    </form>
  );
}
