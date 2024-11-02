---
title: "Wireless Networking"
description: "wireless Networking"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering, Wireless]
sidebar_position: 60
last_update:
  date: 1/30/2024
---


## Overview 

**Wireless Networking** is a method of connecting computers, smartphones, and other devices to a network without using physical cables. Instead of using wired connections like Ethernet, wireless networks have wireless access points (WAPs) that uses radio waves or infrared signals to transmit data.

- WAPs are central hubs that broadcast signals, allowing devices to connect.
- Client devices have built-in wireless adapters that can connect to these signals.
- Data is transmitted over air through radio frequencies (in the case of Wi-Fi)

To protect the data being transmitted, wireless networks use encryption methods such as WPA2 or WPA3. This ensures that only authorized devices can connect and that data remains private.


## WI-FI

Wi-Fi is a technology that allows devices to connect to the internet wirelessly using radio waves.

- Enables connections between devices like laptops, smartphones, and tablets without cables.
- Wi-Fi networks are created by routers or access points that broadcast signals.
- Wi-Fi networks use encryption methods like WPA2 or WPA3 to secure data.
- Coverage can be affected by distance and obstacles.
- Modern routers often support multiple frequency bands for better performance.

Common Wi-Fi standards:

| **Wi-Fi Standard** | **Name**         | **Frequency Bands** | **Maximum Speed** | **Typical Use**                       |
|--------------------|------------------|---------------------|-------------------|--------------------------------------|
| 802.11b            | Wi-Fi 1          | 2.4 GHz             | 11 Mbps           | Basic internet access                |
| 802.11g            | Wi-Fi 2          | 2.4 GHz             | 54 Mbps           | Improved speed and range             |
| 802.11n            | Wi-Fi 4          | 2.4 GHz / 5 GHz     | 600 Mbps          | Better speed and range, dual-band    |
| 802.11ac           | Wi-Fi 5          | 5 GHz               | 1.3 Gbps          | High-speed internet, improved efficiency |
| 802.11ax           | Wi-Fi 6          | 2.4 GHz / 5 GHz     | 9.6 Gbps          | Faster speeds, better performance in crowded areas |
| 802.11be           | Wi-Fi 7          | 2.4 GHz / 5 GHz / 6 GHz | 30 Gbps        | Upcoming standard with ultra-fast speeds and low latency |


## WAPs

Wireless Access Points (WAPs) extend a wireless network's coverage by broadcasting a signal from a wired connection.

- They create a Wi-Fi network to connect devices like laptops and smartphones.
- WAPs are often used to improve coverage in large areas or buildings.
- They can be standalone devices or integrated into routers.
- Security features include encryption to protect data.
- Modern WAPs support dual-band frequencies and mesh networking for better performance.

These WAPs are connected to switches and create Wi-Fi networks, sending and receiving signals to and from mobile devices.

<div class='img-center'>

![](/img/docs/networking-basics-devices-wapssss.png)

</div>


## SSID

SSID stands for Service Set Identifier and is the name of a wireless network.

- It identifies and allows devices to connect to the network.
- SSIDs are broadcast by routers and are visible to nearby devices.
- They can be customized for different networks.
- SSIDs can be public or hidden; hidden ones require manual entry.
- Multiple SSIDs can be used in mesh networks.

There an option to disable SSID broadcasting to "hide" network in plain sight. In private networks, you can configure your devices to connect to the network automatically and skip the entire SSID broadcasting process. This is not fool-proof, but it prevents casual observers from seeing your network.


## MAC Filtering

MAC filtering restricts network access based on a device's unique MAC address. A MAC (Media Access Control) address is a 12-digit identifier assigned to network devices, ensuring communication within a local network.

- Verifies the MAC address before granting network access  
- Only pre-approved MAC addresses are allowed to connect  
- Enhances security but can be bypassed through MAC spoofing  

- Managing lists of MAC addresses can be time-consuming in large networks  
- Commonly used in home or small business networks for added protection  
- More effective when combined with encryption methods like WPA3

