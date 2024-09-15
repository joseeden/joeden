---
title: "Baselines and Standards"
description: "Security Baselines and Security Standards"
tags: [Security, Cybersecurity, Data Security]
sidebar_position: 49
last_update:
  date: 1/30/2024
---

## Overview 

A security baseline is a set of basic security controls and practices that ensures a minimum level of security in an organization. 

- A named individual or officer is responsible for the security of devices.
- The devices should be protected against unauthorized access attempt.
- The devices does not jeopardize other systems or data.
- The devices should remain under the positive control of trained system administrators.
- All activities on the devices should comply with the organization's data security requirements.

## Baselines 

Here are the key components of a security baseline:

- **Establish Minimum Security Requirements**
  - Define the essential security controls that must be implemented.
  - Ensure these controls address common threats and vulnerabilities.

- **Standardize Security Practices**
  - Develop standardized procedures for common security tasks.
  - Ensure consistency across all systems and departments.

- **Regularly Update Baselines**
  - Review and update the security baseline to address new threats.
  - Incorporate lessons learned from security incidents and audits.

- **Implement Access Controls**
  - Define and enforce access control policies.
  - Ensure that only authorized individuals have access to sensitive information.

- **Monitor Compliance**
  - Regularly assess systems and processes to ensure compliance with the baseline.
  - Use audits and continuous monitoring to identify and address deviations.

- **Provide Training and Awareness**
  - Educate employees about the security baseline and their roles in maintaining it.
  - Promote a culture of security awareness within the organization.

- **Document and Communicate**
  - Clearly document the security baseline and make it accessible.
  - Communicate baseline requirements and updates to all relevant stakeholders.



## System Configuration Managers

System configuration managers play an important role in automating the deployment of configuration templates across end-user devices. By utilizing these tools, organizations can ensure consistent application of security controls and reduce the risk of human error in manual configurations.

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

- Users might accidentally adjsut settings.
- Administrators might make errors in Group policies.
- Attackers might undermine security or any number of other activities that may cause deviation from the baseline.

As a solution, administrators can leverage automated monitoring solutions to rapidly check thousands of systems against the baseline and quickly identify any deviations that require further investigations.

## Industry Standards on Security

Industry standards on security provide a set of guidelines and best practices that organizations can follow to protect their information systems. These standards help ensure a consistent and effective approach to security across different industries and sectors. They are often developed by 

- Vendors 
- Government agencies
- Independent organizations

Organizations can also customize industry standards according to their specific requirements by creating their own security standards that reference and modify existing standards. This allows for flexibility while still adhering to recognized best practices. For example:


:::info[company standard]

Company XYZ will adopt the Center for Intenet Security Benchmark Standard for Windows Server 2012 R2 systems, dated April 28, 2016, with the following modifications:

**Change Requirement**:
    
**Section 1.1.2**: Use a 180-day password expiration instead of the standard's default 60-day expiration period.

**Section 1.2.2**: Lock out accounts after five incorrect logins instead of the standard's default 10-attempt threshold

:::

