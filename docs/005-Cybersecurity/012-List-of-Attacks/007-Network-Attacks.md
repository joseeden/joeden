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


## Christmas Tree Packet Attack 

Packets are the basic unit of network communications. Every time information is transferred over the network, it is divided up into small packets of information that are then reassembled once they reach the destination system.

- Packets contain data payload to be sent, but also includes header information
- Packet headers are like "envelopes" that carry the data
- Headers include information such as source, destination, and flags 

Flags are single-bit fields that contain either a `1` or a `0`. If a field is set to `1`, it indicates a special purpose packet. As an example, if the SYN flag is set to `1`, a connection is established, while a FIN flag set to `1` means connection is tear down.

A typical packet only has one or two flags set to a value of `1`.

<div class='img-center'>

![](/img/docs/networking-basics-packet-flags-set-to-one.png)

</div>

In a christmas tree packet, all of the flags are set to `1`. It is simlar to having a "christmas tree" all lit up.

![](/img/docs/networking-basics-packet-flags-set-to-one-christmas-tree.png)

Attackers send this kind of packet because some systems crash when they receive a christmas tree packets. These systems may have  apoorly designed network stack that can't handle the packet when all the flags are set to a value of `1`.

- All flags set to `1` are similar to a denial of service attack.
- Attackers can determine the type of OS depending on the response of the server.
- Useful for conducting pre-attack reconnaissance.


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