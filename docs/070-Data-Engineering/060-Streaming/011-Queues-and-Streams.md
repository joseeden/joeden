---
title: "Queues and Streams"
description: "Queues and Streams"
tags: 
- Data Engineering
- Data Integration
- System Design 
- Big Data 
- ETL
sidebar_position: 11
last_update:
  date: 10/07/2020
---


## Event-Based Processing

Event-based systems respond to what happens in real time. They wait for signals and react dynamically instead of relying on set schedules.

- **Trigger-based actions**

  - An event could be a button click or a new uploaded file
  - The process starts immediately after the event

- **Flexible timing**

  - No fixed start time like a daily batch
  - Tasks happen as soon as something occurs

- **Can include batch components**

  - A button might start a batch process
  - But overall logic is still event-driven

Some common examples of an event-driven setup using website activity.

- **Web click tracking**

  - Each click is an event
  - The browser sends data to the server

- **Server response**

  - The server logs the request
  - Returns the right information to the user

- **Data collection**

  - Logs are stored for analysis
  - Used to find patterns or troubleshoot



## Queuing

Queuing is a simple concept that helps organize how things are processed one after another.

- A queue works like a line of people waiting for service
- The first to enter is the first to leave (FIFO system)
- It helps process tasks in order
- It’s the opposite of a stack, which uses last-in, first-out (LIFO)

Queues help organize and manage tasks smoothly when processing data or requests.

- They keep data in order, just like people waiting at a cashier
- They can have one or multiple “workers” processing tasks
- They allow easy scaling up or out when more work needs to be done

For example, if one worker leaves, the queue still runs—just slower. Queues make systems more flexible and easier to scale both vertically (faster machines) and horizontally (more machines).

Here’s a simple Python example:

```python
from queue import Queue

tasks = Queue()
tasks.put("Task 1")
tasks.put("Task 2")
tasks.put("Task 3")

while not tasks.empty():
    print("Processing", tasks.get())
```

**Expected output:**

```
Processing Task 1  
Processing Task 2  
Processing Task 3
```

Queues keep tasks flowing in the right order, ensuring nothing is skipped or lost.


## Common Queue Issues

Although queues are useful, they can face a few challenges.

- Errors or bad data can stop the queue from moving
- Uneven task sizes can cause slowdowns
- Hard to know how long the queue is or how many resources are needed
- Scaling queues can lead to management problems

For example, if one item in a queue fails to process, it can delay the rest, like when someone at the counter has payment issues, slowing down everyone else.

## Streaming

Streaming is about processing data as it flows, without waiting for everything to arrive first.

- Data is processed continuously
- No fixed end point for the stream
- Can feed into other pipelines like batch or queue
- Application decides what to do with incoming data

Streams let systems handle information in real time. It focuses on the flow of data rather than a fixed set of tasks.


## Streaming examples

### Logs

Logs show how data can be streamed continuously and processed in real time. Their structure depends on what the system needs to do with the information.

- **Event tracking**

  - Logs can capture user activity, backups, or database transactions
  - Can be text files, binary stores, or message systems like Kafka

- **No defined end**

  - Logs grow as new events arrive
  - Messages don’t have to come at fixed intervals




### System Event Logs

System event logs continuously capture, process, and store events as they happen

- Login attempts, USB insertions, and other actions
- Available on Windows, Mac, and Linux

Components of event logging:

- **Listener** receives messages from processes
- **Parser** interprets the messages
- **Logic** decides what to do, like adding timestamps
- **Writer** stores the information for later review



## Choosing the Right Approach

- **Use batch processing**

  - Best when data can be handled in groups
  - Simple and easy to scale for scheduled tasks

- **Use queues**

  - Works well if task order matters
  - Can pause and resume without losing data
  - Good for connecting multiple workers to a pipeline

- **Use streaming**

  - Ideal for continuous or unpredictable data
  - Cannot stop until data is fully processed
  - Handles real-time events and flows
