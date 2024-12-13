---
title: "HTTP API"
description: "Prometheus HTTP API"
tags: 
- Linux
- Observability
- Monitoring 
- APM
- Prometheus
- DevOps
sidebar_position: 41
last_update:
  date: 11/20/2022
---

## Overview 

The Prometheus HTTP API enables programmatic access to Prometheus for querying data and managing configurations.

- Execute PromQL queries for time-series data.
- Access system and Prometheus metrics.
- Retrieve and modify Prometheus settings.

This is useful for situations where using the built-in web GUI isn't an option:

- When building custom tools 
- Third-party integrations

## Running a Query 

To run a query through the API, send the `POST` request to:

```bash
http://<prometheus-ip>/api/v1/query
```

As an example, if we want to pass this expression:

```bash
node_arp_entries{instance="192.168.1.100:9100"} 
```

We need to add it to the query parameter of the `POST` request:

```bash
curl http://<prometheus-ip>/api/v1/query \
 --data 'query=node_arp_entries{instance="192.168.1.100:9100"}'
```

## Query at a Specific Time 

To perform a query at a specific time, add the Unix time as a parameter as well:

```bash
curl http://<prometheus-ip>/api/v1/query \
 --data 'query=node_arp_entries{instance="192.168.1.100:9100"}' \
 --data 'time=16705456462.145'
```

## Range Vector 

To return a range vector:

```bash
curl http://<prometheus-ip>/api/v1/query \
 --data 'query=node_arp_entries{instance="192.168.1.100:9100"}[5m]' \
 --data 'time=16705456462.145'
```
