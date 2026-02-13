"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BrutalistVault() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-title span", {
        y: 120,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
      });
      gsap.from(".hero-sub", { y: 40, opacity: 0, duration: 0.8, delay: 0.6, ease: "power3.out" });
      gsap.from(".hero-cta", { scale: 0, opacity: 0, duration: 0.6, delay: 1, ease: "back.out(1.7)" });

      // Scroll-triggered sections
      gsap.utils.toArray<HTMLElement>(".brutalist-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: { trigger: section, start: "top 85%", toggleActions: "play none none none" },
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });

      // Feature cards stagger
      gsap.from(".feature-card", {
        scrollTrigger: { trigger: ".features-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power3.out",
      });

      // Steps animation
      gsap.from(".step-item", {
        scrollTrigger: { trigger: ".steps-container", start: "top 80%" },
        x: -60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });

      // Upload zone pulse
      gsap.to(".upload-zone-border", {
        borderColor: "#39FF14",
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });

      // Trust badges
      gsap.from(".trust-badge", {
        scrollTrigger: { trigger: ".trust-section", start: "top 80%" },
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      className="noise-overlay"
      style={{
        fontFamily: "'Space Mono', monospace",
        background: "#0a0a0a",
        color: "#fff",
        minHeight: "100vh",
        ["--accent" as string]: "#39FF14",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 border-b-2 border-white/20 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-widest" style={{ fontFamily: "'Syne', sans-serif" }}>
            VAULT<span style={{ color: "#39FF14" }}>DROP</span>
          </span>
          <a
            href="#upload-demo"
            className="border-2 border-[#39FF14] text-[#39FF14] px-4 py-2 text-xs font-bold tracking-widest hover:bg-[#39FF14] hover:text-black transition-all duration-200"
          >
            START TRANSFER →
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full border-l-2 border-white/5 hidden md:block" />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-[#39FF14]/10 rotate-45 hidden md:block" />
        <div className="max-w-6xl mx-auto w-full">
          <div className="mb-4 text-xs tracking-[0.3em] text-zinc-500 font-bold">[ SECURE FILE TRANSFER PROTOCOL ]</div>
          <h1
            className="hero-title text-5xl md:text-7xl lg:text-[6rem] font-extrabold leading-[0.95] mb-8 uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {"DROP FILES".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            {"INTO THE".split("").map((char, i) => (
              <span key={`b${i}`} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            <span style={{ color: "#39FF14" }}>
              {"VAULT".split("").map((char, i) => (
                <span key={`c${i}`} className="inline-block">
                  {char}
                </span>
              ))}
            </span>
          </h1>
          <p className="hero-sub text-sm md:text-base text-zinc-400 max-w-lg leading-relaxed mb-10 font-mono">
            End-to-end encrypted file transfers. No accounts. No tracking.
            <br />
            Your files, your rules. Expiring links. Zero knowledge.
          </p>
          <a
            href="#features"
            className="hero-cta inline-block bg-[#39FF14] text-black px-8 py-4 font-bold text-sm tracking-widest hover:bg-white transition-colors duration-200 border-0"
          >
            EXPLORE FEATURES ↓
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="brutalist-section px-6 md:px-16 py-24 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-[#39FF14]" />
            <h2 className="text-xs tracking-[0.3em] font-bold text-zinc-500">FEATURES</h2>
          </div>
          <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-0">
            {[
              {
                title: "DRAG & DROP",
                desc: "Throw files into the vault. Drag, drop, done. No forms, no friction.",
                icon: "⬆",
              },
              {
                title: "AES-256 ENCRYPTION",
                desc: "Military-grade encryption. Your files are scrambled before they leave your device.",
                icon: "🔒",
              },
              {
                title: "EXPIRING LINKS",
                desc: "Set time limits and download caps. Links self-destruct after conditions are met.",
                icon: "⏱",
              },
              {
                title: "INSTANT SHARING",
                desc: "Generate a secure link in seconds. Share via any channel. No sign-up required.",
                icon: "🔗",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="feature-card border-2 border-white/10 p-8 md:p-10 hover:border-[#39FF14]/50 hover:bg-[#39FF14]/5 transition-all duration-300 group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3
                  className="text-lg font-bold mb-3 group-hover:text-[#39FF14] transition-colors"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="brutalist-section px-6 md:px-16 py-24 border-t-2 border-white/10 bg-[#111]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-[#39FF14]" />
            <h2 className="text-xs tracking-[0.3em] font-bold text-zinc-500">HOW IT WORKS</h2>
          </div>
          <div className="steps-container grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "UPLOAD", desc: "Drag your files into the vault. We accept any file type, up to 5GB." },
              { step: "02", title: "ENCRYPT", desc: "Files are encrypted client-side with AES-256 before upload." },
              { step: "03", title: "SHARE", desc: "Get a secure link with custom expiration and download limits." },
            ].map((s, i) => (
              <div key={i} className="step-item relative">
                <div
                  className="text-[5rem] font-extrabold text-[#39FF14]/10 leading-none mb-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                  {s.title}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{s.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-[#39FF14]/30 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section id="upload-demo" className="brutalist-section px-6 md:px-16 py-24 border-t-2 border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-[2px] bg-[#39FF14]" />
            <h2 className="text-xs tracking-[0.3em] font-bold text-zinc-500">UPLOAD INTERFACE</h2>
          </div>
          <div className="upload-zone-border border-2 border-dashed border-zinc-700 p-12 md:p-16 text-center hover:border-[#39FF14] transition-colors duration-500 relative bg-[#0d0d0d]">
            <div className="text-4xl mb-4">⬆</div>
            <p className="text-sm font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              DROP FILES HERE
            </p>
            <p className="text-xs text-zinc-600 mb-6">or click to browse • max 5GB per file</p>
            <div className="inline-block border-2 border-white/20 px-6 py-3 text-xs tracking-widest font-bold hover:border-[#39FF14] hover:text-[#39FF14] transition-all cursor-pointer">
              SELECT FILES
            </div>
            {/* Mock progress */}
            <div className="mt-10 text-left space-y-3">
              <div className="border border-white/10 p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">document.pdf</div>
                  <div className="text-[10px] text-zinc-600">2.4 MB</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-1 bg-zinc-800 overflow-hidden">
                    <div className="h-full bg-[#39FF14] w-3/4" />
                  </div>
                  <span className="text-[10px] text-[#39FF14]">75%</span>
                </div>
              </div>
              <div className="border border-white/10 p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold">photo_001.png</div>
                  <div className="text-[10px] text-zinc-600">8.1 MB</div>
                </div>
                <div className="text-[10px] text-[#39FF14] font-bold">✓ COMPLETE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / SECURITY */}
      <section className="trust-section brutalist-section px-6 md:px-16 py-24 border-t-2 border-white/10 bg-[#111]">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-4 uppercase"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            ZERO TRUST.<br />
            <span style={{ color: "#39FF14" }}>TOTAL SECURITY.</span>
          </h2>
          <p className="text-xs text-zinc-500 max-w-md mx-auto mb-12">
            Every file is encrypted before it leaves your browser. We never see your data. Ever.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {["AES-256", "ZERO-KNOWLEDGE", "E2E ENCRYPTED", "SOC 2", "GDPR"].map((badge, i) => (
              <div
                key={i}
                className="trust-badge border-2 border-[#39FF14]/30 px-6 py-3 text-xs font-bold tracking-widest text-[#39FF14] hover:bg-[#39FF14] hover:text-black transition-all duration-200"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-16 py-12 border-t-2 border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-600">© 2026 VAULTDROP. ALL RIGHTS RESERVED.</span>
          <div className="flex gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-[#39FF14] transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-[#39FF14] transition-colors">TERMS</a>
            <a href="#" className="hover:text-[#39FF14] transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
