---
title: "Postmodern robotics"
date: 2026-11-23
authors: [leslie-pack-kaelbling]
summary: "The intellectual landscape in robotics is changing, quickly, out from under both academic and industry researchers. Problems long thought to be foundational or nearly impossible seem to be falling daily to agentic LLMs like Astra and Opus. What remains for us to do?"
---

The intellectual landscape in robotics is changing, quickly, out from under both academic and industry researchers. Problems long thought to be foundational or nearly impossible seem to be falling daily to agentic LLMs like Astra and Opus. What remains for us to do?

I want to start by establishing some terminology, then talk about some ideas about what is behind this sudden progress, and end by outlining a list of research problems that I believe remain open and important.

## What is a model?

The zoo of models around us is expanding and the word has become all but useless due to a lack of specificity. Yet we have a serious need to be clear in our communication. Here is one potential glossary:

- Neural network model (NN): some parametric computation graph generally fit to data using gradient descent
- Language model (LLM): a NN that maps input token sequences to output token sequences, possibly augmented with the ability to add recursive computational power by writing and reading its own intermediate token streams (often called “thinking”)
- Agentic LLM (ALM): an LLM that has a set of computer programs, called tools, that it can call; it decides to call them during the thinking process and uses their results to inform further thinking
- Vision language model (VLM): an LLM that integrates language and image processing; now often called an MLLM (multimodal LLM); although it needn’t be the case, most ALMs are also multi-modal
- World model (WM): what robotics people used to call a “transition model”; it’s a NN that maps from some representation of the world state and an action description (possibly in language, possibly low-level) into the next world state or a sequence of them
- Video world model: a world model that produces image sequences
- Vision-language-action model (VLA): a VLM that has been extended to produce robot control commands; also called a large behavior model (LBM) although LBMs do not necessarily have the ability to condition on language
- World action model (WAM): a combined VLA and WAM, which produces both predicted next states and robot control commands

## What models should we use for our problem?

The answer is that it depends critically on what your problem is. Different “niches” in robotics require very different solutions, ranging from very specific jobs inside a factory, to more flexible operations in warehousing or home delivery, to serving as a general-purpose hospital orderly or household butler.

*Known niche*: For an application with a known, relatively narrow, niche, we have two basic strategies. One is to collect expert demonstrations, mapping observations to actions, and use them for supervised training (“behavior cloning”) of an LBM or VLA, typically starting with a VLM “backbone” (that is, a fixed pretrained network that is already good at understanding images and language). The other is to build a simulator for the domain and use reinforcement-learning to find a policy, usually in the form of a NN mapping visual observations to robot actions. Of course, there are a lot of variations, combinations and nuances possible.

*Pretraining for generality*: Expert demonstrations of a specific task in particular circumstances are very costly to acquire, and training a VLA from a basic backbone can require a very large amount of data. One way to reduce this difficulty is to pretrain a VLA from a very large amount of data from a variety of robots doing a wide variety of tasks in highly variable circumstances. The model resulting from this pretraining won’t necessarily be very good at any of these jobs, but it can serve as a great starting point, so that it’s possible to train a robust model for a new niche from much less data.

*“Zero-shot” generality (ZSG)*: The science-fiction vision of intelligent robots doesn’t involve learning from large amounts of data. Rather, the robot is expected to have (at least) human-level physical and cognitive intelligence from the beginning of its deployment, and therefore be ready to do almost anything almost anywhere. This capacity is called “zero-shot” in an awkward retronym derived from the idea of “one-shot” learning from a single example; it means simply inferring what to do without any *task-specific* data. LLMs and ALMs now have incredible zero-shot generality in most text-based domains of human interaction and ALMs are starting to demonstrate it in real robotics problems, as well.

*Learning during deployment*: Generally, we would like any deployed robot to be able to learn from its mistakes, adapt to environmental changes, and even be teachable. Mechanisms for such “lifelong learning” have not yet had major success, generally because it is difficult to make local, incremental changes to a neural network model. However, LLMs have an astonishing ability to do “in-context learning” (ICL): that is, modify their understanding and behavior from data that is provided to them as part of their input sequence. Recently, VLAs have been extended to perform ICL on a long history of actions and observations, as well. LLMs can store their conclusions in text files for later consumption, which can be more efficient and general than storing the result of learning in neural network weights. These capabilities are critical for generally intelligent robots.

## Why are ALMs so good at ZSG robotics?

VLAs and LBMs are making great strides and show promise for a wide variety of real robot applications, with the ability to post-train on relatively small amounts of data and generate robust, efficient policies. They are not so strong at zero-shot generality, and I believe there are reasons why such an approach cannot, on its own, give us ZSG robots.

