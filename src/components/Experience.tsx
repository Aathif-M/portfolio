'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeader from './SectionHeader';
import { Briefcase, GraduationCap } from 'lucide-react';

const experiences = [
  {
    type: "work",
    title: "Senior Frontend Engineer",
    organization: "Tech Innovators Inc.",
    date: "2023 - Present",
    description: "Lead the frontend architectural decisions, migrating legacy SPAs to Next.js App Router, resulting in a 40% performance bump."
  },
  {
    type: "work",
    title: "Full Stack Developer",
    organization: "Creative Digital Agency",
    date: "2021 - 2023",
    description: "Developed and deployed over 15 custom high-performance web applications using React, Node.js, and PostgreSQL."
  },
  {
    type: "education",
    title: "BSc in Computer Science",
    organization: "University of Technology",
    date: "2017 - 2021",
    description: "Graduated with First Class Honors. Specialized in Software Engineering and Human-Computer Interaction."
  }
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !lineRef.current) return;

    // Line drawing animation
    gsap.to(lineRef.current, {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    // Nodes popping in
    nodesRef.current.forEach((node, index) => {
      if (!node) return;
      
      const isLeft = index % 2 === 0;
      
      gsap.fromTo(node,
        { 
          x: isLeft ? -50 : 50, 
          opacity: 0,
          scale: 0.9 
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto w-full relative">
      <SectionHeader title="Experience" subtitle="03. My Journey so far" className="text-center mb-24" />

      <div ref={containerRef} className="relative w-full">
        {/* Background Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />
        
        {/* Animated Fill Line */}
        <div 
          ref={lineRef}
          className="absolute left-4 md:left-1/2 top-0 w-[3px] bg-gradient-to-b from-accent-purple via-accent-blue to-accent-green transform md:-translate-x-1/2 h-0 rounded-full" 
        />

        <div className="space-y-16">
          {experiences.map((item, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div 
                key={index}
                ref={el => { nodesRef.current[index] = el; }}
                className={`flex flex-col md:flex-row relative items-start ${isLeft ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Timeline Icon */}
                <div className="absolute left-4 md:left-1/2 w-10 h-10 rounded-full glass border border-white/20 transform -translate-x-1/2 flex items-center justify-center z-10 bg-[#0a0a0a]">
                  {item.type === 'work' 
                    ? <Briefcase className="w-4 h-4 text-accent-blue" />
                    : <GraduationCap className="w-4 h-4 text-accent-purple" />
                  }
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 p-6 glass-card rounded-2xl border border-white/10 hover:border-white/30 transition-colors ${isLeft ? 'md:mr-12' : 'md:ml-12'}`}
                >
                  <span className="font-mono text-sm text-accent-green mb-2 inline-block">
                    {item.date}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <h4 className="text-lg text-foreground/80 mb-4">{item.organization}</h4>
                  <p className="text-foreground/60 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
