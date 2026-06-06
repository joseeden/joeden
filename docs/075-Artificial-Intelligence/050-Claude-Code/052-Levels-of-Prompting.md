---
title: "Levels of Prompting"
description: "Zero-shot, one-shot, and few-shot prompting techniques"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 52
--- 

## Overview

There are different ways of prompting based on how many examples you provide.

| Type      | Description            |
| --------- | ---------------------- |
| Zero-shot | Uses no examples       |
| One-shot  | Uses one example       |
| Few-shot  | Uses multiple examples |

More examples usually improve consistency, but too many can waste context space.

:::info

The code examples in this section use the Anthropic API to demonstrate different prompting techniques. 
Make sure to [set up your API key and environment](/docs/075-Artificial-Intelligence/050-Claude-Code/050-Anthropic-API.md) before running the code.

See the actual code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox)

:::

## Zero-shot 

With zero-shot prompting, there are no examples provided, just the task. The model relies solely on its training to understand what is being asked.

The example below asks for a translation without any pattern examples.

```python
# prompt-zero-shot.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {"role": "user", "content": "Translate to French: Have a safe trip"}
    ]
)

print(response.content[0].text)
```

Output:

```text
# Have a safe trip

**Bon voyage** (most common)

or

**Fais bon voyage** (informal, to one person)
**Faites bon voyage** (formal, to one or more people)
```

As we can see, the model can still provide a correct translation, but it may not follow a specific pattern or style without examples.

## One-shot 

One-shot prompting provides a single example before the actual request. This helps the model understand the format or style you want.

Using the same translation task, we give one example before asking for the new translation. 

```python
# prompt-one-shot.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {
            "role": "user",
            "content": "Translate to French: How are you?"
        },
        {
            "role": "assistant",
            "content": "Comment ça va ?"
        },
        {
            "role": "user",
            "content": "Translate to French: How was your flight yesterday?"
        }
    ]
)

print(response.content[0].text)
```

Output:

```text
Comment s'est passé ton vol hier ?

(Or more formally: Comment s'est passé votre vol hier ?)
```

The model understands the pattern from the one example and applies it to the new input.


## Few-shot

Few-shot prompting works by showing Claude examples of how it should behave before giving it a real input. 

- Common in real applications for better controlled outputs
- Often used in chat-style prompts to guide tone and structure
- Helps maintain consistency across model responses

Best practices: 

- Focus on example quality, not quantity.
- Use a small number of examples
- Keep examples consistent in style
- Vary scenarios to show pattern
- Test edge cases

In the example below, we ask the model a calculus question and then follow up with another related question. 

```python
# prompt-conversation.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {
            "role": "user",
            "content": "Q: Differentiate f(x) = x^2"
        },
        {
            "role": "assistant",
            "content": "A: f'(x) = 2x"
        },
        {
            "role": "user",
            "content": "Q: Differentiate f(x) = 3x^3 + 2x"
        }
    ]
)

print(response.content[0].text)
```

Run the code:

```bash
python prompt-conversation.py
```

Output:

```bash
A: f'(x) = 9x² + 2

**Solution:**

Using the power rule: d/dx(xⁿ) = nxⁿ⁻¹

- d/dx(3x³) = 3 · 3x² = 9x²
- d/dx(2x) = 2

Therefore: **f'(x) = 9x² + 2**
```

This shows how the model can use earlier context (like the power rule) to answer subsequent questions correctly.

## More Few-Shot Examples

### Translation

Here, we ask the model to translate English phrases to French. We provide multiple examples of translations so the model learns the pattern.

```python
# prompt-translate.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {"role": "user", "content": "Good morning -> Bonjour"},
        {"role": "assistant", "content": "Got it"},
        {"role": "user", "content": "Thank you -> Merci"},
        {"role": "assistant", "content": "Got it"},
        {"role": "user", "content": "Translate: Good night"}
    ]
)

print(response.content[0].text)
```

Run the code:

```bash
python prompt-translate.py
```

Output:

```text
Bonne nuit
```

The pattern becomes more consistent because the model sees repeated structure.


### Practical Applications

Some common use cases for few-shot prompting include:

- Email formatting
- Customer support replies
- Structured reasoning tasks
- Domain-specific outputs

In the example below, we train the model to respond to complaints in a polite, structured way.