In the past year, ALMs have made enormous strides, demonstrating super-human abilities at math, coding, and science problems. In summer 2026, GPT6-Astra was released, and shortly thereafter came a series of videos showing its astonishing performance on ZSG robot-manipulation problems. With no specialized data or instruction, given a camera view of a tabletop scene and an instruction, it can carry out a surprising range of problems, ranging from multi-step object rearrangement to non-prehensile interaction such as manipulating plastic trash bags.

Why might this be? Below I outline four contributing factors, in the order of my own view of their importance.

- *Knowledge*: Modern ALMs have been trained on the whole internet and in some sense “know” all of human knowledge. They understand what an eraser is, know formal models of basic physics, and can predict human purposes and preferences.
- *Recursive computation*: Agentic LMs operate explicitly in the world of computation. They can write their own code, call other computer programs, use those results to write other programs, etc. This capacity lets them make long-horizon plans, for both thinking and acting as well as to immediately leverage any computational tools they have access to.
- *Robotics tools*: for the past 75 years, roboticists have been making great headway on problems of robotics and have codified these developments in software tools, ranging from high-bandwidth motor controllers to kinematics models to motion planners to reinforcement-learning algorithms. ALMs, when given these tools, leverage them to great effect. In particular, given a physical simulator, an ALM can debug robot code just as it can debug regular code using a language interpreter.
- *Embodied data*: a large amount of image-sequence data as well as some actual data that connects images to robot actions for relatively standard robot manipulation problems was reportedly used in training Astra. This data, along with analytical knowledge, has combined to enable much deeper spatial understanding which is a substantial contribution to ZSG.

## What remains for us to work on?

There is a long distance between the glimmers of ZSG in the recent demonstrations and a truly useful, general robot. I don’t think that robot data is the key to reducing this distance. I think the crucial ingredients are architecture, tools, and deployment constraints.

The “cognitive architecture” of a robot is a set of computational modules, usually understood to be running in parallel, possibly at different rates, ranging from sensorimotor controllers to the most abstract planning and thought. Current deployments of ALMs on robots tend to fall into one of two structures:

- Direct control: The ALM is the main loop of the robot’s cognitive process, taking instructions, making observations, computing, calling motor controllers, re-observing, until the goal it was given is achieved.
- Pre-coding: The ALM is given an instruction and is charged with producing a policy in the form of a computer program that will run in closed loop and achieve that instruction in the world; for this to be effective, the ALM needs access to a reasonably accurate simulator and needs tools or training to be able to do “real to sim” processing to instantiate the simulator.

A serious concern about both of these approaches is computation speed. Currently, both approaches can take many minutes or even a few hours to solve their problem. In the pre-coding model, the computational work may be amortized over multiple executions of the resulting program, but care needs to be taken to ensure that the program is sufficiently general to be re-used in new circumstances.

Going forward, we need to design richer cognitive architectures, with

- asynchronous parallel computational processes at multiple time scales: for example, building and consolidating memories, monitoring and reacting to dynamic aspects of the physical world (traffic, a boiling pot, an alarm), etc.
- computational resource rationality: being able to flexibly and dynamically allocate computational attention to the currently most critical aspects of the world around us and our decision problems, making the most of what is necessarily a limited budget of computation available to the agent in a highly dynamic world

The computational toolset available to an ALM has an enormous impact on the ALM’s ultimate generality and effectiveness. It is much more efficient to “cache” some special purpose but common computations in code libraries and pretrained NNs than to force the ALM to reinvent them, slowly, expensively and perhaps buggily, time after time. In particular, I think we need to focus on designing and building tools for:

- Building and maintaining persistent memories about people, places, and things
- Behaving rationally in the face of significant uncertainty about the world and the objective
- Planning and reasoning when there are time-constraints due to the world’s dynamics

Finally, we need to be able to deploy ZSG robots in the world, safely and practically. There is theoretical and practical work on low-level robot safety and some on the safety of high-level reasoning. But an architecture design should come with some forms of (non-absolute) guarantees on the robot’s safe interaction with the world around it. How to provide any kind of performance guarantee for a multi-process, largely learned system is a critical research question. In addition, there are many cases in which we will need robots to continue operating when they are disconnected: from rescue operators, from GPS, from the internet, etc. Such systems may need to be able to cache local models and revert to basic operations in an emergency.

So, the current pace of improvement in robotics is amazing but there is still a lot for us to figure out!

## Postscript

I have omitted a discussion of hardware improvements: they are absolutely crucial, but I have no expertise in that area so I’ll let others speak to that.

I was inspired to write this by Yuyao Liu and strongly informed by conversations with Yuyao, Jiayuan Mao, David Hsu, Weirui Ye, and Tomas Lozano-Perez. All errors are my own. All words are also my own.
