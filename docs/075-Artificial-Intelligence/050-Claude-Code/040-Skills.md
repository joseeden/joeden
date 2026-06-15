---
title: "Skills"
description: "Creating and using custom skills in Claude Code"
tags: 
- Artificial Intelligence
- Large Language Models
- AI Agents
- Claude AI
sidebar_position: 40
--- 

## Overview

Skills are reusable instructions that guide the AI whenever a consistent process is needed. They define the exact method for a task rather than assigning it to a specific role. 

Skills are loaded in two stages to save memory. 

1. The name and description are always available
2. The full details are only fetched when a request matches. 

This keeps your active session clean and efficient by withholding unnecessary guidelines until they are needed.

<div class='img-center'>

![](/gif/docs/06062026-claude-code-skills-demo.gif)

</div>





## Skills Directory 

Skills are stored inside the `.claude` directory in a dedicated `skills` folder. They can be shared at project level or used personally depending on where they are placed.

Personal skills (all projects):

```bash
~/.claude
└── skills
    └── my-skills
        └── SKILL.md
```

Project skills (specific to a project and shared via git):

```bash
project-directory
└── .claude
    └── skills
        └── my-skills
            └── SKILL.md
```

This structure keeps skills organized and reusable across different environments.


## `SKILL.md` Structure

Each skill is defined in a `SKILL.md` file that contains metadata and step-by-step instructions. The description tells Claude when to use it, and the body defines the process.

Unlike agents, skills are more manual to create, but still flexible and reusable.

As an example, a `SKILL.md` for unit testing might look like this:

```markdown
---
# SKILLS.md
name: "Unit Testing"
description: "Use pytest unit tests to verify function behavior in Pyhton."
---
When writing unit tests, follow these steps:
1. Identify the function to test
2. Define clear input and expected output
3. Use descriptive test names 
4. Write the test case for normal cases 
5. Write the test cases for edge cases (empty input, invalid data)
6. Run the tests and verify results
```


:::info 

**Sample Skill: Unit Testing**

Unit testing is a good example of a skill because it always follows a predictable structure. Each test checks one function with a clear input and expected output.

- One function per test
- Clear input and output
- Pass or fail results

This consistency makes unit tests a reliable safety layer when changing code.

:::



## Creating a Skill Manually

1. Create a skill folder in the project root.

    ```bash
    mkdir -p .claude/skills/skill-unit-tests 
    ```

2. Add a `SKILL.md` file with the frontmatter and instructions.

    You can open the file in your editor and write the content or ask Claude to generate it for you. 

    ```bash
    touch .claude/skills/skill-unit-tests/SKILL.md
    code .claude/skills/skill-unit-tests/SKILL.md
    ```

3. Save the file and start Claude. 

4. Confirm if the skill is registered and ready to use.

    ```bash
    /skills
    ```

This makes the skill available for reuse once it is registered in the system.


## Skills vs Agents

Skills and agents solve different problems and are chosen based on workflow needs. 

Skills are ideal for tasks that require consistency and repeatability, while agents are better for tasks that require specialized knowledge or decision-making.

| Aspect   | Skills                       | Agents                          |
| -------- | ---------------------------- | ------------------------------- |
| Purpose  | Repeatable process           | Specialized task handling       |
| Focus    | How to do something          | Who performs the task           |
| Scope    | Workflow steps               | Independent execution           |
| Use case | Testing, refactoring, checks | Investigation, planning, review |
| Location | `.claude/skills`             | `.claude/agents`                |
| Invocation | `/skill-name` or automatic | `@agent-name` or automatic      |

Skills and agents can work together to create more powerful workflows. An agent can use a skill as part of its toolkit. This pairing allows structured processes to be executed by specialized agents consistently.

## Example: Refactoring as a Skill

**Refactoring** is improving code structure without changing its behavior. The logic stays the same, but the structure becomes cleaner and easier to maintain. It can include:

- Extracting helper functions
- Renaming unclear variables
- Simplifying complex logic

**Unit tests** make this process safe by confirming that behavior does not change before and after updates. They act as a safety check while the structure is being improved.

- Run tests before changes
- Run tests after refactoring
- Ensure behavior stays the same

Refactoring becomes even more reliable when guided by a structured skill. The process ensures changes are incremental, tested, and predictable.

- Verify tests exist first
- Make small controlled changes
- Confirm all tests pass

This ensures refactoring is consistent and repeatable across different developers.



## Hooks

Hooks are automatic shell commands that run when Claude performs actions using tools like file edits or reads. They are useful for automating follow-up tasks that should always happen after certain actions, such as running tests after code changes or logging modifications.

Configuration file:

```bash
.claude/settings.json
```


:::info 

The `settings.json` file is where you define all Claude Code settings, not just hooks. 

For more information, please see [Configuration and Sessions.](/docs/075-Artificial-Intelligence/050-Claude-Code/013-Configuration-and-Sessions.md)

:::

Every tool action defined in the settings file follows a consistent flow where hooks can be inserted at different stages. The stages are:

| Stage         | What it does                              | When it runs             |
| ------------- | ----------------------------------------- | ------------------------ |
| `PreToolUse`  | Checks or blocks an action before it runs | Before the tool executes |
| `Tool`        | Performs the requested operation          | During execution         |
| `PostToolUse` | Runs follow-up actions like tests or logs | After the tool completes |


In the example below, a `PostToolUse` hook is set to run after any file write or edit. It executes tests and then logs the change:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && python -m pytest --tb=short -q"
          },
          {
            "type": "command",
            "command": "echo 'file modified' >> hook.log"
          }
        ]
      }
    ]
  }
}
```

Note that hooks run in the background, so their output is not always visible by default. This makes it important to have a logging mechanism to ensure that progress and failures can be tracked over time.

A sample log shows how results appear after each change:

```text
[11:22:33] Running PostToolUse hooks for Write/Edit...
[11:22:33] Executing command: cd /path/to/project && python -m pytest --tb=short -q
[11:22:34] Tests passed successfully.
[11:22:34] Logged file modification to hook.log.
```

