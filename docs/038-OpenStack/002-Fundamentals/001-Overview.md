---
title: "OpenStack Overview"
description: "First things you need to know"
tags: 
- Cloud
- DevOps
- OpenStack
sidebar_position: 1
last_update:
  date: 9/15/2023
---



## Cloud Computing Basics

Cloud is defined by NIST as a model for on-demand access to configurable resources. A virtualized data center becomes a cloud when it meets five key traits:

- **On-demand self-service**

  - Provision resources automatically without human intervention
  - In OpenStack, Horizon or CLI acts as the self-service interface

- **Broad network access**

  - Resources are reachable from laptops, phones, or CI pipelines
  - APIs behave the same whether accessed remotely or inside the data center

- **Resource pooling**

  - Multiple users share physical servers, storage, and network
  - Users get virtual resources without knowing the underlying hardware

- **Rapid elasticity**

  - Resources can scale up or down instantly based on demand
  - Supports auto-scaling of workloads during peak usage

- **Measured service**

  - Resource consumption is tracked for billing and capacity planning
  - Helps finance cross-charge departments accurately and admins plan growth

Cloud traits reduce lead time, enable pay-as-you-grow economics, and make experimentation friction-free. 

For more information, please see [Cloud Foundations.](/docs/033-Cloud-Computing/001-Cloud-Foundations/001-The-Basics.md)


## Cloud Service Models

Service models define what the provider manages and what the customer manages:

- **Infrastructure-as-a-Service (IaaS)**

  - Provider handles hardware, hypervisors, and APIs
  - Customer manages OS and applications
  - OpenStack, AWS EC2, Google Compute Engine

- **Platform-as-a-Service (PaaS)**

  - Provider also manages the runtime environment
  - Customer only deploys code
  - Examples: Heroku, Google App Engine

- **Software-as-a-Service (SaaS)**

  - Provider runs the full application
  - Customer only uses the software
  - Examples: Salesforce, Office 365


For more information, please see [Cloud Service Models.](/docs/033-Cloud-Computing/001-Cloud-Foundations/004-Cloud-Service-models.md)

OpenStack focuses on IaaS, presenting compute, storage, and networking as self-service blocks. This sets clear boundaries: 

- Admins manage hypervisors and networks
- Users manage OS and apps.

## OpenStack as Orchestrator

OpenStack coordinates many services to deliver resources automatically. A simple “launch instance” request triggers multiple components:

- **Keystone** authenticates the user
- **Nova Scheduler** finds a hypervisor using Placement
- **Neutron** creates network ports and configures overlay tunnels
- **Glance** streams VM images
- **Cinder** attaches storage volumes if requested
- **Control plane services** handle requests and decision-making
- **Data plane agents** execute actions on compute and storage hosts

OpenStack policies are configured once and enforced automatically. This reduces manual errors and speeding VM delivery from days to seconds.

