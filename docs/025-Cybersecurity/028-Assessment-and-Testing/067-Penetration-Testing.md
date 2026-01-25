---
title: "Penetration Testing"
description: "Simulated cyber attack"
tags: [Security, Cybersecurity, Security Operations, Penetration Testing, Security Assessment, Security Testing]
sidebar_position: 67
last_update:
  date: 1/30/2024
---


## Overview

Penetration testing simulates cyber attacks to find vulnerabilities in systems.

- Agree on methodology and rules before testing.
- Simulate network attacks based on threat scenarios.
- Normally triggers IDS/IPS alerts; if not, report it.
- Each test has a clear goal.

**Penetration tests usually start with basic user-level access to simulate real attacks.** Testers use tools and techniques to find weaknesses, especially privilege escalation paths, since attackers only need one vulnerability to succeed.

:::info 

Penetration testing should be conducted **at least annually** on critical systems that must remain available and operational. 

:::


## Types of Pentesting

### Physical Pentesting

Physical pentesting involves evaluating the physical security of facilities and personnel.

- Checks locks, doors, gates, and access points.
- Tests security staff and procedures.
- Looks for social engineering risks like tailgating.

### Offensive Pentesting

Offensive pentesting, also known as **red teaming**, is a **proactive** approach that focuses on simulating real-world attacks to find weaknesses in systems, networks, and applications.

- Identifies vulnerabilities and tests responses.
- Provides actionable insights for security improvements.
- Helps secure funding for cybersecurity initiatives.

:::info 

The term red team exercise is often used synonymously with penetration test. 

In reality, a red team exercise can apply to any aspect of an organization (people, processes, facilities, products, ideas, information systems)

A penetration test, on the other hand, is focused on testing the effectiveness of security controls in facilities and/or information systems. 

:::

### Defensive Pentesting

Defensive pentesting, also known as **blue teaming**, is a **reactive** approach that focuses on strengthening defenses by simulating attack scenarios.

- Improves detection and response.
- Conducts regular security assessments.
- Collaborates with offensive teams for better protection.

### Integrated Pentesting

Integrated pentesting, also known as **purple teaming**, combines both offensive and defensive approaches for a comprehensive evaluation.

- Merges red and blue team methods.
- Identifies internal and external threats.
- Improves coordination between teams.


### Breach and Attack Simulation (BAS)

Breach and Attack Simulation (BAS) automates the testing of security defenses using continuous and repeatable attack scenarios.

- Runs simulations based on frameworks like MITRE ATT&CK
- Continuously checks firewalls, IDS/IPS, and EDR systems
- Finds misconfigurations and gaps in threat detection and response
- Provides measurable results to improve overall security readiness

Comparison with traditional pentesting:

- **Pentesting** is manual, in-depth, and performed periodically.
- **BAS** is automated, consistent, and can run continuously to monitor resilience.

**They are meant to be realistic but should not cause any adverse effect to the target systems**. For example, a ransomware simulation may use “defanged” malware that behaves like the real thing but only encrypts a single sample file as proof.


## Pentesting Environments 

The classifications for the environments define the level of information available to the tester about the target system.

- **White-box Testing**: Attackers have full knowledge of the environment
- **Black-box Testing**: Attackers have no knowledge of the environment 
- **Gray-box Testing**: Attackers have some knowledge of the environment

For more information, please see [Environment Classifications.](/docs/025-Cybersecurity/028-Assessment-and-Testing/066-Reconnaisance-in-Pentesting.md#environment-classifications)

## Simulated Environment

A simulated environment is an isolated lab used to run suspicious or malicious code safely, without affecting production systems.

- Includes sandboxes, virtual machines, emulators, and isolated networks
- Mirrors production configs so test results are realistic
- Used for pentesting, malware analysis, and exploit validation

Typically includes:

- Sandboxes
- Virtual machines 
- Emulators/Emulation buffers 
- Isolated networks


## Penetration Testing Process 

### 1. Rules of Engagement

Setting the rules of engagement is defines the boundaries and expectations of the penetration test. This ensures both the testing team and the organization are clear on what will be tested, how the test will be conducted, and what legal implications are considered.

- Define the scope and objectives of the test.
- Establish clear communication channels and protocols.
- Ensure legal and ethical boundaries are respected.

### 2. Discovery/Enumeration

This phase involves testers extensively collecting data that will inform their subsequent actions and strategies for exploiting the system.

- Gather information about the target system.
- Identify open ports, services, and potential entry points.
- Map the network and identify connected devices.

### 3. Vulnerability Identification and Exploitation

During this phase, testers finds entry points and test if the vulnerabilities can be used to gain unauthorized access or extract sensitive data.

- Scan for known vulnerabilities and weaknesses.
- Attempt to exploit identified vulnerabilities.
- Validate the exploitability and impact of each vulnerability.

### 4. Privilege Escalation, Backdoors, and Pivoting

In this stage, testers aim to increase their access within the system, establish persistent access for future use, and explore further into the network to identify additional vulnerabilities and critical assets.

- Attempt to gain higher-level access to the system.
- Install backdoors for future access if permitted.
- Use the compromised system to access other network areas.

For more information, please see [Privilege Escalation.](/docs/025-Cybersecurity/051-List-of-Attacks/014-Execution-and-Escalation.md#privilege-escalation)

### 5. Cleanup

After completing the testing, it is important to ensure that no trace of the penetration test remains on the target system. This prevents any disruption to normal operations and maintains the integrity of the system.

- Remove any tools or scripts used during the test.
- Restore the system to its original state.
- Ensure no traces of the test remain on the target.

### 6. Report Findings

The final phase involves documenting and presenting the results of the penetration test. The report provides a comprehensive overview of the vulnerabilities discovered, their potential impacts, and actionable recommendations for improving the security posture.

- Document all discovered vulnerabilities and exploited weaknesses.
- Provide detailed findings, including evidence and impact analysis.
- Offer recommendations for remediation and improving security posture.

