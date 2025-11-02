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

TCP/IP (as well as most protocols) is also subject to passive attacks via monitoring or sniffing. Network monitoring, or sniffing, is the act of monitoring traffic patterns to obtain information about a network. 

## Physical vs Logical Separation

- **Physical Separation (Air-gapping)**

  - Usually called "air-gapping"
  - Physically isolates critical components.
  - Prevents unauthorized access.
  - Common in high-security environments.

- **Logical Separation**
  - Uses virtualization or segmentation techniques.
  - Separates network traffic or user groups.
  - Implemented with VLANs, VPNs, or SDN.

## Network Segmentation

Involves isolating a network from outside communications.

- Controls traffic among networked devices.

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

Microsegmentation addresses modern cyber threats exploiting traditional security models by focusing on protection requirements for traffic within a data center and to/from the internet.

  - Adversaries use polymorphic tools to bypass static controls.
  - Shifts away from infrastructure-centric design paradigms.
  - Aims for increased efficiency in service delivery within the data center.
  - Enhances detection and prevention of advanced persistent threats.


## Network Access Control (NAC)

Network Access Control scans devices for their security status before granting network access.

  - Identifies connections, isolates noncompliant devices, and supports incident response.
  - Limits endpoint access to the network and provides network visibility.
  - Ensures compliance with policies before allowing devices to join the network.

NAC uses **802.x authentication** to perform access control tasks and it uses different components.

![](/img/docs/networking-basics-network-access-control-nacccc.png)

For more information, please see [IEEE 802.1X Protocol](/docs/006-Networking/001-The-Basics/020-Ports-and-Protocols.md#ieee-8021x-protocol)

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

DHCP Snooping is a security feature that acts as a firewall between untrusted hosts and trusted DHCP servers. By monitoring and filtering DHCP traffic, it helps prevent malicious attacks such as IP address spoofing and rogue DHCP servers.

- Network switch feature, can be enabled to trust only known DHCP servers.
- Maintains a binding table that records trusted devices and their IP addresses.
- Drops traffic from untrusted ports and blocks unauthorized DHCP responses.
- Prevents IP address conflicts, protecting against DHCP exhaustion attacks.

## Infrastructure Considerations

Infrastructure considerations play a pivotal role in the efficiency and security of a network environment.

- **Correct placement of devices**
  - Location influences security and performance.
  - Proper placement ensure optimal data flow and minimized latency
  - If placed in the wrong places, it can lead to:
    - Network bottlenecks 
    - Vulnerability points 
    - Areas without connectivity
    
- **Knowing the attack surface**
  - **Attack Surface** - all points that an unauthorized user can try to enter.
  - The more complex a network becomes, the wider the attack surface becomes.
  - Implement proper controls to mitigate the risk.

- **Determine connectivity methods**
  - Wired networks provide stabiilty and speed, but restrictive in terms of mobility.
  - Wireless connections offer greater levels of flexibility and scalability.
  - Hybrid methods can be used to combine both.
  - When deciding for connectivity methods to user, consider:
    - scalability
    - Speed requirements
    - Security considerations 
    - Budgetary constraints

- **Security Zones and Screened subnets** 
  - **Security zones** - Isolating or segmenting networks 
  - **Screened subnet** - previously referred to as **Demilitarized Zone (DMS)**

## Understand Device Attributes

  - **Active**
    - Monitor and act on suspicious network traffic by influencing data flows
    - Makes real-time decisions based on the network's current state
    - Example: IPS 

  - **Passive**
    - Simply observe and report on network traffic without actively intervening
    - Example: IDS 

  - **Inline** 
    - Positioned directly in the path of the network traffic
    - Can influence or block traffic as it passes through the device
    - Filters malicious traffic and optimize data flow
    - Example: Firewall, routers, IPS

  - **Tap-based**  
    - Discreet; placed outside of the direct network path
    - Configured to only listen to network activity
    - Captures data for analysis without impacting the actual traffic




