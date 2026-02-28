---
title: "MCP and A2A"
description: "Model Context Protocol and Agent-to-Agent Protocol"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
- Model Context Protocol
sidebar_position: 30
--- 

## Overview 

Agents often need data from databases, APIs, and internal systems to complete tasks. Connecting to these sources sounds simple, but in practice it becomes complex very quickly.

- Each data source needs custom integration
- Custom code increases development time
- Maintenance becomes harder as systems grow

When every system uses a different format or authentication method, developers must write new integration logic again and again. This slows down development and makes agent systems harder to scale.

A better approach is to use a shared standard so agents can connect to tools in a consistent way. That is where the **Model Context Protocol** comes in.


## Model Context Protocol (MCP)

Model Context Protocol, or MCP, is an open standard created by Anthropic. It defines a consistent way for AI systems to connect to external tools and data sources.

- Universal connection standard
- Works across different models
- Reduces custom integration work

Instead of building a new connector for every database or API, developers can expose systems through MCP. Agents can then interact with them using the same structure. This makes systems more adaptable and easier to maintain.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27234556.png)

</div>


### MCP Architecture

MCP has three main parts that work together.

- **Host**

  - The host is the AI application, such as an agent system. 
  - It is the part that needs data or wants to perform actions.

- **Client**

  - Acts as a middle layer between the host and each MCP server. 
  - There is usually one client per server.

- **Server**

  - The server exposes data or functionality. 
  - It translates requests from the host into the correct format
  - Example: Converting a request into HTTPS for web data.


### MCP Server Primitives

MCP servers expose their capabilities using three core building blocks.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27235330.png)

</div>

These primitives make it easier for agents to understand what a server can provide and how to use it.

- **Resources**

  - Resources are data sources. 
  - These can include database records, live system data, or files.

- **Tools**

  - Tools are callable functions. 
  - Agents can discover available tools and call them
  - Agents can read the results before responding to the user.

- **Prompts**

  - Prompts are reusable prompt templates. 
  - They help guide structured or complex workflows.

### Example: Calling an MCP Tool

In the example below, the variable `tool_name` represents the name of the tool exposed by the MCP server, and `arguments` contains the required input parameters.

```json
{
  "tool_name": "get_customer_record",
  "arguments": {
    "customer_id": "12345"
  }
}
```

Output:

```json
{
  "customer_id": "12345",
  "status": "active",
  "plan": "premium"
}
```

The agent reads the result and then decides the next step. This structured interaction is consistent across MCP servers, which reduces integration complexity.

## Agent-to-Agent (A2A) Protocol

The Agent-to-Agent protocol, or A2A, was introduced by Google to help agents collaborate, even if they are built by different vendors or use different frameworks.

<div class='img-center'>

![](/img/docs/image5_VkA.png)

</div>

Instead of tightly coupling systems together, A2A defines a standard way for one agent to delegate work to another. This makes multi-agent systems easier to scale and maintain.

### Example: Corporate Travel with Multiple Agents

Imagine a company building a corporate travel agent. Employees chat with it to book business trips.

- Collects travel details from employees
- Reads company travel policies
- Delegates tasks to specialized agents

The main travel agent might contact:

- A flight booking agent
- A hotel booking agent
- A ground transport agent
- A reimbursement agent

Each of these agents may require different inputs and authentication methods. Without a shared protocol, changing providers or updating one agent could require major code changes. A2A reduces this complexity by standardizing how agents communicate.

<div class='img-center'>

![](/img/docs/all-things-ai-a2a-travel.png)

</div>

### A2A Core Roles

A2A defines two main roles in agent communication.

- **Client agent** - Receives the user request and breaks it into tasks. 
- **Remote agent** - Receives a task and performs the required action.

In the travel example, the company travel agent is the client agent. The booking and reimbursement agents are remote agents. The client coordinates the work, and the remote agents execute it. This keeps responsibilities clear and structured.


### Agent Discovery with Agent Cards

A2A allowa agents to understand each other agents using **agent cards.**

- Shares agent name
- Describes supported tasks
- Lists available features

An Agent Card acts like a capability profile. It tells other agents what tasks it can handle and whether it supports features like streaming responses. This helps agents decide when and how to call each other.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-28133018.png)

</div>

### A2A Communication Components

A2A standardizes how agents send tasks and receive results using the following:

- **Agent executor** 

  - Responsible for initiating the task
  - Sends user context and task details to the remote agent.
  - Formats the request in a structured, standardized way
  - Handles authentication and communication setup

- **Event queue**

  - Manages status updates and messages
  - Useful for long-running tasks
  - This prevents connections from closing too early

When the remote agent completes the task, it returns an **artifact**. An artifact contain:

- The result
- A description of what was done
- Relevant context

Once returned, the interaction is complete until the agent is needed again.

<div class='img-center'>

![](/img/docs/all-things-ai-A2A-COMMS.png)

</div>

### MCP and A2A Together

MCP and A2A solve different but related problems.

- MCP connects agents to tools and data
- A2A connects agents to other agents

MCP helps agents access external systems in a standardized way. A2A helps agents collaborate with each other in a standardized way. Together, they enable modular, scalable, and interoperable agent architectures.
