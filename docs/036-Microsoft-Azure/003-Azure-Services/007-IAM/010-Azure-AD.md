---
title: "Azure AD"
description: "Active Directory in Azure"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 10
last_update:
  date: 11/16/2020
---

## Overview

Azure AD, now called **Microsoft Entra ID**, is Microsoft's cloud-based identity and access management service which allows you to control access to internal and external resources. 

- It allows you to create and manage user accounts. 
- Supports cloud apps like Microsoft 365 and on-premises apps
- Works with users, groups, devices, and roles

When you set up an environment on Azure, instead of using Active Directory, you use Azure Active Directory. 

- Similar, but it’s used for accessing cloud applications. 
- Includes cloud applications outside of Azure, too, such as Microsoft 365. 
- used for accessing web-based appSs in your on-premises environment.

To access it, go to the Microsoft Azure portal and search for **Microsoft Entra ID**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14155052.png)

</div>

You should see the **Overview** page:

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14182707.png)

</div>

To go the Entra Admin Center, scroll down and click **Go to Microsoft Entra**.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14182857.png)

</div>

The Microsoft Entra admin center:

<div class='img-center img-border-color'>

![](/img/docs/Screenshot2026-03-14183107.png)

</div>


## Core Components 

### Users 

Users represent individual identities in your organization. There are two types of users:

- **Internal users** are usually employees
- **External users** can be guests, e.g vendors, partners who need temporary access. 

Administrators can track user information such as sign-ins, roles, group memberships, and registered devices. This helps keep access secure and easier to manage.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14183604.png)

</div>

In the Microsoft Entra Admin Center, click **Users** to view the users.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14184518.png)

</div>

To add a user, click **New user.** It provides you with options: Create a new user or Invite an external user.

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14184721.png)

</div>


### Groups 

**Groups** simplify permission management by letting you assign access to many users at once.

- Security groups control access to resources
- Microsoft 365 groups support collaboration and teamwork

Security groups are commonly used to control access to applications, resources, or services. Microsoft 365 groups are designed for collaboration features such as shared mailboxes, calendars, and files. 

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14183659.png)

</div>


### Devices

Devices represent computers or mobile devices that are connected to the organization's identity system.

- Devices can be registered in Entra ID
- Devices allow secure access to resources
- Devices can follow compliance policies

When a device is registered, Microsoft Entra ID can monitor its status and apply security policies. Administrators can check device health and enforce rules before allowing access to company resources. 

Devices can also support **hybrid identity environments**, where systems work across both cloud and on-premises infrastructure.

### Roles 

Roles define what actions a user is allowed to perform inside Microsoft Entra ID.

- Roles control permissions for administrators
- Built-in roles provide common permissions
- Custom roles allow specific access control

Microsoft Entra ID includes built-in administrative roles such as **Global Administrator** and **User Administrator**. These roles already contain predefined permissions for managing users, applications, and services.

Organizations can also create **custom roles** when they need more specific permission sets. This helps ensure users receive only the access required to perform their job.

Using roles keeps administrative access controlled and prevents users from having unnecessary privileges.


## External Identities

External Identities allow organizations to give access to people outside the company, such as partners, suppliers, or customers.

- B2B Collaboration (part of Azure AD B2B)
- B2B Direct Connect (part of Azure AD B2B)
- Azure AD B2C (Business-to-Consumer)

These features help organizations securely work with external users while still controlling access through Microsoft Entra ID.

### Azure AD B2B (Business-to-Business)

Azure AD B2B enables secure sharing of apps and services with guest users from external organizations while allowing them to retain control over their data. 

![](/img/docs/azure-b2b.png)

**Note**: Azure AD B2B is the main term for external collaboration in Microsoft Entra ID. It includes two approaches:

| Term               | How it works                                                            | Example                                     |
| ------------------ | ----------------------------------------------------------------------- | ------------------------------------------- |
| B2B Collaboration  | External users are added as guest accounts in your directory            | A partner accessing a shared app as a guest |
| B2B Direct Connect | Creates a trust relationship with another tenant without guest accounts | Teams shared channel with another company   |

### B2B Collaboration

With B2B Collaboration, the external users appear as **guest accounts** in the directory and can access specific applications or resources that are shared with them.

- External users are added as guest users
- Guest users exist in your directory
- Access can be controlled with groups and roles

This allows organizations to collaborate with partners while still controlling permissions.

### B2B Direct Connect

B2B Direct Connect establishes a direct trust relationship between two organizations

