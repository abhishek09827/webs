# Design Rules — Wëbs (shadex2.net)

## Core Directives

1. **Musical Motivation Rule**
   - Every animation, transition, deformation, or visual displacement must have an audible, musical reason.
   - Tied directly to:
     - Beat transients (kick punch, snare snap)
     - Audio frequency energy (sub-bass displacement, high-frequency shimmer)
     - The DAW "Arrangement" metaphor (stem stacking, track isolation, mute/solo states)
   - *Decorative, arbitrary motion without a musical trigger or structural logic gets deleted immediately.*

2. **Unified Engine Rule**
   - Scroll and animation must run on exactly ONE master animation loop.
   - Lenis drives smooth scroll; GSAP ticker updates Lenis; Three.js / WebGL shares the same master clock.
   - Zero competing scroll listeners or duplicate requestAnimationFrame loops.

3. **Motion Accessibility (prefers-reduced-motion)**
   - Never use an "off switch" that leaves the interface broken or devoid of intent.
   - Provide a thoughtful, editorial fallback: instant cross-fades, crisp stepped state changes (e.g., discrete step sequencer jumps), and static architectural layouts that communicate the arrangement state without continuous camera scrubs or parallax distortion.

4. **Audio Integrity & Consent**
   - Always-visible master transport bar with clear Mute / Unmute toggle and visual level meter.
   - Audio strictly starts only after an explicit, affirmative user gesture (the Scene 0 Boot sequence or a click on the transport bar).
   - AudioContext lifecycle managed cleanly (suspended by default, resumed on gesture).

5. **Mobile-First Discipline**
   - Always verify and test at 390px (iPhone standard width) before desktop approval.
   - Touch pads must be ergonomically finger-friendly (minimum 44x44px touch targets).
   - No interaction may rely exclusively on mouse `:hover` states.

6. **Preview Security**
   - Never expose full-quality, unwatermarked master stems or lossless assets in network payloads.
   - Deliver compressed, low-latency previews (mono or 128kbps MP3 / WebM snippets, truncated loops).

7. **Visual Critique Verification**
   - Before calling any scene or component done: capture high-resolution screenshots on both desktop (1440px) and mobile (390px).
   - Conduct a structured 8-point critique against the Art Direction document.
