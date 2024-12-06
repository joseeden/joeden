---
title: "Transformer Plugins"
description: "Using Transformer Plugins in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
sidebar_position: 61
last_update:
  date: 7/7/2022
---


## Overview

Transformation plugins in Kong allow you to modify requests and responses as they pass through the API gateway without modifying backend services.

## Lab Environment

:::info[Requires OpenAI Credits]

This lab requires OpenAI credits. You must first [create an OpenAI account and purchase credits](#get-a-chatgpt-api-key).

:::

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

## Create the Service and Route 

Run the command below to create the service:

```bash
# Create a service that points to the echo server
curl -i -X POST http://localhost:8001/services/ \
  --data "name=echo-service" \
  --data "url=http://echo-server"

# Create a route for the /preprod path with GET and POST methods
curl -i -X POST http://localhost:8001/services/echo-service/routes \
  --data "name=echo-route" \
  --data "paths[]=/preprod" \
  --data "methods[]=GET" \
  --data "methods[]=POST"
```

Open a web browser and login to the Kong Manager UI:

```bash
http://localhost:8002 
```

Confirm that the new service and route is created.

![](/img/docs/12062024-xformer-echo-service.png)

![](/img/docs/12062024-xformer-echo-route.png)


Back in your terminal, verify that the URL is reachable:

```bash
curl -s -X GET http://localhost:8000/preprod | jq '.'
```

Output:

```bash
{
  "host": {
    "hostname": "echo-server",
    "ip": "::ffff:172.1.1.7",
    "ips": []
  },
  "http": {
    "method": "GET",
    "baseUrl": "",
    "originalUrl": "/new-request",
    "protocol": "http"
  },
  "request": {
    "params": {
      "0": "/new-request"
    },
    "query": {},
    "cookies": {},
    "body": {},
    "headers": {
      "host": "echo-server",
      "connection": "keep-alive",
      "x-forwarded-for": "172.1.1.1",
      "x-forwarded-proto": "http",
      "x-forwarded-host": "localhost",
      "x-forwarded-port": "8000",
      "x-forwarded-path": "/preprod",
      "x-forwarded-prefix": "/preprod",
      "x-real-ip": "172.1.1.1",
      "x-kong-request-id": "06bd436de3330078045e451f806c4851",
      "user-agent": "curl/7.68.0",
      "accept": "*/*",
      "Road": "allenby"
    }
  },
  "environment": {
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOSTNAME": "78bbe395f15a",
    "NODE_VERSION": "20.11.0",
    "YARN_VERSION": "1.22.19",
    "HOME": "/root"
  }
} 
```

## Request Transformer 

The  **Request Transformer Plugin** modifies incoming requests by adding, removing, or changing headers, query strings, or body content before reaching the upstream service. This plugin performs the response transformation in the following order:

```
remove → rename → replace → add → append
```

For more information, please see [Request Transformer](https://docs.konghq.com/hub/kong-inc/request-transformer/).

### Enable Request Transformer Plugin 

In this example, we'll add the plugin globally, but users can enable it on the service-level or route-level. 
The goal will be:

- Replace Uri from `/preprod` to `/prod`
- Remove header - `Pending`
- Replace `East` to `West`
- Replace `Kallang` to `Jurong`
- Rename `Avenue` to `Street`
- Add headers `Road:Venture Drive`

To enable the plugin, we can do it on the Kong Manager console or we can also simply run the `curl` command in the terminal:

```bash
curl -i -X POST http://localhost:8001/services/echo-service/plugins \
  -d "name=request-transformer" \
  -d "config.replace.uri=/prod" \
  -d "config.remove.body=Pending" \
  -d "config.replace.body=Region:West" \
  -d "config.replace.body=Estate:Jurong" \
  -d "config.rename.body=Avenue:Street" \
  -d "config.add.headers=Road:Venture Drive" 
```

On the Kong Manager UI, we should see the plugin enabled.

![](/img/docs/12062024-transformer-request-enabled-2.png)



### Test the Request Transformer Plugin 

Run the `GET` request below in your terminal:

```bash
curl -s -X POST 'http://localhost:8000/preprod' \
  -H "Content-Type: application/json" \
  -d '{
    "Pending":"True"
    "Region":"East",
    "Estate":"Kallang",
    "Avenue":"Jurong East 11",
  }' | jq
```

It should return the modified URL, body, and headers.

```bash
{
  "host": {
    "hostname": "echo-server",
    "ip": "::ffff:172.1.1.7",
    "ips": []
  },
  "http": {
    "method": "POST",
    "baseUrl": "",
    "originalUrl": "/prod",
    "protocol": "http"
  },
  "request": {
    "params": {
      "0": "/prod"
    },
    "query": {},
    "cookies": {},
    "body": {
      "Region": "West",
      "Estate": "Jurong",
      "Street": "Jurong East 11"
    },
    "headers": {
      "host": "echo-server",
      "connection": "keep-alive",
      "x-forwarded-for": "172.1.1.1",
      "x-forwarded-proto": "http",
      "x-forwarded-host": "localhost",
      "x-forwarded-port": "8000",
      "x-forwarded-path": "/preprod",
      "x-forwarded-prefix": "/preprod",
      "x-real-ip": "172.1.1.1",
      "x-kong-request-id": "d74f796417dad5705157c93ff3c4d82f",
      "content-length": "61",
      "user-agent": "curl/7.68.0",
      "accept": "*/*",
      "content-type": "application/json",
      "road": "Venture Drive"
    }
  },
  "environment": {
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    "HOSTNAME": "78bbe395f15a",
    "NODE_VERSION": "20.11.0",
    "YARN_VERSION": "1.22.19",
    "HOME": "/root"
  }
} 
```



## Response Transformer 

The **Response Transformer Plugin** adjusts outgoing responses by altering headers, status codes, or body content before delivering them to the client.  

### Enable Response Transformer Plugin 

In this example, we'll use order processing in an e-commerce platform. The `response-transformer plugin` can be used to modify the response based on order status, payment, and delivery details. 

To enable the plugin, we can do it on the Kong Manager console or we can also simply run the `curl` command in the terminal:

```bash
curl -i -X POST http://localhost:8001/services/echo-service/plugins \
  --header "accept: application/json" \
  --header "Content-Type: application/json" \
  --data '
    {
      "name": "response-transformer",
      "config": {
        "remove": {
          "headers": [
            "x-internal-order-id",
            "x-payment-token",
            "x-shipping-method"
          ]
        },
        "add": {
          "headers": [
            "x-order-status: Confirmed",
            "x-payment-status: Paid",
            "x-delivery-status: In Progress"
          ],
          "json": [
            "order_status: confirmed",
            "payment_status: paid",
            "delivery_status: in_progress",
            "total_cost: 99.99",
            "shipping_address: 123 Main St, Springfield"
          ],
          "json_types": [
            "string",
            "boolean",
            "number"
          ]
        },
        "append": {
          "headers": [
            "x-shipping-tracking-number: 1Z999AA10123456784",
            "x-expected-delivery-date: 2024-12-15"
          ]
        }
      }
    }'
```

The plugin should appear in the plugin list:

![](/img/docs/12062024-xformer-response-plugin.png)


### Test Response Transformer Plugin 

Run the command below:

```bash
curl -s -X POST http://localhost:8000/preprod \
    --header "accept: application/json" \
    --header "Content-Type: application/json" \
    --data '
    {
      "order_id": "1234567890",
      "items": [
        {
          "name": "Laptop",
          "price": 899.99
        },
        {
          "name": "Mouse",
          "price": 19.99
        }
      ],
      "payment_method": "Credit Card",
      "shipping_address": "123 Main St, Springfield"
    }' | jq 
```

Output:

```bash
{
  "order_status": " confirmed",
  "request": {
    "params": {
      "0": "/"
    },
    "headers": {
      "connection": "keep-alive",
      "x-forwarded-proto": "http",
      "content-type": "application/json",
      "x-forwarded-host": "localhost",
      "x-forwarded-port": "8000",
      "x-forwarded-path": "/preprod",
      "x-forwarded-prefix": "/preprod",
      "x-real-ip": "172.1.1.1",
      "accept": "application/json",
      "x-forwarded-for": "172.1.1.1",
      "content-length": "309",
      "x-kong-request-id": "2a2c7a446e1cf500e2dfa273cbf44e17",
      "host": "echo-server",
      "user-agent": "curl/7.68.0"
    },
    "query": {},
    "cookies": {},
    "body": {
      "order_id": "1234567890",
      "payment_method": "Credit Card",
      "items": [
        {
          "price": 899.99,
          "name": "Laptop"
        },
        {
          "price": 19.99,
          "name": "Mouse"
        }
      ],
      "shipping_address": "123 Main St, Springfield"
    }
  },
  "http": {
    "originalUrl": "/",
    "protocol": "http",
    "method": "POST",
    "baseUrl": ""
  },
  "payment_status": false,
  "shipping_address": " 123 Main St, Springfield",
  "total_cost": " 99.99",
  "host": {
    "ip": "::ffff:172.1.1.7",
    "hostname": "echo-server",
    "ips": []
  },
  "environment": {
    "HOSTNAME": "78bbe395f15a",
    "NODE_VERSION": "20.11.0",
    "YARN_VERSION": "1.22.19",
    "HOME": "/root",
    "PATH": "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
  }
}
```