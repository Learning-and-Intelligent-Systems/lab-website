---
title: "What’s Your Problem? An Oft-Missing Section in AI Papers"
date: 2023-07-03
authors: [tom-silver]
summary: "Include a Problem Setting section in your next AI paper. It’s worth the word count! And it should be standard in our field."
aliases: [/whats-your-problem-an-oft-missing-section-in-ai-papers/]   # old WordPress URL
---

Include a Problem Setting section in your next AI paper. It’s worth the word count! And it should be standard in our field.

## What’s in a Problem Setting?

Many AI papers propose a new **method** that is meant to **perform well** for a certain class of **problems**. This post focuses on papers of this kind, although others—purely theoretical papers, empirical studies of some phenomenon, benchmark proposals, and so on—may also benefit from a Problem Setting section.

A Problem Setting section should answer three questions:

1. What class of problems is this paper considering?
2. What is the form of a method?
3. How will performance be measured?

The first question is important for potential users. They want to know whether their problem fits into your class. The second question is essential for potential developers of alternative methods. They want to know what design choices they will need to make. The last question is useful not only for paper reviewers who will be scrutinizing performance, but also for casual readers who want to understand your ultimate research objective.

A Problem Setting section is different from a Background section, which provides general context for the reader, but doesn’t necessarily answer the three questions above. It’s also different from a Limitations section, which discusses shortcomings of the specific method proposed in the paper. The Problem Setting should be presented before the proposed method and should give the reader enough information that they can already start to think about how they would design a method themselves.

## A Text-to-Code Litmus Test

Here is a test to check whether your Problem Setting section is clear and complete. After reading the section, ask yourself if your target audience would be able to implement three pieces of code: a `Problem` abstract class, a `Method` abstract class, and a `run` function that takes in a `Problem` and `Method` and returns performance metrics. Note, crucially, that the `Problem` and `Method` classes are abstract, that is, meant to be subclassed later.

The `Problem` abstract class characterizes the class of problems considered in the paper (Question 1). Even for relatively simple and familiar problem classes, like image classification, it is worth being thorough and precise. Are the images grayscale, RGB, RGB-D, or arbitrary N-dimensional arrays? Can their sizes vary? Are the possible classifications fixed and known? Is there a train-validation-test split in the dataset? If these questions are answered in the Problem Setting section, the reader should be able to turn that text into code like the following:

```python
import abc
import time
from dataclasses import dataclass
from typing import List, Set, Tuple

import numpy as np
from numpy.typing import NDArray

GrayImage = NDArray[np.uint8]  # two-dimensional
Label = str  # e.g., "cat"

class Problem(abc.ABC):
  """An image classification dataset."""

  @abc.abstractmethod
  def get_training_data(self) -> List[Tuple[GrayImage, Label]]:
    """Labeled data for training."""

  @abc.abstractmethod
  def get_evaluation_data(self) -> List[Tuple[GrayImage, Label]]:
    """Held-out labeled data for evaluation."""

  @abc.abstractmethod
  def get_image_dims(self) -> Tuple[int, int]:
    """Images assumed the same size, e.g., (32, 32)."""

  @abc.abstractmethod
  def get_all_labels(self) -> Set[Label]:
    """Output classes assumed fixed, e.g., {"cat", "no-cat"}."""
```

The `Method` abstract class characterizes the basic form of methods considered in this work (Question 2). What information is available to the `Method` from the `Problem`? What does the method need to do with that information? Again, even for familiar settings, it is worth being precise enough in writing so that there is no ambiguity when implementing something like this:

```python
class Method(abc.ABC):
  """A method for image classification."""

  @abc.abstractmethod
  def init(self, image_dims: Tuple[int, int], labels: Set[Label]) -> None:
    """Initialize the method before training starts."""

  @abc.abstractmethod
  def train(self, training_data: List[Tuple[GrayImage, Label]]) -> None:
    """Train the method given training data."""

  @abc.abstractmethod
  def predict(self, image: GrayImage) -> Label:
    """Predict the class label for an image."""
```

The `run` function characterizes the interface between problems and methods and determines what performance metrics will ultimately be reported (Question 3). For image classification, the implementation is straightforward, but there are still important choices to be made about metrics of interest; these choices should be clear from the text.

```python
@dataclass
class Metrics:
  """Metrics of interest for image classification."""

  training_time: float
  evaluation_accuracy: float

def run(problem: Problem, method: Method) -> Metrics:
  """Train and evaluate a method on a problem."""
  # Initialization.
  image_dims = problem.get_image_dims()
  labels = problem.get_all_labels()
  method.init(image_dims, labels)
  # Training.
  training_data = problem.get_training_data()
  start_time = time.perf_counter()
  method.train(training_data)
  training_time = time.perf_counter() - start_time
  # Evaluation.
  evaluation_data = problem.get_evaluation_data()
  num_correct = 0
  num_total = 0
  for img, ground_truth_label in evaluation_data:
    num_total += 1
    predicted_label = method.predict(img)
    if ground_truth_label == predicted_label:
      num_correct += 1
  accuracy = num_correct / num_total
  return Metrics(training_time, accuracy)
```

