---
title: "DNS and Web Security"
description: "Hierarchical and decentralized naming system"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 62
last_update:
  date: 1/30/2024
---


## Domain Name System (DNS)

The Domain Name System (DNS) is a hierarchical and decentralized naming system used to convert human-readable domain names (like www.google.com) into IP addresses (like 192.0.2.1) that computers use to identify each other on the network. 

It functions like a phonebook for the internet, allowing users to access websites using domain names instead of memorizing numerical IP addresses. 

For more information, please see [Domain Name System (DNS).](/docs/006-Networking/001-The-Basics/003-Domain-Name-System-DNS.md)


### DNSSEC

DNS Security Extensions (DNSSEC) add security to DNS by verifying that the data is authentic and untampered. It helps protect against attacks like cache/DNS poisoning.

- All DNS zones have digital certificates.
- Uses digital signatures to verify DNS data.
- Ensures DNS responses are accurate and legitimate.
- Adds DNS record types like **RRSIG**, **DNSKEY**, and **DS**.
- Creates a chain of trust from the root to individual domains.

### DNS Filtering

DNS filtering blocks access to harmful or inappropriate sites at the DNS level before a connection is made.

- Stops access to known malicious websites.
- Reduces network load by preventing threats early.
- Can block categories like social media or gambling.
- Works with other security systems for broader protection.

DNS filtering provides a first line of defense and keeps users safe before they even reach a site.


## Web Filtering 

Web filtering controls the internet content users can access through an organization's network. This protects users from harmful websites and maintains productivity by blocking access to non-work-related content.

- Blocks malicious or unsafe websites.
- Prevents access to inappropriate content.
- Helps enforce policies and legal requirements.
- Can filter by category, keyword, or URL.
- Monitors activity for reporting and insights.

Types:

- Agent-Based Web Filtering 
- Centralized Proxies 
- URL Scanning
- Content Categorization 
- Block Rules 
- Reputation-Based Filtering

### Agent-Based Web Filtering

Agent-based web filtering uses **software agents installed on client devices** to enforce web content policies directly on the user's computer.

- Controls user activities directly on their devices.
- Works well for remote or mobile workers.
- Allows personalized filtering for users or groups.
- Blocks content at the endpoint, reducing network reliance.


### Centralized Proxies

Centralized proxies route all network requests through a single proxy server, where web content is filtered and monitored.

- Offloads filtering from client devices.
- Ensures consistent policies across all devices.
- Blocks requests that violate rules.

### URL Scanning

URL scanning involves inspecting the URLs accessed by users to determine if they are safe or harmful.

- Detects harmful sites before access.
- Checks URLs against known databases.
- Unlisted URLs are treated as safe.
- Integrates with other security systems.

### Content Categorization

Content categorization involves classifying web content into categories to facilitate filtering based on predefined rules.

- Simplifies policy management.
- Provides detailed control over internet usage.
- Helps maintain compliance with standards.

### Block Rules

Block rules define specific criteria or conditions under which web access is restricted or blocked.

- Controls which websites or content types are accessible.
- Enforces company policies.
- Prevent access to harmful or non-compliant content.
- Can be customized to organizational needs.

### Reputation-Based Filtering

Reputation-based filtering assesses the trustworthiness of websites based on their history and feedback from a global network of users. It also uses **reputation score**, which is typically determined by a third-party service.

- Evaluates site trustworthiness via global feedback.
- Blocks emerging threats in real-time.
- Protects users dynamically from risky sites.