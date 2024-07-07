---
title: "Outsmarting Threat Actors"
tags: [Cybersecurity]
sidebar_position: 3
last_update:
  date: 1/30/2024
---


## Overview

These methods can work individually or in combination to help security teams monitor, detect, and analyze threat actor activities.

### Honeypots

- Decoy systems designed to lure attackers.
- Mimics real systems with vulnerabilities that are attractive to attackers.
- Detect unauthorized access and divert attackers from real assets.
- Doesn't block attacks, but rather study the attacker's methods and behavior.
- Can be used for insider threats to detect:
  - internal fraud
  - snooping
  - malpractice

### Honeynets

- A network of interconnected honeypots simulating a real network.
- Understand complex attack patterns and coordination.
- Observe malware propagation and multi-stage attacks.
- Used to study attacker's behavior in a more controlled environment.
- Attacker's activities are logged, including both successful and unsuccessful attacks.
- **Double-edged sword** - attackers can also use honeypots and honeynets to learn how the actual system is configured. 

### Honeyfiles

- Decoy files placed in strategic locations within an organization's file system.
- Identify unauthorized file access and detect lateral movement.
- Monitor internal file system exploration and compromised user accounts.
- Appears to contain sensitive information to entice threat actor.
- Serves to trap the network, forcing the attacker to enumerate its own network.
- Can be any files 
  - Word-processing docs, spreadsheets, presentation files 
  - Images
  - Executables 
  - Database files

### Honey Tokens

- Unique data elements like API keys or credentials used as bait.
- Can be in any forms: fake user account, dummy database record, etc
- Has no legitimate value but is monitored for access and use. 
- Since it has no use, any interaction with them is suspicious.
- Useful for detecting insider threats.
- Track unauthorized data use in APIs, databases, or applications.

## Other Disruption Technologies 

In addition to the methods mentioned above, there are other disruption technologies we can use to help secure our systems. They provide a layer of deception and misdirection that can delay, confuse, or deter attackers, thereby enhancing overall security.

### Using Bogus DNS Entries

- Create false domain name to IP address mappings.
- Mislead and waster attacker's time; obscure resource locations.
- Insert bogus DNS records to confuse attackers, diverting them to non-existent addresses or invalid resources.

### Creating Decoy Directories

- Establish fake directories in a file system.
- Attract attackers to detect unauthorized access.
- Fill decoy directories with honeyfiles; security systems can monitor them for suspicious activity and trigger alerts when accessed.

### Generating Dynamic Pages to Slow Down Web Crawlers

- Generate dynamic, ever-changing web pages.
- Slow down automated web crawlers or scraping bots.
- Effective for automated scraping tools or bots trying to index or steal content.
- Use randomized content or varying structures to make it difficult for bots to extract useful information, reducing their effectiveness.

### Using Port Triggering to Hide Services

- Open/close network ports dynamically based on specific triggers.
- Conceal services from port scanners to reduce the attack surface.
- Ports remain hidden until specific conditions are met, complicating attackers' efforts to identify open ports and target services.

### Spoofing Fake Telemetry Data During a Detected Network Scan

- Generate misleading network traffic or system information.
- Confuse attackers during a network scan.
- Upon detection of a network scan, create fake telemetry like false server responses or 
misleading network topology, disrupting attackers' mapping efforts.



