---
title: "Wireless Attacks"
tags: [Cybersecurity]
sidebar_position: 9
last_update:
  date: 1/30/2024
---



## Overview

Wireless attacks target vulnerabilities in wireless networks to disrupt service or gain unauthorized access.

## Jamming and Interference

Jamming and interference occur when a strong or disruptive signal overwhelms a wireless network, making communication difficult or impossible.

- Denial of Service attacks are easy on wireless networks by flooding the airwaves
- The radio spectrum is open but limited, making it vulnerable to interference
- The loudest signal dominates, overpowering legitimate transmissions


:::info 

**Wireless Jamming** involves transmitting signals on the same frequency to disrupt wireless communication, degrading the effectiveness of a wireless network. 

To defend against this, **frequency hopping** spreads the signal across many frequencies, making it harder for jammers to block the entire connection.

:::



## War Driving

War driving involves searching for Wi-Fi networks by driving around with software that detects and collects data on nearby networks.

- War drivers use software to capture information like network names and security types
- This data can be combined with GPS to map the locations of Wi-Fi networks

Common tools:

- iStumbler
- wigle.net

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


## Rogue Access Points (Rogue WAPs)

Rogue Access Points are unauthorized wireless devices connected to a secure network without approval. These devices pose a serious security threat because they can be used to intercept, monitor, or bypass security controls.

- Often set up by attackers to bypass controls or create backdoors.
- Sensitive data may be captured or redirected through the rogue device.
- Can be used to launch man-in-the-middle attacks or steal credentials

To help prevent rogue WAPs, organizations should regularly conduct audits and use **wireless intrusion detection systems (WIDS)** to identify and remove unauthorized access points.

## Evil Twin

An evil twin is a **type of a rogue access point**, but goes a step further in that it is a malicious device that attempts to get users to join it instead of the real WAPs that are used by an organization. 

- Fake Wi-Fi network with the same SSID as a trusted network.
- Users unknowingly connect to the rogue access point.
- Attackers then capture sensitive information like passwords and emails.
- Often used in phishing attacks to steal login credentials.

Karma toolkit: 

- Automates the evil twin process
- Searches for adjacent networks
- Creates a matching fake network
- Redirects traffic to phony sites and captures credentials
