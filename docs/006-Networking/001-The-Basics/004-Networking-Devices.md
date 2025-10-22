---
title: "Network Devices"
description: "Routers, switches, WAPs, and Firewalls"
tags: 
- Networking
- Cybersecurity
sidebar_position: 4
last_update:
  date: 1/16/2018
---


## Network Hubs

Hubs are basic networking devices that broadcast data to all connected devices without distinguishing between them.

- Connect multiple devices in a network, commonly found in home networks
- Less intelligent compared to switches or routers

With a network hub, all network traffic is always flooded to all hub ports; it is a **single broadcast domain** and cannot be configured otherwise

<div class='img-center'>

![](/img/docs/06072025-network-hubs-2.jpeg)

</div>


## Network Bridges

A **network bridge** is a device that connects two or more network segments, allowing them to function as a single network.

- Each segment becomes its own collision domain
- Filters and forwards traffic based on MAC addresses.
- Does not route packets between different networks or broadcast domains

A bridge can be used to create network segments, or collision domains, but **it cannot create multiple broadcast domains**.

<div class='img-center'>

![](/img/docs/06072025-network_bridge.jpg)

</div>


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

For more information, please see [WAPs.](/docs/006-Networking/001-The-Basics/060-Wireless-Networking.md)

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

## Servers

Servers are powerful computers that manage and deliver resources or services to other devices on a network.

- Provides information to other computers on a network
- Common types include web servers, email servers, print servers, database servers, and file servers
- Secured differently than workstations

<div class='img-center'>

![](/img/docs/06072025-servers.jpg)

</div>


## Endpoints

Endpoints are the devices that act as the source or destination of network communication.

- Ends of a network communication link
- One end often at a server with a resource, the other end a client making a request
- Can be servers, desktops, laptops, tablets, mobile phones, or other end-user devices

<div class='img-center'>

![](/img/docs/06072025-endpoint-devices.PNG)

</div>


## Network Sensors

Network sensors are devices that continuously monitor network traffic to identify and report on anomalies and potential security threats.

- Devices or software agents deployed within a network 
- Collect data for analysis and reporting
- Integrate with other security systems to automate alerts and responses

Types of Network Sensors:

- **Intrusion Detection Systems (IDS)**
   Passive sensors that alert when threats are detected.

- **Intrusion Prevention Systems (IPS)**
   Active sensors that can also block traffic.

- **Flow Sensors**
   Monitor metadata (e.g., NetFlow, sFlow) instead of full packet contents.

- **Packet Capture (PCAP) Sensors**
   Collect full packet data for in-depth analysis.

<div class='img-center'>

![](/img/docs/06072025-network-sensors.PNG)

</div>


## Jump Servers

Jump servers, also known as "jump boxes," provide a secure and controlled environment for administrators to perform network tasks.

- Serve as secure access points for admin tasks
- Isolate administrative activities from regular network traffic
- Log and monitor all administrative actions for auditing purposes
- Usually host a range of tools and scripts for system administrators

<div class='img-center'>

![](/img/docs/06072025-jump-servers.PNG)

</div>

## Firewalls

Firewalls are security devices that monitor and control network traffic based on predefined rules.

- They block or allow traffic to protect networks from unauthorized access
- Firewalls can filter both inbound and outbound traffic

For more information, please see [Firewalls.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/055-Firewalls.md)

<div class='img-center'>

![](/img/docs/06072025-hw-fw.PNG)

</div>
