---
title: "Compute"
description: "GCP Compute Services"
tags: 
- Cloud
- GCP 
- Google
- Google Cloud
- DevOps
- Certifications
sidebar_position: 2
last_update:
  date: 9/21/2020
---




## Compute Engine 

With Compute Engine, you control CPU, memory, and configuration, perfect for apps needing specific hardware.

- Run custom virtual machines
- Choose CPU, memory, and storage

This is useful when applications require very specific hardware or system configurations. Compute Engine has three machine types:

- **General Type**: Balanced CPU and memory

- **Memory-optimized**: More memory for data-heavy apps

- **Compute-optimized**: More CPU for compute-intensive tasks

<div class='img-center'>

![](/img/docs/09282025-gcp-compute-types.png)

</div>


## App Engine

With App Engine, you just deploy code, and GCP handles scaling and infrastructure.

- Deploy apps without managing servers
- Automatically scale based on traffic

This is useful when developers want to focus on building applications while leaving infrastructure management to GCP.

<div class='img-center'>

![](/img/docs/09282025-hosting-google-app-engine-3.png)

</div>

## Cloud Functions

Cloud Functions is made for single-purpose tasks that only run when triggered.

- Runs only on events like file upload
- Costs less because you pay per request

This makes it efficient for apps that don’t run continuously but still need fast execution.

<div class='img-center'>

![](/img/docs/09282025-google-cloudfunctions.png)

</div>

A common use of Cloud Functions is to react when something is added to Cloud Storage. For example, it can make image thumbnails or check the tone of a text file. Other uses include:

- Transforming data before loading it into BigQuery
- Creating webhooks for third-party tools like GitHub
- Using ML APIs to analyze data from a database or storage bucket


## GCP Kubernetes Engine (GKE)

**GCP Kubernetes Engine (GKE)** provides a fully-managed service for deploying and scaling containers. GKE can automatically adjust resources based on demand. 

- Increases container instances during high demand
- Reduces containers when demand drops
- Enables container-to-container communication for workflow updates

<div class='img-center'>

![](/img/docs/09282025-8e065fcd-bfd0-470a-977a-e95550c10a39.jpg)

</div>

## Anthos

Anthos helps manage applications across clouds and on-premises in a consistent way. It also aids in modernizing legacy apps by moving them to containers.

- Provides unified deployment and management
- Works across GCP, other clouds, and on-premises
- Supports container-based modernization of older applications

Anthos ensures consistent operations, simplifies management, and reduces risks when running applications across multiple environments.

<div class='img-center'>

![](/img/docs/09282025-3_anthos_azure.max-1500x1500.jpg)

</div>
