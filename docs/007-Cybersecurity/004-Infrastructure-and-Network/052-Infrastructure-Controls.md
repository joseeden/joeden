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

To learn more, please see [Defense in Depth](/docs/007-Cybersecurity/006-Identity-and-Access-Management/010-Defense-in-Depth.md)

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

Focuses on applying security controls where the greatest risks and vulnerabilities exist to optimize resources.

- Targets high-risk areas first to reduce potential impact.
- Helps allocate budgets and efforts effectively.

### Lifecycle Management

Involves regular reviews, updates, and removes controls to keep pace with new threats and technology changes.

- Ensures controls stay relevant and effective over time.
- Removes outdated controls that no longer provide value.

### Open Design Principle

Promotes transparency and trust by openly testing and evaluating infrastructure and controls.

- Encourages external reviews and audits to find weaknesses.
- Builds accountability through clear documentation and scrutiny.

### Content Management

Content management limits access to non-compliant or risky content on managed or corporate-issued mobile devices.

- Blocks access to restricted or inappropriate websites
- Prevents downloads like email images or file attachments violating policy

For more information, please see [Mobile Security.](/docs/007-Cybersecurity/004-Infrastructure-and-Network/059-Mobile-Systems.md#mobile-security)


## Practices for Effective Controls

### Selection Process

A clear step-by-step method to choose and implement the right controls.

1. Assess current security posture and infrastructure.
2. Identify gaps between current and desired security levels.
3. Define specific goals and objectives for controls.
4. Compare options against industry standards and best practices.
5. Evaluate costs against expected benefits.
6. Engage relevant stakeholders for input and buy-in.
7. Set up ongoing monitoring and feedback to adjust controls as needed.


### Best Practices 

Guidelines to maintain strong and adaptive security controls.

- Regularly perform thorough risk assessments.
- Use established security frameworks as a baseline.
- Customize controls to fit your organization’s unique needs.
- Involve and train stakeholders to ensure proper use and support.

