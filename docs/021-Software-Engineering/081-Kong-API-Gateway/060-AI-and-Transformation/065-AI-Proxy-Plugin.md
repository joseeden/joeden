---
title: "AI Proxy Plugin"
description: "Using AI Proxy Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
sidebar_position: 65
# last_update:
#   date: 2/26/2023
---


## Overview

The AI Proxy Plugin simplifies and centralizes AI service integrations.  

- Combines various AI-related functionalities into a single gateway.  
- Manages tasks like security, caching, and retries efficiently.  
- Offers advanced tools for prompt management and template creation.  
- Supports rate limiting and multi-LLM endpoint integration.  
- Enhances scalability and optimizes connections to LLMs.  

This plugin provides a unified solution to manage AI-related operations, streamlining workflows and improving performance.  

![](/img/docs/12042024-before-after-kong-ai-proxy.png)


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
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)


## Get a ChatGPT API Key

First, you will need to purchase credits. 

1. Go to [OpenAI’s official site](https://platform.openai.com/docs/api-reference/chat/create) and log in using your email.
3. Proceed to the [billing page](https://platform.openai.com/account/billing).
4. On the Overview page, click **Add payment details**.
5. Choose **Personal** use and add your credit card information.
6. Next, click **Add to credit balance** and specify the amount. You can start with $5.
7. Click **Continue**. 

Once you see the success message, you can start using OpenAI API. Follow the steps below to get an API key:

1. Click **Dashboard** > **API keys**.
2. Click **Create new secret key**.

    ![](/img/docs/12042024-get-chatgpt-api-key.png)

3. Copy the secret key. 

## Configure the Service and Route

Run the command below to create the `openai-service` service:

```bash
curl -i -X POST http://localhost:8001/services/ \
  --data "name=openai-service" \
  --data "url=https://api.openai.com/v1/"
```

Next, create the `openai-route` route:

```bash
curl -i -X POST http://localhost:8001/services/openai-service/routes \
  --data "name=openai-route" \
  --data "methods[]=POST" \
  --data "methods[]=GET" \
  --data "paths[]=/openai-chat" 
```

Open a web browser and access the Kong Manager UI:

```bash
http://localhost:8002/ 
```

Verify that the service and route are created.

![](/img/docs/12042024-ai-proxy-service.png)

![](/img/docs/12042024-ai-proxy-route.png)


## Enable the Plugin 

Run the command below to enable the plugin:

```bash
curl -i -X POST http://localhost:8001/plugins \
  --data "name=ai-proxy" \
  --data "config.auth.header_name=Authorization" \
  --data "config.auth.header_value=Bearer <enter-chatgpt-api-key>" \
  --data "config.route_type=llm/v1/chat" \
  --data "config.model.name=gpt-3.5-turbo" \
  --data "config.model.options.max_tokens=512" \
  --data "config.model.provider=openai" \
  --data "config.logging.log_payloads=false" \
  --data "config.logging.log_statistics=false"  
```

Provide your API Key in the `config.auth.header_value`.

Go back to the Kong Manager UI and onfirm that the plugin is enabled.

![](/img/docs/12042024-ai-proxy-plugin-curl.png)


## Test plugin via Postman 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new `POST` request. Rename it to **FastAPI via Kong - AI Proxy**. Enter the URL below.

```bash
http://localhost:8000/openai-chat
```

Click **Authorization** > **Auth Type**: Bearer Token, and paste your token in the Token field.

![](/img/docs/Screenshot-2024-12-05-005842.png)

Click **Body** > Raw, and enter the message below:

```json
{
    "messages": [
        {
            "role": "system",
            "content": "Hello OpenAI!"
        }
    ]
}
```

Click Send.

![](/img/docs/12042024-ai-proxy-working-postman-2.png)

<!-- ![](/img/docs/12042024-ai-proxy-working-postman.png) -->