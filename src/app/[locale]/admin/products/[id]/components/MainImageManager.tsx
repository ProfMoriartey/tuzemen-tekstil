"use client";

import Image from "next/image";
import { Button } from "~/components/ui/button";
import { UploadButton } from "~/utils/uploadthing";
import {
  updateDisplayImage,
  deleteDisplayImage,
} from "~/server/actions/variants";

export default function MainImageManager({
  designId,
  designName,
  displayImageUrl,
}: {
  designId: number;
  designName: string;
  displayImageUrl: string | null;
}) {
  async function handleDeleteDisplayImage() {
    if (displayImageUrl) {
      await deleteDisplayImage(designId, displayImageUrl);
    }
  }

  return (
    <div className="space-y-6 rounded-lg border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold">Main Display Image</h2>

      {displayImageUrl ? (
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border bg-slate-100 shadow-sm">
            <Image
              src={displayImageUrl}
              alt={designName}
              fill
              className="object-cover"
              unoptimized
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
                await updateDisplayImage(designId, res[0].url);
              }
            }}
            onUploadError={(error: Error) => {
              alert(`Error: ${error.message}`);
            }}
          />
        </div>
      )}
    </div>
  );
}
