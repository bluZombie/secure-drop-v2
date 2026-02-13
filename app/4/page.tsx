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
      gsap.from(".zen-hero-kanji", {
        opacity: 0,
        scale: 0.95,
        duration: 2,
        ease: "power1.out",
      });

      gsap.from(".zen-hero-title", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        delay: 0.5,
        ease: "power1.out",
      });

      gsap.from(".zen-hero-body", {
        y: 20,
        opacity: 0,
        duration: 1.2,
        delay: 1,
        ease: "power1.out",
      });

      gsap.from(".zen-hero-cta", {
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power1.out",
      });

      // Ink line drawing
      gsap.from(".zen-ink-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 2,
        delay: 0.8,
        ease: "power1.inOut",
      });

      // Gentle scroll reveals
      gsap.utils.toArray<HTMLElement>(".zen-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none none" },
          y: 30,
          opacity: 0,
          duration: 1.2,
          ease: "power1.out",
        });
      });

      // Feature items — gentle stagger
      gsap.from(".zen-feature", {
        scrollTrigger: { trigger: ".zen-features", start: "top 85%" },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power1.out",
      });

      // Steps — breathing animation
      gsap.from(".zen-step", {
        scrollTrigger: { trigger: ".zen-steps", start: "top 85%" },
        y: 20,
        opacity: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: "power1.out",
      });

      // Breathing circle
      gsap.to(".zen-breath", {
        scale: 1.05,
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating leaf
      gsap.to(".zen-leaf", {
        y: -8,
        rotation: 3,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Noto Sans JP', 'Noto Sans', sans-serif",
        background: "#F5F1EB",
        color: "#2C2C2C",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@200;300;400;500;700&family=Noto+Serif+JP:wght@200;300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* NAV — Minimal, breathing */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#F5F1EB]/90 backdrop-blur-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-8 py-6">
          <span className="text-lg tracking-[0.1em]" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
            <span className="text-[#8B7355]">安</span>全
          </span>
          <a
            href="#transfer"
            className="text-xs tracking-[0.15em] text-[#8B7355] hover:text-[#2C2C2C] transition-colors duration-700"
            style={{ fontWeight: 400 }}
          >
            転送を始める →
          </a>
        </div>
      </nav>

      {/* HERO — Zen composition */}
      <section className="min-h-screen flex items-center relative px-8 pt-20">
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left — Kanji accent */}
            <div className="lg:col-span-3 hidden lg:flex justify-center">
              <div className="zen-hero-kanji text-[12rem] leading-none text-[#D4C5B0]/30 select-none" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200, writingMode: "vertical-rl" }}>
                安全
              </div>
            </div>

            {/* Center — Main content */}
            <div className="lg:col-span-6">
              <div className="zen-hero-title mb-12">
                <p className="text-[11px] tracking-[0.4em] text-[#8B7355] mb-8 uppercase" style={{ fontWeight: 400 }}>
                  Secure File Transfer
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.3]" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
                  静かに、
                  <br />
                  <span className="text-[#8B7355]">確実に</span>、
                  <br />
                  届ける。
                </h1>
              </div>

              <div className="zen-ink-line h-[1px] bg-[#D4C5B0] w-20 mb-10" />

              <p className="zen-hero-body text-base text-[#7A7A7A] max-w-md leading-[2] mb-12" style={{ fontWeight: 300 }}>
                Quietly and surely, your files reach their destination.
                End-to-end encryption with zero-knowledge architecture.
                No accounts needed. No traces left behind.
              </p>

              <div className="zen-hero-cta flex items-center gap-8">
                <a
                  href="#features"
                  className="text-sm text-[#2C2C2C] border-b border-[#2C2C2C] pb-1 hover:text-[#8B7355] hover:border-[#8B7355] transition-all duration-700"
                  style={{ fontWeight: 400 }}
                >
                  詳しく見る
                </a>
                <a
                  href="#transfer"
                  className="text-sm bg-[#2C2C2C] text-[#F5F1EB] px-8 py-3 hover:bg-[#8B7355] transition-colors duration-700"
                  style={{ fontWeight: 400 }}
                >
                  転送する
                </a>
              </div>
            </div>

            {/* Right — Zen circle */}
            <div className="lg:col-span-3 hidden lg:flex justify-center items-center">
              <div className="relative w-48 h-48">
                <div className="zen-breath absolute inset-0 rounded-full border border-[#D4C5B0]/40" />
                <div className="absolute inset-4 rounded-full border border-[#D4C5B0]/25" />
                <div className="absolute inset-8 rounded-full border border-[#D4C5B0]/15" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="zen-leaf text-3xl text-[#8B7355]/40">🍃</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER — Simple line */}
      <div className="max-w-5xl mx-auto px-8">
        <div className="h-[1px] bg-[#D4C5B0]/50" />
      </div>

      {/* FEATURES — Clean vertical list */}
      <section id="features" className="zen-features px-8 py-32">
        <div className="max-w-5xl mx-auto">
          <div className="zen-reveal text-center mb-24">
            <p className="text-[11px] tracking-[0.4em] text-[#8B7355] mb-6 uppercase" style={{ fontWeight: 400 }}>
              特徴
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              丁寧に、<span className="text-[#8B7355]">設計</span>された
            </h2>
            <p className="text-sm text-[#7A7A7A] mt-4" style={{ fontWeight: 300 }}>
              Carefully designed, with intention
            </p>
          </div>

          <div className="space-y-0">
            {[
              {
                jp: "簡単",
                en: "Effortless Upload",
                desc: "Drag and drop your files into a calm, welcoming space. No friction, no noise — just a gentle flow from your device to the vault.",
              },
              {
                jp: "暗号",
                en: "Silent Encryption",
                desc: "AES-256 encryption wraps your files in protection, silently and seamlessly, all within your browser. We never see your data.",
              },
              {
                jp: "時間",
                en: "Temporal Grace",
                desc: "Links bloom and fade on your schedule. Set time limits and download caps with the precision of a tea ceremony.",
              },
              {
                jp: "共有",
                en: "Gentle Sharing",
                desc: "Generate a clean, secure link in moments. Share it through any channel — it carries your files with quiet confidence.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="zen-feature grid grid-cols-1 md:grid-cols-12 gap-6 py-16 border-b border-[#D4C5B0]/30 group hover:bg-[#EDE8E0]/50 transition-colors duration-700 px-4"
              >
                <div className="md:col-span-2 flex items-start">
                  <span className="text-4xl text-[#D4C5B0]/50 group-hover:text-[#8B7355]/50 transition-colors duration-700" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                    {f.jp}
                  </span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl group-hover:text-[#8B7355] transition-colors duration-700" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
                    {f.en}
                  </h3>
                </div>
                <div className="md:col-span-7">
                  <p className="text-sm text-[#7A7A7A] leading-[2]" style={{ fontWeight: 300 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Three stones */}
      <section className="px-8 py-32 bg-[#EDE8E0]">
        <div className="max-w-5xl mx-auto">
          <div className="zen-reveal text-center mb-24">
            <p className="text-[11px] tracking-[0.4em] text-[#8B7355] mb-6 uppercase" style={{ fontWeight: 400 }}>
              手順
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              三つの<span className="text-[#8B7355]">歩み</span>
            </h2>
            <p className="text-sm text-[#7A7A7A] mt-4" style={{ fontWeight: 300 }}>
              Three mindful steps
            </p>
          </div>

          <div className="zen-steps grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { num: "一", en: "Upload", desc: "Place your files gently into the stream. We welcome any format, up to 5GB, with equal care." },
              { num: "二", en: "Encrypt", desc: "Your files are wrapped in AES-256 encryption within your browser. A silent, invisible shield." },
              { num: "三", en: "Share", desc: "A secure link appears, like a stone placed in a garden. Set its lifespan and share with intention." },
            ].map((s, i) => (
              <div key={i} className="zen-step text-center">
                <div className="text-5xl text-[#D4C5B0]/60 mb-6" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 200 }}>
                  {s.num}
                </div>
                <div className="w-8 h-[1px] bg-[#8B7355]/30 mx-auto mb-6" />
                <h3 className="text-lg mb-4" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
                  {s.en}
                </h3>
                <p className="text-sm text-[#7A7A7A] leading-[2]" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD — Zen garden */}
      <section id="transfer" className="px-8 py-32">
        <div className="max-w-3xl mx-auto">
          <div className="zen-reveal text-center mb-16">
            <p className="text-[11px] tracking-[0.4em] text-[#8B7355] mb-6 uppercase" style={{ fontWeight: 400 }}>
              転送
            </p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              静かな<span className="text-[#8B7355]">空間</span>
            </h2>
            <p className="text-sm text-[#7A7A7A] mt-4" style={{ fontWeight: 300 }}>
              A quiet space for your files
            </p>
          </div>

          <div className="zen-reveal p-12 md:p-20 text-center border border-[#D4C5B0]/40 bg-white/30 hover:border-[#8B7355]/40 transition-all duration-1000">
            <div className="text-3xl mb-6 text-[#8B7355]/40">○</div>
            <p className="text-xl mb-3" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              ここにファイルを置く
            </p>
            <p className="text-xs text-[#7A7A7A] mb-2" style={{ fontWeight: 300 }}>
              Place your files here
            </p>
            <p className="text-[10px] text-[#B0A898] mb-10" style={{ fontWeight: 300 }}>
              up to 5GB • any format
            </p>
            <button className="bg-[#2C2C2C] text-[#F5F1EB] px-10 py-3 text-sm hover:bg-[#8B7355] transition-colors duration-700" style={{ fontWeight: 400 }}>
              ファイルを選ぶ
            </button>

            {/* Mock files */}
            <div className="mt-16 space-y-4 text-left">
              <div className="flex items-center justify-between py-4 border-b border-[#D4C5B0]/30">
                <div>
                  <p className="text-sm" style={{ fontWeight: 400 }}>写真集.zip</p>
                  <p className="text-[10px] text-[#B0A898]" style={{ fontWeight: 300 }}>24.5 MB</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-[2px] bg-[#E8E0D4] overflow-hidden">
                    <div className="h-full bg-[#8B7355] w-[65%]" />
                  </div>
                  <span className="text-[10px] text-[#8B7355]">65%</span>
                </div>
              </div>
              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="text-sm" style={{ fontWeight: 400 }}>手紙.pdf</p>
                  <p className="text-[10px] text-[#B0A898]" style={{ fontWeight: 300 }}>1.2 MB</p>
                </div>
                <span className="text-[10px] text-[#8B7355]">✓ 完了</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST — Stone garden */}
      <section className="px-8 py-32 bg-[#EDE8E0]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="zen-reveal mb-16">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 300 }}>
              信頼の<span className="text-[#8B7355]">基盤</span>
            </h2>
            <p className="text-sm text-[#7A7A7A] max-w-md mx-auto leading-[2]" style={{ fontWeight: 300 }}>
              Foundation of trust. Every file is protected with care.
              Your privacy is our deepest commitment.
            </p>
          </div>

          <div className="zen-reveal flex flex-wrap justify-center gap-6">
            {[
              { label: "AES-256", jp: "暗号化" },
              { label: "Zero-Knowledge", jp: "ゼロ知識" },
              { label: "E2E Encrypted", jp: "端末間暗号" },
              { label: "SOC 2", jp: "準拠" },
              { label: "GDPR", jp: "対応" },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white/60 px-6 py-4 hover:bg-white transition-all duration-700 group"
              >
                <div className="text-sm group-hover:text-[#8B7355] transition-colors duration-700" style={{ fontWeight: 400 }}>
                  {t.label}
                </div>
                <div className="text-[10px] text-[#B0A898] mt-1" style={{ fontWeight: 300 }}>
                  {t.jp}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="h-[1px] bg-[#D4C5B0]/30 mb-12" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <span className="text-lg" style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400 }}>
              <span className="text-[#8B7355]">安</span>全
            </span>
            <div className="flex gap-8 text-xs text-[#7A7A7A]" style={{ fontWeight: 300 }}>
              <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Privacy</a>
              <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Terms</a>
              <a href="#" className="hover:text-[#8B7355] transition-colors duration-700">Contact</a>
            </div>
            <span className="text-[10px] text-[#B0A898]">© 2026 VaultDrop</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
