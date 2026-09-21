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
  Flag,
  DoorOpen,
  Compass,
  Users,
  Radar,
  Heart,
  BadgeCheck,
  MessageCircle,
  Image as LucideImage,
  MessagesSquare,
  Star,
  Sparkles,
  Handshake,
  Megaphone,
  Eye,
  ClipboardList,
  HelpCircle,
  Trophy,
  Bell,
  Mic,
  ChevronDown,
  Ticket,
  CalendarPlus,
  Percent,
  ScanLine,
  BarChart3,
  Link2,
  Send,
  Inbox,
  Briefcase,
  UserCog,
  LayoutDashboard,
  Target,
  MapPin,
  CalendarCheck,
  Camera,
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
  sectionLabel?: string;
}

export type PillarAccent = 'blue' | 'teal' | 'purple' | 'coral' | 'pink' | 'indigo';

export interface PillarData {
  key: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;
  title: string;
  accent: PillarAccent;
  items: PillarSubItem[];
}

export const PEOPLE_PILLARS: PillarData[] = [
  {
    key: 'plans-events',
    icon: CalendarClock,
    title: 'Plans and events',
    accent: 'blue',
    items: [
      { icon: Flag, label: 'Host plans', detail: 'Start your own informal plan in minutes' },
      { icon: DoorOpen, label: 'Join plans', detail: 'Request to join open plans nearby' },
      { icon: Compass, label: 'Discover & attend events', detail: 'Browse official events and grab a ticket' },
    ],
  },
  {
    key: 'meet-people',
    icon: Users,
    title: 'Meet people',
    accent: 'teal',
    items: [
      { icon: Radar, label: 'Meet people', detail: 'Matched by intent, interests, and taste — with icebreakers built in' },
      { icon: Heart, label: 'Circles', detail: 'Mutual connections with people you actually know, not one-way follows' },
      { icon: BadgeCheck, label: 'Verified, twice', detail: 'ID verification for plans, video verification for real-time discovery' },
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
      { icon: Sparkles, label: 'Become a creator', detail: 'Build a following inside SnooSpace', sectionLabel: 'Grow' },
      { icon: Handshake, label: 'Get discovered by sponsors', detail: 'Set your brand preferences and let sponsors find you' },
      { icon: Link2, label: 'Collabs', detail: 'Partner directly with communities, brands, and venues' },
      { icon: Megaphone, label: 'Post opportunities', detail: 'Hire help or offer paid gigs of your own' },
      { icon: Eye, label: 'Audience insights', detail: "See who's actually following you" },
      { icon: ClipboardList, label: 'Polls', detail: 'Get quick reads from your audience', sectionLabel: 'Engage' },
      { icon: HelpCircle, label: 'Q&A', detail: 'Let followers ask, you answer' },
      { icon: Trophy, label: 'Challenges', detail: 'Prompt playful participation' },
      { icon: Bell, label: 'Nudges', detail: 'Gentle prompts to stay active' },
      { icon: Mic, label: 'Voice box', detail: 'Fans start conversations right on your profile' },
    ],
  },
];

export const COMMUNITY_PILLARS: PillarData[] = [
  {
    key: 'event-engine',
    icon: Ticket,
    title: 'Event engine',
    accent: 'blue',
    items: [
      { icon: CalendarPlus, label: 'Host events', detail: 'Publish and manage your event' },
      { icon: Percent, label: 'Ticket tiers & promo codes', detail: 'Multiple pricing tiers, discounts, and codes' },
      { icon: ScanLine, label: 'Scan tickets', detail: 'Check attendees in at the door' },
    ],
  },
  {
    key: 'audience-sponsors',
    icon: BarChart3,
    title: 'Audience & sponsors',
    accent: 'teal',
    items: [
      { icon: Eye, label: 'Audience quality', detail: 'Buying power, tiers, and demographics, not just follower counts' },
      { icon: Handshake, label: 'Get discovered by sponsors', detail: 'Set your preferences and let brands find you' },
    ],
  },
  {
    key: 'collabs',
    icon: Link2,
    title: 'Collabs',
    accent: 'indigo',
    items: [
      { icon: Send, label: 'Pitch a partnership', detail: 'Propose a collab to creators, brands, or venues' },
      { icon: Inbox, label: 'Get pitched to', detail: 'Proposals come to you from creators, brands, and venues' },
    ],
  },
  {
    key: 'keep-it-alive',
    icon: Sparkles,
    title: 'Keep it alive',
    accent: 'purple',
    items: [
      { icon: Trophy, label: 'Challenges', detail: 'Prompt playful participation' },
      { icon: ClipboardList, label: 'Polls', detail: 'Quick reads on what members want' },
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
      { icon: Megaphone, label: 'Post opportunities', detail: 'Hire help and manage applicants' },
      { icon: UserCog, label: 'Team & co-hosts', detail: 'Assign co-organizers and permissions' },
      { icon: LayoutDashboard, label: 'Dashboard & payouts', detail: 'Revenue, attendance, and settlements in one view' },
    ],
  },
];

