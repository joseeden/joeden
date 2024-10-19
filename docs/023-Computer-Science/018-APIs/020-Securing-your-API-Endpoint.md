---
title: "Securing your API Endpoint"
description: "Securing your API Endpoint"
tags: [Computer Science, Application Development, Software Development, APIs]
sidebar_position: 20
last_update:
  date: 1/30/2024
---

## Identity, Authentication, and Authorization

These three concepts are essential for securing applications and managing user access.

**Identity**: User data within the application.  
**Authentication**: Verifying the user's claimed identity.  
**Authorization**: Validating the user's permissions.

## Securing the Call

The simplest way to authenticate the API call is to use the built-in authentications method in your system.

![](/img/docs/codemash-api-2.png)


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
- *Decodes the header to authenticate the request.


**Drawbacks**:
- Credentials sent with each API call create a dependency.
- Encoding is not encryption; credentials are sent in clear text.
- Requires TLS for secure transmission.


![Basic Authentication](img/docs/codemash-api-basicauth.png)  
![Basic Authentication on Windows](img/docs/codemash-api-basicauth-windows.png)  

### HTTP Digest Authentication

HTTP Digest Authentication enhances security by never sending the password over the wire.

  - Server responds with a unique *nonce* (a random string).
  - Client concatenates the username and password, then MD5-hashes the result.
  - The client resubmits the request with:
    - Username in clear text
    - Nonce
    - MD5-hash

**Drawbacks**:
- MD5-hash can be cracked, raising security concerns.
- Servers cannot store passwords, making it less common for use.

![HTTP Digest Authentication](img/docs/codemash-api-digest.png)
