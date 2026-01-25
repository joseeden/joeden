---
title: "Securing your API Endpoint"
description: "Securing your API Endpoint"
tags: [Computer Science, Application Development, Software Development, APIs]
sidebar_position: 20
last_update:
  date: 8/2/2021
---

## Identity, Authentication, and Authorization

These three concepts are essential for securing applications and managing user access.

**Identity**: User data within the application.  
**Authentication**: Verifying the user's claimed identity.  
**Authorization**: Validating the user's permissions.

## Securing the Call

The simplest way to authenticate the API call is to use the built-in authentications method in your system.


<div class='img-center'>

![](/img/docs/codemash-api-2.png)

</div>


## Built-in Schemes

### Client Certificates

Client certificates offer a method for verifying user identity without usernames or passwords.

- **Reverse TLS**: Proves client identity to the server.
- **TLS**: Server's certificate proves its identity to the browser.
- **Client Certs**: Installed in the browser to authenticate to the server.
- **Drawbacks**: Requires all users to install certificates, which is not scalable.
- **Ideal Use**: Best for internal applications, not public-facing ones.
- **Implementation**: IIS provides built-in tools to link certificates to identities.

### Basic Authentication

Basic authentication involves sending user credentials encoded in base-64 with each request.

- Username and password are concatenated and encoded, then sent as a header.
- Decodes the header to authenticate the request.

<div class='img-center'>

![Basic Authentication](/img/docs/codemash-api-basicauth.png)  

</div>

**Drawbacks**:
- Credentials sent with each API call create a dependency.
- Encoding is not encryption; credentials are sent in clear text.
- Requires TLS for secure transmission.



### HTTP Digest Authentication

HTTP Digest Authentication enhances security by never sending the password over the wire.

  - Server responds with a unique *nonce* (a random string).
  - Client concatenates the username and password, then MD5-hashes the result.
  - The client resubmits the request with:
    - Username in clear text
    - Nonce
    - MD5-hash

<div class='img-center'>

![HTTP Digest Authentication](/img/docs/codemash-api-digest.png)

</div>

**Drawbacks**:
- MD5-hash can be cracked, raising security concerns.
- Servers cannot store passwords, making it less common for use.





## Using API Keys

### API Keys

API keys provide a more secure and flexible method for authentication.

- Use alternatives to primary account credentials
- Unique and random, assigned by the site


### API Keys as Bearer Tokens 

API keys can be used like passwords but require TLS for security.

- Sent as plain text
- Can be added in headers or query strings
- Use query strings for testing
- Use headers for security
- Headers do not appear in logs


<div class='img-center'>

![](/img/docs/codemash-api-bearer.png)

</div>


### Tradeoffs of Bearer Tokens

Using bearer tokens offers convenience, but there are tradeoffs regarding security and management.

- Need secure storage for API keys
- Or allow users to view their keys



### API Keys as Cryptographic keys (HMAC) 

API keys can be used as HMAC, enhancing security without sending keys over the wire.

- Prevents message modification during transit
- A custom version of digest authentication
- Add expiration timeouts if necessary
- API keys sign requests instead of passwords

**Steps**
- Concatenate message and key, then hash to create a signature
- Send the signature as a header with the request
- Server processes the request in reverse


<div class='img-center'>

![](/img/docs/codemash-api-hmac.png)

</div>


<div class='img-center'>

![](/img/docs/codemash-api-hmac-2.png)

</div>




### Server-based Clients vs. JS Clients 

API keys work well for server-based clients but pose challenges for JavaScript clients.

- Server can respond with the key after user login
- JavaScript cannot securely store the received key due to security limitations


<div class='img-center'>

![](/img/docs/codemash-api-keys-2.png)

</div>

<div class='img-center'>

![](/img/docs/codemash-api-keys-3.png)

</div>



## JSON Web Tokens (JWT)

JWTs are a compact and secure way to transmit information between parties as a JSON object. They are commonly used for authentication and information exchange.

- Claims represent any data
- Server cryptographically signs the claims to create a token
- The token is sent to the browser
- The browser includes the token in subsequent requests

### Secure tokens for clients

Secure tokens are important for maintaining user identity and ensuring authorized access to resources in client applications. They help facilitate secure communication between the client and server while minimizing exposure to potential security threats.

<div class='img-center'>

![](/img/docs/codemash-jwt-2.png)

</div>

### Token Format 

A JWT (JSON Web Token) consists of three parts that are separated by dots. The format is as follows:

```bash
<header>.<payload>.<signature>
```

For a sample JWT, the structure might look like this:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```


<div class='img-center'>

![](/img/docs/codemash-jwt-4.png)

</div>

### Storing JWT on JS Client 

When storing JWTs on the client side, it's important to consider their security against various threats such as XSS and CSRF. The following table outlines different storage methods and their security implications:

| Storage Method       | Safe from XSS | Safe from CSRF | App can access payload |
|----------------------|---------------|----------------|------------------------|
| LocalStorage          | No            | Yes            | Yes                    |
| httOnly Secure Cookie | Yes           | Yes            | No                     |
 



## OAuth

### Designed for 3-party scenario

OAuth is a standard for access delegation commonly used for allowing third-party applications to access user data without exposing passwords. It facilitates secure authorization in a user-friendly way, enabling different applications to interact with user data seamlessly.

<div class='img-center'>

![](/img/docs/codemash-oauth-3.png)

</div>

<div class='img-center'>

![](/img/docs/codemash-oauth-4.png)

</div>

OAuth is particularly beneficial in scenarios where multiple parties (resource owner, client application, and resource server) need to interact securely. This three-party setup allows users to grant limited access to their resources without sharing their credentials.

<div class='img-center'>

![](/img/docs/codemash-oauth-5.png)

</div>


### OAuth 1.0a

OAuth 1.0a is the original version of the OAuth protocol. It is more complex but provides robust security through signed requests.

- Uses signed requests; TLS not required
- Best suited for web-based clients
- Drawback: Complex to implement; libraries are recommended


### OAuth 2.0

OAuth 2.0 is a more streamlined version of the protocol, designed to be easier to use while supporting a broader range of client types.

- Simpler and supports non-web clients
- Not backward compatible with OAuth 1.0a
- Lacks HMAC signatures; easier to implement
- Access tokens do not reveal user identity
- Considered a framework rather than a strict protocol

Drawbacks:

- Vulnerable to threats if not implemented correctly
- Complex, leading to potential misuse or leakage


## OpenID Connect

OpenID Connect is an identity layer built on top of OAuth 2.0. It allows clients to verify user identity and obtain basic profile information.

- Provides authentication in addition to authorization
- Uses JWTs for transmitting user identity information


<div class='img-center'>

![](/img/docs/codemash-openid.png)

</div>

## SAML

SAML (Security Assertion Markup Language) is a protocol for exchanging authentication and authorization data between parties, often used in enterprise settings.

- Similar to JWT but uses SOAP and XML over HTTP
- Older and more complex than JWT
- Commonly employed for Single Sign-On (SSO) solutions


