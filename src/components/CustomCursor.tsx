'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!cursorRef.current) return;
    
    // Set initial position out of bounds so it doesn't flicker at 0,0
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50, x: -100, y: -100 });
    
    const xTo = gsap.quickTo(cursorRef.current, "x", { duration: 0.15, ease: "power3" });
    const yTo = gsap.quickTo(cursorRef.current, "y", { duration: 0.15, ease: "power3" });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to(cursorRef.current, { opacity: 1, duration: 0.3 });
        isVisible = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });
      isVisible = false;
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.magnetic-interactive');

      if (isClickable) {
        gsap.to(cursorRef.current, { 
          scale: 3.5, 
          backgroundColor: 'rgba(157, 78, 221, 0.4)', // purple hover
          borderColor: 'transparent',
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      } else {
        gsap.to(cursorRef.current, { 
          scale: 1, 
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.8)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-6 h-6 border-2 border-white/80 rounded-full pointer-events-none z-[9999] opacity-0 mix-blend-difference"
    />
  );
}
