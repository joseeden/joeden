---
title: "Attention Mechanisms"
description: "Attention Mechanisms"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
sidebar_position: 20
last_update:
  date: 9/22/2024
---

## Overview

Attention helps models focus on the most important parts of text while ignoring less relevant details.

- Highlights key words in a sentence
- Reduces noise from unnecessary information
- Builds relationships between words

This process allows models to understand meaning more effectively, just as humans focus on key details in a story while ignoring filler content. It uses two ways to focus on text context.

- Self-attention
- Multi-head attention


## Attention Example

Imagine you’re talking in a group conversation. You naturally listen more to the person speaking about the topic that interests you.

- Focus shifts to relevant speakers
- Background noise is ignored
- Key information is remembered

Attention in models works the same way. It filters and focuses only on important input, allowing better comprehension of the entire context.


## Self-Attention

Self-attention helps the model evaluate each word’s importance based on all other words in the sentence.

- Compares every word with every other word
- Assigns a score to show how related they are
- Uses those scores to weigh each word’s meaning

Consider the example: 

```bash
The boy went to the shop to buy the items on his list, and he saw a promo on some of the items he needs. 
```

The model pats more attention to the relevant words:

```bash
boy, shop, items, list, promo 
```

It understand connections like “he” referring to “the boy.” It combines these weighted meanings to form a complete understanding of the sentence.


## Multi-Head Attention

Multi-head attention lets the model look at text from multiple perspectives at once.

- Splits attention into several “heads”
- Each head focuses on a different pattern
- Combines all results for a richer understanding

Consider the sentence:

```bash 
“The boy went to the store to buy some groceries, and he found a discount on his favorite cereal.”
```

Each head captures a different relationship: 

- One head connects “boy” and “he”
- Another links “groceries” and “cereal”
- A third focuses on “store” and “discount”

One head might focus on subjects, another on actions, and another on objects. Together, they help the model understand the entire sentence in context.
