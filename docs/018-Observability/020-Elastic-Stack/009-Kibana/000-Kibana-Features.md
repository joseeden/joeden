---
title: "Kibana Features"
description: "Kibana Features"
tags: 
- Observability
- DevOps
- Monitoring 
- APM
- Elasticsearch
- Elastic Stack
- ELK Stack
- Kibana
sidebar_position: 0
last_update:
  date: 12/30/2022
---


## Kibana Main Features

Kibana has many built-in tools for exploring and managing data.

- Discover data easily
- Visualize data in charts
- Combine visualizations in dashboards

## Discover

The Discover tool displays raw data and lets you quickly filter or search through it.

- View data in its original form
- Apply filters to narrow results

This helps you understand what data is available and identify the parts you need before moving on to deeper analysis.

## Visualize

Once the data is understood, Visualize turns it into charts and graphs.

- Add visualizations to dashboards
- Monitor and search across multiple visualizations
- Keep important insights organized

By creating visual representations, it becomes easier to spot patterns, track changes, and present findings clearly in one central place.


## Time Series Visual Builder

This tool is made for working with time-based data.

- Create detailed time series charts
- Use advanced settings for analysis

It’s ideal for users who need precise control over time-based visualizations. The features make it easier to analyze trends and changes over time, keeping time-series analysis simple but powerful.

## Machine Learning Features

Kibana also includes built-in machine learning tools.

- Requires a premium license
- 30-day trial available

These features handle tasks like anomaly detection and prediction. The interface is simple, making advanced analytics less intimidating. Even without coding, users can apply machine learning to their datasets and quickly see results.

## Monitoring and SIEM

Kibana supports several monitoring tools.

- Application performance tracking
- Uptime and SIEM capabilities

It can monitor both external systems and the Elastic Stack itself. This means you can track performance, detect downtime, and use SIEM features for security analysis all in one place.

## Dev Tools and Console

Kibana has built-in developer tools to work with Elasticsearch.

- Syntax highlighting and auto-complete
- Easy API interactions

The Console tool makes it simple to run Elasticsearch queries without memorizing the syntax. For example:

```json
GET /_cluster/health
```

Expected result:

```json
{
  "cluster_name": "my-cluster",
  "status": "green",
  "number_of_nodes": 3
}
```

Most Elasticsearch operations can be done in the Console, which makes it the main workspace for interacting with the system.
