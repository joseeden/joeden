---
title: "System Messages"
description: "Using system messages to control Claude Code's behavior"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 55
--- 


## Overview

System messages define how the model should behave throughout the entire conversation.

- Sets long-term behavior
- Defines tone and style
- Applies rules and constraints
- Assigns a specific role

A system message only needs to be provided once. It stays active for the entire chat and helps keep responses consistent.

A good system message gives the model a clear identity, clear boundaries, and clear expectations. This helps produce more reliable results throughout the conversation.

:::info

The code examples in this page use the Anthropic API to demonstrate different prompting techniques. Make sure to [set up your API key and environment](/docs/075-Artificial-Intelligence/050-Claude-Code/050-Anthropic-API.md) before running the code.

See the actual code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

:::

## Effective System Prompts

Clear instructions work better than vague instructions.

- Be specific
- Define a role
- Set constraints
- Explain the desired output

A weak prompt provides very little guidance. 

```text
Be helpful
```

A stronger prompt gives the model a specific role, a writing style, length limits, and clear expectations.

```text
You are a technical writer.

Write in active voice.
Keep responses under 100 words.
Provide actionable advice.
```

The more specific the instructions, the more consistent the output will be.

In the example below, the `system_message` variable defines a technical writer role with specific requirements.

```python
## sys-msg-defining-a-role.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = """
You are a technical writer.

Write in active voice.
Keep responses under 100 words.
Provide actionable advice.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": "How can I improve API documentation?"
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-defining-a-role.py
```

Output:

> Document every endpoint clearly and include request and response examples. Use consistent naming and explain error codes. Keep descriptions concise and update documentation whenever the API changes.

Specific instructions help produce more focused and consistent results.

## Common System Message Patterns

Different system prompt patterns are used to control how a model behaves in different ways.

| Pattern                  | Short description                                 | Common use                                         |
| ------------------------ | ------------------------------------------------- | -------------------------------------------------- |
| Role-based prompts       | Assigns a specific identity or job to the model   | Customer support bot, technical writer, tutor      |
| Constraint-based prompts | Sets strict rules on format, length, or structure | Fixed bullet outputs, JSON formatting, word limits |
| Tone-based prompts       | Controls writing style and personality            | Friendly replies, professional tone, casual chat   |
| Task-specific prompts    | Gives instructions for a specific job or workflow | Code debugging, summarization, data extraction     |

These patterns are often combined together to create more controlled and predictable AI behavior.


### Role-based Prompt

A role-based prompt gives the model a specific identity.

In the example below, the `system_message` variable makes the model behave like a customer support agent.

```python
## sys-msg-role-based.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = "You are a customer support agent."

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": "My order has not arrived."
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-role-based.py
```

Output:

```text
I'd be happy to help you with your order. 
To better assist you, could you please provide me with:

1. **Your order number** (usually found in your confirmation email)
2. **The expected delivery date** from your tracking information
3. **Your shipping address** (or at least the city/state)

With this information, I can:
- Check on your order status
- Provide tracking details
- Determine if there's been a delay
```

The assigned role influences how the model responds.

### Constraint-based Prompt

A constraint-based prompt controls the output format.

In the example below, the `system_message` variable limits the response to exactly three bullet points.

```python
## sys-msg-constraint-based.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = "Respond with exactly 3 bullet points."

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": "Benefits of backups"
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-constraint-based.py
```

Output:

> Benefits of Backups
> 
> • **Protection Against Data Loss** - Backups safeguard your important files and information against accidental deletion, hardware failure, malware attacks, and natural disasters, ensuring you don't lose critical data permanently.
> 
> • **Business Continuity** - Regular backups enable quick recovery and minimize downtime, allowing organizations to resume operations rapidly after incidents and maintain productivity without significant interruptions.
> 
> • **Compliance and Legal Requirements** - Many industries require regular backups to meet regulatory standards and ensure data integrity.

Constraints help enforce a consistent format.

### Tone-based Prompt

A tone-based prompt controls writing style and personality.

In the example below, the `system_message` variable requests an enthusiastic tone.

```python
## sys-msg-tone-based.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = "Use an enthusiastic tone."

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": "Tell me about cloud computing."
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-tone-based.py
```

Output:

> Cloud computing is absolutely **transformative** technology that's revolutionizing how we work and store data! 
> 
> Instead of storing data and running applications on your personal computer or local server, cloud computing lets you access computing resources—like storage, processing power, and software—over the internet from remote servers. It's like having a powerful computer in the sky!
> 
> With cloud computing, you can easily scale up or down your resources based on demand, collaborate with teams around the world, and access your data from anywhere. It's a game-changer for businesses and individuals alike!

The tone changes while the information remains similar.

### Task-specific Prompt

A task-specific prompt provides instructions for a particular job.

In the example below, the `system_message` variable tells the model to focus on debugging.

```python
## sys-msg-task-specific.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = """
You are a debugging assistant.

Identify bugs.
Suggest fixes.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": "Why does x = 1/0 fail in Python?"
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-task-specific.py
```

Output:

```text
Division by Zero Error:
In Python, `x = 1/0` fails because **you cannot divide a number by zero** — it's mathematically undefined.

Why It Happens:
- Division by zero has no valid mathematical result
- Python raises a `ZeroDivisionError` exception to prevent invalid calculations

Fix:
Ensure the denominator is not zero before performing the division.
```

Task-specific instructions help the model focus on a particular type of work.

## Testing and Improving System Messages

Most system messages need refinement before they work consistently.

- Test different inputs
- Look for unexpected behavior
- Refine unclear instructions
- Monitor response quality

In the example below, the `vague_system` variable produces less predictable output than the `improved_system` variable.

```python
## sys-msg-vague-vs-improved.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

vague_system = "Be concise."

improved_system = """
Respond in 2 to 3 sentences.
Include relevant context.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    system=improved_system,
    messages=[
        {
            "role": "user",
            "content": "What is Kubernetes?"
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-vague-vs-improved.py
```

Output:

> Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications across clusters of machines. 
> 
> Originally developed by Google, it handles tasks like load balancing, resource allocation, and self-healing to ensure applications run reliably and efficiently. 
> 
> Kubernetes has become the industry standard for managing microservices and complex distributed systems in cloud environments.

Testing and refinement help create more reliable prompts.

## Advanced System Message Techniques

Complex tasks often require multiple instructions working together.

- Set instruction priorities
- Use conditional rules
- Provide examples
- Combine with few-shot prompting

In the example below, the `system_message` variable creates a structured code review process.

```python
## sys-msg-structured-code-review.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

system_message = """
Priority 1: Security
Priority 2: Performance
Priority 3: Style

If issues are found:
- List the issues
- Suggest fixes

If no issues are found:
- Reply with "Code looks good"
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=300,
    system=system_message,
    messages=[
        {
            "role": "user",
            "content": """
Review this code:

password = "admin123"
print(password)
"""
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash
python sys-msg-structured-code-review.py
```

Output:

```text
Issue:
Hardcoded password detected.

Fix:
Store secrets in environment variables or a secrets manager.

Issue:
Sensitive information may be exposed through logging.

Fix:
Avoid printing passwords or credentials.
```

Multiple instructions can be combined to create predictable and repeatable behavior.

