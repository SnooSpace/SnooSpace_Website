'use client';

import React, { useState } from 'react';
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
  Image,
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

export const PEOPLE_PILLARS: PillarData[] = [
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
    icon: Circle,
    title: 'Real connections',
    accent: 'teal',
    items: [
      {
        icon: Heart,
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
      { icon: Image, label: 'Posts', detail: 'Share moments with your circles' },
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

export const COMMUNITY_PILLARS: PillarData[] = [
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

export const ACCENT: Record<
  PillarAccent,
  { icon: string; chipBg: string; chipIcon: string; panelBg: string }
> = {
  blue: { icon: 'text-blue-600', chipBg: 'bg-blue-100', chipIcon: 'text-blue-600', panelBg: 'bg-blue-50/60' },
  teal: { icon: 'text-teal-600', chipBg: 'bg-teal-100', chipIcon: 'text-teal-600', panelBg: 'bg-teal-50/60' },
  purple: { icon: 'text-purple-600', chipBg: 'bg-purple-100', chipIcon: 'text-purple-600', panelBg: 'bg-purple-50/60' },
  coral: { icon: 'text-orange-600', chipBg: 'bg-orange-100', chipIcon: 'text-orange-600', panelBg: 'bg-orange-50/60' },
  pink: { icon: 'text-pink-600', chipBg: 'bg-pink-100', chipIcon: 'text-pink-600', panelBg: 'bg-pink-50/60' },
};

export interface PillarProps {
  pillar: PillarData;
  isOpen: boolean;
  onToggle: () => void;
}

export function Pillar({ pillar, isOpen, onToggle }: PillarProps) {
  const Icon = pillar.icon;
  const accent = ACCENT[pillar.accent] ?? ACCENT.blue;

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center gap-2.5 px-4 py-3 text-left cursor-pointer"
      >
        <Icon className={`h-4 w-4 shrink-0 ${accent.icon}`} aria-hidden="true" />
        <span className="flex-1 text-sm font-medium text-slate-900">{pillar.title}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className={`px-2.5 pb-2.5 pt-1 ${accent.panelBg}`}>
            {pillar.items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-start gap-2.5 px-1.5 py-2 rounded-lg"
                >
                  <span
                    className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${accent.chipBg}`}
                  >
                    <ItemIcon className={`h-3 w-3 ${accent.chipIcon}`} aria-hidden="true" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-medium text-slate-800">{item.label}</span>
                    <span className="text-[11.5px] text-slate-600">{item.detail}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface PillarColumnProps {
  label: string;
  pillars: PillarData[];
  defaultOpenKey?: string | null;
}

export function PillarColumn({ label, pillars, defaultOpenKey }: PillarColumnProps) {
  const [openKey, setOpenKey] = useState<string | null>(defaultOpenKey ?? null);

  return (
    <div className="flex flex-col gap-2">
      <span className="pl-1 text-xs font-medium text-slate-500">{label}</span>
      {pillars.map((pillar) => (
        <Pillar
          key={pillar.key}
          pillar={pillar}
          isOpen={openKey === pillar.key}
          onToggle={() => setOpenKey(openKey === pillar.key ? null : pillar.key)}
        />
      ))}
    </div>
  );
}

export function PeopleFeaturePillars(props: Partial<PillarColumnProps>) {
  return <PillarColumn label="For people" pillars={PEOPLE_PILLARS} {...props} />;
}

export function CommunityFeaturePillars(props: Partial<PillarColumnProps>) {
  return <PillarColumn label="For communities" pillars={COMMUNITY_PILLARS} {...props} />;
}

export default function FeaturePillarsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.1fr)_1fr] gap-4 items-start">
      <PeopleFeaturePillars />
      <div className="hidden md:block" />
      <CommunityFeaturePillars />
    </div>
  );
}
