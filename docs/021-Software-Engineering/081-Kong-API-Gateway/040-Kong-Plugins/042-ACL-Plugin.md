---
title: "ACL Plugin"
description: "Using Access Control List (ACL) Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Cybersecurity
sidebar_position: 42
last_update:
  date: 7/7/2022
---

## Overview 

Traffic Control in Kong plugins help manage and regulate traffic to your services.  

- **Rate Limiting**: Controls the number of requests a client can make in a specific time.  
- **Request Size Limiting**: Restricts the size of client requests.  
- **Connection Limiting**: Limits the number of simultaneous client connections.

![](/img/docs/12042024-kong-gw-traffic-control-plugin.png)

The ACL (Access Control List) plugin restricts or grants access to services based on consumer group membership.  

- Allows or denies requests using whitelisted or blacklisted groups.  
- Requires consumers to belong to predefined groups for access.  


## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup the FastAPI Endpoint](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/081-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
- [Enable the Basic Authentication Plugin](/docs/021-Software-Engineering/081-Kong-API-Gateway/030-Kong-Authentication/031-Basic-Authentication.md)


## Create the Consumers 

Go to Kong Manager > Consumers > New Consumer. You need to create two consumers. Make sure to click Save.

- `finance`
- `marketing`

![](/img/docs/12042024-kong-gw-2-consumers.png)

## Configure the Consumer Credentials 

:::info

Make sure you [enabled the Basic Authentication Plugin](/docs/021-Software-Engineering/081-Kong-API-Gateway/030-Kong-Authentication/031-Basic-Authentication.md).

:::

Click the consumer > Credentials > New Basic Auth Credential, then add the username and passwords:

| Consumer  | Username  | Password   | 
|-----------|-----------|------------|
| finance   | finance   |finance     |
| marketing | marketing |marketing   |

In addition to this, you also need to add the ACL credentials. Click the consumer > Credentials > New ACL Credential, then add the group name.

| Consumer  | Group       | 
|-----------|-------------|
| finance   | finance     |
| marketing | marketing   |

As an example, below are the credentials for the `marketing` consumer.

![](/img/docs/12042024-kong-gw-2-consumers-config-credentials.png)


## Enable the ACL Plugin

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Traffic Control > Select ACL.
Set it **Global** and under the **Deny** field, add `marketing`, Click Save.

![](/img/docs/12042024-kong-gw-acl-deny-marketing.png)


## Test the plugin via Postman

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **FastAPI via Kong - ACL**. Enter the URL below.

```bash
http://localhost:8000/kong/healthy 
```

Click the **Authorization** tab, click the **Auth Type** dropdown bar, and select **Basic Auth**. Enter the username and password for `finance`. Click Send. It should return a healthy status.

![](/img/docs/12042024-kong-gw-acl-working-finance.png)

Now, enter the credentials for the `marketing` consumer. It should return an error message.

![](/img/docs/12042024-kong-gw-acl-working-marketing.png)


