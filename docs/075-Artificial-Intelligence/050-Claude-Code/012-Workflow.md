---
title: "Workflow"
description: "Workflow for using Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 12
--- 

## Coding Workflow

This simple workflow helps guide Claude through the task step by step.

1. Initialize the project
2. Explore the codebase
3. Plan before coding
4. Review the plan
5. Write code after review
6. Commit and test the changes 
7. Iterate as needed

This approach helps ensure the output aligns with existing structure instead of introducing random or conflicting changes.

## Planning

Plan mode allows the AI to research your files and suggest a strategy without modifying your project yet. This is the best stage to correct any mistakes before the development work begins.

To switch to plan mode, use the shortcut `Shift + Tab` or type:

```bash
claude
```

If you skip planning, Claude may generate code immediately without understanding the full context. This can result to a working solution that does not match the project design

<div class='img-center'>

![](/gif/docs/06062026-claude-code-planmode.gif)

</div>


## Coding and Testing

Once you approve the plan, the development phase begins. To help the AI implement the plan correctly, provide the right validation tools. This ensures that the AI can fix errors automatically and guarantees that the new features work correctly.

- Set up a test suite for constant validation
- Create a configuration file to save permanent solutions
- Let the AI run tests to verify its own work

<div class='img-center'>

![](/gif/docs/06062026-claude-code-implem-commit.gif)

</div>

## Reviewing and Committing

The final phase focuses on checking the quality of the work and saving your progress.

Before you commit the changes, you can run a **subagent reviewer** to check the files. The subagent can give a fresh perspective and removes any bias from the main coding session. 

<div class='img-center'>

![](/gif/docs/06062026-claude-code-subagent-review.gif)

</div>
