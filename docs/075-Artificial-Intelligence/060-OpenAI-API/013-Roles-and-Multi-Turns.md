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

Chat models use structured messages to handle both single-turn tasks and multi-turn conversations. The chat completions endpoint allows for two modes of interaction:

- **Single-turn** 

    - Uses one request and response
    - Used for text generation, transformation, and classification
    - No memory of previous interactions

- **Multi-turn** 

    - Builds on previous messages
    - Maintains context across interactions
    - Enables more complex conversations

This page focuses on multi-turn conversations and the different roles that can be used in messages to control the behavior of the assistant.

For single-turn tasks, please see [Roles in Single-Turn Tasks.](/docs/075-Artificial-Intelligence/060-OpenAI-API/010-Starter-Notes.md#roles-in-single-turn-tasks) 

:::info

To run the code examples in this page, make sure to [set up your environment](/docs/075-Artificial-Intelligence/060-OpenAI-API/005-Setting-up-OpenAI.md) before running the code. 

See code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

:::


## Roles

Roles are used to structure messages and control the behavior of the assistant. There are three main roles:

| Role      | Purpose                                             | Use case                                                                                                                                                               |
| --------- | --------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| System    | Sets behavior, rules, and constraints for the model | <ul><li>Defining tone and personality</li><li>Enforcing safety or policy rules</li><li>Setting strict output formats for APIs or apps</li></ul>                        |
| User      | Provides instructions, questions, or task input     | <ul><li>Asking questions or giving prompts</li><li>Requesting summaries, code, or explanations</li><li>Triggering actions in chat-based workflows</li></ul>            |
| Assistant | Provides previous responses or example outputs      | <ul><li>Storing conversation history for context</li><li>Providing example answers for few-shot prompting</li><li>Maintaining continuity in multi-turn chats</li></ul> |


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


## Example: Assistant Messages

Assistant messages can be used to show examples of desired output format. They are commonly used in chatbot applications to provide context and guide the model's responses.

In the example below, the `messages` list contains the entire conversation history. 

- System messages define the assistant's role
- Assistant messages preserve context from earlier responses

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



## Preventing Misuse with System Messages

System messages are often used to set safety rules so the model avoids unwanted or risky responses.

- Restricts sensitive outputs
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

