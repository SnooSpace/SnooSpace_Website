'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { Sparkles } from 'lucide-react';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Phone Recordings Video & Screenshots (Public Static Paths)
const landingScreen2Path = '/phone-recordings/Landing_Screen 2.png';
const landingScreen1Path = '/phone-recordings/Landing_Screen 1.png';

// Active Video Recording Source
const videoSrc: string | null = '/phone-recordings/NewLandingScreenRec.mp4';

// Custom Crisp Vector SVG Category Icons
import {
  CoWorkSvgIcon,
  GymSvgIcon,
  RideSvgIcon,
  YogaSvgIcon,
  ShoppingSvgIcon,
  HangoutSvgIcon,
  CafeSvgIcon,
  BarSvgIcon,
  GamingSvgIcon,
} from '@/components/ui/category-svg-icons';

interface NodeItem {
  id: string;
  title: string;
  subtitle: string;
  IconComponent: React.FC<{ className?: string; size?: number }>;
  pos: string;
  pathD: string;
  badgeColor: string;
  avatarBg: string;
  depth: number;
}

const INTERACTIVE_NODES: NodeItem[] = [
  // Left Side Attachments (4 nodes - Expansive 1200px viewBox canvas)
  {
    id: 'cowork',
    title: 'Co-Work & Study',
    subtitle: '15 quiet desks',
    IconComponent: CoWorkSvgIcon,
    pos: 'top-[4%] left-[8%] sm:left-[13.5%]',
    pathD: 'M 265,53 Q 376,145 488,265',
    badgeColor: 'bg-blue-500',
    avatarBg: 'bg-blue-50/90 border-blue-200/90 text-blue-600',
    depth: 1.15,
  },
  {
    id: 'gym',
    title: 'Gym & Fitness',
    subtitle: '24 workout pals',
    IconComponent: GymSvgIcon,
    pos: 'top-[28%] left-[10%] sm:left-[16%]',
    pathD: 'M 295,221 Q 391,250 488,295',
    badgeColor: 'bg-emerald-500',
    avatarBg: 'bg-emerald-50/90 border-emerald-200/90 text-emerald-600',
    depth: 0.9,
  },
  {
    id: 'ride',
    title: 'Ride & Cycling',
    subtitle: '32km trail group',
    IconComponent: RideSvgIcon,
    pos: 'top-[52%] left-[8%] sm:left-[14.5%]',
    pathD: 'M 275,389 Q 381,365 488,335',
    badgeColor: 'bg-teal-500',
    avatarBg: 'bg-teal-50/90 border-teal-200/90 text-teal-600',
    depth: 1.0,
  },
  {
    id: 'yoga',
    title: 'Yoga & Flow',
    subtitle: 'Sunrise park session',
    IconComponent: YogaSvgIcon,
    pos: 'top-[76%] left-[10%] sm:left-[16%]',
    pathD: 'M 295,557 Q 391,470 488,365',
    badgeColor: 'bg-purple-500',
    avatarBg: 'bg-purple-50/90 border-purple-200/90 text-purple-600',
    depth: 1.05,
  },

  // Right Side Attachments (5 nodes - Expansive 1200px viewBox canvas)
  {
    id: 'gaming',
    title: 'Gaming',
    subtitle: 'Smash & Boardgames',
    IconComponent: GamingSvgIcon,
    pos: 'top-[4%] right-[8%] sm:right-[13.5%]',
    pathD: 'M 935,53 Q 823,145 712,265',
    badgeColor: 'bg-indigo-500',
    avatarBg: 'bg-indigo-50/90 border-indigo-200/90 text-indigo-600',
    depth: 1.15,
  },
  {
    id: 'cafe',
    title: 'Cafe & Coffee',
    subtitle: 'Espresso meetups',
    IconComponent: CafeSvgIcon,
    pos: 'top-[22%] right-[11%] sm:right-[17%]',
    pathD: 'M 900,179 Q 806,225 712,290',
    badgeColor: 'bg-amber-500',
    avatarBg: 'bg-amber-50/90 border-amber-200/90 text-amber-600',
    depth: 0.95,
  },
  {
    id: 'bar',
    title: 'Bar & Drinks',
    subtitle: 'Craft brew social',
    IconComponent: BarSvgIcon,
    pos: 'top-[41%] right-[8%] sm:right-[13.5%]',
    pathD: 'M 935,312 Q 823,313 712,315',
    badgeColor: 'bg-rose-500',
    avatarBg: 'bg-rose-50/90 border-rose-200/90 text-rose-600',
    depth: 1.25,
  },
  {
    id: 'shopping',
    title: 'Shopping',
    subtitle: 'Flea market drop',
    IconComponent: ShoppingSvgIcon,
    pos: 'top-[58%] right-[10%] sm:right-[16%]',
    pathD: 'M 910,431 Q 811,385 712,340',
    badgeColor: 'bg-pink-500',
    avatarBg: 'bg-pink-50/90 border-pink-200/90 text-pink-600',
    depth: 1.0,
  },
  {
    id: 'hangout',
    title: 'Hangout',
    subtitle: 'Rooftop chillout',
    IconComponent: HangoutSvgIcon,
    pos: 'top-[78%] right-[8%] sm:right-[14.5%]',
    pathD: 'M 925,571 Q 818,480 712,365',
    badgeColor: 'bg-fuchsia-500',
    avatarBg: 'bg-fuchsia-50/90 border-fuchsia-200/90 text-fuchsia-600',
    depth: 1.05,
  },
];

