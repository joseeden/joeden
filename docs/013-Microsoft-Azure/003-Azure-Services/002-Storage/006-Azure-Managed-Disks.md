---
title: "Azure Managed Disks"
description: "Block storage for Azure Virtual Machines"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 6
last_update:
  date: 7/18/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Overview

Azure virtual machines (VMs) use Azure disks as their attached disk storage. 

- Azure disks are built-on top of page blobs which are the type of blobs optimized for random access. 
- When you create Azure disks you can choose to manage the storage account yourself or to use managed disks where Azure manages the storage account for you. 
- Managed disks are the preferred option.

Azure Managed Disks provide a virtualized, scalable, and highly available storage solution for Azure VMs. 

- Virtualized block-level storage volumes used with Azure VMs and managed by Microsoft Azure.
- The encryption options (SSE and ADE) enhance data security, and the distinction between data, OS, and temporary disks allows for efficient and purpose-driven disk management within the Azure infrastructure.

   ![](/img/docs/azure-managed-disks-benefits.png)

## Benefits

  1. **Availability**
        - Designed for 99.999% availability with three replicas of data per disk, protecting against two failures of disk replicas.
  2. **Scalability**
        - Supports up to 50,000 VM disks of a specific type per region in each subscription, enabling the creation of numerous virtual machines.
  3. **Integration**
        - With availability sets: 
            - Isolation of VM disks within an availability set, guarding against a single point of failure within an Azure data center.
        - With availability zones: 
            - Protection against entire Azure data center failures.
  4. **Backup and Restore**
        - Integrated with Azure backup, supporting backup and restore of managed disks, making VM restores easy.
  5. **Access Control** 
        - Granular access control through Azure role-based access control (RBAC), allowing specific permissions for managed disks.
  6. **Upload Ease** 
        - Facilitates the upload of on-prem VMs to Azure through direct upload, streamlining the VHD file transfer process.

## Encryptions

  1. **Server-side Encryption (SSE)**
     - Default for all managed disks.
     - Provides encryption at rest for data, snapshots, and images.
  2. **Azure Disk Encryption (ADE)**
     - Enables encryption on OS and data disks of a VM.
     - Uses **BitLocker** for Windows VMs 
     - Used **DM-crypt** for Linux VMs.

## Disk Types

  1. **Data Disks**
     - Attached to a VM to store applications and data.
     - Registered as a SCSI drive, assignable drive letters, 
     - Max capacity of 32 terabytes.
     - Number of data disks depends on VM size.

  2. **OS Disks**
     - Deployed with a VM, hosts OS and boot volume.
     - Max capacity of 4 terabytes.

  3. **Temporary Disks**
     - Not a managed disk, not intended for important data.
     - Every VM contains a temporary disk, 
     - Used for page files and swap files, 
     - Data may be lost during maintenance events or VM redeployment.
     - Assigned the drive letter D on Windows and 
     - Assigned to /dev/sdb on Azure Linux VMs.

         |![](/img/docs/azure-vm-temporary-storage.png)|
         |-|


 

