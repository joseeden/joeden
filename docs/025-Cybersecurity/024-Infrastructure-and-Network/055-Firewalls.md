---
title: "Firewalls"
description: "Firewalls - Its uses and types"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 55
last_update:
  date: 1/30/2024
---


## Overview 

Firewalls safeguard networks by monitoring and controlling traffic based on predefined security rules.

- Hardware-based or software installed on the client or server
- By placing in front of the network segment, it creates a **screened subnet.**

Often placed between the router and the internet, firewalls evaluate anything crossing the network perimeter.

<div class='img-center'>

![](/img/docs/networking-basics-devices-fiewallssss.png)

</div>


## Connecting Three Networks

Firewalls often connect three networks: the internet, the internal network, and a DMZ (demilitarized zone).

<div class='img-center'>

![](/img/docs/networking-basics-devices-firewalls-connect-three-networksss.png)

</div>

## Demilitarized Zone

A Demilitarized Zone (DMZ) is an isolated network area for outside visitors.

- Also called "screened subnets"
- Hosts public servers like web, email, and file servers
- Provides a buffer zone between the internal network and the internet

By separating public-facing services from the internal network, the DMZ helps protect sensitive internal systems from potential external threats. Any unauthorized access or attacks are contained within the DMZ, reducing the risk to the internal network.

<div class="img-center">

![](/img/docs/security-dmz-simplified-dmz-diagrammm.png)

</div>

## Concepts

- **Screened Subnet** 

  - Also known as a **Dual-homed Host Configuration**.
  - Acts a protective barrier between external untrusted networks and internal trusted networks.
  - Often equipped with a packet-filtering firewall or other security mechanisms.

- **In-depth Inspection**

  - A firewall with in-depth inspection may slow down due to time taken.
  - Each packet goes through all the rules, increasing the network latency.
  - On the other hand, less depth inspection can mean less security.

- **Stateful Inspection**

  - Stateful Inspection Tracks the state of active connections.
  - It makes filtering decisions based on the context of traffic.
  - It Monitors incoming and outgoing traffic over time.
  - It More dynamic than simple packet filtering.

- **Implicit Deny Rule**

  - Blocks all network traffic by default unless explicitly allowed by other rules.
  - It ensures that only authorized traffic is permitted.
  - Reduces the risk of unauthorized access by denying unlisted traffic.


## Firewall Rules 

Firewall rules define how the firewall should act when it sees a new connection request. The firewall consults a list of rule maintained by the system administrator. Iif it finds a rule that matches the description of the attempted connection, it then follows the action specified by that rule.

- If there's no explicit instructions, it follows the default deny principle.
- The default deny principle blocks the traffic.

Firewall administrators must watch for rule configuration errors. Rule sets will often contain hundreds of rules and the security professional should be able manage those rules correctly. Some of the common rule errors are:

- Shadowed Rules
- Promiscuous Rules

### Shadowed Rules

Shadowed Rules occurs when there is a rule that will never be executed because of its order of placement. Remember that firewall rules are executed in a top-down approach. This means it will check the first on the list first, then proceed to the next rules below it until it reach a match.

As an example, we may have the following rules defining the traffic via port 80. We want to deny traffic going to 1.2.3.4 on TCP port 80. But since the first rule is a permissive rule, the traffic will be allowed and the specific deny rule will never be executed.

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-shadowed-rulesss.png)

</div>

To fix this error, we can rearrange the rule set so that the more specific rule will appear first on the list. This will ensure that any traffic going to 1.2.3.4 via port 80 will be denied, while the rest of the traffic through port 80 will be allowed.

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-shadowed-rulesss-fixed.png)

</div>

### Promiscuous Rules

Promiscuous rules allows more rules than necessary. This could be a result of poorly designed firewall rules, a lack of understanding of how firewall rules works, or a simple typo error which could result to too much access being allowed. 

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-shadowed-rulesss.png)

</div>

This is similar to a permissive rules being placed in before a restrictive rule. To fix this, we can remove any overly permissive rules to ensure that only the required access is allowed.

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-promiscuous-fixed.png)

</div>


### Orphaned Rules

Orphaned rules allow access to decommissioned systems or services. This occurs when a device or a system is removed but the rules associated with that system was never removed. In some instance, this rules lead to a *black hole* because some traffic may still be going to the destination IP address specified in the rule but the traffic is just going to the void. 

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-orphaned-rulesss.png)

</div>

Another challenge that orphaned rules present is the previous IP address may be reused in the future. A previously created ALLOW rule intended for the decommissioned device may unintentionally allow access to the newly installed device. 

<div class='img-center'>

![](/img/docs/networking-basics-firewall-rules-orphaned-rulesss-unintentionally-allowing-access.png)

</div>





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


:::info[NOTE]

ACL does a **stateless inspection**, while Firewall handles a **stateful inspection**. 

The ACL will only look at a packet and will not have anything to do with the conversation that this packet belongs to. 

The firewall will analyze whether there is a proper beginning (Encapsulation) for the packets to pass through.

:::


## Types of Firewall 

