"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ArrowUp, ArrowDown } from "lucide-react";
import { UploadButton } from "~/utils/uploadthing";
import {
  createVariant,
  deleteVariant,
  updateVariantImage,
  updateVariantOrder, // Make sure to export/import this new action
} from "~/server/actions/variants";

interface Variant {
  id: number;
  designId: number;
  color: string;
  sku: string | null;
  imageUrl: string | null;
  sortOrder: number; // Added sortOrder here
}

export default function VariantManager({
  designId,
  variants,
}: {
  designId: number;
  variants: Variant[];
}) {
  const [color, setColor] = useState("");

  // Local state for optimistic sorting
  const [localVariants, setLocalVariants] = useState<Variant[]>([]);

  // Keep local state in sync with server data, sorted by sortOrder
  useEffect(() => {
    const sorted = [...variants].sort((a, b) => a.sortOrder - b.sortOrder);
    setLocalVariants(sorted);
  }, [variants]);

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

  async function handleMove(index: number, direction: "up" | "down") {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === localVariants.length - 1) return;

    const newVariants = [...localVariants];
    const swapIndex = direction === "up" ? index - 1 : index + 1;

    // Safely get the items
    const currentItem = newVariants[index];
    const swapItem = newVariants[swapIndex];

    // Prove to TypeScript they exist
    if (!currentItem || !swapItem) return;

    // Swap the items
    newVariants[index] = swapItem;
    newVariants[swapIndex] = currentItem;

    // Recalculate sort order based on array position
    const reordered = newVariants.map((v, i) => ({ ...v, sortOrder: i }));

    // Update UI instantly
    setLocalVariants(reordered);

    // Save to database
    const payload = reordered.map((v) => ({
      id: v.id,
      sortOrder: v.sortOrder,
    }));
    await updateVariantOrder(designId, payload);
  }
  return (
    <div className="space-y-6">
      {/* Add New Variant Section (Unchanged) */}
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

      {/* Existing Variants Section */}
      <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold">Existing Variants</h2>

        <div className="space-y-4">
          {localVariants.map((variant, index) => (
            <div
              key={variant.id}
              className="flex flex-col items-start justify-between gap-4 rounded-md border bg-white p-4 sm:flex-row sm:items-center"
            >
              <div className="flex items-center gap-4">
                {/* Sorting Controls */}
                <div className="flex flex-col gap-1 border-r border-slate-100 pr-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-slate-900"
                    disabled={index === 0}
                    onClick={() => handleMove(index, "up")}
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-slate-400 hover:text-slate-900"
                    disabled={index === localVariants.length - 1}
                    onClick={() => handleMove(index, "down")}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Image & Color Info */}
                {variant.imageUrl ? (
                  <div className="relative h-16 w-16 overflow-hidden rounded border shadow-sm">
                    <Image
                      src={variant.imageUrl}
                      alt={variant.color}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded border bg-slate-50 p-1 text-center text-xs text-slate-500">
                    No image
                  </div>
                )}
                <span className="text-lg font-medium">{variant.color}</span>
              </div>

              {/* Actions */}
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

          {localVariants.length === 0 && (
            <p className="text-sm text-slate-500">No variants added yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
