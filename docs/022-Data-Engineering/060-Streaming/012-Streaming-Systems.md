---
title: "Streaming Systems"
description: "Streaming Systems"
tags: 
- Data Engineering
- Data Integration
- System Design 
- Big Data 
- ETL
sidebar_position: 12
last_update:
  date: 10/07/2020
---

## Real-Time

Real-time means completing tasks within a guaranteed timeframe based on the process requirements.

- Response happens within a set period
- The timeframe can vary: *seconds*, *minutes*, *hours*, or longer
- Guarantees are part of the system design

## Real-Time and Streaming

Real-time concepts are closely linked to streaming data.

- **Resource-dependent**

  - Speed depends on available computing and network resources
  - Limits how fast data can be processed and delivered
  - Data storage affects overall system efficiency

- **Continuous flow**

  - Streaming handles data as it arrives
  - Processing speed determines how “real-time” the system feels

## Why Scale

Scaling is about improving system performance to meet different needs.

- Process the same data faster
- Handle more data in the same time
- Deliver data with lower latency
- Meet guaranteed timeframes (SLAs)

## Vertical Scaling

Vertical scaling improves the performance of a single system by upgrading its components.

- Faster CPUs or GPUs
- More or faster RAM
- Improved networking or storage

Vertical scaling also affects how fast streaming pipelines can process data.

- Streaming processes continue until data is fully handled
- SLAs or guarantees require fast processing to meet timeframes
- Total capacity is limited by system performance

Faster hardware helps pipelines process data quicker, but component choices should be guided by benchmarking and workload analysis.

