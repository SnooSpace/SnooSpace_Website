import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export interface SnooSpaceDeviceProps {
  children?: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  disableTilt?: boolean;
  showGlow?: boolean;
}

export const SnooSpaceDevice = forwardRef<HTMLDivElement, SnooSpaceDeviceProps>(
  ({ children, className = "", imageSrc, imageAlt = "SnooSpace App UI", disableTilt = false, showGlow = true }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    // Forward ref to containerRef so parent GSAP animations (e.g. Hero entrance) work seamlessly
    useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disableTilt || !frameRef.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calculate normalized coords (-0.5 to +0.5)
      const xNorm = mouseX / width - 0.5;
      const yNorm = mouseY / height - 0.5;

      // Max 3D tilt angles in degrees
      const maxTiltDeg = 16;
      const rotateX = -yNorm * maxTiltDeg * 2; // Tilt top/bottom
      const rotateY = xNorm * maxTiltDeg * 2;  // Tilt left/right

      gsap.to(frameRef.current, {
        rotateX,
        rotateY,
        scale: 1.04,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      // Dynamic Glass Reflection Follows Mouse
      if (glareRef.current) {
        const glareX = (mouseX / width) * 100;
        const glareY = (mouseY / height) * 100;
        gsap.to(glareRef.current, {
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.04) 50%, transparent 80%)`,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      // Elevate ambient glow
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.12,
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    const handleMouseLeave = () => {
      if (disableTilt || !frameRef.current) return;

      gsap.to(frameRef.current, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: 'auto',
      });

      if (glareRef.current) {
        gsap.to(glareRef.current, {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)',
          opacity: 0.7,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          scale: 1.05,
          opacity: 0.8,
          duration: 0.7,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }
    };

    return (
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center justify-center p-4 cursor-pointer select-none [perspective:1000px] ${className}`}
      >
        {/* 1. Ambient Blue Glow Layer (Centered Circular Blur) */}
        {showGlow && (
          <div 
            ref={glowRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] rounded-full bg-radial from-blue-600/30 via-indigo-500/15 to-transparent blur-3xl transform scale-105 pointer-events-none transition-opacity duration-500 opacity-80"
            aria-hidden="true"
          />
        )}

        {/* 2. Outer Hardware Frame (3D Interactive Tilt Shell) */}
        <div 
          ref={frameRef}
          className="relative w-full max-w-[270px] sm:max-w-[295px] aspect-[9/19.6] rounded-[46px] sm:rounded-[50px] bg-slate-950 p-[4px] sm:p-[5px] ring-1 ring-white/20 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7),0_10px_25px_-10px_rgba(37,99,235,0.3)] will-change-transform [transform-style:preserve-3d]"
        >
          
          {/* Subtle Inner Bezel Highlight (Ultra-thin 1.5px border) */}
          <div className="relative h-full w-full rounded-[42px] sm:rounded-[46px] bg-black p-[1.5px] ring-1 ring-slate-800/80 overflow-hidden flex flex-col">
            
            {/* 3. The Inner Screen (Contains your running app - Edge to Edge Display) */}
            <div className="relative h-full w-full rounded-[40px] sm:rounded-[44px] overflow-hidden bg-slate-900 border border-white/5">
              {/* Dynamic Interactive Glass Reflection Overlay */}
              <div 
                ref={glareRef}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none z-20 transition-opacity duration-300" 
              />
              
              {/* Your App Content / UI Canvas */}
              <div className="h-full w-full overflow-y-auto overflow-x-hidden scrollbar-none">
                {children ? (
                  children
                ) : imageSrc ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                ) : (
                  <DefaultSnooSpaceAppPlaceholder />
                )}
              </div>
            </div>
          </div>

          {/* Side Buttons Subtle Accents */}
          <div className="absolute -left-[3px] top-20 h-8 w-[3px] bg-slate-700/60 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[125px] h-10 w-[3px] bg-slate-700/60 rounded-l-sm" />
          <div className="absolute -left-[3px] top-[175px] h-10 w-[3px] bg-slate-700/60 rounded-l-sm" />
          <div className="absolute -right-[3px] top-28 h-14 w-[3px] bg-slate-700/60 rounded-r-sm" />
        </div>
      </div>
    );
  }
);

SnooSpaceDevice.displayName = 'SnooSpaceDevice';

/* Default Placeholder UI when no child is passed */
export const DefaultSnooSpaceAppPlaceholder = () => (
  <div className="min-h-full w-full bg-slate-950 text-white p-6 pt-12 flex flex-col justify-between">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">SnooSpace</span>
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
      </div>
      <div className="h-32 w-full rounded-2xl bg-gradient-to-br from-blue-600/30 to-indigo-900/40 border border-blue-500/20 p-4 flex flex-col justify-end">
        <p className="text-sm font-medium text-slate-200">Welcome to SnooSpace</p>
      </div>
    </div>
  </div>
);
