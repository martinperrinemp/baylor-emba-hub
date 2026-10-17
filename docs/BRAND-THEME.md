# Baylor/Hankamer-inspired visual system for the unofficial Dallas EMBA cohort hub

**Implemented October 17, 2026.** This is a **student-maintained**, non-Baylor-operated utility website. It borrows the publicly documented visual language of Baylor University's Hankamer School of Business and MBA in Dallas program **without recreating, altering, or using Baylor's protected University Brand Mark or the Hankamer official signature**.

## Colors (official)

| Use | Color | Code |
| --- | --- | --- |
| Primary green, header, emphasis, strong links and AI section | **Baylor Green** | `#154734` |
| Gold stripe, key CTAs, numbered steps, accents | **University Gold** | `#FFB81C` |
| Deep green hero treatment | Green shade used within the visual family | `#0D3526` |
| Warm off-white site background | Neutral supporting surface | `#F7F8F4` |
| White card/background | Neutral supporting surface | `#FFFFFF` |
| Dark green text | Readable neutral-green companion | `#203B2E` |

Baylor's official colors are **not** the muted gold or navy used by the earlier website. We replaced the old blue/slate accents with related green and warm neutral tones and reserved University Gold for visible highlights on contrasting backgrounds. Do not set gold text directly on white backgrounds when small.

## Typography, structure and brand integrity

- Readable **Georgia** headings and **Helvetica/Arial** body text use Baylor's documented *Universal Fonts* (with safe system fallbacks, no proprietary font assets needed).
- A deep-green hero, gold rule, refined program-name heading, clear classmate setup cards, warm white calendar/assignment surfaces and mobile-scrolling navigation create a more polished executive education experience.
- A text-only `28` year badge is a generic class-year design element, **not** an attempted interlocking BU or Hankamer logo.
- Header refers to **MBA in Dallas** and **Hankamer School of Business**, grounded in the official program name. Footer links to the [official Baylor MBA in Dallas program](https://hankamer.baylor.edu/mba/dallas).
- The hero/footer prominently retain **unofficial student-maintained / not operated or endorsed by Baylor University** disclaimers.
- For an actual university or Hankamer signature asset, first obtain the pre-configured approved artwork and appropriate usage authorization; do **not** recreate it with fonts or AI imagery.

## Checks made in source

- Green on white: contrast ratio **10.59:1**.
- Baylor Green background with University Gold text: **6.12:1**.
- Dark-gold kicker on off-white: **6.87:1**.
- Body text on off-white: **11.4:1**.
- No remaining navy/blue color accents in site CSS after palette conversion.
- Website JavaScript syntax intact; all script-referenced element IDs remain present, no duplicate IDs; no assignment data, Google Sheet permissions, or personal files changed.

**Still to test after merge:** verify live Cloudflare deployment and visual appearance on desktop and mobile, including nav scrolling and links. Automated CSS/DOM review alone is not visual sign-off.

## Official public references

- [Baylor official brand colors](https://brand.web.baylor.edu/brand-standards/official-brand-colors)
- [Baylor typography](https://brand.web.baylor.edu/brand-guidelines/fonts-typography)
- [Baylor supporting design colors](https://brand.web.baylor.edu/brand-guidelines/design-colors)
- [Hankamer MBA in Dallas program](https://hankamer.baylor.edu/mba/dallas)
- [University Brand Mark rules](https://brand.web.baylor.edu/brand-standards/university-brand-mark)
- [Official Brand Signature rules](https://brand.web.baylor.edu/brand-standards/official-brand-signatures)
