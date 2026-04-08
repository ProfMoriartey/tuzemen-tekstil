"use client";

import Image from "next/image";
import { Link } from "~/i18n/routing";
import { useTranslations } from "next-intl";

interface Variant {
  id: number;
  color: string;
}

export interface Design {
  id: number;
  name: string;
  category: string | null;
  displayImageUrl: string | null;
  fabricType: string | null;
  composition: string | null;
  width: number | null;
  weight: number | null;
  hasLeadband: boolean | null;
  variants: Variant[];
}

export default function FabricCard({ design }: { design: Design }) {
  const t = useTranslations("FabricCard");

  return (
    <Link href={`/products/${design.id}`} className="group block h-full">
      <div className="bg-theme-bg border-theme-primary/20 flex h-full flex-col overflow-hidden rounded-lg border transition-all duration-200 hover:shadow-md">
        <div className="bg-theme-secondary/10 border-theme-primary/20 relative aspect-square w-full shrink-0 border-b">
          <Image
            src={design.displayImageUrl ?? "/placeholder.jpg"}
            alt={design.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h2 className="text-theme-text text-sm leading-tight font-bold uppercase sm:text-base">
              {design.name}
            </h2>
            {design.fabricType && (
              <span className="bg-theme-text text-theme-bg shrink-0 rounded-sm px-1.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase sm:text-xs">
                {design.fabricType}
              </span>
            )}
          </div>

          <div className="text-theme-text/80 mb-3 flex flex-col gap-0.5 text-[11px] sm:text-xs">
            {design.width && (
              <div>
                <span className="text-theme-text/70 font-semibold">
                  {t("specs.width")}:
                </span>{" "}
                {design.width} {t("specs.unit")}
              </div>
            )}
            {design.composition && (
              <div className="line-clamp-1" title={design.composition}>
                <span className="text-theme-text/70 font-semibold">
                  {t("specs.composition")}:
                </span>{" "}
                {design.composition}
              </div>
            )}
          </div>

          <div className="border-theme-primary/20 mt-auto flex flex-wrap gap-1 border-t pt-2">
            {design.variants.slice(0, 4).map((variant) => (
              <span
                key={variant.id}
                className="bg-theme-secondary/20 text-theme-text/80 max-w-18.75 truncate rounded px-1.5 py-0.5 text-[10px]"
              >
                {variant.color}
              </span>
            ))}
            {design.variants.length > 4 && (
              <span className="bg-theme-secondary/20 text-theme-text/80 rounded px-1.5 py-0.5 text-[10px] font-medium">
                +{design.variants.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
