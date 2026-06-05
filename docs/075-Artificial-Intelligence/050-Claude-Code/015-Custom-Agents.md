---
title: "Custom Agents"
description: "Creating and using custom agents in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 15
--- 

## Overview

Agents are specialized helpers that handle specific types of work. Each agent has a defined role, and Claude delegates tasks to them when needed.

- Each agent operates independently
- This reduces clutter in the main session
- *Explore* agent is read-only for safe investigation

Claude includes a few built-in agents that handle common workflows:

| Agent   | Purpose                                 | Used in                                           |
| ------- | --------------------------------------- | ------------------------------------------------- |
| Explore | Reads code without making changes       | Investigation and understanding codebases safely  |
| Plan    | Prepares structured steps before coding | Designing approach before implementation          |
| General | Handles most everyday tasks             | Default agent for general prompts and coding work |

Custom agents help enforce consistency across repeated tasks. Instead of rewriting instructions every time, rules are defined once and reused.

## Creating an Agent 

An agent is created as a markdown file inside a `.claude/agents` folder. Each agent file needs three components:

- Name defines the agent identity
- Description defines when to trigger it
- Body contains the instructions

This structure makes agents easy to update and maintain as project needs change.

Sample agent file structure:

```markdown
---
# Code Reviewer Agent
name: code-reviewer
description: Review code for industry standards and best practices
---
Check for:
1. Clear naming conventions
2. Proper error handling
3. Performance optimizations
```

Once you have the structure, you can create an agent using: 

```bash
/agents 
```

Then proceed with setting the configurations:

```bash
[Select] Create new agent 
[Select] Project level (.claude/agents) 
[Select] Generate with Claude (recommended)
```

Here, the agent is configured at the project level so it is available to the entire team.

Claude will ask for the required details and generate the agent file automatically. Review the generated content, adjust anything if needed, then approve it.

After approval, the file is created inside the `.claude/agents` folder and can be reused in future sessions.

```bash
project-directory/
├── README.md
├── main.py
├── app.py
├── routes.py
├── requirements.txt  
└── .claude
    └── agents
        └── code-reviewer.md
```

## How Claude Uses Agents

Claude acts as an orchestrator when handling requests. Simple tasks are handled directly, while complex or structured tasks may be delegated to sub-agents.

- Direct tasks are handled by Claude itself
- Complex tasks may spawn sub-agents
- Each agent runs in isolated context

This separation keeps the main conversation clean and improves reliability when handling larger workflows.

## Using a Custom Agent

Custom agents are triggered by referencing their name in the prompt using `@`. Claude then routes the request to the correct agent based on its definition.

For example, to use the code reviewer agent:

```bash
@code-reviewer Please review the code in routes.py for any issues.
```

Claude will then execute the instructions defined in the `code-reviewer.md` agent file and return the results.

