---
name: Kinetic Obsidian
colors:
  surface: '#121315'
  surface-dim: '#121315'
  surface-bright: '#38393b'
  surface-container-lowest: '#0d0e10'
  surface-container-low: '#1b1c1e'
  surface-container: '#1f2022'
  surface-container-high: '#292a2c'
  surface-container-highest: '#343537'
  on-surface: '#e3e2e5'
  on-surface-variant: '#c3c9ae'
  inverse-surface: '#e3e2e5'
  inverse-on-surface: '#303033'
  outline: '#8d947a'
  outline-variant: '#434934'
  surface-tint: '#a3d800'
  primary: '#ffffff'
  on-primary: '#263500'
  primary-container: '#bdf529'
  on-primary-container: '#516d00'
  inverse-primary: '#4c6700'
  secondary: '#c6c6cb'
  on-secondary: '#2f3035'
  secondary-container: '#4a4b50'
  on-secondary-container: '#bbbbc1'
  tertiary: '#ffffff'
  on-tertiary: '#2c3039'
  tertiary-container: '#dfe2ed'
  on-tertiary-container: '#61646e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bdf529'
  primary-fixed-dim: '#a3d800'
  on-primary-fixed: '#151f00'
  on-primary-fixed-variant: '#394d00'
  secondary-fixed: '#e2e2e8'
  secondary-fixed-dim: '#c6c6cb'
  on-secondary-fixed: '#1a1c20'
  on-secondary-fixed-variant: '#45474b'
  tertiary-fixed: '#dfe2ed'
  tertiary-fixed-dim: '#c3c6d1'
  on-tertiary-fixed: '#181c23'
  on-tertiary-fixed-variant: '#43474f'
  background: '#121315'
  on-background: '#e3e2e5'
  surface-variant: '#343537'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-performance luxury athletic commerce environment. The aesthetic merges the muscular visual storytelling of modern sports editorial campaigns with the surgical typographic precision, generous spatial rhythm, and material restraint characteristic of premium hardware packaging.

Targeting modern athletes, performance enthusiasts, and style-conscious collectors, the interface conveys momentum, uncompromising engineering, and elevated exclusivity. 

Key stylistic principles:
- **Kinetic Architecture:** High-contrast dark surfaces punctuated by precise, high-visibility neon accents.
- **Editorial Asymmetry:** Dynamic scale jumps between oversized technical typography and meticulous, tabular product metadata.
- **Technical Luxury:** Surfaces remain dark, matte, and monolithic, avoiding decorative noise while utilizing razor-sharp borders and controlled micro-luminescence.

## Colors

The palette operates in strict dark immersion to emphasize product photography and technical metrics:

- **Primary / Accent (`#C6FF35` - Electric Lime):** Reserved strictly for active indicators, primary conversion actions, verified metrics, and vital athletic tags. Used deliberately to avoid visual exhaustion.
- **Base Canvas (`#08090B` - Deep Obsidian):** Monolithic dark ground providing infinite contrast against neon focal points and pure white typography.
- **Structural Surfaces (`#17191D` & `#262A32` - Graphite & Elevated Charcoal):** Used for compartmentalized card units, technical drawers, and structured athletic spec sheets.
- **Border & Stroke (`#2C3038` - Cold Slate Border):** Defines architectural partitions without breaking low-light immersion.
- **Typographic System:** Primary headings and critical titles leverage pure white (`#FFFFFF`). Supporting metadata, category chips, and inactive values use steel grey (`#92969E`).

## Typography

The typographic hierarchy is built on deliberate tension between the kinetic geometry of Space Grotesk and the functional neutrality of Inter:

- **Display & Headings (Space Grotesk):** Applied to campaign slogans, collection titles, and impact metrics. Key titles should utilize uppercase styling with tight negative tracking on desktop sizes to evoke athletic power and speed.
- **Body & Continuous Text (Inter):** Applied across product descriptions, narrative copy, and specs to maintain reading clarity against dark backdrops.
- **Labels, Badges, & Navigation (Space Grotesk):** Uppercase, wide letter-spaced tokens (`label-lg`, `label-md`, `label-sm`) deliver a technical, military-grade spec-sheet cadence.

