---
title: "Consumers, Plugins, and Upstreams"
description: "Consumers, Plugins, and Upstreams"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 17
last_update:
  date: 7/7/2022
---


## Overview

This lab focuses on Kong consumers, plugins, and upstreams.

- **Kong Consumers**  
  - Represent users, applications, or services interacting with Kong APIs.  
  - Allow per-consumer configurations like rate limits or credentials.  
  - Support integration with authentication and security plugins.  

- **Kong Plugins**  
  - Extend Kong’s functionality with features like rate limiting, logging, or transformations.  
  - Can be applied globally, per service, or per route.  
  - Support various integrations, including authentication, monitoring, and security.  

- **Kong Upstreams**  
  - Represents the application that Kong forwards requests to.
  - Use load balancing to distribute requests across multiple targets.  
  - Improve reliability by automatically handling healthy and unhealthy targets.  

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI Endpoint. To simplify, both the Kong API Gateway and the FastAPI Endpoint is installed locally in a Windows 10 machine.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::


## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Configure the Routes and Services](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)

## Setup the API Endpoint 

The source code for the FastAPI application can be found here: [test-fastapi-simple-app](https://github.com/joseeden/test-fastapi-simple-app)

```bash
git clone https://github.com/joseeden/test-fastapi-simple-app.git
cd test-fastapi-simple-app.
pip install -r requirements.txt
python main.py
```

Open a web browser and navigate to the endpoint:

```bash
http://localhost:5000/healthy 
```

It should return:

![](/img/docs/11182024-fastapi-endpoint-working.png)


## Create the Kong Consumer 

Go to Kong Manager > Consumers > New Consumer. Enter the details below and click Save.

| Field                     | Value                                 |
|---------------------------|---------------------------------------|
| Name                      | fastapi-consumer                      |

![](/img/docs/12022024-kong-gw-kong-consumer.png)

## Create the Kong Plugin

Plugins can be configured on a service level and on a route level. Plugins can also be created as global plugins. 

To enable a plugin, go to Kong Manager > Plugins > New Plugin > Select Rate Limiting.

![](/img/docs/12022024-kong-gw-kong-pluginss.png)

Set this plugin as a global plugin and enter the following details:

| Field                                      | Value                                 |
|--------------------------------------------|---------------------------------------|
| Minute                                     | 5 (Allow only 5 requests per minute)  |
| Instance Name (under Advanced Parameters)  | fastapi-plugin                        |

![](/img/docs/12022024-kong-gw-kong-pluginss-rate-limiting.png)


## Test the Plugin

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::



Run the request 5 times consecutively. It should retun a healthy status:

![](/img/docs/12022024-kong-gw-testing-via-postman-healthy.png)

However, on the sixth attempt, it will return the exceeded rate limit message.

![](/img/docs/12022024-kong-gw-testing-via-postman-rate-limit-exceeded.png)

## Create the Kong Upstream

A Kong Upstream represents the application that Kong forwards requests to. 

To create an upstream, go to Kong Manager > Upstreams > New Upstream. Enter the details below and click Save.

| Field                     | Value                                 |
|---------------------------|---------------------------------------|
| Name                      | fastapi-upstream                      |
| Algorith                  | Round Robin                           |
| Slots                     | 1000                                  |
| Active Health Checks      | Enable                                |
| Healthchecks Threshold    | 20                                    |
| Active Health Check Type  | HTTP                                  |
| HTTP Path                 | `/healthy`                            |
| Timeouts (under Unhealthy)| 5                                     |

The upstream should now appear on the list. 

![](/img/docs/12022024-kong-gw-kong-upstream-configure.png)

Click the upstream and select Target > New Targets. Enter the target address and click save.

```bash
host.docker.internal:5000 
```

![](/img/docs/12022024-kong-gw-kong-upstream-configure-target.png)


## Test the Upstream 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::


Create a new request with the new link:

```bash
http://localhost:8001/upstreams/fastapi-upstream/health?balancer_health=1 
```

![](/img/docs/12022024-kong-gw-testing-via-postman-upstreams=testing.png)
