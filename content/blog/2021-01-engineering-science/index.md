---
title: "The engineering science of embodied intelligence"
date: 2021-01-15
authors: [leslie-pack-kaelbling]
summary: "Cognitive science and neuroscience study the processes by which humans and other animals generate behavior that is intelligent: robust, flexible, and effective at achieving and maintaining the welfare of the individual."
aliases: [/the-engineering-science-of-embodied-intelligence/]   # old WordPress URL
---

## Natural science and engineering science

Cognitive science and neuroscience study the processes by which humans
and other animals generate behavior that is intelligent: robust,
flexible, and effective at achieving and maintaining the welfare of
the individual. Artificial intelligence studies the processes by
which computers can generate behavior that is intelligent: robust,
flexible, and effective at achieving and maintaining the objectives
that its human designers specify.

There has been a complex and fruitful historical interplay between
these fields:

- computational models from AI have been adopted as models of human
  thought; and
- neural models from the study of anatomy and behavior have been
  adopted by or inspired computational models.

A major focus of AI has been *[the engineering science](https://www.nap.edu/read/10403/chapter/8) of
intelligence*: that is, scientific principles by which engineers
can analyze and synthesize machines capable of intelligent behavior.

An overall objective of the LIS research group is to add to the understanding of engineering science, and perhaps also natural science, by developing a methodology for building embodied systems that interact naturally with the physical world. These systems will display many of the critical aspects of natural systems:

- They can operate autonomously over very long time horizons (weeks or months or years).
- They can learn cumulatively, acquiring new abilities over a long time horizon.
- They learn very efficiently from small amounts of data and generalize aggressively from it.
- They are aware of their own uncertainty and act cautiously and safely when they are less sure of themselves.
- They can fall back to basic safe strategies if they get into trouble.
- A single system can operate effectively in a broad range and variety of situations.

To build such systems, we will have to understand the principles of intelligent behavior at a deep level, and add the constraints that the engineers are, themselves, human and need cognitively appropriate sources of design leverage.

We conjecture that modularity and compositionality are the key ingredients both for engineers at the design level and for agents at the behavioral and cognitive levels: *constructing pieces that are reliable and well* *characterized and assembling them using composition methods that are reliable and well characterized* is the key to efficiently learning and reasoning to solve complex problems.

We are exploring the principles of intelligent behavior *constructively*, with a focus on designing and building *intelligent agents* for a variety of settings. An intelligent agent is a system that is connected to an external environment via perception and action, and is engaged in a long-term interaction. Paradigmatic examples of such systems are robots that help in the household or assist in disaster recovery. Some software-only systems (such as a dynamic logistics-management system or an event planner) are also in the scope of intelligent agents, although they are not our primary focus. We believe that interaction with the physical 3D world provides an important set of constraints on the types of learning and reasoning that are required, and that class of problems is, of course, well “impedance-matched” to natural intelligence.

We are working toward designing and implementing an architecture for
intelligent agents and applying it in physical domains; we hope it
will allow us to:

- Develop models, algorithms, and theories for constructing useful artificial intelligence systems;
- Provide systems that may inspire models for natural intelligence;
- Study the ways in which current artificial systems can perform better than natural systems and vice versa; and
- Identify principles of intelligent behavior that generalize over all types of intelligent systems.

### Behaving intelligently in complex physical domains

In order to operate flexibly and effectively in complex real-world domains such as households, construction sites or disaster zones, an agent will have to generalize very broadly over substantial variability in the large-scale layout of the domain (buildings, rooms, streets, plazas) and small-scale arrangement of objects (tools, food items, beams, bricks). It will have to handle complex combinations of objectives, scheduling and prioritizing subgoals, making utility-based tradeoffs, observing global constraints.

Learning methods may be used as a tool for the construction of the agent, but the agent will also need to be able to adapt, learn, and be taught online. It will be critical that it be able to learn from very few examples, absorbing information from explicit demonstrations, general observation, and its own experimentation.

Intelligent agents must be able to handle partial observability, fusing information gathered via multiple modalities over multiple time-scales. It will have to appreciate the value of information and seek it out as needed to achieve its objectives through actions ranging from looking into rooms and cupboards to asking questions.

### Research strategy

There are three major strategies in use by the research community to try to find a solution to the problem of constructing intelligent agents:

- Use engineering tools to design a solution directly;
- Use “meta-engineering”, that is, offline search and learning
  mechanisms motivated by evolution; and
- Study natural intelligent systems and mimic what we learn about
  brains and minds in artificial systems.

The direct engineering approach has been very successful in problems that are relatively narrow and well characterized in advance (the [Boston Dynamics robots](https://www.bostondynamics.com/robots) are a great example of the power of these methods). In more complex problems, engineering has generally been successful in providing the high-level structure of good solutions (such as the structure of a graphical model or an inference algorithm), but less successful at providing details (such as actual probabilities or neural network weights).

Meta-engineering (using learning techniques or evolutionary methods “offline” before the agent is actually behaving in the world) has the potential to learn anything, but can be unrealistically slow and costly. If and when it does succeed, we end up with a high-performance artifact, but do not necessarily gain any insight into the principles of natural intelligence or even, without a substantial and difficult reverse-engineering effort, artificial intelligence.

Neuroscience and cognitive science give us glimpses of insight and
constraint: we are learning more and more at every level, from
low-level neural mechanisms to high-level behavior and aspects of
child development.

We believe that none of these techniques will, individually, yield high-performance engineered artifacts and insights into the engineering science of intelligence. So, our strategy is to use a combination of our best engineering-science understanding of modularity in designed systems and our best natural-science understanding of the modularity and mechanisms in the brain to design an architecture for intelligent agents. The architecture will allow different groups of engineering scientists to design (relatively) independent solutions for modules and make testable predictions about natural systems at multiple levels.

This is a *very* difficult and ill-specified task. We will not get it even close to right the first time. There will have to be constant haggling over both what the modules and interfaces are and what a realistic amount of data and computation are for learning, both during the agent’s lifetime and during the “offline” engineering processes.

The scope of this job is large because we believe it is critical to
embrace (at least most of) the whole problem at once. If we don’t,
then we and others risk developing modules that can never be connected
because they make unrealistic assumptions about the bigger system in
which they will be embedded.

We are ready and willing to use all the tools in the toolbox: we do not restrict ourselves to any particular methodology and expect to combine classical engineering with deep learning and with geometric, logical, and probabilistic reasoning. Each of these methods has its particular strengths and is likely to have a role to play in the overall system.

What will be the products of this enterprise? A broad range of things, ranging from the abstract to the concrete.

- An architecture design, with modules that have input/output specifications, ideas about what to learn and with what training objectives and from what data, and strategies for serial and parallel execution.
- Algorithms for learning and for inference, which will be used both “in the factory” to build an agent and “in the wild” during the agent’s lifetime.
- Theory, including new problem formulations, solution concepts, and proofs of correctness or optimality, subject to computational constraints.
- Implementations of simple instances of the whole architecture and more complex instances of individual modules, tested in simulation and on real robots.

A particularly difficult aspect of an endeavor like this is evaluation. How will we know we are making useful progress? There is no pre-determined data-set, leaderboard, benchmark, or baseline. We will have to develop these as we go. In the end, the evaluation will be empirical: can we built agents with compellingly interesting and seemingly intelligent behavior? If so, then the algorithms and theory underlying them will have proved useful to us and may prove useful as building blocks for others.

### Modules

If our overall objective is to design a modular architecture for intelligence, what might the modules in the architecture be? In this section we try to sketch a set of modules for an instance of the architecture on a mobile-manipulation robot.

<details>
<summary><strong>Perception</strong>: given sensory inputs from one or more modalities, possibly aggregated over a short period of time, output some higher-level hypotheses about the world state. Should also be able to accept “feedback” connections from other modules that provide priming/predictions as well as focus of attention. Examples include: <span>(click to read more…)</span></summary>

- Segmentation: given RGBD input, generate multiple hypotheses about how to decompose a scene into objects.
- Object detection: given RGBD input, as well as priming for categories or locations of interest, generate hypotheses about the presence of objects in the scene, with image bounding boxes or outlines.
- Affordance detection: given RGBD input, find a good spot to sit, or to put something down, or find part of an object that will fit into a hole, etc..

</details>

<details>
<summary><strong>Estimation and memory</strong>: given a history of sensory inputs, possibly over a very long time horizon, aggregate them into representations that will be useful for decision-making. Examples include: <span>(click to read more…)</span></summary>

- Fused point-cloud: relatively high-dimensional integration of depth measurements over time.
- Representation of free space (where the robot has looked) to be used for making safe motions.
- Some form of segmented map that supports both local navigation to a visible target and medium (the MIT campus) and long (Boston) scale navigation with or without the help of external maps.
- “Database” of object instances, tracked over time; requires associating existing hypotheses with new detections, handling transitions, deleting wrong or removed objects, etc. Can include shape and location as well as other parameters like material or center of mass. Objects don’t have to be instances of known classes.
- Representation of information at object class level, including distribution over shapes and other parameters.

</details>

<details>
<summary><strong>Sensori-motor control</strong>: closed-loop controllers that monitor sensory conditions to achieve some local objective in the world; they run until an objective is achieved or abort. Some examples include controllers that: <span>(click to read more…)</span></summary>

- Navigate to configurations relative to visible objects, while avoiding collision and being sure to look at space before moving through it.
- Grasp an object, using visual servoing and force/tactile feedback to robustly acquire and stabilize grasp.
- Move a small amount while grasping or contacting an object to gain information about segmentation and contacts between this and other objects.
- Place an object so that it rests stably on a surface, using visual servoing and force/tactile feedback, verifying stability by testing the release.
- Perform a wide variety of other tasks such as cutting vegetables, pouring liquid, scrubbing a table, sewing, soldering, etc.

</details>

<details>
<summary><strong>Planning and reasoning</strong>: It will be important to include multiple reasoning engines, appropriate to different types of reasoning subproblems, including: <span>(click to read more…)</span></summary>

- Continuous robot motion planning;
- Planning in hybrid discrete and continuous domains, using factored and lifted (abstracted over objects) representations;
- Discrete and continuous constraint-satisfaction solvers;
- MDP solvers for discrete and continuous problems, with a focus on online approximate search-based methods, but possibly including offline methods as well;
- Approximate solution methods for POMDPs, focused on highly approximate online search in belief space;
- Cooperative multi-agent planning for joint action and/or speech acts;
- “Theory of mind” models of other agents in terms of beliefs, desired, and intentions.

</details>

<details>
<summary><strong>Natural language</strong>: Critical for interaction with humans and a reasonable choice for communication with other robots, perhaps. Our default approach would be to view language in a framework of rational speech acts, including: <span>(click to read more…)</span></summary>

- Understanding of utterances in context, including commands, questions, and inform actions.
- Generation of utterances in context, including questions, explanations of action choices, and inform actions.

</details>

<details>
<summary><strong>Intention management</strong>: Given a general high-level objective (e.g., keep the humans in this house happy, or make a lot of paperclips subject to safety constraints) formulate a sequence of subproblems to focus on, by <span>(click to read more…)</span></summary>

- generating subgoals and constraints for planning,
- selecting subsets of space and objects to reason about,
- priming perception and estimation modules with focus-of-attention information, and
- monitoring planning and execution, interrupting when appropriate and changing objectives at different levels of abstraction.

</details>

An additional concern of critical importance, which should pervade
our design choices is the problem of *value alignment*: when we
give an objective to an intelligent agent, how can we be sure that
it’s actually what we want? How can we specify the host of
trade-offs that we would want an agent to make during even one day
inside a household? How should we think about risk aversion and more
complex utility models in this context?

### Learning is pervasive

There is no “learning” module in the list above. That is because learning will be interwoven through the whole system, in a variety of ways. It would be another whole essay (or, really, several) to tell this story in the detail it deserves. Here are some quick thoughts.

First, it’s important to observe that machine-learning methods can play two very different roles: learning about the agent’s external environment (*synthetic learning*) and learning how to reason efficiently (*analytic learning*). Learning of both types will play a critical role.

Second, it’s also important to observe that learning can be a useful engineering tool for the offline construction of parts of the system, as well as a mechanism to enable an individual agent to adapt to its circumstances in during its “lifetime”. Both of these types of learning, as well as meta-learning methods that use offline learning to enhance online learning, will be crucial.

Within this taxonomy, there are an enormous number of representations to learn and mechanisms to learn them. We see a role for them all, ranging from now-classic gradient descent on neural-network weights, through symbolic induction of program structures, to acquisition of whole new perceptual, reasoning, and motor modules. It will be necessary to creatively specify data-sources and loss-functions to enable local, modular learning throughout the system.

### How can we possibly do something like this?

Making progress on understanding intelligence in general, and how to
build large, integrated, highly capable systems, is very hard! In
the study of both artificial and natural intelligence, recent technical
progress has taken place in increasingly fragmented subfields, with
relatively little emphasis on how the parts can be assembled into a
whole. That is for good reason: it is much easier to design,
implement, test, and evaluate a component, or a system focused on a
small set of problems. But that doesn’t mean that at least some of us
should not try to address the bigger questions, even when it’s not
clear what the form of an answer is or how to validate it. Here are
some ideas about how to proceed.

#### Always have a working thing

If our goal is to understand how to build complete systems, then we have to build complete systems, ranging from perception to action; some in simulation and some in the physical world. We can start by building something in which all the parts are not very robust or capable, and that can only do simple things. We should have the goal for all our systems, even for the initial one, that it not give up. That is, it shouldn’t print “planning failed” and halt. It should always engage in rational action-selection, even if the action selected is to seek out a human to ask for help or to deliberately put itself into “safe mode” because every other action seems worse.

#### Natural problems

A great approach for building robust and flexible agents for natural environments is unlikely to be the best approach for playing 3D chess or placing advertisements in network feeds. Focusing on those problems is likely to lead us astray. We will focus on problems that most natural intelligences can solve.

Papert spoke of the [superhuman human fallacy](ftp://publications.ai.mit.edu/ai-publications/pdf/AIM-154.pdf): that AI systems would not be taken seriously or be understood to be intelligent unless and until they outperformed humans. We need to guard, as well, against the “superhuman robot fallacy.” That is, that by trying to make robots work better than humans in some domains, we may end up focused on aspects of intelligent behavior that are not “natural” (such as solving very difficult puzzles) and whose solution doesn’t contribute to addressing aspects of intelligence that are much more ubiquitous and important to overall success, but also more difficult to characterize.

At first, though, the problems will need to be easier. Working on problems that can be solved by animals and human children will be one way to find easier problems. Other ways of making problems easier will have to be scrutinized very carefully, so that we feel confident that solutions to these easier problems will be informative about solutions to harder ones.

Considering tasks that humans typically solve around their houses (cleaning, cooking, taking things out and putting them away) yields a large space of natural problems. The fact that they are physical makes them difficult in some ways but also gives us strong prior constraint on aspects of the world (physical objects, embedded in 3-space, sparsity and locality of effect, etc.). Communicating and working with other humans is also a rich source of natural problems.

### Ongoing research in LIS

On a daily basis, we all work on more focused and less grandiose problems; but the vision of an integrated architecture articulated above helps us prioritize research questions and informs our design choices and motivation for the work. Here is a quick run-down of current and very recently graduated group members and their work.

- [Ferran Alet](http://alet-etal.com/): machine-learning with a focus on meta-learning and combinatorial generalization.
- [Sahit Chintalapudi](http://sahitc.com/): robotics with a focus on skill acquisition.
- [Rohan Chitnis](https://rohanchitnis.com): planning and learning with a focus on constructing abstract models and guided exploration.
- [Aidan Curtis](https://aidanreececurtis.com/): learning for robot task and motion planning. (Co-supervised by Josh Tenenbaum)
- [Yilun Du](https://yilundu.github.io/): learning to construct representations and models for state estimation. (Co-supervised by Josh Tenenbaum)
- [Xiaolin Fang](https://fang-xiaolin.github.io/): learning to reason about perception including occlusion, segmentation, and object-ness.
- [Caelan Garrett](http://web.mit.edu/caelan/): task-and-motion planning for robots and more genrally planning for hybrid systems.
- [Clement Gehring](http://people.csail.mit.edu/gehring/): value-function-based approaches to reinforcement learning, and implicit functions representations.
- [Gustavo Goretkin](https://www.csail.mit.edu/person/gustavo-n-goretkin): robot planning in problems with geometric uncertainty.
- [Rachel Holladay](https://people.csail.mit.edu/rholladay/): planning for robot object manipulation in terms of forces and torques. (Co-supervised by Alberto Rodriguez)
- [Leslie Kaelbling](http://people.csail.mit.edu/lpk): planning in belief space, combining learning and planning.
- [Tomas Lozano-Perez](http://people.csail.mit.edu/tlp): robot task and motion planning, non-prehensile manipulation.
- [Jiayuan Mao](https://jiayuanm.com/): representations for learning about combinatorially and temporally complex domains. (Co-supervised by Josh Tenenbaum)
- [Willie McClinton](https://wmcclinton.github.io/): Construction of state and action hierarchies.
- [Caris Moses](https://www.linkedin.com/in/caris-moses-61b02858/): learning and planning under uncertainty for robot mainpulation;
- [Tom Silver](https://web.mit.edu/tslvr/www/): planning and learning with a focus on generalizing from a small number of examples. (Co-supervised by Josh Tenenbaum)
- [Martin Schneider](https://www.linkedin.com/in/martin-schneider-b247295a/): offline learning of exploration strategies; generalization in online search.
- [Yoonchang Sung](https://yoonchangsung.com/): real-robot experimentations and learning for meta-reasoning.

Very recent group alumni:

- [Kenji Kawaguchi](http://www.mit.edu/~kawaguch/): theory of machine learning, including optimization and generalization.
- [Beomjoon Kim](https://beomjoonkim.github.io): learning to speed up planning for robot task and motion problems.
- [Zi Wang](https://ziw.mit.edu/): efficient information-gathering under uncertainty.

Find out more about the LIS group on the [web](http://lis.csail.mit.edu), [Twitter](https://twitter.com/MIT_LISLab) and [YouTube](https://www.youtube.com/channel/UCrc2tNCabNOI58lRqvGRNzg)!

Thanks to Tom Silver, Ferran Alet, Caelan Garrett, Rohan Chitnis and Tomas Lozano-Perez for insightful ideas and comments that substantially improved this post! Thanks to Jiayuan Mao for setting up the blog and motivation to get it launched!
