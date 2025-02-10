---
title: "AI Prompt Decorator Plugin"
description: "Using AI Prompt Decorator Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
sidebar_position: 66
# last_update:
#   date: 7/7/2022
---


## Overview

The AI Prompt Decorator plugin in Kong helps tailor API responses to meet specific needs, such as enhancing prompts for AI models or modifying request/response content dynamically. 

- Customize API responses to suit AI model requirements.  
- Dynamically modify request or response content for better performance.  
- Simplify integration with AI-powered services.  

Before proceeding, ensure the [AI Proxy plugin is enabled](/docs/021-Software-Engineering/017-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md) in your Kong instance.


## Lab Environment

:::info[Requires OpenAI Credits]

This lab requires OpenAI credits. You must first [create an OpenAI account and purchase credits](/docs/021-Software-Engineering/017-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md#get-a-chatgpt-api-key).

:::

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Enable AI Proxy plugin](/docs/021-Software-Engineering/017-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md)
- [Configure the Service and Route](/docs/021-Software-Engineering/017-Kong-API-Gateway/060-AI-and-Transformation/065-AI-Proxy-Plugin.md#configure-the-service-and-route)


## Enable the Plugin 

To enable the plugin, we can do it in the Kong Manager console or we can also run the `curl` command in your terminal:

```bash
curl -i -X POST http://localhost:8001/routes/openai-route/plugins \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "name": "ai-prompt-decorator",
      "config": {
        "prompts": {
          "append": [
            {
              "role": "system",
              "content": "You will respond in Filipino or Tagalog"
            }
          ]
        }
      }
    }'
```

Login to the Kong Manager and confirm that the AI Prompt Decorator plugin is enabled:

![](/img/docs/12052024-ai-prompt-decorator-plugin.png)


## Testing the Plugin

Now, open Postman and play around.

![](/gif/docs/LLM-AI-Prompt-Decorator-GIF.gif)

