'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { MessageCircle, Sparkles, ShieldCheck, MapPin, X, Heart, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const NARRATIVE_LINES = [
  "Maybe it's the person who kept asking good questions about your idea.",
  "In two years, they're the person you built a company with.",
  "Maybe it's the person who laughed at the same dumb joke you did.",
  "In five years, they're the one you call first when something goes wrong.",
  "Maybe it's the person you just couldn't stop talking to.",
  "In ten years, that's the story you tell about how you met.",
  "Right now, you have no idea which one it is. Neither do they.",
];

export function ConnectionsScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const storyPinRef = useRef<HTMLDivElement>(null);
  const storyEyebrowRef = useRef<HTMLDivElement>(null);
  const linesStageRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLDivElement | null)[]>([]);
  const payoffRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [isDesktopAndMotion, setIsDesktopAndMotion] = useState<boolean>(true);

  // Responsive and motion preference detection
  useEffect(() => {
    const evaluateEnvironment = () => {
      const isDesktop = window.innerWidth >= 900;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktopAndMotion(isDesktop && !prefersReduced);
    };

    evaluateEnvironment();
    window.addEventListener('resize', evaluateEnvironment);

    // Call ScrollTrigger.refresh() on mount and after layout settlements
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      window.removeEventListener('resize', evaluateEnvironment);
      clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const isDesktop = window.innerWidth >= 900;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // 1. Entrance reveal for top editorial headline spread
      const headlineTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      headlineTl
        .fromTo(
          '.conn-story-line-1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo(
          '.conn-story-line-2',
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
          '+=0.15'
        );

      // 2. Pinned Storytelling Scroll Sequence (Desktop & Motion Enabled Only)
      if (!isDesktop || prefersReduced) return;
      if (!storyTrackRef.current || !storyPinRef.current) return;

      const validLines = linesRef.current.slice(0, NARRATIVE_LINES.length);
      const TOTAL_STEPS = NARRATIVE_LINES.length + 1; // 7 lines + 1 Payoff segment
      const step = 1 / TOTAL_STEPS;

      // Initialize resting states for all animated elements via refs
      gsap.set(validLines, { opacity: 0, y: 18 });
      if (payoffRef.current) {
        gsap.set(payoffRef.current, { opacity: 0, y: 32 });
      }
      if (storyEyebrowRef.current) {
        gsap.set(storyEyebrowRef.current, { opacity: 0 });
      }

      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyTrackRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: storyPinRef.current,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              progressFillRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Eyebrow enters at start
      if (storyEyebrowRef.current) {
        storyTl.to(storyEyebrowRef.current, { opacity: 1, duration: 0.4 }, 0);
      }

      // Interpolate 7 narrative lines in order
      validLines.forEach((lineEl, i) => {
        if (!lineEl) return;
        const start = i * step;
        storyTl.to(
          lineEl,
          { opacity: 1, y: 0, duration: step * 0.36, ease: 'power2.out' },
          start + step * 0.08
        );
        storyTl.to(
          lineEl,
          { opacity: 0, y: -16, duration: step * 0.3, ease: 'power2.in' },
          start + step * 0.70
        );
      });

      // Payoff Finale: Lines stage hides, Resolution & Phone Mockup reveal
      const payoffStart = NARRATIVE_LINES.length * step;
      if (linesStageRef.current) {
        storyTl.to(
          linesStageRef.current,
          { opacity: 0, duration: step * 0.2, ease: 'power2.in' },
          payoffStart
        );
      }
      if (payoffRef.current) {
        storyTl.to(
          payoffRef.current,
          { opacity: 1, y: 0, duration: step * 0.7, ease: 'power3.out' },
          payoffStart + step * 0.1
        );
      }
    },
    { scope: containerRef, dependencies: [isDesktopAndMotion] }
  );

  return (
    <section
      id="connections"
      ref={containerRef}
      className="relative pt-24 sm:pt-36 pb-0 bg-[#FAFCFF] border-t border-[#E2E8F0]/40 overflow-hidden"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] bg-radial from-[#F2F7FE] via-[#CEF2F2]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 1. TOP HALF: EDITORIAL HEADLINE SPREAD                    */}
      {/* ========================================================= */}
      <Container className="relative flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Eyebrow Tag */}
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] mb-4 block font-display">
            THE CONNECTIONS YOU ALMOST MISSED
          </span>

          {/* Line 1 */}
          <h2 className="conn-story-line-1 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#0F172A] leading-[1.1] font-display mb-2">
            You don&apos;t know who you just met.
          </h2>

          {/* Line 2 (Emphasis) */}
          <h2 className="conn-story-line-2 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#3565F2] leading-[1.1] font-display mb-6">
            Give it a few years. You will.
          </h2>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. DESKTOP PINNED STORYTELLING SCROLL SEQUENCE (>=900px)  */}
      {/* ========================================================= */}
      {isDesktopAndMotion ? (
        <div ref={storyTrackRef} className="relative h-[480vh] w-full">
          <div
            ref={storyPinRef}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
          >
            {/* Soft Ambient Radial Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-radial from-[#CEF2F2]/60 to-transparent blur-3xl opacity-50 pointer-events-none" />

            <div className="relative z-10 w-full max-w-5xl px-6 text-center flex flex-col items-center justify-center">
              {/* Eyebrow Label */}
              <div
                ref={storyEyebrowRef}
                className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] mb-6 opacity-0"
              >
                THE CONNECTIONS YOU ALMOST MISSED
              </div>

              {/* Central Stage: 7 Pinned Story Lines */}
              <div
                ref={linesStageRef}
                className="relative w-full max-w-3xl h-48 sm:h-56 flex items-center justify-center"
              >
                {NARRATIVE_LINES.map((line, idx) => (
                  <div
                    key={idx}
                    ref={(el) => {
                      linesRef.current[idx] = el;
                    }}
                    className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4 select-none"
                  >
                    {line}
                  </div>
                ))}
              </div>

              {/* Payoff Stage: Resolution Statement & Meet People Mockup */}
              <div
                ref={payoffRef}
                className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none px-6 pt-16 sm:pt-20 pb-12"
              >
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center text-left">
                  {/* Left Column: Resolution Block */}
                  <div className="md:col-span-7 flex flex-col justify-center">
                    <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] mb-3 block">
                      WHY SNOOSPACE EXISTS
                    </span>
                    <h3 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0F172A] tracking-tight leading-[1.12] mb-3.5 font-display">
                      That&apos;s the gap<br />
                      <em className="not-italic text-[#3565F2] font-bold">SnooSpace</em> closes.
                    </h3>
                    <p className="text-sm sm:text-base lg:text-[1.05rem] font-medium text-[#475569] leading-relaxed mb-5 max-w-lg">
                      A co-founder. A best friend. The person you end up building a life with. Most of it never happens — not because it wasn&apos;t real, but because the moment just ended. We make sure it doesn&apos;t have to.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#0F172A] pt-3.5 border-t border-[#E2E8F0]/70">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3565F2]" />
                        <span>Verified people nearby</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#3565F2]" />
                        <span>Built around real shared interests</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Phone Mockup Payoff */}
                  <div className="md:col-span-5 flex justify-center items-center pointer-events-auto">
                    <MeetPeoplePhoneMockup />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Rail */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-44 h-1 bg-[#E2E8F0] rounded-full overflow-hidden z-20">
              <div
                ref={progressFillRef}
                className="h-full w-0 bg-[#3565F2] transition-all duration-75"
              />
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 3. MOBILE & REDUCED-MOTION UNPINNED STACK FALLBACK        */
        /* ========================================================= */
        <div className="relative w-full max-w-4xl mx-auto px-6 pb-20">
          {/* Narrative Story Line Cards Stack */}
          <div className="space-y-4 mb-16">
            {NARRATIVE_LINES.map((line, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-start gap-4"
              >
                <span className="text-xs font-extrabold text-[#3565F2] tracking-wider shrink-0 mt-0.5 font-mono">
                  0{idx + 1}
                </span>
                <p className="text-base sm:text-lg font-semibold text-[#0F172A] leading-snug">
                  {line}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile Resolution Block */}
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#3565F2] mb-2 block">
              WHY SNOOSPACE EXISTS
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4 font-display">
              That&apos;s the gap<br />
              <em className="not-italic text-[#3565F2] font-bold">SnooSpace</em> closes.
            </h3>
            <p className="text-sm sm:text-base font-medium text-[#475569] leading-relaxed">
              A co-founder. A best friend. The person you end up building a life with. Most of it never happens — not because it wasn&apos;t real, but because the moment just ended. We make sure it doesn&apos;t have to.
            </p>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="flex justify-center items-center">
            <MeetPeoplePhoneMockup />
          </div>
        </div>
      )}
    </section>
  );
}

