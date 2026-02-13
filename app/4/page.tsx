"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MinimalistJapanese() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Ink brush stroke reveal
      gsap.from(".ink-stroke", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5,
      });

      // Title characters fade in one by one
      gsap.from(".jp-char", {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8,
      });

      // Subtitle gentle reveal
      gsap.from(".jp-sub", {
        opacity: 0,
        y: 15,
        duration: 1.2,
        delay: 2,
        ease: "power2.out",
      });

      // Floating elements - very gentle
      gsap.utils.toArray<HTMLElement>(".float-gentle").forEach((el, i) => {
        gsap.to(el, {
          y: gsap.utils.random(-8, 8),
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.5,
        });
      });

      // Circle expand
      gsap.from(".enso-circle", {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: "power1.out",
        delay: 0.3,
      });

      // Scroll sections
      gsap.utils.toArray<HTMLElement>(".jp-section").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      });

      // Feature items slide in
      gsap.from(".jp-feature", {
        scrollTrigger: { trigger: ".jp-features", start: "top 80%" },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      });

      // Step stones
      gsap.from(".step-stone", {
        scrollTrigger: { trigger: ".stones-container", start: "top 80%" },
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "back.out(1.4)",
      });

      // Bamboo grow
      gsap.from(".bamboo-line", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 1.5,
        stagger: 0.2,
        ease: "power2.out",
        delay: 1,
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      style={{
        fontFamily: "'Zen Kaku Gothic New', 'Noto Sans JP', sans-serif",
        background: "#faf8f5",
        color: "#2d2d2d",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700&family=Noto+Serif+JP:wght@200;300;400;500;600&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{`
        .serif-jp { font-family: 'Shippori Mincho', 'Noto Serif JP', serif; }
        .accent-red { color: #c53d43; }
        .bg-washi { background: #faf8f5; }
        .bg-sumi { background: #2d2d2d; }
        .text-sumi { color: #2d2d2d; }
        .text-stone { color: #8a8a8a; }
        .border-subtle { border-color: #e8e4df; }
        
        /* Washi paper texture */
        .washi-texture {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.02'/%3E%3C/svg%3E");
        }

        /* Vertical text for decorative elements */
        .vertical-text {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
      `}</style>

      {/* NAV - Minimal */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-[#faf8f5]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <span className="serif-jp text-lg font-medium tracking-wider text-sumi">
              vault<span className="accent-red">drop</span>
            </span>
            <span className="text-[10px] text-stone">安全</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] text-stone tracking-wider">
            <a href="#features" className="hover:text-[#c53d43] transition-colors duration-500">Features</a>
            <a href="#process" className="hover:text-[#c53d43] transition-colors duration-500">Process</a>
            <a href="#transfer" className="hover:text-[#c53d43] transition-colors duration-500">Transfer</a>
          </div>
          <a href="#transfer" className="text-[11px] tracking-wider border border-[#2d2d2d] text-sumi px-5 py-2 hover:bg-[#2d2d2d] hover:text-[#faf8f5] transition-all duration-500">
            Begin
          </a>
        </div>
      </nav>

      {/* HERO - Zen composition */}
      <section className="min-h-screen flex items-center relative pt-20 px-8 washi-texture">
        {/* Enso circle */}
        <div className="enso-circle absolute top-1/2 right-[10%] -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border-2 border-[#2d2d2d]/5 hidden md:block" />
        <div className="enso-circle absolute top-1/2 right-[10%] -translate-y-1/2 w-[280px] h-[280px] md:w-[480px] md:h-[480px] rounded-full border border-[#c53d43]/10 hidden md:block" />

        {/* Decorative vertical text */}
        <div className="absolute right-8 top-1/3 vertical-text text-[10px] text-stone/30 tracking-[0.5em] hidden lg:block float-gentle">
          安全なファイル転送
        </div>

        {/* Bamboo lines */}
        <div className="absolute left-12 top-24 bottom-24 flex gap-3 hidden lg:flex">
          <div className="bamboo-line w-px h-full bg-[#2d2d2d]/5" />
          <div className="bamboo-line w-px h-full bg-[#c53d43]/5" />
        </div>

        <div className="max-w-5xl mx-auto w-full relative z-10">
          {/* Ink stroke */}
          <div className="ink-stroke w-16 h-0.5 bg-[#c53d43] mb-8" />

          <div className="mb-4">
            <span className="text-[11px] text-stone tracking-[0.3em]">Secure File Transfer</span>
          </div>

          <h1 className="serif-jp text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.1] mb-8 tracking-tight">
            <span className="jp-char inline-block">Simple.</span><br />
            <span className="jp-char inline-block accent-red">Secure.</span><br />
            <span className="jp-char inline-block text-stone/40">Silent.</span>
          </h1>

          <p className="jp-sub text-sm md:text-base text-stone max-w-md leading-[1.8] mb-12 font-light">
            Like water finding its path — your files flow securely
            from origin to destination. No excess. No trace.
            Only the essential remains.
          </p>

          <div className="jp-sub flex gap-4">
            <a href="#transfer" className="bg-[#2d2d2d] text-[#faf8f5] px-8 py-3 text-xs tracking-wider hover:bg-[#c53d43] transition-colors duration-500">
              Transfer Files
            </a>
            <a href="#features" className="border border-[#e8e4df] text-stone px-8 py-3 text-xs tracking-wider hover:border-[#2d2d2d] hover:text-sumi transition-all duration-500">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* DIVIDER - Zen */}
      <section className="px-8 py-6">
        <div className="max-w-5xl mx-auto flex items-center gap-8">
          <div className="flex-1 h-px bg-[#e8e4df]" />
          <span className="text-[10px] text-stone/40 tracking-[0.5em]">一</span>
          <div className="flex-1 h-px bg-[#e8e4df]" />
        </div>
      </section>

      {/* FEATURES - Horizontal scroll-like layout */}
      <section id="features" className="jp-section jp-features px-8 py-24 washi-texture">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] text-stone tracking-[0.3em]">特徴 — Features</span>
            <h2 className="serif-jp text-3xl md:text-4xl font-normal mt-3 tracking-tight">
              The <em className="accent-red" style={{ fontStyle: "normal" }}>essential</em> elements
            </h2>
          </div>

          <div className="space-y-0">
            {[
              {
                num: "一",
                title: "Effortless Upload",
                desc: "Drag and release. Your files enter the stream naturally, without resistance or unnecessary steps.",
                kanji: "簡素",
              },
              {
                num: "二",
                title: "Invisible Protection",
                desc: "AES-256 encryption wraps your files silently. Like armor that weighs nothing — present but imperceptible.",
                kanji: "守護",
              },
              {
                num: "三",
                title: "Ephemeral Links",
                desc: "Sharing links that dissolve after use. Like cherry blossoms — beautiful in their impermanence.",
                kanji: "儚い",
              },
              {
                num: "四",
                title: "Zero Knowledge",
                desc: "We see nothing. We store nothing. Your data passes through like wind through bamboo.",
                kanji: "無知",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="jp-feature border-t border-[#e8e4df] py-8 grid grid-cols-12 gap-4 items-start group hover:bg-[#f5f2ef] transition-colors duration-500 px-4 -mx-4"
              >
                <div className="col-span-1 serif-jp text-lg accent-red">{f.num}</div>
                <div className="col-span-2 md:col-span-1">
                  <span className="text-2xl text-stone/20 serif-jp float-gentle">{f.kanji}</span>
                </div>
                <div className="col-span-9 md:col-span-4">
                  <h3 className="serif-jp text-lg font-medium mb-1 group-hover:text-[#c53d43] transition-colors duration-500">
                    {f.title}
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <p className="text-sm text-stone leading-[1.8] font-light">{f.desc}</p>
                </div>
              </div>
            ))}
            <div className="border-t border-[#e8e4df]" />
          </div>
        </div>
      </section>

      {/* PROCESS - Stepping stones */}
      <section id="process" className="jp-section px-8 py-24 bg-[#2d2d2d] text-[#faf8f5]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <span className="text-[10px] text-[#faf8f5]/40 tracking-[0.3em]">過程 — Process</span>
            <h2 className="serif-jp text-3xl md:text-4xl font-normal mt-3 tracking-tight">
              Three <em className="text-[#c53d43]" style={{ fontStyle: "normal" }}>stones</em> to cross
            </h2>
          </div>

          <div className="stones-container grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                num: "01",
                title: "Place",
                desc: "Drop your files into the stream. Any format, up to 5GB. The journey begins.",
                kanji: "置",
              },
              {
                num: "02",
                title: "Seal",
                desc: "AES-256 encryption is applied in your browser. The seal is unbreakable.",
                kanji: "封",
              },
              {
                num: "03",
                title: "Send",
                desc: "A temporary link is created. Share it. Once used, it dissolves like morning mist.",
                kanji: "送",
              },
            ].map((step, i) => (
              <div key={i} className="step-stone text-center">
                <div className="w-20 h-20 mx-auto rounded-full border border-[#faf8f5]/10 flex items-center justify-center mb-6 relative">
                  <span className="serif-jp text-3xl text-[#faf8f5]/10">{step.kanji}</span>
                  <span className="absolute -bottom-2 text-[10px] text-[#c53d43] font-mono">{step.num}</span>
                </div>
                <h3 className="serif-jp text-xl font-medium mb-3">{step.title}</h3>
                <p className="text-sm text-[#faf8f5]/50 leading-[1.8] font-light max-w-xs mx-auto">{step.desc}</p>
                {i < 2 && (
                  <div className="hidden md:block mt-6 text-[#faf8f5]/10 text-2xl">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPLOAD */}
      <section id="transfer" className="jp-section px-8 py-24 washi-texture">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] text-stone tracking-[0.3em]">転送 — Transfer</span>
            <h2 className="serif-jp text-3xl md:text-4xl font-normal mt-3 tracking-tight">
              Begin your <em className="accent-red" style={{ fontStyle: "normal" }}>transfer</em>
            </h2>
          </div>

          <div className="border border-[#e8e4df] bg-white p-8 md:p-16 text-center relative group hover:border-[#c53d43]/30 transition-colors duration-700">
            {/* Minimal corner marks */}
            <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-[#c53d43]/20" />
            <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-[#c53d43]/20" />

            <div className="serif-jp text-4xl text-stone/20 mb-6 float-gentle">雲</div>
            <h3 className="serif-jp text-xl font-medium mb-2">Drop your files here</h3>
            <p className="text-xs text-stone mb-8">or click to browse • up to 5GB per file</p>
            <button className="border border-[#2d2d2d] text-sumi px-8 py-3 text-xs tracking-wider hover:bg-[#2d2d2d] hover:text-[#faf8f5] transition-all duration-500">
              Select Files
            </button>

            {/* Mock uploads */}
            <div className="mt-10 space-y-3 text-left">
              <div className="border border-[#e8e4df] p-4 flex items-center justify-between bg-[#faf8f5]">
                <div>
                  <div className="text-xs font-medium">presentation_final.pdf</div>
                  <div className="text-[10px] text-stone mt-0.5">2.4 MB</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 h-1 bg-[#e8e4df] overflow-hidden rounded-full">
                    <div className="h-full bg-[#c53d43] rounded-full" style={{ width: "75%" }} />
                  </div>
                  <span className="text-[10px] accent-red">75%</span>
                </div>
              </div>
              <div className="border border-[#e8e4df] p-4 flex items-center justify-between bg-[#faf8f5]">
                <div>
                  <div className="text-xs font-medium">design_assets.zip</div>
                  <div className="text-[10px] text-stone mt-0.5">48.2 MB</div>
                </div>
                <span className="text-[10px] accent-red">✓ Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section className="jp-section px-8 py-24 border-t border-[#e8e4df]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[10px] text-stone tracking-[0.3em]">信頼 — Trust</span>
          <h2 className="serif-jp text-3xl md:text-4xl font-normal mt-3 mb-6 tracking-tight">
            Built on <em className="accent-red" style={{ fontStyle: "normal" }}>silence</em>
          </h2>
          <p className="text-sm text-stone max-w-md mx-auto leading-[1.8] font-light mb-12">
            True security is invisible. Your files are encrypted before they leave your device.
            We hold no keys. We keep no records. Only emptiness remains.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {["AES-256", "Zero Knowledge", "E2E Encrypted", "SOC 2", "GDPR"].map((badge, i) => (
              <div
                key={i}
                className="border border-[#e8e4df] px-6 py-3 text-[11px] text-stone tracking-wider hover:border-[#c53d43] hover:text-[#c53d43] transition-all duration-500"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e8e4df] px-8 py-12 washi-texture">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="serif-jp text-sm tracking-wider text-sumi">vault<span className="accent-red">drop</span></span>
          </div>
          <div className="flex gap-8 text-[10px] text-stone tracking-wider">
            <a href="#" className="hover:text-[#c53d43] transition-colors duration-500">Privacy</a>
            <a href="#" className="hover:text-[#c53d43] transition-colors duration-500">Terms</a>
            <a href="#" className="hover:text-[#c53d43] transition-colors duration-500">Contact</a>
          </div>
          <span className="text-[10px] text-stone/50">© 2026 VaultDrop</span>
        </div>
      </footer>
    </div>
  );
}
