---
title: "Azure IAM"
description: "Identity and Access Management"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 11/16/2020
---



## Identity and Access Management 

Azure provides a comprehensive suite of access management and identity services, allowing organizations to tailor their security measures based on specific needs. 

- Role-Based Access Control (RBAC) ensures granular control over resource Access.
- Azure AD facilitates secure identity and access management for users, applications, and external collaborations. 
- Additionally, services like Azure AD DS and Azure MFA enhance security and streamline authentication processes.

## Role-Based Access Control (RBAC)

RBAC is an authorization system built on Azure Resource Manager, providing fine-grained access management for Azure resources.
- Manages user access to specific Azure resources, 
- Define their permissions and scope.
- Enables segregation of duties
- Grant users the [least privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) needed for their tasks.
- Effective in organizations with diverse resource needs.

Example Scenario:

  - Allow different user groups to manage distinct resources (e.g., VMs, virtual networks, SQL databases) based on their roles.
  - Enables segregation of duties within your organization by allowing only the least amount of access that is needed by users to do their jobs.

    ![](/img/docs/azure-rbac-recommended-by-azure.png)




## Microsoft Entra ID 

previously known as "Azure Active Directory", Microsoft Entra ID is a cloud-based identity and access management service by Microsoft which allows you to control access to internal and external resources. 

- It allows you to create and manage user accounts. 
- Then when a user logs in to one of your IT systems, the system will ask for their username and password and then verify these credentials with Active Directory before letting the user in. 
- This process is known as **authentication.**

When you set up an environment on Azure, instead of using Active Directory, you use Azure Active Directory. 

- It’s quite similar, but it’s used for accessing cloud applications. 
- That includes cloud applications outside of Azure, too, such as Microsoft 365. 
- It can even be used for accessing web-based applications in your on-premises environment.

Usage:

- IT Admins: 
   - Control access to applications
   - Enforce multi-factor authentication
   - Automate user provisioning.

- App Developers: 
   - Add single sign-on to applications.

- Subscribers: 
   - Automatic Azure AD tenants for services like Microsoft 365, Office 365, and Azure.



## Identity Protection 

This feature automatically detects and assesses risks associated with user logins, including potential intrusion attempts. Key functionalities include:


- **Automated Risk Detection**

    - Identifies suspicious activities such as logins from anonymous IP addresses or unexpected locations.
    - Detects password spray attacks where an attacker attempts the same password across multiple accounts.

- **Automated Remediation**

    - Configurable actions triggered upon detecting risky login attempts.
    - Options include requiring multifactor authentication or blocking the login attempt.

- **Manual Investigation**

    - Organizations can choose to investigate detected risks manually if they opt not to use automated remediation.

- **Integration with SIEM**

    - Export risk detection data to Security Information and Event Management (SIEM) systems for additional analysis.
    - For more information, please see [SIEM](/docs/025-Cybersecurity/029-Security-Operations/032-SIEM.md)



## Privileged Identity Management (PIM)

To safeguard administrator accounts and prevent unauthorized access, Microsoft offers the Privileged Identity Management (PIM) service. PIM focuses on:


### Access Reviews

This requires the regular reviews of the list of administrators to ensure only necessary privileges are assigned.

### Just-In-Time Access

Eligible users request activation of elevated roles only when needed. Activation may require multifactor authentication, role activation approval, and a specified reason.

**How it works**

1. Certain users are designated as eligible to perform administrator tasks but don’t have those permissions all the time. 

2. If an eligible user needs to perform an administrator task, then they have to request activation of an elevated role.

3. The user might have to perform multifactor authentication. 

4. They have to enter a reason for the activation request. 

5. Finally, if the role requires activation approval, then they’ll have to wait for an approver to activate their role. 

6. This activation will only last for a limited amount of time, so after the activation expires, they’ll have to go through the same process again.

### Audit Trail

Maintains a detailed audit trail of administrator activities for accountability and security monitoring.    


  
