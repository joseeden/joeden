---
title: "Introduction to Observability"
description: "Introduction to Observability"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 10
last_update:
  date: 3/28/2023
---


## Overview 

Observability is the ability to understand and measure the state of a system based upon data that is generated by the system.

- Allows you to generate actionable outputs from unexpected scenarios
- Give better insight into internal workings of an application.
- Speed up troubleshooting, detects problems and monitor performance.

When it comes to troubleshooting issues, we need more information than just what is wrong. We need to know why the application entered a specific state, what component is responsible, and how we can avoid it in the future. Observability gives you the flexibility to understand unpredictable events.

- Why are errors rising?
- Why is there high latency?
- Why are services timing out?

## Pillars of Observability


### Logging

Captures detailed information about system events and behaviors.  

- Records textual data about actions or errors in applications.  
- Useful for debugging and understanding specific incidents.  
- Stores historical context for incident analysis.  

Logs are the most common form of observation but they can be difficult to use due to the verbosity of the logs outputted by the systems or applications.

### Metrics

Measures numerical data to track system performance and health.  

- Aggregates data like CPU usage, memory, and latency over time.  
- Enables trend analysis and alerting based on thresholds.  
- Provides a high-level overview for capacity planning.  

The data collected can be aggregated over time and graphed using visualization tools to identify trends over time. Metrics can contain: 

- CPU Load
- Number of open files
- HTTP Response times  
- Number of errors

In general, metrics has these main components:

- Metric name 
- Value
- Timestamp for the metric
- Dimensions

![](/img/docs/12102024-observability-metrics.png)

### Tracing

Tracks the flow of requests across distributed systems.  

- Maps relationships and dependencies between services.  
- Pinpoints bottlenecks or failures in multi-service environments.  
- Offers insights into end-to-end system performance.  
    
Each trace has a `trace-id` that can be used to identify the request as it traverses the system. Individual events forming a trace are called **spans** and each span tracks the following:

- `Start time`
- `Duration`
- `Parent-id`

![](/img/docs/12102024-observability-tracing.png)

## Service Level Concepts

### Service Level Indicator (SLI)  

A quantitative metric that measures specific aspects of system performance.  

- Represents key measurements like latency, error rates, or throughput.  
- Tracks system behavior to evaluate performance against objectives.  

Examples

- Latency
- Availability

### Service Level Objective (SLO)  

A target or goal for system performance based on SLIs.  

- Defines acceptable thresholds for reliability or efficiency.  
- Guides operational priorities and service improvements.  

Examples

- Latency < 100ms
- Availability - 99.9% uptime

It may be tempting to set them to aggresive values like 100% uptime however this will come at a higher cost. The goal is not to achieve perfection but instead to make customers happy with the right level of reliability.

### Service Level Agreement (SLA)  

A formal contract between a provider and user specifying service expectations.  

- Includes penalties or remedies if agreed targets are not met.  
- Ensures accountability and trust between parties.  