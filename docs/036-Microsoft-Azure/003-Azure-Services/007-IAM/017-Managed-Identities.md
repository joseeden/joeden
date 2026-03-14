---
title: "Managed Identities"
description: "Managed Identities"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 17
last_update:
  date: 11/16/2020
---


## Overview

Managing secrets in code is risky and hard to rotate, and it can expose your app to security issues. Azure provides a secure alternative called **Managed Identity** which allow resources to access other services without storing credentials.

<div class='img-center'>

![](/img/docs/all-things-azure-azure-uami-sample.png)

</div>


A **managed identity** is a special type of service principal that Azure manages fully. Azure automatically creates credentials, rotates them, and deletes them when no longer needed.

- Fully managed by Azure with automatic credential handling
- No extra code needed for authentication
- Enables secure access to other Azure services

This approach ensures resources can authenticate safely without exposing secrets or writing extra authentication logic.

## Types of Managed Identities

### System-assigned 

A system-assigned identity is created with a specific Azure resource and deleted when the resource is removed. 

- Enabled on a resource like a Virtual Machine
- Identity is automatically created in Microsoft Entra ID
- Tied to the resource and deleted with it
- Permissions are granted using Azure RBAC

System-assigned identities are simple and ideal for single-resource scenarios where the identity should not persist beyond the resource.

### User-assigned 

A user-assigned identity is created as its own Azure resource and can be shared across multiple resources.

- Persists even if a resource is deleted
- Grants access to services using Azure RBAC
- Ideal for multiple services needing the same identity


### Comparison 

| Category     | System-assigned                                     | User-assigned                                                |
| ------------ | --------------------------------------------------- | ------------------------------------------------------------ |
| Provisioning | Created automatically with the resource             | Created separately as its own Azure resource                 |
| Lifecycle    | Deleted when the resource is deleted                | Persists independently of any resource                       |
| Reusability  | Cannot be reused across multiple resources          | Can be reused across multiple resources                      |
| Access       | Permissions granted via Azure RBAC for the resource | Permissions granted via Azure RBAC for any attached resource |
| Use case     | Ideal for a single resource scenario                | Ideal for multiple resources sharing the same identity       |


## Supported Services

Managed identities work with any Azure service that supports Microsoft Entra ID authentication.

- Virtual Machines, App Services, and Functions
- Key Vault and Azure Storage
- Many other Azure services

The concept is the same across all supported services: resources get a secure identity automatically, and Azure RBAC controls access.
