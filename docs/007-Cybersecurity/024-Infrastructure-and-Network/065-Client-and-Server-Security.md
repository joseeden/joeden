---
title: "Client and Server Security"
description: "Security issues on each side"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 65
last_update:
  date: 1/30/2024
---

## Client Security Issues

Client security issues arise from vulnerabilities on the user's end, such as malware infections, outdated software, or weak authentication practices.

- Exposed to phishing, malware, and unauthorized access
- Compromised clients can leak sensitive data or become entry points for attacks

### Applet

An applet is a small Java program that runs inside a web browser to provide interactive content.

- Applets were widely used but are now outdated
- Can execute arbitrary code in the browser, leading to risks
- Java's sandbox limits applet access to system resources
- Security experts recommend avoiding applets due to vulnerabilities

### Local Cache

A cache is temporary storage for frequently accessed data, reducing lookup times and server load.

- Browsers use cache to store web pages and DNS information
- Cached data can be targeted or accessed by attackers
- Chrome’s DNS cache can be viewed and cleared at `chrome://net-internals/#dns`

### Cache Poisoning Attacks

Cache poisoning involves attackers inserting malicious data into a cache.

- DNS and web caches are common targets
- Can lead to malicious redirects or system compromise

Mitigation:

- Using [DNSSEC](/docs/007-Cybersecurity/024-Infrastructure-and-Network/062-DNS-and-Web-Security.md#dnssec) and encrypted protocols
- Clear cache regularly

## Server Security Issues

Server security issues occur when vulnerabilities on the server side are exploited, such as unpatched software, weak access controls, or improper configurations.

- Exposed to data breaches, denial of service (DoS), and unauthorized access
- Compromised servers can lead to loss of sensitive information
- It can also allow full system control by attackers

### Data Flow Control


Data flow control manages the transfer of data to prevent overwhelming the network or server, ensuring stability and efficiency.

- If data flow is too high, it can overwhelm bandwidth and degrade performance
- Operating systems often include mechanisms to control and manage data flow

Two approaches to manage data flow:

- **Control Bandwidth**

  - Limit data flow to avoid DoS attacks
  - OS controls regulate inbound/outbound traffic
  - Prevent overloads that can disrupt services

- **Monitor Sensitive Data Flow**

  - Map data movement for proper monitoring
  - Apply strong security to protect sensitive info

### Database Servers

**Database servers** store information for retrieval, often supporting large datasets used for analytics. **Data warehouses** handle massive amounts of data, which makes them prime targets for attackers due to the valuable information they hold.

- **Aggregation Attack**

  - Combine harmless pieces of data to reveal sensitive info
  - Piecing together of random data forms a larger sensitive picture
  - Example: Public report + staff directory + schedule → security exposure

- **Inference Attack**
  
  - Deduce sensitive info from seemingly unrelated facts
  - Example: Correlating hospital data to identify a VIP’s health

To protect against aggregation and inference attacks:

- Implement need-to-know access policies
- Encrypt sensitive data, even in smaller datasets
- Use traffic analysis to detect suspicious activity

:::info 

**Atomicity** means that either the entire transaction succeeds or the DBMS rolls it back to its previous state (in other words, clicks the “undo” button). 

:::