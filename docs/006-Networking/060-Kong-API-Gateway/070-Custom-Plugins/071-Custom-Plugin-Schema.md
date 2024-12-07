---
title: "Schema and Handler"
description: "Schema and Handler"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - Postman
sidebar_position: 71
last_update:
  date: 7/7/2022
---


## Overview

Custom plugins in Kong allow you to extend Kong’s functionality by adding tailored logic for specific use cases. These plugins integrate seamlessly into the Kong API Gateway and can handle requests, responses, and transformations.

- Custom plugins enhance API management.
- They allow precise control over API workflows.

To create custom plugins, it is recommended to learn the Lua programming language, as Kong plugins are primarily written in Lua.

For more information, please see [Develop Custom Plugins.](https://docs.konghq.com/gateway/latest/plugin-development/)

## Lab Environment

This lab deploys Kong API Gateway and other applications in a Windows 10 machine using a docker compose file. 

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)


## Create the Custom Plugin 

In this example, we will create a plugin named **check_header**, which verifies if a specific header exists in incoming API requests. 
Create the necessary folder and files:

```bash
$ ls -la check_header/
total 2
drwxrwxrwx 1 johnsmith johnsmith 512 Dec  7 18:52 .
drwxrwxrwx 1 johnsmith johnsmith 512 Dec  7 19:05 ..
-rwxrwxrwx 1 johnsmith johnsmith 506 Nov 19 02:29 handler.lua
-rwxrwxrwx 1 johnsmith johnsmith 602 Nov 19 02:29 schema.lua 
```

The `schema.lua` file defines the parameters that users will provide.

```lua
  
```

The `handler.lua`  file contains the logic for processing API requests.

```lua
  
```
