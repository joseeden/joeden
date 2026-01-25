---
title: "Metrics"
description: "Metrics in Prometheus"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 19
last_update:
  date: 11/20/2022
---

## Overview  

Prometheus metrics are used to collect and analyze numerical data over time, making them ideal for monitoring applications and systems. These metrics are presented in a simple text-based format that Prometheus scrapes periodically.

```json
node_cpu_seconds_total{cpu="0", mode="idle"} 12345.67
```

Breakdown of the Metric:

| **Component**   | **Example**                   | **Description**                                                                 |
|------------------|-------------------------------|---------------------------------------------------------------------------------|
| **Metric Name**  | `node_cpu_seconds_total`      | Represents the name of the metric being recorded. It measures the total CPU time in seconds. |
| **Labels**       | `{cpu="0", mode="idle"}`      | Provides additional context or dimensions to the metric. |
| **Value**        | `12345.67`                    | The actual numeric measurement for the metric (e.g., total idle CPU time in seconds). |

Labels:

- `cpu="0"` specifies the CPU core.  
- `mode="idle"` indicates the CPU mode being measured. 

## Metrics for Multiple CPUs 

If your system has multiple CPUs, Prometheus will generate metrics for each CPU core and mode. For example, you might see metrics like the following:

```bash
node_cpu_seconds_total{cpu="0", mode="idle"} 12345.67
node_cpu_seconds_total{cpu="1", mode="idle"} 54321.89
node_cpu_seconds_total{cpu="2", mode="system"} 6789.12
node_cpu_seconds_total{cpu="3", mode="system"} 9876.54
```

## Metrics for Single CPU with Multiple Modes

If your system has only one CPU (`cpu="0"`) but supports multiple modes, Prometheus will generate metrics for each mode. For example:

```bash
node_cpu_seconds_total{cpu="0", mode="idle"} 12345.67
node_cpu_seconds_total{cpu="0", mode="system"} 6789.12
node_cpu_seconds_total{cpu="0", mode="user"} 4567.89
node_cpu_seconds_total{cpu="0", mode="iowait"} 234.56
node_cpu_seconds_total{cpu="0", mode="irq"} 12.34
node_cpu_seconds_total{cpu="0", mode="softirq"} 45.67
node_cpu_seconds_total{cpu="0", mode="steal"} 0.00
node_cpu_seconds_total{cpu="0", mode="nice"} 8.90
```

Where: 

- **`cpu="0"`**: Specifies the single CPU core being monitored.
- **Modes**: Represents different states or operations of the CPU:
  - **`idle`**: Time spent in an idle state.
  - **`system`**: Time spent executing system-level processes.
  - **`user`**: Time spent executing user-level processes.
  - **`iowait`**: Time spent waiting for I/O operations.
  - **`irq`**: Time spent servicing hardware interrupts.
  - **`softirq`**: Time spent servicing software interrupts.
  - **`steal`**: Time stolen by other virtual machines (in a virtualized environment).
  - **`nice`**: Time spent on low-priority user-level processes.
- **Values**: Numeric measurements in seconds representing the time spent in each mode.



## Timestamps

Prometheus associates each scraped metric with a timestamp, recording the exact time it was collected. An example timestamp will look like this:

```bash
node_cpu_seconds_total{cpu="0", mode="idle"} 12345.67 1609459200
```

This is called the **Unix timestamp**, which is the number of seconds since January 1, 1970 (the Unix epoch).

- **Epoch Time**: A standardized way to represent time.
- **Precision**: Enables accurate historical analysis and comparison.


## Timeseries 

Timeseries is a stream of timestamped values that share the same metric and labels.

- **Data Points**: Each value is associated with a timestamp.
- **Label Variations**: Different labels represent different instances of the same metric.

In the example below, timeseries data for different devices and CPUs is shown:

```bash
node_filesystem_files{device="sda2", server="server1"} 1000000 1609459200
node_filesystem_files{device="sda3", server="server1"} 1500000 1609459200
node_filesystem_files{device="sda2", server="server2"} 1200000 1609459200
node_filesystem_files{device="sda3", server="server2"} 1700000 1609459200

node_cpu_seconds_total{cpu="0", server="server1"} 12345.67 1609459200
node_cpu_seconds_total{cpu="1", server="server1"} 23456.78 1609459200
node_cpu_seconds_total{cpu="0", server="server2"} 34567.89 1609459200
node_cpu_seconds_total{cpu="1", server="server2"} 45678.90 1609459200
``` 

Each line represents a timeseries for a specific label combination (e.g., device, server, or CPU) 

- There are two metrics: `node_filesystem_files` and `node_cpu_seconds_total`
- There are 8 total time series, which is a combination of metrics and labels
- Each has timestamp indicating when the metric was recorded.



## Metric Attributes

Prometheus metrics have attributes that provide metadata about the metric, including its type and description. These attributes help users understand what the metric represents and how it should be interpreted.

- **`TYPE`**: Specifies the type of the metric (e.g., counter, gauge, histogram).
- **`HELP`**: Provides a brief description of what the metric measures.

In the example below, you can see the `#HELP` and `#TYPE` attributes:

