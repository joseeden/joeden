---
title: "Private Endpoints"
description: "Connecting privately through a network interface"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 7
last_update:
  date: 11/16/2020
---


## Overview

In the Azure ecosystem, not all resources, such as Azure SQL Database instances and Azure Storage containers, can be directly placed within a virtual network. As a solution, you can use a **private endpoint**, which provides a secure and indirect way to integrate these external resources into a virtual network.

- Represents a private IP address within a virtual network, establishing a connection to an Azure resource outside of the VNet.
- Addresses security concerns associated with public endpoints, which expose resources to the internet.

## Benefits of Private Endpoints

- **Enhanced Security**
  - By creating a private endpoint for an Azure resource, the associated public endpoint can be disabled
  - Limits access to the resource to connections over the Microsoft backbone network from the associated VNet.

- **Private Link Support**
  - Not all Azure resources can be connected to a private endpoint. 
  - The resource must be hosted by a service supporting **Private Link**, which acts as the underlying technology for connecting private endpoints to services.

## Sample Scenario

![](/img/docs/azure-private-endpoints.png)

In the example above, a virtual machine (VM) running an application needs to store data in an Azure SQL Database instance named DB1. Here’s a step-by-step process:

- **Create a Private Endpoint**
  - Set up a private endpoint, e.g., PrivateSqlEndpoint, in a designated subnet (e.g., Sub1) within the virtual network (e.g., Vnet1).

- **Configure the Private Endpoint**
  - Specify the target of the private endpoint to be DB1, connecting the endpoint to the desired Azure resource.

- **Configure Database Connectivity**
  - In the configuration of DB1, set its connectivity method to private endpoint.
  - Optionally, disable public access to the database to restrict accessibility to the private endpoint.

- **Application Access**
  - With this setup, the application on the VM can access DB1 by connecting to the IP address of PrivateSqlEndpoint.
  - The Private Link service ensures traffic is securely routed over Microsoft's backbone network from the private endpoint to the database.

## Custom Private Link

Microsoft has extended the utility of private endpoints by allowing the setup of custom Private Link services. This helps organizations to establish private connections for their own applications.

![](/img/docs/azure-custom-private-link-services.png)

## Peered VNets and On-Premises Environments

Whether your VNet is peered to another VNet or connected to an on-premises environment, resources in these networks can securely access external Azure resources through private endpoints.

![](/img/docs/azure-peered-vnets-onprem.png)

## Resources

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/)