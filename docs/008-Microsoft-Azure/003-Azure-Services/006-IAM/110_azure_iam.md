<!-- ---
title: "Azure IAM "
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Identity and Access Management 

Azure provides a comprehensive suite of access management and identity services, allowing organizations to tailor their security measures based on specific needs. 

- Role-Based Access Control (RBAC) ensures granular control over resource Access.
- Azure AD facilitates secure identity and access management for users, applications, and external collaborations. 
- Additionally, services like Azure AD DS and Azure MFA enhance security and streamline authentication processes.

## Role-Based Access Control (RBAC)

RBAC is an authorization system built on Azure Resource Manager, providing fine-grained access management for Azure resources.
- Manages user access to specific Azure resources, defining their permissions and scope.
- Enables segregation of duties, granting users the least privilege needed for their tasks.
- Minimizes security risks by granting least privilege.
- Effective in complex organizations with diverse resource needs.

**Example Scenario**
  - Allow different user groups to manage distinct resources (e.g., VMs, virtual networks, SQL databases) based on their roles.
  - Enables segregation of duties within your organization by allowing only the least amount of access that is needed by users to do their jobs.

![](/img/docs/azure-rbac-recommended-by-azure.png)



  


## Microsoft Entra ID (previously "Azure Active Directory")

Azure Active Directory is a cloud-based identity and access management service by Microsoft which allows you to control access to internal and external resources. 

- It allows you to create and manage user accounts. 
- Then when a user logs in to one of your IT systems, the system will ask for their username and password and then verify these credentials with Active Directory before letting the user in. 
- This process is known as **authentication.**

When you set up an environment on Azure, instead of using Active Directory, you use Azure Active Directory. 

- It’s quite similar, but it’s used for accessing cloud applications. 
- That includes cloud applications outside of Azure, too, such as Microsoft 365. 
- It can even be used for accessing web-based applications in your on-premises environment.

**Usage**

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


- **Automated Risk Detection:**

    - Identifies suspicious activities such as logins from anonymous IP addresses or unexpected locations.
    - Detects password spray attacks where an attacker attempts the same password across multiple accounts.

- **Automated Remediation:**

    - Configurable actions triggered upon detecting risky login attempts.
    - Options include requiring multifactor authentication or blocking the login attempt.

- **Manual Investigation:**

    - Organizations can choose to investigate detected risks manually if they opt not to use automated remediation.

- **Integration with SIEM:**

    - Export risk detection data to Security Information and Event Management (SIEM) systems for additional analysis.


  


## Privileged Identity Management (PIM)

To safeguard administrator accounts and prevent unauthorized access, Microsoft offers the Privileged Identity Management (PIM) service. PIM focuses on:


### Access Reviews

This requires the regular reviews of the list of administrators to ensure only necessary privileges are assigned.

### Just-In-Time Access

Eligible users request activation of elevated roles only when needed. Activation may require multifactor authentication, role activation approval, and a specified reason.

**How it works:**

1. Certain users are designated as eligible to perform administrator tasks but don’t have those permissions all the time. 

2. If an eligible user needs to perform an administrator task, then they have to request activation of an elevated role.

3. The user might have to perform multifactor authentication. 

4. They have to enter a reason for the activation request. 

5. Finally, if the role requires activation approval, then they’ll have to wait for an approver to activate their role. 

6. This activation will only last for a limited amount of time, so after the activation expires, they’ll have to go through the same process again.

### Audit Trail

Maintains a detailed audit trail of administrator activities for accountability and security monitoring.    


  


## External Identities

For scenarios where external users, such as partners, suppliers, or customers, require access, Azure AD provides the External Identities feature. It includes three components:


### B2B Collaboration

- External users represented in your Azure AD directory as guest users.

### B2B Direct Connect

- Establishes a mutual trust relationship with another Azure AD organization.
- External users aren't represented in your directory; your directory trusts identities in their directory.
- Primarily supports Microsoft Teams shared channels.

### Azure AD B2C (Business-to-Consumer)

- Enables the publishing of consumer-facing applications for customer access.
- Functions as a separate service built on Azure AD technology.


  


## Azure AD Connect 

|![](/img/docs/azure-ad-connectsss.png)|
|-|


Naturally, if you already have an on-premises Active Directory implementation, you don’t have to recreate all of your users and groups in Azure Active Directory. Instead, you can synchronize your accounts between the two systems using Azure AD Connect. 

- Autoamtically creates accounts on Azure for you
- Keeps the accounts sync when changes are made to the accounts in Active Directory. 
- Allows you to use **single sign-on (or SSO)**, which means that users only need to log in once to access both their on-premises environment and their Azure environment. 
- You can also use SSO to access Microsoft 365.


## Azure AD Tenant

When you sign up for an Azure subscription, an Azure AD tenant is automatically created. 

- This tenant is an instance of Azure AD that’s dedicated to your organization. 
- You can have separate tenant for each customer. 
- Each tenant has its own dedicated directory of users, groups, and apps.

|![](/img/docs/azure-ad-tenant.png)|
|-|

### Multiple Subscriptions and Tenants 

One common practice is to have a separate subscription for each department so that each of them can manage their own Azure resources. If you wanted to, you could have a separate tenant in each subscription, but this usually doesn’t work very well. 

