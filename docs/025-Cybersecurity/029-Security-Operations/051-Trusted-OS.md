---
title: "Trusted OS"
description: "Enhanced security features in real-time"
tags: [Security, Cybersecurity, Security Operations, Networking]
sidebar_position: 51
last_update:
  date: 1/30/2024
---


## Overview

Trusted Operating Systems (TOS) are designed with enhanced security features to ensure a higher level of protection and integrity for the system. These systems are particularly suitable for environments where security is a critical concern.

- Implement fine-grained access control mechanisms.
- Use [mandatory access controls (MAC)](/docs/025-Cybersecurity/026-Identity-and-Access-Management/008-Logical-Access.md#mandatory-access-control-mac) to enforce strict policies.
- Ensure the boot process is secure to prevent unauthorized changes.
- Use cryptographic checks to validate system integrity at startup.
- Run applications in isolated environments to limit the impact of potential breaches.
- Use virtualization and containerization for additional isolation.

## Features

Trusted Operating Systems (TOS) incorporate advanced security features to ensure a high level of protection and integrity. Key features include:

- **Mandatory Access Control (MAC)**

  - Enforces strict policies that control access to resources based on security labels.
  - Prevents unauthorized users from accessing sensitive information.
  - Centralized control over security policies, reducing the risk of data breaches.
  - For more information, please see [Mandatory Access Control (MAC)](/docs/025-Cybersecurity/026-Identity-and-Access-Management/008-Logical-Access.md#mandatory-access-control-mac)

- **Security Auditing**

  - Tracks and records system activities and access attempts.
  - Helps in detecting and investigating security incidents.
  - Accountability by maintaining logs of user actions and system events.
  - For more information, please see [Audits and Assessments](/docs/025-Cybersecurity/028-Assessment-and-Testing/060-Security-Audits.md)

- **Role-based Access Control (RBAC)**

  - Assigns permissions based on user roles rather than individual users.
  - Simplifies the management of user privileges.
  - Ensures users have the minimum necessary access to perform their duties.

## Using Microkernels

Trusted OS enhances security with microkernels by minimizing the trusted base. The trusted computing base includes all the parts of the system that are critical to security and must be trusted to operate correctly.

- Core functionalities kept minimal
- Communication via messages between kernel components and user-space processes
- Isolated kernel services enhance system stability
- Flexible, easier addition or removal of features
- Enhanced security through isolation
- Message passing may introduce performance overhead
- Implementing and debugging can be more complex

## Integrity 178B

Integrity 178B is a high-assurance, POSIX-based real-time operating system (RTOS) designed for systems requiring stringent security and reliability standards, often used in aerospace, defense, and critical infrastructure.

- Meets DO-178B Level A certification for avionics.
- Critical for mission-critical applications.
- Secure boot and advanced access controls.
- Supports a wide range of hardware platforms.
- Provides deterministic, predictable response times.
- Strict separation between applications.
- Built-in encryption and security protocols.

This operating system is used in numerous aircrafts like the B2-Bimber, F-16, and F-22. This specific operating system is also rated as **EAL6.**

![](/img/docs/sec+-integrity-178b.png)

## Common Criteria (CC) Standards

The Common Criteria (CC) standards evaluate the security controls in an operating system to assess their effectiveness. The evaluation is categorized into seven Evaluation Assurance Levels (EALs), each with increasing rigor and assurance.

For more information, please see [Security Requirements.](/docs/025-Cybersecurity/023-Security-Architecture/003-Security-Requirements.md#common-criteria)

## SELinux 

Security-Enhanced Linux (SELinux) is a set of controls that are installed on top of another Linux distribution like CentOS or Red Hat Linux. 

For more information, please see [Security-Enhanced Linux.](/docs/005-Linux/004-Linux-Security/030-SELinux.md)

## Trusted Solaris

Trusted Solaris is a highly secure version of the Solaris operating system developed by Sun Microsystems (now Oracle). It provides enhanced security features and mechanisms designed to meet the stringent requirements of high-security environments.

- LBAC enforces mandatory access controls based on security labels.
- RBAC manages user privileges through predefined roles.
- Provides labeled networking and multilevel security (MLS).
- Generates detailed audit logs for analysis.
- Establishes secure communication paths for critical operations.
- Mitigates spoofing and tampering risks.