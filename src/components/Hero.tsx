'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, Mail } from 'lucide-react';
import MagneticElement from './MagneticElement';
import ShinyText from './ui/ShinyText';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const diffRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Select text to animate
    if (!headlineRef.current || !titleRef.current) return;
    
    // Abstract shapes entrance
    tl.fromTo('.bg-shape', 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
    );

    // Headline entrance
    tl.fromTo(headlineRef.current.children,
      { y: 50, opacity: 0, skewY: 10 },
      { y: 0, opacity: 1, skewY: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
      "-=1.0"
    );

    // Title entrance
    tl.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.6"
    );

    // Subtext entrance
    tl.fromTo(diffRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      "-=0.4"
    );

    // Buttons entrance
    tl.fromTo(buttonsRef.current?.children || [],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      "-=0.4"
    );

    // Floating background shapes infinite animation
    gsap.to('.bg-shape-1', {
      y: -30,
      x: 20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to('.bg-shape-2', {
      y: 40,
      x: -30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20 px-6">
      
      {/* Background glowing elements */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="bg-shape bg-shape-1 absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-accent-purple/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="bg-shape bg-shape-2 absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent-blue/20 rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center text-center">
        
        <h1 ref={headlineRef} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-4 flex justify-center overflow-hidden">
          <ShinyText
            text="Hi, I am Mohamed Aathif"
            speed={2.5}
            color="#a1a1aa"
            shineColor="#ffffff"
            spread={100}
            className="pb-2" // To prevent any clipping
          />
        </h1>

        <h2 ref={titleRef} className="text-2xl md:text-3xl font-medium mb-8 text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-blue to-accent-green">
          Full Stack Web Developer
        </h2>

        <p ref={diffRef} className="max-w-2xl text-lg md:text-xl text-foreground/70 mb-12">
          Crafting exceptional digital experiences with modern technologies. 
          Building scalable, aesthetically pleasing applications from concept to deployment.
        </p>

        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 items-center">
          <MagneticElement>
            <a href="#work" className="group flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold transition-transform hover:scale-105 active:scale-95">
              View My Work
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticElement>

          <MagneticElement>
            <a href="#contact" className="group flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-semibold text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 border border-white/10 hover:border-white/20">
              <Mail className="w-5 h-5" />
              Get In Touch
            </a>
          </MagneticElement>
        </div>

      </div>
    </section>
  );
}
