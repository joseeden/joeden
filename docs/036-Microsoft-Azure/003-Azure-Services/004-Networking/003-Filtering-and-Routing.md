---
title: "Filtering and Routing"
description: "Using security groups in Azure"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 3
last_update:
  date: 11/16/2020
---



## Overview

Traffic filtering in production virtual networks can be managed using Network Security Groups (NSGs) and Application Security Groups (ASGs). These tools allow for controlling traffic flow and implementing security measures within your Azure environment.

- Filter traffic between subnets
- Allow or block specific traffic

## Security Groups

There are two main types of security groups in Azure: Network Security Groups (NSGs) and Application Security Groups (ASGs).

### Network Security Groups (NSGs)

NSGs are used to manage traffic to and from network interfaces (NICs) or subnets.

- Can be assigned to a specific NIC or an entire subnet
- Rules are applied to the NIC or all NICs and VMs on the subnet
- Suitable for most scenarios but less flexible than ASGs

### Application Security Groups (ASGs)

ASGs provide more flexibility by allowing logical grouping of NICs from different VMs.

- Group NICs of different VMs on the same virtual network
- Apply NSG rules to specific groups of NICs
- Create different traffic rules for different groups of NICs
- Manage network security rules for each group of VMs separately

## Network Virtual Appliances (NVA)

NVAs are virtual machines that perform specific network tasks, such as acting as firewalls or providing WAN optimization. 

- Act as a firewall
- Provide WAN optimization
- Examples: Barracuda CloudGen WAF, Citrix SD-WAN Center

## Route Tables

Routing in Azure can be handled by default or customized using route tables and BGP routes.

### Default Routing

Azure automatically handles routing between subnets, virtual networks, on-premises networks, and the internet. 

- Default routing between various networks
- No configuration needed for basic routing

### Custom Route Tables

Custom route tables allow you to define specific routes for your subnets, providing greater control over traffic flow.

- Define custom routes for subnets
- Override default routing behavior

### BGP Routes

BGP routes enable the propagation of on-premises BGP routes to Azure virtual networks. This is achieved through Azure VPN Gateway or an ExpressRoute connection.

For more information, please see [BGP Routes](https://docs.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-bgp-overview?toc=/azure/virtual-network/toc.json)