"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "~/i18n/routing";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export default function HeroCarousel() {
  const t = useTranslations("HeroCarousel");
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  // Static data for images, while text is pulled from translations
  const slides = [
    {
      id: 1,
      image:
       "https://cdn.tuzemengroup.com/uploads/winbrella_sosyal_yeni_1_126_87d70ea499.JPG?w=3840&q=75",
    },
    {
      id: 2,
      image:
      "https://cdn.tuzemengroup.com/uploads/DSC_3212_5796bdce25.jpg?w=3840&q=75",
    },
    {
      id: 3,
      image:
        "https://cdn.tuzemengroup.com/uploads/DBBC_9725_Kopya_26268c3a4c.JPG?w=3840&q=75",
    },
    {
      id: 4,
      image:
        "https://cdn.tuzemengroup.com/uploads/DSC_3037_9456a8533d.jpg?w=3840&q=75",
    },
  ];

  return (
    <section className="bg-theme-secondary relative w-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex min-h-150 items-center md:min-h-175">
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={t(`slides.${index}.title`)}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="100vw"
                  />
                  <div className="from-card-foreground/50 via-card-foreground/30 to-card/10 absolute inset-0 bg-linear-to-r"></div>
                </div>

                <div className="relative z-10 container mx-auto w-full px-4 md:px-8">
                  <div className="max-w-2xl">
                    <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-theme-bg uppercase md:text-5xl xl:text-6xl">
                      {t(`slides.${index}.title`)}
                    </h1>
                    <p className="text-theme-bg/90 mb-10 text-lg leading-relaxed md:text-xl">
                      {t(`slides.${index}.description`)}
                    </p>
                    <Link
                      href="/products"
                      className="bg-theme-bg text-theme-text inline-flex items-center justify-center rounded-md px-8 py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
                    >
                      {t("cta")}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute right-36 bottom-12 z-20 hidden space-x-4 lg:block">
          <CarouselPrevious className="bg-theme-bg/10 hover:bg-theme-bg text-theme-bg hover:text-theme-secondary static h-12 w-12 translate-x-0 translate-y-0 border-none backdrop-blur-sm transition-all" />
          <CarouselNext className="bg-theme-bg/10 hover:bg-theme-bg text-theme-bg hover:text-theme-secondary relative h-12 w-12 translate-x-0 translate-y-0 border-none backdrop-blur-sm transition-all" />
        </div>
      </Carousel>
    </section>
  );
}
