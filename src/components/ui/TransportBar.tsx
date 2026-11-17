"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Activity } from "lucide-react";
import { audioEngine, StemId } from "@/lib/audio-engine";

export default function TransportBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStems, setActiveStems] = useState<Record<StemId, boolean>>({
    drums: false,
    bass808: false,
    melody: false,
    fx: false,
  });
  const [currentTrack, setCurrentTrack] = useState("WËBS // STEM ARRANGEMENT");
  const [peakMeter, setPeakMeter] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((playing, muted, stems) => {
      setIsPlaying(playing);
      setIsMuted(muted);
      setActiveStems(stems);

      const activeCount = Object.values(stems).filter(Boolean).length;
      if (activeCount === 0) {
        setCurrentTrack("SYSTEM STANDBY // READY");
      } else if (activeCount === 1) {
        setCurrentTrack("STEM 01 // KICK + TRANSIENTS");
      } else if (activeCount === 2) {
        setCurrentTrack("STEM 02 // SUB 808 DISTORTION");
      } else if (activeCount === 3) {
        setCurrentTrack("STEM 03 // DARK MELODY CHOP");
      } else {
        setCurrentTrack("MASTER BUS // FULL BEAT STACK");
      }
    });

    let animationFrameId: number;
    const renderOscilloscope = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const fft = audioEngine.getFFTData();
          setPeakMeter(Math.min(100, Math.round(fft.rms * 160)));

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw baseline
          ctx.strokeStyle = "rgba(30, 30, 36, 0.6)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(0, canvas.height / 2);
          ctx.lineTo(canvas.width, canvas.height / 2);
          ctx.stroke();

          // Draw real-time waveform
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = isMuted || !isPlaying ? "#52525B" : "#FF0033";
          ctx.shadowColor = "#FF0033";
          ctx.shadowBlur = isPlaying && !isMuted ? 6 : 0;

          ctx.beginPath();
          const sliceWidth = canvas.width / fft.waveform.length;
          let x = 0;

          for (let i = 0; i < fft.waveform.length; i++) {
            const v = fft.waveform[i];
            const y = (v + 1) * (canvas.height / 2);

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
            x += sliceWidth;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }
      animationFrameId = requestAnimationFrame(renderOscilloscope);
    };

    renderOscilloscope();

    return () => {
      unsubscribe();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isMuted]);

  const handleTogglePlay = async () => {
    audioEngine.togglePlay();
  };

  const handleToggleMute = () => {
    audioEngine.toggleMute();
  };

  return (
    <footer
      aria-label="Master Audio Transport"
      className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-surface/95 backdrop-blur-md border-t border-rack-border flex items-center justify-between px-3 md:px-6 select-none"
    >
      {/* Left: Play/Pause, Status, BPM with perfect vertical alignment */}
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause Master Audio" : "Play Master Audio"}
          className="w-10 h-10 rounded-none bg-obsidian border border-rack-border hover:border-redline hover:text-redline text-text-pure flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-redline flex-shrink-0"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current" />
          ) : (
            <Play className="w-4 h-4 fill-current ml-0.5" />
          )}
        </button>

        <div className="flex flex-col justify-center font-mono text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isPlaying && !isMuted
                  ? "bg-redline led-red-active"
                  : "bg-text-muted"
              }`}
            />
            <span className="text-text-pure font-bold tracking-wider truncate max-w-[160px] sm:max-w-none">
              {currentTrack}
            </span>
          </div>
          <div className="text-[10px] text-text-dim flex items-center gap-3 mt-0.5">
            <span>BPM: <strong className="text-text-pure">140.00</strong></span>
            <span>KEY: <strong className="text-text-pure">F# MIN</strong></span>
            <span className="hidden sm:inline">SAMPLE: <strong className="text-text-pure">48kHz / 24-BIT</strong></span>
          </div>
        </div>
      </div>

      {/* Center: Live Real-Time Mini Waveform */}
      <div className="hidden md:flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-text-dim">
          <Activity className="w-3.5 h-3.5 text-redline flex-shrink-0" />
          <span>SCOPE</span>
        </div>
        <div className="w-44 h-8 bg-obsidian border border-rack-border rounded-none overflow-hidden flex items-center justify-center px-1">
          <canvas
            ref={canvasRef}
            width={176}
            height={32}
            className="w-full h-full block"
          />
        </div>
      </div>

      {/* Right: Active Stem Badges, VU Meter & Master Mute */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Active stem indicators */}
        <div className="hidden lg:flex items-center gap-1.5 font-mono text-[9px]">
          {(["drums", "bass808", "melody", "fx"] as StemId[]).map((stem) => (
            <span
              key={stem}
              className={`px-2 py-0.5 border ${
                activeStems[stem]
                  ? "border-redline text-redline bg-redline/10 font-bold"
                  : "border-rack-border text-text-muted"
              }`}
            >
              {stem.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Level Peak Meter */}
        <div className="flex items-center gap-1.5">
          <div className="w-16 sm:w-20 h-2.5 bg-obsidian border border-rack-border overflow-hidden relative">
            <div
              className={`h-full transition-all duration-75 ${
                peakMeter > 85 ? "bg-redline" : "bg-text-pure"
              }`}
              style={{ width: `${peakMeter}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-text-dim hidden sm:inline w-8 text-right">
            {peakMeter > 85 ? "+3dB" : "-6dB"}
          </span>
        </div>

        {/* Master Mute Toggle */}
        <button
          onClick={handleToggleMute}
          aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          className={`w-10 h-10 border flex items-center justify-center transition-colors flex-shrink-0 focus-visible:outline-2 focus-visible:outline-redline ${
            isMuted
              ? "bg-redline/20 border-redline text-redline"
              : "bg-obsidian border-rack-border text-text-pure hover:border-redline"
          }`}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-redline" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </footer>
  );
}
