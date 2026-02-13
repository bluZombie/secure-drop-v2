"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function RetroGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let offset = 0;
    let animFrame: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 400;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const horizon = 0;
      const gridLines = 20;
      const spacing = canvas.height / gridLines;

      // Horizontal lines with perspective
      for (let i = 0; i < gridLines; i++) {
        const y = horizon + (i / gridLines) * canvas.height;
        const alpha = (i / gridLines) * 0.6;
        ctx.strokeStyle = `rgba(255, 45, 149, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Vertical lines with perspective
      const vanishX = canvas.width / 2;
      const numVLines = 24;
      for (let i = -numVLines / 2; i <= numVLines / 2; i++) {
        const bottomX = vanishX + i * (canvas.width / numVLines);
        const topX = vanishX + i * 20;
        ctx.strokeStyle = `rgba(0, 240, 255, 0.15)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(topX, horizon);
        ctx.lineTo(bottomX, canvas.height);
        ctx.stroke();
      }

      // Moving scan line
      const scanY = (offset % canvas.height);
      const scanGrad = ctx.createLinearGradient(0, scanY - 5, 0, scanY + 5);
      scanGrad.addColorStop(0, "transparent");
      scanGrad.addColorStop(0.5, "rgba(255, 45, 149, 0.3)");
      scanGrad.addColorStop(1, "transparent");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 20, canvas.width, 40);

      offset += 0.5;
      animFrame = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full" style={{ display: "block" }} />;
}

function SunBurst() {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Sun circle */}
      <div
        className="absolute inset-[15%] rounded-full"
        style={{
          background: "linear-gradient(180deg, #ff6b9d 0%, #ff2d95 30%, #c026d3 60%, #7c3aed 100%)",
          boxShadow: "0 0 60px rgba(255,45,149,0.4), 0 0 120px rgba(255,45,149,0.2)",
        }}
      />
      {/* Horizontal lines through sun */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bg-[#0d0221]"
          style={{
            height: `${2 + i * 1.5}px`,
            top: `${52 + i * 5}%`,
          }}
        />
      ))}
    </div>
  );
}

