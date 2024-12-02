---
title: "Using the Kong Admin API"
description: "Using the Kong Admin API"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 18
last_update:
  date: 7/7/2022
---

## Using the Kong Admin API

add simple short intro...

- add simple info
- add simple info

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI Endpoint. To simplify, both the Kong API Gateway and the FastAPI Endpoint is installed locally in a Windows 10 machine.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::


## Pre-requisites 

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Kong API Gateway](/docs/006-Networking/060-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Postman](https://www.postman.com/downloads/)
- [Configure the Routes and Services](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)


## Import the Postman Collection 

:::info [Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Click the hamburger menu on the upper left and click File > Import > Click the Select Files.
The Kong API collection can be found here:

- Kong CE Admin API V2.0

Once imported, you should see the entire collection.

![](/img/docs/12022024-kong-gw-import kong-api-collection.png)

