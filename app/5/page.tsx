"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GeometricFortress() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero geometric shapes entrance
      gsap.from(".geo-shape", {
        scale: 0,
        rotation: 180,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.4)",
      });

      gsap.from(".geo-hero-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: "power3.out",
      });
      gsap.from(".geo-hero-sub", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });
      gsap.from(".geo-hero-cta", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        delay: 1.1,
        ease: "back.out(1.7)",
      });

      // Rotating geometric patterns
      gsap.to(".geo-rotate", {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".geo-rotate-reverse", {
        rotation: -360,
        duration: 45,
        repeat: -1,
        ease: "none",
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".geo-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      });

      // Feature cards with geometric entrance
      gsap.from(".geo-feature", {
        scrollTrigger: { trigger: ".geo-features", start: "top 80%" },
        y: 60,
        rotation: -5,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
      });

      // Steps
      gsap.from(".geo-step", {
        scrollTrigger: { trigger: ".geo-steps", start: "top 80%" },
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "back.out(1.7)",
      });

      // Parallax geometric elements
      gsap.to(".geo-parallax-1", {
        scrollTrigger: { trigger: mainRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
        y: 300,
        rotation: 90,
        ease: "none",
      });
      gsap.to(".geo-parallax-2", {
        scrollTrigger: { trigger: mainRef.current, start: "top top", end: "bottom bottom", scrub: 1 },
        y: -200,
        rotation: -45,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Manrope', sans-serif",
        background: "#0C0C14",
        color: "#E8E4F0",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Background geometric pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="geo-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#50C878" strokeWidth="0.5" />
              <polygon points="40,0 80,40 40,80 0,40" fill="none" stroke="#50C878" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geo-grid)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="geo-parallax-1 fixed top-[10%] right-[10%] w-32 h-32 border-2 border-[#50C878]/10 rotate-45 pointer-events-none z-0" />
      <div className="geo-parallax-2 fixed bottom-[20%] left-[5%] w-24 h-24 border-2 border-[#E0115F]/10 pointer-events-none z-0" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0C0C14]/90 backdrop-blur-md border-b border-[#50C878]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <span
            className="text-base font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
          >
            VAULTDROP
          </span>
          <a
            href="#upload-demo"
            className="text-xs font-semibold tracking-widest px-5 py-2.5 transition-all duration-300"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              background: "linear-gradient(135deg, #50C878, #0F52BA)",
              color: "#0C0C14",
              clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
            }}
          >
            TRANSFER
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative z-10 px-8 pt-24">
        {/* Decorative geometric shapes */}
        <div className="absolute top-1/4 right-[15%] hidden lg:block">
          <div className="geo-rotate">
            <div className="geo-shape w-40 h-40 border-2 border-[#50C878]/20" style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }} />
          </div>
        </div>
        <div className="absolute bottom-1/4 right-[25%] hidden lg:block">
          <div className="geo-rotate-reverse">
            <div className="geo-shape w-24 h-24 border-2 border-[#E0115F]/15 rotate-12" />
          </div>
        </div>
        <div className="absolute top-1/3 right-[8%] hidden lg:block">
          <div className="geo-shape w-16 h-16 bg-[#0F52BA]/10" style={{ clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)" }} />
        </div>

        <div className="max-w-5xl mx-auto w-full">
          <div className="geo-hero-title mb-2">
            <span
              className="text-xs tracking-[0.4em] font-semibold"
              style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
            >
              FORTIFIED FILE TRANSFER
            </span>
          </div>
          <h1
            className="geo-hero-title text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8"
            style={{ fontFamily: "'Unbounded', sans-serif" }}
          >
            YOUR FILES.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #50C878, #0F52BA, #E0115F)" }}
            >
              FORTIFIED.
            </span>
          </h1>
          <p className="geo-hero-sub text-base md:text-lg text-[#8B87A0] max-w-lg leading-relaxed mb-10" style={{ fontWeight: 300 }}>
            Military-grade encryption meets geometric precision. Transfer files
            through an impenetrable fortress of security.
          </p>
          <a
            href="#features"
            className="geo-hero-cta inline-block px-10 py-4 text-sm font-bold tracking-widest text-[#0C0C14] transition-all duration-300 hover:scale-105"
            style={{
              fontFamily: "'Unbounded', sans-serif",
              background: "linear-gradient(135deg, #50C878, #0F52BA)",
              clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)",
            }}
          >
            EXPLORE ↓
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-8 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="geo-reveal mb-20">
            <span
              className="text-xs tracking-[0.4em] font-semibold"
              style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
            >
              CAPABILITIES
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Built to{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #50C878, #0F52BA)" }}
              >
                protect
              </span>
            </h2>
          </div>
          <div className="geo-features grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Drag & Drop",
                desc: "Intuitive file upload. Drag files directly into the fortress.",
                color: "#50C878",
                shape: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              },
              {
                title: "AES-256 Cipher",
                desc: "Unbreakable encryption applied before files leave your device.",
                color: "#0F52BA",
                shape: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
              },
              {
                title: "Temporal Locks",
                desc: "Set expiration times and download limits. Links dissolve on schedule.",
                color: "#E0115F",
                shape: "polygon(50% 0%, 100% 100%, 0% 100%)",
              },
              {
                title: "Instant Links",
                desc: "Generate fortified shareable links in milliseconds.",
                color: "#50C878",
                shape: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="geo-feature p-8 border border-white/5 bg-[#12121C] hover:border-[color:var(--fc)]/30 transition-all duration-500 group relative overflow-hidden"
                style={{ ["--fc" as string]: f.color }}
              >
                {/* Background geometric accent */}
                <div
                  className="absolute -right-4 -top-4 w-24 h-24 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                  style={{ backgroundColor: f.color, clipPath: f.shape }}
                />
                <div
                  className="w-10 h-10 mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${f.color}20`, clipPath: f.shape }}
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: f.color }} />
                </div>
                <h3
                  className="text-base font-bold mb-3 group-hover:text-[color:var(--fc)] transition-colors"
                  style={{ fontFamily: "'Unbounded', sans-serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-[#8B87A0] leading-relaxed" style={{ fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-8 py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="geo-reveal text-center mb-20">
            <span
              className="text-xs tracking-[0.4em] font-semibold"
              style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
            >
              PROTOCOL
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Three-point{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #E0115F, #0F52BA)" }}
              >
                defense
              </span>
            </h2>
          </div>
          <div className="geo-steps grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { num: "01", title: "Upload", desc: "Files enter the fortress through our secure gateway.", color: "#50C878", shape: "polygon(50% 0%, 100% 100%, 0% 100%)" },
              { num: "02", title: "Encrypt", desc: "AES-256 cipher locks every byte. Unbreakable protection.", color: "#0F52BA", shape: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" },
              { num: "03", title: "Share", desc: "Fortified link generated with your chosen parameters.", color: "#E0115F", shape: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" },
            ].map((s, i) => (
              <div key={i} className="geo-step text-center">
                <div
                  className="w-20 h-20 mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${s.color}15`, clipPath: s.shape }}
                >
                  <span
                    className="text-lg font-bold"
                    style={{ fontFamily: "'Unbounded', sans-serif", color: s.color }}
                  >
                    {s.num}
                  </span>
                </div>
                <h3
                  className="text-base font-bold mb-3"
                  style={{ fontFamily: "'Unbounded', sans-serif", color: s.color }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-[#8B87A0] leading-relaxed" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section id="upload-demo" className="relative z-10 px-8 py-28 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="geo-reveal text-center mb-16">
            <span
              className="text-xs tracking-[0.4em] font-semibold"
              style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
            >
              INTERFACE
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold mt-4"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              The{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #50C878, #0F52BA)" }}
              >
                gateway
              </span>
            </h2>
          </div>
          <div
            className="geo-reveal border border-[#50C878]/20 bg-[#12121C] p-10 md:p-14 text-center relative overflow-hidden"
            style={{ clipPath: "polygon(2% 0%, 98% 0%, 100% 4%, 100% 96%, 98% 100%, 2% 100%, 0% 96%, 0% 4%)" }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#50C878]/30" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#50C878]/30" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#50C878]/30" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#50C878]/30" />

            <div
              className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"
              style={{
                backgroundColor: "#50C87815",
                clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
              }}
            >
              <span className="text-xl">⬆</span>
            </div>
            <p
              className="text-base font-bold mb-2"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              Drop files into the fortress
            </p>
            <p className="text-xs text-[#8B87A0] mb-8" style={{ fontWeight: 300 }}>
              or select from your device • up to 5GB
            </p>
            <button
              className="px-8 py-3 text-xs font-bold tracking-widest text-[#0C0C14] hover:scale-105 transition-transform duration-300"
              style={{
                fontFamily: "'Unbounded', sans-serif",
                background: "linear-gradient(135deg, #50C878, #0F52BA)",
                clipPath: "polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%)",
              }}
            >
              SELECT FILES
            </button>

            {/* Mock files */}
            <div className="mt-10 space-y-3 text-left">
              <div className="border border-white/5 bg-[#0C0C14] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">classified-report.pdf</p>
                  <p className="text-xs text-[#8B87A0]" style={{ fontWeight: 300 }}>6.8 MB</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 h-2 bg-[#1A1A2E] overflow-hidden">
                    <div
                      className="h-full w-[90%]"
                      style={{ background: "linear-gradient(90deg, #50C878, #0F52BA)" }}
                    />
                  </div>
                  <span className="text-xs text-[#50C878]">90%</span>
                </div>
              </div>
              <div className="border border-white/5 bg-[#0C0C14] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">blueprints.dwg</p>
                  <p className="text-xs text-[#8B87A0]" style={{ fontWeight: 300 }}>42.1 MB</p>
                </div>
                <span className="text-xs text-[#50C878] font-semibold">✓ Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative z-10 px-8 py-28 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <div className="geo-reveal mb-16">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'Unbounded', sans-serif" }}
            >
              IMPENETRABLE{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #50C878, #0F52BA, #E0115F)" }}
              >
                SECURITY
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "AES-256", color: "#50C878" },
              { label: "ZERO-KNOWLEDGE", color: "#0F52BA" },
              { label: "E2E ENCRYPTED", color: "#E0115F" },
              { label: "SOC 2", color: "#50C878" },
              { label: "GDPR", color: "#0F52BA" },
            ].map((t, i) => (
              <div
                key={i}
                className="geo-reveal border px-6 py-3 text-xs font-bold tracking-widest hover:scale-105 transition-all duration-300"
                style={{
                  fontFamily: "'Unbounded', sans-serif",
                  borderColor: `${t.color}30`,
                  color: t.color,
                }}
              >
                ◆ {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-8 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span
            className="text-sm font-bold tracking-[0.15em]"
            style={{ fontFamily: "'Unbounded', sans-serif", color: "#50C878" }}
          >
            VAULTDROP
          </span>
          <div className="flex gap-8 text-xs text-[#8B87A0]" style={{ fontWeight: 300 }}>
            <a href="#" className="hover:text-[#50C878] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#50C878] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#50C878] transition-colors">Contact</a>
          </div>
          <span className="text-[10px] text-[#8B87A0]/50">© 2026 VaultDrop</span>
        </div>
      </footer>
    </div>
  );
}
