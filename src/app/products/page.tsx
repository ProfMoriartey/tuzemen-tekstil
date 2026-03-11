import {
  getStorefrontDesigns,
  getAvailableColors,
  getAvailableCategories,
  getAvailableWidths,
} from "~/server/actions/public";
import StorefrontFilter from "~/components/StorefrontFilter";
import FabricCard, { type Design } from "~/components/FabricCard";

export default async function StorefrontPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    colors?: string;
    categories?: string;
    sort?: string;
    order?: string;
    widths?: string;
    leadband?: string;
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

  const widthsArray = params.widths
    ? params.widths
        .split(",")
        .map(Number)
        .filter((n) => !isNaN(n))
    : [];

  let leadbandFilter: boolean | undefined = undefined;
  if (params.leadband === "yes") leadbandFilter = true;
  if (params.leadband === "no") leadbandFilter = false;

  const sort = params.sort ?? "name";
  const order = (params.order as "asc" | "desc") ?? "asc";

  const [designs, availableColors, availableCategories, availableWidths] =
    await Promise.all([
      getStorefrontDesigns(
        query,
        colorsArray,
        categoriesArray,
        widthsArray,
        leadbandFilter,
        sort,
        order,
      ),
      getAvailableColors(),
      getAvailableCategories(),
      getAvailableWidths(),
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
            availableWidths={availableWidths}
          />
        </aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {designs.length === 0 ? (
              <div className="col-span-full py-12 text-center text-slate-500">
                No fabrics found matching your filters.
              </div>
            ) : (
              designs.map((design: Design) => (
                <FabricCard key={design.id} design={design} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
