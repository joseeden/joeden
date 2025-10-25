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

## Transformers

Transformers are key to pre-training and focuses on relationships between words across long sentences.

- Handle large text efficiently
- Capture connections between distant words
- Improve context and meaning in sentences

Transformers were introduced in a research paper titled *“Attention Is All You Need”*, which changed how models learn language.

- Learn how words relate to each other
- Use attention to capture long-range dependencies

It contains four main parts which work together to help the model understand text deeply and generate accurate responses.

- Pre-processing
- Positional encoding 
- Encoders 
- Decoders

## How Transformers Work

Consider the sample input:

```
"Bob, who lives in New York and works as a software"
```

The transformer processes this step by step:

1. Converts the text into numbers
2. Adds word position information
3. Uses encoders to understand meaning
4. Uses decoders to predict the next words

Each step builds on the last, ensuring that the model keeps context and meaning intact.

After processing, the model completes the sentence as:

```
"Bob, who lives in New York and works as a software engineer, loves exploring new restaurants in the city."
```

## Transformer Architecture

### Text Pre-Processing and Representation

Before learning, the text needs to be broken into smaller pieces called **tokens** and represented numerically.

- Breaks sentences into tokens
- Removes unnecessary words and simplifies forms
- Converts tokens into numbers using word embeddings

Example in Python:

```python
from transformers import AutoTokenizer
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
tokens = tokenizer.tokenize("Transformers learn relationships between words.")
print(tokens)
```

Expected output:

```
['transformers', 'learn', 'relationships', 'between', 'words', '.']
```

This process helps the transformer understand sentences as patterns of numbers, and prepares it for deeper processing.


### Positional Encoding

Since word order matters, transformers use positional encoding to give each token a sense of position.

- Adds position information to each word
- Helps the model understand sentence structure
- Keeps relationships between distant words

Without positional encoding, the model would treat:

> “The cat sat on the mat”

the same as:

> “On the mat sat the cat.”


### Encoders

Encoders help the model understand the input sentence through layers of attention and neural networks.

- Use **attention mechanism** to focus on important words
- **Neural networks** process specific features of the input data
- Contain multiple layers that extract meaning
- Pass learned features to the next stage

Encoders help the model understand complex structures, like how “New York” refers to one place, not two separate words.


### Decoders

Decoders take the encoded information and turn it into the final output text.

- Predicts words based on encoded data
- Uses attention to refine predictions
- Builds sentences step by step

Decoders ensure that generated text sounds natural and remains consistent with the original context.


## Long-Range Relationships

Transformers excel at linking distant words that relate to each other.

- Capture meaning across long sentences
- Connect distant phrases for better context
- Improve overall understanding and accuracy

For example, in:

```bash
"Bob, who lives in New York and works as a software engineer, loves exploring new restaurants in the city."
```

The model links *“Bob”* with *“loves exploring new restaurants”* This creates a more complete understanding of the subject.


## Parallel Processing Advantage

Unlike older models that read one word at a time, transformers can process multiple words at once.

- Handle words simultaneously
- Reduce training and response time
- Improve efficiency for large datasets

Consider the sentence:

```bash
"The cat sat on the mat"
```

The transformer can process all the words at once, rather than reading each word one by one.
