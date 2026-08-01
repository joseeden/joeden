---
title: "Streaming Analytics and Data Pipelines"
description: "GCP streaming analytics with Pub/Sub and Dataflow"
tags: 
- Cloud
- GCP 
- Google
- Google Cloud
- DevOps
- Certifications
sidebar_position: 7
last_update:
  date: 9/21/2020
---

## Overview

Streaming analytics processes data continuously instead of waiting for batch jobs.

- Handles events as they happen
- Reduces analysis delay
- Supports time-sensitive decisions

This is useful for data sources like sensors, clickstreams, app activity, and financial feeds.

## Batch Versus Streaming

Batch processing groups data and processes it later, while streaming processes records as they arrive.

- **Batch** is good for scheduled workloads and large periodic jobs
- **Streaming** is good for real-time monitoring and fast reactions

Streaming analytics is the better fit when the value of the data drops quickly over time.

## Pub/Sub

Pub/Sub is Google Cloud’s publish and subscribe messaging service.

- Receives messages from many producers
- Distributes data to one or more subscribers
- Works well for asynchronous event streams

Pub/Sub is often the first step in a real-time pipeline because it collects incoming events reliably.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-01164427.png)

</div>

## Dataflow

Dataflow processes both streaming and batch data pipelines.

- Uses Apache Beam as the pipeline model
- Handles ETL-style processing
- Scales automatically with pipeline demand

Dataflow is a managed service that reduces the infrastructure work required to build and operate pipelines.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-01164500.png)

</div>


## Typical Pipeline

A common streaming flow looks like this:

- Applications or devices send events to Pub/Sub
- Dataflow transforms and enriches the events
- BigQuery stores the processed data for analysis
- Looker visualizes the results for business users

This flow supports real-time insights without forcing teams to wait for a manual batch process.

## Common Use Cases

Streaming analytics is useful when events need immediate action.

- Monitor sensors and operational systems
- Detect unusual account activity
- Track clickstreams and user behavior
- Enrich events for reporting and dashboards

**Note**: Streaming is not only about speed. It is also about keeping data fresh enough to drive the decision that depends on it.