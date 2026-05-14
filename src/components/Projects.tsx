'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import SectionHeader from './SectionHeader';
import trip2islandImg from '../../public/trip2island.webp';
import workpulseImg from '../../public/workpulse.webp';

type Project = {
  title: string;
  description: React.ReactNode;
  tags: string[];
  image: any;
  liveUrl?: string;
  githubUrl?: string;
  linkedInPost?: string;
  githubUrlFrontend?: string;
  githubUrlBackend?: string;
};

const projects: Project[] = [
  {
    title: "Trip2Island",
    description: (
      <>
        A modern, responsive, and performance-optimized travel agency website. Featuring fluid GSAP animations, Tailwind-powered custom styling, and an integrated Web3Forms pipeline. Built with React and Vite for a seamless booking inquiry experience.
      </>
    ),
    tags: ["React", "Vite", "Tailwind CSS", "GSAP", "Web3Forms"],
    image: trip2islandImg,
    liveUrl: "https://trip2island.com",
    githubUrl: "https://github.com/Aathif-M/trip-2-island.git"
  },
  {
    title: "WorkPulse",
    description: (
      <>
        A full-stack productivity and time-management system engineered to track real-time employee workflows. It features live websocket syncing, administrative dashboards, and automated PDF reporting. <br /><br /> <strong>Note:</strong> As this is an active internal enterprise tool, the live application remain private to protect proprietary workplace data.
      </>
    ),
    tags: ["React", "Node.js", "PostgreSQL", "AWS", "Socket.io"],
    image: workpulseImg,
    linkedInPost: "https://www.linkedin.com/posts/mohamed-aathif-b4753a23b_webdevelopment-reactjs-nodejs-activity-7431633382419255297-0kY9?utm_source=share&utm_medium=member_desktop&rcm=ACoAADuzqOcB_E6iZcMiW6d78gQwq8yVOmI6crI",
    githubUrlFrontend: "https://github.com/Aathif-M/workPulse-frontend.git",
    githubUrlBackend: "https://github.com/Aathif-M/workPulse-backend.git"
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
                <div className={`w-full h-full rounded-2xl transition-transform duration-700 ease-out hover:scale-105 border border-white/10 relative group overflow-hidden bg-white/5`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay for mockups when actual images are used */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-2/5 flex flex-col space-y-6">
                <h3 className="text-3xl md:text-4xl font-bold">{project.title}</h3>

                <div className="glass p-6 rounded-xl relative z-10 border border-white/5 backdrop-blur-md">
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

                <div className="flex flex-wrap gap-4 pt-4">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" title="Source Code" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-blue transition-colors border border-white/10 text-sm font-medium">
                      <GithubIcon className="w-5 h-5" />
                      Code
                    </a>
                  )}
                  {project.githubUrlFrontend && (
                    <a href={project.githubUrlFrontend} target="_blank" rel="noopener noreferrer" title="Frontend Source" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-blue transition-colors border border-white/10 text-sm font-medium">
                      <GithubIcon className="w-5 h-5" />
                      Frontend
                    </a>
                  )}
                  {project.githubUrlBackend && (
                    <a href={project.githubUrlBackend} target="_blank" rel="noopener noreferrer" title="Backend Source" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-blue transition-colors border border-white/10 text-sm font-medium">
                      <GithubIcon className="w-5 h-5" />
                      Backend
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" title="Live Site" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-green transition-colors border border-white/10 text-sm font-medium">
                      <ExternalLink className="w-5 h-5" />
                      Live Site
                    </a>
                  )}
                  {project.linkedInPost && (
                    <a href={project.linkedInPost} target="_blank" rel="noopener noreferrer" title="LinkedIn Post" className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 hover:text-accent-green transition-colors border border-white/10 text-sm font-medium">
                      <LinkedinIcon className="w-5 h-5" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
