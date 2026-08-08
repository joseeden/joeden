---
title: "Workload Disposition"
description: "How to choose the right environment for your workload"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 42
last_update:
  date: 9/21/2020
---


## Overview

Workload disposition is the decision about what should happen to an existing workload based on its business value, cost, complexity, and technical requirements.

There are four main directions:

| Option        | Description                                                            |
| ------------- | ---------------------------------------------------------------------- |
| **Build**     | Create or rebuild a solution when it provides unique business value.   |
| **Buy**       | Use an existing product or managed service for commodity capabilities. |
| **Modify**    | Preserve the workload but change or modernize how it runs.             |
| **Deprecate** | Retire workloads that no longer provide enough business value.         |

The goal is not simply to move every workload to the cloud. 

The goal is to choose the option that provides the most business value for its cost and complexity.

## Build

Build when the workload provides a **genuine competitive advantage** and existing products cannot adequately meet the business requirement.

Advantages:

- Provides unique capabilities.
- Can be tailored exactly to business requirements.
- Gives greater control over architecture and features.
- Can differentiate the business from competitors.

Trade-offs:

- Higher engineering and development cost.
- Requires ongoing maintenance and ownership.
- Security, scaling, availability, and operations must be managed.
- Development may take longer than adopting an existing solution.

Building is usually justified when the capability is important to **how the business differentiates itself or makes money**.

> Avoid building a custom solution when an existing managed service already satisfies most of the requirements at significantly lower cost.

## Buy

Buy when the workload performs a **commodity function** that the business needs but that does not provide meaningful competitive differentiation.

Instead of building and operating the capability yourself, use an existing product or managed cloud service.

Advantages:

- Faster implementation.
- Less engineering and operational overhead.
- The provider may handle patching, scaling, and high availability.
- Often cheaper than developing and maintaining a custom solution.

Trade-offs:

- Less control over the platform.
- Vendor dependency.
- Potential feature or platform lock-in.
- Customization may be limited.

Examples include using: 

- BigQuery instead of building a data warehouse
- Cloud SQL instead of operating your own database servers
- Pub/Sub instead of developing a custom messaging system

## Modify

Modify when the workload still provides business value, but running it unchanged would be inefficient, expensive, or difficult to maintain.

The goal is to **preserve its value while improving how it operates** rather than completely rebuilding it.

Advantages:

- Preserves existing business functionality.
- Can reduce operational overhead.
- Allows the workload to take advantage of cloud services.
- Usually requires less effort than a complete rebuild.

Trade-offs:

- Some legacy architecture or technical debt may remain.
- Migration can require application changes.
- The resulting architecture may not be fully cloud-native.

Examples:

- An existing Java application could be containerized and moved to GKE.
- A self-managed MySQL database could be migrated to Cloud SQL.

## Deprecate

Deprecate when the workload **no longer provides enough business value to justify its cost**.

Moving an unnecessary workload to the cloud does not make the migration successful. 

It simply moves the operational and financial burden somewhere else.

Advantages:

- Eliminates infrastructure costs.
- Removes maintenance and operational overhead.
- Reduces unnecessary engineering work.
- Can reduce security and technical debt.

Trade-offs:

- Requires confirmation that the workload is no longer needed.
- Stakeholders may resist shutting down familiar systems.
- Dependencies and integrations must be identified before removal.

Common examples:

- Old reporting systems that have already been replaced.
- Custom integrations that have been superseded by newer services.


## Migration Strategies

When the decision is to keep or modify a workload, the next question is **how much change should be made during the migration**.

| Option     | Meaning                               | Typical Use                                          |
| ---------- | ------------------------------------- | ---------------------------------------------------- |
| Retain     | Keep the workload as is for now       | The system is stable or migration risk is too high   |
| Retire     | Remove the workload completely        | The application is no longer needed                  |
| Rehost     | Move the workload with minimal change | The business wants speed over redesign               |
| Replatform | Make limited changes during migration | The workload can benefit from cloud managed services |
| Refactor   | Redesign the workload for the cloud   | The business wants long-term modernization           |

These options are often called the **5 Rs**, and they help determine how much change should be introduced during migration. The right disposition depends on what the workload is doing and what the business actually needs.

- **Retain** when the workload still has value and the migration cost or risk is currently too high.
- **Retire** when the workload no longer supports a business need.
- **Rehost** when migration speed matters more than modernization.
- **Replatform** when you want cloud benefits without a full rewrite.
- **Refactor** when major architectural improvements are required.

## Decision Framework

A simple way to make the decision is to evaluate two questions:

1. How much business value does the workload provide?
2. How much complexity or cost does it require to maintain?

The combination of these factors can guide the disposition:

| Workload                           | Recommended Direction | Reasoning                                                                   |
| ---------------------------------- | --------------------- | --------------------------------------------------------------------------- |
| High value + manageable complexity | Modify or Buy         | Preserve the business value while reducing operational burden.              |
| High value + extreme complexity    | Phased Build          | Rebuild important differentiating capabilities properly over time.          |
| Low value + low complexity         | Buy or Modify         | Replace with a managed service or make small improvements where economical. |
| Low value + high maintenance cost  | Deprecate             | The workload does not provide enough value to justify its ongoing cost.     |

The key principle is that **workloads should deliver business value proportional to their cost and complexity**. A cloud migration is also an opportunity to question whether a workload should be migrated at all, rather than automatically moving everything to the new environment.
