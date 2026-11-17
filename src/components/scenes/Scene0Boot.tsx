"use client";

import { useState } from "react";
import { Terminal, Power, ChevronDown, CheckCircle2 } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";

interface Scene0BootProps {
  onBootComplete: () => void;
}

export default function Scene0Boot({ onBootComplete }: Scene0BootProps) {
  const [booting, setBooting] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  const diagnostics = [
    { code: "01", label: "AC POWER IN: 120V / 60Hz STABLE" },
    { code: "02", label: "DSP CORE: 48kHz / 24-BIT EMULATION" },
    { code: "03", label: "MASTER CLOCK: 140.00 BPM PHASE LOCK" },
    { code: "04", label: "OUTPUT BUS: +3dB LIMITER ARMED" },
  ];

  const handleStartAudio = async () => {
    setBooting(true);
    audioEngine.triggerPad("kick", "C1");

    setBootStep(1);
    setTimeout(() => {
      setBootStep(2);
      audioEngine.triggerPad("percussion", "E4");
    }, 250);

    setTimeout(() => {
      setBootStep(3);
      audioEngine.triggerPad("hihat_closed");
    }, 500);

    setTimeout(() => {
      setBootStep(4);
      audioEngine.triggerPad("fx");
    }, 750);

    setTimeout(async () => {
      await audioEngine.startAudio();
      setDismissed(true);
      onBootComplete();
    }, 1050);
  };

  const handleSkip = () => {
    setDismissed(true);
    onBootComplete();
  };

  if (dismissed) return null;

  return (
    <section
      id="scene-boot"
      className="relative min-h-[92vh] flex flex-col items-center justify-center px-4 sm:px-8 border-b border-rack-border bg-obsidian/90 z-20"
    >
      <div className="w-full max-w-2xl bg-surface border border-rack-border p-6 sm:p-8 relative shadow-2xl">
        {/* Hardware Corner Screws */}
        <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-rack-border" />
        <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rack-border" />
        <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-rack-border" />
        <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-rack-border" />

        {/* Diagnostic Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-rack-border pb-4 mb-6 gap-2">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-4 h-4 text-redline flex-shrink-0" />
            <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-text-pure">
              WËBS HARDWARE RACK BOOT DIAGNOSTIC
            </span>
          </div>
          <div className="font-mono text-[10px] text-text-dim">
            FIRMWARE v2.0 // WËBS CERTIFIED
          </div>
        </div>

        {/* Diagnostic Readout Lines with perfect alignment */}
        <div className="space-y-2.5 font-mono text-xs mb-8">
          {diagnostics.map((diag, index) => {
            const isCompleted = bootStep > index;
            const isCurrent = bootStep === index && booting;

            return (
              <div
                key={diag.code}
                className={`flex items-center justify-between px-3 py-2.5 border transition-colors ${
                  isCompleted
                    ? "border-redline/60 bg-redline/10 text-text-pure"
                    : isCurrent
                    ? "border-white bg-white/5 text-white animate-pulse"
                    : "border-rack-border text-text-muted bg-obsidian/50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <span className="text-[10px] text-redline font-bold flex-shrink-0">
                    {diag.code}
                  </span>
                  <span className="truncate text-[11px] sm:text-xs">
                    {diag.label}
                  </span>
                </div>
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <div className="flex items-center gap-1.5 text-redline text-[10px] font-bold">
                      <span>ONLINE</span>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-text-dim">
                      {isCurrent ? "CALIBRATING..." : "STANDBY"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleStartAudio}
            disabled={booting}
            className="w-full sm:flex-1 py-4 px-6 bg-redline hover:bg-redline-hot active:scale-[0.98] transition-all text-white font-mono font-bold text-xs sm:text-sm tracking-widest flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,0,51,0.5)] focus-visible:outline-2 focus-visible:outline-white"
          >
            <Power className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
            <span>{booting ? "INITIALIZING DSP..." : "INITIALIZE AUDIO ENGINE"}</span>
          </button>

          <button
            onClick={handleSkip}
            className="w-full sm:w-auto py-3.5 px-5 border border-rack-border bg-obsidian text-text-dim hover:text-text-pure hover:border-white font-mono text-xs transition-colors text-center"
          >
            [SKIP / SILENT RUN]
          </button>
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-rack-border flex items-center justify-between font-mono text-[10px] text-text-dim">
          <span>WEB AUDIO UNLOCKED ON GESTURE</span>
          <span className="flex items-center gap-1 text-redline">
            <span>SCROLL TO BUILD A BEAT</span>
            <ChevronDown className="w-3 h-3 animate-bounce" />
          </span>
        </div>
      </div>
    </section>
  );
}
