# Cinematic Fake 3D Portfolio (Layers + Scroll Parallax)

## What’s implemented
- Layered “fake 3D” hero using absolutely-positioned PNG layers
- Scroll-based camera feel: background/mid/front move at different speeds + subtle zoom
- Cinematic UI overlays: vignette, light leaks, and grain overlay

## Assets
Put these files in:

- `public/hero/bg.png`
- `public/hero/mid.png`
- `public/hero/front.png`
- `public/hero/fog.png`
- `public/hero/grain.png`

A helper note exists at `public/hero/README.md`.

## Run
- `npm run dev`

Then open: http://localhost:3000

## Notes
This demo uses lightweight layered PNG parallax (not real Three.js) for smooth performance.

