import { getFabricById, getAdjacentDesigns } from "~/server/actions/public";
import { notFound } from "next/navigation";
import { Link } from "~/i18n/routing";
import { ChevronLeft, Undo2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProductGallery from "./ProductGallery";
import RequestSampleButton from "~/components/RequestSampleButton";
import ProductNavigation from "~/components/ProductNavigation";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const t = await getTranslations("ProductDetailsPage");
  const resolvedParams = await params;
  const fabricId = Number(resolvedParams.id);

  if (isNaN(fabricId)) notFound();

  const fabric = await getFabricById(fabricId);
  if (!fabric) notFound();

  const adjacentDesigns = await getAdjacentDesigns(fabric.name);

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      {/* NEW NAVIGATION HEADER 
        Flexbox ensures everything stays perfectly on one horizontal line. 
        A subtle bottom border separates it from the product content.
      */}
      <header className="mb-6 flex items-center justify-between border-b border-slate-100 pb-4">
        {/* Left Side: Back Button (Styled to match the Prev/Next buttons) */}
        <Link
          href="/products"
          className="group flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white transition-all group-hover:border-slate-300 group-hover:bg-slate-50">
            <Undo2 className="h-4 w-4 pr-0.5" />
          </div>
          {/* Hide the text 'Back' on tiny mobile screens if needed, otherwise show it */}
          <span className="hidden sm:inline">{t("nav.back")}</span>
        </Link>

        {/* Right Side: Prev/Next Buttons */}
        <ProductNavigation
          previous={adjacentDesigns.previous}
          next={adjacentDesigns.next}
        />
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Interactive Gallery */}
        <div>
          <ProductGallery
            designName={fabric.name}
            displayImageUrl={fabric.displayImageUrl}
            variants={fabric.variants}
          />
        </div>

        {/* Right Column: Product Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold tracking-widest text-slate-500 uppercase">
              {fabric.category ?? t("info.uncategorized")}
            </p>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 uppercase md:text-4xl">
              {fabric.name}
            </h1>

            {fabric.fabricType && (
              <span className="inline-block rounded bg-slate-100 px-3 py-1 text-xs font-bold tracking-wider text-slate-800 uppercase">
                {fabric.fabricType}
              </span>
            )}
          </div>

          {fabric.description && (
            <div className="prose prose-slate mb-8 leading-relaxed text-slate-600">
              <p>{fabric.description}</p>
            </div>
          )}

          {/* Technical Specifications Board */}
          <div className="mb-8 rounded-xl border bg-slate-50 p-6">
            <h3 className="mb-4 border-b pb-2 text-sm font-bold tracking-wider text-slate-900 uppercase">
              {t("specs.title")}
            </h3>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 text-sm sm:grid-cols-2">
              <div className="flex flex-col">
                <dt className="mb-1 font-medium text-slate-500">
                  {t("specs.composition")}
                </dt>
                <dd className="font-semibold text-slate-900">
                  {fabric.composition ?? t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="mb-1 font-medium text-slate-500">
                  {t("specs.width")}
                </dt>
                <dd className="font-semibold text-slate-900">
                  {fabric.width ? `${fabric.width} cm` : t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="mb-1 font-medium text-slate-500">
                  {t("specs.weight")}
                </dt>
                <dd className="font-semibold text-slate-900">
                  {fabric.weight ? `${fabric.weight} g/m²` : t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="mb-1 font-medium text-slate-500">
                  {t("specs.leadband")}
                </dt>
                <dd className="font-semibold text-slate-900">
                  {fabric.hasLeadband === true
                    ? t("specs.yes")
                    : fabric.hasLeadband === false
                      ? t("specs.no")
                      : t("specs.na")}
                </dd>
              </div>
            </dl>
          </div>
          <RequestSampleButton
            designId={fabric.id}
            designName={fabric.name}
            displayImageUrl={fabric.displayImageUrl}
          />
        </div>
      </div>
    </div>
  );
}