- External users are not stored in your directory
- Mainly used for Microsoft Teams shared channels

Instead of creating guest accounts, the user continues to authenticate in their own organization.

This model is mainly used for **Microsoft Teams shared channels**.

### Azure AD B2C (Business-to-Consumer

Azure AD B2C (Business-to-Consumer) is designed for applications used by customers rather than employees or partners.

- Used for customer-facing applications
- Allows customers to sign in using different identity providers
- Runs as a separate service built on Azure AD technology

It allows organizations users to authenticate using social accounts or other identity providers. It operates as a separate service but uses the same identity technology as Microsoft Entra ID.

![](/img/docs/azure-b2ccc.png)

It integrates well with various applications and commercial software and supports standards-based authentication protocols:

- OpenID Connect
- OAuth 2.0
- SAML


## Azure AD Connect

![](/img/docs/azure-ad-connectsss.png)

If you already have an on-premises Active Directory implementation, you don’t have to recreate all of your users and groups in Azure Active Directory. Instead, you can synchronize your accounts between the two systems using Azure AD Connect.

- Automatically creates accounts on Azure 
- Keeps accounts synced with on-prem changes

Azure AD Connect also allows single sign-on (SSO), which means users only need to log in once to access both their on-premises environment and their Azure environment. You can also use SSO to access Microsoft 365.

## Azure AD Tenant

When you sign up for an Azure subscription, an Azure AD tenant is automatically created.

- This tenant is an instance of Azure AD that’s dedicated to your organization.
- You can have separate tenants for each customer.
- Each tenant has its own dedicated directory of users, groups, and apps.

    ![](/img/docs/azure-ad-tenant.png)

### Multiple Subscriptions and Tenants

One common practice is to have a separate subscription for each department so that each of them can manage their own Azure resources. If you wanted to, you could have a separate tenant in each subscription, but this usually doesn’t work very well.

![](/img/docs/azure-multi-subscriptions-tenants.png)

### Shared Tenants

Many organizations will share the same tenant among all of their subscriptions. That way, users, groups, and apps can be centrally managed while Azure resources can be managed by individual departments.

![](/img/docs/azure-ad-shared-tenants.png)

If you want to move an existing subscription to a central tenant:

- Change which tenant it is associated with
- Subscription can’t have multiple tenants associated with it

## Azure AD Services

### Microsoft Entra Domain Services 

When migrating on-premises applications to Azure, a potential challenge arises when these applications use legacy authentication protocols such as [NTLM](/docs/025-Cybersecurity/024-Infrastructure-and-Network/020-Authentication-Protocols.md#ntlm) or [Kerberos](/docs/025-Cybersecurity/024-Infrastructure-and-Network/020-Authentication-Protocols.md#kerberos).

![](/img/docs/all-things-devops-Page-6.png)

Dealing with this issue requires careful consideration. Possible solutions can include:

- **Azure Users Authenticating to On-Premises Active Directory:**

  - Not recommended for migration to Azure.
  - Azure users authenticate to on-premises Active Directory.

- **Running Azure-Based Active Directory Domain Controllers:**

  - Deploy and replicate Active Directory domain controllers on Azure.
  - Requires regular maintenance tasks (e.g., patching, backups).

- **Azure AD Domain Services (Azure AD DS):**

  - Managed service that handles domain controller operations.
  - Supports legacy authentication protocols (e.g., NTLM, Kerberos).

**Microsoft Entra Domain Services**, previously known as Azure AD Domain Services or Azure AD DS, provides managed domain services compatible with on-prem Active Directory.

- No need to deploy or maintain domain controllers.
- Control access using existing users and groups.
- Sync identities from Azure AD or on-prem AD.
- Use **Azure AD Connect** for on-prem AD synchronization.
- Supports LDAP and Windows domain join.
- Apply group policies to Windows 10 devices.

**Key features:**

- Domain Join
- LDAP
- Kerberos
- NTLM Authentication
- Group Policy support

![](/img/docs/azure-adds-sync-onprem-to-azure-ad.png)

### Microsoft Identity Platform

The Microsoft Identity Platform extends Entra ID for applications.

- Enables apps to sign in users and request access securely
- Uses OAuth 2.0 for permissions and OpenID Connect for identity
- Includes MSAL, App Registration, and Microsoft Graph API

For more information, please see [Microsoft Identity Platform.](/docs/036-Microsoft-Azure/003-Azure-Services/007-IAM/015-Microsoft-Identity-Platform.md)