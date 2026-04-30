'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionHeader({
  title,
  subtitle,
  className = '',
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (!containerRef.current) return;
    
    const chars = containerRef.current.querySelectorAll('.animate-char');
    
    gsap.fromTo(chars, 
      { y: 50, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.02,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
    
    if (subtitle) {
      const sub = containerRef.current.querySelector('.animate-sub');
      if (sub) {
        gsap.fromTo(sub,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [subtitle]);

  return (
    <div ref={containerRef} className={`mb-16 ${className}`}>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 overflow-hidden perspective-500">
        {title.split('').map((char, index) => (
          <span 
            key={index} 
            className="animate-char inline-block"
            style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
          >
            {char}
          </span>
        ))}
      </h2>
      {subtitle && (
        <p className="animate-sub text-lg text-foreground/60 font-mono">
          {subtitle}
        </p>
      )}
    </div>
  );
}