In experiments, the paper will consider different subclasses of `Method` (the new proposed method, baselines, and ablations) and different subclasses of `Problem` (different datasets with train/test splits, different reinforcement learning environments, and so on). If the Problem Setting is coherent, it should be possible to run:

```python
metrics = {}
for problem in problems:
  for method in methods:
    metrics[(problem, method)] = run(problem, method)
```

and then report metrics in the Results section.

The point of this exercise is not for the reader to actually implement anything. But if the reader could implement these two abstract classes and one run function given enough time and motivation, your Problem Setting section has passed this litmus test.

## Content Beyond Code

The litmus test above should be viewed as a *necessary* condition for Problem Setting sections rather than a *sufficient* one. Not all features of a Problem Setting can be captured in code, especially in terms of fully answering Question 1 (“What class of problems is this paper considering?”).

Some additional *semantic* information should be communicated beyond the *syntactic* information checked in the litmus test. For example:

- The grayscale images in the running example above are likely not arbitrary arrays. They might be real or simulated images, captured in structured or unstructured ways, and lightly or heavily curated. They might represent a random subset of images available on the Internet, or a highly specific selection of cartoon giraffes.
- The classification labels may have some level of error. The labels may come from human annotators (expert or non-expert) or from automated scripts.
- Training may be meant to run once, for a long time, on a large computer cluster, or thousands of times, for a short period each time, on embedded devices in the wild. Prediction has similar degrees of freedom.

Semantic information is harder to check for in a Problem Setting section draft, but it is no less important. To make sure your intentions are clear, it can be helpful to ground the setting with one or more concrete examples of problems and methods in your setting. It is also very helpful to compare and contrast your problem setting with ones from previous work.

## Examples of Good Problem Setting Sections

Here are a few examples of very good Problem Setting sections (biased by my reading queue).

*Section 3 of “[Parrot: Data-Driven Behavioral Priors for Reinforcement Learning](https://arxiv.org/pdf/2011.10024.pdf)” by Avi Singh*, Huihan Liu*, Gaoyue Zhou, Albert Yu, Nicholas Rhinehart, Sergey Levine (ICLR 2021).*

This paper does an especially good job articulating their problem class. They characterize their basic setting as a distribution of MDPs, but they don’t stop there—they also describe intuitively and formally what should be true about a distribution for their method to work. They also clearly establish the relationship between their problem setting and other common ones.

*Section 3.1 of “[Policy Improvement by Planning with Gumbel](https://openreview.net/pdf?id=bERaNdoegnO)” by Ivo Danihelka, Arthur Guez, Julian Schrittwieser, David Silver (ICLR 2022).*

This paper’s Problem Setting section has an excellent, succinct description of their objective. I also like that they chose a relatively narrow framing of their problem.

*Section 4 of “[Planning for Learning Object Properties](https://arxiv.org/pdf/2301.06054.pdf)” by Leonardo Lamanna, Luciano Serafini, Mohamadreza Faridghasemnia, Alessandro Saffiotti, Alessandro Saetti, Alfonso Gerevini, Paolo Traverso (AAAI 2023).*

This paper has another very succinct problem definition that contains all of the essential information. The form of a method is clear from their description of what happens during online training and evaluation.

*Section 2 of “[Embodied Active Learning of Relational State Abstractions for Bilevel Planning](https://arxiv.org/pdf/2303.04912.pdf)” by Amber Li, Tom Silver (CoLLAs 2023).*

Obviously, I am biased here! But I think Amber’s paper does a great job communicating a highly involved problem setting. The textual description is aided by a diagram (Figure 2).

*Section 3 of “[Intent-Aware Planning in Heterogeneous Traffic via Distributed Multi-Agent Reinforcement Learning](https://arxiv.org/pdf/2306.06236.pdf)” by Xiyang Wu, Rohan Chandra, Tianrui Guan, Amrit Singh Bedi, Dinesh Manocha (CoRL 2023).*

I don’t envy the writers of this paper—they had a very complex problem setting to describe! But they found a way to do so clearly. They started with a high-level description and then made it crisp with notation. There is a lot of notation, but in this case, I think it is necessary and helpful.

## Conclusion

I didn’t share examples of bad Problem Setting sections because they are uncommon. The far more common occurrence is that a paper has no Problem Setting section at all. How many hours have been spent by AI paper readers trying to infer a paper’s Problem Setting from clues scattered throughout the paper? We can get back this time, and improve reproducibility in the process! Let’s resolve to add a PS to [IMRAD](https://en.wikipedia.org/wiki/IMRAD)—let’s make Problem Settings a standard section in AI papers.

## Acknowledgements

Thanks to Leslie Kaelbling and Nishanth Kumar for providing feedback on a draft of this post, and to Rohan Chitnis, who taught me to love the Problem Setting and the API view of it!
