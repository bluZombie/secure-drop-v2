"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryEditorial() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant curtain reveal
      gsap.from(".lux-curtain", {
        scaleY: 1,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power4.inOut",
      });
      gsap.to(".lux-curtain", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        delay: 0.3,
        ease: "power4.inOut",
      });

      // Hero text reveal with mask
      gsap.from(".lux-hero-word", {
        y: "100%",
        duration: 1.4,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.8,
      });

      gsap.from(".lux-hero-accent", {
        width: 0,
        duration: 1.5,
        delay: 1.5,
        ease: "power2.inOut",
      });

      gsap.from(".lux-hero-body", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 1.8,
        ease: "power2.out",
      });

      gsap.from(".lux-hero-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 2.2,
        ease: "power2.out",
      });

      // Parallax image
      gsap.to(".lux-parallax-img", {
        scrollTrigger: { trigger: ".lux-hero", start: "top top", end: "bottom top", scrub: 1.5 },
        y: 100,
        ease: "none",
      });

      // Scroll reveals with elegant timing
      gsap.utils.toArray<HTMLElement>(".lux-fade-up").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          y: 60,
          opacity: 0,
          duration: 1.4,
          ease: "power2.out",
        });
      });

      // Feature items slide in from alternating sides
      gsap.utils.toArray<HTMLElement>(".lux-feature-item").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      // Gold line animations
      gsap.utils.toArray<HTMLElement>(".lux-gold-line").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%" },
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.5,
          ease: "power2.inOut",
        });
      });

      // Number counter
      gsap.utils.toArray<HTMLElement>(".lux-stat-num").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          textContent: 0,
          duration: 2,
          snap: { textContent: 1 },
          ease: "power2.out",
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Cormorant Garamond', 'Georgia', serif",
        background: "#FAF7F2",
        color: "#1A1A1A",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Loading curtain */}
      <div className="lux-curtain fixed inset-0 bg-[#1A1A1A] z-[100] pointer-events-none" />

      {/* NAV — Minimal editorial */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FAF7F2]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 py-6">
          <span className="text-2xl tracking-[0.05em]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}>
            Vault<span className="text-[#B8860B]">Drop</span>
          </span>
          <div className="hidden md:flex items-center gap-12">
            <a href="#features" className="text-xs tracking-[0.2em] uppercase text-[#666] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
              Features
            </a>
            <a href="#process" className="text-xs tracking-[0.2em] uppercase text-[#666] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
              Process
            </a>
            <a href="#security" className="text-xs tracking-[0.2em] uppercase text-[#666] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 400 }}>
              Security
            </a>
          </div>
          <a
            href="#transfer"
            className="text-[11px] tracking-[0.15em] uppercase border border-[#1A1A1A] px-6 py-3 hover:bg-[#1A1A1A] hover:text-[#FAF7F2] transition-all duration-700"
            style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
          >
            Begin Transfer
          </a>
        </div>
        <div className="h-[1px] bg-[#E8E0D4]" />
      </nav>

      {/* HERO — Magazine editorial spread */}
      <section className="lux-hero min-h-screen relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left — Typography */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-32 lg:py-20 relative z-10">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.4em] uppercase text-[#B8860B] mb-12" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
                Secure File Transfer
              </p>

              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] mb-0">
                <span className="block overflow-hidden">
                  <span className="lux-hero-word block" style={{ fontWeight: 300 }}>Where Privacy</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="lux-hero-word block" style={{ fontWeight: 300 }}>Meets</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="lux-hero-word block italic text-[#B8860B]" style={{ fontWeight: 500 }}>Refinement</span>
                </span>
              </h1>

              <div className="lux-hero-accent h-[1px] bg-[#B8860B]/40 w-32 my-10" />

              <p className="lux-hero-body text-lg md:text-xl text-[#666] max-w-md leading-[1.8]" style={{ fontWeight: 300 }}>
                Transfer your most sensitive files with military-grade encryption,
                self-destructing links, and an experience crafted for those who
                appreciate the finer details.
              </p>

              <div className="lux-hero-cta mt-12 flex items-center gap-6">
                <a
                  href="#features"
                  className="inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#B8860B] hover:text-[#1A1A1A] transition-colors duration-700 group"
                  style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}
                >
                  <span>Discover</span>
                  <span className="w-12 h-[1px] bg-current group-hover:w-20 transition-all duration-700" />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Editorial image/pattern area */}
          <div className="relative hidden lg:block">
            <div className="lux-parallax-img absolute inset-0 bg-[#E8E0D4]">
              {/* Abstract gold pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-0 border border-[#B8860B]/20 rounded-full" />
                  <div className="absolute inset-8 border border-[#B8860B]/15 rounded-full" />
                  <div className="absolute inset-16 border border-[#B8860B]/10 rounded-full" />
                  <div className="absolute inset-24 bg-[#B8860B]/5 rounded-full" />
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#B8860B]/10" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#B8860B]/10" />
                </div>
              </div>
              {/* Issue number */}
              <div className="absolute bottom-12 right-12 text-right">
                <div className="text-[8rem] leading-none text-[#B8860B]/10" style={{ fontWeight: 300 }}>
                  №1
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL DIVIDER */}
      <div className="px-8 md:px-16 py-16 border-y border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "256", label: "Bit Encryption" },
            { num: "5", label: "GB Max File Size" },
            { num: "0", label: "Data We Store" },
            { num: "99", label: "% Uptime" },
          ].map((s, i) => (
            <div key={i} className="lux-fade-up">
              <div className="text-4xl md:text-5xl text-[#B8860B] mb-2" style={{ fontWeight: 300 }}>
                <span className="lux-stat-num">{s.num}</span>{s.num === "99" ? "." + "9" : ""}
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[#999]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEATURES — Magazine column layout */}
      <section id="features" className="px-8 md:px-16 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="lux-fade-up text-center mb-24">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#B8860B] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              Capabilities
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 300 }}>
              Crafted with <em className="text-[#B8860B]" style={{ fontWeight: 500 }}>Intention</em>
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                num: "01",
                title: "Effortless Upload",
                desc: "A refined drag-and-drop interface that respects your time. No clutter, no confusion — simply place your files and let the experience unfold.",
                detail: "Supports all file formats up to 5GB",
              },
              {
                num: "02",
                title: "Impenetrable Encryption",
                desc: "AES-256 encryption is applied within your browser before any data leaves your device. We employ a zero-knowledge architecture — your files remain yours alone.",
                detail: "Client-side encryption, always",
              },
              {
                num: "03",
                title: "Temporal Elegance",
                desc: "Set precise expiration windows and download limits with the care of a watchmaker. Your links dissolve gracefully when their purpose is fulfilled.",
                detail: "Custom TTL and access controls",
              },
              {
                num: "04",
                title: "Instant Distribution",
                desc: "Generate a beautifully crafted secure link in moments. Share through any channel — email, message, or simply a whispered URL.",
                detail: "One-click link generation",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="lux-feature-item grid grid-cols-1 md:grid-cols-12 gap-8 py-16 border-b border-[#E8E0D4] group hover:bg-[#F5F0E8] transition-colors duration-700 px-4 md:px-8"
              >
                <div className="md:col-span-1">
                  <span className="text-[11px] tracking-[0.2em] text-[#B8860B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {f.num}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="text-2xl md:text-3xl group-hover:text-[#B8860B] transition-colors duration-700" style={{ fontWeight: 400 }}>
                    {f.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="text-base text-[#666] leading-[1.9]" style={{ fontWeight: 300 }}>
                    {f.desc}
                  </p>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <span className="text-[10px] tracking-[0.15em] uppercase text-[#999]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {f.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — Elegant three-column */}
      <section id="process" className="px-8 md:px-16 py-32 bg-[#1A1A1A] text-[#FAF7F2]">
        <div className="max-w-7xl mx-auto">
          <div className="lux-fade-up text-center mb-24">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#B8860B] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              The Process
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 300 }}>
              Three Considered <em className="text-[#B8860B]" style={{ fontWeight: 500 }}>Steps</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { num: "I", title: "Upload", desc: "Select or place your files into the vault. We welcome every format with equal grace." },
              { num: "II", title: "Encrypt", desc: "Military-grade encryption envelops your files in an impenetrable cipher, all within your browser." },
              { num: "III", title: "Share", desc: "Receive an elegant link with your chosen expiration and access parameters. Share with confidence." },
            ].map((s, i) => (
              <div key={i} className="lux-fade-up text-center px-8 py-12 border-r border-[#333] last:border-r-0">
                <div className="text-6xl text-[#B8860B]/20 mb-8" style={{ fontWeight: 300 }}>
                  {s.num}
                </div>
                <div className="lux-gold-line h-[1px] bg-[#B8860B]/30 w-12 mx-auto mb-8" />
                <h3 className="text-2xl mb-6" style={{ fontWeight: 400 }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[#999] leading-[1.9]" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD EXPERIENCE */}
      <section id="transfer" className="px-8 md:px-16 py-32">
        <div className="max-w-3xl mx-auto">
          <div className="lux-fade-up text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#B8860B] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              Experience
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 300 }}>
              The Transfer <em className="text-[#B8860B]" style={{ fontWeight: 500 }}>Salon</em>
            </h2>
          </div>

          <div className="lux-fade-up border border-[#E8E0D4] p-12 md:p-20 text-center bg-white/50">
            <div className="text-[#B8860B] text-4xl mb-8" style={{ fontWeight: 300 }}>◈</div>
            <p className="text-2xl mb-3" style={{ fontWeight: 300 }}>
              Place your files here
            </p>
            <p className="text-sm text-[#999] mb-10" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>
              or select from your device — up to 5GB
            </p>
            <button className="border border-[#1A1A1A] px-10 py-4 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-[#FAF7F2] transition-all duration-700" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              Browse Files
            </button>

            {/* Mock files */}
            <div className="mt-16 space-y-6 text-left">
              <div className="flex items-center justify-between pb-6 border-b border-[#E8E0D4]">
                <div>
                  <p className="text-base" style={{ fontWeight: 400 }}>quarterly-report.pdf</p>
                  <p className="text-xs text-[#999] mt-1" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>4.2 MB</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-[2px] bg-[#E8E0D4] overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] w-[85%]" />
                  </div>
                  <span className="text-xs text-[#B8860B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base" style={{ fontWeight: 400 }}>brand-assets.zip</p>
                  <p className="text-xs text-[#999] mt-1" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 300 }}>12.8 MB</p>
                </div>
                <span className="text-xs text-[#B8860B]" style={{ fontFamily: "'Montserrat', sans-serif" }}>✓ Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="px-8 md:px-16 py-32 border-t border-[#E8E0D4]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="lux-fade-up mb-16">
            <p className="text-[11px] tracking-[0.4em] uppercase text-[#B8860B] mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 500 }}>
              Trust & Security
            </p>
            <h2 className="text-4xl md:text-5xl" style={{ fontWeight: 300 }}>
              Uncompromising <em className="text-[#B8860B]" style={{ fontWeight: 500 }}>Standards</em>
            </h2>
            <p className="text-base text-[#999] max-w-lg mx-auto mt-6 leading-[1.9]" style={{ fontWeight: 300 }}>
              Every file is encrypted before it leaves your browser. We employ a zero-knowledge
              architecture — we never see, store, or have access to your data.
            </p>
          </div>

          <div className="lux-fade-up flex flex-wrap justify-center gap-6">
            {[
              { label: "AES-256", sub: "Encryption" },
              { label: "Zero-Knowledge", sub: "Architecture" },
              { label: "End-to-End", sub: "Encrypted" },
              { label: "SOC 2", sub: "Compliant" },
              { label: "GDPR", sub: "Ready" },
            ].map((t, i) => (
              <div
                key={i}
                className="border border-[#E8E0D4] px-8 py-6 hover:border-[#B8860B] transition-all duration-700 group"
              >
                <div className="text-base text-[#1A1A1A] group-hover:text-[#B8860B] transition-colors duration-700" style={{ fontWeight: 400 }}>
                  {t.label}
                </div>
                <div className="text-[10px] tracking-[0.2em] uppercase text-[#999] mt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {t.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-16 py-16 border-t border-[#E8E0D4]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div>
              <span className="text-2xl" style={{ fontWeight: 600 }}>
                Vault<span className="text-[#B8860B]">Drop</span>
              </span>
            </div>
            <div className="flex justify-center gap-12">
              <a href="#" className="text-xs tracking-[0.15em] uppercase text-[#999] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Privacy</a>
              <a href="#" className="text-xs tracking-[0.15em] uppercase text-[#999] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Terms</a>
              <a href="#" className="text-xs tracking-[0.15em] uppercase text-[#999] hover:text-[#B8860B] transition-colors duration-500" style={{ fontFamily: "'Montserrat', sans-serif" }}>Contact</a>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#999]" style={{ fontFamily: "'Montserrat', sans-serif" }}>© 2026 VaultDrop</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