```python
# prompt-customer-support.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {"role": "user", "content": "Customer: My order is late."},
        {"role": "assistant", "content": "We’re sorry for the delay. We are checking your order status and will update you soon."},

        {"role": "user", "content": "Customer: I received the wrong item."},
        {"role": "assistant", "content": "We apologize for the mistake. We will arrange a replacement immediately."},

        {"role": "user", "content": "Customer: My payment was charged twice."}
    ]
)

print(response.content[0].text)
```

Output:

```text
We sincerely apologize for this error. Here's what we'll do to resolve it:

1. **Verify the duplicate charge** - We'll review your account and payment records to confirm the double charge occurred.

2. **Process a refund** - We'll issue a refund for the duplicate charge right away.

3. **Timeline** - Depending on your bank, the refund should appear in your account within 3-5 business days.

4. **Next steps** - We'll send you a confirmation email with the refund details and reference number.

Is there anything else we can help clarify about this issue?
```

The model follows the tone and structure from the examples. It also provides a professional and empathetic response to the customer's issue.


### Varied Examples 

It is important to use varied examples to show the underlying pattern rather than just repeating the same scenario. This helps the model generalize better and avoid overfitting to specific cases.

In this example, we show different types of customer complaints and how to classify their sentiment. 

```python
## prompt-classify-sentiment.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=200,
    temperature=0,
    messages=[
        {"role": "user", "content": "Task: classify sentiment -> I love this product"},
        {"role": "assistant", "content": "Positive"},

        {"role": "user", "content": "Task: classify sentiment -> This is terrible"},
        {"role": "assistant", "content": "Negative"},

        {"role": "user", "content": "Task: classify sentiment -> It is okay"},
        {"role": "assistant", "content": "Neutral"},

        {"role": "user", "content": "Task: classify sentiment -> The product works well"}
    ]
)

print(response.content[0].text)
```

Output:

```text
Positive
```

The model learns the general pattern of polite, structured replies rather than just memorizing one specific response.

### Production Setup 

Claude works with client.messages.create(), but in real systems you usually separate:

- Client setup
- Prompt builder
- Few-shot examples
- Execution layer

This makes prompts reusable and easier to scale.

For this example, we have the following files:

```bash
├── config.py
├── prompt_builder.py
├── model_runner.py
├── app.py
└── .env                ## optional
```

See the actual code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox)


#### 1. Environment + Client Setup

This loads environment variables and initializes the Anthropic client in a reusable way.

```python
# config.py
import anthropic
from dotenv import load_dotenv
import os

load_dotenv()

def get_client():
    api_key = os.getenv("ANTHROPIC_API_KEY")
    
    return anthropic.Anthropic(api_key=api_key)
```

#### 2. Prompt Builder (Few-shot Conversation Engine)

This is where we structure conversation-style few-shot prompting.

Here we separate the system instructions, examples, and user input to make it modular.

```python
# prompt-builder.py
def build_messages(user_input: str):
    return [
        {
            "role": "user",
            "content": "Customer: My order is late."
        },
        {
            "role": "assistant",
            "content": "We’re sorry for the delay. We are checking your order and will update you shortly."
        },

        {
            "role": "user",
            "content": "Customer: I received the wrong item."
        },
        {
            "role": "assistant",
            "content": "We apologize for the mistake. We will arrange a replacement immediately."
        },

        {
            "role": "user",
            "content": f"Customer: {user_input}"
        }
    ]

```

#### 3. Model Runner (Anthropic Execution Layer)

This handles API calls, error handling, and response parsing.

```python
# model_runner.py

def run_claude(client, messages):
    try:
        response = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=300,
            temperature=0.2,
            system=(
                "You are a helpful assistant that follows patterns from examples. "
                "Always match tone, structure, and formatting exactly."
            ),
            messages=messages
        )

        return response.content[0].text

    except Exception as e:
        return f"Error: {str(e)}"
```

#### 4. Application Logic (End-to-End Flow)

This connects everything together.

```python
## app.py

from config import get_client
from prompt_builder import build_messages
from model_runner import run_claude


def main():
    client = get_client()

    user_input = "My subscription was renewed without permission"

    messages = build_messages(user_input)

    result = run_claude(client, messages)

    print("\n=== MODEL OUTPUT ===\n")
    print(result)


if __name__ == "__main__":
    main()
```

Before running, make sure to set up your environment variables and install dependencies.

```bash
## .env 
ANTHROPIC_API_KEY=your_key_here
```

Run it as a standard Python project.

```bash
python app.py
```

Output:

> === MODEL OUTPUT ===
>
> We sincerely apologize for this unauthorized renewal. We will investigate this right away and process a full refund to your account. Please provide your order number so we can resolve this promptly.