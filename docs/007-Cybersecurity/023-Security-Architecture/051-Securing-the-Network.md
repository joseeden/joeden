---
title: "Securing the Network"
description: "Securing the network infrastructure"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 51
last_update:
  date: 1/30/2024
---


## Securing the Infrastructure 

TCP/IP’s vulnerabilities are numerous. Improperly implemented TCP/IP stacks in various operating systems are vulnerable to various attacks:

- DoS/DDoS attacks
- fragment attacks
- oversized packet attacks
- spoofing attacks
- man-in-the-middle attacks

TCP/IP (as well as most protocols) is also subject to passive attacks via monitoring or sniffing. 

Network monitoring, or sniffing, is the act of monitoring traffic patterns to obtain information about a network. 

## Physical vs Logical Separation

- **Physical Separation (Air-gapping)**

  - Physically isolates critical components.
  - Prevents unauthorized access.
  - Common in high-security environments.

- **Logical Separation**

  - Uses virtualization or segmentation techniques.
  - Separates network traffic or user groups.
  - Implemented with VLANs, VPNs, or SDN.

## Network Segmentation

Network segmentation separates a network into smaller zones to improve security and performance.

- Controls traffic among networked devices.
- Limits the spread of malware or attacks within the network.
- Helps enforce access policies and protect sensitive resources.

## Demilitarized Zone

A Demilitarized Zone (DMZ) is an isolated network area for outside visitors.

- Also called "screened subnets"
- Hosts public servers like web, email, and file servers
- Provides a buffer zone between the internal network and the internet

For more information, please see [Firewalls.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/055-Firewalls.md#demilitarized-zone)


## Virtual Local Network

VLANs are created by switches to logically segments a network without altering physical topology. 

For more information, please see [VLANs](/docs/006-Networking/001-The-Basics/011-VLANs.md)

## Microsegmentation 

Microsegmentation focuses on protecting traffic within a data center and to/from the internet.

- Protects internal traffic from advanced attacks.
- Moves focus from just network infrastructure to individual workloads.
- Improves efficiency and security for data center services.
- Helps detect and block persistent threats.

It is also used to isolate individual assets, such as data servers, in their own protected network environment. This ensures that even if one part of the network is compromised, isolated assets remain protected, limiting the spread of attacks.


## Network Access Control (NAC)

Network Access Control scans devices for their security status before granting network access.

- Identifies connections, isolates noncompliant devices, and supports incident response.
- Limits endpoint access to the network and provides network visibility.
- Ensures compliance with policies before allowing devices to join the network.

NAC uses **802.1x authentication** to perform access control tasks and it uses different components.

![](/img/docs/networking-basics-network-access-control-nacccc.png)

For more information, please see [IEEE 802.1X Protocol](/docs/007-Cybersecurity/024-Infrastructure-and-Network/022-IEEE-Standards.md#ieee-8021x)

### Use Cases

Use Cases for NAC Deployment:

- Medical devices
- IoT devices
- BYOD/mobile devices (laptops, tablets, smartphones)
- Guest users and contractors

### NAC Deployments

NAC solutions can be deployed using agent-based or agentless methods, depending on the level of control and visibility required.

- **Agent-Based NACs**

  - Also called **Persistent Agents**
  - Software is permanently installed on endpoint devices
  - Continuously monitors the device's compliance and security status
  - Used for enforcing strict policies on managed or corporate devices
  - Doesn't work well in BYOD environments.

- **Agentless NACs**

  - Also called **Non-Persistent Agents**
  - Temporary agent installed during login or network access
  - Performs a one-time scan and removes itself afterward
  - Provide a quick evaluation without ongoing monitoring.
  - Rely on network-level data, directory services, or remote scans
  - Common in BYOD settings like universities or public WiFi networks


### NAC Policy 

NAC Policy typically contains:

  - Device/OS type 
  - Device location
  - Checks host-based firewall 
  - Antivirus/update status

### NAC Roles 

Network Access Control (NAC) manages network security by enforcing policies on users and devices seeking access.

- **User and device authentication**

  - Verifies identities using credentials or certificates.
  - Ensures only authorized users and devices gain access.

- **Role-based access**

  - Assigns network permissions based on user roles.
  - Restricts access to resources according to predefined roles and responsibilities.

- **Posture checking**

  - Assesses the security state of devices before granting access.
  - Ensures devices meet compliance standards like antivirus updates or security patches.
  - Validating current signatures and proper firewall configuration.
  - If device fails checks, device is placed on a quarantine VLAN.
  - Quarantined device will be patched and then ran through checks again.

- **Posture checking**

  - Checks device security before granting access.
  - If device fails checks, device is placed on a quarantine VLAN.
  - Quarantined device will be patched and then rechecked
  - For more information, please see [Posture Checks](/docs/007-Cybersecurity/024-Infrastructure-and-Network/059-Mobile-Systems.md#mobile-security-controls)


## DHCP Snooping 

DHCP Snooping is a network security feature that protects against fake or malicious DHCP servers.

- Filters DHCP messages from untrusted sources.
- Records IP addresses and devices in a binding table.
- Blocks unauthorized DHCP responses from unknown devices.
- Prevents IP conflicts and protects against DHCP exhaustion attacks.

This ensures only trusted DHCP servers assign IP addresses, keeping the network secure from spoofing and malicious activity.

## Infrastructure Considerations

These considerations ensure the network is both efficient and resilient to attacks.

1. **Correct placement of devices**

    - Proper location improves performance and security
    - Avoids bottlenecks and dead zones
    - Misplacement can create vulnerabilities or network gaps

2. **Knowing the attack surface**

    - *Attack surface* is where attackers can enter the network
    - Complex networks means wider attack surface
    - More devices and services increase the exposure
    - Apply controls to mitigate the risks

3. **Choosing connectivity methods**

    - Wired networks are fast and stable but less flexible
    - Wireless offers mobility and easier scaling
    - Hybrid setups balance speed, flexibility, and cost
    - When deciding for connectivity methods, consider:
      - Scalability
      - Speed requirements
      - Security considerations 
      - Budgetary constraints

4. **Security zones and screened subnets**

    - *Security zones* segment the network to limit access
    - *Screened subnets (DMZs)* protect public-facing services


## Device Attributes

Network devices can act in different ways depending on their role and placement.

- **Active**

  - Monitors and reacts to suspicious traffic
  - Makes real-time decisions
  - Example: Intrusion Prevention System (IPS)

- **Passive**

  - Observes traffic without interfering
  - Provides alerts and reports
  - Example: Intrusion Detection System (IDS)

- **Inline**

  - Directly in the traffic path
  - Can filter, block, or optimize traffic
  - Example: Firewall, router, IPS

- **Tap-based**

  - Listens to traffic without affecting it
  - Used for monitoring and analysis
  - Example: Network taps or monitoring probes
