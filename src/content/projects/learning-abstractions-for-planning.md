---
kind: area
title: Learning Abstractions for Planning
summary: Learning the symbols, operators, and skills that let a robot plan efficiently, from demonstrations, interaction, and language.
order: 2
publications:
  - athalye2026pixels
  - feng2025guided
  - kumar2024practice
  - liu2024learning
  - silver2023predicate
  - kumar2023learning
  - silver2022learning
  - mao2022pdsketch
  - silver2021learning
---

Planners are only as good as the models they plan with. Rather than hand-engineering those models,
we study how a robot can learn them: inventing predicates that describe the state, learning
operators that say what actions do, and learning neuro-symbolic skills that carry out each step.
The result is a *bilevel* planner that searches over learned abstractions and refines them into
continuous behavior.

Recent work learns these abstractions directly from pixels with pretrained vision-language models,
explores efficiently to gather the data that matters most, and has the robot practice in order to
improve its own skills.
