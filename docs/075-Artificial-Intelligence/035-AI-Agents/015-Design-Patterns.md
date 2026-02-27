---
title: "Design Patternss"
description: "How AI agents think and act through frameworks"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 10
--- 

## Components and Operation

AI agents work through three main components: the model, tools, and orchestration. These components allow the agent to reason, act, and interact with the world.

1. The model understands language and breaks problems into steps
2. Tools connect the agent to data sources and actions
3. Orchestration coordinates everything, keeps the agent moving toward its goal

For more information, please see the [Agentic Trinity.](/docs/075-Artificial-Intelligence/035-AI-Agents/010-Starter-Notes.md#the-agentic-trinity)

<div class='img-center'>

![](/img/docs/agentic-trinity.png)

</div>

## TAO Cycle (Thought-Action-Observation)

The orchestration layer keeps track of memory, state, reasoning, and planning. A common way to understand orchestration is the **Thought-Action-Observation (TAO)** cycle.

- **Thought** - The model decides the next step based on the user prompt
- **Action** - The agent uses tools to perform tasks or gather information
- **Observation** - The agent reflects on results and feeds them back into the next cycle

This cycle repeats until the goal is reached or a stopping condition occurs. It ensures continuous reasoning and adaptation.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-190611.png)

</div>


## Example: Customer Support Agent

A customer support agent illustrates the TAO cycle in action. 

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-190815.png)

</div>

Consider a customer who was accidentally billed after forgetting to cancel a subscription.

| Cycle | Thought                                      | Action                             | Observation                              |
| ----- | -------------------------------------------- | ---------------------------------- | ---------------------------------------- |
| 1     | Determine which tool to access customer info | Access customer database           | Finds plan renewed 3 days ago            |
| 2     | Check refund policy                          | Query company policy               | Policy allows full refunds within 7 days |
| 3     | Confirm refund eligibility                   | Initiate refund                    | Refund processed successfully            |
| 4     | Notify customer                              | Send email and update subscription | Ticket can be closed                     |

Each cycle builds on the previous one, which demonstrate how the agent reasons, acts, and observes until the task is complete.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27190950.png)

</div>

## Types of Model Thoughts

AI agents break problems into manageable steps. These steps come as thoughts, which guide every action and observation an agent makes.

| Thought Type                | Description                                                 |
| --------------------------- | ----------------------------------------------------------- |
| Planning thoughts           | Break problems into smaller steps to solve them efficiently |
| Analysis thoughts           | Draw insights from observations                             |
| Decision-making thoughts    | Choose specific actions based on input                      |
| Problem-solving thoughts    | Identify root causes of issues                              |
| Memory integration thoughts | Remember details stored in memory                           |
| Self-reflection thoughts    | Evaluate style and quality of outputs                       |
| Goal-setting thoughts       | Determine objectives needed to achieve the task             |
| Prioritization thoughts     | Decide the order of tasks based on importance               |




## ReAct Framework

ReAct is a prompting framework that helps models organize thoughts and actions step by step. It combines reasoning (thinking) and acting (doing) to improve problem-solving.

1. **Chain-of-thought reasoning**

    - Models are prompted to think step by step
    - Break problems into smaller parts

2. **Action guidance**

    - See examples of actions and observations
    - Know what observations to make

3. **Observation feedback**

    - Reflect on outcomes to guide next step
    - Adjust next steps based on results


### Example: Simple Arithmetic Example

You can test ReAct in ChatGPT with a GPT-4 model. Suppose you want to asK:

1. Using the normal method, we ask Chatgpt:

    > Calculate the total cost of 3 laptops at $899 each with a 15% discount and 8% sales tax.

    The model then provides the answer:

    ```text
    $2475.85
    ```

2. Using ReAct-style prompting, we can use a prompt:-+

    ```bash
    Calculate the total cost if I buy 3 laptops at $899 each with a 15% discount and 8% sales tax. Think step by step.

    Follow this format: 

    Thought: [Think about what to calculate first] 
    Action: [Perform calculation] 
    Observation: [Result of calculation] 
    ..repeat as needed... 
    Final Answer: [Complete solution] 
    ```

    The model thinks step by step. Example ReAct response:

    ```bash
    Thought: Calculate base cost first
    Action: 3 x $899
    Observation: Base cost is $2697

    Thought: Apply 15% discount
    Action: $2697 - ($2697 x 0.15)
    Observation: Discounted price is $2292.45

    Thought: Apply 8% sales tax
    Action: $2292.45 + ($2292.45 x 0.08)
    Observation: Price after tax is $2475.85

    Final Answer: Total cost is $2475.85
    ```

    :::info 

    Without ReAct, models can hallucinate or skip steps. 
    With ReAct, reasoning and actions produce accurate, step-by-step results.

    :::

### Why ReAct Matters

ReAct is often built into agentic tools through hidden system prompts. It guides models to reason and act correctly without needing explicit instructions. 

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27192625.png)

</div>

Newer generation reasoning models are explciitly trained to think step by step, and don't need ReAct prompting. Example of reasoning models include

- OpenAI o-series of models
- DeepSeek R-series of models
- Gemini thinking models