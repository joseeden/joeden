---
title: "Escrow, Recovery, and Stretching"
description: "Ways to store, recover, and secure keys"
tags: 
- Security
- Cybersecurity
- Cryptography
sidebar_position: 11
last_update:
  date: 1/30/2024
---


## Key Escrow

Strong encryption is designed to protect data, but it can be a challenge for law enforcement and government agencies that need access under specific conditions, like with a search warrant. 

- Key escrow involves storing encryption keys with a trusted party.
- Access to these keys requires specific conditions, such as obtaining a court order.

:::info 

**Split knowledge** means dividing sensitive information, like a cryptographic key, into parts so no single person has the complete key. 

It ensures security by requiring multiple parties to combine their portions to access the full secret.

:::

### Escrow Approaches 

Escrow approaches allow trusted third parties to hold decryption keys for lawful access when needed.

- **Fair Cryptosystems**

  - Split encryption keys among multiple trusted parties
  - All parties must agree to unlock the data
  - Aims to balance privacy with authorized access

- **Escrowed Encryption Standard**

  - Government or organization holds part of the encryption key
  - Allows recovery of encrypted data under legal approval
  - Criticized for creating potential backdoors and privacy risks

These methods try to support both security and accountability but often face criticism for weakening overall encryption trust.


### Encryption Controversies

Encryption has often sparked debates between privacy and security. Below are two well-known cases that highlight this conflict.

- **Clipper Chip**

  - Introduced in 1993 with a built-in key recovery system
  - Faced public backlash over privacy and security flaws
  - Eventually dropped due to lack of trust

- **FBI vs. Apple**

  - In 2016, the FBI asked Apple's help to unlock an encrypted iPhone
  - Apple refused, citing  a backdoor would weaken security for all users
  - Sparked global debate on encryption and government access


### Current Challenges

Securing key escrow remains problematic as governments seek access to encryption keys for investigations, while consumers demand high security. Balancing these needs is a major challenge.

- Governments require access for legal purposes.
- Consumers demand uncompromised security.

### Key Recovery

Organizations may need to recover encryption keys if users forget passwords or leave the company. Solutions like Microsoft Windows Encrypting File System (EFS) use recovery agents with master keys, which must be protected to ensure data security.

- **Recovery Agents (RAs)**

  - Authorized individuals who can restore encryption keys
  - Hold special master keys for decrypting user data
  - Must be strictly managed to prevent misuse

- **M of N Control**

  - Splits key recovery responsibility among multiple people
  - Requires at least `*M-` out of `*N-` authorized members to recover a key
  - Doesn't depend on every participant being present
  - Prevents any single person from having full recovery power


## Key Stretching 

Key stretching improves the strength of encryption keys derived from passwords, making them more resistant to attacks. Key stretching takes a weak password and enhances its strength to resist attacks, like dictionary attacks.

  1. **Salting**: Adds a unique value (salt) to the password before hashing.
  2. **Hashing**: Repeatedly hashes the salted password, increasing the time required to verify the key.

Key stretching repeats these two processes hundreds or thousands of times to consume longer amounts of time. The idea is that if a user knows the password, verifying the password should not be a big deal. 

:::info 

**Verifying one key is fast, but guessing millions of keys is slow.**

:::

## Key Stretching Algorithms

These methods ensure that while legitimate users can access their data with acceptable delays, attackers face significant delays when attempting to guess passwords.


### PBKDF2

PBKDF2 (Password-Based Key Derivation Function 2) enhances password security by performing multiple cryptographic operations. This makes it significantly more difficult for attackers to use brute-force attacks or precomputed hash tables.

- Uses a unique salt combined with the password.
- Applies hashing repeatedly 
- Slows down password verification and thwart attackers.

### Bcrypt

Bcrypt is a password hashing function based on the Blowfish cipher. It incorporates both salting and hashing to provide robust key strengthening.

- Integrates salting with the Blowfish cipher's hashing.
- Provides key protection by making hash calculations time-consuming.