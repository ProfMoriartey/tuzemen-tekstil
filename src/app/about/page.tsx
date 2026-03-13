import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Leaf, Factory, Scissors, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Background Image */}
      <section className="relative flex min-h-100 items-center overflow-hidden px-4 py-24 md:py-36">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.tuzemengroup.com/uploads/large_Adobe_Stock_396957872_37ef4ed558_04b20ceb76.jpeg?w=2048&q=75" // Replace with your actual hero image
            alt="Tuzemen Group Weaving Facility"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Dark overlay to ensure text readability */}
          <div className="bg-theme-secondary/85 absolute inset-0"></div>
        </div>

        <div className="relative z-10 container mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white uppercase md:text-5xl lg:text-6xl">
            Weaving Excellence
          </h1>
          <p className="text-theme-primary mx-auto max-w-2xl text-lg leading-relaxed md:text-xl">
            Tuzemen Group is a premier manufacturer of high-quality sheers,
            heavy drapery, and accent textiles, rooted in the rich textile
            heritage of Bursa, Türkiye.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-theme-bg px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-200 lg:aspect-4/3">
              <Image
                src="/tuzemen-family.jpeg"
                alt="Tuzemen Group weaving process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-theme-text text-3xl font-bold tracking-tight uppercase">
                Our Heritage
              </h2>
              <div className="text-theme-text/80 space-y-4 text-lg leading-relaxed">
                <p>
                  Located in the heart of Türkiye&aposs textile capital, Tuzemen
                  Group was founded with a singular vision: to engineer fabrics
                  that bridge the gap between traditional craftsmanship and
                  modern material science.
                </p>
                <p>
                  For years, we have supplied designers, architects, and global
                  retailers with premium textiles that define spaces. From the
                  lightest, most delicate sheers to heavy, acoustic-dampening
                  drapery, every roll of fabric that leaves our facility proves
                  our commitment to quality.
                </p>
                <p>
                  We control the entire production pipeline—from yarn selection
                  to the final leadband finishing—ensuring that our strict
                  standards are met at every single touchpoint.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introductory Video Section */}
      <section className="bg-theme-secondary px-4 py-16 text-white md:py-24">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="mb-12">
            <h2 className="mb-4 text-3xl font-bold tracking-tight uppercase">
              See Our Process
            </h2>
            <p className="text-theme-primary/80 mx-auto max-w-2xl text-lg">
              Take a look inside our manufacturing facility and see how raw
              materials become premium textiles.
            </p>
          </div>

          {/* 16:9 Responsive Video Container */}
          <div className="border-theme-primary/20 relative aspect-video w-full overflow-hidden rounded-xl border bg-slate-900 shadow-2xl">
            <iframe
              // Replace YOUR_VIDEO_ID with the actual 11-character YouTube video ID
              src="https://www.youtube.com/embed/5Vjr305OYPI?si=PnZmwhQwsTDjww_J"
              title="Tuzemen Group Introduction"
              className="absolute top-0 left-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Core Values / Manufacturing Standards */}
      <section className="border-theme-primary/30 border-t bg-white px-4 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-theme-text mb-4 text-3xl font-bold tracking-tight uppercase">
              The Tuzemen Standard
            </h2>
            <p className="text-theme-text/70 mx-auto max-w-2xl text-lg">
              Our reputation is built into the very threads of our products.
              Here is how we ensure high quality across our entire catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Factory className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                Advanced Facilities
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                Our Bursa manufacturing hub uses state-of-the-art weaving and
                quality assurance technology to guarantee consistency across
                massive production runs.
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <ShieldCheck className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                Rigorous Testing
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                Every fabric undergoes severe stress tests for colorfastness,
                weight accuracy, and tear resistance before being approved for
                distribution.
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Scissors className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                Precision Finishing
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                From exact-width cutting to the clean integration of heavy
                leadbands, our finishing process ensures your fabrics are ready
                for immediate installation.
              </p>
            </div>

            <div className="bg-theme-bg border-theme-primary/20 rounded-xl border p-8 transition-shadow hover:shadow-md">
              <Leaf className="text-theme-accent mb-6 h-10 w-10" />
              <h3 className="text-theme-text mb-3 text-xl font-bold uppercase">
                Sustainable Practice
              </h3>
              <p className="text-theme-text/70 text-sm leading-relaxed">
                We are committed to reducing our environmental footprint through
                water-recycling dye processes and responsibly sourced raw
                materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-theme-secondary px-4 py-16 text-center text-white md:py-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight uppercase md:text-4xl">
            Ready to elevate your inventory?
          </h2>
          <p className="text-theme-primary mb-10 text-lg">
            Browse our complete catalog to find the exact specifications,
            compositions, and colors you need for your next project.
          </p>
          <Link
            href="/products"
            className="bg-theme-accent text-theme-secondary inline-flex items-center justify-center rounded-md px-8 py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
          >
            Explore Our Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
