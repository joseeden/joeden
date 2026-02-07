---
title: "Layer-2 Attacks"
tags: 
- Cybersecurity
sidebar_position: 12
last_update:
  date: 1/30/2024
---


## ARP Cache Poisoning

ARP cache/Table cache poisoning involves sending falsified ARP (Address Resolution Protocol) messages to a local network.

- Redirects traffic intended for one host to another host.
- Often used for man-in-the-middle attacks.
- Can lead to data interception and unauthorized access.

**Mitigations:**

- Use static ARP cache entries. 
- Hosts should not accept ARP cache updates.
- Limit access to the network.

## MAC Address Flooding

MAC address flooding overwhelms a network switch with fake MAC addresses.

- Forces switch to broadcast traffic to all ports.
- Results in potential data exposure and network congestion.
- Used to intercept data in a switched network environment.

### Fail-open

- When MAC flooding occurs, the network switch will simply fail open.
- When it fail-open, the switch begins to rebroadcast all traffic out to every port.
- For more information, please see [Failure Modes.](/docs/025-Cybersecurity/023-Security-Architecture/001-Security-Design.md#failure-modes)

## Broadcast Storm

A broadcast storm occurs when a network is overwhelmed with continuous broadcast or multicast traffic.

- Also known as **Switching Loop**
- Can cause network congestion and slow down or crash the network.
- Often triggered by a loop in the network.
- Disrupts normal network communication.

Can be caused by:

- Faulty switch, network card ("jabber")
- Redundant links between switches

Mitigations:

- Configure STP (Spanning Tree Protocol) on the switch.

## Mitigations

Mitigating Layer 2 attacks involves implementing various security measures.

- Enable port security to limit the number of MAC addresses per port.
- Employ MAC address filtering for network access.
- Use VLANs to segment and isolate network traffic.
- Implement Dynamic ARP Inspection (DAI) to prevent ARP spoofing.
- Use Static MAC Address assignments.
- Disable unused switch ports.
- Enable storm control to prevent broadcast storms.
- Configure STP and BPDU to prevent broadcast storms.
- Regularly update network devices to patch vulnerabilities.


