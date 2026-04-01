"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"; // Added Loader2
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "~/components/ui/carousel";

interface Variant {
  id: number;
  color: string;
  imageUrl: string | null;
}

export default function ProductGallery({
  designName,
  displayImageUrl,
  variants,
}: {
  designName: string;
  displayImageUrl: string | null;
  variants: Variant[];
}) {
  const t = useTranslations("ProductGallery");
  const defaultImage = displayImageUrl ?? "/placeholder.jpg";

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();

  // NEW: Track the loading state of the main image
  const [isLoading, setIsLoading] = useState(true);

  const carouselItems = [
    {
      id: "original",
      color: t("original"),
      imageUrl: defaultImage,
    },
    ...variants.map((v) => ({
      id: v.id.toString(),
      color: v.color,
      imageUrl: v.imageUrl ?? defaultImage,
    })),
  ];

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1,
    );
  }, [carouselItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1,
    );
  }, [carouselItems.length]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(selectedIndex);
  }, [carouselApi, selectedIndex]);

  const activeItem = carouselItems[selectedIndex];

  // NEW: Reset loading state whenever the active image URL changes
  useEffect(() => {
    setIsLoading(true);
  }, [activeItem?.imageUrl]);

  if (!activeItem) return null;

  return (
    <div className="space-y-6">
      {/* Main Image Stage */}
      <div className="group relative aspect-square w-full overflow-hidden rounded-xl border bg-slate-50">
        {/* NEW: Loading Spinner Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-50/50 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
          </div>
        )}

        <Image
          src={activeItem.imageUrl}
          alt={t("imageAlt.template", {
            name: designName,
            color: activeItem.color,
          })}
          fill
          // NEW: Added onLoad handler and dynamic opacity for a smooth fade-in
          onLoad={() => setIsLoading(false)}
          className={`object-cover transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />

        {carouselItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="focus:ring-theme-accent absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-105 hover:bg-white focus:opacity-100 focus:ring-2 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 pr-0.5" />
            </button>

            <button
              onClick={handleNext}
              className="focus:ring-theme-accent absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-800 opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-105 hover:bg-white focus:opacity-100 focus:ring-2 focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 pl-0.5" />
            </button>
          </>
        )}
      </div>

      {/* Interactive Thumbnail Carousel */}
      <div>
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-semibold text-slate-900">{t("colorsTitle")}</h3>
          <span className="text-sm font-medium tracking-wider text-slate-500 uppercase">
            {activeItem.color}
          </span>
        </div>

        <div className="group relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {carouselItems.map((item, index) => {
                const isSelected = selectedIndex === index;

                return (
                  <CarouselItem
                    key={item.id}
                    className="basis-1/4 pl-2 sm:basis-1/5 md:basis-1/4 lg:basis-1/5"
                  >
                    <button
                      onClick={() => setSelectedIndex(index)}
                      className={`focus:ring-theme-accent relative flex aspect-square w-full flex-col overflow-hidden rounded-lg border-2 transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none ${
                        isSelected
                          ? "border-slate-900 opacity-100 ring-2 ring-slate-900 ring-offset-1"
                          : "border-transparent opacity-70 hover:border-slate-300 hover:opacity-100"
                      }`}
                      aria-label={`Select color ${item.color}`}
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.color}
                        fill
                        sizes="100px"
                        className="object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent p-1.5 pb-1">
                        <span className="block truncate text-center text-[10px] font-medium text-white drop-shadow-md">
                          {item.color}
                        </span>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            <div className="hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
              <CarouselPrevious className="left-1 h-8 w-8 bg-white/90 shadow-sm hover:bg-white" />
              <CarouselNext className="right-1 h-8 w-8 bg-white/90 shadow-sm hover:bg-white" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
