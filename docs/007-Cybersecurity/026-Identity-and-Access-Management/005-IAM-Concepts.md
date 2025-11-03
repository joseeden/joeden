---
title: "IAM Concepts"
description: "Identity and Access Management"
tags: [Security, Cybersecurity, Access Management, IAM]
sidebar_position: 5
last_update:
  date: 1/30/2024
---



## User Account Control 

A mechanism designed as a security checkpoint to ensure that actions requiring administrative rights are explicitly authorized by the user. When a user tries to install a software, a pop-up will appear prompting him to enter an admin user and password.

## Decentralized Access Control

Decentralized access control means that access permissions and management are scattered across different departments or systems within an organization.

- Decentralized access control often leads to inconsistent control.
- Results in varying security levels and access rights.
- Maintaining a consistent access control policy becomes challenging.

Example:

- Department A may enforce strict access controls
- Department B adopts lax controls, posing security risks.
- Varying access controls between departments pose security risks.
- Inconsistencies may lead to unauthorized access, breaches, and challenges in auditing.

## Password Security  

Measures the password's ability to resist guessing and brute-force attacks.
For more information, please see [Common Security Policies.](/docs/007-Cybersecurity/020-Security-Foundations/012-Security-Policies.md#password-policy) 


## Cognitive Passwords

Cognitive passwords rely on personal knowledge or patterns that only the user would know, such as favorite phrases, personal facts, or answers to security questions.

Examples of cognitive passwords:

- What was the name of your first pet?
- In which city were you born?
- What is your mother’s maiden name?
- What was the make/model of your first car?
- What was the name of your elementary/primary school?


## `Verification 1:1` 

Verification 1:1 is the process of confirming an individual's identity by comparing the provided credentials against a single, specific record in a database.

- Commonly used in login systems, ID checks, and secure access points.
- Helps prevent impersonation and unauthorized access.
- Paired with multi-factor authentication for stronger security.

## Sensitivity 

Sensitivity is also defined as the measure of the importance assigned to information by its owner, or the purpose of representing its need for protection (see the ISC2 study guide, module 1, under CIA Deep Dive).

## Non-repudiation

Non-repudiation is a legal term that refers to protecting against false denial of a specific action by an individual. It determines whether an individual performed actions like creating, approving, or sending/receiving information.

- **Relevance in E-commerce**
  - Crucial in the context of e-commerce and electronic transactions.
  - Prevents impersonation or denial of actions
  - Example: Making a purchase online and later denying it.

- **Trust in Online Transactions**
  - Ensures trust in online transactions.
  - Holds individuals accountable for the transactions they conduct.

- **Methodologies**
  - Non-repudiation methodologies are employed to establish accountability.
  - Helps in verifying and confirming actions performed by individuals.

:::info 

**Accountability** is assured by the uniqueness of an identity and its binding to a single individual. 

:::

## Privacy 

Privacy is the right of an individual to control the distribution of information about themselves.

- **Security and Privacy**
  - Privacy ensures personal data are protected from misuse, unauthorized access, and disclosure.
  - Security refers to mechanisms that can be put into place to provide this level of control.

- **Confidentiality and Privacy**
  - Confidentiality focuses on data protection
  - Privacy focuses on appropriate handling of personal information.

- **Privacy Legislation Importance**
  - Increasing data collection emphasizes the need for privacy legislation and compliance.
  - Global impact, irrespective of physical location, in today’s digital era.

- **Global Privacy Considerations**
  - Crucial issue, especially concerning personal information collection and security requirements.
  - Laws, like **GDPR**, have multinational implications affecting organizations globally.

- **HIPAA in the U.S.**
  - Health Insurance Portability and Accountability Act (HIPAA).
  - Governs the maintenance of privacy for medical information.

- **GDPR in the EU**
  - General Data Protection Regulation (GDPR).
  - Provides individuals in the EU control over personal information retention by companies.


- **Data Protection Responsibilities**
  - Security measures alone are insufficient
  - Organizations must abide by privacy requirements to avoid penalties 

## Principle of Least Privilege

The Principle of Least Privilege dictates that users or programs should be granted the minimum access essential to fulfill their functions. Access is restricted to the specific systems and programs required for their designated job or tasks.

## Segregation of Duties 

In cybersecurity, 'segregation', or 'segregation of duties', or 'separation of duties' (SoD), is a security principle designed to prevent fraud or error by dividing tasks among multiple persons.It is an administrative control that reduces the risk of potential errors or fraud from a single person having control over all aspects of a critical process.

For more information, please see [Privilege Access Management.](/docs/007-Cybersecurity/026-Identity-and-Access-Management/011-Privilege-Access-Management.md)

## Trust but Verify 

The "Trust but verify" model is a method of threat protection that involves granting privileged accounts access to the network and other resources, while at the same time verifying their actions and activities. 

- Limitations in this model expose organizations to security threats.
- Increasingly abandoned in favor of the [Zero Trust model.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/052-Infrastructure-Controls.md#zero-trust-model)
- Other options are considered best practices in access management.


## Need to Know 

Need to know is a principle that limits access to information to only those who require it to perform their job duties (see ISC2 Study Guide, Chapter 3, Module 1). 

Example:

- John requests access to a database containing sensitive HR records.
- He has high-security clearance but is denied access to HR records.
- Access denied due to lack of business justification.
- Upholds data confidentiality and restricts access based on job roles.
- Ensures adherence to security principles.

## Due Care 

Due care refers to the ongoing actions an organization takes to protect its assets, reputation, and operations.

- Also known as **the prudent person rule**
- Refers to what a prudent person would do in a given situation
- Involves applying security policies, standards, and best practices
- Tasks like patching and security practices are part of due care

It emphasizes not only the development but also the continuous application of security policies, procedures, and controls to maintain a secure environment over time.

## Collusion 

Collusion occurs when two or more individuals work together to circumvent the segregation of duties for fraudulent purposes.

## Interoperability 

The ability of different systems, devices, and applications to work together 
and share information.

- Can involve standards such as SAML or OpenID connect
