---
title: "Client Libraries"
description: "Using Client Libraries"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 21
last_update:
  date: 11/20/2022
---


## Overview 

Prometheus client libraries help instrument applications to expose metrics for collection by Prometheus. They are available in various programming languages.

- Supports languages like Go, Java, and Python
- Allows applications to expose custom metrics
- Enables automatic scraping by Prometheus

## Supported and Unofficial Libraries

prometheus has the official client libraries for the following   languages:

- Go 
- Java/Scala
- Python
- Ruby 
- Rust

Unofficial third-party client libraries:

- Bash 
- C
- C++
- C#
- Common LISP
- Dart
- Elixir
- Erlang
- Haskell
- Lua
- Node.js
- OCaml 
- Perl 
- PHP
- R

You can also write your own client libraries:

- Unsupported language
- Avoide unnecessary dependencies

## What to Instrument 

Instrumenting your system depends on the type of service and its requirements.

- **Online-serving systems**
  - Immediate response expected
  - Examples: Database and web servers
  - Track:
    - Number of queries/requests
    - Number of errors
    - Latency
    - Number of in-progress requests

- **Offline processing services**
  - No active waiting for response
  - Continuous running with multiple pipeline stages
  - Track:
    - Amount of queued work
    - Amount of work-in-progress
    - Rate of processing
    - Errors

- **Batch Jobs**
  - Run on a schedule, similar to offline services
  - Requires a **pushGateway**
  - Track:
    - Time processing each stage of the job
    - Overall runtime
    - Last time job was completed

## Naming Metrics

When using client libraries or creating custom metrics, it's essential to follow a proper naming format. The standard format is:

```bash
library_name_unit_suffix
```

Here are a few naming tips:

- Metric names should be all lowercase, with words separated by underscores ("_").

  Correct:  
  ```bash
  http_requests_total
  ```

  Incorrect:  
  ```bash
  HTTPRequestsTotal
  ```

- The `library` should represent the application or library that the metric is used for.

  Correct:  
  ```bash
  node_memory_usage
  ```

  Incorrect:  
  ```bash
  webserver_memory_usage
  ```

- The `name` should describe the metric’s purpose, whether one word or multiple.

  Correct (one word):  
  ```bash
  request_latency
  ```

  Correct (multiple words):  
  ```bash
  request_processing_duration
  ```

  Incorrect:  
  ```bash
  node_restarts
  ```

- The `unit` should always be included to clarify the metric’s measurement.

  Correct:  
  ```bash
  response_time_seconds
  ```

  Incorrect:  
  ```bash
  response_time
  ```

- Use unprefixed, standard units like "seconds," "bytes," and "meters."

  Correct:  
  ```bash
  data_received_bytes
  ```

  Incorrect:  
  ```bash
  data_received_kilobytes
  ```

- Suffixes like `_total`, `_count`, and `_sum` are best avoided unless referring to specific metric types like counters.

  Correct:  
  ```bash
  request_duration_seconds_total
  ```

  Incorrect:  
  ```bash
  request_duration_total
  ```