---
title: "Wireless Security Settings"
description: "Key security protocols and settings include WPA3, AAA, RADIUS, and EAP."
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
- Wireless
sidebar_position: 61
last_update:
  date: 1/30/2024
---



## Wi-Fi Security Standards Comparison

| Feature              | **WEP**              | **WPA**        | **WPA2**                      | **WPA-PSK (Personal)**      | **WPA2-Enterprise**        |
| -------------------- | -------------------- | -------------- | ----------------------------- | --------------------------- | -------------------------- |
| **Encryption**       | RC4                  | TKIP           | AES (CCMP)                    | TKIP or AES                 | AES (CCMP)                 |
| **Authentication**   | Shared key           | PSK            | PSK                           | Pre-Shared Key (passphrase) | 802.1X + RADIUS server     |
| **Security Level**   | Very weak (obsolete) | Weak to medium | Strong                        | Medium to high              | Strong                     |
| **Key Management**   | Static key           | Static key     | Static key                    | Shared key                  | Dynamic per user/session   |
| **Setup Complexity** | Simple               | Simple         | Simple                        | Easy (home use)             | Complex (enterprise-grade) |
| **Recommended?**     | ❌ Not recommended    | ❌ Outdated     | ✅ Yes (if WPA3 not available) | ✅ Yes (for home)            | ✅ Best for organizations   |


## WEP (Wired Equivalent Privacy)

WEP was the first Wi-Fi encryption standard but is now considered insecure and outdated.

- Uses fixed encryption keys shared across all devices
- Available in 64-bit and 128-bit key sizes
- Weak 24-bit initialization vector makes it easy to crack
- No longer recommended for protecting wireless networks


## WPA (Wi-Fi Protected Access)

WPA uses **TKIP (Temporal Key Integrity Protocol)** to generate dynamic keys. 

- Adds message integrity to detect tampering
- Still relies on flawed cryptographic methods
- Insecure, due to insufficient data integrity checks in TKIP.

WPA is more secure than WEP, but not strong enough for modern networks.


## WPA2

WPA2 improved security significantly and became the long-term Wi-Fi standard.

- Replaces TKIP with **AES (Advanced Encryption Standard)** for strong encryption
- Considered secure for many applications, though WPA3 is now preferred.

WPA2 uses **CCMP (Counter Cipher Mode with Block Chaining Message Authentication Code Protocol)** for data integrity and confidentiality.

## WPA2-PSK

WPA2-PSK is the personal-use version of WPA2, commonly used in homes and small businesses.

- Uses a shared passphrase to generate the **Pairwise Master Key (PMK)**
- PMK is the foundation for encrypting communication between device and router

This method is simple to set up, but in this setup, all users share the same key

- Easier to manage but less secure in environments with many users
- Still widely used despite some risks

## WPA2-Enterprise

WPA2-Enterprise is a secure Wi-Fi setup designed for businesses and organizations. It focuses on strong user authentication and network access control.

- Uses 802.1X with a RADIUS server to verify each user
- Assigns a unique encryption key to each session
- More secure than WPA2-PSK, especially for large networks

:::info 

WPA2-Enterprise doesn't directly manage transport-layer security, which is where PEAP and its TLS tunneling come into play.

:::

## WPA3

WPA3 is the latest security protocol for Wi-Fi networks, designed to provide stronger data protection and improve security against attacks.

- Provides improved encryption for safer wireless communication.
- Protects against brute-force password guessing attacks.
- Supports individual encryption per device to enhance privacy.

WPA3 also introduced advanced security features like SAE, Enchanced Open, and AES-GCMP.

### SAE 

This protocol allows both the client and access point to authenticate each other using a shared password, without transmitting the password in plain text or exposing it to potential attackers during the authentication process. 

- Resists offline dictionary attacks
- Provides better security than traditional PSK
- Uses Diffie-Hellman for secure key exchange
- Replaces the vulnerable 4-way handshake used in WPA2

With SAE, even if attacker captures the data required for the handshake, it cannot be used to derive the password or decrypt the session.


#### Password Authenticated Key Exchange (PAKE)

WPA3's SAE method is based on **Password Authenticated Key Exchange (PAKE)** protocol, which ensures secure mutual authentication.

