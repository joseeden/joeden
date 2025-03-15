---
title: "Storage Security"
description: "Storage Security"
tags: [Cloud, Microsoft Azure, DevOps, Security, Certifications]
sidebar_position: 3
last_update:
  date: 11/22/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Overview

These security options collectively enhance the protection, management, and monitoring of data stored in Azure Storage. Each option addresses specific aspects of security, access control, and logging for a comprehensive storage security strategy.

## Azure Storage Service Encryption

Automatically encrypts data in Azure Storage to meet security and compliance requirements.

- Enabled by default when creating a new storage account; cannot be disabled.
- Uses 256-bit AES encryption.
- Supported on Standard and premium storage accounts.
- No impact on Azure Storage performance.
- No additional cost for Azure Storage encryption.
- Resources Encrypted: Blobs, disks, files, queues, and tables, including metadata.

For more information: [Azure Storage Service Encryption](https://docs.microsoft.com/azure/storage/common/storage-service-encryption)

  

## Shared Access Signatures (SAS)

Provides secure granular access to storage resources without compromising data security.

![](/img/docs/azure-sas-tokennns.png)

### Types

- **User Delegation SAS** 
    - Applies to Blob storage
    - Secured with Azure AD credentials
    - Microsoft recommends to use Azure AD credentials whenever possible to enhance security

- **Service SAS** 
    - Secured with the storage account key
    - Used to delegate access to a specific service (Blob, Queue, Table, or Azure Files)

- **Account SAS** 
    - Secured with the storage account key
    - Used to delegate access to one or more storage services

### How SAS works

- SAS is a signed URI with a special token and query parameters, including a signature.
- SAS URI is then presented to Azure Storage as part of a request
- Azure checks SAS parameters and signature for validity; declines unauthorized requests.

![](/img/docs/azure-sas-how-it-worksss.png)

  

## Storage Account Keys

When you create a storage account, Azure generates two 512-bit keys which you can use to authorize access to data that resides in your storage account via Shared Key authorization.

- Use Azure Key Vault to manage, rotate, and regenerate the keys
- Regularly rotate and regenerate keys
- Key rotations can be performed without interrupting the applications that use them
- Storage accoun access are essentially root passwords; protect them by not distributing, saving in plain text, or hard coding in apps.

  

## Azure Storage Analytics

Performs logging and provides metrics data for storage accounts.

- Ideal for tracing storage requests, analyzing usage trends, diagnosing storage account issues.
- Needs to be enabled for each service to monitor storage requests and analyze usage trends.
- 20TB limit for stored data, independent of the total storage account limit.

For more information: [Azure Storage Analytics](https://docs.microsoft.com/en-us/azure/storage/common/storage-analytics)

  