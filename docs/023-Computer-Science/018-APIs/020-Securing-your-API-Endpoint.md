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


![Basic Authentication](/img/docs/codemash-api-basicauth.png)  
![Basic Authentication on Windows](/img/docs/codemash-api-basicauth-windows.png)  

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

![HTTP Digest Authentication](/img/docs/codemash-api-digest.png)




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


### Tradeoffs of Bearer Tokens

Using bearer tokens offers convenience, but there are tradeoffs regarding security and management.

- Need secure storage for API keys
- Or allow users to view their keys

![](/img/docs/codemash-api-bearer.png)


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

![](/img/docs/codemash-api-hmac.png)

![](/img/docs/codemash-api-hmac-2.png)

![](/img/docs/codemash-api-hmac-reverse.png)



### Server-based Clients vs. JS Clients 

API keys work well for server-based clients but pose challenges for JavaScript clients.

- Server can respond with the key after user login
- JavaScript cannot securely store the received key due to security limitations

![](/img/docs/codemash-api-keys-2.png)
![](/img/docs/codemash-api-keys-3.png)



## JSON Web Tokens (JWT)

add intro...

- claims are basically any data
- server will cryptographically sign the claims, which then creates a token
- token is sent to the browser
- browser then responds back with request + token

![](/img/docs/codemash-jwt.png)

![](/img/docs/codemash-jwt-2.png)

![](/img/docs/codemash-jwt-4.png)

![](/img/docs/codemash-jwt-5.png)


