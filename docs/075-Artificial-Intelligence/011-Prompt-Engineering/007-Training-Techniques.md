---
title: "Prompting Techniques"
description: "Techniques for guiding AI model responses through prompts"
tags:
- Machine Learning
- Artificial Intelligence
- Prompt Engineering
sidebar_position: 7
last_update:
  date: 7/12/2023
---


## Overview

Different prompting techniques help guide how a model understands and responds to tasks. Some methods rely on examples, while others guide reasoning or set roles for better output.

- **Zero-shot learning** uses no examples and relies on prior knowledge
- **One-shot learning** uses a single example to guide the response
- **Few-shot learning** uses multiple examples to show patterns

### Zero-shot Learning

Zero-shot learning means giving the model a task without any examples. It relies fully on what the model already knows.

Example:

```bash 
Write a poem about the calmness of mountains.
```

The model uses its Prompting to generate a response without any prior pattern shown.

### One-shot Learning

One-shot learning provides a single example before asking the actual question. This helps the model follow a pattern more easily.

Example:

```bash 
Paris is the capital of France.  
What is the capital of Japan?
```

The model uses the example structure to guide its answer.

### Few-shot Learning

Few-shot learning gives multiple examples so the model can learn a pattern more clearly. This improves consistency in formatting and style.

Example:

```bash 
France – 🇫🇷 Paris  
Germany – 🇩🇪 Berlin  
Japan – 🇯🇵 Tokyo  
What is the capital of Malaysia?
```

The model follows the same format for the new input.


## Pattern Matching and Recognition

Few-shot learning helps the model recognize patterns and repeat them in new outputs.

- Learns formatting styles from examples
- Copies structure for emails or reports
- Generates consistent outputs based on patterns

This makes the model more reliable when working with structured tasks like templates or formatted content.


## Chain of Thought (CoT) Prompting

Chain of Thought prompting helps the model solve problems step by step instead of answering in one step. This improves reasoning for complex tasks.

- Zero-shot CoT uses a simple instruction like “think step by step”
- One-shot CoT provides an example of step-by-step reasoning
- Structured CoT breaks the task into guided steps

In the example below, the model is encouraged to break down the problem before giving the final answer:

```bash 
Write a Python function to check if a number is a palindrome. Think step by step.
```

**Reasoning models don't need explicit COT prompts**

Modern reasoning models are designed to handle step-by-step logic internally. 

They often do not need explicit Chain of Thought prompts.

- Break problems into internal steps automatically
- Self-check intermediate reasoning
- Produce more accurate outputs for coding and logic tasks

This reduces the need for manual step-by-step prompting in many cases.


## System Roles

A system role defines the behavior or identity the model should follow before answering a prompt. It helps shape tone, depth, and style.

- Defines the model’s role in the conversation
- Improves consistency in responses
- Adapts output for different use cases

Example:

```bash 
You are a friendly programming tutor.  
Explain concepts in simple terms with examples and analogies.  
Highlight common mistakes to avoid.
```

In the example above, the system roles:

- System prompt: 

    ```
    You are a friendly programming tutor.
    ```

- User prompt: 

    ```
    Explain concepts in simple terms with examples and analogies. Highlight common mistakes to avoid.
    ```

Another example for debugging:

```bash 
You are a senior software engineer.  
First explain what the code is trying to do.  
Then identify possible issues and suggest fixes.
```
