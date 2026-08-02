---
title: "Design Tradeoffs and Workload Disposition"
description: "How to make architecture tradeoffs and decide what to do with an existing workload"
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

You rarely get a design that is best for cost, performance, security, reliability, and speed all at once. The job is to understand what the business values most, and then choose the tradeoff that fits.

## How To Think About Tradeoffs

Every option gives something up.

Examples include:

- More reliability usually costs more.
- More security often adds operational overhead.
- Faster delivery can reduce architecture simplicity.
- Lower cost can reduce performance or resilience.

The right answer is the one that meets the primary business goal without breaking the important constraints.

## Decision Inputs

Before choosing an option, identify the decision inputs.

- Business goal.
- Risk tolerance.
- Compliance requirements.
- Budget.
- Migration timeline.
- Operational maturity.

When these inputs are clear, the tradeoff becomes easier to defend.

## Workload Disposition

Workload disposition is the decision about what should happen to an existing workload.

| Option | Meaning | Typical Use |
| ------ | ------- | ----------- |
| Retain | Keep the workload as is for now | The system is stable or migration risk is too high |
| Retire | Remove the workload completely | The application is no longer needed |
| Rehost | Move the workload with minimal change | The business wants speed over redesign |
| Replatform | Make limited changes during migration | The workload can benefit from cloud managed services |
| Refactor | Redesign the workload for the cloud | The business wants long-term modernization |

These options are often called the 5 Rs, and they help you decide how deep the migration should go.

## Matching The Strategy To The Workload

The right disposition depends on what the workload is doing and what the business wants.

- Retain when the workload still has value and the migration cost is too high.
- Retire when the workload no longer supports a business need.
- Rehost when speed matters most.
- Replatform when you want cloud benefits without a full rewrite.
- Refactor when the workload needs major architectural improvement.

