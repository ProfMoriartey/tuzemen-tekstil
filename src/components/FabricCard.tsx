import Image from "next/image";
import Link from "next/link";

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
  return (
    <Link href={`/products/${design.id}`} className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-all duration-200 hover:shadow-md">
        <div className="relative aspect-square w-full shrink-0 border-b bg-slate-100">
          <Image
            src={design.displayImageUrl ?? "/placeholder.jpg"}
            alt={design.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Responsive padding: tighter on mobile, standard on desktop */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h2 className="text-sm leading-tight font-bold text-slate-900 uppercase sm:text-base">
              {design.name}
            </h2>
            {design.fabricType && (
              <span className="shrink-0 rounded-sm bg-slate-900 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase sm:text-xs">
                {design.fabricType}
              </span>
            )}
          </div>

          <div className="mb-3 flex flex-col gap-0.5 text-[11px] text-slate-600 sm:text-xs">
            {design.width && (
              <div>
                <span className="font-semibold text-slate-500">Width:</span>{" "}
                {design.width} cm
              </div>
            )}
            {design.composition && (
              <div className="line-clamp-1" title={design.composition}>
                <span className="font-semibold text-slate-500">Comp:</span>{" "}
                {design.composition}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-1 border-t border-slate-50 pt-2">
            {design.variants.slice(0, 4).map((variant) => (
              <span
                key={variant.id}
                className="max-w-18.75 truncate rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600"
              >
                {variant.color}
              </span>
            ))}
            {design.variants.length > 4 && (
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                +{design.variants.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
