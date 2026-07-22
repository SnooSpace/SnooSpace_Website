'use client';

import React from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, QrCode, Smartphone } from 'lucide-react';

export function DownloadScreen() {
  return (
    <section id="download" className="py-24 bg-gradient-to-b from-white via-[#F2F7FE] to-[#FAFCFF] border-t border-[#E2E8F0]/60">
      <Container>
        <div className="max-w-4xl mx-auto rounded-3xl bg-[#3565F2] text-white p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Background Glow Overlay */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#6BB3F2]/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg text-center md:text-left">
              <Badge variant="cyan" className="mb-4 bg-[#CEF2F2] text-[#0F172A]">
                Get the App
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Ready to spend more time offline?
              </h2>
              <p className="text-base sm:text-lg font-medium text-white/90 leading-relaxed mb-8">
                Download SnooSpace today and discover your next favorite community, event, or friend group.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                <Button variant="cyan" size="lg" className="w-full sm:w-auto gap-2 px-8">
                  <Smartphone className="w-5 h-5" />
                  <span>Download for iOS & Android</span>
                </Button>
              </div>
            </div>

            {/* QR Code Graphic Container */}
            <div className="p-6 rounded-2xl bg-white text-[#0F172A] shadow-lg flex flex-col items-center text-center shrink-0">
              <div className="w-32 h-32 bg-[#F2F7FE] rounded-xl flex items-center justify-center border border-[#E2E8F0] mb-3">
                <QrCode className="w-24 h-24 text-[#3565F2]" />
              </div>
              <span className="text-xs font-bold text-[#475569]">Scan to install</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
