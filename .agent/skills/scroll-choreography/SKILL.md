---
name: scroll-choreography
description: Architectural rules and patterns for wiring Lenis smooth scrolling with GSAP ScrollTrigger, single-ticker synchronization, pinned timelines, and responsive matchMedia variants.
---

# Scroll Choreography Skill

## 1. Single Ticker Architecture
Never run independent requestAnimationFrame loops for Lenis and GSAP. Wire Lenis into GSAP's ticker:

```typescript
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.08,
  wheelMultiplier: 0.9,
  smoothWheel: true,
});

// Update ScrollTrigger on every Lenis scroll event
lenis.on('scroll', ScrollTrigger.update);

// Drive Lenis entirely via GSAP's RAF ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable lag smoothing to prevent stutter during heavy scene changes
gsap.ticker.lagSmoothing(0);
```

## 2. Pinned Scrubbed Timelines
- For narrative DAW arrangement and scene progression, use pinned sections with pinned spacers.
- Use `scrub: true` or `scrub: 0.6` for silky smooth momentum following scroll.
- Animate strictly hardware-accelerated CSS properties: `transform` (`x`, `y`, `scale`, `rotation`) and `opacity`. Avoid animating layout properties (`top`, `width`, `height`, `margin`).
- Apply `will-change: transform, opacity` only to elements currently in active viewport scrub range, and release when out of view.

## 3. Lifecycle & Asset Synchronization
- When fonts or large 3D assets load: call `ScrollTrigger.refresh()`.
- On React component unmount: call `ctx.revert()` or kill individual ScrollTrigger instances to prevent ghost triggers and memory leaks.
- Always use `gsap.matchMedia()` to construct separate choreographies for mobile (`(max-width: 768px)`), desktop (`(min-width: 769px)`), and reduced motion (`(prefers-reduced-motion: reduce)`).
