---
title: "Incident Response"
description: "Summary of Incident Response Terminologies"
tags: [Security, Cybersecurity, Incident Response]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Terminologies

| Terminology         | Description                                                                                                                                                                   |
|---------------------|------------------------------------------------------------------------------------------------------------------------------
| **Breach**          | The loss of control or unauthorized access to personally identifiable information. (NIST SP 800-53 Rev. 5)                                                                    |
| **Event**           | Any observable occurrence in a network or system. (NIST SP 800-61 Rev. 2)                                                                                                     |
| **Exploit**         | A specific attack that targets a system vulnerability.                                                                                                                        |
| **Incident**        | An unplanned event impacting the confidentiality, integrity, or availability of information, requiring a response.                                                            |
| **Intrusion**       | An event where an intruder gains or attempts to gain unauthorized system access. (IETF RFC 4949 Ver. 2)                                                                       |
| **Threat**          | A circumstance or event with the potential to harm organizational operations, assets, or individuals through unauthorized access or data destruction. (NIST SP 800-30 Rev. 1) |
| **Vulnerability**   | A weakness in a system or security process that could be exploited by a threat source. (NIST SP 800-30 Rev. 1)                                                                |
| **Attacks**         | Deliberate actions or activities carried out by threat actors with the intent to exploit vulnerabilities. |
| **Zero Day**        | An unknown system vulnerability that could be exploited without typical detection or prevention.                                                                              |
| **Impact**          | The expected harm from unauthorized data disclosure, modification, or loss.                                                                                                   |


## Indicators of Compromise 

Indicators of Compromise (IOCs) are evidence or clues that suggest a computer system or network has been breached or compromised by malicious actors. These indicators can take various forms and are used by cybersecurity professionals to detect, investigate, and respond to security incidents. 

- Malware Signatures
- Anomalous Network Traffic
- Unauthorized Access Attempts
- Unusual File or System Modifications
- Abnormal User Behavior
- Phishing or Social Engineering Indicators
- Security Alerts or Warnings
- Unusual System Performance
- Suspicious File Attachments or Downloads
- IoT Device Anomalies

For more information, please see [Indicators of Compromise.](/docs/007-Cybersecurity/050-Threats-and-Attacks/021-Indicators-of-Compromise.md)   

## Goal of Incident Response

The objectives of Incident Response:

- Organizations must prepare for incidents despite preventive measures.
- Incident response prioritizes safety and aims to minimize impact.
- **Crisis management** is sometimes used interchangeably with incident management.
- Events disrupting the business mission are termed **incidents**.
- An incident response plan ensures business viability.
- The incident response process aims to minimize impact and resume operations swiftly.
- It's a subset of the broader [business continuity management (BCM)](/docs/007-Cybersecurity/030-Incident-Response/011-Business-Continuity-Plan.md).

## Incident Response Lifecycle

<div class="img-center">

<!-- 
<div class="img-center">
 -->
![](/img/docs/sec+-irp-lifecycle.png)


</div>


## Incident Response Program

### Security Incidents

Even with preparation, security incidents can happen. Security teams must prepare by building an incident response program.

- Security professionals build programs to respond to incidents.
- NIST is a key authority for incident response guidelines.
- Refer to NIST SP 800-61 for guidance.

### Key Components

The incident response plan should include several key elements.

1. Incident response policy and plan documentation
2. Procedures for incident handling and reporting 
3. Guidelines for external communication
4. Structure for staffing model for the team.
5. Description of relationships with other groups.


### Incident Response Policy

An incident response policy would define how a variety of different types of incidents can be handled and dealt with when they occur and is a good idea to have in place within organizations that have an IT department.

- Defines the authority and scope of the incident response tea
- Provides the basis for quick decision-making during incident
- Includes a system for prioritizing incidents based on severit

### Incident Response Procedures

These procedures offer specific guidance on how to handle incidents.

- Incident notification 
- Escalation 
- Reporting 
- System isolation 
- Forensic analysis 
- Evidence handling 

### Communication Guidelines

Clear communication is essential during an incident.

- Guidelines for notifying senior leadership, public relations, and law enforcement.
- Reporting to law enforcement can have legal and public implications.

## Building the Incident Response Team

A dedicated team is needed to handle incidents effectively.

- Include representatives from management, security, and technical experts.
- Ensure legal, PR, and physical security staff are involved.
- The team must be ready to respond 24/7 with backup personnel.

For more information, please see [Incident Response Teams.](/docs/007-Cybersecurity/030-Incident-Response/003-IR-Models-and-Exercises.md#incident-response-teams)
