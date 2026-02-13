"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const renditions = [
  { id: 1, name: "Brutalist Vault", desc: "Raw, exposed, high-contrast brutalism with neon accents", color: "#39FF14" },
  { id: 2, name: "Luxury Cipher", desc: "Ultra-refined editorial luxury with gold on deep navy", color: "#D4AF37" },
  { id: 3, name: "Neon Terminal", desc: "Retro-futuristic cyberpunk terminal with neon glow", color: "#00FFFF" },
  { id: 4, name: "Organic Flow", desc: "Soft, nature-inspired design with flowing organic shapes", color: "#E8A87C" },
  { id: 5, name: "Geometric Fortress", desc: "Bold art deco geometry with jewel tones", color: "#50C878" },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".index-title", { y: 60, opacity: 0, duration: 1, ease: "power3.out" });
      gsap.from(".index-subtitle", { y: 40, opacity: 0, duration: 1, delay: 0.2, ease: "power3.out" });
      gsap.from(".rendition-card", {
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
    <div ref={containerRef} className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center px-6 py-20">
      <div className="max-w-4xl w-full">
        <h1 className="index-title text-5xl md:text-7xl font-bold tracking-tight mb-4" style={{ fontFamily: "system-ui" }}>
          Vault<span className="text-[#39FF14]">Drop</span>
        </h1>
        <p className="index-subtitle text-lg md:text-xl text-zinc-400 mb-16 max-w-2xl">
          5 distinct design renditions for a secure file transfer landing page. Each one crafted with a unique aesthetic, typography, and motion design.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {renditions.map((r) => (
            <Link
              key={r.id}
              href={`/${r.id}`}
              className="rendition-card group block p-6 border border-zinc-800 rounded-2xl hover:border-zinc-600 transition-all duration-300 hover:scale-[1.02]"
              style={{ "--accent": r.color } as React.CSSProperties}
            >
              <div
                className="w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-black font-bold text-lg"
                style={{ backgroundColor: r.color }}
              >
                {r.id}
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
                {r.name}
              </h2>
              <p className="text-sm text-zinc-500">{r.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