export const BRAND_PILLARS: PillarData[] = [
  {
    key: 'find-your-fit',
    icon: Target,
    title: 'Find your fit',
    accent: 'blue',
    items: [
      { icon: Target, label: 'Smart matching', detail: 'Discover communities by real audience data, not follower counts' },
      { icon: Megaphone, label: 'Targeted ads', detail: 'Reach the right communities and users directly' },
    ],
  },
  {
    key: 'collabs',
    icon: Link2,
    title: 'Collabs',
    accent: 'coral',
    items: [
      { icon: Send, label: 'Post a collab', detail: 'Put your brief out there' },
      { icon: Inbox, label: 'Get pitched', detail: 'Creators and communities come to you — no more cold DMs or emails' },
    ],
  },
  {
    key: 'content',
    icon: Camera,
    title: 'Content',
    accent: 'purple',
    items: [
      { icon: LucideImage, label: 'Posts', detail: 'Share campaign photos and videos with the SnooSpace audience' },
      { icon: ClipboardList, label: 'Polls', detail: 'Get quick reads from communities and creators' },
      { icon: Trophy, label: 'Challenges', detail: 'Launch a branded challenge and see who shows up' },
      { icon: HelpCircle, label: 'Q&A', detail: 'Answer questions directly from your audience' },
    ],
  },
];

