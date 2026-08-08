---
title: "Giving DSi games their voice back"
date: 2025-11-20
author: "Arisotura"
excerpt: "DSi titles lean on a dedicated audio DSP that melonDS didn't emulate at all until 1.1. Here's what high-level emulation of it took, and what still doesn't sound quite right."
tags: ["dsi", "audio"]
comments:
  - author: "lifehackerhansol"
    date: 2025-11-20
    body: "Been waiting on this one for a while, great to see it land."
  - author: "ZyEnDe"
    date: 2025-11-21
    body: "Does this cover every DSi title that uses the DSP, or just the common ones?"
---

The DSi adds a small Teak coprocessor purely for audio: games hand it raw
samples and it applies effects like reverb before the result reaches the
speakers. melonDS's DSi support had, until now, quietly skipped it. Games
still played, just without whatever that chip was supposed to be doing to
the sound.

Emulating the DSP properly, running its actual instruction set cycle for
cycle, is a much bigger undertaking than the payoff justifies right now: it's
under-documented, and the games leaning on it are a small slice of the DSi
library. So melonDS 1.1 takes the high-level route instead. Rather than
executing the DSP's program, it recognises the small set of known effect
programs commercial games actually load onto it and reproduces their
output directly.

That trade-off is exactly why microphone input landed in the same release.
Both are DSi-side audio features that only became worth finishing once
there was a decent baseline for the sound pipeline they run through to
build on.

The honest caveat: high-level emulation only covers programs it recognises.
A game running an unusual or hand-rolled DSP program will still be silent
on that front. It's a reasonable trade for now, most games use one of a
handful of standard effect chains, but it isn't the same guarantee the CPU
and video emulation give you.
