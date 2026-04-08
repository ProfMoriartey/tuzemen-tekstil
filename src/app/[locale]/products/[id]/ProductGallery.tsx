"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Loader2, Search } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [magnifier, setMagnifier] = useState({
    show: false,
    x: 0,
    y: 0,
    bgX: 0,
    bgY: 0,
  });
  const [isMagnifierActive, setIsMagnifierActive] = useState(false);

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

  // ADDED SAFETY CHECKS FOR TYPESCRIPT
  const handleTouchStart = (e: React.TouchEvent) => {
    // NEW: Using optional chaining ?.[0]
    if (!e.targetTouches?.[0]) return;
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    // NEW: Using optional chaining ?.[0]
    if (!e.targetTouches?.[0]) return;
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) handleNext();
    else if (distance < -minSwipeDistance) handlePrev();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMagnifierActive || !imageContainerRef.current) return;

    const { left, top, width, height } =
      imageContainerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const bgX = (x / width) * 100;
    const bgY = (y / height) * 100;

    setMagnifier({ show: true, x, y, bgX, bgY });
  };

  useEffect(() => {
    if (!isMagnifierActive) {
      setMagnifier((prev) => ({ ...prev, show: false }));
    }
  }, [isMagnifierActive]);

  useEffect(() => {
    if (!carouselApi) return;
    carouselApi.scrollTo(selectedIndex);
  }, [carouselApi, selectedIndex]);

  const activeItem = carouselItems[selectedIndex];

  useEffect(() => {
    setIsLoading(true);
  }, [activeItem?.imageUrl]);

  if (!activeItem) return null;

  return (
    <div className="space-y-6">
      {/* Main Image Stage */}
      <div
        ref={imageContainerRef}
        className={`bg-theme-secondary/10 border-theme-primary/20 group relative aspect-square w-full touch-pan-y overflow-hidden rounded-xl border ${
          magnifier.show ? "cursor-none" : "cursor-default"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => {
          if (isMagnifierActive)
            setMagnifier((prev) => ({ ...prev, show: true }));
        }}
        onMouseLeave={() => setMagnifier((prev) => ({ ...prev, show: false }))}
        onMouseMove={handleMouseMove}
      >
        {/* MOVED TO BOTTOM RIGHT: Changed top-4 to bottom-4 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMagnifierActive(!isMagnifierActive);
          }}
          className={`focus:ring-theme-accent absolute right-4 bottom-4 z-40 hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full shadow-md transition-all focus:ring-2 focus:outline-none md:flex ${
            isMagnifierActive
              ? "bg-theme-text text-theme-bg hover:bg-theme-text/90"
              : "bg-theme-bg/90 text-theme-text opacity-0 group-hover:opacity-100 hover:scale-105 hover:bg-theme-bg"
          }`}
          aria-label={
            isMagnifierActive ? "Disable magnifier" : "Enable magnifier"
          }
          title="Toggle Magnifier"
        >
          <Search className="h-5 w-5" />
        </button>

        {isLoading && (
          <div className="bg-theme-bg/60 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
            <Loader2 className="text-theme-primary h-8 w-8 animate-spin" />
          </div>
        )}

        <Image
          src={activeItem.imageUrl}
          alt={t("imageAlt.template", {
            name: designName,
            color: activeItem.color,
          })}
          fill
          onLoad={() => setIsLoading(false)}
          className={`object-cover transition-opacity duration-500 select-none ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          draggable={false}
        />

        {/* The Magnifying Glass Element */}
        {magnifier.show && !isLoading && (
          <div
            className="bg-theme-secondary/20 border-theme-bg pointer-events-none absolute z-30 hidden h-50 w-50 rounded-full border-[3px] shadow-[0_8px_30px_rgb(0,0,0,0.3)] md:block"
            style={{
              left: `${magnifier.x - 95}px`,
              top: `${magnifier.y - 95}px`,
              backgroundImage: `url(${activeItem.imageUrl})`,
              backgroundPosition: `${magnifier.bgX}% ${magnifier.bgY}%`,
              backgroundSize: "550%",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {carouselItems.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="focus:ring-theme-accent bg-theme-bg/90 text-theme-text absolute top-1/2 left-4 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-105 hover:bg-theme-bg focus:opacity-100 focus:ring-2 focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 pr-0.5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="focus:ring-theme-accent bg-theme-bg/90 text-theme-text absolute top-1/2 right-4 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full opacity-0 shadow-md transition-all group-hover:opacity-100 hover:scale-105 hover:bg-theme-bg focus:opacity-100 focus:ring-2 focus:outline-none"
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
          <h3 className="text-theme-text font-semibold">{t("colorsTitle")}</h3>
          <span className="text-theme-text/70 text-sm font-medium tracking-wider uppercase">
            {activeItem.color}
          </span>
        </div>

        <div className="group relative">
          <Carousel
            setApi={setCarouselApi}
            opts={{ align: "start", dragFree: true, loop: false }}
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
                          ? "border-theme-text opacity-100 ring-theme-text ring-2 ring-offset-1"
                          : "border-transparent opacity-70 hover:border-theme-primary/70 hover:opacity-100"
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
                        <span className="text-theme-bg block truncate text-center text-[10px] font-medium drop-shadow-md">
                          {item.color}
                        </span>
                      </div>
                    </button>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:block">
              <CarouselPrevious className="bg-theme-bg/90 hover:bg-theme-bg left-1 h-8 w-8 shadow-sm" />
              <CarouselNext className="bg-theme-bg/90 hover:bg-theme-bg right-1 h-8 w-8 shadow-sm" />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
