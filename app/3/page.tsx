"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiquidOrganic() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero fade in
      gsap.from(".organic-hero-title", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(".organic-hero-sub", { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power3.out" });
      gsap.from(".organic-hero-cta", { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });

      // Floating elements parallax
      gsap.utils.toArray<HTMLElement>(".float-el").forEach((el, i) => {
        gsap.to(el, {
          y: `${-20 - i * 10}`,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Scroll-triggered fade-ups with stagger
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Feature pills stagger
      gsap.from(".feature-pill", {
        scrollTrigger: { trigger: ".features-section", start: "top 75%" },
        y: 60,
        opacity: 0,
        scale: 0.9,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Timeline dots
      gsap.from(".timeline-dot", {
        scrollTrigger: { trigger: ".timeline-section", start: "top 75%" },
        scale: 0,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      // Trust cards
      gsap.from(".trust-card", {
        scrollTrigger: { trigger: ".trust-section", start: "top 75%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} style={{ background: "#FFFFFF", color: "#1B3A2D", minHeight: "100vh", overflow: "hidden" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Nunito:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .organic-display { font-family: 'Outfit', sans-serif; }
        .organic-body { font-family: 'Nunito', sans-serif; }

        /* Morphing blob */
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 50% 70% 60%; }
          75% { border-radius: 60% 30% 60% 40% / 70% 50% 40% 60%; }
        }
        .morph-blob {
          animation: morph 12s ease-in-out infinite;
        }

        @keyframes morph2 {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          33% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          66% { border-radius: 50% 60% 30% 60% / 60% 40% 60% 40%; }
        }
        .morph-blob-2 {
          animation: morph2 15s ease-in-out infinite;
        }

        /* Mesh gradient background */
        .mesh-bg {
          background: 
            radial-gradient(ellipse at 20% 50%, rgba(143, 188, 143, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(255, 218, 185, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 80%, rgba(45, 90, 61, 0.1) 0%, transparent 50%),
            #FFFFFF;
        }

        /* Wave divider SVG */
        .wave-divider {
          width: 100%;
          line-height: 0;
          overflow: hidden;
        }
        .wave-divider svg {
          width: 100%;
          height: auto;
        }

        /* Feature pills */
        .feature-pill {
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .feature-pill:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 60px rgba(45, 90, 61, 0.12);
        }

        /* Soft gradient cards */
        .soft-card {
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .soft-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(45, 90, 61, 0.1);
        }

        /* Curved timeline path */
        .timeline-path {
          position: relative;
        }
        .timeline-path::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #8FBC8F, #2D5A3D);
          transform: translateX(-50%);
          border-radius: 1px;
        }
        @media (max-width: 768px) {
          .timeline-path::before {
            left: 24px;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
          <span className="organic-display text-xl font-bold text-[#2D5A3D]">
            vault<span className="text-[#8FBC8F]">drop</span>
          </span>
          <div className="flex items-center gap-6">
            <a href="#features" className="organic-body text-sm text-[#1B3A2D]/40 hover:text-[#2D5A3D] transition-colors hidden md:inline">Features</a>
            <a href="#how" className="organic-body text-sm text-[#1B3A2D]/40 hover:text-[#2D5A3D] transition-colors hidden md:inline">How it works</a>
            <a href="#cta" className="organic-body text-sm font-semibold bg-[#2D5A3D] text-white px-6 py-2.5 rounded-full hover:bg-[#1B3A2D] transition-colors">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* HERO — Centered text over morphing blob */}
      <section className="mesh-bg min-h-screen flex items-center justify-center relative px-6 pt-20">
        {/* Morphing blobs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="morph-blob absolute w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] opacity-20"
            style={{ background: "linear-gradient(135deg, #8FBC8F, #2D5A3D)" }}
          />
          <div
            className="morph-blob-2 absolute w-[45vw] h-[45vw] max-w-[450px] max-h-[450px] opacity-10"
            style={{ background: "linear-gradient(225deg, #FFDAB9, #F4E9D8)" }}
          />
        </div>

        {/* Floating elements */}
        <div className="float-el absolute top-[20%] left-[10%] w-16 h-16 rounded-full bg-[#8FBC8F]/10 hidden md:block" />
        <div className="float-el absolute top-[30%] right-[15%] w-10 h-10 rounded-full bg-[#FFDAB9]/30 hidden md:block" />
        <div className="float-el absolute bottom-[25%] left-[20%] w-8 h-8 rounded-full bg-[#2D5A3D]/10 hidden md:block" />
        <div className="float-el absolute bottom-[30%] right-[10%] w-14 h-14 rounded-full bg-[#F4E9D8]/40 hidden md:block" />

        {/* File icon floating in blob */}
        <div className="float-el absolute z-10 opacity-30">
          <svg width="80" height="100" viewBox="0 0 80 100" fill="none">
            <path d="M10 0h40l20 20v70c0 5.5-4.5 10-10 10H10C4.5 100 0 95.5 0 90V10C0 4.5 4.5 0 10 0z" fill="#2D5A3D" fillOpacity="0.3" />
            <path d="M50 0l20 20H60c-5.5 0-10-4.5-10-10V0z" fill="#2D5A3D" fillOpacity="0.2" />
            <rect x="16" y="40" width="48" height="4" rx="2" fill="#2D5A3D" fillOpacity="0.2" />
            <rect x="16" y="52" width="36" height="4" rx="2" fill="#2D5A3D" fillOpacity="0.2" />
            <rect x="16" y="64" width="42" height="4" rx="2" fill="#2D5A3D" fillOpacity="0.2" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-3xl">
          <h1 className="organic-hero-title organic-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6 text-[#1B3A2D]">
            Files flow<br />
            <span style={{ background: "linear-gradient(135deg, #8FBC8F, #2D5A3D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              securely
            </span>
          </h1>
          <p className="organic-hero-sub organic-body text-lg md:text-xl text-[#1B3A2D]/50 max-w-lg mx-auto mb-10 leading-relaxed tracking-wide">
            Encrypted file transfers that feel as natural as sharing a thought. No friction. No compromise.
          </p>
          <div className="organic-hero-cta flex flex-wrap gap-4 justify-center">
            <a href="#cta" className="organic-body font-semibold bg-[#2D5A3D] text-white px-8 py-4 rounded-full hover:bg-[#1B3A2D] transition-all duration-300 text-sm shadow-lg shadow-[#2D5A3D]/20">
              Start Transferring
            </a>
            <a href="#features" className="organic-body font-semibold bg-[#F4E9D8] text-[#2D5A3D] px-8 py-4 rounded-full hover:bg-[#FFDAB9] transition-all duration-300 text-sm">
              Explore Features
            </a>
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,120 720,0 1080,60 C1260,90 1380,40 1440,60 L1440,120 L0,120 Z" fill="#F4E9D8" />
        </svg>
      </div>

      {/* FEATURES — Rounded pill cards */}
      <section id="features" className="features-section px-6 md:px-12 py-24" style={{ background: "#F4E9D8" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="organic-body text-sm tracking-[0.15em] text-[#8FBC8F] font-semibold">FEATURES</span>
            <h2 className="organic-display text-3xl md:text-5xl font-bold mt-3 text-[#1B3A2D]">
              Naturally secure
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "End-to-End Encryption", desc: "AES-256 encryption happens in your browser before files ever leave your device.", icon: "🔐", gradient: "linear-gradient(135deg, #8FBC8F20, #2D5A3D10)" },
              { title: "Self-Destructing Links", desc: "Set expiration times and download limits. Links vanish when conditions are met.", icon: "⏳", gradient: "linear-gradient(135deg, #FFDAB920, #F4E9D810)" },
              { title: "Zero Knowledge", desc: "We can't see your files. We can't access your keys. Complete privacy by design.", icon: "👁", gradient: "linear-gradient(135deg, #2D5A3D10, #8FBC8F20)" },
              { title: "Drag & Drop", desc: "The simplest interface possible. Drop files, get a link. That's it.", icon: "✋", gradient: "linear-gradient(135deg, #F4E9D820, #FFDAB920)" },
              { title: "No Account Needed", desc: "No sign-ups, no profiles, no data collection. Just secure transfers.", icon: "🚀", gradient: "linear-gradient(135deg, #8FBC8F10, #F4E9D820)" },
              { title: "Up to 5GB", desc: "Transfer large files without compression or quality loss.", icon: "📦", gradient: "linear-gradient(135deg, #FFDAB910, #8FBC8F20)" },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-pill bg-white p-8"
                style={{ background: f.gradient }}
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="organic-display text-lg font-bold text-[#1B3A2D] mb-3">{f.title}</h3>
                <p className="organic-body text-sm text-[#1B3A2D]/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider" style={{ background: "#F4E9D8" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,120 960,0 1440,80 L1440,120 L0,120 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* HOW IT WORKS — Curved timeline */}
      <section id="how" className="timeline-section px-6 md:px-12 py-24 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <span className="organic-body text-sm tracking-[0.15em] text-[#8FBC8F] font-semibold">HOW IT WORKS</span>
            <h2 className="organic-display text-3xl md:text-5xl font-bold mt-3 text-[#1B3A2D]">
              Simple as breathing
            </h2>
          </div>
          <div className="timeline-path space-y-16 md:space-y-24">
            {[
              { step: "01", title: "Upload your files", desc: "Drag and drop any file type into VaultDrop. We handle files up to 5GB with zero compression." },
              { step: "02", title: "Automatic encryption", desc: "AES-256 encryption runs entirely in your browser. Your files are sealed before they touch our servers." },
              { step: "03", title: "Share the link", desc: "Get a unique, secure link with custom expiration settings. Share it however you like." },
              { step: "04", title: "Auto-destruct", desc: "Once downloaded or expired, the file and link are permanently destroyed. No traces remain." },
            ].map((item, i) => (
              <div key={i} className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "left" : "right"}`}>
                <div className="timeline-dot relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-[#8FBC8F] to-[#2D5A3D] flex items-center justify-center text-white organic-display font-bold text-sm flex-shrink-0 shadow-lg shadow-[#2D5A3D]/20">
                  {item.step}
                </div>
                <div className={`flex-1 ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                  <h3 className="organic-display text-xl md:text-2xl font-bold text-[#1B3A2D] mb-2">{item.title}</h3>
                  <p className="organic-body text-sm text-[#1B3A2D]/45 leading-relaxed max-w-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,80 C240,20 480,100 720,60 C960,20 1200,100 1440,40 L1440,120 L0,120 Z" fill="#2D5A3D" />
        </svg>
      </div>

      {/* TRUST — Soft gradient cards */}
      <section className="trust-section px-6 md:px-12 py-24" style={{ background: "#2D5A3D" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <span className="organic-body text-sm tracking-[0.15em] text-[#8FBC8F] font-semibold">TRUST & SECURITY</span>
            <h2 className="organic-display text-3xl md:text-5xl font-bold mt-3 text-white">
              Built on trust
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "SOC 2 Type II", desc: "Independently audited security controls and processes.", icon: "✓" },
              { title: "GDPR Compliant", desc: "Full compliance with European data protection regulations.", icon: "✓" },
              { title: "HIPAA Ready", desc: "Healthcare-grade security for sensitive medical data.", icon: "✓" },
              { title: "Zero-Knowledge", desc: "We mathematically cannot access your encrypted files.", icon: "✓" },
              { title: "Open Source", desc: "Our encryption library is open source and independently audited.", icon: "✓" },
              { title: "99.9% Uptime", desc: "Enterprise-grade infrastructure with global redundancy.", icon: "✓" },
            ].map((t, i) => (
              <div
                key={i}
                className="trust-card soft-card p-8"
                style={{ background: "linear-gradient(135deg, rgba(143,188,143,0.15), rgba(255,218,185,0.05))" }}
              >
                <div className="w-10 h-10 rounded-full bg-[#8FBC8F]/20 flex items-center justify-center text-[#8FBC8F] font-bold mb-4">
                  {t.icon}
                </div>
                <h3 className="organic-display text-lg font-bold text-white mb-2">{t.title}</h3>
                <p className="organic-body text-sm text-white/40 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wave divider */}
      <div className="wave-divider" style={{ background: "#2D5A3D" }}>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,60 C360,0 720,120 1080,40 C1260,0 1380,80 1440,60 L1440,120 L0,120 Z" fill="#F4E9D8" />
        </svg>
      </div>

      {/* CTA — Full-width wave background */}
      <section id="cta" className="px-6 md:px-12 py-32 text-center" style={{ background: "#F4E9D8" }}>
        <div className="max-w-2xl mx-auto fade-up">
          <h2 className="organic-display text-4xl md:text-6xl font-bold text-[#1B3A2D] leading-tight mb-6">
            Let your files<br />
            <span style={{ background: "linear-gradient(135deg, #8FBC8F, #2D5A3D)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              flow freely
            </span>
          </h2>
          <p className="organic-body text-base text-[#1B3A2D]/45 mb-10 leading-relaxed">
            Start sending encrypted files in seconds. No account required. Free for files up to 1GB.
          </p>
          <a
            href="#"
            className="organic-body inline-block font-semibold bg-[#2D5A3D] text-white px-10 py-4 rounded-full hover:bg-[#1B3A2D] transition-all duration-300 text-sm shadow-xl shadow-[#2D5A3D]/20"
          >
            Start Your First Transfer →
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-10 bg-white border-t border-[#1B3A2D]/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="organic-body text-xs text-[#1B3A2D]/30">© 2026 VaultDrop. All rights reserved.</span>
          <div className="flex gap-6 organic-body text-xs text-[#1B3A2D]/30">
            <a href="#" className="hover:text-[#2D5A3D] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#2D5A3D] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#2D5A3D] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
