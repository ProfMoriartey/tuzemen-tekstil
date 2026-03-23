import { getFabricById } from "~/server/actions/public";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import ProductGallery from "./ProductGallery";
import RequestSampleButton from "~/components/RequestSampleButton";

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

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      {/* Navigation */}
      <Link
        href="/products"
        className="mb-8 inline-flex items-center text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        {t("nav.back")}
      </Link>

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
