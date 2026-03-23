"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Plus } from "lucide-react";
import { useCart } from "~/store/useCart";

interface Variant {
  id: number;
  color: string;
  imageUrl: string | null;
}

export default function ProductGallery({
  designId,
  designName,
  displayImageUrl,
  variants,
}: {
  designId: number;
  designName: string;
  displayImageUrl: string | null;
  variants: Variant[];
}) {
  const defaultImage = displayImageUrl ?? "/placeholder.jpg";
  const [activeImage, setActiveImage] = useState(defaultImage);
  const [activeColor, setActiveColor] = useState<string | null>(null);

  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.items);

  function handleVariantClick(variant: Variant) {
    setActiveColor(variant.color);
    if (variant.imageUrl) {
      setActiveImage(variant.imageUrl);
    } else {
      setActiveImage(defaultImage);
    }
  }

  function handleAddToCart() {
    if (!activeColor) return;

    addItem({
      id: `${designId}-${activeColor}`,
      designId: designId,
      name: designName,
      color: activeColor,
      imageUrl: activeImage === defaultImage ? null : activeImage,
    });
  }

  // Check if the currently selected variant is already in the cart
  const isAlreadyInCart = cartItems.some(
    (item) => item.id === `${designId}-${activeColor}`,
  );

  return (
    <div className="space-y-6">
      {/* Main Image Stage */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-slate-50">
        <Image
          src={activeImage}
          alt={`${designName} - ${activeColor ?? "Main"}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Color Selector */}
      <div>
        <div className="mb-3 flex items-end justify-between">
          <h3 className="font-semibold text-slate-900">Available Colors</h3>
          {activeColor && (
            <span className="text-sm font-medium text-slate-500">
              {activeColor}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Option to reset to main image */}
          <button
            onClick={() => {
              setActiveImage(defaultImage);
              setActiveColor(null);
            }}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              activeColor === null
                ? "border-slate-900 bg-slate-900 text-white"
                : "bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            Original
          </button>

          {/* Variant buttons */}
          {variants.map((variant) => {
            const isSelected = activeColor === variant.color;
            return (
              <button
                key={variant.id}
                onClick={() => handleVariantClick(variant)}
                className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  isSelected
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5" />}
                {variant.color}
              </button>
            );
          })}
        </div>
      </div>
      {/* Add to Cart Action Area */}
      {activeColor && (
        <div className="mt-6 border-t pt-6">
          <button
            onClick={handleAddToCart}
            disabled={isAlreadyInCart}
            className={`flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide uppercase transition-all ${
              isAlreadyInCart
                ? "cursor-not-allowed bg-slate-100 text-slate-400"
                : "bg-theme-accent text-theme-secondary hover:opacity-90"
            }`}
          >
            {isAlreadyInCart ? "Sample Added" : "Request Sample"}
            {!isAlreadyInCart && <Plus className="ml-2 h-5 w-5" />}
          </button>
          <p className="mt-3 text-center text-xs text-slate-500">
            Select specific colors to add them to your sample inquiry list.
          </p>
        </div>
      )}
    </div>
  );
}
