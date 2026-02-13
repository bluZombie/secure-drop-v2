"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LuxuryCipher() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.from(".lux-hero-line", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        stagger: 0.15,
        ease: "power2.out",
      });
      gsap.from(".lux-hero-sub", { y: 30, opacity: 0, duration: 1.2, delay: 0.8, ease: "power2.out" });
      gsap.from(".lux-hero-cta", { y: 20, opacity: 0, duration: 1, delay: 1.2, ease: "power2.out" });
      gsap.from(".lux-divider", { scaleX: 0, duration: 1.5, delay: 0.5, ease: "power2.inOut" });

      // Parallax on hero decorative element
      gsap.to(".lux-parallax-circle", {
        scrollTrigger: { trigger: ".lux-hero", start: "top top", end: "bottom top", scrub: 1 },
        y: 200,
        ease: "none",
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".lux-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 50,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      // Feature cards
      gsap.from(".lux-feature", {
        scrollTrigger: { trigger: ".lux-features-grid", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
      });

      // Steps
      gsap.from(".lux-step", {
        scrollTrigger: { trigger: ".lux-steps", start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });

      // Trust section
      gsap.from(".lux-trust-item", {
        scrollTrigger: { trigger: ".lux-trust", start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.1,
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
        fontFamily: "'Outfit', sans-serif",
        background: "linear-gradient(180deg, #0D1117 0%, #151B26 50%, #0D1117 100%)",
        color: "#E8E4DD",
        minHeight: "100vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0D1117]/80 backdrop-blur-md border-b border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
          <span
            className="text-xl tracking-[0.15em]"
            style={{ fontFamily: "'Playfair Display', serif", color: "#D4AF37" }}
          >
            VaultDrop
          </span>
          <a
            href="#upload-demo"
            className="text-xs tracking-[0.2em] text-[#D4AF37] border border-[#D4AF37]/40 px-6 py-2.5 hover:bg-[#D4AF37] hover:text-[#0D1117] transition-all duration-500"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            BEGIN TRANSFER
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="lux-hero min-h-screen flex items-center relative overflow-hidden px-8 pt-24">
        {/* Decorative circle */}
        <div className="lux-parallax-circle absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full border border-[#D4AF37]/10 hidden lg:block" />
        <div className="absolute right-20 top-1/3 w-[300px] h-[300px] rounded-full border border-[#D4AF37]/5 hidden lg:block" />

        <div className="max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <p className="lux-hero-line text-xs tracking-[0.4em] text-[#D4AF37]/60 mb-8 uppercase" style={{ fontFamily: "'Outfit', sans-serif" }}>
              Secure File Transfer, Redefined
            </p>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="lux-hero-line block text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-2">
                Where Security
              </span>
              <span className="lux-hero-line block text-5xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-2">
                Meets <em className="text-[#D4AF37]">Elegance</em>
              </span>
            </h1>
            <div className="lux-divider w-24 h-[1px] bg-[#D4AF37]/40 my-10 origin-left" />
            <p className="lux-hero-sub text-base md:text-lg text-[#8B8680] max-w-lg leading-relaxed mb-10" style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 300 }}>
              Transfer your most sensitive files with military-grade encryption,
              self-destructing links, and an experience crafted for those who
              demand the finest.
            </p>
            <a
              href="#features"
              className="lux-hero-cta inline-flex items-center gap-3 text-sm tracking-[0.15em] text-[#D4AF37] hover:text-[#E8E4DD] transition-colors duration-500"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              <span>Discover More</span>
              <span className="w-8 h-[1px] bg-current" />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-32">
        <div className="max-w-6xl mx-auto">
          <div className="lux-reveal mb-20">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37]/60 mb-4 uppercase">Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              Crafted with <em className="text-[#D4AF37]">Precision</em>
            </h2>
          </div>
          <div className="lux-features-grid grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "Effortless Upload",
                desc: "Drag and drop your files into a refined interface. No clutter, no confusion — just seamless transfer.",
                icon: "◈",
              },
              {
                title: "Impenetrable Encryption",
                desc: "AES-256 encryption applied client-side. Your data is secured before it ever touches our servers.",
                icon: "◆",
              },
              {
                title: "Temporal Controls",
                desc: "Set precise expiration windows and download limits. Your links vanish on your terms.",
                icon: "◇",
              },
              {
                title: "Instant Distribution",
                desc: "Generate elegant, shareable links in moments. Compatible with every platform and channel.",
                icon: "◈",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="lux-feature group p-8 border-l border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-700"
              >
                <div className="text-[#D4AF37] text-2xl mb-6">{f.icon}</div>
                <h3
                  className="text-xl mb-4 font-light"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#8B8680] leading-relaxed" style={{ fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-8 py-32 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto">
          <div className="lux-reveal mb-20 text-center">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37]/60 mb-4 uppercase">The Process</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              Three Steps to <em className="text-[#D4AF37]">Certainty</em>
            </h2>
          </div>
          <div className="lux-steps grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { num: "I", title: "Upload", desc: "Select or drag your files into the vault. We handle the rest with grace." },
              { num: "II", title: "Encrypt", desc: "Military-grade encryption wraps your files in an impenetrable cipher." },
              { num: "III", title: "Share", desc: "Receive a refined link with your chosen expiration and access parameters." },
            ].map((s, i) => (
              <div key={i} className="lux-step text-center">
                <div
                  className="text-5xl text-[#D4AF37]/20 mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.num}
                </div>
                <h3
                  className="text-xl mb-4 font-light"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#8B8680] leading-relaxed" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section id="upload-demo" className="px-8 py-32 border-t border-[#D4AF37]/10">
        <div className="max-w-3xl mx-auto">
          <div className="lux-reveal mb-16 text-center">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37]/60 mb-4 uppercase">Experience</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              The Upload <em className="text-[#D4AF37]">Experience</em>
            </h2>
          </div>
          <div className="lux-reveal border border-[#D4AF37]/20 rounded-sm p-12 md:p-16 text-center bg-[#0D1117]/50 backdrop-blur-sm">
            <div className="text-[#D4AF37] text-3xl mb-6">◈</div>
            <p className="text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
              Drop your files here
            </p>
            <p className="text-xs text-[#8B8680] mb-8" style={{ fontWeight: 300 }}>
              or select from your device • up to 5GB
            </p>
            <button className="border border-[#D4AF37]/40 text-[#D4AF37] px-8 py-3 text-xs tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#0D1117] transition-all duration-500">
              BROWSE FILES
            </button>

            {/* Mock files */}
            <div className="mt-12 space-y-4 text-left">
              <div className="flex items-center justify-between border-b border-[#D4AF37]/10 pb-4">
                <div>
                  <p className="text-sm">quarterly-report.pdf</p>
                  <p className="text-xs text-[#8B8680]" style={{ fontWeight: 300 }}>4.2 MB</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-28 h-[2px] bg-[#1A2030] rounded overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F0D78C] w-[85%]" />
                  </div>
                  <span className="text-xs text-[#D4AF37]">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm">brand-assets.zip</p>
                  <p className="text-xs text-[#8B8680]" style={{ fontWeight: 300 }}>12.8 MB</p>
                </div>
                <span className="text-xs text-[#D4AF37]">✓ Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="lux-trust px-8 py-32 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="lux-reveal mb-16">
            <p className="text-xs tracking-[0.4em] text-[#D4AF37]/60 mb-4 uppercase">Trust & Security</p>
            <h2 className="text-3xl md:text-4xl font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
              Uncompromising <em className="text-[#D4AF37]">Standards</em>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { label: "AES-256", sub: "Encryption" },
              { label: "Zero-Knowledge", sub: "Architecture" },
              { label: "End-to-End", sub: "Encrypted" },
              { label: "SOC 2", sub: "Compliant" },
              { label: "GDPR", sub: "Ready" },
            ].map((t, i) => (
              <div
                key={i}
                className="lux-trust-item border border-[#D4AF37]/15 px-8 py-6 hover:border-[#D4AF37]/50 transition-all duration-700"
              >
                <div className="text-sm text-[#D4AF37] mb-1">{t.label}</div>
                <div className="text-[10px] text-[#8B8680] tracking-[0.2em] uppercase">{t.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-8 py-12 border-t border-[#D4AF37]/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-sm tracking-[0.15em] text-[#D4AF37]/40"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            VaultDrop
          </span>
          <div className="flex gap-8 text-xs text-[#8B8680]" style={{ fontWeight: 300 }}>
            <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Privacy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Terms</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors duration-500">Contact</a>
          </div>
          <span className="text-[10px] text-[#8B8680]/50">© 2026 VaultDrop</span>
        </div>
      </footer>
    </div>
  );
}
