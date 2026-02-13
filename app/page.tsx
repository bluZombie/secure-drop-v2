"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const renditions = [
  {
    id: 1,
    name: "Brutalist Industrial",
    desc: "Raw concrete textures, monospace type, harsh grid, glitch effects, neon accents on dark",
    bg: "#1a1a1a",
    accent: "#ff0040",
    secondary: "#00ff9f",
    font: "'Anton', sans-serif",
    tagline: "NO COMPROMISE",
    pattern: "brutalist",
  },
  {
    id: 2,
    name: "Luxury Editorial",
    desc: "Serif typography, generous whitespace, subtle gold/cream palette, elegant transitions",
    bg: "#FDFBF7",
    accent: "#8B7355",
    secondary: "#E8E0D4",
    font: "'Cormorant Garamond', serif",
    tagline: "Refined Security",
    pattern: "editorial",
  },
  {
    id: 3,
    name: "Cyberpunk Neon",
    desc: "Dark background, vibrant neon gradients, glassmorphism cards, futuristic HUD elements",
    bg: "#0a0a12",
    accent: "#00f0ff",
    secondary: "#ff2d95",
    font: "'Audiowide', sans-serif",
    tagline: "ENTER THE NEXUS",
    pattern: "cyberpunk",
  },
  {
    id: 4,
    name: "Minimalist Zen",
    desc: "Clean lines, breathing room, muted earth tones, subtle animations, Japanese-inspired calm",
    bg: "#F5F2ED",
    accent: "#8B7355",
    secondary: "#2C2C2C",
    font: "'Noto Serif JP', serif",
    tagline: "静けさ — Stillness",
    pattern: "zen",
  },
  {
    id: 5,
    name: "Retro Synthwave",
    desc: "80s gradient palette, retro grid perspective, CRT scanline effects, bold geometric shapes",
    bg: "#0d0221",
    accent: "#ff2d95",
    secondary: "#00f0ff",
    font: "'Righteous', sans-serif",
    tagline: "RIDE THE GRID",
    pattern: "synthwave",
  },
];

