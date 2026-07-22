'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import SnooSpaceMasterLogo from '@/assets/logos/SnooSpace_Master_Logo_Light.svg';

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Logo & Vision */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <Image
                src={SnooSpaceMasterLogo}
                alt="SnooSpace Logo"
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-xs font-medium text-[#64748B] leading-relaxed">
              An event-first social platform helping people discover communities and spend more time offline.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#64748B]">
              <li><Link href="#why" className="hover:text-[#3565F2]">Why SnooSpace</Link></li>
              <li><Link href="#journey" className="hover:text-[#3565F2]">The Journey</Link></li>
              <li><Link href="#experiences" className="hover:text-[#3565F2]">Real Experiences</Link></li>
              <li><Link href="#download" className="hover:text-[#3565F2]">Download App</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#64748B]">
              <li><Link href="/blog" className="hover:text-[#3565F2]">Blog</Link></li>
              <li><Link href="/changelog" className="hover:text-[#3565F2]">Changelog</Link></li>
              <li><Link href="/roadmap" className="hover:text-[#3565F2]">Roadmap</Link></li>
              <li><Link href="/docs" className="hover:text-[#3565F2]">Documentation</Link></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs font-medium text-[#64748B]">
              <li><Link href="/privacy" className="hover:text-[#3565F2]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-[#3565F2]">Terms of Service</Link></li>
              <li><Link href="/guidelines" className="hover:text-[#3565F2]">Community Guidelines</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-xs font-medium text-[#94A3B8] gap-4">
          <span>&copy; {new Date().getFullYear()} SnooSpace Inc. All rights reserved.</span>
          <span>Designed with restraint & intentional motion.</span>
        </div>
      </Container>
    </footer>
  );
}
