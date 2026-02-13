"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MinimalistZen() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle fade-in sequence
      gsap.from(".zen-fade", {
        opacity: 0,
        y: 15,
        duration: 1.5,
        stagger: 0.2,
        delay: 0.3,
        ease: "power1.out",
      });

      // Ink brush stroke reveal
      gsap.from(".zen-stroke", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 2,
        delay: 0.8,
        ease: "power2.inOut",
      });

      // Kanji fade
      gsap.from(".zen-kanji", {
        opacity: 0,
        scale: 0.8,
        duration: 2,
        delay: 1.2,
        ease: "power1.out",
      });

      // Scroll reveals - gentle, breathing
      gsap.utils.toArray<HTMLElement>(".zen-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          opacity: 0,
          y: 30,
          duration: 1.2,
          ease: "power1.out",
        });
      });

      // Feature items - staggered gentle entrance
      gsap.from(".zen-feature", {
        scrollTrigger: { trigger: ".zen-features", start: "top 85%" },
        opacity: 0,
        y: 20,
        stagger: 0.25,
        duration: 1,
        ease: "power1.out",
      });

      // Steps - sequential reveal
      gsap.from(".zen-step", {
        scrollTrigger: { trigger: ".zen-steps", start: "top 85%" },
        opacity: 0,
        x: -20,
        stagger: 0.3,
        duration: 1,
        ease: "power1.out",
      });

      // Breathing animation on circle
      gsap.to(".zen-breath", {
        scale: 1.05,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Vertical line grow
      gsap.from(".zen-vline", {
        scrollTrigger: { trigger: ".zen-vline", start: "top 90%" },
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power1.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Noto Sans JP', 'Noto Sans', sans-serif",
        background: "#F5F2ED",
        color: "#2C2C2C",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;200;300;400;500&family=Noto+Serif+JP:wght@200;300;400;500;600&family=Zen+Kaku+Gothic+New:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* NAV - Ultra minimal */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F2ED]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-8 md:px-12 py-6">
          <span
            className="text-base tracking-[0.15em]"
            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
          >
            vault<span className="text-[#8B7355]">drop</span>
          </span>
          <a
            href="#upload"
            className="text-[11px] tracking-[0.2em] text-[#8B7355] hover:text-[#2C2C2C] transition-colors duration-700"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
          >
            はじめる
          </a>
        </div>
      </nav>

      {/* HERO - Zen, spacious, contemplative */}
      <section className="min-h-screen flex items-center relative px-8 md:px-12 pt-24">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left - Typography */}
            <div className="lg:col-span-7">
              <p
                className="zen-fade text-[11px] tracking-[0.4em] text-[#999] mb-12 uppercase"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
              >
                安全なファイル転送
              </p>

              <h1 className="zen-fade mb-10">
                <span
                  className="block text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-2"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
                >
                  Files flow
                </span>
                <span
                  className="block text-4xl md:text-5xl lg:text-6xl leading-[1.2] mb-2"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
                >
                  in <span className="text-[#8B7355]">silence</span>,
                </span>
                <span
                  className="block text-4xl md:text-5xl lg:text-6xl leading-[1.2]"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
                >
                  safely.
                </span>
              </h1>

              <div className="zen-stroke w-16 h-[1px] bg-[#2C2C2C]/20 mb-10" />

              <p
                className="zen-fade text-sm text-[#888] max-w-sm leading-[2] mb-12"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
              >
                End-to-end encrypted file transfer, designed with the calm
                precision of Japanese craftsmanship. No noise. No excess.
                Just security.
              </p>

              <a
                href="#features"
                className="zen-fade inline-flex items-center gap-4 text-[11px] tracking-[0.2em] text-[#8B7355] group"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 400 }}
              >
                <span>続きを見る</span>
                <span className="w-8 h-[1px] bg-[#8B7355] group-hover:w-16 transition-all duration-1000" />
              </a>
            </div>

            {/* Right - Zen circle (ensō) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                {/* Ensō circle */}
                <svg viewBox="0 0 200 200" className="zen-kanji w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#2C2C2C"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    opacity="0.15"
                  />
                  <path
                    d="M 100 20 A 80 80 0 1 1 95 20"
                    fill="none"
                    stroke="#2C2C2C"
                    strokeWidth="2"
                    opacity="0.08"
                    strokeLinecap="round"
                  />
                </svg>
                {/* Center kanji */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="zen-breath text-6xl md:text-7xl opacity-[0.06]" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                    守
                  </span>
                </div>
                {/* Small text */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                  <span className="text-[9px] tracking-[0.3em] text-[#999]" style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}>
                    PROTECT
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - Clean, spacious list */}
      <section id="features" className="px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-5xl mx-auto">
          <div className="zen-reveal mb-20">
            <p
              className="text-[11px] tracking-[0.4em] text-[#999] mb-4"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              機能
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
            >
              Considered <span className="text-[#8B7355]">design</span>
            </h2>
          </div>

          <div className="zen-features space-y-0">
            {[
              {
                title: "Effortless upload",
                desc: "Drag and drop with intention. A clean interface that respects your time and attention.",
                jp: "簡単",
              },
              {
                title: "Silent encryption",
                desc: "AES-256 encryption works quietly in your browser. Protection without disruption.",
                jp: "暗号化",
              },
              {
                title: "Temporal links",
                desc: "Links that know when to disappear. Set time and download limits with precision.",
                jp: "時間",
              },
              {
                title: "Gentle sharing",
                desc: "Generate a link. Share it your way. No accounts, no friction, no noise.",
                jp: "共有",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="zen-feature group py-10 border-b border-[#2C2C2C]/8 hover:bg-[#EDE9E3] transition-colors duration-700 px-6 -mx-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-2">
                    <span
                      className="text-2xl text-[#2C2C2C]/8 group-hover:text-[#8B7355]/20 transition-colors duration-700"
                      style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
                    >
                      {f.jp}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3
                      className="text-lg group-hover:text-[#8B7355] transition-colors duration-700"
                      style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
                    >
                      {f.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p
                      className="text-sm text-[#999] leading-[1.8]"
                      style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
                    >
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Vertical flow */}
      <section className="px-8 md:px-12 py-24 md:py-32 bg-[#EDE9E3]">
        <div className="max-w-3xl mx-auto">
          <div className="zen-reveal text-center mb-20">
            <p
              className="text-[11px] tracking-[0.4em] text-[#999] mb-4"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              手順
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
            >
              Three <span className="text-[#8B7355]">moments</span>
            </h2>
          </div>

          <div className="zen-steps relative">
            {/* Vertical connecting line */}
            <div className="zen-vline absolute left-6 md:left-8 top-0 bottom-0 w-[1px] bg-[#2C2C2C]/10" />

            {[
              { num: "一", title: "Upload", desc: "Place your files gently into the space. Any format, up to 5GB. No rush." },
              { num: "二", title: "Encrypt", desc: "AES-256 encryption wraps your files in silence. Everything happens in your browser." },
              { num: "三", title: "Share", desc: "A secure link appears. Set its lifespan. Share it with care." },
            ].map((s, i) => (
              <div key={i} className="zen-step relative pl-16 md:pl-20 pb-16 last:pb-0">
                {/* Circle marker */}
                <div className="absolute left-[14px] md:left-[22px] top-1 w-6 h-6 rounded-full bg-[#EDE9E3] border border-[#2C2C2C]/15 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#8B7355]/40" />
                </div>

                <span
                  className="text-3xl text-[#2C2C2C]/8 block mb-3"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
                >
                  {s.num}
                </span>
                <h3
                  className="text-xl mb-3"
                  style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
                >
                  {s.title}
                </h3>
                <p
                  className="text-sm text-[#999] leading-[1.8] max-w-md"
                  style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD - Minimal, zen */}
      <section id="upload" className="px-8 md:px-12 py-24 md:py-32">
        <div className="max-w-2xl mx-auto">
          <div className="zen-reveal text-center mb-16">
            <p
              className="text-[11px] tracking-[0.4em] text-[#999] mb-4"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              アップロード
            </p>
            <h2
              className="text-3xl md:text-4xl"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
            >
              The <span className="text-[#8B7355]">space</span>
            </h2>
          </div>

          <div className="zen-reveal border border-[#2C2C2C]/8 rounded-sm p-12 md:p-20 text-center bg-[#F5F2ED] hover:border-[#8B7355]/30 transition-all duration-1000">
            <div className="mb-8">
              <svg width="40" height="40" viewBox="0 0 40 40" className="mx-auto opacity-20">
                <line x1="20" y1="5" x2="20" y2="25" stroke="#2C2C2C" strokeWidth="1.5" />
                <polyline points="12,15 20,5 28,15" fill="none" stroke="#2C2C2C" strokeWidth="1.5" />
                <line x1="8" y1="35" x2="32" y2="35" stroke="#2C2C2C" strokeWidth="1.5" />
              </svg>
            </div>
            <p
              className="text-lg mb-2"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}
            >
              Place files here
            </p>
            <p
              className="text-[11px] text-[#999] mb-10"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              or browse your device · up to 5GB
            </p>
            <button
              className="border border-[#2C2C2C]/15 text-[#2C2C2C] px-8 py-3 text-[11px] tracking-[0.15em] hover:border-[#8B7355] hover:text-[#8B7355] transition-all duration-700"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 400 }}
            >
              Browse
            </button>

            {/* Mock files */}
            <div className="mt-14 space-y-6 text-left">
              <div className="flex items-center justify-between pb-6 border-b border-[#2C2C2C]/5">
                <div>
                  <p className="text-sm" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
                    garden-photos.zip
                  </p>
                  <p
                    className="text-[11px] text-[#999] mt-1"
                    style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
                  >
                    24.5 MB
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-[2px] bg-[#2C2C2C]/5 overflow-hidden rounded-full">
                    <div className="h-full bg-[#8B7355]/40 rounded-full w-[65%]" />
                  </div>
                  <span className="text-[11px] text-[#8B7355]">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
                    haiku-collection.pdf
                  </p>
                  <p
                    className="text-[11px] text-[#999] mt-1"
                    style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
                  >
                    1.2 MB
                  </p>
                </div>
                <span
                  className="text-[11px] text-[#8B7355]"
                  style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 400 }}
                >
                  ✓ Complete
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST - Minimal badges */}
      <section className="px-8 md:px-12 py-24 md:py-32 bg-[#EDE9E3]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="zen-reveal mb-16">
            <h2
              className="text-2xl md:text-3xl mb-4"
              style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}
            >
              Built on <span className="text-[#8B7355]">trust</span>
            </h2>
            <p
              className="text-sm text-[#999] max-w-sm mx-auto leading-[1.8]"
              style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
            >
              Every file is protected with care.
              Your privacy is our deepest commitment.
            </p>
          </div>
          <div className="zen-reveal flex flex-wrap justify-center gap-4">
            {["AES-256", "Zero-Knowledge", "E2E Encrypted", "SOC 2", "GDPR"].map((label, i) => (
              <div
                key={i}
                className="px-6 py-3 text-[11px] tracking-[0.1em] text-[#888] border border-[#2C2C2C]/8 hover:border-[#8B7355]/30 hover:text-[#8B7355] transition-all duration-700"
                style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 400 }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 md:px-12 py-12 border-t border-[#2C2C2C]/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            className="text-base tracking-[0.15em]"
            style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}
          >
            vault<span className="text-[#8B7355]">drop</span>
          </span>
          <div
            className="flex gap-8 text-[11px] text-[#999]"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif", fontWeight: 300 }}
          >
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Privacy</a>
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Terms</a>
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Contact</a>
          </div>
          <span
            className="text-[10px] text-[#ccc]"
            style={{ fontFamily: "'Zen Kaku Gothic New', sans-serif" }}
          >
            © 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
