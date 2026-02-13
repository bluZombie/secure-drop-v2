"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function NeonText({ children, color = "#00f0ff" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ color, textShadow: `0 0 10px ${color}80, 0 0 40px ${color}40, 0 0 80px ${color}20` }}>
      {children}
    </span>
  );
}

export default function CyberpunkNeon() {
  const mainRef = useRef<HTMLDivElement>(null);
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const [hoverCard, setHoverCard] = useState<number | null>(null);

  // Animated grid lines
  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const spacing = 60;
      const time = frame * 0.005;

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0, 240, 255, ${0.03 + Math.sin(time + y * 0.01) * 0.02})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 0, 200, ${0.02 + Math.sin(time + x * 0.01) * 0.015})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Scanning line
      const scanY = (frame * 0.5) % canvas.height;
      const gradient = ctx.createLinearGradient(0, scanY - 20, 0, scanY + 20);
      gradient.addColorStop(0, "rgba(0, 240, 255, 0)");
      gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.15)");
      gradient.addColorStop(1, "rgba(0, 240, 255, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);

      frame++;
      requestAnimationFrame(draw);
    }
    const animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero glitch entrance
      gsap.from(".cyber-hero-title", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(".cyber-hero-sub", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      });

      gsap.from(".cyber-hero-btn", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        delay: 1.4,
        ease: "back.out(2)",
      });

      // HUD elements
      gsap.from(".cyber-hud", {
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        delay: 0.5,
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".cyber-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Glass cards
      gsap.from(".cyber-glass-card", {
        scrollTrigger: { trigger: ".cyber-features", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // Neon pulse on upload zone
      gsap.to(".cyber-upload-glow", {
        boxShadow: "0 0 60px rgba(0,240,255,0.2), inset 0 0 60px rgba(0,240,255,0.03)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating orbs
      gsap.to(".cyber-orb-1", { y: -20, x: 10, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".cyber-orb-2", { y: 15, x: -15, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".cyber-orb-3", { y: -10, x: -8, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Exo 2', sans-serif",
        background: "#050510",
        color: "#E0E8F0",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700;800;900&family=Rajdhani:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Animated grid canvas */}
      <canvas
        ref={gridCanvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* Floating neon orbs */}
      <div className="cyber-orb-1 fixed top-[20%] left-[10%] w-64 h-64 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="cyber-orb-2 fixed top-[60%] right-[5%] w-80 h-80 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(255,0,200,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      <div className="cyber-orb-3 fixed top-[40%] left-[50%] w-48 h-48 rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(120,0,255,0.05) 0%, transparent 70%)", filter: "blur(30px)" }} />

      {/* NAV — Futuristic HUD */}
      <nav className="fixed top-0 left-0 w-full z-50" style={{ background: "linear-gradient(180deg, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.8) 100%)", backdropFilter: "blur(20px)" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00f0ff, #7000ff)", boxShadow: "0 0 20px rgba(0,240,255,0.3)" }}>
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <span className="text-sm font-bold tracking-[0.1em]" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700 }}>
              <NeonText>VAULT</NeonText><span className="text-white">DROP</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="cyber-hud flex items-center gap-2 text-[10px] text-[#00f0ff]/50">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="cyber-hud text-[10px] text-[#ff00c8]/50">
              NODE: SECURE-01
            </div>
          </div>
          <a
            href="#upload"
            className="cyber-hud px-5 py-2 text-xs font-bold tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Rajdhani', sans-serif",
              background: "linear-gradient(135deg, #00f0ff, #7000ff)",
              color: "#050510",
              boxShadow: "0 0 20px rgba(0,240,255,0.2)",
            }}
          >
            INIT TRANSFER
          </a>
        </div>
        <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #00f0ff30, #ff00c830, transparent)" }} />
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative z-10 px-6 md:px-16 pt-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-3">
              <div className="cyber-hud text-[10px] tracking-[0.4em] text-[#00f0ff]/60 mb-6 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                ◆ NEXT-GEN SECURE TRANSFER PROTOCOL
              </div>

              <h1 className="mb-8" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                <div className="cyber-hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                  <NeonText>SECURE</NeonText> YOUR
                </div>
                <div className="cyber-hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                  FILES IN THE
                </div>
                <div className="cyber-hero-title text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1]">
                  <NeonText color="#ff00c8">NEON</NeonText> <NeonText color="#7000ff">VAULT</NeonText>
                </div>
              </h1>

              <p className="cyber-hero-sub text-base text-[#8090A0] max-w-lg leading-relaxed mb-10" style={{ fontWeight: 300 }}>
                End-to-end encrypted file transfers powered by next-generation cryptography.
                Zero-knowledge architecture. Self-destructing links. No traces left behind.
              </p>

              <div className="cyber-hero-btn flex gap-4">
                <a
                  href="#features"
                  className="px-8 py-3 text-sm font-bold tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    background: "linear-gradient(135deg, #00f0ff, #7000ff)",
                    color: "#050510",
                    boxShadow: "0 0 30px rgba(0,240,255,0.2)",
                  }}
                >
                  EXPLORE SYSTEM ↓
                </a>
                <a
                  href="#upload"
                  className="px-8 py-3 text-sm font-bold tracking-wider rounded-lg border transition-all duration-300 hover:scale-105"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    borderColor: "#ff00c850",
                    color: "#ff00c8",
                    boxShadow: "0 0 20px rgba(255,0,200,0.1)",
                  }}
                >
                  UPLOAD NOW →
                </a>
              </div>
            </div>

            {/* Right — HUD display */}
            <div className="lg:col-span-2 hidden lg:block">
              <div className="relative p-8 rounded-2xl" style={{
                background: "rgba(0,240,255,0.03)",
                border: "1px solid rgba(0,240,255,0.1)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 0 40px rgba(0,240,255,0.05), inset 0 0 40px rgba(0,240,255,0.02)",
              }}>
                {/* HUD corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#00f0ff]/50 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#00f0ff]/50 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#00f0ff]/50 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00f0ff]/50 rounded-br-lg" />

                <div className="space-y-6">
                  <div className="cyber-hud">
                    <div className="text-[9px] text-[#00f0ff]/50 tracking-wider mb-1">ENCRYPTION STATUS</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                      <span className="text-sm text-[#00ff88]" style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 600 }}>AES-256 ACTIVE</span>
                    </div>
                  </div>
                  <div className="cyber-hud">
                    <div className="text-[9px] text-[#ff00c8]/50 tracking-wider mb-1">TRANSFER SPEED</div>
                    <div className="text-2xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      <NeonText color="#ff00c8">847</NeonText> <span className="text-sm text-[#8090A0]">MB/s</span>
                    </div>
                  </div>
                  <div className="cyber-hud">
                    <div className="text-[9px] text-[#7000ff]/70 tracking-wider mb-1">NETWORK NODES</div>
                    <div className="flex gap-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-3 h-6 rounded-sm" style={{
                          background: i < 9 ? "linear-gradient(180deg, #7000ff, #00f0ff)" : "rgba(255,255,255,0.05)",
                          opacity: i < 9 ? 0.6 + (i * 0.04) : 0.3,
                        }} />
                      ))}
                    </div>
                  </div>
                  <div className="cyber-hud">
                    <div className="text-[9px] text-[#00f0ff]/50 tracking-wider mb-1">UPTIME</div>
                    <div className="text-lg font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      <NeonText>99.97</NeonText><span className="text-[#8090A0]">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — Glassmorphism cards */}
      <section id="features" className="cyber-features relative z-10 px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="cyber-reveal text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] text-[#ff00c8]/60 mb-4 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ◆ SYSTEM CAPABILITIES
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <NeonText>Powered</NeonText> by Next-Gen <NeonText color="#ff00c8">Tech</NeonText>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "QUANTUM UPLOAD",
                desc: "Drag-and-drop interface with real-time encryption visualization. Files are processed at the speed of light.",
                icon: "⚡",
                gradient: "linear-gradient(135deg, #00f0ff20, #7000ff10)",
                border: "#00f0ff",
              },
              {
                title: "AES-256 CIPHER",
                desc: "Military-grade encryption applied client-side. Your data is scrambled into an unbreakable cipher before transmission.",
                icon: "🔐",
                gradient: "linear-gradient(135deg, #ff00c820, #7000ff10)",
                border: "#ff00c8",
              },
              {
                title: "TEMPORAL LINKS",
                desc: "Configure self-destructing links with precision timing. Set download limits and expiration windows.",
                icon: "⏳",
                gradient: "linear-gradient(135deg, #7000ff20, #00f0ff10)",
                border: "#7000ff",
              },
              {
                title: "INSTANT DEPLOY",
                desc: "Generate secure shareable links in milliseconds. One-click copy. Zero-friction distribution across any channel.",
                icon: "🚀",
                gradient: "linear-gradient(135deg, #00ff8820, #00f0ff10)",
                border: "#00ff88",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="cyber-glass-card group p-8 rounded-2xl transition-all duration-500 cursor-pointer relative overflow-hidden"
                style={{
                  background: hoverCard === i ? f.gradient : "rgba(255,255,255,0.02)",
                  border: `1px solid ${hoverCard === i ? f.border + "50" : "rgba(255,255,255,0.05)"}`,
                  backdropFilter: "blur(20px)",
                  boxShadow: hoverCard === i ? `0 0 40px ${f.border}15` : "none",
                }}
                onMouseEnter={() => setHoverCard(i)}
                onMouseLeave={() => setHoverCard(null)}
              >
                <div className="text-3xl mb-5">{f.icon}</div>
                <h3 className="text-lg font-bold mb-3 transition-colors duration-300" style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: hoverCard === i ? f.border : "#E0E8F0",
                  textShadow: hoverCard === i ? `0 0 20px ${f.border}40` : "none",
                }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#8090A0] leading-relaxed" style={{ fontWeight: 300 }}>
                  {f.desc}
                </p>
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 opacity-10" style={{
                  background: `radial-gradient(circle at top right, ${f.border}, transparent)`,
                }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="cyber-reveal text-center mb-20">
            <p className="text-[10px] tracking-[0.4em] text-[#7000ff]/80 mb-4 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ◆ EXECUTION FLOW
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              Three <NeonText color="#7000ff">Phases</NeonText> to Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "UPLOAD", desc: "Initialize file transfer. Drag or select files for quantum processing.", color: "#00f0ff" },
              { step: "02", title: "ENCRYPT", desc: "AES-256 cipher applied in your browser. Zero-knowledge guarantee.", color: "#ff00c8" },
              { step: "03", title: "DEPLOY", desc: "Secure link generated with custom TTL. Share across any channel.", color: "#7000ff" },
            ].map((s, i) => (
              <div key={i} className="cyber-reveal text-center relative">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center relative" style={{
                  background: `${s.color}10`,
                  border: `1px solid ${s.color}30`,
                  boxShadow: `0 0 30px ${s.color}10`,
                }}>
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif", color: s.color, textShadow: `0 0 20px ${s.color}60` }}>
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Rajdhani', sans-serif", color: s.color, textShadow: `0 0 15px ${s.color}30` }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[#8090A0] leading-relaxed" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-10 -right-4 text-xl" style={{ color: `${s.color}40` }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD INTERFACE */}
      <section id="upload" className="relative z-10 px-6 md:px-16 py-28">
        <div className="max-w-4xl mx-auto">
          <div className="cyber-reveal text-center mb-16">
            <p className="text-[10px] tracking-[0.4em] text-[#00f0ff]/60 mb-4 font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              ◆ UPLOAD INTERFACE
            </p>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              The <NeonText>Neon</NeonText> Gateway
            </h2>
          </div>

          <div className="cyber-reveal cyber-upload-glow rounded-2xl p-10 md:p-14 text-center relative overflow-hidden" style={{
            background: "rgba(0,240,255,0.02)",
            border: "1px solid rgba(0,240,255,0.15)",
            backdropFilter: "blur(20px)",
          }}>
            {/* HUD corners */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#00f0ff]/30 rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#00f0ff]/30 rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#00f0ff]/30 rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#00f0ff]/30 rounded-br-lg" />

            <div className="text-4xl mb-4">
              <NeonText>⬆</NeonText>
            </div>
            <p className="text-xl font-bold mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <NeonText>DROP FILES</NeonText> TO UPLOAD
            </p>
            <p className="text-xs text-[#8090A0] mb-8">or click to browse • max 5GB per file</p>
            <button
              className="px-8 py-3 text-xs font-bold tracking-wider rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                background: "linear-gradient(135deg, #ff00c8, #7000ff)",
                color: "white",
                boxShadow: "0 0 25px rgba(255,0,200,0.2)",
              }}
            >
              SELECT FILES
            </button>

            {/* Mock transfer display */}
            <div className="mt-10 space-y-3 text-left">
              <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: "rgba(0,240,255,0.03)", border: "1px solid rgba(0,240,255,0.08)" }}>
                <div>
                  <p className="text-sm font-medium">secret-project.zip</p>
                  <p className="text-[10px] text-[#8090A0]">34.2 MB</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded-full w-[78%]" style={{ background: "linear-gradient(90deg, #00f0ff, #7000ff)" }} />
                  </div>
                  <span className="text-xs" style={{ color: "#00f0ff" }}>78%</span>
                </div>
              </div>
              <div className="p-4 rounded-xl flex items-center justify-between" style={{ background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.08)" }}>
                <div>
                  <p className="text-sm font-medium">credentials.pdf</p>
                  <p className="text-[10px] text-[#8090A0]">2.1 MB</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  <span className="text-xs text-[#00ff88] font-bold">ENCRYPTED ✓</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative z-10 px-6 md:px-16 py-28">
        <div className="max-w-6xl mx-auto text-center">
          <div className="cyber-reveal mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <NeonText>SECURITY</NeonText> PROTOCOLS <NeonText color="#ff00c8">ACTIVE</NeonText>
            </h2>
            <p className="text-sm text-[#8090A0] max-w-md mx-auto">
              All systems verified. All connections encrypted. Zero-knowledge guaranteed.
            </p>
          </div>

          <div className="cyber-reveal flex flex-wrap justify-center gap-4">
            {[
              { label: "AES-256", color: "#00f0ff" },
              { label: "ZERO-KNOWLEDGE", color: "#ff00c8" },
              { label: "E2E ENCRYPTED", color: "#7000ff" },
              { label: "SOC 2", color: "#00ff88" },
              { label: "GDPR", color: "#00f0ff" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-6 py-3 rounded-xl text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  background: `${badge.color}08`,
                  border: `1px solid ${badge.color}25`,
                  color: badge.color,
                  textShadow: `0 0 10px ${badge.color}30`,
                }}
              >
                ◆ {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-16 py-10">
        <div className="h-[1px] mb-10" style={{ background: "linear-gradient(90deg, transparent, #00f0ff20, #ff00c820, transparent)" }} />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, #00f0ff, #7000ff)" }}>
              <span className="text-white text-[8px] font-bold">V</span>
            </div>
            <span className="text-xs text-[#8090A0]">© 2026 VaultDrop</span>
          </div>
          <div className="flex gap-6 text-xs text-[#8090A0]">
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Status</a>
            <a href="#" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
