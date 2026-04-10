"use client";

import { useState, useEffect } from "react";
import { Plus, Check } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const t = useTranslations("RequestSampleButton");
  const [isMounted, setIsMounted] = useState(false);
  const addItem = useCart((state) => state.addItem);
  const cartItems = useCart((state) => state.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItem = cartItems.find((item) => item.id === designId);
  const currentQuantity = cartItem?.quantity ?? 0;

  if (!isMounted)
    return (
      <div className="mt-8 h-14 w-full cursor-pointer animate-pulse rounded-md bg-slate-100" />
    );

  return (
    <button
      onClick={() =>
        addItem({ id: designId, name: designName, imageUrl: displayImageUrl })
      }
      className="bg-foreground cursor-pointer text-background mt-8 flex w-full items-center justify-center rounded-md py-4 font-bold tracking-wide uppercase shadow-sm transition-all hover:opacity-90"
    >
      {currentQuantity > 0
        ? t("addAnother", { count: currentQuantity })
        : t("addFirst")}
      {currentQuantity > 0 ? (
        <Check className="ml-2 h-5 w-5" />
      ) : (
        <Plus className="ml-2 h-5 w-5" />
      )}
    </button>
  );
}
