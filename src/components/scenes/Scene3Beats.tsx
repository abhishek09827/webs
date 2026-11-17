"use client";

import { useRef, useEffect, useState } from "react";
import { Play, Pause, Disc, ArrowRight, Check } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BEAT_PRODUCTS, BeatProduct } from "@/config/products";
import { audioEngine } from "@/lib/audio-engine";

gsap.registerPlugin(ScrollTrigger);

export default function Scene3Beats() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [activePreviewId, setActivePreviewId] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const getScrollWidth = () => {
        return trackRef.current ? trackRef.current.scrollWidth - window.innerWidth + 100 : 1000;
      };

      gsap.to(trackRef.current, {
        x: () => -getScrollWidth(),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handlePreviewBeat = (beat: BeatProduct) => {
    if (activePreviewId === beat.id) {
      setActivePreviewId(null);
      audioEngine.pauseAudio();
    } else {
      setActivePreviewId(beat.id);
      audioEngine.startAudio();
      audioEngine.triggerPad("percussion", "F#3");
    }
  };

  return (
    <section
      ref={containerRef}
      id="scene-beats"
      className="relative min-h-screen bg-obsidian border-t border-rack-border z-20 overflow-hidden select-none"
    >
      {/* Header Bar */}
      <div className="pt-16 pb-6 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-rack-border/60">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold mb-1">
            <Disc className="w-4 h-4 text-redline animate-spin" />
            <span>SCENE 03 // CRATE-DIGGING</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-pure tracking-tight">
            BEAT VAULT CRATES
          </h2>
          <p className="font-mono text-xs text-text-dim mt-1">
            VERTICAL SCROLL DRIVES HORIZONTAL CRATES • $30 EXCLUSIVE & LEASE • SYNTHESIZED PREVIEWS
          </p>
        </div>

        <div className="font-mono text-xs text-text-dim flex items-center gap-2">
          <span>SCROLL DOWN TO DIG CRATES</span>
          <ArrowRight className="w-4 h-4 text-redline flex-shrink-0" />
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="h-[70vh] flex items-center pl-4 sm:pl-8">
        <div
          ref={trackRef}
          className="flex items-center gap-6 will-change-transform pr-16"
        >
          {BEAT_PRODUCTS.map((beat, idx) => {
            const isPlaying = activePreviewId === beat.id;

            return (
              <div
                key={beat.id}
                className="w-[320px] sm:w-[380px] flex-shrink-0 bg-surface border border-rack-border p-6 relative group transition-all duration-200 hover:border-redline hover:-translate-y-2 shadow-xl"
              >
                {/* Header Strip with strict baseline alignment */}
                <div className="flex items-center justify-between border-b border-rack-border pb-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs text-text-dim">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isPlaying ? "bg-redline led-red-active" : "bg-rack-border"
                      }`}
                    />
                    <span>CRATE 0{idx + 1}</span>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 border border-rack-border bg-obsidian text-redline font-bold">
                    ${beat.price} {beat.currency}
                  </span>
                </div>

                {/* Beat Title & Mood */}
                <h3 className="font-display font-extrabold text-2xl text-text-pure group-hover:text-redline transition-colors">
                  {beat.title}
                </h3>
                <div className="font-mono text-xs text-text-dim mt-1">
                  MOOD: <span className="text-white font-medium">{beat.mood}</span>
                </div>

                {/* Metadata Tags */}
                <div className="flex items-center gap-2.5 my-4 font-mono text-xs text-text-dim">
                  <span className="px-2.5 py-1 bg-obsidian border border-rack-border">
                    BPM: <strong className="text-text-pure">{beat.bpm}</strong>
                  </span>
                  <span className="px-2.5 py-1 bg-obsidian border border-rack-border">
                    KEY: <strong className="text-text-pure">{beat.key}</strong>
                  </span>
                  <span className="px-2 py-1 bg-obsidian border border-rack-border text-[11px]">
                    {beat.duration}
                  </span>
                </div>

                {/* Waveform Graphic */}
                <div className="w-full h-14 bg-obsidian border border-rack-border p-2 my-4 flex items-center gap-1 overflow-hidden relative">
                  {Array.from({ length: 36 }).map((_, barI) => {
                    const heightPct = 20 + Math.abs(Math.sin((barI + beat.waveformSeed) * 0.4)) * 75;
                    return (
                      <div
                        key={barI}
                        className={`flex-1 transition-all ${
                          isPlaying ? "bg-redline shadow-[0_0_6px_#FF0033]" : "bg-rack-border group-hover:bg-text-dim"
                        }`}
                        style={{ height: `${heightPct}%` }}
                      />
                    );
                  })}
                  {isPlaying && (
                    <div className="absolute inset-0 bg-redline/5 pointer-events-none" />
                  )}
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6 min-h-[48px] content-start">
                  {beat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 bg-obsidian border border-rack-border text-text-dim"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons with identical heights and clean icons */}
                <div className="flex items-center gap-3 pt-3 border-t border-rack-border">
                  <button
                    onClick={() => handlePreviewBeat(beat)}
                    aria-label={`Preview beat ${beat.title}`}
                    className={`flex-1 h-10 px-4 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      isPlaying
                        ? "bg-redline text-white shadow-[0_0_12px_rgba(255,0,51,0.5)]"
                        : "bg-obsidian border border-rack-border text-text-pure hover:border-redline hover:text-redline"
                    }`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>PREVIEWING</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>PREVIEW BEAT</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.triggerPad("hihat_closed");
                      alert(`Selected beat: ${beat.title} ($${beat.price}). Phase 2 checkout integration ready.`);
                    }}
                    className="h-10 px-4 bg-surface border border-rack-border text-text-pure hover:border-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5 text-redline" />
                    <span>GET STEMS</span>
                  </button>
                </div>

                {beat.isPlaceholderAudio && (
                  <div className="font-mono text-[9px] text-text-muted mt-2 text-center">
                    [PROCEDURAL TONE.JS PREVIEW ACTIVE]
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
