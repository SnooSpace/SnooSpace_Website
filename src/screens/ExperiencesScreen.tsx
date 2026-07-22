'use client';

import React from 'react';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar, Users, MapPin, Sparkles, Star } from 'lucide-react';
import { SnooSpaceDevice } from '@/components/ui/snoospace-device';

export function ExperiencesScreen() {
  return (
    <section id="experiences" className="pt-12 sm:pt-6 pb-28 bg-[#FAFCFF]">
      <Container>
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-16">
          <Badge variant="primary" className="mb-4">
            Real-World Experiences
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-[1.15]">
            Built around lived moments, <br />
            <span className="text-[#3565F2]">not digital feeds.</span>
          </h2>
        </div>

        {/* Feature Cards Relocated From Hero */}
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

        {/* Feature Showcase Grid with App Detail Mockup */}
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
