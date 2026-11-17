"use client";

import { useState } from "react";
import { Grid, Volume2, Sparkles } from "lucide-react";
import { LOOP_PADS, LoopProduct } from "@/config/products";
import { audioEngine } from "@/lib/audio-engine";

export default function Scene4Loops() {
  const [activeLoopIds, setActiveLoopIds] = useState<Set<string>>(new Set());

  const handleToggleLoop = (loop: LoopProduct) => {
    const nextSet = new Set(activeLoopIds);
    if (nextSet.has(loop.id)) {
      nextSet.delete(loop.id);
      audioEngine.triggerPad("percussion", "G2");
    } else {
      nextSet.add(loop.id);
      // Trigger instant quantized synth note
      audioEngine.triggerPad("vox", loop.synthNote);
    }
    setActiveLoopIds(nextSet);
  };

  return (
    <section
      id="scene-loops"
      className="relative min-h-screen py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-rack-border bg-obsidian z-20 select-none"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rack-border pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold mb-1">
            <Grid className="w-4 h-4 text-redline" />
            <span>SCENE 04 // 4x4 STEM MATRIX</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-pure tracking-tight">
            BEAT-SYNCED LOOP MIXER
          </h2>
          <p className="font-mono text-xs text-text-dim mt-1 max-w-xl">
            16-PAD QUANTIZED PERFORMANCE MATRIX • TAP TO ENGAGE LAYERS IN SYNC WITH THE 140 BPM CLOCK
          </p>
        </div>

        {/* Pricing Badge */}
        <div className="bg-surface border border-rack-border p-3 flex items-center gap-4">
          <div>
            <div className="font-mono text-[10px] text-text-dim">ACCESS PASS</div>
            <div className="font-display font-bold text-lg text-text-pure">
              $5 <span className="font-mono text-xs text-redline">/ 30 DAYS</span>
            </div>
          </div>
          <button
            onClick={() => {
              audioEngine.triggerPad("clap");
              alert("Loop Vault Pass ($5 / 30 days) selected. Phase 2 WhatsApp/Shopify checkout integration ready.");
            }}
            className="px-4 py-2 bg-redline hover:bg-redline-hot active:scale-95 text-white font-mono text-xs font-bold transition-all shadow-[0_0_10px_rgba(255,0,51,0.4)]"
          >
            UNLOCK ALL LOOPS
          </button>
        </div>
      </div>

      {/* 4x4 Pad Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
        {LOOP_PADS.map((loop) => {
          const isActive = activeLoopIds.has(loop.id);

          return (
            <button
              key={loop.id}
              onClick={() => handleToggleLoop(loop)}
              className={`h-28 sm:h-32 border p-3 flex flex-col justify-between text-left transition-all duration-150 active:scale-95 group focus-visible:outline-2 focus-visible:outline-redline ${
                isActive
                  ? "border-redline bg-redline/10 shadow-[0_0_16px_rgba(255,0,51,0.35)]"
                  : "border-rack-border bg-surface hover:border-text-dim hover:bg-surface-elevated"
              }`}
            >
              {/* Pad Header: LED + Category */}
              <div className="flex items-center justify-between">
                <span
                  className={`w-2 h-2 rounded-none transition-colors ${
                    isActive ? "bg-redline led-red-active" : "bg-rack-border group-hover:bg-text-dim"
                  }`}
                />
                <span className="font-mono text-[9px] px-1.5 py-0.5 bg-obsidian border border-rack-border text-text-dim uppercase">
                  {loop.category}
                </span>
              </div>

              {/* Title & Key */}
              <div>
                <div className="font-display font-bold text-xs sm:text-sm text-text-pure group-hover:text-redline transition-colors">
                  {loop.title}
                </div>
                <div className="font-mono text-[10px] text-text-dim mt-0.5 flex items-center gap-2">
                  <span>KEY: <strong className="text-text-pure">{loop.key}</strong></span>
                  <span>{loop.bpm} BPM</span>
                </div>
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between border-t border-rack-border/60 pt-1 font-mono text-[9px]">
                <span className={isActive ? "text-redline font-bold" : "text-text-muted"}>
                  {isActive ? "[SYNC ACTIVE]" : "[OFFLINE]"}
                </span>
                <Volume2 className={`w-3 h-3 ${isActive ? "text-redline" : "text-text-muted"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-4 border-t border-rack-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-text-dim">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-redline" />
          <span>QUANTIZED STEP TRIGGERING READY • REAL-TIME HARDWARE FEEDBACK</span>
        </div>
        <div className="text-text-pure">
          ACTIVE LOOPS PLAYING: <strong className="text-redline">{activeLoopIds.size} / 16</strong>
        </div>
      </div>
    </section>
  );
}
