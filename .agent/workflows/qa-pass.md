# QA Pass Workflow

## Objective
Verify technical performance, frame rates, accessibility, console health, and cross-device audio stability prior to sign-off.

## Execution Steps

1. **Console & Error Integrity:**
   - Run browser audit; ensure 0 console errors, 0 unhandled promise rejections, 0 WebGL shader compilation warnings, and 0 Web Audio context lifecycle warnings.

2. **Scroll Performance & FPS Profiling:**
   - Walk through the entire page from Scene 0 to Scene 7 using smooth scroll.
   - Profile framerate: ensure a minimum of 60 FPS maintained during pinned scrub scenes.
   - Verify lag smoothing doesn't cause visual teleporting.

3. **Motion Accessibility Pass:**
   - Enable `prefers-reduced-motion: reduce`.
   - Verify that 3D camera scrubs become stepped transitions, flashing effects are disabled, and content remains 100% accessible and legible.

4. **Keyboard & Screen Reader Nav:**
   - Tab through all interactive elements: transport bar controls, pad buttons, crate filters, audio previews.
   - Verify visible, high-contrast focus rings (`focus-visible:outline-2 focus-visible:outline-[#FF0033]`).

5. **Audio Context & Mute Resilience:**
   - Verify that audio never autoplays prior to user interaction.
   - Test mute toggle in transport bar: audio silences instantly while visualizers continue gracefully or show standby states.
