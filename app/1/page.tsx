"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalistIndustrial() {
  const mainRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered block reveal
      gsap.from(".block-reveal", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.3,
      });

      // Title slam effect
      gsap.from(".slam-title", {
        y: -200,
        opacity: 0,
        duration: 0.4,
        ease: "power4.in",
        delay: 0.8,
      });
      gsap.to(".slam-title", {
        scale: 1,
        duration: 0.1,
        delay: 1.2,
      });
      gsap.from(".slam-shake", {
        x: () => gsap.utils.random(-8, 8),
        duration: 0.05,
        repeat: 6,
        delay: 1.2,
        ease: "none",
      });

      // Warning stripe animation
      gsap.from(".warning-stripe", {
        x: "-100%",
        duration: 1.2,
        ease: "power2.out",
        delay: 1.5,
      });

      // Counter animation
      if (counterRef.current) {
        gsap.to(counterRef.current, {
          innerText: 2847593,
          duration: 2.5,
          delay: 1.8,
          snap: { innerText: 1 },
          ease: "power2.out",
        });
      }

      // Scroll-triggered industrial sections
      gsap.utils.toArray<HTMLElement>(".ind-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
      });

      // Conveyor belt animation
      gsap.to(".conveyor-item", {
        x: "-=300",
        duration: 8,
        repeat: -1,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize((x: number) => parseFloat(String(x)) % 1200),
        },
      });

      // Gauge needle
      gsap.to(".gauge-needle", {
        rotation: 180,
        duration: 3,
        delay: 2,
        ease: "elastic.out(1, 0.5)",
        transformOrigin: "bottom center",
      });

      // Piston animation
      gsap.to(".piston", {
        y: -20,
        duration: 0.3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.15,
      });

      // Feature plates
      gsap.from(".steel-plate", {
        scrollTrigger: { trigger: ".plates-grid", start: "top 80%" },
        rotationX: -90,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        transformOrigin: "top center",
      });

      // Stamp effect
      gsap.from(".stamp", {
        scrollTrigger: { trigger: ".stamp", start: "top 80%" },
        scale: 3,
        opacity: 0,
        rotation: -15,
        duration: 0.3,
        ease: "power4.in",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
        background: "#1a1a1a",
        color: "#e0e0e0",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .hazard-stripe {
          background: repeating-linear-gradient(
            -45deg,
            #f59e0b,
            #f59e0b 10px,
            #000 10px,
            #000 20px
          );
        }
        .steel-gradient {
          background: linear-gradient(135deg, #2a2a2a 0%, #3a3a3a 50%, #2a2a2a 100%);
        }
        .rivet::before, .rivet::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle, #555 30%, #333 70%);
          border-radius: 50%;
          border: 1px solid #222;
        }
        .rivet::before { top: 8px; left: 8px; }
        .rivet::after { top: 8px; right: 8px; }
        .mesh-bg {
          background-image: 
            radial-gradient(circle, #333 1px, transparent 1px);
          background-size: 8px 8px;
        }
        .stencil-text {
          font-family: 'Oswald', sans-serif;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        @keyframes blink-red {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .blink-indicator {
          animation: blink-red 1s ease-in-out infinite;
        }
      `}</style>

      {/* TOP WARNING BAR */}
      <div className="warning-stripe hazard-stripe h-2 w-full fixed top-0 z-50" />

      {/* NAV - Industrial control panel style */}
      <nav className="fixed top-2 left-0 w-full z-40 bg-[#1a1a1a]/95 border-b border-[#333]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full blink-indicator" />
            <span className="stencil-text text-sm font-bold text-[#f59e0b]">
              VAULTDROP
            </span>
            <span className="text-[10px] text-zinc-600 font-mono">v4.2.1</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden md:block text-[10px] text-zinc-500 font-mono">
              SYS.STATUS: <span className="text-green-500">OPERATIONAL</span>
            </span>
            <button className="bg-[#f59e0b] text-black px-4 py-2 text-[11px] font-bold stencil-text hover:bg-[#fbbf24] transition-colors">
              INITIATE TRANSFER
            </button>
          </div>
        </div>
      </nav>

      {/* HERO - Industrial warehouse style */}
      <section className="min-h-screen flex items-center relative pt-16">
        {/* Background mesh */}
        <div className="absolute inset-0 mesh-bg opacity-30" />
        
        {/* Vertical measurement markers */}
        <div className="absolute left-4 top-20 bottom-0 w-px bg-zinc-700 hidden md:block">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="absolute flex items-center gap-1" style={{ top: `${i * 12}%` }}>
              <div className="w-3 h-px bg-zinc-600" />
              <span className="text-[8px] text-zinc-600 font-mono">{i * 100}</span>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto w-full px-6 md:px-16 grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div className="relative z-10">
            <div className="block-reveal inline-block bg-[#f59e0b] text-black px-3 py-1 text-[10px] font-bold stencil-text mb-6">
              CLASSIFIED // SECURE TRANSFER PROTOCOL
            </div>
            
            <div className="slam-shake">
              <h1 className="slam-title stencil-text text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6">
                <span className="block text-[#f59e0b]">HEAVY</span>
                <span className="block">DUTY</span>
                <span className="block text-zinc-500">FILE</span>
                <span className="block">TRANSFER</span>
              </h1>
            </div>

            <div className="w-full h-px bg-zinc-700 my-6" />

            <p className="text-xs text-zinc-400 leading-relaxed max-w-md mb-8 font-mono">
              Industrial-grade encryption for industrial-grade files.
              No compromises. No tracking. No bullshit.
              Built for operators who need reliability, not aesthetics.
            </p>

            <div className="flex gap-3">
              <a href="#upload" className="block-reveal bg-[#f59e0b] text-black px-6 py-3 text-xs font-bold stencil-text hover:bg-white transition-colors">
                DROP FILES →
              </a>
              <a href="#specs" className="block-reveal border-2 border-zinc-600 text-zinc-400 px-6 py-3 text-xs font-bold stencil-text hover:border-[#f59e0b] hover:text-[#f59e0b] transition-colors">
                VIEW SPECS
              </a>
            </div>
          </div>

          {/* Right: Industrial gauge/dashboard */}
          <div className="relative hidden md:block">
            <div className="steel-gradient border-2 border-zinc-700 p-8 relative rivet">
              {/* Gauge display */}
              <div className="text-center mb-6">
                <div className="text-[10px] text-zinc-500 stencil-text mb-2">TRANSFER CAPACITY</div>
                <div className="relative w-40 h-20 mx-auto overflow-hidden">
                  <div className="absolute bottom-0 left-1/2 w-36 h-36 border-4 border-zinc-600 rounded-full -translate-x-1/2" />
                  <div className="gauge-needle absolute bottom-0 left-1/2 w-0.5 h-16 bg-[#f59e0b] -translate-x-1/2 origin-bottom" style={{ transform: "rotate(0deg)" }} />
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-zinc-500 rounded-full -translate-x-1/2 translate-y-1/2" />
                </div>
              </div>

              {/* Stats readout */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-black/50 border border-zinc-700 p-3">
                  <div className="text-[9px] text-zinc-500 stencil-text">FILES SECURED</div>
                  <div className="text-xl font-bold text-[#f59e0b] font-mono">
                    <span ref={counterRef}>0</span>
                  </div>
                </div>
                <div className="bg-black/50 border border-zinc-700 p-3">
                  <div className="text-[9px] text-zinc-500 stencil-text">UPTIME</div>
                  <div className="text-xl font-bold text-green-500 font-mono">99.97%</div>
                </div>
                <div className="bg-black/50 border border-zinc-700 p-3">
                  <div className="text-[9px] text-zinc-500 stencil-text">ENCRYPTION</div>
                  <div className="text-xl font-bold text-white font-mono">AES-256</div>
                </div>
                <div className="bg-black/50 border border-zinc-700 p-3">
                  <div className="text-[9px] text-zinc-500 stencil-text">MAX PAYLOAD</div>
                  <div className="text-xl font-bold text-white font-mono">5 GB</div>
                </div>
              </div>

              {/* Status indicators */}
              <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-500">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  SYSTEMS NOMINAL
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                  ENCRYPTING
                </div>
              </div>
            </div>

            {/* Pistons decoration */}
            <div className="absolute -right-4 top-1/4 flex flex-col gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="piston w-4 h-8 bg-zinc-600 border border-zinc-500" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONVEYOR BELT SECTION */}
      <section className="ind-section border-t-2 border-zinc-700 py-4 overflow-hidden bg-[#111]">
        <div className="flex gap-12 whitespace-nowrap">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="conveyor-item text-[10px] stencil-text text-zinc-600 flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#f59e0b] rotate-45 inline-block" />
              {["ENCRYPTED", "ZERO-KNOWLEDGE", "SELF-DESTRUCT", "NO LOGS", "E2E SECURE", "MILITARY GRADE"][i % 6]}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURES - Steel plates */}
      <section id="specs" className="ind-section px-6 md:px-16 py-24 bg-[#151515]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="hazard-stripe w-8 h-4" />
            <h2 className="stencil-text text-xs font-bold text-zinc-500">TECHNICAL SPECIFICATIONS</h2>
          </div>
          <div className="w-full h-px bg-zinc-700 mb-12" />

          <div className="plates-grid grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              {
                code: "SPEC-001",
                title: "DRAG & DROP LOADER",
                desc: "Industrial-strength file intake. Drag payloads directly into the vault. No forms. No friction. Just raw throughput.",
                metric: "< 0.3s",
                metricLabel: "INTAKE TIME",
              },
              {
                code: "SPEC-002",
                title: "AES-256 ARMOR",
                desc: "Military-specification encryption applied client-side before any data leaves your machine. Unbreakable by design.",
                metric: "256-BIT",
                metricLabel: "KEY LENGTH",
              },
              {
                code: "SPEC-003",
                title: "SELF-DESTRUCT LINKS",
                desc: "Time-fused download links with configurable detonation. Set expiry by time or download count. No residue.",
                metric: "1-72h",
                metricLabel: "FUSE RANGE",
              },
              {
                code: "SPEC-004",
                title: "ZERO-KNOWLEDGE ARCH",
                desc: "We never see your data. Not during transfer, not at rest, not ever. Mathematically guaranteed privacy.",
                metric: "0 BYTES",
                metricLabel: "DATA EXPOSED",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="steel-plate steel-gradient border-2 border-zinc-700 p-8 relative rivet group hover:border-[#f59e0b]/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono text-zinc-600">{f.code}</span>
                  <span className="text-[9px] font-mono text-[#f59e0b]">●</span>
                </div>
                <h3 className="stencil-text text-lg font-bold mb-3 group-hover:text-[#f59e0b] transition-colors">
                  {f.title}
                </h3>
                <p className="text-[11px] text-zinc-500 leading-relaxed mb-6">{f.desc}</p>
                <div className="border-t border-zinc-700 pt-4 flex items-end justify-between">
                  <div>
                    <div className="text-[8px] text-zinc-600 stencil-text">{f.metricLabel}</div>
                    <div className="text-2xl font-bold text-[#f59e0b] font-mono">{f.metric}</div>
                  </div>
                  <div className="w-8 h-8 border border-zinc-600 flex items-center justify-center text-zinc-600 text-xs group-hover:border-[#f59e0b] group-hover:text-[#f59e0b] transition-colors">
                    →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - Assembly line */}
      <section className="ind-section px-6 md:px-16 py-24 border-t-2 border-zinc-700 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="hazard-stripe w-8 h-4" />
            <h2 className="stencil-text text-xs font-bold text-zinc-500">ASSEMBLY LINE</h2>
          </div>
          <div className="w-full h-px bg-zinc-700 mb-12" />

          <div className="relative">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-zinc-700 -translate-y-1/2 z-0" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {[
                { num: "01", title: "INTAKE", desc: "Payload enters the system. Files are validated, measured, and queued for processing.", icon: "▼" },
                { num: "02", title: "FORGE", desc: "AES-256 encryption is applied. Keys are generated client-side. Zero server exposure.", icon: "⚙" },
                { num: "03", title: "DEPLOY", desc: "Secure link generated with configurable self-destruct parameters. Ready for distribution.", icon: "▶" },
              ].map((step, i) => (
                <div key={i} className="bg-[#1a1a1a] border-2 border-zinc-700 p-6 text-center relative">
                  <div className="w-12 h-12 mx-auto mb-4 bg-black border-2 border-[#f59e0b] flex items-center justify-center">
                    <span className="text-[#f59e0b] text-lg">{step.icon}</span>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-600 mb-2">PHASE {step.num}</div>
                  <h3 className="stencil-text text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[11px] text-zinc-500 leading-relaxed">{step.desc}</p>
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-5 top-1/2 -translate-y-1/2 text-[#f59e0b] text-xl z-20">▸</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UPLOAD ZONE */}
      <section id="upload" className="ind-section px-6 md:px-16 py-24 border-t-2 border-zinc-700 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="hazard-stripe w-8 h-4" />
            <h2 className="stencil-text text-xs font-bold text-zinc-500">LOADING DOCK</h2>
          </div>
          <div className="w-full h-px bg-zinc-700 mb-12" />

          <div className="border-4 border-dashed border-zinc-600 bg-[#0d0d0d] p-8 md:p-16 text-center relative hover:border-[#f59e0b] transition-colors duration-500 group">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#f59e0b]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#f59e0b]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#f59e0b]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#f59e0b]" />

            <div className="text-5xl mb-4">⬇</div>
            <h3 className="stencil-text text-2xl font-bold mb-2 group-hover:text-[#f59e0b] transition-colors">
              DROP PAYLOAD HERE
            </h3>
            <p className="text-[11px] text-zinc-600 mb-8 font-mono">
              ACCEPTED: ALL FILE TYPES // MAX: 5GB PER UNIT
            </p>
            <button className="bg-[#f59e0b] text-black px-8 py-3 text-xs font-bold stencil-text hover:bg-white transition-colors">
              SELECT FILES
            </button>

            {/* Mock file list */}
            <div className="mt-10 text-left space-y-2">
              <div className="bg-black border border-zinc-700 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#f59e0b] rotate-45" />
                  <div>
                    <div className="text-[11px] font-bold font-mono">classified_report.pdf</div>
                    <div className="text-[9px] text-zinc-600">2.4 MB // PDF</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-[#f59e0b]" style={{ width: "75%" }} />
                  </div>
                  <span className="text-[10px] text-[#f59e0b] font-mono font-bold">75%</span>
                </div>
              </div>
              <div className="bg-black border border-zinc-700 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rotate-45" />
                  <div>
                    <div className="text-[11px] font-bold font-mono">schematics_v3.dwg</div>
                    <div className="text-[9px] text-zinc-600">18.7 MB // CAD</div>
                  </div>
                </div>
                <span className="text-[10px] text-green-500 font-mono font-bold">✓ SECURED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATION STAMP */}
      <section className="ind-section px-6 md:px-16 py-24 border-t-2 border-zinc-700 bg-[#151515]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="stamp inline-block border-4 border-[#f59e0b] px-12 py-8 relative" style={{ transform: "rotate(-3deg)" }}>
            <div className="absolute -top-px -left-px -right-px -bottom-px border-2 border-[#f59e0b]/30 m-2" />
            <h2 className="stencil-text text-3xl md:text-4xl font-bold mb-2">
              CERTIFIED<br />
              <span className="text-[#f59e0b]">ZERO KNOWLEDGE</span>
            </h2>
            <div className="w-16 h-0.5 bg-[#f59e0b] mx-auto my-4" />
            <p className="text-[11px] text-zinc-500 max-w-sm mx-auto">
              Every byte encrypted before it leaves your machine.
              We cannot see your data. Mathematically impossible.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {["AES-256", "ZERO-KNOWLEDGE", "E2E ENCRYPTED", "SOC 2 TYPE II", "GDPR COMPLIANT"].map((badge, i) => (
              <div
                key={i}
                className="border-2 border-zinc-700 bg-black px-5 py-2 text-[10px] font-bold stencil-text text-zinc-400 hover:border-[#f59e0b] hover:text-[#f59e0b] transition-all duration-200"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-2 border-zinc-700 bg-[#111]">
        <div className="max-w-6xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-[10px] text-zinc-600 font-mono">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <span className="text-[10px] text-zinc-600 font-mono">© 2026 VAULTDROP INDUSTRIES. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 text-[10px] text-zinc-600 stencil-text">
            <a href="#" className="hover:text-[#f59e0b] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#f59e0b] transition-colors">STATUS</a>
          </div>
        </div>
        <div className="hazard-stripe h-2 w-full" />
      </footer>
    </div>
  );
}
