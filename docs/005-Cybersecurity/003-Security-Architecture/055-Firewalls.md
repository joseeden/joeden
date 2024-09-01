---
title: "Firewalls"
description: "Firewalls - Its uses and types"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 55
last_update:
  date: 1/30/2024
---


## Overview 

Firewalls safeguard networks by monitoring and controlling traffic based on predefined security rules.

- Can be hardware-based or specialized software installed on the client or server
- By placing in front of the network segment, it creates a **screened subnet.**

## Concepts

- **Screened Subnet** 

  - Also known as a **Dual-homed Host Configuration**.
  - Acts a protective barrier between external untrusted networks and internal trusted networks.
  - Often equipped with a packet-filtering firewall or other security mechanisms.

- **In-depth Inspection**

  - A firewall with in-depth inspection may slow down due to time taken.
  - Each packet goes through all the rules, increasing the network latency.
  - On the other hand, less depth inspection can mean less security.

## Types of Firewall 

- **Packet Filtering**

  - Most efficient in terms of maximizing throughput.
  - Minimum level of inspection, only inspects the header of the packet.
  - Filters based on source and destination IP addresses, ports, and protocols.
  - Operates at the network layer (Layer 4) of the OSI model.
  - Simple and fast but lacks deep inspection capabilities.

- **Stateful**

  - Tracks the state of active connections and requests.
  - Inspects packets within the context of the traffic flow.
  - Operates at the transport layer (Layer 4) of the OSI model.
  - More secure than packet filtering, ensures packets are part of a valid session.

- **Dynamic Packet Filtering**

  - Adapts filtering rules dynamically based on traffic patterns.
  - Monitors ongoing connections and updates rules in real-time.
  - Offers higher security by adjusting to current network conditions.
  - More complex and resource-intensive than static packet filtering.

- **Proxy**

  - Acts as an intermediary between users and the internet.
  - Filters requests and responses based on content and protocol.
  - Operates at the application layer (Layer 7) of the OSI model.
  - Can provide caching, content filtering, and access control.


## Types of Proxy 

- **Circuit Level Proxy**

  - Like a SOCKS firewall
  - Operate at Layer 5 (Session layer)

- **Application Level Proxy**

  - Deeper packet inspection
  - Conducts various proxy function for each type of application
  - Best positioned inside of the network, as closely as possible to the application server

- **Kernel Proxy**

  - Known as a "5th Generation Firewall".
  - Minimal impact on network performance but thorough inspects packets across all layers.
  - Uses the operating system's kernel to process and filter packets.
  - Often used in high-throughput environments requiring granular control and speed.
  - Best positioned as close as possible to the application server.

## Evolution of Firewalls 

- **Layer 4 Firewall**

  - Operates at the transport layer of the OSI model.
  - Filters traffic based on TCP/UDP ports and IP addresses.
  - Monitors traffic without inspecting the content of packets.
  - Simple and efficient for basic traffic control.
  - Limited in detecting application-specific attacks.

- **Layer 7 Firewall**

  - Operates at the application layer of the OSI model; application proxy.
  - Inspects, filters, and controls traffic based on the content and context of the application.
  - Detailed control over web and application trafficl.
  - Detect and block application-specific threats.
  - Resource-intensive but offers higher security and functionality compared to lower-layer firewalls.

- **Next Generation Firewall (NGFW)**

  - Combines traditional firewall capabilities with advanced features.
  - Includes deep packet inspection (DPI), also integrates intrusion prevention systems (IPS).
  - Provides application awareness and control; can distinguish types of traffic.
  - Operates fast with minimal network performance impact.
  - Full-stack visibility and granular control over traffic through custom signatures.
  - **Single engine**

- **Unified Threat Management Firewall (UTM)**

  - Also known as **Secure Web Gateway (SWG)**.
  - Consolidates multiple security functions into a single device.
  - Firewall, antivirus, anti-spam, content filtering, and intrusion detection/prevention.
  - Simplifies network security management, ideal for small to medium-sized businesses.
  - Lower upfront costs, maintenance, and power consumption.
  - Becomes single point of failure; if it fails, multiple functions are also lost.
  - **Separate individual engines**

- **Web Application Firewall (WAF)**

  - Specifically designed to protect web applications, focused on HTTP/HTTPS inspection.
  - Defends against common web threats like SQL injection, XSS, and CSRF.
  - Operates at the application layer (Layer 7) of the OSI model.

## WAF Configurations
   
- **Inline Configuration**

  - Device will between the network firewall and the web servers.
  - Prevent live attacks, but slow down web traffic.
  - Can block legitimate traffic by mistake.

- **Out-of-band Configuration**

  - Device receives a mirrored copy of the web server traffic.
  - Non-intrusive way of conducting web application filtering.
  - Cannot block live web traffic, works more of an IDS and then alert on it.

## Access Control Lists 

Access Control Lists (ACLs) is a rule set that is placed on firewalls, routers, and other network infrastructure devices that permit or allow traffice through a particular interface.

- Can also be used to define proper quality of service levels.
- The order in which rules are defined is followed; performed in a top-down manner.
- Specific rules normally at top of the list, more generic rules at the bottom.
- Any action taken should be logged, including all ALLOW and DENY.
- Some ACL includes a DENY ALL rule at the end of the ACL.

Information contained in ACLs:

  - Type 
  - Source 
  - Destination 
  - Action

ACLs can be configured through:

  - Web-based interface 
  - Text-based command line interface
