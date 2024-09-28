---
title: "Security Models"
description: "Security Design Principles"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 2
last_update:
  date: 1/30/2024
---

## Overview

Security models provide frameworks for protecting information by defining rules and procedures for data access and manipulation. These models ensure that systems operate securely by enforcing confidentiality, integrity, and availability.

## Multi-Level Security

Multi-level security (MLS) enforces security policies that segregate access to data based on varying levels of sensitivity. It ensures that users can only access information appropriate to their clearance level.

- Controls access  based on user clearance and data classification
- Commonly used in military and government settings
- Prevents unauthorized access to sensitive data

## Bell-LaPadula Model

The Bell-LaPadula Model is focused on maintaining data **confidentiality**. It enforces rules that prevent unauthorized access and disclosure of information.

- **Simple Security Rule**  

  - "No Read Up" 
  - Ensures that users cannot access information at a higher security level
  - Widely used in environments where confidentiality is critical

- ***-Property**

  - "No Write Down"
  - A subject on one security level shouldn't be able to write to objects with lower security levels

This model arranges subjects and objects into security levels and defines access specifications, whereby subjects can only access objects at certain levels based on their security level.

- Employs a State Machine Model with Security Levels and Access Modes.
- Uses Access Control Lists, Labels, and Clearances.
- Commonly used in military and government contexts.

Limitations: 

- Primarily addresses confidentiality
- Can be complex to implement

## Biba Integrity Model

The Biba Integrity Model focuses on maintaining data **integrity** by preventing unauthorized data modification. It enforces rules that ensure only authorized users can alter information.

- **Simple Security Rule**  

  - "No Read Down" 
  - A subject should not be able to read an object at security level lower than the subject's security clearance.
  - Prevents the corruption of integrity of information accessed.

- ***-Integrity Property**

  - "No Write Up"
  - A subject should not be able to write an information to an object at security level lower than the subject's security clearance.
  - A user with secret clearance should not be able to write information to a top secret file.
  - Ensures that data cannot be modified by lower integrity levels
  - Often used in environments where data accuracy and reliability are critical
