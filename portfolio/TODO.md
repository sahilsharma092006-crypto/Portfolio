# TODO - Cinematic Jitter Animations + 3D Laptop + Editorial Grid

## Part 1: Jitter-style text animations
- [x] Implement `TypewriterText.tsx` exactly (typing 80ms, pause 2000ms, delete 40ms, pause 500ms, cursor blink CSS).

- [x] Update `Hero.tsx`:

  - [x] Sliding Word Reveal for hero heading (split into words, overflow wrappers, stagger 0.12s, cubic-bezier easing, Framer variants).
  - [x] Character Cascade for subtitle (split into chars, stagger 0.025s, starts after heading via delayChildren 0.6s).
  - [x] Replace embedded typewriter with standalone `TypewriterText`.
  - [x] Update Glitch Hover Effect on hero name to match clip-path slices + 100ms shifting + alternating offsets.
- [x] Scroll Word Reveal wrappers:
  - [x] Update `ProjectsGrid.tsx` section heading(s) to per-word whileInView (once, margin -100px, y 40→0, stagger 0.1s).
  - [x] Update `DepthBlurSection.tsx` title heading similarly.
- [x] Ensure reduced-motion behavior exists for animated parts.

## Part 2: 3D Laptop Showcase
- [x] Update `LaptopShowcase.tsx` to exact div-based laptop frame and mouse tilt using ref/effect/lerp.
- [x] Implement overlays: ambient glow, glare radial-gradient following mouse, scanlines.
- [x] Implement photo crossfade slideshow with Next `<Image>` (opacity transitions), interval 3000ms.

## Part 3: Editorial Photo Grid
- [x] Update `EditorialGrid.tsx` layout to exact 2-row/5-card grid (3 equal columns row1, 2 wider row2).
- [x] Implement hover scale/brightness + label slide-up by 8px.
- [x] Implement Framer Motion whileInView per card with stagger 0.1s.

## Part 4: Cinematic Parallax Section
- [x] Update `DepthBlurSection.tsx` to add full-width parallax band with fixed background + overlay + centered cinematic tagline.
- [x] Tagline uses scroll word reveal animation (from Part 1).

## Follow-up
- [ ] Ensure Framer Motion dependency exists (install if needed).
- [ ] Run `npm run lint` and `npm run build` in `portfolio/`.
- [ ] Visual verification on local page.
