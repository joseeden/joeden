---
title: "Identity Federation"
description: "SSO,, OAuth, SAML, and OIDC"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
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
- Session period expiry is set by the identity provider.
- Once session is expired, user needs to re-authenticate.

#### SSO Protocols 

Protocols used: 

- LDAP
- SAML (Security Assertion Markup Language)
- OpenID Connect

#### Trust Characteristics 

- **Direction**

  - **One-way Trust**: Domain 1 trusts Domain 2, but Domain 2 doesn't trust Domain 1.


      <div class='img-center'>

      ![](/img/docs/sso-trust-one-way.png)

      </div>

  - **Two-way Trust**: Domain 1 and Domain 2 mutually trust each other. 

      <div class='img-center'>

      ![](/img/docs/sso-trust-two-way.png)

      </div>

- **Transitive** 

  - **Transitive Trust**
    
    - Trust relationships transfer across domains.  
    - If Domain 1 trusts Domain 2, and Domain 2 trusts Domain 3, then Domain 1 and Domain 3 has a trust relationship as well without the administrator explicity creating the trust.

  - **Non-transitive Trust**
    
    - Trust relationships does not automatically transfer across domains.
    - If Domain 1 trusts Domain 2, and Domain 2 trusts Domain 3, then Domain 1 and Domain 3 doesn't trust each other unless the administrator explicity creates the trust.


### SAML 

SAML (Security Assertion Markup Language) is an open standard used for exchanging authentication and authorization information between Identity Providers (IdPs) and Service Providers (SPs). It allows a browser-based single-sign-on across a variety of web systems.

- Supports Single Sign-On (SSO), enabling users to access multiple services with a single login.
- Service providers receive confirmation from IdPs to authenticate users.
- Provides a secure mechanism for transmitting authentication data between entities.

#### Benefits of SAML 

Here are just some of the benefits of using SAML: 

- True SSO experience for user  

  - After user authenticates once, the session can last for a period of time specified by the service provider (SP).
  - During that time period, the user doesn't need to re-authenticate.

- No credential access for the service provider 

  - The SP uses the identity provider's (idP) authentication without needing the user's credentials
  - The user's password remains secret between the user and idP.



#### SAML Actors

There are three actors in a SAML request:

- **Principal** 
  
  - This is the end user who wants to use the web-based services.
    
- **Identity** 

  - This is the organization provider providing the proof of identity.
  - Usually the employer, school, or account provider. 

- **Provider**

  - Web-based service that the end user wishes to access. 
  - This is the service provider 



#### How SAML works

How SAML works:  

1. The end user requests access to a service provider.
2. The service provider (SP) checks if user already has a logged in session
3. If user is logged in, SP just skips and grant access to the user.
4. If user is not logged in, SP redirects user to a single sign-on (SSO) service (SSO)
5. The SSO is from the user's identity provider (idP).
6. The user tries to authenticate to the idP using username and password or other mechanisms.
7. The idP creates an xHTML form customized for the SP and sends to user. 
8. The user forwards the xHTML form to requests a security assertion  from the SP.
9. This security assertion contains proof of identity from the identity provider
10. SP validates the request and creates a security context with the desired service.
11. SP then redirects user to the service.
12. User requests for the service, and SP grants access to the service. 

How it looks like: 

<div class='img-center'>

![](/img/docs/iam-basics-idf-saml-how-saml-workss.png)

</div>


### OAuth

OAuth (Open Authorization) is a standard for token-based authorization, which enables secure interactions between services without exposing user credentials. 

- Allows third-party applications to access user data securely without exposing user credentials
- Allows secure information exchange between different sites via JWT (JSON Web Tokens)

**It's not performing authentication, only authorization.**

How it works: 

- Client app or server needs to register with authorization server
- Authorization server provides a redirect URL +  ID + Secret
- Token is received by the user 
- User can use the token to access the requested resource


### OIDC

OpenID Connect (OIDC) is an identification and authentication protocol that helps users prove their identity to other services.

- An authentication layer built on top of OAuth 2.0.
- Provides additional user identity information along with authorization.

:::info[NOTE]

OAuth and OIDC work together. 
OIDC is for authentication.
OAuth if for authorization.


:::


## IDaaS  

Identity as a Service (IDaas) providers allow organizations to move some or all their IAM to the cloud, eliminating the need for employing costly and hard-to-find IAM specialists. DaaS started by offering SSO for web-based services. These services integrate with two different types of platforms to help organizations improve their IAM infrastructure:

- **Directory Integration**

  - Synchronize with an organization's existing directory to obtain user information.
  - Existing directory service could be on-premise Active Directory or LDAP, or Cloud-based directory service.
  - Information is synced in real time, allowing organizations to quickly provision/deprovision users.

- **Application Integration** 

  - Replace authentication for many SaaS products, simplifies user and administration experience.
  - Users don't need to manage different accounts for each of the services.
  - The organization won't need to invest in building and maintaining authentication integration. 

Before proceeding with an IDaaS approach, organization must consider the following:

- Does product satisfy business requirements for IAM?
- Has a thorough security review been done on the product under consideration?