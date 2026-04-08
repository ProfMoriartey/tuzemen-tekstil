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

  const phoneNumber = "905315293985"; // Replace with your actual Turkish number
  const message = "Hello, I am interested in your fabrics.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
      <header className="border-theme-primary/20 mb-6 flex items-center justify-between border-b pb-4">
        {/* Left Side: Back Button (Styled to match the Prev/Next buttons) */}
        <Link
          href="/products"
          className="text-theme-text/70 hover:text-theme-text group flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <div className="bg-theme-bg border-theme-primary/30 group-hover:border-theme-primary/60 group-hover:bg-theme-secondary/10 flex h-8 w-8 items-center justify-center rounded-full border transition-all">
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
            <p className="text-theme-text/70 mb-2 text-sm font-semibold tracking-widest uppercase">
              {fabric.category ?? t("info.uncategorized")}
            </p>
            <h1 className="text-theme-text mb-4 text-3xl font-bold uppercase md:text-4xl">
              {fabric.name}
            </h1>

            {fabric.fabricType && (
              <span className="bg-theme-secondary/20 text-theme-text inline-block rounded px-3 py-1 text-xs font-bold tracking-wider uppercase">
                {fabric.fabricType}
              </span>
            )}
          </div>

          {fabric.description && (
            <div className="text-theme-text/80 mb-8 leading-relaxed">
              <p>{fabric.description}</p>
            </div>
          )}

          {/* Technical Specifications Board */}
          <div className="bg-theme-secondary/10 border-theme-primary/20 mb-8 rounded-xl border p-6">
            <h3 className="text-theme-text border-theme-primary/30 mb-4 border-b pb-2 text-sm font-bold tracking-wider uppercase">
              {t("specs.title")}
            </h3>

            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 text-sm sm:grid-cols-2">
              <div className="flex flex-col">
                <dt className="text-theme-text/70 mb-1 font-medium">
                  {t("specs.composition")}
                </dt>
                <dd className="text-theme-text font-semibold">
                  {fabric.composition ?? t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-theme-text/70 mb-1 font-medium">
                  {t("specs.width")}
                </dt>
                <dd className="text-theme-text font-semibold">
                  {fabric.width ? `${fabric.width} cm` : t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-theme-text/70 mb-1 font-medium">
                  {t("specs.weight")}
                </dt>
                <dd className="text-theme-text font-semibold">
                  {fabric.weight ? `${fabric.weight} g/m²` : t("specs.na")}
                </dd>
              </div>

              <div className="flex flex-col">
                <dt className="text-theme-text/70 mb-1 font-medium">
                  {t("specs.leadband")}
                </dt>
                <dd className="text-theme-text font-semibold">
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
          <a href={whatsappUrl}></a>
          <button className="bg-theme-accent text-theme-secondary mt-8 flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide uppercase shadow-sm transition-all hover:opacity-90">
            <span className="mr-3">{t("contactButton.text")}</span>
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </button>
          <a />
        </div>
      </div>
    </div>
  );
}
