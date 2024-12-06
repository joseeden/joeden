---
title: "AI Prompt Template Plugin"
description: "Using AI Prompt Template Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
sidebar_position: 67
# last_update:
#   date: 7/7/2022
---


## Overview

The AI Prompt Template plugin in Kong allows you to format and structure prompts dynamically for AI services. This ensures consistency and customization in API responses for enhanced AI interactions.

- Easily apply templates to structure AI prompts.  
- Customize prompts based on specific use cases.  
- Improve interaction quality with AI-powered services.  

Before proceeding, ensure the [AI Proxy plugin is enabled](/docs/006-Networking/060-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md) in your Kong instance.


## Lab Environment

:::info[Requires OpenAI Credits]

This lab requires OpenAI credits. You must first [create an OpenAI account and purchase credits](#get-a-chatgpt-api-key).

:::

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Kong Manager OSS Access](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Enable AI Proxy plugin](/docs/006-Networking/060-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md)
- [Configure the Service and Route](/docs/006-Networking/060-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md#configure-the-service-and-route)


## Enable the Plugin 

Login to the Kong Manager OSS UI and go to Plugins > New Plugin > AI Prompt Template.
Set it to **Scoped** and in the **Route** field, select [the route you configured for the AI Proxy plugin previously.](/docs/006-Networking/060-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md#configure-the-service-and-route).

![](/img/docs/12072024-ai-prompt-template-scoped.png)

Under Templates, put "polyglot" as the **Template Name** and enter the following for the **Template String**:

```bash
{
  "messages": [
    {
      "role": "system",
      "content": "You are polyglot and an expert in the {{language}} language"
    },
    {
      "role": "user",
      "content": "Translate the {{text}} in {{language}}"
    }
  ]
} 
```

Click Save. It should now appear in the plugin list.

![](/img/docs/12072024-ai-prompt-template-enabled-plugin.png)



## Test the plugin via Postman 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new `POST` request. Rename it to **LLM OpenAI - AI Prompt Template**. Enter the URL below.

```bash
http://localhost:8000/openai-chat
```

Click **Authorization** > **Auth Type**: Bearer Token, and paste your token in the Token field.

![](/img/docs/Screenshot-2024-12-07-020849-2.png)

Click **Body** > Raw, and enter the message below:

```json
{
    "messages": "{template://polyglot}",  
    "properties": {
        "language": "spanish",
        "text": "I'm coming out of my cage and I've been doing just fine."
    }
}
```

Click Send.

![](/img/docs/12072024-ai-prompt-template-working-translation.png)


