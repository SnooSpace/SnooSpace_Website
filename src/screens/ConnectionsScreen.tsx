'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { MessageCircle, Sparkles, ShieldCheck, MapPin, X, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Story narrative chapters (Beat 1 -> Beat 2 -> Beat 3 -> Climax Beat)
 */
const STORY_PANELS = [
  {
    id: 'beat-1',
    supporting: 'Maybe you met someone who just got you.',
    main: 'You talked, laughed, and hit it off.',
  },
  {
    id: 'beat-2',
    supporting: 'But you never exchanged numbers or Instagram.',
    main: 'And before you knew it, the event was over.',
  },
  {
    id: 'beat-3',
    supporting: 'There were so many people you never got to talk to.',
    main: "One of them could've been exactly your kind of person.",
  },
  {
    id: 'climax',
    supporting: '',
    main: "They don't have to stay strangers.",
    isClimax: true,
  },
];

/**
 * Custom hook to measure scroll progress through a tall pinned container [0.0 to 1.0]
 * Synchronized with requestAnimationFrame for smooth 60–120fps bidirectional scrubbing.
 * Matches the exact mechanic from Experiment 02 (Horizontal Journey).
 */
function useScrollProgress(containerRef: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number | null = null;
    let lastProgress = -1;

    const updateScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollableDistance = rect.height - viewportHeight;

      if (scrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const rawProgress = scrolled / scrollableDistance;
      const clamped = Math.min(1, Math.max(0, rawProgress));

      // Threshold check to keep state updates performant
      if (Math.abs(clamped - lastProgress) > 0.0005) {
        lastProgress = clamped;
        setProgress(clamped);
      }
    };

    const loop = () => {
      updateScroll();
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [containerRef]);

  return progress;
}

