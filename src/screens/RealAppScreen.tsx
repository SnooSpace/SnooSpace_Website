'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronLeft, ChevronRight, Sparkles, MapPin, ShieldCheck, Plus, Check, Compass } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScreenItem {
  id: 'feed' | 'chat' | 'join' | 'swipe' | 'host' | 'profile' | 'map';
  title: string;
  sub: string;
}

const SCREENS: ScreenItem[] = [
  { id: 'feed', title: 'Scrolling the feed', sub: 'Plans update in real time, near you.' },
  { id: 'chat', title: 'Opening a chat', sub: 'The group keeps going after the event ends.' },
  { id: 'join', title: 'Joining an event', sub: 'One tap, no forms, no friction.' },
  { id: 'swipe', title: 'Swiping through plans', sub: "Skip what's not for you, in a glance." },
  { id: 'host', title: 'Hosting a plan', sub: 'Set a location, cap spots, and drop it live.' },
  { id: 'profile', title: 'Verified Member Profiles', sub: 'See mutual connections & past gatherings.' },
  { id: 'map', title: 'Interactive Map View', sub: 'Explore micro-gatherings dropping in your neighborhood.' },
];

export function RealAppScreen() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const captionWrapRef = useRef<HTMLDivElement>(null);

  const slotsRef = useRef<HTMLDivElement[]>([]);
  const captionsRef = useRef<HTMLDivElement[]>([]);
  const loopTimelines = useRef<{ [key: string]: gsap.core.Timeline | gsap.core.Tween }>({});

  const navTlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef<boolean>(false);
  const ignoreClickRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastWheelTimeRef = useRef<number>(0);

  // Auto-scroll / Autoplay state refs
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const userActivityTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isUserInteractingRef = useRef<boolean>(false);
  const isIntersectingRef = useRef<boolean>(true);

  const [active, setActive] = useState(0);
  const activeRef = useRef<number>(0);
  activeRef.current = active;

  const [isGrabbing, setIsGrabbing] = useState(false);

  // Single coordinated GSAP timeline for silky smooth coverflow motion
  const renderCoverflow = (activeIndex: number) => {
    if (!slotsRef.current.length) return;

    const count = SCREENS.length;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 640;

    navTlRef.current?.kill();

    isAnimatingRef.current = true;
    navTlRef.current = gsap.timeline({
      defaults: {
        duration: 0.62,
        ease: 'power3.out',
        overwrite: 'auto',
      },
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    slotsRef.current.forEach((slot, i) => {
      if (!slot) return;

      let offset = i - activeIndex;
      if (offset > count / 2) offset -= count;
      else if (offset < -count / 2) offset += count;

      const abs = Math.abs(offset);
      const x = offset * (isDesktop ? 185 : 130);

      navTlRef.current!.to(
        slot,
        {
          x,
          y: 0,
          scale: abs === 0 ? 1 : abs === 1 ? 0.86 : abs === 2 ? 0.74 : 0.62,
          opacity: abs === 0 ? 1 : abs === 1 ? 0.72 : abs === 2 ? 0.4 : 0.18,
          rotateY: 0,
          zIndex: 100 - abs,
          force3D: true,
          clearProps: 'filter',
        },
        0
      );
    });

    captionsRef.current.forEach((cap, i) => {
      if (!cap) return;

      navTlRef.current!.to(
        cap,
        {
          opacity: i === activeIndex ? 1 : 0,
          y: i === activeIndex ? 0 : 10,
          duration: 0.35,
        },
        0
      );
    });

    const screenKeys: Array<'feed' | 'chat' | 'join' | 'swipe' | 'host' | 'profile' | 'map'> = [
      'feed',
      'chat',
      'join',
      'swipe',
      'host',
      'profile',
      'map',
    ];

    screenKeys.forEach((key, idx) => {
      const tl = loopTimelines.current[key];
      if (!tl) return;
      if (idx === activeIndex) tl.restart();
      else tl.pause(0);
    });
  };

  const startAutoPlay = () => {
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    autoPlayTimerRef.current = setInterval(() => {
      if (!isUserInteractingRef.current && !isAnimatingRef.current && isIntersectingRef.current) {
        const nextIdx = (activeRef.current + 1) % SCREENS.length;
        setActive(nextIdx);
        renderCoverflow(nextIdx);
      }
    }, 3600);
  };

  const handleUserInteractionStart = () => {
    isUserInteractingRef.current = true;
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    if (userActivityTimeoutRef.current) clearTimeout(userActivityTimeoutRef.current);
  };

  const handleUserInteractionEnd = () => {
    if (userActivityTimeoutRef.current) clearTimeout(userActivityTimeoutRef.current);
    // Auto-resume autoplay after 4.5s of user inactivity
    userActivityTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
      startAutoPlay();
    }, 4500);
  };

  const goTo = (i: number, fromUserAction = false) => {
    const count = SCREENS.length;
    const nextIdx = ((i % count) + count) % count;

    if (nextIdx === activeRef.current) return;
    if (isAnimatingRef.current) return;

    if (fromUserAction) {
      handleUserInteractionStart();
      handleUserInteractionEnd();
    }

    setActive(nextIdx);
    renderCoverflow(nextIdx);
  };

  // Pointer drag handling to block click-after-drag
  const handlePointerDown = (x: number) => {
    handleUserInteractionStart();
    isDraggingRef.current = true;
    startXRef.current = x;
    setIsGrabbing(true);
  };

  const handlePointerUp = (x: number) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsGrabbing(false);

    const delta = x - startXRef.current;

    if (Math.abs(delta) > 40) {
      ignoreClickRef.current = true;
      window.setTimeout(() => {
        ignoreClickRef.current = false;
      }, 250);

      goTo(delta < 0 ? activeRef.current + 1 : activeRef.current - 1, true);
    } else {
      handleUserInteractionEnd();
    }
  };

  // Wheel handler for horizontal scrolling / Shift + Wheel
  useEffect(() => {
    const stageEl = stageRef.current;
    if (!stageEl) return;

    const handleWheelNative = (e: WheelEvent) => {
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10;
      const isShiftWheel = e.shiftKey && Math.abs(e.deltaY) > 10;

      if (isHorizontalScroll || isShiftWheel) {
        if (isAnimatingRef.current) return;
        const now = Date.now();
        if (now - lastWheelTimeRef.current < 300) {
          e.preventDefault();
          return;
        }

        e.preventDefault();
        lastWheelTimeRef.current = now;
        const delta = isShiftWheel ? e.deltaY : e.deltaX;
        const currentActive = activeRef.current;
        const nextIdx = delta > 0 ? currentActive + 1 : currentActive - 1;
        goTo(nextIdx, true);
      }
    };

    stageEl.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      stageEl.removeEventListener('wheel', handleWheelNative);
    };
  }, []);

  // Setup Autoplay Observer & Mount/Unmount cleanup
  useEffect(() => {
    startAutoPlay();

    const container = sectionRef.current;
    if (container) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isIntersectingRef.current = entry.isIntersecting;
            if (!entry.isIntersecting) {
              if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
            } else if (!isUserInteractingRef.current) {
              startAutoPlay();
            }
          });
        },
        { threshold: 0.15 }
      );
      observer.observe(container);

      return () => {
        observer.unobserve(container);
        if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
        if (userActivityTimeoutRef.current) clearTimeout(userActivityTimeoutRef.current);
      };
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      if (userActivityTimeoutRef.current) clearTimeout(userActivityTimeoutRef.current);
    };
  }, []);

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

      // 5. Host Animation
      const hostBtn = stage.querySelector('[data-role="publishHostBtn"]');
      const hostCheck = stage.querySelector('[data-role="publishHostCheck"]');
      if (hostBtn && hostCheck) {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(hostBtn, { scale: 0.94, duration: 0.15 }, 0.8)
          .to(hostBtn, { scale: 1, duration: 0.15 }, 0.95)
          .to(hostCheck, { opacity: 1, duration: 0.25 }, 1.05)
          .to({}, { duration: 1.8 })
          .to(hostCheck, { opacity: 0, duration: 0.25 });

        loopTimelines.current.host = tl;
      }

      // 6. Profile Animation
      const profileBadge = stage.querySelector('[data-role="profileBadge"]');
      const connectBtn = stage.querySelector('[data-role="connectBtn"]');
      const connectCheck = stage.querySelector('[data-role="connectCheck"]');
      if (profileBadge && connectBtn && connectCheck) {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(profileBadge, { scale: 1.08, duration: 0.3 }, 0.5)
          .to(profileBadge, { scale: 1, duration: 0.3 }, 0.8)
          .to(connectBtn, { scale: 0.94, duration: 0.15 }, 1.4)
          .to(connectBtn, { scale: 1, duration: 0.15 }, 1.55)
          .to(connectCheck, { opacity: 1, duration: 0.25 }, 1.65)
          .to({}, { duration: 1.8 })
          .to(connectCheck, { opacity: 0, duration: 0.25 });

        loopTimelines.current.profile = tl;
      }

      // 7. Map Animation
      const mapPin = stage.querySelector('[data-role="mapPin"]');
      const mapBtn = stage.querySelector('[data-role="mapBtn"]');
      const mapCheck = stage.querySelector('[data-role="mapCheck"]');
      if (mapPin && mapBtn && mapCheck) {
        const tl = gsap.timeline({ repeat: -1, paused: true });
        tl.to(mapPin, { y: -6, duration: 0.4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 0.4)
          .to(mapBtn, { scale: 0.94, duration: 0.15 }, 1.8)
          .to(mapBtn, { scale: 1, duration: 0.15 }, 1.95)
          .to(mapCheck, { opacity: 1, duration: 0.25 }, 2.05)
          .to({}, { duration: 1.8 })
          .to(mapCheck, { opacity: 0, duration: 0.25 });

        loopTimelines.current.map = tl;
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
          Not mockups — swap these for real screen recordings before launch. Drag, click, or swipe through.
        </p>
      </div>

      {/* 3D Stage (Single Timelined Coordinated Stage) */}
      <div className="relative z-10 h-[460px] sm:h-[560px] flex items-center justify-center">
        <div
          ref={stageRef}
          onPointerEnter={handleUserInteractionStart}
          onPointerLeave={handleUserInteractionEnd}
          onPointerDown={(e) => handlePointerDown(e.clientX)}
          onPointerUp={(e) => handlePointerUp(e.clientX)}
          onPointerCancel={() => {
            isDraggingRef.current = false;
            setIsGrabbing(false);
            handleUserInteractionEnd();
          }}
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
              onClick={() => {
                if (ignoreClickRef.current || isAnimatingRef.current) return;
                goTo(i, true);
              }}
              style={{ willChange: 'transform, opacity' }}
              className={`phone-slot absolute left-1/2 top-1/2 w-[210px] sm:w-[250px] h-[430px] sm:h-[510px] -translate-x-1/2 -translate-y-1/2 transform-gpu ${
                i === active ? 'is-active cursor-default' : 'cursor-pointer'
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

                  {/* SLIDE 4: HOST */}
                  {s.id === 'host' && (
                    <div className="absolute inset-0 p-[34px_14px_14px] flex flex-col justify-between">
                      <div className="top-bar flex items-center justify-between pb-2 border-b border-[#E4E8F2]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#3565F2]">Create Plan</span>
                        <span className="text-[10px] font-bold text-[#5A6485]">Step 2 of 2</span>
                      </div>
                      <div className="bg-white rounded-[18px] p-3.5 shadow-sm space-y-2.5 my-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-xl bg-[#F2F7FE] text-[#3565F2] flex items-center justify-center font-bold text-sm">
                            ☕
                          </div>
                          <div>
                            <div className="text-[12.5px] font-extrabold text-[#12172B]">Morning Coffee & Code</div>
                            <div className="text-[10px] font-medium text-[#5A6485] flex items-center gap-1">
                              <MapPin className="w-2.5 h-2.5 text-[#3565F2]" /> Third Wave Coffee · 9:00 AM
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10.5px]">
                          <span className="font-semibold text-[#5A6485]">Attendee Cap</span>
                          <span className="font-extrabold text-[#3565F2] bg-[#EEF2FF] px-2 py-0.5 rounded-full">Max 6 (4 left)</span>
                        </div>
                      </div>
                      <div
                        data-role="publishHostBtn"
                        className="bg-[#3565F2] text-white text-center text-[12.5px] font-bold p-[11px] rounded-[12px] relative overflow-hidden shadow-md cursor-pointer"
                      >
                        <span>Publish Open Plan</span>
                        <div
                          data-role="publishHostCheck"
                          className="absolute inset-0 bg-[#12172B] flex items-center justify-center opacity-0 font-bold text-white"
                        >
                          ✨ Plan Dropped Live!
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 5: PROFILE */}
                  {s.id === 'profile' && (
                    <div className="absolute inset-0 p-[34px_14px_14px] flex flex-col justify-between">
                      <div className="bg-white rounded-[18px] p-4 shadow-sm text-center relative overflow-hidden mt-1">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#3565F2] to-[#6BB3F2] mx-auto p-0.5 mb-2 relative">
                          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold text-white">
                            👩‍💻
                          </div>
                          <div
                            data-role="profileBadge"
                            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#3565F2] border-2 border-white flex items-center justify-center text-white"
                          >
                            <ShieldCheck className="w-3 h-3" />
                          </div>
                        </div>
                        <h4 className="text-[14px] font-extrabold text-[#12172B]">Maya Lin 🌟</h4>
                        <p className="text-[10.5px] font-medium text-[#5A6485]">San Francisco · 14 Plans Hosted</p>
                        <div className="flex justify-center gap-1.5 mt-2.5">
                          <span className="text-[9.5px] font-bold bg-[#EEF2FF] text-[#3565F2] px-2 py-0.5 rounded-full">
                            Verified Host
                          </span>
                          <span className="text-[9.5px] font-bold bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                            4.9 ★ Rating
                          </span>
                        </div>
                      </div>
                      <div
                        data-role="connectBtn"
                        className="bg-[#12172B] text-white text-center text-[12.5px] font-bold p-[11px] rounded-[12px] relative overflow-hidden cursor-pointer"
                      >
                        <span>Connect & Invite</span>
                        <div
                          data-role="connectCheck"
                          className="absolute inset-0 bg-[#3565F2] flex items-center justify-center opacity-0 font-bold"
                        >
                          ✓ Connection Sent
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SLIDE 6: MAP VIEW */}
                  {s.id === 'map' && (
                    <div className="absolute inset-0 p-[34px_13px_13px] flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E4E8F2]">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#3565F2]">Live Map</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">8 Drops Near You</span>
                      </div>
                      <div className="relative w-full h-[220px] rounded-[20px] bg-slate-900 overflow-hidden my-auto flex items-center justify-center border border-slate-800">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-40" />
                        
                        <div data-role="mapPin" className="relative z-10 flex flex-col items-center">
                          <div className="w-10 h-10 rounded-full bg-[#3565F2]/30 flex items-center justify-center animate-ping absolute inset-0" />
                          <div className="w-10 h-10 rounded-full bg-[#3565F2] text-white flex items-center justify-center font-bold shadow-lg z-10 border-2 border-white">
                            📍
                          </div>
                          <div className="bg-white/95 backdrop-blur-xs rounded-xl p-2 mt-2 shadow-xl border border-slate-200 text-center">
                            <div className="text-[11px] font-extrabold text-[#12172B]">Sunset Run Club</div>
                            <div className="text-[9.5px] font-semibold text-[#5A6485]">0.4 mi · Starts 6pm</div>
                          </div>
                        </div>
                      </div>
                      <div
                        data-role="mapBtn"
                        className="bg-[#3565F2] text-white text-center text-[12.5px] font-bold p-[11px] rounded-[12px] relative overflow-hidden shadow-md cursor-pointer"
                      >
                        <span>Explore Nearby Drops</span>
                        <div
                          data-role="mapCheck"
                          className="absolute inset-0 bg-[#12172B] flex items-center justify-center opacity-0 font-bold text-white"
                        >
                          🛰️ Radar Active
                        </div>
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
            style={{ willChange: 'transform, opacity' }}
            className="absolute left-0 right-0 transition-all duration-300 pointer-events-none"
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
          onClick={() => goTo(active - 1, true)}
          aria-label="Previous screen"
          className="w-11 h-11 rounded-full bg-white border border-[#E4E8F2] flex items-center justify-center text-[#12172B] shadow-[0_8px_20px_-10px_rgba(18,23,43,0.2)] hover:bg-[#F3F6FF] active:scale-95 transition-all cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-1.75 mx-2">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i, true)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === active ? 'w-5 bg-[#3565F2]' : 'w-1.5 bg-[#E4E8F2] hover:bg-[#5A6485]'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => goTo(active + 1, true)}
          aria-label="Next screen"
          className="w-11 h-11 rounded-full bg-white border border-[#E4E8F2] flex items-center justify-center text-[#12172B] shadow-[0_8px_20px_-10px_rgba(18,23,43,0.2)] hover:bg-[#F3F6FF] active:scale-95 transition-all cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
