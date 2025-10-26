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

## Horizontal Scaling

Horizontal scaling means adding more workers to handle more tasks instead of making a single system faster.

- Scale out by adding more machines
- Works best with tasks that can be split easily
- Example: resizing multiple independent images

### Horizontal Scaling with Streaming

Streaming data flows continuously, which can make coordination tricky.

- Multiple workers require careful communication
- Coordination adds delays we want to avoid
- Copying entire pipelines can reduce delays

Streaming works best when each pipeline handles its own data stream without waiting on others.

### Pipeline Copies

Scaling a streaming system often means duplicating pipelines to handle more events.

- Each pipeline processes events independently
- Tasks remain contained until complete
- Vertical scaling within each pipeline is still possible

More pipelines mean faster handling of incoming events and less waiting between tasks.


### Additional Considerations

Other components may be needed to manage a horizontally scaled streaming system.

- **Load balancers direct tasks to pipelines**

  - Can use simple round-robin or least-busy strategy
  - Ensures even distribution of events

- **Bottlenecks may appear in parts of the system**

  - Disk IO or resource limits can slow processing
  - Consider shortening pipelines
  - Using batch/queue components can help


## Communication Issues

### Missing Messages

Sometimes events never reach the system. This can happen due to network or resource problems.

- Use sequence numbers to track messages
- Detect gaps in sequences to request missing messages
- Re-requesting can slow down the pipeline

Missing messages are tricky but can be managed with proper tracking and retries.


### Delayed Messages

Some events arrive late, affecting processing speed.

- Messages eventually arrive but later than expected
- Delays reduce overall system throughput
- Often caused by upstream resource or network issues

Delayed messages need monitoring to keep the pipeline running smoothly.


### Out-of-Order Messages

Events can arrive in the wrong sequence, mixing older and newer data.

- Sequence numbers help detect misordered events
- Some systems reorder events automatically
- Certain applications (like video/audio) may drop out-of-order events

Handling out-of-order messages ensures correct data processing and integrity.

### Repeat Messages

The same message may appear multiple times due to system issues.

- Sequence handling can prevent duplicates
- Some cases allow duplicates without problems
- Example: repeated sensor readings are often fine

Repeat messages are manageable and sometimes harmless depending on the data type.
