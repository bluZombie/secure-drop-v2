"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function GlitchText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const glitch = () => {
      const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";
      const original = text;
      let iterations = 0;
      const interval = setInterval(() => {
        el.textContent = original
          .split("")
          .map((char, i) => {
            if (i < iterations) return original[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        iterations += 1 / 2;
        if (iterations >= original.length) {
          clearInterval(interval);
          el.textContent = original;
        }
      }, 30);
    };
    const timeout = setTimeout(glitch, 500);
    return () => clearTimeout(timeout);
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
}

export default function BrutalistIndustrial() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState("00:00:00");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toTimeString().split(" ")[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Harsh staggered grid reveal
      gsap.from(".brutal-block", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".brutal-hero-text", {
        x: -200,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".brutal-counter", {
        textContent: 0,
        duration: 2,
        snap: { textContent: 1 },
        delay: 1,
      });

      // Scroll-triggered harsh reveals
      gsap.utils.toArray<HTMLElement>(".brutal-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.6,
          ease: "power4.out",
        });
      });

      // Feature blocks slam in
      gsap.from(".brutal-feature", {
        scrollTrigger: { trigger: ".brutal-features", start: "top 85%" },
        y: 100,
        rotation: () => gsap.utils.random(-3, 3),
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power4.out",
      });

      // Marquee
      gsap.to(".brutal-marquee-inner", {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Glitch flicker on accent elements
      gsap.to(".brutal-flicker", {
        opacity: 0.7,
        duration: 0.05,
        repeat: -1,
        yoyo: true,
        repeatDelay: gsap.utils.random(2, 5),
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="noise-overlay"
      style={{
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        background: "#0a0a0a",
        color: "#e0e0e0",
        minHeight: "100vh",
        cursor: "crosshair",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Anton&display=swap"
        rel="stylesheet"
      />

      {/* Custom cursor trail */}
      <div
        className="fixed w-4 h-4 border border-[#39FF14] pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePos.x - 8,
          top: mousePos.y - 8,
          transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* HARSH GRID NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0a] border-b border-[#39FF14]">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4">
            <div className="bg-[#39FF14] text-black px-2 py-1 text-[10px] font-bold tracking-widest">
              VAULTDROP
            </div>
            <span className="text-[10px] text-[#39FF14]/50 hidden md:block">SYS.TIME: {time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-zinc-600 hidden md:block">STATUS: OPERATIONAL</span>
            <div className="w-2 h-2 bg-[#39FF14] animate-pulse" />
            <a
              href="#upload"
              className="bg-[#39FF14] text-black px-3 py-1 text-[10px] font-bold tracking-widest hover:bg-[#ff3333] transition-colors"
            >
              INIT_TRANSFER
            </a>
          </div>
        </div>
        {/* Grid ruler */}
        <div className="h-[1px] w-full" style={{ background: "repeating-linear-gradient(90deg, #39FF14 0px, #39FF14 1px, transparent 1px, transparent 20px)" }} />
      </nav>

      {/* HERO — Asymmetric brutal layout */}
      <section className="min-h-screen pt-16 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `
            linear-gradient(#39FF14 1px, transparent 1px),
            linear-gradient(90deg, #39FF14 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }} />

        <div className="grid grid-cols-12 min-h-screen">
          {/* Left column — data strip */}
          <div className="col-span-1 border-r border-zinc-800 hidden md:flex flex-col justify-between py-8 px-2">
            <div className="text-[8px] text-zinc-600 writing-vertical-lr rotate-180 tracking-[0.3em]" style={{ writingMode: "vertical-lr" }}>
              SECURE_FILE_TRANSFER_PROTOCOL_V2.1
            </div>
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="brutal-block h-4 bg-[#39FF14]" style={{ width: `${Math.random() * 100}%`, opacity: 0.1 + Math.random() * 0.3 }} />
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center px-6 md:px-12 py-20">
            <div className="brutal-hero-text text-[10px] text-[#39FF14] tracking-[0.5em] mb-6 font-bold">
              [ PROTOCOL ACTIVE ]
            </div>

            <h1 className="brutal-hero-text mb-4" style={{ fontFamily: "'Anton', sans-serif" }}>
              <span className="block text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.85] text-white uppercase">
                <GlitchText text="DROP" />
              </span>
              <span className="block text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.85] text-white uppercase">
                <GlitchText text="FILES" />
              </span>
              <span className="block text-[4rem] md:text-[7rem] lg:text-[9rem] leading-[0.85] uppercase">
                <span className="brutal-flicker" style={{ color: "#39FF14", textShadow: "0 0 40px #39FF1480, 0 0 80px #39FF1440" }}>
                  <GlitchText text="NOW." />
                </span>
              </span>
            </h1>

            <div className="brutal-hero-text flex items-center gap-4 mt-8 mb-12">
              <div className="h-[2px] w-16 bg-[#39FF14]" />
              <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                Zero-knowledge encrypted transfers. No accounts. No tracking. No bullshit.
                Your files get AES-256 encrypted client-side before they touch our servers.
              </p>
            </div>

            <div className="brutal-hero-text flex gap-3">
              <a
                href="#features"
                className="border-2 border-[#39FF14] text-[#39FF14] px-6 py-3 text-[11px] font-bold tracking-[0.2em] hover:bg-[#39FF14] hover:text-black transition-all duration-150"
              >
                EXPLORE_SYS ↓
              </a>
              <a
                href="#upload"
                className="bg-white text-black px-6 py-3 text-[11px] font-bold tracking-[0.2em] hover:bg-[#ff3333] hover:text-white transition-all duration-150"
              >
                UPLOAD_NOW →
              </a>
            </div>
          </div>

          {/* Right column — stats */}
          <div className="col-span-3 border-l border-zinc-800 hidden md:flex flex-col justify-center px-6 py-20 gap-12">
            {[
              { label: "ENCRYPTION", value: "256", unit: "BIT" },
              { label: "MAX_SIZE", value: "5", unit: "GB" },
              { label: "LATENCY", value: "<50", unit: "MS" },
              { label: "UPTIME", value: "99.9", unit: "%" },
            ].map((stat, i) => (
              <div key={i} className="brutal-block">
                <div className="text-[8px] text-zinc-600 tracking-[0.3em] mb-1">{stat.label}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[#39FF14]">{stat.value}</span>
                  <span className="text-[10px] text-zinc-500">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div className="border-y border-[#39FF14] bg-[#39FF14] overflow-hidden py-2">
        <div className="brutal-marquee-inner flex whitespace-nowrap gap-8">
          {[...Array(20)].map((_, i) => (
            <span key={i} className="text-black text-xs font-bold tracking-[0.3em]">
              ENCRYPTED ◼ SECURE ◼ ZERO-KNOWLEDGE ◼ AES-256 ◼ E2E ◼ NO-LOGS ◼
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES — Harsh grid cards */}
      <section id="features" className="brutal-features px-4 md:px-8 py-20 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="brutal-reveal flex items-center gap-4 mb-12">
            <div className="bg-[#39FF14] w-3 h-3" />
            <h2 className="text-[10px] tracking-[0.5em] font-bold text-zinc-500">SYSTEM_CAPABILITIES</h2>
            <div className="flex-1 h-[1px] bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-zinc-800">
            {[
              {
                id: "001",
                title: "DRAG_&_DROP",
                desc: "Throw files at the interface. We catch everything. No forms, no friction, no patience required.",
                metric: "0.3s",
                metricLabel: "AVG_UPLOAD_INIT",
              },
              {
                id: "002",
                title: "AES-256_ENC",
                desc: "Military-grade encryption happens in your browser. Files are scrambled before they leave your machine.",
                metric: "256",
                metricLabel: "BIT_ENCRYPTION",
              },
              {
                id: "003",
                title: "SELF_DESTRUCT",
                desc: "Set time bombs on your links. They expire, they die, they vanish. No traces left behind.",
                metric: "∞",
                metricLabel: "CONFIG_OPTIONS",
              },
              {
                id: "004",
                title: "INSTANT_LINK",
                desc: "Generate a secure URL in milliseconds. Copy it. Share it. Done. No sign-up walls.",
                metric: "<1s",
                metricLabel: "LINK_GENERATION",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="brutal-feature bg-[#0a0a0a] p-6 md:p-8 group hover:bg-[#111] transition-colors duration-150 relative"
              >
                <div className="absolute top-3 right-3 text-[8px] text-zinc-700 font-bold">#{f.id}</div>
                <div className="text-[8px] text-[#39FF14] tracking-[0.3em] mb-4 font-bold">[{f.id}]</div>
                <h3 className="text-sm font-bold mb-3 group-hover:text-[#39FF14] transition-colors" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.2rem" }}>
                  {f.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">{f.desc}</p>
                <div className="border-t border-zinc-800 pt-4 mt-auto">
                  <div className="text-xl font-bold text-[#39FF14]">{f.metric}</div>
                  <div className="text-[8px] text-zinc-600 tracking-[0.2em]">{f.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Industrial process flow */}
      <section className="brutal-reveal px-4 md:px-8 py-20 bg-[#0d0d0d] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-[#ff3333] w-3 h-3" />
            <h2 className="text-[10px] tracking-[0.5em] font-bold text-zinc-500">EXECUTION_PIPELINE</h2>
            <div className="flex-1 h-[1px] bg-zinc-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { step: "01", title: "INGEST", desc: "Files enter the pipeline. Drag, drop, or select. Any format. Up to 5GB. Raw input accepted.", color: "#39FF14" },
              { step: "02", title: "ENCRYPT", desc: "AES-256 cipher applied client-side. Your browser does the heavy lifting. We never see plaintext.", color: "#ff3333" },
              { step: "03", title: "DEPLOY", desc: "Secure link generated with custom TTL and download caps. Share via any channel. Link self-destructs.", color: "#39FF14" },
            ].map((s, i) => (
              <div key={i} className="brutal-reveal border border-zinc-800 p-8 md:p-10 relative group">
                <div
                  className="text-[8rem] font-bold leading-none absolute top-4 right-4 opacity-[0.03]"
                  style={{ fontFamily: "'Anton', sans-serif" }}
                >
                  {s.step}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 flex items-center justify-center text-black text-xs font-bold" style={{ backgroundColor: s.color }}>
                      {s.step}
                    </div>
                    <div className="h-[1px] flex-1" style={{ background: `linear-gradient(90deg, ${s.color}, transparent)` }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-[#39FF14] transition-colors" style={{ fontFamily: "'Anton', sans-serif" }}>
                    {s.title}
                  </h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{s.desc}</p>
                </div>
                {i < 2 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 z-20 w-6 h-6 bg-[#0d0d0d] border border-zinc-800 items-center justify-center text-[#39FF14] text-xs">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD INTERFACE */}
      <section id="upload" className="px-4 md:px-8 py-20 border-b border-zinc-800">
        <div className="max-w-5xl mx-auto">
          <div className="brutal-reveal flex items-center gap-4 mb-12">
            <div className="bg-[#39FF14] w-3 h-3" />
            <h2 className="text-[10px] tracking-[0.5em] font-bold text-zinc-500">UPLOAD_TERMINAL</h2>
            <div className="flex-1 h-[1px] bg-zinc-800" />
          </div>

          <div className="brutal-reveal border border-zinc-800 bg-[#0d0d0d]">
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-[#111]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff3333]" />
                <div className="w-2 h-2 bg-[#ffbd2e]" />
                <div className="w-2 h-2 bg-[#39FF14]" />
              </div>
              <span className="text-[9px] text-zinc-600">vaultdrop://upload-interface</span>
              <div className="w-2 h-2" />
            </div>

            {/* Upload zone */}
            <div className="p-8 md:p-12 text-center border-b border-dashed border-zinc-700 hover:border-[#39FF14] transition-colors group">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">⬆</div>
              <p className="text-sm font-bold text-[#39FF14] mb-1" style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.5rem" }}>
                DROP_FILES_HERE
              </p>
              <p className="text-[10px] text-zinc-600 mb-6">or click to browse // max 5GB per file // any format</p>
              <button className="border border-[#39FF14] text-[#39FF14] px-6 py-2 text-[10px] font-bold tracking-[0.3em] hover:bg-[#39FF14] hover:text-black transition-all">
                SELECT_FILES
              </button>
            </div>

            {/* Mock terminal output */}
            <div className="p-4 text-[11px] space-y-2">
              <div><span className="text-[#39FF14]">$</span> <span className="text-zinc-400">vaultdrop --encrypt --upload</span></div>
              <div className="text-zinc-600">[SYS] Initializing secure pipeline...</div>
              <div className="flex items-center gap-2">
                <span className="text-white">document.pdf</span>
                <span className="text-zinc-700">|</span>
                <div className="flex-1 h-1 bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#39FF14] w-3/4" />
                </div>
                <span className="text-[#39FF14] text-[10px]">75%</span>
                <span className="text-zinc-600 text-[10px]">2.4MB</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-white">photo_001.png</span>
                <span className="text-zinc-700">|</span>
                <div className="flex-1 h-1 bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-[#39FF14] w-full" />
                </div>
                <span className="text-[#39FF14] text-[10px] font-bold">DONE</span>
                <span className="text-zinc-600 text-[10px]">8.1MB</span>
              </div>
              <div className="text-[#39FF14]">[OK] Encrypted link: https://vault.drop/x7k9m2 — expires in 24h</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY BADGES — Raw industrial strip */}
      <section className="brutal-reveal px-4 md:px-8 py-16 bg-[#0d0d0d] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-[#ff3333] w-3 h-3" />
            <h2 className="text-[10px] tracking-[0.5em] font-bold text-zinc-500">SECURITY_AUDIT</h2>
            <div className="flex-1 h-[1px] bg-zinc-800" />
          </div>

          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold uppercase" style={{ fontFamily: "'Anton', sans-serif" }}>
              ZERO TRUST.{" "}
              <span className="brutal-flicker" style={{ color: "#39FF14", textShadow: "0 0 20px #39FF1460" }}>
                TOTAL SECURITY.
              </span>
            </h3>
            <p className="text-[10px] text-zinc-600 mt-2 tracking-[0.2em]">
              EVERY FILE ENCRYPTED BEFORE IT LEAVES YOUR BROWSER. WE NEVER SEE YOUR DATA.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-[1px] bg-zinc-800">
            {["AES-256", "ZERO-KNOWLEDGE", "E2E ENCRYPTED", "SOC 2 TYPE II", "GDPR COMPLIANT"].map((badge, i) => (
              <div
                key={i}
                className="bg-[#0a0a0a] p-4 text-center hover:bg-[#39FF14] hover:text-black transition-all duration-150 group cursor-crosshair"
              >
                <div className="text-[10px] font-bold tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                  {badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#39FF14] text-black px-2 py-1 text-[8px] font-bold tracking-widest">VAULTDROP</div>
            <span className="text-[8px] text-zinc-700">© 2026 // ALL RIGHTS RESERVED</span>
          </div>
          <div className="flex gap-6 text-[10px] text-zinc-600">
            <a href="#" className="hover:text-[#39FF14] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#39FF14] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#39FF14] transition-colors">STATUS</a>
            <a href="#" className="hover:text-[#39FF14] transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
