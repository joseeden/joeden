---
title: "Wireless Security"
description: "Securing wireless infrastructure"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering, Wireless]
sidebar_position: 60
last_update:
  date: 1/30/2024
---


## Overview

Wireless infrastructure security is crucial for protecting networks from unauthorized access and cyber threats. Effective security measures ensure the integrity, confidentiality, and availability of wireless communications. 

### Securing WAPs

Wireless access points (WAPs) extend a wireless network's coverage by broadcasting a signal from a wired connection. For more information, please see [WAPs.](/docs/006-Networking/001-The-Basics/060-Wireless-Networking.md)

To secure WAPs:

- Implement strong encryption protocols (WPA3) to secure wireless communications.
- Regularly update firmware to protect against vulnerabilities.
- Configure strong, unique passwords and disable default settings.
- Use MAC address filtering to control device access.
- Monitor wireless network traffic for suspicious activities.
- Position access points strategically to minimize unauthorized physical access.

### Placements of WAPs

Strategic placement of wireless access points (WAPs) is vital for optimizing network performance and ensuring security. The positioning of the WAPs will significantly impact the range, coverage, and signal strength of your organization's wireless network.

- Position WAPs centrally to provide even coverage and minimize dead zones.
- Avoid placing WAPs near external walls to reduce signal leakage outside the building.
- External wall-mounted uninidirectional antenna only broadcasts signal inwards the facility.
- Install WAPs at a height to prevent physical tampering.
- Use signal strength mapping tools to identify optimal placement locations.
- Ensure adequate coverage in high-traffic areas to maintain performance.
- Consider potential sources of interference, such as microwaves and other electronic devices

### ESS Configuration

An Extended Service Set (ESS) configuration extends wireless coverage by interconnecting multiple wireless access points (WAPs) to provide seamless connectivity across a larger area. Proper configuration ensures efficient network performance and robust security.

- **SSID Management**
  - Use a consistent SSID for all access points to enable seamless roaming.
  - Hide SSID broadcast to enhance security.
  
- **Channel Assignment**
  - Configure non-overlapping channels to minimize interference.
  - Utilize automatic channel selection features if available.
  
- **Security Settings**
  - Apply strong encryption methods (WPA3) across all access points.
  - Implement consistent security policies and access controls.
  
- **Load Balancing**
  - Distribute client connections evenly across access points to prevent overload.
  - Adjust power settings to manage coverage and client distribution.
  
- **Roaming Optimization**
  - Enable fast roaming protocols (802.11r) to improve client handoff between access points.
  - Configure access points to support seamless transition without connection drops.
  
- **Monitoring and Maintenance**
  - Regularly monitor network performance and signal strength.
  - Schedule periodic maintenance and firmware updates for all access points.

Sample diagram of an ESS Configuration with three access points.


<div class="img-center">

![](/img/docs/sec+-wap-ess-configuration.png)


</div>


### Interference Considerations

When deploying multiple wireless access points in an ESS configuration, interference must be carefully managed. Interference can degrade signal quality and reduce network efficiency, and there are only a limited number of channels that most wireless access points can use.

- **Co-Channel Interference**

    - Multiple WAPs in the same area, operate on the same channel or frequency bands
    - Reduces overall network throughput as devices contend for the same channel.
    - Signals between WAPs collide, requiring the data to be re-transmitted.
    - Re-transmission of data slows down the network since additional traffic is added.
    - Mitigate by using proper channel planning and spacing out access points.

- **Adjacent Channel Interference**

    - Happens when access points operate on overlapping channels.
    - Causes signal overlap and interference, reducing network performance.
    - Avoid by selecting non-overlapping channels (e.g., 1, 6, 11 in the 2.4 GHz band).
    


    
<div class="img-center">

    ![](/img/docs/sec+-adjacent-channel-interference-diagram.png)
    

</div>



### Site Survey

Conducting a site survey is important for optimizing the placement and configuration of wireless access points. It helps identify potential interference sources, assess signal strength, and ensure comprehensive coverage.

- Evaluate physical environment and identify obstacles.
- Measure existing signal strength and coverage areas.
- Identify sources of potential interference (e.g., microwaves, neighboring networks).
- Determine optimal locations for access points.

### Heat Map

A heat map visually represents the signal strength and coverage of wireless access points within a specific area. It is an invaluable tool for planning and optimizing wireless networks.

- Displays areas of strong and weak signal coverage.
- Highlights potential dead zones and areas needing improvement.
- Assists in identifying interference sources and their impact on coverage.
- Aids in optimal placement of access points for maximum coverage and performance.
- Provides a clear visual aid for stakeholders to understand network performance.

Sample heat map:


<div class="img-center">

![](/img/docs/sec+-sample-heat-map-diagram.png)


</div>


### Wi-Fi Discovery and Mapping 

Wi-Fi discovery and mapping involve techniques used to locate and document the presence and details of Wi-Fi networks. These methods can range from ground-based activities to aerial searches, each serving different purposes and scales of mapping.

- **War-chalking**

  - Involves marking public spaces to indicate the presence of Wi-Fi networks.
  - Symbols are often drawn with chalk on sidewalks, walls, or other visible surfaces.
  - The symbols convey information about the network's availability and security.
  - It helps others locate and understand the types of Wi-Fi networks in the area.

- **War-driving**

  - Searching for Wi-Fi networks by driving around in a vehicle equipped with a Wi-Fi-enabled device. 
  - The goal is to map out the locations and details of wireless networks.
  - A laptop, smartphone, or other device with Wi-Fi capability is used.
  - The device typically runs software that detects and logs Wi-Fi network details.
  - The gathered data can include SSIDs, signal strength, and security types.

