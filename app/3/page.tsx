"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function HexGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.07]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
            <path d="M28 0L28 -34L0 -50L0 -16L28 0" fill="none" stroke="#00f0ff" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex)" />
      </svg>
    </div>
  );
}

function AnimatedGridLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let offset = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animated horizontal scan line
      const scanY = (offset * 2) % canvas.height;
      const gradient = ctx.createLinearGradient(0, scanY - 2, 0, scanY + 2);
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.15)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 40, canvas.width, 80);

      offset += 0.5;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[1] pointer-events-none" />;
}

function TypewriterText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="animate-pulse text-[#ff2d95]">▊</span>}
    </span>
  );
}

export default function CyberpunkNeon() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Glitch-in hero
      gsap.from(".cyber-hero-title", {
        clipPath: "inset(0 100% 0 0)",
        duration: 0.8,
        delay: 0.5,
        ease: "steps(12)",
      });

      gsap.from(".cyber-hero-sub", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        delay: 1.2,
        ease: "power2.out",
      });

      gsap.from(".cyber-hero-cta", {
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        delay: 1.8,
        ease: "back.out(2)",
      });

      // Neon flicker on accent elements
      gsap.to(".neon-flicker", {
        opacity: 0.7,
        duration: 0.05,
        repeat: 3,
        yoyo: true,
        delay: 2,
        ease: "steps(1)",
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".cyber-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
        });
      });

      // Glassmorphism cards entrance
      gsap.from(".cyber-glass-card", {
        scrollTrigger: { trigger: ".cyber-cards", start: "top 80%" },
        y: 60,
        opacity: 0,
        rotateX: 15,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Steps with connecting line animation
      gsap.from(".cyber-step-line", {
        scrollTrigger: { trigger: ".cyber-steps", start: "top 80%" },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        ease: "power2.inOut",
      });

      gsap.from(".cyber-step", {
        scrollTrigger: { trigger: ".cyber-steps", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.3,
        duration: 0.6,
        ease: "power2.out",
      });

      // Upload zone glow pulse
      gsap.to(".cyber-upload-glow", {
        boxShadow: "0 0 60px rgba(0,240,255,0.2), 0 0 120px rgba(255,45,149,0.1), inset 0 0 60px rgba(0,240,255,0.05)",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Rajdhani', sans-serif",
        background: "#0a0a12",
        color: "#e0e0e8",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&family=Audiowide&family=Share+Tech+Mono&display=swap"
        rel="stylesheet"
      />

      <HexGrid />
      <AnimatedGridLines />

      {/* NAV - Futuristic HUD */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-[#00f0ff]/15">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
              <div className="absolute inset-0 border border-[#00f0ff]/50 rotate-45" />
              <div className="absolute inset-1 border border-[#ff2d95]/50 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-[#00f0ff]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                VD
              </div>
            </div>
            <span
              className="text-sm font-bold tracking-[0.2em]"
              style={{ fontFamily: "'Audiowide', sans-serif", color: "#00f0ff" }}
            >
              VAULTDROP
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-[10px] text-[#00f0ff]/40" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              SYS.STATUS: ONLINE
            </span>
            <a
              href="#upload"
              className="relative px-6 py-2 text-xs font-bold tracking-widest overflow-hidden group"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="relative z-10 text-[#0a0a12]">INIT TRANSFER</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#ff2d95]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d95] to-[#00f0ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Corner cuts */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-[#0a0a12]" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#0a0a12]" style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }} />
            </a>
          </div>
        </div>
      </nav>

      {/* HERO - Cyberpunk HUD layout */}
      <section className="min-h-screen flex items-center relative z-10 px-6 md:px-12 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              {/* HUD decorative elements */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 bg-[#00f0ff] animate-pulse" />
                <span className="text-[10px] tracking-[0.4em] text-[#00f0ff]/60 uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                  <TypewriterText text="SECURE_PROTOCOL :: INITIALIZED" delay={300} speed={25} />
                </span>
              </div>

              <h1 className="cyber-hero-title mb-8">
                <div
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] uppercase tracking-tight"
                  style={{ fontFamily: "'Audiowide', sans-serif" }}
                >
                  <span className="block" style={{ color: "#00f0ff", textShadow: "0 0 40px rgba(0,240,255,0.4), 0 0 80px rgba(0,240,255,0.2)" }}>
                    SECURE
                  </span>
                  <span className="block text-[#e0e0e8]">FILE</span>
                  <span className="block" style={{ color: "#ff2d95", textShadow: "0 0 40px rgba(255,45,149,0.4), 0 0 80px rgba(255,45,149,0.2)" }}>
                    NEXUS
                  </span>
                </div>
              </h1>

              <p className="cyber-hero-sub text-base md:text-lg text-[#8888a0] max-w-lg leading-relaxed mb-10" style={{ fontWeight: 400 }}>
                Next-gen encrypted file transfer. Zero-knowledge architecture.
                Self-destructing links. Your data exists only where you want it.
              </p>

              <div className="cyber-hero-cta flex flex-wrap gap-4">
                <a
                  href="#features"
                  className="neon-flicker relative inline-block px-8 py-4 text-sm font-bold tracking-widest uppercase group overflow-hidden"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  <span className="relative z-10">EXPLORE SYSTEM</span>
                  <div className="absolute inset-0 border border-[#00f0ff] group-hover:border-[#ff2d95] transition-colors duration-300" />
                  <div className="absolute inset-0 bg-[#00f0ff]/5 group-hover:bg-[#ff2d95]/10 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f0ff] to-[#ff2d95] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </a>
              </div>
            </div>

            {/* Right side - HUD display */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="relative">
                {/* Outer ring */}
                <div className="w-80 h-80 mx-auto relative">
                  <div className="absolute inset-0 border border-[#00f0ff]/20 rounded-full animate-spin" style={{ animationDuration: "20s" }} />
                  <div className="absolute inset-4 border border-[#ff2d95]/15 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }} />
                  <div className="absolute inset-8 border border-[#00f0ff]/10 rounded-full" />
                  {/* Center content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-[#00f0ff]" style={{ fontFamily: "'Audiowide', sans-serif", textShadow: "0 0 20px rgba(0,240,255,0.5)" }}>
                        256
                      </div>
                      <div className="text-[10px] text-[#00f0ff]/60 tracking-[0.3em] uppercase mt-1" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                        BIT ENCRYPTION
                      </div>
                    </div>
                  </div>
                  {/* Data points */}
                  {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-[#00f0ff] rounded-full"
                      style={{
                        top: `${50 + 45 * Math.sin((deg * Math.PI) / 180)}%`,
                        left: `${50 + 45 * Math.cos((deg * Math.PI) / 180)}%`,
                        boxShadow: "0 0 10px rgba(0,240,255,0.8)",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Glassmorphism cards */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="cyber-reveal mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-[#00f0ff] to-[#ff2d95]" />
              <span className="text-[10px] tracking-[0.4em] text-[#ff2d95] uppercase" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
                SYSTEM.CAPABILITIES
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              <span className="text-[#00f0ff]">CORE</span> MODULES
            </h2>
          </div>

          <div className="cyber-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "⬆",
                title: "UPLOAD NEXUS",
                desc: "Drag-and-drop interface with real-time encryption visualization. Any file, up to 5GB.",
                color: "#00f0ff",
                gradient: "from-[#00f0ff]/10 to-transparent",
              },
              {
                icon: "🔐",
                title: "CIPHER ENGINE",
                desc: "AES-256-GCM encryption runs client-side. Your data is scrambled before transmission.",
                color: "#ff2d95",
                gradient: "from-[#ff2d95]/10 to-transparent",
              },
              {
                icon: "⏱",
                title: "TEMPORAL LOCK",
                desc: "Configure self-destruct timers and download limits. Links expire on your terms.",
                color: "#a855f7",
                gradient: "from-[#a855f7]/10 to-transparent",
              },
              {
                icon: "🔗",
                title: "LINK FORGE",
                desc: "Generate secure distribution links in milliseconds. Share across any channel.",
                color: "#00f0ff",
                gradient: "from-[#00f0ff]/10 to-transparent",
              },
            ].map((f, i) => (
              <div
                key={i}
                className={`cyber-glass-card relative p-6 backdrop-blur-xl border border-white/5 bg-gradient-to-b ${f.gradient} group hover:border-[color:var(--c)]/30 transition-all duration-500 overflow-hidden`}
                style={{ ["--c" as string]: f.color }}
              >
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[color:var(--c)] to-transparent opacity-50" />

                <div className="text-2xl mb-4 opacity-80">{f.icon}</div>
                <h3
                  className="text-sm font-bold mb-3 tracking-wider group-hover:text-[color:var(--c)] transition-colors duration-300"
                  style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-[#6666880] leading-relaxed" style={{ fontWeight: 400, color: "#666688" }}>
                  {f.desc}
                </p>

                {/* Corner decoration */}
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r opacity-20 group-hover:opacity-40 transition-opacity" style={{ borderColor: f.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Connected nodes */}
      <section className="cyber-steps relative z-10 px-6 md:px-12 py-24 border-t border-[#00f0ff]/10">
        <div className="max-w-6xl mx-auto">
          <div className="cyber-reveal mb-16 text-center">
            <span className="text-[10px] tracking-[0.4em] text-[#ff2d95] uppercase block mb-4" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              EXECUTION.FLOW
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              <span className="text-[#00f0ff]">TRANSFER</span> PROTOCOL
            </h2>
          </div>

          {/* Connecting line */}
          <div className="hidden md:block relative mb-8">
            <div className="cyber-step-line absolute top-1/2 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-[#00f0ff] via-[#ff2d95] to-[#a855f7]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "UPLOAD", desc: "Initialize file transfer. Drag or select files for processing through the nexus.", color: "#00f0ff" },
              { num: "02", title: "ENCRYPT", desc: "AES-256-GCM cipher applied client-side. Files encrypted in your browser.", color: "#ff2d95" },
              { num: "03", title: "DISTRIBUTE", desc: "Secure link generated with temporal parameters. Share across any network.", color: "#a855f7" },
            ].map((s, i) => (
              <div key={i} className="cyber-step text-center relative">
                {/* Node circle */}
                <div className="w-16 h-16 mx-auto mb-6 relative">
                  <div className="absolute inset-0 border-2 rounded-full" style={{ borderColor: s.color, boxShadow: `0 0 20px ${s.color}40` }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-bold" style={{ fontFamily: "'Audiowide', sans-serif", color: s.color }}>
                      {s.num}
                    </span>
                  </div>
                </div>
                <h3
                  className="text-lg font-bold mb-3 tracking-wider"
                  style={{ fontFamily: "'Rajdhani', sans-serif", color: s.color, textShadow: `0 0 20px ${s.color}30` }}
                >
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#666688" }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD INTERFACE */}
      <section id="upload" className="relative z-10 px-6 md:px-12 py-24 border-t border-[#00f0ff]/10">
        <div className="max-w-4xl mx-auto">
          <div className="cyber-reveal mb-12 text-center">
            <span className="text-[10px] tracking-[0.4em] text-[#ff2d95] uppercase block mb-4" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              UPLOAD.INTERFACE
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              <span className="text-[#00f0ff]">FILE</span> NEXUS
            </h2>
          </div>

          <div className="cyber-reveal cyber-upload-glow relative border border-[#00f0ff]/20 bg-[#0d0d18]/80 backdrop-blur-xl p-10 md:p-16 text-center overflow-hidden">
            {/* Animated corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]/60" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00f0ff]/60" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#ff2d95]/60" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#ff2d95]/60" />

            {/* Scan line effect */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/20 to-transparent animate-pulse" style={{ top: "30%" }} />
            </div>

            <div className="text-5xl mb-4 opacity-60">⬆</div>
            <p
              className="text-lg font-bold mb-2 tracking-wider"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#00f0ff" }}
            >
              DROP FILES TO UPLOAD
            </p>
            <p className="text-xs mb-8" style={{ color: "#666688", fontFamily: "'Share Tech Mono', monospace" }}>
              drag & drop // click to browse // max 5GB
            </p>
            <button
              className="relative px-8 py-3 text-xs font-bold tracking-widest overflow-hidden group"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span className="relative z-10 text-[#0a0a12]">SELECT FILES</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#ff2d95]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#ff2d95] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Mock terminal output */}
            <div className="mt-12 text-left space-y-2" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              <div className="border border-[#00f0ff]/10 bg-[#0a0a12] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#00f0ff]">secret_project.zip</span>
                  <span className="text-[10px] text-[#666688]">34.2 MB</span>
                </div>
                <div className="w-full h-1 bg-[#1a1a2e] overflow-hidden rounded-full">
                  <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-[#00f0ff] to-[#ff2d95] relative">
                    <div className="absolute right-0 top-0 h-full w-4 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-[#666688]">ENCRYPTING → UPLOADING</span>
                  <span className="text-[9px] text-[#00f0ff]">68%</span>
                </div>
              </div>
              <div className="border border-[#a855f7]/20 bg-[#0a0a12] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#a855f7]">credentials.pdf</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#666688]">2.1 MB</span>
                    <span className="text-[10px] text-[#00ff88] font-bold">✓ SECURED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY PROTOCOLS */}
      <section className="relative z-10 px-6 md:px-12 py-24 border-t border-[#00f0ff]/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="cyber-reveal mb-12">
            <h2
              className="text-2xl md:text-4xl font-bold uppercase tracking-tight"
              style={{ fontFamily: "'Audiowide', sans-serif" }}
            >
              <span className="text-[#00f0ff]" style={{ textShadow: "0 0 20px rgba(0,240,255,0.3)" }}>SECURITY</span>{" "}
              <span className="text-[#ff2d95]" style={{ textShadow: "0 0 20px rgba(255,45,149,0.3)" }}>MATRIX</span>
            </h2>
          </div>
          <div className="cyber-reveal flex flex-wrap justify-center gap-3">
            {[
              { label: "AES-256-GCM", color: "#00f0ff" },
              { label: "ZERO-KNOWLEDGE", color: "#ff2d95" },
              { label: "E2E ENCRYPTED", color: "#a855f7" },
              { label: "SOC 2 TYPE II", color: "#00f0ff" },
              { label: "GDPR COMPLIANT", color: "#ff2d95" },
            ].map((badge, i) => (
              <div
                key={i}
                className="relative px-6 py-3 text-[10px] font-bold tracking-[0.2em] border backdrop-blur-sm hover:scale-105 transition-all duration-300 group"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  borderColor: `${badge.color}30`,
                  color: badge.color,
                }}
              >
                <span className="relative z-10">[{badge.label}]</span>
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `${badge.color}08`, boxShadow: `0 0 20px ${badge.color}20` }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-[#00f0ff]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold tracking-[0.2em]" style={{ fontFamily: "'Audiowide', sans-serif", color: "#00f0ff" }}>
              VAULTDROP
            </span>
            <span className="text-[10px] text-[#666688]" style={{ fontFamily: "'Share Tech Mono', monospace" }}>
              // v2.0.26
            </span>
          </div>
          <div className="flex gap-6 text-[10px] tracking-widest" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#666688" }}>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">CONTACT</a>
          </div>
          <span className="text-[10px]" style={{ fontFamily: "'Share Tech Mono', monospace", color: "#444466" }}>
            © 2026 VAULTDROP
          </span>
        </div>
      </footer>
    </div>
  );
}
