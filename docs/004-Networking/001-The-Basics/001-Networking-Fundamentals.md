---
title: "Networking Fundamentals"
description: "Learn the basics of Networking"
tags: [Networking,Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Network 

A network refers to the connection of two or more computers for the purpose of sharing data, information, or resources.

- **Local Area Network (LAN)**
   - Typically spans a single floor or building.
   - Limited geographical area.

- **Wide Area Network (WAN)**
   - Encompasses long-distance connections between geographically remote networks.

## Ethernet

Ethernet (IEEE 802.3) is a standard that defines wired connections of networked devices. This standard defines the way data is formatted over the wire to ensure disparate devices can communicate over the same cables.

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


## IP Addressing

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

## Wifi 

Widely adopted for its easy deployment and cost-effectiveness, wireless networking provides versatility, enabling devices to roam freely within signal range. 

- **Wi-Fi Evolution**
    - Evolving over time with faster updated versions, Wi-Fi continues to improve its performance.

- **Security Considerations**
    - Despite its benefits, wireless networks introduce additional vulnerabilities. Unlike wired networks, intrusions can occur remotely, without physical access to the network.


![](/img/docs/security-wifi.png)


## Virtual Local Area Network

**VLANs** are created by switches to logically segments a network without altering physical topology. 

**VLAN Trunking** is when you have VLANs spanning multiple switches to extend the reach of that VLAN.

- Corporate Network:
    - Departments like HR, Finance, and IT each on separate VLANs.
- Guest Wi-Fi:
    - Isolate guest devices from internal network using a dedicated VLAN.
- Voice over IP (VoIP):
    - Separate VLAN for VoIP traffic to prioritize voice communication.
- Server Farm:
    - Different VLANs for web servers, database servers, ensuring segmentation.

Sample diagram:

<div class="img-center">

![](/img/docs/security-vlan-simplifieddd.png)


</div>


## Quality of Service 

Quality of Service (QoS) refers to the technology that allows the network to prioritize certain types of traffic over others. 

- Prioritizes critical traffic like VoIP or video conferencing.
- Uses mechanisms like classes of service (CoS), packet classification, and traffic shaping.


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


