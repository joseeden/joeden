---
title: "Tor Browser"
description: "The Onion Router"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 15
last_update:
  date: 1/30/2024
---



## The Onion Router (TOR)

The Tor Browser allows users to browse the internet anonymously by routing traffic through a network of servers.

- Routes traffic through multiple nodes
- Hides user’s IP address and encrypts data multiple times
- Bypasses censorship and access blocked content while protecting privacy

## Perfect Forward Secrecy

Perfect Forward Secrecy (PFS) ensures that encryption keys are not compromised, even if long-term keys are exposed.

- Each session uses a unique key that is not derived from past or future sessions.
- Different session keys prevents decryption of past or future sessions
- Common in secure communication protocols like TLS

## Tor in Action

How it works:

1. Client opens Tor Browser and enters the website URL
2. Tor Browser retrieves available nodes from the directory server
3. Browser selects three or more nodes to route the traffic
4. Each node only knows the previous and next node
5. Client sends request to Node 1, which forwards it to Node 2
6. Node 2 forwards the request to Node 3
7. Node 3 sends the request to the destination server
8. Website sees Node 3 as the source
9. The response follows the same path back to the client
10. The route maintains the client's anonymity

## Request Chain

The request chain in Tor ensures privacy through multiple layers of encryption:

1. Client encrypts request so only Node 3 can read it
2. Client places it in an envelope for Node 3, encrypts it for Node 2
3. Adds another encrypted envelope for Node 1
4. Node 1 forwards the request to Node 2
5. Node 2 decrypts the envelope and sends it to Node 3
6. Node 3 decrypts the final envelope and forwards the request to the website

## Hidden Sites

Hidden sites are websites accessible only via Tor, providing anonymity for both users and servers.

- The server’s location and identity are also concealed.
- Instead of domain names (like google.com), it uses strange URLs (like xyz123abc.onion)
- Ideal for privacy-sensitive activities, like accessing censored information