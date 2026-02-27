---
title: "Design Patternss"
description: "How AI agents think and act through frameworks"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 15
--- 

## Components and Operation

AI agents work through three main components: the model, tools, and orchestration. These components allow the agent to reason, act, and interact with the world.

<!-- 1. The model understands language and breaks problems into steps
2. Tools connect the agent to data sources and actions
3. Orchestration coordinates everything, keeps the agent moving toward its goal -->

<div class='img-center'>

![](/img/docs/agentic-trinity.png)

</div>

## Models 

The model is the brain of the agent. It processes language, reasons through problems, and decides what to do next. Models can be:

### TAO Cycle (Thought-Action-Observation)

The orchestration layer keeps track of memory, state, reasoning, and planning. A common way to understand orchestration is the **Thought-Action-Observation (TAO)** cycle.

- **Thought** - The model decides the next step based on the user prompt
- **Action** - The agent uses tools to perform tasks or gather information
- **Observation** - The agent reflects on results and feeds them back into the next cycle

This cycle repeats until the goal is reached or a stopping condition occurs. It ensures continuous reasoning and adaptation.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-190611.png)

</div>


#### Example: Customer Support Agent

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

### Types of Model Thoughts

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




### ReAct Framework

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


#### Example: Simple Arithmetic Example

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

#### Why ReAct Matters

ReAct is often built into agentic tools through hidden system prompts. It guides models to reason and act correctly without needing explicit instructions. 

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27192625.png)

</div>

Newer generation reasoning models are explciitly trained to think step by step, and don't need ReAct prompting. Example of reasoning models include

- OpenAI o-series of models
- DeepSeek R-series of models
- Gemini thinking models

## Tools 

Tools are the action component of AI agents. They connect the model to external data sources and actions, which allows it to interact with the world.

### Types of Tools

Agentic systems generally use three main types of tools: 

- **Extensions** connect to external systems via APIs or protocols
- **Functions** execute custom code for specific tasks
- **Data stores** retrieve structured and unstructured information

Each type of tool adds a different capability, and combining them makes the agent more versatile.

### Extensions

Extensions use APIs to get real-time data. For example, a financial agent can query the Yahoo Finance API to check Nvidia’s stock price.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27194205.png)

</div>


### Functions 

Functions let agents run calculations or analyses. For instance, the agent can calculate moving averages to analyze stock trends when asked:

> Analyze Nvidia’s stock performance over the last 30 days.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27194034.png)

</div>

### Data Stores 

Data stores allow agents to read stored information like databases, documents, PDFs, emails, and videos. Using APIs, functions, and data stores together enables agents to give detailed and actionable insights.

<div class='img-center'>

![](/img/docs/all-things-ai-agent-tools.png)

</div>


## Multi-Agent Systems

Some tasks grow too complex for a single agent. As an example, customer support queries can range from billing issues to technical, legal, and sales questions. Each query type needs access to different knowledge bases and tools.

Example queries:

| Ticket Type                | Knowledge Resources                                                   | Tools / Systems / APIs                                                     |
| -------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Billing inquiries          | Internal finance documentation, payment policy wiki, transaction logs | Secure payment APIs, CRM with billing integration                          |
| Billing disputes           | Engineering runbooks, system architecture docs, incident postmortems  | Observability tools (e.g., Datadog), ticketing system, internal dashboards |
| Technical issues           | Legal knowledge base, compliance manuals, GDPR/CCPA documentation     | Contract management system, legal Q&A assistant, document retrieval tools  |
| Legal compliance questions | Recommendation engine, CRM with lead tracking, chatbot assistant      | Product recommendations                                                    |
| Product recommendations    | Product feature matrix, customer personas, sales playbooks            | Product recommendation tools / CRM                                         |

Multi-agent systems coordinate multiple agents to handle complex workflows. Instead of one model doing everything, agents specialize and work together to complete tasks efficiently.

- Multi-agent systems split work across specialized agents
- They can follow patterns suited to workflow needs
- They improve accuracy and scalability compared to single agents

This approach ensures complex problems are managed effectively without overloading a single agent.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27195518.png)

</div>



## Common Multi-Agent Patterns

### Manager Pattern

In this pattern, a central agent orchestrates other agents. This is ideal when one agent controls workflow and communicates with the user

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27195821.png)

</div>

Example: A head of customer support delegates tasks to billing or legal agents while managing the client conversation

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27195744.png)

</div>


### Decentralized Pattern

The decentralized patterns involves handing off tasks between specialized agents. Each agent can handle requests end-to-end, including user communication

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27200003.png)

</div>

Example: A triage agent routes a ticket to a billing agent who owns the ticket fully.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27200049.png)

</div>


### Other Agent Architectures

There are also other emerging architectures and design patterns that handle reasoning, actions, and observations.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27200403.png)

</div>



