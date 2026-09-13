'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ArrowLeft, X, ChevronRight, ChevronDown } from 'lucide-react';
import SnooSpaceIcon from '@/assets/logos/Icon_Light.svg';

/* ── Flaticon Official Google Play Store Vector Icon ── */
function FlaticonPlayStore({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 512 512" fill="none">
      <path
        fill="#00D3FF"
        d="M38.8 11.2C36.3 13.9 34.8 18 34.8 23.3v465.4c0 5.3 1.5 9.4 4 12.1l2.4 2.2L297 247.2v-5.6L41.2 9l-2.4 2.2z"
      />
      <path
        fill="#FFD400"
        d="M382.9 333.1l-85.9-85.9v-5.6l85.9-85.9 1.9 1.1 101.8 57.8c29 16.5 29 43.4 0 59.9l-101.8 57.5-1.9 1.1z"
      />
      <path
        fill="#FF3A44"
        d="M297 247.2L38.8 503c9.7 10.3 25.8 11.5 44 1.2l302-171.1-87.8-85.9z"
      />
      <path
        fill="#00E676"
        d="M297 241.6l87.8-85.9L82.8 7.8C64.6-2.5 48.5-1.3 38.8 9l258.2 232.6z"
      />
    </svg>
  );
}

/* ── Flawless Official Apple App Store Vector Icon ── */
function FlaticonAppStore({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="5.5" fill="#0D84FF" />
      {/* Left Diagonal Baton */}
      <path
        d="M7 18.2L14.8 6.5"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Right Diagonal Baton with Overlap Gap */}
      <path
        d="M17 18.2L12.7 11.7"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path
        d="M10.7 8.7L9.2 6.5"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* Horizontal Crossbar Baton */}
      <path
        d="M4.8 14H19.2"
        stroke="white"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'menu' | 'motion'>('menu');
  const [motionMode, setMotionMode] = useState<'hi-fi' | 'lo-fi'>('hi-fi');

  // Lock body scroll when overlay is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  // Apply motion preference to document root
  useEffect(() => {
    if (motionMode === 'lo-fi') {
      document.documentElement.classList.add('lo-fi-motion');
    } else {
      document.documentElement.classList.remove('lo-fi-motion');
    }
  }, [motionMode]);

  const scrollToTop = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  const handleNavClick = useCallback((href: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  }, []);

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          1. CLEAN STICKY HEADER (No border line/shadow, color difference kept)
         ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/90 transition-colors">
        <Container className="flex h-20 items-center justify-between">
          {/* Brand Logo with Bluish Gradient Glow on Hover (Shifted slightly to the left) */}
          <Link
            href="/"
            onClick={scrollToTop}
            className="relative flex items-center group cursor-pointer p-1 -translate-x-3 sm:-translate-x-5 md:-translate-x-7"
            aria-label="SnooSpace Home"
          >
            {/* Ambient Bluish Gradient Glow on Hover */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#3565F2] via-[#6BB3F2] to-[#CEF2F2] blur-md opacity-0 group-hover:opacity-60 transition-all duration-500 pointer-events-none group-hover:scale-125" />
            <Image
              src={SnooSpaceIcon}
              alt="SnooSpace Logo"
              className="relative z-10 h-10 w-10 transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right Action Area: Get Early Access + Bold 2-line Menu Button at Red Mark */}
          <div className="flex items-center">
            {/* Get Early Access Pill Button (Position preserved exactly where it is) */}
            <button
              type="button"
              onClick={() => handleNavClick('#download')}
              className="px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#3565F2] hover:bg-[#2552d8] shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Get Early Access
            </button>

            {/* 2-line Menu Button (Positioned at Red Mark, Bolder/Thicker lines, Blue Glow on Hover, Morphs into 'X') */}
            <button
              type="button"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                if (!isMenuOpen) setActiveView('menu');
              }}
              aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMenuOpen}
              className="relative z-[110] flex flex-col justify-center items-center gap-[7px] w-12 h-12 cursor-pointer group ml-3 translate-x-10 sm:translate-x-14 md:translate-x-16"
            >
              {/* Top Bar -> Rotates into 45deg on open */}
              <span
                className={`w-7 sm:w-8 h-[5px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#3565F2] group-hover:drop-shadow-[0_0_12px_rgba(53,101,242,0.9)] ${
                  isMenuOpen
                    ? 'bg-[#0F172A] translate-y-[6px] rotate-45'
                    : 'bg-[#0F172A]'
                }`}
              />
              {/* Bottom Bar -> Rotates into -45deg on open */}
              <span
                className={`w-7 sm:w-8 h-[5px] rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#3565F2] group-hover:drop-shadow-[0_0_12px_rgba(53,101,242,0.9)] ${
                  isMenuOpen
                    ? 'bg-[#0F172A] -translate-y-[6px] -rotate-45'
                    : 'bg-[#0F172A]'
                }`}
              />
            </button>
          </div>
        </Container>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          2. FULLSCREEN LIGHT-THEME MENU OVERLAY (Slide in from Right to Left)
         ───────────────────────────────────────────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        className={`fixed inset-0 z-[100] flex flex-col lg:flex-row bg-[#FAFCFF] text-[#0F172A] overflow-y-auto lg:overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {/* ═══════════════════════════════════════════════════════════
            LEFT SECTION (LIGHT THEME): Brand showcase, glowing aura, Flaticons
            Slides in smoothly from right to left
           ═══════════════════════════════════════════════════════════ */}
        <div
          className={`relative w-full lg:w-1/2 min-h-[55vh] lg:min-h-full flex flex-col justify-between p-8 sm:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-[#E2E8F0] bg-gradient-to-br from-[#F4F8FF] via-[#EBF3FF] to-[#FAFCFF] overflow-hidden transition-all duration-700 ease-out ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-16 opacity-0'
          }`}
        >
          {/* Ambient Radiant Blue-Cyan Glow Aura */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#3565F2]/20 via-[#6BB3F2]/25 to-[#CEF2F2]/40 blur-[85px] animate-pulse" />
            <div className="absolute w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] rounded-full bg-[#3565F2]/15 blur-[55px]" />
          </div>

          {/* Top Spacer */}
          <div className="hidden lg:block h-8" />

          {/* Center: Large Floating Icon Light with Ambient Glow */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto py-10 lg:py-0">
            <div className="relative group transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#3565F2]/25 to-[#CEF2F2]/30 blur-2xl group-hover:blur-3xl transition-all duration-500" />
              <Image
                src={SnooSpaceIcon}
                alt="SnooSpace"
                className="relative z-10 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 drop-shadow-[0_16px_36px_rgba(53,101,242,0.25)]"
                priority
              />
            </div>
          </div>

          {/* Bottom Row: Coming Soon (Left) | CTA (Center) | Store Badges (Right) */}
          <div className="relative z-10 grid grid-cols-3 items-end pt-8 sm:pt-12 border-t border-[#E2E8F0]/60 lg:border-t-0">
            {/* Coming Soon Text (Bottom Left) */}
            <div className="flex flex-col text-left">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#64748B] uppercase font-display">
                Coming
              </span>
              <span className="text-sm sm:text-lg md:text-xl font-black tracking-wider text-[#0F172A] uppercase font-display leading-tight">
                Soon
              </span>
            </div>

            {/* Get Early Access Pill Button (Bottom Center) */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => handleNavClick('#download')}
                className="px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-[#3565F2] hover:bg-[#2552d8] shadow-[0_4px_18px_rgba(53,101,242,0.35)] hover:shadow-[0_6px_26px_rgba(53,101,242,0.5)] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Get Early Access
              </button>
            </div>

            {/* Equal-length Google Play & App Store Pills (Bottom Right) */}
            <div className="flex flex-col items-end gap-2.5">
              {/* Google Play */}
              <div className="w-[155px] sm:w-[165px] h-11 flex items-center justify-start gap-3 px-3.5 sm:px-4 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#3565F2]/40 transition-all cursor-pointer group">
                <FlaticonPlayStore className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
                <span className="text-xs sm:text-sm font-bold font-display text-[#0F172A] whitespace-nowrap">
                  Google Play
                </span>
              </div>

              {/* Apple App Store */}
              <div className="w-[155px] sm:w-[165px] h-11 flex items-center justify-start gap-3 px-3.5 sm:px-4 rounded-full bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-[#3565F2]/40 transition-all cursor-pointer group">
                <FlaticonAppStore className="w-5 h-5 shrink-0 transition-transform group-hover:scale-105" />
                <span className="text-xs sm:text-sm font-bold font-display text-[#0F172A] whitespace-nowrap">
                  App Store
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            RIGHT SECTION (LIGHT THEME): Navigation Menu or Motion Options
           ═══════════════════════════════════════════════════════════ */}
        <div
          className={`relative w-full lg:w-1/2 flex flex-col justify-between p-8 sm:p-12 lg:p-14 bg-white transition-all duration-500 ease-out delay-75 ${
            isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
          {/* Top Bar matching Image 2: Bold Back | SnooSpace & Thick Bold Close Button */}
          <div className="flex items-center justify-between pb-8">
            {/* Back Button */}
            <button
              type="button"
              onClick={() => {
                if (activeView === 'motion') {
                  setActiveView('menu');
                } else {
                  setIsMenuOpen(false);
                }
              }}
              className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-[#0F172A] hover:text-[#3565F2] transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 text-[#3565F2]" strokeWidth={2.6} />
              <span>Back</span>
              <span className="text-slate-300 font-normal mx-0.5">|</span>
              <span className="font-bold tracking-tight">
                {activeView === 'motion' ? 'Motion Settings' : 'SnooSpace'}
              </span>
            </button>

            {/* Circular Close Button (X) with Thick / Bold X */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-slate-100/90 hover:bg-slate-200 text-[#0F172A] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-2xs"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F172A]" strokeWidth={3.2} />
            </button>
          </div>

          {/* ── VIEW A: PRIMARY MENU (Without 'Explore All') ── */}
          {activeView === 'menu' && (
            <div className="flex-1 flex flex-col justify-center py-8 sm:py-12 animate-in fade-in duration-300">
              {/* Primary Navigation Links */}
              <nav className="flex flex-col gap-4 sm:gap-6">
                {[
                  { label: 'PEOPLE', href: '#experiences' },
                  { label: 'COMMUNITY', href: '#community' },
                  { label: 'ROADMAP', href: '#roadmap' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="flex items-center justify-between text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#0F172A] hover:text-[#3565F2] transition-all group py-3 border-b border-slate-100 hover:border-blue-200 cursor-pointer"
                  >
                    <span className="font-display tracking-wide group-hover:translate-x-3 transition-transform duration-300">
                      {item.label}
                    </span>
                    <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-slate-300 group-hover:text-[#3565F2] group-hover:translate-x-1.5 transition-all duration-300" strokeWidth={2.4} />
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* ── VIEW B: MOTION OPTIONS (Matching Image 3) ── */}
          {activeView === 'motion' && (
            <div className="flex-1 flex flex-col justify-center py-8 sm:py-12 animate-in fade-in duration-300">
              <div className="mb-6">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.25em] text-[#3565F2] font-display">
                  Motion Experience
                </span>
                <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-medium">
                  Select your preferred level of animation and visual dynamics.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* 1. Hi-Fi Option Card */}
                <button
                  type="button"
                  onClick={() => setMotionMode('hi-fi')}
                  className={`text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    motionMode === 'hi-fi'
                      ? 'border-[#3565F2] bg-blue-50/60 shadow-sm ring-1 ring-[#3565F2]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] font-display">
                      Hi-Fi
                    </span>
                    <span className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-1">
                      Enables full-motion experience with rich animations, dynamic transitions, and immersive visual effects.
                    </span>
                  </div>
                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      motionMode === 'hi-fi'
                        ? 'border-[#3565F2]'
                        : 'border-slate-300'
                    }`}
                  >
                    {motionMode === 'hi-fi' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3565F2]" />
                    )}
                  </div>
                </button>

                {/* 2. Lo-Fi Option Card */}
                <button
                  type="button"
                  onClick={() => setMotionMode('lo-fi')}
                  className={`text-left p-5 sm:p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    motionMode === 'lo-fi'
                      ? 'border-[#3565F2] bg-blue-50/60 shadow-sm ring-1 ring-[#3565F2]/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-base sm:text-lg font-bold text-[#0F172A] font-display">
                      Lo-Fi
                    </span>
                    <span className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-1">
                      Minimizes animations, motion effects, and visual movement for improved performance.
                    </span>
                  </div>
                  {/* Radio Indicator */}
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      motionMode === 'lo-fi'
                        ? 'border-[#3565F2]'
                        : 'border-slate-300'
                    }`}
                  >
                    {motionMode === 'lo-fi' && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#3565F2]" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Bar: Motion Option Button (Bottom Right) */}
          <div className="flex items-center justify-end pt-8 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveView(activeView === 'motion' ? 'menu' : 'motion')}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#64748B] hover:text-[#3565F2] transition-colors cursor-pointer select-none"
              aria-label="Toggle motion options"
            >
              <span>Motion</span>
              <span className="text-[10px] text-[#3565F2] lowercase font-semibold">
                ({motionMode})
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  activeView === 'motion' ? 'rotate-180 text-[#3565F2]' : 'text-[#64748B]'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
