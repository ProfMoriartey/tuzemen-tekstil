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
      <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white transition-shadow hover:shadow-md">
        <div className="relative aspect-square w-full shrink-0 bg-slate-100">
          <Image
            src={design.displayImageUrl ?? "/placeholder.jpg"}
            alt={design.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="mb-1 flex items-start justify-between gap-2">
            <h2 className="text-lg font-semibold uppercase">{design.name}</h2>
            {design.fabricType && (
              <span className="shrink-0 rounded bg-slate-800 px-2 py-0.5 text-xs font-medium text-white">
                {design.fabricType}
              </span>
            )}
          </div>

          <p className="mb-3 text-sm text-slate-500">
            {design.category ?? "Uncategorized"}
          </p>

          <div className="mb-4 grid grid-cols-2 gap-x-2 gap-y-1 rounded bg-slate-50 p-2 text-xs text-slate-600">
            {design.composition && (
              <div className="col-span-2">
                <span className="font-semibold">Comp:</span>{" "}
                {design.composition}
              </div>
            )}
            {design.width && (
              <div>
                <span className="font-semibold">Width:</span> {design.width} cm
              </div>
            )}
            {design.weight && (
              <div>
                <span className="font-semibold">Weight:</span> {design.weight}{" "}
                g/m²
              </div>
            )}
            {design.hasLeadband !== null && (
              <div>
                <span className="font-semibold">Leadband:</span>{" "}
                {design.hasLeadband ? "Yes" : "No"}
              </div>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-1">
            {design.variants.slice(0, 5).map((variant) => (
              <span
                key={variant.id}
                className="rounded border bg-white px-2 py-1 text-xs"
              >
                {variant.color}
              </span>
            ))}
            {design.variants.length > 5 && (
              <span className="rounded border bg-white px-2 py-1 text-xs">
                +{design.variants.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
