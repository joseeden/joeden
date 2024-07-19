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

Demilitarized Zone (DMZ) is an isolated network area for outside visitors.

- Also called as **"screened subnets"**
- Hosts public servers like web, email, and files.


<div class="img-center">

![](/img/docs/security-dmz-simplified-dmz-diagrammm.png)


</div>


## Virtual Local Network

VLANs are created by switches to logically segments a network without altering physical topology. 

For more information, please see [VLANs](../../004-Networking/001-Networking-Basics.md#virtual-local-network)

## Microsegmentation 

Microsegmentation addresses modern cyber threats exploiting traditional security models by focusing on protection requirements for traffic within a data center and to/from the internet.

  - Adversaries use polymorphic tools to bypass static controls.
  - Shifts away from infrastructure-centric design paradigms.
  - Aims for increased efficiency in service delivery within the data center.
  - Enhances detection and prevention of advanced persistent threats.


## Network Access Control 

Network Access Control (NAC) scans devices for thir security status before granting network access, safeguarding against both known and unknown devices. 

  - Identifies connections, isolates noncompliant devices, and supports incident response.
  - Limits endpoint access to the network and provides network visibility for potential incident response.
  - Ensures compliance with organization policies before allowing devices to join the network.

**NAC Policy typically contains:**
  - Device/OS type 
  - Device location
  - Checks host-based firewall 
  - Antivirus/update status

**Use Cases for NAC Deployment:**

  - Medical devices
  - IoT devices
  - BYOD/mobile devices (laptops, tablets, smartphones)
  - Guest users and contractors

**Onboarding Process Importance:**

  - Emphasizes the importance of an onboarding process for all mobile devices.
  - Device identification and interrogation to ensure compliance with organization policies during network connection.

**NAC Deployments:**

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

## Understand device attributes

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

## Failure Modes 

Failover mode determines how devices will act in case something goes wrong.

- **Fail-open**
  - Allows all traffic to pass through in the event of failure
  - Will not inspect or filter, ensuring no disruption to the network service
- **Fail-closed**
  - Blocks all traffic in the event of failure.
  - Ensure security of the network is intact, but will impact network connectivity.



