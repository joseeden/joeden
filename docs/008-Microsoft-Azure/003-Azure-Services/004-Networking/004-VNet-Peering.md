---
title: "VNet Peering"
description: "Peering between virtual networks"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 4
last_update:
  date: 7/18/2020
---


## vNet Peering


![](/img/docs/azure-expressroute-with-border.png)


Virtual Network Peering (vNet Peering) allows for seamless connectivity between distinct Azure virtual networks, presenting them as a unified entity.

- Utilizes the robust Microsoft backbone infrastructure for inter-network traffic
- Use Global vNet Peering for vNets in different regions
- Created without downtime

## Key Features

- **Compatibility**
  - Connects networks created via Azure Resource Manager, including those from the classic deployment model

- **No Downtime**
  - Creation and completion cause no downtime for associated resources

- **Privacy and Security**
  - Traffic remains private, bypassing the need for public Internet, gateways, or encryption

- **Consistent Latency**
  - Latency between VMs on peered virtual networks mirrors that within a single virtual network

- **Security Groups Integration**
  - Apply network security groups to control access between peered virtual networks or subnets

## Types of Peering

- **Virtual Network Peering**
   - Connects virtual networks within the same Azure region

- **Global Virtual Network Peering**
   - Links virtual networks deployed in different Azure regions

