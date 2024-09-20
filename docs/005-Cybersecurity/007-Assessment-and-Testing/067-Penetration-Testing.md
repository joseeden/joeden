---
title: "Penetration Testing"
description: "Simulated cyber attack"
tags: [Security, Cybersecurity, Security Operations, Penetration Testing, Security Assessment, Security Testing]
sidebar_position: 67
last_update:
  date: 1/30/2024
---


## Overview

Penetration Testing is a simulated cyber attack that helps in the assessment of computer systems for exploitable vulnerabilities.

- Agree on methodology and rules of engagement before performing pentests.
- Simulate network intrusion based on threat scenarios.
- Normally triggers IDS/IPS alerts. If it doesn't, then this should also be reported.
- There's a **specific goal in mind.**

## Types of Pentesting

### Physical Pentesting

Physical pentesting involves evaluating the physical security measures of a facility to identify vulnerabilities that could be exploited to gain unauthorized access to sensitive areas or information.

- Assesses physical barriers such as locks, doors, and gates.
- Tests the effectiveness of security personnel and protocols.
- Evaluates the security of entry points, such as windows and ventilation systems.
- Identifies potential social engineering vulnerabilities, like tailgating.
- Raises awareness about the importance of physical security among employees.

### Offensive Pentesting

Offensive pentesting, also known as **red teaming**, is a **proactive** approach that focuses on simulating real-world attacks to identify weaknesses in an organization's security infrastructure from an attacker's perspective.

- Identifies vulnerabilities in networks, systems, and applications.
- Evaluates response capabilities of security teams.
- Provides actionable insights for improving security posture.
- Results can also used to garner more funding and support for cybersecurity investments.

### Defensive Pentesting

Defensive pentesting, also known as **blue teaming**, is a **reactive** approach that emphasizes identifying and fortifying weaknesses within an organization's defenses by simulating potential attack scenarios.

- Focuses on strengthening existing security measures.
- Enhances incident detection and response capabilities.
- Conducts regular security assessments to identify new vulnerabilities.
- Collaborates with offensive teams to improve overall security.

### Integrated Pentesting

Integrated pentesting, also known as **purple teaming**, combines both offensive and defensive strategies to create a comprehensive security evaluation, ensuring that both attack simulations and defensive measures are optimized.

- Merges red and blue team methodologies for holistic security testing.
- Identifies and addresses both internal and external threats.
- Enhances coordination between offensive and defensive security teams.
- Provides a thorough analysis of an organization's security posture.


## Pentesting Environments 

There are different types of pentesting environments. The classifications for these environments define the level of information available to the tester about the target system.

- **White-box Testing**: Attackers have full knowledge of the environment
- **Black-box Testing**: Attackers have no knowledge of the environment 
- **Gray-box Testing**: Attackers have some knowledge of the environment

For more information, please see [Environment Classifications.](/docs/005-Cybersecurity/007-Assessment-and-Testing/066-Reconnaisance-in-Pentesting.md#environment-classifications)


## Penetration Testing Process 

Penetration testing is a structured approach to identifying and exploiting vulnerabilities in a system to assess its security.

### Rules of Engagement

Setting the rules of engagement is crucial for defining the boundaries and expectations of the penetration test. This ensures both the testing team and the organization are clear on what will be tested, how the test will be conducted, and what legal implications are considered.

- Define the scope and objectives of the test.
- Establish clear communication channels and protocols.
- Ensure legal and ethical boundaries are respected.

### Discovery/Enumeration

This phase involves testers extensively collecting data that will inform their subsequent actions and strategies for exploiting the system.

- Gather information about the target system.
- Identify open ports, services, and potential entry points.
- Map the network and identify connected devices.

### Vulnerability Identification and Exploitation

During this phase, testers identify weaknesses in the system's defenses. This step is essential to find entry points and test if these vulnerabilities can be used to gain unauthorized access or extract sensitive data.

- Scan for known vulnerabilities and weaknesses.
- Attempt to exploit identified vulnerabilities.
- Validate the exploitability and impact of each vulnerability.

### Privilege Escalation, Backdoors, and Pivoting

In this stage, testers aim to increase their access within the system, establish persistent access for future use, and explore further into the network to identify additional vulnerabilities and critical assets.

- Attempt to gain higher-level access to the system.
- Install backdoors for future access if permitted.
- Use the compromised system to access other network areas.

For more information, please see [Privilege Escalation.](/docs/005-Cybersecurity/012-List-of-Attacks/014-Execution-and-Escalation.md#privilege-escalation)

### Cleanup

After completing the testing, it is essential to ensure that no trace of the penetration test remains on the target system. This prevents any disruption to normal operations and maintains the integrity of the system.

- Remove any tools or scripts used during the test.
- Restore the system to its original state.
- Ensure no traces of the test remain on the target.

### Report Findings

The final phase involves documenting and presenting the results of the penetration test. The report provides a comprehensive overview of the vulnerabilities discovered, their potential impacts, and actionable recommendations for improving the security posture.

- Document all discovered vulnerabilities and exploited weaknesses.
- Provide detailed findings, including evidence and impact analysis.
- Offer recommendations for remediation and improving security posture.

