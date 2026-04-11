# Design System Inspired by xAI

## 1. Visual Theme & Atmosphere

The design system is a masterclass in light-first, monospace-driven brutalist minimalism—a system that feels like a bespoke editorial journal: authoritative and intellectually sharp. The entire experience is anchored to a clean light background (`#f8f9f9`) with authoritative dark text (`#191c1c`), creating a high-contrast, academic-inspired aesthetic that signals prestige and technical credibility. The palette centers on the tension between energetic Crimson (`#BE202F`) and prestigious Gold (`#B6914C`).

The typographic system is split between two carefully chosen typefaces. `Montserrat` handles display-level headlines at an extraordinary 320px with weight 300, and also serves as the button typeface in uppercase with tracked-out letter-spacing (1.4px). `Be Vietnam Pro` handles all body and secondary heading text with a clean, professional, academic clarity. The geometric-as-display-font choice is the defining aesthetic decision -- it positions xAI not as a consumer product but as infrastructure, as something built by people who live in terminals.

The spacing system operates on an 8px base grid with values concentrated at the small end (4px, 8px, 24px, 48px), reflecting a dense, information-focused layout philosophy. Border radius is minimal -- the site barely rounds anything, maintaining sharp, architectural edges. There are no decorative shadows, no gradients, no layered elevation. Depth is communicated purely through contrast and whitespace.

**Key Characteristics:**
- Pure light theme: `#f8f9f9` background with `#191c1c` text
- Brand Accents: Crimson (`#BE202F`) and Gold (`#B6914C`) for architectural anchors
- Montserrat at extreme display sizes (320px, weight 300) -- geometric as luxury
- Uppercase tracked buttons with 1.4px letter-spacing -- technical, commanding
- Be Vietnam Pro for body text at 16px/1.5 and headings at 30px/1.2 -- clean contrast
- Zero decorative elements: no shadows, no gradients, no colored accents
- 8px spacing grid with a sparse, deliberate scale
- Heroicons SVG icon system -- minimal, functional
- Tailwind CSS with arbitrary values -- utility-first engineering approach

## 2. Color Palette & Roles

### Primary
- **Academic Dark** (`#191c1c`): The primary voice—used for all headings and primary body text.
- **Base Surface** (`#f8f9f9`): The foundation. A clean, light gray-white that provides an academic, "blueprint" feel.
- **Brand Crimson** (`#BE202F`): Primary action color, used for buttons and heavy accents.
- **Brand Gold** (`#B6914C`): Prestige color, used for secondary accents and navigation anchors.

### Interactive
- **Dark Default** (`#191c1c`): Link and interactive element color in default state.
- **Dark Muted** (`rgba(25, 28, 28, 0.5)`): Hover state for links -- a deliberate dimming.
- **Dark Subtle** (`rgba(25, 28, 28, 0.1)`): Borders, dividers, and subtle surface treatments.
- **Brand Crimson** (`#BE202F`): Tailwind's primary focus and action color.

### Surface & Borders
- **Surface White** (`#ffffff`): Card backgrounds for subtle lift against the base surface.
- **Surface Hover** (`rgba(25, 28, 28, 0.05)`): Slightly more visible hover state for interactive containers.
- **Border Default** (`rgba(25, 28, 28, 0.1)`): Standard border for cards, dividers, and containers.
- **Border Strong** (`rgba(25, 28, 28, 0.2)`): Emphasized borders for active states and button outlines.

### Functional
- **Text Primary** (`#191c1c`): All headings, body text, labels.
- **Text Secondary** (`rgba(25, 28, 28, 0.7)`): Descriptions, captions, supporting text.
- **Text Tertiary** (`rgba(25, 28, 28, 0.5)`): Muted labels, placeholder text, timestamps.
- **Text White** (`#ffffff`): Text used on Crimson or Dark backgrounds.

## 3. Typography Rules