- Both sides confirm knowledge of the password without revealing it
- Protects against attackers trying to guess passwords by observing the exchange


#### Dragonfly Handshake

SAE uses the **Dragonfly handshake**, which includes a MAC address hash to strengthen authentication and resist key recovery.

- Each handshake exchange is unique, even with the same password
- Blocks precomputed dictionary and rainbow table attacks
- Binds authentication to the device’s MAC address
- Makes impersonation and key recovery significantly harder

#### Hash-to-Element (H2E)

WPA3-SAE also utilizes a **Hash-to-Element (H2E)** method for password derivation, which replaced the earlier Hunting-and-Pecking method due to security concerns. 


### Enhanced Open/OWE 

Enhanced Open/OWE (Opportunistic Wireless Encryption) adds encryption to open Wi-Fi networks without passwords.

- Secures communication even without user authentication
- Prevents eavesdropping on public networks
- Improves privacy in cafes, airports, and other open environments


### AES GCMP 

AES-GCMP (Advanced Encryption Standard Galois/Counter Mode Protocol) improves performance and security in WPA3 networks.

  - Supports 128-bit AES for personal networks.
  - Supports 192-bit AES for enterprise networks.
  - Ensures both data confidentiality and integrity.
  - Supports high-efficiency encryption in Wi-Fi networks.

This makes GCMP suitable for high-performance and security-sensitive environments.


### Management Frame Protection

This WPA3 feature secures network management traffic from key recovery attackS.

- Protects against spoofing, tampering, and Denial of Service attacks
- Secures vulnerable frames used to manage Wi-Fi connections
- Prevents attackers from disrupting or impersonating devices


## WPS

Wi-Fi Protected Setup (WPS) is a network security standard that aims to simplify the process of connecting devices to a wireless network, but it has known vulnerabilities.

- Must have a WPS-capable WAPs and devices.
- Press button on both the WAP and device, to create a WPA2-encrypted connection.
- Easy to crack, more and more devices will drop support for it.
- Advisable to disable WPS in favor of stronger security measures like WPA3.

Methods: 

- **Push Button Method** - Users press a physical button on the router to connect devices.
- **PIN Method** - Involves entering an 8-digit PIN, which is susceptible to brute-force attacks.
- **NFC Method** - Connects devices via Near Field Communication; easier access but limited security.


:::info 

WPS (Wi-Fi Protected Setup) is **not a wireless security standard** like WEP, WPA, or WPA2. Instead, it’s a **connection method** designed to simplify the process of connecting devices securely to a Wi-Fi network.

:::

## AAA 

AAA (Authentication, Authorization, and Accounting) is a framework used in network management to control access and usage, ensuring secure network operations.

- Authentication: Verifies the identity of users or devices.
- Authorization: Grants access based on permissions.
- Accounting: Monitors and logs user activities for security auditing.

For more information, please see [AAA of Security](/docs/007-Cybersecurity/000-Security-Foundations/003-AAA-of-Security.md)

## RADIUS

RADIUS (Remote Authentication Dial-In User Service) is a protocol used for network access authentication, authorization, and accounting, commonly employed in enterprise networks.

- Widely used to manage network access for employees, contractors, and guests.
- Enhances security by providing a secure method for authentication.

For more information, please see [RADIUS](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#radius)

## TACACS+

TACACS+ (Terminal Access Controller Access-Control System Plus) separates the functions of AAA to allow for a more granular control over processes.

- Similar to RADIUS, but allows for more detailed control over AAA functions.
- This level of separation permits the distinct handling of each component across different services.
- Uses TCP and encrypts authentication for improved security over older AAA protocols.

For more information, please see [TACACS+](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#tacacs)


## EAP 

EAP (Extensible Authentication Protocol) is a flexible authentication framework frequently used in network access control, providing various methods for secure authentication.

- Supports multiple authentication methods, including passwords and certificates.
- Facilitates secure access in enterprise networks.
- Commonly used in wireless networks for enhanced security.

For more information, please see [EAP Variants](/docs/007-Cybersecurity/004-Infrastructure-and-Network/020-Authentication-Protocols.md#eap)

