---
title: "OS Vulnerabilities"
tags: [Cybersecurity]
sidebar_position: 13
last_update:
  date: 1/30/2024
---


## Overview

Operating System (OS) vulnerabilities are weaknesses in software exploited by attackers. They can lead to unauthorized access, data breaches, and system crashes, posing significant risks to system integrity and functionality.

### Unpatched Systems

Unpatched systems are vulnerable to known exploits and attacks due to the absence of security patches and updates. This increases the risk of malware infections and unauthorized access.

- Failure to apply security patches and updates.
- Leaves systems vulnerable to known exploits and attacks.
- Ensure that you regularly update and patch your systems.

### Zero-Day Vulnerabilities

Zero-day vulnerabilities are security flaws unknown to the vendor, exploited by attackers before a patch is available. They pose significant threats as there are no known fixes or mitigations.

- Use Host-Based IPS to detect and block malicious activities.

### Misconfigurations 

Misconfigurations involve incorrect or insecure system settings and configurations. They can lead to unintended exposure of sensitive data or services, often overlooked but exploitable by attackers.

- Unchanged default settings, unnecessary services left enabled. 
- Employ configuration management tools to standardize and automate the process.
- Config management ensures consistency and eliminate human errors.
- Conduct periodic audit and reviews to identify and mitigate vulnerabilities.

### Data Exfiltrations

Data exfiltrations refer to the unauthorized transfer of data from a system, often due to vulnerabilities or malware. They result in the loss of sensitive information and potential legal and financial consequences.

- Commonly occurs when OS vulnerability is exploited.
- Use endpoint protection tools to monitor and restrict unauthorized data transfer.
- Data-at-rest encryption ensures data remains unreadable if stolen.
- Use Host-based Firewall to control inbound/outbound traffic on a given system.

### Malicious Updates

Malicious updates contain malicious code and are distributed through compromised or fake update channels. They can lead to system compromise, data theft, and further malware distribution.

- Malicious code can inject malware or exploit into the system when installed.
- Only source updates from trusted vendors and official channels.
- Implement allow-listing of verified applications.
- Verify authenticities of updates through signatures or hashes.
