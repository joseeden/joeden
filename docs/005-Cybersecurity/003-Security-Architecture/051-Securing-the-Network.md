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

For more information, please see [Firewalls.](/docs/005-Cybersecurity/003-Security-Architecture/055-Firewalls.md#demilitarized-zone)


## Virtual Local Network

VLANs are created by switches to logically segments a network without altering physical topology. 

For more information, please see [VLANs](/docs/004-Networking/001-The-Basics/001-Networking-Fundamentals.md#virtual-local-area-network)

## Microsegmentation 

Microsegmentation addresses modern cyber threats exploiting traditional security models by focusing on protection requirements for traffic within a data center and to/from the internet.

  - Adversaries use polymorphic tools to bypass static controls.
  - Shifts away from infrastructure-centric design paradigms.
  - Aims for increased efficiency in service delivery within the data center.
  - Enhances detection and prevention of advanced persistent threats.


## Network Access Control 

Network Access Control (NAC) scans devices for their security status before granting network access.

  - Identifies connections, isolates noncompliant devices, and supports incident response.
  - Limits endpoint access to the network and provides network visibility.
  - Ensures compliance with policies before allowing devices to join the network.

NAC uses 802.x authentication to perform access control tasks and it uses different components.

![](/img/docs/networking-basics-network-access-control-nacccc.png)

For more information, please see [IEEE 802.1X Protocol](/docs/005-Cybersecurity/005-Communications-and-Network/050-Ports-and-Protocols.md#ieee-8021x-protocol)

### Use Cases

Use Cases for NAC Deployment:

  - Medical devices
  - IoT devices
  - BYOD/mobile devices (laptops, tablets, smartphones)
  - Guest users and contractors

### NAC Deployments

- **Persistent Agents**

  - Software installed on a device requesting network access.
  - Continuously monitor the security state of devices.
  - Works well in a corporate environment, where the organization owns all devices.
  - Doesn't work well in BYOD environments.

- **Non-Persistent Agents**

  - Popular in BYOD environments, such as college campuses.
  - Users connect to WiFi, access a web portal, and click login link.
  - Once link is clicked, a temporary agent is installed on the device.
  - Agents scans device for compliance and delete itself after inspection.
  - Provide a quick evaluation without ongoing monitoring.
  - Typically used for initial security checks at connection time.

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
  - If device fails posture checks, device is placed on a quarantine VLAN.
  - Quarantined device will be patched and then ran through posture checks again.



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
    
- **Understanding attack surface**
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




