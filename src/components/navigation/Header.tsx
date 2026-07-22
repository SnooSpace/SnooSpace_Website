'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import SnooSpaceMasterLogo from '@/assets/logos/SnooSpace_Master_Logo_Light.svg';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 border-b border-[#E2E8F0]/60 transition-all">
      <Container className="flex h-20 items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center group">
          <Image
            src={SnooSpaceMasterLogo}
            alt="SnooSpace Logo"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Narrative Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#475569]">
          <Link href="#why" className="hover:text-[#3565F2] transition-colors">
            Why SnooSpace
          </Link>
          <Link href="#journey" className="hover:text-[#3565F2] transition-colors">
            The Journey
          </Link>
          <Link href="#experiences" className="hover:text-[#3565F2] transition-colors">
            Real Experiences
          </Link>
          <Link href="#community" className="hover:text-[#3565F2] transition-colors">
            Community Hub
          </Link>
          <Link href="#roadmap" className="hover:text-[#3565F2] transition-colors">
            Roadmap
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm" className="gap-2 group">
            <span>Get Early Access</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </Container>
    </header>
  );
}
