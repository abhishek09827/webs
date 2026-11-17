"use client";

import * as Tone from "tone";

export type StemId = "drums" | "bass808" | "melody" | "fx";

export interface FFTData {
  bass: number; // 0 - 1
  mid: number; // 0 - 1
  treble: number; // 0 - 1
  waveform: Float32Array;
  rms: number;
}

class AudioEngine {
  private isInitialized = false;
  private isMuted = false;
  private isPlaying = false;
  private bpm = 140;

  // Nodes
  private masterGain: Tone.Gain | null = null;
  private masterAnalyser: Tone.Analyser | null = null;
  private waveformAnalyser: Tone.Analyser | null = null;

  // Stems / Synths
  private kickSynth: Tone.MembraneSynth | null = null;
  private bassSynth: Tone.MonoSynth | null = null;
  private hihatSynth: Tone.NoiseSynth | null = null;
  private melodySynth: Tone.PolySynth | null = null;
  private fxSynth: Tone.NoiseSynth | null = null;

  // Stem Volume Gains
  private stemGains: Record<StemId, Tone.Gain | null> = {
    drums: null,
    bass808: null,
    melody: null,
    fx: null,
  };

  // Active Stem States
  public activeStems: Record<StemId, boolean> = {
    drums: false,
    bass808: false,
    melody: false,
    fx: false,
  };

  // Master Loop Event IDs
  private loopEventId: number | null = null;
  private currentStep = 0;

  // Listeners
  private listeners: Set<(playing: boolean, muted: boolean, activeStems: Record<StemId, boolean>) => void> = new Set();

  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    if (Tone.context.state !== "running") {
      await Tone.start();
    }

    // Master bus
    this.masterGain = new Tone.Gain(0.85).toDestination();
    this.masterAnalyser = new Tone.Analyser("fft", 128);
    this.waveformAnalyser = new Tone.Analyser("waveform", 128);

    this.masterGain.connect(this.masterAnalyser);
    this.masterGain.connect(this.waveformAnalyser);

    // Create stem gain nodes
    this.stemGains.drums = new Tone.Gain(0).connect(this.masterGain);
    this.stemGains.bass808 = new Tone.Gain(0).connect(this.masterGain);
    this.stemGains.melody = new Tone.Gain(0).connect(this.masterGain);
    this.stemGains.fx = new Tone.Gain(0).connect(this.masterGain);

    // Build synthesized sound engines
    this.kickSynth = new Tone.MembraneSynth({
      pitchDecay: 0.05,
      octaves: 6,
      oscillator: { type: "sine" },
      envelope: {
        attack: 0.001,
        decay: 0.35,
        sustain: 0.01,
        release: 0.2,
      },
    }).connect(this.stemGains.drums);

    this.hihatSynth = new Tone.NoiseSynth({
      noise: { type: "white" },
      envelope: {
        attack: 0.001,
        decay: 0.06,
        sustain: 0,
      },
    }).connect(this.stemGains.drums);

