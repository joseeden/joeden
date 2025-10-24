---
title: "Pre-Training"
description: "Pre-Training"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
sidebar_position: 16
last_update:
  date: 9/21/2024
---


## Overview

Pre-training is the foundation for building most modern language models. Many teams prefer using pre-trained models instead of building them from scratch because they can save time and resources by simply fine-tuning these models for specific tasks.

- Builds the base understanding of language
- Uses large amounts of text data
- Makes later fine-tuning faster and easier


## Generative Pre-Training

Generative pre-training teaches models to predict words in a sentence based on context. This process helps the model understand how language naturally flows.

- Uses text tokens to learn word relationships
- Predicts missing or next words in a sentence
- Improves fluency and context awareness

Two main techniques used in generative pre-training are:

- Next word prediction
- Masked language modeling


## Next Word Prediction

Next word prediction helps a model learn how to guess what comes next in a sentence.

- Uses supervised learning with labeled examples
- Predicts the next word based on previous words
- Builds a strong sense of context and sentence structure

For example, a model might be trained on this simple dataset:

```python
input_texts = ["The quick brown", "The quick brown fox"]
output_texts = ["fox", "jumps"]
```

During training, the model learns to predict “fox” after “The quick brown” and then uses that result to predict “jumps” after “The quick brown fox.”

<div class='img-center'>

![](/img/docs/ai-llm-next-word.png)

</div>

The more examples a model sees, the better it becomes at predicting the next word.

- Learns from repeated exposure to real sentences
- Builds probability relationships between words
- Generates text one word at a time based on context

Example prompt:

```python
prompt = "I love to eat pizza with"
result = llm.generate(prompt)
print(result)
```

Expected output:

```
cheese
```

The model predicts “cheese” because it has learned from large datasets that “cheese” commonly appears after “pizza.” This simple word association demonstrates how LLMs develop contextual awareness through repeated learning.


## Masked Language Modeling

Masked language modeling works by hiding a word in a sentence and asking the model to guess it.

- Trains by masking random words
- Encourages the model to understand full sentence context
- Strengthens comprehension of word relationships

Example:

```python
sentence = "The quick [MASK] fox jumps over the lazy dog."
prediction = llm.predict_mask(sentence)
print(prediction)
```

Expected output:

```
brown
```

Even though the masked word could be any color, the model predicts “brown” because it has seen that pattern often during training.
