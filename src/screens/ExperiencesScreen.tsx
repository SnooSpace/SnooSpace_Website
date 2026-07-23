'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import { HostPlanModal, ACTIVITIES, ActivityOption } from '@/components/ui/host-plan-modal';
import { Calendar, Users, MapPin, Plus, Sparkles, Star, Globe, Flame } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface OrbitNodeItem {
  id: string;
  icon: string;
  label: string;
  tier: 'Popular' | 'Growing' | 'New' | 'City' | '';
  size: 'lg' | 'md' | 'sm';
  ring: 'inner' | 'mid' | 'outer' | 'center';
  dir: number; // 1 or -1
  phase: number;
  event: string;
  meta: string;
  illustration: string;
  bg: string;
  isCity?: boolean;
  create?: boolean;
}

const ALL_CLUSTER_NODES: OrbitNodeItem[] = [
  // Central Anchor
  {
    id: 'create',
    icon: '+',
    label: 'Host an Open Plan',
    tier: '',
    size: 'lg',
    ring: 'center',
    dir: 0,
    phase: 0,
    event: 'Create a mini plan',
    meta: 'Invite people to join in minutes',
    illustration: '/illustrations/Other.webp',
    bg: 'bg-[#3565F2]',
    create: true,
  },

  // =========================================================
  // INNER RING (8 Items: Established Categories & Key Cities)
  // =========================================================
  {
    id: 'sports',
    icon: '🏀',
    label: 'Sports',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: 1,
    phase: 0.0,
    event: 'Pickup Basketball & Drinks',
    meta: 'Mission Courts • 14 Going',
    illustration: '/illustrations/Sports.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'city-bengaluru',
    icon: '🌆',
    label: 'Bengaluru',
    tier: 'City',
    size: 'md',
    ring: 'inner',
    dir: -1,
    phase: 0.8,
    event: '42 Active Plans Today',
    meta: 'Indiranagar & Koramangala Hub',
    illustration: '/illustrations/Community.webp',
    bg: 'bg-[#F2F7FE]',
    isCity: true,
  },
  {
    id: 'food',
    icon: '🍜',
    label: 'Food',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: 1,
    phase: 1.6,
    event: 'Ramen & Noodle Tasting',
    meta: 'Japantown • 11 Going',
    illustration: '/illustrations/Food.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'cafe',
    icon: '☕',
    label: 'Cafe',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: -1,
    phase: 2.4,
    event: 'Specialty Espresso Hangout',
    meta: 'Third Wave Cafe • Mon 9:30 AM',
    illustration: '/illustrations/Cafe.webp',
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'city-mumbai',
    icon: '🏙️',
    label: 'Mumbai',
    tier: 'City',
    size: 'md',
    ring: 'inner',
    dir: 1,
    phase: 3.2,
    event: '58 Active Plans Today',
    meta: 'Bandra & Marine Drive Hub',
    illustration: '/illustrations/People.webp',
    bg: 'bg-[#CEF2F2]',
    isCity: true,
  },
  {
    id: 'gaming',
    icon: '🎮',
    label: 'Games',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: -1,
    phase: 4.0,
    event: 'Smash & Board Games',
    meta: 'The Arcade Bar • Fri 8:00 PM',
    illustration: '/illustrations/Gaming.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'city-delhi',
    icon: '🏛️',
    label: 'Delhi NCR',
    tier: 'City',
    size: 'md',
    ring: 'inner',
    dir: 1,
    phase: 4.8,
    event: '31 Active Plans Today',
    meta: 'Gurgaon & Hauz Khas Hub',
    illustration: '/illustrations/Hangout.webp',
    bg: 'bg-[#DCE7FF]',
    isCity: true,
  },
  {
    id: 'movies',
    icon: '🎬',
    label: 'Movies',
    tier: 'Popular',
    size: 'lg',
    ring: 'inner',
    dir: -1,
    phase: 5.6,
    event: 'Indie Film & Rooftop Cinema',
    meta: 'Rooftop Cinema • Sun 9:00 PM',
    illustration: '/illustrations/Movie.webp',
    bg: 'bg-[#F2F7FE]',
  },

  // =========================================================
  // MID RING (10 Items: Growing Categories & Cities)
  // =========================================================
  {
    id: 'music',
    icon: '🎵',
    label: 'Live Music',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: 1,
    phase: 0.2,
    event: 'Acoustic Jam & Open Mic',
    meta: 'The Loft • Sun 7:00 PM',
    illustration: '/illustrations/Music.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'gym',
    icon: '💪',
    label: 'Gym',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 0.9,
    event: 'Morning Workout & Shake',
    meta: 'Fitness Lab • 8 Going',
    illustration: '/illustrations/Gym.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'city-hyderabad',
    icon: '🏰',
    label: 'Hyderabad',
    tier: 'City',
    size: 'sm',
    ring: 'mid',
    dir: 1,
    phase: 1.5,
    event: '26 Active Plans Today',
    meta: 'Jubilee Hills & HITECH Hub',
    illustration: '/illustrations/Co-work_Study.webp',
    bg: 'bg-[#F2F7FE]',
    isCity: true,
  },
  {
    id: 'yoga',
    icon: '🧘',
    label: 'Yoga',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 2.1,
    event: 'Park Yoga & Mindfulness',
    meta: 'Dolores Park • Sat 8:00 AM',
    illustration: '/illustrations/Yoga.webp',
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'walk',
    icon: '🚶',
    label: 'Walk',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: 1,
    phase: 2.8,
    event: 'Sunset City Stroll',
    meta: 'Embarcadero • Wed 6:00 PM',
    illustration: '/illustrations/walk.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'rides',
    icon: '🏍️',
    label: 'Rides',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 2.49,
    event: 'Scenic Trail Ride',
    meta: 'Skyline Boulevard • Sun 7:00 AM',
    illustration: '/illustrations/ride.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'city-chennai',
    icon: '🌊',
    label: 'Chennai',
    tier: 'City',
    size: 'sm',
    ring: 'mid',
    dir: 1,
    phase: 4.2,
    event: '37 Active Plans Today',
    meta: 'ECR & Nungambakkam Hub',
    illustration: '/illustrations/Party.webp',
    bg: 'bg-[#DCE7FF]',
    isCity: true,
  },
  {
    id: 'hangout',
    icon: '🌳',
    label: 'Hangout',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: -1,
    phase: 4.8,
    event: 'Rooftop Chill & Drinks',
    meta: 'Social Lounge • Fri 6:30 PM',
    illustration: '/illustrations/Hangout.webp',
    bg: 'bg-[#F2F7FE]',
  },
  {
    id: 'creative',
    icon: '🎨',
    label: 'Creative',
    tier: 'Growing',
    size: 'md',
    ring: 'mid',
    dir: 1,
    phase: 5.4,
    event: 'Pottery & Painting Session',
    meta: 'Art Studio • Sat 2:00 PM',
    illustration: '/illustrations/Creative.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'city-pune',
    icon: '⛰️',
    label: 'Pune',
    tier: 'City',
    size: 'sm',
    ring: 'mid',
    dir: -1,
    phase: 5.9,
    event: '29 Active Plans Today',
    meta: 'Koregaon Park Hub',
    illustration: '/illustrations/Other.webp',
    bg: 'bg-[#E8EEFF]',
    isCity: true,
  },

  // =========================================================
  // OUTER RING (11 Items: Niche Categories & Extra Cities)
  // =========================================================
  {
    id: 'study',
    icon: '📚',
    label: 'Study / Co-work',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 0.1,
    event: 'Quiet Focus & Coffee',
    meta: 'Central Library • Mon 10:00 AM',
    illustration: '/illustrations/Co-work_Study.webp',
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'pet',
    icon: '🐾',
    label: 'Pet Friendly',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 0.7,
    event: 'Dog Park Meetup & Walk',
    meta: 'Duboce Park • Sat 11:00 AM',
    illustration: '/illustrations/Pet_Friendly.webp',
    bg: 'bg-[#F2F7FE]',
  },
  {
    id: 'houseparty',
    icon: '🏡',
    label: 'House Party',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 1.3,
    event: 'Games & Snacks House Party',
    meta: 'Host Home • Sat 8:00 PM',
    illustration: '/illustrations/HouseParty.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'club',
    icon: '🪩',
    label: 'Club',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 1.9,
    event: 'Weekend Dance & DJ Night',
    meta: 'The Underground • Sat 10:00 PM',
    illustration: '/illustrations/Party.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'hiking',
    icon: '🥾',
    label: 'Hiking',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 2.5,
    event: 'Sunrise Ridge Trail Hike',
    meta: 'Mount Tamalpais • Sun 6:00 AM',
    illustration: '/illustrations/Hiking.webp',
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'shopping',
    icon: '🛍️',
    label: 'Shopping',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 3.1,
    event: 'Shopping Date & Flea Market',
    meta: 'Orion Mall • Sat 1:00 PM',
    illustration: '/illustrations/Shopping.webp',
    bg: 'bg-[#F2F7FE]',
  },
  {
    id: 'community',
    icon: '👥',
    label: 'Community',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 3.7,
    event: 'New-in-Town Mixer',
    meta: 'Town Square • Thu 6:00 PM',
    illustration: '/illustrations/Community.webp',
    bg: 'bg-[#CEF2F2]',
  },
  {
    id: 'other',
    icon: '✨',
    label: 'Other...',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 4.3,
    event: 'Spontaneous City Hangout',
    meta: 'Downtown • Fri 7:00 PM',
    illustration: '/illustrations/Other.webp',
    bg: 'bg-[#E8EEFF]',
  },
  {
    id: 'bar',
    icon: '🍸',
    label: 'Bar',
    tier: 'New',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 4.9,
    event: 'Craft Cocktail Social',
    meta: 'Speakeasy Lounge • Fri 9:00 PM',
    illustration: '/illustrations/Bar.webp',
    bg: 'bg-[#DCE7FF]',
  },
  {
    id: 'city-kolkata',
    icon: '🛺',
    label: 'Kolkata',
    tier: 'City',
    size: 'sm',
    ring: 'outer',
    dir: -1,
    phase: 5.5,
    event: '22 Active Plans Today',
    meta: 'Park Street Hub',
    illustration: '/illustrations/Section 2.webp',
    bg: 'bg-[#F2F7FE]',
    isCity: true,
  },
  {
    id: 'city-goa',
    icon: '🏖️',
    label: 'Goa',
    tier: 'City',
    size: 'sm',
    ring: 'outer',
    dir: 1,
    phase: 6.0,
    event: '18 Active Plans Today',
    meta: 'North Goa Beach Hub',
    illustration: '/illustrations/walk.webp',
    bg: 'bg-[#CEF2F2]',
    isCity: true,
  },
];

