'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);
import MagneticElement from './MagneticElement';

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!headlineRef.current) return;

    gsap.fromTo(headlineRef.current,
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
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

  const handleSocialHover = (e: React.MouseEvent<HTMLAnchorElement>, isEnter: boolean) => {
    gsap.to(e.currentTarget, {
      scale: isEnter ? 1.2 : 1,
      y: isEnter ? -10 : 0,
      duration: 0.4,
      ease: isEnter ? "back.out(2)" : "power2.out",
      color: isEnter ? "#9d4edd" : "currentColor"
    });
  };

  return (
    <footer id="contact" ref={containerRef} className="bg-[#050505] pt-32 pb-12 px-6 relative overflow-hidden border-t border-white/5">

      {/* Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-accent-purple/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col pt-12">

        <h2
          ref={headlineRef}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-16 pb-4 text-center text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-tight"
        >
          Let&apos;s build<br />something real.
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">

          {/* Contact Details */}
          <div className="flex flex-col space-y-12">
            <div>
              <p className="text-xl text-foreground/70 mb-2">Have a project in mind?</p>
              <a
                href="mailto:aathifm99@gmail.com"
                target="_blank" rel="noopener noreferrer"
                className="group relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold inline-block outline-none break-all sm:break-normal"
              >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-accent-blue via-accent-purple to-accent-blue bg-[length:200%_auto] transition-all duration-500 group-hover:bg-[position:100%_center]">
                  aathifm99@gmail.com
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-[4px] bg-gradient-to-r from-accent-blue to-accent-purple transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 rounded-full" />
              </a>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8">
              <MagneticElement>
                <a
                  href="https://github.com/Aathif-M"
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  className="flex items-center justify-center p-4 rounded-full border border-white/20 glass"
                >
                  <GithubIcon className="w-8 h-8" />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a
                  href="https://www.linkedin.com/in/mohamed-aathif-b4753a23b/"
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  className="flex items-center justify-center p-4 rounded-full border border-white/20 glass"
                >
                  <LinkedinIcon className="w-8 h-8" />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a
                  href="https://wa.me/+94760661888"
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  className="flex items-center justify-center p-4 rounded-full border border-white/20 glass"
                >
                  <WhatsappIcon className="w-8 h-8" />
                </a>
              </MagneticElement>
              <MagneticElement>
                <a
                  href="https://www.instagram.com/teebeeu99/"
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={(e) => handleSocialHover(e, true)}
                  onMouseLeave={(e) => handleSocialHover(e, false)}
                  className="flex items-center justify-center p-4 rounded-full border border-white/20 glass"
                >
                  <InstagramIcon className="w-8 h-8" />
                </a>
              </MagneticElement>
            </div>
          </div>

          {/* Form */}
          <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/10">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-sm text-foreground/70 ml-2">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-purple transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground/70 ml-2">Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-blue transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-foreground/70 ml-2">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 focus:outline-none focus:border-accent-green transition-colors resize-none"
                />
              </div>

              <MagneticElement className="w-full mt-4">
                <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-colors">
                  Send Message
                  <Send className="w-5 h-5 ml-2" />
                </button>
              </MagneticElement>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} Mohamed Aathif. All rights reserved.</p>
          <p className="mt-2 md:mt-0 flex items-center">
            Designed & Developed with passion <span className="text-red-500 mx-2">♥</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
