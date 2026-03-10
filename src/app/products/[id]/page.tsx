import { getDesignById } from "~/server/actions/fabrics";
import ImageGallery from "~/components/ImageGallery";
import { notFound } from "next/navigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const designId = parseInt((await params).id);
  const design = await getDesignById(designId);

  if (!design) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="w-full">
          <ImageGallery design={design} variants={design.variants} />
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-wide uppercase">
              {design.name}
            </h1>
            <p className="mt-2 text-lg text-gray-500">
              {design.category || "Uncategorized"}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="leading-relaxed text-gray-700">
              {design.description || "Detailed description coming soon."}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="mb-4 text-xl font-semibold">Available Colors</h2>
            <div className="flex flex-wrap gap-3">
              {design.variants.map((variant: any) => (
                <span
                  key={variant.id}
                  className="rounded-full border bg-gray-100 px-4 py-2 text-sm font-medium"
                >
                  {variant.color}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
