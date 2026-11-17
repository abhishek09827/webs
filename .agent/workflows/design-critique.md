# Design Critique Workflow

## Objective
Ensure visual fidelity, adherence to the Art Direction document, extreme typographic precision, and elimination of generic SaaS or cookie-cutter web tropes.

## Execution Steps

1. **Local Server Verification:**
   Ensure the local development server is running cleanly with zero compiler warnings.

2. **Multi-Viewport Capture:**
   Using Playwright / Browser tools:
   - Capture Desktop viewport: 1440 x 900.
   - Capture Mobile viewport: 390 x 844 (iPhone 14 / standard iOS mobile).
   - Capture interaction states (active pad, playing stem, transport bar scrubbing).

3. **8-Point Audit Checklist:**
   Evaluate screenshots against the Art Direction document:
   1. **Musical Motivation:** Does every motion element correlate to sound, tempo, or arrangement? Delete if decorative.
   2. **Palette Discipline:** Is the Red & White + Obsidian aesthetic respected? Are colors crisp and intentional without blurry muddy gradients?
   3. **Typography & Hierarchy:** Is the wide display font commanding? Is the metadata mono readable, tight, and authentic to hardware?
   4. **Spacing & Rhythm:** Are margins, padding, and alignments disciplined on an 8px/16px baseline grid?
   5. **Template Trope Detection:** Are there generic rounded cards, generic floating badges, or stock components? Replace with custom industrial borders, rack screws, LED indicators, or tape labels.
   6. **Mobile Ergonomics (390px):** Are touch targets >= 44px? Is text readable without horizontal overflow?
   7. **Contrast & Legibility:** Does text meet WCAG AA contrast standards over 3D backgrounds?
   8. **Glitch / Texture Subtlety:** Are scanlines and noise textures enhancing tactile depth without degrading readability?

4. **Iterate & Compare:**
   Apply code fixes immediately, re-capture screenshots, and verify side-by-side.
