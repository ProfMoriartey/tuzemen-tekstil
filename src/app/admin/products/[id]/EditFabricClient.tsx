"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadButton } from "~/utils/uploadthing";
import {
  updateDisplayImage,
  createVariant,
  deleteVariant,
  updateVariantImage,
  deleteDisplayImage,
} from "~/server/actions/variants";
import { updateFabricDetails } from "~/server/actions/fabrics";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface Variant {
  id: number;
  designId: number;
  color: string;
  sku: string | null;
  imageUrl: string | null;
}

interface Design {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  displayImageUrl: string | null;
  createdAt: Date;
  variants: Variant[];
}

export default function EditFabricClient({ design }: { design: Design }) {
  const [color, setColor] = useState("");
  const [category, setCategory] = useState(design.category ?? "");
  const [description, setDescription] = useState(design.description ?? "");

  async function handleSaveDetails() {
    await updateFabricDetails(design.id, category, description);
    alert("Fabric details saved");
  }

  async function handleDeleteDisplayImage() {
    if (design.displayImageUrl) {
      await deleteDisplayImage(design.id, design.displayImageUrl);
    }
  }

  async function handleAddVariantWithoutImage() {
    if (!color) {
      alert("Please enter a color name");
      return;
    }
    await createVariant(design.id, color);
    setColor("");
  }

  async function handleDelete(variantId: number, imageUrl: string | null) {
    await deleteVariant(variantId, design.id, imageUrl);
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <div className="mb-8 space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Fabric Details</h2>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g. Velvet, Cotton, Silk"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the fabric pattern and texture"
              className="min-h-30"
            />
          </div>

          <Button onClick={handleSaveDetails} className="w-full">
            Save Details
          </Button>
        </div>

        <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Main Display Image</h2>

          {design.displayImageUrl ? (
            <div className="space-y-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-slate-100 shadow-sm">
                <Image
                  src={design.displayImageUrl}
                  alt={design.name}
                  fill
                  className="object-cover"
                />
              </div>
              <Button
                variant="destructive"
                onClick={handleDeleteDisplayImage}
                className="w-full"
              >
                Delete Main Image
              </Button>
            </div>
          ) : (
            <div className="flex aspect-square w-full flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed bg-slate-100 p-4 text-slate-500">
              <span>No main image uploaded</span>
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
          )}
        </div>
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
        </div>

        <div className="space-y-4 rounded-lg border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold">Existing Variants</h2>

          <div className="space-y-4">
            {design.variants.map((variant: Variant) => (
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
                          design.id,
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

            {design.variants.length === 0 && (
              <p className="text-sm text-slate-500">No variants added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
