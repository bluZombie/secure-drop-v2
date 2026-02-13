"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NeoTokyoTerminal() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [bootPhase, setBootPhase] = useState(0);

  const fullText = "VAULTDROP v4.2.1 — SECURE FILE TRANSFER PROTOCOL";

  useEffect(() => {
    // Boot sequence
    const bootTimers = [
      setTimeout(() => setBootPhase(1), 200),
      setTimeout(() => setBootPhase(2), 600),
      setTimeout(() => setBootPhase(3), 1000),
      setTimeout(() => setBootPhase(4), 1400),
      setTimeout(() => setBootPhase(5), 1800),
    ];

    // Typewriter effect
    let charIndex = 0;
    const typeTimer = setTimeout(() => {
      const interval = setInterval(() => {
        if (charIndex < fullText.length) {
          setTypedText(fullText.slice(0, charIndex + 1));
          charIndex++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }, 2200);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    const ctx = gsap.context(() => {
      // Panels boot up sequentially
      gsap.from(".terminal-panel", {
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.5,
        delay: 2.5,
        ease: "power2.out",
      });

      // Module cards
      gsap.from(".module-card", {
        scrollTrigger: { trigger: ".modules-section", start: "top 80%" },
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
      });

      // Encryption viz
      gsap.from(".encrypt-block", {
        scrollTrigger: { trigger: ".encrypt-section", start: "top 80%" },
        opacity: 0,
        x: -20,
        stagger: 0.08,
        duration: 0.4,
        ease: "power2.out",
      });

      // Dashboard stats
      gsap.from(".dash-stat", {
        scrollTrigger: { trigger: ".dashboard-section", start: "top 80%" },
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }, mainRef);

    return () => {
      bootTimers.forEach(clearTimeout);
      clearTimeout(typeTimer);
      clearInterval(cursorInterval);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={mainRef} className="scanlines" style={{ background: "#0D0D0D", color: "#00F0FF", minHeight: "100vh", overflow: "hidden" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: 'JetBrains Mono', monospace; }

        /* Matrix rain background */
        @keyframes rain {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .matrix-col {
          position: absolute;
          top: -100%;
          font-size: 14px;
          line-height: 1.2;
          color: #00F0FF10;
          writing-mode: vertical-rl;
          animation: rain linear infinite;
          pointer-events: none;
        }

        /* Neon glow effects */
        .glow-cyan { text-shadow: 0 0 10px #00F0FF, 0 0 30px #00F0FF40; }
        .glow-pink { text-shadow: 0 0 10px #FF2D7B, 0 0 30px #FF2D7B40; }
        .glow-yellow { text-shadow: 0 0 10px #FFE600, 0 0 30px #FFE60040; }
        .box-glow-cyan { box-shadow: 0 0 15px #00F0FF20, inset 0 0 15px #00F0FF05; }
        .box-glow-pink { box-shadow: 0 0 15px #FF2D7B20, inset 0 0 15px #FF2D7B05; }

        /* Glitch effect on hover */
        .glitch-hover {
          position: relative;
          transition: all 0.2s;
        }
        .glitch-hover:hover {
          animation: glitch 0.3s ease;
        }
        @keyframes glitch {
          0% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }
          40% { clip-path: inset(60% 0 10% 0); transform: translate(2px, 0); }
          60% { clip-path: inset(40% 0 30% 0); transform: translate(-1px, 0); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(1px, 0); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0, 0); }
        }

        /* Terminal window frame */
        .terminal-frame {
          border: 1px solid #00F0FF30;
          background: #0D0D0D;
          position: relative;
        }
        .terminal-frame::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 32px;
          background: #151B2B;
          border-bottom: 1px solid #00F0FF20;
        }
        .terminal-dots {
          position: absolute;
          top: 10px;
          left: 12px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .terminal-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        /* Scanline overlay enhancement */
        .scan-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 240, 255, 0.015) 2px,
            rgba(0, 240, 255, 0.015) 4px
          );
        }

        /* Data stream animation */
        @keyframes dataStream {
          0% { background-position: 0 0; }
          100% { background-position: 0 -200px; }
        }
        .data-stream {
          background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            #00F0FF08 1px,
            transparent 2px,
            transparent 20px
          );
          background-size: 100% 200px;
          animation: dataStream 4s linear infinite;
        }

        /* Module card */
        .module-card {
          border: 1px solid #00F0FF15;
          background: #151B2B;
          transition: all 0.3s ease;
        }
        .module-card:hover {
          border-color: #00F0FF40;
          box-shadow: 0 0 20px #00F0FF10;
        }
        .module-card .module-status {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00F0FF;
          box-shadow: 0 0 6px #00F0FF;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* Rotated accent elements */
        .angle-accent {
          transform: rotate(-2deg);
        }
      `}</style>

      {/* Scanline overlay */}
      <div className="scan-overlay" />

      {/* Matrix rain background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-col"
            style={{
              left: `${i * 5 + Math.random() * 3}%`,
              animationDuration: `${8 + Math.random() * 12}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {Array.from({ length: 30 }).map((_, j) => (
              <span key={j}>{String.fromCharCode(0x30A0 + Math.random() * 96)}</span>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b border-[#00F0FF15] bg-[#0D0D0D]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#00F0FF]/30">[SYS]</span>
            <span className="text-sm font-bold glow-cyan">VAULTDROP</span>
            <span className="text-[10px] text-[#FFE600]/50">v4.2.1</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-[#00F0FF]/30 hidden md:inline">STATUS: <span className="text-[#00F0FF]">ONLINE</span></span>
            <a href="#cmd" className="text-[10px] font-bold tracking-wider text-[#0D0D0D] bg-[#00F0FF] px-4 py-2 hover:bg-[#FF2D7B] transition-colors">
              INIT TRANSFER_
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — Terminal window with typing */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 pt-16 relative z-10">
        <div className="w-full max-w-4xl">
          <div className="terminal-frame rounded-lg overflow-hidden">
            <div className="terminal-dots">
              <span style={{ background: "#FF5F57" }} />
              <span style={{ background: "#FFBD2E" }} />
              <span style={{ background: "#28CA41" }} />
            </div>
            <div className="absolute top-8 right-12 text-[10px] text-[#00F0FF]/30 z-10 hidden md:block">
              terminal@vaultdrop:~
            </div>
            <div className="pt-12 p-6 md:p-10 data-stream min-h-[60vh] flex flex-col justify-center">
              {/* Boot sequence */}
              <div className="space-y-1 mb-8 text-[11px]">
                {bootPhase >= 1 && <div className="text-[#00F0FF]/40">[BOOT] Initializing secure environment...</div>}
                {bootPhase >= 2 && <div className="text-[#00F0FF]/40">[BOOT] Loading encryption modules... <span className="text-[#28CA41]">OK</span></div>}
                {bootPhase >= 3 && <div className="text-[#00F0FF]/40">[BOOT] Establishing zero-knowledge protocol... <span className="text-[#28CA41]">OK</span></div>}
                {bootPhase >= 4 && <div className="text-[#00F0FF]/40">[BOOT] System ready. All modules operational.</div>}
                {bootPhase >= 5 && <div className="text-[#FFE600]/60">[SYS] Welcome to VaultDrop.</div>}
              </div>

              {/* Main typed headline */}
              <div className="mb-8">
                <span className="text-[#FF2D7B] text-xs">root@vaultdrop:~$</span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-2 leading-tight">
                  <span className="glow-cyan">{typedText}</span>
                  <span className={`${showCursor ? "opacity-100" : "opacity-0"} text-[#00F0FF]`}>█</span>
                </h1>
              </div>

              {/* Sub info */}
              {bootPhase >= 5 && (
                <div className="space-y-2 text-xs text-[#00F0FF]/40">
                  <div>
                    <span className="text-[#FFE600]">→</span> End-to-end encrypted file transfers
                  </div>
                  <div>
                    <span className="text-[#FFE600]">→</span> Zero-knowledge architecture
                  </div>
                  <div>
                    <span className="text-[#FFE600]">→</span> Self-destructing links with custom expiration
                  </div>
                  <div className="pt-4">
                    <a href="#modules" className="inline-block text-[#FF2D7B] border border-[#FF2D7B]/30 px-6 py-2 hover:bg-[#FF2D7B] hover:text-[#0D0D0D] transition-all text-[11px] tracking-wider font-bold">
                      EXPLORE MODULES →
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — System modules grid */}
      <section id="modules" className="modules-section px-4 md:px-8 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[10px] text-[#FF2D7B] tracking-wider font-bold">SYS.MODULES</span>
            <div className="flex-1 h-px bg-[#00F0FF]/10" />
            <span className="text-[10px] text-[#00F0FF]/30">6 ACTIVE</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { id: "ENC-001", name: "ENCRYPTION ENGINE", desc: "AES-256-GCM client-side encryption. Keys never leave your browser.", status: "ACTIVE", color: "#00F0FF" },
              { id: "TRF-002", name: "TRANSFER PROTOCOL", desc: "Chunked uploads with automatic retry. Handles files up to 5GB.", status: "ACTIVE", color: "#00F0FF" },
              { id: "LNK-003", name: "LINK GENERATOR", desc: "Unique URLs with configurable expiration and download limits.", status: "ACTIVE", color: "#FFE600" },
              { id: "ZKP-004", name: "ZERO-KNOWLEDGE", desc: "Mathematical proof that we cannot access your encrypted data.", status: "ACTIVE", color: "#FF2D7B" },
              { id: "DND-005", name: "DRAG & DROP UI", desc: "Minimal interface. Drop files, get links. No forms, no friction.", status: "ACTIVE", color: "#00F0FF" },
              { id: "AUD-006", name: "AUDIT SYSTEM", desc: "SOC 2 Type II certified. GDPR compliant. Full audit trail.", status: "ACTIVE", color: "#FFE600" },
            ].map((m, i) => (
              <div key={i} className="module-card glitch-hover p-6 rounded-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-wider" style={{ color: `${m.color}60` }}>{m.id}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] tracking-wider" style={{ color: m.color }}>{m.status}</span>
                    <div className="module-status" style={{ background: m.color, boxShadow: `0 0 6px ${m.color}` }} />
                  </div>
                </div>
                <h3 className="text-sm font-bold mb-2 tracking-wider" style={{ color: m.color }}>{m.name}</h3>
                <p className="text-[11px] text-[#00F0FF]/30 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY — Encryption visualization */}
      <section className="encrypt-section px-4 md:px-8 py-24 relative z-10 border-t border-[#00F0FF]/10">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[10px] text-[#FFE600] tracking-wider font-bold">ENCRYPTION.VIZ</span>
            <div className="flex-1 h-px bg-[#00F0FF]/10" />
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-center">
            {/* Input */}
            <div className="encrypt-block terminal-frame rounded-sm p-6 pt-12">
              <div className="terminal-dots">
                <span style={{ background: "#FF5F57" }} />
                <span style={{ background: "#FFBD2E" }} />
                <span style={{ background: "#28CA41" }} />
              </div>
              <div className="text-[10px] text-[#FF2D7B] mb-2 tracking-wider">INPUT</div>
              <div className="text-xs text-[#00F0FF]/60 space-y-1">
                <div>report_q4.pdf</div>
                <div>contracts.zip</div>
                <div>design_v3.fig</div>
              </div>
              <div className="mt-4 text-[10px] text-[#00F0FF]/20">SIZE: 847.2 MB</div>
            </div>

            {/* Process */}
            <div className="encrypt-block text-center py-8">
              <div className="text-[10px] text-[#FFE600] tracking-wider mb-4">PROCESSING</div>
              <div className="space-y-2 text-[11px]">
                <div className="text-[#00F0FF]/40">AES-256-GCM ▸</div>
                <div className="text-[#00F0FF]/40">PBKDF2 ▸</div>
                <div className="text-[#00F0FF]/40">HMAC-SHA256 ▸</div>
              </div>
              <div className="mt-4 flex justify-center gap-1">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-6 rounded-sm"
                    style={{
                      background: i < 6 ? "#00F0FF" : "#00F0FF20",
                      opacity: 0.3 + (i * 0.1),
                      animation: `pulse ${1 + i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Output */}
            <div className="encrypt-block terminal-frame rounded-sm p-6 pt-12">
              <div className="terminal-dots">
                <span style={{ background: "#FF5F57" }} />
                <span style={{ background: "#FFBD2E" }} />
                <span style={{ background: "#28CA41" }} />
              </div>
              <div className="text-[10px] text-[#28CA41] mb-2 tracking-wider">OUTPUT</div>
              <div className="text-xs text-[#00F0FF]/60 space-y-1 break-all">
                <div>a7f3b2c1d4e5...</div>
                <div>9k8j7h6g5f4e...</div>
                <div>m2n3o4p5q6r7...</div>
              </div>
              <div className="mt-4 text-[10px] text-[#28CA41]/60">STATUS: ENCRYPTED ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS — System monitor dashboard */}
      <section className="dashboard-section px-4 md:px-8 py-24 relative z-10 border-t border-[#00F0FF]/10" style={{ background: "#151B2B" }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-[10px] text-[#00F0FF] tracking-wider font-bold">SYS.MONITOR</span>
            <div className="flex-1 h-px bg-[#00F0FF]/10" />
            <span className="text-[10px] text-[#28CA41]">● LIVE</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "FILES TRANSFERRED", value: "2.5M+", color: "#00F0FF" },
              { label: "UPTIME", value: "99.97%", color: "#28CA41" },
              { label: "DATA BREACHES", value: "0", color: "#FF2D7B" },
              { label: "AVG ENCRYPT TIME", value: "0.3s", color: "#FFE600" },
              { label: "ACTIVE USERS", value: "150K+", color: "#00F0FF" },
              { label: "COUNTRIES", value: "150+", color: "#FFE600" },
              { label: "LINKS EXPIRED", value: "8.2M", color: "#FF2D7B" },
              { label: "SATISFACTION", value: "99.1%", color: "#28CA41" },
            ].map((s, i) => (
              <div key={i} className="dash-stat border border-[#00F0FF]/10 p-5 rounded-sm bg-[#0D0D0D]/50">
                <div className="text-[9px] tracking-wider mb-2" style={{ color: `${s.color}60` }}>{s.label}</div>
                <div className="text-xl md:text-2xl font-bold" style={{ color: s.color, textShadow: `0 0 10px ${s.color}30` }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Command prompt */}
      <section id="cmd" className="px-4 md:px-8 py-24 relative z-10 border-t border-[#00F0FF]/10">
        <div className="max-w-3xl mx-auto">
          <div className="terminal-frame rounded-lg overflow-hidden">
            <div className="terminal-dots">
              <span style={{ background: "#FF5F57" }} />
              <span style={{ background: "#FFBD2E" }} />
              <span style={{ background: "#28CA41" }} />
            </div>
            <div className="pt-12 p-8 md:p-12 text-center">
              <div className="text-[10px] text-[#00F0FF]/30 mb-6">root@vaultdrop:~$</div>
              <h2 className="text-2xl md:text-4xl font-bold glow-cyan mb-4 leading-tight">
                READY TO INITIATE<br />
                <span className="glow-pink text-[#FF2D7B]">SECURE TRANSFER?</span>
              </h2>
              <p className="text-xs text-[#00F0FF]/30 mb-8 max-w-md mx-auto leading-relaxed">
                Execute your first encrypted file transfer. No authentication required. Free tier available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#"
                  className="inline-block text-[11px] font-bold tracking-wider bg-[#00F0FF] text-[#0D0D0D] px-8 py-3 hover:bg-[#FF2D7B] transition-colors"
                >
                  $ INIT --TRANSFER
                </a>
                <a
                  href="#"
                  className="inline-block text-[11px] font-bold tracking-wider border border-[#00F0FF]/30 text-[#00F0FF] px-8 py-3 hover:border-[#FFE600] hover:text-[#FFE600] transition-colors"
                >
                  $ MAN VAULTDROP
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-8 border-t border-[#00F0FF]/10 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] text-[#00F0FF]/20">© 2026 VAULTDROP SYSTEMS. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 text-[10px] text-[#00F0FF]/20">
            <a href="#" className="hover:text-[#00F0FF] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#00F0FF] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#00F0FF] transition-colors">STATUS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