export function HeroScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerpieceRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardSliderRef = useRef<HTMLDivElement>(null);
  const quickiesRef = useRef<{ x: ReturnType<typeof gsap.quickTo>; y: ReturnType<typeof gsap.quickTo> }[]>([]);

  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [ambientPulseNodeId, setAmbientPulseNodeId] = useState<string | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Viewport Intersection Observer for Video Playback Optimization & Speed Adjustment
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Slow down playback speed (0.65x speed for smooth cinematic experience)
    video.playbackRate = 0.65;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(video);

    return () => {
      observer.unobserve(video);
    };
  }, []);

  // Periodic Living Network Ambient Activity (Random synapse pulse every 7-9 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!activeNode) {
        const randomIndex = Math.floor(Math.random() * INTERACTIVE_NODES.length);
        const targetId = INTERACTIVE_NODES[randomIndex].id;
        setAmbientPulseNodeId(targetId);

        // Pulse lasts 1.8 seconds
        setTimeout(() => {
          setAmbientPulseNodeId(null);
        }, 1800);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [activeNode]);

  useGSAP(
    () => {
      // 1. Initial State for Narrative Copy Entrance
      gsap.set('.hero-badge', { opacity: 0, y: 15 });
      gsap.set('.hero-headline', { opacity: 0, y: 25 });
      gsap.set('.hero-subtext', { opacity: 0, y: 20 });
      gsap.set('.hero-cta', { opacity: 0, y: 15 });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-headline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('.hero-subtext', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

      // 2. ScrollTrigger Driven Reveal for Emotional Centerpiece Scene (Edge-to-Edge Chapter)
      gsap.set(phoneRef.current, { opacity: 0, scale: 0.85, y: 70 });
      gsap.set('.hero-ambient-glow', { opacity: 0 });
      gsap.set('.conn-path', { strokeDasharray: 500, strokeDashoffset: 500 });
      gsap.set('.hero-chip', { opacity: 0, scale: 0.7, y: 30 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: centerpieceRef.current,
          start: 'top 82%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
      });

      revealTl
        // Phone centerpiece slides and scales up into view
        .to(phoneRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
        })
        // Ambient glow blooms behind phone
        .to('.hero-ambient-glow', {
          opacity: 0.9,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.6')
        // Network rays draw outward from phone toward periphery
        .to('.conn-path', {
          strokeDashoffset: 0,
          duration: 1.1,
          ease: 'power2.inOut',
          stagger: 0.06,
        }, '-=0.5')
        // Interest chips reveal sequentially in groups as user discovers the scene
        .to('.hero-chip', {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'back.out(1.5)',
        }, '-=0.7');

      // 3. Weightless Ambient Floating Motion (Centered Levitation around origin)
      const chips = gsap.utils.toArray<HTMLElement>('.hero-chip');
      chips.forEach((b, i) => {
        const yDist = 3 + (i % 3) * 1.2; // Gentle 3px - 4.5px levitation
        const xDist = (i % 2 === 0 ? 1 : -1) * (2 + (i % 2) * 1.5);

        gsap.fromTo(
          b,
          { y: -yDist, x: -xDist },
          {
            y: yDist,
            x: xDist,
            duration: 3.4 + (i % 4) * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.18,
          }
        );
      });

      // QuickTo cursor parallax helpers
      quickiesRef.current = chips.map((b) => ({
        x: gsap.quickTo(b, 'x', { duration: 0.6, ease: 'power2.out' }),
        y: gsap.quickTo(b, 'y', { duration: 0.6, ease: 'power2.out' }),
      }));

      // 4. Magnetic Primary & Secondary CTA Buttons
      const buttons = gsap.utils.toArray<HTMLElement>('.hero-btn');
      buttons.forEach((btn) => {
        const bx = gsap.quickTo(btn, 'x', { duration: 0.3 });
        const by = gsap.quickTo(btn, 'y', { duration: 0.3 });

        btn.addEventListener('mousemove', (e: MouseEvent) => {
          const r = btn.getBoundingClientRect();
          bx((e.clientX - r.left - r.width / 2) * 0.3);
          by((e.clientY - r.top - r.height / 2) * 0.3);
        });
        btn.addEventListener('mouseleave', () => {
          bx(0);
          by(0);
        });
      });

      // 5. Inner Card Swipe Sequence (Only feed card swipes, header & tab bar stay fixed)
      const cardSlider = cardSliderRef.current;
      if (cardSlider) {
        const swipeTimeline = gsap.timeline({ repeat: -1 });

        swipeTimeline
          .to(cardSlider, {
            xPercent: 0,
            duration: 3.4,
            onStart: () => setCurrentSlideIndex(0),
          })
          .to(cardSlider, {
            xPercent: -50,
            duration: 0.85,
            ease: 'power3.inOut',
            onStart: () => setCurrentSlideIndex(1),
          })
          .to(cardSlider, {
            xPercent: -50,
            duration: 3.4,
          })
          .to(cardSlider, {
            xPercent: 0,
            duration: 0.85,
            ease: 'power3.inOut',
            onStart: () => setCurrentSlideIndex(0),
          });
      }
    },
    { scope: containerRef }
  );

  // Parallax Mouse Move Handler using GSAP quickTo
  const handleParallaxMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!centerpieceRef.current || !quickiesRef.current.length) return;
    const rect = centerpieceRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const relY = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    INTERACTIVE_NODES.forEach((node, i) => {
      const depth = node.depth || 1;
      if (quickiesRef.current[i]) {
        quickiesRef.current[i].x(relX * 14 * depth);
        quickiesRef.current[i].y(relY * 14 * depth);
      }
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-12 pb-28 overflow-hidden bg-gradient-to-b from-[#FAFCFF] via-[#F2F7FE]/60 to-[#FAFCFF] flex flex-col justify-between"
    >
      {/* ========================================================= */}
      {/* 1. CHAPTER ONE: NARRATIVE HEADLINE & ACTION CTAS          */}
      {/* ========================================================= */}
      <Container className="relative flex flex-col items-center text-center pt-4 mb-16 sm:mb-20">
        <div className="max-w-3xl text-center flex flex-col items-center">
          {/* Eyebrow Label */}
          <span className="hero-badge text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] mb-4">
            SNOOSPACE
          </span>

          {/* Hero Headline */}
          <h1 className="hero-headline text-[clamp(2.75rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#0F172A] leading-[1.08] mb-6 font-display">
            Life happens <br />
            <span className="italic text-[#3565F2]">outside the screen.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="hero-subtext max-w-2xl text-base sm:text-lg font-medium text-[#475569] leading-relaxed mb-8">
            Discover people and plans worth showing up for — real interests, real cities, real plans, without the endless scroll.
          </p>

          {/* Bold Black 'Coming Soon' Text */}
          <div className="hero-cta flex items-center justify-center pt-2">
            <span className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold text-[#3565F2] tracking-tight font-display">
              Coming Soon
            </span>
          </div>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. CHAPTER TWO: EMOTIONAL CENTERPIECE SCENE (Edge-to-Edge) */}
      {/* 68-72% Viewport Height, Edge-to-Edge Bleed, Scroll Revealed*/}
      {/* ========================================================= */}
      <div 
        ref={centerpieceRef}
        onMouseMove={handleParallaxMove}
        className="relative w-full min-h-[68vh] sm:min-h-[75vh] flex items-center justify-center select-none overflow-hidden px-2 sm:px-6"
      >
        {/* Soft Ambient Radial Lighting Background */}
        <div className={`hero-ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-radial from-[#CEF2F2]/75 via-[#3565F2]/12 to-transparent blur-3xl pointer-events-none -z-10 transition-all duration-700 ${
          activeNode || ambientPulseNodeId ? 'scale-110 opacity-100' : 'scale-100 opacity-80'
        }`} />

        {/* Animated SVG Connection Rays overlay with explicit 1200x700 viewBox */}
        <svg 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none" 
          viewBox="0 0 1200 700" 
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {INTERACTIVE_NODES.map((node) => {
            const isHovered = activeNode === node.id;
            const isAmbientPulsing = ambientPulseNodeId === node.id;
            const isActive = isHovered || isAmbientPulsing;

            return (
              <g key={node.id}>
                {/* Invisible Wide Hit Target Path for Line Hover */}
                <path
                  d={node.pathD}
                  stroke="transparent"
                  strokeWidth="20"
                  fill="none"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                />

                {/* Base Continuous Living Stream Line Path */}
                <path
                  className={`conn-path transition-all duration-500 ${isActive ? '' : 'animate-gentle-flow'}`}
                  d={node.pathD}
                  stroke="#3565F2"
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  strokeDasharray={isActive ? '12 8' : '6 6'}
                  fill="none"
                  opacity={isActive ? 0.95 : activeNode !== null ? 0.1 : 0.22}
                  filter={isActive ? 'drop-shadow(0 0 6px rgba(53,101,242,0.8))' : 'none'}
                />

                {/* Energy Flow Pulse traveling from chip toward phone when active */}
                {isActive && (
                  <path
                    className="animate-line-flow transition-all duration-300 pointer-events-none"
                    d={node.pathD}
                    stroke="#3565F2"
                    strokeWidth="3.5"
                    fill="none"
                    strokeDasharray="12 8"
                    opacity="0.95"
                    filter="drop-shadow(0 0 8px rgba(53,101,242,0.9))"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Interactive Floating Nodes Layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {INTERACTIVE_NODES.map((node) => {
            const isHovered = activeNode === node.id;
            const isAmbientPulsing = ambientPulseNodeId === node.id;
            const isOtherHovered = activeNode !== null && !isHovered;

            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className={`hero-chip pointer-events-auto absolute ${node.pos} transition-all duration-500 transform cursor-pointer group ${
                  isHovered
                    ? 'z-30 scale-[1.05]'
                    : isAmbientPulsing
                    ? 'z-25'
                    : isOtherHovered
                    ? 'opacity-40 scale-95 z-10'
                    : 'opacity-100 z-20'
                }`}
              >
                <div
                  className={`w-auto px-4 py-2.5 rounded-2xl bg-white/95 border backdrop-blur-md flex items-center gap-3 transition-all duration-300 ${
                    isHovered || isAmbientPulsing
                      ? 'border-[#3565F2] shadow-[0_16px_36px_-6px_rgba(53,101,242,0.25)] ring-2 ring-[#3565F2]/20'
                      : 'border-[#E2E8F0]/90 shadow-sm hover:border-[#3565F2]/40'
                  }`}
                >
                  {/* Unique Color Tinted Vector SVG Icon Avatar Box */}
                  <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border shadow-sm flex items-center justify-center shrink-0 transition-all duration-300 ${node.avatarBg} ${
                    isHovered || isAmbientPulsing ? 'scale-105 border-[#3565F2]/50' : ''
                  }`}>
                    <node.IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs sm:text-sm font-extrabold text-[#0F172A] tracking-tight whitespace-nowrap">
                        {node.title}
                      </span>
                      <div className={`w-1.5 h-1.5 rounded-full ${node.badgeColor} ${isHovered || isAmbientPulsing ? 'animate-ping' : ''}`} />
                    </div>
                    <span
                      className={`text-[10px] sm:text-[11px] font-semibold text-[#64748B] transition-all duration-200 whitespace-nowrap ${
                        isHovered || isAmbientPulsing ? 'text-[#3565F2] font-bold' : ''
                      }`}
                    >
                      {node.subtitle}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CENTRAL SMARTPHONE MOCKUP CENTERPIECE */}
        <SnooSpaceDevice ref={phoneRef} className="z-10 w-[270px] sm:w-[305px] -translate-y-2">
          <div className="relative w-full h-full overflow-hidden bg-[#0A0D14]">
            {/* VIDEO RECORDING PLAYBACK (If video is provided) */}
            {videoSrc ? (
              <div className="relative w-full h-full overflow-hidden">
                <video
                  ref={videoRef}
                  src={videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover object-top"
                />
                {/* Ambient Glass Overlay Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            ) : (
              /* DEFAULT CARD SWIPE VIEWPORT MODE */
              <>
                {/* 1. STATIONARY BASE BACKGROUND (Fixed Top Header, Search Bar, & Bottom Tab Bar) */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                  <Image
                    src={landingScreen2Path}
                    alt="SnooSpace App UI Shell"
                    fill
                    priority
                    className="object-cover object-top"
                  />
                </div>

                {/* 2. DYNAMIC CARD SWIPE VIEWPORT (Only the central feed card swipes right to left) */}
                <div className="absolute top-[14.5%] bottom-[12.5%] left-[2.5%] right-[2.5%] overflow-hidden z-10 rounded-[20px]">
                  <div
                    ref={cardSliderRef}
                    className="w-[200%] h-full flex items-center shrink-0 pointer-events-none"
                  >
                    {/* Card 1: People Card (from Landing_Screen 2) */}
                    <div className="w-1/2 h-full relative shrink-0 overflow-hidden">
                      <Image
                        src={landingScreen2Path}
                        alt="People Feed Card"
                        fill
                        priority
                        className="object-cover object-top"
                        style={{ marginTop: '-14.5%' }}
                      />
                    </div>

                    {/* Card 2: Community Card (from Landing_Screen 1) */}
                    <div className="w-1/2 h-full relative shrink-0 overflow-hidden">
                      <Image
                        src={landingScreen1Path}
                        alt="Community Feed Card"
                        fill
                        priority
                        className="object-cover object-top"
                        style={{ marginTop: '-14.5%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Ambient Glass Overlay Accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none z-20" />

                {/* Bottom Floating Status Bar & Slide Indicators */}
                <div className="absolute bottom-3 left-3 right-3 p-2 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 text-[#0F172A] flex items-center justify-between shadow-lg z-30">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] sm:text-xs font-bold">14 Events Near You</span>
                  </div>

                  {/* Card Slide Pagination Indicator */}
                  <div className="flex items-center gap-1.5">
                    <div className={`h-2 rounded-full transition-all duration-500 ${currentSlideIndex === 0 ? 'bg-[#3565F2] w-4' : 'bg-slate-300 w-2'}`} />
                    <div className={`h-2 rounded-full transition-all duration-500 ${currentSlideIndex === 1 ? 'bg-[#3565F2] w-4' : 'bg-slate-300 w-2'}`} />
                  </div>
                </div>
              </>
            )}
          </div>
        </SnooSpaceDevice>
      </div>
    </section>
  );
}
