import Link from "next/link";
import { ArrowRight, Ruler, Palette, ShieldCheck } from "lucide-react";
import { getFeaturedDesigns } from "~/server/actions/public";
import FabricCard, { type Design } from "~/components/FabricCard";

export default async function LandingPage() {
  const featuredDesigns = await getFeaturedDesigns(4);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section - Using theme-secondary (Dark) and theme-accent (Green) */}
      <section className="bg-theme-secondary text-theme-bg relative overflow-hidden px-4 py-20 md:py-32">
        {/* Subtle decorative circle using theme-primary */}
        <div className="bg-theme-primary/10 absolute top-0 right-0 -mt-32 -mr-32 h-96 w-96 rounded-full blur-3xl"></div>

        <div className="relative z-10 container mx-auto max-w-5xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight uppercase md:text-6xl">
            Premium Fabrics for Every Space
          </h1>
          <p className="text-theme-primary mx-auto mb-10 max-w-2xl text-lg leading-relaxed md:text-xl">
            Discover our curated collection of high-quality sheers and drapery.
            Built to exact specifications with industry-leading materials.
          </p>
          <Link
            href="/products"
            className="bg-theme-accent text-theme-secondary inline-flex items-center justify-center rounded-md px-8 py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Value Propositions - Using theme-bg and theme-accent */}
      <section className="bg-theme-bg border-theme-primary/30 border-b px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="border-theme-primary/20 mb-4 rounded-full border bg-white p-4 shadow-sm">
                <Palette className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                Vibrant Variants
              </h3>
              <p className="text-theme-text/70">
                Extensive color options to match any design requirement.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="border-theme-primary/20 mb-4 rounded-full border bg-white p-4 shadow-sm">
                <Ruler className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                Exact Dimensions
              </h3>
              <p className="text-theme-text/70">
                Precise width and weight specifications listed for every fabric.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="border-theme-primary/20 mb-4 rounded-full border bg-white p-4 shadow-sm">
                <ShieldCheck className="text-theme-accent h-8 w-8" />
              </div>
              <h3 className="text-theme-text mb-2 text-xl font-bold uppercase">
                Premium Quality
              </h3>
              <p className="text-theme-text/70">
                Durable compositions with optional leadbands for perfect
                draping.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-theme-text mb-2 text-3xl font-bold tracking-wide uppercase">
                New Arrivals
              </h2>
              <p className="text-theme-text/70">
                Our latest additions to the catalog.
              </p>
            </div>
            <Link
              href="/products"
              className="text-theme-accent hover:text-theme-secondary hidden items-center text-sm font-bold uppercase transition-colors md:inline-flex"
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
              className="text-theme-accent border-theme-accent inline-flex items-center border-b pb-1 text-sm font-bold uppercase"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
