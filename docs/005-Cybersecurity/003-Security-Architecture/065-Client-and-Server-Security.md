---
title: "Client and Server Security"
description: "Security issues on each side"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
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
#- Chrome’s DNS cache can be viewed and cleared at `chrome://net-internals/#dns`

### Cache Poisoning Attacks
Cache poisoning involves attackers inserting malicious data into a cache.

- DNS and web caches are common targets
- Can lead to malicious redirects or system compromise
- Mitigate by using DNSSEC, encrypted protocols, and clearing cache regularly

## Server Security Issues
Server security issues occur when vulnerabilities on the server side are exploited, such as unpatched software, weak access controls, or improper configurations.

- Exposed to data breaches, denial of service (DoS), and unauthorized access
- Compromised servers can lead to loss of sensitive information or full system control by attackers

### Data Flow Control

Data flow control manages the transfer of data to prevent overwhelming the network or server, ensuring stability and efficiency.

- If data flow is too high, it can overwhelm bandwidth and degrade performance
- Operating systems often include mechanisms to control and manage data flow

Two approaches to manage data flow:

- **Controlling Bandwidth Consumption**
    - Data flow should be limited to prevent overwhelming the server or network bandwidth
    - Operating systems have built-in controls for managing bandwidth usage
    - Limits on inbound and outbound data ensure they stay within network capacity
    - Without proper controls, this can lead to DoS attacks, where servers are overloaded by excessive traffic

- **Understanding Sensitive Data Flow**
    - Data flows within systems should be mapped for proper monitoring
    - Strong security controls are essential when handling sensitive information to prevent leakage



### Database Servers
Database servers store information for retrieval, often supporting large datasets used for analytics. Data warehouses, in particular, handle massive amounts of data, making them prime targets for attackers due to the valuable information they hold.

- **Aggregation Attack**

  - An attacker with low-level clearance can combine seemingly harmless pieces of information to reveal sensitive data.
  - Example: An outsider can access a public report, staff directory, and a maintenance schedule
  - Individually, these are harmless, but combined, they reveal information about company security protocols
  - This piecing together of random data forms a larger sensitive picture

- **Inference Attack**
  
  - In inference attacks, attackers deduce sensitive information from the facts they have.
  - Example scenario: A hospital report indicates a high number of patients with a rare illness in one department.
  = Another source shows that a specific VIP recently visited the same hospital.
  - By correlating these facts, an attacker can infer that the VIP might have that rare illness.
  - Attackers deduce private information by correlating seemingly unrelated facts

To protect against aggregation and inference attacks:

- Implement need-to-know access policies, limiting data exposure
- Encrypt sensitive data, even when stored in smaller, less obvious forms
- Apply traffic analysis tools to detect unusual patterns that might indicate these attacks