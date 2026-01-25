---
title: "TLS and IPSec"
description: "Transport Layer Security and IP Security"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 54
last_update:
  date: 1/30/2024
---


## Encryption Methods

Encryption methods protect data in different ways depending on where and how the data travels.

- **End-to-end encryption**

  - Encrypts data from the sender to the receiver
  - Only the endpoints can read the data
  - Encryption protects the content
  - Metadata may be visible during transit

- **Tunnel encryption**

  - Encrypts traffic between client and VPN gateway
  - Secures specific traffic over untrusted networks
  - Physical communication link is not fully protected

- **Transport encryption**

  - Encrypts data between two network points (client to server)
  - Can secure specific applications or sessions
  - Metadata outside the session may remain exposed

- **Link encryption**

  - Encrypts all data on a physical link, including headers
  - Secures entire communications channel between two points
  - Stronger security for the transport layer 


:::info 

Link encryption ensures that **everything on the communication channel is protected**, which makes it ideal for securing data at the physical network level.

:::

## TLS 

**Transport Layer Security** is a protocol that provides cryptography security for secure data transmission between clients and servers.

- Verifies the identities of communicating parties.
- Ensures data has not been tampered with during transit.
- Commonly used for securing web traffic (HTTPS).
- Works with multiple protocols like HTTP, SMTP, and IMAP.

**TLS is not a cryptographic algorithm itself**. It is only a protocol that depends on other cryptographic algorithms. TLS relies on pairings of encryption and hash functions known as **cipher suites.**

- We cannot encrypt directly with TLS
- Use TLS to apply other encryption algorithms

:::info 

**Padding Oracle on Downgraded Legacy Encryption (POODLE)** was a man-in-the-middle attack that showed TLS was superior to SSL by forcing  modern clients (browsers) and servers (websites) to downgrade the security protocol from TLSv1 to SSLv3. 

:::


### TLS Handshake

TLS handshake establishes a secure session between client and server.

1. Client sends supported cipher suites to server
2. Server selects a matching cipher suite and sends its digital certificate
3. Client verifies the certificate using the Certificate Authority (CA)
4. Client generates a symmetric **session key** and encrypts it with the server’s public key
5. Server decrypts the session key with its private key
6. Both client and server use the session key for secure communication
7. Session key is destroyed when session ends

:::info[NOTE]

Session keys are also known as **ephemeral keys.**

:::


### TCP 

TLS uses the **Transmission Control Protocol (TCP)** to establish secure communications between a client and a server.

- TCP has a lot of overhead than UDP connections.
- This can slow down connection.

### DTLS 

**Datagram TLS** is a UDP-version of TLS protocol that offers that same security level as TLS while maintaining faster operations.

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

- [Kerberos](/docs/025-Cybersecurity/024-Infrastructure-and-Network/020-Authentication-Protocols.md#kerberos)
- [NTLMv2](/docs/025-Cybersecurity/024-Infrastructure-and-Network/020-Authentication-Protocols.md#ntlm)
- [PKI Certificates](/docs/025-Cybersecurity/025-Cryptography/035-PKI.md)
- [Pre-Shared Key (PSK)](/docs/025-Cybersecurity/024-Infrastructure-and-Network/061-Wireless-Security-Settings.md#wpa2-psk-pre-shared-key)

:::info[High Assurance Internet Protocol Encryptor]

The U.S. National Security Agency (NSA) uses a specialized protocol encryptor built on IPSec, called a **High Assurance Internet Protocol Encryptor (HAIPE)**.

HAIPE is a Type 1 encryption system that extends IPSec with stricter controls and added security features. HAIPE devices act as secure gateways, enabling two protected network enclaves to safely communicate across untrusted or lower-classification networks.


:::

## Establishing an IPSec Tunnel

1. **Initiate IKE Request**

    - PC1 starts traffic to PC2
    - Router 1 begins IPSec tunnel creation

2. **IKE Phase 1**

    - Routers negotiate security associations
    - Forms a secure *ISAKMP tunnel* for further communication

3. **IKE Phase 2**

    - Creates an inner IPSec tunnel for actual data
    - Defines encryption and authentication parameters

4. **Data Transfer**

    - Encrypted data flows securely between PC1 and PC2
    - Maintains confidentiality and integrity during transit

5. **Tunnel Termination**

    - IPSec tunnel is closed
    - Security associations are removed and resources freed

## IPSec Modes

### Tunnel Mode (Site to Site)

**IPSec Tunnel Mode** secures data transmission between two networks **over the internet** by encapsulating and encrypting the entire original IP packet within a new IP packet. This ensures both the payload and the original IP header are protected.

- Entire IP packets are encapsulated within new ones.
- Encapsulation increases the actual packet size.
- Ideal for remote networks like **site-to-site VPNS**.

Workaround for the packet size:

- Drop Max MTU size to 1400 bytes on inner router, then connect to VPN
- Enable jumbo frames larger than 1500 bytes if the network allows
- Increase MTU up to 9000 bytes, but avoid on the internet due to  latency

At source and destination:

- **Source side:** Encapsulates the encrypted packet within a new IP packet.
- **Destination side:** VPN concentrator removes outer header, decrypts content, and routes internally.

### Transport Mode (Host to Host)

**IPSec Transport Mode** secures end-to-end communication between two devices by encrypting only the payload of the IP packet, while leaving the original IP header intact. 

- Secures the data portion of the IP packet, **no packet encapsulation.**
- Used between two hosts or between a host and a gateway. 
- Less overhead than Tunnel Mode since only payload is encrypted.
- Used for end-to-end hosts communication, e.g. **client-to-site VPNs**

Packet size:

- When you want to increase packet size, exceeding the MTU size
- **Max Transmission Size (MTU)** limited to only 1500 bytes
- Anything beyond MTU, packet gets fragmented and causes VPN problems.


## IPSec Ports 

IPSec VPNs **do not use TCP ports** like typical applications. Instead, they use specific **protocols and port numbers** at the IP layer.

**Note:** These protocols might be **blocked by firewalls** if they're not explicitly allowed, which is why IPSec VPNs may fail if the firewall only allows TCP ports.

| **Protocol/Service**                       | **Protocol Type**         | **Port/Protocol Number** |
| ------------------------------------------ | ------------------------- | ------------------------ |
| ISAKMP (IKE Phase 1)                       | UDP                       | Port **500**             |
| IPSec ESP (Encapsulating Security Payload) | IP Protocol (not TCP/UDP) | Protocol **50**          |
| IPSec AH (Authentication Header)           | IP Protocol (not TCP/UDP) | Protocol **51**          |
| NAT-T (NAT Traversal)                      | UDP                       | Port **4500**            |


## IPSec Protocols

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

:::info[NOTE]

**ESP can be used together with AH** to provide confidentiality for packet payloads and integrity verification for the entire packet, including the header.

:::
