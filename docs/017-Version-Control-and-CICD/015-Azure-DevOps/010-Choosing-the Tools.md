---
title: "Choosing the Tools"
tags: 
- CICD
- Continuous Integration
- Continuous Delivery
- Continuous Deployment
- Azure DevOps
sidebar_position: 10
last_update:
  date: 2/5/2023
---

## Overview

When choosing tools for software development, there are two main approaches:  

- **Best of Breed** – Selecting the best tool for each function separately.  
- **Best of Suite** – Choosing an integrated set of tools from a single provider.  

## Best of Breed  

This approach picks the best tool for each function independently.  

- You get the best product for each need.  
- Easy to replace a tool when requirements change.  
- Requires integrating multiple products.  
- Multiple vendors manage different tools.  

## Best of Suite  

This approach selects a single product or an integrated set of tools.  

- Unified experience across all functions.  
- One vendor handles everything.  
- May require compromises on certain features.  

## Choosing Between Them  

Consider these factors:  

- **Cost** – Best of Suite can be cheaper due to built-in integrations, but check long-term operating costs.  
- **Integration** – Some suite solutions may not integrate as well as advertised.  
- **IT Capabilities** – A small team may struggle to integrate multiple Best of Breed tools.  
- **Supplier Risks** – Best of Suite reduces contacts but creates a single point of failure.  

## Azure DevOps  

Azure DevOps is a Best of Suite tool, offering all features in one platform.  

- Strong integration across development activities.  
- Links requirements, tests, builds, and user stories.  

If using a Best of Breed strategy, ensure traceability between tools.  

## SaaS versus Self-Hosted

### Azure DevOps Services (SaaS)  

A cloud-hosted solution managed by Microsoft.  

- **Fully managed** – Microsoft handles hosting, maintenance, and backups.  
- **High availability** – 99.9% uptime (SLA).  
- **Subscription-based** – Fixed price per user per month.  

### Azure DevOps Server (Self-Hosted)  

Installed and managed on your own infrastructure.  

- **Full control** – Hosted on-premises or in the cloud.  
- **Self-managed** – You handle installation, updates, and backups.  
- **Flexible pricing** – Per-user subscription or server license.  

### When to Choose Each  

- **Azure DevOps Services** – Best if you prefer SaaS, minimal maintenance, and lower costs.  
- **Azure DevOps Server** – Needed for strict data control, compliance, or custom backup policies.  

### Key Considerations  

- **New features** – Released in Services first, may not come to Server.  
- **Cost & responsibility** – Self-hosting adds workload but gives more control.  
- **Tradeoff** – Convenience vs. customization and compliance needs.

## Alternatives to Azure DevOps Server  

- **Best-of-Suite**  

  - **GitHub** – Started as a source control platform, later added CI/CD, package feeds, and security features. Acquired by Microsoft in 2018.  
  - **GitLab** – Open-source, with source control, issue tracking, CI/CD, and package management.  

- **Best-of-Breed**

  - **Bitbucket** – Source control.  
  - **Jira** – Issue tracking and backlog management.  
  - **TeamCity** – CI/CD for various languages.  
  - **Jenkins** – Open-source CI/CD, mainly for Java.  
  - **Artifactory** – Binary and package management.  

:::info 

Microsoft supports both GitHub and Azure DevOps

:::