import { getDesignById } from "~/server/actions/fabrics";
import ImageGallery from "~/components/ImageGallery";
import { Badge } from "~/components/ui/badge";
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
            <p className="text-muted-foreground mt-2 text-lg">
              {design.category || "Uncategorized"}
            </p>
          </div>

          <div className="prose max-w-none">
            <p className="text-foreground leading-relaxed">
              {design.description || "Detailed description coming soon."}
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="mb-4 text-xl font-semibold">Available Colors</h2>
            <div className="flex flex-wrap gap-3">
              {design.variants.map((variant: any) => (
                <Badge
                  key={variant.id}
                  variant="secondary"
                  className="px-4 py-2 text-sm"
                >
                  {variant.color}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
