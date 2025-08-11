---
title: "Prometheus Monitoring with Traefik"
description: "Prometheus Monitoring with Traefik"
tags: 
- Cloud
- DevOps
- Containers
- Containerization
- Kubernetes
- Traefik
- Observability
- Prometheus
- Grafana
sidebar_position: 13
last_update:
  date: 2/5/2023
---

## Overview

In this lab, We will create a monitoring stack for our services.

- Docker Swarm services send metrics to Prometheus
- Grafana displays the data in dashboards
- Traefik routes requests and provides its own metrics

This setup lets us see latency and traffic between Traefik and the services it manages.

:::info 

We use Prometheus because it is widely used, well-documented, and compatible with other tools.

:::


## Enabling Prometheus in Traefik

You can enable Prometheus metrics in Traefik with just a few lines.

```yaml
metrics:
  prometheus: {}
```

Prometheus uses **time series*- data. It groups results into buckets based on response times, such as `0.1s`, `0.3s`, or `1.25s`. Shorter requests go into smaller buckets, and longer requests go into larger ones.

## Deployment Plan

We will run the full stack together.

- Traefik sits between Docker Swarm and the services
- Metrics from Traefik and services go to Prometheus
- Grafana visualizes metrics on dashboards

This setup will give a clear view of service performance and traffic patterns, helping you monitor the health of your system effectively.
