'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { Sun, SunMedium, Sunset, Moon, Users, MapPin, Sparkles, MessageCircle, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TIME_PHASES = [
  {
    step: 0,
    timeLabel: 'Morning Glow',
    timeIcon: Sun,
    glowBg: 'radial-gradient(circle, rgba(206, 242, 242, 0.9) 0%, rgba(107, 179, 242, 0.35) 50%, transparent 75%)',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
  },
  {
    step: 1,
    timeLabel: 'Afternoon Sun',
    timeIcon: SunMedium,
    glowBg: 'radial-gradient(circle, rgba(61, 121, 242, 0.7) 0%, rgba(53, 101, 242, 0.25) 50%, transparent 75%)',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  {
    step: 2,
    timeLabel: 'Golden Hour',
    timeIcon: Sunset,
    glowBg: 'radial-gradient(circle, rgba(251, 191, 36, 0.7) 0%, rgba(245, 158, 11, 0.3) 50%, transparent 75%)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    step: 3,
    timeLabel: 'Warm Evening',
    timeIcon: Moon,
    glowBg: 'radial-gradient(circle, rgba(129, 140, 248, 0.65) 0%, rgba(30, 27, 75, 0.35) 50%, transparent 75%)',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
  },
];

const STEPS_DATA = [
  {
    num: 'STEP 1',
    title: 'Discover',
    desc: 'Browse plans and communities built around what you already love — running routes, board game nights, photo walks.',
  },
  {
    num: 'STEP 2',
    title: 'Join',
    desc: "Tap in. See who's going, ask questions, and reserve your spot in seconds.",
  },
  {
    num: 'STEP 3',
    title: 'Meet',
    desc: 'Show up. SnooSpace handles the introductions before you even arrive.',
  },
  {
    num: 'STEP 4',
    title: 'Stay connected',
    desc: 'Keep the group going after — plan the next one without starting from zero.',
  },
];

