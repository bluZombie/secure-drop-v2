"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RetroSynthwave() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Sun rise
      gsap.from(".synth-sun", {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "power2.out",
        delay: 0.3,
      });

      // Grid perspective animation
      gsap.from(".perspective-grid", {
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
      });

      // Title chrome effect
      gsap.from(".chrome-title span", {
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.4)",
        delay: 1,
      });

      // Subtitle
      gsap.from(".synth-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.8,
        ease: "power2.out",
      });

      // CTA buttons
      gsap.from(".synth-cta", {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        delay: 2.2,
        ease: "back.out(1.7)",
      });

      // Horizontal lines pulse
      gsap.to(".h-line-pulse", {
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".synth-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
        });
      });

      // Feature cards
      gsap.from(".synth-card", {
        scrollTrigger: { trigger: ".synth-grid", start: "top 80%" },
        y: 60,
        rotationX: -15,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });

      // VHS tracking effect
      gsap.to(".vhs-line", {
        y: "100vh",
        duration: 8,
        repeat: -1,
        ease: "none",
        stagger: 2,
      });

      // Palm tree sway
      gsap.to(".palm-sway", {
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "bottom center",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Outfit', sans-serif",
        background: "#1a0a2e",
        color: "#fff",
        minHeight: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Press+Start+2P&family=Righteous&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .retro-font { font-family: 'Righteous', cursive; }
        .pixel-font { font-family: 'Press Start 2P', cursive; }
        
        .gradient-text {
          background: linear-gradient(180deg, #ff6ec7 0%, #ff9a56 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .chrome-text {
          background: linear-gradient(180deg, #fff 0%, #ff6ec7 40%, #7b2ff7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .synth-gradient {
          background: linear-gradient(180deg, #1a0a2e 0%, #2d1b69 30%, #1a0a2e 100%);
        }
        
        .neon-glow-pink {
          text-shadow: 0 0 10px #ff6ec7, 0 0 40px #ff6ec744, 0 0 80px #ff6ec722;
        }
        .neon-glow-blue {
          text-shadow: 0 0 10px #00d4ff, 0 0 40px #00d4ff44;
        }
        
        .retro-border {
          border-image: linear-gradient(135deg, #ff6ec7, #7b2ff7, #00d4ff) 1;
        }
        
        .grid-floor {
          background: 
            linear-gradient(90deg, #ff6ec720 1px, transparent 1px),
            linear-gradient(0deg, #ff6ec720 1px, transparent 1px);
          background-size: 40px 40px;
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center top;
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        .sunset-gradient {
          background: linear-gradient(180deg, 
            #ff6ec7 0%, 
            #ff9a56 25%, 
            #ffd700 50%, 
            #ff6ec7 50%, 
            #7b2ff7 75%, 
            #1a0a2e 100%
          );
        }
      `}</style>

      {/* VHS TRACKING LINES */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden opacity-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="vhs-line absolute left-0 w-full h-1 bg-white" style={{ top: `${-10 + i * 40}%` }} />
        ))}
      </div>

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#1a0a2e]/90 backdrop-blur-sm border-b border-[#ff6ec7]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="retro-font text-xl gradient-text">VaultDrop</span>
            <span className="pixel-font text-[7px] text-[#ff6ec7]/50 mt-2">™</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-wider text-white/50">
            <a href="#features" className="hover:text-[#ff6ec7] transition-colors">FEATURES</a>
            <a href="#how" className="hover:text-[#ff6ec7] transition-colors">HOW IT WORKS</a>
            <a href="#upload" className="hover:text-[#ff6ec7] transition-colors">UPLOAD</a>
          </div>
          <button className="bg-gradient-to-r from-[#ff6ec7] to-[#7b2ff7] text-white px-5 py-2 text-[11px] font-bold tracking-wider hover:from-[#ff9a56] hover:to-[#ff6ec7] transition-all duration-300 rounded-sm">
            START DROP
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center relative pt-16 px-6">
        {/* Synthwave sun */}
        <div className="synth-sun absolute top-[15%] md:top-[10%] w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden">
          <div className="w-full h-full sunset-gradient" />
          {/* Sun horizontal lines */}
          <div className="absolute inset-0 flex flex-col justify-end pb-4 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-line-pulse w-full bg-[#1a0a2e]" style={{ height: `${3 + i * 2}px`, opacity: 0.4 }} />
            ))}
          </div>
        </div>

        {/* Perspective grid floor */}
        <div className="perspective-grid absolute bottom-0 left-0 right-0 h-[40vh] grid-floor" />

        {/* Palm trees */}
        <div className="palm-sway absolute bottom-[35vh] left-[5%] text-6xl md:text-8xl opacity-20 hidden md:block">🌴</div>
        <div className="palm-sway absolute bottom-[38vh] right-[8%] text-5xl md:text-7xl opacity-15 hidden md:block" style={{ animationDelay: "1s" }}>🌴</div>

        <div className="relative z-10 text-center mt-[20vh] md:mt-[25vh]">
          <div className="mb-4">
            <span className="pixel-font text-[8px] md:text-[10px] text-[#ff6ec7] tracking-[0.5em]">
              ▸ SECURE FILE TRANSFER ◂
            </span>
          </div>

          <h1 className="chrome-title retro-font text-5xl md:text-7xl lg:text-[7rem] leading-[0.95] mb-6">
            {"VAULT".split("").map((c, i) => (
              <span key={i} className="inline-block gradient-text">{c}</span>
            ))}
            <br />
            {"DROP".split("").map((c, i) => (
              <span key={i} className="inline-block chrome-text">{c}</span>
            ))}
          </h1>

          <p className="synth-sub text-sm md:text-base text-white/60 max-w-md mx-auto leading-relaxed mb-10 font-light">
            Encrypted file transfers with retro soul and modern security.
            No accounts. No tracking. Just pure, encrypted drops.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#upload" className="synth-cta bg-gradient-to-r from-[#ff6ec7] to-[#7b2ff7] text-white px-10 py-4 text-sm font-bold tracking-wider hover:from-[#ff9a56] hover:to-[#ff6ec7] transition-all duration-300 rounded-sm">
              DROP FILES NOW
            </a>
            <a href="#features" className="synth-cta border-2 border-[#ff6ec7]/50 text-[#ff6ec7] px-10 py-4 text-sm font-bold tracking-wider hover:bg-[#ff6ec7]/10 transition-all duration-300 rounded-sm">
              EXPLORE
            </a>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="synth-section border-t border-b border-[#ff6ec7]/20 py-3 overflow-hidden bg-[#1a0a2e]/80 relative z-10">
        <div className="flex gap-8 animate-marquee whitespace-nowrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i} className="text-[10px] font-bold tracking-[0.3em] text-[#ff6ec7]/30 flex items-center gap-3">
              <span className="text-[#7b2ff7]">◆</span>
              {["ENCRYPTED", "ZERO-KNOWLEDGE", "SELF-DESTRUCT", "NO LOGS", "E2E SECURE"][i % 5]}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .animate-marquee { animation: marquee 20s linear infinite; }
        `}</style>
      </section>

      {/* FEATURES */}
      <section id="features" className="synth-section px-6 md:px-16 py-24 synth-gradient relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="pixel-font text-[8px] text-[#00d4ff] tracking-[0.3em]">FEATURES</span>
            <h2 className="retro-font text-3xl md:text-4xl gradient-text mt-4">Power Features</h2>
          </div>

          <div className="synth-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: "📤",
                title: "TURBO UPLOAD",
                desc: "Drag-and-drop with real-time progress. Lightning-fast file intake with zero friction.",
                gradient: "from-[#ff6ec7] to-[#ff9a56]",
              },
              {
                icon: "🔒",
                title: "CRYPTO SHIELD",
                desc: "AES-256 encryption applied client-side. Your files are locked down before they leave your machine.",
                gradient: "from-[#7b2ff7] to-[#00d4ff]",
              },
              {
                icon: "💣",
                title: "SELF-DESTRUCT",
                desc: "Links with built-in timers. Set expiry by hours or download count. Boom — gone forever.",
                gradient: "from-[#ff9a56] to-[#ffd700]",
              },
              {
                icon: "👻",
                title: "GHOST MODE",
                desc: "Zero-knowledge architecture. No logs, no metadata, no traces. Like you were never here.",
                gradient: "from-[#00d4ff] to-[#7b2ff7]",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="synth-card border border-white/10 bg-white/[0.03] p-8 rounded-sm relative overflow-hidden group hover:border-[#ff6ec7]/30 transition-all duration-300"
              >
                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />
                
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="retro-font text-lg mb-3 gradient-text">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="synth-section px-6 md:px-16 py-24 bg-[#0f0520] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="pixel-font text-[8px] text-[#ff6ec7] tracking-[0.3em]">PROCESS</span>
            <h2 className="retro-font text-3xl md:text-4xl gradient-text mt-4">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-px bg-gradient-to-r from-[#ff6ec7] via-[#7b2ff7] to-[#00d4ff] opacity-30 -translate-y-1/2" />

            {[
              { num: "01", title: "UPLOAD", desc: "Drag your files in. Any type, up to 5GB. The neon highway awaits.", color: "#ff6ec7" },
              { num: "02", title: "ENCRYPT", desc: "AES-256 wraps your files in an unbreakable digital fortress. Client-side.", color: "#7b2ff7" },
              { num: "03", title: "SHARE", desc: "Get a self-destructing link. Share it anywhere. It vanishes after use.", color: "#00d4ff" },
            ].map((step, i) => (
              <div key={i} className="text-center relative z-10">
                <div
                  className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center border-2 bg-[#0f0520]"
                  style={{ borderColor: step.color, boxShadow: `0 0 20px ${step.color}44` }}
                >
                  <span className="retro-font text-xl" style={{ color: step.color }}>{step.num}</span>
                </div>
                <h3 className="retro-font text-xl mb-3" style={{ color: step.color }}>{step.title}</h3>
                <p className="text-sm text-white/40 leading-relaxed font-light max-w-xs mx-auto">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section id="upload" className="synth-section px-6 md:px-16 py-24 synth-gradient relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="pixel-font text-[8px] text-[#00d4ff] tracking-[0.3em]">TRANSFER</span>
            <h2 className="retro-font text-3xl md:text-4xl gradient-text mt-4">Drop Zone</h2>
          </div>

          <div className="border-2 border-dashed border-[#ff6ec7]/30 bg-[#1a0a2e]/50 p-8 md:p-16 text-center relative group hover:border-[#ff6ec7] transition-all duration-500 rounded-sm">
            {/* Glow corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff6ec7] opacity-50" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#00d4ff] opacity-50" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#00d4ff] opacity-50" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ff6ec7] opacity-50" />

            <div className="text-5xl mb-4">🚀</div>
            <h3 className="retro-font text-2xl gradient-text mb-2">Drop Files Here</h3>
            <p className="text-xs text-white/40 mb-8">Drag & drop or click to browse • Max 5GB per file</p>
            <button className="bg-gradient-to-r from-[#ff6ec7] to-[#7b2ff7] text-white px-8 py-3 text-sm font-bold tracking-wider hover:from-[#ff9a56] hover:to-[#ff6ec7] transition-all duration-300 rounded-sm">
              SELECT FILES
            </button>

            {/* Mock uploads */}
            <div className="mt-10 space-y-3 text-left">
              <div className="border border-[#ff6ec7]/20 bg-[#ff6ec7]/[0.05] p-4 flex items-center justify-between rounded-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#ff6ec7]">♦</span>
                  <div>
                    <div className="text-xs font-medium">synthwave_mix_final.wav</div>
                    <div className="text-[10px] text-white/30">84.2 MB</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1.5 bg-white/5 overflow-hidden rounded-full">
                    <div className="h-full bg-gradient-to-r from-[#ff6ec7] to-[#7b2ff7] rounded-full" style={{ width: "62%" }} />
                  </div>
                  <span className="text-[10px] text-[#ff6ec7] font-bold">62%</span>
                </div>
              </div>
              <div className="border border-[#00d4ff]/20 bg-[#00d4ff]/[0.05] p-4 flex items-center justify-between rounded-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#00d4ff]">♦</span>
                  <div>
                    <div className="text-xs font-medium">neon_artwork_v2.psd</div>
                    <div className="text-[10px] text-white/30">256.8 MB</div>
                  </div>
                </div>
                <span className="text-[10px] text-[#00d4ff] font-bold">✓ DROPPED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="synth-section px-6 md:px-16 py-24 bg-[#0f0520] relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="retro-font text-3xl md:text-4xl mb-4">
            <span className="gradient-text">Locked Down.</span>{" "}
            <span className="chrome-text">Neon Tight.</span>
          </h2>
          <p className="text-sm text-white/40 max-w-md mx-auto leading-relaxed mb-12 font-light">
            Every file encrypted before it hits the wire. Zero-knowledge means
            we literally cannot see your data. That&apos;s not a promise — it&apos;s math.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "AES-256", color: "#ff6ec7" },
              { label: "ZERO-KNOWLEDGE", color: "#7b2ff7" },
              { label: "E2E ENCRYPTED", color: "#00d4ff" },
              { label: "SOC 2", color: "#ff9a56" },
              { label: "GDPR", color: "#ffd700" },
            ].map((badge, i) => (
              <div
                key={i}
                className="border px-6 py-3 text-[11px] font-bold tracking-wider rounded-sm transition-all duration-300 hover:scale-105"
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
      <footer className="border-t border-[#ff6ec7]/10 px-6 md:px-16 py-8 bg-[#0a0520] relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="retro-font text-sm gradient-text">VaultDrop</span>
          <span className="text-[10px] text-white/20">© 2026 VaultDrop. All rights reserved.</span>
          <div className="flex gap-6 text-[10px] text-white/30 tracking-wider">
            <a href="#" className="hover:text-[#ff6ec7] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#ff6ec7] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#ff6ec7] transition-colors">STATUS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
