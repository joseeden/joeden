---
title: "Optimizing Performance"
description: "Optimizing Performance"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 11
last_update:
  date: 7/16/2023
---



## Overview

Performance isn’t just about speed. Slow apps frustrate users, increase costs, and fail under heavy load.

- Fast apps build user trust
- Poor performance can increase costs and errors
- Optimizing early prevents bigger problems later

Focusing on performance helps apps stay reliable and responsive at scale.

## Common Performance Issues

Most performance problems come from a few sources: 

| Performance Issue      | Description                                           |
| ---------------------- | ----------------------------------------------------- |
| Cold starts            | Delay initial requests when the app or service starts |
| Network latency        | Slows communication between services or clients       |
| Slow databases or APIs | Increases response times for user requests            |
| Resource limits        | Causes bottlenecks when system is under heavy load    |


## Latency vs Throughput

**Latency** measures how long a single request takes while **throughput** measures how many requests can be handled at once. Optimizing one doesn’t always improve the other.

- Latency is request speed
- Throughput is request volume
- Balance both for best performance

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19012628.png)

</div>

## Optimizing the Critical Path

The **critical path** is the slowest sequence of steps to serve a request. Focus on shortening it rather than tuning everything equally.

- Identify the critical path in requests
- Focus optimization on slowest steps
- Not every part needs tuning

Improving the critical path gives the biggest performance gains quickly.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19012709.png)

</div>

## Reducing Dependency Latency

Dependencies like databases and APIs are common sources of delay. Optimizations include:

- Query tuning
- Connection pooling
- Batching requests when possible
- Reducing unnecessary calls

## Caching

Caching avoids repeated work by storing results in memory, which reduces latency and protects downstream services during traffic spikes.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19012850.png)

</div>

**Azure Cache for Redis** is a managed in-memory store for fast access to data like sessions or frequently used results. It provides scaling, high availability, and security. This helps apps handle high traffic without slowing down.

:::info 

Azure Cache for Redis is being retired in 2028 for Azure managed redis.

::: 

<div class='img-center'>

![](/img/docs/all-things-azure-azure-cache-redis.png)

</div>


## Azure Managed Redis

Azure Managed Redis is the new version of Redis for higher performance and scalability. 

- Each node runs multiple Redis instances
- Distributed instances handle more concurrent requests
- High-performance proxy handles connections and self-healing

It’s ideal for apps needing low latency under heavy load.

<div class='img-center'>

![](/img/docs/all-things-azure-azure-managed-redis.png)

</div>


## Cache Design Considerations

| Design Consideration | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| Expiration           | Defines how long cached data stays valid before it is removed  |
| Freshness rules      | Ensures cached data is up-to-date according to business needs  |
| Cache-aside          | Loads data into the cache only when it is requested by the app |
| Cache validation     | Refreshes or removes outdated data to maintain accuracy        |

## Throttling and Backpressure

Under extreme load, accepting every request can fail the system. **Throttling** and **backpressure** slow or reject excess traffic gracefully.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19013959.png)

</div>

To keep apps stable under peak demand:

- Protect services during spikes
- Slow or reject requests to prevent failures
- Maintain overall system availability

## Asynchronous and Queue-Based Patterns

Queues decouple user requests from long tasks. Services like Azure Service Bus process work at a controlled rate, which can smooth traffic spikes.

- Offload long-running tasks to queues
- Process work at a steady pace
- Absorb sudden traffic spikes
- Improves reliability and responsiveness

<div class='img-center'>

![](/img/docs/all-things-azure-azure-async-queue.png)

</div>


## Real-World Example

A retail company runs a flash sale. Traffic triples, pages slow, and users abandon carts. Investigation shows the bottleneck was caused by catalog queries were hitting the database repeatedly. 

While we can scale the compute nodes, this won't fix the problem because the dependency remains slow.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19015954.png)

</div>

As a solution, the team adds Redis to store frequently used data in memory and uses autoscaling with background processing to handle high traffic. Response times improve, checkout becomes stable, and peak sales are maintained.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19020124.png)

</div>
