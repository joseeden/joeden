---
title: "Starter Notes"
description: "Starter Notes on AI Agents"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 10
--- 

## Overview

AI agents are systems that can think about a goal and take actions to achieve it. 

Example: An AI travel assistant named **Alexi**.

You tell Alexi: *“I am traveling to Seoul from June 26 to July 12. Please organize my trip.”*

- The agent understands natural language
- The agent identifies your goal
- The agent breaks the goal into smaller steps
- The agent prepares a plan before acting

From a simple sentence, the agent extracts the location and dates. It then figures out what needs to happen first, such as checking your schedule, finding flights, and selecting hotels. The key idea is that the agent does not immediately act. It reasons and plans first.


## Core Capabilities

Once the plan is clear, the agent begins executing it.

- It checks your calendar
- It reviews travel policies
- It searches booking platforms
- It confirms the plan before finalizing

The agent uses tools to interact with external systems. After gathering information, it shares a proposal. When approved, it completes the bookings.

This shows the three core capabilities of an AI agent:

1. **Reasoning** about what needs to be done
2. **Planning** the steps in the correct order
3. **Acting** through available tools

An AI agent usually has two main parts.

1. The brain handles reasoning and decision making
2. The body represents the tools it can use

Together, these allow the system to interact with its environment instead of only generating text.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-175746.png)

</div>


## The Spectrum of Agency

An AI agent is a system that uses an AI model to reason, plan, and act in order to achieve a user-defined objective.

Different AI systems have different levels of independence. As the levels increases, the system becomes more capable of reasoning, acting, and handling complex tasks.

| Level | Agency              | Description                                                                        | Examples                                                                    |
| ----- | ------------------- | ---------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| 0     | No agency           | Systems that only respond using trained knowledge or follow fixed predefined rules | Chatbots such as GPT-4, simple workflow automation systems                  |
| 1     | Basic routing       | AI models that classify or route tasks within a workflow                           | Customer support system that routes tickets to billing or technical support |
| 2     | Tool-using agents   | Systems that can use external tools to complete tasks                              | Travel AI agent that can search and book flights                            |
| 3     | Autonomous agents   | Systems that can perform multiple steps independently                              | Deep research tools that perform multi-step reasoning and tool usage        |
| 4     | Multi agent systems | Systems that coordinate multiple agents to complete complex workflows              | Coding assistants that generate, review, and push code to a repository      |

As you move from Level 0 to Level 4, the system shifts from simple response generation to fully coordinated, multi-step autonomous execution.

## The Agentic Trinity

When you ask an AI travel assistant to plan a trip, three core components work together. These components allow the system to reason, act, and continue working until the goal is complete.

<div class='img-center'>

![](/img/docs/agentic-trinity.png)

</div>

These three parts form the foundation of any AI agent. Without one of them, the system cannot function as a true agent.

- The model is the brain
- The tools connect the system to the outside world
- The orchestration layer controls the decision cycle

### The Model As The Brain

The model is usually a large language model. It understands your request and decides what needs to happen.

- It interprets the user’s goal
- It breaks the goal into smaller steps
- It decides what action should happen next

For example, if you request a travel plan, the model identifies the destination and dates. It then determines that it must check availability, search flights, compare hotels, and prepare a proposal.

Without the model, there is no reasoning or planning. The model gives the agent intelligence and direction.

### Tools Connect The Agent To The World

Even the smartest model cannot act without tools. Tools allow the agent to gather information and perform actions.

- They retrieve real-time information
- They interact with external systems
- They execute specific tasks

In a travel example, tools might include a calendar API, a company policy document, or a booking website API. The model decides which tool to use, and the tool performs the action.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-180824.png)

</div>

Tools extend the agent’s capabilities beyond text generation. They allow it to interact with real systems.

### Orchestration Controls The Loop

The orchestration layer manages how the agent thinks and acts over time. It keeps the process running until the goal is achieved or a stopping condition is met.

- It receives input and passes it to the model
- It tracks memory and past actions
- It decides whether to continue or stop

Orchestration works like a control loop. The agent receives data, the model reasons about it, a tool may be called, and the result is evaluated. This cycle repeats until the objective is completed.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-181000.png)

</div>

Orchestration can be simple with basic rules, or advanced with complex reasoning chains. Regardless of complexity, it ensures the agent continues working toward the goal.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-181054.png)

</div>

## When To Use AI Agents

AI agents are powerful, but they are not always necessary. The right solution depends on the type of problem you are solving.

Imagine two customer support teams at an online store.

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-184614.png)

</div>

Team A mostly receives tickets like tracking an order, returning an item, or changing a shipping address. 

- The questions are predictable and have clear answers. 
- They do not require accessing customer history or making complex decisions.

Team B mostly receives tickets like double charges, canceled orders with partial refunds, or incorrect store credit. 

- These problems require checking customer records
- Requires understanding past actions, and deciding on corrective steps.

Because of this difference:

1. Simple and predictable problems need a chatbot

    A chatbot that answers from trained knowledge is enough for Team A. An AI agent is better for Team B because it can access data, reason through edge cases, take actions, and update systems.

2. Complex and adaptive problems need an AI agent

    Use AI agents when the problem requires reasoning, tool usage, and adaptive decision making. Avoid them when simple automation is enough.


## The AI Agent Tooling Ecosystem

After deciding to use an agent, the next step is choosing the right tooling. The ecosystem ranges from ready-made tools to fully custom frameworks.

| Tool Type           | Description                                                                       | When To Use                                                        | Trade-Off                                         |
| ------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------- |
| Off-the-shelf tools | Ready-made solutions that solve specific problems                                 | Focused use cases like AI coding assistance or research automation | Quick to adopt but limited customization          |
| Low-code platforms  | Platforms that allow limited customization through visual or guided configuration | Moderately complex workflows that follow common patterns           | Easier for business users but not fully flexible  |
| Agent frameworks    | Development frameworks for building agents from scratch                           | Highly specialized systems, sensitive data, or core business logic | Full control but requires more engineering effort |

**Note:** The more control you need, the more engineering effort is required. 

<div class='img-center'>

![](/img/docs/Screenshot-2026-02-27-185501.png)

</div>

## Build Versus Buy Decision

- **Buy when a mature solution already exists**

  - Ideal if you want fast deployment and low maintenance
  - Best when the problem is common and already well solved in the market

- **Use low-code when partial customization is enough**

  - Use this when you need some flexibility but not full ownership
  - Suitable when business users need to modify workflows without heavy engineering

- **Build when full control is required**

  - When your system must integrate deeply with proprietary systems
  - When the agent itself is central to your product

Not every problem requires a fully custom agent. Match the level of investment and control to the complexity and importance of the problem.
