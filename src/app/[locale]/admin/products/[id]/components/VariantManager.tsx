"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { UploadButton } from "~/utils/uploadthing";
import {
  createVariant,
  deleteVariant,
  updateVariantImage,
} from "~/server/actions/variants";

interface Variant {
  id: number;
  designId: number;
  color: string;
  sku: string | null;
  imageUrl: string | null;
}

export default function VariantManager({
  designId,
  variants,
}: {
  designId: number;
  variants: Variant[];
}) {
  const [color, setColor] = useState("");

  async function handleAddVariantWithoutImage() {
    if (!color) {
      alert("Please enter a color name");
      return;
    }
    await createVariant(designId, color);
    setColor("");
  }

  async function handleDelete(variantId: number, imageUrl: string | null) {
    await deleteVariant(variantId, designId, imageUrl);
  }

  return (
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

        <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row">
          <Button
            onClick={handleAddVariantWithoutImage}
            className="w-full sm:w-auto"
          >
            Add Without Image
          </Button>

          <span className="w-full text-center text-sm text-slate-500 sm:w-auto">
            or
          </span>

          <div className="w-full sm:w-auto">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={async (res) => {
                if (res?.[0] && color) {
                  await createVariant(designId, color, res[0].url);
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
      </div>

      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Existing Variants</h2>

        <div className="space-y-4">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className="flex flex-col items-start justify-between gap-4 rounded-md border p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                {variant.imageUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded border shadow-sm">
                    <Image
                      src={variant.imageUrl}
                      alt={variant.color}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded border bg-slate-50 p-1 text-center text-xs text-slate-500">
                    No image
                  </div>
                )}
                <span className="text-lg font-medium">{variant.color}</span>
              </div>

              <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={async (res) => {
                    if (res?.[0]) {
                      await updateVariantImage(
                        variant.id,
                        designId,
                        res[0].url,
                        variant.imageUrl,
                      );
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`Error: ${error.message}`);
                  }}
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(variant.id, variant.imageUrl)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {variants.length === 0 && (
            <p className="text-sm text-slate-500">No variants added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
