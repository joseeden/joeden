---
title: "Azure Queues"
description: "Durable queues for large-volume cloud services."
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 4
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Overview 

Azure Queue Storage provides a scalable and reliable solution for managing messages in distributed applications, enhancing communication and coordination among various system components.

- Messages are not emails but serve as communication units in distributed applications.
- Accessible globally through authenticated HTTP or HTTPS calls.

## Components 

![](/img/docs/azure-queue-service-components.png)

1. **URL Format** 
    - Specific URL format required to access a queue, including the storage account name and queue name.
    - Example URL: `http://mystorageaccount.queue.core.windows.net/images-to-process`
2. **Storage Account:**
   - All access to Azure storage services, including queues, is through a storage account.
   - The storage account acts as the overarching container for Azure storage.

3. **Queue** 
    - A queue is essentially a set of messages.
    - When naming a queue, use all lowercase letters.

4. **Message**
    - Messages can be in any format. and can be up to 64 kB in size.
    - Messages play a crucial role in enabling communication between different components of a distributed application.


 