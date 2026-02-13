"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function TypingText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span>
      {displayed}
      <span className={showCursor ? "opacity-100" : "opacity-0"}>█</span>
    </span>
  );
}

export default function NeonTerminal() {
  const mainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "01アイウエオカキクケコサシスセソタチツテトVAULTDROP";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    function draw() {
      if (!ctx || !canvas) return;
      ctx.fillStyle = "rgba(5, 5, 15, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00FFFF15";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    const interval = setInterval(draw, 50);
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".term-hero-block", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        delay: 0.3,
        ease: "power2.out",
      });

      gsap.from(".term-prompt", {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.3,
        delay: 0.8,
        ease: "power2.out",
      });

      gsap.from(".term-cta", {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        delay: 2,
        ease: "back.out(1.7)",
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".term-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Feature cards
      gsap.from(".term-feature", {
        scrollTrigger: { trigger: ".term-features", start: "top 80%" },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Glow pulse on upload zone
      gsap.to(".term-upload-glow", {
        boxShadow: "0 0 40px rgba(0,255,255,0.3), inset 0 0 40px rgba(0,255,255,0.05)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="scanlines"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        background: "#05050F",
        color: "#E0E0E0",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />

      {/* Matrix canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ opacity: 0.4 }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#05050F]/90 backdrop-blur-sm border-b border-[#00FFFF]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-sm font-bold tracking-[0.3em]" style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FFFF" }}>
            VAULTDROP
          </span>
          <a
            href="#upload-demo"
            className="text-xs border border-[#FF00FF]/50 text-[#FF00FF] px-4 py-2 tracking-widest hover:bg-[#FF00FF] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]"
          >
            &gt; INIT_TRANSFER
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative z-10 px-6 md:px-16 pt-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="term-hero-block bg-[#0A0A1A]/80 border border-[#00FFFF]/20 p-8 md:p-12 backdrop-blur-sm rounded-sm">
            {/* Terminal header */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#00FFFF]/10">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              <span className="ml-4 text-xs text-[#00FFFF]/40">vaultdrop@secure:~</span>
            </div>

            <div className="space-y-4">
              <div className="term-prompt">
                <span className="text-[#00FFFF]">$ </span>
                <TypingText text="echo 'SECURE FILE TRANSFER PROTOCOL'" delay={800} />
              </div>
              <div className="term-prompt">
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  <span className="text-[#00FFFF]" style={{ textShadow: "0 0 30px rgba(0,255,255,0.5)" }}>
                    SECURE
                  </span>{" "}
                  FILE
                  <br />
                  <span className="text-[#FF00FF]" style={{ textShadow: "0 0 30px rgba(255,0,255,0.5)" }}>
                    TRANSFER
                  </span>{" "}
                  PROTOCOL
                </h1>
              </div>
              <div className="term-prompt text-sm text-[#00FFFF]/60 mt-4">
                <span className="text-[#27C93F]">&gt; </span>
                <TypingText text="End-to-end encrypted. Zero knowledge. Self-destructing links." delay={1500} />
              </div>
              <div className="term-cta mt-8">
                <a
                  href="#features"
                  className="inline-block bg-[#00FFFF] text-[#05050F] px-8 py-3 text-xs font-bold tracking-widest hover:bg-[#FF00FF] transition-all duration-300"
                  style={{ fontFamily: "'Orbitron', sans-serif", boxShadow: "0 0 20px rgba(0,255,255,0.3)" }}
                >
                  &gt; EXPLORE_SYSTEM
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="term-section relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs text-[#FF00FF] tracking-[0.3em]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              // SYSTEM_CAPABILITIES
            </span>
          </div>
          <div className="term-features grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                cmd: "upload --mode=dragdrop",
                title: "DRAG & DROP UPLOAD",
                desc: "Intuitive file upload interface. Drag files directly into the terminal zone.",
                color: "#00FFFF",
              },
              {
                cmd: "encrypt --algo=AES256",
                title: "AES-256 ENCRYPTION",
                desc: "Client-side encryption before upload. Your data never travels unprotected.",
                color: "#FF00FF",
              },
              {
                cmd: "link --expire=24h --max=5",
                title: "EXPIRING LINKS",
                desc: "Configure time-based and download-count limits. Links self-destruct automatically.",
                color: "#00FFFF",
              },
              {
                cmd: "share --generate",
                title: "INSTANT SHARING",
                desc: "Generate secure shareable links in milliseconds. Copy and distribute anywhere.",
                color: "#FF00FF",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="term-feature border border-[#00FFFF]/15 bg-[#0A0A1A]/60 p-6 backdrop-blur-sm hover:border-[color:var(--fc)] transition-all duration-300 group"
                style={{ ["--fc" as string]: f.color }}
              >
                <code className="text-xs text-[#27C93F] block mb-4">$ {f.cmd}</code>
                <h3
                  className="text-base font-bold mb-2 group-hover:text-[color:var(--fc)] transition-colors"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="term-section relative z-10 px-6 md:px-16 py-24 border-t border-[#00FFFF]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs text-[#FF00FF] tracking-[0.3em]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              // EXECUTION_FLOW
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "UPLOAD", desc: "Initialize file transfer. Drag or select files for processing.", color: "#00FFFF" },
              { step: "02", title: "ENCRYPT", desc: "AES-256 cipher applied. Files encrypted in your browser.", color: "#FF00FF" },
              { step: "03", title: "SHARE", desc: "Secure link generated. Set expiration parameters and distribute.", color: "#27C93F" },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div
                  className="text-6xl font-black mb-4 opacity-20"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: s.color }}
                >
                  {s.step}
                </div>
                <h3
                  className="text-lg font-bold mb-3"
                  style={{ fontFamily: "'Orbitron', sans-serif", color: s.color, textShadow: `0 0 20px ${s.color}40` }}
                >
                  {s.title}
                </h3>
                <p className="text-xs text-[#666] leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-[#00FFFF]/30 text-xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section id="upload-demo" className="term-section relative z-10 px-6 md:px-16 py-24 border-t border-[#00FFFF]/10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <span className="text-xs text-[#FF00FF] tracking-[0.3em]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              // UPLOAD_INTERFACE
            </span>
          </div>
          <div className="term-upload-glow border border-[#00FFFF]/30 bg-[#0A0A1A]/80 p-10 md:p-14 text-center backdrop-blur-sm">
            <div className="text-4xl mb-4" style={{ color: "#00FFFF", textShadow: "0 0 20px rgba(0,255,255,0.5)" }}>
              ⬆
            </div>
            <p className="text-sm font-bold mb-2" style={{ fontFamily: "'Orbitron', sans-serif", color: "#00FFFF" }}>
              DROP FILES TO UPLOAD
            </p>
            <p className="text-xs text-[#666] mb-6">or click to browse • max 5GB per file</p>
            <button
              className="border border-[#FF00FF]/50 text-[#FF00FF] px-6 py-2 text-xs tracking-widest hover:bg-[#FF00FF] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]"
            >
              &gt; SELECT_FILES
            </button>

            {/* Mock terminal output */}
            <div className="mt-10 text-left bg-[#05050F] border border-[#00FFFF]/10 p-4 font-mono text-xs">
              <div className="text-[#27C93F]">$ vaultdrop upload --encrypt</div>
              <div className="text-[#666] mt-2">[INFO] Processing files...</div>
              <div className="mt-1">
                <span className="text-[#00FFFF]">secret-doc.pdf</span>
                <span className="text-[#666]"> ━━━━━━━━━━━━━━━━━━━━ </span>
                <span className="text-[#FF00FF]">78%</span>
              </div>
              <div className="mt-1">
                <span className="text-[#00FFFF]">photos.zip</span>
                <span className="text-[#666]">    ━━━━━━━━━━━━━━━━━━━━ </span>
                <span className="text-[#27C93F]">DONE ✓</span>
              </div>
              <div className="mt-2 text-[#27C93F]">[OK] Link generated: https://vault.drop/x7k9m2</div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="term-section relative z-10 px-6 md:px-16 py-24 border-t border-[#00FFFF]/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-2xl md:text-3xl font-black mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <span className="text-[#00FFFF]" style={{ textShadow: "0 0 20px rgba(0,255,255,0.4)" }}>SECURITY</span>{" "}
            PROTOCOLS
          </h2>
          <p className="text-xs text-[#666] mb-12">All systems verified. All connections encrypted.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["AES-256", "ZERO-KNOWLEDGE", "E2E ENCRYPTED", "SOC 2", "GDPR"].map((badge, i) => (
              <div
                key={i}
                className="border border-[#00FFFF]/20 px-5 py-3 text-xs tracking-widest hover:border-[#00FFFF] hover:text-[#00FFFF] hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all duration-300"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                [{badge}]
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-16 py-10 border-t border-[#00FFFF]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#666]">© 2026 VAULTDROP // ALL RIGHTS RESERVED</span>
          <div className="flex gap-6 text-xs text-[#666]">
            <a href="#" className="hover:text-[#00FFFF] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#00FFFF] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#00FFFF] transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
