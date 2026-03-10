"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";
import {
  updateDisplayImage,
  createVariant,
  deleteVariant,
} from "~/server/actions/variants";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export default function EditFabricClient({ design }: { design: any }) {
  const [color, setColor] = useState("");

  async function handleDelete(variantId: number, imageUrl: string | null) {
    await deleteVariant(variantId, design.id, imageUrl);
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Main Display Image</h2>

        {design.displayImageUrl ? (
          <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={design.displayImageUrl}
              alt={design.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            No main image uploaded
          </div>
        )}

        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={async (res) => {
            if (res?.[0]) {
              await updateDisplayImage(design.id, res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Error: ${error.message}`);
          }}
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Add New Variant</h2>

          <div className="space-y-2">
            <Label htmlFor="color">Color Name</Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="Enter color name"
            />
          </div>

          <div className="pt-2">
            <Label className="mb-2 block">Upload Variant Image</Label>
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                if (res?.[0] && color) {
                  await createVariant(design.id, color, res[0].url);
                  setColor("");
                } else if (!color) {
                  alert("Please enter a color name before uploading");
                }
              }}
              onUploadError={(error: Error) => {
                alert(`Error: ${error.message}`);
              }}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Existing Variants</h2>

          <div className="space-y-4">
            {design.variants.map((variant: any) => (
              <div
                key={variant.id}
                className="flex items-center justify-between rounded-md border p-2"
              >
                <div className="flex items-center gap-4">
                  {variant.imageUrl && (
                    <div className="relative h-12 w-12 overflow-hidden rounded">
                      <Image
                        src={variant.imageUrl}
                        alt={variant.color}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span className="font-medium">{variant.color}</span>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(variant.id, variant.imageUrl)}
                >
                  Remove
                </Button>
              </div>
            ))}

            {design.variants.length === 0 && (
              <p className="text-sm text-slate-500">No variants added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
