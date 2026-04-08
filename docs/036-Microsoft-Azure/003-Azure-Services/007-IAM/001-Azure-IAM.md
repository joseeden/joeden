---
title: "Azure IAM"
id: azure-iam-overview
description: "Identity and Access Management"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 1
last_update:
  date: 11/16/2020
---



## Identity and Access Management 

Azure provides tools to manage identities and control access, and it helps organizations secure their resources effectively.

| Feature                 | Description                                                                                         |
| ----------------------- | --------------------------------------------------------------------------------------------------- |
| RBAC                    | <ul><li>Gives precise control over who can access Azure resources</li></ul>                         |
| Azure AD                | <ul><li>Manages user identities and application access</li><li>Supports external partners</li></ul> |
| Azure AD DS & Azure MFA | <ul><li>Strengthen security</li><li>Simplify authentication</li></ul>                               |


## Role-Based Access Control (RBAC)

RBAC is built on Azure Resource Manager and provides detailed access control for Azure resources.

- Assigns users to roles with specific permissions and scope.
- Ensures users have only the access they need ([least privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege)).
- Helps separate duties across teams.
- Ideal for organizations with multiple resources and teams.

**Example Scenario:**

- Different teams manage specific resources (e.g., VMs, networks, databases).
- Each user gets only the access needed for their role, reducing risk.

![](/img/docs/azure-rbac-recommended-by-azure.png)


## Microsoft Entra ID 

Previously known as "Azure Active Directory", Microsoft Entra ID is a cloud-based identity and access management service by Microsoft which allows you to control access to internal and external resources. 

For more information, please see [Microsoft Entra ID.](/docs/036-Microsoft-Azure/003-Azure-Services/007-IAM/010-Azure-AD.md)

| Role           | Description                                                                                                                     |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| IT Admins      | <ul><li>Control access to applications</li><li>Enforce multi-factor authentication</li><li>Automate user provisioning</li></ul> |
| App Developers | <ul><li>Add single sign-on to applications</li></ul>                                                                            |
| Subscribers    | <ul><li>Automatic Azure AD tenants for services like Microsoft 365, Office 365, and Azure</li></ul>                             |


## Identity Protection 

This feature automatically detects and assesses risks associated with user logins. Key functionalities include:

- **Automated Risk Detection**

 - Detects suspicious logins (e.g., unusual locations or anonymous IPs)
 - Identifies password spray attacks (same password across multiple accounts)
 - Flags other risky sign-in behaviors

- **Automated Remediation**

 - Triggers can be configured for risky logins
 - Can require MFA or blockng the login attempt

- **Manual Investigation**

 - Allows administrators to review risky sign-ins
 - Can override automated actions 
 - Supports custom investigation processes

- **Integration with SIEM**

 - Export risk detection data to [SIEM](/docs/025-Cybersecurity/029-Security-Operations/032-SIEM.md) systems
 - Supports centralized monitoring and advanced analysis



## Privileged Identity Management (PIM)

Microsoft’s Privileged Identity Management (PIM) protects administrator accounts and prevents unauthorized access, and it ensures that elevated privileges are granted only when needed.

| Feature                 | Description                                                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Access Reviews**      | PIM requires regular reviews of administrator accounts, and Access Reviews are the process to ensure only necessary privileges remain assigned.                        |
| **Just-In-Time Access** | PIM enforces temporary elevation of privileges, and Just-In-Time Access is how eligible users request and gain those elevated roles only when needed.                  |
| **Audit Trail**         | PIM logs all privileged activities, and the Audit Trail provides a detailed record of who activated roles, when, and what actions were taken, ensuring accountability. |

#### How "Just-In-Time Access" works 

1. Certain users are marked as eligible for administrator tasks
2. These certain users do not have permanent permissions.
3. When they need elevated access, they request role activation.
4. They may complete multifactor authentication and provide a reason.
5. If approval is required, an approver activates the role.
6. The activation lasts for a limited time, and users must repeat the process for future tasks.

