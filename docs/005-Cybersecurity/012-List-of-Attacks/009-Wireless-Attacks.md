---
title: "Wireless Attacks"
tags: [Cybersecurity]
sidebar_position: 9
last_update:
  date: 1/30/2024
---



## Overview

Wireless attacks target vulnerabilities in wireless networks to disrupt service or gain unauthorized access.

## Deauthentication and Deassociation

Deauthentication and deassociation attacks force devices to disconnect from a wireless network.

- Exploits the deauthentication frame in the 802.11 protocol.
- Disrupts network connectivity for users.
- Can be used to capture WPA/WPA2 handshakes for brute-force attacks.
- Commonly used in denial-of-service (DoS) attacks on Wi-Fi networks.

**Summary steps:**

1. Discover Access Points

  - Need to know the AP MAC address and the channel it is listening on.
  - This can easily be found through **airodump**, which is built-in to Kali Linux.

2. Discover connected clients.

  - Find connected clients or clients that are in the process of connecting.
  - The goal is to capture the wireless traffic while client is authenticating.
  - Record the MAC address of the client that is authenticating to the wireless network.

3. Disconnect active client from AP.

  - Tools can be used, like **aireplay** which is built-in to Kali Linux.
  - Need to specify the MAC address of both the client and the AP.

4. Monitor client-AP handshake.

  - When victim client is disconnected, it will try to reconnect to the wireless network.
  - Capture the traffic.

5. Perform online/offline dictionary or brute-force attack.

  - The goal is to determine the pre-shared key (PSK).
  - A text file containing a long list of common passphrases can be used.

## Evil Twin

Evil Twin attacks involve setting up a rogue access point that mimics a legitimate one to intercept data.

- Attackers create a fake Wi-Fi network with the same SSID as a trusted network.
- Users unknowingly connect to the rogue access point.
- Allows attackers to capture sensitive information like passwords and emails.
- Often used in phishing attacks to steal login credentials.