---
title: "Mobile Systems"
description: "The different types of mobile communications systems"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 59
last_update:
  date: 1/30/2024
---

## Overview

Mobile Device Wireless Communications:

- GPS (Global Positioning Systems) - Uses satellites to track where an object is
- Infrared - Legacy, line-of-sight wireless communications
- Cellular - Phone calls or SMS/text messages
- WIFI 
- Bluetooth 
- Near Field Communication (NFC)    

## Technology 

### GPS 

GPS (Global Positioning System) is a satellite-based navigation system that provides precise location and time information to users worldwide. It consists of a network of satellites orbiting the Earth and user receivers that calculate their position using signals from these satellites. 

- Widely used for navigation, mapping, location-based services, and precise timing applications.
- Devices receive signals from multiple satellites to calculate their position using trilateration.
- **Trilateration:** Measures distance to at least four satellites to determine latitude, longitude, altitude, and time.

Security Implications:

  - **Spoofing:** Signals can be spoofed, leading to false location information.
  - **Jamming:** Deliberate interference can disrupt GPS signals, affecting navigation and timing.
  - **Privacy Concerns:** Location data from GPS can be exploited for surveillance or tracking purposes.
  - **Cyberattacks:** Vulnerabilities in GPS infrastructure could be exploited for cyberattacks on critical systems or infrastructure.
  - **Dependency:** Reliance on GPS for critical functions can pose risks if the system becomes unavailable or inaccurate.


### Cellular 4G

4G, or fourth-generation, cellular technology is a wireless communication standard that offers faster data speeds, improved reliability, and enhanced capabilities compared to previous generations. 

- Wide range of mobile applications on smartphones, tablets, and other connected devices. 

- Uses advanced technologies such as LTE (Long-Term Evolution) to deliver data rates.

- Increased bandwidth, lower latency, and support for VoIP and video conferencing. 
- Uses radio frequencies:

    - **Narrow-band**   
        - short-range
    
    - **Broadband** 
        - Wide-range 
        - Multiple transmissions at the same time

Security Implications:

- Firmware Over-the-air (OTA) updates


### Cellular 5G

5G, or fifth-generation, cellular technology is the latest standard in wireless communication, succeeding 4G. 5G networks leverage advanced technologies such as millimeter-wave frequencies, massive MIMO (Multiple Input Multiple Output), and network slicing to deliver high-bandwidth, low-latency connectivity for a wide range of applications.

- High data speeds, up to 10 Gbps.
- Cells are smaller than 4G, meaning transmission range is up to 2km.
- Base stations use fiber connections.
- Requires 5G capable devices.

Security Implications of 5G:

- Larger attack surface for cybercriminals to exploit.
- User privacy and data protection concerns on massive data transmitted over 5G networks
- Over-reliance on equipment from potentially untrusted vendors.

### WiFi Direct 

WiFi Direct is a peer-to-peer wireless technology that allows devices to connect and communicate with each other directly, without the need for a traditional WiFi network or internet connection. 

- Useful for sharing files, streaming media, or playing multiplayer games
- Does not use a wireless router, no internet connectivity.

## Mobile Device Tethering 

Mobile device tethering, also known as mobile hotspot or internet sharing, allows a smartphone or tablet to share its cellular data connection with other devices such as laptops, tablets, or gaming consoles.

- Additional data usage charges from the mobile carrier may be incurred.
- Battery life can also be easily drained.
- Setting mobile device as a wireless hotspot
- For wired connection, use **USB Tethering** or **USB On-the-go (OTG)**

## Mobile Device Constraints 

- Limited CPU and Battery
    - Limited power 
    - Use lightweight cryptography like ECC
    - ECC uses a smaller key size
    - The more computations you do, the more you drain the battery

- Limited transmission range
    - Affects wireless devices 

- Limited device access 

    - **Rooting** - Breaking into android devices, to have full access or root access 
    - **Jailbreaking** - Similar with rooting, but for Apple devices

## SIM Cards 

Subscribe Identity Modules (SIM) cards authenticates device to carrier network. It contains the following data:

- Carrier subscription data
- SIM Card serial number
- Phone contacts (if not in the cloud)

**Carrier Unlock**

- Reuse device on a different carrier network
- Switching between mobile providers

## Mobile Security 

For more information, please see [Mobile Asset Deployments.](../008-Security-Operations/073-Mobile-Asset-Deployments.md)

- **Bring your own device (BYOD)**
    - Employee uses personal device for work
    - IT department applies centralized policy 

- **Choose your own device (CYOD)**
    - Company offers a selection of devices
    - Employee can choose from these devices

- **Corporate-owned personally enabled (COPE)**    
    - Phone issued by the company
    - Can be used for work purposes, and for personal use
    - Device can be partitioned (containers) for personal and corporate apps 

### Hardening Mobile Devices

- **Mobile Device Management**
    - For organizations, management at scale through [Mobile Device Management.](#mobile-device-management)
    - Employees' device just need to be registered.
    
- **Sideloading** 
    - Instead of installing app from the app store, use the actual packages.
    - Security risk, attacker can install app which allow them full access to the phone.

- **SE Android**    
    - Mobile functions are limited.
    - Security clearance is needed to use the device.
    - Used in stringent, high-security environments.

- **Unified Endpoint Management**
    - Can be used to deploy FW settings on smartphones
    - Centrally deploy virus updates, install apps, etc.

- **Others**

    - Reduce the attack surface
    - Disabling bluetooth, WIFI, or NFC 
    - Use strong authentication  
    - Enable full device encryption


### Mobile Device Management 

Mobile Device Management (MDM) enables organizations to manage and secure mobile devices across various platforms (smartphones, tablets).

- Allows remote management and wiping of devices for data protection.
- Tracks device usage and location for monitoring and control.
- Enforce configuration to ensure devices are meeting the security benchmarks.
- Enforces security policies to enhance device security.
- Lowers risks tied to unsecured or outdated devices.

Example features:

- Disable a device's ability to sideload programs.
- Detect if a device has been jailbroken or rooted.
- Force each device to use a VPN connection.

