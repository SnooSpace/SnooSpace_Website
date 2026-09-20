'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Container } from '@/components/ui/container';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ActivityNode {
  id: string;
  x: number;
  y: number;
  lineD: string;
}

// Guy holding phone in Animated Scene 2 (Full uncropped viewBox position)
const GUY_PHONE = { x: 365, y: 680 };

const ACTIVITY_NODES: ActivityNode[] = [
  // 1. Cafe (Top Left)
  {
    id: 'node-1',
    x: 340,
    y: 350,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 330,500 340,350`,
  },
  // 2. Live Music (Top Center)
  {
    id: 'node-2',
    x: 520,
    y: 450,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 440,560 520,450`,
  },
  // 3. Bar (Center Right)
  {
    id: 'node-3',
    x: 550,
    y: 840,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 450,760 550,840`,
  },
  // 4. Cycling (Bottom Left/Center)
  {
    id: 'node-4',
    x: 410,
    y: 920,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 380,800 410,920`,
  },
  // 5. Hangout (Bottom Right Picnic)
  {
    id: 'node-5',
    x: 820,
    y: 920,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 580,820 820,920`,
  },
  // 6. Basketball (Top Right Court)
  {
    id: 'node-6',
    x: 740,
    y: 460,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 540,560 740,460`,
  },
  // 7. Football (Middle Right Field)
  {
    id: 'node-7',
    x: 800,
    y: 780,
    lineD: `M ${GUY_PHONE.x},${GUY_PHONE.y} Q 580,730 800,780`,
  },
];