    this.bassSynth = new Tone.MonoSynth({
      oscillator: { type: "sawtooth" },
      filter: {
        Q: 2,
        type: "lowpass",
        rolloff: -24,
      },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.7,
        release: 0.4,
      },
      filterEnvelope: {
        attack: 0.02,
        decay: 0.2,
        sustain: 0.4,
        release: 0.2,
        baseFrequency: 55,
        octaves: 2.5,
      },
    }).connect(this.stemGains.bass808);

    this.melodySynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "square8" },
      envelope: {
        attack: 0.01,
        decay: 0.25,
        sustain: 0.2,
        release: 0.8,
      },
    }).connect(this.stemGains.melody);

    this.fxSynth = new Tone.NoiseSynth({
      noise: { type: "pink" },
      envelope: {
        attack: 0.1,
        decay: 0.8,
        sustain: 0.1,
        release: 0.5,
      },
    }).connect(this.stemGains.fx);

    // Setup Master Transport Clock
    Tone.Transport.bpm.value = this.bpm;

    // 16-step sequencer schedule
    this.loopEventId = Tone.Transport.scheduleRepeat((time) => {
      this.tickSequencer(time);
    }, "16n");

    this.isInitialized = true;
  }

  private tickSequencer(time: number): void {
    const step = this.currentStep;
    this.currentStep = (this.currentStep + 1) % 16;

    // Stem 1: Drums (Kick + Hi-hats)
    if (this.activeStems.drums && this.kickSynth && this.hihatSynth) {
      // Kick pattern: steps 0, 6, 10
      if (step === 0 || step === 6 || step === 10) {
        this.kickSynth.triggerAttackRelease("C1", "8n", time, 0.95);
      }
      // Hi-hats: every even 16th + 96ppq roll on step 14, 15
      if (step % 2 === 0 || step === 14 || step === 15) {
        const vel = step % 4 === 0 ? 0.7 : 0.4;
        this.hihatSynth.triggerAttackRelease("16n", time, vel);
      }
    }

    // Stem 2: 808 Bass (F# minor root progression)
    if (this.activeStems.bass808 && this.bassSynth) {
      if (step === 0) {
        this.bassSynth.triggerAttackRelease("F#1", "4n", time, 0.9);
      } else if (step === 6) {
        this.bassSynth.triggerAttackRelease("A1", "8n", time, 0.85);
      } else if (step === 10) {
        this.bassSynth.triggerAttackRelease("E1", "4n", time, 0.85);
      } else if (step === 14) {
        this.bassSynth.triggerAttackRelease("C#2", "16n", time, 0.8);
      }
    }

    // Stem 3: Dark Melodic Chops
    if (this.activeStems.melody && this.melodySynth) {
      if (step === 0) {
        this.melodySynth.triggerAttackRelease(["F#3", "C#4"], "8n", time, 0.6);
      } else if (step === 4) {
        this.melodySynth.triggerAttackRelease(["A3", "E4"], "8n", time, 0.6);
      } else if (step === 8) {
        this.melodySynth.triggerAttackRelease(["B3", "F#4"], "8n", time, 0.6);
      } else if (step === 12) {
        this.melodySynth.triggerAttackRelease(["C#4", "G#4"], "16n", time, 0.7);
      }
    }

    // Stem 4: FX Swell / Glitch Texture
    if (this.activeStems.fx && this.fxSynth) {
      if (step === 12) {
        this.fxSynth.triggerAttackRelease("8n", time, 0.4);
      }
    }
  }

  public async startAudio(): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    if (Tone.context.state !== "running") {
      await Tone.context.resume();
    }
    if (Tone.Transport.state !== "started") {
      Tone.Transport.start();
    }
    this.isPlaying = true;
    this.notify();
  }

  public pauseAudio(): void {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    }
    this.isPlaying = false;
    this.notify();
  }

  public togglePlay(): void {
    if (this.isPlaying) {
      this.pauseAudio();
    } else {
      this.startAudio();
    }
  }

  public toggleMute(): void {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.rampTo(this.isMuted ? 0 : 0.85, 0.05);
    }
    this.notify();
  }

  public setMute(mute: boolean): void {
    this.isMuted = mute;
    if (this.masterGain) {
      this.masterGain.gain.rampTo(mute ? 0 : 0.85, 0.05);
    }
    this.notify();
  }

  public setStemState(stem: StemId, active: boolean): void {
    this.activeStems[stem] = active;
    const gain = this.stemGains[stem];
    if (gain) {
      gain.gain.rampTo(active ? 0.85 : 0, 0.08);
    }
    this.notify();
  }

  /**
   * Set arrangement stage from 0 to 4:
   * 0: All muted
   * 1: Drums active
   * 2: Drums + 808 active
   * 3: Drums + 808 + Melody active
   * 4: Drums + 808 + Melody + FX (Full Mix)
   */
  public setArrangementStage(stage: number): void {
    this.setStemState("drums", stage >= 1);
    this.setStemState("bass808", stage >= 2);
    this.setStemState("melody", stage >= 3);
    this.setStemState("fx", stage >= 4);
  }

  /**
   * Playable Drum Rack One-Shot Trigger
   */
  public triggerPad(type: string, note?: string): void {
    if (!this.isInitialized) {
      this.initialize().then(() => this.executePadTrigger(type, note));
      return;
    }
    if (Tone.context.state !== "running") {
      Tone.context.resume();
    }
    this.executePadTrigger(type, note);
  }

  private executePadTrigger(type: string, note?: string): void {
    const time = Tone.now();
    switch (type) {
      case "kick":
        this.kickSynth?.triggerAttackRelease(note || "C1", "8n", time, 1.0);
        break;
      case "808":
        this.bassSynth?.triggerAttackRelease(note || "F#1", "4n", time, 0.95);
        break;
      case "snare":
      case "clap":
        this.hihatSynth?.triggerAttackRelease("8n", time, 0.9);
        break;
      case "hihat_closed":
        this.hihatSynth?.triggerAttackRelease("32n", time, 0.6);
        break;
      case "hihat_open":
        this.hihatSynth?.triggerAttackRelease("8n", time, 0.7);
        break;
      case "percussion":
      case "vox":
        this.melodySynth?.triggerAttackRelease(note || "A3", "16n", time, 0.8);
        break;
      case "fx":
        this.fxSynth?.triggerAttackRelease("4n", time, 0.6);
        break;
      default:
        this.melodySynth?.triggerAttackRelease(note || "C4", "16n", time, 0.7);
    }
  }

  /**
   * Real-time FFT analysis for visualizers and WebGL uniforms
   */
  public getFFTData(): FFTData {
    const defaultData: FFTData = {
      bass: 0,
      mid: 0,
      treble: 0,
      waveform: new Float32Array(128),
      rms: 0,
    };

    if (!this.masterAnalyser || !this.waveformAnalyser) {
      return defaultData;
    }

    const freqValues = this.masterAnalyser.getValue() as Float32Array;
    const waveValues = this.waveformAnalyser.getValue() as Float32Array;

    // Split frequency spectrum into bass (bins 0-8), mid (bins 9-40), treble (bins 41-100)
    let bassSum = 0;
    for (let i = 0; i < 8; i++) {
      const val = (freqValues[i] + 100) / 100; // -100dB to 0dB -> 0 to 1
      bassSum += Math.max(0, Math.min(1, val));
    }
    const bass = bassSum / 8;

    let midSum = 0;
    for (let i = 9; i < 40; i++) {
      const val = (freqValues[i] + 100) / 100;
      midSum += Math.max(0, Math.min(1, val));
    }
    const mid = midSum / 31;

    let trebleSum = 0;
    for (let i = 41; i < 90; i++) {
      const val = (freqValues[i] + 100) / 100;
      trebleSum += Math.max(0, Math.min(1, val));
    }
    const treble = trebleSum / 49;

    let waveSum = 0;
    for (let i = 0; i < waveValues.length; i++) {
      waveSum += waveValues[i] * waveValues[i];
    }
    const rms = Math.sqrt(waveSum / waveValues.length);

    return {
      bass: this.isMuted || !this.isPlaying ? 0 : bass,
      mid: this.isMuted || !this.isPlaying ? 0 : mid,
      treble: this.isMuted || !this.isPlaying ? 0 : treble,
      waveform: waveValues,
      rms: this.isMuted || !this.isPlaying ? 0 : rms,
    };
  }

  public subscribe(cb: (playing: boolean, muted: boolean, activeStems: Record<StemId, boolean>) => void): () => void {
    this.listeners.add(cb);
    cb(this.isPlaying, this.isMuted, { ...this.activeStems });
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notify(): void {
    this.listeners.forEach((cb) => cb(this.isPlaying, this.isMuted, { ...this.activeStems }));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getBpm(): number {
    return this.bpm;
  }
}

// Global audio engine singleton
export const audioEngine = new AudioEngine();
