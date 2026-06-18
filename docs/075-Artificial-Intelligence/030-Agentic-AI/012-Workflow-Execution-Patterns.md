---
title: "Workflow Execution Patterns"
description: "Different patterns for executing AI workflows."
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 12
--- 


## Overview

AI workflows do not always need to run one step after another. Some steps must be sequential, but other steps can run in parallel, run only when needed, or repeat multiple times.

| Pattern     | Description                             |
| ----------- | --------------------------------------- |
| Sequential  | Steps run one after another.            |
| Parallel    | Steps run at the same time.             |
| Conditional | Steps run only when a condition is met. |
| Repeated    | Steps run multiple times.               |

The right pattern depends on whether one step needs the output from another step.

## Sequential Steps

Sequential steps are used when each step depends on the previous step.

For example, if a workflow extracts content, summarizes it, and then writes a post, each step needs the result from the step before it.

In the example below, each function passes its output to the next function.

```python
def extract_content(url):
    return f"Extracted content from {url}"

def summarize_content(content):
    return f"Summary of: {content}"

def generate_post(summary):
    return f"Post based on: {summary}"

url = "https://example.com/article"

content = extract_content(url)
summary = summarize_content(content)
post = generate_post(summary)

print(post)
```

Run the file with:

```bash
python sequential_workflow.py
```

Expected output:

```bash
Post based on: Summary of: Extracted content from https://example.com/article
```

Sequential workflows are simple and easy to understand, but every step must wait for the previous step to finish.

To see it in action, check out [AI Content Publishing Workflow.](https://github.com/joseeden/llm-engineering-sandbox/blob/master/building-ai-workflows/10-ai-content-publishing-pipeline/README.md#run-the-application)

## Parallel Steps

Parallel steps are used when tasks do not depend on each other.

For example, one step can generate a blog outline while another step generates image ideas. Since both tasks can start from the same topic, they can run at the same time.

In the example below, `generate_outline` and `generate_image_ideas` run together.

```python
import concurrent.futures

def generate_outline(topic):
    return f"Outline for {topic}"

def generate_image_ideas(topic):
    return f"Image ideas for {topic}"

topic = "cloud automation"

with concurrent.futures.ThreadPoolExecutor() as executor:
    outline_task = executor.submit(generate_outline, topic)
    image_task = executor.submit(generate_image_ideas, topic)

    outline = outline_task.result()
    image_ideas = image_task.result()

print(outline)
print(image_ideas)
```

Run the file with:

```bash
python parallel_workflow.py
```

Expected output:

```bash
Outline for cloud automation
Image ideas for cloud automation
```

Parallel workflows can save time because independent tasks do not need to wait for each other.

## Conditional Steps

Conditional steps are used when a step should only run based on a previous result.

For example, a workflow can check if content is too long. If it is too long, the workflow summarizes it. If it is already short, the workflow skips summarization.

In the example below, the summary step only runs when the text is longer than the allowed limit.

```python
def summarize_text(text):
    return text[:50] + "..."


text = "This is a long article about AI workflows, agents, orchestration, and automation."

if len(text) > 50:
    result = summarize_text(text)
else:
    result = text

print(result)
```

Run the file with:

```bash
python conditional_workflow.py
```

Expected output:

```bash
This is a long article about AI workflows, agents,...
```

Conditional workflows help avoid unnecessary work because some steps can be skipped.

## Repeated Steps

Repeated steps are used when a workflow needs to improve something over time.

For example, a draft can be reviewed and improved several times until it becomes better.

In the example below, the same text is improved three times.

```python
def improve_draft(draft, round_number):
    return f"{draft} Improved in round {round_number}."


draft = "This is the first draft."

for round_number in range(1, 4):
    draft = improve_draft(draft, round_number)

print(draft)
```

Run the file with:

```bash
python repeated_workflow.py
```

Expected output:

```bash
This is the first draft. Improved in round 1. Improved in round 2. Improved in round 3.
```

Repeated workflows are useful when the output needs feedback, refinement, or follow-up actions.
