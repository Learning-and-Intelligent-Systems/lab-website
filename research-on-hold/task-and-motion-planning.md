---
kind: area
title: Integrated Task and Motion Planning
summary: Planning that reasons jointly about which actions to take and the continuous motions, grasps, and placements needed to carry them out.
weight: 1
publications:
  - shen2026tiptop
  - kumar2026openworld
  - shen2025differentiable
  - yang2025guiding
  - yang2023sequencebased
  - holladay2023robust
  - garrett2021integrated
  - garrett2020pddlstream
---

Everyday tasks such as clearing a table or packing a box require a robot to decide *what* to do
(which object to move first, where to put it) and *how* to do it (a collision-free arm motion, a
stable grasp, a feasible placement). Integrated task and motion planning (TAMP) treats these as
one problem: discrete symbolic search over actions, coupled with continuous samplers and
constraint solvers that fill in the geometric details.

Our work develops general-purpose TAMP formalisms and planners such as PDDLStream, makes them fast
enough to use on real robots (for example with GPU-parallel, differentiable optimization), and
extends them to forceful manipulation and open-world settings where goals and constraints come
from natural language.
