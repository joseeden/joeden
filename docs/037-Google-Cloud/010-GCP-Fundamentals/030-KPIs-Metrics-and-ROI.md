---
title: "KPIs, Metrics, and ROI"
description: "Connecting business goals to measurable targets and architecture choices"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 30
last_update:
  date: 9/21/2020
---

## Overview

A cloud migration is not successful because the system is in the cloud.

It is successful when the business can measure the result it wanted.

That is why KPIs, metrics, and ROI matter to cloud architects. They are not just reporting terms. They are design inputs.

## Key Terms

| Term        | Meaning                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| **Metric**  | A raw data point that can be measured over time                         |
| **KPI**     | A key performance indicator that shows progress toward a business goal  |
| **ROI**     | Return on investment, or the value gained compared to the cost          |

Metrics feed KPIs, and KPIs help prove ROI.

**Note**: A target such as "move to Google Cloud" is a destination, not a success measure. 

A KPI is not "moved to the cloud" but it can be:

- Reduced downtime by 50% after migration
- Reduced infrastructure costs by 30% after migration

## From Business Goal To Architecture

The usual pattern is simple.

1. Start with a business requirement.
2. Turn it into a measurable KPI.
3. Use the KPI to guide the architecture.

Example: A retailer says they want to improve their customer experience.

That is too vague on its own. Better targets might be:

- Page loads in under 2 seconds for 95% of users.
- Cart abandonment drops by 15%.
- Customer support responds in under 5 minutes.

When a KPI becomes specific, the architecture becomes clearer.

| KPI Target                              | Likely Design Direction                                               |
| --------------------------------------- | --------------------------------------------------------------------- |
| Faster page load times                  | Cloud CDN + Memorystore, caching, and lower-latency content delivery  |
| Reliable checkout flow                  | Regional load balancing, multi-zone database design                   |
| Faster support response                 | Vertex AI Agent Builder or other automation for support               |
| Higher availability target              | Redundancy, failover, and health checks                               |

The exact service choice depends on the workload, but the KPI should point you toward the right class of solution.

:::tip

When a KPI is unclear, ask what the business wants to improve in measurable terms before choosing a service.

:::

## ROI For Cloud Projects

Return on investment (ROI) is how a business evaluates and justifies the cost of a project.

You will often need to estimate the ROI of a cloud migration or new service, and frame the recommendations in terms of business value before the business will approve the work.

When designing the architecture, you should consider both the benefit side and the cost side of ROI.

Sample benefit side:

- Lower infrastructure costs
- Faster delivery cycles
- Better developer productivity
- Less downtime
- New capabilities that were not practical before

Sample cost side:

- Migration effort
- Training
- Licensing
- Ongoing cloud spend
- Temporary overlap between old and new systems

Good recommendations speak to both sides.

**Note**: A technically elegant design is not enough if the business cannot justify the cost.

## Availability And Latency Targets

When a business asks for 99.9% availability or response times under 300 ms, it is giving you success metrics.

Those targets connect directly to SLI and SLO design.

| Business Target           | Architecture Implication                         |
| ------------------------- | ------------------------------------------------ |
| 99.9% availability        | Define clear SLIs, SLOs, and recovery planning   |
| Sub-300 ms response time  | Use caching, load balancing, and performance testing |
| Low downtime tolerance    | Use multi-zone or multi-region resilience         |

Availability and latency are business requirements first, and architecture choices second.

The architecture exists to meet the business targets, not the other way around.

