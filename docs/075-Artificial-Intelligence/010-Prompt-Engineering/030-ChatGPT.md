---
title: "ChatGPT"
description: "Adopting ChatGPT"
tags:
- Machine Learning
- Artificial Intelligence
- Prompt Engineering
sidebar_position: 30
last_update:
  date: 7/10/2023
---

## Overview

ChatGPT by OpenAI is a chatbot that can answer questions, explain ideas, and help with tasks based on what you type. Instead of choosing from fixed replies like traditional chatbots, it generates responses using its understanding of language.

At a high level, it works like this:

- **Prompt and response flow**

  - You provide a prompt (a question or instruction)
  - ChatGPT interprets the prompt
  - It generates a response based on what it understands

- **Generative AI approach**

  - Creates new content based on learned patterns
  - Uses large amounts of existing data as reference
  - Produces responses that are context-aware rather than fixed

Common Uses:

- **Summarizing and explaining**

  - Breaks down complex ideas into simpler terms
  - Helps create concise summaries
  - Useful for quick understanding of long content

- **Content creation**

  - Assists with emails, posts, and basic marketing content
  - Supports editing and rewriting
  - Helps improve tone and clarity

- **Coding support**

  - Generates sample or template code
  - Explains errors
  - Suggests improvements and alternatives

## How It Works (LLM)

ChatGPT runs on a large language model (LLM). It reads your prompt, understands the context, and predicts what comes next in a way that makes sense.

A simple way to think about it is like completing a wall made of blocks. Given part of the wall, it continues building in the same style so everything fits together.

- **Language understanding**

  - Identifies relationships between words and ideas
  - Maintains context within a conversation
  - Adjusts responses based on the prompt

- **Training process**

  - Learned from large text datasets
  - Recognizes patterns using advanced algorithms
  - Builds an understanding of language structure

- **Refinement**

  - Tuned to produce more useful responses
  - Focused on improving relevance and clarity

## Evaluating Responses (LARF)

ChatGPT is useful, but it is not always correct. You should still review its responses, especially for important tasks.

A simple way to check quality is **LARF**:

| Criteria            | Description                                      | Example                                                                  | What’s Wrong / Correct                                               |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| Logical consistency | Response makes sense and follows clear reasoning | “Solar energy is low maintenance, but requires constant daily upkeep.”   | Contradicts itself. “Low maintenance” and “constant upkeep” conflict |
| Accuracy            | Information is correct and not misleading        | “The capital of Australia is Sydney.”                                    | Incorrect. The correct answer is Canberra                            |
| Relevance           | Response answers the actual question             | Q: “Top attractions in Paris?” → A: “The Great Wall of China is famous.” | Irrelevant. The answer does not address the location asked           |
| Factual correctness | Claims match verified facts                      | “The first person on the moon was Buzz Aldrin.”                          | Factually wrong. The correct answer is Neil Armstrong                |

- **Logical consistency**

  - The response should not contradict itself
  - The reasoning should be clear and structured

- **Accuracy and hallucination**

  - It may give confident but incorrect answers
  - Errors may not be obvious at first glance
  - Always verify important information

- **Relevance**

  - The response should stay on topic
  - Extra or unrelated details reduce usefulness

- **Factual correctness**

  - Claims should be based on verified facts
  - Avoid accepting information without checking sources

## Limitations

Although ChatGPT is a powerful tool with a wide range of capabilities, it has some important limits:

- **Knowledge cutoff**

  - It may not know recent events or updates
  - Information depends on its training data
  - It may miss newer developments

- **Bias in training data**

  - Trained on diverse text sources, potentially containing biases
  - These biases can lead to biased responses

- **Context limits**

  - Long or mixed-topic chats can reduce accuracy
  - It may lose track of earlier details
  - Switching topics too often can confuse responses

- **Hallucination**

  - Can generate incorrect information confidently
  - May sound convincing even when wrong
  - Requires validation from reliable sources

- **Legal and Ethical Considerations**

  - Ownership unclear: user, original artist, or OpenAI?
  - Properly scoping use cases helps avoid legal gray areas

## Augmenting Workflows

