---
title: "Managing Models"
description: "View and manage models in Ollama"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
- Open LLMs
- Ollama
sidebar_position: 15
# last_update:
#   date: 9/21/2024
---


## Overview

Ollama lets you save your work and reuse it later.

When you save a session, Ollama creates a new model that includes your current settings, system prompt, and chat history.

1. Save a session
2. Load a saved session
3. Reuse prompts and settings
4. Manage local models
5. Remove unused models

This makes it easy to continue previous work without setting everything up again.

## Save a Session

You can save the current session using the `/save` command.

Under the hood, Ollama actually saves a copy of the original model with your custom settings and history.

In the example below, I add my name "Eden" into the conversation before saving.

```text
Hi, I am Eden.
```

Save the session:

```text
## "s1" can by any name you choose for the saved model.
/save s1  
```

Output:

```text
Created a new model 's1'
```

The saved model now contains the current chat history and settings.

Now you can exit the session or start a new one without losing your work.

```bash
/bye 
```

### Load a Saved Session

Start the model again:

```bash
ollama run <your_model_name>
```

Load the saved session.

```text
/load s1
```

Now ask a question:

```text
What's my name?
```

Output:

```text
Your name is Eden.
```

Even though the name was not entered in the current session, Ollama remembers it because it was saved previously.

This makes saved sessions useful for continuing previous conversations.

### What Gets Saved

When you save a session, Ollama stores more than just the chat history.

1. Chat history
2. System prompt
3. Parameter settings
4. Session configuration

The saved model starts with all of these settings already loaded.

You can think of it as a customized version of the original model.

## Save a System Prompt

System prompts can also be saved.

In the example below, a system prompt is configured before saving.

```text
/set system You are a friendly customer support agent. Do not approve refunds.
```

Save the session:

```text
/save s1
```

Exit the session:

```text
/bye
```

Start a new session and load the saved model:

```text
ollama run <your_model_name>

/load s1
```

Verify the system prompt:

```text
/show system
```

Output:

```text
You are a friendly customer support agent. Do not approve refunds.
```

The system prompt is restored because it was saved with the model.

## View Available Models

Ollama stores downloaded and custom models locally.

To see all available models, run:

```bash
ollama list
```

Output:

```text
NAME                ID              SIZE      MODIFIED           
s1:latest           df44b2559dee    9.6 GB    About a minute ago    
gemma3:4b           a2af6cc3eb7f    3.3 GB    28 minutes ago        
gemma4:e4b          c6eb396dbd59    9.6 GB    About an hour ago     
minimax-m3:cloud    d03a959f45c0    -         About an hour ago 
```

The list includes:

- Downloaded models
- Custom saved models
- Derived models
- Current session models

This is the main command used to see what models are available.

## View Running Models

Ollama keeps recently used models in memory.

To see currently running models:

```bash
ollama ps
```

Output:

```text
NAME          ID              SIZE      PROCESSOR    CONTEXT    UNTIL              
gemma4:e4b    c6eb396dbd59    9.5 GB    100% CPU     4096       3 minutes from now    
```

Notice that it has the "UNTIL" column which shows how long the model will remain in memory before it is automatically removed.



## Run a Saved Model Directly

You can run a saved model without loading it manually.

In the example below, `s1` is a saved model.

```bash
ollama run s1
```

Output:

```bash
>>> Hi, I am Eden.
Hi Eden! It's nice to meet you. 😊

How can I help you today? Is there anything specific you're looking to chat about or work on?

>>> What's my name?
Your name is Eden. 😊

>>> 
```

The model starts with all saved settings and history already loaded.

This is often faster than loading a session manually.


## Inspect a Model

You can view information about a model without starting it.

In the example below, `gemma4:e4b` is inspected.

```bash
ollama show gemma4:e4b
```

Output:

```text
Model
  architecture: gemma3
  parameters: 4B
  quantization: Q4_K_M
```

This is useful when you want to learn more about a model before running it.

## Inspect a Custom Model

Custom models can also be inspected.

In the example below, `s1` is a saved model.

```bash
ollama show s1
```

Output:

```text
Model
  architecture: gemma4
  parameters: 4B
```

This helps identify:

- Which base model was used
- Model size
- Model configuration

It is useful when you forget what a custom model was created from.

## Remove a Model

Unused models can be removed from your system.

In the example below, `s1` is deleted.

```bash
ollama rm s1
```

Output:

```text
Deleted 's1'
```

Use this command to clean up old or unused models.

## Storage Usage

Saved models do not always create a full copy of the original model.

Ollama stores only the differences between the original model and the saved version.

For example:

- Original model: `gemma4:e4b`
- Saved model: `s1`

Ollama reuses the original model files and only stores the additional settings and chat history.

This helps reduce disk usage while still allowing multiple custom versions of the same model.
