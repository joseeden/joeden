---
title: "Security Models"
description: "Security Design Principles"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 2
last_update:
  date: 1/30/2024
---

## Overview

Security models define rules and procedures to protect information. They ensure data is accessed and used securely while maintaining confidentiality, integrity, and availability.

- Frameworks for securing data access
- Define rules for manipulating and sharing data
- Help maintain secure system operations

Security models guide how information is protected in a system and set the foundation for all access controls.

## Multi-Level Security

Multi-Level Security (MLS) controls access based on sensitivity levels and user clearance.

- Limits access according to user clearance and data classification
- Common in government or military systems
- Prevents unauthorized users from viewing sensitive data

This ensures users only access data appropriate for their level, enforcing strict security segregation.

## State Machine Model

The **State Machine Model** maintains system security by defining allowed states and transitions.

- Specifies valid states for users and data
- Transitions follow strict security rules
- Prevents unauthorized state changes

The model works with security levels and clearance, ensuring systems stay in secure states.

- **Single-state Machine**

  - Processes data from one security level
  - All users must have full clearance
  - Simple but rigid setup

- **Multi-state Machine**

  - Can handle multiple levels securely
  - Offers flexibility without compromising security
  - Supports classified and unclassified data together

This model keeps systems predictable and secure by controlling state changes carefully.

## Lattice-based Model 

The **Lattice-based Model** provides a framework for access control based on user and data classification levels. It establishes a hierarchical structure for permissions, ensuring that access is determined by both sensitivity and user clearance.

- Uses a lattice structure to define levels of access.
- Employs rules to control data flow between different security levels.
- Facilitates mandatory access control, reduces risks of data leakage.

This model uses a two dimensional matrix that defines which subjectsare permitted to access which objects at what permission level.

- This model uses pair of elements (subject and object).
- Each pair has lower and upper bounds of access rights.
- Bounds can be confidentiality or integrity levels.
- Allows security controls for complex environments.

<div class='img-center'>

![](/img/docs/security-models-lattice-based-modellll.png)

</div>


## Non-Interference Model

The **Non-Interference/Noninterference** Model focuses on preventing actions at one security level from affecting actions at another. This model ensures that high-security operations do not interfere with lower-security operations.

- Keeps actions at different levels separate
- Prevents lower-level users from seeing higher-level actions
- Protects sensitive processes from interference

The theory here is that users are restricted to working in different areas called **domains**, which is a set of object that a user is allowed to access. 

- Users at one level cannot know what's happening at a higher security level.
- Users at higher security level cannot interfere with individuals at levels below them.

## Information Flow Model

The **Information Flow Model** emphasizes the secure transfer of information within a system. It analyzes how information flows between different entities to prevent unauthorized access or data leakage.

- Monitors data flow between processes and users
- Uses policies to prevent leaks
- Ensures secure information exchange

This model is based on the lattice model, with each input **triggering** a state transition with controlled output. This maintains confidentiality and integrity without relying on simple access lists.


## Bell-LaPadula Model

The **Bell-LaPadula Model** is focused on maintaining data **confidentiality**. It enforces rules that prevent unauthorized access and disclosure of information.

- **Simple Security Rule**

  - `No Read Up`: prevents accessing higher-level data
  - Users cannot access information at a higher security level
  - Used in environments where secrecy is critical

- **`*`-Property**

  - `No Write Down`: prevents writing to lower-level objects
  - A subject cannot write to objects with lower security levels.
  - Ensures sensitive data is not exposed

This model arranges subjects and objects into security levels and defines access specifications, whereby subjects can only access objects at certain levels based on their security level.

- Uses a **state machine model** with *security levels* and *access modes*.
- Uses *access control lists*, *labels*, and *clearances*.
- Commonly used in military and government contexts.

Limitations: 

- Primarily addresses confidentiality
- Can be complex to implement

:::info 

The Bell-LaPadula model was the **first mathematical model of a multilevel security policy** used to define the concepts of a security state and rules of access. 

:::

## Biba Integrity Model

The **Biba Integrity Model** focuses on maintaining data **integrity** by preventing unauthorized data modification. It enforces rules that ensure only authorized users can alter information.

- **Simple Security Rule**  

  - `No Read Down`: prevents reading lower-integrity data
  - A subject cannot read objects below their security clearance.
  - Avoids contamination of higher-level information

- **Integrity Property**

  - `No Write Up`: prevents writing to higher-integrity objects
  - A subject cannot write to objects below their security clearance.
  - Ensures accurate and reliable data

## Clark-Wilson Integrity Model

The **Clark-Wilson model** protects data integrity through controlled access and well-formed transactions, focusing on verifying integrity for constrained items.

- Enforces proper procedures for authorized users
- Ensures separation of duties and auditability
- Applications manage user access to operations

The model is also known as a **Take-Grant Model**, which:

- Grants permissions using predefined rules
- Subjects and objects can take, grant, or revoke rights
- Adds extra security layers for controlled access

:::info 

This model is developed to provide integrity, but **not confidentiality.**

:::

### TPs and CDIs 

The model relies on two main components:

- **Transformation Procedures (TPs)**

  - Programs or processes that modify data safely
  - Ensure only valid operations are performed
  - Prevent users from bypassing rules

- **Constrained Data Items (CDIs)**

  - Data that must be protected for integrity
  - Can only be accessed or modified through TPs
  - Examples: financial records, inventory counts, or transaction logs

The combination of TPs and CDIs ensures that **all changes to critical data are controlled, validated, and traceable**.


### Maintaining Integrity 

The model enforces rules for handling critical tasks:

- Split critical tasks among users (separation of duties)
- Subjects access and modify objects only through applications (access triple)
- Ensure internal and external consistency

Key integrity goals:

- Authentication and authorization via access control
- Prevent improper modifications by authorized users
- Maintain consistency through well-formed transactions


## Brewer and Nash Model

Also known as the **Chinese Wall**, the Brewer and Nash Model is designed to prevent conflicts of interest in environments where access to sensitive information from multiple organizations must be controlled.

- Dynamically changes permissions based on access
- Stops users from accessing competing datasets
- Common in finance and consulting

The model uses a wall to segment data types and applies rules to ensure users cannot access conflicting information, adapting as users interact with data.

<div class='img-center'>

![](/img/docs/security-models-brewer-and-nash-model.png)

</div>


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

Similar to the Graham-Denning Model, the **Harrison-Ruzzo-Ullman (HRU) Model** defines rules for access control and managing rights within a system. This newer model provides more **granularity** and direction for vendors on how to meet the goals outlined in the earlier models. 

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