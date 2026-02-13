"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EditorialLuxe() {
  const mainRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero letters animate in with stagger spring
      gsap.from(".hero-letter", {
        y: 200,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: "back.out(1.4)",
        delay: 0.3,
      });

      gsap.from(".editorial-subtitle", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 1.5,
        ease: "power3.out",
      });

      // Horizontal scroll section
      const hSection = horizontalRef.current;
      if (hSection) {
        const inner = hSection.querySelector(".h-scroll-inner");
        if (inner) {
          gsap.to(inner, {
            x: () => -(inner.scrollWidth - hSection.clientWidth),
            ease: "none",
            scrollTrigger: {
              trigger: hSection,
              start: "top top",
              end: () => `+=${inner.scrollWidth - hSection.clientWidth}`,
              scrub: 1,
              pin: true,
            },
          });
        }
      }

      // Parallax elements at different speeds
      gsap.utils.toArray<HTMLElement>(".parallax-slow").forEach((el) => {
        gsap.to(el, {
          y: -80,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
      gsap.utils.toArray<HTMLElement>(".parallax-fast").forEach((el) => {
        gsap.to(el, {
          y: -160,
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });

      // Text split animation on scroll
      gsap.utils.toArray<HTMLElement>(".split-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Image reveal with clip-path
      gsap.utils.toArray<HTMLElement>(".img-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 80%" },
          clipPath: "inset(100% 0 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
        });
      });

      // Trust cards
      gsap.from(".trust-item", {
        scrollTrigger: { trigger: ".trust-section", start: "top 75%" },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Magnetic button effect
      const magnetBtns = document.querySelectorAll(".magnetic-btn");
      magnetBtns.forEach((btn) => {
        const el = btn as HTMLElement;
        el.addEventListener("mousemove", (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const heroText = "VaultDrop";

  return (
    <div ref={mainRef} style={{ background: "#F8F6F3", color: "#1A1A1A", minHeight: "100vh" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500&family=Libre+Franklin:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .ed-display { font-family: 'Cormorant Garamond', serif; }
        .ed-ui { font-family: 'Inter', sans-serif; }
        .ed-body { font-family: 'Libre Franklin', sans-serif; }

        /* Hero letter animation */
        .hero-letter {
          display: inline-block;
          transform-origin: bottom center;
        }

        /* Horizontal scroll */
        .h-scroll-container { overflow: hidden; }
        .h-scroll-inner {
          display: flex;
          width: max-content;
        }
        .h-scroll-panel {
          width: 80vw;
          max-width: 600px;
          flex-shrink: 0;
          padding: 4rem 3rem;
        }
        @media (max-width: 768px) {
          .h-scroll-panel { width: 90vw; padding: 2rem; }
        }

        /* Image reveal */
        .img-reveal {
          clip-path: inset(0 0 0 0);
        }

        /* Magnetic button */
        .magnetic-btn {
          display: inline-block;
          transition: background 0.3s, color 0.3s;
        }

        /* Pull quote */
        .pull-quote {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 300;
          font-style: italic;
          line-height: 1.4;
        }

        /* Elegant divider */
        .elegant-divider {
          width: 60px;
          height: 1px;
          background: #C45D3E;
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 py-6">
          <span className="ed-display text-lg font-medium text-[#F8F6F3] tracking-[0.1em]">VaultDrop</span>
          <div className="flex items-center gap-8">
            <a href="#showcase" className="ed-ui text-[10px] tracking-[0.15em] uppercase text-[#F8F6F3]/50 hover:text-[#F8F6F3] transition-colors hidden md:inline">Features</a>
            <a href="#about" className="ed-ui text-[10px] tracking-[0.15em] uppercase text-[#F8F6F3]/50 hover:text-[#F8F6F3] transition-colors hidden md:inline">About</a>
            <a href="#cta" className="ed-ui text-[10px] tracking-[0.15em] uppercase text-[#F8F6F3]/50 hover:text-[#F8F6F3] transition-colors hidden md:inline">Begin</a>
          </div>
        </div>
      </nav>

      {/* HERO — Viewport-filling animated typography */}
      <section className="min-h-screen flex flex-col items-center justify-center px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#1A1A1A]" />
        <div className="relative z-10 text-center">
          <h1 className="ed-display text-[16vw] md:text-[12vw] font-light leading-[0.85] text-[#F8F6F3] mb-8" style={{ perspective: "1000px" }}>
            {heroText.split("").map((char, i) => (
              <span key={i} className="hero-letter">
                {char}
              </span>
            ))}
          </h1>
          <p className="editorial-subtitle ed-body text-sm md:text-base text-[#F8F6F3]/40 tracking-[0.1em] max-w-md mx-auto">
            Secure file transfers, elevated.
          </p>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10">
          <div className="ed-ui text-[9px] tracking-[0.3em] text-[#F8F6F3]/20 uppercase">Scroll</div>
        </div>
      </section>

      {/* HORIZONTAL SCROLL SHOWCASE */}
      <section id="showcase" ref={horizontalRef} className="h-scroll-container relative" style={{ background: "#F8F6F3" }}>
        <div className="absolute top-12 left-8 md:left-16 z-10">
          <span className="ed-ui text-[10px] tracking-[0.2em] text-[#9B9B9B] uppercase">Features</span>
        </div>
        <div className="h-scroll-inner items-center min-h-screen">
          {/* Intro panel */}
          <div className="h-scroll-panel flex flex-col justify-center">
            <h2 className="ed-display text-5xl md:text-7xl font-light text-[#1A1A1A] leading-[1.1] mb-6">
              What makes<br />it <span className="text-[#C45D3E] italic">different</span>
            </h2>
            <div className="elegant-divider mb-6" />
            <p className="ed-body text-sm text-[#9B9B9B] max-w-sm leading-relaxed">
              Every detail designed with intention. Security that doesn&apos;t sacrifice elegance.
            </p>
          </div>

          {[
            { title: "End-to-End\nEncryption", desc: "AES-256 encryption runs entirely in your browser. Your files are sealed before they ever leave your device. We see nothing.", num: "01" },
            { title: "Self-Destructing\nLinks", desc: "Set precise expiration conditions — time limits, download caps, or both. Once triggered, everything vanishes permanently.", num: "02" },
            { title: "Zero-Knowledge\nArchitecture", desc: "We mathematically cannot access your files. The encryption keys exist only in your browser, never on our servers.", num: "03" },
            { title: "Effortless\nSimplicity", desc: "No accounts. No forms. No friction. Drag a file, get a link, share it. The most powerful tools feel invisible.", num: "04" },
          ].map((item, i) => (
            <div key={i} className="h-scroll-panel flex flex-col justify-center border-l border-[#1A1A1A]/5">
              <span className="ed-ui text-[10px] tracking-[0.2em] text-[#C45D3E] mb-6">{item.num}</span>
              <h3 className="ed-display text-4xl md:text-5xl font-light text-[#1A1A1A] leading-[1.1] mb-6 whitespace-pre-line">
                {item.title}
              </h3>
              <p className="ed-body text-sm text-[#9B9B9B] max-w-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ABOUT — Large pull-quote */}
      <section id="about" className="px-8 md:px-16 py-32 relative" style={{ background: "#FFF8F0" }}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <div className="split-reveal">
              <span className="ed-ui text-[10px] tracking-[0.2em] text-[#C45D3E] uppercase mb-8 block">About VaultDrop</span>
              <blockquote className="pull-quote text-3xl md:text-5xl text-[#1A1A1A] mb-8">
                &ldquo;Security should be invisible. The best protection is the kind you never have to think about.&rdquo;
              </blockquote>
              <div className="elegant-divider mb-6" />
              <p className="ed-body text-sm text-[#9B9B9B] leading-relaxed max-w-lg">
                VaultDrop was built on a simple premise: sharing files securely shouldn&apos;t require expertise, 
                accounts, or compromise. We created a tool that wraps military-grade encryption in an interface 
                so simple it feels like magic.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 parallax-slow">
            <div className="img-reveal rounded-sm overflow-hidden">
              <div
                className="aspect-[3/4] w-full"
                style={{
                  background: "linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 50%, #1A1A1A 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="text-center">
                  <div className="ed-display text-6xl text-[#C45D3E]/20 mb-4">◆</div>
                  <div className="ed-display text-xl text-[#F8F6F3]/30 italic">Sealed & Secure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST — Elegant card design */}
      <section className="trust-section px-8 md:px-16 py-32" style={{ background: "#F8F6F3" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 split-reveal">
            <span className="ed-ui text-[10px] tracking-[0.2em] text-[#C45D3E] uppercase">Trust</span>
            <h2 className="ed-display text-4xl md:text-6xl font-light text-[#1A1A1A] mt-4">
              Built on certainty
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "SOC 2 Type II", desc: "Independently audited security controls verified annually." },
              { title: "GDPR Compliant", desc: "Full compliance with European data protection standards." },
              { title: "HIPAA Ready", desc: "Healthcare-grade security for sensitive medical data." },
              { title: "Zero-Knowledge Proof", desc: "Mathematical guarantee that we cannot access your data." },
              { title: "Open Source Crypto", desc: "Our encryption library is open source and peer-reviewed." },
              { title: "99.97% Uptime", desc: "Enterprise infrastructure with global redundancy." },
            ].map((t, i) => (
              <div key={i} className="trust-item group">
                <div className="border-t border-[#1A1A1A]/10 pt-6 group-hover:border-[#C45D3E] transition-colors duration-500">
                  <h3 className="ed-display text-xl font-medium text-[#1A1A1A] mb-3">{t.title}</h3>
                  <p className="ed-body text-xs text-[#9B9B9B] leading-relaxed">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Single powerful sentence */}
      <section id="cta" className="min-h-[70vh] flex items-center justify-center px-8 relative" style={{ background: "#1A1A1A" }}>
        <div className="text-center max-w-4xl split-reveal">
          <h2 className="ed-display text-5xl md:text-[8vw] font-light text-[#F8F6F3] leading-[1] mb-12">
            Send with<br />
            <span className="text-[#C45D3E] italic">confidence.</span>
          </h2>
          <a
            href="#"
            className="magnetic-btn ed-ui text-[11px] tracking-[0.2em] uppercase text-[#F8F6F3] border border-[#F8F6F3]/20 px-12 py-5 hover:bg-[#F8F6F3] hover:text-[#1A1A1A] transition-all duration-500"
          >
            Begin Transfer
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-12 border-t border-[#1A1A1A]/5" style={{ background: "#F8F6F3" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="ed-body text-xs text-[#9B9B9B]">© 2026 VaultDrop</span>
          <div className="flex gap-8 ed-body text-xs text-[#9B9B9B]">
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#1A1A1A] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
