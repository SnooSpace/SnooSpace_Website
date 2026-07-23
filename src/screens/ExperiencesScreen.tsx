'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { Calendar, Users, MapPin, Plus, Sparkles, Star } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface OrbitItem {
  id: string;
  icon: string;
  label: string;
  tier: 'Popular' | 'Growing' | 'New' | '';
  size: 'lg' | 'md' | 'sm';
  ring: 'inner' | 'mid' | 'outer' | 'center';
  dir: number; // 1 or -1
  phase: number;
  event: string;
  meta: string;
  attendees: number;
  bg: string;
  create?: boolean;
}

const ORBIT_ITEMS: OrbitItem[] = [
  // Central Anchor
  {
    id: 'create',
    icon: '+',
    label: 'Start an Open Plan',
    tier: '',
    size: 'lg',
    ring: 'center',
    dir: 0,
    phase: 0,
    event: 'Create a mini plan',
    meta: 'Invite people to join in minutes',
    attendees: 0,
    bg: 'bg-[#3565F2]',
    create: true,
  },
  // Inner Ring (Popular / Established - Larger bubbles, slower orbit)
  {
    id: 'running',
    icon: '🏃',
    label: 'Running',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: 1,
    phase: 0.0,
    event: 'Sunset Run Club',
    meta: 'Riverside Park • Tonight 6:00 PM',
    attendees: 12,
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'gaming',
    icon: '🎮',
    label: 'Gaming',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: -1,
    phase: 2.1,
    event: 'Smash & Board Games',
    meta: 'The Arcade Bar • Fri 8:00 PM',
    attendees: 15,
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'coffee',
    icon: '☕',
    label: 'Coffee',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: 1,
    phase: 4.2,
    event: 'Espresso & Coffee Meetup',
    meta: 'Third Wave Cafe • Mon 9:30 AM',
    attendees: 9,
    bg: 'bg-[#DCE7FF]',
  },

  // Mid Ring (Growing - Medium bubbles, medium speed orbit)
  {
    id: 'photography',
    icon: '📷',
    label: 'Photography',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: 1,
    phase: 0.8,
    event: 'Golden Hour Photo Walk',
    meta: 'Mission District • Wed 5:30 PM',
    attendees: 8,
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'boardgames',
    icon: '🎲',
    label: 'Board Games',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 2.4,
    event: 'Strategy & Catan Night',
    meta: 'Copper Cafe • Thu 7:00 PM',
    attendees: 10,
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'cycling',
    icon: '🚴',
    label: 'Cycling',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: 1,
    phase: 4.0,
    event: 'Coastal Trail Loop Ride',
    meta: 'Harbor Point • Tue 6:45 AM',
    attendees: 14,
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'yoga',
    icon: '🧘',
    label: 'Yoga & Flow',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 5.2,
    event: 'Sunrise Park Mindfulness',
    meta: 'Dolores Park • Sat 8:00 AM',
    attendees: 18,
    bg: 'bg-[#F2F7FE]',
  },

  // Outer Ring (New & Niche - Compact bubbles, faster orbit)
  {
    id: 'music',
    icon: '🎵',
    label: 'Music & Vinyl',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 0.3,
    event: 'Open Mic & Record Circle',
    meta: 'The Loft • Sun 7:00 PM',
    attendees: 7,
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'movies',
    icon: '🎬',
    label: 'Indie Cinema',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 1.5,
    event: 'Rooftop Film Screening',
    meta: 'Outdoor Cinema • Sun 9:00 PM',
    attendees: 16,
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'books',
    icon: '📚',
    label: 'Book Club',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 2.8,
    event: 'Silent Read & Chill',
    meta: 'Local Library • Sat 3:00 PM',
    attendees: 11,
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'supper',
    icon: '🍲',
    label: 'Supper Club',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 4.1,
    event: 'Home Cooked Tasting',
    meta: 'Underground Kitchen • Fri 7:30 PM',
    attendees: 6,
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'pickleball',
    icon: '🏸',
    label: 'Pickleball',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 5.4,
    event: 'Weekend Doubles Social',
    meta: 'Park Courts • Sat 10:00 AM',
    attendees: 8,
    bg: 'bg-[#F2F7FE]',
  },
];

