"use client";

import { useState } from "react";
import { Disc, Radio, MessageSquare, Send, CheckCircle2, ExternalLink, PlaySquare } from "lucide-react";
import { SOCIAL_LINKS } from "@/config/products";
import { audioEngine } from "@/lib/audio-engine";

export default function Scene7CreditsContact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Exclusive Custom Beat",
    budget: "$500 - $1,500",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.triggerPad("percussion", "C5");
    setFormSubmitted(true);
  };

  return (
    <section
      id="scene-credits"
      className="relative min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-rack-border bg-obsidian z-20 select-none"
    >
      {/* Section 7A: YouTube Tutorials & Discography Credits */}
      <div className="border-b border-rack-border pb-12 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold mb-1">
              <PlaySquare className="w-4 h-4 text-redline" />
              <span>SCENE 07 // BROADCAST & RELEASES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-pure tracking-tight">
              YOUTUBE BREAKDOWNS & STREAMING
            </h2>
            <p className="font-mono text-xs text-text-dim mt-1 max-w-xl">
              WATCH BEAT-MAKING TUTORIALS ON @WEBS_CERTIFIED AND STREAM OFFICIAL SINGLES
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-rack-border bg-surface hover:border-redline hover:text-redline text-text-pure font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <PlaySquare className="w-4 h-4 text-redline" />
              <span>YOUTUBE CHANNEL</span>
              <ExternalLink className="w-3 h-3 text-text-dim" />
            </a>

            <a
              href={SOCIAL_LINKS.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-rack-border bg-surface hover:border-redline hover:text-redline text-text-pure font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Disc className="w-4 h-4 text-redline" />
              <span>SPOTIFY PROFILE</span>
              <ExternalLink className="w-3 h-3 text-text-dim" />
            </a>

            <a
              href={SOCIAL_LINKS.appleMusic}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-rack-border bg-surface hover:border-redline hover:text-redline text-text-pure font-mono text-xs flex items-center gap-2 transition-colors"
            >
              <Radio className="w-4 h-4 text-redline" />
              <span>APPLE MUSIC</span>
              <ExternalLink className="w-3 h-3 text-text-dim" />
            </a>
          </div>
        </div>

        {/* Video Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "HOW TO MAKE UNDERGROUND RAGE BEATS FOR 2HOLLIS",
              channel: "@webs_certified",
              views: "34K views",
              duration: "14:20",
              tag: "TUTORIAL",
            },
            {
              title: "MAKING THE BEST 808 GLITCH SOUNDS IN FL STUDIO",
              channel: "@webs_certified",
              views: "28K views",
              duration: "18:05",
              tag: "SOUND DESIGN",
            },
            {
              title: "DECONSTRUCTING 'I WANT MORE' — FULL STEM BREAKDOWN",
              channel: "@webs_certified",
              views: "42K views",
              duration: "12:45",
              tag: "BEAT BREAKDOWN",
            },
          ].map((vid, idx) => (
            <div
              key={idx}
              className="bg-surface border border-rack-border hover:border-redline p-4 group transition-all duration-200"
            >
              {/* Simulated Screen Preview Container */}
              <div className="w-full h-40 bg-obsidian border border-rack-border mb-3 relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                <div className="z-10 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full border border-redline bg-redline/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-redline transition-all">
                    <PlaySquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-mono text-[9px] px-2 py-0.5 bg-obsidian border border-rack-border text-text-dim">
                    LAZY EMBED READY
                  </span>
                </div>
                <div className="absolute bottom-2 right-2 font-mono text-[10px] px-1.5 py-0.5 bg-black/80 text-white border border-white/10">
                  {vid.duration}
                </div>
                <div className="absolute top-2 left-2 font-mono text-[9px] px-1.5 py-0.5 bg-redline text-white font-bold">
                  {vid.tag}
                </div>
              </div>

              <h4 className="font-display font-bold text-sm text-text-pure group-hover:text-redline transition-colors leading-snug">
                {vid.title}
              </h4>
              <div className="flex items-center justify-between font-mono text-[10px] text-text-dim mt-2">
                <span>{vid.channel}</span>
                <span>{vid.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 7B: Production Booking Terminal & Contact Form */}
      <div id="scene-contact" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-redline font-bold">
            <MessageSquare className="w-4 h-4 text-redline" />
            <span>DIRECT PRODUCER BOOKINGS</span>
          </div>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text-pure">
            CUSTOM PRODUCTION & COLLABORATIONS
          </h3>
          <p className="font-body text-xs sm:text-sm text-text-dim leading-relaxed">
            Need custom placement beats, full album executive production, sound design consulting, or mixing for your next project? Submit your inquiry through the direct rack terminal.
          </p>

          <div className="p-4 bg-surface border border-rack-border space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-text-dim">PRODUCER:</span>
              <strong className="text-text-pure">Wëbs (@webs_certified)</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-dim">DISCORD SERVER / ID:</span>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-redline hover:underline"
              >
                1460636381851422753
              </a>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-dim">COMMUNITY:</span>
              <span className="text-text-pure">Wëbs Certified Hub</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-dim">RESPONSE TIME:</span>
              <span className="text-white">24 - 48 HOURS</span>
            </div>
          </div>
        </div>

        {/* Contact Form with clean text alignments */}
        <div className="lg:col-span-7 bg-surface border border-rack-border p-6 sm:p-8">
          <div className="border-b border-rack-border pb-3 mb-6 flex items-center justify-between font-mono text-xs text-text-dim">
            <span>TERMINAL TRANSMISSION INTERFACE</span>
            <span className="text-redline font-bold">[ACTIVE]</span>
          </div>

          {formSubmitted ? (
            <div className="py-12 flex flex-col items-center text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-redline animate-bounce" />
              <h4 className="font-display font-bold text-2xl text-text-pure">
                INQUIRY TRANSMITTED TO WËBS
              </h4>
              <p className="font-mono text-xs text-text-dim max-w-md">
                Your message has been logged in the direct production queue. We will respond to your email within 24 hours.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-obsidian border border-rack-border text-text-pure hover:border-redline hover:text-redline font-mono text-xs"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-text-dim mb-1.5">
                    ARTIST / PRODUCER NAME:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Slayr / 2hollis"
                    className="w-full bg-obsidian border border-rack-border px-3 py-2.5 text-text-pure font-mono text-xs focus:border-redline focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-text-dim mb-1.5">
                    CONTACT EMAIL:
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="artist@studio.com"
                    className="w-full bg-obsidian border border-rack-border px-3 py-2.5 text-text-pure font-mono text-xs focus:border-redline focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-text-dim mb-1.5">
                    INQUIRY TYPE:
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-obsidian border border-rack-border px-3 py-2.5 text-text-pure font-mono text-xs focus:border-redline focus:outline-none"
                  >
                    <option>Exclusive Custom Beat</option>
                    <option>Multi-Kit Commercial License</option>
                    <option>Full Album Executive Production</option>
                    <option>Mixing & 808 Mastering</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-text-dim mb-1.5">
                    ESTIMATED BUDGET:
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-obsidian border border-rack-border px-3 py-2.5 text-text-pure font-mono text-xs focus:border-redline focus:outline-none"
                  >
                    <option>$200 - $500</option>
                    <option>$500 - $1,500</option>
                    <option>$1,500 - $5,000</option>
                    <option>$5,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] text-text-dim mb-1.5">
                  PROJECT SPECIFICATIONS & REFERENCE LINKS:
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your sonic vision, reference tracks (e.g. Ginseng, 2hollis), tempo requirements..."
                  className="w-full bg-obsidian border border-rack-border p-3 text-text-pure font-mono text-xs focus:border-redline focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-redline hover:bg-redline-hot active:scale-98 transition-all text-white font-mono text-xs font-bold tracking-widest flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,0,51,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>TRANSMIT INQUIRY TO WËBS</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-rack-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-text-dim">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-lg text-text-pure">
            WËBS
          </span>
          <span className="text-rack-border">|</span>
          <span>@WEBS_CERTIFIED</span>
          <span className="text-rack-border">|</span>
          <span>© 2026 ALL RIGHTS RESERVED</span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <a
            href={SOCIAL_LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors"
          >
            YOUTUBE
          </a>
          <a
            href={SOCIAL_LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors"
          >
            SPOTIFY
          </a>
          <a
            href={SOCIAL_LINKS.appleMusic}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors"
          >
            APPLE MUSIC
          </a>
          <a
            href={SOCIAL_LINKS.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-redline transition-colors"
          >
            DISCORD
          </a>
          <a
            href="/styleguide"
            className="text-redline hover:underline font-bold"
          >
            /STYLEGUIDE
          </a>
        </div>
      </footer>
    </section>
  );
}
