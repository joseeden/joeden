---
title: "Storage Networking"
description: "Networking Technologies"
tags: 
- Networking
- Networking Technologies
sidebar_position: 10
last_update:
  date: 1/25/2018
---

## Overview

Storage Networks are designed for high-bandwidth communication between computing systems and the storage arrays that support them. These networks provide efficient data transfer for storage operations, ensuring that data can be accessed, transferred, and managed seamlessly across connected devices.

- Essential for managing large volumes of data in enterprise environments.
- Optimize performance and reduce latency for data-intensive applications.

There are two main types of network storage:

- **NAS** (Network Attached Storage)
- **SAN** (Storage Area Network)

## NAS

NAS (Network Attached Storage) is a type of networked storage that provides file-level access to data. It operates as a centralized file server that allows multiple users or devices to access the same shared storage over a standard IP network.

- Provides file-based storage solutions, making it ideal for shared access.
- Typically used for file sharing in small to medium-sized businesses.
- Commonly uses **CIFS** (Common Internet File System) and **NFS** (Network File System) protocols for file access.

## SAN 

SAN (Storage Area Network) is a high-performance network that provides block-level storage, allowing devices to access storage as if it were directly attached to them. SAN is commonly used in data centers for larger enterprises due to its scalability and performance.

- Offers block-level storage, provides raw storage to servers for greater control.
- Often used in environments that require large amounts of data storage and high performance.
- Commonly uses **Fibre Channel (FC)** and **iSCSI** protocols for data transmission.

SAN storage is connected to devices over dedicated networks:

- **Fiber Channels**
   - High-speed data transfer protocol specifically for SAN environments.
   - Provides low latency and high throughput for storage traffic.
   - Used in mission-critical applications where performance is essential.

- **Fibre Channel over Ethernet (FCoE)**
   - Encapsulates Fibre Channel frames over Ethernet networks.
   - Reduces need for separate cabling, allows Ethernet and storage traffic on the same network.
   - Commonly used in converged data center environments.

- **iSCSI (Internet Small Computer Systems Interface)**
   - Uses standard IP networks to transmit SCSI commands over TCP/IP.
   - Cost-effective alternative to Fibre Channel by using existing network infrastructure.
   - Ideal for smaller environments that don't require dedicated storage networks.

## Difference Between SAN and NAS

- **SAN**

   - Present raw block-level storage to devices rather than file systems.
   - Devices can format and manage the storage directly as if it were local storage.
   - Connected over dedicated, high-speed networks for optimal performance.

- **NAS**

   - Operates as a file server, providing file-based access to shared storage.
   - Easier to set up and manage than SAN, making it suitable for smaller environments.
   - Uses standard Ethernet networks to connect to devices.

## Storage Network Security

Storage networks carry critical and often sensitive data, making security a top priority. 

- Storage networks frequently carry sensitive, unencrypted information.
- Communication is often left unencrypted to avoid latency and performance degradation.
- Storage traffic should be isolated on dedicated infrastructure or VLANs.
- Storage VLANs should be carefully managed and trunked to prevent unauthorized access.

## VSAN (Virtual Storage Area Network)

VSANs provide isolated virtual storage networks within a physical SAN infrastructure, similar to how VLANs work in Ethernet networks.

- Enable private, segmented storage networks within a shared physical SAN.
- Enhance security by isolating traffic between different storage environments.
- Allows multiple virtual networks on the same physical infrastructure.