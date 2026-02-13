"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RetroSynthwave() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Retro boot sequence
      gsap.from(".synth-boot-line", {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.15,
        delay: 0.2,
        ease: "power2.out",
      });

      gsap.from(".synth-hero-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 1,
        ease: "power3.out",
      });

      gsap.from(".synth-hero-sub", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 1.4,
        ease: "power2.out",
      });

      gsap.from(".synth-hero-cta", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 1.8,
        ease: "back.out(2)",
      });

      // Sun pulse
      gsap.to(".synth-sun", {
        scale: 1.03,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Grid perspective animation
      gsap.to(".synth-grid-perspective", {
        backgroundPositionY: "+=60px",
        duration: 2,
        repeat: -1,
        ease: "none",
      });

      // Scroll reveals
      gsap.utils.toArray<HTMLElement>(".synth-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%" },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Feature cards
      gsap.from(".synth-card", {
        scrollTrigger: { trigger: ".synth-features", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // Chrome text shimmer
      gsap.to(".synth-chrome", {
        backgroundPosition: "200% center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });

      // Floating shapes
      gsap.to(".synth-float-1", { y: -15, rotation: 5, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".synth-float-2", { y: 12, rotation: -3, duration: 3.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".synth-float-3", { y: -10, rotation: 8, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="scanlines"
      style={{
        fontFamily: "'Press Start 2P', 'Courier New', monospace",
        background: "#0a0020",
        color: "#E0D0FF",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Audiowide&family=Outfit:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* CRT overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9998]" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
      }} />

      {/* Vignette */}
      <div className="fixed inset-0 pointer-events-none z-[9997]" style={{
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
      }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0020]/90 backdrop-blur-sm border-b-2" style={{ borderColor: "#ff2d95" }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <span className="text-sm tracking-wider" style={{ fontFamily: "'Audiowide', sans-serif", background: "linear-gradient(90deg, #ff2d95, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            VAULTDROP
          </span>
          <a
            href="#upload"
            className="text-[10px] px-4 py-2 font-bold tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              background: "linear-gradient(90deg, #ff2d95, #7b2dff)",
              color: "white",
              boxShadow: "0 0 20px rgba(255,45,149,0.3), 0 4px 0 #5a0040",
              fontSize: "8px",
            }}
          >
            ▶ START
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen relative flex flex-col items-center justify-center px-6 pt-16 overflow-hidden">
        {/* Retro sun */}
        <div className="synth-sun absolute top-[15%] left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[150px] md:h-[250px] overflow-hidden" style={{ zIndex: 1 }}>
          <div className="w-full h-full rounded-t-full" style={{
            background: "linear-gradient(180deg, #ff2d95 0%, #ff6b35 30%, #ffcc00 60%, #ff2d95 100%)",
            boxShadow: "0 0 80px rgba(255,45,149,0.4), 0 0 160px rgba(255,45,149,0.2)",
          }} />
          {/* Sun stripes */}
          {[...Array(8)].map((_, i) => (
            <div key={i} className="absolute left-0 right-0 bg-[#0a0020]" style={{
              height: `${3 + i * 1.5}px`,
              bottom: `${i * 12 + 10}%`,
            }} />
          ))}
        </div>

        {/* Perspective grid floor */}
        <div className="synth-grid-perspective absolute bottom-0 left-0 right-0 h-[40%]" style={{
          background: `
            linear-gradient(rgba(0,212,255,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,212,255,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 30px",
          transform: "perspective(500px) rotateX(60deg)",
          transformOrigin: "bottom",
          zIndex: 2,
        }} />

        {/* Floating geometric shapes */}
        <div className="synth-float-1 absolute top-[25%] left-[10%] w-16 h-16 border-2 border-[#ff2d95]/30 rotate-45 hidden md:block" style={{ zIndex: 3 }} />
        <div className="synth-float-2 absolute top-[30%] right-[12%] w-12 h-12 border-2 border-[#00d4ff]/30 hidden md:block" style={{ zIndex: 3, clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        <div className="synth-float-3 absolute top-[20%] right-[25%] w-8 h-8 bg-[#7b2dff]/20 rounded-full hidden md:block" style={{ zIndex: 3 }} />

        {/* Boot sequence */}
        <div className="absolute top-20 left-6 md:left-16 text-[8px] space-y-1 opacity-40" style={{ fontFamily: "'Press Start 2P', monospace", zIndex: 4 }}>
          <div className="synth-boot-line text-[#00d4ff]">VAULTDROP OS v2.1</div>
          <div className="synth-boot-line text-[#00d4ff]">LOADING ENCRYPTION MODULE...</div>
          <div className="synth-boot-line text-[#00ff88]">AES-256 ✓ READY</div>
          <div className="synth-boot-line text-[#00ff88]">ZERO-KNOWLEDGE ✓ ACTIVE</div>
          <div className="synth-boot-line text-[#ff2d95]">▶ SYSTEM ONLINE</div>
        </div>

        {/* Main title */}
        <div className="relative z-10 text-center mt-8">
          <h1 className="synth-hero-title mb-6" style={{ fontFamily: "'Audiowide', sans-serif" }}>
            <span className="block text-4xl md:text-6xl lg:text-8xl leading-tight synth-chrome" style={{
              background: "linear-gradient(90deg, #ff2d95, #ff6b35, #ffcc00, #00d4ff, #7b2dff, #ff2d95)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 30px rgba(255,45,149,0.5))",
            }}>
              VAULT
            </span>
            <span className="block text-4xl md:text-6xl lg:text-8xl leading-tight" style={{
              color: "#00d4ff",
              textShadow: "0 0 40px rgba(0,212,255,0.6), 0 0 80px rgba(0,212,255,0.3)",
            }}>
              DROP
            </span>
          </h1>

          <p className="synth-hero-sub text-xs md:text-sm text-[#B0A0D0] max-w-lg mx-auto leading-relaxed mb-10" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
            Secure file transfers from the future. End-to-end encrypted.
            Zero-knowledge. Self-destructing links. Totally radical.
          </p>

          <div className="synth-hero-cta flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#features"
              className="px-8 py-3 text-[10px] font-bold tracking-wider transition-all duration-300 hover:scale-105 text-center"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: "linear-gradient(90deg, #ff2d95, #7b2dff)",
                color: "white",
                boxShadow: "0 0 30px rgba(255,45,149,0.3), 0 4px 0 #5a0040",
                fontSize: "9px",
              }}
            >
              ▼ EXPLORE
            </a>
            <a
              href="#upload"
              className="px-8 py-3 text-[10px] font-bold tracking-wider border-2 border-[#00d4ff] text-[#00d4ff] transition-all duration-300 hover:scale-105 hover:bg-[#00d4ff] hover:text-[#0a0020] text-center"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                boxShadow: "0 0 20px rgba(0,212,255,0.2), 0 4px 0 #005570",
                fontSize: "9px",
              }}
            >
              ▶ UPLOAD
            </a>
          </div>
        </div>
      </section>

      {/* NEON DIVIDER */}
      <div className="relative py-4 overflow-hidden" style={{ background: "linear-gradient(90deg, #ff2d95, #7b2dff, #00d4ff)" }}>
        <div className="flex whitespace-nowrap gap-8 animate-marquee">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="text-[8px] font-bold tracking-[0.3em] text-white/80" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              ★ ENCRYPTED ★ SECURE ★ RADICAL ★ ZERO-KNOWLEDGE ★
            </span>
          ))}
        </div>
      </div>

      {/* FEATURES — Retro cards */}
      <section id="features" className="synth-features relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="synth-reveal text-center mb-20">
            <p className="text-[8px] tracking-[0.4em] text-[#ff2d95] mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              ★ POWER-UPS ★
            </p>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Audiowide', sans-serif", color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>
              SYSTEM FEATURES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "TURBO UPLOAD",
                desc: "Drag & drop files at warp speed. No loading screens, no lag. Just pure, unfiltered transfer power.",
                icon: "⚡",
                gradient: "linear-gradient(135deg, #ff2d95, #ff6b35)",
                shadow: "rgba(255,45,149,0.3)",
              },
              {
                title: "CRYPTO SHIELD",
                desc: "AES-256 encryption locks your files tighter than a vault in a volcano. Client-side. Always.",
                icon: "🛡️",
                gradient: "linear-gradient(135deg, #7b2dff, #00d4ff)",
                shadow: "rgba(123,45,255,0.3)",
              },
              {
                title: "TIME BOMB LINKS",
                desc: "Set your links to self-destruct like a secret agent's message. Time limits. Download caps. Boom.",
                icon: "💣",
                gradient: "linear-gradient(135deg, #00d4ff, #00ff88)",
                shadow: "rgba(0,212,255,0.3)",
              },
              {
                title: "INSTANT WARP",
                desc: "Generate secure links faster than light speed. Copy. Share. Done. No sign-up required.",
                icon: "🚀",
                gradient: "linear-gradient(135deg, #ffcc00, #ff2d95)",
                shadow: "rgba(255,204,0,0.3)",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="synth-card p-6 md:p-8 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] group relative overflow-hidden"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.03)",
                  boxShadow: `0 0 0 rgba(0,0,0,0), inset 0 0 0 rgba(0,0,0,0)`,
                }}
              >
                {/* Gradient accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: f.gradient }} />

                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-sm mb-3 tracking-wider" style={{ fontFamily: "'Audiowide', sans-serif" }}>
                  {f.title}
                </h3>
                <p className="text-xs text-[#B0A0D0] leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Retro steps */}
      <section className="relative z-10 px-6 md:px-16 py-24" style={{ background: "linear-gradient(180deg, transparent, rgba(123,45,255,0.05), transparent)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="synth-reveal text-center mb-20">
            <p className="text-[8px] tracking-[0.4em] text-[#7b2dff] mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              ★ GAME PLAN ★
            </p>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Audiowide', sans-serif", color: "#ff2d95", textShadow: "0 0 20px rgba(255,45,149,0.4)" }}>
              HOW IT WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "LVL 1", title: "UPLOAD", desc: "Drop your files into the neon grid. Any format. Up to 5GB. Let's go.", color: "#ff2d95" },
              { step: "LVL 2", title: "ENCRYPT", desc: "AES-256 cipher activates. Your browser does the heavy lifting. Zero knowledge.", color: "#7b2dff" },
              { step: "LVL 3", title: "SHARE", desc: "Secure link generated. Set the timer. Share the goods. Mission complete.", color: "#00d4ff" },
            ].map((s, i) => (
              <div key={i} className="synth-reveal text-center relative">
                <div className="text-[8px] tracking-[0.3em] mb-4" style={{ fontFamily: "'Press Start 2P', monospace", color: s.color }}>
                  {s.step}
                </div>
                <div className="w-16 h-16 mx-auto mb-6 rounded-lg flex items-center justify-center border-2" style={{
                  borderColor: s.color,
                  boxShadow: `0 0 20px ${s.color}40`,
                  background: `${s.color}10`,
                }}>
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Audiowide', sans-serif", color: s.color }}>
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-sm mb-3 tracking-wider" style={{ fontFamily: "'Audiowide', sans-serif", color: s.color, textShadow: `0 0 15px ${s.color}40` }}>
                  {s.title}
                </h3>
                <p className="text-xs text-[#B0A0D0] leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
                  {s.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 -right-4 text-xl" style={{ color: `${s.color}50` }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD INTERFACE */}
      <section id="upload" className="relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="synth-reveal text-center mb-16">
            <p className="text-[8px] tracking-[0.4em] text-[#00d4ff] mb-4" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              ★ UPLOAD ZONE ★
            </p>
            <h2 className="text-2xl md:text-3xl" style={{ fontFamily: "'Audiowide', sans-serif", color: "#ffcc00", textShadow: "0 0 20px rgba(255,204,0,0.4)" }}>
              THE NEON GATEWAY
            </h2>
          </div>

          <div className="synth-reveal rounded-lg border-2 p-8 md:p-12 text-center relative overflow-hidden" style={{
            borderColor: "#ff2d95",
            background: "rgba(255,45,149,0.03)",
            boxShadow: "0 0 40px rgba(255,45,149,0.1), inset 0 0 40px rgba(255,45,149,0.02)",
          }}>
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#00d4ff]" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#00d4ff]" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#00d4ff]" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#00d4ff]" />

            <div className="text-4xl mb-4">📁</div>
            <p className="text-sm mb-2" style={{ fontFamily: "'Audiowide', sans-serif", color: "#ff2d95", textShadow: "0 0 15px rgba(255,45,149,0.5)" }}>
              DROP FILES HERE
            </p>
            <p className="text-[10px] text-[#B0A0D0] mb-8" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              or click to browse • max 5GB per file
            </p>
            <button
              className="px-8 py-3 text-[9px] font-bold tracking-wider transition-all duration-300 hover:scale-105"
              style={{
                fontFamily: "'Press Start 2P', monospace",
                background: "linear-gradient(90deg, #7b2dff, #00d4ff)",
                color: "white",
                boxShadow: "0 0 20px rgba(123,45,255,0.3), 0 4px 0 #3a0080",
              }}
            >
              SELECT FILES
            </button>

            {/* Mock retro file display */}
            <div className="mt-10 space-y-3 text-left">
              <div className="p-4 rounded border flex items-center justify-between" style={{ borderColor: "rgba(0,212,255,0.2)", background: "rgba(0,212,255,0.03)" }}>
                <div>
                  <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>mixtape_final.mp3</p>
                  <p className="text-[9px] text-[#B0A0D0]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>8.4 MB</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 rounded overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <div className="h-full rounded w-[72%]" style={{ background: "linear-gradient(90deg, #ff2d95, #7b2dff)" }} />
                  </div>
                  <span className="text-[9px]" style={{ fontFamily: "'Press Start 2P', monospace", color: "#ff2d95", fontSize: "7px" }}>72%</span>
                </div>
              </div>
              <div className="p-4 rounded border flex items-center justify-between" style={{ borderColor: "rgba(0,255,136,0.2)", background: "rgba(0,255,136,0.03)" }}>
                <div>
                  <p className="text-xs" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>neon_poster.psd</p>
                  <p className="text-[9px] text-[#B0A0D0]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>42.1 MB</p>
                </div>
                <span className="text-[9px] text-[#00ff88] font-bold" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px" }}>✓ DONE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="relative z-10 px-6 md:px-16 py-24">
        <div className="max-w-6xl mx-auto text-center">
          <div className="synth-reveal mb-16">
            <h2 className="text-xl md:text-2xl mb-4" style={{ fontFamily: "'Audiowide', sans-serif" }}>
              <span style={{ color: "#ff2d95", textShadow: "0 0 20px rgba(255,45,149,0.4)" }}>MAXIMUM</span>{" "}
              <span style={{ color: "#00d4ff", textShadow: "0 0 20px rgba(0,212,255,0.4)" }}>SECURITY</span>
            </h2>
            <p className="text-xs text-[#B0A0D0]" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              All defenses active. All channels encrypted. Game over for hackers.
            </p>
          </div>

          <div className="synth-reveal flex flex-wrap justify-center gap-4">
            {[
              { label: "AES-256", color: "#ff2d95" },
              { label: "ZERO-KNOWLEDGE", color: "#7b2dff" },
              { label: "E2E ENCRYPTED", color: "#00d4ff" },
              { label: "SOC 2", color: "#ffcc00" },
              { label: "GDPR", color: "#00ff88" },
            ].map((badge, i) => (
              <div
                key={i}
                className="px-5 py-3 rounded border-2 text-[8px] font-bold tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  borderColor: badge.color,
                  color: badge.color,
                  boxShadow: `0 0 15px ${badge.color}20`,
                  background: `${badge.color}08`,
                  fontSize: "7px",
                }}
              >
                ★ {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-16 py-10">
        <div className="h-[2px] mb-10" style={{ background: "linear-gradient(90deg, #ff2d95, #7b2dff, #00d4ff)" }} />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs" style={{ fontFamily: "'Audiowide', sans-serif", background: "linear-gradient(90deg, #ff2d95, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            VAULTDROP
          </span>
          <div className="flex gap-6 text-[10px] text-[#B0A0D0]" style={{ fontFamily: "'Outfit', sans-serif" }}>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#ff2d95] transition-colors">Contact</a>
          </div>
          <span className="text-[8px] text-[#B0A0D0]/50" style={{ fontFamily: "'Press Start 2P', monospace" }}>© 2026</span>
        </div>
      </footer>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
