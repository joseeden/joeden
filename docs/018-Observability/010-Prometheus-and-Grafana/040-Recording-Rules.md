---
title: "Recording Rules"
description: "Recording Rules in PromQL"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 39
last_update:
  date: 11/20/2022
---


## Overview

Recording rules allow you to precompute frequently used queries and store the results as new time series, which then improves query performance. They are useful for reducing query complexity and optimizing system performance.

- Store the results of a complex query as a new time series.  
- Can reduce computational load during frequent queries.  
- Help improve performance and speed up dashboarding and alerting.  

With Recording Rules, you don't have to evaluate the expressions on the fly since they are stored in the database. 


## Recording Rules Configuration

Recording rules are stored in a `rules.yml` file, which is then referenced in the main `prometheus.yml` file.

```yaml title=rules.yml
groups:
  - name: <group name 1>
    rules:
      - interval: <evaluation interval>
        record: <rule name 1>
        expr: <promql expression 1>
        labels:
          <label name>: <label value>
      - record: <rule name 2>
        expr: <promql expression 2>
        labels:

  - name: <group name 2>
    rules:
      # Additional rules for group 2, if any
```

Each file defines one or more rule groups under the `groups` key. If the `evaluation interval` is not defined, it will default to the value set in the Prometheus configuration.

- `record` specifies the rule name, which is defined in the `expr`.
- Use `labels` to add or remove labels before storing the results.
- Rules are evaluated in the order in which they are declared.

## Calling the Rules File

To reference the rules file in the Prometheus config file:

```yaml title=prometheus.yml
global:
  scrape_interval: 15s      
  evaluation_interval: 15s  
rules_files:
  - rules.yml
scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 15s      
    scrape_timeout: 5s        
    sample_limit: 1000        
    static_configs:
      - targets: ['localhost:9090']
```

Alternatively, you can use globbing to specify multiple rules files:

```yaml
rules_files:
  - /etc/prometheus/rules/*.yml 
```

Remember, after making changes to a rule file, you need to restart the Prometheus service:

```bash
sudo systemctl restart prometheus 
sudo systemctl status prometheus 
```

## Using Recording Rules 

In the example below, we are using a recording rule to store the result of a rate calculation for HTTP requests over a 5-minute period.

```yaml
groups:

  - name: http_requests
    rules:
      - interval: 1m
        record: http_requests_rate_5m
        expr: rate(http_requests_total[5m])
        labels:
          job: 'api-server'

      - interval: 1m
        record: http_requests_rate_1m
        expr: rate(http_requests_total[1m])
        labels:
          job: 'api-server'

  - name: memory_usage
    rules:
      - interval: 1m
        record: avg_memory_usage
        expr: avg(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) by (instance)
        labels:
          job: 'node-exporter'
```

Explanation:

- `http_requests_rate_5m`: 

    - Calculates the rate of HTTP requests over a 5-minute window. 
    - Stores the result as `http_requests_rate_5m`. 

- `http_requests_rate_1m`: 

    - Similar to the previous rule but for a 1-minute rate.

- `avg_memory_usage`: 

    - Calculates the average memory usage across instances.
    - Shows the ratio of available memory to total memory.

These recording rules help optimize queries by precomputing, storing the results,  and making it easier to retrieve them later.


## Record Rule Naming

A good naming scheme allows for easy identification and management of rules. The recommended format is:

```bash
level:metric:operations
```

Where:

- **Level**
    - Indicates the aggregation level of the metric based on its labels.
    - Always include the `job` label, along with any other relevant target labels.
  
- **Metric**
    - Refers to the metric or time series name being measured.
  
- **Operations**
    - Describes the functions and aggregators applied to the metric.
    - Examples: `sum`, `avg`, `max`.

Example Naming:

- This represents the rate of a metric for the `api-server` job.

    ```bash
    job:api-server:rate 
    ```

- This could represent the maximum value of a metric collected by the `node-exporter` instance.

    ```bash
    instance:node-exporter:max
    ```


## Organizing Recording Rules by Job

In addition to a good naming convention, all the rules for a specific job should be contained in the same group to ensure organization and clarity.

In the sample `rules.yml` file below, all rules for the `api-server` job are placed within the same group, and similarly for the `node-exporter` job. This helps keep related rules organized.

```yaml
groups:
  - name: api-server
    rules:
      - interval: 1m
        record: job:api-server:http_requests_rate_5m
        expr: rate(http_requests_total[5m])
        labels:
          job: 'api-server'
      - interval: 1m
        record: job:api-server:http_requests_rate_1m
        expr: rate(http_requests_total[1m])
        labels:
          job: 'api-server'
      - interval: 1m
        record: job:api-server:avg_response_time
        expr: avg(http_request_duration_seconds) by (job)
        labels:
          job: 'api-server'
      
  - name: node-exporter
    rules:
      - interval: 1m
        record: instance:node-exporter:avg_memory_usage
        expr: avg(node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes) by (instance)
        labels:
          job: 'node-exporter'
      - interval: 1m
        record: instance:node-exporter:cpu_usage
        expr: avg(rate(node_cpu_seconds_total[5m])) by (instance)
        labels:
          job: 'node-exporter'
```

