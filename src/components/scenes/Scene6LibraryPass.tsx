"use client";

import { useRef, useEffect } from "react";
import { Check, Box, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LIBRARY_PASS } from "@/config/products";

gsap.registerPlugin(ScrollTrigger);

export default function Scene6LibraryPass() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cratesStackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !cratesStackRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const crates = cratesStackRef.current?.querySelectorAll(".crate-layer");
      if (crates && crates.length > 0) {
        gsap.fromTo(
          crates,
          {
            y: (i) => (i + 1) * 35,
            opacity: 0.4,
            rotateX: 15,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="scene-pass"
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-rack-border bg-obsidian z-20 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rack-border pb-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold mb-1">
            <Box className="w-4 h-4 text-redline" />
            <span>SCENE 06 // ALL-ACCESS SOUND VAULT</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-pure tracking-tight">
            PRODUCER LIBRARY PASS
          </h2>
          <p className="font-mono text-xs text-text-dim mt-1 max-w-xl">
            COMPLETE UNLIMITED ARCHIVE ACCESS • EVERY BEAT, DRUM KIT, SAMPLE PACK & STEM FILE
          </p>
        </div>

        <div className="font-mono text-xs text-text-dim flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-redline led-red-active" />
          <span>UPDATED WEEKLY WITH UNRELEASED SAMPLES</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left 6 Cols: Stacked 3D Crates Visual with perfect alignment */}
        <div className="lg:col-span-6 relative perspective-1000">
          <div className="font-mono text-xs text-text-dim mb-4 flex items-center justify-between border-b border-rack-border pb-2">
            <span>EXPLODED PHYSICAL ARCHIVE [14 CRATES]</span>
            <span className="text-redline">WËBS_VAULT_RAW</span>
          </div>

          <div ref={cratesStackRef} className="space-y-3">
            {[
              { title: "CRATE 01 // HYPERP!NK MULTI-KIT MASTER", count: "420 SAMPLES", size: "1.2 GB" },
              { title: "CRATE 02 // ULTRAP!NK DRUM VAULT", count: "280 SAMPLES", size: "680 MB" },
              { title: "CRATE 03 // x10K ONE-SHOT MODULAR BANK", count: "512 SAMPLES", size: "1.8 GB" },
              { title: "CRATE 04 // 2026 UNRELEASED LOOP VAULT", count: "16 STEMS", size: "940 MB" },
              { title: "CRATE 05 // BEAT CATALOG COMMERCIAL STEMS", count: "24 TRACKS", size: "4.8 GB" },
            ].map((crate, i) => (
              <div
                key={crate.title}
                className="crate-layer bg-surface border border-rack-border hover:border-redline p-4 flex items-center justify-between transition-colors shadow-lg group"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 text-center font-mono text-xs text-redline font-bold flex-shrink-0">
                    0{i + 1}
                  </span>
                  <div className="min-w-0">
                    <h4 className="font-display font-bold text-sm text-text-pure group-hover:text-redline transition-colors truncate">
                      {crate.title}
                    </h4>
                    <span className="font-mono text-[10px] text-text-dim block mt-0.5">
                      {crate.count} • 24-BIT 48kHz WAV
                    </span>
                  </div>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 bg-obsidian border border-rack-border text-text-pure flex-shrink-0 ml-3">
                  {crate.size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right 6 Cols: Pricing Box & Features */}
        <div className="lg:col-span-6 bg-surface border border-rack-border p-6 sm:p-10 relative shadow-2xl">
          {/* Top Tag */}
          <div className="flex items-center justify-between border-b border-rack-border pb-4 mb-6">
            <span className="font-mono text-xs px-2.5 py-1 bg-redline text-white font-bold tracking-wider">
              {LIBRARY_PASS.badge}
            </span>
            <span className="font-mono text-xs text-text-dim">
              CANCEL ANYTIME
            </span>
          </div>

          {/* Pricing Header */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-extrabold text-5xl sm:text-6xl text-text-pure">
                {LIBRARY_PASS.price}
              </span>
              <span className="font-mono text-sm text-redline font-bold">
                / {LIBRARY_PASS.billingCycle}
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-text-dim mt-3 leading-relaxed">
              {LIBRARY_PASS.description}
            </p>
          </div>

          {/* Feature Checklist with aligned checkmarks */}
          <div className="space-y-3.5 py-6 border-y border-rack-border">
            {LIBRARY_PASS.features.map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-xs sm:text-sm">
                <div className="w-4 h-4 bg-redline text-white flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-mono text-text-pure leading-normal">{feat}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-6">
            <button
              onClick={() => {
                alert("Library Pass ($50 / 30 days) selected. Phase 2 checkout will plug in here.");
              }}
              className="w-full py-4 bg-redline hover:bg-redline-hot active:scale-98 transition-all text-white font-mono text-xs sm:text-sm font-bold tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,0,51,0.5)]"
            >
              <span>GET ALL-ACCESS PASS ($50)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="font-mono text-[10px] text-text-dim text-center mt-3">
              INSTANT DOWNLOAD ACCESS • COMMERCIAL RIGHTS INCLUDED
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
