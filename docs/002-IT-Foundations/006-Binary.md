---
title: "Binary"
description: A deeper dive to binary system
sidebar_position: 6
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 3/28/2023
---


## Overview

Imagine a simple light bulb connected to a switch. When the switch is flipped on, the light bulb illuminates, representing the state as one. Conversely, when the switch is off, the light remains unlit, denoting the state as zero.

![](/img/docs/binary8bulbs.png)

Now, expand this concept to eight light bulbs and switches, collectively representing eight bits with each bulb capable of being on (1) or off (0). This binary system traces its origins back to Jacquard's loom, which used punch cards with holes to control the weaving of intricate patterns: a hole signified on, and no hole signified off — a foundational binary concept.

![](/img/docs/binaryjacquardpunchcards.png)


Essentially:
- A hole in the punch card indicated a one.
- Absence of a hole indicated a zero.

By interpreting combinations of these zeros and ones, computers can perform calculations of any magnitude.

Today, binary in computers operates not by reading physical holes but by utilizing transistors that manipulate electrical signals. A presence of electric voltage signifies one, while its absence denotes zero.

## Logic Gates

However, simply having transistors isn't sufficient for computers to perform complex tasks. Consider two light switches controlling a single light: for a well-designed system, flipping either switch should consistently toggle the light's state. This consistency is achieved through logic gates. **Logic gates** allow our transistors to do more complex tasks, like decide where to send electrical signals depending on logical conditions. 

![](/img/docs/binarylogicgatesmotherboard.png)

While there are various types of logic gates, their collective role is essential in modern circuitry to facilitate logical decision-making processes.

## Counting in Binary

Binary serves as the foundational language of computers, used not only for representing text and images but also for intricate tasks like computer networking. Understanding how computers count in binary is fundamental.

Humans typically count using the decimal system (base-10), which utilizes ten digits from 0 to 9. In contrast, binary (base-2) employs only two digits, zero and one, to represent numbers. For instance, numbers like 330, 250, and even 4 million are expressed in decimal, but computers internally represent these values using binary digits.

**How does binary counting work?**

Consider the positional values in binary: 

```
128, 64, 32, 16, 8, 4, 2, 1
```

Each position represents a doubling sequence from right to left. Adding these values together gives the maximum decimal value of 255.

![](/img/docs/binarypositionnumbers.png)


Remember:

- A binary one signifies the "on" state.
- A binary zero signifies the "off" state.

From the image above, the 1, 4, 16, and 64 are on, which when added up totals to 85.  
