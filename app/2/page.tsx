"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryEditorial() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Curtain reveal
      gsap.to(".curtain-left", { x: "-100%", duration: 1.4, ease: "power4.inOut", delay: 0.3 });
      gsap.to(".curtain-right", { x: "100%", duration: 1.4, ease: "power4.inOut", delay: 0.3 });

      // Hero text reveal with clip-path
      gsap.from(".lux-reveal", {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        delay: 1.2,
      });

      // Gold line draw
      gsap.from(".gold-line", {
        scaleX: 0,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 1.8,
      });

      // Floating gold particles
      gsap.utils.toArray<HTMLElement>(".gold-particle").forEach((p, i) => {
        gsap.to(p, {
          y: gsap.utils.random(-30, 30),
          x: gsap.utils.random(-20, 20),
          opacity: gsap.utils.random(0.3, 0.8),
          duration: gsap.utils.random(3, 6),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".lux-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none none" },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Editorial image parallax
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.to(img, {
          scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: 1 },
          y: -60,
          ease: "none",
        });
      });

      // Feature cards elegant entrance
      gsap.from(".lux-card", {
        scrollTrigger: { trigger: ".lux-cards-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });

      // Number counter
      gsap.from(".lux-stat-num", {
        scrollTrigger: { trigger: ".lux-stats", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: "#0c0f1a",
        color: "#f5f0e8",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .sans { font-family: 'Montserrat', sans-serif; }
        .gold { color: #c9a84c; }
        .bg-gold { background-color: #c9a84c; }
        .border-gold { border-color: #c9a84c; }
        .editorial-grid {
          display: grid;
          grid-template-columns: 1fr 2px 1fr;
          gap: 0;
        }
        @media (max-width: 768px) {
          .editorial-grid {
            grid-template-columns: 1fr;
          }
        }
        .luxury-gradient {
          background: linear-gradient(135deg, #0c0f1a 0%, #1a1d2e 50%, #0c0f1a 100%);
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* CURTAIN REVEAL */}
      <div className="curtain-left fixed inset-0 z-50 bg-[#c9a84c]" style={{ width: "50%", left: 0 }} />
      <div className="curtain-right fixed inset-0 z-50 bg-[#c9a84c]" style={{ width: "50%", left: "50%" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#0c0f1a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-light tracking-[0.3em] gold">V</span>
            <span className="text-[10px] sans font-medium tracking-[0.4em] text-zinc-400 uppercase mt-1">aultdrop</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] sans font-medium tracking-[0.2em] text-zinc-400 uppercase">
            <a href="#features" className="hover:text-[#c9a84c] transition-colors duration-500">Features</a>
            <a href="#process" className="hover:text-[#c9a84c] transition-colors duration-500">Process</a>
            <a href="#security" className="hover:text-[#c9a84c] transition-colors duration-500">Security</a>
          </div>
          <a href="#transfer" className="sans text-[11px] font-medium tracking-[0.15em] uppercase bg-[#c9a84c] text-[#0c0f1a] px-6 py-2.5 hover:bg-[#d4b65c] transition-colors duration-500">
            Begin Transfer
          </a>
        </div>
      </nav>

      {/* GOLD PARTICLES */}
      <div className="fixed inset-0 pointer-events-none z-30">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="gold-particle absolute w-1 h-1 rounded-full bg-[#c9a84c]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center relative pt-20 px-8">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="lux-reveal mb-6">
            <span className="sans text-[11px] font-medium tracking-[0.5em] text-[#c9a84c] uppercase">
              Established for the discerning
            </span>
          </div>

          <h1 className="lux-reveal text-6xl md:text-8xl lg:text-[9rem] font-light leading-[0.85] mb-8 tracking-tight">
            The Art of<br />
            <em className="font-light italic gold">Secure</em><br />
            Transfer
          </h1>

          <div className="gold-line w-24 h-px bg-[#c9a84c] mx-auto mb-8 origin-center" />

          <p className="lux-reveal sans text-sm md:text-base font-light text-zinc-400 max-w-lg mx-auto leading-relaxed mb-12">
            Where military-grade encryption meets refined elegance.
            Your most sensitive files, handled with the discretion they deserve.
          </p>

          <div className="lux-reveal flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#transfer" className="sans text-[11px] font-medium tracking-[0.2em] uppercase bg-[#c9a84c] text-[#0c0f1a] px-10 py-4 hover:bg-[#d4b65c] transition-all duration-500">
              Secure Your Files
            </a>
            <a href="#features" className="sans text-[11px] font-medium tracking-[0.2em] uppercase border border-[#c9a84c]/30 text-[#c9a84c] px-10 py-4 hover:bg-[#c9a84c]/10 transition-all duration-500">
              Discover More
            </a>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-24 left-8 w-20 h-20 border-t border-l border-[#c9a84c]/20 hidden md:block" />
        <div className="absolute bottom-12 right-8 w-20 h-20 border-b border-r border-[#c9a84c]/20 hidden md:block" />
      </section>

      {/* EDITORIAL DIVIDER */}
      <section className="lux-section px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="sans text-[9px] tracking-[0.5em] text-zinc-600 uppercase">Since 2026</span>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#c9a84c]/40" />
          <span className="sans text-[9px] tracking-[0.5em] text-zinc-600 uppercase">Zero Knowledge</span>
          <div className="w-1.5 h-1.5 rotate-45 border border-[#c9a84c]/40" />
          <span className="sans text-[9px] tracking-[0.5em] text-zinc-600 uppercase">End-to-End</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>
      </section>

      {/* FEATURES - Editorial layout */}
      <section id="features" className="lux-section px-8 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="sans text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase">Our Distinction</span>
            <h2 className="text-4xl md:text-5xl font-light mt-4 tracking-tight">
              Crafted with <em className="italic gold">Precision</em>
            </h2>
          </div>

          <div className="lux-cards-grid space-y-16">
            {/* Feature 1 - Left aligned */}
            <div className="lux-card grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="parallax-img w-full aspect-[4/3] luxury-gradient border border-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl gold mb-4">⬆</div>
                    <div className="sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Effortless Intake</div>
                  </div>
                </div>
              </div>
              <div className="md:pl-8">
                <span className="sans text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase">01 — Upload</span>
                <h3 className="text-3xl font-light mt-3 mb-4 tracking-tight">
                  Drag & Drop<br /><em className="italic">Elegance</em>
                </h3>
                <div className="w-12 h-px bg-[#c9a84c]/40 mb-4" />
                <p className="sans text-sm font-light text-zinc-400 leading-relaxed">
                  A seamless upload experience designed for those who value their time.
                  Simply drag your files — we handle the rest with grace.
                </p>
              </div>
            </div>

            {/* Feature 2 - Right aligned */}
            <div className="lux-card grid md:grid-cols-2 gap-12 items-center">
              <div className="md:order-2">
                <div className="parallax-img w-full aspect-[4/3] luxury-gradient border border-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl gold mb-4">🔐</div>
                    <div className="sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Impenetrable</div>
                  </div>
                </div>
              </div>
              <div className="md:order-1 md:pr-8">
                <span className="sans text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase">02 — Encrypt</span>
                <h3 className="text-3xl font-light mt-3 mb-4 tracking-tight">
                  Military-Grade<br /><em className="italic">Protection</em>
                </h3>
                <div className="w-12 h-px bg-[#c9a84c]/40 mb-4" />
                <p className="sans text-sm font-light text-zinc-400 leading-relaxed">
                  AES-256 encryption applied before your files leave the browser.
                  The same standard trusted by governments and intelligence agencies worldwide.
                </p>
              </div>
            </div>

            {/* Feature 3 - Left aligned */}
            <div className="lux-card grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="parallax-img w-full aspect-[4/3] luxury-gradient border border-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl gold mb-4">⏳</div>
                    <div className="sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">Ephemeral</div>
                  </div>
                </div>
              </div>
              <div className="md:pl-8">
                <span className="sans text-[10px] tracking-[0.4em] text-[#c9a84c] uppercase">03 — Share</span>
                <h3 className="text-3xl font-light mt-3 mb-4 tracking-tight">
                  Self-Destructing<br /><em className="italic">Links</em>
                </h3>
                <div className="w-12 h-px bg-[#c9a84c]/40 mb-4" />
                <p className="sans text-sm font-light text-zinc-400 leading-relaxed">
                  Every link carries an expiration — by time or by access count.
                  Once fulfilled, it vanishes without a trace. As it should be.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="lux-stats lux-section px-8 py-20 border-t border-b border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "2.8M+", label: "Files Secured" },
            { num: "99.97%", label: "Uptime" },
            { num: "0", label: "Data Breaches" },
            { num: "256-bit", label: "Encryption" },
          ].map((stat, i) => (
            <div key={i} className="lux-stat-num">
              <div className="text-3xl md:text-4xl font-light gold mb-2">{stat.num}</div>
              <div className="sans text-[10px] tracking-[0.3em] text-zinc-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* UPLOAD SECTION */}
      <section id="transfer" className="lux-section px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="sans text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase">Begin</span>
          <h2 className="text-4xl md:text-5xl font-light mt-4 mb-12 tracking-tight">
            Your Secure <em className="italic gold">Transfer</em>
          </h2>

          <div className="border border-[#c9a84c]/20 p-12 md:p-16 relative shimmer group hover:border-[#c9a84c]/40 transition-colors duration-700">
            {/* Ornamental corners */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#c9a84c]/40" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#c9a84c]/40" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c9a84c]/40" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c9a84c]/40" />

            <div className="text-4xl gold mb-6">◇</div>
            <h3 className="text-2xl font-light mb-2">Drop Your Files</h3>
            <p className="sans text-xs text-zinc-500 mb-8">Drag files here or click to browse • Up to 5GB</p>
            <button className="sans text-[11px] font-medium tracking-[0.2em] uppercase border border-[#c9a84c] text-[#c9a84c] px-8 py-3 hover:bg-[#c9a84c] hover:text-[#0c0f1a] transition-all duration-500">
              Select Files
            </button>

            {/* Mock uploads */}
            <div className="mt-10 space-y-3 text-left">
              <div className="border border-white/5 p-4 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <div className="sans text-xs font-medium">confidential_brief.pdf</div>
                  <div className="sans text-[10px] text-zinc-600 mt-0.5">2.4 MB</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 h-[3px] bg-white/5 overflow-hidden rounded-full">
                    <div className="h-full bg-[#c9a84c] rounded-full" style={{ width: "75%" }} />
                  </div>
                  <span className="sans text-[10px] gold">75%</span>
                </div>
              </div>
              <div className="border border-white/5 p-4 flex items-center justify-between bg-white/[0.02]">
                <div>
                  <div className="sans text-xs font-medium">portfolio_final.zip</div>
                  <div className="sans text-[10px] text-zinc-600 mt-0.5">48.2 MB</div>
                </div>
                <span className="sans text-[10px] gold font-medium">✓ Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY SECTION */}
      <section id="security" className="lux-section px-8 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <span className="sans text-[10px] tracking-[0.5em] text-[#c9a84c] uppercase">Our Promise</span>
          <h2 className="text-4xl md:text-5xl font-light mt-4 mb-6 tracking-tight">
            Absolute <em className="italic gold">Discretion</em>
          </h2>
          <p className="sans text-sm font-light text-zinc-400 max-w-lg mx-auto leading-relaxed mb-16">
            Your privacy is not a feature — it is our foundation.
            Zero-knowledge architecture ensures we never see, store, or access your data.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "AES-256", sub: "Encryption Standard" },
              { label: "Zero Knowledge", sub: "Architecture" },
              { label: "SOC 2 Type II", sub: "Certified" },
              { label: "GDPR", sub: "Compliant" },
            ].map((item, i) => (
              <div key={i} className="border border-white/10 px-8 py-5 hover:border-[#c9a84c]/30 transition-colors duration-500 group">
                <div className="text-lg font-light gold group-hover:text-[#d4b65c] transition-colors">{item.label}</div>
                <div className="sans text-[9px] tracking-[0.3em] text-zinc-600 uppercase mt-1">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl font-light tracking-[0.3em] gold">V</span>
              <span className="sans text-[9px] tracking-[0.4em] text-zinc-600 uppercase">aultdrop</span>
            </div>
            <div className="flex gap-8 sans text-[10px] tracking-[0.2em] text-zinc-600 uppercase">
              <a href="#" className="hover:text-[#c9a84c] transition-colors duration-500">Privacy</a>
              <a href="#" className="hover:text-[#c9a84c] transition-colors duration-500">Terms</a>
              <a href="#" className="hover:text-[#c9a84c] transition-colors duration-500">Contact</a>
            </div>
            <span className="sans text-[10px] text-zinc-700">© 2026 VaultDrop. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
