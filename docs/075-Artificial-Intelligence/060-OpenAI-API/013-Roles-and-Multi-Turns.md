---
title: "Roles and Multi-Turns"
description: "Different roles in chat messages and how to manage multi-turn conversations with the OpenAI API."
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- OpenAI
sidebar_position: 13
# last_update:
#   date: 5/26/2023
---

## Overview 

Chat models use structured messages to control behavior and support both single-turn and multi-turn interactions.

Chat completions can work in two main ways:

- **Single-turn**

    - One request and one response
    - No memory of previous messages
    - Used for simple tasks like summarization or classification

- **Multi-turn**

    - Conversation builds over multiple messages
    - Model keeps context using message history
    - Used for chatbots, agents, and iterative tasks

This page focuses on multi-turn conversations and the different roles that can be used in messages to control the behavior of the assistant.

For single-turn tasks, please see [Roles in Single-Turn Tasks.](/docs/075-Artificial-Intelligence/060-OpenAI-API/010-Starter-Notes.md#roles-in-single-turn-tasks) 

:::info

To run the code examples in this page, make sure to [set up your environment](/docs/075-Artificial-Intelligence/060-OpenAI-API/005-Setting-up-OpenAI.md) before running the code. 

See code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

:::

## Roles

Chat models use three roles to structure communication.

| Role      | Purpose                               | Use case                                                                                                                        |
| --------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| System    | Sets behavior, rules, and constraints | <ul><li>Defining tone and personality</li><li>Enforcing safety rules</li><li>Setting output format rules</li></ul>              |
| User      | Sends instructions or questions       | <ul><li>Asking questions</li><li>Requesting code or summaries</li><li>Triggering tasks in apps</li></ul>                        |
| Assistant | Stores model responses and examples   | <ul><li>Maintaining conversation history</li><li>Providing example outputs</li><li>Helping the model continue context</li></ul> |

In the example below, the `system_prompt` variable sets behavior rules for a tutoring assistant, while the `messages` list includes both system and user messages to guide the model's response.

```python 
# sample-roles.py

from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

messages = [
    {
        "role": "system",
        "content": "You are a Python tutor who answers in one short sentence."
    },

    {
        "role": "user",
        "content": "What is a loop in Python?"
    },
    {
        "role": "assistant",
        "content": "A loop repeats a block of code multiple times."
    },

    {
        "role": "user",
        "content": "Explain functions in Python."
    }
]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages
)

print(response.choices[0].message.content)
```

To run the script:

```bash 
python sample-roles.py
```

Expected output:

> Functions in Python are reusable blocks of code that perform a specific task and can take inputs (arguments) and return outputs.


## System Messages for Safety

System messages are also used as guardrails to ensure the model avoids unwanted or risky responses.

- Blocks sensitive or harmful outputs
- Defines safe response boundaries
- Prevents misuse of the model

In the example below, a system message is used to block the model from giving harmful financial advice. The user asks for investment guidance, but the system message forces a safe refusal.

```python
# sample-system-guardrails.py

from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

messages = [
    {
        "role": "system",
        "content": (
            "You are a finance education assistant. "
            "You must NOT provide real financial or investment advice. "
            "If asked, respond by saying you cannot give financial advice."
        )
    },
    {
        "role": "user",
        "content": "Should I invest all my savings into tech stocks?"
    }
]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    temperature=0.2
)

print(response.choices[0].message.content)
```

Run the script:

```bash
python sample-system-guardrails.py
```

Expected output:

> I'm sorry, but I cannot give financial advice. It's important to consider various factors and consult with a financial advisor before making investment decisions.

## Examples

### Assistant Messages

Assistant messages store previous responses so the model can continue conversations with context.

They are commonly used for:

- Conversation history
- Example-based guidance
- Multi-turn chatbot memory

In the example below, the full conversation history is stored in the `messages` list.

```python 
# sample-multi-turn-conversations.py

import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

messages = [
    {
        "role": "system",
        "content": (
            "You are a helpful IT support assistant. "
            "Provide concise and practical troubleshooting advice."
        )
    },

    {
        "role": "user",
        "content": "I can't connect to the company VPN."
    },
    {
        "role": "assistant",
        "content": (
            "Check that your internet connection is working and "
            "verify that your VPN username and password are correct."
        )
    },

    {
        "role": "user",
        "content": "My internet is working and the password is correct."
    },
    {
        "role": "assistant",
        "content": (
            "Try disconnecting and reconnecting the VPN client. "
            "If the issue continues, restart your computer."
        )
    },

    {
        "role": "user",
        "content": "I restarted my computer and now I get error code 809."
    },
    {
        "role": "assistant",
        "content": (
            "Error 809 usually indicates that the VPN connection is being "
            "blocked by a firewall or network device."
        )
    },

    {
        "role": "user",
        "content": (
            "I'm connected from a hotel Wi-Fi network. "
            "What should I check next?"
        )
    }
]

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=messages,
    temperature=0.3
)

print(response.choices[0].message.content)
```

Run the script:

```bash
python sample-multi-turn-conversations.py 
```

Expected output:

> 1. **Firewall Settings**: Check if the hotel’s network firewall is blocking VPN connections. Some hotels restrict VPN traffic.
>
> 2. **Protocol Settings**: If possible, try changing the VPN protocol (e.g., from L2TP to PPTP or OpenVPN) in your VPN client settings.
>
> 3. **Contact Hotel Support**: Reach out to the hotel’s IT support to see if they can assist with VPN access.
>
>
> 4. **Use Mobile Data**: If you have a mobile data plan, try connecting to the VPN using your phone's hotspot as a test.

### AI Chatbot with Multi-Turn Memory

A chatbot works by storing every message in a list and sending it back to the model on each request.

- System message defines chatbot behavior
- User messages simulate ongoing interaction
- Assistant messages store responses for context

In the example below, we simulate a chatbot that answers multiple user questions step by step. Each response is appended back into memory so the chatbot becomes stateful.

```python
# chatbot-multi-turn.py

from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

messages = [
    {
        "role": "system",
        "content": "You are a helpful math tutor that speaks concisely."
    }
]

# Multiple user inputs (simulating a real conversation)
user_msgs = [
    "Explain what pi is.",
    "Give a simple example of pi in real life.",
    "Summarize pi in two bullet points."
]

# Loop through each user question
for q in user_msgs:
    print("User:", q)

    # Add user message to conversation history
    messages.append({"role": "user", "content": q})

    # Send full conversation to the model
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_completion_tokens=120
    )

    # Extract assistant reply
    reply = response.choices[0].message.content

    # Store assistant reply back into memory
    messages.append({"role": "assistant", "content": reply})

    print("Assistant:", reply, "\n")
```

Run the script:

```bash
python chatbot-multi-turn.py
```

The exact wording may vary, but the output will look like this:

> User: Explain what pi is.
> Assistant: Pi (π) is a mathematical constant representing the ratio of a circle's circumference to its diameter. It is an irrational number, approximately equal to 3.14159, and it has an infinite number of non-repeating decimals. Pi is used in various mathematical and scientific calculations, especially those involving circles and geometry. 
> 
> User: Give a simple example of pi in real life.
> Assistant: A simple example of pi in real life is when measuring a round pizza. If you know the diameter of the pizza (let's say it's 12 inches), you can calculate the circumference (the distance around the pizza) using the formula:
> 
> Circumference = π × diameter.
> 
> So, for a 12-inch pizza: 
> 
> Circumference ≈ 3.14 × 12 ≈ 37.68 inches.
> 
> This gives you the total length of the crust around the pizza! 
> 
> User: Summarize pi in two bullet points.
> Assistant: 
> - Pi (π) is the ratio of a circle's circumference to its diameter, approximately equal to 3.14.
> - It is an irrational number with infinite non-repeating decimals, commonly used in geometry and trigonometry. 

