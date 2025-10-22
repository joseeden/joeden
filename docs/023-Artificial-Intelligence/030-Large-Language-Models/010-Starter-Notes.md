---
title: "Starter Notes"
description: "Starter Notes on LLM"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
sidebar_position: 1
last_update:
  date: 9/21/2024
---


## Overview

Artificial Intelligence (AI) powers many tools and systems we use today.

- Unlocks phones using facial recognition
- Guides self-driving cars in real time
- Suggests movies, music, and content based on preferences
- Detects fraud and analyzes sentiment in data
- Learns from large datasets to improve decisions

AI has moved from handling structured tasks to understanding and generating human language. This shift led to **Large Language Models (LLMs)**, which can read, write, and converse like humans, marking a major step forward in AI capabilities.

## The AI Landscape

AI can be understood as a set of layers, each building on the previous one to create smarter systems.

- **Artificial Intelligence (AI)** is the broad field of creating smart systems
- **Machine Learning (ML)** teaches systems to learn from data
- **Deep Learning (DL)** discovers complex patterns using layered neural networks
- **Natural Language Processing (NLP)** helps computers understand human language

## Large Language Models

LLMs use deep learning and NLP to process and generate text like humans.

- Handle tasks such as summarizing, translating, or classifying text
- Train on vast amounts of language data
- Require significant computing resources to function

They are “large” not just because of size but also because of their ability to understand and produce complex text.

## Models

A model learns patterns and structures from data to make predictions or generate new results.

- LLMs learn from massive text datasets
- Build connections between words, phrases, and meaning
- Use these connections to form responses that sound natural

For example, an LLM learns that words like “rain” and “umbrella” often appear together and uses that to predict context.

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
    


