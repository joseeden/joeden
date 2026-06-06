---
title: "Thinking Mode"
description: "Thinking mode for advanced reasoning"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 60
--- 


## Overview

Claude has a thinking mode that helps it solve harder problems by reasoning step by step instead of replying immediately.

- Breaks problems into steps
- Evaluates different options
- Produces more structured reasoning
- Gives a final answer based on analysis

This makes it useful when simple responses are not enough and deeper reasoning is needed.

When to use thinking mode:

- Multi-step problem solving
- Trade-off decisions
- Complex logic tasks

It helps when answers depend on careful comparison or structured reasoning instead of a single direct response.

:::info

The code examples in this section use the Anthropic API to demonstrate different prompting techniques. Make sure to [set up your API key and environment](/docs/075-Artificial-Intelligence/050-Claude-Code/050-Anthropic-API.md) before running the code.

See the actual code files here: [Github](https://github.com/joseeden/llm-engineering-sandbox/tree/master/scripts)

:::

## Types of Thinking 

Different thinking styles help the model handle different kinds of problems more effectively.

| Type                | Short description                                   | Use case                                                     |
| ------------------- | --------------------------------------------------- | ------------------------------------------------------------ |
| Analytical thinking | Breaks complex information into smaller parts       | Data analysis, troubleshooting issues, understanding systems |
| Strategic thinking  | Focuses on planning and long-term decisions         | Business planning, product strategy, roadmaps                |
| Creative thinking   | Generates new ideas and explores possibilities      | Content creation, brainstorming, design ideas                |
| Logical thinking    | Follows step-by-step reasoning to reach conclusions | Debugging code, solving math problems, decision making       |

These thinking styles help structure how problems are solved, which makes responses more accurate and aligned with the type of task.

## Examples

### Strategic Planning

In the example below, the `thinking_budget` variable is used to enable reasoning time for the model, and the `client` object sends the request using the Anthropic API.

```python 
## thinking-mode-strategy-planning.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1500,
    thinking={
        "type": "enabled",
        "budget_tokens": 1024
    },
    messages=[
        {
            "role": "user",
            "content": "Create a launch strategy for a new fitness app entering multiple countries"
        }
    ]
)

print(response.content)
```

Run the script:

```bash 
python thinking-mode-strategy-planning.py
```

Expected output:

```text 
[ThinkingBlock(signature='EoUFCm0ID.........`,
thinking="The model evaluates market entry options, compares phased rollout vs global launch, and considers resource constraints..type='thinking'),

TextBlock(citations=None, text="A phased rollout strategy is recommended. Start with one region, gather feedback, then expand gradually to reduce risk and improve product-market fit across regions...." type='text')]
```

The thinking section shows internal reasoning, and the final answer is the structured output the user receives.

### Decision Making Process

Thinking mode helps when comparing multiple options and choosing the best path.

In the example below, the `decision_query` is passed into the model to evaluate different product launch strategies.

```python 
# thinking-mode-decision-making.py
import anthropic
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=1500,
    thinking={
        "type": "enabled",
        "budget_tokens": 1024
    },
    messages=[
        {
            "role": "user",
            "content": "Should we launch globally at once or start with a single region first? Explain the best option."
        }
    ]
)

print(response.content)
```

Run it using:

```bash 
python thinking-mode-decision-making.py
```

Expected output:

```text 
[ThinkingBlock(signature='EoUFCm0ID.........`,
thinking='The model compares risks, cost, and scalability for both strategies...'type='thinking'),

TextBlock(citations=None, text="A single-region launch is better because it reduces risk, allows faster learning, and improves the product before scaling globally..", type='text')]
```

The model uses reasoning to compare both options before selecting the best approach.

## How Thinking Mode Works Internally

When thinking mode is enabled, the model separates reasoning from the final response.

- Thinking section processes the problem
- Final answer is based on reasoning output
- Both parts work together for better results

Sample output:

```text 
[ThinkingBlock(signature='EoUFCm0ID.........`,
thinking='The model compares risks, cost, and scalability for both strategies...'type='thinking'),

TextBlock(citations=None, text="A single-region launch is better because it reduces risk, allows faster learning, and improves the product before scaling globally..", type='text')]
```

This structure helps the model handle complex tasks more reliably by organizing its reasoning before producing the final answer.

