"use client";

import { useRef, useEffect } from "react";
import { ArrowDown, Radio, Disc, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SOCIAL_LINKS } from "@/config/products";
import { audioEngine } from "@/lib/audio-engine";

gsap.registerPlugin(ScrollTrigger);

export default function Scene1Hero() {
  const containerRef = useRef<HTMLElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !wordmarkRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(wordmarkRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        scale: 1.1,
        opacity: 0.2,
        letterSpacing: "0.2em",
        y: 60,
      });

      gsap.to(subtitleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "40% top",
          scrub: 0.5,
        },
        y: -30,
        opacity: 0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToArrangement = () => {
    audioEngine.triggerPad("kick", "C1");
    const arrEl = document.getElementById("scene-arrangement");
    if (arrEl) {
      arrEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      id="scene-hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto z-10 select-none"
    >
      {/* Top Metadata Strip */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 border-b border-rack-border/80 pb-4 font-mono text-xs text-text-dim">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-redline led-red-active" />
          <span className="text-text-pure font-bold tracking-widest">
            OFFICIAL SOUND VAULT
          </span>
          <span className="text-rack-border hidden sm:inline">|</span>
          <span className="text-text-dim hidden sm:inline">GENRE: UNDERGROUND RAGE / HYPERPOP</span>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors flex items-center gap-1.5"
          >
            <Radio className="w-3.5 h-3.5 text-redline" />
            <span>@WEBS_CERTIFIED</span>
          </a>
          <span className="text-rack-border">|</span>
          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors flex items-center gap-1.5"
          >
            <Disc className="w-3.5 h-3.5 text-redline" />
            <span>SPOTIFY</span>
          </a>
        </div>
      </div>

      {/* Centerpiece: Wordmark with perfect centering & tracking */}
      <div className="my-auto py-8 sm:py-12 flex flex-col items-center text-center">
        <div
          ref={subtitleRef}
          className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-redline mb-4 px-3.5 py-1.5 bg-surface border border-rack-border shadow-md"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>SCROLLING BUILDS A BEAT // REAL-TIME DAW ARRANGEMENT</span>
        </div>

        <h1
          ref={wordmarkRef}
          className="font-display font-black text-[20vw] sm:text-[17vw] leading-none tracking-tight text-text-pure drop-shadow-[0_12px_45px_rgba(255,0,51,0.3)] select-none will-change-transform"
        >
          WËBS
        </h1>

        <p className="font-mono text-xs sm:text-sm text-text-dim mt-4 max-w-xl text-center leading-relaxed">
          OFFICIAL PRODUCER SOUND VAULT • HOME OF THE HYPERP!NK MULTI-KIT & UNDERGROUND BEAT CRATES
        </p>
      </div>

      {/* Bottom Action Strip with clean alignment */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-rack-border/80 pt-6">
        <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
          <span className="text-redline font-bold">01/07</span>
          <span>SYSTEM ARMED — SCROLL TO ACTIVATE ARRANGEMENT STEMS</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={handleScrollToArrangement}
            className="w-full sm:w-auto px-6 py-3 bg-redline hover:bg-redline-hot active:scale-95 text-white font-mono text-xs font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,0,51,0.35)]"
          >
            <span>START ARRANGEMENT SCRUB</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
