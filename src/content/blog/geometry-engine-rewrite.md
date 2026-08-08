---
title: "Rewriting the geometry engine pipeline"
date: 2024-03-12
author: "Arisotura"
excerpt: "A deep dive into how the DS's 3D geometry engine actually schedules polygons, and why the old emulation of it was wrong."
tags: ["core", "graphics"]
comments:
  - author: "RSDuck"
    date: 2024-03-12
    body: "This explains a bug I've been chasing for weeks, nice writeup."
  - author: "lifehackerhansol"
    date: 2024-03-13
    body: "Does this affect save states from older builds?"
---

The DS's geometry engine pipelines polygon submission across multiple frames
in a way our old model didn't account for. This post walks through the timing
behaviour we reverse-engineered and how the rewrite changes accuracy for a
handful of commercial titles that relied on the quirk.
