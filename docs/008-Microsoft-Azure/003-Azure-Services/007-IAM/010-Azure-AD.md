---
title: "Azure AD"
description: "Active Directory in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 10
last_update:
  date: 7/18/2020
---


## External Identities

For scenarios where external users, such as partners, suppliers, or customers, require access, Azure AD provides the External Identities feature. It includes three components:

- **B2B Collaboration**

    - External users are represented in your Azure AD directory as guest users.

- **B2B Direct Connect**

    - Establishes a mutual trust relationship with another Azure AD organization.
    - External users aren't represented in your directory; your directory trusts identities in their directory.
    - Primarily supports Microsoft Teams shared channels.

- **Azure AD B2C (Business-to-Consumer)**

    - Enables the publishing of consumer-facing applications for customer access.
    - Functions as a separate service built on Azure AD technology.

## Azure AD Connect

![](/img/docs/azure-ad-connectsss.png)

If you already have an on-premises Active Directory implementation, you don’t have to recreate all of your users and groups in Azure Active Directory. Instead, you can synchronize your accounts between the two systems using Azure AD Connect.

- Automatically creates accounts on Azure for you
- Keeps the accounts synced when changes are made to the accounts in Active Directory
- Allows you to use single sign-on (SSO), meaning users only need to log in once to access both their on-premises environment and their Azure environment
- You can also use SSO to access Microsoft 365

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
- Note that a subscription can’t have multiple tenants associated with it

## Azure AD Services

### Azure AD B2B (Business-to-Business)

Azure AD B2B enables secure sharing of apps and services with guest users from external organizations while allowing them to retain control over their data. 

![](/img/docs/azure-b2b.png)

It provides an easy-to-use invitation and redemption process for external users to use their own credentials to access partner resources


### Azure AD B2C (Business-to-Customer)

Azure AD B2C offers identity as a service for customer access via single sign-on. 

![](/img/docs/azure-b2ccc.png)

It integrates well with various applications and commercial software and supports standards-based authentication protocols:
  - OpenID Connect
  - OAuth 2.0
  - SAML


### Microsoft Entra Domain Services 

When migrating on-premises applications to Azure, a potential challenge arises when these applications use legacy authentication protocols such as [NTLM](/docs/005-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#ntlm) or [Kerberos](/docs/005-Cybersecurity/003-Security-Architecture/020-Authentication-Protocols.md#kerberos).

![](/img/docs/all-things-devops-Page-6.png)

Dealing with this issue requires careful consideration. Possible solutions can include:

- **Azure Users Authenticating to On-Premises Active Directory:**
  - Not recommended for migration to Azure.
  - Azure users authenticate to on-premises Active Directory.

- **Running Azure-Based Active Directory Domain Controllers:**
  - Deploy and replicate Active Directory domain controllers on Azure.
  - Requires regular maintenance tasks (e.g., patching, backups).

- **Azure AD Domain Services (Azure AD DS):**
  - Azure AD DS is a managed service that handles domain controller operations.
  - Supports legacy authentication protocols (e.g., NTLM, Kerberos).

**Microsoft Entra Domain Services**, previously known as Azure AD Domain Services or Azure AD DS, is a cloud offering providing managed domain services compatible with on-prem Active Directory.

- Eliminates the need for deploying, managing, or patching domain controllers.
- Access to resources can be controlled through existing groups and user accounts.
- Replicates identity information from Azure AD or synchronizes from on-prem Active Directory.
- Use **Azure AD Connect** to sync on-prem AD with your Azure AD Domain Services.
- **LDAP Support:** Facilitates applications using Lightweight Directory Access Protocol (LDAP).
- **Windows 10 Computer Integration:** Allows joining computers to domains and applying group policies.

Features include:

- Domain Join
- LDAP
- Kerberos
- NTLM Authentication
- Group Policy support

![](/img/docs/azure-adds-sync-onprem-to-azure-ad.png)