export const VENUE_PILLARS: PillarData[] = [
  {
    key: 'venue-online',
    icon: MapPin,
    title: 'Your venue, online',
    accent: 'teal',
    items: [
      { icon: MapPin, label: 'List your space', detail: 'Put your venue on the map' },
      { icon: Compass, label: 'Get discovered', detail: 'Show up to people browsing nearby' },
      { icon: CalendarCheck, label: 'Get booked directly', detail: 'Communities book your space to host events' },
    ],
  },
  {
    key: 'collabs',
    icon: Link2,
    title: 'Collabs',
    accent: 'coral',
    items: [
      { icon: Send, label: 'Pitch a collab', detail: 'Invite creators to review or promote your space' },
      { icon: Inbox, label: 'Get pitched to', detail: 'Creators and communities reach out wanting to use your space' },
    ],
  },
  {
    key: 'content',
    icon: Camera,
    title: 'Show it off',
    accent: 'purple',
    items: [
      { icon: LucideImage, label: 'Posts', detail: 'Share photos and video of your space' },
      { icon: ClipboardList, label: 'Polls', detail: 'Ask your community what to host next' },
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
  indigo: {
    stroke: '#4F46E5',
    glow: 'rgba(79, 70, 229, 0.8)',
    dot: '#4F46E5',
    iconClass: 'text-indigo-600',
    icon: 'text-indigo-600',
    chipBg: 'bg-indigo-100',
    chipIcon: 'text-indigo-600',
    panelBg: 'bg-indigo-50/60',
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
  const config = ACCENT_CONFIG[pillar.accent] ?? ACCENT_CONFIG.blue;
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
          {pillar.items.map((item, i) => {
            const ItemIcon = item.icon;
            return (
              <div key={item.label}>
                {item.sectionLabel && (
                  <div
                    className={`px-1.5 ${
                      i === 0 ? 'pt-0.5 pb-1' : 'pt-2.5 pb-1'
                    } text-[10px] font-semibold uppercase tracking-wide text-slate-400`}
                  >
                    {item.sectionLabel}
                  </div>
                )}
                <div className="flex items-start gap-2.5 px-1.5 py-2 rounded-lg">
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

export function BrandFeaturePillars(props: {
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
      label="For brands"
      pillars={BRAND_PILLARS}
      openKey={openKey}
      onToggle={onToggle}
      hoveredKey={props.hoveredKey ?? null}
      onHover={props.onHover}
      className={props.className}
    />
  );
}

export function VenueFeaturePillars(props: {
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
      label="For venues"
      pillars={VENUE_PILLARS}
      openKey={openKey}
      onToggle={onToggle}
      hoveredKey={props.hoveredKey ?? null}
      onHover={props.onHover}
      className={props.className}
    />
  );
}

// Toggle between the two persona pairs that flank the phone mockup.
// Brands & Venues carries a "Coming Later" badge since neither persona
// ships with the initial launch.
export function PersonaPairToggle({
  pair,
  onChange,
  className = '',
}: {
  pair: 'people-community' | 'brands-venues';
  onChange: (pair: 'people-community' | 'brands-venues') => void;
  className?: string;
}) {
  const isPC = pair === 'people-community';
  return (
    <div className={`flex justify-center gap-2 mb-5 ${className}`}>
      <button
        type="button"
        onClick={() => onChange('people-community')}
        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer select-none ${
          isPC
            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
        }`}
      >
        People &amp; Communities
      </button>
      <button
        type="button"
        onClick={() => onChange('brands-venues')}
        className={`relative px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer select-none ${
          !isPC
            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
        }`}
      >
        Brands &amp; Venues
        <span className="absolute -top-2 -right-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-semibold text-amber-950 whitespace-nowrap shadow-xs">
          Coming Later
        </span>
      </button>
    </div>
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
  id: string;
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
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const phoneAnchorRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardSliderRef = useRef<HTMLDivElement>(null);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Persona pair state: default is 'people-community'
  const [pair, setPair] = useState<'people-community' | 'brands-venues'>('people-community');
  const isPC = pair === 'people-community';

  // Accordion open states (both null -> NO card open by default)
  const [leftOpenKey, setLeftOpenKey] = useState<string | null>(null);
  const [rightOpenKey, setRightOpenKey] = useState<string | null>(null);
  const [hoveredRayId, setHoveredRayId] = useState<string | null>(null);

  // Switching pairs explicitly resets any open accordion pillar to closed
  const handlePairChange = (newPair: 'people-community' | 'brands-venues') => {
    if (newPair === pair) return;
    setPair(newPair);
    setLeftOpenKey(null);
    setRightOpenKey(null);
    setHoveredRayId(null);
  };

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

    // Scope queries to columns to avoid collision when both sides share keys (e.g. 'collabs', 'content')
    const leftCol = leftColumnRef.current || container;
    const rightCol = rightColumnRef.current || container;

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

    const activeLeftPillars = isPC ? PEOPLE_PILLARS : BRAND_PILLARS;
    const activeRightPillars = isPC ? COMMUNITY_PILLARS : VENUE_PILLARS;

    // 1. Left Pillars — connection rays calibrated to bracket the central feed card
    // For 3 items (Brands): [0.47, 0.55, 0.63]
    // - Top card ('Find your fit') angles downward into the top edge of the feed card
    // - Middle card ('Collabs') bridges nearly horizontal into the center of the feed card
    // - Bottom card ('Content') angles upward into the lower section of the feed card
    const leftCount = activeLeftPillars.length;
    const leftSpread =
      leftCount === 3
        ? [0.47, 0.55, 0.63]
        : leftCount === 4
        ? [0.44, 0.51, 0.58, 0.65]
        : [0.55];

    activeLeftPillars.forEach((pillar, i) => {
      const el = leftCol.querySelector(`[data-pillar-key="${pillar.key}"]`);
      if (!el) return;
      const pRect = el.getBoundingClientRect();
      const btn = el.querySelector('button') || el;
      const bRect = btn.getBoundingClientRect();

      const targetX = pRect.right - containerRect.left;
      const targetY = bRect.top + bRect.height / 2 - containerRect.top;
      const px = phoneLeftX;
      const spreadRatio = leftSpread[i] ?? (0.44 + (i / (leftCount - 1)) * 0.21);
      const py = phoneTopY + phoneHeight * spreadRatio;

      const dx = Math.max(px - targetX, 20);
      // Clean cubic bezier with smooth horizontal tangents at both the phone bezel and card anchor
      const cp1x = px - dx * 0.48;
      const cp1y = py;
      const cp2x = targetX + dx * 0.48;
      const cp2y = targetY;
      const d = `M ${px} ${py} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

      newRays.push({
        id: `left-${pillar.key}`,
        key: pillar.key,
        d,
        side: 'left',
        accent: pillar.accent,
        phonePoint: { x: px, y: py },
        targetPoint: { x: targetX, y: targetY },
      });
    });

    // 2. Right Pillars — connection rays calibrated to bracket the central feed card
    // For 3 items (Venues): [0.47, 0.55, 0.63]
    // - Top card ('Your venue, online') angles downward into the top edge of the feed card
    // - Middle card ('Collabs') bridges nearly horizontal into the center of the feed card
    // - Bottom card ('Show it off') angles upward into the lower section of the feed card
    const rightCount = activeRightPillars.length;
    const rightSpread =
      rightCount === 3
        ? [0.47, 0.55, 0.63]
        : rightCount === 6
        ? [0.40, 0.46, 0.52, 0.58, 0.64, 0.70]
        : [0.55];

    activeRightPillars.forEach((pillar, i) => {
      const el = rightCol.querySelector(`[data-pillar-key="${pillar.key}"]`);
      if (!el) return;
      const pRect = el.getBoundingClientRect();
      const btn = el.querySelector('button') || el;
      const bRect = btn.getBoundingClientRect();

      const targetX = pRect.left - containerRect.left;
      const targetY = bRect.top + bRect.height / 2 - containerRect.top;
      const px = phoneRightX;
      const spreadRatio = rightSpread[i] ?? (0.40 + (i / (rightCount - 1)) * 0.30);
      const py = phoneTopY + phoneHeight * spreadRatio;

      const dx = Math.max(targetX - px, 20);
      // Clean cubic bezier with smooth horizontal tangents at both the phone bezel and card anchor
      const cp1x = px + dx * 0.48;
      const cp1y = py;
      const cp2x = targetX - dx * 0.48;
      const cp2y = targetY;
      const d = `M ${px} ${py} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;

      newRays.push({
        id: `right-${pillar.key}`,
        key: pillar.key,
        d,
        side: 'right',
        accent: pillar.accent,
        phonePoint: { x: px, y: py },
        targetPoint: { x: targetX, y: targetY },
      });
    });

    setRays(newRays);
  }, [isPC]);

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

  // Recalculate rays when persona pair toggles
  useEffect(() => {
    updateRayPaths();
    const t1 = setTimeout(updateRayPaths, 60);
    const t2 = setTimeout(updateRayPaths, 200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pair, updateRayPaths]);

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
      gsap.set('.persona-toggle', { opacity: 0, y: 15 });

      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .to('.hero-badge', { opacity: 1, y: 0, duration: 0.6 })
        .to('.hero-headline', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        .to('.hero-subtext', { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .to('.persona-toggle', { opacity: 1, y: 0, duration: 0.5 }, '-=0.3');

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

  const anyActive = Boolean(hoveredRayId || leftOpenKey || rightOpenKey);

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
            Where people discover communities, communities create experiences, and brands and venues help bring them to life — with connections that last long after the event.
          </p>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. CHAPTER TWO: EMOTIONAL CENTERPIECE SCENE (3-Column)   */}
      {/* ========================================================= */}
      <div
        ref={centerpieceRef}
        className="relative w-full min-h-[68vh] sm:min-h-[75vh] flex flex-col items-center justify-center select-none px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        {/* Soft Ambient Radial Lighting Background (Kept as requested) */}
        <div className="hero-ambient-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[750px] bg-radial from-[#CEF2F2]/75 via-[#3565F2]/12 to-transparent blur-3xl pointer-events-none -z-10 opacity-80" />

        {/* Persona Pair Toggle (Above the phone mockup) */}
        <PersonaPairToggle
          pair={pair}
          onChange={handlePairChange}
          className="persona-toggle relative z-20 mb-6 sm:mb-8"
        />

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
            const isHovered = hoveredRayId === ray.id;
            const isOpen = (ray.side === 'left' ? leftOpenKey : rightOpenKey) === ray.key;
            const isActive = isHovered || isOpen;
            const config = ACCENT_CONFIG[ray.accent];

            return (
              <g key={ray.id} className="transition-opacity duration-300">
                {/* Invisible Wide Hit Target for Line Hover */}
                <path
                  d={ray.d}
                  stroke="transparent"
                  strokeWidth="24"
                  fill="none"
                  className="pointer-events-auto cursor-pointer"
                  onMouseEnter={() => setHoveredRayId(ray.id)}
                  onMouseLeave={() => setHoveredRayId(null)}
                />

                {/* Base Continuous Living Stream Line Path */}
                <path
                  className={`conn-path transition-all duration-300 ${
                    isActive ? '' : 'animate-gentle-flow'
                  }`}
                  d={ray.d}
                  stroke={config.stroke}
                  strokeWidth={isActive ? '2.5' : '1.75'}
                  strokeDasharray={isActive ? '8 6' : '6 5'}
                  fill="none"
                  opacity={isActive ? 0.95 : anyActive ? 0.15 : 0.45}
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
                  r={isActive ? 4 : 3}
                  fill={config.dot}
                  opacity={isActive ? 1 : anyActive ? 0.25 : 0.75}
                  className="transition-all duration-300"
                />

                {/* Pillar Card Anchor Terminal Dot */}
                <circle
                  cx={ray.targetPoint.x}
                  cy={ray.targetPoint.y}
                  r={isActive ? 4.5 : 3.5}
                  fill={config.dot}
                  opacity={isActive ? 1 : anyActive ? 0.25 : 0.85}
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
                    opacity="0.6"
                    className="transition-all duration-300"
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* 3-Column Layout: Left (People/Brands) | Center (Phone) | Right (Communities/Venues) */}
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-14 xl:gap-20 2xl:gap-24 items-center">
          {/* Left Column: People or Brand Pillars */}
          <div ref={leftColumnRef} className="pillar-column flex justify-center lg:justify-end w-full">
            <div className={`w-full max-w-sm ${isPC ? 'lg:-translate-y-[33px]' : ''}`}>
              {isPC ? (
                <PeopleFeaturePillars
                  openKey={leftOpenKey}
                  onToggle={(k) => setLeftOpenKey((prev) => (prev === k ? null : k))}
                  hoveredKey={hoveredRayId?.startsWith('left-') ? hoveredRayId.replace('left-', '') : null}
                  onHover={(k) => setHoveredRayId(k ? `left-${k}` : null)}
                />
              ) : (
                <BrandFeaturePillars
                  openKey={leftOpenKey}
                  onToggle={(k) => setLeftOpenKey((prev) => (prev === k ? null : k))}
                  hoveredKey={hoveredRayId?.startsWith('left-') ? hoveredRayId.replace('left-', '') : null}
                  onHover={(k) => setHoveredRayId(k ? `left-${k}` : null)}
                />
              )}
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

          {/* Right Column: Community or Venue Pillars */}
          <div ref={rightColumnRef} className="pillar-column flex justify-center lg:justify-start w-full">
            <div className="w-full max-w-sm">
              {isPC ? (
                <CommunityFeaturePillars
                  openKey={rightOpenKey}
                  onToggle={(k) => setRightOpenKey((prev) => (prev === k ? null : k))}
                  hoveredKey={hoveredRayId?.startsWith('right-') ? hoveredRayId.replace('right-', '') : null}
                  onHover={(k) => setHoveredRayId(k ? `right-${k}` : null)}
                />
              ) : (
                <VenueFeaturePillars
                  openKey={rightOpenKey}
                  onToggle={(k) => setRightOpenKey((prev) => (prev === k ? null : k))}
                  hoveredKey={hoveredRayId?.startsWith('right-') ? hoveredRayId.replace('right-', '') : null}
                  onHover={(k) => setHoveredRayId(k ? `right-${k}` : null)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
