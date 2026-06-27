---
title: "DHCP"
description: "Dynamic Host Configuration Protocol"
tags: 
- Networking
- DevNet
- CCNA
sidebar_position: 40
last_update:
  date: 5/25/2020
---


## Overview

Dynamic Host Configuration Protocol (DHCP) automatically gives hosts the network settings they need to communicate. Without DHCP, administrators would need to manually configure IP addresses, subnet masks, default gateways, DNS servers, and other options on each device.

## What DHCP Provides

DHCP can provide:

- An IP address.
- A subnet mask or prefix length.
- A default gateway.
- DNS server addresses.
- Other vendor or platform options.

Cisco wireless access points, for example, can use DHCP option 43 to learn the Wireless LAN Controller address they should connect to.

## Allocation Methods

| Method    | Description                                                       |
| --------- | ----------------------------------------------------------------- |
| Automatic | The DHCP server assigns a permanent address to a client.          |
| Dynamic   | The DHCP server leases an address for a limited time.             |
| Manual    | An administrator maps a client to an address and DHCP delivers it. |

## DHCP Relay

DHCP uses broadcast messages at the beginning of the lease process. If the client and server are on different subnets, a DHCP relay agent forwards DHCP messages between them.

<div class='img-center'>

![](/img/docs/devnetdhcprelay.png)

</div>

DHCP uses these ports:

| Direction        | Port |
| ---------------- | ---- |
| Client to server | 67   |
| Server to client | 68   |

## DHCP Operation

The classic DHCP process is often remembered as DORA:

| Step     | Message        | Purpose                                      |
| -------- | -------------- | -------------------------------------------- |
| Discover | DHCPDISCOVER   | Client looks for available DHCP servers.     |
| Offer    | DHCPOFFER      | Server offers an address and lease details.  |
| Request  | DHCPREQUEST    | Client requests one offered lease.           |
| Ack      | DHCPACK        | Server confirms the lease.                   |

<div class='img-center'>

![](/img/docs/devnetcora.png)

</div>

If the selected offer is no longer valid, the server sends a DHCPNAK and the client starts again.

## DHCPv6

DHCPv6 has a similar purpose, but IPv6 clients can also use Router Advertisement messages and Stateless Address Autoconfiguration. DHCPv6 messages include `SOLICIT`, `ADVERTISE`, `INFORMATION REQUEST`, and `REPLY`.
