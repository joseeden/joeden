---
title: "Networking Devices"
description: "Routers, switches, WAPs, and Firewalls"
tags: [Networking,Cybersecurity]
sidebar_position: 4
last_update:
  date: 1/30/2024
---

## Switches

Switches are networking devices that connect multiple devices within a local area network (LAN).

- They direct data between devices within the network
- Typically hidden in wiring closets
- Each switch port connects to one end of a network cable

The cables run through conduits, connecting to Ethernet jacks (wall jacks) throughout the building.

<div class='img-center'>

![](/img/docs/networking-basics-devices-switchesss.png)

</div>


## WAPs

Some devices connect to the network wirelessly via Wireless Access Points (WAPs). These WAPs are connected to switches and create Wi-Fi networks, sending and receiving signals to and from mobile devices.

<div class='img-center'>

![](/img/docs/networking-basics-devices-wapssss.png)

</div>


## Routers

Routers are devices that direct data between different networks, ensuring it reaches its correct destination.

- They connect LANs to the internet or other networks
- They determine the best path for data to travel across networks
- They often include firewall and network management features

**Core routers** act as the core of your network communication. They handle high-volume data packets and enable forwarding between the connected networks. They do not communicate with the external world, such as the internet.

<div class='img-center'>

![](/img/docs/networking-basics-devices-routerss-and-core-routerss.png)

</div>


## Firewalls

Firewalls are security devices that monitor and control network traffic based on predefined rules.

- They block or allow traffic to protect networks from unauthorized access
- Firewalls can filter both inbound and outbound traffic

Often placed between the router and the internet, firewalls evaluate anything crossing the network perimeter.

<div class='img-center'>

![](/img/docs/networking-basics-devices-fiewallssss.png)

</div>

### Connecting Three Networks

Firewalls often connect three networks: the internet, the internal network, and a DMZ (demilitarized zone).

<div class='img-center'>

![](/img/docs/networking-basics-devices-firewalls-connect-three-networksss.png)

</div>


### The DMZ

The DMZ isolates systems that face higher risks of compromise.  

- Adds an extra layer of protection for internal networks 
- Separates potentially vulnerable systems.  

For more information, please see [DMZ](/docs/005-Cybersecurity/003-Security-Architecture/051-Securing-the-Network.md#demilitarized-zone).


### Stateful Inspection

Stateful inspection tracks the state of active connections and makes filtering decisions based on the context of traffic.

- Monitors incoming and outgoing traffic over time
- More dynamic than simple packet filtering

For more information, please see [Types of Firewalls.](/docs/005-Cybersecurity/003-Security-Architecture/055-Firewalls.md#types-of-firewall)


### Firewall Rule Contents

Firewall rules define how traffic is managed. It typically contains the following:

- Source system address
- Destination system address
- Destination port and protocol
- Action (allow or deny)

For more information, please see [Access Control Lists (ACLs).](/docs/005-Cybersecurity/003-Security-Architecture/055-Firewalls.md#access-control-lists)


### Implicit Deny Rule

The implicit deny rule is a security principle that blocks all network traffic by default unless explicitly allowed by other rules.

- It ensures that only authorized traffic is permitted
- Reduces the risk of unauthorized access by denying unlisted traffic

### Web Application Firewall

A Web Application Firewall (WAF) specifically protects web applications by filtering and monitoring HTTP/HTTPS traffic.

- It blocks common web attacks like SQL injection and cross-site scripting (XSS)
- WAFs add a layer of protection between the web application and the internet, safeguarding against potential vulnerabilities

For more information, please see [WAFs.](/docs/005-Cybersecurity/003-Security-Architecture/055-Firewalls.md#evolution-of-firewalls)