---
kind: area
title: Planning under Uncertainty
summary: Acting well with noisy sensors and partial knowledge of the world, by planning in belief space and gathering information when needed.
weight: 4
publications:
  - curtis2024partially
  - chintalapudi2024bilevel
  - fang2024dimsam
  - fang2024embodied
  - curtis2023taskdirected
  - muguiraiturralde2023visibilityaware
  - garrett2020online
---

Real robots never know the exact state of the world: objects are occluded, poses are uncertain,
and contacts are hard to sense. We model these problems as partially observable decision processes
and plan in *belief space*, reasoning about what the robot knows, what it could learn by looking or
probing, and how much risk an action carries.

Our work spans online replanning for partially observable TAMP, risk-aware planning, exploration of
articulated objects, compliant assembly under uncertainty, and perception that reports its own
uncertainty so the planner can act on it.
