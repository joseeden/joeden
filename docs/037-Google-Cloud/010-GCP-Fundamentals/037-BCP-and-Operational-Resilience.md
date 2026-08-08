---
title: "BCP and Operational Resilience"
description: "Business continuity fundamentals and the cloud design choices that support recovery"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 37
last_update:
  date: 9/21/2020
---

## Overview

Business continuity planning, or BCP, is the discipline of keeping critical business functions available during disruption.

In cloud architecture, BCP is not a document only. It becomes a design requirement that shapes redundancy, failover, backup, recovery, and testing.

## What BCP Covers

Business continuity planning (BCP) asks a simple question: 

**If something fails, how does the business keep operating?**

Common concerns include:

- Service outage
- Region outage
- Data corruption
- Human error
- Security incident

The goal is to keep critical services usable, even when one part of the environment is unhealthy.

## Recovery Objectives

Two terms matter most in recovery planning.

| Term                               | Description                                                                                           | Design Impact                                                          | Example                                                                       |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **RTO (Recovery Time Objective)**  | Maximum acceptable downtime after an outage before services must be restored.                         | Drives failover speed, disaster recovery procedures, and automation.   | **RTO = 2 hours:** The service must be restored within 2 hours of an outage.  |
| **RPO (Recovery Point Objective)** | Maximum acceptable data loss, measured as the time between the last recoverable data and the failure. | Drives backup frequency, replication strategy, and snapshot intervals. | **RPO = 15 minutes:** At most 15 minutes of data can be lost after a failure. |

Shorter RTO and RPO values usually require stronger and more expensive designs.

| RTO Target       | RPO Target    | Required Architecture                                            | DR Strategy          |
| ---------------- | ------------- | ---------------------------------------------------------------- | -------------------- |
| **< 15 minutes** | **0**         | Hot standby in second region, synchronous replication, always-on | **Hot Standby**      |
| **< 1 hour**     | **< 1 hour**  | Warm standby, asynchronous replication, pre-provisioned target   | **Warm Standby**     |
| **< 4 hours**    | **< 4 hours** | Minimal infrastructure running, scale on recovery                | **Pilot Light**      |
| **< 24 hours**   | **24 hours**  | Daily backups, cold restore, no standby infrastructure           | **Backup & Restore** |


In terms of reliability, the terms below are also important.

| Term                              | Description                                                                                         | Example                                                                         |
| --------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **SLI (Service Level Indicator)** | The measured metric, such as successful requests under a latency threshold.                         | **99.8%** of requests complete in **under 200 ms**.                             |
| **SLO (Service Level Objective)** | The internal target for the SLI metric.                                                             | Target: **99.9%** of requests should complete in **under 200 ms** each month.   |
| **SLA (Service Level Agreement)** | The external commitment to customers, typically with business or financial consequences if not met. | Customers are guaranteed **99.9% uptime**, or they receive **service credits**. |

## Resilience Patterns

The right design depends on the business impact of failure.

- Multi-zone deployment improves availability inside one region.
- Multi-region design provides stronger recovery for regional failures.
- Automated failover reduces human delay during incidents.
- Backups and restore tests protect against data loss and corruption.

**Note**: A backup is not a recovery plan unless the team has tested restore and failover.

In practice, the best designs combine multiple patterns. For example, a multi-region deployment with automated failover and tested backups is stronger than any single pattern alone.

The platform should be designed to survive failure, and the team should know how to recover it. That means health checks, monitoring, incident response, and repeatable recovery steps all matter.
