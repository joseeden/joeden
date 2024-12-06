---
title: "Key Authentication"
description: "Using Key Authentication in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 21
last_update:
  date: 7/7/2022
---


## Overview

Key Authentication secures APIs by requiring clients to include an API key in requests. Kong validates the key to allow access.  

- Simple to set up and manage.  
- Clients send the API key via headers, query strings, or cookies.

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

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

## Enable the Key Auth Plugin 

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Select Key Authentication.

![](/img/docs/12022024-kong-gw-basic-auth-plugin.png)

Set this plugin as a global plugin and enable the following under Plugin Configuration.

- Key In Header
- Key In Query

Under key names, specify:

- apikey
- token

Under Advanced parameters, enter the following details. Click Save afterwards.

| Field         | Value                                 |
|---------------|---------------------------------------|
| Instance Name | key-authentication                    |  

Make sure to disable other **global authentication methods**. For more information, please see [Conflicting Global Authentication Methods](/docs/006-Networking/060-Kong-API-Gateway/030-Kong-Authentication/032-HMAC-Authentication.md#conflicting-global-authentication-methods)

![](/img/docs/12022024-kong-gw-key-auth-plugin.png)


## Configure the Key Auth Credentials 

To create a consumer, please see [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer).

![](/img/docs/12022024-kong-gw-consumer-created-already.png)

Select the consumer and click Credentials > New Key Auth Credential. We can provide our own key or we can let Kong generate a key by simply clicking Save. 

![](/img/docs/12022024-kong-gw-key-auth-genrate-own-key.png)

The new key should now appear in the credentials page. Copy the key.

![](/img/docs/12022024-kong-gw-key-auth-genrate-own-key-appear.png)


## Test Key Auth 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Go back to Postman and create a new request. Rename it to **Testing FastAPI via Kong - Key Auth**. Enter the URL below.

```bash
http://localhost:8000/kong/healthy 
```

Click the **Headers** tab and add the following:

| Key             | Value                         |
|-----------------|-------------------------------|
| apikey          | add the API key here          |

Hit Send.

![](/img/docs/12022024-kong-gw-key-auth-working-in-postman.png)
