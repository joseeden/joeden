---
title: "Cloud Concepts"
tags: [Cloud, DevOps, Certifications]
sidebar_position: 2
last_update:
  date: 3/28/2023
---


## Overview

Cloud computing is a rapidly growing technology that many organizations are adopting for its significant business and technical advantages. It transforms how companies operate by offering scalable, on-demand resources for computing, storage, databases, and networking.

## Under the Hood

Cloud computing is built on technologies like **virtualization**, which has been used in on-premise data centers for years.

### Virtualization

Virtualization allows multiple virtual machines (VMs) to run on a single physical server, each with its own operating system and applications. These VMs share hardware resources without affecting each other, thanks to the **hypervisor**.

For more details, see [Virtualization](/docs/002-IT-Foundations/040-Virtualization.md).


### Hypervisor

A hypervisor is software that creates and manages the virtual environment, sitting between the physical server and the VMs. It ensures hardware resources are shared and allocated efficiently among VMs.

- Reduced capital costs by provisioning multiple VMs on one host
- Fewer hardware requirements, lowering operating expenses
- Reduced space, power, and cooling needs in data centers

This optimization of resources in a cloud environment means everyone can benefit from virtualization, from the cloud vendor to the consumer. 

## Cloud Resources 

### Instances

A virtual machine (VM) in the public cloud is often called an instance, though the term varies by vendor. It refers to the same concept as a traditional VM.

**Compute objects (Instances)** are the processing power for your applications and services, similar to servers with CPUs and RAM in on-premises environments.

### Storage

Storage resources in the cloud allow you to save and store data. In traditional environments, this includes:

- Server hard disks
- Network-attached storage (NAS) for file-level shared storage
- Storage area networks (SAN) for block-level, high-speed storage


### Database

Database resources store structured data used by applications. Common database engines in traditional data centers include:

- SQL Server
- Oracle
- MySQL

Cloud databases offer various engines and types to fit different needs. Network resources handle connectivity, linking compute, storage, and databases, much like routers and switches in on-premises setups.



## Key Cloud Concepts

Cloud computing offers several key characteristics that make it a powerful and flexible service.

- **On-demand Resourcing**

 
  - Cloud resources are available almost instantly when you need them. 
    - You no longer have to wait for hardware to be ordered, installed, and configured.

- **Scalability**

 
  - Cloud computing allows you to quickly adjust your resources up or down based on demand.
    - **Scaling up and down**: Changes the power and performance of individual instances.
    - **Scaling in and out**: Adds or removes instances to adjust your compute resources.
    - 

- **Economy of Scale**

 
  - Cloud services leverage shared resources across many organizations.
    - This leads to lower costs for end users compared to traditional hosting.

- **Flexibility and Elasticity**

    - You can easily customize your cloud environment, choosing the amount and duration of resources you need. 
    - This flexibility allows you to tailor your setup precisely to your requirements.

- **Growth**

 
  - Cloud computing supports organizational growth by offering a wide range of resources and global reach. 
    - On-demand provisioning reduces growth constraints compared to traditional on-premise setups.

- **Utility-based Metering** 

    - "Pay for What You Use"
    - With cloud services, you pay only for the resources you actually use. 
    - For example, if an instance runs for two hours, you only pay for those two hours. 
    - It's similar to paying for electricity only when it's used.

- **Shared Infrastructure**

 
  - Cloud environments are virtualized, allowing multiple tenants to share the same hardware. 
    - This reduces physical hardware needs and related costs for power, cooling, and space.

- **Highly Available**

    - Core cloud services are often replicated across multiple geographic regions, enhancing data durability and availability without extra configuration from you.

- **Security**

 
  - Cloud vendors like AWS and Microsoft Azure often offer higher security standards than typical data centers. 
    - They adhere to global compliance standards and provide robust infrastructure security, while you are responsible for securing your cloud-based applications and data.
