---
title: "Security Policies"
description: "Common security policies"
tags: 
- Security
- Cybersecurity
- Security Operations
- Security Foundations
sidebar_position: 12
last_update:
  date: 1/30/2024
---

## Overview 

Every policy should align with the organization's regulatory and contractual obligations. Balancing comprehensiveness with user-friendly simplicity can be challenging.

## Employee/Contractor Hiring 

- **Hiring phase:**

  - Social media analysis
  - Web search 
  - Background check 
      - Criminal record
      - Unpaid fines
      - Credit check
      - Interview with references 
      - Employment and education verification


      :::info 

      Normal hiring processes typically do not include extensive psychological and emotional evaluations, which may be a violation of a person’s rights. 

      :::

- **User Onboarding:**

  - Signing NDAs 
  - Security POlicy Awareness 
  - User account and resource access 
  - Issuance of security badge and smart cards

- **User Habits:**

  - Clean desk policies 
  - Shredding of sensitive documents
  - Secure personally-owned devices 
  - [MDM (Mobile Device Management)](/docs/007-Cybersecurity/024-Infrastructure-and-Network/059-Mobile-Systems.md#mobile-device-management)
  - [BYOD (Bring your own device)](/docs/007-Cybersecurity/029-Security-Operations/073-Mobile-Asset-Deployments.md#byod)

- **User Training:**

  - Ongoing, role-based
  - Computer-based training 
  - Gamification like CTF contests 
  - Phishing campaigns/simulations

- **User Offboarding:**

  - Termination Letter 
  - Exit Interview 
  - Return of equipment
  - Knowledge Transfer
  - Disable and delete accounts

## Accounts/Credential Policy 

Defines who get access to what. 

- Employees
- Contractors
- Devices 
- Service Accounts 
- Administrators/Root accounts
- PAM

## Privileged User Agreement 

A privileged user agreement is a policy that users must accept before being granted higher-level access, such as admin or root privileges. It ensures users understand their responsibilities and agree not to misuse their access.

- Users must not share privileged accounts or passwords
- Access is granted only for approved job-related tasks
- All activity may be monitored and audited for security compliance

## Data Handling Policy

A critical policy ensuring proper data use, including:

- Internal or external data use
- Restrictions based on roles
- Legal usage definitions
- Compliance with laws and regulations
- Example: PCI DSS compliance for credit card data
- Encryption requirements for classified data

## Password Policy

Every organization requires a comprehensive password policy for secure data access, including:

- Leadership commitment
- Password formulation standards
- Designated policy enforcers

Password Security:

| **Criteria**     | **Details**                                                |
| ---------------- | ---------------------------------------------------------- |
| **Length**       | Recommended 12–16 characters                               |
| **Complexity**   | Alphanumeric + symbols                                     |
| **Reuse**        | If one account is compromised, another is also at risk     |
| **Expiration**   | Change password every 90 days                              |
| **Password Age** | Minimum number of days before the user can change it again |
| **Risky Logins** | Lock accounts after a number of incorrect attempts         |


Example:

Setting a minimum password age to three days, for example, will prevent users from, upon password change, immediately cycling through the number of passwords remembered to reuse a familiar password they have already used.


:::info 

When an attacker attempts to guess a user’s password, they are allowed only a limited number of tries before the account is “locked out.” This helps prevent brute-force attacks. The security professional sets the threshold, known as the **clipping level**, which also determines when the account can be unlocked. The term “clipping level” refers to a general limit and isn’t only used for passwords or login attempts.


:::

## Standard Operating Procedure (SOP)

A **Standard Operating Procedure (SOP)** provides detailed, step-by-step instructions to perform a task consistently and securely, such as applying patch updates according to a **secure baseline**.

- SOPs ensure **compliance** with security standards and policies.
- They reduce errors by **standardizing processes**.
- Help auditors and admins verify that patching is done correctly and securely.


## Bring Your Own Device (BYOD)

BYOD allows employee use of personally owned devices for business, requiring:

- Clear policies and business rules
- Employee agreement before system access

## Privacy Policy

Crucial for personnel with PII access, outlining:

- PII definition
- Handling procedures
- Expectations and enforcement
- References to applicable regulations
- Creation of a public document

## Acceptable Use Policy

It is a document that outlines the do's and don'ts for users when interacting with an organization's IT systems and resources.

- Data access
- System access
- Data disclosure
- Passwords
- Data retention
- Internet usage
- Company device usage

## Information Security Policy

Outlines how an organization protects its information assets from threats, both internal and external. These policies cover a range of areas, including

- Data Classification
- Access Control 
- Encryption 
- Physical Security

It contains a clear designation of a specific individual who will be responsible for information security matters. This doesn't need to include the name of the person, but the responsibility is assigned to a role, such as the CISO or Chief Information Security Officer. The policy will also inclue the roles and responsibilities of the managers, employees, and other officers within the organization.

## Business Continuity Policy 

Focuses on how an organization will continue its critical operations during and after a disruption. 

- Outline the steps to ensure minimal interruption to services.
- Focuses on recovering as quickly as possible.
- Dealing with strategies like hardware failure and natural disasters. 

For more information, please see [Business Continuity.](/docs/007-Cybersecurity/030-Incident-Response/010-Business-Continuity.md)

## Disaster Recovery Policy

Closely related to business continuity, disaster recovery focuses on how an organization will recover its IT systems and data after disaster. 

- Outlines steps for data backup and restoration.
- Hardware/software recovery, as well as alternative processing locations.

For more information, please see [Disaster Recovery.](/docs/007-Cybersecurity/023-Security-Architecture/011-HA-and-DR.md)


## Incident Response Policy

A plan for handling security incidents. 

- Involves steps on detecting, assessing, and responding to incidents.
- Can include person to contact in case of data breach. 

For more information, please see [Incident Response Policy.](/docs/007-Cybersecurity/030-Incident-Response/001-Incident-Responses.md)


## SDLC Policy 

A software development lifecycle (SDLC) policy guides how software is developed within an organization. It covers all stages of software development:

- Initial requirements gathering 
- Design 
- Coding 
- Testing 
- Maintenance

It may also include standards:

- Secure coding practices 
- Code reviews
- Software testing

## Change Management Policy

Essential for transitioning from current to future states, covering:

- Decision-making process
- Implementation of changes
- Confirmation of correct implementation
- Mitigating vulnerabilities introduced by changes

For more information, please see [Asset and Change Management](/docs/007-Cybersecurity/029-Security-Operations/070-Asset-and-Change-Management.md#change-management). 



