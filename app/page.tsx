"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const renditions = [
  {
    id: 1,
    name: "Brutalist Industrial",
    desc: "Raw steel plates, hazard stripes, industrial gauges, and stencil typography. Built for operators.",
    color: "#f59e0b",
    bg: "#1a1a1a",
    font: "Oswald",
    tags: ["Monospace", "Steel", "Hazard"],
  },
  {
    id: 2,
    name: "Luxury Editorial",
    desc: "Gold accents on deep navy, serif typography, curtain reveals, and editorial layouts. Refined elegance.",
    color: "#c9a84c",
    bg: "#0c0f1a",
    font: "Cormorant Garamond",
    tags: ["Serif", "Gold", "Editorial"],
  },
  {
    id: 3,
    name: "Cyberpunk Neon",
    desc: "Neon glows, data rain, glitch effects, terminal interfaces, and clipped corners. Jack in.",
    color: "#00ffff",
    bg: "#050510",
    font: "Orbitron",
    tags: ["Neon", "Terminal", "Glitch"],
  },
  {
    id: 4,
    name: "Minimalist Japanese",
    desc: "Washi paper textures, ink brush strokes, kanji accents, and zen composition. The essential remains.",
    color: "#c53d43",
    bg: "#faf8f5",
    font: "Shippori Mincho",
    tags: ["Zen", "Serif", "Washi"],
    dark: false,
  },
  {
    id: 5,
    name: "Retro Synthwave",
    desc: "Sunset gradients, perspective grids, chrome text, and VHS tracking lines. Pure 80s nostalgia.",
    color: "#ff6ec7",
    bg: "#1a0a2e",
    font: "Righteous",
    tags: ["Gradient", "Retro", "Neon"],
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance
      gsap.from(".hub-badge", { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" });
      gsap.from(".hub-title", { y: 40, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
      gsap.from(".hub-subtitle", { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: "power3.out" });
      gsap.from(".hub-card", {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.6,
        ease: "power3.out",
      });
      gsap.from(".hub-footer", { y: 20, opacity: 0, duration: 0.6, delay: 1.2, ease: "power2.out" });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#08080a] text-white">
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .inter { font-family: 'Inter', system-ui, sans-serif; }
        .card-glow:hover {
          box-shadow: 0 0 40px var(--glow-color, #ffffff11);
        }
      `}</style>

      <div className="inter max-w-6xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 md:mb-24">
          <div className="hub-badge inline-flex items-center gap-2 border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] text-zinc-400 font-medium">5 Design Renditions</span>
          </div>

          <h1 className="hub-title text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
            Vault<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6ec7] via-[#7b2ff7] to-[#00d4ff]">Drop</span>
          </h1>

          <p className="hub-subtitle text-base md:text-lg text-zinc-500 max-w-xl leading-relaxed">
            Five completely distinct design systems for a secure file transfer landing page.
            Different layouts, typography, animations, and visual identities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-4 md:gap-5">
          {renditions.map((r) => (
            <Link
              key={r.id}
              href={`/${r.id}`}
              className="hub-card card-glow group block border border-white/[0.06] rounded-xl overflow-hidden hover:border-white/[0.12] transition-all duration-500"
              style={{ "--glow-color": `${r.color}15` } as React.CSSProperties}
            >
              <div className="flex flex-col md:flex-row">
                {/* Preview swatch */}
                <div
                  className="w-full md:w-48 h-24 md:h-auto flex items-center justify-center relative overflow-hidden shrink-0"
                  style={{ background: r.bg }}
                >
                  <span
                    className="text-3xl md:text-4xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ color: r.color }}
                  >
                    0{r.id}
                  </span>
                  {/* Accent line */}
                  <div
                    className="absolute bottom-0 left-0 w-full h-0.5 opacity-50 group-hover:opacity-100 transition-opacity"
                    style={{ background: r.color }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-base md:text-lg font-semibold group-hover:text-white transition-colors">
                        {r.name}
                      </h2>
                      <div
                        className="w-2 h-2 rounded-full opacity-60"
                        style={{ background: r.color }}
                      />
                    </div>
                    <p className="text-sm text-zinc-500 leading-relaxed mb-3">{r.desc}</p>
                    <div className="flex gap-2">
                      {r.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/[0.06] text-zinc-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.06] group-hover:border-white/20 group-hover:bg-white/[0.03] transition-all duration-300 shrink-0">
                    <span className="text-zinc-600 group-hover:text-white transition-colors text-sm">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="hub-footer mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-zinc-700">© 2026 VaultDrop. Design exploration.</span>
          <div className="flex items-center gap-2 text-[11px] text-zinc-600">
            <span>Built with</span>
            <span className="text-zinc-400">Next.js</span>
            <span>+</span>
            <span className="text-zinc-400">GSAP</span>
            <span>+</span>
            <span className="text-zinc-400">Tailwind</span>
          </div>
        </div>
      </div>
    </div>
  );
}
