'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';
import {
  CalendarClock,
  Circle,
  MessageCircle,
  Star,
  Ticket,
  BarChart3,
  Lightbulb,
  Users,
  Briefcase,
  ChevronDown,
  Flag,
  DoorOpen,
  Compass,
  History,
  Heart,
  BadgeCheck,
  Image as LucideImage,
  MessagesSquare,
  Sparkles,
  Handshake,
  CalendarPlus,
  SlidersHorizontal,
  ScanLine,
  Eye,
  Trophy,
  ClipboardList,
  HelpCircle,
  Bell,
  Mic,
  Megaphone,
  LayoutDashboard,
} from 'lucide-react';
import { CollapsibleContent } from '@/components/ui/accordion';
import SnooSpaceMasterLogo from '@/assets/logos/SnooSpace_Master_Logo_Light.svg';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Phone Recordings Video & Screenshots (Public Static Paths)
const landingScreen2Path = '/phone-recordings/Landing_Screen 2.png';
const landingScreen1Path = '/phone-recordings/Landing_Screen 1.png';

// Active Video Recording Source
const videoSrc: string | null = '/phone-recordings/Welcome.mp4?v=2';

// ─────────────────────────────────────────────────────────────
// FEATURE PILLARS DATA & TYPES (Ported from FeaturePillars.jsx)
// ─────────────────────────────────────────────────────────────

export interface PillarSubItem {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  label: string;
  detail: string;
}

export type PillarAccent = 'blue' | 'teal' | 'purple' | 'coral' | 'pink';

export interface PillarData {
  key: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: string;
  accent: PillarAccent;
  items: PillarSubItem[];
}

const PEOPLE_PILLARS: PillarData[] = [
  {
    key: 'plans-events',
    icon: CalendarClock,
    title: 'Plans and events',
    accent: 'blue',
    items: [
      { icon: Flag, label: 'Host plans', detail: 'Start your own gathering in minutes' },
      { icon: DoorOpen, label: 'Join plans', detail: 'Request to join open plans nearby' },
      { icon: Compass, label: 'Discover events', detail: "Browse what's happening around you" },
      { icon: History, label: 'Replay missed', detail: 'Catch highlights from events you missed' },
    ],
  },
  {
    key: 'real-connections',
    icon: Heart,
    title: 'Real connections',
    accent: 'teal',
    items: [
      {
        icon: Circle,
        label: 'Circles',
        detail: 'Mutual connections with people you actually know, not one-way follows',
      },
      {
        icon: BadgeCheck,
        label: 'Verified only',
        detail: 'Everyone you connect with has passed face verification',
      },
    ],
  },
  {
    key: 'express-yourself',
    icon: MessageCircle,
    title: 'Express yourself',
    accent: 'purple',
    items: [
      { icon: LucideImage, label: 'Posts', detail: 'Share moments with your circles' },
      { icon: MessagesSquare, label: 'Chat', detail: 'Message people and groups directly' },
    ],
  },
  {
    key: 'creator-path',
    icon: Star,
    title: 'Creator path',
    accent: 'coral',
    items: [
      { icon: Sparkles, label: 'Become a creator', detail: 'Build a following inside SnooSpace' },
      { icon: Handshake, label: 'Get sponsors', detail: 'Turn your reach into paid partnerships' },
    ],
  },
];

const COMMUNITY_PILLARS: PillarData[] = [
  {
    key: 'event-engine',
    icon: Ticket,
    title: 'Event engine',
    accent: 'blue',
    items: [
      { icon: CalendarPlus, label: 'Host events', detail: 'Publish and manage your event' },
      {
        icon: SlidersHorizontal,
        label: 'Deep customization',
        detail: 'Shape ticket tiers, branding, and details',
      },
      { icon: ScanLine, label: 'Scan tickets', detail: 'Check attendees in at the door' },
    ],
  },
  {
    key: 'audience-intel',
    icon: BarChart3,
    title: 'Audience intel',
    accent: 'teal',
    items: [
      { icon: Eye, label: 'Audience quality', detail: "See who's engaging, not just showing up" },
      { icon: Handshake, label: 'Sponsor matching', detail: 'Package your audience data for sponsors' },
    ],
  },
  {
    key: 'keep-it-alive',
    icon: Lightbulb,
    title: 'Keep it alive',
    accent: 'purple',
    items: [
      { icon: Trophy, label: 'Challenges', detail: 'Prompt members into playful participation' },
      { icon: ClipboardList, label: 'Polls', detail: 'Get quick reads on what members want' },
      { icon: HelpCircle, label: 'Q&A', detail: 'Let members ask, you answer' },
      { icon: Bell, label: 'Nudges', detail: 'Gentle prompts to stay active between events' },
    ],
  },
  {
    key: 'community-hub',
    icon: Users,
    title: 'Community hub',
    accent: 'coral',
    items: [
      { icon: MessagesSquare, label: 'Group chat', detail: 'Share logistics and updates in one place' },
      { icon: Mic, label: 'Voice box', detail: 'Members start conversations, others join in' },
    ],
  },
  {
    key: 'grow-and-manage',
    icon: Briefcase,
    title: 'Grow and manage',
    accent: 'pink',
    items: [
      { icon: Megaphone, label: 'Opportunities', detail: 'Post gigs like hiring a video editor' },
      { icon: LayoutDashboard, label: 'Dashboard', detail: 'Track revenue, attendance, and growth in one view' },
    ],
  },
];

