'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const SKILLS = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", 
  "Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL", 
  "Docker", "AWS", "Figma", "UI/UX", "Git"
];

export default function SkillsMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;

    // Calculate halfway point of the track which contains 2 duplicate sets
    const totalWidth = trackRef.current.scrollWidth;
    
    gsap.to(trackRef.current, {
      x: -totalWidth / 2,
      ease: "none",
      duration: 30, // Adjust speed
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % (totalWidth / 2))
      }
    });
  }, []);

  // We duplicate the skills array to create a seamless loop
  const duplicatedSkills = [...SKILLS, ...SKILLS];

  return (
    <section className="py-12 overflow-hidden bg-white/5 border-y border-white/10 my-24 transform -skew-y-2">
      <div className="relative flex whitespace-nowrap" ref={marqueeRef}>
        <div ref={trackRef} className="flex gap-8 md:gap-16 px-4">
          {duplicatedSkills.map((skill, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center font-mono text-2xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20"
            >
              {skill}
              {/* Optional delimiter */}
              <span className="ml-8 md:ml-16 text-accent-purple/50">*</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
