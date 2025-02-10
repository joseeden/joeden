---
title: "Proxy Caching Plugin"
description: "Using Proxy Caching plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Cybersecurity
sidebar_position: 45
last_update:
  date: 7/7/2022
---

## Overview 

The Proxy Caching plugin improves performance by caching responses for frequently accessed resources.  

- Reduces backend load by serving cached responses.  
- Configurable cache rules based on request/response criteria.  

![](/img/docs/12042024-kong-gw-traffic-control-plugin.png)

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
- [Create the Consumer](/docs/021-Software-Engineering/017-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer)

## Enable Proxy Caching Plugin

:::info

Make sure you have created the gateway service, routes, and the consumer/

:::

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Traffic Control > Select Proxy Caching.

Set it to **Scoped** and specify the service, route, and consumer that you want to implement the caching.

![](/img/docs/12042024-kong-gw-proxy-caching-plugin-scoped.png)

Also set the following configurations. Click Save.

| Field     | Value   |
|-----------|---------|
| Strategy  | memory  | 
| Cache Ttl | 300

Back in the Plugins page, temporarily disable the plugin first.

![](/img/docs/12042024-kong-gw-proxy-caching-plugin-scoped-disabled.png)


## Test the plugin via Postman

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **FastAPI via Kong - Caching**. Enter the URL below and click send.

```bash
http://localhost:8000/kong/healthy 
```

![](/img/docs/12042024-kong-gw-proxy-caching-plugin-checkpostman-2.png)

Go back to the Kong Manager UI > Plugins, then enable the Proxy Caching plugin.

![](/img/docs/12042024-kong-gw-proxy-caching-plugin-scoped-enabled.png)

Retry sending the request in Postman. There should now be a decrease in the response time.

![](/img/docs/12042024-kong-gw-proxy-caching-plugin-checkpostman-3.png)
