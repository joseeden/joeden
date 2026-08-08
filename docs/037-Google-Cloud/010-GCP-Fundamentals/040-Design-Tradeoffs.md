---
title: "Design Tradeoffs"
description: "High-level design tradeoffs for cloud architecture."
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 40
last_update:
  date: 9/21/2020
---

## Overview

Cloud architecture is a sequence of tradeoffs.

You rarely get a design that is best for cost, performance, security, reliability, and speed all at once. 

The job is to understand what the business values most, and then choose the tradeoff that fits.

## Architectural Tradeoffs

Every architectural decision involves some form of tradeoff. 

Improving one area often increases cost, complexity, or reduces another architectural quality.

| Design Priority        | Pros                                                 | Cons / Trade-offs                                              |
| ---------------------- | ---------------------------------------------------- | -------------------------------------------------------------- |
| **Higher Reliability** | Better availability, resilience, and fault tolerance | Higher infrastructure and operational costs                    |
| **Higher Security**    | Better protection, compliance, and risk reduction    | More operational overhead and complexity                       |
| **Faster Delivery**    | Features and changes reach users sooner              | Can reduce architecture simplicity and increase technical debt |
| **Lower Cost**         | Reduces infrastructure and operational spending      | May reduce performance, availability, or resilience            |

These tradeoffs also appear when combining multiple architectural priorities. 

For example, an architecture may prioritize both reliability and performance, but doing so can significantly increase cost.

| Priorities                    | Trade-off       | Example                                                                                                                                                                                                                        |
| ----------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reliability + Performance** | Higher cost     | <ul><li>Multi-zone deployment</li><li>Always-on redundancy</li><li>Synchronous replication</li><li>Premium networking</li><li>Provides high availability and performance but requires paying for additional capacity</li></ul> |
| **Performance + Low Cost**    | Less redundancy | <ul><li>Right-sized resources</li><li>Caching</li><li>Serverless services</li><li>Single-zone deployments reduce costs but may become unavailable if the zone fails</li></ul>                                                  |
| **Reliability + Low Cost**    | Slower recovery | <ul><li>Warm standby provides redundancy at a lower cost than hot standby</li><li>Resources may need to scale up during recovery</li><li>Results in a longer recovery time</li></ul>                                           |

The wrong answer is the one that meets a secondary goal but breaks an important constraint.

The right answer is the one that meets the primary business goal without breaking the important constraints.


## Decision Inputs

Before choosing an option, identify the decision inputs.

- Business goal
- Risk tolerance
- Compliance requirements
- Budget
- Migration timeline
- Operational maturity

When these inputs are clear, the tradeoff becomes easier to defend.

## Examples 

### Cloud SQL HA vs. Cloud Spanner

A good example of architectural tradeoffs is choosing between Cloud SQL HA and Cloud Spanner. 

Both provide highly available databases, but they are designed for different requirements and scales.

|                  | **Cloud SQL HA**                                                                     | **Cloud Spanner**                                           |
| ---------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **Scope**        | Regional with zonal failover                                                         | Global and multi-region                                     |
| **Availability** | Synchronous standby with failover typically under 1 minute                           | Up to 99.999% availability with multi-region configurations |
| **Resilience**   | Handles regional workloads well, but does not protect against a full regional outage | Can survive a full regional outage                          |
| **Scaling**      | Cannot horizontally scale writes                                                     | Horizontal write scaling                                    |
| **Cost**         | Significantly cheaper than Spanner                                                   | Considerably more expensive                                 |
| **Best For**     | Regional applications with predictable traffic                                       | Global-scale applications requiring multi-region resilience |

The choice depends on the application's actual requirements:

- **Choose Cloud SQL HA** for regional applications where high availability, predictable traffic, and lower cost are the main priorities.
- **Choose Cloud Spanner** when you need global consistency, horizontal write scaling, or multi-region resilience.

Using Cloud Spanner for a simple regional application may provide greater resilience and scalability, but the additional cost and complexity could make it unnecessary over-engineering.

### Cloud Run vs. Managed Instance Group

Another example of architectural tradeoffs is choosing between Cloud Run and a Managed Instance Group (MIG). 

The decision depends mainly on traffic patterns, latency requirements, cost, and the level of infrastructure control required.

|                   | **Cloud Run**                                            | **Managed Instance Group (MIG)**                                |
| ----------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| **Compute Model** | Serverless, can scale to zero                            | Pre-warmed VMs with minimum instances                           |
| **Scaling**       | Automatically handles bursts and can scale to zero       | Autoscaling available, but minimum instances can remain running |
| **Latency**       | Cold starts can introduce variable latency               | Consistent and predictable latency with no cold starts          |
| **Management**    | No VM management or OS patching                          | Requires VM and OS management                                   |
| **Control**       | Less control over the underlying infrastructure          | Full control over OS and runtime                                |
| **Cost**          | Can cost very little when idle because it scales to zero | Pay for minimum instances even when idle                        |
| **Best For**      | Variable traffic and event-driven workloads              | Workloads where consistent latency is a hard requirement        |

The choice should be driven by the application's latency and traffic requirements:

- **Choose Cloud Run** when traffic is variable, automatic scaling is important, and occasional cold-start latency is acceptable.
- **Choose a Managed Instance Group** when consistent p99 latency is a hard SLO and pre-warmed compute capacity is required.

If predictable latency is a strict requirement, paying for always-ready instances can be justified. 

If workloads are bursty and can tolerate cold starts, Cloud Run can provide a simpler and more cost-efficient architecture.

### Cloud Storage Cost vs. Access Frequency

Cloud Storage classes provide another example of an architectural tradeoff. 

Storage cost can be reduced for infrequently accessed data, but this comes with different retrieval costs and minimum storage durations.

| Storage Class | Relative Cost       | Access Pattern                         | Typical Use Case                       |
| ------------- | ------------------- | -------------------------------------- | -------------------------------------- |
| **Standard**  | 🔵 🔵 🔵 🔵       | Frequently accessed / immediate access | Active data requiring immediate access |
| **Nearline**  | 🔵 🔵 🔵 ⚪       | About once per month or less           | Monthly backups                        |
| **Coldline**  | 🔵 🔵 ⚪ ⚪       | About once per quarter or less         | Quarterly disaster recovery copies     |
| **Archive**   | 🔵 ⚪ ⚪ ⚪       | About once per year or less            | Compliance and long-term retention     |

The appropriate storage class should be based on how frequently the business needs to access the data, rather than simply choosing the lowest storage cost.

A simple approach is:

1. Identify the binding constraint.
2. Determine what the business actually needs.
3. Make the tradeoff explicitly.

For example, if data must be accessed frequently, **Standard** may be appropriate despite its higher storage cost. 

If data is retained primarily for compliance and rarely accessed, **Archive** can provide a lower-cost option.
