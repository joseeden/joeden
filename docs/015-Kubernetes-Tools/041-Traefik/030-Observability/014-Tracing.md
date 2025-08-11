---
title: "Tracing"
description: "Tracing"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
sidebar_position: 13
last_update:
  date: 2/5/2023
---


## Overview

Tracing shows how a request moves through your system.

- Visualizes each step from entry to your application
- Helps find performance bottlenecks
- Tracks requests across multiple services

Tracing is useful for troubleshooting and understanding how different parts of your application interact.

:::info 

Tracing lets you see exactly where requests spend time, from the entry point in Traefik to each service call. This complete picture makes finding and fixing performance issues much faster.

:::

## How Tracing Works

Tracing in Traefik can follow a request from the moment it enters to when it reaches your service.

- Displays the full path of the request
- Highlights slow steps or failing components
- Reveals how services communicate with each other

With this visibility, you can detect delays, failed calls, or inefficient routes.

## Supported Backends

Traefik works with several tracing systems.

- Jaeger
- Zipkin
- Datadog
- Instana
- Haystack
- Elastic

All are configured in a similar way, so learning one makes it easy to use others.

## Example Setup

Enable tracing in Traefik by specifying your backend and connection details.

```yaml
tracing:
  jaeger:
    localAgentHostPort: "jaeger-agent:6831"
    samplingServerURL: "http://jaeger-agent:5778/sampling"
```

Your application also needs tracing libraries to send data to the chosen backend. For example, a Python app can use the Jaeger client library.


