"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";

type CompanyEvent = {
  id: string;
  name: string;
  date: string;
  year: string;
  image: string;
  description: string;
};

const companyEvents: CompanyEvent[] = [
  {
    id: "1",
    name: "Heimtextil",
    date: "January 14-17",
    year: "2025",
    image: "https://cdn.tuzemengroup.com/uploads/heimtextil_2023_ec682e652e_a821285b5d.jpg?w=3840&q=75",
    description: "Showcased our latest sustainable fabric collections to international buyers and established new distribution partnerships across Europe.",
  },
  {
    id: "2",
    name: "Hometex",
    date: "May 20-23",
    year: "2025",
    image: "https://cdn.tuzemengroup.com/uploads/Adobe_Stock_272373006_fbaf422748.jpeg?w=3840&q=75",
    description: "Collaborated with top interior designers to feature our premium drapery in award-winning modern living space installations.",
  },
  {
    id: "3",
    name: "Maison Objet",
    date: "January 19-21",
    year: "2023",
    image: "https://cdn.tuzemengroup.com/uploads/1454779_1d29b91fc1_5493647061_0aa073bc93.webp?w=3840&q=75",
    description: "Participated in panel discussions regarding the future of smart textiles and automated window treatments.",
  },
  {
    id: "4",
    name: "Proposte",
    date: "April 18-20",
    year: "2023",
    image: "https://cdn.tuzemengroup.com/uploads/Adobe_Stock_65604110_1_25b3a70c7e.jpg?w=3840&q=75",
    description: "Debuted our new line of UV-resistant and thermally insulated fabrics designed for extreme climates.",
  },
];

export default function EventsCarousel() {
  const [selectedEvent, setSelectedEvent] = useState<CompanyEvent | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const pointerDownPosRef = useRef({ x: 0, y: 0 });

  const infiniteEvents = [
    ...companyEvents,
    ...companyEvents,
    ...companyEvents,
    ...companyEvents,
  ];

  useEffect(() => {
    let animationId: number;
    const speed = 0.5;

    const update = () => {
      if (!isDraggingRef.current && !isHovered && trackRef.current) {
        xPosRef.current -= speed;
        const singleSetWidth = trackRef.current.scrollWidth / 4;

        if (xPosRef.current <= -singleSetWidth) {
          xPosRef.current += singleSetWidth;
        }
        trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    pointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    // REMOVED setPointerCapture here so child clicks can fire
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !trackRef.current) return;

    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    xPosRef.current += deltaX;

    const singleSetWidth = trackRef.current.scrollWidth / 4;

    if (xPosRef.current <= -singleSetWidth) {
      xPosRef.current += singleSetWidth;
    } else if (xPosRef.current > 0) {
      xPosRef.current -= singleSetWidth;
    }

    trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    // REMOVED releasePointerCapture here
  };

  const handleTextClick = (e: React.MouseEvent, event: CompanyEvent) => {
    const dx = Math.abs(e.clientX - pointerDownPosRef.current.x);
    const dy = Math.abs(e.clientY - pointerDownPosRef.current.y);

    // If the user moved the mouse more than 5px, it was a drag, not a click
    if (dx > 5 || dy > 5) {
      e.preventDefault();
      return;
    }
    
    setSelectedEvent(event);
  };

  return (
    <div className="w-full py-12 overflow-hidden bg-theme-bg">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl font-bold tracking-wide uppercase text-theme-text">
          Our Global Presence
        </h2>
        <p className="text-theme-text/70 mt-2">
          Discover the exhibitions and events we have participated in.
        </p>
      </div>

      <div
        className="relative flex overflow-hidden select-none"
        style={{ touchAction: "pan-y" }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          isDraggingRef.current = false;
        }}
      >
        <div ref={trackRef} className="flex w-max gap-6 px-3">
          {infiniteEvents.map((event, index) => (
            <div
              key={`${event.id}-${index}`}
              className="relative flex flex-col group/card w-[280px] sm:w-[320px] shrink-0 text-left rounded-xl transition-transform hover:-translate-y-1"
            >
              <div className="relative w-full aspect-4/3 overflow-hidden rounded-xl shadow-sm border border-border cursor-grab active:cursor-grabbing">
                <img
                  src={event.image}
                  alt={event.name}
                  
                  className="object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
                  draggable={false}
                  sizes="(max-width: 768px) 280px, 320px"
                />
                <div className="absolute top-3 right-3 bg-theme-secondary backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-bold text-theme-primary shadow-sm pointer-events-none">
                  {event.year}
                </div>
              </div>

              <div 
                onClick={(e) => handleTextClick(e, event)}
                className="mt-4 cursor-pointer p-2 -mx-2 rounded-lg transition-colors hover:bg-slate-200/50"
                role="button"
                aria-label={`View details for ${event.name}`}
              >
                <h3 className="font-bold text-lg text-theme-primary line-clamp-1 group-hover/card:text-theme-accent transition-colors">
                  {event.name}
                </h3>
                <p className="text-sm font-medium text-theme-accent mt-1">
                  {event.date}, {event.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden gap-0 border-0 rounded-2xl">
          {selectedEvent && (
            <>
              <div className="relative w-full h-64 sm:h-80 bg-theme-bg">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.name}
                  
                  className="object-cover"
                  
                />
              </div>
              <div className="p-6 sm:p-8 bg-theme-secondary">
                <DialogHeader className="mb-4">
                  <div className="text-sm font-bold tracking-widest text-theme-bg uppercase mb-2">
                    {selectedEvent.date}, {selectedEvent.year}
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl text-theme-primary font-bold uppercase">
                    {selectedEvent.name}
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base text-theme-text/60 leading-relaxed">
                  {selectedEvent.description}
                </DialogDescription>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}