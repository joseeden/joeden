---
title: "Network Attacks"
tags: [Cybersecurity]
sidebar_position: 7
last_update:
  date: 1/30/2024
---



## Man-in-the-Middle

Intercepting and possibly altering communication between two parties.

**Mitigations:**

- **Encryption**: Use HTTPS, SSL/TLS, and VPNs.
- **Public Key Infrastructure (PKI)**: Verify certificate authenticity.
- **Secure Authentication**: Implement multifactor authentication.
- **Network Segmentation**: Limit access to sensitive systems.
- **IDS/IPS**: Monitor for suspicious network activity.

## Packet Sniffing

Illegally intercepting and examining unencrypted data packets.

**Mitigations:**

- **Encryption**: Secure data in transit with HTTPS or VPNs.
- **Secure Wi-Fi**: Use WPA3 for wireless networks.
- **Network Segmentation**: Restrict access to sensitive data.
- **Network Monitoring**: Detect unauthorized packet sniffing.


## Oversized Packet Attack 

Oversized packet attacks involve sending data packets that exceed the maximum allowable size, exploiting vulnerabilities in network protocols.   

**Mitigations:**

- **Packet Size Limits**: Enforce maximum packet sizes.
- **Network Monitoring**: Detect oversized packet patterns.
- **Rate Limiting**: Limit large packets.
- **Firewall Rules**: Block unusually large packets.

## Fragmented Packet Attack 

Fragmented packet attacks involve breaking down data into smaller fragments to bypass network security measures, exploiting vulnerabilities in reassembly processes.

**Mitigations:**

- **Reassembly Timeouts**: Set timeouts for reassembly.
- **Fragmentation Limits**: Limit fragment size and count.
- **IDS/IPS**: Detect unusual fragmentation.
- **Secure Protocols**: Use protocols that handle fragmentation securely.

## Reverse Shell

A reverse shell is a malicious connection where the target machine initiates a connection to the attacker's machine, allowing remote control over the target system. This technique bypasses firewalls that block incoming connections but allow outbound ones.

- Attackers establish a connection from the victim's machine to their own, avoiding security controls.
- Methods include exploiting vulnerabilities or using social engineering to run malicious code.

**Mitigations:**

- Implement egress filtering to control outbound connections.
- Regularly update and patch software to fix exploitable vulnerabilities.

Sample diagram:

![](/img/docs/sec+-reverse-shell-diagram.png)