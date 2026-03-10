import { getDesignsWithVariants } from "~/server/actions/fabrics";
import Link from "next/link";

export default async function ProductsPage() {
  const designs = await getDesignsWithVariants();

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-2xl font-bold">Our Fabrics</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {designs.map((design) => (
          <div key={design.id} className="rounded-lg border p-4">
            <h2 className="mb-2 text-xl font-semibold">{design.name}</h2>

            <p className="mb-4 text-gray-600">
              {design.variants.length} colors available
            </p>

            <Link
              href={`/products/${design.id}`}
              className="block rounded bg-black px-4 py-2 text-center text-white"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
