import Image from "next/image";
import { Link } from "~/i18n/routing";
import { ShieldCheck, Leaf, Factory, Scissors, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import EventsCarousel from "~/components/EventsCarousel";

export default async function AboutPage() {
  const t = await getTranslations("AboutPage");

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative flex min-h-100 items-center overflow-hidden px-4 py-24 md:py-36">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.tuzemengroup.com/uploads/large_Adobe_Stock_396957872_37ef4ed558_04b20ceb76.jpeg?w=2048&q=75"
            alt={t("hero.imageAlt")}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="bg-theme-secondary/70 absolute inset-0"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h1 className="text-theme-primary mb-6 text-4xl font-bold tracking-tight uppercase md:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="text-slate-800 mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="bg-theme-secondary/20 relative aspect-square w-full overflow-hidden rounded-xl lg:aspect-4/3">
              <Image
                src="/tuzemen-family.jpeg"
                alt={t("heritage.imageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase">
                {t("heritage.title")}
              </h2>
              <div className="text-theme-text/80 space-y-4 text-lg leading-relaxed">
                <p>{t("heritage.p1")}</p>
                <p>{t("heritage.p2")}</p>
                <p>{t("heritage.p3")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Video Section */}
      <section className="bg-theme-secondary px-4 py-16 text-theme-primary md:py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight uppercase">
              {t("video.title")}
            </h2>
            <p className="text-theme-primary/80 mx-auto max-w-2xl text-lg">
              {t("video.description")}
            </p>
          </div>

          <div className="border-theme-primary/20 bg-theme-text relative aspect-video w-full overflow-hidden rounded-xl border shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/5Vjr305OYPI?si=PnZmwhQwsTDjww_J"
              title={t("video.iframeTitle")}
              className="absolute top-0 left-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
      <EventsCarousel />
      {/* Core Values / Manufacturing Standards */}
      {/* <section className="border-theme-primary/30 border-t bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-theme-text mb-4 text-3xl font-bold tracking-tight uppercase">
              {t("standards.title")}
            </h2>
            <p className="text-theme-text/70 mx-auto max-w-2xl text-lg">
              {t("standards.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Factory className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                {t("standards.facilities.title")}
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                {t("standards.facilities.description")}
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <ShieldCheck className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                {t("standards.testing.title")}
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                {t("standards.testing.description")}
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Scissors className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                {t("standards.finishing.title")}
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                {t("standards.finishing.description")}
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Leaf className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                {t("standards.sustainability.title")}
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                {t("standards.sustainability.description")}
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      <section className="bg-theme-secondary px-4 py-16 text-center text-theme-primary md:py-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight uppercase md:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="text-theme-primary mb-10 text-lg">
            {t("cta.description")}
          </p>
          <Link
            href="/products"
            className="bg-theme-text text-theme-bg inline-flex items-center justify-center rounded-md px-8 py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
          >
            {t("cta.button")}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
