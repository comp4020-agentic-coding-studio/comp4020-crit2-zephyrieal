# Process overview

This is an unsolicited redesign of [melonDS](https://melonds.kuribo64.net/), a
Nintendo DS/DSi emulator I use and rate highly. The real site is a devlog: a
reverse-chronological feed of dev-diary posts with no onboarding, no separation
between marketing copy and engineering narrative, and the feature list buried
below the fold, disconnected from the blog. A first-time visitor gets no answer
to "what is this, does it run my games, and where do I click." This redesign
pulls that same real content — features, platforms, screenshots, community
links, and the existing blog posts — into a structured site with a clear
hero/features/downloads path, and gives it a distinct visual identity: a dark,
hardware-literal palette and a signature scroll-driven illustration of the DS
itself, whose two screens change what they show as you scroll past each
section — the site's answer to how heavily the real one leans on screenshots.

## The moments that mattered

1. **Picking the subject was the actual hard part.** The brief needs a real
   organisation I like whose site I can honestly criticise, and those two
   constraints fight each other: most open-source projects I rate either
   already have a competent minimal site, or I don't know them well enough to
   argue convincingly about what's missing. melonDS cleared both bars — I've
   used it for years, and its site is a straightforward devlog that's never
   been given an actual front page. That's a scoping decision the repo can't
   show on its own, so it's worth stating here rather than leaving it implied
   by the final result.

2. **The DS device looked broken until I measured it instead of guessing from
   screenshots.** The signature scroll-driven device sticks in a side column
   while the page scrolls, but after wiring it up it vanished completely once
   scrolled past the hero. A first pass at diagnosing this from screenshots
   alone was inconclusive, so instead of re-prompting against the symptom I
   scripted a headless-Chrome check that read `getBoundingClientRect()` and
   `getComputedStyle()` for the grid, its visual column, and the sticky element
   at two scroll positions. That showed the visual column's own box was stuck
   at content height instead of the grid row's full height — `align-items:
   start` on the grid was shrink-wrapping it, so the sticky element ran out of
   room to stick to. Re-running the same script after removing that line
   confirmed the device stayed pinned at both scroll positions, with
   `data-active-variant` correctly following the section underneath it
   ([`42e614e`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-zephyrieal/commit/42e614e)).

3. **The device's screens are labelled as renders, not screenshots, on
   purpose.** It would have been easy to reuse or lightly trace real melonDS
   screenshots for the device's display, but that misrepresents what a visitor
   is looking at on a page explicitly presenting itself as an unofficial
   redesign. Every variant is an abstract SVG illustration, and the component
   says so in its own caption
   ([`0f3c6e4`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-zephyrieal/commit/0f3c6e4)).

## Stack

Astro, the course default for this half. The build is static HTML/CSS with one
small vanilla `IntersectionObserver` script — no framework runtime needed for a
page this shape, and Astro's island-free default keeps it that way.
