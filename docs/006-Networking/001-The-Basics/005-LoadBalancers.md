---
title: "LoadBalancers"
description: "Distributing traffic across devices"
tags: 
- Networking
- Cybersecurity
sidebar_position: 5
last_update:
  date: 1/16/2019
---


## Overview

Load Balancers prevent overloading of any single resource by distributing the incoming network traffic traffic across multiple servers.

- Provide high availability by redirecting traffic during server failures.
- Balance loads based on various algorithms, such as round-robin or least connections.
- Improve response times and optimize resource usage.

## Concepts

- **Session Persistence**

  - User sessions are consistently directed to the same server in a load-balanced environment.
  - Useful for applications where user session state must be maintained across multiple requests.
  - Often implemented through cookies or session IDs that are recognized by the load balancer.

- **Round-robin**

  - Incoming requests are distributed sequentially to each server in a set.
  - No server-specific criteria are considered; each server gets an equal share of traffic.
  - Effective for evenly distributed, stateless applications.

- **Least Connections**

  - Directs traffic to the server with the fewest active connections.
  - BalanceS load more effectively, where some servers may be faster or more capable.
  - Can be more efficient in handling sessions that require significant processing power.

- **Weighted Value**

  - Uses predefined weights assigned to each server based on capacity or performance.
  - Higher weights meant servers can handle more traffic or have better performance capabilities.
  - Allows for more fine-tuned control over how traffic is distributed across servers.

## Security Functions 

- **SSL Certificate Management**
  
  - Handles the encryption of data exchanged between servers and clients
  - Manages certificate issuance, renewal, and revocation
  - Ensures secure data transmission by encrypting and decrypting traffic

- **URL Filtering**

  - Controls access to specific web resources based on URL patterns
  - Blocks or allows traffic based on predefined URL rules
  - Helps prevent access to malicious or inappropriate websites

- **Other Web Application Security Tasks**

  - Protection against web-based attacks such as SQL injection and [cross-site scripting (XSS)](/docs/007-Cybersecurity/012-List-of-Attacks/099-Other-Attacks.md)
  - Monitors and analyzes traffic for suspicious behavior
  - Implements application firewalls to block unauthorized access

## Application Delivery Controllers

Application Delivery Controllers (ADCs) are network devices that enhance the performance and reliability of applications delivered over the internet or intranet.

- Advanced form of a load balancer; can optimize application delivery
- Load balancing, SSL termination, content caching, and HTTP compression
- Integrated firewall and DDoS protection

