'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      }
    });

    tl.fromTo(narrativeRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(codeRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const codeSnippet = `const developer = {
  name: "TeeBeeU",
  role: "Full Stack Developer",
  passion: ["clean code", "UI/UX", "animations"],
  location: "Earth",
  status: "Available for hire",
  build: () => {
    console.log("Turning coffee into code...");
  }
};`;

  return (
    <section id="about" ref={containerRef} className="py-24 px-6 relative max-w-7xl mx-auto w-full">
      <SectionHeader title="About_Me" subtitle="01. The person behind the code" />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Narrative */}
        <div ref={narrativeRef} className="space-y-6 text-lg text-foreground/80 leading-relaxed">
          <p>
            I'm a passionate Full Stack Developer who translates complex problems into elegant, scaleable solutions. I believe that exceptional digital experiences are born at the intersection of beautiful design and rock-solid engineering.
          </p>
          <p>
            With expertise across the modern web stack, I focus on building responsive, performant, and accessible applications. From weaving micro-animations into a frontend interface to architecting robust backend APIs, I treat every line of code as an integral piece of the larger puzzle.
          </p>
          <p>
            When I'm not pushing pixels or squashing bugs, you can find me exploring new technologies, contributing to open source, or enjoying a perfectly brewed cup of coffee.
          </p>
        </div>

        {/* Code Editor Window */}
        <div ref={codeRef} className="glass-card rounded-xl overflow-hidden border border-white/10 relative group">
          {/* Header */}
          <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="mx-auto text-xs font-mono text-foreground/50">developer.ts</div>
          </div>
          
          {/* Body */}
          <div className="p-6 overflow-x-auto text-sm md:text-base font-mono leading-relaxed bg-[#0a0a0a]/50">
            <pre className="text-gray-300">
              <code className="language-typescript">
                {codeSnippet}
              </code>
            </pre>
          </div>
          
          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
