import Link from "next/link";
import { ArrowRight, Ruler, Palette, ShieldCheck } from "lucide-react";
import { getFeaturedDesigns } from "~/server/actions/public";
import FabricCard, { type Design } from "~/components/FabricCard";

export default async function LandingPage() {
  const featuredDesigns = await getFeaturedDesigns(4);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-slate-900 px-4 py-20 text-white md:py-32">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight uppercase md:text-6xl">
            Premium Fabrics for Every Space
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
            Discover our curated collection of high-quality sheers and drapery.
            Built to exact specifications with industry-leading materials.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-md bg-white px-8 py-4 font-bold tracking-wide text-slate-900 uppercase transition-colors hover:bg-slate-100"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="border-b bg-white px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-slate-50 p-4">
                <Palette className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold uppercase">
                Vibrant Variants
              </h3>
              <p className="text-slate-500">
                Extensive color options to match any design requirement.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-slate-50 p-4">
                <Ruler className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold uppercase">
                Exact Dimensions
              </h3>
              <p className="text-slate-500">
                Precise width and weight specifications listed for every fabric.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="mb-4 rounded-full bg-slate-50 p-4">
                <ShieldCheck className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="mb-2 text-xl font-bold uppercase">
                Premium Quality
              </h3>
              <p className="text-slate-500">
                Durable compositions with optional leadbands for perfect
                draping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-slate-50 px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold tracking-wide uppercase">
                New Arrivals
              </h2>
              <p className="text-slate-500">
                Our latest additions to the catalog.
              </p>
            </div>
            <Link
              href="/products"
              className="hidden items-center text-sm font-bold text-slate-900 uppercase transition-colors hover:text-slate-600 md:inline-flex"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featuredDesigns.map((design: Design) => (
              <FabricCard key={design.id} design={design} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center border-b border-slate-900 pb-1 text-sm font-bold text-slate-900 uppercase"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
