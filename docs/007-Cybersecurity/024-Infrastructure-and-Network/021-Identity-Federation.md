---
title: "Identity Federation"
description: "SSO,, OAuth, SAML, and OIDC"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 21
last_update:
  date: 1/30/2024
---

## Overview 

Identity Federation is a system where multiple organizations share authentication data, allowing users to access resources across organizational boundaries without re-authenticating.

- One login grants access to multiple services
- Authentication handled by the user's home organization (IdP)
- Cross-domain collaboration across different organizations

## Use Cases 

- **Enterprise Collaboration**

  - Employees access partner or subsidiary systems easily
  - Reduces need for duplicate user accounts

- **Cloud Services**

  - Users log in once to use apps like Salesforce or Office 365
  - Simplifies access control for IT teams

- **Education**

  - Students access shared libraries, research tools, and portals
  - Supports cross-university research and learning

- **Public Services**

  - Citizens use one login for multiple government platforms
  - Enhances security and user convenience

## Key Concepts

- **Single Sign-On (SSO)**

  - Authenticate once, access many apps without re-logging in
  - Improves user experience and reduces password fatigue
  - Centralizes login control and auditing

- **Trust Relationships**

  - Organizations trust each other's login systems
  - Based on shared protocols and certificates

- **Identity Provider (IdP)**

  - Handles user login and identity verification
  - Issues secure tokens to confirm user identity
  - Can be integrated with existing directory services like LDAP

- **Service Provider (SP)**

  - Hosts the application or service being accessed
  - Accepts user identity from trusted IdPs

- **Federation Standards**

  - Define how identity info is securely shared
  - Common protocols include SAML, OAuth, and OpenID Connect
  - Ensure compatibility between different systems


## How It Works

Federated login lets users access services using their home organization’s credentials. Here’s a simple flow of what happens:

1. **Login initiation** – User tries to access a protected service
2. **Redirect to IdP** – User is sent to their identity provider
3. **User authentication** – IdP verifies the user’s credentials
4. **Assertion issued** – IdP creates a secure login token (assertion)
5. **Return to service** – User is redirected back with the token
6. **Access granted** – Service provider verifies the token and allows access


## SSO

SSO (Single Sign-On) allows users to authenticate once and gain access to multiple applications without needing to re-enter credentials, streamlining the user experience.

- Authenticates a user once for access to multiple applications.
- Reduces the need for multiple logins and passwords.
- Session period expiry is set by the identity provider.
- Once session is expired, user needs to re-authenticate.

In a single sign-on (SSO) technology, all users are authenticating to one source, the **authentication server**. If that server goes down, authentication requests cannot be processed. 

### SSO Protocols

These protocols enable Single Sign-On by securely handling user authentication and identity sharing between systems.

- **LDAP**

  - For accessing and maintaining directory information
  - Often used for authentication within internal networks

- **SAML (Security Assertion Markup Language)**

  - XML-based standard for exchanging authentication data
  - Common in enterprise and education federations

- **OpenID Connect**

  - Built on OAuth 2.0, using JSON and REST
  - Popular for modern web and mobile apps


### Trust Relationships

Trust between domains defines how authentication is shared and accepted across different networks.

- **One-way Trust** - Domain 1 trusts Domain 2, but Domain 2 doesn't trust Domain 1.

    <div class='img-center'>

    ![](/img/docs/sso-trust-one-way.png)

    </div>

- **Two-way Trust** - Domain 1 and Domain 2 mutually trust each other.

    <div class='img-center'>

    ![](/img/docs/sso-trust-two-way.png)

    </div>


### Trust Scope

- **Transitive Trust**

    Trust passes along between domains automatically.
    If Domain 1 trusts Domain 2, and Domain 2 trusts Domain 3, then Domain 1 also trusts Domain 3 without extra setup.

- **Non-transitive Trust**

    Trust only applies between directly connected domains.
    If Domain 1 trusts Domain 2, and Domain 2 trusts Domain 3, Domain 1 does not trust Domain 3 unless set up separately.

