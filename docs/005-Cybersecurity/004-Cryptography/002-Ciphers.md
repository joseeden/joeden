---
title: "Ciphers"
description: "Algorithm for encrypting and decrypting information"
tags: [Security, Cybersecurity, Cryptography]
sidebar_position: 2
last_update:
  date: 1/30/2024
---



## Overview

A cipher is an algorithm used to encrypt and decrypt information, transforming plain text into coded (cipher) text and vice versa. 

- Ciphers ensure data confidentiality 
- Central to encryption protocols.

Types of Ciphers:

- Stream Cipher
- Block Cipher


### Stream Ciphers

Stream Ciphers encrypt data bit by bit or byte by byte in a continuous stream.

- Performs encryption on **single byte at a time.**
- Uses a key stream generator to create a pseudo-random sequence of bits (the key stream).
- The key stream is then XORed with the plaintext to produce ciphertext.

**Common Features**:

- Uses same key for encryption and decryption.
- Implemented mostly on hardware-based solutions.
- Often used in real-time applications where data is continuously transmitted (e.g., streaming services).
- Vulnerable to certain types of attacks if key stream is reused or not sufficiently random.

**Examples**: 

- RC4
- Salsa20
- ChaCha20

### Block Ciphers

Block Ciphers break the input into fixed-size blocks (e.g., 64-bit or 128-bit) and performs the encryption on each block.

- Performs encryption on per block basis.
- A block of plaintext is processed with a key to produce a block of ciphertext.
- Multiple rounds of transformation can also be used (e.g., substitution and permutation).

**Common Features**:
- Easier to implement, less susceptible to security problems.
- Implemented mostly on software solutions.
- Often used in protocols and file encryption, where data is processed in chunks.
- Require padding when the plaintext doesn't evenly divide into block sizes.
- Can be operated in various modes to enhance security or support specific applications.

**Examples**: 
- AES
- DES
- 3DES


## Common Ciphers

### Cease Cipher 

Named after Julius Caesar, it is a simple substitution cipher where each letter in the plaintext is shifted a certain number of positions down or up the alphabet.
- Shifts each letter in the plaintext a certain number of positions along the alphabet.
- The number of positions to shift, typically between 1 and 25.
- Example: With a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on.
- **ROT2** - two shifts in positions
- **ROT3** - three shifts in positions, and so on.

Although it's historically significant, the Caesar Cipher is not used for serious encryption today due to its simplicity and vulnerability to straightforward cryptanalysis



<div class="img-center">

![](/img/docs/sec+-ceasar-cipher-wheel.png)


</div>


### Vigenere Cipher

The Vigenère Cipher is a type of polyalphabetic substitution cipher that uses a repeating key phrase to determine shifting patterns for each letter in the plaintext, offering greater security than simple substitution ciphers.

- A key phrase, repeated to match the plaintext length, determines the shift for each letter.
- To decrypt, use the same key to reverse the shifts and recover the plaintext.


**Strengths**: 
- Provides increased complexity, making frequency analysis and brute-force attacks more difficult.

**Weaknesses**: 
- Susceptible to Kasiski examination and Friedman tests, which can reveal key patterns and lengths, leading to cryptanalysis.

**Example**: 
- With the key "LEMON," the plaintext "HELLO" is encrypted by shifting each letter according to the corresponding letter in the key, resulting in "OIWWC."


<div class="img-center">

![](/img/docs/sec+-vigenere-cipher-diagram.png)


</div>


### Exlusive OR (XOR) 

Exclusive OR (XOR) is a binary operation used extensively in cybersecurity and cryptography. It operates on bits, returning 1 if the bits are different and 0 if they are the same. Here's a concise description with key bullet points:

- XOR compares two bits; if they're different, it outputs 1; if they're the same, it outputs 0.
- XOR is reversible, allowing data encrypted with a key to be decrypted by XORing again with the same key.



<div class="img-center">

![](/img/docs/sec+xor-keyss.png)


</div>



**Applications**:

  - **Encryption**: 
    - Commonly used in stream ciphers and some block ciphers to combine plaintext with a key stream, creating ciphertext.

  - **One-Time Pad (OTP)**: 
    - A theoretically unbreakable encryption method that uses XOR with a key as long as the plaintext, provided the key is truly random and never reused.

  - **Data Manipulation**: 
    - XOR can be used to toggle bits or swap values without additional storage.

  - **Error Detection/Correction**: 
    - In parity checks and error-correcting codes, XOR helps identify errors in transmitted or stored data.


**Security Considerations**:
  - **Key Management**: 
    - Security in XOR-based encryption relies heavily on key secrecy and randomness.

  - **Vulnerabilities**: 
    - If the key is reused or predictable, XOR-based encryption is susceptible to various attacks, including known-plaintext attacks.
