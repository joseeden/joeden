---
title: "AI Prompt Plugin"
description: "Using AI Prompt Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Cybersecurity
sidebar_position: 33
last_update:
  date: 7/7/2022
---

## Overview 

The AI Prompt Guard plugin helps monitor and filter AI-generated or user-submitted content for compliance or security purposes.  

- Detects and blocks harmful or prohibited prompts.  
- Integrates AI models to analyze and validate input data.  

![](/img/docs/12042024-kong-gw-traffic-control-plugin.png)

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI Endpoint. To simplify, both the Kong API Gateway and the FastAPI Endpoint is installed locally in a Windows 10 machine.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
- [Enable the Basic Authentication Plugin](/docs/006-Networking/060-Kong-API-Gateway/021-Basic-Authentication.md)


## Enable AI Prompt Guard Plugin

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Traffic Control > Select AI Prompt Guard.
As an example, we can allow any prompts related to Python while blocking prompts pertaining to Java. To do this, specify them in the Allow and Deny Patterns:

| Field         | Value         |
|---------------|---------------|
| Allow Pattern | `.*Python.*`  |
| Deny Patterns | `.*Java.*`    |

![](/img/docs/12042024-kong-gw-ai-prompt-guard-configured.png)

:::info 

You can disable all other plugins for now. 

:::

## Test the plugin via Postman

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **FastAPI via Kong - AI Prompt Guard**. Enter the URL below:

```bash
http://localhost:8000/kong/healthy 
```

In the Body tab, select raw and add the prompt:

```bash
{
    "messages": [
        {
            "role": "user",
            "content": "How do you run a Python script?"
        }
    ]
} 
```


Click Send. Note that it doesn't return any answer to the question/prompt, it will just return "healthy".

![](/img/docs/12042024-kong-gw-ai-prompt-guard-check-python.png)

If we change the prompt to ask about Java, we'll get `Bad Request` error.

![](/img/docs/12042024-kong-gw-ai-prompt-guard-check-java.png)

