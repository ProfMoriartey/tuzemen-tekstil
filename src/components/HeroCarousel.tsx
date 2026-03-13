"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export default function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const slides = [
    {
      id: 1,
      title: "Premium Fabrics for Every Space",
      description:
        "Discover our curated collection of high-quality sheers and drapery. Built to exact specifications with industry-leading materials.",
      image:
        "https://cdn.tuzemengroup.com/uploads/DSC_3212_5796bdce25.jpg?w=3840&q=75", // Replace with your first image
    },
    {
      id: 2,
      title: "Rich Accent Textiles",
      description:
        "Elevate your interior design with our exclusive range of accent fabrics, available in dozens of rich, fade-resistant colors.",
      image:
        "https://cdn.tuzemengroup.com/uploads/DBBC_9725_Kopya_26268c3a4c.JPG?w=3840&q=75", // Replace with your second image
    },
    {
      id: 3,
      title: "Engineered for Perfection",
      description:
        "Every roll is rigorously tested for weight consistency and composition accuracy, ensuring a flawless drape every time.",
      image:
        "https://cdn.tuzemengroup.com/uploads/winbrella_sosyal_yeni_1_126_87d70ea499.JPG?w=3840&q=75", // Replace with your third image
    },
    {
      id: 4,
      title: "Sustainable Manufacturing",
      description:
        "We partner with eco-conscious mills to deliver fabrics that are as responsible as they are beautiful.",
      image:
        "https://cdn.tuzemengroup.com/uploads/DSC_3037_9456a8533d.jpg?w=3840&q=75", // Replace with your fourth image
    },
  ];

  return (
    <section className="bg-theme-secondary relative w-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative flex min-h-150 items-center md:min-h-175">
                {/* Background Image Container */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority={slide.id === 1}
                    sizes="100vw"
                  />
                  {/* Left-to-Right Dark Gradient Overlay */}
                  <div className="from-theme-secondary/90 via-theme-secondary/60 to-theme-secondary/10 absolute inset-0 bg-linear-to-r"></div>
                </div>

                {/* Text Content Overlay */}
                <div className="relative z-10 container mx-auto w-full px-4 md:px-8">
                  <div className="max-w-2xl">
                    <h1 className="mb-6 text-4xl leading-tight font-bold tracking-tight text-white uppercase md:text-5xl xl:text-6xl">
                      {slide.title}
                    </h1>
                    <p className="text-theme-primary mb-10 text-lg leading-relaxed md:text-xl">
                      {slide.description}
                    </p>
                    <Link
                      href="/products"
                      className="bg-theme-accent text-theme-secondary inline-flex items-center justify-center rounded-md px-8 py-4 font-bold tracking-wide uppercase transition-opacity hover:opacity-90"
                    >
                      Explore Collection
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <div className="absolute right-12 bottom-12 z-20 hidden space-x-4 lg:block">
          <CarouselPrevious className="bg-theme-bg/10 hover:bg-theme-bg text-theme-bg hover:text-theme-secondary static h-12 w-12 translate-x-0 translate-y-0 border-none backdrop-blur-sm transition-all" />
          <CarouselNext className="bg-theme-bg/10 hover:bg-theme-bg text-theme-bg hover:text-theme-secondary relative h-12 w-12 translate-x-0 translate-y-0 border-none backdrop-blur-sm transition-all" />
        </div>
      </Carousel>
    </section>
  );
}
