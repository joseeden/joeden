---
title: "Starter Notes"
description: "Starter Notes on LLM"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
sidebar_position: 10
last_update:
  date: 9/21/2024
---


## Overview

<!-- Artificial Intelligence (AI) powers many tools and systems we use today.

- Unlocks phones using facial recognition
- Guides self-driving cars in real time
- Suggests movies, music, and content based on preferences
- Detects fraud and analyzes sentiment in data
- Learns from large datasets to improve decisions -->

AI has moved from handling structured tasks to understanding and generating human language. This shift led to **Large Language Models (LLMs)**, which can read, write, and converse like humans. 

A Large Language Model is mainly defined by two things:

- The training algorithm
- The model parameters (weights)

The training algorithm is the code created by engineers to train the model. The result of that training process is a set of model parameters, also called **weights**.

Together, these determine how the model behaves and generates responses.

<div class='img-center'>

![](/img/docs/all-things-ai-llm-core.png)

</div>


<!-- ## Large Language Models

LLMs use deep learning and NLP to process and generate text like humans.

- Handle tasks such as summarizing, translating, or classifying text
- Train on vast amounts of language data
- Require significant computing resources to function -->

## Training Algorithm

The training algorithm controls how the model learns from data.

- Engineers create the training process
- The model learns patterns from large amounts of text
- The final result is a set of weights

These weights store what the model has learned. When people talk about a "600-billion parameter model", they are referring to the number of weights inside the model.

<div class='img-center'>

![](/img/docs/all-things-ai-model-params.png)

</div>

The training process creates the model, but the weights are what make the model useful after training.

:::info 

They are “large” not just because of size but also because of their ability to understand and produce complex text.

:::


## Models

A model learns patterns and structures from data to make predictions or generate new results.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-11185158.png)

</div>


## How LLMs Generate Text

An LLM works by breaking your input into smaller pieces called tokens and then predicting what token should come next.

1. Tokens are small pieces of text
2. Each token has a unique ID
3. The model predicts the next token based on the input
4. Multiple token candidates are considered
5. Each candidate is assigned a probability
6. The most likely token is usually selected

For example, if the input is:

```text
The sky is
```

The model might generate the following candidates:

| Token   | Probability |
| ------- | ----------- |
| blue    | 45%         |
| clear   | 12%         |
| visible | 21%         |

Since **blue** has the highest probability, it would most likely be selected as the next token.

<div class='img-center'>

![](/img/docs/all-things-ai-model-probabs.png)

</div>

The model then repeats the process using both the original input and the newly generated token. By predicting one token at a time, it gradually builds complete sentences and responses. The probabilities used for these predictions are calculated using the billions of parameters learned during training.


## Language Generators

Several powerful language generators exist today, each with unique strengths.

- The GPT series became popular for human-like responses
- **LexaAI** and **NovaChat** emerged with similar capabilities
- Open-source alternatives continue to grow rapidly

## Real-world Applications 

### Business Opportunities

LLMs offer many ways to improve industries, automate tasks, and create new value.

- Automate repetitive or complex tasks
- Improve efficiency in operations
- Generate new products, services, or revenue streams
- Help companies discover innovative solutions


### Finance

LLMs can process financial information that is often unstructured, such as reports, news, or social media posts.

- Analyze unstructured text like annual reports or market news
- Identify trends and investment opportunities
- Assist in managing portfolios and risk

By understanding large amounts of complex text, LLMs provide actionable insights that help financial decisions become faster and more accurate.

<div class='img-center'>

![](/img/docs/llm-starter-finance.png)

</div>


### Healthcare

LLMs enable healthcare providers to analyze data efficiently while keeping patient privacy, leading to better personalized care.

- Process medical records, lab results, and imaging reports
- Provide personalized treatment suggestions
- Follow privacy laws to protect sensitive patient information

<div class='img-center'>

![](/img/docs/llm-starter-education.png)

</div>

### Education

LLMs can act as interactive tutors that offers personalized learning experiences for students of different levels.

- Answer questions and provide explanations tailored to learners
- Adjust teaching style based on understanding and progress
- Generate custom exercises and examples for practice

<div class='img-center'>

![](/img/docs/llm-starter-education-2.png)

</div>


### Multimodal Applications

LLMs can also handle multiple types of data, not just text.

- Process text, audio, video, and images
- Perform tasks like visual question answering
- Relationships between different types of input

Example: A model can look at a photo of a zebra and answer questions about it, describe the scene, or even add context or humor.

<div class='img-center'>

![](/img/docs/llm-starter-sample.png)

</div>

## Challenges

Language models need to grasp how words connect and relate to capture meaning accurately.

- **Sequence matters**

  - Word order changes meaning
  - Example: "I only follow a healthy lifestyle" vs "Only I follow a healthy lifestyle"

- **Context is key**

  - Words have different meanings depending on surrounding text
  - Models use nearby words to decide the correct meaning
  - Example: "run" can mean jogging, managing, or operating a machine

    <div class='img-center'>
    
    ![](/img/docs/llm-context-is-key.png)
    
    </div>


### Long-Range Dependencies

Some sentences have information spread far apart, which make connections harder to track. Models need to link the distant words.

Consider the example below. Understanding this requires connecting "book" with "was quite heavy"

<div class='img-center'>

![](/img/docs/llm-long-range-dependencies.png)

</div>


### Single-Task vs Multi-Task Learning

Traditional models often focus on one task at a time, while LLMs can handle many tasks together.

- **Single-task learning**

  - Trains separate models for each task
  - Examples: question answering, summarization, translation
  - Requires more resources and limits flexibility

    <div class='img-center'>
    
    ![](/img/docs/llm-single-task-learning.png)
    
    </div>
    

- **Multi-task learning**

  - One model learns multiple tasks at once
  - Improves learning from shared data
  - Can handle unseen data better but may trade some efficiency

    <div class='img-center'>
    
    ![](/img/docs/llm-multi-task-learning.png)
    
    </div>
    


