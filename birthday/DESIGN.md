---
name: Midnight Hibiscus
colors:
  surface: '#111415'
  surface-dim: '#111415'
  surface-bright: '#373a3b'
  surface-container-lowest: '#0c0f10'
  surface-container-low: '#191c1d'
  surface-container: '#1d2021'
  surface-container-high: '#282a2b'
  surface-container-highest: '#323536'
  on-surface: '#e1e3e4'
  on-surface-variant: '#c7c5ce'
  inverse-surface: '#e1e3e4'
  inverse-on-surface: '#2e3132'
  outline: '#919098'
  outline-variant: '#46464d'
  surface-tint: '#c1c4e6'
  primary: '#c1c4e6'
  on-primary: '#2b2f49'
  primary-container: '#0a0e27'
  on-primary-container: '#777a99'
  inverse-primary: '#595c79'
  secondary: '#ddb7ff'
  on-secondary: '#4a0080'
  secondary-container: '#622599'
  on-secondary-container: '#d1a1ff'
  tertiary: '#ffb1c4'
  on-tertiary: '#65002e'
  tertiary-container: '#2a000f'
  on-tertiary-container: '#f20078'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#dee0ff'
  primary-fixed-dim: '#c1c4e6'
  on-primary-fixed: '#161a33'
  on-primary-fixed-variant: '#414561'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0050'
  on-secondary-fixed-variant: '#622599'
  tertiary-fixed: '#ffd9e1'
  tertiary-fixed-dim: '#ffb1c4'
  on-tertiary-fixed: '#3f001a'
  on-tertiary-fixed-variant: '#8f0044'
  background: '#111415'
  on-background: '#e1e3e4'
  surface-variant: '#323536'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style
The design system embodies a "Midnight Tropical Cinema" aesthetic—a sophisticated blend of deep nocturnal atmosphere and vibrant neon energy. It is designed to evoke a sense of intimate magic, luxury, and celebration.

The visual language utilizes **Glassmorphism** as its structural foundation, layered over deep, multi-dimensional gradients. The "Stitch-inspired" tropical influence is subtle, manifested through organic curves and soft background light play rather than literal illustration. Every interaction should feel like a scene from a high-end romantic film: fluid, glowing, and emotionally resonant.

## Colors
The palette is rooted in the darkness of a Hawaiian midnight, using **Midnight Blue** (#0A0E27) as the canvas. 

- **Primary Canvas:** Deep Midnight Blue provides a premium, infinite depth.
- **Atmospheric Depth:** Royal Purple (#4B0082) is used for radial background glows and transitionary states, adding a regal, romantic weight.
- **Accent Neon:** Vibrant Pink (#FF007F) acts as the "heartbeat" of the UI, reserved for critical calls to action, highlights, and glowing borders.
- **Surface Tints:** Glass surfaces use a semi-transparent white (5-10% opacity) to maintain legibility while allowing the background gradients to bleed through.

## Typography
The typography strategy relies on the contrast between the classic elegance of **Playfair Display** and the modern precision of **Inter**.

Headlines should be treated as editorial elements—large, emotive, and often center-aligned. The use of negative letter-spacing in larger sizes enhances the premium "cinematic" feel. Body text remains functional and grounded in Inter to ensure that the romantic aesthetic does not sacrifice readability. Use "label-caps" for small metadata or eyebrows to add a structured, modern touch to the ornate headlines.

## Layout & Spacing
The layout follows a **Fluid Grid** model with an emphasis on "negative space as luxury." 

Content is often center-weighted to create a focus on the emotional core of the page. Sections are separated by generous vertical gaps (80px+) to allow the background glows and floating particles enough room to "breathe" without cluttering the information. 

- **Desktop:** 12-column grid with wide gutters (24px) to support glass cards.
- **Mobile:** Single column with increased side margins to ensure the glowing edge effects of cards are not clipped by the screen edge.

## Elevation & Depth
Depth is achieved through **Glassmorphism and Chromatic Shadows** rather than traditional grey dropshadows.

1.  **Base Layer:** A deep blue-to-purple radial gradient.
2.  **Floating Layer:** Translucent surfaces with a `backdrop-filter: blur(20px)`.
3.  **Glow Layer:** Elements use a subtle inner stroke (1px) of high-opacity pink or white to simulate the edge of a glass pane catching neon light.
4.  **Particles:** Low-opacity, soft-edged circles (simulating tropical bokeh or fireflies) drift between the base and floating layers to provide parallax depth.

## Shapes
This design system uses **Rounded (Level 2)** geometry. 

Corners are soft (0.5rem to 1.5rem) to evoke a friendly, romantic feel, avoiding the aggressive nature of sharp 0px corners. However, it stops short of full "pill-shaped" bubbles to maintain a more mature, premium architectural structure. Container shapes may occasionally use organic, slightly asymmetrical "blob" masks for decorative background elements to nod toward the tropical theme.

## Components
### Buttons
Primary buttons are "Neon Floats"—solid pink gradients with an external glow (`box-shadow`) that matches the button color. Secondary buttons use a "Ghost Glass" style: a transparent body with a 1px glowing pink border.

### Cards
Cards are the hero of this design system. They must feature a `background: rgba(255, 255, 255, 0.05)` and a heavy `backdrop-filter`. Borders are thin, semi-transparent, and use a linear gradient from top-left (white) to bottom-right (transparent).

### Input Fields
Inputs are minimalist underlines or very subtle glass wells. The label (Inter) sits above the field. On focus, the bottom border transitions into a vibrant neon pink glow.

### Particles & Icons
Icons should be thin-stroke (Linear) to maintain elegance. Background "particles" are dynamic, floating DIVs with varying blurs and sizes, colored in the royal purple and neon pink spectrum, moving slowly to create a "living" interface.

### Chips/Tags
Small, pill-shaped glass elements with high-contrast text, used sparingly to categorize or highlight specific romantic themes (e.g., "Dinner," "Sunset," "Surprise").

---

## Implementation notes (files added)

This folder now contains a working HTML/CSS/JS implementation that mirrors the visual design described above. Files added:

- `index.html` — page structure and content.
- `styles.css` — main stylesheet that reproduces the dark glassmorphism look and pink/purple accent gradients.
- `script.js` — lightweight interactive behavior for the hero CTA, candle "blow" and unlock button.
- `assets/screen.svg` — decorative placeholder image for the hero. Replace with `screen.png` if you prefer the screenshot PNG.

To preview: open [anamii/birthday/index.html](anamii/birthday/index.html) in your browser. Replace `assets/screen.svg` with your `screen.png` (named exactly `screen.png`) if you want the original screenshot displayed.
