'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, MessageSquare, Heart, Sparkles, CheckCircle2 } from 'lucide-react';

export function CommunityScreen() {
  return (
    <section id="community" className="py-28 bg-[#FAFCFF] border-t border-[#E2E8F0]/60">
      <Container>
        <div className="max-w-3xl mb-16">
          <Badge variant="primary" className="mb-4">
            Community & Safety
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
            Designed for safety, trust, <br />
            <span className="text-[#3565F2]">and genuine belonging.</span>
          </h2>
        </div>

        {/* Large Highlight Card + Micro Chat Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          <div className="lg:col-span-7 p-10 rounded-3xl bg-white border border-[#E2E8F0] shadow-sm">
            <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
              Micro-chats that auto-archive after events.
            </h3>
            <p className="text-base font-medium text-[#475569] leading-relaxed mb-6">
              Unlike permanent group chats that accumulate endless unread badges, SnooSpace event chats open 48 hours before an event and automatically archive afterwards. Keep your phone clean and focus on lived connections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3565F2]" />
                <span className="text-sm font-bold text-[#0F172A]">No spam or unsolicited DMs</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#3565F2]" />
                <span className="text-sm font-bold text-[#0F172A]">Verified organizer profiles</span>
              </div>
            </div>
          </div>

          {/* Live Micro-Chat Preview Widget */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-white border border-[#E2E8F0] shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-[#0F172A]">Sunset Trail Run Squad</span>
              </div>
              <span className="text-[11px] font-semibold text-[#64748B]">8 Members</span>
            </div>

            <div className="space-y-3 text-xs font-medium">
              <div className="p-3 rounded-2xl bg-[#F2F7FE] text-[#0F172A] max-w-[85%]">
                <span className="font-bold text-[#3565F2] block mb-1">Alex (Host)</span>
                Hey everyone! Bringing extra espresso for after the run ☕
              </div>
              <div className="p-3 rounded-2xl bg-[#CEF2F2]/60 text-[#0F172A] max-w-[85%] ml-auto">
                <span className="font-bold text-[#0F172A] block mb-1">Sarah</span>
                Awesome! See you all at the trailhead at 6:30 AM 🏃
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
