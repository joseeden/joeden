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

## Clark-Wilson Integrity Model

The Clark-Wilson model maintains data integrity through controlled access and well-formed transactions, focusing on integrity verification for constrained items.

- Enforces proper processes for authorized users.
- Ensures separation of duties and auditability.
- Applications control user access to programs.

It uses **Transformation Procedures (TPs)** and **Constrained Data Items (CDIs)** to safeguard integrity:

- Requires "well-formed transactions."
- Steps must be performed in the correct order.
- Individuals executing steps must be authenticated.

The model is also considered a **Take-Grant Model**, which:

- Grants permissions based on predefined rules.
- It is up to the subject and object to take, grant, or revoke rights.
- Adds more layers of security for controlled data access.

The model addresses three key integrity goals:

- Authentication and authorization (Access Control Lists).
- Prevents authorized users from making immproper modifications.
- Maintains internal and external consistency through "well-formed transactions."

## Brewer and Nash Model

Also known as the **Chinese Wall**, the Brewer and Nash Model is designed to prevent conflicts of interest in environments where access to sensitive information from multiple organizations must be controlled.

- Permissions are dynamically changing based on RBAC.
- Ensures users cannot access conflicting data sets (e.g., competing companies).
- Used primarily in financial and consulting sectors.
- Prevents information flow between competing entities.

In this model, there is a wall to segment data types and develops set of rules that ensure that no subject accesses the objects on the other side of the wall. These dynamic rules can change as the subject accesses different information.

![](/img/docs/security-models-brewer-and-nash-model.png)


## Graham-Denning Model

The Graham-Denning model defines a set of rights for managing interactions between subjects (users) and objects (resources) in a secure system.

- Controls how subjects create, delete, and manage access to objects.
- Focuses on secure resource management and access control.
- Emphasizes rules for assigning and revoking access rights.

The model defines eight specific protection rights:

1. Create an object
2. Delete an object
3. Create a subject
4. Delete a subject
5. Read access rights
6. Grant access rights
7. Delete access rights
8. Transfer access rights


## Harrison-Ruzzo-Ullman (HRU) Model

Similar to the Graham-Denning Model, the HRU model defines rules for access control and managing rights within a system.

- Focuses on the creation, deletion, and modification of rights.
- Allows for dynamic changes in permissions.
- Analyzes whether unauthorized access can occur.

When configuring the HRU Model, we use a table, or **matrix**, containing:

- Current subjects (S).
- Current objects (O).
- Access Matrix (P) or Access Control List (ACL).

Sample Matrix:

|   | Object 1 | Object 2 | Object 3 |
|---|----------|----------|----------|
| S1 | Read     | Write    | Execute  |
| S2 | Write    | None     | Read     |
| S3 | Execute  | Write    | None     |