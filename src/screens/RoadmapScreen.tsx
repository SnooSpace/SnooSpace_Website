'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, Sparkles } from 'lucide-react';

export function RoadmapScreen() {
  const milestones = [
    {
      quarter: 'Q3 2026',
      title: 'City Expansion Launch',
      desc: 'Expanding SnooSpace to SF, NYC, Austin, Seattle, and London.',
      status: 'In Progress',
      completed: false,
    },
    {
      quarter: 'Q4 2026',
      title: 'Host Toolkit & Recurring Circles',
      desc: 'Empowering community organizers with automated scheduling and ticketing.',
      status: 'Upcoming',
      completed: false,
    },
    {
      quarter: 'Q1 2027',
      title: 'Passport & Real-World Memories',
      desc: 'Collect digital memories and souvenirs from events you attended in person.',
      status: 'Planned',
      completed: false,
    },
  ];

  return (
    <section id="roadmap" className="py-24 bg-white border-t border-[#E2E8F0]/60">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge variant="cyan" className="mb-4">
            Roadmap & Future
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">
            Where SnooSpace is headed next
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#FAFCFF] border border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#3565F2]/40 transition-all"
            >
              <div>
                <span className="text-xs font-extrabold text-[#3565F2] uppercase tracking-wider">
                  {m.quarter}
                </span>
                <h3 className="text-xl font-bold text-[#0F172A] mt-1 mb-2">{m.title}</h3>
                <p className="text-sm font-medium text-[#64748B] max-w-xl">{m.desc}</p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#475569] self-start md:self-auto">
                <Clock className="w-3.5 h-3.5 text-[#3565F2]" />
                <span>{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
