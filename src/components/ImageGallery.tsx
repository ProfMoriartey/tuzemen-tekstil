"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

interface Variant {
  id: number;
  designId: number;
  color: string;
  sku: string | null;
  imageUrl: string | null;
}

interface Design {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  displayImageUrl: string | null;
  createdAt: Date;
}

interface ImageGalleryProps {
  design: Design;
  variants: Variant[];
}

export default function ImageGallery({ design, variants }: ImageGalleryProps) {
  const defaultImage = design.displayImageUrl ?? "/placeholder.jpg";
  const [activeImage, setActiveImage] = useState(defaultImage);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-lg">
        <Image
          src={activeImage}
          alt={design.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <Carousel className="mx-auto w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {variants.map((variant) => {
            const thumbImage = variant.imageUrl ?? "/placeholder.jpg";
            return (
              <CarouselItem key={variant.id} className="basis-1/4 pl-1">
                <button
                  onClick={() => setActiveImage(thumbImage)}
                  className="focus:ring-ring relative aspect-square w-full overflow-hidden rounded-md border-2 focus:ring-2"
                >
                  <Image
                    src={thumbImage}
                    alt={variant.color}
                    fill
                    className="object-cover"
                  />
                </button>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
