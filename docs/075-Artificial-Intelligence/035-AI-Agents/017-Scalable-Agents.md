---
title: "Scalable Agents"
description: "Key agentic design principles to set up your agents for scaling"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
sidebar_position: 17
--- 

## Agentic Applications

AI agents are one part of a larger system. They usually interact with users through chat boxes, dropdowns, or other input elements, while the model runs separately, often on a server.

- Users interact with agents via conversational interfaces
- Models are hosted separately and can be provider-hosted or self-hosted
- Tools and storage support actions and data collection

Keeping all parts connected ensures the agent works effectively and minimizes failures.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27203557.png)

</div>


## When to Use Agents

Agents are ideal for problems that are complex, multi-step, or open-ended. They shine when tasks require planning, tool use, and adaptability to changing conditions.

✅ Complex problems require multiple steps and tool calls
✅ Open-ended problems benefit from flexible workflows
✅ Agents adapt to evolving data and user preferences

For simple, static tasks, traditional IT solutions may be more efficient. Agents are best where adaptability and multi-step reasoning are needed.

Example: 

- **Sending reminder emails**

  - Limited options and outcomes
  - User list does not change
  - Better suited for **IT automation, not an agent**

- **IT support for employees**

  - Employees ask varied questions about products or software
  - Product list changes over time
  - Open-ended, complex problem **fits an agentic solution**


## Scaling AI Agents

Scaling agents means they can handle more users, varied inputs, and potential misuse while keeping performance high. There are three pillars which ensures agent remains stable and responsive even as usage grows

- Robust infrastructure and tooling
- Modular design architecture
- Continuous evaluation and feedback loops

### Robust Infrastructure and Tooling

Solid infrastructure prevents bottlenecks and supports consistent performance during scaling.

- Compute handles running agent processes
- Storage logs states, chats, and system activity
- Deployment pipelines and tools reduce errors and streamline updates

In addition to compute and storage, we also need reliable deployment pipelines and agent tooling to make updates safe and system operations smooth.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27204458.png)

</div>

### Modular Design Architecture

Modular design separates components so they can be developed, updated, and maintained independently. 

- Software components like UI, agents, and databases are independent
- Multi-agent systems assign specialized roles to each agent
- Updates to one part do not affect the whole system

Agents themselves can be modular, with each handling specific tasks, which allows complex systems to evolve without breaking other parts.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27222745.png)

</div>

#### Example: Customer Support Multi-Agent

In a support system, one agent retrieves information while another responds in a defined tone. 

- Retrieval agent handles data gathering
- Response agent communicates with users
- Agents operate in defined domains

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27223316.png)

</div>


### Continuous Evaluation and Feedback Loops

Continuous monitoring helps detect issues early and improve performance over time. Track key metrics such as:

- Success rates
- Error rates
- Latency

In addition, collecting user feedback helps refine prompts, improve tool selection, and enhance data quality. Together, monitoring and feedback ensure the agent becomes more reliable and effective as it scales.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27223831.png)

</div>
