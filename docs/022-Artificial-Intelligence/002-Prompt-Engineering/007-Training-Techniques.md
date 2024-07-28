---
title: "Training Techniques"
description: "Adopting ChatGPT"
tags: [Machine Learning, Artificial Intelligence, Prompt Engineering]
sidebar_position: 7
# last_update:
#   date: 7/7/2022
---



## Overview

Training techniques shape how ChatGPT generates answers. Understanding zero-shot, one-shot, and few-shot learning helps you guide the model effectively. These methods vary in the amount of context or examples provided before the main query.

## Techniques 

### Zero-shot Learning

- Asking a question or task without prior examples.
- Relies on pre-training, showing the model's ability to handle novel situations without examples.
- "Write a poem about the tranquility of mountains."

### One-shot Learning

- Providing one example before asking the main question.
- Mirrors human learning, using one example as a template.
- "Mexico City is the capital of the Mexico City. What is the capital of Vatican City?"

### Few-shot Learning

- Giving multiple examples before the main query.
- Builds a nuanced understanding by using examples as building blocks.
- Asking for the capital of Malaysia, formatting with the country’s flag.

## Pattern Matching and Recognition

Few-shot learning turns ChatGPT into a pattern-matching and pattern-generation engine:

- Writing style for emails, formatting preferences for reports, etc.
- Analyzes examples, mirrors patterns, generates new content.
- Extends ChatGPT's capability beyond simple responses to complex tasks.


## Chain of Thought (COT) Prompting

Chain of Thought Prompting (COT) provides a roadmap for answering:
- **Zero-shot COT**: Provide a scenario (e.g., traveling to space and encountering aliens) and prompt "think step by step."
  - **Result**: Thoughtful breakdown, revealing the model's reasoning.
- **One-shot COT**: Provide one example to teach the model the approach.
  - **Example**: Acknowledging the number of astronauts interacted with to prevent errors.

These techniques enhance how you interact with ChatGPT, making it a more effective tool.