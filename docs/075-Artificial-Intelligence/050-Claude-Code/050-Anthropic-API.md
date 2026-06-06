---
title: "Anthropic API"
description: "Using the Anthropic API in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 50
--- 



## Overview

The Anthropic API connects your local application code directly to Claude. This link lets you send text instructions and receive structured data responses back automatically.

- Multi-turn conversations manage your chat history context automatically
- System prompts give you precise control over behavioral guidelines
- Extended thinking modes allow deeper reasoning for complex problems

Using the Anthropic API allows you to integrate Claude directly into your software. These features make it easy to build custom tools like chatbots, study guides, or data assistants.


## Setting Up

Before you can make requests to the Anthropic API, you need to set up an API key for authentication. Follow these steps:

1. Sign up for an [Anthropic account](https://claude.ai/login) 

2. Navigate to the API Keys ➜ Create an API Key.

3. Generate a new API key.

4. Store the API key in a `.env` file in your project root:

    ```
    ANTHROPIC_API_KEY="your_api_key_here"
    ```

5. Create a Python virtual environment and activate it:

    ```bash
    python -m venv ~/venv
    source ~/venv/bin/activate
    ```

6. Install the Anthropic SDK using pip: 

    ```bash
    pip install anthropic
    ```

## Making a Request

We can use the Anthropic SDK to connect to the AI service and send prompts securely. Authentication is handled using an API key.

- Choose a **model** to determine the AI's capability level
- Set a **token limit** to control response size and cost
- Send **messages** containing the role and text content

In this example, we create a client connection (`client`) and send a simple user prompt to generate a concise summary of cloud computing. The `response` object contains the generated text along with metadata about token usage and processing time.

See files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

```python
## sample-api-request.py
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

# Initialize the connection client
client = anthropic.Anthropic(api_key=os.environ.get("ANTHROPIC_API_KEY"))

# Send a message to the model
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=150,
    messages=[
        {"role": "user", "content": "Write a one-sentence summary of cloud computing."}
    ]
)

# Extract text from the response object
clean_output = response.content[0].text
print(clean_output)
```

The server’s `response` object includes extra metadata along with the generated text. The real output is inside the `content` list. Extracting it correctly lets you display clean text or use it in later steps of your app.

**Note:** To avoid exposing your API key, store it securely in an environment variable and load it using a library like `dotenv`. 
 
Run the script:

```bash
python sample-api-request.py 
```

Output:

```bash
Cloud computing is the delivery of computing services—including servers, storage, databases, and software—over the internet on a pay-as-you-go basis, allowing users to access and use resources remotely without owning physical infrastructure 
```

## Content Generation and Summarization

Content generation and summarization are common use cases for models like Claude and other Anthropic systems. They work best when you provide clear constraints and define a role for the model. 

- Set clear output limits (length, format)
- Focus on specific outputs (summary, actions, insights)
- Use system role to define tone and style

In the example below, we ask the model to summarize a passage of text and identify key themes. By defining the system role as a literary analyst, we guide the model to produce a focused and relevant response.

See files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

```python
# sample-api-summarization.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

text = """
To be, or not to be, that is the question:
Whether 'tis nobler in the mind to suffer
The slings and arrows of outrageous fortune,
Or to take arms against a sea of troubles
And by opposing end them.
"""

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=120,
    system="You are a literary analyst. Summarize briefly and list key themes.",
    messages=[{"role": "user", "content": text}]
)

print(response.content[0].text)
```

Run the code:

```bash 
python sample-api-summarization.py
```

Output:

```
# Summary

Hamlet contemplates the fundamental choice between passive acceptance of life's hardships and active resistance against them. He weighs the pain of enduring suffering against the courage required to confront it directly.

## Key Themes

- **Existential struggle** – The core question of existence and whether life is worth living
- **Passivity vs. action** – The tension between suffering in silence and taking decisive action
- **Human suffering** – Life's inevitable hardships and injustices ("slings and arrows")
- **Courage and cowardice** – The moral and psychological struggle between bravery and fear
```



## Generating Source Code

Generating reliable code with Claude models requires clear and structured instructions. 

- Specify the programming language and constraints
- Define inputs, outputs, and expected behavior
- Include error handling and edge cases

In this example, we ask the model to generate a Python function that calculates the area of a circle with validation for negative inputs. The model then stores the generated code in a `circle_area.py` file in the same directory. 

See files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

```python
## sample-api-code.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=200,
    messages=[{
        "role": "user",
        "content": "Write a Python function to calculate circle area. Handle negative inputs."
    }]
)

print(response.content[0].text)
```

Run the code:

```bash
python sample-api-code.py
```

Output:

```bash
Code saved to circle_area.py
```

## Content Classification System

A content classification system automatically organizes customer messages into categories so they can be handled faster and more efficiently.

- Automatic sorting of messages
- Routes issues to the right team
- Detects common and trending problems

In the example below, the `client` object sends a list of customer messages to Claude and the `messages` variable contains the feedback that needs to be classified into predefined categories.

```python 
## sample-content-classification.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

messages = [
    "My app crashes when I try to upload a photo",
    "I forgot my password and cannot log in",
    "The app feels very slow after the update"
]

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=300,
    messages=[
        {
            "role": "user",
            "content": f"""
                Classify each message into one of these categories:
                - Bug report
                - Account issue
                - Performance issue

                Messages:
                {messages}

                Return the result as a simple numbered list.
                """
        }
    ]
)

print(response.content[0].text)
```

Run the script:

```bash 
python sample-content-classification.py
```

Expected output:

```text 
1. Bug report - My app crashes when I try to upload a photo  
2. Account issue - I forgot my password and cannot log in  
3. Performance issue - The app feels very slow after the update
```

This removes the need for manual review by instantly labeling feedback based on meaning. It helps support and product teams respond faster and focus on the right issues.


## Temperature

Temperature controls randomness in output... temprature range is 0.0 (deterministic) to 1.0 (highly creative).

| Level  | Range   | Behavior                                   | Use Case                                                                 |
| ------ | ------- | ------------------------------------------ | ------------------------------------------------------------------------ |
| Low    | 0.1–0.3 | Consistent, predictable output             | Technical tasks like code generation, documentation, and structured data |
| Medium | 0.4–0.7 | Balanced mix of creativity and consistency | General writing, summarization, and everyday AI tasks                    |
| High   | 0.8–1.0 | Highly creative, less predictable output   | Brainstorming, storytelling, and idea generation                         |

Here, the previous prompt is used with different temperature settings to show how it affects the output style. 

- Low temperature (0.2) will produce more focused and deterministic content
- Higher temperature (0.8) would yield more creative and varied responses

See files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)