export const ACCENT_CONFIG: Record<
  PillarAccent,
  {
    stroke: string;
    glow: string;
    dot: string;
    iconClass: string;
    icon: string;
    chipBg: string;
    chipIcon: string;
    panelBg: string;
  }
> = {
  blue: {
    stroke: '#3565F2',
    glow: 'rgba(53, 101, 242, 0.8)',
    dot: '#3565F2',
    iconClass: 'text-blue-600',
    icon: 'text-blue-600',
    chipBg: 'bg-blue-100',
    chipIcon: 'text-blue-600',
    panelBg: 'bg-blue-50/60',
  },
  teal: {
    stroke: '#0D9488',
    glow: 'rgba(13, 148, 136, 0.8)',
    dot: '#0D9488',
    iconClass: 'text-teal-600',
    icon: 'text-teal-600',
    chipBg: 'bg-teal-100',
    chipIcon: 'text-teal-600',
    panelBg: 'bg-teal-50/60',
  },
  purple: {
    stroke: '#9333EA',
    glow: 'rgba(147, 51, 234, 0.8)',
    dot: '#9333EA',
    iconClass: 'text-purple-600',
    icon: 'text-purple-600',
    chipBg: 'bg-purple-100',
    chipIcon: 'text-purple-600',
    panelBg: 'bg-purple-50/60',
  },
  coral: {
    stroke: '#EA580C',
    glow: 'rgba(234, 88, 12, 0.8)',
    dot: '#EA580C',
    iconClass: 'text-orange-600',
    icon: 'text-orange-600',
    chipBg: 'bg-orange-100',
    chipIcon: 'text-orange-600',
    panelBg: 'bg-orange-50/60',
  },
  pink: {
    stroke: '#DB2777',
    glow: 'rgba(219, 39, 119, 0.8)',
    dot: '#DB2777',
    iconClass: 'text-pink-600',
    icon: 'text-pink-600',
    chipBg: 'bg-pink-100',
    chipIcon: 'text-pink-600',
    panelBg: 'bg-pink-50/60',
  },
};

interface PillarProps {
  pillar: PillarData;
  isOpen: boolean;
  onToggle: () => void;
  isHovered?: boolean;
  onHover?: (hovered: boolean) => void;
}

function Pillar({ pillar, isOpen, onToggle, isHovered = false, onHover }: PillarProps) {
  const Icon = pillar.icon;
  const config = ACCENT_CONFIG[pillar.accent];
  const iconClass = config?.iconClass ?? 'text-slate-600';

  return (
    <div
      data-pillar-key={pillar.key}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className={`rounded-xl border bg-white/95 backdrop-blur-xs overflow-hidden transition-all duration-200 ${
        isOpen
          ? 'border-[#3565F2]/50 shadow-md ring-1 ring-[#3565F2]/20'
          : isHovered
          ? 'border-[#3565F2]/40 shadow-xs ring-1 ring-[#3565F2]/10'
          : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left cursor-pointer select-none"
      >
        <Icon className={`h-4 w-4 shrink-0 ${iconClass}`} aria-hidden="true" />
        <span className="flex-1 text-sm font-medium text-slate-900">{pillar.title}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-600' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <CollapsibleContent isOpen={isOpen}>
        <div className={`px-2.5 pb-2.5 pt-1 ${config.panelBg}`}>
          {pillar.items.map((item) => {
            const ItemIcon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-start gap-2.5 px-1.5 py-2 rounded-lg"
              >
                <span
                  className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${config.chipBg}`}
                >
                  <ItemIcon className={`h-3 w-3 ${config.chipIcon}`} aria-hidden="true" />
                </span>
                <div className="flex flex-col">
                  <span className="text-[13px] font-medium text-slate-800">{item.label}</span>
                  <span className="text-[11.5px] text-slate-600">{item.detail}</span>
                </div>
              </div>
            );
          })}
        </div>
      </CollapsibleContent>
    </div>
  );
}

