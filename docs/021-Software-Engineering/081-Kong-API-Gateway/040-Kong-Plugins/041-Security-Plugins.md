---
title: "Security Plugins"
description: "Using Security Plugins in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Cybersecurity
sidebar_position: 41
last_update:
  date: 2/26/2023
---

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
- [Create the Consumer](/docs/021-Software-Engineering/081-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer)


## Bot-Detection Plugin

The Bot-Detection plugin helps identify and block unwanted bots based on their user-agent headers.  

- Blocks known bots automatically.  
- Uses a predefined or custom list of bot signatures.  

### Enable the Bot-Detection Plugin

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Security > Select Bot Detection.

![](/img/docs/12042024-kong-gw-security-plugin-bot-detection.png)

Configure the following settings under Advanced Parameters.. 

| Field                           | value               |
|---------------------------------|---------------------|
| Instance Name                   | bot-detection       |

For the Allow and Deny list, we can specify an array of regular expression. For more information, please see the following:

- [Bot Detection](https://docs.konghq.com/hub/kong-inc/bot-detection/)
- [Basic config examples for Bot Detection](https://docs.konghq.com/hub/kong-inc/bot-detection/how-to/basic-example/)
- [How to configure an allowed exception for the bot-detection plugin?](https://github.com/Kong/kong/discussions/7745)

As an example, we can block any Postman agent by specifying this regex in the Deny field. Click Save afterwards.

```bash
^Postman 
```

### Testing Bot Detection Plugin via Postman 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::


When we try to send an API request through Postman, we'll get a `Forbidden` error.

![](/img/docs/12042024-kong-gw-security-plugin-bot-detection-working-in-postman-2.png)

This is because we denied any Postman user agent from sending a request to the API endpoint.

![](/img/docs/12042024-kong-gw-security-plugin-bot-detection-blocked-postman-agent.png)



## IP Restriction Plugin

The IP Restriction plugin controls access to services based on client IP addresses.  

- Allows or denies access using whitelist or blacklist IPs.  
- Supports CIDR notation for IP ranges.  

### Enable the IP Restriction Plugin

To enable the plugin, go to Kong Manager > Plugins > New Plugin > Security > Select IP Restriction.

![](/img/docs/12042024-kong-gw-security-plugin-bot-detection.png)

For the Allow and Deny list, we can specify the IP Addresses. As an example, we can deny all IP addresses from sending requests to the API endpoint. Click Save.

![](/img/docs/12042024-kong-gw-security-plugin-ip-restriction-deny-all.png)


### Testing IP Restriction Plugin via Postman 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/081-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::


When we try to send an API request through Postman, we'll get the following error:

![](/img/docs/12042024-kong-gw-security-plugin-ip-restriction-deny-all-working-in-postman.png)
