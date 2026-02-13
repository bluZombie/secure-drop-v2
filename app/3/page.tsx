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
      gsap.to(el, {
        skewX: gsap.utils.random(-3, 3),
        x: gsap.utils.random(-2, 2),
        duration: 0.05,
        onComplete: () => {
          gsap.to(el, { skewX: 0, x: 0, duration: 0.05 });
        },
      });
    };
    const interval = setInterval(glitch, gsap.utils.random(2000, 5000));
    return () => clearInterval(interval);
  }, []);

  return <span ref={ref} className={`inline-block ${className}`}>{text}</span>;
}

function TypingTerminal({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed((prev) => {
          const newLines = [...prev];
          if (currentLine < lines.length) {
            const line = lines[currentLine];
            if (currentChar <= line.length) {
              newLines[currentLine] = line.slice(0, currentChar);
              setCurrentChar((c) => c + 1);
            }
            if (currentChar > line.length) {
              setCurrentLine((l) => l + 1);
              setCurrentChar(0);
            }
          } else {
            clearInterval(interval);
          }
          return newLines;
        });
      }, 25);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [lines, delay, currentLine, currentChar]);

  return (
    <div className="font-mono text-[11px] leading-relaxed">
      {displayed.map((line, i) => (
        <div key={i} className="flex">
          <span className="text-[#ff2d6a] mr-2">{">"}</span>
          <span className="text-[#0ff]">{line}</span>
          {i === currentLine && <span className="animate-pulse text-[#0ff]">█</span>}
        </div>
      ))}
    </div>
  );
}

