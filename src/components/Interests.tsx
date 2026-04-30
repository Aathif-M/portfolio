'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Gamepad2, PenTool, GitMerge } from 'lucide-react';

const interests = [
  {
    icon: <GitMerge className="w-8 h-8 text-white mb-4" />,
    title: "Open Source",
    description: "Contributing to tools that power the web.",
    className: "col-span-1 md:col-span-2 row-span-1 bg-gradient-to-br from-accent-purple/20 to-transparent",
  },
  {
    icon: <PenTool className="w-8 h-8 text-white mb-4" />,
    title: "UI/UX Design",
    description: "Obsessed with micro-interactions.",
    className: "col-span-1 md:col-span-1 row-span-2 bg-gradient-to-br from-accent-blue/20 to-transparent flex-col justify-end",
  },
  {
    icon: <Coffee className="w-8 h-8 text-white mb-4" />,
    title: "Coffee Brewing",
    description: "Fueling the code, one pour-over at a time.",
    className: "col-span-1 md:col-span-1 row-span-1 bg-gradient-to-br from-[#d4a373]/20 to-transparent",
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-white mb-4" />,
    title: "Gaming",
    description: "Strategic mind off the clock.",
    className: "col-span-1 md:col-span-1 row-span-1 bg-gradient-to-br from-accent-green/20 to-transparent",
  }
];

export default function Interests() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;
    const items = containerRef.current.children;

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
        
        <div ref={containerRef} className="w-full md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[160px]">
          {interests.map((interest, index) => (
            <div 
              key={index} 
              className={`glass-card border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 ${interest.className}`}
            >
              <div>
                {interest.icon}
                <h3 className="font-bold text-xl">{interest.title}</h3>
              </div>
              <p className="text-sm text-foreground/70 mt-2">{interest.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
