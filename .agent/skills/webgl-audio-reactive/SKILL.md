---
name: webgl-audio-reactive
description: Full-screen React Three Fiber background pipeline, custom GLSL audio-reactive shaders, adaptive DPR, uniform lerping, and performance safeguards.
---

# WebGL Audio-Reactive Skill

## 1. Global Background Pipeline
- Use ONE fixed full-screen R3F canvas mounted behind the DOM layers (`pointer-events-none`, `fixed inset-0 z-0`).
- Feed a custom ShaderMaterial with real-time uniforms:
  - `uTime`: Elapsed time in seconds.
  - `uBass`: Low-frequency energy (20-150Hz), normalized [0..1].
  - `uMid`: Mid-frequency energy (150-2500Hz), normalized [0..1].
  - `uTreble`: High-frequency transients (2500-16000Hz), normalized [0..1].
  - `uScrollProgress`: Normalized page or scene scroll progression [0..1].
  - `uLayerStage`: Active arrangement stage index (0=boot, 1=kick, 2=808, 3=melody, 4=full mix).
  - `uResolution`: Viewport dimensions.

## 2. Uniform Smoothing (Lerp)
Raw FFT frequency data is volatile and noisy. Always lerp values in the animation frame before passing to uniforms:
```typescript
currentBass = THREE.MathUtils.lerp(currentBass, targetBass, 0.15);
currentTreble = THREE.MathUtils.lerp(currentTreble, targetTreble, 0.25);
```
This guarantees silky, organic displacement rather than glitchy visual jitter.

## 3. Performance Safeguards
- **Adaptive DPR:** Clamp DPR between `1` and `1.5` (`dpr={[1, 1.5]}`) to ensure high frame rates on high-density Retina displays.
- **Off-Screen & Tab Inactive Pausing:** Pause `useFrame` rendering or lower clock ticks when the browser tab is hidden (`document.visibilityState === 'hidden'`).
- **Poster / Low-Power Fallback:** If WebGL context is lost or unsupported, gracefully fall back to a CSS hardware-accelerated animated noise canvas.
