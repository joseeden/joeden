---
title: "Managing Azure Resources"
description: "Tools for managing Azure resources"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 5
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Azure Resource Manager (ARM)

Azure Resource Manager (ARM) is the central service for deploying and managing Azure resources. Think of ARM as the pilot of an aircraft, navigating resources through the cloud environment to ensure smooth operations and optimal performance.

- ARM acts as the centralized management layer for Azure.
- It enables template-driven deployments, ensuring consistency and repeatability.
- Resources can be categorized and organized using customizable tags.

## Management Tools

While ARM is the core management tool, Azure provides additional services to enhance resource management. These include Azure Monitor, Automation, Policy, Advisor, and Blueprints.

- These tools complement ARM by providing additional functionality for monitoring, automation, and compliance.
- They help streamline operations, ensure best practices, and maintain resource alignment with organizational standards.

### Azure Monitor

Azure Monitor offers comprehensive monitoring across all layers of your applications, from infrastructure to end-users. 

- Provides real-time insights into resource performance, including virtual machines, containers, databases, and networks.
- Features advanced analytics and intelligence for performance, security, and cost.
- Includes an integrated alert system to identify potential issues or anomalies in real time.

### Azure Automation

Azure Automation is designed to streamline workflows and reduce manual tasks. 

- Based on PowerShell, it integrates well with both cloud and on-premise systems.
- Automates routine tasks through runbooks, enhancing efficiency for IT and support teams.
- Supports configuration management, updating shared capabilities, and managing hybrid environments.

### Azure Advisor

Azure Advisor serves as a personalized cloud consultant, offering recommendations tailored to your specific needs.

- Provides best practice recommendations to optimize Azure resources.
- Focuses on improving performance, security, and reliability.
- Helps in fine-tuning resource usage and achieving operational excellence.

### Azure Policy

Azure Policy enforces organizational standards and ensures compliance across your Azure environment.

- Enforces compliance with regulatory and policy requirements, such as data residency for banks.
- Integrates with predefined deployment criteria to align with corporate guidelines.
- Automates policy enforcement to reduce errors and maintain adherence to standards.

### Azure Blueprints

Azure Blueprints provide a structured approach to deploying and managing Azure resources consistently.

- Ensures uniformity across multiple deployments, similar to architectural blueprints for buildings.
- Helps implement security and compliance requirements, such as GDPR.
- Defines repeatable sets of resources to avoid manual setup errors and streamline organizational standards.
