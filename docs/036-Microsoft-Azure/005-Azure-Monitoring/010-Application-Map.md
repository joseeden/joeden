---
title: "Application Map"
description: "Application Map"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Monitoring 
- Observability
- APM
- Certifications
sidebar_position: 10
last_update:
  date: 3/29/2021
---


## Overview

Modern cloud apps aren’t a single server. They consist of multiple services, APIs, databases, and external dependencies. The hardest part of troubleshooting is figuring out where the problem is.

- Apps have multiple services and dependencies
- Issues can hide in any component

**Application Map** gives a live, visual view of your application and all the components it depends on.

- Shows web apps, APIs, databases, and external services
- Builds a live topology automatically
- Uses real telemetry data without manual setup

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19004329.png)

</div>

## Distributed Tracing 

Application Map uses **distributed tracing**, which means every request that flows through your system leaves telemetry. Application Map stitches these traces into a **dependency graph**, no custom code needed.

<div class='img-center'>

![](/img/docs/all-things-azure-azue-app-map.png)

</div>


## Reading the Map

The application map shows your app as a network of nodes and connections. Each node represents a component like a web app or database. Lines show dependencies or outbound calls.

- Nodes represent individual services
- Lines show calls or dependencies between services
- Provides a clear view of the overall architecture

Even if you didn’t build the system, you can see how requests move through it.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19004449.png)

</div>

## Key Metrics

Every node displays metrics such as average latency, request count, and failure rate.

- Monitor latency and failures
- Identify problem services quickly
- Avoid writing queries for basic metrics

This helps you spot trouble in seconds.

<div class='img-center'>

![](/img/docs/all-things-azure-azure-webapp-read-map.png)

</div>


## Dependency Health

Lines change color based on health. Red or orange indicates high latency or failures.

- Color shows dependency issues
- Helps distinguish slow services vs slow dependencies
- Makes root causes visible

You can quickly answer whether your app is slow or a dependent service is slow.

<div class='img-center'>

![](/img/docs/all-things-azure-azure-app-map-dep-heatlth.png)

</div>

## Application Map in Microservices

In microservice setups, requests pass through many independent services. Application Map shows the full flow.

- Visualizes request paths across services
- Exposes unhealthy dependencies
- Highlights failure patterns

This helps you understand cascading failures and focus on the services that matter.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-19012033.png)

</div>


