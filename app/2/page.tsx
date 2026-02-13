"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { title: "Drag & Drop", desc: "Simply drag files into the browser. No forms, no friction.", color: "#2563EB", icon: "↑" },
  { title: "AES-256", desc: "Military-grade encryption seals your files before upload.", color: "#FF6B6B", icon: "⬡" },
  { title: "Expiring Links", desc: "Set time limits and download caps that self-destruct.", color: "#2563EB", icon: "◷" },
  { title: "Zero Knowledge", desc: "We never see your data. Encryption happens client-side.", color: "#FF6B6B", icon: "◈" },
  { title: "No Sign-Up", desc: "No accounts, no profiles. Upload and share instantly.", color: "#0F172A", icon: "→" },
  { title: "5GB Limit", desc: "Transfer large files up to 5GB with no compression.", color: "#0F172A", icon: "▢" },
];

const STATS = [
  { value: 2500000, label: "Files Transferred", suffix: "+" },
  { value: 99.9, label: "Uptime", suffix: "%" },
  { value: 0, label: "Data Breaches", suffix: "" },
  { value: 150, label: "Countries", suffix: "+" },
];

export default function SwissPlayground() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [counters, setCounters] = useState(STATS.map(() => 0));

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text slide in from left
      gsap.from(".swiss-hero-text", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Hero graphic slide in from right
      gsap.from(".swiss-hero-graphic", {
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      // Floating shapes
      gsap.utils.toArray<HTMLElement>(".float-shape").forEach((el, i) => {
        gsap.to(el, {
          y: `${15 + i * 5}`,
          x: `${10 + i * 3}`,
          rotation: 360,
          duration: 8 + i * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Feature cards slide in from alternating directions
      gsap.utils.toArray<HTMLElement>(".swiss-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          x: i % 2 === 0 ? -80 : 80,
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Stats counter animation
      const statsSection = document.querySelector(".stats-section");
      if (statsSection) {
        ScrollTrigger.create({
          trigger: statsSection,
          start: "top 75%",
          onEnter: () => {
            STATS.forEach((stat, i) => {
              gsap.to({ val: 0 }, {
                val: stat.value,
                duration: 2,
                ease: "power2.out",
                onUpdate: function () {
                  setCounters(prev => {
                    const next = [...prev];
                    next[i] = Math.round(this.targets()[0].val * 10) / 10;
                    return next;
                  });
                },
              });
            });
          },
          once: true,
        });
      }

      // Testimonial section
      gsap.from(".testimonial-card", {
        scrollTrigger: { trigger: ".testimonial-section", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "#FAFAFA", color: "#0F172A", minHeight: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .swiss-mono { font-family: 'Space Mono', monospace; }
        .swiss-sans { font-family: 'DM Sans', sans-serif; }

        /* Floating geometric shapes */
        .float-shape {
          position: absolute;
          border-radius: 4px;
          opacity: 0.08;
          pointer-events: none;
        }

        /* 3D tilt card */
        .tilt-card {
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .tilt-card:hover {
          transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateY(-8px);
          box-shadow: 12px 12px 0 rgba(15, 23, 42, 0.08);
        }

        /* Diagonal divider */
        .diagonal-top {
          clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%);
        }
        .diagonal-bottom {
          clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%);
        }

        /* Interactive grid blocks */
        .grid-block {
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
        }
        .grid-block:hover {
          transform: scale(1.1);
          z-index: 10;
        }

        /* Counter */
        .stat-number {
          font-variant-numeric: tabular-nums;
        }
      `}</style>

      {/* Background floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="float-shape" style={{ width: 80, height: 80, background: "#2563EB", top: "10%", left: "5%", borderRadius: "50%" }} />
        <div className="float-shape" style={{ width: 60, height: 60, background: "#FF6B6B", top: "30%", right: "10%", transform: "rotate(45deg)" }} />
        <div className="float-shape" style={{ width: 100, height: 100, background: "#0F172A", bottom: "20%", left: "15%", borderRadius: "50%" }} />
        <div className="float-shape" style={{ width: 40, height: 40, background: "#2563EB", top: "60%", right: "25%", transform: "rotate(30deg)" }} />
        <div className="float-shape" style={{ width: 70, height: 70, background: "#FF6B6B", bottom: "10%", right: "5%", borderRadius: "50%" }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <span className="swiss-mono text-lg font-bold">
            Vault<span className="text-[#2563EB]">Drop</span>
          </span>
          <div className="flex items-center gap-6">
            <a href="#features" className="swiss-sans text-sm text-[#0F172A]/50 hover:text-[#0F172A] transition-colors hidden md:inline">Features</a>
            <a href="#stats" className="swiss-sans text-sm text-[#0F172A]/50 hover:text-[#0F172A] transition-colors hidden md:inline">Stats</a>
            <a href="#cta" className="swiss-sans text-sm font-semibold bg-[#2563EB] text-white px-5 py-2.5 rounded-lg hover:bg-[#1d4ed8] transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — Split layout */}
      <section className="min-h-screen flex items-center px-6 md:px-12 pt-20 relative z-10">
        <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
          <div className="swiss-hero-text">
            <div className="swiss-mono text-xs tracking-[0.2em] text-[#2563EB] mb-4 font-bold">SECURE FILE TRANSFER</div>
            <h1 className="swiss-mono text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6">
              Drop it.<br />
              <span className="text-[#FF6B6B]">Lock it.</span><br />
              Share it.
            </h1>
            <p className="swiss-sans text-lg text-[#0F172A]/50 max-w-md mb-8 leading-relaxed">
              End-to-end encrypted file transfers with expiring links. No accounts needed. Your files, your rules.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cta" className="swiss-sans font-semibold bg-[#0F172A] text-white px-8 py-4 rounded-xl hover:bg-[#1e293b] transition-colors text-sm">
                Start Transferring →
              </a>
              <a href="#features" className="swiss-sans font-semibold border-2 border-[#E2E8F0] text-[#0F172A] px-8 py-4 rounded-xl hover:border-[#2563EB] hover:text-[#2563EB] transition-colors text-sm">
                Learn More
              </a>
            </div>
          </div>

          {/* Interactive grid graphic */}
          <div className="swiss-hero-graphic">
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto md:ml-auto">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="grid-block aspect-square rounded-2xl flex flex-col items-center justify-center p-4 text-center"
                  style={{
                    background: activeBlock === i ? f.color : `${f.color}15`,
                    color: activeBlock === i ? "#fff" : f.color,
                    border: `2px solid ${f.color}30`,
                  }}
                  onMouseEnter={() => setActiveBlock(i)}
                  onMouseLeave={() => setActiveBlock(null)}
                >
                  <span className="text-2xl mb-2">{f.icon}</span>
                  <span className="swiss-mono text-[10px] font-bold leading-tight">{f.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES — Masonry-style cards */}
      <section id="features" className="diagonal-top relative z-10 bg-[#0F172A] text-white px-6 md:px-12 py-32 mt-[-4%]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="swiss-mono text-xs tracking-[0.2em] text-[#2563EB] font-bold">FEATURES</span>
            <h2 className="swiss-mono text-3xl md:text-5xl font-bold mt-4 leading-tight">
              Everything you need.<br />
              <span className="text-[#FF6B6B]">Nothing you don&apos;t.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className={`swiss-card tilt-card rounded-2xl p-8 ${i === 1 ? "md:translate-y-8" : i === 4 ? "md:-translate-y-8" : ""}`}
                style={{ background: "#1e293b", border: `1px solid ${f.color}20` }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-6"
                  style={{ background: `${f.color}20`, color: f.color }}
                >
                  {f.icon}
                </div>
                <h3 className="swiss-mono text-lg font-bold mb-3">{f.title}</h3>
                <p className="swiss-sans text-sm text-white/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS — Large animated counters */}
      <section id="stats" className="stats-section relative z-10 px-6 md:px-12 py-32 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="stat-number swiss-mono text-4xl md:text-6xl font-bold text-[#0F172A]">
                  {stat.value >= 1000000
                    ? `${(counters[i] / 1000000).toFixed(1)}M`
                    : stat.value >= 1000
                    ? `${(counters[i] / 1000).toFixed(0)}K`
                    : counters[i]}
                  <span className="text-[#2563EB]">{stat.suffix}</span>
                </div>
                <div className="swiss-sans text-sm text-[#0F172A]/40 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonial-section relative z-10 px-6 md:px-12 py-24 bg-[#F1F5F9]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <span className="swiss-mono text-xs tracking-[0.2em] text-[#FF6B6B] font-bold">TESTIMONIALS</span>
            <h2 className="swiss-mono text-3xl md:text-4xl font-bold mt-4">Trusted by teams worldwide</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "VaultDrop replaced our entire file sharing workflow. The encryption is seamless.", name: "Sarah Chen", role: "CTO, Nexus Labs" },
              { quote: "Finally, a secure transfer tool that doesn't require a PhD to use. Our legal team loves it.", name: "Marcus Rivera", role: "Head of Legal, Finova" },
              { quote: "The self-destructing links give us peace of mind for sensitive client documents.", name: "Aisha Patel", role: "Director, CloudBridge" },
            ].map((t, i) => (
              <div key={i} className="testimonial-card bg-white rounded-2xl p-8 shadow-sm border border-[#E2E8F0]">
                <div className="text-[#2563EB] text-3xl mb-4">&ldquo;</div>
                <p className="swiss-sans text-sm text-[#0F172A]/70 leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <div className="swiss-sans text-sm font-semibold">{t.name}</div>
                  <div className="swiss-sans text-xs text-[#0F172A]/40">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Diagonal split */}
      <section id="cta" className="relative z-10 min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-2">
          <div className="bg-[#2563EB]" />
          <div className="bg-[#0F172A]" />
        </div>
        <div className="absolute inset-0" style={{ clipPath: "polygon(0 0, 60% 0, 40% 100%, 0 100%)", background: "#2563EB", zIndex: 1 }} />
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <h2 className="swiss-mono text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to<br />drop securely?
            </h2>
          </div>
          <div className="text-right">
            <p className="swiss-sans text-white/60 mb-8 text-sm leading-relaxed">
              Start transferring files with military-grade encryption. No account required. Free for files up to 1GB.
            </p>
            <a
              href="#"
              className="swiss-sans inline-block font-semibold bg-[#FF6B6B] text-white px-10 py-4 rounded-xl hover:bg-[#ff5252] transition-colors text-sm"
            >
              Start Free Transfer →
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12 bg-[#0F172A] text-white/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="swiss-mono text-xs">© 2026 VaultDrop</span>
          <div className="flex gap-6 swiss-sans text-xs">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
