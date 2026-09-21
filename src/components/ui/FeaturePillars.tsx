'use client';

import React, { useState } from 'react';
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
  Image,
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
      { icon: Image, label: 'Posts', detail: 'Share campaign photos and videos with the SnooSpace audience' },
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
      { icon: Image, label: 'Posts', detail: 'Share photos and video of your space' },
      { icon: ClipboardList, label: 'Polls', detail: 'Ask your community what to host next' },
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
  indigo: { icon: 'text-indigo-600', chipBg: 'bg-indigo-100', chipIcon: 'text-indigo-600', panelBg: 'bg-indigo-50/60' },
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
                      className={`mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full ${accent.chipBg}`}
                    >
                      <ItemIcon className={`h-3 w-3 ${accent.chipIcon}`} aria-hidden="true" />
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

export function BrandFeaturePillars(props: Partial<PillarColumnProps>) {
  return <PillarColumn label="For brands" pillars={BRAND_PILLARS} {...props} />;
}

export function VenueFeaturePillars(props: Partial<PillarColumnProps>) {
  return <PillarColumn label="For venues" pillars={VENUE_PILLARS} {...props} />;
}

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
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-white text-slate-600 border-slate-200'
        }`}
      >
        People &amp; Communities
      </button>
      <button
        type="button"
        onClick={() => onChange('brands-venues')}
        className={`relative px-4 py-2 rounded-full text-sm font-medium border transition-colors cursor-pointer select-none ${
          !isPC
            ? 'bg-slate-900 text-white border-slate-900'
            : 'bg-white text-slate-600 border-slate-200'
        }`}
      >
        Brands &amp; Venues
        <span className="absolute -top-2 -right-2 rounded-full bg-amber-400 px-1.5 py-0.5 text-[9px] font-semibold text-amber-950 whitespace-nowrap">
          Coming Later
        </span>
      </button>
    </div>
  );
}

export default function FeaturePillarsSection() {
  const [pair, setPair] = useState<'people-community' | 'brands-venues'>('people-community');
  const isPC = pair === 'people-community';

  return (
    <div>
      <PersonaPairToggle pair={pair} onChange={setPair} />
      <div className="grid grid-cols-1 md:grid-cols-[1fr_minmax(0,1.1fr)_1fr] gap-4 items-start">
        {isPC ? <PeopleFeaturePillars /> : <BrandFeaturePillars />}
        <div className="hidden md:block" />
        {isPC ? <CommunityFeaturePillars /> : <VenueFeaturePillars />}
      </div>
    </div>
  );
}
