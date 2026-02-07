---
title: "Baselines and Standards"
description: "Security Baselines and Security Standards"
tags: 
- Security
- Cybersecurity
- Data Security
sidebar_position: 49
last_update:
  date: 1/30/2024
---

## Overview 

A **security baseline** is a set of minimum security controls and practices to maintain a consistent level of protection across an organization.

- Platform-specific, based on industry or government standards.
- Establishes basic security settings and configurations.
- Helps measure compliance and identify risks.
- Regularly updated to address new threats.

Example: Rules for securing organizational devices

- Assign responsibility to a specific individual or officer.
- Protect devices against unauthorized access.
- Ensure devices do not compromise other systems or data.
- Keep devices under control of trained administrators.
- All device activities comply with organizational data security policies.


## Baseline Components

Key elements of a security baseline:

- **Establish Minimum Security Requirements**

  - Define essential security controls.
  - Address common threats and vulnerabilities.

- **Standardize Security Practices**

  - Create consistent procedures for security tasks.
  - Ensure uniformity across systems and departments.

- **Regularly Update Baselines**

  - Review and update controls to address new threats.
  - Include lessons learned from incidents and audits.

- **Implement Access Controls**

  - Enforce access policies for sensitive information.
  - Restrict access to authorized personnel only.

- **Monitor Compliance**

  - Regularly check systems for adherence to baseline.
  - Use audits and monitoring to detect deviations.

- **Provide Training and Awareness**

  - Educate staff on baseline policies and responsibilities.
  - Foster a culture of security awareness.

- **Document and Communicate**

  - Clearly document the baseline for reference.
  - Share updates and requirements with all stakeholders.


## Security Control Baseline

Security control baselines define minimum security controls for information systems.

**NIST SP 800-53B** defines baselines based on system impact levels:

1. **Low-Impact System**

    - Basic controls for systems with minimal risk.
    - Protects confidentiality, integrity, and availability.

2. **Moderate-Impact System**

    - Stronger controls for systems with moderate risk.
    - Addresses a wider range of threats.

3. **High-Impact System**

    - Maximum controls for critical systems.
    - Includes extensive monitoring and safeguards.

4. **Privacy Control Baseline**

    - Focuses on protecting personal and sensitive data.
    - Aligns with privacy regulations and standards.


## System Configuration Managers

Configuration managers automate the deployment of secure configurations across devices, reducing errors and ensuring compliance.

- **Microsoft System Center Configuration Manager (SCCM)**
  - Centralized management of Windows devices.
  - Automated deployment of software updates and security policies.
  
- **Ansible**
  - Open-source tool for automating IT tasks.
  - Manages configuration of multiple systems simultaneously.

- **Puppet**
  - Automation tool for managing server configurations.
  - Ensures consistent and compliant configurations across servers.

- **Chef**
  - Automation platform for infrastructure configuration.
  - Uses code to define and manage configurations.

- **SaltStack**
  - Event-driven IT automation and configuration management.
  - Provides remote execution capabilities for quick policy updates.

- **Intune**
  - Cloud-based service for managing mobile devices and applications.
  - Enforces security policies and compliance settings on enrolled devices.


## Monitoring 

Once the baseline requirements are set and deployed across the enterprise, administrators should continue to monitor systems for compliance with the baseline.

- Users may change settings accidentally.
- Administrators may misconfigure policies.
- Attackers may attempt to bypass controls.

Automated monitoring checks thousands of systems against the baseline, quickly identifying deviations for investigation.


## Industry Standards on Security

Security standards provide guidelines for consistent protection across industries. They are created by:

- Vendors
- Government agencies
- Independent organizations

Organizations can customize standards to meet specific needs while maintaining best practices.

:::info[Sample Scenario]

Company XYZ will adopt the Center for Intenet Security Benchmark Standard for Windows Server 2012 R2 systems, dated April 28, 2016, with the following modifications:

**Change Requirement**:
    
**Section 1.1.2**: Use a 180-day password expiration instead of the standard's default 60-day expiration period.

**Section 1.2.2**: Lock out accounts after five incorrect logins instead of the standard's default 10-attempt threshold

:::