```python
## sample-api-temperature.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    temperature=0.2,
    messages=[{
        "role": "user",
        "content": "Generate a database connection string template."
    }]
)

print(response.content[0].text)
```

In addition to temperature, we can also use the `top_p` parameter to control vocabulary diversity. 

| Temperature Level | Range    | Behavior                                             |
| ----------------- | -------- | ---------------------------------------------------- |
| Low               | ~0.1–0.3 | Very predictable, focused, and consistent outputs    |
| Medium            | ~0.4–0.7 | Balanced mix of creativity and consistency           |
| High              | ~0.8–1.0 | More creative, diverse, and less predictable outputs |


Together, temperature and `top_p` give us fine control over creativity: for instance, using a moderate temperature with low `top_p` for focused but imaginative writing.

```python
response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=100,
    temperature=0.2,
    top_p=0.3,
    messages=[{
        "role": "user",
        "content": "Generate a database connection string template."
    }]
) 
```

**UPDATE:**

Older generation models like Claude 3.5 Sonnet and Claude 3 Haiku allow you to set both `temperature` and `top_p` simultaneously. However, Anthropic's API documentation always recommended using only one of these parameters at a time to avoid conflicting sampling behaviors.

For newer generation models (Claude 4.x), such as Claude Sonnet 4.5, Sonnet 4.6, and Opus 4.8, the API prohibits sending both parameters in the same request. 

If you include both, the API will return an error. Some of the most recent iterations (like Claude Opus 4.7) have completely stripped `temperature`, `top_p`, and `top_k` support from the API.

See: https://github.com/lobehub/lobehub/discussions/10093

