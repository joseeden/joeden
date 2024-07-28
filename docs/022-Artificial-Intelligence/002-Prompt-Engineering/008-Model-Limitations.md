---
title: "Model Limitations"
description: "Adopting ChatGPT"
tags: [Machine Learning, Artificial Intelligence, Prompt Engineering]
sidebar_position: 8
# last_update:
#   date: 7/7/2022
---


## Overview

Every model, no matter how advanced, has limitations due to the data it's trained on. Recognizing these helps in crafting prompts that avoid these pitfalls and evaluating outputs critically.

## The Reversal Curse

The reversal curse shows that ChatGPT’s knowledge is often one-dimensional, requiring questions from a specific direction for accurate answers 

- Example: Ask ChatGPT, "Who is Tom Cruise’s mother?" It correctly answers "Mary Lee Pfeiffer"
- Issue: Ask "Who is Mary Lee Pfeiffer’s son?" and ChatGPT may not know

## Biases

Language models learn from extensive internet data and may reflect societal biases

- Example: Asking "Who typically cooks in a household?" might yield a gendered response
- Solution: Encourage neutral responses, recognizing that anyone can perform tasks regardless of gender

## Hallucinations

Hallucinations occur when the model provides inaccurate information confidently.

- Example: "Who was the only survivor of the sinking of the Titanic?" ChatGPT might incorrectly respond with "Violet Jessop"
- Solution: Ask for sources to prompt the model to correct itself. Always cross-reference answers

## Overfitting - Echoing the Data

Overfitting means the model mirrors its training data too closely, reducing its ability to generalize.

- Example: Asking for a joke often results in the same 25 jokes out of many attempts
- Insight: The model struggles with tasks requiring creative leaps, like writing new jokes or scientific hypotheses

Focus on incremental tasks like writing summaries, answering questions, or imitating writing styles using one-shot or few-shot learning techniques
