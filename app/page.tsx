"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const renditions = [
  {
    id: 1,
    name: "Brutalist Industrial",
    desc: "Raw textures, monospace type, harsh grid, glitch effects, neon accents on dark. No polish, all power.",
    accent: "#39FF14",
    bg: "#0a0a0a",
    textColor: "#e0e0e0",
    font: "'IBM Plex Mono', monospace",
    tagline: "[ PROTOCOL ACTIVE ]",
    style: "brutalist",
  },
  {
    id: 2,
    name: "Luxury Editorial",
    desc: "Serif typography, generous whitespace, gold/cream palette, elegant transitions, magazine-like layout.",
    accent: "#B8860B",
    bg: "#FAF7F2",
    textColor: "#1A1A1A",
    font: "'Cormorant Garamond', serif",
    tagline: "Where Privacy Meets Refinement",
    style: "luxury",
  },
  {
    id: 3,
    name: "Cyberpunk Neon",
    desc: "Dark background, vibrant neon gradients, glassmorphism cards, futuristic UI, animated grid lines.",
    accent: "#00f0ff",
    bg: "#050510",
    textColor: "#E0E8F0",
    font: "'Rajdhani', sans-serif",
    tagline: "◆ NEXT-GEN PROTOCOL",
    style: "cyberpunk",
  },
  {
    id: 4,
    name: "Minimalist Zen",
    desc: "Clean lines, breathing room, muted earth tones, subtle animations, Japanese-inspired zen-like calm.",
    accent: "#8B7355",
    bg: "#F5F1EB",
    textColor: "#2C2C2C",
    font: "'Noto Serif JP', serif",
    tagline: "静かに、確実に",
    style: "zen",
  },
  {
    id: 5,
    name: "Retro Synthwave",
    desc: "80s gradient palette, retro grid perspective, CRT scanline effects, bold geometric shapes.",
    accent: "#ff2d95",
    bg: "#0a0020",
    textColor: "#E0D0FF",
    font: "'Audiowide', sans-serif",
    tagline: "★ TOTALLY RADICAL ★",
    style: "synthwave",
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hub-title", { y: 60, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".hub-subtitle", { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".hub-card", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white px-6 py-20">
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Rajdhani:wght@400;500;600;700&family=Noto+Serif+JP:wght@200;300;400&family=Audiowide&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-6xl mx-auto">
        <h1 className="hub-title text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: "'Inter', system-ui" }}>
          Vault<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #39FF14, #00f0ff, #ff2d95)" }}>Drop</span>
        </h1>
        <p className="hub-subtitle text-lg md:text-xl text-zinc-400 mb-20 max-w-2xl" style={{ fontFamily: "'Inter', system-ui", fontWeight: 300 }}>
          5 completely unique design renditions for a secure file transfer landing page.
          Each crafted with its own visual identity, typography, layout, and motion design.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renditions.map((r) => (
            <Link
              key={r.id}
              href={`/${r.id}`}
              className="hub-card group block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl relative"
              style={{ border: `1px solid ${r.accent}20` }}
            >
              {/* Card preview area */}
              <div
                className="p-6 pb-8 relative overflow-hidden"
                style={{ background: r.bg, minHeight: "180px" }}
              >
                {/* Unique decorative elements per style */}
                {r.style === "brutalist" && (
                  <>
                    <div className="absolute top-0 right-0 w-full h-full opacity-[0.04]" style={{
                      backgroundImage: "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }} />
                    <div className="absolute top-3 right-3 text-[8px] text-[#39FF14]/40 font-bold tracking-widest" style={{ fontFamily: r.font }}>
                      #001
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#39FF14]" />
                  </>
                )}
                {r.style === "luxury" && (
                  <>
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 rounded-full border border-[#B8860B]/15 hidden sm:block" />
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 w-16 h-16 rounded-full border border-[#B8860B]/10 hidden sm:block" />
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#B8860B]/20" />
                  </>
                )}
                {r.style === "cyberpunk" && (
                  <>
                    <div className="absolute inset-0 opacity-[0.06]" style={{
                      backgroundImage: "linear-gradient(rgba(0,240,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,200,0.2) 1px, transparent 1px)",
                      backgroundSize: "30px 30px",
                    }} />
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                    <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(90deg, #00f0ff, #ff00c8, #7000ff)" }} />
                  </>
                )}
                {r.style === "zen" && (
                  <>
                    <div className="absolute top-1/2 right-8 -translate-y-1/2 text-6xl text-[#D4C5B0]/15 select-none hidden sm:block" style={{ fontFamily: r.font }}>
                      安
                    </div>
                    <div className="absolute bottom-0 left-6 right-6 h-[1px] bg-[#D4C5B0]/30" />
                  </>
                )}
                {r.style === "synthwave" && (
                  <>
                    <div className="absolute bottom-0 left-0 right-0 h-16 opacity-20" style={{
                      background: "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
                      backgroundSize: "20px 10px",
                      transform: "perspective(200px) rotateX(60deg)",
                      transformOrigin: "bottom",
                    }} />
                    <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #ff2d95, #7b2dff, #00d4ff)" }} />
                  </>
                )}

                {/* Number badge */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold mb-4 relative z-10"
                  style={{
                    backgroundColor: r.accent,
                    color: r.bg,
                    boxShadow: `0 0 15px ${r.accent}40`,
                  }}
                >
                  {r.id}
                </div>

                {/* Tagline */}
                <div
                  className="text-[9px] tracking-[0.2em] mb-2 relative z-10 opacity-60"
                  style={{ fontFamily: r.font, color: r.accent }}
                >
                  {r.tagline}
                </div>

                {/* Title */}
                <h2
                  className="text-xl font-semibold relative z-10 group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: r.font, color: r.textColor }}
                >
                  {r.name}
                </h2>
              </div>

              {/* Description area */}
              <div className="px-6 py-4 bg-[#111] border-t border-zinc-800/50">
                <p className="text-xs text-zinc-500 leading-relaxed" style={{ fontFamily: "'Inter', system-ui" }}>
                  {r.desc}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-medium group-hover:gap-3 transition-all" style={{ color: r.accent }}>
                  <span>View Rendition</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
