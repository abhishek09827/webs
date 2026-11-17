"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, Volume2 } from "lucide-react";
import TransportBar from "@/components/ui/TransportBar";
import CustomCursor from "@/components/ui/CustomCursor";
import NavigationMenu from "@/components/ui/NavigationMenu";
import { audioEngine } from "@/lib/audio-engine";

export default function StyleguidePage() {
  const [activeTab, setActiveTab] = useState<"tokens" | "typography" | "components" | "audio">("tokens");
  const [previewLed, setPreviewLed] = useState(false);

  const colors = [
    { name: "bg-obsidian", hex: "#050505", usage: "Master background void & deep contrasts" },
    { name: "bg-surface", hex: "#0E0E10", usage: "Rack chassis faceplate & pad housings" },
    { name: "border-rack", hex: "#1E1E24", usage: "1px laser-cut rack dividers & module grids" },
    { name: "redline", hex: "#FF0033", usage: "Primary accent, +3dB peak meter, live playhead" },
    { name: "redline-hot", hex: "#E6002B", usage: "Transient bursts, hover accents, warning clips" },
    { name: "text-pure", hex: "#FFFFFF", usage: "Primary display headlines & active values" },
    { name: "text-dim", hex: "#A1A1AA", usage: "BPM, key, timecodes, secondary hardware labels" },
    { name: "text-muted", hex: "#52525B", usage: "Muted channels, unselected sequencer steps" },
  ];

  return (
    <main className="min-h-screen bg-obsidian text-text-pure pb-28 pt-20 px-4 sm:px-8 max-w-7xl mx-auto selection:bg-redline selection:text-white">
      <CustomCursor />
      <NavigationMenu />

      {/* Header */}
      <div className="border-b border-rack-border pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-dim hover:text-redline transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PRODUCTION SITE</span>
          </Link>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight flex items-center gap-3">
            <span>DESIGN SYSTEM</span>
            <span className="text-redline text-2xl font-mono">{"//"}</span>
            <span className="text-xl sm:text-2xl font-mono text-text-dim">v1.0</span>
          </h1>
          <p className="font-mono text-xs text-text-dim mt-2">
            DESIGN TOKENS • HARDWARE UI COMPONENTS • AUDIO REACTIVE METRICS
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-surface p-1 border border-rack-border font-mono text-xs">
          {(["tokens", "typography", "components", "audio"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 uppercase transition-colors ${
                activeTab === tab
                  ? "bg-obsidian text-redline font-bold border border-redline"
                  : "text-text-dim hover:text-text-pure"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Section 1: Color Tokens */}
      {activeTab === "tokens" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-mono text-sm border-l-2 border-redline pl-3">
            <span className="font-bold text-text-pure">01 // COLOR TOKEN MATRIX (RED & WHITE THEME)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((c) => (
              <div
                key={c.name}
                className="bg-surface border border-rack-border p-4 flex flex-col justify-between h-44 relative group hover:border-redline transition-colors"
              >
                <div
                  className="w-full h-14 border border-white/10"
                  style={{ backgroundColor: c.hex }}
                />
                <div>
                  <div className="font-mono font-bold text-sm text-text-pure">{c.name}</div>
                  <div className="font-mono text-xs text-redline mt-0.5">{c.hex}</div>
                  <div className="font-mono text-[11px] text-text-dim mt-1.5 leading-snug">
                    {c.usage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Typography Scale */}
      {activeTab === "typography" && (
        <section className="space-y-8 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-mono text-sm border-l-2 border-redline pl-3">
            <span className="font-bold text-text-pure">02 // TYPOGRAPHIC SCALE & HIERARCHY</span>
          </div>

          <div className="space-y-6">
            <div className="bg-surface border border-rack-border p-6">
              <span className="font-mono text-[10px] text-text-dim">DISPLAY 01 // SYNE 800 WIDE</span>
              <div className="font-display font-extrabold text-5xl sm:text-7xl tracking-tighter mt-2 text-text-pure">
                WËBS PRODUCTION
              </div>
            </div>

            <div className="bg-surface border border-rack-border p-6">
              <span className="font-mono text-[10px] text-text-dim">HEADLINE 01 // ARRANGEMENT CHAPTER</span>
              <div className="font-display font-bold text-3xl sm:text-4xl text-text-pure mt-2">
                02 // STEM ARRANGEMENT [4-LANE SCRUB]
              </div>
            </div>

            <div className="bg-surface border border-rack-border p-6">
              <span className="font-mono text-[10px] text-text-dim">METADATA MONO // JETBRAINS MONO TABULAR</span>
              <div className="font-mono text-sm sm:text-base text-redline mt-2 space-y-1">
                <div>[BPM: 140.00] [KEY: F# MIN] [LUFS: -7.8] [STAGE: 03-MELODY]</div>
                <div className="text-text-dim">TRACK_01: HYPERP!NK_808_SLIDE.WAV [ACTIVE // 24-BIT 48kHz]</div>
              </div>
            </div>

            <div className="bg-surface border border-rack-border p-6">
              <span className="font-mono text-[10px] text-text-dim">BODY COPY // INTER SANS</span>
              <p className="font-body text-sm sm:text-base text-text-dim mt-2 max-w-2xl leading-relaxed">
                Engineered specifically for high-energy underground trap, digicore, and rage productions. Every sound is processed through analog outboard chains and clipping limiters to guarantee maximum transient punch on streaming masters.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Hardware Components */}
      {activeTab === "components" && (
        <section className="space-y-8 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-mono text-sm border-l-2 border-redline pl-3">
            <span className="font-bold text-text-pure">03 // HARDWARE BUTTONS & RACK CONTROLS</span>
          </div>

          {/* Buttons Matrix */}
          <div className="bg-surface border border-rack-border p-6 space-y-4">
            <h3 className="font-mono text-xs text-text-dim uppercase">Interactive Button States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => audioEngine.triggerPad("kick")}
                className="px-5 py-2.5 bg-redline text-white font-mono text-xs font-bold tracking-wider hover:bg-redline-hot active:scale-95 transition-all shadow-[0_0_12px_rgba(255,0,51,0.4)]"
              >
                [PRIMARY ARM REDLINE]
              </button>

              <button
                onClick={() => audioEngine.triggerPad("snare")}
                className="px-5 py-2.5 bg-obsidian border border-rack-border text-text-pure font-mono text-xs hover:border-redline hover:text-redline transition-colors"
              >
                [RACK CHASSIS BUTTON]
              </button>

              <button
                onClick={() => setPreviewLed(!previewLed)}
                className="px-4 py-2 border border-rack-border bg-surface text-text-dim font-mono text-xs flex items-center gap-2 hover:border-white transition-colors"
              >
                <span className={`w-2 h-2 rounded-full ${previewLed ? "bg-redline led-red-active" : "bg-text-muted"}`} />
                <span>TOGGLE LED STATE</span>
              </button>
            </div>
          </div>

          {/* MPC Drum Pad Demo */}
          <div className="bg-surface border border-rack-border p-6 space-y-4">
            <h3 className="font-mono text-xs text-text-dim uppercase">Tactile MPC Pad Cell</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
              {[
                { name: "KICK 01", type: "kick", key: "1" },
                { name: "SNARE 01", type: "snare", key: "2" },
                { name: "HI-HAT", type: "hihat_closed", key: "3" },
                { name: "SUB 808", type: "808", key: "4" },
              ].map((pad) => (
                <button
                  key={pad.name}
                  onClick={() => audioEngine.triggerPad(pad.type)}
                  className="h-24 bg-obsidian border border-rack-border hover:border-redline hover:bg-surface p-2 flex flex-col justify-between text-left group transition-all active:scale-95"
                >
                  <div className="flex items-center justify-between font-mono text-[10px] text-text-dim">
                    <span className="w-1.5 h-1.5 bg-rack-border group-hover:bg-redline group-hover:shadow-[0_0_8px_#FF0033]" />
                    <span>[{pad.key}]</span>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-text-dim">{pad.type.toUpperCase()}</div>
                    <div className="font-display font-bold text-xs text-text-pure group-hover:text-redline">
                      {pad.name}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 4: Audio Engine Diagnostics */}
      {activeTab === "audio" && (
        <section className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 font-mono text-sm border-l-2 border-redline pl-3">
            <span className="font-bold text-text-pure">04 // WEB AUDIO & TONE.JS TEST BENCH</span>
          </div>

          <div className="bg-surface border border-rack-border p-6 space-y-6">
            <p className="font-mono text-xs text-text-dim max-w-xl">
              Tone.js clock synchronization, 16-step procedural synthesis fallback, and real-time AnalyserNode output verification.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => audioEngine.startAudio()}
                className="px-5 py-2.5 bg-redline text-white font-mono text-xs font-bold flex items-center gap-2 hover:bg-redline-hot transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START MASTER TRANSPORT (140 BPM)</span>
              </button>

              <button
                onClick={() => audioEngine.pauseAudio()}
                className="px-5 py-2.5 bg-obsidian border border-rack-border text-text-pure font-mono text-xs flex items-center gap-2 hover:border-redline transition-colors"
              >
                <Pause className="w-4 h-4 fill-current" />
                <span>PAUSE TRANSPORT</span>
              </button>

              <button
                onClick={() => audioEngine.toggleMute()}
                className="px-5 py-2.5 bg-obsidian border border-rack-border text-text-pure font-mono text-xs flex items-center gap-2 hover:border-redline transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>TOGGLE MASTER MUTE</span>
              </button>
            </div>

            {/* Arrangement Staging Test */}
            <div className="border-t border-rack-border pt-4">
              <h4 className="font-mono text-xs text-text-pure mb-3">TEST ARRANGEMENT STEM STAGING:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                {[
                  { stage: 0, label: "0: SILENT" },
                  { stage: 1, label: "1: KICK/DRUMS" },
                  { stage: 2, label: "2: + 808 BASS" },
                  { stage: 3, label: "3: + MELODY" },
                  { stage: 4, label: "4: FULL MIX" },
                ].map((s) => (
                  <button
                    key={s.stage}
                    onClick={() => audioEngine.setArrangementStage(s.stage)}
                    className="p-2 border border-rack-border bg-obsidian hover:border-redline hover:text-redline transition-colors text-center"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Persistent Transport Bar mounted */}
      <TransportBar />
    </main>
  );
}