export function WhyScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storySectionRef = useRef<HTMLDivElement>(null);
  const storyPinRef = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLDivElement>(null);
  const videoPinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<SVGCircleElement>(null);

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Synapse Light Traveling Particle (Originates directly at Guy's Phone)
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * ACTIVITY_NODES.length);
      const targetNode = ACTIVITY_NODES[randomIndex];
      const lineEl = document.getElementById(`dotted-line-${targetNode.id}`) as SVGPathElement | null;
      const particle = particleRef.current;
      const phoneGlow = document.getElementById('phone-glow-aura');

      if (lineEl && particle) {
        const lineLen = lineEl.getTotalLength();
        const obj = { val: 0 };

        gsap.to(obj, {
          val: 1,
          duration: 2.6,
          ease: 'power1.inOut',
          onStart: () => {
            gsap.set(particle, { opacity: 0.95 });
            if (phoneGlow) {
              gsap.to(phoneGlow, { 
                opacity: 0.95, 
                duration: 0.4, 
                yoyo: true, 
                repeat: 1,
              });
            }
          },
          onUpdate: () => {
            const pt = lineEl.getPointAtLength(obj.val * lineLen);
            particle.setAttribute('cx', pt.x.toString());
            particle.setAttribute('cy', pt.y.toString());
          },
          onComplete: () => {
            gsap.to(particle, { opacity: 0, duration: 0.4 });
          },
        });
      }
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      // 1. Top Headline Entrance Reveal
      const textTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      textTl
        .fromTo(
          '.story-line-1',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }
        )
        .fromTo(
          '.story-line-2',
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.0, ease: 'power3.out' },
          '+=0.15'
        );

      // 2. Expanded Multi-Perspective Pinned Narrative Timeline Sequence
      const lines = ['#l1', '#l2', '#l3', '#l4', '#l5', '#l6', '#l7'];
      const segments = [...lines, '#resolution'];
      const step = 1 / segments.length;

      gsap.set(lines.map((s) => document.querySelector(s)), { opacity: 0, y: 16 });
      gsap.set('#resolution', { opacity: 0, y: 16 });

      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storySectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          pin: storyPinRef.current,
          onUpdate: (self) => {
            const fill = document.getElementById('progressFill');
            if (fill) fill.style.width = self.progress * 100 + '%';
          },
        },
      });

      storyTl.to('#why-eyebrow', { opacity: 1, duration: 0.4 }, 0);

      segments.forEach((sel, i) => {
        const start = i * step;
        storyTl.to(sel, { opacity: 1, y: 0, duration: step * 0.35, ease: 'power2.out' }, start + step * 0.08);
        if (i < segments.length - 1) {
          storyTl.to(sel, { opacity: 0, y: -14, duration: step * 0.3, ease: 'power2.in' }, start + step * 0.68);
        }
      });

      // 3. Keep Lines and Nodes Stationary and ALWAYS Visible
      gsap.set('#phone-glow-aura', { opacity: 0.9 });
      gsap.set('.dotted-conn-line', { opacity: 1, strokeDashoffset: 0 });
      gsap.set('.glow-line', { opacity: 0.4, strokeDashoffset: 0 });
      gsap.set('.stationary-node-group', { opacity: 1, scale: 1 });

      // 4. Ultra-Fast Pre-Decoded Canvas Frame Scrubbing Engine (0ms Decoder Latency)
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas) {
        const ctx = canvas.getContext('2d');
        const TOTAL_FRAMES = 60; // 60 pre-decoded high-res ImageBitmaps
        const frameBuffer: (ImageBitmap | HTMLCanvasElement)[] = [];
        let currentFrameIndex = 0;

        const drawFrame = (index: number) => {
          if (!ctx || !canvas) return;
          const frame = frameBuffer[index];
          if (frame) {
            ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
          } else if (video && video.readyState >= 2) {
            try {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            } catch {
              // Ignore fallback errors
            }
          }
        };

        const initPreBufferEngine = async () => {
          const dur = video.duration && !isNaN(video.duration) ? video.duration : 3.0;

          canvas.width = video.videoWidth || 1920;
          canvas.height = video.videoHeight || 1080;

          video.pause();

          // Initial render of current video frame
          drawFrame(0);

          // Fast background frame pre-decoding into offscreen canvases
          for (let i = 0; i < TOTAL_FRAMES; i++) {
            const time = (i / (TOTAL_FRAMES - 1)) * dur;
            video.currentTime = time;
            await new Promise((res) => {
              const onSeek = () => {
                video.removeEventListener('seeked', onSeek);
                const offscreen = document.createElement('canvas');
                offscreen.width = canvas.width;
                offscreen.height = canvas.height;
                const offCtx = offscreen.getContext('2d');
                if (offCtx) {
                  offCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  frameBuffer[i] = offscreen;
                }
                res(true);
              };
              video.addEventListener('seeked', onSeek, { once: true });
            });
          }
        };

        if (video.readyState >= 2) {
          initPreBufferEngine();
        } else {
          video.addEventListener('loadedmetadata', initPreBufferEngine, { once: true });
          video.addEventListener('canplay', initPreBufferEngine, { once: true });
        }

        // Silky smooth GSAP ScrollTrigger mapper (Runs at 120 FPS on pre-decoded canvas buffer)
        ScrollTrigger.create({
          trigger: videoSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.05, // Instant responsiveness
          pin: videoPinRef.current,
          onUpdate: (self) => {
            const idx = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(self.progress * TOTAL_FRAMES)));
            if (idx !== currentFrameIndex) {
              currentFrameIndex = idx;
              drawFrame(idx);
            }
          },
        });
      }

      // 5. Subtle Ambient Phone Glow Pulse in Place
      gsap.to('#phone-glow-aura', {
        attr: { r: 54 },
        opacity: 0.55,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.easeInOut',
      });
    },
    { scope: containerRef }
  );

  const activeNode = ACTIVITY_NODES.find((n) => n.id === hoveredNodeId);

  return (
    <section
      id="why"
      ref={containerRef}
      className="relative pt-24 sm:pt-36 pb-0 bg-[#FAFCFF] border-t border-[#E2E8F0]/40 overflow-hidden"
    >
      {/* Soft Ambient Radial Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[650px] bg-radial from-[#F2F7FE] via-[#CEF2F2]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ========================================================= */}
      {/* 1. TOP HALF: EDITORIAL HEADLINE SPREAD                    */}
      {/* ========================================================= */}
      <Container className="relative flex flex-col items-center text-center mb-12 sm:mb-16">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="story-line-1 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#0F172A] leading-[1.1] font-display mb-2">
            We don&apos;t have a friendship problem.
          </h2>
          <h2 className="story-line-2 text-[clamp(2.5rem,5.5vw,4.75rem)] font-extrabold tracking-tight text-[#3565F2] leading-[1.1] font-display mb-6">
            We have a discovery problem.
          </h2>
        </div>
      </Container>

      {/* ========================================================= */}
      {/* 2. PINNED MULTI-PERSPECTIVE STORYTELLING SEQUENCE         */}
      {/* ========================================================= */}
      <div ref={storySectionRef} className="relative h-[420vh] w-full">
        <div 
          ref={storyPinRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        >
          {/* Soft Radial Ambient Lighting Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full bg-radial from-[#CEF2F2]/60 to-transparent blur-3xl opacity-50 pointer-events-none" />

          <div className="relative z-10 w-full max-w-3xl px-6 text-center flex flex-col items-center justify-center">
            {/* Eyebrow Label (Positioned Above Story Stage) */}
            <div id="why-eyebrow" className="absolute -top-16 inset-x-0 mx-auto text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#3565F2] opacity-0">
              WHY SNOOSPACE EXISTS
            </div>

            {/* Centered Story Lines Stage Container */}
            <div className="relative w-full h-48 sm:h-56 flex items-center justify-center">
              {/* Pinned Line 1 */}
              <div id="l1" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4">
                Maybe you moved to a new city three years ago...
              </div>

              {/* Pinned Line 2 */}
              <div id="l2" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4">
                ...or maybe you&apos;ve lived here your whole life, but your social circle drifted away.
              </div>

              {/* Pinned Line 3 */}
              <div id="l3" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4">
                You want to explore new passions—a weekend ride, coffee chat, or live music...
              </div>

              {/* Pinned Line 4 */}
              <div id="l4" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4">
                ...but none of your usual friends are free, or into the same hobbies.
              </div>

              {/* Pinned Line 5 */}
              <div id="l5" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-semibold text-[#475569] tracking-tight leading-snug opacity-0 px-4">
                Your group chat has 40 people in it.<br />It says nothing.
              </div>

              {/* Pinned Line 6 */}
              <div id="l6" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-snug opacity-0 px-4">
                Somewhere near you, right now, six people want<br />the exact same thing you do.
              </div>

              {/* Pinned Line 7 */}
              <div id="l7" className="absolute inset-0 flex items-center justify-center text-center text-2xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-snug opacity-0 px-4">
                They just don&apos;t know it yet.
              </div>

              {/* Final Pinned Story Resolution */}
              <div id="resolution" className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 opacity-0">
                <h3 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight mb-4 font-display">
                  That&apos;s the gap<br />
                  <em className="not-italic text-[#3565F2] font-bold">SnooSpace</em> closes.
                </h3>
                <p className="max-w-lg text-base sm:text-lg font-medium text-[#475569] leading-relaxed">
                  Not another feed to scroll. A way back outside — to the people already looking for the same plan as you.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Progress Rail */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-40 h-1 bg-[#E2E8F0] rounded-full overflow-hidden z-20">
            <div id="progressFill" className="h-full w-0 bg-[#3565F2] transition-all duration-100" />
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. PINNED ROCKSTAR-STYLE CANVAS SCROLL-SCRUBBED VIDEO     */}
      {/* ========================================================= */}
      <div ref={videoSectionRef} className="relative h-[250vh] w-full">
        <div
          ref={videoPinRef}
          className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden"
        >
          <div 
            className="story-illustration-wrap w-full relative aspect-[16/9] sm:aspect-[1.9/1] max-h-[85vh] min-h-[480px] overflow-hidden select-none"
            style={{
              clipPath: 'polygon(0 3.5%, 100% 0, 100% 96.5%, 0 100%)',
            }}
          >
            {/* Hidden Video Source Element */}
            <video
              ref={videoRef}
              src="/videos/animated_scene_2.mp4"
              muted
              playsInline
              preload="auto"
              className="hidden"
            />

            {/* High-Performance Canvas Render Output (Rockstar GTA VI Pre-Decoded Buffer Engine) */}
            <canvas
              ref={canvasRef}
              className="story-illustration-img object-cover object-top w-full h-full pointer-events-none"
            />

            {/* Dynamic Radial Spotlight Highlight Overlay on Hover */}
            {activeNode && (
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
                style={{
                  background: `radial-gradient(circle 180px at ${(activeNode.x / 1000) * 100}% ${(activeNode.y / 1000) * 100}%, rgba(255,255,255,0.3) 0%, transparent 80%)`,
                }}
              />
            )}

            {/* Dynamic Interactive SVG Overlay (1000x1000 Coordinate Space) */}
            <svg 
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              viewBox="0 0 1000 1000" 
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Phone Glow Radial Gradient */}
                <radialGradient id="phone-glow-bright" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="35%" stopColor="#3565F2" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#3565F2" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3565F2" stopOpacity="0" />
                </radialGradient>

                {/* Dotted Line Blue Gradient */}
                <linearGradient id="line-blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3565F2" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#6BB3F2" stopOpacity="0.85" />
                </linearGradient>

                {/* Light Particle Gradient */}
                <radialGradient id="particle-light-aura" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="45%" stopColor="#3565F2" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#3565F2" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* 1. BRIGHT PHONE GLOW AURA (Centered EXACTLY at Guy's Phone: 365, 680) */}
              <circle
                id="phone-glow-aura"
                cx={GUY_PHONE.x}
                cy={GUY_PHONE.y}
                r="45"
                fill="url(#phone-glow-bright)"
                filter="drop-shadow(0 0 18px rgba(53,101,242,0.95))"
                className="transition-all duration-300"
              />

              {/* 2. DOTTED NETWORK LINES RADIATING DIRECTLY FROM HIS PHONE AT (365, 680) */}
              <g className="hidden md:block">
                {ACTIVITY_NODES.map((node) => {
                  const isHovered = hoveredNodeId === node.id;
                  const isAnyHovered = hoveredNodeId !== null;

                  return (
                    <g key={node.id}>
                      {/* Line Glow */}
                      <path
                        id={`glow-line-${node.id}`}
                        className="glow-line transition-all duration-300"
                        d={node.lineD}
                        stroke="#3565F2"
                        strokeWidth="3.5"
                        fill="none"
                        opacity={isHovered ? 0.6 : 0.2}
                        filter="blur(2px)"
                      />
                      {/* Primary Dotted Line */}
                      <path
                        id={`dotted-line-${node.id}`}
                        className="dotted-conn-line transition-all duration-300"
                        d={node.lineD}
                        stroke="url(#line-blue-grad)"
                        strokeWidth={isHovered ? '3.5' : '2.2'}
                        strokeDasharray="6 5"
                        strokeLinecap="round"
                        fill="none"
                        opacity={isHovered ? 1 : isAnyHovered ? 0.25 : 0.75}
                        filter={isHovered ? 'drop-shadow(0 0 8px rgba(53,101,242,0.95))' : 'none'}
                      />
                    </g>
                  );
                })}
              </g>

              {/* 3. IDLE LIGHT TRAVELING PARTICLE */}
              <circle
                ref={particleRef}
                r="5.5"
                fill="url(#particle-light-aura)"
                className="pointer-events-none opacity-0"
                filter="drop-shadow(0 0 8px #FFFFFF)"
              />

              {/* 4. STATIONARY SLEEK PREMIUM CIRCULAR NODES */}
              {ACTIVITY_NODES.map((node) => {
                const isHovered = hoveredNodeId === node.id;

                return (
                  <g
                    key={node.id}
                    id={`node-group-${node.id}`}
                    className="stationary-node-group pointer-events-auto cursor-pointer"
                    onMouseEnter={() => setHoveredNodeId(node.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                  >
                    {/* Hit Target */}
                    <circle cx={node.x} cy={node.y} r="26" fill="transparent" />

                    {/* Concentric Sleek Node Rings */}
                    <g className="origin-center">
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? '16' : '11'}
                        fill="#3565F2"
                        opacity={isHovered ? 0.5 : 0.25}
                        filter="drop-shadow(0 0 14px rgba(53,101,242,1))"
                        className="transition-all duration-300"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isHovered ? '9' : '7'}
                        fill="#FFFFFF"
                        stroke="#3565F2"
                        strokeWidth={isHovered ? '3.5' : '2.5'}
                        className="transition-all duration-300"
                        filter="drop-shadow(0 0 6px rgba(53,101,242,0.85))"
                      />
                      <circle cx={node.x} cy={node.y} r="2.5" fill="#3565F2" />
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
