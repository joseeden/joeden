---
title: "Password Attacks"
tags: [Cybersecurity]
sidebar_position: 1
last_update:
  date: 1/30/2024
---



## Overview

Password attacks attempts to gain unauthorized access by cracking or stealing passwords.

## Brute Force Attack 

A brute force attack, also called as a known ciphertext attack, uses every possible combination of letters, numbers, and symbols to guess a user's password.

**Mitigations:**

- Enforce strong and complex password creation policies.
- Temporarily lock accounts after a certain number of unsuccessful login attempts.
- Restrict the number of login attempts within a specific time frame.
- Keep systems and software up-to-date to address vulnerabilities.

## Knowledge-Based Attacks 

Knowledge-based attacks are more sophisticated than brute-force attacks, using available information and cryptanalytic techniques to break encryption.

### Frequency Analysis Attack

This type of attack analyzes the statistical patterns in cipher text to detect vulnerabilities.

- Common letters in English: E, T, O, A, I, and N
- If letter X appears frequently, it may represent E in a simple substitution cipher
- Digraphs (letter pairs) like T-H, H-E, I-N, or E-R can provide additional clues

### Known-Plaintext Attack

If an attacker has both encrypted and unencrypted versions of a message, they can use that information to crack the encryption key.

- Helps in decrypting other messages
- The attacker exploits patterns between plaintext and ciphertext

### Chosen-Plaintext Attack

In this scenario, the attacker encrypts a selected message using the algorithm and key.

- Allows the attacker to study the encryption process
- Aims to learn the encryption key for further exploitation


## Dictionary Attack 

A dictionary attack is a type of attack that uses a list of common words to guess a user's password. 

**Mitigations:**

- Enforce strong and complex password creation policies.
- Temporarily lock accounts after a certain number of unsuccessful login attempts.
- Use a secure hashing algorithm with a unique salt for each password.
- Keep systems and software up-to-date to address vulnerabilities.
- Add an additional authentication layer - MFA

## Password Spraying 

A form of brute force attack that involves trying a small number of commonly used passwords against a large number of username and accounts. 

- Effective, can avoid triggering account lockouts from too many failed login attempts. 
- In a large group of user, there's a good chance some of them uses very common and weak passwords.
- Slower (per-account basis), since each common password is tried on each user first.

**Mitigations:**

- Rate limiting on login attempts to slow down brute force attacks.
- Regular password changes to minimize risks from compromised accounts.
- Ensure users create complex passwords to avoid common and weak ones.
- Monitor for unusual login attempts or patterns.

## Hybrid Attack 

Blends brute force and dictionary techniques by using common passwords with variations, such as adding numbers and special characters.

**Mitigations:**

- Encourage complex passwords - less susceptible to variations.
- Recommend long, randomly generated passwords.
- Lock accounts after repeated failed attempts.
- Implement rate limiting to slow down hybrid attacks.
- Educate users about secure password practices.

## Birthday Attack 

Cybercriminals use birthday attacks to trick systems by cracking digital authentication methods.

**The Birthday Paradox**

  - High odds of at least two will share a birthday in a random group of people. 
  - Easier to find two colliding results of different inputs than generating all possible outputs.

**Birthday Attack in Cybersecurity**

  - Attackers aim to find hash collisions to break security. 
  - Used to crack weak hash functions or forge digital signatures.

**Finding the Collision:**

  1. A program repeatedly runs the hash function on randomly selected inputs.
  2. Every input-output pair is stored in a database.
  3. Each output is checked to find collisions (different inputs produce the same output).
  4. Attackers then exploit hash collisions to trick the system into treating different messages as identical.

**Mitigations:**
  
- Use hash functions with large bit sizes; avoid outdated algorithms.


<small>Reference: https://atlasvpn.com/blog/birthday-attack</small>

