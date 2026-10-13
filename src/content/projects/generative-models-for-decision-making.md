---
kind: area
title: Generative Models for Decision-Making
summary: Using diffusion and energy-based models as policies, planners, samplers, and compositional constraint solvers.
order: 5
publications:
  - jiang2025streaming
  - du2024compositional
  - du2024learning
  - yang2024learning
  - xu2024set
  - yang2023compositional
  - ajay2023is
  - chi2023diffusion
  - janner2022planning
---

Generative models can represent rich, multimodal distributions over actions, trajectories, and
object arrangements. We use them as visuomotor policies, as trajectory planners, and as samplers
inside task and motion planners.

A recurring theme is *composition*: combining several generative models, each capturing one
constraint or concept, so that the system can solve new problems that none of the models was
trained on directly.
