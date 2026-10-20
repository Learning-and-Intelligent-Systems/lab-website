---
kind: area
title: Foundation Models for Planning and Reasoning
summary: Combining large language and vision-language models with planning and constraint solving to tackle long-horizon, open-ended tasks.
weight: 3
publications:
  - kumar2026openworld
  - curtis2025llmguided
  - curtis2024trust
  - silver2024generalized
  - li2024embodied
  - du2024video
  - hsu2023whats
  - silver2022pddl
---

Large pretrained models bring broad knowledge about objects, language, and common sense, but on
their own they struggle with the long-horizon, geometrically constrained reasoning that robots
need. We study how to pair them with structured reasoning: using language models to propose plans,
constraints, or programs that a planner or solver then checks and completes.

This includes generating constraints for task and motion planning, generalized planning in PDDL
domains, inducing probabilistic programs that model partially observable environments, and
benchmarks for evaluating LLMs on embodied decision making.
