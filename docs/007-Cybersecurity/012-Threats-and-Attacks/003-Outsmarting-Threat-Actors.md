---
title: "Outsmarting Threat Actors"
tags: 
- Security
- Cybersecurity
sidebar_position: 3
last_update:
  date: 1/30/2024
---


## Overview

These methods can work individually or in combination to help security teams monitor, detect, and analyze threat actor activities.

### Honeypots

Honeypots are decoy systems designed to lure attackers.

- Mimics real systems with vulnerabilities that are attractive to attackers.
- Detect unauthorized access and divert attackers from real assets.
- Doesn't block attacks, but rather study the attacker's methods and behavior.

Honeypots can be used for insider threats to detect:

- Internal fraud
- Snooping
- Malpractice

### Honeynets

A Honeynet is a network of interconnected honeypots simulating a real network.

- Understand complex attack patterns and coordination.
- Observe malware propagation and multi-stage attacks.
- Used to study attacker's behavior in a more controlled environment.
- Attacker's activities are logged, including both successful and unsuccessful attacks.
- **Double-edged sword** - attackers can also use honeypots and honeynets to learn how the actual system is configured. 

### Honeyfiles

Honeyfiles are decoy files placed in strategic locations within an organization's file system.

- Identify unauthorized file access and detect lateral movement.
- Monitor internal file system exploration and compromised user accounts.
- Appears to contain sensitive information to entice threat actor.
- Serves to trap the network, forcing the attacker to enumerate its own network.

Honeyfiles can be any files: 

- Word-processing docs, spreadsheets, presentation files 
- Images
- Executables 
- Database files

### Honey Tokens

Honey Tokens are unique data elements like API keys or credentials used as bait.

- Can be in any forms: fake user account, dummy database record, etc
- Has no legitimate value but is monitored for access and use. 
- Since it has no use, any interaction with them is suspicious.
- Useful for detecting insider threats.
- Track unauthorized data use in APIs, databases, or applications.

## Other Disruption Technologies 

In addition to the methods mentioned above, there are other disruption technologies we can use to help secure our systems. They provide a layer of deception and misdirection that can delay, confuse, or deter attackers, thereby enhancing overall security.

### Using Bogus DNS Entries

Using bogus DNS entries mislead and waste an attacker's time. 

- Create false domain name to IP address mappings.
- Insert bogus DNS records to confuse attackers
- This diverts attackers to non-existent addresses or invalid resources.


### Creating Decoy Directories

Set up fake directories within a file system to mislead attackers.

- Attract unauthorized access attempts.
- Place honeyfiles inside; trigger alerts when accessed.
- Monitor for suspicious activity to enhance security.

### Generating Dynamic Pages to Slow Down Web Crawlers

Create constantly changing web pages to frustrate automated web crawlers.

- Slow down bots or scrapers trying to index or steal content.
- Use randomized content or structures to confuse bots.
- Reduces bots' ability to extract useful information.

### Using Port Triggering to Hide Services

Dynamically open and close network ports based on specific conditions.

- Conceal services from port scanners to limit exposure.
- Ports stay hidden until a trigger is activated.
- Makes it harder for attackers to detect and target services.

### Spoofing Fake Telemetry Data During a Detected Network Scan

Generate fake network activity to mislead attackers during a scan.

- Create misleading traffic or system info to confuse attackers.
- Use false telemetry like fake server responses or network details.
- Disrupts attackers’ efforts to map the network effectively.

