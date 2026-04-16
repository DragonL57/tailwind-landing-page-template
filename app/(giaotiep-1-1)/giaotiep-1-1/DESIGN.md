# Design System Strategy: The Academic Architect (Refined)

## 1. Overview & Creative North Star
The Creative North Star is **"The Academic Architect."** 

This system embraces the rigor of high-end academia and the precision of modern architecture. It feels like a bespoke editorial journal—expensive, authoritative, and intellectually sharp. 

We utilize **Brutalist Precision**: zero-radius corners, intentional asymmetry, and high-contrast typography. White space is a structural element; every alignment is a statement of professional excellence.

---

## 2. Colors & Textures: Authority & Prestige

The palette centers on the tension between energetic **Crimson (#BE202F)** and prestigious **Gold (#B6914C)**.

### The Surface Hierarchy
Treat the UI as stacked architectural materials:
- **Base Surface:** `#f8f9f9` (Light, clean foundation).
- **Layer 1 (Cards):** `surface-container-lowest` (#ffffff) for subtle lift.
- **Layer 2 (Shifts):** `surface-container-low` (#f3f4f4) for section breaks.
- **Layer 3 (Utility):** `surface-container-high` (#e7e8e8) for nested areas.

### "The Academic Grid"
To add depth without "decoration," use a radial-gradient dot pattern:
- `background-image: radial-gradient(#e1e3e3 1px, transparent 1px); background-size: 40px 40px;`
- Apply this to sections requiring a "blueprint" or "drafting" feel.

### The "No-Line" Exception
While we avoid standard 1px borders for sectioning, we use **Heavy Accents** to anchor elements:
- `border-t-4` or `border-l-4` in Crimson or Gold for cards and highlights.
- `border-b-2` in Gold for navigation anchors.

---

## 3. Typography: Editorial Command

We use a dual-font system to balance impact with readability.

| Typeface | Usage | Intent |
| :--- | :--- | :--- |
| **Montserrat** | Headlines | Authoritative, geometric, high-impact. |
| **Be Vietnam Pro** | Body & Labels | Clean, professional, academic clarity. |

### Type Styles
| Level | Style | Size | Tracking | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | Montserrat Bold | 3.5rem+ | -0.02em | The "Lead Story." |
| **Headline-MD** | Montserrat Bold | 1.75rem | 1px | Architectural headers. |
| **Label-SM** | Be Vietnam Bold | 0.75rem | 1.5px | All-caps, tracked metadata. |
| **Body-LG** | Be Vietnam Reg | 1.0rem | 0 | High-readability academic text. |

---

## 4. Components

### Navigation: The Glass Anchor
- **Style:** `white/80` background with `backdrop-blur-xl`.
- **Border:** 2px Gold bottom border (`#B6914C`).
- **Links:** Uppercase, `label-sm` style, with Crimson active states.

### Buttons: Geometric Force
- **Primary:** Crimson background, white text, 0px radius. Uppercase + 1.5px tracking.
- **Outline:** 2px Crimson or Outline-Variant border, Crimson text, transparent background.
- **Gold Accent:** Used for high-prestige actions (e.g., "Enroll Now") or secondary CTAs.

### The Bento Stats Grid
- Use a 4-column grid (on desktop) with `surface-container-lowest` backgrounds.
- Each item features a `border-t-4` (alternating Crimson/Gold) to create a rhythmic, brutalist feel.

### Academic Showcase (Asymmetric)
- **Layout:** 40/60 split between imagery and text.
- **Imagery:** Grayscale with `brightness-110` or subtle color tinting. 
- **Accents:** Use decorative "L-corners" (border-l-4 + border-t-4) in Gold at 30% opacity to frame images.

---

## 5. Do's and Don'ts

### Do
- **DO** use uppercase and tracking (1.5px) for all labels and buttons.
- **DO** use "The Academic Grid" (dots) for section backgrounds to break flatness.
- **DO** keep all `border-radius` at **0px**.
- **DO** use grayscale or high-key photography to maintain a "journal" aesthetic.

### Don't
- **DON'T** use soft shadows. Use tonal shifts or hard-edged color blocks.
- **DON'T** use rounded icons. Use sharp-edged iconography (e.g., Material Symbols Outlined).
- **DON'T** use standard "web" spacing. Lean into generous white space (32px - 64px increments).
