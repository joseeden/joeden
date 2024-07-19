---
title: "TLS and IPSec"
description: "Transport Layer Security and IP Security"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 54
last_update:
  date: 1/30/2024
---


## TLS 

TLS or Transport Layer Security is a protocol that provides cryptography security for secure data transmission between clients and servers.

- Verifies the identities of communicating parties.
- Ensures data has not been tampered with during transit.
- Commonly used for securing web traffic (HTTPS).
- Works with multiple protocols like HTTP, SMTP, and IMAP.

### TCP 

TLS uses the Transmission Control Protocol (TCP) to establish secure communications between a client and a server.

- TCP has a lot of overhead than UDP connections.
- This can slow down connection.

### DTLS 

Datagram TLS is a UDP-version of TLS protocol that offers that same security level as TLS while maintaining faster operations.

- Less overhead in the UDP protocol.
- Ideal for video streaming over a secure and encrypted tunnel.

## IPSec 

IPSec (Internet Protocol Security) is the most famous protocol used today for establishing VPNs because of its confidentiality, integrity, authentication, and anti-replay operations.

- Encrypts IP packets to secure data transmission.
- Confirms the identity of communicating devices.
- Protects against data modification during transit.
- Can be used for site-to-site and client-to-site VPNs.
- Supports secure communication between hosts (transport) and networks (tunnel).

To secure the communication between two endpoints, we can utilized the following mechanisms:

- Kerberos 
- NTLMv2
- PKI Certificates 
- Pre-Shared Key (PSK)


### Establishing an IPSec Tunnel

1. Request to start Internet Key Exchange (IKE).
    - PC1 Initiates trafffic to PC2.
    - This triggers IPSec tunnel creation by router 1

2. IKE Phase 1 
    - Router 1 and router 2 negotiates security associations for IKE Phase 1.
    - Also known as **ISAKMP Tunnel**

3. IKE Phase 2 
    - Establishes a tunnel within the tunnel.

4. Data Transfer
    - Data can now be securely transferred between PC1 and PC2.

5. Tunnel Termination
    - Tunnel is torn down, deleting IPSec security associations


### IPSec Tunnel Mode

**IPSec Tunnel Mode** secures data transmission between two networks over the internet by encapsulating and encrypting the entire original IP packet within a new IP packet. This ensures both the payload and the original IP header are protected, commonly used in VPNs to create secure connections between gateways.

- Packets are encapsulated within new ones, increasing the actual packet size.
- Ideal for connecting remote networks securely; site-to-site VPNS.
- Secures the entire original IP packet **using packet encapsulation.**

Workaround for the packetsize:

- Drop Max MTU size to 1400 bytes on inner router, then connect to VPN
- Allow jumbo frames, bigger thatn 1500 bytes
- Adjust MTU size to 9000 bytes, not recommended for internet use due to latency issues

At source and destination:

  - **Source side:** Encapsulates the encrypted packet within a new IP packet.
  - **Destination side:** VPN concentrator removes outer header, decrypts content, and routes internally.

### IPSec Transport Mode

**IPSec Transport Mode** secures end-to-end communication between two devices by encrypting only the payload of the IP packet, while leaving the original IP header intact. This mode is commonly used for securing communication between two hosts or between a host and a gateway. 

- Slightly less overhead than Tunnel Mode since only the payload is encrypted.
- Commonly used within a secure network where the IP header does not need encryption.
- Used for end-to-end communication between hosts, e.g. client-to-site VPNs
- Secures the data portion of the IP packet, **no packet encapsulation.**

Packet size:

- Works well when you want to increase packet size, exceeding the MTU size
- **Max Transmission Size (MTU)** - set at only 1500 bytes
- Anything beyond MTU, packet gets fragmented and causes VPN problems.

### Authentication Header (AH)

Authentication Header (AH) offers connectionless data integrity and data origin authentication for IP datagrams using cryptographic hash as identification information.

- Ensures messages is not modified or tampered with.
- Provides protection against replay attacks.
- Uses HMAC-MD5 or HMAC-SHA, to hash the entire packet.
- Does not provide confidentiality of the data itself.

### Encapsulation Security Payload (ESP) 

Encapsulation Security Payload (ESP) provides authentication, integrity, replay protection, and data confidentiality by encrypting the packet's payload.

- Payload can be rewritten inside of an encrypted format.
- Only the payload is encrypted but not the entire packet.
- Protects confidentiality of payload contained within the packet, not the headers.

In tunneling mode, ESP can be used along with authentication headers.

- New IP header is added in front of the packet to cover the hops.
- AH provides integrity for TCP header, ESP encrypts TCP header and payload.

Since the payload is encrypted, some details like the type of traffic, e.g. whether it is TCP or UDP, and the port numbers are hidden. This is all well and good, but it might get blocked by a firewall since the firewall will have to check the traffic type and ports.