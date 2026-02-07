---
title: "Certificate Revocation"
description: "Verifying and Invalidating"
tags: 
- Security
- Cybersecurity
- Cryptography
sidebar_position: 37
last_update:
  date: 1/30/2024
---


## Certificate Revocation Standards 

These standards and protocols ensure that relying parties can efficiently and securely verify the validity of digital certificates. This enhances the overall security of PKI-enabled systems and applications.

## Certificate Revocation Lists

CRLs or **Certificate Revocation Lists** serves as an online list of digital certificates that the CA has already revoked.

- Certificates are usually revoked because they're compromised.
- Full list of every certificated revoked by that CA.

How it works:

1. User connects to the application's web server.
2. User's computer requests for current public key for the digital certificate from the CA.
3. CA will first check the CRL to ensure the current digital certificate is not revoked.
4. If its not in the CRL, the public key is sent back to the user's computer.

## Online Certificate Status Protocol (OCSP)

OCSP is a protocol used to obtain the revocation status of a digital certificate in real-time.

- Instead of downloading and parsing a CRL, a relying party sends query to an OCSP responder.
- OCSP responder checks the certificate's status and returns a response: valid, revoked, or unknown.
- OCSP reduces the overhead associated with CRL management.
- Provides more up-to-date revocation information.
- More quick and efficient because it doesn't use an encryption.
- Looks up only one digital certificate at a time.

As mentioned, OCSP doesn't use encryption which makes it less secure than OCSP Stapling. 

## OCSP Stapling (Certificate Stapling)

OCSP Stapling, also known as **TLS Certificate Status Request Extension**, checks whether a certificate is still valid without having the client contact the certificate authority (CA) directly.

- The web server sends TLS certificate + signed OCSP response during SSL/TLS handshake.
- OCSP record is sent at regular intervals by the server.
- Eliminates extra connection required for the initial request by the user.
- Speeds up tunnel creation, ensuring the data can be sent back quickly.

OCSP stapling  improves the performance and privacy of OCSP by attaching an OCSP validation to the digital certificate, saving the client and server the time of repeatedly querying the OCSP server for certificate validity. 

:::info 

OCSP Stapling  also allows clients to verify the certificate's revocation status without needing to query an external OCSP responder.

:::

## Public Key Pinning

Public Key Pinning prevents impersonation attacks like man-in-the-middle (MITM) attacks by associating a host with its expected public key or keys. This helps ensure that the server's public key used for encryption is authentic and has not been replaced with a malicious one.

- **HTTP Headers**
    - Public keys are sent by the server to the client's browser as part of the HTTP header.
    - If web browser doesn't get matching public keys, it'll know that website is compromised.
    - It will then alert the user with the issue.
  
- **Pins**
    - Pins are cryptographic hashes of public keys or entire certificates that are associated with the domain.
  
- **Validation**
    - When a client connects to the server, it checks whether the received public key matches any of the pinned keys.
  
- **Prevents MITM Attacks**
    - If the public key does not match any of the pinned keys, the client browser rejects the connection, preventing potential MITM attacks where an attacker intercepts and replaces the server's public key.

- **HPKP (HTTP Public Key Pinning)**
    - A deprecated standard that allowed website owners to specify which Certificate Authorities (CAs) were allowed to issue certificates for their domain.

- **Expect-CT Header**
    - A replacement for HPKP, the Expect-CT header allows websites to require that browsers enforce Certificate Transparency (CT), which provides visibility into the certificates issued for a domain.


## Delta CRL

Delta CRL is an optimization of the traditional CRL mechanism.

- Instead of downloading the entire CRL, relying party can download smaller "delta" CRLs.
- Delta CRLs contains only the updates since the last full CRL.
- Reduces the bandwidth and processing requirements for CRL validation.
- Maintains the ability to check the revocation status of certificates.