interface PillarColumnProps {
  label: string;
  pillars: PillarData[];
  openKey: string | null;
  onToggle: (key: string) => void;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
  className?: string;
}

function PillarColumn({
  label,
  pillars,
  openKey,
  onToggle,
  hoveredKey = null,
  onHover,
  className = '',
}: PillarColumnProps) {
  return (
    <div className={`flex flex-col gap-3.5 sm:gap-4 lg:gap-5 w-full ${className}`}>
      <span className="pl-1 text-xs font-semibold uppercase tracking-wider text-slate-500 font-display">
        {label}
      </span>
      {pillars.map((pillar) => (
        <Pillar
          key={pillar.key}
          pillar={pillar}
          isOpen={openKey === pillar.key}
          onToggle={() => onToggle(pillar.key)}
          isHovered={hoveredKey === pillar.key}
          onHover={(isHov) => onHover?.(isHov ? pillar.key : null)}
        />
      ))}
    </div>
  );
}

export function PeopleFeaturePillars(props: {
  openKey?: string | null;
  onToggle?: (key: string) => void;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
  className?: string;
}) {
  const [internalOpenKey, setInternalOpenKey] = useState<string | null>(null);
  const openKey = props.openKey !== undefined ? props.openKey : internalOpenKey;
  const onToggle =
    props.onToggle ?? ((k: string) => setInternalOpenKey((prev) => (prev === k ? null : k)));

  return (
    <PillarColumn
      label="For people"
      pillars={PEOPLE_PILLARS}
      openKey={openKey}
      onToggle={onToggle}
      hoveredKey={props.hoveredKey ?? null}
      onHover={props.onHover}
      className={props.className}
    />
  );
}

