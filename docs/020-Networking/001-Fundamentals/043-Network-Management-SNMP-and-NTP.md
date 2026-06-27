---
title: "Network Management with SNMP and NTP"
description: "Network management with SNMP and NTP"
tags: 
- Networking
- DevNet
- CCNA
- Security
sidebar_position: 43
last_update:
  date: 5/25/2020
---


## Overview

Network management depends on visibility and consistent time. SNMP helps monitor and manage devices, and NTP keeps clocks synchronized so logs, alerts, and service-level measurements can be trusted.

## SNMP

Simple Network Management Protocol (SNMP) lets a management system collect information from routers, switches, servers, and security appliances.

For more information, please see [SNMP](/docs/025-Cybersecurity/029-Security-Operations/031-SNMP.md) page.

SNMP has three core elements:

| Element      | Purpose                                                              |
| ------------ | -------------------------------------------------------------------- |
| SNMP manager | The network management system that sends requests and receives alerts. |
| SNMP agent   | Software on the managed device that exposes management data.         |
| MIB          | A structured database of object identifiers and values.              |

<div class='img-center'>

![](/img/docs/devnetsnmpcomponents.png)

</div>

## SNMP Operations

SNMP managers and agents exchange a small set of message types:

| Message       | Purpose                                             |
| ------------- | --------------------------------------------------- |
| `Get`         | Reads a specific variable from the agent.           |
| `GetNext`     | Reads the next variable in the MIB tree.            |
| `GetResponse` | Returns data or an error for a manager request.     |
| `Set`         | Changes a variable or triggers an action.           |
| `Trap`        | Sends an unsolicited event notification to manager. |

<div class='img-center'>

![](/img/docs/devnetsnmpgetreq.png)

</div>

## SNMP Security

SNMPv1 and SNMPv2c use community strings, which behave like plaintext passwords. SNMPv3 adds authentication, encryption, and message integrity.

Use these practices:

- Disable SNMP when it is not needed.
- Replace default communities such as `public` and `private`.
- Prefer SNMPv3 for sensitive environments.
- Restrict SNMP access to approved management hosts.
- Use read-only access unless configuration changes are required.

## NTP

Network Time Protocol (NTP) synchronizes clocks across network devices and systems. Consistent time is important for troubleshooting, log correlation, monitoring, billing, and service-level agreements.

NTP uses UDP port `123`.

## NTP Strata

NTP uses strata to describe distance from an authoritative time source.

| Stratum | Description                                            |
| ------- | ------------------------------------------------------ |
| 1       | Directly connected to a highly accurate time source.   |
| 2       | Synchronizes from a stratum 1 server.                  |
| 3+      | Synchronizes farther away from the original source.    |

NTP clients usually prefer lower-stratum sources, but they also compare multiple sources and avoid time sources that appear incorrect.

## NTP Association Modes

| Mode                     | Description                                                  |
| ------------------------ | ------------------------------------------------------------ |
| Client/server            | A client requests time from one or more servers.             |
| Symmetric active/passive | Peer time servers back each other up.                        |
| Broadcast or multicast   | Servers announce time on a local network with less setup.    |

## NTP Security

Protect time sources because incorrect time can break logs, certificates, monitoring, and incident response.

- Allow NTP traffic only from trusted sources.
- Use authentication where supported.
- Configure more than one trusted time source.
- Monitor for clock drift or unsynchronized devices.
