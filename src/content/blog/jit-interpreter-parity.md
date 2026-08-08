---
title: "Keeping the JIT honest against the interpreter"
date: 2023-09-05
author: "RSDuck"
excerpt: "How melonDS keeps its ARM JIT recompiler consistent with the plain interpreter it can fall back to, and why that discipline matters more than raw speed."
tags: ["core", "jit"]
comments:
  - author: "lifehackerhansol"
    date: 2023-09-06
    body: "Good to know the interpreter isn't just legacy code sitting there unused."
  - author: "Jaklyy"
    date: 2023-09-07
    body: "This is why disabling JIT is such a useful first step when a game misbehaves."
---

melonDS emulates the DS's two ARM CPUs two different ways: a plain interpreter
that executes one instruction at a time, and a JIT recompiler that translates
hot blocks of ARM9 and ARM7 code into native machine code ahead of time. Both
have to agree on what a game's code actually does, and that's a harder
guarantee to keep than it sounds.

The interpreter is the reference model. It's slower, but every instruction's
behaviour, timing quirks and all, is written out explicitly and easy to
reason about. The JIT has to match that behaviour while doing far more
aggressive things: batching instructions together, caching translated code,
and skipping work the interpreter would otherwise redo every cycle. When the
two disagree, it's almost never obvious from the symptom alone. A game might
just softlock ten minutes in, or a physics object might drift by a pixel.

The practice that catches most of these is boring but effective: run a
suspect code path through both engines and diff the resulting CPU and memory
state. Most divergences turn out to be timing, an instruction that the
interpreter delays by a cycle in a way the JIT's batching had glossed over.
Fixing it usually means giving up a little of the speed advantage in that one
spot to keep the two engines honest with each other.

That's also why disabling JIT and falling back to the interpreter alone
stays a supported option. It's slower, but it's the one path in melonDS
where "what should happen" and "what does happen" are, by design, the same
piece of code.
