---
title: "AAA of Security"
description: "Authentication, Authorization, and Accounting"
tags: [Security, Cybersecurity, Risk Management]
sidebar_position: 3
last_update:
  date: 1/30/2024
---



## The AAA

### Authentication

When a person’s identity is established with proof and confirmed by a system.

- Something you know
- Something you have
- Something you are
  
### Authorization
  
Occurs when a user is given access to a certain piece of data or certain areas of a building

### Accounting

Often called **auditing**, it involves tracking of data, computer usage, and network resources.

  - Non-repudiation - proof that someone has taken an action
  - Types of auditing:
    - Resource access 
    - Failed login attempts 
    - Changes to files/records
  - In Windows, we can see audit logs in the Event viewer.

    ![](/img/docs/sec+-accounting-audit-login-example.png)

## Authentication 

This is the process of verifying the identity of a user who has stated their identity. 
- Proving the identity of the requestor.
- Enhances security by ensuring authorized access.

### Methods of Authentication

- **Single-Factor Authentication (SFA)**
  - Relies on only one method of authentication.

- **Multi-Factor Authentication (MFA)**
  - Requires successful demonstration of two or more authentication methods.

### Common Authentication Techniques

- **Knowledge-based**
  - Uses a passphrase or secret code.
  - Vulnerable to attacks; often requires additional authentication methods for better security.
  - Examples:
    - **Password Managers**
      - Also called "password vaults"
      - a master key protects the vault - DON'T FORGET IT!
      - Examples: LastPass, cloud-based vaults to store password keys
      - For Windows, we can use Credentials Manager - NOT RECOMMENDED

        ![](/img/docs/sec+-windows-credential-manager.png)

    - **One-time Password (OTP)**
      - Unique password code generated for single use 
      - Static code sent by email or SMS

    - **Time-based OTP**
      - Code is only valid for a short period of time

    - **Push Notifications**
      - Phone call, SMS, or email

    - **HMAC OTP**
      - HMAC encrypts a hash to ensure authenticity
      
- **Certificate-based**
  - PKI certificates are issued by a trusted authority to an individual entity
  - Device, VPN, app access 
  - Can be stored in a smart card
  - **Common Access Card** - can authenticate to everything

- **Token-based**
  - Involves tokens, memory cards, or smart cards.

- **SSH Public Keys**
  - Sign-in with username + private key + passphrase for private key
  - Private key is not a password for the user, its used to decrypt the private key 
  - Public key is stored in the client
  - Private key is stored in the admin device
  - Commonly used in Linux servers 

- **Characteristic-based**
  - Relies on measurable characteristics, such as biometrics.
  - Biometrics like:
    - Fingerprint 
    - Retina
    - Iris
    - Facial
    - Voice 
    - Vein 
    - Gait analysis (how you walk)
  - Efficacy rates:
    - False acceptance  
    - False rejection rate 
    - Crossover error rate


### Multi-Factor Authentication

Multifactor Authentication (MFA) is a security system that requires more than one method of a authentication from independent categories of credentials to verify the user's identity. 

Factors:

- **Knowledge-based**
  - Something you know
  - Examples: Passwords or passphrases.

- **Possession-based**
  - Something you have
  - Examples: Tokens, memory cards, smart cards, keyfob

- **Inherence-based**
  - Something you are
  - Measurable characteristics.
  - Examples: Biometrics, facial, fingerprint, voice

- **Behavior-based**
  - Something you do 
  - Recognizing patterns associated with a user
  - Examples: Mouse movement, keystroke pattern, how they walk

- **Location-based**
  - Somewhere you are
  - IP address verification, geolocation, GPS tracking
  - Access can be restricted based on a user's location

### Types of MFA 

- **Single-Factor Authentication**
  - Using a single authentication factor to access a user account
  - Username + password 
  - Insecure, not recommended

- **Two-Factor Authentication**
  - Using two different authentication factors 
  - Username-password + SMS or email or push notifications

- **Multi-Factor Authentication**
  - Using two or more factors for authentication
  - The more factors used, the safer it is, but the more complex it becomes 

### Token-based Authentication 

- **Synchronous**
  - Generates codes at fixed intervals without a server challenge.
  - Security token produces a new code every 30 seconds.
  - Server and token stay synchronized for code expectations.

- **Asynchronous**
  - Does not generate codes at fixed intervals.
  - Requires a server challenge for each code.

### Password-less Authentication 

Provides improved security and a more user-friendly experience.

- **Biometrics**
  - Unique characteristics
  - Fingerprint, facial, voice 

- **Hardware Tokens**
  - Uses physical device that generate short-lived and ever-changing login code 
  - Security key 

- **One-time Passwords**
  - Sent via SMS or email
  - Code is only valid for a short period of time 
  - Code can only be used once, new code is generated after given time. 

- **Magic Links**
  - Email link that automatically logs in user
  - Sent via email, user just needs to click 
  - Can be accessed only once, new link is needed for each login

- **Passkeys**
  - Integrates with browser or OS
  - Can also user biometrics as login method 

### Best Practices

Implement at least two of the three common authentication techniques for better security.

- **Challenges with Knowledge-based Authentication**
  - Vulnerable to attacks; password resets may pose risks.
  - Better security often requires additional forms of authentication, like tokens or characteristics.

- **User ID and Password Combination**
  - Not considered MFA as it involves two things that are known.
  - MFA requires two or more authentication methods, not simply two known elements.