There are two main problems in MAC filtering:

- **Time-consuming**: Continuously adding devices (that always change) to the network can be a burden
- **Ineffective**: MAC filtering cannot block skilled attackers who can change their MAC address 


## Wireless Encryption

Wireless encryption and cryptographic protocols protect wireless networks and safeguards it from unauthorized access by securing data from interception.

- **WEP (Wired Equivalent Privacy)**
  - Old security standard, vulnerable to attacks.
  - Uses a fixed 64-bit or 128-bit key, insecure due to weak 24-bit initialization vector.

- **WPA (Wi-Fi Protected Access)**
  - Improved over WEP with TKIP for better security.
  - Still considered weak compared to WPA2 and WPA3.

- **WPA2**
  - Uses AES encryption with CCMP for stronger security.
  - Secure but being replaced by WPA3.

- **WPA3**
  - Latest standard with AES GCMP encryption.
  - Introduces SAE and enhanced cryptographic protocols.

For more information, please see [Wireless Encryption.](/docs/007-Cybersecurity/003-Security-Architecture/060-Wireless-Security.md#wep-and-wpa)


## Wireless Authentication 

Wireless authentication verifies the identity of users before allowing them to connect to a network.

- Ensures only authorized users can access the network
- Protects against unauthorized access and potential security breaches
- Uses various methods depending on the level of security and network size

There are three primary mechanisms to authenticate the users in a wireless networks:

- Preshared Keys (PSK)
- Enterprise Authentication
- Captive Portals

### Preshared Keys (PSK)

Preshared Keys (PSK) uses a shared password to authenticate all devices on a network. It provides a simple way to secure small networks like home Wi-Fi.

- All users share the same key, making management easy but less secure.
- To connect to the network, users need to enter the password which is a 8-16 characters.
- The network uses PBKDF2 to convert the PSK to a 256-bit encryption key.
- Vulnerable to attacks if the key is exposed or shared widely.

Limitations of PSKs:

- Each time encryption key, all previously connected devices needs to be reconfigured with new key.
- Shared key meant its difficult to identify users, making it difficult to revoke individual access.

### Enterprise Authentication

Enterprise Authentication uses unique credentials for each user, verified through a central authentication server like RADIUS. It offers stronger security for larger networks.

- Instead of a shared key, users enter a username and password.
- Ideal for organizations needing role-based access and individual accountability.
- Supports advanced features like encryption and multifactor authentication.

For more information, please see [EAP.](/docs/007-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#eap)

### Captive Portals

Captive Portals require users to log in via a web page before accessing the network, often used in public spaces like airports or hotels.

- Users are redirected to an authorization page
- Can be used for guest access, payment systems, or terms acceptance
- Allows network operators to control access and track usage


## Wireless Signal Propagation

Wireless signal propagation refers to how wireless signals travel through the air from one point to another. The strength and quality of the signal can be affected by obstacles, distance, and interference.

- Signals weaken over distance and can be obstructed by walls or other barriers
- Environmental factors like metal objects, water, or other wireless devices can interfere with signal strength

### Antenna

The type of antenna used can influence signal patterns and coverage areas.

- **Omnidirectional antennas** broadcast signals in all directions, ideal for covering large areas with multiple devices
- **Directional antennas** focus the signal in a specific direction, providing stronger coverage over longer distances

### Beamforming

Beamforming improves wireless signal strength by focusing the signal toward a specific device rather than broadcasting it in all directions.

- Reduces interference and improves signal quality for targeted devices
- Often used in modern Wi-Fi standards to enhance performance in crowded environments

### Site Survey

A site survey assesses the environment to optimize wireless signal placement and coverage.

- Identifies obstacles and areas with weak signals to adjust equipment placement
- Helps ensure reliable coverage and minimize interference in complex environments

For more information, please see [Site Surveys](/docs/007-Cybersecurity/003-Security-Architecture/060-Wireless-Security.md#site-survey)