![](/img/docs/azure-multi-subscriptions-tenants.png)

### Shared Tenants 

Many organizations will share the same tenant among all of their subscriptions. That way, users, groups, and apps can be centrally managed while Azure resources can be managed by individual departments.

![](/img/docs/azure-ad-shared-tenants.png)

If you want to move an existing subscription to a central tenant

- Change which tenant its= is associated with it. 
- Note that a subscription can’t have multiple tenants associated with it.



  


## Azure AD Services

### Azure AD B2B (Business-to-Business)

- Enables secure sharing of apps and services with guest users from external organizations, while allowing them to retain control over their data.
- Provides an easy-to-use invitation and redemption process for external users to use their own credentials to access partner resources.

    ![](/img/docs/azure-b2b.png)

### Azure AD B2C (Business-to-Customer)

- Offers identity as a service for customer access via single sign-on.
- Supports standards-based authentication protocols::
    - OpenID Connect
    - OAuth 2.0
    - SAML
- Integrates with various applications and commercial software.

    ![](/img/docs/azure-b2ccc.png)


  


### Microsoft Entra Domain Services (formerly Azure AD Domain Services)

#### The Challenge of Legacy Authentication Protocols 

When migrating on-premises applications to Azure, a potential challenge arises when these applications use legacy authentication protocols such as NTLM or Kerberos. 

![](/img/docs/all-things-devops-Page-6.png)

Dealing with this issue requires careful consideration. Possible solutions can include:

- **Azure Users Authenticating to On-Premises Active Directory:**

    - **Disadvantage:** Not recommended for migration to Azure.
    - **Implication:** Azure users authenticate to on-premises Active Directory.

- **Running Azure-Based Active Directory Domain Controllers:**

    - **Approach:** Deploy and replicate Active Directory domain controllers on Azure.

    - **Disadvantage:** Requires regular maintenance tasks (e.g., patching, backups).

- **Azure AD Domain Services (Azure AD DS):**

    - **Managed Implementation:** Azure AD DS is a managed service that handles domain controller operations.

    - **Advantages:**
        - Legacy Authentication Support: Supports legacy authentication protocols (e.g., NTLM, Kerberos).

#### Microsoft Entra Domain Services

Microsoft Entra Domain Services or previously known as Azure AD Domain Services or Azure AD DS is a cloud offering providing managed domain services compatible with on-prem Active Directory.

- Eliminates the need for deploying, managing, or patching domain controllers.
- Access to resources can be controlled through existing groups and user accounts.
- Replicates identity information from Azure AD or synchronizes from on-prem Active Directory.
- Use **Azure AD Connect** to sync on-prem AD with you Azure AD Domain Services.
- LDAP Support: Facilitates applications using Lightweight Directory Access Protocol (LDAP).
- Windows 10 Computer Integration: Allows joining computers to domains and applying group policies.

- Features include:
    - Domain Join
    - LDAP
    - Kerberos
    - NTLM Authentication
    - Group Policy support
       

    ![](/img/docs/azure-adds-sync-onprem-to-azure-ad.png)



  


## Azure Multi-Factor Authentication (MFA)

Two-step verification for enhanced security, requiring multiple authentication methods.
- Combines the following:
    - something the user knows (password), 
    - something they possess (e.g., smartphone), and 
    - something they are (biometrics).
- Usage:
   - Protects data and applications without compromising user experience.
   - Included in Azure AD Premium, Microsoft 365 Business, Azure AD Free, and standalone Office 365 licenses.
   - Additional features in premium versions, including Conditional Access policies.
      

    ![](/img/docs/azure-mfa-how-to-get.png)


### MFA Supported Methods

What you have:

- Access codes via SMS
- Access codes sent via voice call
- Microsoft Authenticator app
- Hardware keys
- OATH software tokens.

What you are:

- Currently supports Windows Hello for Business and fingerprints recognition.

### Passwordless Methods 

Simplifies authentication by eliminating the need for a password.

- Windows Hello
- Microsoft Authenticator
- FIDO2 security keys.

### Licensing 

- **Free Version:** 

    - Supports MFA through the Microsoft Authenticator app.

- **Azure AD Premium:** 

    - Offers additional authentication methods and conditional access features.
    - Conditional access gathers identity signals, such as what device you’re using
    - Then it makes a decision based on rules you’ve configured.
    - Finally, it enforces that decision, such as by blocking access.

### Conditional Access 

Defines conditions for user access based on various factors.

- Supports various authentication methods.
- Requires specific conditions for login (e.g., device type, location).
- Enforces security standards on managed devices.
- Utilizes mobile device management tools (e.g., Microsoft Intune).

#### Testing and Validation

- Use the **What If Tool** to test conditional access policies before implementation.
- This ensures that new policies do not inadvertently disrupt user access.

#### Licensing Management

- You need to assign a Premium license to each user account.
- Azure AD is licensed on a per-account basis.
- To make this process easier, you can assign a license to a group instead.
- You can also assign other types of licenses, such as Microsoft 365 licenses, to both users and groups.

#### Dynamic Membership Rules

- Allows you to keep groups up to date.
- Provided by Microsoft, this automatically adds or removes users in groups based on predefined rules.
- Example: "All users" rule to ensure all users are subject to conditional access policies.

  


## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/) -->
