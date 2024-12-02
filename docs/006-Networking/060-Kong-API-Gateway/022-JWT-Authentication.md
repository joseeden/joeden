---
title: "JWT Authentication"
description: "Using JWT Authentication in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
sidebar_position: 22
last_update:
  date: 7/7/2022
---


## Overview

JSON Web Tokens (JWT) provide a secure and efficient way to authenticate users in Kong API Gateway. Kong validates JWTs to grant access to services without requiring repeated authentication checks.

- Kong uses JWT plugins to validate tokens against a public key or shared secret.
  - Tokens must contain valid claims like `iss`, `exp`, and `sub`.
  - Claims ensure the integrity and authenticity of token data.

- Clients include JWTs in the `Authorization` header or as query parameters.
  - Ensures token information is passed securely.
  - Supports flexible integration into different client applications.

- JWTs can be signed using algorithms like RS256 or HS256.
  - RS256 uses public-private key pairs for added security.
  - HS256 relies on a shared secret for simplicity.

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

## Enable the JWT Auth Plugin 

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Select JWT Authentication.

![](/img/docs/12022024-kong-gw-basic-auth-plugin.png)

Configure the following settings and click Save. 

| Field                           | value               |
|---------------------------------|---------------------|
| Instance Name                   | jwt-authentication  |
| Claims to Verify                | `exp`               |
| Key Claim Name                  | `iss`               |
| Maximum Expiration (in seconds) | 600                 |

It should now appear on the plugin list.

> insert-photo-here

Make sure to disable other **global authentication methods**. For more information, please see [Conflicting Global Authentication Methods](/docs/006-Networking/060-Kong-API-Gateway/020-HMAC-Authentication.md#conflicting-global-authentication-methods)


## Configure the JWT Auth Credentials 

To create a consumer, please see [Create the Consumer](/docs/006-Networking/060-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer).

![](/img/docs/12022024-kong-gw-consumer-created-already.png)

Select the consumer and click Credentials > New JWT Credential. Enter the details below and click Save.

| Field       | Value           |
|-------------|-----------------|
| Key         | jwttoken        |
| Secret      | `!Qwaszxerdfcv` |
| Algorithm   | HS256           |

> insert-photo-here

## Create the Token

First, go to an [online epochconverter](https://www.epochconverter.com/) and get the current epoch time (this may change):

```bash
1733183007  
```

Next, go to jwt.io and set the following:

- Header:

  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }    
  ```

- Payload (add the epoch time below): 


  ```json
  {
    "exp": "1733183007",
    "iss": "jwttoken"
  }    
  ```

- Verify Signature:

  ```json
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    !Qwaszxerdfcv

  ) secret base64 encoded
  ```

Under the Encoded section, copy the output:

```bash
eyJhbGci*****************************
```

## Test JWT Auth 

:::info [Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/006-Networking/060-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a new request. Rename it to **Testing FastAPI via Kong - JWT Auth**. Enter the URL below.

```bash
http://localhost:8000/kong/healthy 
```

Click the **Authorization** tab, click the **Auth Type** dropdown bar, and select **Bearer Token**. Paste the token from the previous step in the Token field and click Send.

> insert-photo-here

if you change the token to anything else, you'll get a `bad token` error:

> insert-photo-here

