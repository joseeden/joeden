---
title: "Protecting Data"
description: "Protecting and Mishandling Data"
tags: [Security, Cybersecurity, Security Operations, Data Security]
sidebar_position: 5
last_update:
  date: 1/30/2024
---

## Ways to Protect Data

### Data Security Controls 

Data security controls are essential measures implemented to protect data from unauthorized access, alteration, or destruction. These controls help ensure the confidentiality, integrity, and availability of data within an organization, safeguarding sensitive information and complying with regulatory requirements.

- Clear policiesand procedures covering data use and security.
- Encryption to protect sensitive information.
- Access controls on stored data.

### Anonymization 

Anonymization of data is the process of removing or altering personally identifiable information (PII) to ensure that the data cannot be traced back to specific individuals.

- Anonymized data has limited marketing value
- GDPR allows anonymized data collection and use without user consent 

### Pseudo-Anonymization 

Replacing unique identifiers (such as PII) with fake identifiers.

- Information can also be selectively removed. 

### Data Minimization 

Refers to limiting the amount of data that is stored or retained.

- Example is PCI DSS 
- Merchants doesn't need to retain the customers' credit card details 
- Retain only what's legally allowed.

### Tokenization 

Using a service or app that creates a unique token that authorizes the access instead of using the original credentials. 

### Data Masking 

Refers to hiding sensitive data from unauthorized users.

- Masked out credit card number digits on receipts

### Encryption 

Encryption is essential for data security as it ensures that sensitive information remains secure and unreadable to unauthorized individuals, both while stored and during transmission over networks.

- **Encryption for Transactions**
   - Safeguards personal and business transactions.
   - Protects information by making it unreadable without decryption.

- **Digital Signatures for Authenticity**
   - Verifies the legitimacy of software updates and sources.
   - Ensures the integrity and authenticity of digital content.

- **Secure Email Communication**
   - Enables the exchange of digitally signed contracts.
   - Validates the binding nature and authenticity of digital contracts.

For more information, please see [Data Encryption.](/docs/007-Cybersecurity/002-Asset-Security/006-Data-Encryption.md)

### Cryptography

Cryptography is a versatile tool, providing crucial services like confidentiality and integrity for enhanced system security.

- **Confidentiality**
   - Hides messages, ensuring restricted access.
   - Keeps information secret, accessible only to authorized users.

- **Integrity Services**
   - Utilizes hash functions and digital signatures.
   - Verifies message integrity, detecting any alterations.



         
      <div class="img-center">

      ![](/img/docs/security-encryption-cryptograpghy.png)


      </div>


### Cryptographic Hash Function 

A hash function is a mathematical function that takes an input or 'message' and generates an output or 'hash value', usually much smaller than the original message, typically of a fixed-size. Hash functions are used to generate unique representations of data or verify data integrity and are a crucial element of cryptographic systems.

For more information, please see [Hashing](/docs/007-Cybersecurity/005-Cryptography/012-Hashing.md#hash-functions)

### Message Digests 

Message digesting ensures data integrity by maintaining accuracy and consistency.

- It uses cryptographic hash functions like MD5 or SHA-256.
- Creates a unique, fixed-length "digest" of the original message data.
- When downloading a file, a Web site may provide a hash value.
- Users can perform the same hash function on the downloaded file.
- Matching digests confirm the file's integrity, indicating no alteration during transmission.

::: info[note]

In some resources, message digests are interchangeable with hashes or hash value.

:::


### Digital Signatures 

A digital signature uses assymetric cryptography to transform data to achieve: 

- data origin authentication
- data integrity
- non-repudiation of the signer 

However, digital signatures **cannot guarantee confidentiality** (i.e. the property of data or information not being made available or disclosed).

For more information, please see [Digital Signatures in Asymmetric Encryption.](/docs/005-Cryptography/010-Asymmetric-Encryption.md#digital-signature)



### Message Authentication Code 

A Message Authentication Code (MAC) does not guarantee anonymity. MAC is a cryptographic function that guarantees a message's:

- integrity,
- authenticity, and 
- non-repudiation.

On the other hand, **anonymity is not a guaranteed by a MAC.**


## Mishandling Data 

### Cybersquatting

Cybersquatting involves speculatively registering and selling domain names for profit.

- Intent is to profit from someone else's trademark.
- Example: Registering "mycompany.com" to sell it to the trademark owner.
- Can cause confusion and damage to the trademark owner's brand.
- Generally considered unethical and deceptive.
- Illegal under the United States' Anticybersquatting Consumer Protection Act (ACPA) and similar laws in other countries.