Workflows improve over time to produce better results more efficiently. Many repetitive steps can now be handled by ChatGPT, which helps save time and improve output.

<div class='img-center'>

![](/img/docs/chatgpt-Augmenting-workflow.png)

</div>

For example, summarizing a 30-page project document usually involves manually extracting key points and proofreading, which takes time and effort. With ChatGPT, you can generate a draft summary and then review it. This reduces effort while letting you focus on more meaningful work.

**Human review still needed** 

ChatGPT can assist but should not replace human judgment. Always review and verify outputs, especially for critical tasks

## Validating a Use Case

When considering ChatGPT for a specific use case, several factors must be evaluated to ensure its suitability.

- **Verification Ability**

  - Assess if the response quality can be verified.
  - Subject matter expertise is crucial for evaluating ChatGPT's outputs.
  - Avoid using ChatGPT for tasks you couldn't verify yourself.

- **Sensitivity of Data**

  - Check if sensitive data is involved (personal info, source code).
  - Requires consent and compliance with GDPR, CCPA.
  - Seek legal counsel for sensitive data use cases.

- **Ownership Requirements**

  - Assess if ownership is needed, especially for revenue generation.
  - Users can claim ownership if compliant with OpenAI's terms, but copyright issues may arise.
  - Proceed with testing if ownership is not required.

- **Accuracy Requirements**

  - Determine if a high degree of accuracy is needed.
  - ChatGPT can be inaccurate and unpredictable.
  - ChatGPT can provide different responses to the same prompt.
  - If certainty is required, ChatGPT is not suitable.
  - Not suitable for government policy advisory, legal advice, or medical diagnosis.

Diagram:

<div class='img-center'>

![](/img/docs/chatgpt-validating-use-case.png)

</div>



## Prompt Basics

Prompt engineering involves crafting prompts to maximize response quality and relevance. Here are some foundational best practices.

- **Clarity and context**

  - Be specific about what you want
  - Include enough detail to guide the response
  - Define the expected outcome

- **Conciseness**

  - Remove unnecessary or distracting information
  - Focus on key instructions

- **Language quality**

  - Use clear wording and correct grammar
  - Helps the model interpret your intent correctly

- **Using examples**

  - Provide sample formats when needed
  - Helps guide the structure of the output
  - Reduces ambiguity

## Garbage In, Garbage Out

The phrase "garbage in, garbage out" aptly applies to ChatGPT. If the prompt is unclear or lacks context, the quality of the response will suffer.

- **Impact of prompt quality**

  - Vague prompts lead to vague answers
  - Clear prompts lead to better results

- **Improving results**

  - Add relevant details and constraints
  - Specify format, tone, or length
  - Refine prompts iteratively

In the example below, the prompt is vague and lacks context, which can result in a less useful response:

```
Please write a job description for a data scientist based in New York 
```

A better prompt provides more context and specific instructions:

```
Please write a job description for a data scientist based in New York. The role requires 3-5 years of experience in machine learning, proficiency in Python, and strong communication skills. The job description should be concise and highlight the key responsibilities and qualifications.
```

## Guide Responses with Examples

When a prompt needs a specific format or style, providing an example helps guide the response. It gives ChatGPT a clear pattern to follow, which reduces ambiguity and improves consistency.

```
Request: What you want ChatGPT to do  

Instruction: Any specific rules, format, or constraints  

Result: An example of the expected output  
```

Example:

```
Request: List customer details

Instruction: Format as Name, Age, Occupation

Result: John Smith, 34, Engineer  
```

By showing a sample result, you make it easier for ChatGPT to match your expectations and produce more accurate responses.



## Ownership and Privacy 

When using ChatGPT, keep ownership and data privacy in mind:

- **Content ownership**

  - Generated content may not always be fully original
  - Similar outputs may exist elsewhere
  - Review for potential copyright concerns

- **Data privacy**

  - Avoid sharing sensitive or confidential information
  - Understand how your data may be processed

- **Compliance and ethics**

  - Follow data protection laws such as GDPR
  - Use AI responsibly and transparently
  - Consider ethical implications of usage
