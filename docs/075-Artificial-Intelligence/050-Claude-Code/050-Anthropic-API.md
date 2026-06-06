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

See files here: Github

```python
## sample-anthropic-api-request.py
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
python sample-anthropic-api-request.py 
```

Output:

```bash
Cloud computing is the delivery of computing services—including servers, storage, databases, and software—over the internet on a pay-as-you-go basis, allowing users to access and use resources remotely without owning physical infrastructure 
```


## Content Generation and Summarization

Providing explicit constraints in your instructions yields targeted summaries and custom text generation. Adding a foundational role description anchors the tone and behavior of the system across the entire session.

- Control output lengths by defining explicit word or paragraph limits
- Focus attention on specific topics like action items or core metrics
- Inject system guidelines to enforce a distinct corporate identity or style

In this example, the `system` parameter sets the professional persona before the user input is processed. Giving the AI a specific perspective ensures the generated content matches your organizational standards every time.

```python
# sample-anthropic-api-summarization.py
import os
import anthropic
from dotenv import load_dotenv

load_dotenv()

# Request a summary with system instructions
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=150,
    system="You are a technical editor who writes in a concise style.",
    messages=[
        {"role": "user", "content": "Summarize the project update report."}
    ]
)
```

Run the code:

```bash
python sample-anthropic-api-summarization.py 
```





## Generating Source Code

Code generation requires highly specific technical details to minimize errors and logic issues. Providing clear structural requirements helps the model write production-ready scripts that fit your environment.

- Specify the target programming language and version constraints
- Outline required error handling behavior and edge case management
- Define the exact input variables and expected outputs explicitly

Here, requesting a Python function with specific mathematical validation prevents the generation of generic or broken code snippet blocks. Detailed technical specifications allow the system to write reliable code that works immediately within your codebase.

```python
# Request specific code generation
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "Write a Python function that calculates the area of a circle. Include error handling for negative numbers."}
    ]
)
```

Runing the code:

Output 

## Temperature

You can adjust the predictability and vocabulary selection of the responses using two specific configuration settings. These variables control how random or diverse the word choices are during the generation process.

- Lower the creativity setting to get consistent outputs for technical documents
- Raise the creativity setting to get highly varied text for brainstorming sessions
- Adjust the vocabulary diversity parameter to limit or expand word selection range

In this example, setting the `temperature` to a low value ensures that the text generation stays precise and focused on facts. Tuning these configuration dials allows you to toggle between strict consistency for data pipelines and creative variety for copy generation.

```python
# Run a highly predictable request for formal documentation
response = client.messages.create(
    model="claude-3-5-sonnet-20241022",
    max_tokens=100,
    temperature=0.2,
    top_p=0.3,
    messages=[
        {"role": "user", "content": "Generate a standard database connection string template."}
    ]
)

```

Runing the code:

Output 
