---
title: "Automation and Orchestration"
description: "When to Automate and Orchestrate"
tags: [Security, Cybersecurity, Security Operations, Automation]
sidebar_position: 60
last_update:
  date: 1/30/2024
---



## Overview

**Automation** refers  to automatic execution of tasks without manual involvement, typically achieved using specialized software or scripts.

- Allow repetitive tasks to be performed consistently and efficiently.
- Reducing the chances of human error, freeing up time for more complex tasks.

**Orchestration** refers to coordination of automated tasks for a specific outcome or workflow. 

- Ensuring various processes work together smoothly and in correct order.
- Dependencies between processes are managed appropriately. 
- Multiple automated tasks.

### SOAR

**Security Orchestration, Automation, and Response (SOAR)** is a category of security solutions that combine three primary functions: orchestration, automation, and response to streamline security operations and improve incident response capabilities.

For more information, please see [SOAR.](/docs/007-Cybersecurity/030-Incident-Response/009-SOAR.md)

### Playbooks and Runbooks 

**Playbook** are checklists of actions for specific incident responses.

**Runbooks** are automated versions of playbooks with human interaction points.

## When to Automate and Orchestrate

### Complexity

- Assess complexity and resource commitment needed for the process.
- Automate tasks that are complex and prone to human error.
- Streamline and simplify complex workflows involving multiple systems.

### Cost

- Evaluate the cost of automation against the savings from reduced manual labor.
- Large upfront initial investment to hire developers for implementation.
- Long-term savings and efficiency gains outweigh the initial investment.

### Single Points of Failure

- Reduce reliance on individual systems, minimizing single points of failure.
- Create redundant workflows and ensure continuity in case of system failures.
- Inadequately designed automation can disrupt critical business processes.
- Backup systems or manual processe, to ensure continuity in case of failures.

### Technical Debt

- Reduce the burden of maintaining and operating legacy systems.
- Integrate and enhance the capabilities of older systems without extensive rework.
- Orchestration systems can also accumulate technical debt if not maintained.
- Technical debt is simply cost of poorly implemented software.
- Conduct regular reviews and updates to reduce technical debt.

### Ongoing Supportability

- Choose automation tools that are easy to maintain and update.
- Choose solutions that can scale with the organization’s growth and evolving needs.
- Ensure ongoing support are available for maintaining orchestrated systems.
- Training and skill development is a crucial component.



