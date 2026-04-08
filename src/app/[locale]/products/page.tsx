import {
  getStorefrontDesigns,
  getAvailableColors,
  getAvailableCategories,
  getAvailableWidths,
} from "~/server/actions/public";
import StorefrontFilter from "~/components/StorefrontFilter";
import FabricCard, { type Design } from "~/components/FabricCard";
import PaginationControls from "~/components/PaginationControls";
import { getTranslations } from "next-intl/server";

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
    page?: string;
    limit?: string;
  }>;
}) {
  const t = await getTranslations("StorefrontPage");
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

  // Parse pagination parameters with defaults
  const page = parseInt(params.page ?? "1", 10);
  const limit = parseInt(params.limit ?? "24", 10);

  // Destructure the updated response format
  const [designData, availableColors, availableCategories, availableWidths] =
    await Promise.all([
      getStorefrontDesigns(
        query,
        colorsArray,
        categoriesArray,
        widthsArray,
        leadbandFilter,
        sort,
        order,
        page,
        limit,
      ),
      getAvailableColors(),
      getAvailableCategories(),
      getAvailableWidths(),
    ]);

  const { designs, totalCount } = designData;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold tracking-wide uppercase">
          {t("header.title")}
        </h1>
        <p className="text-muted-foreground mt-2">{t("header.subtitle")}</p>
      </header>

      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-64">
          <StorefrontFilter
            availableColors={availableColors}
            availableCategories={availableCategories}
            availableWidths={availableWidths}
          />
        </aside>

        <main className="flex min-h-full flex-1 flex-col">
          <div className="grid flex-1 grid-cols-2 content-start gap-3 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
            {designs.length === 0 ? (
              <div className="text-theme-text/70 col-span-full py-12 text-center">
                {t("emptyState")}
              </div>
            ) : (
              designs.map((design: Design) => (
                <FabricCard key={design.id} design={design} />
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 0 && (
            <div className="border-theme-primary/30 mt-8 border-t pt-6">
              <PaginationControls
                currentPage={page}
                totalPages={totalPages}
                currentLimit={limit}
                totalCount={totalCount}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
