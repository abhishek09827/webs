export interface BeatProduct {
  id: string;
  title: string;
  bpm: number;
  key: string;
  mood: string;
  tags: string[];
  price: number;
  currency: string;
  waveformSeed: number;
  isPlaceholderAudio: boolean;
  synthPreset: "rage" | "ambient" | "hyperpop" | "drill" | "glitch";
  audioPreviewUrl?: string;
  collaborators?: string[];
  duration: string;
}

export interface LoopProduct {
  id: string;
  padIndex: number; // 0 to 15
  title: string;
  bpm: number;
  key: string;
  color: string;
  category: "lead" | "bass" | "vox" | "perc" | "synth" | "chord";
  isPlaceholderAudio: boolean;
  synthNote: string;
  synthPattern: number[]; // 16-step sequencer trigger pattern (1 = on, 0 = off)
  price: string; // "$5 / 30 days"
}

export interface KitProduct {
  id: string;
  title: string;
  subtitle: string;
  category: "Drum Kit" | "Multi-Kit" | "One-Shot Kit";
  price: number;
  currency: string;
  soundCount: number;
  fileSize: string;
  badge?: string;
  description: string;
  padPresets: {
    key: string; // QWERTY binding: 'Q', 'W', 'E', 'R', etc.
    padNumber: number; // 1-16
    name: string;
    type: "kick" | "snare" | "clap" | "808" | "hihat_closed" | "hihat_open" | "percussion" | "fx" | "vox";
    synthNote?: string;
  }[];
}

export interface LibraryPass {
  title: string;
  price: string;
  billingCycle: string;
  description: string;
  features: string[];
  badge: string;
  crateCount: number;
}

export interface SocialLinks {
  youtube: string;
  youtubeChannel: string;
  spotify: string;
  appleMusic: string;
  discord: string;
  brand: string;
}

export const SOCIAL_LINKS: SocialLinks = {
  youtube: "https://youtube.com/@webs_certified",
  youtubeChannel: "https://www.youtube.com/channel/UCdmfDnXYc_71VFeG0wxv2Ig",
  spotify: "https://open.spotify.com/artist/00Y2AYIw5vlda5PkXk4k9l?si=XC0agKk2SRK5C8LAqabWFg",
  appleMusic: "https://music.apple.com/artist/w%C3%ABbs/6773352215",
  discord: "https://discord.com/users/1460636381851422753",
  brand: "WËBS CERTIFIED",
};

export const BEAT_PRODUCTS: BeatProduct[] = [
  {
    id: "beat-01",
    title: "I WANT MORE",
    bpm: 144,
    key: "F# MIN",
    mood: "Aggressive / Rage",
    tags: ["2hollis type", "Distorted 808", "Cyberpunk", "Hard"],
    price: 30,
    currency: "USD",
    waveformSeed: 144,
    isPlaceholderAudio: true,
    synthPreset: "rage",
    duration: "2:18",
  },
  {
    id: "beat-02",
    title: "FML // BAD MEMORY",
    bpm: 138,
    key: "C# MIN",
    mood: "Dark Melodic / Glitch",
    tags: ["Digicore", "Bitcrushed", "Heavy Sub", "Emotional"],
    price: 30,
    currency: "USD",
    waveformSeed: 138,
    isPlaceholderAudio: true,
    synthPreset: "glitch",
    duration: "2:45",
  },
  {
    id: "beat-03",
    title: "SWITCH UP ON ME",
    bpm: 150,
    key: "D# MIN",
    mood: "Hyper Maximalist",
    tags: ["New Jazz", "Slide 808", "Fast Hihats", "Bouncy"],
    price: 30,
    currency: "USD",
    waveformSeed: 150,
    isPlaceholderAudio: true,
    synthPreset: "hyperpop",
    duration: "2:04",
  },
  {
    id: "beat-04",
    title: "REDLINE VELOCITY",
    bpm: 140,
    key: "E MIN",
    mood: "Industrial Rage",
    tags: ["Ginseng type", "Overdrive Kick", "Modular Lead"],
    price: 30,
    currency: "USD",
    waveformSeed: 140,
    isPlaceholderAudio: true,
    synthPreset: "rage",
    duration: "2:32",
  },
  {
    id: "beat-05",
    title: "PHANTOM VOLTAGE",
    bpm: 135,
    key: "G# MIN",
    mood: "Atmospheric Void",
    tags: ["Spacey", "Reverb Vox", "Plugg 808", "Nocturnal"],
    price: 30,
    currency: "USD",
    waveformSeed: 135,
    isPlaceholderAudio: true,
    synthPreset: "ambient",
    duration: "3:01",
  },
  {
    id: "beat-06",
    title: "CERTI CHOP",
    bpm: 142,
    key: "B MIN",
    mood: "Surgical Drill / Underground",
    tags: ["Underground Trap", "Stutter FX", "Clipping", "Certified"],
    price: 30,
    currency: "USD",
    waveformSeed: 142,
    isPlaceholderAudio: true,
    synthPreset: "drill",
    duration: "2:20",
  },
];

