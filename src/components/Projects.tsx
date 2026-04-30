'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);
import SectionHeader from './SectionHeader';

const projects = [
  {
    title: "E-Commerce Reimagined",
    description: "A radically fast headroom and headless e-commerce store with real-time inventory syncing. Built with Next.js App Router, Stripe, and Sanity CMS.",
    tags: ["Next.js", "Tailwind CSS", "Stripe", "Sanity"],
    image: "bg-gradient-to-br from-indigo-500 to-purple-800", // Placeholder for image
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    title: "AI Code Assistant",
    description: "A desktop widget and web application that contextualizes your local codebase using custom LLM pipelines to assist in quick bug hunting and refactoring.",
    tags: ["React", "Electron", "OpenAI", "Python"],
    image: "bg-gradient-to-br from-emerald-500 to-teal-900",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.project-card');

    cards.forEach(card => {
      gsap.fromTo(card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardRef: HTMLElement | null) => {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xCenter = rect.width / 2;
    const yCenter = rect.height / 2;
    
    // Calculate rotation limits (e.g., max 10 degrees)
    const rotateX = ((y - yCenter) / yCenter) * -10;
    const rotateY = ((x - xCenter) / xCenter) * 10;

    gsap.to(cardRef, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = (cardRef: HTMLElement | null) => {
    if (!cardRef) return;
    gsap.to(cardRef, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section id="work" className="py-24 px-6 max-w-7xl mx-auto w-full relative">
      <SectionHeader title="Featured_Work" subtitle="04. Selected projects" />

      <div ref={containerRef} className="space-y-32 mt-16">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          let cardEl: HTMLDivElement | null = null;

          return (
            <div 
              key={index} 
              className={`project-card flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
            >
              
              {/* Image/Mockup container with 3D Tilt */}
              <div 
                ref={el => { cardEl = el; }}
                onMouseMove={(e) => handleMouseMove(e, cardEl)}
                onMouseLeave={() => handleMouseLeave(cardEl)}
                className="w-full lg:w-3/5 aspect-video rounded-2xl overflow-hidden cursor-none"
              >
                <div className={`w-full h-full ${project.image} rounded-2xl transition-transform duration-700 ease-out hover:scale-105 border border-white/10 relative group`}>
                  {/* Overlay for mockups when actual images are used */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Generic placeholder text instead of real image for now */}
                   <div className="absolute inset-0 flex items-center justify-center font-bold text-4xl text-white/20 uppercase tracking-widest pointer-events-none">
                     {project.title.split(' ')[0]}
                   </div>
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-2/5 flex flex-col space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>
                
                <div className="glass p-6 rounded-xl relative z-10 lg:-ml-12 border border-white/5 backdrop-blur-md">
                  <p className="text-foreground/80 leading-relaxed text-lg text-balance">
                    {project.description}
                  </p>
                </div>
                
                <ul className="flex flex-wrap gap-3 font-mono text-sm">
                  {project.tags.map((tag, i) => (
                    <li key={i} className="px-3 py-1 bg-white/5 rounded-full text-accent-purple border border-accent-purple/20">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="flex gap-4 pt-4">
                  <a href={project.githubUrl} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-blue transition-colors border border-white/10">
                    <GithubIcon className="w-6 h-6" />
                  </a>
                  <a href={project.liveUrl} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-green transition-colors border border-white/10">
                    <ExternalLink className="w-6 h-6" />
                  </a>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
