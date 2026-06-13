---
title: "Switching Models"
description: "How to switch and customize models in GitHub Copilot"
tags: 
- Artificial Intelligence
- AI Agents
- Agentic Systems
- Large Language Models
- Github Copilot
sidebar_position: 20
--- 


## Overview

GitHub Copilot supports multiple models from providers such as OpenAI, Anthropic, and Google. The model you choose will depend on the kind of work you are doing.

- Use faster models when you want quick responses or lightweight autocomplete help.
- Use reasoning-focused models when you need deeper analysis, multi-step problem solving, or broader code changes.

It is also worth checking feature support before switching. Not every model supports every Copilot feature, and some models may not be available in Agent mode or in other workflows.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09214409.png)

</div>

At the time of writing, that default is **GPT-4.1**.

It is a practical general-purpose choice because it is fast, reliable, and supported across Copilot modes, including Agent mode.

## Reasoning Models

If you are working on something more involved, a reasoning model may be a better fit.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09214735.png)

</div>

These models usually take a bit longer to respond, but they often produce better structure and better accuracy when the task involves several steps or a larger amount of context.

They are especially useful for:

- Refactoring across multiple files
- Debugging backend logic
- Planning larger changes
- Working with tools in Agent mode

Sample reasoning models:

- Claude Sonnet 4
- GPT-5
- Claude Opus 4.1


## Different Models for Different Work

You do not have to use the same model everywhere. You can use one model for chat, where depth matters more, and another model for code completions, where speed matters more. This is useful if you want stronger reasoning in chat but faster inline suggestions while coding.

To switch the model used in Copilot Chat, open the chat model picker and select the model you want to use. The change applies immediately to new messages.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09214848.png)

</div>

If you are on a paid Copilot plan, you may see usage multipliers next to some models (as seen in the image above). These show how each model counts against your premium request quota.

You can also customize the list of models that appears in the picker:

1. Open the model picker.
2. Select **Manage Models**.
3. Choose which models you want to keep visible.

This makes it easier to switch quickly between the models you actually use.

<div class='img-center'>

![](/img/docs/Screenshot2026-04-09215150.png)

</div>

## Custom Models

Copilot can also connect to a model through your own API key. This can be useful if you want to:

- Test a newer model
- Connect to a private deployment
- Work around limits on the built-in options
- Explore advanced use cases

To add your own model:

1. Open the chat model picker and click **Manage Models**.

3. Choose your provider (e.g. OpenAI).

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-04-09215518.png)

    </div>

4. Enter your API key and any required connection details, such as an endpoint URL or a model name.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-04-09215637.png)

    </div>

5. The model should appear in the picker and can be selected like any built-in option.

A few important notes about custom models:

- It applies to chat only.
- It does not apply to code completions or commit message generation.
- It may not support all Copilot features, such as tools, vision, or syntax-aware behavior.

Copilot still relies on its own systems for capabilities such as indexing and some workspace features.

:::info 

At the moment, custom models are only available for individual users, but not for Copilot Business or Copilot Enterprise accounts.

:::


## Switching the Code Completions Model

You can also choose a separate model for code completions.

To change it:

1. Open the Copilot menu from the title bar.
2. Select **Configure Code Completions**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-04-09220430.png)

    </div>

3. Choose **Change Completions Model**.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-04-09220525.png)

    </div>

4. Pick the model you want to use.

    <div class='img-center'>

    ![](/img/docs/Screenshot2026-04-09220559.png)

    </div>
