"use client";

import FabricDetailsForm from "./components/FabricDetailsForm";
import MainImageManager from "./components/MainImageManager";
import DangerZone from "./components/DangerZone";
import VariantManager from "./components/VariantManager";

interface Variant {
  id: number;
  designId: number;
  color: string;
  sku: string | null;
  imageUrl: string | null;
  sortOrder: number;
}

interface Design {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  displayImageUrl: string | null;
  fabricType: string | null;
  composition: string | null;
  width: number | null;
  weight: number | null;
  hasLeadband: boolean | null;
  createdAt: Date;
  variants: Variant[];
}

export default function EditFabricClient({ design }: { design: Design }) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div>
        <FabricDetailsForm
          designId={design.id}
          initialName={design.name}
          initialCategory={design.category}
          initialDescription={design.description}
          initialFabricType={design.fabricType}
          initialComposition={design.composition}
          initialWidth={design.width}
          initialWeight={design.weight}
          initialHasLeadband={design.hasLeadband}
        />

        <MainImageManager
          designId={design.id}
          designName={design.name}
          displayImageUrl={design.displayImageUrl}
        />
        <div className="hidden md:block">
          <DangerZone designId={design.id} />
        </div>
      </div>

      <div>
        <VariantManager designId={design.id} variants={design.variants} />
        <div className="block md:hidden">
          <DangerZone designId={design.id} />
        </div>
      </div>
    </div>
  );
}
