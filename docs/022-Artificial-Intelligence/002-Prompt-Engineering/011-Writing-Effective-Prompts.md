---
title: "Writing Effective Prompts"
description: "Adopting ChatGPT"
tags: [Machine Learning, Artificial Intelligence, Prompt Engineering]
sidebar_position: 11
# last_update:
#   date: 7/7/2022
---


## Garbage In, Garbage Out

The phrase "garbage in, garbage out" aptly applies to ChatGPT. If the prompt is unclear or lacks context, the quality of the response will suffer.

- Clear, well-contextualized prompts are crucial.
- Insufficient context leads to lower quality responses.

## How Does ChatGPT Interpret a Prompt?

Understanding how ChatGPT interprets prompts helps in crafting effective ones. Let's use this example prompt:

```bash
Please write a job description for a data scientist based in New York 
```

Steps:

- **Broad Topic Identification**
  - ChatGPT identifies key phrases like "job description," "data scientist," and "New York."
- **Understand the Request**
  - It recognizes the task from verbs like "write" and additional context from phrases like "data scientist" and "New York."
- **Generate the Response**
  - Based on the prompt, it generates a response but can provide more personalized results with additional details.

## Prompt Engineering

Prompt engineering involves crafting prompts to maximize response quality and relevance. Here are some foundational best practices.

- **Be Clear and Specific**
  - Ensure the prompt contains all necessary context.
  - Specify the desired length of summaries, such as one page, one paragraph, or one sentence.
- **Keep Prompts Concise**
  - Remove unnecessary information that dilutes important keywords.
- **Use Correct Grammar and Spelling**
  - Proper grammar aids in task interpretation.

## Provide Examples if Necessary

Providing examples can enhance the prompt's effectiveness by adding extra context quickly.

- **Example for Specific Format**
  - Request: List customer names, ages, and occupations in a specific format.
  - Instruction: "John Smith, 34, (Builder)."
  - Result: ChatGPT outputs the desired format accurately due to the provided example.