// Elliptical ring parameters (rx/ry percentages & relative speed)
const RING_DEFS = {
  inner: { rxFrac: 0.22, ryFrac: 0.29, speed: 0.08 },
  mid:   { rxFrac: 0.35, ryFrac: 0.41, speed: 0.12 },
  outer: { rxFrac: 0.47, ryFrac: 0.46, speed: 0.17 },
};

export function ExperiencesScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterWrapRef = useRef<HTMLDivElement>(null);
  const centerBubbleRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef<boolean>(true);

  const [activeBubbleId, setActiveBubbleId] = useState<string | null>(null);
  const [isHoveringCluster, setIsHoveringCluster] = useState(false);

  // Viewport IntersectionObserver to pause ticker calculations when offscreen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersectingRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);
    return () => observer.unobserve(container);
  }, []);

  useGSAP(
    () => {
      const wrap = clusterWrapRef.current;
      if (!wrap) return;

      const isDesktop = window.innerWidth >= 860;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!isDesktop || prefersReduced) return;

      const bubbles = gsap.utils.toArray<HTMLElement>('.orbit-bubble');
      let rect = wrap.getBoundingClientRect();
      let cx = rect.width / 2;
      let cy = rect.height / 2;

      const updateDimensions = () => {
        if (!wrap) return;
        rect = wrap.getBoundingClientRect();
        cx = rect.width / 2;
        cy = rect.height / 2;
        bubbles.forEach((b) => {
          const size = b.offsetWidth || 140;
          b.style.left = `${cx - size / 2}px`;
          b.style.top = `${cy - size / 2}px`;
        });
      };

      updateDimensions();

      const handleResize = () => {
        updateDimensions();
        orbitStates.forEach((state, i) => {
          if (!state) return;
          const ring = RING_DEFS[ORBIT_ITEMS[i].ring as keyof typeof RING_DEFS];
          state.rx = rect.width * ring.rxFrac;
          state.ry = rect.height * ring.ryFrac;
        });
      };

      window.addEventListener('resize', handleResize, { passive: true });

      // Central anchor gentle pulse
      if (centerBubbleRef.current) {
        gsap.to(centerBubbleRef.current, {
          scale: 1.05,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(centerBubbleRef.current, {
          boxShadow: '0 0 0 24px rgba(53,101,242,0), 0 20px 50px -18px rgba(53,101,242,0.5)',
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Orbital ticker physics engine
      const orbitStates = ORBIT_ITEMS.map((item) => {
        if (item.create) return null;
        const ring = RING_DEFS[item.ring as keyof typeof RING_DEFS];
        return {
          angle: item.phase,
          dir: item.dir,
          speed: ring.speed,
          rx: rect.width * ring.rxFrac,
          ry: rect.height * ring.ryFrac,
          paused: false,
        };
      });

      const updateTicker = (_time: number, deltaMs: number) => {
        // PERFORMANCE OPTIMIZATION: Skip math & DOM sets if section is offscreen
        if (!isIntersectingRef.current) return;

        const dt = Math.min(deltaMs / 1000, 0.1); // Cap maximum delta time
        bubbles.forEach((b, i) => {
          const item = ORBIT_ITEMS[i];
          const state = orbitStates[i];
          if (!state || state.paused || item.create) return;

          state.angle += state.speed * state.dir * dt;
          const x = Math.cos(state.angle) * state.rx;
          const y = Math.sin(state.angle) * state.ry;

          // GPU-accelerated 3D transform assignment
          gsap.set(b, { x, y, force3D: true });
        });
      };

      gsap.ticker.add(updateTicker);

      return () => {
        gsap.ticker.remove(updateTicker);
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: containerRef }
  );

  return (
    <section id="experiences" ref={containerRef} className="relative pt-16 pb-28 bg-[#FAFCFF] overflow-hidden">
      {/* Background Soft Auroras */}
      <div className="absolute top-0 right-0 w-[580px] h-[580px] rounded-full bg-radial from-[#CEF2F2]/60 via-[#6BB3F2]/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-radial from-[#3565F2]/15 via-[#3D79F2]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* ========================================================= */}
        {/* EDITORIAL SECTION HEADER                                  */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="primary" className="mb-4">
            EXPLORE EXPERIENCES
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12] font-display mb-4">
            Find your kind of plan. <br />
            <span className="text-[#3565F2]">Or create one.</span>
          </h2>
          <p className="text-base sm:text-lg font-medium text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Every community has its own rhythm — its own regulars, its own reasons to show up. Hover to peek in, or start your own Open Plan.
          </p>
        </div>

        {/* ========================================================= */}
        {/* ORBITAL COMMUNITY CLUSTER CONTAINER                       */}
        {/* ========================================================= */}
        <div
          ref={clusterWrapRef}
          onMouseEnter={() => setIsHoveringCluster(true)}
          onMouseLeave={() => {
            setIsHoveringCluster(false);
            setActiveBubbleId(null);
          }}
          className={`relative w-full max-w-[980px] min-h-[580px] sm:h-[640px] mx-auto mb-8 flex flex-wrap sm:block justify-center items-center gap-4 sm:gap-0 select-none ${
            isHoveringCluster ? 'cluster-hovering' : ''
          }`}
        >
          {ORBIT_ITEMS.map((item) => {
            const isActive = activeBubbleId === item.id;
            const isDimmed = isHoveringCluster && activeBubbleId !== null && !isActive;

            // Size styling mapping
            const sizeClass =
              item.size === 'lg'
                ? 'w-[150px] h-[150px] sm:w-[185px] sm:h-[185px]'
                : item.size === 'md'
                ? 'w-[120px] h-[120px] sm:w-[140px] sm:h-[140px]'
                : 'w-[95px] h-[95px] sm:w-[105px] sm:h-[105px]';

            return (
              <div
                key={item.id}
                ref={item.create ? centerBubbleRef : null}
                onMouseEnter={() => setActiveBubbleId(item.id)}
                onMouseLeave={() => setActiveBubbleId(null)}
                className={`orbit-bubble sm:absolute rounded-full cursor-pointer flex items-center justify-center text-center shadow-lg transition-all duration-300 transform will-change-transform translate-z-0 backface-hidden ${sizeClass} ${
                  item.create
                    ? 'bg-[#3565F2] text-white border-2 border-dashed border-white/60 shadow-[0_20px_50px_-18px_rgba(53,101,242,0.5)] z-20'
                    : `${item.bg} text-[#0F172A] border border-white/80 hover:shadow-2xl`
                } ${
                  isActive
                    ? 'scale-110 z-30 ring-4 ring-[#3565F2]/20 opacity-100'
                    : isDimmed
                    ? 'opacity-40 scale-95 z-10'
                    : 'opacity-100 z-10'
                }`}
              >
                {/* DEFAULT FACE CONTENT */}
                <div className={`p-3 flex flex-col items-center justify-center transition-opacity duration-200 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
                  {item.create ? (
                    <>
                      <Plus className="w-8 h-8 text-white mb-1" />
                      <span className="text-xs sm:text-sm font-extrabold text-white leading-tight">{item.label}</span>
                    </>
                  ) : (
                    <>
                      <span className={`${item.size === 'sm' ? 'text-xl' : 'text-2xl sm:text-3xl'} mb-1`}>{item.icon}</span>
                      <span className={`font-extrabold tracking-tight text-[#0F172A] ${item.size === 'sm' ? 'text-xs' : 'text-xs sm:text-sm'}`}>
                        {item.label}
                      </span>
                      {item.tier && item.size !== 'sm' && (
                        <span className="text-[10px] font-semibold text-[#5A6485] mt-0.5">{item.tier}</span>
                      )}
                    </>
                  )}
                </div>

                {/* ACTIVE OVERLAY PEEK CARD */}
                <div
                  className={`absolute inset-0 rounded-full bg-white/95 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-xl ${
                    isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
                  }`}
                >
                  {item.create ? (
                    <>
                      <span className="text-xs font-extrabold text-[#3565F2] mb-1">Don&apos;t see your thing?</span>
                      <span className="text-xs font-bold text-[#0F172A]">{item.event}</span>
                      <span className="text-[10px] font-medium text-[#64748B] mt-1">{item.meta}</span>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-sm">{item.icon}</span>
                        <span className="text-xs font-extrabold text-[#0F172A]">{item.label}</span>
                      </div>
                      
                      {/* Attendee Avatars */}
                      <div className="flex -space-x-1.5 mb-2">
                        <div className="w-5 h-5 rounded-full bg-[#3565F2] border border-white" />
                        <div className="w-5 h-5 rounded-full bg-[#3D79F2] border border-white" />
                        <div className="w-5 h-5 rounded-full bg-[#6BB3F2] border border-white" />
                      </div>

                      <span className="text-[11px] font-bold text-[#0F172A] line-clamp-1">{item.event}</span>
                      <span className="text-[9.5px] font-semibold text-[#64748B] line-clamp-1 mt-0.5">{item.meta}</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Legend / Hint */}
        <div className="text-center space-y-1 mb-16">
          <p className="text-xs font-bold text-[#3565F2] uppercase tracking-wider">
            Hover any bubble to peek inside live plans
          </p>
          <p className="text-xs font-medium text-[#64748B] opacity-80">
            Bubble orbit radius reflects community activity — established groups orbit closer to the center core.
          </p>
        </div>

        {/* ========================================================= */}
        {/* RELOCATED FEATURE PILLARS                                 */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#3565F2]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F7FE] flex items-center justify-center text-[#3565F2] mb-6">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0F172A] mb-2">Curated Gatherings</h3>
            <p className="text-sm font-medium text-[#64748B] leading-relaxed">
              From weekend trail runs and rooftop coffee tastings to indie film watch parties.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#3565F2]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#CEF2F2] flex items-center justify-center text-[#0F172A] mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0F172A] mb-2">Micro-Communities</h3>
            <p className="text-sm font-medium text-[#64748B] leading-relaxed">
              Small, intimate groups capped at 10–15 people so everyone actually gets to talk.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm hover:border-[#3565F2]/30 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-[#F2F7FE] flex items-center justify-center text-[#3565F2] mb-6">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-[#0F172A] mb-2">Local Drops</h3>
            <p className="text-sm font-medium text-[#64748B] leading-relaxed">
              Discover spontaneous activities happening in your neighborhood today.
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* SMARTPHONE DEVICE SHOWCASE CARD                            */}
        {/* ========================================================= */}
        <div className="rounded-3xl bg-white border border-[#E2E8F0] p-8 sm:p-12 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <Badge variant="cyan">Interactive Event Hub</Badge>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
              See who is attending before you step out.
            </h3>
            <p className="text-base font-medium text-[#475569] leading-relaxed">
              SnooSpace provides host verification, attendee rosters, and temporary group chats for every event, so you know exactly who you will be meeting.
            </p>
            <div className="pt-4 flex items-center gap-6 text-sm font-bold text-[#0F172A]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3565F2]" />
                <span>Verified Hosts</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span>Live Event Chat</span>
              </div>
            </div>
          </div>

          {/* Smartphone Showcase Mockup */}
          <div className="lg:col-span-6 flex justify-center">
            <SnooSpaceDevice
              imageSrc="/snoospace_event_detail.png"
              imageAlt="SnooSpace Event Details Preview"
              className="w-[260px] sm:w-[285px]"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
