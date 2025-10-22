---
title: "Storage"
description: "Where to store the bytes"
sidebar_position: 11
tags: [IT Fundamentals, Computers, Operating Systems]
last_update:
  date: 2/26/2017
---

## Overview 

In addition to RAM, computers use storage devices like **Hard Disk Drives** (HDDs) or **Solid State Drives** (SSDs) to store data persistently. HDDs use spinning disks to read and write data, while SSDs use flash memory for faster performance and greater durability. The storage device holds the operating system, applications, and user data, retaining information even when the computer is turned off.

<div class="img-center">

![](/img/docs/ssd-vs-hdd-hero-1688630547197.jpeg)

</div>


### HDDs

There are two main types of hard drives used today. **Hard Disk Drives (HDDs)** use a spinning platter and a mechanical arm to read and write information. The speed at which the platter rotates, known as **RPM (Revolutions Per Minute)**, affects how quickly data can be read and written. A higher RPM means faster performance. 

For example, a modern HDD might be labeled as 500GB with 5400 RPM. However, HDDs are more prone to damage due to their moving parts. This vulnerability has been addressed with the introduction of solid-state drives (SSDs).

### SSDs

**Solid-State Drives (SSDs)** have no moving parts and are similar in design to USB sticks. Data is stored on microchips, allowing for much faster data transfer speeds compared to HDDs. SSDs are also more compact than HDDs. Despite their advantages, SSDs are more expensive. While HDDs are more affordable, they are also more susceptible to damage. SSDs are safer in terms of data preservation but come at a higher cost.

### SATA

Hard drives connect to systems using various interfaces, with **ATA** interfaces being the most common. The most popular ATA drive is the **Serial ATA (SATA)**, which uses a single cable for data transfers.

<div class="img-center">

![](/img/docs/comphwsatainterface.png)

</div>

SATA drives are hot-swappable, which means you can plug them in without turning off your machine. They also offer faster data transfer rates and more efficient cables than their predecessors, making SATA the standard interface for HDDs today.

### NVMe

As SSDs became faster, the SATA interface couldn't keep up with the new speeds. This led to the creation of the **NVM Express (NVMe)** interface.

<div class="img-center">

![](/img/docs/comphwnvmeslot.png)

</div>

NVMe drives connect directly to the motherboard via an expansion slot, providing greater data throughput and increased efficiency.

### Backups

Data loss from hard drive failures is a common issue. To prevent this, it's essential to back up your data regularly. This means copying or saving your data to another location to avoid losing it in case of a hard drive crash. 

For more information, please see [Data Backups](/docs/007-Cybersecurity/023-Security-Architecture/014-Data-Backups.md)

