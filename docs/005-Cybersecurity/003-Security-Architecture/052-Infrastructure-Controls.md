---
title: "Infrastructure Controls"
description: "Selecting Infrastructure Controls"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 52
last_update:
  date: 1/30/2024
---


## Selecting Infrastructure Controls

### Defense in Depth

Defense in Depth is an approach in cybersecurity in which a series of defensive mechanisms are layered in order to protect valuable data and information. 

- Utilizes multiple access controls in layers.
- Avoids a monolithic security stance.
- If one mechanism fails, the next layer steps up and stops attack

To learn more, please see [Defense in Depth](../006-Identity-and-Access-Management/010-Defense-in-Depth.md)

### Zero Trust Model 

The Zero Trust Model, also known as **Perimeterless security**, focuses on "**Never trust, always verify** concept whereby users and devices should not be trusted by default.

  - Adds defenses at the user, asset, and data levels.
  - Recognizes vulnerabilities even in robust access control systems.
  - Shifts from reliance on perimeter defense to asset and data protection.
  - Emphasizes authentication and authorization for every user action.

**Microsegmentation in Zero Trust Networks**

  - Networks are microsegmented with firewalls at each connection point.
  - Focuses on encapsulating information assets and their security properties.
  - Microsegmented networks enforce frequent user re-authentication.
  - Validates user identity at various checkpoints within the network.

**Analogy: Concert Access**
  - Traditional controls: showing a ticket at the gate for free venue access.
  - Zero trust: Multiple checkpoints at different levels, e.g. accessing backstage areas

### Risk-Based Approach 

Prioritizes controls based on potential risks and vulnerabilities specific to the infrastructure to make efficient use of resources.

### Lifecycle Management

Involves regular reviewing, updating, and retiring controls to adapt to evolving threat landscapes.

### Open Design Principle 

Ensures transparency and accountability through rigorous testing and scrutiny of infrastructure and controls.

## Practices for Effective Controls

### Selection Process

1. Assess the current state.
2. Conduct gap analysis.
3. Setting clear objective.
4. Benchmarking against industry best practices.
5. Conduct cost-benefit analysis.
6. Ensure stakeholder involvement.
7. Implement monitoring and feedback loops.

### Best Practices 

- Conduct a recurring comprehensive risk assessment.
- Align control selection with established frameworks.
- Customize framework controls for your own usage.
- Emphasize stakeholder engagement and training.

