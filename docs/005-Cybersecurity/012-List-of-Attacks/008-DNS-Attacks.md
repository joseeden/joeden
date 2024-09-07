---
title: "DNS Attacks"
tags: [Cybersecurity]
sidebar_position: 8
last_update:
  date: 1/30/2024
---



## Domain Name System 

The Domain Name System (DNS) is a hierarchical and decentralized naming system used to convert human-readable domain names (like www.google.com) into IP addresses (like 192.0.2.1) that computers use to identify each other on the network. 

It functions like a phonebook for the internet, allowing users to access websites using domain names instead of memorizing numerical IP addresses. 

For more information, please see [Domain Name System (DNS).](/docs/004-Networking/001-The-Basics/003-Domain-Name-System-DNS.md)

## DNS Cache Poisoning

Also known as **DNS spoofing**, is a type of attack where false DNS information is introduced into the DNS resolver's cache, causing it to return an incorrect IP address.

- Manipulation of DNS cache.
- Redirects users to fraudulent websites, phishing attacks, malware distribution.
- Monitoring DNS traffic for unusual patterns, unexpected DNS responses.

**Mitigations:**

- **DNSSEC** (Domain Name System Security Extensions), verifies authenticity of DNS data.
- Use secure DNS resolvers and regularly clear and update DNS cache.
- Protect DNS servers with secure network configurations and firewalls.
- Employ intrusion detection systems (IDS) to monitor for unusual DNS activity.

## DNS Amplification Attack

DNS Amplification Attack is a type of DDoS attack that uses open DNS resolvers to flood a target with amplified traffic, overwhelming the target's resources and causing service disruption.

- Exploitation of DNS resolvers to amplify traffic.
- Service outages, network congestion, degraded performance.
- Unusually high DNS traffic, traffic originating from multiple sources.

**Mitigations:**

- Configure DNS servers to prevent recursion for unauthorized users.
- Rate limiting on DNS requests and anomaly detection mechanisms.
- Use Anycast networks to distribute and manage traffic load.

## DNS Tunneling

DNS Tunneling involves encoding the data within DNS queries and responses to bypass network security measures. This technique can be used for covert communication or data exfiltration.

- Encapsulate non-DNS trafic over port 53 to bypass firewalls rules.
- Legitimate technique, but is often exploited by attackers.
- Data exfiltration, bypassing security controls, command and control for malware.
- Unusual DNS query patterns, large volume of DNS traffic, long domain names.

**Mitigations:**

- Monitor and analyze DNS traffic for unusual patterns.
- Implement deep packet inspection (DPI) to detect tunneled traffic.
- Restrict DNS queries to known and trusted DNS servers.
- Use DNS firewalls to block suspicious or unauthorized DNS traffic.

## Domain Hijacking

Domain Hijacking involves the unauthorized acquisition of a domain name. Attackers gain control over the domain registrar account or exploit vulnerabilities to change domain registration information.

- Exploitation of domain registrar accounts, social engineering.
- Loss of domain control, website defacement, phishing, etc.
- Configure alerts for unauthorized changes to domain registration, WHOIS records.

**Mitigations:**

- Enable two-factor authentication (2FA) for domain registrar accounts.
- Use strong, unique passwords for domain accounts.
- Regularly monitor and review domain registration details.
- Lock the domain to prevent unauthorized transfers.

## DNS Zone Transfer Attacks

Attackers successfully requests a copy of the DNS zone data from a DNS server. This data can provide valuable information about the network, such as internal IP addresses and hostnames, which can be used to launch further attacks.

- Unauthorized zone transfer requests.
- Exposure of sensitive network information, reconnaissance for further attacks.
- Monitoring for unauthorized zone transfer requests, unusual query patterns.

**Mitigations:**

- Restrict zone transfers to specific IP addresses/authorized secondary DNS servers.
- Implement access controls and authentication for DNS zone transfers.
- Regularly audit and update DNS server configurations.
- Use network security tools to detect and block unauthorized zone transfer attempts.
