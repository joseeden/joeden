---
title: "Exporters"
description: "Exporters in Prometheus"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 11
last_update:
  date: 3/28/2023
---


## Overview 

Prometheus collects metrics by sending HTTP requests to the `/metrics` endpoint of each target. The endpoint can also be changed and Prometheus can be configured to use a different path other than `/metrics` Note that most systems don't expose metrics on an HTTP endpoint. For these instances, we can install **exporters** on the targets which:

- Collects metrics from the service
- Converts metrics to a format expected by Prometheus
- Exposes `/metrics` endpoint so Prometheus can scrape the data.

It can monitor various systems, including:

- Websites running on Windows
- Batch processes on Linux
- Servers on both Windows and Linux
  
Many exporters are developed by the community or the Prometheus project. They are available for various use cases, including:

- Databases
- Message queues
- Cloud services
- Hardware, etc.

## Setting up a Node Exporter 

Exporters act as intermediaries between the target nodes and the Prometheus server. It is installed on the target nodoe and it translates system or application data into Prometheus-compatible formats. To setup a node exporter on a Linux node, please see [Setting up Exporters.](/docs/018-Observability/010-Prometheus-and-Grafana/021-Setting-up-Exporters.md)

## Types of Exporters 

Some common exporters include:

- **Node Exporter**  
    - Monitors system-level metrics like CPU, memory, and disk usage.  
    - Collects data from Linux-based systems.  
    - Provides essential server health metrics.

- **Blackbox Exporter**  
    - Probes services over HTTP, HTTPS, DNS, TCP, and ICMP.  
    - Monitors the availability of external services.  
    - Customizable for specific endpoints.

- **MySQL Exporter**  
    - Collects MySQL database metrics.  
    - Monitors query times, replication, and connections.  
    - Helps track MySQL performance.

- **JMX Exporter**  
    - Exposes metrics from Java applications via JMX.  
    - Monitors JVM performance and garbage collection.  
    - Used for Java-based applications.

- **Exporter for Cloud Services**  
    - Collects metrics from cloud services like AWS, Azure, and GCP.  
    - Tracks cloud resource usage and performance.  
    - Monitors both cloud and on-premise resources.