### Font Family
- **Display / Headings**: `Montserrat`, with fallback: `sans-serif`
- **Body / Labels**: `Be Vietnam Pro`, with fallback: `sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Transform | Notes |
|------|------|------|--------|-------------|----------------|-----------|-------|
| Display Hero | Montserrat | 320px (20rem) | 300 | 1.50 | normal | none | Extreme scale, authoritative luxury |
| Section Heading | Montserrat | 30px (1.88rem) | 700 | 1.20 (tight) | normal | none | Geometric, high-impact headers |
| Body | Be Vietnam Pro | 16px (1rem) | 400 | 1.50 | normal | none | Standard academic text |
| Button | Be Vietnam Pro | 14px (0.88rem) | 700 | 1.43 | 1.5px | uppercase | Tracked bold labels, commanding |
| Label / Caption | Be Vietnam Pro | 14px (0.88rem) | 400 | 1.50 | normal | none | Supporting text |
| Small / Meta | Be Vietnam Pro | 12px (0.75rem) | 400 | 1.50 | normal | none | Timestamps, footnotes |

### Principles
- **Geometric as display**: Montserrat at 320px is not a gimmick -- it is the brand statement. The fixed-width rhythm of geometric characters at extreme scale create an architectural quality.
- **Light weight at scale**: Weight 300 for the 320px headline prevents the font from feeling heavy or brutish at extreme sizes. It reads as precise, not overwhelming.
- **Uppercase buttons**: All button text is uppercase Be Vietnam Pro bold with 1.5px letter-spacing. This creates a distinctly technical, academic aesthetic for interactive elements.
- **Sans-serif for reading**: Be Vietnam Pro at 16px/1.5 provides excellent readability for body content, creating a clean contrast against the geometric display elements.
- **Two-font clarity**: The system uses exactly two typefaces with clear roles -- Montserrat for impact and Be Vietnam Pro for information. No overlap, no ambiguity.

## 4. Component Stylings

### Buttons

**Primary (Crimson)**
- Background: `#BE202F`
- Text: `#ffffff`
- Padding: 12px 24px
- Radius: 0px (sharp corners)
- Font: Be Vietnam Pro 14px weight 700, uppercase, letter-spacing 1.5px
- Hover: `rgba(190, 32, 47, 0.9)` background
- Use: Primary CTA ("REGISTER NOW", "GET STARTED")

**Ghost / Outlined**
- Background: transparent
- Text: `#191c1c`
- Padding: 12px 24px
- Radius: 0px
- Border: `2px solid #BE202F`
- Font: Be Vietnam Pro 14px weight 700, uppercase, letter-spacing 1.5px
- Hover: `rgba(190, 32, 47, 0.05)` background
- Use: Secondary actions ("LEARN MORE", "VIEW API")

**Text Link**
- Background: none
- Text: `#191c1c`
- Font: Be Vietnam Pro 16px weight 400
- Hover: `rgba(25, 28, 28, 0.5)` -- dims on hover
- Use: Inline links, navigation items

### Cards & Containers
- Background: `#ffffff`
- Border: `1px solid rgba(25, 28, 28, 0.1)`
- Radius: 0px (sharp) or 4px (subtle)
- Shadow: none -- xAI does not use box shadows
- Hover: border shifts to `rgba(25, 28, 28, 0.2)`

### Navigation
- Light background matching page (`#f8f9f9`)
- Brand logotype: dark text, left-aligned
- Links: Be Vietnam Pro 14px weight 700, `#191c1c` text, uppercase, 1.5px tracking
- Hover: `rgba(25, 28, 28, 0.5)` text color
- CTA: Crimson primary button, right-aligned
- Mobile: hamburger toggle

### Badges / Tags
**Metadata Tag**
- Background: transparent
- Text: `#191c1c`
- Padding: 4px 8px
- Border: `1px solid rgba(25, 28, 28, 0.2)`
- Radius: 0px
- Font: Be Vietnam Pro 12px uppercase, letter-spacing 1px

### Inputs & Forms
- Background: transparent or `rgba(25, 28, 28, 0.05)`
- Border: `1px solid rgba(25, 28, 28, 0.2)`
- Radius: 0px
- Focus: ring with `#BE202F`
- Text: `#191c1c`
- Placeholder: `rgba(25, 28, 28, 0.3)`
- Label: `rgba(25, 28, 28, 0.7)`, Be Vietnam Pro 14px

## 5. Layout Principles

