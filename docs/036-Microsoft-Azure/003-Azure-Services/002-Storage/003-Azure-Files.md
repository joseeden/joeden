---
title: "Azure Files"
description: "Managed File Shares and Storage"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 3
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Overview

Azure Files makes file shares available in the cloud, offering a fully managed solution.

- Supports access through the **Server Message Block (SMB) protocol**, an industry-standard. 
- Azure file shares can be mounted from Windows, Linux, and Mac OS machines, both in the cloud and on-premises.
- **Azure File Sync** Allows caching Azure file shares on Windows servers close to users for faster data access.
- Azure Files can replace or supplement on-premises file servers and NAS devices.
- Enables control of Azure file share permissions through on-prem Active Directories. 
- Useful for lifting and shifting applications to the cloud, especially those relying on file shares for data storage.
 
## Management and Operations

- **Fully Managed**: Azure Files is a fully managed service, eliminating concerns about hardware management, OS installation, patching, and security upgrades.
- **Command Line and Portal Management:**
    - Use familiar PowerShell commands and Azure CLI commands for creating, mounting, and managing Azure file shares.
    - Management through the Azure portal and Azure Storage Explorer is also supported.

## Resilience and Reliability

- **Built to Be Resilient:** Azure Files is designed with resilience, eliminating worries about file server upgrades, local power outages, and network issues affecting on-prem file shares.



 