---
title: "Application Deployments"
description: "Deploying Cloud Native Applications"
tags: [Cloud, DevOps, Containers, Containerization, Kubernetes]
sidebar_position: 13
last_update:
  date: 7/7/2022
---

## Best Practices

After selecting the best model and reviewing requirements for monoliths vs. microservices, the next step is **implementation**. Understanding and following best practices during the release and maintenance phases is essential for building resilient and highly available solutions. While strategies vary by organization, these guidelines help ensure stability.

<div class='img-center'>

![](/img/docs/udacity-suse-2-bestpractices.png)

</div>



## Health Checks

Health checks monitor the application’s status to confirm it can handle traffic.

- Typically done via HTTP endpoints like `/health` or `/status`
- Returns HTTP response codes to show if the app is functioning properly

## Metrics

Metrics measure application performance and usage.

- Includes data such as logins, active users, requests, CPU usage, and memory
- Often accessible through an HTTP endpoint like `/metrics`

## Logs

Aggregated logs provide insight into application operations over time.

- Useful for debugging and troubleshooting
- Collected through standard outputs (STDOUT, STDERR) and tools like Splunk
- Often include timestamps for precise tracking of events

  | **Logging Levels** | Description |
  |--------------------|-------------|
  | **DEBUG**          | Fine-grained application events |
  | **INFO**           | High-level operational events |
  | **WARN**           | Potential issues to monitor |
  | **ERROR**          | Errors that don’t stop the app |
  | **FATAL**          | Critical errors that halt operation |

## Tracing

Tracing maps the journey of a request through the application.

- Records each function invoked, often using a tracing library
- Consists of spans (individual operations) that together form a trace

## Resource Consumption

Resource consumption tracks how much CPU, memory, network bandwidth, and requests an application uses.

- Essential for monitoring resource efficiency