### Spacing System
- Base unit: 8px
- Scale: 4px, 8px, 24px, 48px
- The scale is deliberately sparse -- xAI avoids granular spacing distinctions, preferring large jumps that create clear visual hierarchy through whitespace alone

### Grid & Container
- Max content width: approximately 1200px
- Hero: full-viewport height with massive centered Montserrat headline
- Feature sections: simple vertical stacking with generous section padding (48px-96px)
- Two-column layouts for feature descriptions at desktop
- Full-width light sections maintain the single light background throughout

### Whitespace Philosophy
- **Extreme generosity**: xAI uses vast amounts of whitespace. The 320px headline with 48px+ surrounding padding creates a sense of emptiness that is itself a design statement -- the content is so important it needs room to breathe.
- **Vertical rhythm over horizontal density**: Content stacks vertically with large gaps between sections rather than packing horizontally. This creates a scroll-driven experience that feels deliberate and cinematic.
- **No visual noise**: The absence of decorative elements, borders between sections, and color variety means whitespace is the primary structural tool.

### Breakpoints
- 2000px, 1536px, 1280px, 1024px, 1000px, 768px, 640px
- Tailwind responsive modifiers drive breakpoint behavior

### Border Radius Scale
- Sharp (0px): Primary treatment for buttons, cards, inputs -- the default
- Subtle (4px): Occasional softening on secondary containers
- The near-zero radius philosophy is core to the brand's brutalist identity

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (Level 0) | No shadow, no border | Page background, body content |
| Surface (Level 1) | `#ffffff` background | Subtle card surfaces |
| Bordered (Level 2) | `1px solid rgba(25,28,28,0.1)` border | Cards, containers, dividers |
| Active (Level 3) | `1px solid rgba(25,28,28,0.2)` border | Hover states, active elements |
| Focus (Accessibility) | `ring` with `#BE202F` | Keyboard focus indicator |

**Elevation Philosophy**: xAI rejects the conventional shadow-based elevation system entirely. There are no box-shadows anywhere on the site. Instead, depth is communicated through three mechanisms: (1) opacity-based borders that brighten on interaction, creating a sense of elements "activating" rather than lifting; (2) extremely subtle background opacity shifts that create barely-perceptible surface differentiation; and (3) the massive scale contrast between the 320px display type and 16px body text, which creates typographic depth. This is elevation through contrast and opacity, not through simulated light and shadow.

## 7. Do's and Don'ts

### Do
- Use `#f8f9f9` as the universal background
- Use Montserrat for all display headlines -- geometric IS the brand
- Use Be Vietnam Pro for all body, labels, and buttons
- Apply uppercase + 1.5px letter-spacing to all button labels and nav items
- Use weight 300 for the massive display headline (320px)
- Keep borders at `rgba(25, 28, 28, 0.1)` -- barely visible, not absent
- Dim interactive elements on hover to `rgba(25, 28, 28, 0.5)` -- the reverse of convention
- Maintain sharp corners (0px radius) as the default -- brutalist precision

### Don't
- Don't use box-shadows -- xAI has zero shadow elevation
- Don't introduce color accents beyond Crimson, Gold, and the neutral light background
- Don't use large border-radius (8px+, pill shapes) -- the sharp edge is intentional
- Don't use bold weights (600-700) for massive headlines -- weight 300 only
- Don't brighten elements on hover -- xAI dims to `0.5` opacity instead
- Don't add decorative gradients, illustrations, or color blocks
- Don't mix font roles -- Montserrat is for display/impact, Be Vietnam Pro for reading/labels

## 8. Responsive Behavior

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | <640px | Single column, hero headline scales dramatically down |
| Small Tablet | 640-768px | Slight increase in padding |
| Tablet | 768-1024px | Two-column layouts begin, heading sizes increase |
| Desktop | 1024-1280px | Full layout, generous whitespace |
| Large | 1280-1536px | Wider containers, more breathing room |
| Extra Large | 1536-2000px | Maximum content width, centered |
| Ultra | >2000px | Content stays centered, extreme margins |

### Touch Targets
- Buttons use 12px 24px padding for comfortable touch
- Navigation links spaced with 24px gaps
- Minimum tap target: 44px height
- Mobile: full-width buttons for easy thumb reach

