---
title: "Functional and Non-Functional Requirements"
description: "Separating what a system must do from how well it must do it"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 33
last_update:
  date: 9/21/2020
---

## Overview

Architectures fail when teams define the feature set but leave the quality targets vague.

Functional requirements describe what the system must do. Non-functional requirements describe how well it must do it. Both are required before you choose services or design patterns.

## Functional Requirements

Functional requirements describe the behavior or capability the system must provide.

Examples:

- Users can search for a patient by name
- Staff can update an electronic health record
- The system can process a payment

These are usually easy to verify. 

The question is simple: **Did the feature work or not?**

## Non-Functional Requirements

Non-functional requirements describe the quality level the system must meet.

Examples:

- Search results return in under one second for 99% of requests.
- The system is available 99.9% of the time.
- All payment data is encrypted in transit and at rest.

These requirements do not add features. They define whether the system is fit for purpose.

**Why the difference matters:** They affect compute choices, database design, networking, security controls, and operational practices.

- Functional requirements are usually answered by application logic. 
- Non-functional requirements are usually answered by architecture.

## Constraints

Constraints are non-functional requirements with no flexibility.

They remove options before the design starts.

- Data residency rules can limit which regions are allowed.
- Budget limits can rule out always-on high-availability designs.
- Regulatory controls can require encryption, logging, and access restrictions.

**Note**: Constraints are not preferences. If the solution violates a constraint, the design is not acceptable.

## Architecture Impact

Non-functional requirements map directly to architecture decisions.

- Availability requirements push toward multi-zone or multi-region design.
- Performance requirements push toward caching, replicas, and load balancing.
- Security requirements push toward IAM, encryption, audit logging, and segmentation.
- Scalability requirements push toward managed services and autoscaling.

This is why architecture work starts with the requirement type, and not with the service catalog.

