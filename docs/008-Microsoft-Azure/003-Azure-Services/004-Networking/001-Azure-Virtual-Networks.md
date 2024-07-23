---
title: "Azure Virtual Networks"
description: "Private networks in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 7/18/2020
---

## Overview

In Azure, the equivalent of a local area network is called an Azure Virtual Network (VNet). Unlike traditional LANs, Azure VNets have unique characteristics, such as isolation between multiple customers' VNets within the same datacenter. Additionally, not all Azure resources can reside in a VNet.

Examples of resources that can be created in a VNet:

- Virtual machines
- Firewalls
- Azure Kubernetes clusters

Resources that cannot be created in a VNet:

- Azure SQL Database instances
- Azure Storage containers
- Azure Active Directory tenants

Azure Virtual Networks are foundational to Azure resource deployment, offering enhanced scalability, availability, and isolation.

- Enables secure communication across resources
- Similar to physical networks but offers improved availability, scalability, and isolation

## Network Communication

Resources within the same subnet can communicate via default routes created by Azure. Communication across different subnets is facilitated by default routes, but users can create their own routes, known as user-defined routes.

- Default routes for same-subnet communication
- User-defined routes for custom routing
- Outbound internet access is available by default
- Inbound internet access requires:
  - Assigning a public IP address to the resource
  - Provisioning a public load balancer

## Name Resolution in VNets

While IP addresses are crucial, referring to resources by name is often more practical. Azure provides several options for name resolution.

- **Azure-Provided Name Resolution**

  - Automatically provided when creating a VNet
  - Enables communication within the VNet using names

- **Azure DNS Private Zones**

  - Used when resources need to resolve names in another virtual network
  - Manages name resolution for private virtual networks

- **Custom DNS Servers**

  - For resolving names of systems in an on-premises environment
  - Users can utilize their own DNS servers or Azure DNS, capable of acting as a full DNS service

## Key Concepts

Understanding these key concepts is essential for effectively managing and utilizing Azure Virtual Networks. =

- **Address Space**
  - Defines private or public addresses conforming to RFC 1918
  - Resources in the virtual network get assigned addresses from this space

- **Subnets**
  - Segment the virtual network into subnetworks, improving address space efficiency
  - Allows better security through Network Security Groups (NSGs)

- **Regions**
  - Virtual networks are scoped to a single region or location
  - Connectivity across regions is achieved through virtual network peering

- **Subscriptions**
  - Each virtual network is scoped to a specific subscription

Diagram:

![Azure Virtual Network Diagram](https://docs.microsoft.com/en-us/azure/virtual-network/media/virtual-networks-overview/virtual-network-diagram.png)

## Best Practices for Virtual Networks

Following best practices ensures efficient and secure use of Azure Virtual Networks. These guidelines help in planning, deploying, and managing VNets to optimize performance and maintain security.

- **Address Space Overlap**
  - Ensure the defined virtual network address space doesn't overlap with existing network ranges
  - Critical for scenarios like site-to-site VPN connections

- **Subnet Planning**
  - Avoid creating subnets that cover the entire virtual network address space
  - Plan subnets with reserved address space for future use

- **Fewer Larger Virtual Networks**
  - Prefer defining fewer large virtual networks over numerous smaller ones
  - Minimizes management overhead

- **Utilize Network Security Groups (NSGs)**
  - Secure virtual networks using NSGs
  - Filter network traffic with defined security rules for inbound and outbound traffic

For more information: [Learn more about Network Security Groups](https://docs.microsoft.com/en-us/azure/virtual-network/security-overview)