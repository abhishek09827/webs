---
name: tonejs-sync-clock
description: Master audio architecture using Tone.js: clock synchronization, quantized stem arrangement, master FFT analysis, and lazy sound asset loading.
---

# Tone.js Synchronization & Audio Clock Skill

## 1. Single Audio Graph & Clock Architecture
- Exactly one `AudioContext` shared across the application.
- Tone.Transport controls master tempo (e.g., 140 BPM for dark trap/rage beats).
- Audio bus setup:
  ```
  Stems / Synth Channels -> Channel Volume Nodes -> Master Bus -> Master AnalyserNode -> Tone.Destination
  ```
- The `AnalyserNode` computes real-time FFT (size 256 or 512) and waveform data for:
  - Transport bar oscilloscope / mini waveform
  - WebGL audio uniforms (`uBass`, `uMid`, `uTreble`)
  - Component beat pulses

## 2. Quantized Arrangement Scrubbing
- Stems in Scene 2 (kick, 808 sub, lead melody, FX riser/texture) are synchronized to `Tone.Transport.scheduleRepeat()`.
- Unmuting or activating a stem on scroll is quantized to the next bar boundary (`@1m`) or beat (`@4n`), preserving musical coherence instead of jarring out-of-phase audio jumps.
- When scrubbing backwards, stems fade out gracefully over 50-100ms via `gainNode.gain.rampTo(0, 0.05)`.

## 3. Buffer Lifecycle & Lazy Loading
- Scene 0 synthesizes initial boot clicks and sub-thumps with Tone.js synths (`Tone.MembraneSynth`, `Tone.NoiseSynth`) with zero network overhead.
- Stem audio files and drum one-shots are lazy-loaded on user interaction using `Tone.ToneAudioBuffers`.
- All stems and loops must have fallback Web Audio procedural synthesis so the entire experience functions even before sample files finish downloading.
