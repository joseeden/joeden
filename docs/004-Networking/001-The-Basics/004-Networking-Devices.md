---
title: "Network Devices"
description: "Routers, switches, WAPs, and Firewalls"
tags: [Networking,Cybersecurity]
sidebar_position: 4
last_update:
  date: 1/30/2024
---


## Hubs

Hubs are basic networking devices that broadcast data to all connected devices without distinguishing between them.

- Connect multiple devices in a network, commonly found in home networks
- Less intelligent compared to switches or routers

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

For more information, please see [WAPs.](/docs/004-Networking/001-The-Basics/060-Wireless-Networking.md)

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

## Endpoints

Endpoints are the devices that act as the source or destination of network communication.

- Ends of a network communication link
- One end often at a server with a resource, the other end a client making a request
- Can be servers, desktops, laptops, tablets, mobile phones, or other end-user devices

## Network Sensors

Network sensors are devices that continuously monitor network traffic to identify and report on anomalies and potential security threats.

- Monitor network traffic and detect anomalies and potential threats in real-time
- Collect data for analysis and reporting
- Integrate with other security systems to automate alerts and responses

## Jump Servers

Jump servers, also known as "jump boxes," provide a secure and controlled environment for administrators to perform network tasks.

- Serve as secure access points for admin tasks
- Isolate administrative activities from regular network traffic
- Log and monitor all administrative actions for auditing purposes
- Usually host a range of tools and scripts for system administrators

## Firewalls

Firewalls are security devices that monitor and control network traffic based on predefined rules.

- They block or allow traffic to protect networks from unauthorized access
- Firewalls can filter both inbound and outbound traffic

For more information, please see [Firewalls.](/docs/005-Cybersecurity/003-Security-Architecture/055-Firewalls.md)