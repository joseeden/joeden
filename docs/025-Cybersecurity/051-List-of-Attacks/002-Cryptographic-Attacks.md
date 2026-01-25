---
title: "Cryptographic Attacks"
tags: [Cybersecurity]
sidebar_position: 2
last_update:
  date: 1/30/2024
---



## Overview

In simplests terms, we can perform cryptographic attacks by:

1. Attacking the algorithm
2. Attacking the implementation
3. Attacking the key

## Downgrade Attacks

Also known as **version rollback attack**, downgrade attacks force a system to use a less secure version of a protocol, making it vulnerable to known exploits. 

**How it works:**

- Attacker manipulates communication exchanges.
- This makes the parties believe they should use a less secure version of a protocol or a weaker encryption algorithm.
- Achieved by any of the following:
  - Intercepting and altering communication
  - Exploiting fallback mechanisms
  - Exploiting vulnerabilities in protocol negotiation.

**Examples:**

  - In HTTPS, an attacker could force a secure connection to revert to an older SSL version with known vulnerabilities.
  - In wireless networks, an attacker might trick a device into connecting to a less secure network.
  - **POODLE Attack** - Padding Oracle on Downgraded Legacty Encryption, which targeted SSL 3.0.

**Mitigations:**

- **Protocol Hardening**: 
  - Ensure protocols do not support older, insecure versions. 
  - For example, disable SSL and only use modern TLS versions.

- **Strict Negotiation**: 
  - Implement strict rules for protocol negotiation.
  - This prevents fallback to less secure versions.

- **Secure Communication**: 
  - Use certificates and mutual authentication to validate communication channels and avoid man-in-the-middle attacks.

- **Regular Updates**: 
  - Keep software and systems updated to the latest secure versions, removing outdated protocol support.



## Collision Attacks

Collision attacks find two different inputs that produce the same hash, potentially compromising cryptographic integrity. 

- To breach the integrity of a cryptographic system.
- Exploit vulnerabilities in hash-based security.

**How It Works:**

- The attacker tries to find two different inputs that yield the same hash.
- Can be used to forge digital signatures or tamper with data
- It can also bypass security checks.

**Examples:**

- MD5 and SHA-1 hash functions have known vulnerabilities allowing collision attacks.
- Birthday Attacks
- Certificate forgery, where an attacker can create a fraudulent certificate with the same hash as a legitimate one.

**Mitigations:**

- **Use Secure Hash Functions**
  - Choose hash functions with no known vulnerabilities. 
  - Avoid MD5 and SHA-1; opt for SHA-256 or stronger.

- **Implement Collision-Resistant Algorithms** 
  - Employ algorithms designed to resist collisions
  - Used in digital signatures and certificate generation.

- **Detect Anomalies** 
  - Implement mechanisms to detect unusual patterns
  - The patterns might indicate a collision attack.

- **Regularly Update Security Practices** 
  - Stay updated with the latest cryptographic standards
  - Replace vulnerable hash functions as necessary.




## Quantum Computing

Quantum computing poses a threat to traditional cryptography by potentially breaking key cryptographic algorithms. 

- Quantum computers use **qubits**, which can represent multiple states simultaneously.
- This enables parallel processing at a massive scale.
- Run algorithms that can break traditional cryptographic methods.
- Example: Shor's algorithm for integer factorization.
  
**Implications for Cryptography**

- Quantum computing threatens public-key encryption algorithms like RSA and ECC.
- RSA and ECC rely on computational hardness (e.g., factoring large numbers).
- Symmetric key algorithms are more resistant but require longer key lengths.

**Post-quantum cryptography** aims to create algorithms resistant to quantum attacks.
  
  - CRYSTALS-Dilithium 
  - FALCON 
  - SPHINCS+

**Mitigations:**

- **Transition to Post-Quantum Cryptography** 

  - Adopt cryptographic algorithms designed to withstand quantum attacks.
  - Examples are lattice-based or hash-based algorithms.

- **Use Larger Key Sizes** 

  - Increase key sizes in symmetric encryption.
  - This provides a greater buffer against quantum computing threats.

- **Hybrid Cryptographic Systems** 

  - Uses a mix of traditional and post-quantum cryptographic techniques.

- **Monitor Quantum Advancements** 

  - Keep informed about developments in quantum computing.
  - Adapt security strategies accordingly.

## Rainbow Table Attack 

A rainbow table attack uses precomputed hashes to find a matching hash value for a user's password.

**Mitigations:**

- Add a unique random value (salt) to each password before hashing.
- Choose robust cryptographic hash functions resistant to rainbow tables.
- Enforce strong and complex password creation policies.
- Stay current with advancements, adopting newer, more secure hash functions.
- Implement Two-Factor Authentication (2FA)

:::info 

If a user gets a copy of the `/etc/shadow` file containing hashed versions of the users' passwords, they can look up the hash in the rainbow table to see if there is a match. If so, the plain text equivalent in the other column might be a valid password to log into the system for that user.

:::

## Pass the Hash Attack

A "pass the hash" attack involves using a hashed password to gain unauthorized access to a system, bypassing the need for the plaintext password. Attackers obtain the hash and use it to authenticate without knowing the actual password.

- Attackers steal password hashes from compromised systems.
- They use these hashes to authenticate, avoiding password-based checks.
- Common in Windows environments with NTLM authentication.

:::info 

Hashes are sent over the network instead of usernames and passwords. If a malicious user can retrieve the hash, such as from server memory, she could access other network resources as the authenticated user.

:::

### Mimikatz

Mimikatz is an open-source tool for security testing and [penetration testing](/docs/025-Cybersecurity/028-Assessment-and-Testing/067-Penetration-Testing.md).

  - Extracts plaintext passwords, hashes, and [Kerberos](/docs/025-Cybersecurity/024-Infrastructure-and-Network/020-Authentication-Protocols.md#kerberos) tickets from memory.
  - Enables "pass the hash" and "pass the ticket" attacks.
  - Manipulates Windows authentication tokens.

Common Use Cases:

  - Used by penetration testers to assess security on Windows systems.
  - Often exploited by hackers for unauthorized access.

### Mitigations

Mitigations:

  - Apply multi-factor authentication.
  - Keep Windows systems updated with security patches.
  - Limit administrative access and use secure password management.
  - Ensure only trusted OS are allowed to connect to your servers.
  - Implement [least privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) for all user accounts.
