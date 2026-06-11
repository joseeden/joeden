---
title: "Starter Notes"
description: "Starter Notes on Open LLMs"
tags: 
- Machine Learning
- Artificial Intelligence
- Large Language Models
- Open LLMs
sidebar_position: 10
# last_update:
#   date: 9/21/2024
---

## Overview

The biggest difference between open and closed models is access to the model weights.

| **Category**            | **Open LLMs**                                               | **Proprietary LLMs**                         |
| ----------------------- | ----------------------------------------------------------- | -------------------------------------------- |
| Access to model weights | Weights are publicly available                              | Weights are not accessible                   |
| Access to training code | Usually not included                                        | Not available                                |
| Where you can run it    | Locally or on your own servers                              | Only through provider infrastructure         |
| Customization           | High flexibility (fine-tuning, quantization, modifications) | Limited to APIs and provided settings        |
| Transparency            | More transparent (architecture often known)                 | Low transparency (internal details hidden)   |
| Performance control     | You control deployment, speed, and hardware                 | Provider controls performance and scaling    |
| Cost model              | Free weights, but you pay for compute                       | Pay-per-use API or subscription              |
| Privacy                 | Data can stay fully local                                   | Data is sent to external servers             |
| Examples                | Llama, Mistral, Qwen                                        | GPT models from OpenAI                       |
| Ecosystem               | Strong community tooling (Ollama, vLLM, etc.)               | Centralized ecosystem controlled by provider |


## Open Models

With open models, the model weights are publicly available. This means:

- Weights can be downloaded
- Models can be run locally
- Usage is controlled by a license

In most cases, the training code itself is not public. What is shared is the result of the training process, which is the model weights.

This makes it possible to run the model on your own computer or server.

<div class='img-center'>

![](/img/docs/all-things-ai-open-llms.png)

</div>


## Closed Models

Closed models are those where the model weights are not publicly available, which also means that the training code is not public. 

- Models cannot be downloaded
- Access is provided through an application or API

Examples include models used by OpenAI products such as ChatGPT.

With closed models, you can use the service, but you cannot download the model weights and run them yourself.

