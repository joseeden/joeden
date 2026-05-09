---
title: "Agent Skills"
description: "Enhance the capabilities of AI agents using agent skills"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
- Github Copilot
sidebar_position: 50
--- 

## Overview 

Agent Skills are like a mix of custom prompts and tool integrations. Instead of stuffing everything into one prompt, you create small tools with instructions, scripts, and references. Copilot only loads them when it thinks they are useful, which keeps things fast and efficient.

- Break tasks into tools
- Load only when needed
- Reduce context usage

This is great for complex workflows that need multiple steps or different types of actions. Each skill can be focused on a specific part of the problem, which makes it easier for Copilot to help you.

## Agent Skills vs MCP

Quick comparison of how agent skills and MCP handle context and loading.

| Feature          | MCP                             | Agent Skills                     |
| ---------------- | ------------------------------- | -------------------------------- |
| Loading behavior | Loads everything upfront        | Loads on demand                  |
| Context usage    | High, can fill quickly          | Low, loads only when needed      |
| Initial data     | Full tool data is loaded        | Only short description is loaded |
| Efficiency       | Less efficient for large setups | More efficient and scalable      |

With MCP, all tools and their data are loaded into the context immediately, which can quickly consume the context window.

Agent Skills start with just a short description. The model decides if the skill is needed, and only then loads the full instructions or scripts.

## What an Agent Skill Contains

Each skill is just a simple folder with a few parts.

- skill.md defines the skill
- Scripts run actions
- References provide extra info

The `skill.md` file is required and contains metadata like name and description. The description is important because Copilot uses it to decide when to use the skill.

This structure keeps each tool clean and reusable.

## Example: Creating a Chart Skill

Here is a simple example of a skill that generates a chart from database data.

- Query database
- Generate chart
- Export PNG

In this example, the database URL is stored in `.env`.

Before running, make sure your `.env` has a variable like `DATABASE_URL`.

In the example below, a Python script queries data and generates a chart.

```python
import os
import psycopg2
import matplotlib.pyplot as plt

db_url = os.getenv("DATABASE_URL")

conn = psycopg2.connect(db_url)
cursor = conn.cursor()

cursor.execute("""
SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*)
FROM links
WHERE created_at >= NOW() - INTERVAL '12 months'
GROUP BY month
ORDER BY month;
""")

data = cursor.fetchall()

months = [str(row[0]) for row in data]
counts = [row[1] for row in data]

plt.bar(months, counts)
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig("monthly_links_chart.png")
```

Expected result:

```bash
monthly_links_chart.png
```

This creates a bar chart showing links created per month.

This shows how Agent Skills can automate multi-step workflows.

## How Copilot Uses the Skill

You can trigger the skill in two ways.

- Use a slash command
- Use a natural prompt

Example prompt:

```bash
Generate a monthly links chart image
```

Copilot reads the skill description, decides it is relevant, and runs the scripts.

This keeps usage simple while still being powerful.

## Installing Skills Safely

You can install community skills, but be careful.

- Only trust known providers
- Scripts can run locally
- Prefer building your own

Some skills can execute code on your machine, so only install from trusted sources.

This keeps your environment secure while still using Agent Skills effectively.

## Key Idea

Agent Skills turn complex tasks into reusable tools that Copilot loads only when needed.

This keeps your workflow efficient, focused, and scalable.
