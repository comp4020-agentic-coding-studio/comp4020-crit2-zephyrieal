# Crit 2 reflection

**What was the breakthrough that moved the work forward?**

Not a coding problem — finding the subject. The brief asks for a real
organisation you like whose website you genuinely don't, and those pull
against each other more than they look like they would. The open-source
projects I like best mostly already have a clean, deliberate site, because the
people behind them cared enough to make one. The ones with genuinely rough
sites are often ones I don't know well enough to have an honest, specific
opinion about what they're getting wrong — and a vague complaint doesn't
survive being asked about at a crit. melonDS was the one that actually cleared
both bars: I've used it for years, and its site is a plain reverse-chronological
devlog that answers "what changed in March 2024" far better than it answers
"what is this and should I download it." Once I'd committed to that subject,
the rest of the week's decisions — what to restructure, what to keep, what to
add — followed from a genuine complaint instead of an invented one. The lesson
generalises past this one brief: a design problem with real, specific
constraints is a different, easier problem than the same brief attempted
against a vague or invented target.

**What did this change about who I want to be as a developer?**

It sharpened a preference I already had but hadn't been disciplined about:
verify state, don't infer it. When the new scroll-driven device silently broke,
my first instinct was to read the screenshot and guess. The guess was wrong
enough times that I switched to scripting a headless browser to read the
actual computed layout back, and the real cause — a shrink-wrapped grid
column — was obvious in the numbers in a way it never was in a screenshot. I
want that to be the default move, not the fallback one.
