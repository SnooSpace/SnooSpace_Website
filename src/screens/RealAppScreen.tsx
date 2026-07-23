'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScreenItem {
  id: 'feed' | 'chat' | 'join' | 'swipe';
  title: string;
  sub: string;
}

const SCREENS: ScreenItem[] = [
  { id: 'feed', title: 'Scrolling the feed', sub: 'Plans update in real time, near you.' },
  { id: 'chat', title: 'Opening a chat', sub: 'The group keeps going after the event ends.' },
  { id: 'join', title: 'Joining an event', sub: 'One tap, no forms, no friction.' },
  { id: 'swipe', title: 'Swiping through plans', sub: "Skip what's not for you, in a glance." },
];

export function RealAppScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionWrapRef = useRef<HTMLDivElement>(null);

  const slotsRef = useRef<HTMLDivElement[]>([]);
  const captionsRef = useRef<HTMLDivElement[]>([]);
  const loopTimelines = useRef<{ [key: string]: gsap.core.Timeline | gsap.core.Tween }>({});

  const [active, setActive] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);

  // Render 3D Coverflow stage positions
  const renderCoverflow = (activeIndex: number) => {
    if (!slotsRef.current || slotsRef.current.length === 0) return;

    slotsRef.current.forEach((slot, i) => {
      if (!slot) return;
      const offset = i - activeIndex;
      const abs = Math.abs(offset);
      let x = offset * 190;
      let scale = 1;
      let rot = 0;
      let opacity = 1;
      let z = 10;
      let blur = 0;

      if (offset !== 0) {
        scale = 0.76 - Math.max(0, abs - 1) * 0.12;
        rot = offset > 0 ? -26 : 26;
        opacity = abs >= 2 ? 0.15 : 0.5;
        z = 10 - abs;
        blur = abs * 2;
        x = offset * 168;
      }

      gsap.to(slot, {
        x,
        scale,
        rotateY: rot,
        opacity,
        z: -abs * 80,
        filter: `blur(${blur}px)`,
        zIndex: z,
        duration: 0.6,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    });

    // Caption transitions
    captionsRef.current.forEach((cap, i) => {
      if (!cap) return;
      gsap.to(cap, {
        opacity: i === activeIndex ? 1 : 0,
        y: i === activeIndex ? 0 : 10,
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    // Control individual inner screen animations
    const screenKeys: Array<'feed' | 'chat' | 'join' | 'swipe'> = ['feed', 'chat', 'join', 'swipe'];
    screenKeys.forEach((key, idx) => {
      const tl = loopTimelines.current[key];
      if (tl) {
        if (idx === activeIndex) {
          tl.restart();
        } else {
          tl.pause(0);
        }
      }
    });
  };

  const goTo = (i: number) => {
    const nextIdx = Math.max(0, Math.min(SCREENS.length - 1, i));
    setActive(nextIdx);
    renderCoverflow(nextIdx);
  };

  // Build inner GSAP animations for phone screens
  useGSAP(
    () => {
      if (!stageRef.current) return;
      const stage = stageRef.current;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReduced) return;

      // 1. Feed Animation
      const feedStack = stage.querySelector('[data-role="feedStack"]');
      if (feedStack) {
        loopTimelines.current.feed = gsap.to(feedStack, {
          y: -180,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          paused: true,
        });
      }

      // 2. Chat Animation
      const msg1 = stage.querySelector('[data-role="msg1"]');
      const msg2 = stage.querySelector('[data-role="msg2"]');
      const typing1 = stage.querySelector('[data-role="typing1"]');
      const typing2 = stage.querySelector('[data-role="typing2"]');

      if (msg1 && msg2 && typing1 && typing2) {
        gsap.set([msg1, msg2], { opacity: 0, y: 8 });
        gsap.set([typing1, typing2], { opacity: 0 });

        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(typing1, { opacity: 1, duration: 0.3 }, 0.2)
          .to(typing1, { opacity: 0, duration: 0.2 }, 1.2)
          .fromTo(msg1, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, 1.4)
          .to(typing2, { opacity: 1, duration: 0.3 }, 2.2)
          .to(typing2, { opacity: 0, duration: 0.2 }, 3.2)
          .fromTo(msg2, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.3 }, 3.4)
          .to({}, { duration: 1.6 })
          .to([msg1, msg2], { opacity: 0, duration: 0.3 });

        loopTimelines.current.chat = tl;
      }

      // 3. Join Animation
      const joinBtn = stage.querySelector('[data-role="joinBtn"]');
      const joinCheck = stage.querySelector('[data-role="joinCheck"]');

      if (joinBtn && joinCheck) {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(joinBtn, { scale: 0.94, duration: 0.15 }, 0.6)
          .to(joinBtn, { scale: 1, duration: 0.15 }, 0.75)
          .to(joinCheck, { opacity: 1, duration: 0.25 }, 0.85)
          .to({}, { duration: 1.8 })
          .to(joinCheck, { opacity: 0, duration: 0.25 });

        loopTimelines.current.join = tl;
      }

      // 4. Swipe Animation
      const c0 = stage.querySelector('[data-role="swipe0"]');
      const c1 = stage.querySelector('[data-role="swipe1"]');
      const c2 = stage.querySelector('[data-role="swipe2"]');

      if (c0 && c1 && c2) {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(c0, { x: 280, rotation: 16, opacity: 0, duration: 0.5, ease: 'power2.in', delay: 1 })
          .to(c1, { scale: 1, y: 0, duration: 0.35 }, '<')
          .to(c2, { scale: 0.94, y: 8, duration: 0.35 }, '<')
          .set(c0, { x: -280, rotation: -16, opacity: 0, zIndex: 0 })
          .set(c1, { zIndex: 3 })
          .set(c2, { zIndex: 2 })
          .set(c0, { zIndex: 1 })
          .to(c0, { x: 0, rotation: 0, opacity: 1, scale: 0.88, y: 16, duration: 0.01 });

        loopTimelines.current.swipe = tl;
      }

      // Entrance ScrollTrigger Animation
      gsap.set(slotsRef.current, { opacity: 0, y: 60 });
      gsap.set(headRef.current, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(headRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
          gsap.fromTo(
            slotsRef.current,
            { opacity: 0, y: 60 },
            {
              opacity: (i) => (i === active ? 1 : 0.5),
              y: 0,
              duration: 0.8,
              stagger: 0.08,
              ease: 'power3.out',
              onComplete: () => renderCoverflow(active),
            }
          );
        },
      });

      renderCoverflow(active);
    },
    { scope: sectionRef }
  );

  // Pointer drag/swipe engine
  const handleDown = (x: number) => {
    isDraggingRef.current = true;
    startXRef.current = x;
    setIsGrabbing(true);
  };

  const handleUp = (x: number) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsGrabbing(false);

    const delta = x - startXRef.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) {
        goTo(active + 1);
      } else {
        goTo(active - 1);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="realAppSection"
      className="relative py-20 sm:py-28 overflow-hidden bg-[#FAFCFF] border-t border-[#E2E8F0]/60 select-none"
    >
      {/* Background Auroras */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-radial from-[#CEF2F2]/60 via-[#6BB3F2]/10 to-transparent blur-[90px] opacity-50 pointer-events-none -top-[10%] -left-[12%]" />
      <div className="absolute w-[520px] h-[520px] rounded-full bg-radial from-[#6BB3F2]/40 via-[#3565F2]/10 to-transparent blur-[90px] opacity-35 pointer-events-none -bottom-[15%] -right-[10%]" />

      {/* Section Header */}
      <div ref={headRef} className="relative z-10 text-center max-w-[640px] mx-auto mb-8 sm:mb-12 px-6">
        <div className="mb-3">
          <Badge variant="cyan">The experience</Badge>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#12172B] font-display mb-3.5">
          This is the real app.
        </h2>
        <p className="text-sm sm:text-base text-[#5A6485] font-medium leading-relaxed">
          Not mockups — swap these for real screen recordings before launch. Drag or click through.
        </p>
      </div>

      {/* 3D Coverflow Stage */}
      <div className="relative z-10 h-[460px] sm:h-[560px] flex items-center justify-center [perspective:1400px]">
        <div
          ref={stageRef}
          onMouseDown={(e) => handleDown(e.clientX)}
          onMouseUp={(e) => handleUp(e.clientX)}
          onTouchStart={(e) => handleDown(e.touches[0].clientX)}
          onTouchEnd={(e) => handleUp(e.changedTouches[0].clientX)}
          className={`relative w-full h-full flex items-center justify-center touch-pan-y ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {SCREENS.map((s, i) => (
            <div
              key={s.id}
              ref={(el) => {
                if (el) slotsRef.current[i] = el;
              }}
              className={`phone-slot absolute left-1/2 top-1/2 w-[210px] sm:w-[250px] h-[430px] sm:h-[510px] -ml-[105px] sm:-ml-[125px] -mt-[215px] sm:-mt-[255px] [transform-style:preserve-3d] transition-all duration-300 ${
                i === active ? 'is-active' : ''
              }`}
            >
              {/* Phone Radial Ambient Glow */}
              <div
                className={`absolute -inset-[70px] -z-10 rounded-full bg-radial from-[#CEF2F2] to-transparent blur-[50px] transition-opacity duration-400 pointer-events-none ${
                  i === active ? 'opacity-75' : 'opacity-0'
                }`}
              />

              {/* Phone Shell & Frame */}
              <div className="w-full h-full rounded-[42px] bg-[#0d1224] p-[10px] shadow-[0_50px_90px_-20px_rgba(18,23,43,0.4),0_10px_30px_-10px_rgba(53,101,242,0.32)]">
                <div className="w-full h-full rounded-[33px] overflow-hidden relative bg-gradient-to-b from-white to-[#F3F6FF]">
                  {/* SLIDE 0: FEED */}
                  {s.id === 'feed' && (
                    <>
                      <div className="absolute top-[13px] left-[13px] text-[10px] font-bold text-[#3565F2] uppercase tracking-[0.07em] z-10 bg-white/85 backdrop-blur-xs px-2 py-0.5 rounded-full">
                        Feed
                      </div>
                      <div className="absolute inset-0 pt-[34px] px-[13px] pb-[13px] overflow-hidden">
                        <div data-role="feedStack" className="absolute left-[13px] right-[13px] top-[34px]">
                          <div className="bg-white rounded-[16px] p-3 mb-2.5 shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)] flex gap-2.5 items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2] shrink-0" />
                            <div>
                              <div className="text-[12px] font-bold text-[#12172B]">Sunset run club</div>
                              <div className="text-[10px] text-[#5A6485] mt-0.5">Tonight · 6pm</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-[16px] p-3 mb-2.5 shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)] flex gap-2.5 items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2] shrink-0" />
                            <div>
                              <div className="text-[12px] font-bold text-[#12172B]">Golden hour walk</div>
                              <div className="text-[10px] text-[#5A6485] mt-0.5">Sat · 5:30pm</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-[16px] p-3 mb-2.5 shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)] flex gap-2.5 items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2] shrink-0" />
                            <div>
                              <div className="text-[12px] font-bold text-[#12172B]">Board games night</div>
                              <div className="text-[10px] text-[#5A6485] mt-0.5">Thu · 7pm</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-[16px] p-3 mb-2.5 shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)] flex gap-2.5 items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2] shrink-0" />
                            <div>
                              <div className="text-[12px] font-bold text-[#12172B]">Coastal loop ride</div>
                              <div className="text-[10px] text-[#5A6485] mt-0.5">Sat · 7am</div>
                            </div>
                          </div>
                          <div className="bg-white rounded-[16px] p-3 mb-2.5 shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)] flex gap-2.5 items-center">
                            <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2] shrink-0" />
                            <div>
                              <div className="text-[12px] font-bold text-[#12172B]">Open mic circle</div>
                              <div className="text-[10px] text-[#5A6485] mt-0.5">Fri · 8:30pm</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* SLIDE 1: CHAT */}
                  {s.id === 'chat' && (
                    <div className="absolute inset-0 pt-[34px] px-[13px] pb-[13px] flex flex-col justify-end">
                      <div
                        data-role="typing1"
                        className="flex gap-1 p-[10px_13px] bg-[#EEF2FF] rounded-[14px] self-start w-fit opacity-0 mb-2"
                      >
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse" />
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse delay-100" />
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse delay-200" />
                      </div>
                      <div
                        data-role="msg1"
                        className="max-w-[75%] p-[10px_13px] rounded-[14px] text-[12px] mb-[9px] font-medium opacity-0 bg-[#EEF2FF] text-[#12172B] self-start"
                      >
                        Same time next week?
                      </div>
                      <div
                        data-role="typing2"
                        className="flex gap-1 p-[10px_13px] bg-[#EEF2FF] rounded-[14px] self-start w-fit opacity-0 mb-2"
                      >
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse" />
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse delay-100" />
                        <span className="w-1.25 h-1.25 rounded-full bg-[#5A6485] animate-pulse delay-200" />
                      </div>
                      <div
                        data-role="msg2"
                        className="max-w-[75%] p-[10px_13px] rounded-[14px] text-[12px] mb-[9px] font-medium opacity-0 bg-[#3565F2] text-white self-end"
                      >
                        I'm in 🏃
                      </div>
                    </div>
                  )}

                  {/* SLIDE 2: JOIN */}
                  {s.id === 'join' && (
                    <div className="absolute inset-0 p-[34px_14px_14px]">
                      <div className="bg-white rounded-[18px] p-[15px] shadow-[0_6px_18px_-10px_rgba(18,23,43,0.18)]">
                        <div className="text-[14px] font-bold text-[#12172B] mb-0.5">Sunset run club</div>
                        <div className="text-[11px] text-[#5A6485] mb-3">Riverside Park · 6:15pm</div>
                        <div className="flex -space-x-1.5 mb-3">
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#6BB3F2]" />
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3565F2] to-[#CEF2F2]" />
                          <div className="w-6 h-6 rounded-full border-2 border-white bg-gradient-to-br from-[#3D79F2] to-[#3565F2]" />
                        </div>
                        <div
                          data-role="joinBtn"
                          className="bg-[#12172B] text-white text-center text-[12.5px] font-bold p-[11px] rounded-[12px] relative overflow-hidden"
                        >
                          <span>Join this plan</span>
                          <div
                            data-role="joinCheck"
                            className="absolute inset-0 bg-[#3565F2] flex items-center justify-center opacity-0 font-bold"
                          >
                            ✓ You're in
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 3: SWIPE */}
                  {s.id === 'swipe' && (
                    <div className="absolute inset-0 p-[34px_13px_13px]">
                      <div
                        data-role="swipe0"
                        className="absolute left-[13px] right-[13px] top-[34px] bottom-[13px] bg-white rounded-[18px] shadow-[0_10px_26px_-12px_rgba(18,23,43,0.22)] p-4 flex flex-col justify-end z-30"
                      >
                        <div className="text-[36px] mb-auto">🏃</div>
                        <div className="text-[14.5px] font-extrabold text-[#12172B]">Sunset run club</div>
                        <div className="text-[11px] text-[#5A6485] mt-0.5">2.1 km · Tonight 6pm</div>
                      </div>
                      <div
                        data-role="swipe1"
                        className="absolute left-[13px] right-[13px] top-[34px] bottom-[13px] bg-white rounded-[18px] shadow-[0_10px_26px_-12px_rgba(18,23,43,0.22)] p-4 flex flex-col justify-end z-20 scale-[0.94] translate-y-[8px]"
                      >
                        <div className="text-[36px] mb-auto">🎲</div>
                        <div className="text-[14.5px] font-extrabold text-[#12172B]">Board games night</div>
                        <div className="text-[11px] text-[#5A6485] mt-0.5">0.8 km · Thu 7pm</div>
                      </div>
                      <div
                        data-role="swipe2"
                        className="absolute left-[13px] right-[13px] top-[34px] bottom-[13px] bg-white rounded-[18px] shadow-[0_10px_26px_-12px_rgba(18,23,43,0.22)] p-4 flex flex-col justify-end z-10 scale-[0.88] translate-y-[16px]"
                      >
                        <div className="text-[36px] mb-auto">📷</div>
                        <div className="text-[14.5px] font-extrabold text-[#12172B]">Golden hour walk</div>
                        <div className="text-[11px] text-[#5A6485] mt-0.5">1.4 km · Sat 5:30pm</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Captions */}
      <div ref={captionWrapRef} className="relative z-10 text-center h-[56px] mt-2">
        {SCREENS.map((s, i) => (
          <div
            key={s.id}
            ref={(el) => {
              if (el) captionsRef.current[i] = el;
            }}
            className="absolute left-0 right-0 transition-all duration-300"
            style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <h3 className="text-[17px] font-extrabold text-[#12172B] tracking-tight mb-1">{s.title}</h3>
            <p className="text-[13px] font-medium text-[#5A6485]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Controls & Pagination Dots */}
      <div className="relative z-10 flex justify-center items-center gap-3 mt-4">
        <button
          type="button"
          onClick={() => goTo(active - 1)}
          aria-label="Previous screen"
          className="w-11 h-11 rounded-full bg-white border border-[#E4E8F2] flex items-center justify-center text-[#12172B] shadow-[0_8px_20px_-10px_rgba(18,23,43,0.2)] hover:bg-[#F3F6FF] active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.75 mx-2">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? 'w-5 bg-[#3565F2]' : 'w-1.5 bg-[#E4E8F2] hover:bg-[#5A6485]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1)}
          aria-label="Next screen"
          className="w-11 h-11 rounded-full bg-white border border-[#E4E8F2] flex items-center justify-center text-[#12172B] shadow-[0_8px_20px_-10px_rgba(18,23,43,0.2)] hover:bg-[#F3F6FF] active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
