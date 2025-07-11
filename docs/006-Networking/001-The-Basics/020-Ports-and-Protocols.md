---
title: "Ports and Protocols"
description: "Physical, logical, and secure ports"
tags: 
- Networking
- Security
- Cybersecurity
- Security 
- Architecture
- Security Engineering
sidebar_position: 20
last_update:
  date: 1/16/2019
---


## Overview

**Ports**
- Logical communication endpoint that exists on a computer or server.

**Protocols**
- Defined set of rules and conventions that govern device communication and data exchange.

## Types of Ports 

There are physical ports that you connect wires to and logical ports that determine where the data/traffic goes. 

- **Physical Ports**
    - Refer to the connection points on networking devices like routers, switches, servers, and computers where various cables, such as fiber optic or Cat5 cables, are plugged in to establish a network.

- **Logical Ports**
    - When establishing communication between systems, logical ports, or sockets, are used as address numbers for data transfer. Ports enable a single IP address to support multiple simultaneous communications, each using a different port number. 

        | Protocol     | Port    | Security |
        |--------------|---------|----------|
        | HTTP         | 80      | Insecure |
        | HTTPS        | 443     | Secure   |
        | RADIUS auth  | 1812    | -        |
        | SQL Server   | 1433/1434| -        |
        | Docker API   | 2375/2376| -        |


## Secure Ports

Based on direction:

- **Inbound Ports**
  - Logical communication opening on a server that is listening for a connection from a client.

- **Outbound Ports**
  - Logical communication opening created on a client in order to call out to a server that is listening for a connection.

Grouping of Ports: 

- **Well-known Ports (0–1023)** 
  - Core protocols in the TCP/IP model, such as DNS and SMTP.
  - Assigned by IANA

- **Registered Ports (1024–49151)** 
  - Each vendor registers the port number (that they want to use) with IANA.
  - Associated with proprietary applications.
  - Example:
    - 1433 - Microsoft SQL Server 
    - 3389 - RDP (Microsoft proprietary)

- **Dynamic or private Ports (49152–65535)** 
  - For sessions associated with well-known or registered ports, dynamically assigned and released.
  - Can be used by any application without the need to be registered with IANA.
  - Commonly used in gaming, instant messaging, and chat for connections.


## Port Security 

Port security is a common security feature found on network switches that allows administrators to restrict  which devices can connect to a specific port based on the network interface card's MAC address.

### Network Switches

Network switches make traffic switching decision based on the MAC address of the sending and receiving devices, through a process called **transparent bridging**.

- Switches prevent collisions by ensuring each port is its own collision domain.
- This allows switches to operate in full duplex mode.

Concepts:

- **Full duplex**

  - This means a port can both receive and send data at the same time.

- **CAM Table**

  - Content Address Memory (CAM) Table
  - Stores information about the MAC addresses available on any given port.

- **MAC Flooding**

  - Randomized MAC addresses are sent to the network switch.
  - When this happens, the network switch will simply fail open.
  - When it fail-open, the switch begins to rebroadcast all traffic out to every port.
  - For more information, please see [MAC Address Flooding](/docs/007-Cybersecurity/012-List-of-Attacks/012-Layer-2-Attacks.md#mac-address-flooding)



### Implementing Port Security

Port security works in two modes:

- **Static Port Security**

  - Manually link MAC addresses of devices to specific network interfaces for enhanced security.
  - Any other unregistered device that tries to plug to the switchport will be rejected.
  - Can be a lengthy process because each MAC address needs to be determined.
  - To simplify the process, we can use "sticky MAC"

- **Dynamic Port Security**

  - Also known as **Persistent MAC Learning** and **Sticky Mode**
  - Dynamically associate the first MAC address connected to switchport as authorized.
  - Switches memorize the first MAC address they see on each port and limit access to the port.
  - This prevents other MAC addresses from connecting to the specific switch port.
  - Can still be bypassed through MAC spoofing or resetting MAC Addresses.

### IEEE 802.1X Protocol

802.1x is a standardized framework that provides an authentication mechanism for devices wishing to connect to wired or wireless networks.

- Port-based access control, ensuring only authenticated devices can connect.
- Supports dynamic encryption keys for secure communication.
- Common in corporate environments to enhance security.
- Uses authentication mechanisms such as RADIUS and TACACS+.

#### Components of 802.1X 

- **Supplicant** 
  - Client device trying to connect.

- **Authenticator** 
  - Device through which supplicant will go through
  - Network switch or access point

- **Authentication Server**  
  - Usually RADIUS, performs authentications

#### Authentication Mechanisms

- **RADIUS** 
  - Cross-platform
  - Does NOT support remote access protocol, NetBIOS, or X.25 PAD connections
  - Ideal for mixed network infrastructure.
  - For more information, please see [RADIUS](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#radius)

- **TACACS+**
  - Cisco-proprietary protocol
  - Slower, relies on TCP, but adds security
  - Supports all networking protocols
  - For more information, please see [TACACS+](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#tacacs)

### EAP

EAP (Extensible Authentication Protocol) is a versatile authentication framework that supports multiple methods for secure access to network resources.

- A flexible authentication framework supporting methods like EAP-TLS, EAP-TTLS, and PEAP.
- Commonly used in wireless networks (e.g., Wi-Fi) and secure network access setups.
- Provides strong security through certificate-based authentication.

For more information, please see [EAP](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#eap)


## Transport Method

The transport method refers to the protocols used to move data across networks, primarily TCP and UDP, each serving different purposes based on their characteristics.

### TCP

TCP (Transmission Control Protocol) is a reliable, **connection-oriented** protocol that ensures data is transferred accurately and in order between devices on a network.

- Provides reliable, ordered, and error-checked delivery of data.
- Ensures complete data transfer between sender and receiver.
- Utilizes handshakes to establish a connection before data transfer.
- Suitable for applications where data integrity is crucial, e.g. web browsing, email, file transfers.

### UDP 

UDP (User Datagram Protocol) is a **connectionless** protocol that offers fast transmission by not guaranteeing the delivery of packets, often used in real-time communications.

- Does not guarantee delivery, order, or error checking
- Has lower overhead compared to TCP, leading to faster data transmission
- Preferred for real-time applications where speed is critical, e.g. streaming, VoIP, online gaming.







