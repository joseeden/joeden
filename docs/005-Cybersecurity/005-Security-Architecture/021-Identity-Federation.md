---
title: "Identity Federation"
tags: [Cybersecurity]
sidebar_position: 21
last_update:
  date: 1/30/2024
---

## Overview 

Identity Federation is a system where multiple organizations share authentication data, allowing users to access resources across organizational boundaries without re-authenticating.

### Key Concepts

- **Single Sign-On (SSO)**
  - Authenticate once, access multiple applications.
  
- **Trust Relationships**
  - Organizations agree to trust each other's authentication assertions.
  
- **Identity Provider (IdP)**
  - Authenticates users and issues security tokens.
  
- **Service Provider (SP)**
  - Provides resources, relying on IdP for user authentication.
  
- **Federation Standards**
  - Examples include SAML, OAuth, OpenID Connect, and WS-Federation.

### Benefits of Identity Federation

- **User Convenience**
  - One login grants access to multiple services.
  
- **Centralized Authentication**
  - Authentication managed at the IdP, enhancing security.
  
- **Cross-Domain Collaboration**
  - Enables seamless collaboration across different organizations.

### How it works 

1. Login initiation - User logs in
2. User is redirected to an identity provider 
3. IdP will authenticate the user
4. IdP generated an assertions (like a token)
5. User is returned to a service provider with the assertion
6. Verification and access


### Use Cases

- **Enterprise Collaboration**
  - Allows employees to work across different business units or partners.
  
- **Cloud Services**
  - Enables seamless access to cloud-based applications.
  
- **Education**
  - Connects students and faculty across affiliated institutions.
  
- **Public Services**
  - Provides secure, unified authentication for government services.




## Identity Federation Methods

### SSO

SSO (Single Sign-On) allows users to authenticate once and gain access to multiple applications without needing to re-enter credentials, streamlining the user experience.

- Authenticates a user once for access to multiple applications.
- Reduces the need for multiple logins and passwords.

Protocols used: 

- LDAP
- SAML (Security Assertion Markup Language)
- OpenID Connect


### OAuth

OAuth (Open Authorization) is a standard for token-based authentication and authorization, enabling secure interactions between services without exposing user credentials.

- Allows third-party applications to access user data securely without exposing user credentials
- Allows secure information exchange between different sites via JWT (JSON Web Tokens)

How it works: 

- Client app or server needs to register with authorization server
- Authorization server provides a redirect URL +  ID + Secret
- Token is received by the user 
- User can use the token to access the requested resource


### SAML 

SAML (Security Assertion Markup Language) is an open standard used for exchanging authentication and authorization information between Identity Providers (IdPs) and Service Providers (SPs).

- Supports Single Sign-On (SSO), enabling users to access multiple services with a single login.
- Service providers receive confirmation from IdPs to authenticate users.
- Provides a secure mechanism for transmitting authentication data between entities.

### OIDC

OpenID Connect (OIDC)

- An authentication layer built on top of OAuth 2.0.
- Provides additional user identity information along with authorization.