/**
 * Meet People In-App Screen Mockup (Payoff Phone UI)
 * Uses the standardized SnooSpaceDevice 3D hardware frame with edge-to-edge layout,
 * full-bleed photo, inline chat trigger, interests pills, synced Spotify row, Sparks intent pills,
 * and Skip/Connect action controls.
 */
function MeetPeoplePhoneMockup() {
  return (
    <SnooSpaceDevice
      showGlow={true}
      className="w-[250px] sm:w-[270px] max-w-[270px]"
    >
      <div className="relative w-full h-full bg-[#0B0F19] text-white flex flex-col justify-between overflow-hidden select-none">
        {/* Top App Bar */}
        <div className="pt-3 px-3.5 pb-2 flex items-center justify-between border-b border-white/10 shrink-0 z-20 bg-[#0B0F19]/90 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#3565F2]">
              MEET
            </span>
            <span className="text-[10px] text-white/40">•</span>
            <span className="text-[10px] font-semibold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Near you
            </span>
          </div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-3 h-3 text-[#3565F2]" />
            <span>Verified</span>
          </div>
        </div>

        {/* Scrollable / Stacked Profile Card Body */}
        <div className="flex-1 overflow-y-auto scrollbar-none px-3 pt-2 pb-2 space-y-2.5">
          {/* 1. Full-Bleed Photo Card with Inline Chat Action */}
          <div className="relative w-full aspect-[4/4.1] rounded-[22px] overflow-hidden shadow-lg border border-white/10">
            <Image
              src="/phone-recordings/meet_person.jpg"
              alt="Elena Rostova"
              fill
              sizes="280px"
              priority
              className="object-cover object-top"
            />
            {/* Subtle bottom gradient vignette for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />

            {/* Profile Name & Tagline */}
            <div className="absolute bottom-2.5 left-3 right-12 text-white">
              <div className="flex items-center gap-1.5">
                <h4 className="text-[13.5px] font-extrabold tracking-tight">Elena Rostova, 26</h4>
                <span className="text-[11px]">✨</span>
              </div>
              <p className="text-[10px] text-white/80 font-medium flex items-center gap-1 mt-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#3565F2]" /> Hayes Valley • 0.8 km away
              </p>
            </div>

            {/* Inline Chat Action (Bottom-Right of Photo) */}
            <button
              type="button"
              aria-label="Quick chat"
              className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#3565F2] hover:bg-[#3D79F2] text-white flex items-center justify-center shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
          </div>

          {/* 2. Interests Pill Row */}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Interests
            </span>
            <div className="flex flex-wrap gap-1">
              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                🏃 Morning 10k
              </span>
              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-[#CEF2F2]/20 text-[#CEF2F2] border border-[#CEF2F2]/30">
                ☕ Espresso
              </span>
              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                🎾 Tennis
              </span>
              <span className="text-[9.5px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/10">
                🎧 Indie Rock
              </span>
            </div>
          </div>

          {/* 3. Spotify · synced Row with Artist Avatars */}
          <div className="p-2 rounded-xl bg-white/[0.06] border border-white/10">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#1ED760]" />
                <span className="text-[9.5px] font-bold text-white/90">Spotify · synced</span>
              </div>
              <span className="text-[8.5px] font-semibold text-white/40">Top Artists</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-[8px] font-bold text-white border border-white/20">
                  F
                </div>
                <span className="text-[9px] font-medium text-white/80">Fred again..</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 flex items-center justify-center text-[8px] font-bold text-white border border-white/20">
                  K
                </div>
                <span className="text-[9px] font-medium text-white/80">Khruangbin</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-violet-500 to-purple-500 flex items-center justify-center text-[8px] font-bold text-white border border-white/20">
                  O
                </div>
                <span className="text-[9px] font-medium text-white/80">Overmono</span>
              </div>
            </div>
          </div>

          {/* 4. Sparks Section (Intent Pills) */}
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1 mb-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-400" />
              Sparks
            </span>
            <div className="space-y-1">
              <div className="text-[9.5px] font-medium px-2 py-1 rounded-lg bg-white/[0.05] border border-white/5 text-white/85 flex items-center gap-1.5">
                <span className="text-[11px]">🏃</span>
                <span>Looking for a Saturday morning running buddy</span>
              </div>
              <div className="text-[9.5px] font-medium px-2 py-1 rounded-lg bg-white/[0.05] border border-white/5 text-white/85 flex items-center gap-1.5">
                <span className="text-[11px]">💻</span>
                <span>Down to co-work at cafes in Hayes Valley</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Skip / Connect Buttons at the Bottom */}
        <div className="p-2.5 pt-1.5 bg-[#0B0F19] border-t border-white/10 shrink-0 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white/80 font-bold text-[11px] transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <X className="w-3.5 h-3.5 text-white/60" />
            <span>Skip</span>
          </button>
          <button
            type="button"
            className="p-2 rounded-xl bg-[#3565F2] hover:bg-[#3D79F2] text-white font-bold text-[11px] shadow-sm transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95"
          >
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
            <span>Connect</span>
          </button>
        </div>
      </div>
    </SnooSpaceDevice>
  );
}
