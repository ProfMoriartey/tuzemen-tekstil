import {
  getStorefrontDesigns,
  getAvailableColors,
  getAvailableCategories,
} from "~/server/actions/public";
import StorefrontFilter from "~/components/StorefrontFilter";
import Image from "next/image";
import Link from "next/link";

interface Variant {
  id: number;
  color: string;
}

interface Design {
  id: number;
  name: string;
  category: string | null;
  displayImageUrl: string | null;
  variants: Variant[];
}

export default async function StorefrontPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    colors?: string;
    categories?: string;
    sort?: string;
    order?: string;
  }>;
}) {
  const params = await searchParams;

  const query = params.q ?? "";
  const colorsArray = params.colors
    ? params.colors.split(",").filter(Boolean)
    : [];
  const categoriesArray = params.categories
    ? params.categories.split(",").filter(Boolean)
    : [];
  const sort = params.sort ?? "name";
  const order = (params.order as "asc" | "desc") ?? "asc";

  const [designs, availableColors, availableCategories] = await Promise.all([
    getStorefrontDesigns(query, colorsArray, categoriesArray, sort, order),
    getAvailableColors(),
    getAvailableCategories(),
  ]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          Tuzemen Fabrics
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore our premium collection.
        </p>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <StorefrontFilter
            availableColors={availableColors}
            availableCategories={availableCategories}
          />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {designs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                No fabrics found matching your filters.
              </div>
            ) : (
              designs.map((design: Design) => (
                <Link
                  key={design.id}
                  href={`/products/${design.id}`}
                  className="group block"
                >
                  <div className="overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
                    <div className="relative aspect-square w-full bg-slate-100">
                      <Image
                        src={design.displayImageUrl ?? "/placeholder.jpg"}
                        alt={design.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold uppercase">
                        {design.name}
                      </h2>
                      <p className="mb-2 text-sm text-slate-500">
                        {design.category ?? "Uncategorized"}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {design.variants.slice(0, 5).map((variant) => (
                          <span
                            key={variant.id}
                            className="rounded border bg-slate-100 px-2 py-1 text-xs"
                          >
                            {variant.color}
                          </span>
                        ))}
                        {design.variants.length > 5 && (
                          <span className="rounded border bg-slate-100 px-2 py-1 text-xs">
                            +{design.variants.length - 5}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
