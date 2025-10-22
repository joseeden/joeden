---
title: "Common Hashing Attacks"
description: "Common Hashing Attacks"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 13
last_update:
  date: 1/30/2024
---

## Common Attacks 

### Pass the Hash Attack

A "pass the hash" attack involves using a hashed password to gain unauthorized access to a system, bypassing the need for the plaintext password. Attackers obtain the hash and use it to authenticate without knowing the actual password.

- Attackers steal password hashes from compromised systems.
- They use these hashes to authenticate, avoiding password-based checks.
- Common in Windows environments with NTLM authentication.

For more information, please see [Pass the Hash Attack](/docs/007-Cybersecurity/051-List-of-Attacks/002-Cryptographic-Attacks.md#pass-the-hash-attack).

### Birthday Attack

A "birthday attack" exploits the probability of hash function collisions, where two different inputs generate the same hash. It targets cryptographic systems to compromise security or create fake signatures.

For more information, please see [Birthday Attack](/docs/007-Cybersecurity/051-List-of-Attacks/001-Password-Attacks.md#birthday-attack).

### Rainbow Table Attack 

A rainbow table attack uses precomputed hashes to find a matching hash value for a user's password (see ISC2 Study Guide, Module 2, under Types of Threats). 

For more information, please see [Rainbow Table Attack](/docs/007-Cybersecurity/051-List-of-Attacks/002-Cryptographic-Attacks.md#rainbow-table-attack).

### Dictionary Attack 

A dictionary attack is a type of attack that uses a list of common words to guess a user's password. 

For more information, please see [Dictionary Attack](/docs/007-Cybersecurity/051-List-of-Attacks/001-Password-Attacks.md#dictionary-attack).

### Brute Force Attack 

A brute force attack uses every possible combination of letters, numbers, and symbols to guess a user's password.

For more information, please see [Brute Force  Attack](/docs/007-Cybersecurity/051-List-of-Attacks/001-Password-Attacks.md#brute-force-attack).


## Increasing Hash Security 

### Key Stretching 

Key stretching enhances password or key security by making brute-force attacks more difficult. It involves repeatedly applying a computationally expensive operation to strengthen a simple input like a password.

- Slows down brute-force attacks by increasing computational effort.
- Secure stored passwords and to derive encryption keys from user inputs.
  
**How it works**

  - The input (e.g., a password) is hashed multiple times, often with a unique "salt."
  - Repeated hashing creates a more secure output, making it harder for attackers to crack.
  
**Common Algorithms**

  - PBKDF2
  - bcrypt
  - scrypt
  
**Considerations**

  - Balancing security with performance is key, as additional computation can impact system efficiency.

### Salting 

Salting improves password security by adding random data, called a "salt", to the input before hashing. This makes the hashed result more resistant to brute-force and dictionary attacks.

- Salt prevents the use of precomputed tables to crack passwords.
- Each salt creates a unique hash, even for identical passwords.
- Unique salted hash deter attackers.
  
  
**How It Works**

- A unique random salt is generated for each password.
- The salt is added to the password before hashing.
- This results to a unique hash for each combination of salt and password.

**Considerations**

- Salts should be unique for each password and stored securely.
- Proper management of salts is crucial.
- Losing the salts can make it impossible to verify or recover passwords.

### Nonce 

A **nonce** or  "**number used once**" is a unique or random value used in cryptography to ensure security and prevent attacks. 

- One-time-use number to ensure randomness and uniqueness.
- Number is added to the authentication sequence.
- Prevents replay attacks by ensuring requests are unique.
- Increases security by preventing unauthorized reus.

**Common Uses**

- In authentication to ensure a one-time operation.
- In cryptographic protocols like TLS/SSL for secure communications.
- In blockchain, where it helps validate blocks in Proof of Work systems.
  
**Key Considerations**

- Nonces must be unique and unpredictable;.
- Reusing them can create vulnerabilities.
- Proper management is crucial for maintaining security.

:::info

One of the most recognizable examples of a nonce is an **Initialization Vector (IV)**.

An IV is a random bit string thatb is used to create unique ciphertexts every time the same message is encrypted using the same key.

:::

### Limiting Failed Login Attempts 

Limiting failed login attempts is a security measure to prevent brute-force attacks by restricting the number of password tries a user can make.
  
- **How It Works**

  - Temporarily lock accounts after a limit is reached.
  - Introduce delays to slow down brute-force attempts.
  - Require CAPTCHA or multi-factor authentication for repeated failures.
  
- **Considerations**

  - Avoid overly strict limits to prevent locking out legitimate users.
  - Have a process for users to regain access if locked out.
  - Monitor for signs of malicious activity.
