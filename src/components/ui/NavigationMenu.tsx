"use client";

import { useState } from "react";
import { Grid, X, ExternalLink, Terminal } from "lucide-react";
import { audioEngine } from "@/lib/audio-engine";
import { SOCIAL_LINKS } from "@/config/products";

interface NavPad {
  id: string;
  padNum: string;
  title: string;
  targetId?: string;
  externalUrl?: string;
  color?: string;
  type: "scroll" | "link";
}

const NAV_PADS: NavPad[] = [
  // Row 1: Core Beats & Arrangement
  { id: "pad-boot", padNum: "01", title: "BOOT DIAGNOSTIC", targetId: "scene-boot", type: "scroll" },
  { id: "pad-hero", padNum: "02", title: "HERO // WËBS", targetId: "scene-hero", type: "scroll" },
  { id: "pad-arr", padNum: "03", title: "DAW ARRANGEMENT", targetId: "scene-arrangement", type: "scroll", color: "#FF0033" },
  { id: "pad-beats", padNum: "04", title: "BEAT CRATES", targetId: "scene-beats", type: "scroll" },

  // Row 2: Producer Gear & Sounds
  { id: "pad-loops", padNum: "05", title: "4x4 LOOP MATRIX", targetId: "scene-loops", type: "scroll" },
  { id: "pad-kits", padNum: "06", title: "DRUM RACK KITS", targetId: "scene-kits", type: "scroll", color: "#FF0033" },
  { id: "pad-pass", padNum: "07", title: "LIBRARY PASS", targetId: "scene-pass", type: "scroll" },
  { id: "pad-style", padNum: "08", title: "STYLEGUIDE", externalUrl: "/styleguide", type: "link" },

  // Row 3: Discography & Streaming
  { id: "pad-spot", padNum: "09", title: "SPOTIFY ARTIST", externalUrl: SOCIAL_LINKS.spotify, type: "link" },
  { id: "pad-apple", padNum: "10", title: "APPLE MUSIC", externalUrl: SOCIAL_LINKS.appleMusic, type: "link" },
  { id: "pad-yt", padNum: "11", title: "YOUTUBE CHANNEL", externalUrl: SOCIAL_LINKS.youtube, type: "link" },
  { id: "pad-discord", padNum: "12", title: "DISCORD COMMUNITY", externalUrl: SOCIAL_LINKS.discord, type: "link" },

  // Row 4: Producer Terminal & Contact
  { id: "pad-cred", padNum: "13", title: "CREDITS // COLLABS", targetId: "scene-credits", type: "scroll" },
  { id: "pad-contact", padNum: "14", title: "BOOKING TERMINAL", targetId: "scene-contact", type: "scroll" },
  { id: "pad-youtube", padNum: "15", title: "@WEBS_CERTIFIED", externalUrl: SOCIAL_LINKS.youtube, type: "link" },
  { id: "pad-master", padNum: "16", title: "MASTER SOUND VAULT", targetId: "scene-pass", type: "scroll", color: "#FF0033" },
];

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handlePadClick = (pad: NavPad) => {
    audioEngine.triggerPad("percussion", "C4");

    if (pad.type === "scroll" && pad.targetId) {
      setIsOpen(false);
      const element = document.getElementById(pad.targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (pad.externalUrl) {
      if (pad.externalUrl.startsWith("/")) {
        window.location.href = pad.externalUrl;
      } else {
        window.open(pad.externalUrl, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 px-4 md:px-8 flex items-center justify-between border-b border-rack-border/70 bg-obsidian/90 backdrop-blur-md">
        {/* Brand Logo & Tag */}
        <div className="flex items-center gap-3">
          <a
            href="#scene-hero"
            className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-redline"
          >
            <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-text-pure group-hover:text-redline transition-colors">
              WËBS
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 border border-rack-border text-redline bg-surface font-semibold tracking-wider">
              CERTIFIED
            </span>
          </a>
        </div>

        {/* Center: System Status */}
        <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono text-text-dim">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-redline led-red-active" />
            <span className="text-text-pure">SYS_ONLINE</span>
          </div>
          <span className="text-rack-border">|</span>
          <span>140.00 BPM</span>
          <span className="text-rack-border">|</span>
          <span className="text-redline">REDLINE DSP</span>
        </div>

        {/* Right: Quick Styleguide Link & 4x4 Pad Grid Toggle */}
        <div className="flex items-center gap-3">
          <a
            href="/styleguide"
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 border border-rack-border bg-surface hover:border-redline hover:text-redline transition-colors text-text-dim"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>/STYLEGUIDE</span>
          </a>

          <button
            onClick={() => {
              audioEngine.triggerPad("hihat_closed");
              setIsOpen(!isOpen);
            }}
            aria-label="Toggle Navigation Pad Grid"
            className="flex items-center gap-2 px-3 py-1.5 bg-surface border border-rack-border hover:border-redline text-text-pure hover:text-redline transition-colors font-mono text-xs focus-visible:outline-2 focus-visible:outline-redline"
          >
            <Grid className="w-4 h-4 text-redline" />
            <span className="font-bold tracking-wider">4x4 PAD NAV</span>
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay 4x4 Pad Matrix */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8 animate-in fade-in duration-150"
        >
          {/* Header */}
          <div className="w-full max-w-4xl flex items-center justify-between border-b border-rack-border pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-redline led-red-active" />
              <h2 className="font-display font-bold text-lg md:text-xl text-text-pure tracking-wider">
                MPC ROUTING MATRIX // 16 PADS
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Navigation Matrix"
              className="p-2 border border-rack-border bg-surface hover:border-redline hover:text-redline text-text-pure transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* The 4x4 Pad Grid */}
          <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
            {NAV_PADS.map((pad) => (
              <button
                key={pad.id}
                onClick={() => handlePadClick(pad)}
                className="group relative h-24 sm:h-28 bg-surface border border-rack-border hover:border-redline p-3 flex flex-col justify-between transition-all duration-100 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-redline text-left"
              >
                {/* Corner LED Accent */}
                <span
                  className={`w-2 h-2 rounded-none transition-colors ${
                    pad.color
                      ? "bg-redline led-red-active"
                      : "bg-rack-border group-hover:bg-redline"
                  }`}
                />

                {/* Pad Number */}
                <div className="font-mono text-[10px] text-text-dim group-hover:text-redline transition-colors">
                  PAD_{pad.padNum}
                </div>

                {/* Pad Title */}
                <div className="font-display font-bold text-xs sm:text-sm text-text-pure group-hover:text-white transition-colors flex items-center justify-between">
                  <span>{pad.title}</span>
                  {pad.type === "link" && (
                    <ExternalLink className="w-3.5 h-3.5 text-text-dim group-hover:text-redline" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Footer Terminal Note */}
          <div className="w-full max-w-4xl mt-6 pt-4 border-t border-rack-border/60 flex items-center justify-between text-xs font-mono text-text-dim">
            <span>[QWERTY & TOUCH ACTIVE]</span>
            <span className="text-redline">WËBS OFFICIAL HARDWARE HUB</span>
          </div>
        </div>
      )}
    </>
  );
}
