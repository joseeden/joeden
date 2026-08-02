---
title: "GCP Overview"
description: "First things you need to know"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 1
last_update:
  date: 9/21/2020
---

## Overview

Google Cloud Platform (GCP) is one of the oldest and biggest cloud services available. It has some unique strengths that make it different from others.

- Global reach
- Strong open-source support

GCP uses the same powerful backbone as Google Search and YouTube, which gives businesses speed, reliability, and flexibility. Many tech giants offer cloud services, but GCP has special advantages.

- Large global network
- Strong focus on collaboration

Google owns one of the largest fiber networks in the world, and its open-source focus helps businesses cut costs while innovating faster.

## Global Infrastructure

Google Cloud runs on a private global network that connects regions, zones, and edge locations.

| Component     | Scope                         | Primary Purpose                                  | Typical Design Use                             |
| ------------- | ----------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| Region        | Large geographic area         | Disaster recovery and sovereignty boundaries     | Multi-region architecture for critical systems |
| Zone          | Isolated area inside a region | High availability inside one geographic boundary | Multi-zone deployment for production apps      |
| Edge location | Network ingress point         | Faster user access and content delivery          | Cloud CDN and low-latency global access        |


### Regions

A region is an independent geographic area where Google operates cloud infrastructure.

- Supports disaster recovery planning
- Isolates major failures by geography
- Helps meet compliance and data residency needs

If one region has a major outage, resources in another region continue to run.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-02034954.png)

</div>


### Zones

A zone is an isolated deployment area inside a region.

- Uses separate power, cooling, and networking
- Provides low-latency links between zones in the same region
- Reduces single data center failure risk

Deploying across multiple zones in one region is a common high-availability baseline.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-02035052.png)

</div>


### Edge Locations and PoPs

Edge locations, also called **points of presence**, are the nearest entry points to Google Cloud for users.

- Brings user traffic onto Google's private network sooner
- Supports content delivery through Cloud CDN
- Lowers round-trip latency for global users

For example, a user in Sydney can receive cached content from a nearby edge location instead of a distant region.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-02035135.png)

</div>


## Design Patterns

Use the redundancy level that matches business risk and budget.

<!-- - Single-zone: Lowest cost, and highest failure risk
- Multi-zone: Better uptime within one region
- Multi-region: Strongest resilience, and broader compliance support -->

:::tip

Start with multi-zone for most production workloads, and add multi-region when recovery objectives, regulations, or global user distribution require it.

:::

**Note**: A budget alert notifies you about spend, but it does not automatically stop resource usage.

<div class='img-center'>

![](/img/docs/Screenshot2026-08-02035243.png)

</div>




<!-- ## Who Uses GCP

GCP is trusted by both startups and global enterprises.

- Small businesses
- Fortune 500 companies

By offering modern infrastructure to all, GCP helps businesses of any size embrace digital transformation. -->

## Core Components

Every cloud platform is built on storage and compute. GCP offers key services for both.

- **Cloud Storage** for files and objects
- **Cloud SQL** for relational databases
- **Compute Engine** for virtual machines
- **App Engine** for web apps
- **Vertex AI** for building and running AI models

These services form the backbone of GCP and support everything else that runs on the platform.

## A Secure Framework

GCP storage and compute services are designed with security in mind.

- Strong encryption for all data
- Secure foundation for advanced services

This strong base ensures that higher-level services like analytics and AI run safely and smoothly.

<div class='img-center'>

![](/img/docs/09282025-gcp-secure-framework.png)

</div>


## Business Transformation 

Using GCP, businesses can grow faster and safer.

- Rapid product launches
- Built-in strong security

With pay-as-you-go pricing, scaling is easy. Businesses also gain the same strong security as Gmail and Google Drive, including encryption and global data centers.
