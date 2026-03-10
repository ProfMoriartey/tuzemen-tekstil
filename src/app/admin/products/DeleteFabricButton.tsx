"use client";

import { Button } from "~/components/ui/button";
import { deleteFabricComplete } from "~/server/actions/fabrics";

export default function DeleteFabricButton({ id }: { id: number }) {
  async function handleDelete() {
    if (
      window.confirm(
        "Are you sure you want to delete this fabric and all its images completely?",
      )
    ) {
      await deleteFabricComplete(id);
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleDelete}>
      Delete
    </Button>
  );
}
