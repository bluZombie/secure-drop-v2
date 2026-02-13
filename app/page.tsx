"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const renditions = [
  {
    id: 1,
    name: "Cinematic Noir",
    desc: "Dark, editorial, story-driven. Warm gold on deep black with parallax scroll and vault door animation.",
    color: "#D4A853",
    bg: "#0A0A0A",
    textColor: "#F5F0E8",
    font: "'Playfair Display', serif",
    tags: ["Serif", "Dark", "Parallax", "Editorial"],
  },
  {
    id: 2,
    name: "Swiss Playground",
    desc: "Bright, geometric, grid-based. Bold color blocks with 3D tilt cards and animated counters.",
    color: "#2563EB",
    bg: "#FAFAFA",
    textColor: "#0F172A",
    font: "'Space Mono', monospace",
    tags: ["Monospace", "Bright", "Geometric", "Playful"],
  },
  {
    id: 3,
    name: "Liquid Organic",
    desc: "Soft, flowing, nature-inspired. Morphing blobs, wave dividers, and mesh gradient backgrounds.",
    color: "#2D5A3D",
    bg: "#F4E9D8",
    textColor: "#1B3A2D",
    font: "'Outfit', sans-serif",
    tags: ["Rounded", "Organic", "Soft", "Nature"],
  },
  {
    id: 4,
    name: "Neo-Tokyo Terminal",
    desc: "Cyberpunk hacker aesthetic. Terminal UI with typewriter effect, matrix rain, and neon glow.",
    color: "#00F0FF",
    bg: "#0D0D0D",
    textColor: "#00F0FF",
    font: "'JetBrains Mono', monospace",
    tags: ["Terminal", "Neon", "Cyberpunk", "Dense"],
  },
  {
    id: 5,
    name: "Editorial Luxe",
    desc: "Magazine-style sophistication. Massive typography, horizontal scroll, and magnetic cursor effects.",
    color: "#C45D3E",
    bg: "#F8F6F3",
    textColor: "#1A1A1A",
    font: "'Cormorant Garamond', serif",
    tags: ["Elegant", "Light", "Magazine", "Minimal"],
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hub-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".hub-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });
      gsap.from(".hub-card", {
        y: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.5,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} style={{ background: "#0A0A0A", color: "#fff", minHeight: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .hub-font { font-family: 'Inter', sans-serif; }
        .hub-display { font-family: 'Playfair Display', serif; }

        .hub-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .hub-card:hover {
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-8px);
        }
        .hub-card::before {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        .hub-card:hover::before {
          opacity: 1;
        }
        .hub-card-inner {
          position: relative;
          z-index: 1;
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 100px;
          font-size: 10px;
          letter-spacing: 0.05em;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.4);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        {/* Header */}
        <div className="mb-20">
          <div className="hub-title mb-6">
            <span className="hub-font text-xs tracking-[0.3em] text-white/20 uppercase block mb-4">Design Showcase</span>
            <h1 className="hub-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95]">
              Vault<span className="text-[#D4A853]">Drop</span>
            </h1>
          </div>
          <p className="hub-subtitle hub-font text-base md:text-lg text-white/30 max-w-xl leading-relaxed">
            Five radically different landing page designs for a secure file transfer platform. 
            Each with unique layouts, typography, color palettes, and interactions.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renditions.map((r) => (
            <Link
              key={r.id}
              href={`/${r.id}`}
              className={`hub-card ${r.id === 1 ? "lg:col-span-2 lg:row-span-1" : ""}`}
              style={{
                ["--card-color" as string]: r.color,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${r.color}08, ${r.color}03)` }}
              />
              {/* Preview strip */}
              <div
                className="h-2 w-full"
                style={{ background: `linear-gradient(90deg, ${r.color}, ${r.color}40)` }}
              />
              <div className="hub-card-inner">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                    style={{ background: `${r.color}15`, color: r.color, fontFamily: r.font }}
                  >
                    {r.id}
                  </div>
                  <span className="hub-font text-[10px] tracking-[0.15em] text-white/20 uppercase">Rendition {r.id}</span>
                </div>

                {/* Mini preview */}
                <div
                  className="rounded-lg p-4 mb-6 flex-1 min-h-[120px] flex items-center justify-center"
                  style={{ background: r.bg, border: `1px solid ${r.color}20` }}
                >
                  <span
                    className="text-lg md:text-xl font-bold"
                    style={{ fontFamily: r.font, color: r.textColor }}
                  >
                    VaultDrop
                  </span>
                </div>

                <h2
                  className="hub-font text-lg font-semibold mb-2 text-white"
                >
                  {r.name}
                </h2>
                <p className="hub-font text-xs text-white/30 leading-relaxed mb-4 flex-1">
                  {r.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {r.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="hub-font text-xs text-white/15">© 2026 VaultDrop. All designs are conceptual.</span>
          <span className="hub-font text-xs text-white/15">Built with Next.js, Tailwind CSS & GSAP</span>
        </div>
      </div>
    </div>
  );
}