export const LOOP_PADS: LoopProduct[] = [
  // Row 1
  { id: "loop-01", padIndex: 0, title: "CRUSHED_808_GLIDE", bpm: 140, key: "F# MIN", color: "#FF0033", category: "bass", isPlaceholderAudio: true, synthNote: "F#1", synthPattern: [1,0,0,0, 0,0,1,0, 0,1,0,0, 0,0,1,0], price: "$5 / 30 days" },
  { id: "loop-02", padIndex: 1, title: "RAVE_STAB_OCTAVE", bpm: 140, key: "F# MIN", color: "#E6002B", category: "lead", isPlaceholderAudio: true, synthNote: "C#4", synthPattern: [1,0,0,1, 0,0,1,0, 1,0,0,0, 0,1,0,1], price: "$5 / 30 days" },
  { id: "loop-03", padIndex: 2, title: "BIT_VOX_HOOK_A", bpm: 140, key: "F# MIN", color: "#FFFFFF", category: "vox", isPlaceholderAudio: true, synthNote: "F#4", synthPattern: [0,0,1,0, 0,0,0,1, 0,0,1,0, 0,1,0,0], price: "$5 / 30 days" },
  { id: "loop-04", padIndex: 3, title: "GLITCH_ROLL_96PPQ", bpm: 140, key: "F# MIN", color: "#FF3355", category: "perc", isPlaceholderAudio: true, synthNote: "A4", synthPattern: [1,1,1,1, 0,1,1,0, 1,1,1,1, 1,0,1,1], price: "$5 / 30 days" },

  // Row 2
  { id: "loop-05", padIndex: 4, title: "MODULAR_DARK_ARP", bpm: 140, key: "F# MIN", color: "#FF0033", category: "synth", isPlaceholderAudio: true, synthNote: "E3", synthPattern: [1,0,1,0, 1,0,1,0, 1,0,1,0, 1,0,1,0], price: "$5 / 30 days" },
  { id: "loop-06", padIndex: 5, title: "CHOPPED_BELL_CRYSTAL", bpm: 140, key: "F# MIN", color: "#FFFFFF", category: "chord", isPlaceholderAudio: true, synthNote: "G#4", synthPattern: [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1], price: "$5 / 30 days" },
  { id: "loop-07", padIndex: 6, title: "ANALOG_SUB_PULSE", bpm: 140, key: "F# MIN", color: "#E6002B", category: "bass", isPlaceholderAudio: true, synthNote: "C#2", synthPattern: [1,0,0,0, 1,0,0,0, 1,0,0,0, 1,0,0,0], price: "$5 / 30 days" },
  { id: "loop-08", padIndex: 7, title: "RESONATOR_AIR_TEXTURE", bpm: 140, key: "F# MIN", color: "#A1A1AA", category: "perc", isPlaceholderAudio: true, synthNote: "D4", synthPattern: [0,1,0,0, 0,1,0,0, 0,1,0,0, 0,1,0,0], price: "$5 / 30 days" },

  // Row 3
  { id: "loop-09", padIndex: 8, title: "HARD_OVERDRIVE_CHORD", bpm: 140, key: "F# MIN", color: "#FF0033", category: "chord", isPlaceholderAudio: true, synthNote: "A3", synthPattern: [1,0,0,0, 0,0,0,0, 1,0,0,0, 0,0,0,0], price: "$5 / 30 days" },
  { id: "loop-10", padIndex: 9, title: "CYBER_FLUTE_GLIDE", bpm: 140, key: "F# MIN", color: "#FFFFFF", category: "lead", isPlaceholderAudio: true, synthNote: "B4", synthPattern: [0,0,1,0, 1,0,0,0, 0,0,1,0, 1,0,0,1], price: "$5 / 30 days" },
  { id: "loop-11", padIndex: 10, title: "SUB_DROP_IMPACT", bpm: 140, key: "F# MIN", color: "#E6002B", category: "bass", isPlaceholderAudio: true, synthNote: "F#1", synthPattern: [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0], price: "$5 / 30 days" },
  { id: "loop-12", padIndex: 11, title: "DISTORT_SHAKER_16TH", bpm: 140, key: "F# MIN", color: "#FF3355", category: "perc", isPlaceholderAudio: true, synthNote: "C5", synthPattern: [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1], price: "$5 / 30 days" },

  // Row 4
  { id: "loop-13", padIndex: 12, title: "TAPE_NOISE_CRACKLE", bpm: 140, key: "F# MIN", color: "#52525B", category: "perc", isPlaceholderAudio: true, synthNote: "E4", synthPattern: [1,0,1,0, 0,1,0,1, 1,0,1,0, 0,1,0,1], price: "$5 / 30 days" },
  { id: "loop-14", padIndex: 13, title: "DETUNED_SAW_SLIDE", bpm: 140, key: "F# MIN", color: "#FF0033", category: "lead", isPlaceholderAudio: true, synthNote: "C#3", synthPattern: [0,1,0,0, 1,0,1,0, 0,0,1,1, 0,1,0,0], price: "$5 / 30 days" },
  { id: "loop-15", padIndex: 14, title: "SPECTRAL_VOX_REVERSE", bpm: 140, key: "F# MIN", color: "#FFFFFF", category: "vox", isPlaceholderAudio: true, synthNote: "F#3", synthPattern: [0,0,0,1, 0,0,1,0, 0,0,0,1, 0,0,1,0], price: "$5 / 30 days" },
  { id: "loop-16", padIndex: 15, title: "FINAL_WARP_RISER", bpm: 140, key: "F# MIN", color: "#FF0033", category: "synth", isPlaceholderAudio: true, synthNote: "F#5", synthPattern: [0,0,0,0, 0,0,0,0, 1,1,1,1, 1,1,1,1], price: "$5 / 30 days" },
];

