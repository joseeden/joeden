---
title: "On-Path Attacks"
tags: [Cybersecurity]
sidebar_position: 11
last_update:
  date: 1/30/2024
---



## Overview

An on-path attack is an attack that attempts to position between two devices (e.g., web browser and server) to intercept or modify information.

- Passive attack with no direct interaction with the target system.
- Differs from DDoS attacks involving numerous unsuspecting secondary victims.
- Primary goal is to gain system access by impersonating a legitimate user or device.

**Mitigations:**

- Use HTTPS, SSL/TLS to protect data.
- Network Segmentation, limit access to critical systems.
- IDS/IPS, detect suspicious traffic patterns.
- Ensure routing data is accurate and secure.

## Interception 

Ways to conduct on-path or interception attacks:

- **ARP Poisoning**

  - Manipulates the ARP cache on a local network.
  - Associates attacker's MAC address with the IP address of a legitimate device.
  - For more information, please see [ARP Cache Poisoning](./012-Layer-2-Attacks.md#arp-cache-poisoning)

- **DNS Poisoning**

  - Inserts malicious entries into DNS resolver's cache.
  - Redirects users to fraudulent or malicious websites.
  - Can be used to steal credentials or deliver malware.
  - Affects the integrity of DNS resolution.

- **Introducing a Rogue WAP**

  - Sets up a [fake access point](/docs/025-Cybersecurity/051-List-of-Attacks/009-Wireless-Attacks.md#rogue-access-points-rogue-waps)
  - Entices users to connect to it instead of a legitimate WAP.
  - Intercepts and monitors all traffic between the user and the internet.
  - Can capture sensitive information like passwords and personal data.

- **Introducing a Rogue Router/Switch**

  - Deploys unauthorized networking devices into the network.
  - Intercepts, manipulates, or redirects network traffic.
  - Can be used to capture data packets for analysis.
  - May disrupt legitimate network operations or degrade performance.


## Replaying the Attack 

Occurs when an attacker captures a valid data which is then repeated immediately or delayed and then repeated. See [Replay Attack.](./005-Spoofing-Attacks.md#replay-attack)


<div class="img-center">

![](/img/docs/sec+-replaying-the-attack.png)


</div>


## Relaying the Attack 

Occurs when an attacker inserts themselves in between two hosts and become part of the conversation, and they can read or modify any any communications.


<div class="img-center">

![](/img/docs/sec+-relaying-the-attack.png)


</div>


## SSL Stripping 

If the server is using a strong encryption scheme like TLS 1.3, it's going to be difficult for an attacker to insert himself in between the two hosts. To overcome this, the attacker can use SSL stripping.

- Tricking the application to use HTTP instead of HTTPS connection.
- If it is impossible, attackers can resort to [downgrade attacks.](./002-Cryptographic-Attacks.md#downgrade-attacks)
