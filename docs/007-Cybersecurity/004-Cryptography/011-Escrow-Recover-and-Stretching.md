---
title: "Escrow, Recovery, and Stretching"
description: "Ways to store, recover, and secure keys"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 11
last_update:
  date: 1/30/2024
---


## Key Escrow

Strong encryption is designed to protect data, but it can be a challenge for law enforcement and government agencies that need access under specific conditions, like with a search warrant. 

- Key escrow involves storing encryption keys with a trusted party.
- Access to these keys requires specific conditions, such as obtaining a court order.


### Examples 

- **Clipper Chip**
    - In 1993, the government introduced the Clipper chip, which included a law enforcement access field (LEAF) to decrypt communications.
    - Public outcry and identified security flaws led to its rejection and limited adoption.

- **FBI vs. Apple**
    - In 2016, the FBI sought Apple’s help to unlock an encrypted iPhone. 
    - Apple opposed, arguing that compromising encryption could jeopardize the security of millions of users.

### Current Challenges

Securing key escrow remains problematic as governments seek access to encryption keys for investigations, while consumers demand high security. Balancing these needs is a major challenge.

- Governments require access for legal purposes.
- Consumers demand uncompromised security.

### Recovering Agents 

Organizations may need to recover encryption keys if users forget passwords or leave the company. Solutions like Microsoft Windows Encrypting File System (EFS) use recovery agents with master keys, which must be protected to ensure data security.

- **Recovery Requirements**:
  - Key recovery needed for forgotten passwords or departing employees.
  - EFS uses recovery agents with master keys.
  - Master keys must be carefully safeguarded.

## Key Stretching 

Key stretching improves the strength of encryption keys derived from passwords, making them more resistant to attacks. Key stretching takes a weak password and enhances its strength to resist attacks, like dictionary attacks.

  1. **Salting**: Adds a unique value (salt) to the password before hashing.
  2. **Hashing**: Repeatedly hashes the salted password, increasing the time required to verify the key.

Key stretching repeats these two processes hundreds or thousands of times to consume longer amounts of time. The idea is that a user knows the password, verifying the password should not be a big deal. Verifying one key is fast, but guessing millions of keys is slow. 

## Key Stretching Algorithms

These methods ensure that while legitimate users can access their data with acceptable delays, attackers face significant delays when attempting to guess passwords.


### PBKDF2

PBKDF2 (Password-Based Key Derivation Function 2) enhances password security by performing multiple cryptographic operations. This makes it significantly more difficult for attackers to use brute-force attacks or precomputed hash tables.

- Uses a unique salt combined with the password.
- Applies hashing repeatedly to slow down password verification and thwart attackers.

### Bcrypt

Bcrypt is a password hashing function based on the Blowfish cipher. It incorporates both salting and hashing to provide robust key strengthening.

- Integrates salting with the Blowfish cipher's hashing.
- Provides effective key protection by making hash calculations time-consuming.