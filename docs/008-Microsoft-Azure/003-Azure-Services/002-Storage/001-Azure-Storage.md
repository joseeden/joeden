---
title: "Azure Storage"
description: "Highly available storage in the cloud"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 7/18/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Benefits of Azure Storage 

- **Durability and Availability**
   - Built-in redundancy ensures data safety during hardware failures.
   - Cross-data center and cross-region replication protect against disasters or local failures.

- **Security and Access Control**
   - Automatic encryption for all stored data ensures inherent security.
   - Fine-grained control over data access is maintained.

- **Scalability and Accessibility**
   - Designed to be massively scalable to meet diverse data storage requirements.
   - Access data globally over HTTP or HTTPS with support for various client libraries and languages.
   - Multiple access methods include .NET, Java, Python, PHP, PowerShell, Azure CLI, Azure portal, and Azure Storage Explorer.

## Core Azure Storage Services

- **Azure Blobs**
   - Provides object storage for unstructured data (e.g., text, binary data).

- **Azure Managed Disks**
   - Block-level storage volumes managed by Azure for virtual machines.
   - Types include ultra disks, premium SSD disks, standard SSD disks, and standard HDD disks.

- **Azure Files**
   - Fully managed file share system accessible via the SMB protocol.
   - Supports mounting from Windows, Linux, and MacOS machines, on-prem and in the cloud.

- **Azure Queue Storage**
   - Designed for storing and managing large numbers of messages in distributed applications.

- **Azure Table Storage**
   - Ideal for structured NoSQL data with a key/attribute store and a schema-less design.


## Storage Account types

- **General-Purpose V2 Account**
   - Basic storage account suitable for hosting blobs, files, queues, and tables.
   - Recommended for most scenarios requiring Azure storage.
  
- **General-Purpose V1 Account**
   - Legacy account hosting blobs, files, queues, and tables.
   - Similar functionality to V2 accounts, but Microsoft recommends using V2 for future-proofing.

- **Block Blob Storage Account**
   - Offers premium performance for block blobs and append blobs.
   - Ideal for high transaction rates and scenarios requiring low storage latency.

- **File Storage Account**
   - Exclusive files-only storage account.
   - Recommended for enterprise and high-performing applications.

- **Blob Storage Account**
   - Legacy account used for blob-only storage.
   - Microsoft recommends using general-purpose V2 accounts instead.

   <div class="img-center">

   ![](/img/docs/azure-storage-accountsss.png)

   </div>


## Key Features

- All storage account types are encrypted using Storage Service Encryption (SSE) for data at rest.
- Archive storage and blob-level tiering support only block blobs.
- Zone-Redundant Storage (ZRS) and Geo Zone-Redundant Storage (GZRS) are available for standard general-purpose V2 accounts, block blob accounts, and file storage accounts in certain regions.
- Premium performance for general-purpose V2 and general-purpose V1 accounts is available for disk storage and page blobs. For block blobs and append blobs, it's exclusive to block blob accounts. Files-only storage accounts support premium performance for files.

## Important Points

- Archive storage and blob-level tiering support only block blobs.
- ZRS and GZRS are available only for standard general-purpose V2 accounts, block blob accounts, and file storage accounts in certain regions.
- Premium performance for general-purpose V2 and general-purpose V1 accounts is only for disk storage and page blobs. Block blob accounts support premium performance for block blobs and append blobs, and files-only storage accounts support premium performance for files.

Detailed information on the different storage accounts available at: [https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-overview).


 
