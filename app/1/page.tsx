"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GlitchText({ text, className = "", style = {} }: { text: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const glitch = () => {
      el.style.textShadow = `${Math.random() * 4 - 2}px 0 #ff0040, ${Math.random() * 4 - 2}px 0 #00ff9f`;
      setTimeout(() => {
        el.style.textShadow = "none";
      }, 50 + Math.random() * 100);
    };
    const interval = setInterval(glitch, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return <span ref={ref} className={className} style={style}>{text}</span>;
}

function NoiseCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    function drawNoise() {
      if (!ctx || !canvas) return;
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    const interval = setInterval(drawNoise, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1] opacity-40"
      style={{ mixBlendMode: "overlay" }}
    />
  );
}

export default function BrutalistIndustrial() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("00:00:00");
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toTimeString().split(" ")[0]);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered block reveal - harsh, mechanical
      gsap.from(".brut-block", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        stagger: 0.06,
        ease: "steps(8)",
        delay: 0.2,
      });

      gsap.from(".brut-title-char", {
        y: 200,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03,
        ease: "power4.out",
        delay: 0.6,
      });

      gsap.from(".brut-meta", {
        x: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        delay: 1,
        ease: "power2.out",
      });

      // Scroll-triggered harsh reveals
      gsap.utils.toArray<HTMLElement>(".brut-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Feature blocks - slide from alternating sides
      gsap.utils.toArray<HTMLElement>(".brut-feature-block").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          x: i % 2 === 0 ? -200 : 200,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        });
      });

      // Counter animation
      gsap.from(".brut-counter", {
        scrollTrigger: { trigger: ".brut-stats", start: "top 80%" },
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        ease: "power1.inOut",
      });

      // Horizontal scroll for trust section
      gsap.to(".brut-scroll-track", {
        scrollTrigger: {
          trigger: ".brut-scroll-section",
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        x: -200,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const titleChars = "VAULTDROP".split("");

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        background: "#1a1a1a",
        color: "#e0e0e0",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Anton&display=swap"
        rel="stylesheet"
      />

      <NoiseCanvas />

      {/* BRUTALIST NAV - asymmetric, raw */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#1a1a1a] border-b-4 border-[#ff0040]">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#ff0040] flex items-center justify-center text-black font-bold text-xs">
              VD
            </div>
            <span className="text-[10px] tracking-[0.5em] text-[#666] uppercase hidden md:block">
              Secure File Transfer Protocol
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-[#00ff9f] font-mono">{time} UTC</span>
            <a
              href="#upload"
              className="bg-[#00ff9f] text-black px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#ff0040] hover:text-white transition-colors duration-100"
            >
              UPLOAD NOW
            </a>
          </div>
        </div>
      </nav>

      {/* HERO - Massive typography, broken grid */}
      <section className="min-h-screen relative z-10 pt-20 overflow-hidden">
        {/* Background blocks */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="brut-block absolute top-16 left-0 w-[40%] h-[60%] bg-[#111] border-r-4 border-[#333]" />
          <div className="brut-block absolute top-[30%] right-0 w-[35%] h-[50%] bg-[#0d0d0d] border-l-4 border-[#ff0040]/20" />
          <div className="brut-block absolute bottom-0 left-[20%] w-[30%] h-[20%] bg-[#ff0040]/5" />
        </div>

        <div className="relative z-10 px-4 md:px-8 pt-16 md:pt-24">
          {/* Metadata strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8 md:mb-12 text-[10px] text-[#666] tracking-[0.2em] uppercase">
            <span className="brut-meta">REF: VD-2026-001</span>
            <span className="brut-meta">STATUS: <span className="text-[#00ff9f]">■</span> OPERATIONAL</span>
            <span className="brut-meta">PROTOCOL: AES-256-GCM</span>
            <span className="brut-meta">CLEARANCE: PUBLIC</span>
          </div>

          {/* Main title - massive, overlapping */}
          <div className="relative mb-8">
            <h1
              className="text-[15vw] md:text-[12vw] leading-[0.85] font-black uppercase tracking-tighter"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              <div className="overflow-hidden">
                {titleChars.map((char, i) => (
                  <span
                    key={i}
                    className="brut-title-char inline-block"
                    style={{
                      color: i === 5 ? "#ff0040" : i > 5 ? "#00ff9f" : "#e0e0e0",
                      WebkitTextStroke: i > 5 ? "2px #00ff9f" : "none",
                      ...(i > 5 ? { color: "transparent" } : {}),
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            </h1>
            {/* Overlapping accent line */}
            <div className="absolute bottom-[20%] left-0 w-full h-1 bg-[#ff0040]/30" />
          </div>

          {/* Subtext in a raw box */}
          <div className="max-w-xl border-l-4 border-[#ff0040] pl-4 md:pl-6 mb-12">
            <p className="text-sm md:text-base leading-relaxed text-[#999]">
              Zero-knowledge encrypted file transfer.
              <br />
              No accounts. No tracking. No compromise.
              <br />
              <span className="text-[#00ff9f]">Your files never touch our servers unencrypted.</span>
            </p>
          </div>

          {/* CTA - raw, industrial button */}
          <div className="flex flex-wrap gap-4 mb-16">
            <a
              href="#features"
              className="group relative inline-block bg-[#ff0040] text-white px-8 py-4 text-xs font-bold tracking-[0.3em] uppercase overflow-hidden"
            >
              <span className="relative z-10">EXPLORE SYSTEM ↓</span>
              <div className="absolute inset-0 bg-[#00ff9f] translate-y-full group-hover:translate-y-0 transition-transform duration-200" />
              <span className="absolute inset-0 flex items-center justify-center text-black font-bold tracking-[0.3em] uppercase text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-200 z-20">
                EXPLORE SYSTEM ↓
              </span>
            </a>
            <a
              href="#upload"
              className="inline-block border-2 border-[#444] text-[#999] px-8 py-4 text-xs font-bold tracking-[0.3em] uppercase hover:border-[#00ff9f] hover:text-[#00ff9f] transition-all duration-200"
            >
              SKIP TO UPLOAD
            </a>
          </div>
        </div>

        {/* Decorative grid overlay */}
        <div className="absolute bottom-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] pointer-events-none opacity-10 z-0">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} stroke="#ff0040" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="400" stroke="#ff0040" strokeWidth="0.5" />
            ))}
          </svg>
        </div>
      </section>

      {/* STATS BAR - Industrial data strip */}
      <section className="brut-stats relative z-10 bg-[#ff0040] text-black py-6 border-y-4 border-black">
        <div className="flex flex-wrap justify-around gap-4 px-4 text-center">
          {[
            { label: "FILES TRANSFERRED", value: "2.4M+" },
            { label: "ENCRYPTION STANDARD", value: "AES-256" },
            { label: "UPTIME", value: "99.97%" },
            { label: "MAX FILE SIZE", value: "5GB" },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-2xl md:text-3xl font-black" style={{ fontFamily: "'Anton', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase opacity-70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES - Asymmetric stacked blocks */}
      <section id="features" className="relative z-10 py-20 md:py-32">
        <div className="px-4 md:px-8">
          <div className="brut-reveal mb-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[4px] bg-[#ff0040]" />
              <span className="text-[10px] tracking-[0.5em] text-[#666] uppercase">System Capabilities</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-black uppercase mt-4 tracking-tight"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              <GlitchText text="WHAT WE" /> <span className="text-[#ff0040]">DO</span>
            </h2>
          </div>

          <div className="space-y-2">
            {[
              {
                num: "001",
                title: "DRAG. DROP. DONE.",
                desc: "No forms. No wizards. No bullshit. Throw your files at the screen and we handle the rest. Any file type. Up to 5GB.",
                accent: "#ff0040",
              },
              {
                num: "002",
                title: "CLIENT-SIDE AES-256",
                desc: "Encryption happens in YOUR browser. Files are scrambled before they ever leave your machine. We literally cannot see your data.",
                accent: "#00ff9f",
              },
              {
                num: "003",
                title: "SELF-DESTRUCTING LINKS",
                desc: "Set a timer. Set a download limit. When conditions are met, the link dies. No traces. No recovery. Gone.",
                accent: "#ff0040",
              },
              {
                num: "004",
                title: "ZERO-KNOWLEDGE SHARING",
                desc: "Generate a link. Send it however you want. We never know who downloads what. Complete anonymity by design.",
                accent: "#00ff9f",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="brut-feature-block group cursor-default"
                onMouseEnter={() => setHoveredFeature(i)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div
                  className="flex flex-col md:flex-row md:items-stretch border-2 transition-all duration-100"
                  style={{
                    borderColor: hoveredFeature === i ? f.accent : "#333",
                    background: hoveredFeature === i ? `${f.accent}08` : "transparent",
                  }}
                >
                  {/* Number block */}
                  <div
                    className="w-full md:w-24 flex-shrink-0 flex items-center justify-center py-4 md:py-8 text-2xl font-black"
                    style={{
                      fontFamily: "'Anton', sans-serif",
                      background: f.accent,
                      color: "#000",
                    }}
                  >
                    {f.num}
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8">
                    <h3
                      className="text-xl md:text-2xl font-black uppercase mb-3 tracking-tight transition-colors duration-100"
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        color: hoveredFeature === i ? f.accent : "#e0e0e0",
                      }}
                    >
                      {f.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#888] leading-relaxed max-w-xl">{f.desc}</p>
                  </div>
                  {/* Arrow */}
                  <div className="hidden md:flex items-center px-8 text-[#333] group-hover:text-[color:var(--a)] transition-colors" style={{ ["--a" as string]: f.accent }}>
                    <span className="text-2xl">→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Numbered concrete blocks */}
      <section className="relative z-10 bg-[#111] border-y-4 border-[#333] py-20 md:py-32">
        <div className="px-4 md:px-8">
          <div className="brut-reveal mb-16">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[4px] bg-[#00ff9f]" />
              <span className="text-[10px] tracking-[0.5em] text-[#666] uppercase">Execution Protocol</span>
            </div>
            <h2
              className="text-4xl md:text-6xl font-black uppercase mt-4 tracking-tight"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              THREE <span className="text-[#00ff9f]">STEPS</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              {
                step: "01",
                title: "UPLOAD",
                desc: "Drag files into the zone. Any format. Up to 5GB. No account needed.",
                accent: "#ff0040",
              },
              {
                step: "02",
                title: "ENCRYPT",
                desc: "AES-256 encryption runs in your browser. Files are locked before upload.",
                accent: "#00ff9f",
              },
              {
                step: "03",
                title: "SHARE",
                desc: "Get a secure link. Set expiry. Set download limits. Send it anywhere.",
                accent: "#ff0040",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="brut-reveal border-2 border-[#333] p-8 md:p-10 relative group hover:bg-[#1a1a1a] transition-colors duration-200"
              >
                <div
                  className="text-[8rem] font-black leading-none absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity"
                  style={{ fontFamily: "'Anton', sans-serif", color: s.accent }}
                >
                  {s.step}
                </div>
                <div
                  className="text-5xl font-black mb-6"
                  style={{ fontFamily: "'Anton', sans-serif", color: s.accent }}
                >
                  {s.step}
                </div>
                <h3
                  className="text-xl font-black uppercase mb-4 tracking-tight"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-xs text-[#888] leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div
                    className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-2xl z-10"
                    style={{ color: s.accent }}
                  >
                    ▶
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD ZONE - Raw, industrial */}
      <section id="upload" className="relative z-10 py-20 md:py-32">
        <div className="px-4 md:px-8 max-w-4xl mx-auto">
          <div className="brut-reveal mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[4px] bg-[#ff0040]" />
              <span className="text-[10px] tracking-[0.5em] text-[#666] uppercase">Upload Interface</span>
            </div>
          </div>

          <div className="brut-reveal border-4 border-dashed border-[#444] bg-[#111] p-8 md:p-16 text-center relative group hover:border-[#ff0040] transition-colors duration-200">
            {/* Corner markers */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#ff0040]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#ff0040]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#ff0040]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#ff0040]" />

            <div className="text-6xl mb-4 opacity-30">⬆</div>
            <h3
              className="text-2xl md:text-3xl font-black uppercase mb-2 tracking-tight"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              <GlitchText text="DROP FILES HERE" />
            </h3>
            <p className="text-[10px] text-[#666] tracking-[0.2em] uppercase mb-8">
              or click to browse • max 5gb per file • any format
            </p>
            <button className="bg-[#ff0040] text-white px-8 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-[#00ff9f] hover:text-black transition-colors duration-100">
              SELECT FILES
            </button>

            {/* Mock upload progress */}
            <div className="mt-12 space-y-3 text-left">
              <div className="border-2 border-[#333] bg-[#0d0d0d] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#ff0040] font-bold">▶</span>
                    <span className="text-xs font-bold">classified_report.pdf</span>
                  </div>
                  <span className="text-[10px] text-[#666]">2.4 MB</span>
                </div>
                <div className="w-full h-2 bg-[#222]">
                  <div className="h-full bg-[#ff0040] w-[73%] relative">
                    <div className="absolute right-0 top-0 h-full w-1 bg-white animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-[#666]">ENCRYPTING...</span>
                  <span className="text-[9px] text-[#ff0040] font-bold">73%</span>
                </div>
              </div>

              <div className="border-2 border-[#00ff9f]/30 bg-[#0d0d0d] p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#00ff9f] font-bold">■</span>
                    <span className="text-xs font-bold">evidence_photos.zip</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#666]">18.7 MB</span>
                    <span className="text-[10px] text-[#00ff9f] font-bold tracking-widest">SECURED ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST - Scrolling ticker */}
      <section className="brut-scroll-section relative z-10 bg-[#0d0d0d] border-y-4 border-[#333] py-16 overflow-hidden">
        <div className="brut-reveal text-center mb-12">
          <h2
            className="text-3xl md:text-5xl font-black uppercase tracking-tight"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            ZERO TRUST. <span className="text-[#ff0040]">TOTAL SECURITY.</span>
          </h2>
          <p className="text-[10px] text-[#666] tracking-[0.3em] uppercase mt-4">
            Every file encrypted before it leaves your browser
          </p>
        </div>

        <div className="brut-scroll-track flex gap-4 px-4 whitespace-nowrap">
          {["AES-256-GCM", "ZERO-KNOWLEDGE", "E2E ENCRYPTED", "SOC 2 TYPE II", "GDPR COMPLIANT", "NO LOGS", "NO TRACKING", "OPEN SOURCE"].map((badge, i) => (
            <div
              key={i}
              className="inline-block border-2 border-[#444] px-6 py-3 text-[10px] font-bold tracking-[0.3em] uppercase hover:border-[#ff0040] hover:text-[#ff0040] hover:bg-[#ff0040]/5 transition-all duration-100 flex-shrink-0"
            >
              [{badge}]
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER - Minimal, industrial */}
      <footer className="relative z-10 border-t-4 border-[#333] px-4 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-6 bg-[#ff0040] flex items-center justify-center text-black font-bold text-[8px]">
                VD
              </div>
              <span className="text-[10px] tracking-[0.5em] text-[#666] uppercase">VaultDrop © 2026</span>
            </div>
            <p className="text-[9px] text-[#444]">All rights reserved. No data stored. No logs kept.</p>
          </div>
          <div className="flex gap-6 text-[10px] text-[#666] tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-[#ff0040] transition-colors duration-100">Privacy</a>
            <a href="#" className="hover:text-[#ff0040] transition-colors duration-100">Terms</a>
            <a href="#" className="hover:text-[#ff0040] transition-colors duration-100">Source</a>
            <a href="#" className="hover:text-[#ff0040] transition-colors duration-100">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
