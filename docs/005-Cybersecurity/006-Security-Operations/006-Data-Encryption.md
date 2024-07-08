---
title: "Data Encryption"
tags: [Cybersecurity]
sidebar_position: 6
last_update:
  date: 1/30/2024
---



## Data-at-Rest Encryption

Each type of data encryption serves a specific purpose and can be used individually or in combination to protect sensitive information from unauthorized access or disclosure.

- **FDE (Full Disk Encryption):**
  - Encrypts entire hard drive, including OS and user data.
  - Data is encrypted when off, decrypted when turned on and used by user.
  - Guards against unauthorized access if device is lost.
  - Examples: BitLocker (Windows), FileVault (macOS).

- **Partition Encryption**
  - Encrypts specific drive partitions.
  - Allows selective encryption, leaving other partitions unencrypted.
  - Useful for targeted data protection.

- **File Encryption**
  - Encrypts individual files or folders.
  - Enables secure storage and sharing.
  - Examples: VeraCrypt, AES Crypt.

- **Volume Encryption**
  - Encrypts entire volumes or logical drives.
  - Shields multiple partitions. 
  - Common in enterprise setups.

- **Database Encryption**
  - Encrypts data within databases.
  - Protects against unauthorized access. 
  - Can be done at the column, row, or table level.
  - Assists with GDPR, HIPAA compliance.

- **Record Encryption**
  - Encrypts individual database records or fields.
  - Useful: multiple users with unequal permissions are accessing the same database.
  - Offers precise data protection.
  - Often used for compliance requirements.

## Data-in-Transit Encryption

Secures data while it's being transmitted over networks to prevent interception or eavesdropping.

- **SSL/TLS**
  - Establish secure connections between clients and servers over the internet.
  - Encrypts data exchange to ensure confidentiality and integrity.
  - Securing web traffic (HTTPS), email (SMTPS, IMAPS), and other internet protocols.

- **VPNs (Virtual Private Networks)**
  - Encrypted tunnel between a user's device and a remote server or network.
  - Encrypts all traffic going through the tunnel, prevents interception or monitoring.
  - Remote access to corporate networks or for securing public Wi-Fi environments.

- **IPSec (Internet Protocol Security)**
  - Suite of protocols; secure IP communications by encrypting and authenticating data packets.
  - End-to-end security for IP traffic, ensuring confidentiality, integrity, and authenticity.
  - Often used with VPNs to encrypt traffic between network segments.
  - For more information, please see [IPSec](../005-Security-Architecture/051-Securing-the-Network.md#ipsec)

## Data-in-Use Encryption

Protects data while it's being accessed or used by applications or users.

- **Application level**
  - Encryption implemented within applications.
  - Protect sensitive data during processing or manipulation.
  
- **Access Control**
  - Controls access to data based on user permissions and authentication.
  
- **Secure Enclaves**
  - Hardware-based secure areas for processing sensitive data.
  - Ensures isolation from other system components.
  
- **Intel Software Guard Extensions (SGX)**
  - Hardware-based security technology for creating secure enclaves within the CPU.
  - Protect data from unauthorized access or modification.