export function ConnectionsScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyTrackRef = useRef<HTMLDivElement>(null);
  const [isDesktopAndMotion, setIsDesktopAndMotion] = useState<boolean>(true);

  // Measure continuous scroll progress through the pinned container [0 to 1]
  const progress = useScrollProgress(storyTrackRef);

  // Responsive & motion preference detection
  useEffect(() => {
    const evaluateEnvironment = () => {
      const isDesktop = window.innerWidth >= 900;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsDesktopAndMotion(isDesktop && !prefersReduced);
    };

    evaluateEnvironment();
    window.addEventListener('resize', evaluateEnvironment);

    return () => {
      window.removeEventListener('resize', evaluateEnvironment);
    };
  }, []);

  // Top headline entrance reveal
  useGSAP(
    () => {
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
    },
    { scope: containerRef }
  );

  // Total horizontal displacement across the 5 moments: 0vw to -400vw
  const baseTranslateX = progress * -400;

  return (
    <section
      id="connections"
      ref={containerRef}
      className="relative pt-24 sm:pt-36 pb-0 bg-[#F7FBFF] border-t border-[#E2E8F0]/50"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] bg-radial from-[#F2F7FE] via-[#CEF2F2]/25 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 1. TOP HALF: EDITORIAL HEADLINE SPREAD                    */}
      {/* ========================================================= */}
      <Container className="relative flex flex-col items-center text-center mb-16 sm:mb-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Eyebrow Tag */}
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] mb-4 block font-display">
            AFTER THE EVENT ENDS
          </span>

          {/* Line 1 */}
          <h2 className="conn-story-line-1 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#0F172A] leading-[1.1] font-display mb-2">
            You met people you really liked.
          </h2>

          {/* Line 2 (Emphasis) */}
          <h2 className="conn-story-line-2 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#3565F2] leading-[1.1] font-display mb-6">
            But did you get to meet everyone?
          </h2>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. DESKTOP PINNED HORIZONTAL JOURNEY (>=900px)           */}
      {/* ========================================================= */}
      {isDesktopAndMotion ? (
        <div ref={storyTrackRef} className="relative min-h-[460vh] w-full">
          <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-[#F7FBFF] border-b border-slate-200/80">


            {/* Expansive Horizontal Editorial Track */}
            <div className="flex-1 flex items-center overflow-visible w-full min-h-0">
              <div
                className="flex items-center flex-shrink-0 will-change-transform"
                style={{
                  transform: `translate3d(${baseTranslateX}vw, 0, 0)`,
                  width: '500vw',
                }}
              >
                {/* Panels 1 to 4: Narrative Story Beats */}
                {STORY_PANELS.map((moment, idx) => {
                  // Subtle horizontal parallax offsets for typographic layers
                  const parallaxSupporting = (progress - idx * 0.25) * 20;

                  return (
                    <div
                      key={moment.id}
                      className="w-screen flex-shrink-0 px-8 sm:px-20 md:px-32 flex flex-col justify-center"
                    >
                      <div className="max-w-4xl">


                        {/* Supporting text with secondary parallax drift */}
                        {moment.supporting && (
                          <div
                            className="will-change-transform mb-5"
                            style={{
                              transform: `translate3d(${parallaxSupporting}px, 0, 0)`,
                            }}
                          >
                            <p className="text-xl sm:text-2xl lg:text-3xl font-normal text-slate-500 leading-relaxed max-w-2xl font-sans">
                              {moment.supporting}
                            </p>
                          </div>
                        )}

                        {/* Main Statement (High impact display typography) */}
                        <h3
                          className={`font-extrabold tracking-tight font-display ${
                            moment.isClimax
                              ? 'text-4xl sm:text-6xl lg:text-7xl text-[#3565F2] leading-[1.12] max-w-4xl'
                              : 'text-3xl sm:text-5xl lg:text-6xl text-[#0B132B] leading-[1.15] max-w-3xl'
                          }`}
                        >
                          {moment.main}
                        </h3>
                      </div>
                    </div>
                  );
                })}

                {/* Panel 5: Payoff Resolution Beat with Meet People Phone Mockup */}
                <div className="w-screen flex-shrink-0 px-8 sm:px-16 md:px-24 flex items-center justify-center">
                  <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    {/* Left Column: Resolution Typography */}
                    <div className="lg:col-span-7 flex flex-col justify-center">

                      <div className="space-y-4">
                        <div
                          className="will-change-transform"
                          style={{
                            transform: `translate3d(${(progress - 1.0) * 20}px, 0, 0)`,
                          }}
                        >
                          <p className="text-xl sm:text-2xl lg:text-3xl font-normal text-slate-500 font-sans">
                            See who was there.
                          </p>
                        </div>
                        <h3 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#0B132B] tracking-tight leading-[1.15] font-display">
                          Find the connections<br />
                          <span className="text-[#3565F2]">you almost missed.</span>
                        </h3>
                        <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B132B] font-display pt-2">
                          Connect after the event.
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Phone Mockup */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end items-center">
                      <MeetPeoplePhoneMockup />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* 3. MOBILE & REDUCED-MOTION UNPINNED EDITORIAL STREAM      */
        /* ========================================================= */
        <div className="relative w-full max-w-xl mx-auto px-6 pb-24">
          {/* Sequential Story Moments (Pure Typography - No Cards/Tickets) */}
          <div className="space-y-16 mb-20">
            {/* Beat 1 */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-500 font-sans leading-relaxed">
                Maybe you met someone who just got you.
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight font-display leading-snug">
                You talked, laughed, and hit it off.
              </h3>
            </div>

            {/* Beat 2 */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-500 font-sans leading-relaxed">
                But you never exchanged numbers or Instagram.
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight font-display leading-snug">
                And before you knew it, the event was over.
              </h3>
            </div>

            {/* Beat 3 */}
            <div className="space-y-3">
              <p className="text-base sm:text-lg text-slate-500 font-sans leading-relaxed">
                There were so many people you never got to talk to.
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] tracking-tight font-display leading-snug">
                One of them could&apos;ve been exactly your kind of person.
              </h3>
            </div>

            {/* Beat 4 (Climax) */}
            <div className="space-y-3 pt-6 border-t border-slate-200/80">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#3565F2] tracking-tight font-display leading-snug">
                They don&apos;t have to stay strangers.
              </h3>
            </div>
          </div>

          {/* Mobile Resolution Block */}
          <div className="text-center max-w-md mx-auto mb-12 space-y-3">
            <p className="text-lg font-semibold text-slate-500 font-sans">
              See who was there.
            </p>
            <h3 className="text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-display">
              Find the connections<br />
              <span className="text-[#3565F2]">you almost missed.</span>
            </h3>
            <p className="text-lg font-bold text-[#0F172A] font-display pt-1">
              Connect after the event.
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
