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
      gsap.to(".lux-curtain-left", {
        xPercent: -100,
        duration: 1.4,
        delay: 0.3,
        ease: "power4.inOut",
      });
      gsap.to(".lux-curtain-right", {
        xPercent: 100,
        duration: 1.4,
        delay: 0.3,
        ease: "power4.inOut",
      });

      // Title lines slide up with mask
      gsap.from(".lux-line", {
        y: "100%",
        duration: 1.2,
        stagger: 0.15,
        delay: 1,
        ease: "power3.out",
      });

      // Fade in elements
      gsap.from(".lux-fade", {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 1.8,
        ease: "power2.out",
      });

      // Horizontal rule grow
      gsap.from(".lux-hr", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.5,
        delay: 1.5,
        ease: "power2.inOut",
      });

      // Scroll reveals - elegant fade up
      gsap.utils.toArray<HTMLElement>(".lux-scroll-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          y: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        });
      });

      // Parallax images
      gsap.utils.toArray<HTMLElement>(".lux-parallax").forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          y: -80,
          ease: "none",
        });
      });

      // Feature cards stagger
      gsap.from(".lux-card", {
        scrollTrigger: { trigger: ".lux-cards-grid", start: "top 80%" },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
      });

      // Number counter
      gsap.from(".lux-step-num", {
        scrollTrigger: { trigger: ".lux-process", start: "top 80%" },
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "back.out(1.4)",
      });

      // Marquee
      gsap.to(".lux-marquee-inner", {
        xPercent: -50,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        background: "#FDFBF7",
        color: "#1a1a1a",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Libre+Franklin:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Opening curtain */}
      <div className="lux-curtain-left fixed inset-0 z-[100] bg-[#1a1a1a] pointer-events-none" style={{ width: "50%", left: 0 }} />
      <div className="lux-curtain-right fixed inset-0 z-[100] bg-[#1a1a1a] pointer-events-none" style={{ width: "50%", left: "50%" }} />

      {/* NAV - Refined, minimal */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDFBF7]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 py-6">
          <span
            className="text-2xl tracking-[0.08em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
          >
            Vault<span className="text-[#8B7355]">Drop</span>
          </span>
          <div className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.15em] uppercase" style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 400 }}>
            <a href="#features" className="text-[#999] hover:text-[#1a1a1a] transition-colors duration-500">Features</a>
            <a href="#process" className="text-[#999] hover:text-[#1a1a1a] transition-colors duration-500">Process</a>
            <a href="#upload" className="text-[#999] hover:text-[#1a1a1a] transition-colors duration-500">Upload</a>
          </div>
          <a
            href="#upload"
            className="text-[11px] tracking-[0.15em] uppercase border-b border-[#8B7355] text-[#8B7355] pb-1 hover:text-[#1a1a1a] hover:border-[#1a1a1a] transition-all duration-500"
            style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
          >
            Begin Transfer
          </a>
        </div>
      </nav>

      {/* HERO - Magazine editorial spread */}
      <section className="min-h-screen flex items-center relative pt-24">
        <div className="max-w-7xl mx-auto w-full px-8 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left column - Typography */}
            <div className="lg:col-span-7">
              <div className="lux-fade mb-6">
                <span
                  className="text-[11px] tracking-[0.3em] uppercase text-[#8B7355]"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
                >
                  Secure File Transfer — Est. 2026
                </span>
              </div>

              <h1 className="mb-8">
                <div className="overflow-hidden">
                  <div className="lux-line text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] font-light">
                    The Art of
                  </div>
                </div>
                <div className="overflow-hidden">
                  <div className="lux-line text-5xl md:text-6xl lg:text-[5.5rem] leading-[1.05] font-light">
                    <em className="text-[#8B7355]">Secure</em> Transfer
                  </div>
                </div>
              </h1>

              <div className="lux-hr w-24 h-[1px] bg-[#8B7355] mb-8" />

              <p
                className="lux-fade text-base md:text-lg text-[#777] max-w-md leading-[1.8] mb-10"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                Military-grade encryption meets refined design. Transfer your most
                sensitive files with the confidence they deserve — through an experience
                crafted for the discerning.
              </p>

              <div className="lux-fade flex items-center gap-6">
                <a
                  href="#features"
                  className="inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase text-[#1a1a1a] group"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
                >
                  <span>Discover</span>
                  <span className="w-12 h-[1px] bg-[#1a1a1a] group-hover:w-20 transition-all duration-700" />
                </a>
              </div>
            </div>

            {/* Right column - Editorial image/graphic */}
            <div className="lg:col-span-5 relative">
              <div className="lux-fade aspect-[3/4] bg-[#F0EBE3] relative overflow-hidden">
                <div className="lux-parallax absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[12rem] leading-none text-[#E8E0D4]" style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>
                      V
                    </div>
                    <div
                      className="text-[10px] tracking-[0.5em] uppercase text-[#8B7355] mt-4"
                      style={{ fontFamily: "'Libre Franklin', sans-serif" }}
                    >
                      Encrypted • Secure • Private
                    </div>
                  </div>
                </div>
                {/* Decorative border */}
                <div className="absolute inset-4 border border-[#8B7355]/20 pointer-events-none" />
              </div>
              {/* Caption */}
              <p
                className="lux-fade text-[10px] text-[#999] mt-4 tracking-[0.1em]"
                style={{ fontFamily: "'Libre Franklin', sans-serif" }}
              >
                End-to-end encryption, zero-knowledge architecture
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL DIVIDER - Full-width quote */}
      <section className="py-24 md:py-32 border-y border-[#E8E0D4]">
        <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
          <blockquote className="lux-scroll-reveal">
            <p className="text-3xl md:text-4xl lg:text-5xl font-light leading-[1.3] italic text-[#555]">
              &ldquo;Security should never compromise
              <br className="hidden md:block" />
              <span className="text-[#8B7355]"> beauty</span>, nor beauty compromise
              <span className="text-[#8B7355]"> security</span>.&rdquo;
            </p>
          </blockquote>
        </div>
      </section>

      {/* FEATURES - Editorial card layout */}
      <section id="features" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="lux-scroll-reveal grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
            <div>
              <span
                className="text-[11px] tracking-[0.3em] uppercase text-[#8B7355] block mb-4"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
              >
                Capabilities
              </span>
              <h2 className="text-4xl md:text-5xl font-light leading-[1.15]">
                Crafted with
                <br />
                <em className="text-[#8B7355]">intention</em>
              </h2>
            </div>
            <div className="flex items-end">
              <p
                className="text-sm text-[#999] leading-[1.8] max-w-sm"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                Every feature has been thoughtfully considered, refined, and polished
                to deliver an experience that is both powerful and graceful.
              </p>
            </div>
          </div>

          <div className="lux-cards-grid grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E8E0D4]">
            {[
              {
                num: "01",
                title: "Effortless Upload",
                desc: "A refined drag-and-drop interface that welcomes your files with grace. No clutter, no confusion — just seamless transfer.",
              },
              {
                num: "02",
                title: "Impenetrable Cipher",
                desc: "AES-256 encryption applied client-side before your files ever leave your device. We never see your data.",
              },
              {
                num: "03",
                title: "Temporal Elegance",
                desc: "Set precise expiration windows and download limits. Your links vanish gracefully when their purpose is fulfilled.",
              },
              {
                num: "04",
                title: "Instant Distribution",
                desc: "Generate refined, shareable links in moments. Compatible with every platform, designed for every occasion.",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="lux-card bg-[#FDFBF7] p-10 md:p-14 group hover:bg-[#F8F4EE] transition-colors duration-700"
              >
                <span
                  className="text-[11px] tracking-[0.2em] text-[#8B7355] block mb-8"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
                >
                  {f.num}
                </span>
                <h3 className="text-2xl md:text-3xl font-light mb-6 group-hover:text-[#8B7355] transition-colors duration-700">
                  {f.title}
                </h3>
                <p
                  className="text-sm text-[#999] leading-[1.8]"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
                >
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS - Horizontal editorial layout */}
      <section id="process" className="lux-process py-24 md:py-32 bg-[#1a1a1a] text-[#FDFBF7]">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <div className="lux-scroll-reveal mb-20 text-center">
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#8B7355] block mb-4"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
            >
              The Process
            </span>
            <h2 className="text-4xl md:text-5xl font-light">
              Three movements of <em className="text-[#8B7355]">certainty</em>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                num: "I",
                title: "Upload",
                desc: "Select or drag your files into the vault. We accept any format, up to 5GB, with the utmost care.",
              },
              {
                num: "II",
                title: "Encrypt",
                desc: "Military-grade AES-256 encryption wraps your files in an impenetrable cipher, right in your browser.",
              },
              {
                num: "III",
                title: "Share",
                desc: "Receive an elegant link with your chosen expiration and access parameters. Share with confidence.",
              },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div
                  className="lux-step-num text-7xl md:text-8xl font-light text-[#8B7355]/20 mb-6"
                >
                  {s.num}
                </div>
                <h3 className="text-2xl font-light mb-4 text-[#FDFBF7]">
                  {s.title}
                </h3>
                <p
                  className="text-sm text-[#777] leading-[1.8]"
                  style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
                >
                  {s.desc}
                </p>
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 -right-4 text-[#8B7355]/20 text-2xl">
                    ·
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD EXPERIENCE */}
      <section id="upload" className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-8 md:px-16">
          <div className="lux-scroll-reveal text-center mb-16">
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-[#8B7355] block mb-4"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
            >
              Experience
            </span>
            <h2 className="text-4xl md:text-5xl font-light">
              The upload <em className="text-[#8B7355]">atelier</em>
            </h2>
          </div>

          <div className="lux-scroll-reveal border border-[#E8E0D4] p-12 md:p-20 text-center bg-[#FDFBF7] relative">
            {/* Decorative inner border */}
            <div className="absolute inset-6 border border-[#E8E0D4]/50 pointer-events-none" />

            <div className="relative z-10">
              <div className="text-5xl text-[#E8E0D4] mb-6">◈</div>
              <p className="text-2xl font-light mb-2">
                Place your files here
              </p>
              <p
                className="text-[11px] text-[#999] tracking-[0.1em] mb-10"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
              >
                or select from your device · up to 5GB
              </p>
              <button
                className="border border-[#1a1a1a] text-[#1a1a1a] px-10 py-3 text-[11px] tracking-[0.2em] uppercase hover:bg-[#1a1a1a] hover:text-[#FDFBF7] transition-all duration-700"
                style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
              >
                Browse Files
              </button>

              {/* Mock files */}
              <div className="mt-14 space-y-6 text-left">
                <div className="flex items-center justify-between pb-6 border-b border-[#E8E0D4]">
                  <div>
                    <p className="text-base font-light">quarterly-report.pdf</p>
                    <p
                      className="text-[11px] text-[#999] mt-1"
                      style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
                    >
                      4.2 MB
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-[2px] bg-[#E8E0D4] overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#8B7355] to-[#C4A97D] w-[85%]" />
                    </div>
                    <span
                      className="text-[11px] text-[#8B7355]"
                      style={{ fontFamily: "'Libre Franklin', sans-serif" }}
                    >
                      85%
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-light">brand-guidelines.pdf</p>
                    <p
                      className="text-[11px] text-[#999] mt-1"
                      style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
                    >
                      12.8 MB
                    </p>
                  </div>
                  <span
                    className="text-[11px] text-[#8B7355]"
                    style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 500 }}
                  >
                    ✓ Complete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE - Editorial running text */}
      <section className="py-12 border-y border-[#E8E0D4] overflow-hidden">
        <div className="lux-marquee-inner flex gap-16 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-16 text-6xl md:text-8xl font-light text-[#E8E0D4] italic">
              <span>Secure</span>
              <span className="text-[#8B7355]/30">·</span>
              <span>Private</span>
              <span className="text-[#8B7355]/30">·</span>
              <span>Encrypted</span>
              <span className="text-[#8B7355]/30">·</span>
              <span>Elegant</span>
              <span className="text-[#8B7355]/30">·</span>
            </span>
          ))}
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-8 md:px-16 text-center">
          <div className="lux-scroll-reveal mb-16">
            <h2 className="text-3xl md:text-4xl font-light mb-4">
              Uncompromising <em className="text-[#8B7355]">standards</em>
            </h2>
            <p
              className="text-sm text-[#999] max-w-md mx-auto leading-[1.8]"
              style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
            >
              Every file is encrypted before it leaves your browser.
              We never see your data. Ever.
            </p>
          </div>
          <div className="lux-scroll-reveal flex flex-wrap justify-center gap-6">
            {[
              { label: "AES-256", sub: "Encryption" },
              { label: "Zero-Knowledge", sub: "Architecture" },
              { label: "End-to-End", sub: "Encrypted" },
              { label: "SOC 2", sub: "Compliant" },
              { label: "GDPR", sub: "Ready" },
            ].map((t, i) => (
              <div
                key={i}
                className="border border-[#E8E0D4] px-8 py-5 hover:border-[#8B7355] transition-all duration-700 group"
              >
                <div className="text-base font-light group-hover:text-[#8B7355] transition-colors duration-700">
                  {t.label}
                </div>
                <div
                  className="text-[10px] text-[#999] tracking-[0.15em] uppercase mt-1"
                  style={{ fontFamily: "'Libre Franklin', sans-serif" }}
                >
                  {t.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#E8E0D4] px-8 md:px-16 py-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xl tracking-[0.08em]" style={{ fontWeight: 600 }}>
            Vault<span className="text-[#8B7355]">Drop</span>
          </span>
          <div
            className="flex gap-8 text-[11px] text-[#999] tracking-[0.1em]"
            style={{ fontFamily: "'Libre Franklin', sans-serif", fontWeight: 300 }}
          >
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-500">Privacy</a>
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-500">Terms</a>
            <a href="#" className="hover:text-[#8B7355] transition-colors duration-500">Contact</a>
          </div>
          <span
            className="text-[10px] text-[#ccc]"
            style={{ fontFamily: "'Libre Franklin', sans-serif" }}
          >
            © 2026 VaultDrop
          </span>
        </div>
      </footer>
    </div>
  );
}
