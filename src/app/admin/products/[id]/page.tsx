import { getDesignById } from "~/server/actions/fabrics";
import { notFound } from "next/navigation";
import EditFabricClient from "./EditFabricClient";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const designId = parseInt(params.id);
  const design = await getDesignById(designId);

  if (!design) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <h1 className="text-2xl font-bold">Edit Design: {design.name}</h1>
      <EditFabricClient design={design} />
    </div>
  );
}