```
# HELP node_cpu_seconds_total Total seconds the CPU has spent in each mode.
# TYPE node_cpu_seconds_total counter
node_cpu_seconds_total{cpu="0", mode="idle"} 12345.67
node_cpu_seconds_total{cpu="0", mode="system"} 6789.12
```

This shows the description and type of the metric, followed by the actual metric data.


## Metric Types 

- **Counter**  

  - **How many times did X happen?**
  - A monotonically increasing value.  
  - Used for counting events.  
  - Cannot decrease, only go up, only reset to zero.
  - Example:
    - Total number of requests
    - Total number of exceptiosn
    - Total number of job executions

- **Gauge**  

  - **What is the current value of X?**
  - Can go up and down.  
  - Example:
    - Current CPU Utilization 
    - Available System Memory
    - Number of Concurrent Requests

- **Histogram**  

  - **How long or how big X is?**
  - Measures event distributions (e.g., request durations).  
  - Provides groupings or buckets for classification.  
  - Useful for calculating percentiles.
  - Example:
    - Response Time:
        - `< 1s`        
        - `< 0.75s`        
        - `< 0.10s`        
    - Request size:
        - `< 1500MB`        
        - `< 1000MB`        
        - `< 500MB`        

- **Summary**  

  - **How long or how big X is?** - Similar to a histogram.
  - How many observations fell below X.
  - Don't have to define quantiles ahead of time.
  - Provides quantiles like the 95th percentile.  
  - Tracks latency and response times.  
  - Example:
    - Response Time:
        20% = `< 1s`        
        70% = `< 0.75s`        
        10% = `< 0.10s`        
    - Request size:
        20% = `< 1500MB`        
        65% = `< 1000MB`        
        20% = `< 500MB`        


## Metric Rules 

Metric rules define how Prometheus handles and processes metrics. This ensures consistency and reliability in data collection and analysis. 

- Metrics should have clear, descriptive names (e.g., `http_requests_total`).  
- Metric names may contain ASCII letters, numbers, underscores, and colons.
- Use consistent labels for context (e.g., `method="GET"`, `status="200"`).
- Metrics names must match the regex: `[a-zA-Z_:][a-zA-Z0-9_:]*`
- Colons are only reserved for recording rules. 


## Labels 

Labels provide additional context to metrics for more detailed filtering and analysis. They help to differentiate similar metrics by attaching key-value pairs.

- Can represent attributes like `method`, `status`, or `server`.  
- Allows grouping and aggregation of metrics based on different dimensions.
- Allows splitting of metric by a specified criteria.
- A metric can have more than one label, 
- Can use ASCII letters, numbers, underscores.
- Must match the regex: `[a-zA-Z_:][a-zA-Z0-9_:]*`

## Why Use Labels

Imagine an e-commerce app that initially has one endpoint: 

- `GET /products`

Over time, the application grew to include eight different endpoints such as:

- `GET /products`
- `POST /checkout`
- `GET /orders`
- `POST /login`
- `GET /cart`
- `PUT /cart`
- `GET /users`
- `POST /payment`

Without labels, you would need to create separate metrics for each endpoint, which quickly becomes inefficient and difficult to manage. Instead, by using labels, you can track all endpoints with a single metric and filter or group by the label `endpoint`. This makes it much more scalable and manageable as the application continues to expand.

```bash
http_requests_total{endpoint="GET /products", method="GET", status="200"} 150
http_requests_total{endpoint="POST /checkout", method="POST", status="200"} 80
http_requests_total{endpoint="GET /orders", method="GET", status="404"} 5
http_requests_total{endpoint="POST /login", method="POST", status="200"} 120
http_requests_total{endpoint="GET /cart", method="GET", status="200"} 200
http_requests_total{endpoint="PUT /cart", method="PUT", status="201"} 50
http_requests_total{endpoint="GET /users", method="GET", status="200"} 300
http_requests_total{endpoint="POST /payment", method="POST", status="200"} 90
```

## Internal Labels 

Internal labels are used by Prometheus to represent specific system-level metrics or unique characteristics that are not typically defined by the user. These labels help to identify and track specific instances of metrics automatically.

Take the metric below as an example:

```bash
node_cpu_seconds_total{cpu="0"}
```

This metric has an internal label of `cpu`, which identifies the CPU core being tracked. The metric name is also a label in itself, so it would look like this:

```bash
{_name_=node_cpu_seconds_total, cpu="0"}
```

Labels surrounded by underscores (`_`) are considered system-specific in Prometheus. These labels are automatically assigned by Prometheus or the monitored system and provide internal context. 


## Instance and Job Labels

Every metric is assigned two labels by default: `instance` and `job`. These labels help identify the source of the metrics and the role of the target in the system.

As an example:

```bash
node_boot_time_seconds{instance="10.11.12.13", job="worker"}
```

The `instance` label refers to the specific target (e.g., an IP address or hostname), and the `job` label identifies the role or group of the target (e.g., a "worker" node). This matches the configuration in the `config.yml` for Exporters:

```yaml
scrape_configs:
  - job_name: 'worker'
    static_configs:
      - targets: ['10.11.12.13:9100']
  - job_name: 'database'
    static_configs:
      - targets: ['10.11.12.14:9100']
```

In the `config.yml` file, the `job_name` corresponds to the `job` label in the metrics, and the `targets` specify the instances from which metrics will be scraped.