export default function RetroSynthwave() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sun rise animation
      gsap.from(".synth-sun", {
        y: 100,
        opacity: 0,
        duration: 2,
        delay: 0.3,
        ease: "power2.out",
      });

      // Title chrome effect entrance
      gsap.from(".synth-title-line", {
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.8,
        ease: "power3.out",
      });

      gsap.from(".synth-sub", {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out",
      });

      gsap.from(".synth-cta", {
        scale: 0,
        duration: 0.5,
        delay: 2,
        ease: "back.out(2)",
      });

      // CRT flicker
      gsap.to(".crt-overlay", {
        opacity: 0.03,
        duration: 0.1,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)",
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".synth-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Feature cards - slide in from sides
      gsap.from(".synth-card", {
        scrollTrigger: { trigger: ".synth-cards", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });

      // Steps neon glow pulse
      gsap.from(".synth-step", {
        scrollTrigger: { trigger: ".synth-steps", start: "top 80%" },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.4)",
      });

      // Neon text glow pulse
      gsap.to(".neon-pulse", {
        textShadow: "0 0 40px rgba(255,45,149,0.8), 0 0 80px rgba(255,45,149,0.4), 0 0 120px rgba(255,45,149,0.2)",
        duration: 2,
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
        fontFamily: "'Exo 2', sans-serif",
        background: "#0d0221",
        color: "#e0d0f0",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=Press+Start+2P&family=Righteous&display=swap"
        rel="stylesheet"
      />

      {/* CRT scanline overlay */}
      <div
        className="crt-overlay fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
          opacity: 0.06,
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 z-[99] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(13,2,33,0.6) 100%)",
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0d0221]/80 backdrop-blur-md border-b border-[#ff2d95]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <span
            className="text-lg tracking-[0.15em]"
            style={{
              fontFamily: "'Righteous', sans-serif",
              background: "linear-gradient(90deg, #ff2d95, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VAULTDROP
          </span>
          <a
            href="#upload"
            className="px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase border-2 border-[#ff2d95] text-[#ff2d95] hover:bg-[#ff2d95] hover:text-[#0d0221] transition-all duration-300"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "8px",
              boxShadow: "0 0 15px rgba(255,45,149,0.3)",
            }}
          >
            START
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative z-10 px-6 pt-20">
        {/* Sun */}
        <div className="synth-sun mb-8">
          <SunBurst />
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <div className="overflow-hidden">
            <h1
              className="synth-title-line text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Righteous', sans-serif",
                background: "linear-gradient(180deg, #ffffff 0%, #ff6b9d 50%, #ff2d95 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(255,45,149,0.3))",
              }}
            >
              VAULT
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="synth-title-line text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Righteous', sans-serif",
                background: "linear-gradient(180deg, #00f0ff 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(0,240,255,0.3))",
              }}
            >
              DROP
            </h1>
          </div>
        </div>

        <p
          className="synth-sub text-center text-sm md:text-base text-[#8888b0] max-w-md leading-relaxed mb-10"
          style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300 }}
        >
          Encrypted file transfer from the future.
          <br />
          Zero-knowledge. Self-destructing links. Total privacy.
        </p>

        <a
          href="#features"
          className="synth-cta inline-block px-10 py-4 text-xs font-bold tracking-[0.3em] uppercase relative overflow-hidden group"
          style={{
            fontFamily: "'Exo 2', sans-serif",
            background: "linear-gradient(90deg, #ff2d95, #c026d3, #7c3aed)",
            boxShadow: "0 0 30px rgba(255,45,149,0.4), 0 0 60px rgba(255,45,149,0.2)",
          }}
        >
          <span className="relative z-10 text-white">ENTER THE GRID</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>

        {/* Retro grid at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ perspective: "500px" }}>
          <div style={{ transform: "rotateX(60deg)", transformOrigin: "bottom" }}>
            <RetroGrid />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="synth-reveal text-center mb-16">
            <span
              className="text-[8px] tracking-[0.5em] text-[#ff2d95] uppercase block mb-4"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              FEATURES
            </span>
            <h2
              className="neon-pulse text-3xl md:text-5xl font-bold uppercase"
              style={{
                fontFamily: "'Righteous', sans-serif",
                color: "#ff2d95",
                textShadow: "0 0 20px rgba(255,45,149,0.5), 0 0 40px rgba(255,45,149,0.3)",
              }}
            >
              POWER UPS
            </h2>
          </div>

          <div className="synth-cards grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "DRAG & DROP",
                desc: "Throw your files into the grid. Any format, up to 5GB. No friction, just action.",
                icon: "▲",
                gradient: "from-[#ff2d95] to-[#c026d3]",
                border: "#ff2d95",
              },
              {
                title: "AES-256 SHIELD",
                desc: "Military-grade encryption runs in your browser. Your data is locked before it leaves.",
                icon: "◆",
                gradient: "from-[#00f0ff] to-[#7c3aed]",
                border: "#00f0ff",
              },
              {
                title: "SELF-DESTRUCT",
                desc: "Set timers and download limits. When time's up, the link vanishes into the void.",
                icon: "◉",
                gradient: "from-[#c026d3] to-[#7c3aed]",
                border: "#c026d3",
              },
              {
                title: "INSTANT LINK",
                desc: "Generate a secure link in milliseconds. Share it anywhere across the network.",
                icon: "⬡",
                gradient: "from-[#7c3aed] to-[#00f0ff]",
                border: "#7c3aed",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="synth-card relative p-8 border group hover:scale-[1.02] transition-all duration-300 overflow-hidden"
                style={{
                  borderColor: `${f.border}30`,
                  background: "rgba(13,2,33,0.8)",
                  backdropFilter: "blur(10px)",
                }}
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${f.gradient}`} />

                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: `inset 0 0 40px ${f.border}10` }}
                />

                <div
                  className={`text-2xl mb-4 bg-gradient-to-r ${f.gradient} bg-clip-text`}
                  style={{ WebkitTextFillColor: "transparent" }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-lg font-bold mb-3 tracking-wider"
                  style={{ fontFamily: "'Righteous', sans-serif", color: f.border }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-[#6666880] leading-relaxed" style={{ fontWeight: 300, color: "#8888b0" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="synth-steps relative z-10 px-6 md:px-12 py-24 border-t border-[#ff2d95]/10">
        <div className="max-w-5xl mx-auto">
          <div className="synth-reveal text-center mb-16">
            <span
              className="text-[8px] tracking-[0.5em] text-[#00f0ff] uppercase block mb-4"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              HOW TO PLAY
            </span>
            <h2
              className="text-3xl md:text-5xl font-bold uppercase"
              style={{
                fontFamily: "'Righteous', sans-serif",
                color: "#00f0ff",
                textShadow: "0 0 20px rgba(0,240,255,0.5)",
              }}
            >
              3 LEVELS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "LVL 1",
                title: "UPLOAD",
                desc: "Drag your files into the grid. Any format accepted. Max 5GB per file.",
                color: "#ff2d95",
              },
              {
                num: "LVL 2",
                title: "ENCRYPT",
                desc: "AES-256 cipher activates. Files encrypted client-side in your browser.",
                color: "#c026d3",
              },
              {
                num: "LVL 3",
                title: "SHARE",
                desc: "Secure link generated. Set expiry timer. Distribute across the network.",
                color: "#00f0ff",
              },
            ].map((s, i) => (
              <div key={i} className="synth-step text-center">
                <div
                  className="text-[10px] font-bold tracking-[0.3em] mb-4 px-4 py-2 border inline-block"
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "8px",
                    borderColor: `${s.color}50`,
                    color: s.color,
                    boxShadow: `0 0 15px ${s.color}20`,
                  }}
                >
                  {s.num}
                </div>
                <h3
                  className="text-xl font-bold mb-3 tracking-wider"
                  style={{
                    fontFamily: "'Righteous', sans-serif",
                    color: s.color,
                    textShadow: `0 0 15px ${s.color}40`,
                  }}
                >
                  {s.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#8888b0", fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section id="upload" className="relative z-10 px-6 md:px-12 py-24 border-t border-[#ff2d95]/10">
        <div className="max-w-4xl mx-auto">
          <div className="synth-reveal text-center mb-12">
            <span
              className="text-[8px] tracking-[0.5em] text-[#c026d3] uppercase block mb-4"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              UPLOAD ZONE
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase"
              style={{
                fontFamily: "'Righteous', sans-serif",
                background: "linear-gradient(90deg, #ff2d95, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              DROP ZONE
            </h2>
          </div>

          <div
            className="synth-reveal relative border-2 border-dashed p-10 md:p-16 text-center overflow-hidden"
            style={{
              borderColor: "rgba(255,45,149,0.3)",
              background: "rgba(13,2,33,0.6)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 0 40px rgba(255,45,149,0.1), inset 0 0 40px rgba(255,45,149,0.05)",
            }}
          >
            {/* Corner decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff2d95]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00f0ff]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00f0ff]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff2d95]" />

            <div className="text-5xl mb-4 opacity-50">⬆</div>
            <p
              className="text-lg font-bold mb-2 tracking-wider"
              style={{
                fontFamily: "'Righteous', sans-serif",
                color: "#ff2d95",
                textShadow: "0 0 15px rgba(255,45,149,0.5)",
              }}
            >
              DROP FILES HERE
            </p>
            <p
              className="text-[10px] text-[#8888b0] mb-8"
              style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300 }}
            >
              drag & drop · click to browse · max 5GB
            </p>
            <button
              className="px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase relative overflow-hidden group"
              style={{
                fontFamily: "'Exo 2', sans-serif",
                background: "linear-gradient(90deg, #ff2d95, #c026d3)",
                boxShadow: "0 0 20px rgba(255,45,149,0.3)",
              }}
            >
              <span className="relative z-10 text-white">SELECT FILES</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Mock files */}
            <div className="mt-12 space-y-3 text-left">
              <div
                className="border p-4"
                style={{ borderColor: "rgba(255,45,149,0.2)", background: "rgba(13,2,33,0.5)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#ff2d95]" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    mixtape_final.mp3
                  </span>
                  <span className="text-[10px] text-[#8888b0]">8.4 MB</span>
                </div>
                <div className="w-full h-2 bg-[#1a0a2e] overflow-hidden">
                  <div
                    className="h-full w-[78%] relative"
                    style={{ background: "linear-gradient(90deg, #ff2d95, #c026d3, #7c3aed)" }}
                  >
                    <div className="absolute right-0 top-0 h-full w-4 bg-white/30 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px] text-[#8888b0]">ENCRYPTING...</span>
                  <span className="text-[9px] text-[#ff2d95]">78%</span>
                </div>
              </div>
              <div
                className="border p-4"
                style={{ borderColor: "rgba(0,240,255,0.2)", background: "rgba(13,2,33,0.5)" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#00f0ff]" style={{ fontFamily: "'Exo 2', sans-serif" }}>
                    neon_artwork.psd
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8888b0]">42.1 MB</span>
                    <span
                      className="text-[8px] font-bold tracking-widest"
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "7px",
                        color: "#00ff88",
                      }}
                    >
                      SECURED ✓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative z-10 px-6 md:px-12 py-24 border-t border-[#ff2d95]/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="synth-reveal mb-12">
            <h2
              className="text-2xl md:text-4xl font-bold uppercase"
              style={{
                fontFamily: "'Righteous', sans-serif",
                background: "linear-gradient(90deg, #ff2d95, #c026d3, #7c3aed, #00f0ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              SECURITY PROTOCOLS
            </h2>
          </div>
          <div className="synth-reveal flex flex-wrap justify-center gap-3">
            {[
              { label: "AES-256", color: "#ff2d95" },
              { label: "ZERO-KNOWLEDGE", color: "#c026d3" },
              { label: "E2E ENCRYPTED", color: "#7c3aed" },
              { label: "SOC 2", color: "#00f0ff" },
              { label: "GDPR", color: "#ff2d95" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-5 py-3 text-[10px] font-bold tracking-[0.2em] border hover:scale-105 transition-all duration-300"
                style={{
                  fontFamily: "'Exo 2', sans-serif",
                  borderColor: `${badge.color}40`,
                  color: badge.color,
                  boxShadow: `0 0 10px ${badge.color}15`,
                }}
              >
                ◆ {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-[#ff2d95]/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-sm tracking-[0.15em]"
            style={{
              fontFamily: "'Righteous', sans-serif",
              background: "linear-gradient(90deg, #ff2d95, #00f0ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VAULTDROP
          </span>
          <div className="flex gap-6 text-[10px] tracking-widest text-[#8888b0]" style={{ fontFamily: "'Exo 2', sans-serif", fontWeight: 300 }}>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">CONTACT</a>
          </div>
          <span className="text-[10px] text-[#444466]" style={{ fontFamily: "'Exo 2', sans-serif" }}>
            © 2026 VAULTDROP
          </span>
        </div>
      </footer>
    </div>
  );
}
