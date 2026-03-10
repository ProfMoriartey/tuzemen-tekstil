"use client";

import { useState } from "react";
import Image from "next/image";

export default function ImageGallery({
  design,
  variants,
}: {
  design: any;
  variants: any[];
}) {
  const defaultImage = design.displayImageUrl || "/placeholder.jpg";
  const [activeImage, setActiveImage] = useState(defaultImage);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={activeImage}
          alt={design.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-2">
        {variants.map((variant) => {
          const thumbImage = variant.imageUrl || "/placeholder.jpg";

          return (
            <button
              key={variant.id}
              onClick={() => setActiveImage(thumbImage)}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 focus:outline-none"
            >
              <Image
                src={thumbImage}
                alt={variant.color}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
