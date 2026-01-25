---
title: "Data Protection"
description: "Ways to protect your data in AWS"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 60
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Overview of Encryption 

Unencrypted data can be read and seen by anyone who has access to it and data stored at rest or sent between two locations in transit is known as plain text or clear text data. The data is plain to see and could be seen and understood by any recipient. 

There is no problem with this as long as the data is not sensitive in any way and doesn't need to be restricted. However if you have data that is sensitive, you need to ensure that the contents of that data is only viewable by a particular recipient or recipients. This can be done by adding a level of encryption to that data.

**Data encryption** is the mechanism in which information is altered, rendering the plain text data unreadable through the use of mathematical algorithms and encryption keys. 

When encrypted, the original plain text is now known as **cipher text** which is unreadable. To decrypt the data, an encryption key is required to revert the cipher text back into a readable format of plain text. 

An **encryption key** is simply a string of characters used in conjunction with the encryption algorithm and the longer the key the more robust the encryption. This encryption involving keys can be categorized by either being:

- symmetric cryptography
- asymmetric cryptography. 

## Symmetric Encryption 

With symmetric encryption, a single key is used to both encrypt and also decrypt the data. 

- This key must be sent securely between the two parties, WHICH exposes a weakness
- If the key is intercepted during transmission, then that third party could easily decrypt any data associated with that key. 

AWS KMS resolves this issue by acting as a central repository, governing and storing the keys required and only issues the decryption keys to those who have sufficient permissions to do so. Some common symmetric cryptography algorithms that are used are:

- AES (Advanced Encryption Standard)
- DES (Digital Encryption Standard)
- Triple DES
- Blowfish

Pros: Symmetric is a lot faster from a performance perspective

Cons: Additional risk as highlighted above 

## Asymmetric Encryption 

Asymmetric encryption which involves two separate keys that are created both at the same time and are linked through a mathematical algorithm. :

- One is used to encrypt the data and considered the private key and should be kept by a single party and should never be shared with anyone else.

- Second key is used to decrypt the data and is considered the public key that can be given and shared with anyone. The public key does not have to be sent over secure transmission and it doesn't matter who has access to this public key as without the private key, any data encrypted with it cannot be accessed. 

Some common examples of asymmetric cryptography algorithms are:

- RSA
- Diffie-Hellman
- Digital Signature Algorithm. 
    
## How Public and Private keys work 

If another party wanted to send you an encrypted message or data, they would encrypt the message using your own public key which can be made freely available to them or anyone. It's public for a reason. The message is then sent to you where you will use your own private key which has that mathematical relationship with your public key to decrypt the data. This allows you to send encrypted data to anyone without the risk of exposing your private key, resolving the issue highlighted with symmetric encryption. 
