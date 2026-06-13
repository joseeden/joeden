---
title: "Configure Sessions"
description: "System Messages and Model parameters in Ollama"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
- Open LLMs
- Ollama
sidebar_position: 13
# last_update:
#   date: 9/21/2024
---

## Overview

Ollama lets you change settings while a model is running.

These settings only apply to the current chat session unless stated otherwise.

1. Set system prompts
2. Change model parameters
3. Enable verbose mode
4. Configure context size
5. Control command history

These settings help you customize how the model behaves during a session.

## View Available Settings

To see all configurable options, run:

```text
/set
```

Output:

```text
Available Commands:
  /set parameter ...     Set a parameter
  /set system <string>   Set system message
  /set history           Enable history
  /set nohistory         Disable history
  /set wordwrap          Enable wordwrap
  /set nowordwrap        Disable wordwrap
  /set format json       Enable JSON mode
  /set noformat          Disable formatting
  /set verbose           Show LLM stats
  /set quiet             Disable LLM stats
  /set think             Enable thinking
  /set nothink           Disable thinking
```

This shows the settings that can be changed for the current session.

## Verbose Mode

Verbose mode displays additional information about model responses.

In the example below, `verbose` enables extra performance details.

```text
/set verbose
```

Now ask the model a question:

```text
What can you do for me?
```

This returns the model's response along with performance metrics:

> I am functioning well and ready to assist you. As an AI, I don't experience feelings or states of being in the way humans do, but my systems are running smoothly!
> 
> How can I help you today?
> 
> total duration:       45.702371275s
> load duration:        39.214848105s
> prompt eval count:    20 token(s)
> prompt eval duration: 422.071ms
> prompt eval rate:     47.39 tokens/s
> eval count:           46 token(s)
> eval duration:        6.059742s
> eval rate:            7.59 tokens/s

The exact numbers will vary depending on your hardware and model.

**Disable Verbose Mode**

To disable verbose mode, set `quiet` mode.

```text
/set quiet
```

Output:

```text
Set 'quiet' mode.
```

This removes the extra performance information from responses.

## System Prompt

A system prompt controls how the model behaves during the current chat session.

In the example below, the system prompt tells the model to always reply in rhymes.

```text
/set system Always reply in rhymes.
```

Verify the system prompt:

```text
/show system
```

Output:

```text
Always reply in rhymes.
```

Now ask a question:

```text
What can you do?
```

Output:

```text
I can respond with verses neat,
With rhymes and words, a language sweet.

If facts you seek, or knowledge deep,
A hundred answers I will keep.

From stories grand to poems light,
I weave my text both day and night.

Need summaries of length immense?
Or help with thought and consequence?

Just ask me what you wish to know,
And rhyming verses start to grow!
```

The model follows the system prompt for the current session.

**System prompts are session-based**

A system prompt set with `/set system` only applies to the current chat session.

For example, exit the session:

```text
/bye
```

Then start the model again:

```bash
ollama run gemma4:e4b
```

Check the system prompt:

```text
/show system
```

Output:

```text
No system message was specified for this model.
```

The previous system prompt is not saved automatically.

## Model Parameters

Model parameters control how responses are generated.

- Adjust creativity
- Adjust randomness
- Adjust context size
- Control response behavior

To see available parameters:

```text
/set parameter
```

Output:

```text
Available Parameters:
  /set parameter seed <int>             Random number seed
  /set parameter num_predict <int>      Max number of tokens to predict
  /set parameter top_k <int>            Pick from top k num of tokens
  /set parameter top_p <float>          Pick token based on sum of probabilities
  /set parameter min_p <float>          Pick token based on top token probability * min_p
  /set parameter num_ctx <int>          Set the context size
  /set parameter temperature <float>    Set creativity level
  /set parameter repeat_penalty <float> How strongly to penalize repetitions
  /set parameter repeat_last_n <int>    Set how far back to look for repetitions
  /set parameter num_gpu <int>          The number of layers to send to the GPU
  /set parameter stop <string> <string> ...   Set the stop parameters
```

These parameters affect how the model responds during the current session.

### Temperature

Temperature controls how creative or predictable the model is.

In the example below, `temperature` is set to `0.2`.

```text
/set parameter temperature 0.2
```

Output:

```text
Set parameter 'temperature' to '0.2'
```

The temperature value ranges from 0 to 2. 

- Lower values produce more predictable responses.
- Higher values produce more creative and varied responses.

| Temperature | Behavior                             | Use Case                                                      |
| ----------- | ------------------------------------ | ------------------------------------------------------------- |
| `0.0 - 0.2` | Very predictable and deterministic   | Code generation, JSON output, classification, data extraction |
| `0.3 - 0.5` | Predictable with slight variation    | Technical documentation, summarization, Q&A                   |
| `0.6 - 0.8` | Balanced creativity and consistency  | General chat, assistants, everyday tasks                      |
| `0.9 - 1.2` | Creative and diverse                 | Content writing, brainstorming, idea generation               |
| `1.3 - 1.6` | Highly creative and less predictable | Story writing, roleplay, marketing copy                       |
| `1.7 - 2.0` | Very random and experimental         | Novelty generation, experimentation, creative exploration     |

### Context Size

Context size controls how much information the model can remember during a conversation.

In the example below, `num_ctx` is set to `10000`.

```text
/set parameter num_ctx 10000
```

Output:

```text
Set parameter 'num_ctx' to '10000'
```

A larger context size allows longer conversations, but it also uses more RAM or VRAM. Only increase the context size when needed.

**Note:** Every model has a maximum supported context window.

You can view it with:

```text
/show info
```

Example output:

```text
  Model
    architecture        gemma4    
    parameters          8.0B      
    context length      131072      
    embedding length    2560      
    quantization        Q4_K_M    
    requires            0.20.0 
```

This is the maximum supported value.

The active context size for your session may be smaller unless you change it with `num_ctx`.


## Control Command History

Ollama can remember commands and prompts across sessions.

Sometimes you may not want certain commands stored in history.

Enable no-history mode:

```text
/set nohistory
```

Now send a prompt:

```text
Hello
```

Exit the session:

```text
/bye
```

When you start a new session and press the Up Arrow key, the `Hello` prompt will not appear in the command history.

This only affects terminal command history. It does not affect the current chat conversation.