### Shibboleth

**Shibboleth** is a single sign-on (SSO) and federated identity solution that lets organizations securely share online resources while keeping their own login systems.

- Used mainly by universities and research groups  
- Users log in once to access partner services  
- Uses SAML for secure identity exchange  
- Organizations keep control of user accounts  

**Use Case: University Resource Access**

A student from University A wants to access University B’s online library:

- Student visits University B’s library (Service Provider)  
- University B redirects student to University A to log in (Identity Provider)  
- University A authenticates and sends a SAML assertion to University B  
- University B grants access to the library resource


## SAML 

SAML (Security Assertion Markup Language) is a standard for sharing authentication and authorization data between **Identity Providers (IdPs)** and **Service Providers (SPs)**. It enables single sign-on (SSO) across different web applications using a browser.

- Supports single sign-on so users log in once
- Lets users access many services with one login
- Service providers trust IdPs to confirm user identity
- Securely passes authentication information between parties

### Benefits of SAML 

Here are just some of the benefits of using SAML: 

- **True SSO experience for user**  

  - After user authenticates once, the session can last for a period of time specified by the service provider (SP).
  - During that time period, the user doesn't need to re-authenticate.

- **No credential access for the service provider **

  - The SP uses the identity provider's (idP) authentication without needing the user's credentials
  - The user's password remains secret between the user and idP.


### SAML Actors

- **Principal** 
  
  - The end user who wants to use the web-based services.
    
- **Identity** 

  - The organization provider providing the proof of identity.
  - Usually the employer, school, or account provider. 

- **Provider**

  - Web-based service that the end user wishes to access. 
  - This is the service provider 



### How SAML works

How SAML works:  

1. The end user requests access to a service provider.
2. Service provider (SP) checks if user is already logged in
3. If yes, SP just skips and grant access to the user.
4. If no, SP redirects user to a single sign-on service (SSO)
5. The SSO is from the user's identity provider (idP).
6. User logins at idP using username and password or other mechanisms.
7. The idP creates an xHTML form customized for the SP and sends to user. 
8. An xHTML form is sent to SP to request for a security assertion.
9. Security assertion contains proof of identity from the identity provider
10. SP validates request and creates a security context with desired service.
11. SP then redirects user to the service.
12. User requests for the service, and SP grants access to the service. 

How it looks like: 

<div class='img-center'>

![](/img/docs/iam-basics-idf-saml-how-saml-workss.png)

</div>


## OAuth

OAuth (Open Authorization) is a standard for authorization that lets apps access user data securely without sharing passwords.

- Allows third-party apps to access user info safely
- Uses tokens like JWT (JSON Web Tokens) for secure data exchange

:::info 

OAuth does not perform authentication, only authorization.

:::

**How it works:** 

- Client app or server needs to register with authorization server
- Authorization server provides a redirect URL +  ID + Secret
- Token is received by the user 
- User can use the token to access the requested resource


## OIDC

OpenID Connect (OIDC) is an identification and authentication protocol that helps users prove their identity to other services.

- An authentication layer built on top of OAuth 2.0.
- Provides additional user identity information along with authorization.

:::info

OAuth and OIDC work together. 

OIDC is for **authentication**.
OAuth if for **authorization**.

:::


## IDaaS  

Identity as a Service (IDaaS) lets organizations move identity and access management (IAM) to the cloud, reducing the need for specialized staff.

- **Directory Integration**

  - Syncs with existing user directories (like Active Directory or LDAP)
  - Real-time updates for user provisioning and deprovisioning

- **Application Integration**

  - Simplifies login for many cloud apps
  - Users manage fewer accounts
  - Reduces the need for custom authentication setups

Before proceeding with an IDaaS approach, organization must consider:

- Does product satisfy business requirements for IAM?
- Has a thorough security review been done on the product under consideration?