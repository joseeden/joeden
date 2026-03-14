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
- Update values without redeploying apps
- Fully managed by Azure with built-in security

The settings are stored as **key-value pairs**. Keys identify each setting and can be flat or hierarchical using prefixes.

- Keys can be simple or structured (e.g., `MyApp:HR:ThemeColor`)
- Values store actual data and metadata
- Labels allow environment-specific values like Dev or Prod

Values are encrypted at rest and in transit. Metadata is descriptive only and not encrypted like values.

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
