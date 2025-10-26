---
title: "Batch Processing"
description: "Batch Processing"
tags: 
- Data Engineering
- Data Integration
- System Design 
- Big Data 
- ETL
sidebar_position: 13
last_update:
  date: 2/27/2022
---

## Overview

Batch processing means handling data in groups rather than one by one. Each batch starts, runs, and finishes before new data is added.

- Processes data in groups
- Runs from start to finish as one task
- Triggered by time or events
- Uses a set batch size
- Often called a "job" when running

This approach allows consistent, predictable processing. Each batch is self-contained, making it easier to manage and troubleshoot.

## Common Examples

These examples show how batching simplifies work by grouping data. Once a batch finishes, the system moves to the next one without confusion.

- **Reading files**

  - Files are often read in chunks
  - Each chunk represents part of the file being processed

- **Email handling**

  - Emails are checked and updated in groups
  - Sending queued emails happens once a connection returns

- **Printing**

  - Each print job runs separately
  - Multiple jobs wait their turn to avoid mixing pages


## Why Use Batch Processing

Batch processing has been around since the early days of computing when people submitted tasks using punch cards.

- Easy to understand and manage
- Runs consistently every time
- Simple to scale for better performance

Batch processing helps improve reliability and efficiency. It’s not always the best fit, but for many repetitive and predictable tasks, it gets the job done cleanly and effectively.

## Scaling

Scaling means improving how fast a process runs. It helps us finish the same work in less time or handle more data in the same amount of time.

- Improves speed of data processing
- Handles more data efficiently
- Focuses on better performance

### Vertical Scaling

Vertical scaling means upgrading the power of a single system to make it faster. It is often the easiest way to boost performance. The system just runs faster on better hardware without modifying how it works.

- Uses stronger hardware

  - Faster CPUs or more cores
  - More or quicker RAM

- Improves data access speed

  - Uses SSDs instead of hard drives
  - Adds faster network components

- Simple to apply

  - Usually doesn’t require code changes

While vertical scaling is simple, it has limits and costs.

- Limited growth

  - Hardware has a maximum capacity
  - You can’t always get a faster CPU or more RAM

- High cost

  - Faster components cost much more
  - Price increases don’t always match performance gains

- Unpredictable improvements

  - Hardware speed may not grow fast enough for your data growth

Vertical scaling works well at first, but it can’t grow endlessly. Eventually, you reach a point where adding more power isn’t practical or affordable.

### Horizontal Scaling

Horizontal scaling means spreading tasks across multiple systems instead of relying on one.

- Uses multiple machines

  - Tasks are divided between computers
  - Can also mean adding CPUs or cores to share the load

- Handles parallel work

  - Each task runs independently
  - Ideal for jobs that can be split easily

- Efficient for large workloads

  - Scales out as data grows
  - Often cost-effective

Horizontal scaling is powerful but comes with added complexity.

- Needs a framework

  - Requires tools like Spark or Dask
  - Helps coordinate tasks across systems

- Requires strong communication

  - Systems must exchange data efficiently
  - Increases network and setup needs

- Not suitable for all tasks

  - Sequential jobs can’t easily be split
  - Some tasks depend on step-by-step instructions

## Delays

Delays are common in batch processing. They affect how fast data moves from collection to final output.

1. **Waiting for data to be ready**

    - All required data must be collected first
    - Missing data can delay the entire batch

2. **Waiting to start processing**

    - Scheduled jobs may have to wait for the next interval
    - Data arriving right after a run waits until the next one

3. **Processing time itself**

    - Larger data means longer processing
    - Depends on system speed and scaling

4. **Waiting for final output**

    - Results need to be copied or transferred
    - Users see data only after this step completes

Every stage adds time to the total delay. Reducing each step helps make the whole batch faster and more efficient.

### Example 1: Waiting For Data

Sometimes we wait for the data before processing can even begin.

- **Data must come from multiple sources**

  - Each source might send logs at different times
  - Systems often send data when idle to save resources

- **Busy systems slow data collection**

  - When systems are overloaded, logs arrive late
  - The batch waits until all data is available

In this case, waiting for all machines to send data creates a delay. The process can’t start until everything is ready.

### Example 2: Slow Processing Time

Processing speed can also be a major cause of delay.

- **Large data volumes**

  - Example: 100 GB of logs taking 23 hours to process
  - Processing speed: around 4.4 GB per hour

- **Growing data**

  - If data increases by 5% monthly, next month takes 24 hours
  - After two months, it takes 25 hours to finish

If data grows faster than the system can handle, one day’s batch might take longer than a day to finish. This creates a backlog that gets worse over time.

### Example 3: Delayed Reports

Even after processing finishes, final outputs like reports can take extra time.

- **Multiple steps to complete**

  - Data must first be processed
  - Then moved to the analytics system

- **Report generation**

  - The report can only start when all data is available
  - Even a short report may depend on long data transfers

For example, if each stage takes several hours, a daily report might show data that’s already 1.5 days old. The more stages there are, the longer users must wait to see updated results.
