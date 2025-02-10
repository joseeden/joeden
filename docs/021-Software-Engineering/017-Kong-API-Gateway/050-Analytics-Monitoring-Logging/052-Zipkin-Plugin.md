---
title: "Zipkin Plugin"
description: "Using Zipkin Plugin in Kong"
tags: 
  - Cloud
  - DevOps
  - Networking 
  - API Gateway
  - Kong API Gateway
  - FastAPI 
  - Postman
  - Serverless
  - Prometheus
  - Grafana
  - Zipkin
  - Distributed Tracing
sidebar_position: 52
# last_update:
#   date: 7/7/2022
---


## Overview 

Zipkin is an open-source distributed tracing system that helps collect timing data for requests across multiple services, enabling better monitoring and debugging.

- Tracks the flow of requests across microservices.
- Helps visualize and identify latency bottlenecks in distributed systems.

The Zipkin plugin in Kong enables distributed tracing by forwarding trace data to a Zipkin server. This improves visibility into API and microservice performance and helps identify and optimize latency issues.

## Lab Environment

This lab tests a Kong API Gateway deployment using a FastAPI endpoint. To simplify, both the containerized Kong API Gateway and the FastAPI endpoint are installed locally on a Windows 10 machine. A Docker Compose file is used to deploy Kong, along with other applications like Prometheus, Zipkin, the ELK Stack, and more.

:::info 

Make sure that you have installed Docker Desktop. 

Simply installing Docker in WSL2 without Docker Desktop may introduce some issue when configuring the communication between the containerized Kong API Gateway and the FastAPI application that is installed on the local host.

:::

## Pre-requisites 

- [Postman](https://www.postman.com/downloads/)
- [Setup the Kong API Gateway](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Setup Zipkin](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md#lab-environment)
- [Setup the FastAPI Endpoint](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint)
- [Kong Manager OSS Access](/docs/021-Software-Engineering/017-Kong-API-Gateway/015-Containerized-Kong-and-Other-Apps.md)
- [Create the Routes and Services](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md)
<!-- - [Create the Consumer](/docs/021-Software-Engineering/017-Kong-API-Gateway/017-Consumers-Plugins-Upstreams.md#create-the-kong-consumer) -->


## Enable the Zipkin Plugin 

Login to the Kong Manager OSS UI and go to Plugins > New Plugin > Analytics & Monitoring > Zipkin. 
Configure the following:

| Field         | Value                                             |
|---------------|---------------------------------------------------|
| Http Endpoint | `http://host.docker.internal:9411/api/v2/spans`   |
| Sample Ratio  | 1                                                 |

:::info 

Sample ratio - Out of 100 requests, how many percentage will Zipkin monitor. If it is set to 1, then it means all of the request will be monitored.

:::

Click Save. It should now show on the Plugins list.

![](/img/docs/12052024-zipkin-enable-plugin.png)

## Generate Requests 

:::info[Setup Postman]

To setup Postman, please see [Testing with Postman](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#testing-with-postman)

:::

Open Postman and create a folder called **Logstash**. Right-click on the this folder and create a new `GET` request called **Prometheus Plugin**. Use this URL for the API request:

```bash
http://localhost:8000/kong/healthy 
```

![](/img/docs/12052024-prometheus-postman-request.png)

Right-click on the **Logstash** folder > Run folder. Then set **Iterations** to 1000. Click **Run Kong**.

![](/img/docs/12052024-prometheus-postman-request-run.png)

This will automatically create a loop and run the API requests 1000 times.

![](/img/docs/12052024-prometheus-postman-request-run-1000.png)


:::info

For this to work, you need to have the [FastAPI Endpoint setup](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md#setup-the-api-endpoint) and the [routes and gateway services must be configured](/docs/021-Software-Engineering/017-Kong-API-Gateway/016-Testing-wth-an-FastAPI-Endpoint.md).

:::


## Test in Zipkin 

Open a web browser and navigate to the Zipkin page

```bash
http://localhost:9411/zipkin/
```

Click **Run Query**. It should show the trace for a request that was processed by Kong. This is also the root, which serves as a starting point of a trace. A **trace** in Zipkin is a record of the journey that a request takes through various services in a microservices architecture.

![](/img/docs/12052024-zipkin-run-query.png)

Click on the trace to see more details. 

![](/img/docs/12052024-zipkin-run-query-span-table.png)

This trace shows that a `GET` request was sent to Kong API Gateway, which then routed it to the `fastapi-service`. The trace indicates that Kong processed the request in 82ms, with annotations marking the start and end of the client interaction. The span shows that Kong used a load balancer, and the `fastapi-service` responded to the request.

Going back to the main page, we can see more traces.

![](/img/docs/12052024-zipkin-run-query-more-traces.png)



