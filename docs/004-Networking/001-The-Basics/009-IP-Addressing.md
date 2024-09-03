---
title: "IP Addressing"
description: "Learn the basics of Networking"
tags: [Networking,Cybersecurity]
sidebar_position: 9
last_update:
  date: 1/30/2024
---


## Overview

IP addressing is used to assign unique identifiers to devices on a network, allowing them to communicate with each other. Each IP address consists of a set of numbers that identify both the network and the specific device (host) on that network.

- 32-bit numbers, usually represented in dotted decimal format
- 128-bit, designed to accommodate more devices with a larger address space
- Used for routing data packets to their correct destination across networks

### Dotted Quad Notation

Dotted quad notation is a way of representing IPv4 addresses as four decimal numbers separated by periods, each representing 8 bits of the address. For example, the IP address `192.168.1.10` is written in dotted quad notation.

- `192.168` - network address
- 1.10 - host address

Note: The division between the network and host address can vary, depending on the network's configuration.

### Source and Destination

Source and destination IP addresses indicate where a packet is coming from and where it is going. These addresses guide the routing of data across networks.

- They play a crucial role in directing traffic on the internet
- The roles can be interchanged depending on the direction of communication

### IPv6

IPv6 is the most recent version of the Internet Protocol, designed to replace IPv4. It provides a vastly larger address space to accommodate the growing number of internet-connected devices.

- IPv6 addresses are 128-bit, represented as eight groups of four hexadecimal digits
- No need for Network Address Translation (NAT), IPv6 provides unique address for each device
- It includes built-in security features and improved routing efficiency

An example of an IPv6 address is:

```bash 
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

This address is divided into eight groups of four hexadecimal digits, separated by colons. Each group represents 16 bits of the 128-bit IPv6 address. 

For simplicity, leading zeros in each group can be omitted, so the address can also be written as:

`2001:db8:85a3::8a2e:370:7334`

The double colon (`::`) represents a consecutive group of zeroes that can be compressed to save space.


## Types of IP Addresses 

### Public IP Address

Public IP addresses are globally unique and used for communication over the internet.

- Assigned by ISPs and required for accessing the internet.
- Can be static (permanent) or dynamic (temporary).
- Exposes devices directly to the internet, requiring robust security measures.

### Private IP Addresses

Private IP addresses are used within private networks, not routable on the internet.

- Assigned to devices within a local network (e.g., home or office).
- Conserve public IP addresses, allows multiple devices to share one public IP via NAT.
- Commonly used in LANs to facilitate communication within the network.

Private IP Addresses have the following types:

| **Class**     | **IP Range**                  | **Usage**                             | **Number of IP Addresses**       |
|---------------|-------------------------------|---------------------------------------|----------------------------------|
| **Class A**   | 10.0.0.0 - 10.255.255.255     | Large networks                        | Over 16 million                  |
| **Class B**   | 172.16.0.0 - 172.31.255.255   | Medium-sized networks                 | Over 1 million                   |
| **Class C**   | 192.168.0.0 - 192.168.255.255 | Small networks (e.g., home networks)  | Up to 65,536                  |
| **Class D**   | 224.0.0.0 - 239.255.255.255   | Multicast groups (e.g., streaming, video conferencing) | N/A |