// Ring Radius Scale Configurations
const RING_DEFS = {
  inner: { rxFrac: 0.32, ryFrac: 0.24, speed: 0.07 },
  mid:   { rxFrac: 0.42, ryFrac: 0.34, speed: 0.10 },
  outer: { rxFrac: 0.49, ryFrac: 0.42, speed: 0.13 },
};

const CITIES = ['San Francisco', 'New York', 'Austin', 'London', 'Tokyo', 'Bengaluru', 'Miami'];

export function ExperiencesScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const clusterWrapRef = useRef<HTMLDivElement>(null);
  const centerBubbleRef = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef<boolean>(true);

  const [activeBubbleId, setActiveBubbleId] = useState<string | null>(null);
  const [isHoveringCluster, setIsHoveringCluster] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clusterNodes, setClusterNodes] = useState<OrbitNodeItem[]>(ALL_CLUSTER_NODES);
  const [selectedCity, setSelectedCity] = useState('San Francisco');

  // Viewport Observer
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

  const handleClusterMouseLeave = () => {
    setIsHoveringCluster(false);
    setActiveBubbleId(null);
  };

  // Publish New Plan Callback (Item 5)
  const handlePublishPlan = (newPlan: {
    activity: ActivityOption;
    title: string;
    location: string;
    spots: number;
  }) => {
    const customNode: OrbitNodeItem = {
      id: `custom-${Date.now()}`,
      icon: newPlan.activity.emoji,
      label: newPlan.activity.label,
      tier: 'Popular',
      size: 'lg',
      ring: 'inner',
      dir: 1,
      phase: Math.random() * 6,
      event: newPlan.title,
      meta: `${newPlan.location} • ${newPlan.spots} spots`,
      illustration: newPlan.activity.illustration,
      bg: 'bg-[#CEF2F2]',
    };

    setClusterNodes((prev) => [prev[0], customNode, ...prev.slice(1)]);
    setActiveBubbleId(customNode.id);
  };

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      // 1. Header Line-by-Line ScrollTrigger Reveal Animation
      const headerElements = container.querySelectorAll('.exp-reveal');
      if (headerElements.length > 0) {
        gsap.set(headerElements, { opacity: 0, y: 35 });

        gsap.to(headerElements, {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 2. Orbital Cluster Scale & Float-In Reveal Animation
      if (clusterWrapRef.current) {
        gsap.set(clusterWrapRef.current, { opacity: 0, scale: 0.88, y: 40 });

        gsap.to(clusterWrapRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: clusterWrapRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

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
        bubbles.forEach((b, i) => {
          const item = clusterNodes[i];
          if (item?.create) {
            b.style.left = '50%';
            b.style.top = '50%';
            b.style.transform = 'translate(-50%, -50%)';
          } else {
            const size = b.offsetWidth || 120;
            b.style.left = `${cx - size / 2}px`;
            b.style.top = `${cy - size / 2}px`;
          }
        });
      };

      updateDimensions();

      const handleResize = () => {
        updateDimensions();
        orbitStates.forEach((state, i) => {
          if (!state) return;
          const ring = RING_DEFS[clusterNodes[i]?.ring as keyof typeof RING_DEFS] || RING_DEFS.mid;
          state.rx = rect.width * ring.rxFrac;
          state.ry = rect.height * ring.ryFrac;
        });
      };

      window.addEventListener('resize', handleResize, { passive: true });

      // Central anchor gentle breathing pulse
      if (centerBubbleRef.current) {
        gsap.to(centerBubbleRef.current, {
          scale: 1.05,
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
        gsap.to(centerBubbleRef.current, {
          boxShadow: '0 0 0 24px rgba(53,101,242,0), 0 20px 50px -18px rgba(53,101,242,0.55)',
          duration: 2.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Orbital ticker physics engine
      const orbitStates = clusterNodes.map((item) => {
        if (item.create) return null;
        const ring = RING_DEFS[item.ring as keyof typeof RING_DEFS] || RING_DEFS.mid;
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
        if (!isIntersectingRef.current) return;

        const dt = Math.min(deltaMs / 1000, 0.1);

        bubbles.forEach((b, i) => {
          const item = clusterNodes[i];
          const state = orbitStates[i];
          if (!state || state.paused || item?.create) return;

          state.angle += state.speed * state.dir * dt;
          const x = Math.cos(state.angle) * state.rx;
          const y = Math.sin(state.angle) * state.ry;

          gsap.set(b, { x, y, force3D: true });
        });
      };

      gsap.ticker.add(updateTicker);

      return () => {
        gsap.ticker.remove(updateTicker);
        window.removeEventListener('resize', handleResize);
      };
    },
    { scope: containerRef, dependencies: [clusterNodes] }
  );

  return (
    <section id="experiences" ref={containerRef} className="relative pt-16 pb-28 bg-[#FAFCFF] overflow-hidden">
      {/* Host Plan Modal */}
      <HostPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPublish={handlePublishPlan}
      />

      {/* FULL EDGE-TO-EDGE COLORFUL CITY ILLUSTRATION BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src="/illustrations/ColorfulCityBG.webp"
          alt="Colorful City Background"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center opacity-100"
        />
        {/* Soft Vignettes at Section Edges for Header Text Legibility */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#FAFCFF] via-[#FAFCFF]/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAFCFF] to-transparent" />
      </div>

      {/* Background Ambient Auroras */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[950px] h-[680px] rounded-full bg-radial from-[#CEF2F2]/30 via-[#3565F2]/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <Container>
        {/* ========================================================= */}
        {/* EDITORIAL SECTION HEADER                                  */}
        {/* ========================================================= */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <div className="exp-reveal mb-4">
            <Badge variant="primary">
              EXPLORE EXPERIENCES
            </Badge>
          </div>
          <h2 className="exp-reveal text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12] font-display mb-4">
            Find your kind of plan. <br />
            <span className="text-[#3565F2]">Or create one.</span>
          </h2>
          <p className="exp-reveal text-base sm:text-lg font-medium text-[#475569] leading-relaxed max-w-2xl mx-auto mb-6">
            Every community has its own rhythm — its own regulars, its own reasons to show up. Hover to peek in, or host your own Open Plan.
          </p>

          {/* INTERACTIVE MOCK-UP DISCLAIMER NOTE */}
          <div className="exp-reveal inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-[#64748B]">
            <span className="w-2 h-2 rounded-full bg-[#3565F2] animate-pulse" />
            <span>Interactive mock-up — real-time data will be wired once the app is live!</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ITEM 4: ORBITAL CLUSTER CONTAINER WITH PARALLAX & DENSITY */}
        {/* ========================================================= */}
        <div
          ref={clusterWrapRef}
          onMouseEnter={() => setIsHoveringCluster(true)}
          onMouseLeave={handleClusterMouseLeave}
          className={`relative w-full max-w-[1380px] min-h-[640px] sm:h-[750px] mx-auto mb-8 flex flex-wrap sm:block justify-center items-center gap-3 sm:gap-0 select-none ${
            isHoveringCluster ? 'cluster-hovering' : ''
          }`}
        >

          {clusterNodes.map((item) => {
            const isActive = activeBubbleId === item.id;
            const isDimmed = isHoveringCluster && activeBubbleId !== null && !isActive;

            // Size styling mapping
            const sizeClass =
              item.size === 'lg'
                ? 'w-[145px] h-[145px] sm:w-[175px] sm:h-[175px]'
                : item.size === 'md'
                ? 'w-[115px] h-[115px] sm:w-[135px] sm:h-[135px]'
                : 'w-[90px] h-[90px] sm:w-[100px] sm:h-[100px]';

            return (
              <div
                key={item.id}
                ref={item.create ? centerBubbleRef : null}
                style={item.create ? { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' } : undefined}
                onClick={() => {
                  if (item.create) setIsModalOpen(true);
                }}
                onMouseEnter={() => setActiveBubbleId(item.id)}
                onMouseLeave={() => setActiveBubbleId(null)}
                className={`orbit-bubble sm:absolute rounded-full cursor-pointer flex items-center justify-center text-center shadow-lg transition-all duration-300 transform will-change-transform translate-z-0 backface-hidden overflow-hidden ${sizeClass} ${
                  item.create
                    ? 'bg-[#3565F2] text-white border-2 border-dashed border-white/60 shadow-[0_20px_50px_-18px_rgba(53,101,242,0.55)] z-20'
                    : 'border-2 border-white shadow-md hover:shadow-2xl'
                } ${
                  isActive
                    ? 'scale-110 z-30 ring-4 ring-[#3565F2]/40 opacity-100'
                    : isDimmed
                    ? 'opacity-35 scale-95 z-10'
                    : 'opacity-100 z-10'
                }`}
              >
                {/* DEFAULT FACE CONTENT WITH ILLUSTRATION BACKGROUND */}
                {!item.create && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={item.illustration}
                      alt={item.label}
                      fill
                      sizes="(max-width: 768px) 120px, 185px"
                      priority
                      className="object-cover object-center scale-105 transition-transform duration-700 hover:scale-115"
                    />
                    {/* Gradient Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-slate-900/20" />
                  </div>
                )}

                {/* DEFAULT FACE TEXT & ICON OVERLAY */}
                <div className={`relative z-10 p-3 flex flex-col items-center justify-center transition-all duration-300 ${isActive ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}>
                  {item.create ? (
                    <>
                      <Plus className="w-8 h-8 text-white mb-1" />
                      <span className="text-xs sm:text-sm font-extrabold text-white leading-tight">{item.label}</span>
                    </>
                  ) : (
                    <>
                      <span className={`${item.size === 'sm' ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} mb-1 filter drop-shadow-md`}>
                        {item.icon}
                      </span>
                      <span
                        className={`font-extrabold tracking-tight text-white drop-shadow-md ${
                          item.size === 'sm' ? 'text-[10.5px]' : 'text-xs sm:text-sm'
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.isCity ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#CEF2F2] mt-0.5 px-2 py-0.5 rounded-full bg-[#3565F2]/80 backdrop-blur-xs">
                          City Hub
                        </span>
                      ) : (
                        item.tier && item.size !== 'sm' && (
                          <span className="text-[10px] font-bold text-sky-200 mt-0.5 drop-shadow-xs">
                            {item.tier}
                          </span>
                        )
                      )}
                    </>
                  )}
                </div>

                {/* ACTIVE OVERLAY PEEK CARD (HOVER DETAILS) */}
                <div
                  className={`absolute inset-0 z-20 rounded-full bg-white/95 backdrop-blur-md p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-xl overflow-hidden ${
                    isActive ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
                  }`}
                >
                  {item.create ? (
                    <>
                      <span className="text-xs font-extrabold text-[#3565F2] mb-1">Click to Host!</span>
                      <span className="text-xs font-bold text-[#0F172A]">{item.event}</span>
                      <span className="text-[10px] font-medium text-[#64748B] mt-1">{item.meta}</span>
                    </>
                  ) : (
                    <>
                      {/* Background Illustration Tint on Hover Card */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none">
                        <Image
                          src={item.illustration}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 120px, 185px"
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm">{item.icon}</span>
                          <span className="text-xs font-extrabold text-[#0F172A]">{item.label}</span>
                        </div>
                        
                        {/* Attendee Avatars */}
                        <div className="flex -space-x-1.5 mb-1.5">
                          <div className="w-4 h-4 rounded-full bg-[#3565F2] border border-white" />
                          <div className="w-4 h-4 rounded-full bg-[#3D79F2] border border-white" />
                          <div className="w-4 h-4 rounded-full bg-[#6BB3F2] border border-white" />
                        </div>

                        <span className="text-[11px] font-bold text-[#0F172A] line-clamp-1">{item.event}</span>
                        <span className="text-[9.5px] font-semibold text-[#64748B] line-clamp-1 mt-0.5">{item.meta}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
