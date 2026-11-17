"use client";

import SmoothScroll from "@/components/scroll/SmoothScroll";
import BackgroundCanvas from "@/components/webgl/BackgroundCanvas";
import CustomCursor from "@/components/ui/CustomCursor";
import NavigationMenu from "@/components/ui/NavigationMenu";
import TransportBar from "@/components/ui/TransportBar";
import Scene0Boot from "@/components/scenes/Scene0Boot";
import Scene1Hero from "@/components/scenes/Scene1Hero";
import Scene2Arrangement from "@/components/scenes/Scene2Arrangement";
import Scene3Beats from "@/components/scenes/Scene3Beats";
import Scene4Loops from "@/components/scenes/Scene4Loops";
import Scene5Kits from "@/components/scenes/Scene5Kits";
import Scene6LibraryPass from "@/components/scenes/Scene6LibraryPass";
import Scene7CreditsContact from "@/components/scenes/Scene7CreditsContact";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-obsidian text-text-pure overflow-x-hidden selection:bg-redline selection:text-white pb-16">
        {/* Hardware Crosshair Cursor */}
        <CustomCursor />

        {/* Global WebGL Audio-Reactive Terrain Canvas */}
        <BackgroundCanvas />

        {/* Top Header & 4x4 Pad Grid Navigation */}
        <NavigationMenu />

        {/* Scene 0: DAW Power-On Boot Diagnostic & Audio Gesture Consent Gate */}
        <Scene0Boot onBootComplete={() => {}} />

        {/* Scene 1: Giant Hero Wordmark & Audio Terrain */}
        <Scene1Hero />

        {/* Scene 2: Pinned DAW Arrangement (Scrolling Builds a Beat) */}
        <Scene2Arrangement />

        {/* Scene 3: Crate-Digging Horizontal Scroll */}
        <Scene3Beats />

        {/* Scene 4: 4x4 Beat-Synced Loop Mixer */}
        <Scene4Loops />

        {/* Scene 5: Playable Drum Rack (Pads + Keyboard Keys) */}
        <Scene5Kits />

        {/* Scene 6: Library Pass Exploding Crate Stack */}
        <Scene6LibraryPass />

        {/* Scene 7: Credits, YouTube Breakdowns & Booking Terminal */}
        <Scene7CreditsContact />

        {/* Persistent Master Transport Bar */}
        <TransportBar />
      </main>
    </SmoothScroll>
  );
}