export function CommunityFeaturePillars(props: {
  openKey?: string | null;
  onToggle?: (key: string) => void;
  hoveredKey?: string | null;
  onHover?: (key: string | null) => void;
  className?: string;
}) {
  const [internalOpenKey, setInternalOpenKey] = useState<string | null>(null);
  const openKey = props.openKey !== undefined ? props.openKey : internalOpenKey;
  const onToggle =
    props.onToggle ?? ((k: string) => setInternalOpenKey((prev) => (prev === k ? null : k)));

  return (
    <PillarColumn
      label="For communities"
      pillars={COMMUNITY_PILLARS}
      openKey={openKey}
      onToggle={onToggle}
      hoveredKey={props.hoveredKey ?? null}
      onHover={props.onHover}
      className={props.className}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// [DEAD CODE - Flagged for audit reference; not rendered]
// Previously used for the 9 absolutely positioned floating feature bubbles
// and category-svg-icons.tsx. Preserved here as flagged dead code.
// ─────────────────────────────────────────────────────────────
export const INTERACTIVE_NODES_DEAD_CODE = [
  { id: 'cowork', title: 'Co-Work & Study' },
  { id: 'gym', title: 'Gym & Fitness' },
  { id: 'ride', title: 'Ride & Cycling' },
  { id: 'yoga', title: 'Yoga & Flow' },
  { id: 'gaming', title: 'Gaming' },
  { id: 'cafe', title: 'Cafe & Coffee' },
  { id: 'bar', title: 'Bar & Drinks' },
  { id: 'shopping', title: 'Shopping' },
  { id: 'hangout', title: 'Hangout' },
];

export interface RayPath {
  key: string;
  d: string;
  side: 'left' | 'right';
  accent: PillarAccent;
  phonePoint: { x: number; y: number };
  targetPoint: { x: number; y: number };
}

export function HeroScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerpieceRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneAnchorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardSliderRef = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Accordion open states (both null -> NO card open by default)
  const [leftOpenKey, setLeftOpenKey] = useState<string | null>(null);
  const [rightOpenKey, setRightOpenKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // Dynamic connection ray paths
  const [rays, setRays] = useState<RayPath[]>([]);

  // Calculate pixel-accurate bezier rays connecting phone to each pillar
  const updateRayPaths = useCallback(() => {
    if (typeof window === 'undefined') return;
    const container = centerpieceRef.current;
    const phoneAnchor = phoneAnchorRef.current;
    if (!container || !phoneAnchor) return;

    const containerRect = container.getBoundingClientRect();
    const phoneAnchorRect = phoneAnchor.getBoundingClientRect();

    if (containerRect.width === 0 || phoneAnchorRect.width === 0) return;

    // Detect exact hardware bezel frame of SnooSpaceDevice
    const phoneEl = phoneRef.current;
    const deviceFrame = phoneEl?.querySelector(
      '.rounded-\\[46px\\], .rounded-\\[50px\\], [class*="aspect-"]'
    ) as HTMLElement | null;

    // Use unscaled layout dimensions (offsetWidth/offsetHeight are immune to CSS scale transforms)
    const phoneWidth = deviceFrame?.offsetWidth || 295;
    const phoneHeight = deviceFrame?.offsetHeight || 590;

    // Calculate unscaled resting phone bounds inside phoneAnchor container
    const phoneCenterX = phoneAnchorRect.left - containerRect.left + phoneAnchorRect.width / 2;
    const phoneLeftX = phoneCenterX - phoneWidth / 2;
    const phoneRightX = phoneCenterX + phoneWidth / 2;
    const phoneTopY =
      phoneAnchorRect.top - containerRect.top + (phoneAnchorRect.height - phoneHeight) / 2;

    const newRays: RayPath[] = [];

    // 1. Left Pillars (People) — connection rays fan out from phone's center hub
    // Symmetrical matching origins for cards 1 to 4
    const leftSpread = [0.42, 0.46, 0.50, 0.54];
    PEOPLE_PILLARS.forEach((pillar, i) => {
      const el = container.querySelector(`[data-pillar-key="${pillar.key}"]`);
      if (!el) return;
      const pRect = el.getBoundingClientRect();
      const btn = el.querySelector('button') || el;
      const bRect = btn.getBoundingClientRect();

      const targetX = pRect.right - containerRect.left;
      const targetY = bRect.top + bRect.height / 2 - containerRect.top;
      const px = phoneLeftX;
      const py = phoneTopY + phoneHeight * (leftSpread[i] ?? 0.5);

      const dx = Math.max(px - targetX, 20);
      const dy = targetY - py;
      const cp1x = px - dx * 0.45;
      const cp1y = py + dy * 0.16;
      const cp2x = targetX + dx * 0.38;
      const cp2y = targetY;
      const d = `M ${px} ${py} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

      newRays.push({
        key: pillar.key,
        d,
        side: 'left',
        accent: pillar.accent,
        phonePoint: { x: px, y: py },
        targetPoint: { x: targetX, y: targetY },
      });
    });

    // 2. Right Pillars (Communities) — connection rays fan out from phone's center hub
    const rightSpread = [0.42, 0.46, 0.50, 0.54, 0.58];
    COMMUNITY_PILLARS.forEach((pillar, i) => {
      const el = container.querySelector(`[data-pillar-key="${pillar.key}"]`);
      if (!el) return;
      const pRect = el.getBoundingClientRect();
      const btn = el.querySelector('button') || el;
      const bRect = btn.getBoundingClientRect();

      const targetX = pRect.left - containerRect.left;
      const targetY = bRect.top + bRect.height / 2 - containerRect.top;
      const px = phoneRightX;
      const py = phoneTopY + phoneHeight * (rightSpread[i] ?? 0.5);

      const dx = Math.max(targetX - px, 20);
      const dy = targetY - py;
      const cp1x = px + dx * 0.45;
      const cp1y = py + dy * 0.16;
      const cp2x = targetX - dx * 0.38;
      const cp2y = targetY;
      const d = `M ${px} ${py} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

      newRays.push({
        key: pillar.key,
        d,
        side: 'right',
        accent: pillar.accent,
        phonePoint: { x: px, y: py },
        targetPoint: { x: targetX, y: targetY },
      });
    });

    setRays(newRays);
  }, []);

  // Update rays on mount, window resize, scroll, and layout settlement
  useEffect(() => {
    updateRayPaths();

    const t1 = setTimeout(updateRayPaths, 80);
    const t2 = setTimeout(updateRayPaths, 300);
    const t3 = setTimeout(updateRayPaths, 700);

    window.addEventListener('resize', updateRayPaths);
    window.addEventListener('scroll', updateRayPaths, { passive: true });
    ScrollTrigger.addEventListener('refresh', updateRayPaths);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('resize', updateRayPaths);
      window.removeEventListener('scroll', updateRayPaths);
      ScrollTrigger.removeEventListener('refresh', updateRayPaths);
    };
  }, [updateRayPaths]);

  // Smoothly track ray curvature in real-time during accordion transitions
  useEffect(() => {
    let animId: number;
    const start = performance.now();
    const duration = 320;

    const step = (now: number) => {
      updateRayPaths();
      if (now - start < duration) {
        animId = requestAnimationFrame(step);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [leftOpenKey, rightOpenKey, updateRayPaths]);

  // Viewport Intersection Observer for Video Playback Optimization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Normal 1.0x native playback speed for smooth, real-time 60fps recording
    video.playbackRate = 1.0;

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

  useGSAP(
    () => {
      // 1. Initial State for Narrative Copy Entrance
      gsap.set('.hero-badge', { opacity: 0, y: 15 });
      gsap.set('.hero-headline', { opacity: 0, y: 25 });
      gsap.set('.hero-subtext', { opacity: 0, y: 20 });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-headline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('.hero-subtext', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4');

      // 2. ScrollTrigger Driven Reveal for Centerpiece Scene
      gsap.set(phoneRef.current, { opacity: 0, scale: 0.85, y: 70 });
      gsap.set('.hero-ambient-glow', { opacity: 0 });
      gsap.set('.conn-ray-svg', { opacity: 0 });
      gsap.set('.pillar-column', { opacity: 0, y: 30 });

      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: centerpieceRef.current,
          start: 'top 82%',
          end: 'bottom 40%',
          toggleActions: 'play none none reverse',
        },
        onUpdate: () => updateRayPaths(),
        onComplete: () => updateRayPaths(),
        onReverseComplete: () => updateRayPaths(),
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
        .to(
          '.hero-ambient-glow',
          {
            opacity: 0.9,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.6'
        )
        // Connection rays emerge as phone lands in position
        .to(
          '.conn-ray-svg',
          {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          },
          '-=0.5'
        )
        // Pillar columns reveal on left and right
        .to(
          '.pillar-column',
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.5'
        );

      // 3. Magnetic Primary & Secondary CTA Buttons
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

      // 4. Inner Card Swipe Sequence (Only feed card swipes, header & tab bar stay fixed)
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

  const anyActive = Boolean(hoveredKey || leftOpenKey || rightOpenKey);

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
          {/* Master Logo Eyebrow */}
          <div className="hero-badge mb-6 sm:mb-8 flex items-center justify-center">
            <Image
              src={SnooSpaceMasterLogo}
              alt="SnooSpace"
              priority
              className="h-8 sm:h-9 md:h-10 w-auto"
            />
          </div>

          {/* Hero Headline */}
          <h1 className="hero-headline text-[clamp(2.75rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#0F172A] leading-[1.08] mb-6 font-display">
            Life happens <br />
            <span className="italic text-[#3565F2]">outside the screen.</span>
          </h1>

          {/* Supporting Copy */}
          <p className="hero-subtext max-w-2xl text-base sm:text-lg font-medium text-[#475569] leading-relaxed">
            Discover people and plans worth showing up for — real interests, real plans, without the endless scroll.
          </p>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. CHAPTER TWO: EMOTIONAL CENTERPIECE SCENE (3-Column)   */}
      {/* ========================================================= */}
      <div
        ref={centerpieceRef}
        className="relative w-full min-h-[68vh] sm:min-h-[75vh] flex items-center justify-center select-none px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Soft Ambient Radial Lighting Background (Kept as requested) */}
        <div className="hero-ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-radial from-[#CEF2F2]/75 via-[#3565F2]/12 to-transparent blur-3xl pointer-events-none -z-10 opacity-80" />

        {/* Dynamic SVG Connection Rays (Desktop/Laptop lg+ only) */}
        <svg
          className="conn-ray-svg absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0"
          style={{ overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="ray-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {rays.map((ray) => {
            const isHovered = hoveredKey === ray.key;
            const isOpen = (ray.side === 'left' ? leftOpenKey : rightOpenKey) === ray.key;
            const isActive = isHovered || isOpen;
            const config = ACCENT_CONFIG[ray.accent];

            return (
              <g key={ray.key} className="transition-opacity duration-300">
                {/* Invisible Wide Hit Target for Line Hover */}
                <path
                  d={ray.d}
                  stroke="transparent"
                  strokeWidth="20"
                  fill="none"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredKey(ray.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                />

                {/* Base Continuous Living Stream Line Path */}
                <path
                  className={`conn-path transition-all duration-300 ${
                    isActive ? '' : 'animate-gentle-flow'
                  }`}
                  d={ray.d}
                  stroke={isActive ? config.stroke : '#3565F2'}
                  strokeWidth={isActive ? '2.5' : '1.5'}
                  strokeDasharray={isActive ? '10 6' : '6 6'}
                  fill="none"
                  opacity={isActive ? 0.95 : anyActive ? 0.12 : 0.32}
                  filter={isActive ? `drop-shadow(0 0 6px ${config.glow})` : 'none'}
                />

                {/* Energy Flow Pulse traveling along line when active */}
                {isActive && (
                  <path
                    className="animate-line-flow pointer-events-none transition-all duration-300"
                    d={ray.d}
                    stroke={config.stroke}
                    strokeWidth="3.5"
                    fill="none"
                    strokeDasharray="12 8"
                    opacity="0.95"
                    filter={`drop-shadow(0 0 8px ${config.glow})`}
                  />
                )}

                {/* Phone Anchor Terminal Dot */}
                <circle
                  cx={ray.phonePoint.x}
                  cy={ray.phonePoint.y}
                  r={isActive ? 3.5 : 2.5}
                  fill={isActive ? config.dot : '#3565F2'}
                  opacity={isActive ? 1 : anyActive ? 0.2 : 0.6}
                  className="transition-all duration-300"
                />

                {/* Pillar Card Anchor Terminal Dot */}
                <circle
                  cx={ray.targetPoint.x}
                  cy={ray.targetPoint.y}
                  r={isActive ? 4 : 3}
                  fill={isActive ? config.dot : '#3565F2'}
                  opacity={isActive ? 1 : anyActive ? 0.2 : 0.7}
                  className="transition-all duration-300"
                />

                {/* Active Outer Ring on Card Terminal */}
                {isActive && (
                  <circle
                    cx={ray.targetPoint.x}
                    cy={ray.targetPoint.y}
                    r="7"
                    fill="none"
                    stroke={config.dot}
                    strokeWidth="1.5"
                    opacity="0.5"
                    className="transition-all duration-300"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 3-Column Layout: Left (People) | Center (Phone) | Right (Communities) */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-14 xl:gap-20 2xl:gap-24 items-center">
          {/* Left Column: People Pillars */}
          <div className="pillar-column flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-sm lg:-translate-y-[33px]">
              <PeopleFeaturePillars
                openKey={leftOpenKey}
                onToggle={(k) => setLeftOpenKey((prev) => (prev === k ? null : k))}
                hoveredKey={hoveredKey}
                onHover={setHoveredKey}
              />
            </div>
          </div>

          {/* Center Column: Phone Mockup (Untouched) */}
          <div ref={phoneAnchorRef} className="flex justify-center items-center">
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
                        sizes="(max-width: 768px) 260px, 300px"
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
                            sizes="(max-width: 768px) 260px, 300px"
                            priority
                            className="object-cover object-top"
                          />
                        </div>

                        {/* Card 2: Community Card (from Landing_Screen 1) */}
                        <div className="w-1/2 h-full relative shrink-0 overflow-hidden">
                          <Image
                            src={landingScreen1Path}
                            alt="Community Feed Card"
                            fill
                            sizes="(max-width: 768px) 260px, 300px"
                            priority
                            className="object-cover object-top"
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
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            currentSlideIndex === 0 ? 'bg-[#3565F2] w-4' : 'bg-slate-300 w-2'
                          }`}
                        />
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            currentSlideIndex === 1 ? 'bg-[#3565F2] w-4' : 'bg-slate-300 w-2'
                          }`}
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </SnooSpaceDevice>
          </div>

          {/* Right Column: Community Pillars */}
          <div className="pillar-column flex justify-center lg:justify-start w-full">
            <div className="w-full max-w-sm">
              <CommunityFeaturePillars
                openKey={rightOpenKey}
                onToggle={(k) => setRightOpenKey((prev) => (prev === k ? null : k))}
                hoveredKey={hoveredKey}
                onHover={setHoveredKey}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
