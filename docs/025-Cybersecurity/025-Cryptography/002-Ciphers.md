---
title: "Code versus Ciphers"
description: "Algorithm for encrypting and decrypting information"
tags: 
- Security
- Cybersecurity
- Cryptography
sidebar_position: 2
last_update:
  date: 1/30/2024
---


## Code 

A system that substitutes one word or phrase for another. Codes are intended to provide secrecy and/or efficiency. An example of a code is the "Ten" code which is used by the police and other organizations who communicate by radio

The **Ten-Code**, also known as **ten signals**, is a set of code words used to represent common phrases in voice communication, particularly in law enforcement and emergency services. 

Here are some examples:

- **10-1**: Signal Weak
- **10-2**: Signal Good
- **10-3**: Stop Transmitting
- **10-4**: Acknowledgment (OK)
- **10-5**: Relay
- **10-6**: Busy
- **10-7**: Out of Service
- **10-8**: In Service
- **10-9**: Repeat
- **10-10**: Fight in Progress


## Ciphers

A cipher is an algorithm used to encrypt and decrypt information, transforming plain text into coded (cipher) text and vice versa. 

- Ciphers ensure data confidentiality 
- Central to encryption protocols.

Types of Ciphers:

- Stream Cipher
- Block Cipher


### Stream Ciphers

Stream ciphers encrypt data one bit or byte at a time, making them fast and suitable for continuous data flow.

- Encrypts data in a **continuous stream** instead of fixed blocks
- Uses a **key stream generator** to create random-looking bits
- The key stream is XORed with the plaintext to get the ciphertext

Stream ciphers are useful for real-time communication, where speed and efficiency are key, but they must use unique and random key streams to stay secure.

For more information, please see [Streaming Ciphers.](/docs/025-Cybersecurity/025-Cryptography/009-Symmetric-Encryption.md#streaming-ciphers)

### Block Ciphers

Block ciphers divide data into fixed-size blocks and encrypt each block separately using the same key.

- Encrypts data in blocks, such as 64 or 128 bits
- Each block of plaintext becomes one block of ciphertext
- Can perform transformations like substitution and permutation

Block ciphers typically have 64-bit block size, but **in reality its only 56 bits** because **8 bits is reserved for overhead/parity** to ensure that the other 56 bits are accurate.

For more information, please see [Block Ciphers.](/docs/025-Cybersecurity/025-Cryptography/009-Symmetric-Encryption.md#block-ciphers)


## Cryptography Techniques

Cryptography protects information by transforming readable data into a secret form and back again. These transformations keep data private and secure during transmission and storage.

- Encryption turns readable data into unreadable form
- Decryption converts it back into its original form
- Two main techniques are substitution and transposition ciphers

Both methods aim to hide the original message while keeping it recoverable only with the right key.


### Substitution Cipher

A substitution cipher replaces each part of the message with another symbol or letter based on a fixed rule.

- Each letter or group in plaintext is replaced with another
- A simple example is shifting letters along the alphabet
- Can use a single alphabet or multiple shifting patterns

Example: In a basic shift of 3, **A → D**, **B → E**, **C → F**. 

This idea shows how substitution hides meaning by changing characters, not order.

### Transposition Cipher

A transposition cipher hides the message by rearranging characters instead of changing them.

- The order of letters changes while letters stay the same
- One example is the rail fence cipher, written in a zigzag pattern
- Another is the columnar transposition, which uses grids and keys to reorder text

This technique scrambles the structure of data, showing that security can come from arrangement, not replacement.

## Common Ciphers

### Caesar Cipher  

The Caesar Cipher shifts letters of the alphabet by a fixed number of positions. It’s one of the oldest and simplest ciphers.

- Each letter shifts a set number of places
- Shifts can be from 1 to 25 positions
- Example: With a shift of 3, **A → D**, **B → E**, **C → F**
- **ROT2** means a shift of two positions
- **ROT3** means a shift of three positions

Although it's historically significant, the Caesar Cipher is not used for serious encryption today due to its simplicity and vulnerability to straightforward cryptanalysis



<div class="img-center">

![](/img/docs/sec+-ceasar-cipher-wheel.png)


</div>


### Vigenere Cipher

The Vigenère Cipher improves on the Caesar Cipher by using a repeating keyword to determine the shifts for each letter.

- A keyword defines how much to shift each letter
- The key repeats to match the message length
- Decryption uses the same key to reverse the shifts
- **Strengths**: Adds complexity and resists frequency analysis
- **Weaknesses**: Patterns in long texts can still reveal the key

Example: Using the key **LEMON**, the word **HELLO** becomes **OIWWC**.
The Vigenère Cipher shows how layering keys adds strength to encryption.


<div class="img-center">

![](/img/docs/sec+-vigenere-cipher-diagram.png)


</div>

### Book Cipher (Running Key Cipher)

The Book Cipher, also called the **Running Key Cipher**, is a type of polyalphabetic substitution cipher that uses text from a book or document as the key. In this cipher, each letter of the plaintext is shifted based on the corresponding letter in the key text 

- The book or text is known to both sender and receiver   
- The longer the key text, the harder it is to break  
- The same book and edition must be used for encryption and decryption  

Example:  

If the message is "HELLO" and the book text starts with "WORL...", each plaintext letter is shifted by the alphabet position of the corresponding book letter.

**Strengths**
- Offers stronger security than short-key ciphers like Vigenère  
- Key is hard to guess if the book is unknown  

**Weaknesses**
- Vulnerable if the book is identified or reused  
- Requires both parties to have identical copies of the text  

This cipher shows how using long, natural-language keys can strengthen substitution methods while keeping encryption manual and simple.


### Exlusive OR (XOR) 

XOR is a basic operation that compares bits and returns 1 if they’re different, or 0 if they’re the same.

- If bits are different, the result is 1
- If bits are the same, the result is 0
- Reversing is easy — XOR with the same key again restores the original

Example:

```
1 XOR 0 = 1  
0 XOR 0 = 0  
1 XOR 1 = 0
```

<div class="img-center">

![](/img/docs/sec+xor-keyss.png)


</div>

**Applications**

- **Encryption**: Used in stream and block ciphers
- **One-Time Pad**: A perfect encryption if the key is random and used once
- **Error Detection**: Helps identify bit errors in data

**Security Notes**

- **Key secrecy** is critical for XOR security
- **Reusing keys** makes it vulnerable to attacks
