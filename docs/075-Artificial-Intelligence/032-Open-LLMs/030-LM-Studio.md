---
title: "LM Studio"
description: "Running LLM locally with LM Studio"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
- Open LLMs
sidebar_position: 30
# last_update:
#   date: 9/21/2024

---

## Overview

LM Studio is a tool used to run open large language models locally. It can be downloaded directly from the official website: [LMStudio.ai](https://lmstudio.ai/).

- Supports macOS, Windows, and Linux
- Installer auto-detects your system
- Manual OS selection is available if needed

After downloading, you simply install it like any normal application. If the system detection is wrong, you can manually choose your operating system from the download page.

Once installed, you launch the app and move into the main interface.


## Getting Started

When LM Studio opens, you will see a main workspace designed for chatting with local models.

- The chat window is where you talk to the model. 
- The sidebar stores your previous conversations so you can revisit them later. The model loader is where you choose and load models for local use.

You may also see different modes such as user mode, power mode, and developer mode, depending on the version. These mainly control how much access you have to advanced settings.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-12020847.png)

</div>

### Settings and Customization

LM Studio includes settings that let you adjust how the application looks and behaves.

- Theme selection like light or dark mode
- Language configuration options
- System-based automatic appearance mode
- General app preferences

These settings are optional but useful for personalizing the experience. Most default settings work well out of the box, so no complex configuration is required to start using the tool.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-12021202.png)

</div>


### Using Quantized Models

Most local models are not the original full-size versions. Instead, they are compressed (quantized) to reduce memory usage.

- Smaller file size
- Lower RAM or VRAM usage
- Faster performance on local machines
- Slight trade-off in precision

Quantization reduces the precision of model weights (for example, 4-bit instead of full precision), which makes it practical to run on consumer hardware. 

For more information, please see [Quantization.](/docs/075-Artificial-Intelligence/032-Open-LLMs/018-Quantization.md)


### Finding Models on Hugging Face

You can browse models directly on Hugging Face and check how they can be used locally.

1. Search and browse model catalog
2. Open a model card for details
3. Check supported runtimes (LM Studio, Ollama)
4. Requires Hugging Face login for integration

On a model page, Hugging Face shows a dropdown that lists supported apps like LM Studio or Ollama. If supported, you can often launch or download the model directly from there.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-11213222.png)

</div>

However, not all models work with LM Studio in raw form, so you usually need a compatible version.

To use it, you can select a model in Hugging Face that supports LM Studio, then click **Use this model**.

<div class='img-center'>

![](/img/docs/Screenshot2026-06-12022558.png)

</div>

Alternativey, you can find compatible models directly in LM Studio's model loader, which often lists popular options. 

<div class='img-center'>

![](/img/docs/Screenshot2026-06-12023318.png)

</div>

The choice depends on your system capacity, especially RAM and GPU memory.

- 1B parameter model ➜ very light, runs on weak machines
- 12B parameter model ➜ balanced performance and quality
- 27B parameter model ➜ high quality, needs more RAM

### Loading Models 

After download, you must explicitly load the model before chatting with it.

**UPDATE:** You can click the "Use in New Chat" button to start a conversation immediately after downloading the model, which automatically loads it for you. 

<div class='img-center'>

![](/img/docs/Screenshot2026-06-12035333.png)

</div>

### System Resource Usage

When a model runs locally, it consumes system memory and sometimes GPU memory.

- RAM usage depends on model size
- VRAM usage depends on GPU support
- CPU handles fallback if no GPU is available
- Unified memory systems combine RAM and VRAM

On systems like Apple Silicon, memory is shared, so RAM and VRAM are unified. On other systems, GPU memory may be separate.

### Running a Local Chat Session

Once the model is loaded, you can start chatting normally inside LM Studio.

1. Open new chat
2. Send prompt to model
3. Receive formatted markdown response
4. Works even without internet

The model runs fully offline, so internet access is not required after download.

<div class='img-center'>

![](/gif/docs/06122026-lm-studio-demo-chat.gif)

</div>


## System Prompts

A system prompt is a base instruction that guides how an AI model behaves throughout a chat.

- Has higher priority than user messages
- Applies to the entire conversation
- Can be saved and reused with presets

You can think of a system prompt as a set of instructions that the model reads before processing user messages.

For example, a system prompt could say:

```text
You are an creative poet.
Your answer should always be in rhymes.
```

If the user then asks:

```text
Define cloud computing
```

The model will try to answer in rhymes because the system prompt instructed it to do so.

This makes system prompts useful for controlling behavior, tone, formatting, or other rules throughout a conversation.

<div class='img-center'>

![](/gif/docs/06122026-lm-studio-demo-chat-2.gif)

</div>

All these chats are simply JSON files, which you can view by right-clicking on the chat and selecting "Show in Folder". You can open the JSON file in a text editor to see the system prompt and user messages.

<div class='img-center'>

![](/gif/docs/06122026-lm-studio-demo-chat-3.gif)

</div>


### Saving System Prompts as Presets

Many AI tools allow you to save system prompts as presets.

- Reuse common instructions
- Avoid retyping prompts
- Apply rules automatically
- Keep behavior consistent

For example, you might create a preset called:

```text
You are an expert poet.

Answer in rhymes.
```

The preset could contain:

```text
Provide a 3 months roadmap for studying web development.
```

Whenever that preset is selected, the system prompt is automatically applied to new chats.


<div class='img-center'>

![](/gif/docs/06122026-lm-studio-demo-chat-4.gif)

</div>

### Practical Uses

In practice, system prompts are usually used for more useful instructions than rhyming.

Common examples include:

- Respond as a technical tutor
- Use simple language
- Provide step-by-step explanations
- Format responses in Markdown
- Keep answers concise
- Focus on a specific topic

Example system prompt:

```text
You are a technical tutor.

Explain concepts in simple language.
Provide examples where helpful.
Keep responses concise and beginner-friendly.
```

With instructions like these, the model can maintain a consistent style throughout the conversation.

### Presets vs Regular Chats

A regular chat may start without a system prompt.

When a preset is selected:

- The system prompt is loaded automatically
- The same rules apply to every new chat using that preset
- No need to re-enter instructions

Without a preset, the model uses its default behavior or any system prompt already configured for that conversation.

This makes presets a convenient way to reuse common instructions and keep model behavior consistent across multiple chats.
