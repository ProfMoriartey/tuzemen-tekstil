import { Link } from "~/i18n/routing";
import Image from "next/image";
import { ArrowRight, Ruler, Palette, ShieldCheck } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { getFeaturedDesigns } from "~/server/actions/public";
import FabricCard, { type Design } from "~/components/FabricCard";
import HeroCarousel from "~/components/HeroCarousel";
import EventsCarousel from "~/components/EventsCarousel";
import StatsSection from "~/components/StatsSection";


export default async function LandingPage() {
  const t = await getTranslations("LandingPage");
  const featuredDesigns = await getFeaturedDesigns(4);

  return (
    <div className="flex min-h-screen flex-col">
      <HeroCarousel />

      {/* Feature 1: Text Left, Image Right */}
      <section className="bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase md:text-4xl">
                {t("sheers.title")}
              </h2>
              <p className="text-theme-text/80 text-lg leading-relaxed">
                {t("sheers.description")}
              </p>
              <Link
                href="/products"
                className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
              >
                {t("sheers.link")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="bg-theme-secondary/10 relative aspect-video w-full overflow-hidden rounded-xl lg:aspect-4/3">
              <Image
                src="https://cdn.tuzemengroup.com/uploads/large_Adobe_Stock_396957872_37ef4ed558_04b20ceb76.jpeg?w=2048&q=75"
                alt={t("sheers.imageAlt")}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Image Left, Text Right */}
      <section className="bg-theme-bg border-theme-primary/30 border-t px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="bg-theme-secondary/10 relative order-last aspect-video w-full overflow-hidden rounded-xl lg:order-first lg:aspect-4/3">
              <Image
                src="https://cdn.tuzemengroup.com/uploads/win3_5ab69159a7.jpg?w=1920&q=75"
                alt={t("drapery.imageAlt")}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase md:text-4xl">
                {t("drapery.title")}
              </h2>
              <p className="text-theme-text/80 text-lg leading-relaxed">
                {t("drapery.description")}
              </p>
              <Link
                href="/products"
                className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
              >
                {t("drapery.link")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      {/* <section className="border-theme-primary/30 border-t border-b bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
                <Palette className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                {t("values.variants.title")}
              </h3>
              <p className="text-theme-text/70">
                {t("values.variants.description")}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
                <Ruler className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                {t("values.dimensions.title")}
              </h3>
              <p className="text-theme-text/70">
                {t("values.dimensions.description")}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
                <ShieldCheck className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                {t("values.quality.title")}
              </h3>
              <p className="text-theme-text/70">
                {t("values.quality.description")}
              </p>
            </div>
          </div>
        </div>
      </section> */}

<StatsSection />

      {/* Featured Products */}
      <section className="bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-theme-text mb-2 text-3xl font-bold tracking-wide uppercase">
                {t("products.title")}
              </h2>
              <p className="text-theme-text/70">{t("products.description")}</p>
            </div>
            <Link
              href="/products"
              className="text-theme-accent hover:text-theme-secondary hidden items-center text-sm font-bold uppercase transition-colors md:inline-flex"
            >
              {t("products.viewAll")}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredDesigns.map((design: Design) => (
              <FabricCard key={design.id} design={design} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="text-theme-accent border-theme-accent inline-flex items-center border-b pb-1 text-sm font-bold uppercase"
            >
              {t("products.viewAllMobile")}
            </Link>
          </div>
        </div>
      </section>
      <EventsCarousel />
    </div>
  );
}
