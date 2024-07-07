---
title: "Digital Certificate Types"
tags: [Cybersecurity]
sidebar_position: 36
last_update:
  date: 1/30/2024
---


## Domain Validation Certificates (DV)

A basic SSL/TLS certificate that verifies domain ownership without authenticating organizational details.

- Confirms domain ownership through email validation or DNS records.
- Doesn't verify organization details, only domain control.
- Automated process allows for quick certificate issuance.
- Provides encryption for HTTPS connections.
- Suitable for blogs, personal sites, and small businesses.
- Widely supported by web browsers.

## Extended Validation Certificates (EV)

High-assurance SSL/TLS certificates that undergo rigorous validation processes to provide enhanced trust and security.

- Extensive vetting of the requesting entity's legal identity and operational existence.
- Displays organization's name prominently in the browser's address bar to signify enhanced verification.
- Offers users increased confidence in the legitimacy of the website and organization.
- Validates both domain ownership and organizational identity, ensuring comprehensive authentication.
- Ideal for websites handling sensitive data or transactions, e.g. financial institutions.


## Wildcard Certificates

Wildcard certificates **secure a domain and all its subdomains** with a single certificate.

- Simplify certificate management
- Cost-effective for securing multiple subdomains
- Typically used for broader domain coverage
- Example: *.example.com covers www.example.com, blog.example.com, etc.

Disadvantage:

- Cannot secure subdomains independently with different certificates.
- Compromising one subdomain compromises all subdomains under the wildcard domain.
- Revoking a wildcard certificate affects all subdomains, potentially causing disruptions.
- However, re-issuing a new certificate is an quick process.

## SAN Certificates

Instead of using Wildcard, we can modify the Subject Alternate Name (SAN) field to **specify multiple domains**.

- Useful for supporting different domains with a single digital certificate.
- Different domains with different root domain, e.g. abc.com and xyz.com

## Single-Sided Certificates

Single-sided certificates are issued by only one party to authenticate the identity of the recipient. This only requires the server to be validated.

- Unidirectional authentication
- Issued by the sender to verify recipient's identity
- Typically issued by the issuer
- Commonly used in email encryption
- Example: S/MIME certificates for email encryption

## Double-Sided Certificates

Double-sided certificates authenticate both parties involved in a transaction, providing mutual trust and security.

- Bidirectional authentication
- Both sender and receiver authenticate each other
- Enhanced security for sensitive transactions
- Example: SSL/TLS certificates for secure web browsing

## Self-Signed Certificates

Self-signed certificates are **generated and signed by the entity itself**, used for internal testing or private networks.

- No third-party involvement in certificate issuance
- Suitable for private network encryption
- Not suitable for public-facing services due to lack of trust
- Commonly used for local development or testing environments

## Third-Party Certificates

Third-party certificates are issued and signed by a trusted Certificate Authority (CA) to validate the identity of an entity, commonly used in public networks like the internet.

- Certificates are embedded into major web browsers and operating systems
- Preferred choice for public-facing websites
- Provides trust and authenticity
- Issued by trusted Certificate Authorities (CAs)
- Verifies the identity of the certificate holder
- Widely used for securing websites, email servers, and other online services

## Root of Trust 

Each certificate is validated using the concept of **root of trust** or the **chain of trust.**

- Bottom-top approach approach.
- The family tree or path followed by the chain of trust is called the **certification path.**
- Root of trust can be trusted third-party providers, e.g. Verisign, Amazon, Google, Cloudflare.