function BrutalistPreview() {
  return (
    <div className="w-full h-full bg-[#1a1a1a] p-4 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-[#ff0040]" />
      <div>
        <div className="text-[8px] tracking-[0.3em] text-[#666] mb-2 font-mono">REF: VD-001</div>
        <div className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Anton', sans-serif" }}>
          VAULT<span className="text-[#ff0040]">DROP</span>
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 bg-[#ff0040] w-3/4" />
        <div className="h-2 bg-[#333] w-1/2" />
        <div className="h-2 bg-[#00ff9f] w-1/3" />
      </div>
      <div className="flex gap-1">
        <div className="border border-[#444] px-2 py-1 text-[6px] text-[#666] font-mono">AES-256</div>
        <div className="border border-[#444] px-2 py-1 text-[6px] text-[#666] font-mono">E2E</div>
      </div>
    </div>
  );
}

function EditorialPreview() {
  return (
    <div className="w-full h-full bg-[#FDFBF7] p-4 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="text-[8px] tracking-[0.3em] text-[#8B7355] mb-2 uppercase">Est. 2026</div>
        <div className="text-xl text-[#1a1a1a] leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
          The Art of<br /><em className="text-[#8B7355]">Secure</em> Transfer
        </div>
      </div>
      <div className="w-12 h-[1px] bg-[#8B7355]/40" />
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-[#F0EBE3] border border-[#E8E0D4]" />
        <div className="w-8 h-8 bg-[#F0EBE3] border border-[#E8E0D4]" />
        <div className="w-8 h-8 bg-[#F0EBE3] border border-[#E8E0D4]" />
      </div>
    </div>
  );
}

function CyberpunkPreview() {
  return (
    <div className="w-full h-full bg-[#0a0a12] p-4 flex flex-col justify-between overflow-hidden relative">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,240,255,0.1) 4px, rgba(0,240,255,0.1) 5px)" }} />
      </div>
      <div className="relative z-10">
        <div className="text-[8px] tracking-[0.3em] text-[#ff2d95] font-mono mb-2">SYS.ONLINE</div>
        <div className="text-xl font-bold text-[#00f0ff] leading-none" style={{ fontFamily: "'Audiowide', sans-serif", textShadow: "0 0 10px rgba(0,240,255,0.5)" }}>
          SECURE
        </div>
        <div className="text-xl font-bold text-[#ff2d95] leading-none" style={{ fontFamily: "'Audiowide', sans-serif", textShadow: "0 0 10px rgba(255,45,149,0.5)" }}>
          NEXUS
        </div>
      </div>
      <div className="relative z-10 flex gap-1">
        <div className="w-3 h-3 rounded-full border border-[#00f0ff]/50" />
        <div className="w-3 h-3 rounded-full border border-[#ff2d95]/50" />
        <div className="w-3 h-3 rounded-full border border-[#a855f7]/50" />
      </div>
    </div>
  );
}

function ZenPreview() {
  return (
    <div className="w-full h-full bg-[#F5F2ED] p-4 flex flex-col justify-between overflow-hidden">
      <div>
        <div className="text-[8px] tracking-[0.3em] text-[#999] mb-2">安全</div>
        <div className="text-xl text-[#2C2C2C] leading-tight" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
          Files flow<br />in <span className="text-[#8B7355]">silence</span>
        </div>
      </div>
      <svg viewBox="0 0 60 60" className="w-12 h-12 opacity-10">
        <circle cx="30" cy="30" r="25" fill="none" stroke="#2C2C2C" strokeWidth="1" />
      </svg>
      <div className="w-8 h-[1px] bg-[#2C2C2C]/10" />
    </div>
  );
}

function SynthwavePreview() {
  return (
    <div className="w-full h-full bg-[#0d0221] p-4 flex flex-col justify-between overflow-hidden relative">
      {/* Mini sun */}
      <div className="absolute top-4 right-4 w-10 h-10 rounded-full" style={{ background: "linear-gradient(180deg, #ff6b9d, #ff2d95, #7c3aed)" }}>
        {[0, 1, 2].map(i => (
          <div key={i} className="absolute left-0 right-0 bg-[#0d0221]" style={{ height: "2px", top: `${55 + i * 15}%` }} />
        ))}
      </div>
      <div>
        <div className="text-xl font-bold leading-none" style={{ fontFamily: "'Righteous', sans-serif", background: "linear-gradient(180deg, #fff, #ff2d95)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          VAULT
        </div>
        <div className="text-xl font-bold leading-none" style={{ fontFamily: "'Righteous', sans-serif", background: "linear-gradient(180deg, #00f0ff, #7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          DROP
        </div>
      </div>
      {/* Mini grid */}
      <div className="flex gap-[2px]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="w-[2px] h-4" style={{ background: `rgba(255,45,149,${0.1 + i * 0.05})` }} />
        ))}
      </div>
    </div>
  );
}

const previews: Record<string, () => React.ReactNode> = {
  brutalist: BrutalistPreview,
  editorial: EditorialPreview,
  cyberpunk: CyberpunkPreview,
  zen: ZenPreview,
  synthwave: SynthwavePreview,
};

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
        stagger: 0.1,
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white px-6 py-16 md:py-24">
      <link
        href="https://fonts.googleapis.com/css2?family=Anton&family=Cormorant+Garamond:ital,wght@0,300;1,300&family=Audiowide&family=Noto+Serif+JP:wght@200&family=Righteous&family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="hub-title flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff0040] via-[#c026d3] to-[#00f0ff] rounded-lg flex items-center justify-center text-black font-bold text-lg">
              V
            </div>
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Vault<span className="bg-gradient-to-r from-[#ff0040] to-[#00f0ff] bg-clip-text text-transparent">Drop</span>
            </h1>
          </div>
          <p
            className="hub-subtitle text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
          >
            5 distinct design renditions for a secure file transfer landing page.
            Each crafted with a unique aesthetic, typography, layout structure, and motion design.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renditions.map((r) => {
            const Preview = previews[r.pattern];
            return (
              <Link
                key={r.id}
                href={`/${r.id}`}
                className="hub-card group block overflow-hidden rounded-xl border border-zinc-800 hover:border-zinc-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              >
                {/* Preview thumbnail */}
                <div className="aspect-[4/3] overflow-hidden relative">
                  <Preview />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium tracking-wider">
                      View Design →
                    </span>
                  </div>
                </div>

                {/* Card info */}
                <div className="p-5 bg-[#111]">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: r.accent, color: r.bg }}
                    >
                      {r.id}
                    </div>
                    <h2
                      className="text-base font-semibold group-hover:text-white transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif", color: r.accent }}
                    >
                      {r.name}
                    </h2>
                  </div>
                  <p
                    className="text-xs text-zinc-500 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", fontWeight: 300 }}
                  >
                    {r.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-xs text-zinc-600" style={{ fontFamily: "'Inter', sans-serif" }}>
            Each rendition communicates VaultDrop&apos;s core value — secure, encrypted file transfer — through its own unique design language.
          </p>
        </div>
      </div>
    </div>
  );
}
