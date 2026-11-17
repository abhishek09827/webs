"use client";

import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, Layers, Sliders } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { audioEngine, StemId } from "@/lib/audio-engine";

gsap.registerPlugin(ScrollTrigger);

interface DAWChannel {
  id: StemId;
  name: string;
  stageIndex: number;
  label: string;
  sublabel: string;
  bars: string[];
  frequency: string;
}

const CHANNELS: DAWChannel[] = [
  {
    id: "drums",
    name: "CH 01 // KICK & TRANSIENTS",
    stageIndex: 1,
    label: "KICK PUNCH",
    sublabel: "Sub-harmonic punch clipping at 45Hz with surgical transient attack.",
    bars: ["BAR 01: [KICK]", "BAR 02: [KICK + HAT]", "BAR 03: [KICK]", "BAR 04: [96PPQ ROLL]"],
    frequency: "45Hz - 8kHz",
  },
  {
    id: "bass808",
    name: "CH 02 // DISTORTED 808 SUB",
    stageIndex: 2,
    label: "808 SUB WEIGHT",
    sublabel: "Gliding saturation tuned to F# Minor with high-order analog harmonics.",
    bars: ["BAR 01: [F#1 ROOT]", "BAR 02: [A1 SLIDE]", "BAR 03: [E1 DROP]", "BAR 04: [C#2 GLIDE]"],
    frequency: "32Hz - 220Hz",
  },
  {
    id: "melody",
    name: "CH 03 // DARK MELODY CHOP",
    stageIndex: 3,
    label: "MELODIC CHOP",
    sublabel: "Bitcrushed minor chords sampled through vintage converters.",
    bars: ["BAR 01: [F#m CHOP]", "BAR 02: [Am REVERSE]", "BAR 03: [Bm STAB]", "BAR 04: [C#m ARPEG]"],
    frequency: "300Hz - 6.5kHz",
  },
  {
    id: "fx",
    name: "CH 04 // TAPE SWELL & RISERS",
    stageIndex: 4,
    label: "THE FINISHED BEAT",
    sublabel: "Resonant white noise sweeps, vinyl crackle, and master bus glue.",
    bars: ["BAR 01: [VINYL AIR]", "BAR 02: [CRACKLE]", "BAR 03: [NOISE RISER]", "BAR 04: [SUB DROP]"],
    frequency: "FULL SPECTRUM",
  },
];

