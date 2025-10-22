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

4G is a wireless communication standard that provides faster internet, better coverage, and lower delays than older generations.

- Supports mobile apps on phones, tablets, and other devices
- Uses LTE for high-speed data transfer
- Enables smooth VoIP, video calls, and online streaming

4G uses radio frequencies for data transmission:

- **Narrowband**

  - Short range
  - Suitable for low data and simple communication

- **Broadband**

  - Longer range
  - Handles multiple high-speed data streams at once

While 4G improves performance, it also introduces new risks that must be managed:

- **Firmware Over-the-Air (OTA) Updates**

  - Devices receive updates remotely without user action
  - If not properly secured, attackers could spoof or tamper with updates
  - Requires secure channels and digital signatures to verify update authenticity



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

## VDI (Virtual Desktop Infrastructure)

**VDI (Virtual Desktop Infrastructure)** allows users to access a **virtual desktop** that is hosted on company-owned infrastructure. This setup ensures:

- Data stays within the company environment (not on the offshore user's device)
- No need to issue physical hardware to offshore teams
- Secure access to resources via controlled, isolated sessions

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
    - **Jailbreaking** - Similar with rooting, but for Apple devices. See [Mobile Vulnerabilities.](/docs/007-Cybersecurity/050-Threats-and-Attacks/012-Mobile-Vulnerabilities.md#jailbreaking-and-rooting)

## SIM Cards 

Subscribe Identity Modules (SIM) cards authenticates device to carrier network. It contains the following data:

- Carrier subscription data
- SIM Card serial number
- Phone contacts (if not in the cloud)

## Carrier Unlocking

Carrier unlocking involves removing restrictions set by a carrier to allow the phone to be used on different networks.

- Switching between mobile providers
- Does not affect app installation or security controls

## Mobile Security 

### Mobile Security Controls

Setting up solid security on mobile devices helps keep personal and sensitive data safe. Here are the key controls you should enable: 

- **Access Control Mechanisms**  

  - Every mobile device should have passcodes or biometrics.
  - Passcodes: Default is often a 4-digit pin, but it's weak.
  - Strong Passwords: Use complex passwords like on computers.

- **Biometric Authentication**  

  - Some devices offer fingerprint or facial recognition to ease access.
  - Apple’s Touch ID: Common for iOS devices.
  - Android: Fingerprint options available but less common.

- **Encryption**  

  - Encrypt data on your device to protect it if lost or stolen.
  - iOS and Android: Enable encryption by setting a password.
  - Default since: Android Gingerbread and iOS 8.

- **Remote Wipe**  

  - Enable remote wiping to erase data if your device is lost.
  - Works if the device is connected to a network.
  - Available on both Android and iOS.

- **Screen Lock and Inactivity Timeout**  

  - Set your device to lock automatically after inactivity.
  - Limits access if the device is idle.
  - Locks out users after multiple incorrect passcode attempts.

- **Posture Checks**

  - Checks device security before granting access.
  - Ensures devices meet compliance antivirus and patches.
  - Enforce patching and screen lock policies.
  - Confirms signatures and firewall settings.
  - If device fails checks, device is placed on a quarantine VLAN.
  - Quarantined device will be patched and then rechecked


### Mobile Asset Deployments

For more information, please see [Mobile Asset Deployments.](/docs/007-Cybersecurity/029-Security-Operations/073-Mobile-Asset-Deployments.md)

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

For more information, please see [Mobile Assets Deployments.](/docs/007-Cybersecurity/029-Security-Operations/073-Mobile-Asset-Deployments.md)


### Mobile Device Management 

Mobile Device Management (MDM) enables organizations to manage and secure mobile devices across various platforms (smartphones, tablets).

- Enforces alphanumeric passcodes and encryption.
- Disables unused features to enhance security.
- Remote wipe functionality for lost or stolen devices.
- Revokes access quickly when employees leave.
- Disable a device's ability to sideload programs.
- Detect if a device has been jailbroken or rooted.
- Force each device to use a VPN connection.

MDM also allows admins to control the applications installed on devices, enhancing security and productivity.

- **Blacklist approach**: Prohibits specific apps; users can install any others.
- **Whitelist approach**: Only allows specified apps; all others are blocked.

MDM solutions like Google Mobile Management provide tools to configure network and device settings remotely.

- Add and configure Wi-Fi networks across multiple devices
- Push updates without user intervention
- Control synchronization, passwords, and encryption settings

### Content Management

Content management is a security control that restricts access to inappropriate websites and can block certain content types, such as images in emails.

- Enforces corporate content policies on mobile devices  
- Helps prevent data leaks and policy violations off-campus

### Device Tracking 

- **Impact of Lost or Stolen Devices**
   - When devices are lost or stolen, organizations face two types of losses:
      - Loss of the physical device (financial cost).
      - Potential loss of data if encryption isn’t enabled.

- **Device Costs**
   - High-end devices can cost over $1,000, making their loss significant.
   - Over 3.1 million mobile devices are stolen annually in the U.S.

- **Asset Tracking Software**
   - Helps organizations manage the lifecycle of computing assets.
   - Covers smartphones, laptops, desktops, servers, and printers.
   - Often integrated with device management or IT service management solutions.

- **Lifecycle Management**
   - Asset tracking software covers the entire lifecycle of a device:
      - Includes initial request, ordering, receiving, and configuration.
      - Applies security policies and labels devices as organizational property.
      - Assigns devices to users and reassigns as needed.
      - Ensures secure decommissioning by removing data and discarding devices.

- **Real-Time Tracking for Certain Industries**
   - Some industries, like delivery services, use GPS tracking to:
      - Manage driver performance.
      - Optimize routes.

- **Privacy Concerns with GPS Tracking**
   - Organizations must disclose GPS tracking to employees.
   - Implement access restrictions to GPS data.
   - Provide the ability to disable tracking outside of working hours.
   - Establish clear policies on the use of location data.

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


