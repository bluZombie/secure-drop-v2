"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicNoir() {
  const mainRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [vaultOpen, setVaultOpen] = useState(false);

  useEffect(() => {
    // Vault door opening animation
    const timer = setTimeout(() => setVaultOpen(true), 300);

    const ctx = gsap.context(() => {
      // After vault opens, animate content
      gsap.from(".noir-headline", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 1.8,
        ease: "power3.out",
      });
      gsap.from(".noir-tagline", {
        y: 40,
        opacity: 0,
        duration: 1,
        delay: 2.2,
        ease: "power3.out",
      });
      gsap.from(".noir-cta-btn", {
        opacity: 0,
        duration: 0.8,
        delay: 2.6,
        ease: "power2.out",
      });

      // Scroll-triggered text reveals
      gsap.utils.toArray<HTMLElement>(".reveal-text").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Feature cards overlap animation
      gsap.utils.toArray<HTMLElement>(".noir-feature-card").forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 80,
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });
      });

      // Horizontal scroll strip
      const strip = document.querySelector(".how-strip");
      const stripInner = document.querySelector(".how-strip-inner");
      if (strip && stripInner) {
        gsap.to(stripInner, {
          x: () => -(stripInner.scrollWidth - strip.clientWidth),
          ease: "none",
          scrollTrigger: {
            trigger: strip,
            start: "top top",
            end: () => `+=${stripInner.scrollWidth - strip.clientWidth}`,
            scrub: 1,
            pin: true,
          },
        });
      }
    }, mainRef);

    // Cursor spotlight effect
    const handleMouse = (e: MouseEvent) => {
      if (spotlightRef.current) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouse);

    return () => {
      clearTimeout(timer);
      ctx.revert();
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div ref={mainRef} style={{ background: "#0A0A0A", color: "#F5F0E8", minHeight: "100vh", overflow: "hidden" }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Source+Serif+4:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <style>{`
        .noir-serif { font-family: 'Playfair Display', serif; }
        .noir-body { font-family: 'Source Serif 4', serif; }
        
        /* Vault door animation */
        .vault-door {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0A0A0A;
          transition: opacity 0.8s ease 1.2s;
        }
        .vault-door.open { opacity: 0; pointer-events: none; }
        .vault-circle {
          width: 120vmax;
          height: 120vmax;
          border-radius: 50%;
          border: 3px solid #D4A853;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          transform: scale(0.05) rotate(-180deg);
        }
        .vault-door.open .vault-circle {
          transform: scale(1) rotate(0deg);
        }
        .vault-inner {
          width: 60%;
          height: 60%;
          border-radius: 50%;
          border: 1px solid #D4A85340;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
          transform: scale(0) rotate(90deg);
        }
        .vault-door.open .vault-inner {
          transform: scale(1) rotate(0deg);
        }
        .vault-text {
          font-family: 'Playfair Display', serif;
          color: #D4A853;
          font-size: 2rem;
          letter-spacing: 0.3em;
          opacity: 0;
          transition: opacity 0.5s ease 0.8s;
        }
        .vault-door.open .vault-text { opacity: 1; }

        /* Cursor spotlight */
        .spotlight {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          pointer-events: none;
          z-index: 10;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(212,168,83,0.06) 0%, transparent 70%);
          transition: left 0.1s ease-out, top 0.1s ease-out;
        }

        /* Gold underline hover */
        .gold-hover {
          position: relative;
          display: inline-block;
        }
        .gold-hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #D4A853;
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gold-hover:hover::after { width: 100%; }

        /* Scroll snap */
        .snap-container {
          scroll-snap-type: y mandatory;
        }
        .snap-section {
          scroll-snap-align: start;
          min-height: 100vh;
        }

        /* How it works strip */
        .how-strip { overflow: hidden; }
        .how-strip-inner { display: flex; gap: 0; width: max-content; }
        .how-step {
          width: 100vw;
          max-width: 500px;
          flex-shrink: 0;
          padding: 3rem;
          border-right: 1px solid #D4A85320;
        }
        @media (max-width: 768px) {
          .how-step { width: 85vw; padding: 2rem; }
        }

        /* Feature cards */
        .noir-feature-card {
          background: #1A1A1A;
          border: 1px solid #D4A85315;
          padding: 3rem;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .noir-feature-card:hover {
          border-color: #D4A85340;
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(212,168,83,0.08);
        }

        /* CTA section */
        .cta-gradient {
          background: linear-gradient(135deg, #D4A853 0%, #B8860B 50%, #D4A853 100%);
        }
      `}</style>

      {/* Vault Door Opening */}
      <div className={`vault-door ${vaultOpen ? "open" : ""}`}>
        <div className="vault-circle">
          <div className="vault-inner">
            <div className="vault-text">VAULTDROP</div>
          </div>
        </div>
      </div>

      {/* Cursor Spotlight */}
      <div ref={spotlightRef} className="spotlight hidden md:block" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 md:px-16 py-6">
          <span className="noir-serif text-lg tracking-[0.2em] text-[#F5F0E8]">VAULTDROP</span>
          <div className="flex items-center gap-8">
            <a href="#features" className="gold-hover text-xs tracking-[0.15em] text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors hidden md:inline">FEATURES</a>
            <a href="#how" className="gold-hover text-xs tracking-[0.15em] text-[#F5F0E8]/60 hover:text-[#F5F0E8] transition-colors hidden md:inline">PROCESS</a>
            <a href="#cta" className="text-xs tracking-[0.15em] text-[#0A0A0A] bg-[#D4A853] px-5 py-2.5 hover:bg-[#F5F0E8] transition-colors duration-300">BEGIN</a>
          </div>
        </div>
      </nav>

      {/* HERO — Full viewport cinematic */}
      <section className="snap-section relative flex items-center min-h-screen px-8 md:px-16">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0A0A]" />
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#D4A85320] to-transparent hidden md:block" style={{ right: "38%" }} />
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h1 className="noir-headline noir-serif text-[12vw] md:text-[8vw] leading-[0.9] font-bold text-[#F5F0E8]">
                Your files,<br />
                <span className="text-[#D4A853]">sealed.</span>
              </h1>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p className="noir-tagline noir-body text-base md:text-lg text-[#F5F0E8]/50 leading-relaxed">
                End-to-end encrypted transfers with expiring links and zero-knowledge architecture. 
                No accounts. No compromises.
              </p>
              <div className="mt-8">
                <a href="#cta" className="noir-cta-btn gold-hover noir-serif text-sm tracking-[0.15em] text-[#D4A853]">
                  Discover how →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — Horizontal scroll strip */}
      <section id="how" className="how-strip snap-section relative" style={{ background: "#0F0F0F" }}>
        <div className="absolute top-0 left-0 w-full py-8 px-8 md:px-16 z-10">
          <span className="reveal-text text-xs tracking-[0.3em] text-[#D4A853]/40 noir-body">HOW IT WORKS</span>
        </div>
        <div className="how-strip-inner items-center min-h-screen">
          {[
            { num: "I", title: "Upload", desc: "Drag your files into the vault. Any format, up to 5GB. The interface disappears — only your content matters." },
            { num: "II", title: "Encrypt", desc: "AES-256 encryption happens in your browser. Your files are sealed before they ever touch our servers. We see nothing." },
            { num: "III", title: "Share", desc: "Generate a unique link with custom expiration. One download, one hour, one chance — you set the rules." },
            { num: "IV", title: "Expire", desc: "Once conditions are met, the link self-destructs. The file is purged. No traces. No recovery. Gone." },
          ].map((step, i) => (
            <div key={i} className="how-step flex flex-col justify-center min-h-screen">
              <div className="noir-serif text-[#D4A853]/20 text-[6rem] md:text-[8rem] leading-none mb-4">{step.num}</div>
              <h3 className="noir-serif text-3xl md:text-5xl text-[#F5F0E8] mb-6">{step.title}</h3>
              <p className="noir-body text-sm md:text-base text-[#F5F0E8]/40 leading-relaxed max-w-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES — Overlapping cards */}
      <section id="features" className="snap-section px-8 md:px-16 py-32 relative">
        <div className="max-w-6xl mx-auto">
          <div className="reveal-text mb-20">
            <span className="text-xs tracking-[0.3em] text-[#D4A853]/40 noir-body block mb-4">FEATURES</span>
            <h2 className="noir-serif text-4xl md:text-6xl text-[#F5F0E8] leading-[1.1]">
              Built for those who<br />
              <span className="text-[#D4A853]">refuse to compromise.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {[
              { title: "Zero-Knowledge Architecture", desc: "We can't read your files. We can't access your keys. Your data exists in a space only you control.", icon: "◆" },
              { title: "Client-Side Encryption", desc: "AES-256 encryption runs entirely in your browser. Files are sealed before they leave your device.", icon: "◇" },
              { title: "Self-Destructing Links", desc: "Set download limits and time-based expiration. Once triggered, everything vanishes permanently.", icon: "○" },
              { title: "No Account Required", desc: "No sign-ups, no profiles, no data collection. Upload, share, disappear.", icon: "□" },
              { title: "Drag & Drop Simplicity", desc: "The most secure transfer tool shouldn't require a manual. Drop files. Get a link. Done.", icon: "△" },
              { title: "Compliance Ready", desc: "SOC 2 Type II certified. GDPR compliant. HIPAA ready. Enterprise security, individual simplicity.", icon: "▽" },
            ].map((f, i) => (
              <div
                key={i}
                className={`noir-feature-card ${i % 3 === 1 ? "md:translate-y-12" : ""}`}
              >
                <div className="text-[#D4A853] text-2xl mb-6">{f.icon}</div>
                <h3 className="noir-serif text-xl md:text-2xl text-[#F5F0E8] mb-4">{f.title}</h3>
                <p className="noir-body text-sm text-[#F5F0E8]/35 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Full-screen gold gradient */}
      <section id="cta" className="snap-section relative min-h-screen flex items-center justify-center cta-gradient">
        <div className="text-center px-8 max-w-3xl">
          <h2 className="reveal-text noir-serif text-4xl md:text-7xl text-[#0A0A0A] leading-[1.1] mb-8">
            Ready to seal<br />your next transfer?
          </h2>
          <p className="reveal-text noir-body text-base md:text-lg text-[#0A0A0A]/60 mb-12 max-w-lg mx-auto">
            Join thousands who trust VaultDrop for their most sensitive file transfers. No account needed.
          </p>
          <a
            href="#"
            className="reveal-text inline-block bg-[#0A0A0A] text-[#D4A853] noir-serif text-sm tracking-[0.2em] px-10 py-4 hover:bg-[#1A1A1A] transition-colors duration-300"
          >
            START TRANSFERRING
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 py-12 border-t border-[#D4A85315]" style={{ background: "#0A0A0A" }}>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="noir-body text-xs text-[#F5F0E8]/20">© 2026 VaultDrop. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="gold-hover noir-body text-xs text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60 transition-colors">Privacy</a>
            <a href="#" className="gold-hover noir-body text-xs text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60 transition-colors">Terms</a>
            <a href="#" className="gold-hover noir-body text-xs text-[#F5F0E8]/30 hover:text-[#F5F0E8]/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
