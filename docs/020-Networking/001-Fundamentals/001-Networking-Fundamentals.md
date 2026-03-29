---
title: "Networking Fundamentals"
description: "Learn the basics of Networking"
tags: 
- Networking
- Cybersecurity
sidebar_position: 1
last_update:
  date: 1/16/2018
---


## Network 

A network connects devices so they can communicate and share data.

- Devices include computers, phones, and printers
- Network devices include switches and routers
- Connections can be wired or wireless

Devices connect using a **network interface card (NIC)**. Wired NICs use Ethernet cables and ports. Wireless NICs use radio signals, usually on 2.4 GHz or 5 GHz.

A network can be small or large, but the goal is always the same, which is to allow devices to communicate. There are two types of networks: 

- **Local area network (LAN)**

  - Covers a small area like a home, office, or building
  - High speed and low latency connection
  - Usually owned and managed by a single organization

- **Wide area network (WAN)**

  - Connects multiple networks over large distances
  - Uses public or private communication links
  - Often managed by service providers


## Protocol Suites

A protocol suite is a set of protocols that work together to provide comprehensive network communication services. There have been several different protocol suites, some developed by a standards organization and others developed by various vendors.

- **Internet protocol suite (TCP/IP)**

  - Transmission Control Protocol/Internet Protocol (TCP/IP)
  - Handles communication between different networks
  - Created in the 1970s, main protocol used today
  - Open standard protocol suite maintained by IETF

- **Open systems interconnection (OSI)**

  - Protocol family developed in 1977 by ISO and ITU
  - Uses a 7-layer model called the *OSI model*.
  - Helps explain how networks work
  - Used as reference model, not a practical suite

- **AppleTalk**

  - Apple proprietary protocol released in 1985
  - Replaced by TCP/IP in 1995, no longer used in modern networks.
  - In 1995, Apple adopted TCP/IP to replace AppleTalk.

- **Novell NetWare**

  - Short-lived protocol suite released in 1983 by Novell
  - Used IPX protocol for communication
  - In 1995, Novell adopted TCP/IP to replace IPX.


Today, the OSI model and the TCP/IP model are used to describe network operations. Both models organize networking into layers to keep things simple and structured.

## Ethernet

Ethernet is the standard for wired networking.

- Defines how data is sent over cables
- Ensures devices can communicate reliably
- Based on IEEE 802.3

Ethernet makes sure different devices can talk to each other over the same network.

## Device Address

**Media Access Control (MAC) Address**

- Assigned to every network device.
- Example: 00-13-02-1F-58-F5.
- First 3 bytes (24 bits) denote the vendor or manufacturer of the physical network interface.
- No two devices can have the same MAC address in the same local network.

**Internet Protocol (IP) Address**

- Logical address associated with a unique network interface.
- MAC addresses are assigned in the firmware, while IP addresses are logical.
- Helps maintain communications when physical devices are swapped.
- Examples: 192.168.1.1 and 2001:db8::ffff:0:1.


## Wifi 

Widely adopted for its easy deployment and cost-effectiveness, wireless networking provides versatility, enabling devices to roam freely within signal range. 

- **Wi-Fi Evolution**
    - Evolving over time with faster updated versions, Wi-Fi continues to improve its performance.

- **Security Considerations**
    - Despite its benefits, wireless networks introduce additional vulnerabilities. Unlike wired networks, intrusions can occur remotely, without physical access to the network.

For more information, please see [Wireless Networking.](/docs/020-Networking/001-Fundamentals/060-Wireless-Networking.md)

<div class='img-center'>

![](/img/docs/security-wifi.png)

</div>


## Quality of Service 

Quality of Service (QoS) refers to the technology that allows the network to prioritize certain types of traffic over others. 

- Prioritizes critical traffic like VoIP or video conferencing.
- Uses classes of service (CoS), packet classification, and traffic shaping.

**Traffic shaping** refers to controlling network traffic to allow for the optimization or the guarantee of certain performance levels


## Networking Tools 

- **Ping Sweep**

  - Common method to map live hosts in a network.
  - Involves sending ping messages (ICMP Echo Requests) to a range of IP addresses.
  - Online hosts respond, allowing mapping of live hosts on the network.
  - *Reference:* ISC2 Study Guide, Chapter 4, Module 3.

- **Geolocation**

  - Determines a device or user's physical location based on IP or MAC address.

- **Traceroute**

  - Maps network topology and diagnoses connectivity/routing issues by tracing packet hops to an IP address.

- **Wireshark**

  - Network protocol analyzer tool for viewing and analyzing packet contents, including IP addresses and host names.


**