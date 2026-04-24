# Design Brief

## Direction

Ocean Breeze — A premium corporate portfolio for a senior quality and manufacturing leader, emphasizing trust, clarity, and executive professionalism through a refined blue palette.

## Tone

Refined and trustworthy with generous whitespace, clean typography, and subtle depth — executing a corporate-professional extreme that conveys expertise without coldness.

## Differentiation

Glassmorphism cards layered over alternating pale cyan and light blue backgrounds create visual rhythm while OKLCH-tuned color tokens ensure accessibility and distinction across all interactive states.

## Color Palette

| Token           | OKLCH              | Role                              |
|-----------------|-------------------|-----------------------------------|
| background      | 0.945 0.048 262   | Pale cyan main background         |
| foreground      | 0.15 0.08 254     | Dark navy text                    |
| primary         | 0.215 0.112 254   | Dark navy headers, navigation     |
| secondary       | 0.454 0.154 257   | Medium blue section titles, links |
| accent          | 0.612 0.149 262   | Cyan CTAs, highlights, icons      |
| muted           | 0.865 0.078 262   | Light blue cards, sections        |

## Typography

- Display: DM Sans — Hero headings, section titles, navigation
- Body: Inter — Paragraphs, descriptions, body copy
- Mono: JetBrains Mono — Metrics, code examples, timestamps
- Scale: Hero 3.5rem bold, h2 2.25rem, h3 1.5rem, body 1rem

## Elevation & Depth

Glassmorphism cards with soft cyan borders and minimal shadows create layered depth; alternating background sections (pale cyan / light blue) establish visual hierarchy without aggressive contrast.

## Structural Zones

| Zone    | Background                    | Border                      | Notes                                    |
|---------|-------------------------------|-----------------------------|------------------------------------------|
| Header  | Dark navy (#03045E)           | None / subtle cyan underline | White text, cyan accent on active links  |
| Content | Alternating pale cyan / light blue | Subtle blue borders   | Hero, achievements, timeline, skills     |
| Footer  | Dark navy (#03045E)           | Subtle cyan top accent      | White text, cyan social links            |

## Spacing & Rhythm

Generous 2.5–4rem vertical gaps between sections, 1.5–2rem padding within cards, micro-spacing (0.5–1rem) for typographic breathing room; rhythm created through alternating backgrounds every two sections.

## Component Patterns

- Buttons: Cyan background (#00B4D8), white text, no radius (sharp edges), dark navy hover, smooth transition
- Cards: Glassmorphism with pale cyan border, 12px border-radius, light blue or white background
- Badges: Dark navy background, cyan text, 6px border-radius, no shadow

## Motion

- Entrance: Fade + slide-up over 0.6s ease-out on scroll (section-reveal class), staggered 0.1s per element
- Hover: 4px translateY lift on cards, 0.25s ease transition, subtle shadow deepening
- Decorative: Smooth scroll-to behavior site-wide, no auto-play animations

## Constraints

- No rainbow or gradient-based colors — stick to Ocean Breeze palette
- No border-radius > 16px on cards (maintain sharpness)
- Maintain WCAG AA contrast (L difference ≥ 0.7 between foreground and background)
- Glassmorphism only on cards — no full-page glass effects
- Typography scale bounded to 5 tiers (hero, h2, h3, label, body)

## Signature Detail

Alternating pale cyan and light blue section backgrounds create subtle visual rhythm and depth layering across the portfolio, signaling a methodical, well-organized professional approach — reinforcing the candidate's operational excellence expertise.
