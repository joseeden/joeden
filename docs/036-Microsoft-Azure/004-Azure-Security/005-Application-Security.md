---
title: "Application Security"
description: "Application Security"
tags: 
- Cloud
- Microsoft Azure
- DevOps
- Security
- Certifications
sidebar_position: 5
last_update:
  date: 11/22/2020
---


## Azure App Configuration

Azure App Configuration lets you update app settings or toggle features without changing code or redeploying. It centralizes configuration so your apps stay manageable and secure.

- Store settings and feature flags in one place
- Update values instantly without redeploying apps
- Fully managed by Azure with built-in security

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14225333.png)

</div>

Settings are organized as **key-value pairs**. Keys identify each setting and can be simple or hierarchical using prefixes.

- Keys can be flat or structured (e.g., `MyApp:HR:ThemeColor`)
- Values store the actual data and metadata (e.g. descriptions)
- Labels allow environment-specific values like Dev or Prod

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14225904.png)

</div>

All values are encrypted at rest and in transit. Metadata is descriptive only and not encrypted like values, so it should not contain sensitive information. 

<div class='img-center'>

![](/img/docs/Screenshot2026-03-14225937.png)

</div>



### Feature Management

Feature management controls parts of your application like dark mode, beta features, or banners without changing code.

- Feature flags act as switches to turn features on or off
- Feature manager reads flags and determines app behavior
- Filters define when features are active based on user group, region, or time

Features are cached for performance and refreshed automatically, so your app always uses up-to-date settings.

### Securing App Configuration

Azure App Configuration supports multiple security layers to protect your data.

| Security Option       | Description                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Customer managed keys | Bring your own encryption keys from Key Vault. The wrapped key is stored securely, and the unwrapped key is cached in memory and refreshed hourly. |
| Private endpoints     | Assign private IPs to keep traffic inside your network. Traffic stays off the public internet and supports VPN or ExpressRoute connections.        |
| Managed identities    | Apps can access services securely without storing credentials in code.                                                                             |

For **Managed identities**, there are two types:

| Managed Identity Type | Description                                              |
| --------------------- | -------------------------------------------------------- |
| System-assigned       | Azure creates and deletes it automatically with your app |
| User-assigned         | You create it once and assign it to multiple services    |

## Azure Key Vault

Azure Key Vault is a secure place to store secrets, keys, and certificates away from your code. 

- Rotate and manage credentials without touching code
- Removes the risk of hardcoding secrets.
- Integrates with Azure apps and pipelines

**Why Not Hardcode Secrets?**

Hardcoding secrets in code is risky. Passwords or API keys in your app can be copied, leaked, or forgotten. Managing them is difficult and can lead to breaches.

- Hardcoded secrets are hard to rotate
- Secrets in code are difficult to track
- One leak can compromise your app

Key Vault solves this by centralizing sensitive data securely.

## Key Vault Components

Key Vault manages three main components: Secrets, Certificates, and Keys. Each has a specific role in keeping your app secure.

### Secrets

Secrets are credentials or API keys your app needs to connect to services. Key Vault stores them encrypted, versioned, and accessible only to authorized applications.

- API keys, passwords, connection strings
- Encrypted and versioned
- Accessible only to authorized services

For example, a company app called "MyWebApp" stores its payroll database password in Key Vault instead of hardcoding it in the app.

### Certificates

Certificates prove your app’s identity and enable secure HTTPS connections. Key Vault can store and automatically renew them when integrated with trusted certificate authorities like DigiCert or GlobalSign.

- Prove app identity
- Enable secure HTTPS connections
- Can auto-renew with trusted CAs

The company app "MyWebApp" can use Key Vault to store certificates for secure connections between its HR portal and third-party payroll processors.

### Keys

Keys are cryptographic tools used to encrypt, decrypt, sign, and verify data. Key Vault ensures keys never appear in code and can rotate them automatically if a policy is set.

- Encrypt, decrypt, sign, and verify data
- Never exposed in code
- Automatic rotation possible

The company app "MyWebApp" can store keys in Key Vault to protect employee records.

## Key Vault Tiers

Azure Key Vault offers two tiers for different security needs.

| Tier               | Description                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Standard Key Vault | Multi-tenant, supports secrets, software-protected and HSM-backed keys, FIPS 140-2 Level 2                         |
| Managed HSM Pools  | Single-tenant hardware, supports only HSM-protected keys, FIPS 140-2 Level 3, ideal for compliance-heavy workloads |


| Tier               | Description                                                                                                                                               |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Standard Key Vault | <ul><li>Multi-tenant</li><li>Supports secrets, software-protected and HSM-backed keys</li><li>FIPS 140-2 Level 2</li></ul>                                |
| Managed HSM Pools  | <ul><li>Single-tenant hardware</li><li>Supports only HSM-protected keys</li><li>FIPS 140-2 Level 3</li><li>Ideal for compliance-heavy workloads</li></ul> |


Standard is ideal for general workloads, while Managed HSM is best for high-security or compliance-critical scenarios.