export default function Scene2Arrangement() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pinSectionRef = useRef<HTMLDivElement | null>(null);
  const playheadRef = useRef<HTMLDivElement | null>(null);
  const timelineGridRef = useRef<HTMLDivElement | null>(null);
  const prevStageRef = useRef<number>(-1);

  const [currentStage, setCurrentStage] = useState(0);
  const [activeChannels, setActiveChannels] = useState<Record<StemId, boolean>>({
    drums: false,
    bass808: false,
    melody: false,
    fx: false,
  });

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((_, __, stems) => {
      setActiveChannels(stems);
    });

    if (!containerRef.current || !pinSectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinSectionRef.current,
        scrub: 0.5, // Buttery smooth scrub
        onUpdate: (self) => {
          const progress = self.progress;

          let stage = 0;
          if (progress > 0.08) stage = 1;
          if (progress > 0.35) stage = 2;
          if (progress > 0.62) stage = 3;
          if (progress > 0.88) stage = 4;

          // Crucial performance optimization: ONLY re-render state on actual stage transitions!
          if (stage !== prevStageRef.current) {
            prevStageRef.current = stage;
            setCurrentStage(stage);
            audioEngine.setArrangementStage(stage);
          }

          // Direct GPU transform on laser playhead (zero React re-render overhead)
          if (playheadRef.current) {
            const playheadPercent = progress * 100;
            gsap.set(playheadRef.current, {
              left: `${playheadPercent}%`,
            });
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
      unsubscribe();
    };
  }, []);

  const getHeadlineCopy = () => {
    switch (currentStage) {
      case 1:
        return {
          step: "STAGE 01 // 04",
          title: "KICK & TRANSIENT PUNCH",
          desc: "The heartbeat is engaged. Pure analog weight drives the kick transient.",
        };
      case 2:
        return {
          step: "STAGE 02 // 04",
          title: "808 SUB BASS WEIGHT",
          desc: "Sub-bass saturation locks into the rhythm. The low end hits your chest.",
        };
      case 3:
        return {
          step: "STAGE 03 // 04",
          title: "MELODIC CHOP & TEXTURE",
          desc: "Chipped synth chords and reversed bells complete the harmonic story.",
        };
      case 4:
        return {
          step: "STAGE 04 // 04",
          title: "THE FINISHED MASTER BEAT",
          desc: "All 4 lanes unlocked in full synchronization. The beat is fully alive.",
        };
      default:
        return {
          step: "STANDBY // READY",
          title: "SCROLL TO BUILD THE BEAT",
          desc: "Scroll down to advance the timeline playhead and engage the stem lanes.",
        };
    }
  };

  const copy = getHeadlineCopy();

  const handleManualStemToggle = (id: StemId) => {
    audioEngine.setStemState(id, !activeChannels[id]);
  };

  return (
    <div
      ref={containerRef}
      id="scene-arrangement"
      className="relative h-[380vh] bg-obsidian z-20 select-none"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinSectionRef}
        className="w-full h-screen flex flex-col justify-between py-16 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        {/* Stage Headline Header with aligned items */}
        <div className="w-full border-b border-rack-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-redline mb-1 font-bold">
              <Layers className="w-4 h-4 text-redline animate-pulse" />
              <span>{copy.step}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-text-pure tracking-tight transition-all duration-200">
              {copy.title}
            </h2>
            <p className="font-mono text-xs text-text-dim mt-1 max-w-xl">
              {copy.desc}
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs bg-surface border border-rack-border px-3.5 py-2">
            <Sliders className="w-4 h-4 text-redline flex-shrink-0" />
            <span className="text-text-dim">PLAYHEAD POSITION:</span>
            <span className="text-redline font-bold font-mono">
              BAR 0{Math.min(4, Math.max(1, currentStage))}.1.1
            </span>
          </div>
        </div>

        {/* Central DAW Arrangement Viewport */}
        <div className="my-auto w-full bg-surface border border-rack-border p-4 sm:p-6 relative shadow-2xl">
          {/* Timeline Bar Ruler: Perfectly aligned with column grid below */}
          <div className="w-full flex items-center gap-3 pb-3 mb-3 border-b border-rack-border font-mono text-[10px] text-text-dim">
            {/* Header spacer matches channel controls width */}
            <div className="w-[240px] hidden md:block text-text-muted">
              CHANNELS // BUS
            </div>
            {/* 4 Bar subdivisions strictly aligned with grid */}
            <div className="flex-1 grid grid-cols-4 gap-2 text-center">
              <span className="border-b border-rack-border pb-1">BAR 01: KICK</span>
              <span className="border-b border-rack-border pb-1">BAR 02: 808 SUB</span>
              <span className="border-b border-rack-border pb-1">BAR 03: MELODY</span>
              <span className="border-b border-rack-border pb-1">BAR 04: FULL BUS</span>
            </div>
          </div>

          {/* Stem Lanes Container */}
          <div ref={timelineGridRef} className="space-y-3 relative">
            {/* Glowing Vertical Laser Playhead positioned relative to grid area */}
            <div className="hidden md:block absolute top-0 bottom-0 left-[240px] right-0 pointer-events-none z-30">
              <div
                ref={playheadRef}
                className="absolute top-0 bottom-0 w-0.5 bg-redline shadow-[0_0_12px_#FF0033]"
                style={{ left: "0%" }}
              >
                <div className="w-3 h-3 -ml-[5px] bg-redline rotate-45 border border-white shadow-[0_0_8px_#FF0033]" />
              </div>
            </div>

            {/* 4 Arrangement Stem Lanes */}
            {CHANNELS.map((channel) => {
              const isActive = activeChannels[channel.id];

              return (
                <div
                  key={channel.id}
                  className={`relative p-3 border transition-all duration-150 flex flex-col md:flex-row items-stretch md:items-center gap-3 ${
                    isActive
                      ? "border-redline bg-redline/5 shadow-[inset_0_0_20px_rgba(255,0,51,0.08)]"
                      : "border-rack-border bg-obsidian/60 opacity-60"
                  }`}
                >
                  {/* Channel Strip Header: Fixed 240px width */}
                  <div className="flex items-center gap-3 w-full md:w-[240px] flex-shrink-0">
                    <button
                      onClick={() => handleManualStemToggle(channel.id)}
                      aria-label={`Toggle stem channel ${channel.name}`}
                      className={`px-2.5 py-1.5 border font-mono text-[10px] flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? "bg-redline border-redline text-white font-bold"
                          : "bg-surface border-rack-border text-text-muted hover:border-white"
                      }`}
                    >
                      {isActive ? (
                        <Volume2 className="w-3.5 h-3.5" />
                      ) : (
                        <VolumeX className="w-3.5 h-3.5" />
                      )}
                      <span>{isActive ? "ACTIVE" : "MUTE"}</span>
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            isActive ? "bg-redline led-red-active" : "bg-text-muted"
                          }`}
                        />
                        <span className="font-mono text-xs font-bold text-text-pure truncate">
                          {channel.name}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-text-dim block mt-0.5">
                        FREQ: {channel.frequency}
                      </span>
                    </div>
                  </div>

                  {/* 4 Sequencer Step Blocks: Equal grid columns */}
                  <div className="flex-1 grid grid-cols-4 gap-2">
                    {channel.bars.map((bar, barIdx) => (
                      <div
                        key={barIdx}
                        className={`h-11 sm:h-12 border flex items-center justify-center font-mono text-[10px] sm:text-xs text-center transition-all px-1 ${
                          isActive
                            ? "border-redline/50 bg-redline/10 text-white font-semibold shadow-sm"
                            : "border-rack-border bg-obsidian text-text-muted"
                        }`}
                      >
                        {bar}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Arrangement Guidance */}
        <div className="w-full border-t border-rack-border pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-xs text-text-dim">
          <div className="flex items-center gap-2">
            <span className="text-redline font-bold">02/07</span>
            <span>CONTINUE SCROLLING DOWN TO ENTER BEAT CRATES</span>
          </div>

          <div className="flex items-center gap-2 text-text-pure">
            <span className="w-2 h-2 rounded-full bg-redline led-red-active" />
            <span>QUANTIZED ARRANGEMENT ENGINE ONLINE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
