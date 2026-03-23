"use client";

import { Button } from "~/components/ui/button";
import { deleteFabricComplete } from "~/server/actions/fabrics";

export default function DangerZone({ designId }: { designId: number }) {
  async function handleDeleteEntireFabric() {
    if (
      window.confirm(
        "Are you sure you want to delete this fabric and all its images completely? This action cannot be undone.",
      )
    ) {
      await deleteFabricComplete(designId);
    }
  }

  return (
    <div className="mt-8 space-y-4 rounded-lg border border-red-200 bg-red-50 p-6 shadow-sm">
      <h2 className="text-xl font-bold text-red-700">Danger Zone</h2>
      <p className="text-sm text-red-600">
        Permanently remove this fabric, all its color variants, and all
        associated images from your database and file storage.
      </p>
      <Button
        variant="destructive"
        onClick={handleDeleteEntireFabric}
        className="w-full"
      >
        Delete Entire Fabric
      </Button>
    </div>
  );
}
