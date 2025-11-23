---
title: "Security Controls"
description: "Physical, Technical, Administrative, etc."
tags: 
- Security
- Cybersecurity
- Risk Management
sidebar_position: 40
last_update:
  date: 1/30/2024
---

## Overview

Controls ensure the confidentiality, integrity, and availability of an organization's information and technology assets, focusing on people, technology, processes, and strategy.

- Upholding confidentiality, integrity, and availability.
- Controls center around people, technology, processes, and strategy.
- Cyber security controls prevent, detect, and reduce cyber-attacks and threats.
- Crucial for managing an organization's security program.

## System-specific, Common, and Hybrid Controls 

- **System-specific controls** are security controls that provide security capability for only one specific information system. 

- **Common controls** are security controls that provide security capability for multiple information systems. 

- **Hybrid controls** have characteristics of both system-specific and common controls.

## Types of Cybersecurity Controls 

### Physical Controls

Physical controls addresses security needs with hardware like badge readers and architectural features.

- Control movement in specific locations (e.g., office, factory).
- Cover entry points and surrounding areas.
- Supported by technical controls for an overall security system.

Examples:

- Visitors use designated entrance, undergo identification.
- Employees use badges or tokens for identity verification.

Technical controls canintegrate hardware for a seamless security setup:

- Readers
- Door release mechanisms
- Access control systems 

For more information, please see [Physical Security.](/docs/007-Cybersecurity/026-Identity-and-Access-Management/007-Physical-Access.md)


### Technical Controls

Also termed **Logical controls**, technical controls are implemented directly by computer systems and networks.

- Automated protection against unauthorized access.
- Facilitate detection of security violations.
- Support security requirements for applications and data.
- Requires significant operational considerations.

Common implementations:

- Configuration settings, parameters, or hardware settings.
- Managed through software GUI or hardware.
- Example: Access Control List

Biometrics (fingerprint, iris scan, facial recognition, etc.) are **technology-based mechanisms** used to enforce authentication.

Even though they involve physical traits, the control itself is implemented through **technical systems** such as biometric scanners and software.

:::info 

Paper records can’t be easily protected with technical controls, such as encryption and authentication measures. 
They are better controlled using physical security measures and operational procedures. 

::: 


### Administrative Controls

Also known as **Managerial controls**, administrative controls refers to directives, guidelines, or advisories for organization members.

- Establish frameworks, constraints, and standards for human behavior.
- Encompass all organizational activities and interactions.
- Even simple awareness policies can be effective controls.

Integration strategies:

- Improve overall security by integrating controls into daily task-level activities.
- Offer in-context references, advisory resources, or link directly into training.

Operational impact:

- Shifts from executive decision-making to daily use.
- Enhances immediacy, usefulness, and operational relevance.

Examples:

- Acceptable Use Policy 
- Emergency Operations Procedures 
- Employee Awareness Training

Types of Administrative Controls: 

- **Procedural Controls** - Controls that are initiated by the organization.
- **Legal or Regulatory Controls** - Controls mandated by the law.

:::info 

Administrative controls are implemented through policies, procedures, and training, while technical controls use technology and hardware solutions to protect systems and data.

Administrative controls are also referred to as "soft" access controls.

:::

### Preventative Controls

Preventative controls aim to avoid loss or errors and include measures such as hardening, security awareness training, change management, and account disable policies.

- Hardening
- Security awareness training
- Change management
- Account disable policy.

### Detective Controls

Detective controls use internal controls to identify errors through methods like:

- Log monitoring
- SIEM
- Trend analysis
- Security audits
- Video surveillance
- Motion detection

:::info 

Rotation of duties is considered a Detective control.+

When duties are rotated, irregularities, fraud, or misuse that one person could hide often become visible to the next person taking over the role.

:::

### Deterrent Controls

Deterrent controls, often tangible objects or persons, reduce deliberate attacks through measures like:

- Cable locks
- Hardware locks
- Video surveillance
- Guards

### Compensating Controls

Compensating controls offer alternative methods to meet security requirements when standard measures are impractical or financially challenging.

- "Second-pick", if designed control is too expensive or will take long to implement.
- Time-based OTP (One-time password)
- Network isolation for IoT devices

:::info 

Organization can use compensating controls to protect legacy systems from potential attacks by disabling unneeded services and placing a firewall in front of it. This reduces the attack surface and the likelihood of exploitation.

:::


### Corrective Controls 

Corrective controls are measures used to address security vulnerabilities or weaknesses already identified. Backups, patches, and Disaster Recovery Plans are all corrective security controls.

- Backups can help ensure that important information is not lost in the event of an incident. 
- Patches can help fix vulnerabilities and improve security. 
- Disaster Recovery Plans are administrative security controls that establish the corrective measures to be implemented in case of a disaster. 

:::info 

Bollards are not typically considered a corrective security control.

:::




