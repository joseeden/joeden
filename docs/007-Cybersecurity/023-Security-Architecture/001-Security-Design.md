---
title: "Security Design"
description: "Security Design Principles"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 1
last_update:
  date: 1/30/2024
---



## Overview

Security design involves integrating protection measures within a system. Whether added during initial design or later, effective strategies require thoughtful planning to safeguard against threats.


## Bolt-on Security

Bolt-on security involves adding protective measures to a system after it has been designed. While it can be a quick fix for existing systems, it is usually more costly and less effective than integrating security from the beginning.

- Often used for legacy systems where redesign is not feasible
- Can result in higher costs and complexities
- May lead to vulnerabilities if not implemented carefully

## Subject-Object Model

The subject-object model is used in access control to define who is making an access request and what resource is being requested. This framework helps clarify and enforce access policies.

- **Subject**: requesting the access
- **Object**: resource being requested

Example:

- A user requests access to a file
- A process requests access to a memory location

It's useful to describe access requests in these terms to make the requests explicitly clear.

## Failure Modes

Failure modes define how systems behave during failures. 

- **Fail-open**
  - Allows all traffic through if a failure occurs
  - Does not inspect or filter traffic
  - Prevents network service disruptions

- **Fail-closed**
  - Blocks all traffic during a failure
  - Maintains network security
  - May cause temporary service disruption

- **Fail Reset**

  - Automatically restarts when a failure is detected
  - Restore operations without verifying secure access
  - Helps recover quickly but may expose some risks

- **Fail-secure**

  - Defaults to the highest security level during faults
  - Ensures predictable and secure system behavior
  - Prevents unauthorized access in error conditions

- **Fail safe**

  - Mechanism fails to a state that ensures personnel or equipment safety
  - Example would be a normally locked door in a data center, which would fail to an unlocked state if a fire alarm is triggered.

- **Fail open**

  - Mechanism would fail in the event of a fault
  - Moves to a state that protects people or equipment
  - Prioritizes safety over normal operation
  - Example: A data center door unlocks during a fire alarm

Example: Firewall

- Fail-open can allow unfiltered traffic to reach the network
- Fail-closed ensures security is maintained during downtime
- Decision depends on the priority of security versus availability

Example: IDS

- Failure costs might not justify a fail-secure mode
- Continuation of monitoring is important
- Fail-open can ensure monitoring without disrupting operations

## Isolation and Segmentation

Isolation and segmentation divide systems to limit risks and contain threats, enhancing overall security by controlling access.

- **Network Segmentation**
  - Divides a network into smaller, isolated segments
  - Limits exposure to threats
  - Restricts access to critical systems
  - Uses firewalls and access controls

- **Process Isolation**
  - Keeps processes independent
  - Prevents interference between processes
  - Increases system stability

- **Memory Segmentation**
  - Divides memory into separate sections
  - Protects against unauthorized access
  - Helps prevent buffer overflow attacks

- **Virtual Machine Isolation**
  - Separates VMs from one another
  - Ensures one VM’s compromise doesn't affect others
  - Provides a secure environment for applications
