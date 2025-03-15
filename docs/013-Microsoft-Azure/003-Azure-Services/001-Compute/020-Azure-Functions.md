---
title: "Azure Functions"
description: "Serverless compute in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 20
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Overview

Azure Functions is a serverless compute service that enables event-driven code execution without the need to manage infrastructure. This allows developers to focus on writing code while Azure handles the scaling and management of resources.

- **Event-Driven Execution**
  - Code can be triggered by various events, such as HTTP requests, database changes, or messages from a queue.
  - Ideal for scenarios where the execution of code depends on specific triggers.

- **Auto-Scaling**
  - Automatically scales based on the volume of incoming events.
  - Ensures that the application remains responsive even during high demand.

- **Use Case Example**
  - Imagine intelligent traffic lights in a city that adapt based on the number of cars and pedestrian needs.
  - Azure Functions can be used to trigger changes in traffic light behavior based on real-time data inputs, similar to how it handles other event-driven scenarios.