export function JourneyScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const isDesktop = window.innerWidth >= 900;

      if (isDesktop && sectionRef.current && pinRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: '+=120%',
          pinSpacing: true,
          scrub: 0.5,
          onUpdate: (self) => {
            const idx = Math.min(3, Math.floor(self.progress * 4));
            setActiveStep(idx);
          },
        });
      }
    },
    { scope: sectionRef }
  );

  const currentPhase = TIME_PHASES[activeStep];
  const TimeIcon = currentPhase.timeIcon;

  return (
    <section id="journey" ref={sectionRef} className="relative bg-[#FAFCFF] border-t border-[#E2E8F0]/60">
      {/* SECTION HEADER (Scrolls away naturally) */}
      <div className="pt-20 pb-8 text-center max-w-3xl mx-auto px-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#3565F2] mb-3 block">
          HOW SNOOSPACE WORKS
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] font-display">
          From scrolling to showing up.
        </h2>
      </div>

      {/* STICKY / PIN CONTAINER (Phone + 4 Steps Grid Pushed Higher Up) */}
      <div
        ref={pinRef}
        className="sticky top-0 h-screen flex flex-col justify-start items-center max-w-6xl mx-auto px-6 pt-2 sm:pt-4 pb-6"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center -translate-y-4 sm:-translate-y-8">
          {/* ========================================================= */}
          {/* LEFT COLUMN: SMARTPHONE WITH TIME-OF-DAY AMBIENT GLOW     */}
          {/* ========================================================= */}
          <div className="md:col-span-6 flex flex-col items-center justify-center relative">
            {/* Dynamic Time-of-Day Ambient Background Glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full pointer-events-none transition-all duration-1000 blur-3xl opacity-70 -z-10"
              style={{ background: currentPhase.glowBg }}
            />

            {/* Phone Device Frame */}
            <SnooSpaceDevice showGlow={false} className="w-[225px] sm:w-[250px]">
              <div className="relative w-full h-full bg-gradient-to-b from-white to-[#F3F6FF] overflow-hidden text-[#0F172A] p-4 sm:p-4.5 pt-7 select-none">
                {/* ----------------------------------------------------- */}
                {/* SLIDE 0: DISCOVER (Morning Vibe)                      */}
                {/* ----------------------------------------------------- */}
                <div
                  className={`absolute inset-4 sm:inset-5 pt-8 transition-all duration-500 flex flex-col ${
                    activeStep === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <span className="text-[10px] font-bold text-[#3565F2] uppercase tracking-wider mb-1">Discover</span>
                  <h3 className="text-base font-extrabold tracking-tight mb-3">Built around what you love</h3>
                  
                  {/* Category Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3.5">
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#CEF2F2] text-[#3565F2]">Running</span>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#CEF2F2] text-[#3565F2]">Photography</span>
                    <span className="text-[10.5px] font-bold px-2.5 py-0.5 rounded-full bg-[#CEF2F2] text-[#3565F2]">Board Games</span>
                  </div>

                  {/* Activity Cards */}
                  <div className="space-y-2.5">
                    <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-[#3565F2] border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-[#3D79F2] border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-[#6BB3F2] border-2 border-white" />
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-[#0F172A]">Sunset run club</h4>
                        <p className="text-[10px] font-semibold text-[#64748B]">2.1 km away • Tonight</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 border-2 border-white" />
                        <div className="w-6 h-6 rounded-full bg-teal-500 border-2 border-white" />
                      </div>
                      <div>
                        <h4 className="text-[12px] font-bold text-[#0F172A]">Board games night</h4>
                        <p className="text-[10px] font-semibold text-[#64748B]">4 going • 8:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* SLIDE 1: JOIN (Afternoon Vibe)                        */}
                {/* ----------------------------------------------------- */}
                <div
                  className={`absolute inset-4 sm:inset-5 pt-8 transition-all duration-500 flex flex-col justify-between ${
                    activeStep === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#3565F2] uppercase tracking-wider mb-1">Join</span>
                    <h3 className="text-base font-extrabold tracking-tight mb-3.5">Sunset run club</h3>

                    <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm mb-3.5">
                      <div className="flex -space-x-2 mb-2">
                        <div className="w-6.5 h-6.5 rounded-full bg-[#3565F2] border-2 border-white" />
                        <div className="w-6.5 h-6.5 rounded-full bg-[#3D79F2] border-2 border-white" />
                        <div className="w-6.5 h-6.5 rounded-full bg-[#6BB3F2] border-2 border-white" />
                      </div>
                      <h4 className="text-[12px] font-bold text-[#0F172A]">7 going • 1 spot left</h4>
                      <p className="text-[10.5px] font-semibold text-[#64748B]">Riverside Park • 6:15 PM</p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#3565F2] text-white text-center font-bold text-xs shadow-md">
                    Join this plan
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* SLIDE 2: MEET (Golden Hour Vibe)                      */}
                {/* ----------------------------------------------------- */}
                <div
                  className={`absolute inset-4 sm:inset-5 pt-8 transition-all duration-500 flex flex-col ${
                    activeStep === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <span className="text-[10px] font-bold text-[#3565F2] uppercase tracking-wider mb-1">Meet</span>
                  <h3 className="text-base font-extrabold tracking-tight mb-3">You&apos;ve arrived</h3>

                  <div className="inline-flex items-center gap-1.5 bg-[#CEF2F2] text-[#3565F2] text-[10.5px] font-bold px-3 py-1 rounded-full mb-3.5 w-fit">
                    <span className="w-2 h-2 rounded-full bg-[#3565F2] animate-ping" />
                    <span>5 people here now</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                    <div className="flex -space-x-2 mb-2">
                      <div className="w-6.5 h-6.5 rounded-full bg-[#3565F2] border-2 border-white" />
                      <div className="w-6.5 h-6.5 rounded-full bg-[#3D79F2] border-2 border-white" />
                      <div className="w-6.5 h-6.5 rounded-full bg-amber-500 border-2 border-white" />
                    </div>
                    <h4 className="text-[12px] font-bold text-[#0F172A]">Riverside Park</h4>
                    <p className="text-[10.5px] font-semibold text-[#64748B]">Group is at the fountain</p>
                  </div>
                </div>

                {/* ----------------------------------------------------- */}
                {/* SLIDE 3: STAY CONNECTED (Warm Evening Vibe)           */}
                {/* ----------------------------------------------------- */}
                <div
                  className={`absolute inset-4 sm:inset-5 pt-8 transition-all duration-500 flex flex-col justify-between ${
                    activeStep === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#3565F2] uppercase tracking-wider mb-1">Stay connected</span>
                    <h3 className="text-base font-extrabold tracking-tight mb-3">Sunset run club</h3>

                    {/* Chat Bubbles */}
                    <div className="space-y-2 text-[11px] font-semibold">
                      <div className="p-2.5 rounded-2xl bg-[#EEF2FF] text-[#0F172A] max-w-[80%]">
                        Same time next week?
                      </div>
                      <div className="p-2.5 rounded-2xl bg-[#3565F2] text-white max-w-[80%] ml-auto">
                        I&apos;m in 🏃
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#3565F2] text-white text-center font-bold text-xs shadow-md">
                    Plan the next one
                  </div>
                </div>
              </div>
            </SnooSpaceDevice>
          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: STEPPER RAIL & NARRATIVE LIST               */}
          {/* ========================================================= */}
          <div className="md:col-span-6 flex gap-6 max-w-md">
            {/* Stepper Rail Line */}
            <div className="relative w-0.5 bg-[#E4E8F2] rounded-full shrink-0">
              <div
                className="absolute top-0 left-0 w-full bg-[#3565F2] rounded-full transition-all duration-500"
                style={{ height: `${(activeStep / 3) * 100}%` }}
              />
            </div>

            {/* Steps List - Prominent typography */}
            <div className="space-y-6 sm:space-y-7">
              {STEPS_DATA.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className={`cursor-pointer transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-75 scale-98'
                    }`}
                  >
                    <span className="text-xs font-extrabold text-[#3565F2] tracking-wider mb-1 block">
                      {item.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] mb-1.5 font-sans">
                      {item.title}
                    </h3>
                    <p className="text-sm font-medium text-[#5A6485] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
