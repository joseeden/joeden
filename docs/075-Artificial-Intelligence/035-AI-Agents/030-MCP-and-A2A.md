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

These primitives make it easier for agents to understand what a server can provide and how to use it.

<div class='img-center'>

![](/img/docs/Screenshot2026-02-27235330.png)

</div>


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
