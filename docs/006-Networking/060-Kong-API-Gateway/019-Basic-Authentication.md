---
title: "Basic Authentication"
description: "Using Basic Authentication in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 19
last_update:
  date: 7/7/2022
---


## Overview

Kong Authentication secures APIs by validating the identity of clients accessing them.

- Ensures only authorized clients can interact with APIs.  
- Supports various authentication methods like API keys, JWT, and OAuth2.  

We can enable different methods authentication to ensure that the API is only exposed to intended users.

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
- [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer)

## Basic Authentication  

## Enable the Basic Auth Plugin 

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Select Basic Authentication.

![](/img/docs/12022024-kong-gw-basic-auth-plugin.png)

Leave the default settings and click Save. It should appear on the plugin list.

![](/img/docs/12022024-kong-gw-basic-auth-plugin-on-the-list.png)

## Configure the Basic Auth Credentials 

To create a consumer, please see [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer).

![](/img/docs/12022024-kong-gw-consumer-created-already.png)

Select the consumer and click Credentials > New Basic Auth Credential. Enter the details below and click Save.

| Field     | Value           |
|-----------|-----------------|
| Password  | `!Qwaszxerdfcv` |
| Username  | johnsmith       |

![](/img/docs/12022024-kong-gw-consumer-add-credentialss.png)

## Test Basic Auth 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **Testing FastAPI via Kong - Basic Auth**. Enter the URL below and click Send.

```bash
http://localhost:8000/kong/healthy 
```

It will return the **unauthorized** message.

![](/img/docs/12022024-kong-gw-unauthorized-error.png)

Click the **Authorization** tab, click the **Auth Type** dropdown bar, and select **Basic Auth**. Enter the username and password. Click Send.

![](/img/docs/12022024-kong-gw-authorized-with-credentials.png)
