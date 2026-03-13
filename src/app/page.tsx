import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Ruler, Palette, ShieldCheck } from "lucide-react";
import { getFeaturedDesigns } from "~/server/actions/public";
import FabricCard, { type Design } from "~/components/FabricCard";
import HeroCarousel from "~/components/HeroCarousel";

export default async function LandingPage() {
  const featuredDesigns = await getFeaturedDesigns(4);

  return (
    <div className="flex min-h-screen flex-col">
      <HeroCarousel />

      {/* Feature 1: Text Left, Image Right */}
      <section className="bg-white px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase md:text-4xl">
                Mastering the Art of Sheers
              </h2>
              <p className="text-theme-text/80 text-lg leading-relaxed">
                Our lightweight sheers are designed to invite natural light
                while preserving your privacy. Carefully woven for maximum
                durability and a soft, elegant drape, they form the perfect
                foundation for any window treatment.
              </p>
              <Link
                href="/products"
                className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
              >
                Shop Sheers
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-100 lg:aspect-4/3">
              <Image
                src="https://cdn.tuzemengroup.com/uploads/large_Adobe_Stock_396957872_37ef4ed558_04b20ceb76.jpeg?w=2048&q=75"
                alt="Sheer fabrics"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: Image Left, Text Right */}
      <section className="bg-theme-bg border-theme-primary/30 border-t px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
            {/* order-last on mobile puts text first, order-first on lg puts image left */}
            <div className="relative order-last aspect-video w-full overflow-hidden rounded-xl bg-slate-100 lg:order-first lg:aspect-4/3">
              <Image
                src="https://cdn.tuzemengroup.com/uploads/win3_5ab69159a7.jpg?w=1920&q=75"
                alt="Drapery fabrics"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase md:text-4xl">
                Rich Textures & Heavy Drapery
              </h2>
              <p className="text-theme-text/80 text-lg leading-relaxed">
                Anchor your space with our premium heavy drapery. Engineered for
                superior light control, insulation, and acoustic dampening,
                these fabrics bring bold presence and deep, resonant colors to
                your interior.
              </p>
              <Link
                href="/products"
                className="text-theme-accent hover:text-theme-secondary inline-flex items-center font-bold tracking-wide uppercase transition-colors"
              >
                Shop Drapery
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="border-theme-primary/30 border-t border-b bg-white px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
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
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
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
              <div className="bg-theme-bg border-theme-primary/20 mb-4 rounded-full border p-4 shadow-sm">
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
      <section className="bg-theme-bg px-4 py-16 md:py-24">
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
