---
name: perf-budget
description: Performance budgets, Core Web Vitals targets, WebGL memory management, and audio streaming budgets for high-end creative web experiences.
---

# Performance Budget Skill

## 1. Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2.5s on 4G emulation.
- **FID / INP (Interaction to Next Paint):** < 100ms.
- **CLS (Cumulative Layout Shift):** 0.00. Zero shift from fonts, media, or dynamic 3D containers.
- **Mobile Lighthouse Performance:** >= 80 on simulated mid-tier mobile devices.

## 2. Resource Budgets
- **Initial JS Bundle:** < 250KB gzipped for initial route load.
- **Font Optimization:** Subsetted WOFF2 fonts with `font-display: swap` and local fallback metrics.
- **Audio Assets:** Mono 128kbps or WebM audio chunks; lazy load on demand. Never exceed 4MB total preloaded audio for the initial scene.
- **3D Geometry & Textures:** Keep vertex counts < 50k for the waveform terrain. Compress heightmaps and normal maps with basis/ktx2 or downsampled WebP textures.

## 3. Frame Rate Guarantees
- 60 FPS continuous scroll performance on mid-tier mobile (iPhone 12 / Snapdragon 778G equivalents).
- If frame drops occur below 55 FPS during heavy scenes:
  - Reduce postprocessing passes (disable bloom/chromatic aberration on mobile).
  - Reduce mesh resolution from 128x128 to 64x64.
  - Throttle canvas render loop if off-viewport.