### Collapsing Strategy
- Hero: 320px Montserrat headline scales down dramatically (to ~48px-64px on mobile)
- Navigation: horizontal links collapse to hamburger menu
- Feature sections: two-column to single-column stacking
- Section padding: 96px -> 48px -> 24px across breakpoints
- Massive display type is the first thing to resize -- it must remain impactful but not overflow

### Image Behavior
- Minimal imagery -- the site relies on typography and whitespace
- Any product screenshots maintain sharp corners
- Full-width media scales proportionally with viewport

## 9. Agent Prompt Guide

### Quick Color Reference
- Background: Light (`#f8f9f9`)
- Text Primary: Dark (`#191c1c`)
- Brand Crimson: `#BE202F`
- Brand Gold: `#B6914C`
- Text Secondary: Dark 70% (`rgba(25, 28, 28, 0.7)`)
- Text Muted: Dark 50% (`rgba(25, 28, 28, 0.5)`)
- Text Disabled: Dark 30% (`rgba(25, 28, 28, 0.3)`)
- Border Default: Dark 10% (`rgba(25, 28, 28, 0.1)`)
- Border Strong: Dark 20% (`rgba(25, 28, 28, 0.2)`)
- Surface Subtle: Dark 3% (`rgba(25, 28, 28, 0.03)`)
- Surface Hover: Dark 8% (`rgba(25, 28, 28, 0.08)`)
- Focus Ring: Crimson (`#BE202F`)
- Button Primary BG: Crimson (`#BE202F`), text White (`#ffffff`)

### Example Component Prompts
- "Create a hero section on #f8f9f9 background. Headline in Montserrat at 72px weight 300, color #191c1c, centered. Subtitle in Be Vietnam Pro 18px weight 400, rgba(25,28,28,0.7), max-width 600px centered. Two buttons: primary (Crimson bg, white text, 0px radius, Be Vietnam Pro 14px weight 700, uppercase, 1.5px letter-spacing, 12px 24px padding) and ghost (transparent bg, 2px solid Crimson, dark text, same font treatment)."
- "Design a card: white background, 1px solid rgba(25,28,28,0.1) border, 0px radius, 24px padding. No shadow. Title in Montserrat 22px weight 700, #191c1c. Body in Be Vietnam Pro 16px weight 400, rgba(25,28,28,0.7), line-height 1.5. Hover: border changes to rgba(25,28,28,0.2)."
- "Build navigation: #f8f9f9 background, full-width. Brand text left (Montserrat 14px uppercase). Links in Be Vietnam Pro 14px weight 700 #191c1c with hover to rgba(25,28,28,0.5). Crimson primary button right-aligned (Be Vietnam Pro 14px weight 700, 1.5px letter-spacing)."
- "Create a form: light background #f8f9f9. Label in Be Vietnam Pro 14px rgba(25,28,28,0.7). Input with transparent bg, 1px solid rgba(25,28,28,0.2) border, 0px radius, dark text 16px Be Vietnam Pro. Focus: Crimson ring #BE202F. Placeholder: rgba(25,28,28,0.3)."
- "Design a metadata tag/badge: transparent bg, 1px solid rgba(25,28,28,0.2), 0px radius, Be Vietnam Pro 12px uppercase, 1px letter-spacing, dark text, 4px 8px padding."

### Iteration Guide
1. Always start with `#f8f9f9` background -- never use dark backgrounds for the core theme
2. Montserrat for display and headings, Be Vietnam Pro for body/labels/buttons -- never mix these roles
3. All buttons must be Be Vietnam Pro bold uppercase with 1.5px letter-spacing -- this is non-negotiable
4. No shadows, ever -- depth comes from border opacity and background opacity only
5. Borders are always neutral with low opacity (0.1 default, 0.2 for emphasis)
6. Hover behavior dims to 0.5 opacity rather than brightening -- the reverse of most systems
7. Sharp corners (0px) by default -- only use 4px for specific secondary containers
8. Body text at 16px Be Vietnam Pro with 1.5 line-height for comfortable reading
9. Generous section padding (48px-96px) -- let content breathe
10. The monochromatic light-on-white palette with Crimson/Gold accents is absolute
