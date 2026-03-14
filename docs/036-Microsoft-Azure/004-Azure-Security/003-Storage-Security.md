---
title: "Storage Security"
description: "Storage Security"
tags: 
- Cloud
- Microsoft Azure
- DevOps
- Security
- Certifications
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

A **Shared Access Signatures (SAS)** is a URL token that gives temporary, controlled access to Azure Storage resources. It defines who can do what, and for how long, without exposing your account key.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14195806.png)

</div>

### Creating a SAS Token 

To create a SAS token, navigate to **Storage accounts** and select the desired storage account. Under **Properties**, click **Blob service**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14205417.png)

</div>

Click **Add container** and provide a name. Click **Create.**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14201136.png)

</div>

After its created, open the new container. You can upload file heres by clicking **Upload.**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14215741.png)

</div>

To share this file securely, you can use SAS tokens. Click the three dots on the right hand side and select **Generate SAS.**

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14201838.png)

</div>

You can modify settings such as the signing method, stored access policy, and expiration time. Once configured, click **Generate SAS token and URL**.


<div class='img-center'>

![](/img/docs/Screenshot2026-03-14a202213.png)

</div>

It will return the SAS token and URL below the **Generate SAS token and URL** button.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14202419.png)

</div>

You can now use this URL to view or download the resource without signing in, while keeping your main account keys secure.

### Types of SAS

There are three SAS types with different scopes and security levels:

| SAS type            | Credentials used            | How it works                                                               | Example                                                         |
| ------------------- | --------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------- |
| User Delegation SAS | Microsoft Entra credentials | Grants access to specific blobs or Data Lake Storage; tied to a user       | HR app shares payroll reports securely with an external auditor |
| Service SAS         | Storage account key         | Grants access to a single service like blobs, queues, or files             | A ticket valid for accessing only the blob service              |
| Account SAS         | Account key                 | Grants access across multiple services and allows service-level operations | Master pass giving access to multiple storage services at once  |

:::info 

User Delegation SAS is the most secure because it avoids storing keys and is tied to a specific user identity.

:::

### How SAS works

Shared Access Signatures (SAS) works by using a signed URI that tells Azure what actions are allowed and for how long.

- SAS is a signed URI with a special token and query parameters, including a signature
- SAS URI is sent to Azure Storage as part of a request
- Azure checks the token and signature for validity
- Unauthorized requests are declined

![](/img/docs/azure-sas-how-it-worksss.png)

For example, a web app needs to share payroll reports with an external auditor:

1. Uses User Delegation SAS to grant temporary access
2. Auditor can only view the specific payroll reports they need
3. Access automatically expires after a set time
4. SAS is authenticated with PeopleSphere’s Azure credentials

This ensures sensitive account keys are never exposed while granting precise, temporary access.



### SAS Structure

A SAS starts with a **URI to the storage resource** and appends a SAS token. The token contains key-value pairs defining permissions, time limits, and resource type.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14200002.png)

</div>


**Token components:**

| Component   | Description                                          |
| ----------- | ---------------------------------------------------- |
| `sp`        | Permissions granted, such as read or write           |
| `st` / `se` | Start time (`st`) and expiry time (`se`) for the SAS |
| `spr`       | Allowed protocol, like HTTPS or HTTP                 |
| `sr`        | Resource type, e.g., `"b"` for blob                  |
| `sv`        | Storage API version used                             |
| `sig`       | Cryptographic signature that verifies the request    |


### Best Practices

- Always use **HTTPS** to prevent token interception
- Prefer **User Delegation SAS** for better security
- Keep expiration times short to minimize risk if tokens are leaked
- Only grant **necessary permissions**
- If unsure, avoid SAS and use a secure backend service



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

  