---
title: "Cloud Migration Strategies"
tags: [Cloud, Cloud Migration, Certifications]
sidebar_position: 3
last_update:
  date: 10/3/2022
---


## Overview

Cloud migration can follow different strategies depending on business goals, technical requirements, and constraints. Each approach has its own benefits and use cases.

- **Rehost (Lift and Shift)**

  - Move servers or applications from on-premise directly to the cloud.
  - Quick migration with minimal changes.
  - Scalable and pay-as-you-go.
  - Ideal for organizations starting migration or with tight deadlines.

- **Replatform (Modify Lift and Shift)**

  - Make small optimizations during migration.
  - Improves efficiency without full redesign.
  - Enhances performance for specific workloads.
  - Reduces long-term maintenance costs.

- **Repurchase (Drop and Shop)**

  - Switch to a different product or service
  - Often changing licensing or platform.
  - Moves away from incompatible software.
  - Can reduce licensing complexity.

- **Refactor (Rearchitect)**

  - Redesign the application to be cloud-native.
  - Improves availability and reliability.
  - Enables better scalability and flexibility.

- **Retain (Hybrid or Partial Migration)**

  - Keep some systems on-premise due to readiness or regulations.
  - Supports phased migration.
  - Ensures compliance with legal or corporate policies.

- **Retire (Turn Off Services)**

  - Identify and shut down unused or low-value services.
  - Reduces costs and operational complexity.
  - Focuses resources on key business areas.

## Strangler Fig Pattern

The Strangler Fig pattern helps migrate large legacy applications incrementally to the cloud. Instead of rewriting everything at once, you modernize one function at a time.

- Modernize one feature as a microservice
- Host the new microservice in the cloud
- Remove the same feature from the legacy app
- Repeat until the entire application is re-architected

#### Example: Banking Application Modernization

A bank can apply the Strangler Fig pattern to move its online banking app to the cloud without disrupting operations.

1. **Start with the digital wallet**

    - Develop it as a containerized microservice
    - Deploy it on Google Kubernetes Engine (GKE)
    - Replace the legacy wallet once functional

2. **Capture wallet transactions with Google Cloud Spanner**

    - Gain scalability and concurrent transaction handling
    - Replace the old legacy functionality

3. **Add a financial dashboard**

    - Build using Google BigQuery and Looker
    - Replace the legacy dashboard gradually

4. **Repeat for other core functions**

    - Incrementally modernizes the entire banking app
    - Minimal disruption to ongoing operations

This pattern ensures that large applications can be modernized step by step, improving scalability and performance while keeping operations stable throughout the migration.


## Resources 

- [Getting Started with Migrating to AWS](https://cloudacademy.com/learning-paths/cloud-academy-getting-started-with-migrating-to-aws-125/)
