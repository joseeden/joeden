---
title: "Execution and Escalation"
tags: [Cybersecurity]
sidebar_position: 14
last_update:
  date: 1/30/2024
---


## Overview


These techniques allow attackers to run malicious code and gain more control over a system.

- **Execution**

  - Running code locally or remotely by exploiting vulnerabilities.
  - Used to initiate attacks or deliver malware.

- **Escalation**

  - Gaining higher privileges to access restricted data or systems.
  - Often follows successful code execution.

## Arbitrary Code Execution

Arbitrary Code Execution is an attack where an attacker exploits vulnerabilities to execute arbitrary commands or code on a target machine.

- Exploitation of software vulnerabilities.
- Unauthorized actions on the target system.
- Monitoring for unusual or unexpected process activity.

**Mitigations:**

- Regularly update and patch software to fix known vulnerabilities.
- Employ input validation and sanitization.
- Use security-focused coding practices.
- Implement runtime protections like DEP and ASLR.

:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::


## Remote Code Execution

Remote Code Execution (RCE) is an attack where an attacker exploits vulnerabilities to run arbitrary code on a remote system (e.g. over the internet), often leading to complete system compromise.

- Exploitation of network-exposed vulnerabilities.
- Full control over the target system.
- Unusual network traffic and process activity.

**Mitigations:**

- Limit administrative access.
- Apply security patches and updates promptly.
- Disable unnecessary network services.
- Use firewalls to restrict network access.
- Employ intrusion detection/prevention systems (IDS/IPS).

## Privilege Escalation

Privilege Escalation is an attack where an attacker gains elevated access to resources that are normally protected from an application or user.

- Exploitation of software vulnerabilities or misconfigurations.
- Unauthorized access to privileged information or functionality.
- Monitoring for changes in user permissions and role assignments.

**Mitigations:**

- Apply the [principle of least privilege (PoLP)](/docs/007-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege).
- Regularly update and patch systems.
- Monitor and log access to critical systems and data.
- Use security tools to detect and prevent privilege escalation attempts.


### Types of Privilege Escalation

Attackers may increase access by escalating their rights vertically or moving laterally between accounts.

- **Vertical Privilege Escalation**

  - Gains higher-level access than originally granted.
  - Example: User becomes admin/root.

- **Horizontal Privilege Escalation**

  - Accesses data or functions of another user at the same level.
  - Example: User accesses another user's files.

## Rootkits

Rootkits are malicious software (malware) designed to hide the existence of certain processes or programs from normal methods of detection and enable continued privileged access to a computer.

- Modifies system files, often at the kernel level, to conceal its presence.
- Installing malicious software, often via compromised system components.
- Stealthy control over the infected system, difficult detection and removal.
- Anomalous system behavior, discrepancies in system and kernel data.

**Mitigations:**

- Use rootkit detection tools.
- Regularly update and patch operating systems and software.
- Implement robust access controls and monitoring.
- Conduct regular system integrity checks and audits.


:::info 

A rootkit can change the hash of the cmd.exe file, which is a command-line interpreter for Windows systems, to avoid detection by antivirus or file integrity monitoring tools.

A rootkit is one of the most difficult types of malware to remove, as **it can persist even after rebooting or reinstalling the OS.**

:::


### Types of Rootkits

Rootkits help attackers hide their presence by modifying system functions.

- **Kernel Mode**

  - Operates at the core of the OS.
  - Hard to detect and remove.

- **User Mode**

  - Runs with user-level access.
  - Easier to find, but still dangerous.