export const KIT_PRODUCTS: KitProduct[] = [
  {
    id: "kit-hyperpink",
    title: "HYPERP!NK MULTI-KIT",
    subtitle: "THE FLAGSHIP UNDERGROUND SOUND BANK",
    category: "Multi-Kit",
    price: 20,
    currency: "USD",
    soundCount: 420,
    fileSize: "1.2 GB",
    badge: "BESTSELLER",
    description: "Mix-ready distorted 808s, clipping punch kicks, laser claps, hyperpop melody starters, and custom presets tuned for high-voltage underground productions.",
    padPresets: [
      { key: "1", padNumber: 1, name: "P!NK KICK 01", type: "kick", synthNote: "C1" },
      { key: "2", padNumber: 2, name: "P!NK KICK 02", type: "kick", synthNote: "D1" },
      { key: "3", padNumber: 3, name: "HYPER CLAP A", type: "clap", synthNote: "G2" },
      { key: "4", padNumber: 4, name: "CRUSH SNARE", type: "snare", synthNote: "E2" },
      { key: "Q", padNumber: 5, name: "SUB 808 HARD", type: "808", synthNote: "F#1" },
      { key: "W", padNumber: 6, name: "808 SLIDE GLITCH", type: "808", synthNote: "A1" },
      { key: "E", padNumber: 7, name: "HAT CLOSED 01", type: "hihat_closed", synthNote: "F#3" },
      { key: "R", padNumber: 8, name: "HAT OPEN SIZZLE", type: "hihat_open", synthNote: "G#3" },
      { key: "A", padNumber: 9, name: "LASER PERC", type: "percussion", synthNote: "C4" },
      { key: "S", padNumber: 10, name: "METAL RIMSHOT", type: "percussion", synthNote: "D4" },
      { key: "D", padNumber: 11, name: "VOX CHANT HEIR", type: "vox", synthNote: "E3" },
      { key: "F", padNumber: 12, name: "VOX SCREAM CHOP", type: "vox", synthNote: "B3" },
      { key: "Z", padNumber: 13, name: "RISER 1 BAR", type: "fx", synthNote: "C5" },
      { key: "X", padNumber: 14, name: "DOWNLIFTER BASS", type: "fx", synthNote: "G1" },
      { key: "C", padNumber: 15, name: "VINYL BRAKE", type: "fx", synthNote: "D2" },
      { key: "V", padNumber: 16, name: "SUB KILL TRANSIENT", type: "kick", synthNote: "C1" },
    ],
  },
  {
    id: "kit-ultrapink",
    title: "ULTRAP!NK DRUM KIT",
    subtitle: "RAW AGGRESSION & RAGE PERCUSSION",
    category: "Drum Kit",
    price: 20,
    currency: "USD",
    soundCount: 280,
    fileSize: "680 MB",
    badge: "HEAVY ROTATION",
    description: "Pure transient impact engineered to cut straight through dense guitar/synth walls without muddying the master bus limiter.",
    padPresets: [
      { key: "1", padNumber: 1, name: "ULTRA KICK 01", type: "kick", synthNote: "C1" },
      { key: "2", padNumber: 2, name: "ULTRA KICK 02", type: "kick", synthNote: "B0" },
      { key: "3", padNumber: 3, name: "STICK SNAP", type: "snare", synthNote: "F2" },
      { key: "4", padNumber: 4, name: "DRILL CLAP", type: "clap", synthNote: "G#2" },
      { key: "Q", padNumber: 5, name: "ULTRA 808 DIST", type: "808", synthNote: "C#1" },
      { key: "W", padNumber: 6, name: "SUB DROPPER", type: "808", synthNote: "E1" },
      { key: "E", padNumber: 7, name: "FAST HAT 32", type: "hihat_closed", synthNote: "A3" },
      { key: "R", padNumber: 8, name: "CRASH AIR", type: "hihat_open", synthNote: "C4" },
      { key: "A", padNumber: 9, name: "SHARK PERC", type: "percussion", synthNote: "D3" },
      { key: "S", padNumber: 10, name: "ANVIL HIT", type: "percussion", synthNote: "E4" },
      { key: "D", padNumber: 11, name: "WAR CHANT", type: "vox", synthNote: "A2" },
      { key: "F", padNumber: 12, name: "GLITCH STUTTER", type: "vox", synthNote: "F4" },
      { key: "Z", padNumber: 13, name: "TRANSITION WHITE", type: "fx", synthNote: "D5" },
      { key: "X", padNumber: 14, name: "TAPE STOP", type: "fx", synthNote: "C2" },
      { key: "C", padNumber: 15, name: "EXPLODE SUB", type: "kick", synthNote: "F1" },
      { key: "V", padNumber: 16, name: "PEAK BASS", type: "808", synthNote: "G1" },
    ],
  },
  {
    id: "kit-x10k",
    title: "x10K SOUND VAULT",
    subtitle: "MODULAR DRUMS & ONE-SHOTS",
    category: "One-Shot Kit",
    price: 20,
    currency: "USD",
    soundCount: 512,
    fileSize: "1.8 GB",
    badge: "EXPANDED",
    description: "Modular synthesizer recordings, vintage sampler grit, acoustic drums slammed through tape saturation, and rare analog percussion.",
    padPresets: [
      { key: "1", padNumber: 1, name: "X-KICK SATURATE", type: "kick", synthNote: "C1" },
      { key: "2", padNumber: 2, name: "X-PUNCH KICK", type: "kick", synthNote: "D1" },
      { key: "3", padNumber: 3, name: "MODULAR CLAP", type: "clap", synthNote: "G2" },
      { key: "4", padNumber: 4, name: "BRUTAL SNARE", type: "snare", synthNote: "E2" },
      { key: "Q", padNumber: 5, name: "FAT 808 SINE", type: "808", synthNote: "F#1" },
      { key: "W", padNumber: 6, name: "FUZZ BASSLINE", type: "808", synthNote: "G#1" },
      { key: "E", padNumber: 7, name: "TIGHT HAT", type: "hihat_closed", synthNote: "F#3" },
      { key: "R", padNumber: 8, name: "SIZZLE OPEN", type: "hihat_open", synthNote: "B3" },
      { key: "A", padNumber: 9, name: "BELL WOOD", type: "percussion", synthNote: "D4" },
      { key: "S", padNumber: 10, name: "CONGA OVERDRIVE", type: "percussion", synthNote: "E4" },
      { key: "D", padNumber: 11, name: "ECHO STAB", type: "vox", synthNote: "G3" },
      { key: "F", padNumber: 12, name: "DISTORT YELP", type: "vox", synthNote: "A3" },
      { key: "Z", padNumber: 13, name: "REVERSE CRASH", type: "fx", synthNote: "C5" },
      { key: "X", padNumber: 14, name: "DROP NOISE", type: "fx", synthNote: "G1" },
      { key: "C", padNumber: 15, name: "MOTOR HUM", type: "fx", synthNote: "D2" },
      { key: "V", padNumber: 16, name: "SLAM SUB", type: "808", synthNote: "C1" },
    ],
  },
];

export const LIBRARY_PASS: LibraryPass = {
  title: "ALL-ACCESS VAULT PASS",
  price: "$50",
  billingCycle: "per 30 days",
  description: "Direct instant access to every beat, sound kit, loop pack, and unreleased prototype created by Wëbs. Updated weekly.",
  crateCount: 14,
  badge: "PRODUCER SUITE",
  features: [
    "Full commercial licensing for every beat in the catalog ($30/ea value)",
    "Instant download of HYPERP!NK, ULTRAP!NK & x10K Multi-Kits",
    "Continuous weekly drop of 4x4 loop banks and melody stems",
    "Exclusive private Discord channel access with Wëbs (ID: 1460636381851422753)",
    "Uncompressed 24-bit 48kHz WAV stems & MIDI files",
    "Early access to YouTube tutorial project files (@webs_certified)",
  ],
};