### Virtual Firewall 

A virtual firewall is a security control that runs inside a virtual environment to watch and filter traffic between virtual machines. It works like a firewall inside the hypervisor so it can inspect activity that never reaches the physical network.

- Filters traffic between virtual machines
- Can run as a standalone virtual appliance
- Can be built directly into the hypervisor
- Protects workloads that share the same physical host
- Helps enforce security in cloud and virtualized setups

Virtual firewalls give visibility into communication that stays inside the virtual platform, making them useful for controlling traffic that physical firewalls cannot see.


### Packet Filtering

Packet filtering firewalls offer a basic level of security by inspecting only the packet headers.

- Most efficient, maximizes throughput with minimal processing
- Filters based on IP addresses, ports, and protocols
- Operates at Layer 4 (Network Layer) of the OSI model
- Simple and fast but lacks deep packet inspection

Any packet arriving from outside the network that claims to have an internal source address should be blocked. Attackers often spoof packets by changing the source IP to look like it came from inside the network. Since no real external packet should ever use an internal IP, the firewall should reject it immediately.

### Stateful Firewall

Stateful firewalls enhance security by tracking active connections and the state of network traffic.

  - Monitors the state of connections for more context-aware filtering
  - Inspects packets within the flow of the connection
  - Operates at Layer 4 (Transport Layer) of the OSI model
  - More secure than packet filtering, ensures packets belong to a valid session

### Dynamic Packet Filtering

Dynamic packet filtering firewalls adjust their filtering rules in real-time based on network activity.

  - Modifies filtering rules dynamically in response to traffic patterns
  - Monitors ongoing connections and adapts rules accordingly
  - Provides higher security by responding to changing conditions
  - More resource-intensive and complex than static packet filtering

### Proxy

Proxy firewalls act as intermediaries, inspecting and filtering traffic at a deeper level.

  - Filters requests and responses at the application level (Layer 7)
  - Provides content filtering, caching, and access control
  - Operates as an intermediary between users and the internet
  - Offers detailed inspection but can slow down traffic due to processing

## Evolution of Firewalls

### Layer 4 Firewall

Layer 4 firewalls focus on controlling traffic based on transport-layer information like TCP/UDP ports.

  - Filters traffic based on IP addresses and port numbers
  - Operates at the transport layer of the OSI model
  - Simple and efficient for basic traffic filtering
  - Limited in detecting application-specific threats

### Layer 7 Firewall

Layer 7 firewalls provide deeper inspection by analyzing the content of the traffic at the application layer.

  - Controls traffic based on the content and context of the application
  - Operates at the application layer of the OSI model
  - Offers detailed control over web and application traffic
  - Detects and blocks application-specific threats, though resource-intensive

### Next Generation Firewall (NGFW)

Next Generation Firewalls combine traditional firewall functions from older types of firewalls with advanced security features.

  - Integrates deep packet inspection (DPI) and intrusion prevention systems (IPS)
  - Provides application awareness and traffic control
  - Operates with minimal impact on network performance
  - Offers full-stack visibility and granular control using a single engine

### Unified Threat Management Firewall (UTM)

Unified Threat Management firewalls consolidate multiple security functions into a single device.

  - Known as **Secure Web Gateways (SWG)**
  - Combines firewall, antivirus, content filtering, and intrusion prevention
  - Ideal for small to medium-sized businesses with simplified management
  - Lower cost and maintenance but can be a single point of failure with separate engines

Basic UTM functions:

- Protecting network against attacks
- Blocking unsolicited traffic
- Routing traffic to and from the internet

Additional security features:

- VPN connectivity
- Intrusion detection
- Intrusion prevention

Small business features:

- URL filtering 
- Content inspection 
- Malware inspection 
- Email and spam filtering

## Web Application Firewall (WAF)

Web Application Firewalls (WAF) are specialized firewalls designed to protect web applications.

  - Focuses on HTTP/HTTPS traffic to defend against common web threats
  - Operates at Layer 7 (Application Layer) of the OSI model
  - Protects against SQL injection, XSS, CSRF, and other web vulnerabilities

### WAF Configurations
   
- **Inline Configuration**

  - Device will between the network firewall and the web servers.
  - Prevent live attacks, but slow down web traffic.
  - Can block legitimate traffic by mistake.

- **Out-of-band Configuration**

  - Device receives a mirrored copy of the web server traffic.
  - Non-intrusive way of conducting web application filtering.
  - Cannot block live web traffic, works more of an IDS and then alert on it.


### Reverse Proxy for WAF with SSL

When a WAF protects a website over SSL (HTTPS), it needs to decrypt the traffic to inspect it. This means the WAF has to terminate the SSL connection between the client and itself.

- The WAF then acts as a **reverse proxy**
- It accepts incoming HTTPS requests and decrypts them
- To decrypt SSL traffic, it requires the **decryption certificate**
- WAF inspects for/blocks malicious content, and then re-encrypts traffic 

Without the reverse proxy setup, the WAF wouldn’t see decrypted traffic and couldn’t inspect it properly.