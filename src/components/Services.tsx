'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Server, MonitorSmartphone, Zap, ShieldCheck } from 'lucide-react';
import SectionHeader from './SectionHeader';

const services = [
  {
    title: "Full-Stack Expertise",
    description: "I build scalable applications using a modern React-based stack, ensuring seamless integration between the database and the front-end.",
    icon: <Server className="w-8 h-8 text-accent-purple" />,
    className: "md:col-span-2 lg:col-span-2"
  },
  {
    title: "Advanced Web Motion",
    description: "I specialize in high-performance GSAP animations, creating fluid and interactive user experiences that set your project apart.",
    icon: <Zap className="w-8 h-8 text-accent-blue" />,
    className: "md:col-span-1 lg:col-span-1"
  },
  {
    title: "Visual Design Integration",
    description: "Beyond code, I leverage Photoshop to craft polished web assets, ensuring every visual element is professional and brand-aligned.",
    icon: <MonitorSmartphone className="w-8 h-8 text-accent-green" />,
    className: "md:col-span-1 lg:col-span-1"
  },
  {
    title: "Practical Problem Solver",
    description: "From complex debugging to managing live deployments, I provide reliable technical solutions with a focus on efficiency and performance.",
    icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
    className: "md:col-span-2 lg:col-span-2"
  }
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    gsap.fromTo(cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  // Handle the glowing hover effect locally for each card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="services" ref={containerRef} className="py-24 px-6 max-w-7xl mx-auto w-full">
      <SectionHeader title="Why_Hire_Me?" subtitle="02. Value delivered" className="text-center md:text-left" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            ref={el => { cardsRef.current[index] = el; }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            className={`group relative glass-card rounded-2xl p-8 overflow-hidden transition-transform duration-500 hover:-translate-y-2 ${service.className}`}
          >
            {/* Soft border gradient that follows mouse */}
            <div 
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(157,78,221,0.15), transparent 40%)'
              }}
            />
            
            <div className="relative z-10 flex flex-col h-full gap-6">
              <div className="p-4 bg-white/5 w-fit rounded-xl border border-white/10 group-hover:bg-white/10 transition-colors">
                {service.icon}
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-3">{service.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
