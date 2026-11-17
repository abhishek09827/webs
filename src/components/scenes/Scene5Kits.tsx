"use client";

import { useState, useEffect } from "react";
import { Disc, Download, Keyboard } from "lucide-react";
import { KIT_PRODUCTS } from "@/config/products";
import { audioEngine } from "@/lib/audio-engine";

export default function Scene5Kits() {
  const [selectedKitIndex, setSelectedKitIndex] = useState(0);
  const [activePadNumber, setActivePadNumber] = useState<number | null>(null);

  const activeKit = KIT_PRODUCTS[selectedKitIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      const key = e.key.toUpperCase();
      const matchedPad = activeKit.padPresets.find((p) => p.key.toUpperCase() === key);

      if (matchedPad) {
        e.preventDefault();
        triggerPad(matchedPad.padNumber, matchedPad.type, matchedPad.synthNote);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeKit]);

  const triggerPad = (padNum: number, type: string, note?: string) => {
    setActivePadNumber(padNum);
    audioEngine.triggerPad(type, note);
    setTimeout(() => {
      setActivePadNumber((prev) => (prev === padNum ? null : prev));
    }, 120);
  };

  return (
    <section
      id="scene-kits"
      className="relative min-h-screen py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-rack-border bg-obsidian z-20 select-none"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rack-border pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold mb-1">
            <Disc className="w-4 h-4 text-redline animate-spin" />
            <span>SCENE 05 // PLAYABLE DRUM RACK</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-pure tracking-tight">
            SIGNATURE DRUM KITS & MULTI-BANKS
          </h2>
          <p className="font-mono text-xs text-text-dim mt-1 max-w-xl">
            PLAYABLE HARDWARE RACK • TEST ONE-SHOTS WITH QWERTY KEYS OR TOUCH • $20 PER KIT
          </p>
        </div>

        {/* Kit Selector Tabs */}
        <div className="flex items-center gap-1 bg-surface p-1 border border-rack-border font-mono text-xs">
          {KIT_PRODUCTS.map((kit, idx) => (
            <button
              key={kit.id}
              onClick={() => {
                audioEngine.triggerPad("percussion", "D3");
                setSelectedKitIndex(idx);
              }}
              className={`px-3 py-1.5 transition-colors ${
                selectedKitIndex === idx
                  ? "bg-obsidian text-redline font-bold border border-redline"
                  : "text-text-dim hover:text-text-pure"
              }`}
            >
              {kit.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Rack Layout: Specs Left, 16 Pads Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 4 Cols: Kit Specs & Purchase */}
        <div className="lg:col-span-5 bg-surface border border-rack-border p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] px-2 py-0.5 border border-rack-border bg-obsidian text-redline font-bold">
              {activeKit.badge}
            </span>
            <span className="font-mono text-xs text-text-dim">
              {activeKit.fileSize} {"//"} WAV + PRESETS
            </span>
          </div>

          <div>
            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-text-pure">
              {activeKit.title}
            </h3>
            <div className="font-mono text-xs text-redline mt-0.5">
              {activeKit.subtitle}
            </div>
            <p className="font-body text-xs sm:text-sm text-text-dim mt-4 leading-relaxed">
              {activeKit.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-rack-border font-mono text-xs">
            <div className="p-3 bg-obsidian border border-rack-border">
              <span className="text-text-dim block text-[10px]">SOUND COUNT:</span>
              <strong className="text-text-pure text-base mt-0.5 block">{activeKit.soundCount} ONE-SHOTS</strong>
            </div>
            <div className="p-3 bg-obsidian border border-rack-border">
              <span className="text-text-dim block text-[10px]">PRICE:</span>
              <strong className="text-redline text-base mt-0.5 block">${activeKit.price} USD</strong>
            </div>
          </div>

          {/* Download / Buy Trigger */}
          <button
            onClick={() => {
              audioEngine.triggerPad("kick", "C1");
              alert(`Selected ${activeKit.title} ($${activeKit.price}). Phase 2 checkout integration ready.`);
            }}
            className="w-full py-3.5 bg-redline hover:bg-redline-hot active:scale-98 transition-all text-white font-mono text-xs font-bold tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,51,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD {activeKit.title} ($20)</span>
          </button>

          <div className="flex items-center gap-2 font-mono text-[10px] text-text-dim">
            <Keyboard className="w-3.5 h-3.5 text-redline flex-shrink-0" />
            <span>PLAYABLE VIA KEYS: [1..4], [Q..R], [A..F], [Z..V]</span>
          </div>
        </div>

        {/* Right 7 Cols: The 16 Playable Pads with consistent alignments */}
        <div className="lg:col-span-7 bg-surface border border-rack-border p-4 sm:p-6">
          <div className="flex items-center justify-between border-b border-rack-border pb-3 mb-4 font-mono text-xs text-text-dim">
            <span>MPC 16-PAD PERFORMANCE CELL</span>
            <span className="text-redline font-bold">[ZERO-LATENCY TONE.JS ENGINE]</span>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {activeKit.padPresets.map((pad) => {
              const isTriggered = activePadNumber === pad.padNumber;

              return (
                <button
                  key={pad.padNumber}
                  onClick={() => triggerPad(pad.padNumber, pad.type, pad.synthNote)}
                  className={`h-24 sm:h-28 border p-2 sm:p-3 flex flex-col justify-between text-left transition-all duration-75 active:scale-95 group focus-visible:outline-2 focus-visible:outline-redline ${
                    isTriggered
                      ? "bg-redline border-white text-white shadow-[0_0_20px_#FF0033] scale-98"
                      : "bg-obsidian border-rack-border hover:border-redline hover:bg-surface-elevated text-text-pure"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span
                      className={`w-1.5 h-1.5 rounded-none ${
                        isTriggered
                          ? "bg-white shadow-[0_0_8px_#FFFFFF]"
                          : "bg-rack-border group-hover:bg-redline"
                      }`}
                    />
                    <span className={isTriggered ? "text-white font-bold" : "text-redline font-mono font-bold"}>
                      [{pad.key}]
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] text-text-dim uppercase block">
                      {pad.type}
                    </span>
                    <span
                      className={`font-display font-bold text-[11px] sm:text-xs leading-tight block mt-0.5 truncate ${
                        isTriggered ? "text-white" : "group-hover:text-redline"
                      }`}
                    >
                      {pad.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