export default function CyberpunkNeon() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Boot sequence
      gsap.from(".boot-line", {
        opacity: 0,
        x: -20,
        stagger: 0.1,
        duration: 0.3,
        delay: 0.2,
        ease: "power2.out",
      });

      // Hero neon flicker
      const flickerTl = gsap.timeline({ delay: 1 });
      flickerTl
        .to(".neon-title", { opacity: 0, duration: 0.05 })
        .to(".neon-title", { opacity: 1, duration: 0.05 })
        .to(".neon-title", { opacity: 0, duration: 0.08 })
        .to(".neon-title", { opacity: 0.5, duration: 0.05 })
        .to(".neon-title", { opacity: 1, duration: 0.1 })
        .to(".neon-title", { opacity: 0.7, duration: 0.03 })
        .to(".neon-title", { opacity: 1, duration: 0.2 });

      // Scan line
      gsap.to(".scan-line", {
        top: "100%",
        duration: 4,
        repeat: -1,
        ease: "none",
      });

      // HUD elements
      gsap.from(".hud-element", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        delay: 1.5,
        ease: "back.out(1.7)",
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".cyber-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Data stream
      gsap.to(".data-stream", {
        y: "-50%",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // Hex grid pulse
      gsap.to(".hex-pulse", {
        opacity: 0.6,
        scale: 1.05,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });

      // Feature cards
      gsap.from(".cyber-card", {
        scrollTrigger: { trigger: ".cyber-grid", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Progress bars
      gsap.from(".cyber-progress-fill", {
        scrollTrigger: { trigger: ".cyber-progress-fill", start: "top 90%" },
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="scanlines"
      style={{
        fontFamily: "'Share Tech Mono', 'Courier New', monospace",
        background: "#050510",
        color: "#e0e0e0",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .orbitron { font-family: 'Orbitron', sans-serif; }
        .rajdhani { font-family: 'Rajdhani', sans-serif; }
        .neon-cyan { color: #0ff; text-shadow: 0 0 10px #0ff, 0 0 40px #0ff4; }
        .neon-pink { color: #ff2d6a; text-shadow: 0 0 10px #ff2d6a, 0 0 40px #ff2d6a44; }
        .neon-purple { color: #b44dff; text-shadow: 0 0 10px #b44dff, 0 0 40px #b44dff44; }
        .glow-border-cyan { border-color: #0ff; box-shadow: 0 0 10px #0ff3, inset 0 0 10px #0ff1; }
        .glow-border-pink { border-color: #ff2d6a; box-shadow: 0 0 10px #ff2d6a33, inset 0 0 10px #ff2d6a11; }
        .cyber-bg {
          background: 
            linear-gradient(90deg, transparent 49.5%, #0ff05 49.5%, #0ff05 50.5%, transparent 50.5%),
            linear-gradient(0deg, transparent 49.5%, #0ff05 49.5%, #0ff05 50.5%, transparent 50.5%);
          background-size: 60px 60px;
        }
        .clip-corner {
          clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
        }
        .clip-corner-sm {
          clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));
        }
        @keyframes dataRain {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
      `}</style>

      {/* SCAN LINE */}
      <div className="scan-line fixed left-0 w-full h-px bg-[#0ff]/20 z-50 pointer-events-none" style={{ top: "-2px" }} />

      {/* DATA RAIN - Background */}
      <div className="fixed right-0 top-0 w-32 h-full overflow-hidden opacity-10 pointer-events-none z-0">
        <div className="data-stream text-[10px] text-[#0ff] leading-tight whitespace-pre">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i}>{Math.random().toString(16).slice(2, 10).toUpperCase()}</div>
          ))}
        </div>
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#050510]/90 backdrop-blur-sm border-b border-[#0ff]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-[#0ff] animate-pulse" />
            <span className="orbitron text-sm font-bold neon-cyan">VAULT<span className="neon-pink">DROP</span></span>
            <span className="text-[9px] text-zinc-600">// v7.0.3-neon</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[9px] text-zinc-600">
              NET.STATUS: <span className="neon-cyan">CONNECTED</span>
            </span>
            <span className="text-[9px] text-zinc-600">
              ENCRYPT: <span className="text-green-400">ACTIVE</span>
            </span>
          </div>
          <button className="clip-corner-sm bg-[#0ff] text-[#050510] px-5 py-2 text-[10px] font-bold orbitron hover:bg-[#ff2d6a] transition-colors">
            JACK IN
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative pt-16">
        <div className="absolute inset-0 cyber-bg opacity-30" />
        
        {/* HUD corners */}
        <div className="hud-element absolute top-20 left-6 w-16 h-16 border-t-2 border-l-2 border-[#0ff]/30" />
        <div className="hud-element absolute top-20 right-6 w-16 h-16 border-t-2 border-r-2 border-[#ff2d6a]/30" />
        <div className="hud-element absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#ff2d6a]/30" />
        <div className="hud-element absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#0ff]/30" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 grid md:grid-cols-5 gap-12 items-center relative z-10">
          {/* Left: Main content - 3 cols */}
          <div className="md:col-span-3">
            {/* Boot sequence */}
            <div className="mb-6 space-y-1">
              <div className="boot-line text-[10px] text-zinc-600">INITIALIZING SECURE PROTOCOL...</div>
              <div className="boot-line text-[10px] text-green-500">✓ ENCRYPTION MODULE LOADED</div>
              <div className="boot-line text-[10px] text-green-500">✓ ZERO-KNOWLEDGE VERIFIED</div>
              <div className="boot-line text-[10px] text-[#0ff]">SYSTEM READY_</div>
            </div>

            <h1 className="neon-title orbitron text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
              <GlitchText text="SECURE" className="block neon-cyan" />
              <GlitchText text="FILE" className="block text-white" />
              <GlitchText text="TRANSFER" className="block neon-pink" />
            </h1>

            <p className="rajdhani text-base md:text-lg text-zinc-400 max-w-md mb-8 leading-relaxed font-light">
              Next-gen encrypted file drops. No trace. No logs. 
              Your data exists only in transit — then it&apos;s gone.
            </p>

            <div className="flex gap-3">
              <a href="#upload" className="clip-corner bg-[#0ff] text-[#050510] px-8 py-3 text-xs font-bold orbitron hover:bg-[#ff2d6a] hover:text-white transition-all duration-300">
                UPLOAD NOW
              </a>
              <a href="#features" className="clip-corner border-2 border-[#0ff]/50 text-[#0ff] px-8 py-3 text-xs font-bold orbitron hover:border-[#ff2d6a] hover:text-[#ff2d6a] transition-all duration-300">
                SCAN SPECS
              </a>
            </div>
          </div>

          {/* Right: Terminal - 2 cols */}
          <div className="md:col-span-2 hidden md:block">
            <div className="clip-corner border-2 border-[#0ff]/30 bg-[#050510]/80 p-4">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#0ff]/10">
                <div className="w-2 h-2 rounded-full bg-[#ff2d6a]" />
                <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-[9px] text-zinc-600 ml-2">vaultdrop://terminal</span>
              </div>
              <TypingTerminal
                delay={2000}
                lines={[
                  "VAULTDROP v7.0.3 INITIALIZED",
                  "LOADING ENCRYPTION MODULE...",
                  "AES-256-GCM READY",
                  "ZERO-KNOWLEDGE PROTOCOL: ACTIVE",
                  "AWAITING FILE INPUT...",
                  "DRAG FILES TO BEGIN TRANSFER",
                  "ALL CONNECTIONS E2E ENCRYPTED",
                ]}
              />
            </div>

            {/* Mini HUD stats */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              {[
                { label: "LATENCY", value: "12ms", color: "#0ff" },
                { label: "NODES", value: "847", color: "#ff2d6a" },
              ].map((s, i) => (
                <div key={i} className="clip-corner-sm border border-white/10 bg-white/[0.02] p-2 text-center">
                  <div className="text-[8px] text-zinc-600">{s.label}</div>
                  <div className="text-sm font-bold orbitron" style={{ color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="cyber-section px-6 md:px-16 py-24 border-t border-[#0ff]/10 relative">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 border border-[#0ff] rotate-45" />
            <h2 className="orbitron text-xs font-bold tracking-widest neon-cyan">SYSTEM CAPABILITIES</h2>
            <div className="flex-1 h-px bg-[#0ff]/10" />
          </div>

          <div className="cyber-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "⬆",
                title: "NEURAL UPLOAD",
                desc: "Drag-and-drop interface with real-time encryption visualization. Zero friction file intake.",
                color: "#0ff",
                stat: "< 0.1s",
              },
              {
                icon: "🔐",
                title: "QUANTUM SHIELD",
                desc: "AES-256-GCM encryption with client-side key generation. Future-proof against quantum attacks.",
                color: "#ff2d6a",
                stat: "256-BIT",
              },
              {
                icon: "💀",
                title: "GHOST LINKS",
                desc: "Self-destructing URLs with configurable time fuses and access limits. No digital footprint.",
                color: "#b44dff",
                stat: "AUTO-PURGE",
              },
              {
                icon: "👁",
                title: "ZERO TRACE",
                desc: "Zero-knowledge architecture. No logs, no metadata, no server-side decryption keys.",
                color: "#0ff",
                stat: "0 LOGS",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="cyber-card clip-corner border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden"
              >
                {/* Glow line at top */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: f.color, boxShadow: `0 0 10px ${f.color}` }} />
                
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="orbitron text-xs font-bold mb-2 group-hover:text-white transition-colors" style={{ color: f.color }}>
                  {f.title}
                </h3>
                <p className="text-[10px] text-zinc-500 leading-relaxed mb-4">{f.desc}</p>
                <div className="border-t border-white/5 pt-3">
                  <span className="orbitron text-[10px] font-bold" style={{ color: f.color }}>{f.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - Cyberpunk pipeline */}
      <section className="cyber-section px-6 md:px-16 py-24 border-t border-[#0ff]/10 bg-[#080818]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 border border-[#ff2d6a] rotate-45" />
            <h2 className="orbitron text-xs font-bold tracking-widest neon-pink">DATA PIPELINE</h2>
            <div className="flex-1 h-px bg-[#ff2d6a]/10" />
          </div>

          <div className="space-y-6">
            {[
              { phase: "01", title: "INJECT", desc: "Files enter the pipeline. Validated, measured, queued.", color: "#0ff", progress: 100 },
              { phase: "02", title: "ENCRYPT", desc: "AES-256-GCM applied. Keys generated client-side. Zero exposure.", color: "#ff2d6a", progress: 100 },
              { phase: "03", title: "TRANSMIT", desc: "Encrypted payload transferred via secure tunnel. E2E protected.", color: "#b44dff", progress: 85 },
              { phase: "04", title: "DELIVER", desc: "Ghost link generated. Self-destruct timer armed. Ready.", color: "#0ff", progress: 60 },
            ].map((step, i) => (
              <div key={i} className="clip-corner border border-white/10 bg-white/[0.02] p-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="orbitron text-3xl font-black" style={{ color: step.color, textShadow: `0 0 20px ${step.color}44` }}>
                  {step.phase}
                </div>
                <div className="flex-1">
                  <h3 className="orbitron text-sm font-bold mb-1" style={{ color: step.color }}>{step.title}</h3>
                  <p className="text-[11px] text-zinc-500">{step.desc}</p>
                </div>
                <div className="w-full md:w-48">
                  <div className="h-1.5 bg-white/5 overflow-hidden">
                    <div
                      className="cyber-progress-fill h-full"
                      style={{ width: `${step.progress}%`, background: step.color, boxShadow: `0 0 10px ${step.color}` }}
                    />
                  </div>
                  <div className="text-[9px] text-zinc-600 mt-1 text-right">{step.progress}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section id="upload" className="cyber-section px-6 md:px-16 py-24 border-t border-[#0ff]/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-3 h-3 border border-[#0ff] rotate-45" />
            <h2 className="orbitron text-xs font-bold tracking-widest neon-cyan">FILE INJECTION PORT</h2>
            <div className="flex-1 h-px bg-[#0ff]/10" />
          </div>

          <div className="clip-corner border-2 border-dashed border-[#0ff]/30 bg-[#050510] p-8 md:p-16 text-center relative group hover:border-[#0ff] transition-all duration-500">
            {/* Animated corner indicators */}
            <div className="hex-pulse absolute top-2 left-2 w-4 h-4 border-t border-l border-[#0ff]" />
            <div className="hex-pulse absolute top-2 right-2 w-4 h-4 border-t border-r border-[#ff2d6a]" />
            <div className="hex-pulse absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#ff2d6a]" />
            <div className="hex-pulse absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#0ff]" />

            <div className="text-4xl neon-cyan mb-4">⬆</div>
            <h3 className="orbitron text-lg font-bold neon-cyan mb-2">DROP FILES TO INJECT</h3>
            <p className="text-[11px] text-zinc-600 mb-8">ACCEPTED: ALL FORMATS // MAX PAYLOAD: 5GB</p>
            <button className="clip-corner-sm bg-[#0ff] text-[#050510] px-8 py-3 text-xs font-bold orbitron hover:bg-[#ff2d6a] hover:text-white transition-all">
              SELECT FILES
            </button>

            {/* Mock uploads */}
            <div className="mt-10 space-y-2 text-left">
              <div className="clip-corner-sm border border-[#0ff]/20 bg-[#0ff]/[0.03] p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#0ff] animate-pulse" />
                  <div>
                    <div className="text-[11px] font-bold">neural_map_v3.dat</div>
                    <div className="text-[9px] text-zinc-600">24.8 MB</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/5 overflow-hidden">
                    <div className="h-full bg-[#0ff]" style={{ width: "68%", boxShadow: "0 0 10px #0ff" }} />
                  </div>
                  <span className="text-[10px] neon-cyan orbitron">68%</span>
                </div>
              </div>
              <div className="clip-corner-sm border border-[#ff2d6a]/20 bg-[#ff2d6a]/[0.03] p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-400" />
                  <div>
                    <div className="text-[11px] font-bold">encrypted_payload.bin</div>
                    <div className="text-[9px] text-zinc-600">156.3 MB</div>
                  </div>
                </div>
                <span className="text-[10px] text-green-400 orbitron font-bold">✓ INJECTED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="cyber-section px-6 md:px-16 py-24 border-t border-[#0ff]/10 bg-[#080818]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="orbitron text-2xl md:text-4xl font-black mb-4">
            <span className="neon-cyan">UNHACKABLE</span>
            <span className="text-white"> BY </span>
            <span className="neon-pink">DESIGN</span>
          </h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mb-12 rajdhani text-base">
            Every byte encrypted before transmission. Zero-knowledge architecture means
            even we can&apos;t access your data. Mathematically guaranteed.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "AES-256-GCM", color: "#0ff" },
              { label: "ZERO-KNOWLEDGE", color: "#ff2d6a" },
              { label: "E2E ENCRYPTED", color: "#b44dff" },
              { label: "SOC 2", color: "#0ff" },
              { label: "GDPR", color: "#ff2d6a" },
            ].map((badge, i) => (
              <div
                key={i}
                className="clip-corner-sm border px-5 py-2 text-[10px] font-bold orbitron transition-all duration-300 hover:scale-105"
                style={{
                  borderColor: `${badge.color}44`,
                  color: badge.color,
                  textShadow: `0 0 10px ${badge.color}44`,
                }}
              >
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#0ff]/10 px-6 md:px-16 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0ff] animate-pulse" />
            <span className="text-[10px] text-zinc-600">NETWORK: <span className="neon-cyan">ONLINE</span></span>
          </div>
          <span className="text-[10px] text-zinc-700">© 2026 VAULTDROP SYSTEMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 text-[10px] orbitron text-zinc-600">
            <a href="#" className="hover:text-[#0ff] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#0ff] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#0ff] transition-colors">STATUS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
