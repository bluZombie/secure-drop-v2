"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OrganicFlow() {
  const mainRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating blob animations
      [blob1Ref, blob2Ref, blob3Ref].forEach((ref, i) => {
        if (ref.current) {
          gsap.to(ref.current, {
            y: `${15 + i * 5}`,
            x: `${10 - i * 8}`,
            scale: 1 + i * 0.02,
            duration: 4 + i,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      });

      // Blob morph
      gsap.to(".morph-blob", {
        borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Hero entrance
      gsap.from(".org-hero-title", { y: 60, opacity: 0, duration: 1.2, ease: "power2.out" });
      gsap.from(".org-hero-sub", { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: "power2.out" });
      gsap.from(".org-hero-cta", { y: 30, opacity: 0, duration: 0.8, delay: 0.6, ease: "power2.out" });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".org-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Feature cards
      gsap.from(".org-feature", {
        scrollTrigger: { trigger: ".org-features", start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
      });

      // Steps breathing
      gsap.from(".org-step", {
        scrollTrigger: { trigger: ".org-steps", start: "top 80%" },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.4)",
      });

      // Upload zone breathing
      gsap.to(".org-upload-zone", {
        scale: 1.01,
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
        fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(180deg, #FDF6EC 0%, #F5EDE0 30%, #FDF6EC 60%, #F0E8D8 100%)",
        color: "#3D3229",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Floating blobs */}
      <div
        ref={blob1Ref}
        className="morph-blob fixed top-[-10%] right-[-5%] w-[500px] h-[500px] opacity-30 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #E8A87C 0%, transparent 70%)",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
          filter: "blur(60px)",
        }}
      />
      <div
        ref={blob2Ref}
        className="morph-blob fixed bottom-[10%] left-[-10%] w-[600px] h-[600px] opacity-20 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #85CDCA 0%, transparent 70%)",
          borderRadius: "70% 30% 30% 70% / 70% 70% 30% 30%",
          filter: "blur(80px)",
        }}
      />
      <div
        ref={blob3Ref}
        className="fixed top-[40%] left-[50%] w-[400px] h-[400px] opacity-15 pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, #D4A574 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(70px)",
        }}
      />

      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#FDF6EC]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
          <span className="text-2xl" style={{ fontFamily: "'Instrument Serif', serif", color: "#8B6914" }}>
            VaultDrop
          </span>
          <a
            href="#upload-demo"
            className="text-sm bg-[#3D3229] text-[#FDF6EC] px-6 py-2.5 rounded-full hover:bg-[#8B6914] transition-all duration-500"
          >
            Start Transfer
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center relative z-10 px-8 pt-24">
        <div className="max-w-5xl mx-auto w-full text-center">
          <p className="org-hero-title text-sm tracking-[0.2em] text-[#8B6914] mb-6 uppercase">Secure & Serene</p>
          <h1
            className="org-hero-title text-5xl md:text-6xl lg:text-7xl leading-[1.1] mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Files flow safely,<br />
            <em className="text-[#8B6914]">naturally</em>
          </h1>
          <p className="org-hero-sub text-base md:text-lg text-[#8B7B6B] max-w-lg mx-auto leading-relaxed mb-10" style={{ fontWeight: 300 }}>
            A gentle approach to secure file transfer. End-to-end encryption
            wrapped in an experience that feels as natural as breathing.
          </p>
          <a
            href="#features"
            className="org-hero-cta inline-block bg-[#3D3229] text-[#FDF6EC] px-10 py-4 rounded-full text-sm hover:bg-[#8B6914] transition-all duration-500 hover:shadow-lg"
          >
            Explore Features ↓
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="relative z-10 px-8 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="org-reveal text-center mb-20">
            <p className="text-sm tracking-[0.2em] text-[#8B6914] mb-4 uppercase">Capabilities</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Thoughtfully <em className="text-[#8B6914]">designed</em>
            </h2>
          </div>
          <div className="org-features grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Effortless Upload",
                desc: "Drag and drop files into a welcoming space. No friction, just flow.",
                icon: "🌿",
                bg: "linear-gradient(135deg, #F5EDE0 0%, #E8DFD0 100%)",
              },
              {
                title: "Gentle Encryption",
                desc: "AES-256 encryption wraps your files in protection, silently and seamlessly.",
                icon: "🛡️",
                bg: "linear-gradient(135deg, #E8F0E8 0%, #D8E8D8 100%)",
              },
              {
                title: "Timed Expiration",
                desc: "Links bloom and fade on your schedule. Set time and download limits naturally.",
                icon: "🌸",
                bg: "linear-gradient(135deg, #F5E8E0 0%, #E8D8D0 100%)",
              },
              {
                title: "Seamless Sharing",
                desc: "Generate beautiful, shareable links that work everywhere, effortlessly.",
                icon: "🔗",
                bg: "linear-gradient(135deg, #E8E8F0 0%, #D8D8E8 100%)",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="org-feature p-8 rounded-3xl hover:scale-[1.02] transition-all duration-500 hover:shadow-xl"
                style={{ background: f.bg }}
              >
                <div className="text-3xl mb-5">{f.icon}</div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#8B7B6B] leading-relaxed" style={{ fontWeight: 300 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 px-8 py-28">
        <div className="max-w-5xl mx-auto">
          <div className="org-reveal text-center mb-20">
            <p className="text-sm tracking-[0.2em] text-[#8B6914] mb-4 uppercase">The Journey</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Three gentle <em className="text-[#8B6914]">steps</em>
            </h2>
          </div>
          <div className="org-steps grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "1", title: "Upload", desc: "Drop your files into the stream. We welcome any format, up to 5GB.", color: "#E8A87C" },
              { num: "2", title: "Encrypt", desc: "Your files are gently wrapped in AES-256 encryption, right in your browser.", color: "#85CDCA" },
              { num: "3", title: "Share", desc: "A secure link blooms for you. Set its lifespan and share with care.", color: "#D4A574" },
            ].map((s, i) => (
              <div key={i} className="org-step text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-semibold text-white"
                  style={{ background: s.color }}
                >
                  {s.num}
                </div>
                <h3 className="text-xl mb-3" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {s.title}
                </h3>
                <p className="text-sm text-[#8B7B6B] leading-relaxed" style={{ fontWeight: 300 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD DEMO */}
      <section id="upload-demo" className="relative z-10 px-8 py-28">
        <div className="max-w-3xl mx-auto">
          <div className="org-reveal text-center mb-16">
            <p className="text-sm tracking-[0.2em] text-[#8B6914] mb-4 uppercase">Experience</p>
            <h2 className="text-3xl md:text-4xl" style={{ fontFamily: "'Instrument Serif', serif" }}>
              The upload <em className="text-[#8B6914]">garden</em>
            </h2>
          </div>
          <div
            className="org-reveal org-upload-zone rounded-3xl p-12 md:p-16 text-center border-2 border-dashed border-[#D4A574]/40 hover:border-[#8B6914] transition-all duration-700"
            style={{ background: "linear-gradient(135deg, #FDF6EC 0%, #F5EDE0 100%)" }}
          >
            <div className="text-4xl mb-4">🌱</div>
            <p className="text-lg mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Drop your files here
            </p>
            <p className="text-xs text-[#8B7B6B] mb-8" style={{ fontWeight: 300 }}>
              or browse your device • up to 5GB
            </p>
            <button className="bg-[#3D3229] text-[#FDF6EC] px-8 py-3 rounded-full text-sm hover:bg-[#8B6914] transition-all duration-500">
              Browse Files
            </button>

            {/* Mock files */}
            <div className="mt-10 space-y-4 text-left">
              <div className="bg-white/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">nature-photos.zip</p>
                  <p className="text-xs text-[#8B7B6B]" style={{ fontWeight: 300 }}>24.5 MB</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-2 bg-[#E8DFD0] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#E8A87C] to-[#85CDCA] rounded-full w-[65%]" />
                  </div>
                  <span className="text-xs text-[#8B6914]">65%</span>
                </div>
              </div>
              <div className="bg-white/60 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">journal-entry.pdf</p>
                  <p className="text-xs text-[#8B7B6B]" style={{ fontWeight: 300 }}>1.2 MB</p>
                </div>
                <span className="text-xs text-[#85CDCA] font-medium">✓ Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="relative z-10 px-8 py-28">
        <div className="max-w-5xl mx-auto text-center">
          <div className="org-reveal mb-16">
            <h2 className="text-3xl md:text-4xl mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Rooted in <em className="text-[#8B6914]">trust</em>
            </h2>
            <p className="text-sm text-[#8B7B6B] max-w-md mx-auto" style={{ fontWeight: 300 }}>
              Every file is protected with care. Your privacy is our deepest commitment.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "AES-256", icon: "🔐" },
              { label: "Zero-Knowledge", icon: "🌿" },
              { label: "E2E Encrypted", icon: "🛡️" },
              { label: "SOC 2", icon: "✓" },
              { label: "GDPR", icon: "🌍" },
            ].map((t, i) => (
              <div
                key={i}
                className="org-reveal bg-white/50 backdrop-blur-sm rounded-2xl px-6 py-4 flex items-center gap-3 hover:shadow-lg hover:scale-[1.03] transition-all duration-500"
              >
                <span className="text-lg">{t.icon}</span>
                <span className="text-sm font-medium">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-8 py-12 border-t border-[#D4A574]/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-lg" style={{ fontFamily: "'Instrument Serif', serif", color: "#8B6914" }}>
            VaultDrop
          </span>
          <div className="flex gap-8 text-sm text-[#8B7B6B]" style={{ fontWeight: 300 }}>
            <a href="#" className="hover:text-[#8B6914] transition-colors duration-500">Privacy</a>
            <a href="#" className="hover:text-[#8B6914] transition-colors duration-500">Terms</a>
            <a href="#" className="hover:text-[#8B6914] transition-colors duration-500">Contact</a>
          </div>
          <span className="text-xs text-[#8B7B6B]/50">© 2026 VaultDrop</span>
        </div>
      </footer>
    </div>
  );
}
