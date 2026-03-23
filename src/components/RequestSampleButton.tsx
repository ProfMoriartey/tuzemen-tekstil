"use client";

import { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import { useCart } from "~/store/useCart";

export default function RequestSampleButton({
  designId,
  designName,
  displayImageUrl,
}: {
  designId: number;
  designName: string;
  displayImageUrl: string | null;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.items);

  // Wait for client to mount to avoid hydration errors with local storage
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAlreadyInCart = cartItems.some((item) => item.id === designId);

  // Show a blank placeholder of the same size while loading to prevent layout shift
  if (!isMounted)
    return (
      <div className="mt-8 h-14 w-full animate-pulse rounded-md bg-slate-100" />
    );

  return (
    <button
      onClick={() =>
        addItem({ id: designId, name: designName, imageUrl: displayImageUrl })
      }
      disabled={isAlreadyInCart}
      className={`mt-8 flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide uppercase transition-all ${
        isAlreadyInCart
          ? "cursor-not-allowed bg-slate-100 text-slate-400"
          : "bg-theme-accent text-theme-secondary shadow-sm hover:opacity-90"
      }`}
    >
      {isAlreadyInCart ? "Hanger Added to Cart" : "Request Sample Hanger"}
      {isAlreadyInCart ? (
        <Check className="ml-2 h-5 w-5" />
      ) : (
        <Plus className="ml-2 h-5 w-5" />
      )}
    </button>
  );
}