- **War-flying**

  - Similar to war-driving but involves searching for Wi-Fi networks from an aircraft.
  - This method can cover larger areas more quickly than ground-based methods.
  - Networks are detected and logged as the aircraft flies over different areas, e.g. drones.
  - Allows for  mapping of Wi-Fi networks over extensive regions, e.g. remote, less accessible areas.


## Wireless Security Settings 

Key security protocols and settings include WPA3, AAA, RADIUS, and EAP.

### WEP and WPA

Wireless encryption and cryptographic protocols protect wireless networks and safeguards it from unauthorized access by securing data from interception.

- **WEP (Wired Equivalent Privacy)**
  - Outdated 1999 wireless security standard, meant to match wired LAN security.
  - Provides basic encryption but is not recommended due to security flaws.
  - Uses a fixed encryption key for all devices on the same network to secure messages.
  - WEP encryption keys comes in 64-bit and 128-bit key sizes.
  - Insecure, because of the weak 24-bit initialization vector.

- **WPA (Wi-Fi Protected Access)**
  - An improvement over WEP, offering better security features.
  - Features TKIP (Temporal Key Integrity Protocol) for enhanced data protection.
  - Still considered less secure compared to WPA2 and WPA3.
  - Insecure, because of insufficient data integrity checks in TKIP.

- **WPA2**
  - WPA enhancement, with robust encryption using AES (Advanced Encryption Standard).
  - **CCMP** - Counter Cipher Mode with Block Chaining Message Authentication Code Protocol.
  - Considered secure for many applications, though WPA3 is now preferred.

- **WPA3**
  - Latest standard, using AES GCMP for robust encryption.
  - Introduces SAE, Enhanced Open, and updated cryptographic protocols.

### WPA3

WPA3 is the latest security protocol for Wi-Fi networks, designed to provide stronger data protection and improve security against attacks.

- Provides improved encryption for safer wireless communication.
- Protects against brute-force password guessing attacks.
- Supports individual encryption per device to enhance privacy.

WPA3 also introduced advanced security features:

- **SAE (Simultaneous Authentication of Equals)**
  - A more secure password-based authentication mechanism.
  - Designed to resist offline dictionary attacks.
  - Provides improved security over the traditional PSK method.
  - Replaced the 4-way handshake with a protocol based on the Diffie-Helman key agreement.
  - Even if attacker captures the data required for the handshake, the data is unusable.

- **Enhanced Open/OWE (Opportunistic Wireless Encryption)**
  - Enables encryption even on open networks without requiring a password.
  - Protects data in transit against eavesdropping.
  - Increases privacy on open Wi-Fi networks.

- **AES GCMP (Advanced Encryption Standard Galois/Counter Mode Protocol)**
  - Supports 128-bit AES for personal networks.
  - Supports 192-bit AES for enterprise networks.
  - Ensures both data confidentiality and integrity.
  - Supports high-efficiency encryption in Wi-Fi networks.

- **Management Frame Protection**
  - Secures management frames from key recovery attacks. 
  - Prevents eavesdropping, forging, and tampering.
  - Protects against threats like spoofing and Denial of Service (DoS) attacks.
  - Enhances the overall security of the Wi-Fi network management.

### AAA 

AAA (Authentication, Authorization, and Accounting) is a framework used in network management to control access and usage, ensuring secure network operations.

- Authentication: Verifies the identity of users or devices.
- Authorization: Grants access based on permissions.
- Accounting: Monitors and logs user activities for security auditing.

For more information, please see [AAA of Security](/docs/007-Cybersecurity/001-Security-and-Risk-Management/003-AAA-of-Security.md)

### RADIUS

RADIUS (Remote Authentication Dial-In User Service) is a protocol used for network access authentication, authorization, and accounting, commonly employed in enterprise networks.

- Widely used to manage network access for employees, contractors, and guests.
- Enhances security by providing a secure method for authentication.

For more information, please see [RADIUS](/docs/007-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#radius)

### TACACS+

TACACS+ (Terminal Access Controller Access-Control System Plus) separates the functions of AAA to allow for a more granular control over processes.

- Similar to RADIUS, but allows for more detailed control over AAA functions.
- This level of separation permits the distinct handling of each component across different services.
- Uses TCP and encrypts authentication for improved security over older AAA protocols.

For more information, please see [TACACS+](/docs/007-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#tacacs)


### EAP 

EAP (Extensible Authentication Protocol) is a flexible authentication framework frequently used in network access control, providing various methods for secure authentication.

- Supports multiple authentication methods, including passwords and certificates.
- Facilitates secure access in enterprise networks.
- Commonly used in wireless networks for enhanced security.

For more information, please see [EAP Variants](/docs/007-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#eap)

### WPS

Wi-Fi Protected Setup (WPS) is a network security standard that aims to simplify the process of connecting devices to a wireless network, but it has known vulnerabilities.

- Must have a WPS-capable WAPs and devices.
- Press button on both the WAP and device, to create a WPA2-encrypted connection.
- Easy to crack, more and more devices will drop support for it.
- Advisable to disable WPS in favor of stronger security measures like WPA3.

Methods: 

- **Push Button Method** - Users press a physical button on the router to connect devices.
- **PIN Method** - Involves entering an 8-digit PIN, which is susceptible to brute-force attacks.
- **NFC Method** - Connects devices via Near Field Communication; easier access but limited security.

