---
title: "Limit and Terminate Requests"
description: "Using a plugin to limit and terminate requests"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 44
last_update:
  date: 2/26/2023
---

## Overview 

Kong provides plugins to control traffic and terminate requests exceeding specified limits.  

- **Rate Limiting Plugin**: Limits the number of requests a client can make within a time frame.  
- **Request Termination Plugin**: Terminates requests with a custom status code, message, or headers when specific conditions are met.  

![](/img/docs/12042024-kong-gw-traffic-control-plugin.png)

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/065-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
- [Create the Consumer](/docs/065-Software-Engineering/081-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer)

## Request Size Limit Plugin 

The Request Size Limiting plugin restricts the size of client requests to protect services from large payloads.  

- Blocks requests exceeding a specified size limit.  
- Configurable size thresholds for flexibility.  

### Enable Request Size Limit Plugin 

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Select Request Size Limiting.

Configure the following:

| Field                           | value                   |
|---------------------------------|-------------------------|
| Instance Name                   | request-size-limiting   |
| Size Unit                       | bytes                   |
| Allowed Payload Size            | 100                     |

This ensures any file larger than 100 bytes is rejected.


### Test Request Size Limit Plugin via Postman 

:::info

To setup Postman, please see [Testing with Postman](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **FastAPI via Kong - Request Size Limit**. Enter the URL below.

```bash
http://localhost:8000/kong/healthy 
```

Click the **Body** tab > form-data > File > Upload a file. Then hit Send.

![](/img/docs/12022024-kong-gw-request-limit-size.png)


## Request Termination Plugin

The Request Termination plugin halts incoming requests based on predefined conditions.  

- Returns a custom status code and optional message to the client.  
- Useful for rejecting requests during maintenance or enforcing access policies.  

### Enable Request Termination Plugin 

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Select Request Termination.

Configure the following:

| Field                    | value                              |
|--------------------------|------------------------------------|
| Message                  | `Sorry, site is down until Monday` |
| Status Code              | 503                                |



### Test Request Termination Plugin via Postman 

:::info

To setup Postman, please see [Testing with Postman](/docs/065-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **FastAPI via Kong - Request Termination**. Enter the URL below and click Send.

```bash
http://localhost:8000/kong/healthy 
```

![](/img/docs/12022024-kong-gw-request-termination.png)
