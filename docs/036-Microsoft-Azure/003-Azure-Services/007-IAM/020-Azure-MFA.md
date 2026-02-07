---
title: "Azure MFA"
description: "Secure yoru Azure resources with MFA."
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 20
last_update:
  date: 11/16/2020
---



## Azure Multi-Factor Authentication (MFA)

Azure Multi-Factor Authentication (MFA) adds an extra layer of security by requiring multiple methods of authentication. This ensures that even if one method is compromised, unauthorized access is still prevented.

MFA combines: 

- Something the user knows (password)
- Something they possess (e.g., smartphone)
- Something they are (biometrics)

Usage:

- Protects data and applications without compromising user experience
- Included in Azure AD Premium, Microsoft 365 Business, Azure AD Free, and standalone Office 365 licenses
- Premium versions offer additional features like Conditional Access policies

![](/img/docs/azure-mfa-how-to-get.png)

### MFA Supported Methods

What you have:

- Access codes via SMS
- Access codes via voice call
- Microsoft Authenticator app
- Hardware keys
- OATH software tokens

What you are:

- Windows Hello for Business
- Fingerprint recognition

### Passwordless Methods

Simplifies authentication by eliminating the need for a password:

- Windows Hello
- Microsoft Authenticator
- FIDO2 security keys

### Licensing

**Free Version**

- Supports MFA through the Microsoft Authenticator app

**Azure AD Premium**

- Offers additional authentication methods and Conditional Access features
- Conditional Access:
  1. Gathers identity signals (e.g., device used).
  2. Makes decisions based on configured rules.
  3. Finally, it enforces decisions, such as blocking access.

## Conditional Access

Conditional Access defines conditions for user access based on various factors, which enhances security and ensures compliance with organizational policies.

- Supports various authentication methods
- Requires specific conditions for login (e.g., device type, location)
- Enforces security standards on managed devices
- Utilizes mobile device management tools like Microsoft Intune

### Testing and Validation

Use the **What If Tool** to test conditional access policies before implementation, ensuring that new policies do not inadvertently disrupt user access.

Test the conditional access policy: 

```bash
az ad conditionalaccess policy whatif --policy-id <PolicyID> --user-id <UserID> 
```

Output:

```bash
{
  "policyId": "<PolicyID>",
  "userId": "<UserID>",
  "conditionsMet": true,
  "accessDecision": "grant",
  "message": "The user is compliant with the Conditional Access policy and access is granted."
}
```

### Licensing Management

Manage Azure AD licenses efficiently to ensure users have the necessary access:

- Assign a Premium license to each user account.
- Azure AD licensing is per account.
- Simplify by assigning a license to a group.
- Other licenses, such as Microsoft 365, can also be assigned to users and groups.

### Dynamic Membership Rules

Maintain up-to-date group memberships with automated rules:

- Automatically updates group memberships.
- Adds or removes users based on predefined rules.
- Example: Use the "All users" rule to apply Conditional Access policies universally.

## Resources

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/)