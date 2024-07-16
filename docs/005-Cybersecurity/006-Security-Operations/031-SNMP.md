---
title: "SNMP"
description: "Simple Network Management Protocol"
tags: [Security, Cybersecurity, Security Operations, Networking]
sidebar_position: 31
last_update:
  date: 1/30/2024
---


## Overview

Simple Network Management Protocol (SNMP) is a widely used protocol for network management and monitoring. It allows network administrators to remotely monitor and manage network devices, such as routers, switches, servers, and printers, from a central management station.

- Collects and reports information about device performance.
- Enables remote configuration of network devices.
- Generates alerts and notifications based on predefined conditions or thresholds.
- Provide real-time data and historical logs for analysis.
- Authentication and access control mechanisms.

Sample diagram:
![](/img/docs/sec+-snmp-sample-diagram.png)

## Components

- **SNMP Manager**

    - Also known as the Management Information Base (MIB)
    - Responsible for monitoring and managing network devices. 
    - It runs SNMP management software.
    - Management station, a master node that can send and receive.

- **Agent**

    - Software embedded in network devices.
    - Collects and reports information to the management station.

- **Managed Device**

    - Network devices, such as routers, switches, and servers.
    - Devices monitored and managed using SNMP.

## Operations

The SNMP Manager can send and receive messages to the agents using three message types;

- **Set**

    - Modifies configuration settings on a managed device.
    - Updating parameters or enabling/disabling features.
    - Agents receive this and changes the variable.
    - After changing, agents responds to manager with the new values.

- **Get**

    - Retrieves information from a managed device.
    - Details such as system configuration or performance data.

- **Trap**

    - Sent asynchronously, unsolicited notifications from agents to the server.
    - Agent send them without being requested by the manager.
    - Allows agents to notify the manager in near real time.
    - Used to provide events or alarm notifications to the manager.
    - Can include:
        - Uptime 
        - Configuration changes
        - Unexpected downtime
        - Other essential information

## Types of Trap Messages 

- **Granular**
    - Sent trap messages get a unique objective identifier (OID).
    - Distinguishes each message as a unique message received.
    - OIDs are consolidated and stored inside a translation file called MIB.

- **Verbose**
    - May be configured to contain all information about an alert or event.
    - More data is sent, taking up more resources and bandwidth.

## Management Information Base 

Used to describe the structure of the management data of a device subsystem using a hierarchical namespace containing object identifiers.

- Allows the trap messages to send just the changes for the specific OID.
- Saves bandwidth because SNMP traps don't send redundant information.

## Variable-binding 

Data in SNMP traps are stored in a simple key-value pair configuration known as **variable-binding.** Sample:

```YAML
Site: Main-HQ 
Criticality: High 
Severity: Low 
Alarm Description: High Temperature  
```

## Versions

There are three SNMP versions with varying security:

- **SNMPv1** 

    - The original version of SNMP
    - Basic functionality and limited security features.

- **SNMPv2** 

    - Introduced improvements in performance.
    - Added new features, such as bulk retrieval operations.
    
- **SNMPv3** 

    - The most recent version, offering enhanced security features.
    - Encryption and authentication mechanisms.

Both SNMPv1 and SNMPv2 uses a community strings to access the managed devices.

- Strings are stored as insecure plain text.
- Default community string are either public (read-only) or private (read-write).

In SNMPv3, three enhancements are added to ensure integrity and confidetiality.

- Messages are hashed before being sent.
- Source of the messages is validated.
- Uses DES with a 56-bit encryption key
- DES is being replaced by 3DES and AES in newer devices

Another benefit of SNMPv3 is it groups the SNMP components into different entities with different authorization and access privileges.

![](/img/docs/sec+-snmp-v3-grouping-diagram.png)

