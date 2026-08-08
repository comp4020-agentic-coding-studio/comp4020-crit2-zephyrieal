---
title: "The multiplayer crash that only happened locally"
date: 2025-11-15
author: "Arisotura"
excerpt: "Tracking down a rare crash in local wireless multiplayer that turned out to be a straightforward data race in the input system, fixed for melonDS 1.1."
tags: ["multiplayer", "bugfix"]
comments:
  - author: "RSDuck"
    date: 2025-11-15
    body: "Glad this finally got isolated, that report thread had been open forever."
  - author: "valakituti"
    date: 2025-11-16
    body: "I hit this exact crash pairing a fast machine with a slower one, makes sense now."
---

Local wireless multiplayer has had an intermittent crash report following it
around for a long time: rare, hard to reproduce on demand, and worse on some
hardware pairings than others. That last detail turned out to be the
important clue.

The input system polls keyboard, controller, and touch state on its own
schedule, separate from the thread handling the multiplayer socket
connection between instances. Under normal single-player use, nothing ever
touches that state from two places at once. In multiplayer, the socket
thread reads input state to package into a frame to send to the other
instance, and it was reading it without any synchronisation against the
polling thread writing to it. Most of the time that race resolves harmlessly,
which is exactly why it was so rare to hit and so dependent on the relative
speed of the two machines.

The fix makes the whole input-read path thread-safe, so the socket thread
always sees a consistent, fully-written state rather than whatever happened
to be mid-write. It's not a dramatic rewrite, just a lock around a value that
should have had one from the start, but it's the kind of fix that only shows
up in a race like this: functionally invisible in a single-player session,
and load-bearing the moment two instances start talking to each other.
