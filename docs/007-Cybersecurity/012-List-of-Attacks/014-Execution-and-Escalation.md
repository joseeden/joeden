---
title: "Execution and Escalation"
tags: [Cybersecurity]
sidebar_position: 14
last_update:
  date: 1/30/2024
---


## Overview

- **Execution**
  - Running arbitrary or remote code on a target system by exploiting vulnerabilities.

- **Escalation**
  - Increasing privileges to gain unauthorized access to higher-level resources.

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

**Types:**

- **Vertical Privilege Escalation**:
  - Attacker gains higher-level privileges than those initially granted.
  - Example: A normal user account exploiting a vulnerability to gain administrative or root access.

- **Horizontal Privilege Escalation**:
  - Attacker accesses resources at same privilege level, but as another user.
  - Example: A user accessing another user’s account details without proper authorization.

**Mitigations:**

- Apply the principle of least privilege (PoLP).
- Regularly update and patch systems.
- Monitor and log access to critical systems and data.
- Use security tools to detect and prevent privilege escalation attempts.

## Rootkits

Rootkits are malicious software designed to hide the existence of certain processes or programs from normal methods of detection and enable continued privileged access to a computer.

- Modifies system files, often at the kernel level, to conceal its presence.
- Installing malicious software, often via compromised system components.
- Stealthy control over the infected system, difficult detection and removal.
- Anomalous system behavior, discrepancies in system and kernel data.

**Types:**

- **Kernel Mode**

  - Rootkits that operate at the kernel level of the operating system.
  - Gain deep access to system functions and resources.
  - Difficult to detect and remove due to their low-level nature.

- **User Mode**

  - Rootkits that operate at the user level of the operating system.
  - Manipulate system processes and user-level functions.
  - Easier to detect compared to kernel mode rootkits but still pose a significant threat to system security.

**Mitigations:**

- Use rootkit detection tools.
- Regularly update and patch operating systems and software.
- Implement robust access controls and monitoring.
- Conduct regular system integrity checks and audits.


