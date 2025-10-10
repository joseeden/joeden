---
title: "Hashing"
description: "Converting data into fixed-size value using a function"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 12
last_update:
  date: 1/30/2024
---



## Overview

Hashing is a process of converting data (like a file or a message) into a fixed-size value or string, typically using a hash function.

- Used for data integrity checks, digital signatures, password storage, and more.
- The same input always produces the same hash output.
- **Fixed Size**: Hash outputs are of fixed length, regardless of input size.
- **Fast Computation**: Hash functions are designed to be quick to compute.
- **Irreversible**: One-way hashing, cannot   reverse-engineer the original input from the hash.
- **Collision Resistance**: Unlikely for two different inputs to produce the same hash (a "collision").
  
Common Uses:     

- Verify data hasn't been altered (e.g., checksums).
- Securely store passwords, often with added salt.
- Create digital signatures by compressing data before signing.
- Used in various cryptographic operations, including blockchains.


## Digital Signature

The digital signature is the encrypted hash which is sent along with the message to prove the integrity of the message.

- Uses a private key to create the signature and a public key to verify it.
- The digital signature confirms the sender's identity.
- This ensures the message hasn't been altered.
- **Non-repudiation*- - signer can't deny signing because there's proof.

For more information, please see [Digital Signatures in Asymmetric Encryptions.](/docs/007-Cybersecurity/005-Cryptography/010-Asymmetric-Encryption.md)


## Digital Signature Standard (DSS)

The Digital Signature Standard (DSS) is a U.S. standard for creating and verifying digital signatures.

- Developed by **National Institute of Standards and Technology (NIST)**
- Provides authenticity, integrity, and non-repudiation
- Uses a 160-bit message digest produced by Digital Signature Algorithm (DSA)

How it works:

- A public and private key pair is generated for signing and verification
- The private key signs a message hash to create a digital signature
- The public key verifies the signature and confirms the message’s integrity


## Code Signing

Code signing is the process of digitally signing software code or executables to verify their origin and ensure their integrity.

- Verifies that the code is from a trusted developer or publisher.
- Ensures the code hasn't been modified since it was signed.
- Protects users from malicious software and unauthorized code changes.

For more information, please see [Code Signing.](/docs/007-Cybersecurity/007-Software-Security/010-Application-Security.md#code-signing)


## Hash Functions 

Hash functions convert input data into a fixed-size hash value. A cryptographic hash function should have the following characteristic: 

- Unique 
- Deterministic
- Useful 
- Tamper-evident 
- Non-reversible


### MD5

Message Digest 5 (MD5) is an older hash function, MD5 is now considered insecure due to known collisions.

- Creates a 128-bit hash value unique to the input file.
- 128-bits long means it can only create limited values, which can lead to collisions.
- **Collisions*- - when two distinct inputs produce the same hash.
- Despite its insecurities, it's still used for checksums and non-security-sensitive applications.


### SHA Family  

A family of cryptographic hash functions designed by the National Security Agency (NSA) as a government standard for use in federal computing applications.

- **SHA-1*- 
    
    - Creates a 160-bit hash digest, reducing chance of collisions.
    - More secure than MD5, but also deprecated due to vulnerabilities.
    - Formerly used for digital signatures; now discouraged.

- **SHA-2*- 

    - Hash family containing longer hash digests.
    - Includes:
        - SHA-224
        - SHA-256
        - SHA-384
        - SHA-512

- **SHA-256*- 

   - Part of the SHA-2 family, SHA-256 offers a 256-bit output.
   - Stronger security, highly collision-resistant, and a commonly used standard.
   - Secure communication, SSL/TLS, and blockchain.

- **SHA-3*- 

   - A newer family of hash functions
   - Hash digest can go between **224 to 512 bits.**
   - Uses **120 rounds of computations*- to create the message digest.
   - SHA-3 uses a different underlying algorithm (Keccak).
   - Designed to provide high security and flexibility.
   - Used in applications requiring a strong hash function with versatility.


### RIPEMD

RIPEMD stands for **Race Integrity Primitives Evaluation Message Digest.*- It is a family of cryptographic hash functions designed to ensure data integrity and secure hashing.

- A family of cryptographic hash functions developed in Europe.
- Comes in **128/160/256/320-bit versions**
- The 128-bit version have been found to contain security flaws.
- **RIPEMD-160*- is the most known, with a 160-bit output.
- Offers strong security and is used as an alternative to SHA-1.

### HMAC

Stands for "Hash-based Message Authentication Code", HMAC uses a hash function combined with a secret key to generate a message authentication code (MAC).

- Uses a hash function and secret key for message authentication.
- HMAC provides message integrity and authentication.
- Ensures message is not been tampered and verifies identity of the sender.

Commonly paired with other algorithms for additional security:

 - **HMAC-MD5**: 

    - Historically used for message authentication and checksum verification.
    - Now considered insecure due to the vulnerabilities in MD5

- **HMAC-SHA1**: 

    - Offers more security than HMAC-MD5.
    - SHA-1 is now deprecated due to known vulnerabilities and potential collision attacks.

- **HMAC-SHA256**: 

    - Offers stronger security and used widely in modern cryptographic applications.
  
    - Most recommended for secure applications.







