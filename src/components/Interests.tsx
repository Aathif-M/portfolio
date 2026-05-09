'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Gauge, Headphones, Map } from 'lucide-react';
import MagicBento from './ui/MagicBento';

const interests = [
  {
    icon: <Gauge className="w-8 h-8 text-white mb-3" />,
    title: "Open Roads",
    description: "Clearing my head with a long ride and the steady rhythm of a well-maintained engine.",
    className: "col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-accent-blue/20 to-transparent",
  },
  {
    icon: <Target className="w-8 h-8 text-white mb-3" />,
    title: "On the Table",
    description: "Finding the perfect angle and unwinding with a few frames of snooker.",
    className: "col-span-1 md:col-span-1 row-span-2 bg-gradient-to-br from-accent-purple/20 to-transparent",
  },
  {
    icon: <Headphones className="w-8 h-8 text-white mb-3" />,
    title: "Always On",
    description: "From classic hip-hop to early 2000s rock—my day always has a backbeat.",
    className: "col-span-1 md:col-span-1 row-span-1 bg-gradient-to-br from-accent-green/20 to-transparent",
  },
  {
    icon: <Map className="w-8 h-8 text-white mb-3" />,
    title: "Island Therapy",
    description: "Swapping the screen to explore the hills and the coast.",
    className: "col-span-1 md:col-span-1 row-span-1 bg-gradient-to-br from-[#d4a373]/20 to-transparent",
  }
];

export default function Interests() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;
    const items = containerRef.current.querySelectorAll('.card');

    gsap.fromTo(items,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section className="py-24 px-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        
        <div className="w-full md:w-1/3">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Beyond the Code
          </h2>
          <p className="text-foreground/70 text-lg">
            What keeps me inspired when I step away from the keyboard.
          </p>
        </div>
        
        <div ref={containerRef} className="w-full md:w-2/3">
          <MagicBento 
            cards={interests}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={200}
            particleCount={12}
            glowColor="132, 0, 255"
            disableAnimations={false}
          />
        </div>

      </div>
    </section>
  );
}