## Layout & Spacing

The layout model employs a fluid 12-column baseline grid on desktop, transitioning into 6 columns on tablet, and a dense 2-to-4 column system on mobile.

- **Breakpoints:**
  - Mobile: `< 768px` (Fluid stacking, single-column product hero panels, full-bleed scroll snaps).
  - Tablet: `768px – 1024px` (Asymmetric 6-column arrangements).
  - Desktop: `> 1024px` (12-column asymmetric layout with deep margin gutters).
- **Rhythm & Whitespace:** Draw inspiration from editorial spreads. Balance packed data blocks with substantial negative canvas breathing room (`space-xl` and above) around hero imagery to deliver a premium gallery presence.

## Elevation & Depth

Visual depth is achieved through tonal stacking and razor-sharp linear definition rather than heavy drop shadows:

- **Tonal Layers:** Ground level starts at Deep Obsidian (`#08090B`). Cards and content buckets elevate to Graphite Dark (`#17191D`), with hover states and active focus trays sitting at `#262A32`.
- **Low-Contrast Outlines:** Every container tier is separated by crisp, 1px borders using `#2C3038`. No blurred drop shadows are permitted on standard containers.
- **Accent Luminescence:** High-priority focus targets and floating action buttons project a tight, micro-luminous aura: `0 0 24px rgba(198, 255, 53, 0.15)`. This conveys pure electric energy without feeling ambiently diffuse.

## Shapes

The design system adopts a technical, architectural corner profile:

- Standard components, form inputs, category panels, and card frames use a disciplined `0.25rem` (4px) soft corner radius.
- Larger feature modals and promotional hero banners scale to a maximum of `0.5rem` (8px).
- Pill shapes are strictly forbidden for layout containers and cards; they are permitted only for select ultra-compact metric pills or status pills to contrast with structural rectangular grids.

## Components

### Buttons
- **Primary Athletic Action:** Background `#C6FF35`, label `#08090B` (Space Grotesk, bold uppercase), 0.25rem radius. Interactive hover scales brightness with a subtle glow: `box-shadow: 0 0 20px rgba(198, 255, 53, 0.25)`.
- **Secondary / Ghost:** Transparent background with 1px border `#2C3038`, text `#FFFFFF`. Hover triggers border transition to `#FFFFFF` and background to `#1F2228`.
- **Destructive / Alert:** Border `#FF3B30` with matching text; hover shifts to solid crimson with black typography.

### Input Fields
- Background `#17191D`, border 1px `#2C3038`, corner radius 0.25rem.
- Placeholder text in `#92969E`. Focus state drives border to `#C6FF35` with no outer glow.
- Helper labels utilize `label-sm` in all-caps, pinned neatly above the input frame.

### Cards & Product Panels
- Built on `#17191D` backing with a 1px `#2C3038` border.
- Media elements within cards display top-aligned with zero radius bleed.
- Hover states subtly elevate background to `#1F2228` and animate subtle scale transformations on media assets.

### Category Blocks
- Asymmetric rectangular tiles featuring dramatic typography overlays.
- Text labels position strictly along the lower-left baseline, accompanied by electric lime metadata indices (e.g., `[ 01 // RUNNING ]`).

### Chips & Badges
- **Technical Spec Chips:** Rectangular, background `#1F2228`, border 1px `#2C3038`, typography `label-sm` in `#FFFFFF`.
- **Accent / In-Stock Badges:** Border 1px `#C6FF35`, text `#C6FF35`, subtle tinted fill `rgba(198, 255, 53, 0.05)`.

### Selection Controls (Checkboxes & Radios)
- Square-profile check frames with 1px `#2C3038` border on `#17191D`.
- Selected state fills completely with `#C6FF35` featuring an obsidian glyph (`#08090B`).