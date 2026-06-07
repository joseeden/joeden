---
title: "Multi-Message Conversations"
description: "Using multiple system messages to create complex conversational structures"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 58
--- 


## Overview

Multi-message conversations let the model remember what was said earlier so the chat can build ideas over time instead of restarting each time. This makes the interaction feel like a real back-and-forth discussion instead of isolated questions. 

They are also useful when the problem is not simple and needs improvement over time.

- Better for complex tasks
- Allows refinement of ideas
- Supports back-and-forth collaboration

Instead of forcing everything into one prompt, the conversation evolves naturally. This helps improve the final result through iteration and feedback.

The key idea is that the model and user can work together step by step instead of trying to get a perfect answer in one go.

:::info

The code examples in this page use the Anthropic API to demonstrate different prompting techniques. Make sure to [set up your API key and environment](/docs/075-Artificial-Intelligence/050-Claude-Code/050-Anthropic-API.md) before running the code.

See the actual code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

:::

## Maintained Context across Turns

The model uses previous messages to understand what is happening in the conversation.

- Remembers earlier messages
- Connects new answers to past context
- Builds consistent responses over time

Each new response is influenced by what was already said, which keeps the conversation coherent and connected. This allows ideas to develop instead of resetting each time.

## When to use 

### Single-message Prompts

Used for simple and direct tasks.

- Quick questions
- Simple translations
- One-time summaries

They work best when the answer is already clear and does not need refinement.

### Multi-message Conversations

Used for tasks that need exploration and iteration.

- Complex problem solving
- Planning and design
- Step-by-step refinement

These allow the conversation to grow over time as new information is added.

## Conversation Memory and Limits

The model remembers conversation history, but only within a limit.

In the example below, the variable `conversation_history` stores previous messages sent to the model using the Anthropic client.

```python
# multi-message-conversation.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

conversation_history = [
    {"role": "user", "content": "Help me plan a blog strategy"},
    {"role": "assistant", "content": "Sure, what audience are you targeting?"},
    {"role": "user", "content": "Beginners in tech"}
]

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    messages=conversation_history + [
        {"role": "user", "content": "Now create a 1-week content plan"}
    ]
)

print(response.content[0].text)
```

Run the script like this:

```bash
python multi-message-conversation.py
```

Expected output:

```markdown
# 1-Week Content Plan for Tech Beginners

## **Monday: Foundation**
- **Topic:** "What is Cloud Computing? (Explained Simply)"
- **Format:** Blog post + simple infographic
- **Goal:** Introduce a common tech concept without jargon

## **Tuesday: How-To**
- **Topic:** "5 Essential Cybersecurity Habits Everyone Should Know"
- **Format:** Step-by-step guide with screenshots
- **Goal:** Provide actionable, practical advice

## **Wednesday: Q&A**
- **Topic:** "Tech Beginners Ask: What's the Difference Between RAM and Storage?"
- **Format:** FAQ-style post
- **Goal:** Address common confusions

## **Thursday: Tools & Resources**
- **Topic:** "Free Tools Every Beginner Should Try (And How to Use Them)"
```

Long conversations may lose older context if they exceed limits, so important details should be kept recent or summarized.

## Example: Iterative Conversation Flow

Multi-turn conversations work by building on previous answers step by step.

For example, a user might first ask for a content strategy, then refine it for beginners, and finally request a schedule. Each step improves clarity and direction.

- Start with a broad idea
- Narrow down the focus
- Produce a final structured output

In the example below, the `conversation_history` variable stores each message in order. The flow shows how a simple request evolves into a structured content plan using multiple turns.

```python
# multi-message-iterative-conversation.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

conversation_history = [
    {
        "role": "user",
        "content": "I want to start a blog about tech"
    },
    {
        "role": "assistant",
        "content": "Good idea. What is your target audience?"
    },
    {
        "role": "user",
        "content": "Beginners who want to learn programming"
    },
    {
        "role": "assistant",
        "content": "Got it. Do you want help with topics or structure?"
    },
    {
        "role": "user",
        "content": "Help me design a 2-week content plan"
    }
]

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=300,
    messages=conversation_history + [
        {
            "role": "user",
            "content": "Now create a simple 2-week blog schedule with daily topics"
        }
    ]
)

print(response.content[0].text)
```

Run:

```bash
python multi-message-iterative-conversation.py
```

Expected output:

```markdown
# 2-Week Blog Schedule for Beginner Programmers

## Week 1: Foundations

**Day 1:** What is Programming? (Overview & why learn it)
**Day 2:** Choosing Your First Language (Python vs JavaScript comparison)
**Day 3:** Setting Up Your Development Environment
**Day 4:** Understanding Variables & Data Types
**Day 5:** Conditionals: If/Else Statements
**Day 6:** Loops: Repeating Code Efficiently
**Day 7:** Functions: Organizing Your Code

## Week 2: Building Skills

**Day 8:** Working with Strings & Text
**Day 9:** Arrays & Lists Explained
**Day 10:** Debugging: Finding & Fixing Errors
**Day 11:** Your First Real Project (Simple Calculator)
**Day 12:** Best Practices for Clean Code
**Day 13:** Resources for Continued Learning
**Day 14:** Beginner Project Showcase (Wrap-up)

**Tips:**
- Include practical code examples in each post
- Add one simple exercise per post
- Consider adding a "common mistakes" section
- Link related posts together

Would you like me to expand on any specific day?
```

Each turn in the conversation adds more clarity, and the final output becomes more structured because earlier context was preserved and refined step by step.


## Best Practices for Multi-Turn Conversations

Good multi-message conversations stay focused and structured.

1. Keep each message focused
2. Reference earlier context when needed
3. Start a new chat for unrelated topics
4. Summarize key decisions when needed

