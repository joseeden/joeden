---
title: "Destroying Data"
description: "Sanitizing and destroying data"
tags: 
- Security
- Cybersecurity
- Security Operations
- Data Security
sidebar_position: 4
last_update:
  date: 1/30/2024
---




## Data Media Sanitization

Ensures that data is completely destroyed.

- Data could still be recovered if not sanitized 
- Use disk wiping tools such as performing:
   - Multiple pass disk overwrites (SSD and HDD)
   - Degaussing (HDD)

## Overwriting 

Overwriting involves writing multiple patterns across all storage media (see ISC2 Study Guide, Chapter 5, Module 1). 

- Ensures that the original data cannot be recovered. 
- Overwrite the drive with multiple data patterns
- This makes it increasingly difficult to retrieve meaningful data

The number of passes refers to how many times the data is overwritten, and this process is designed to increase the difficulty of recovering the original data.

- Single Pass
- 7 Passes 
- 35 Passes 

## Degaussing 

Degaussing is a process used to erase data from magnetic storage media by reducing or eliminating the magnetic field that stores the data. This method is effective for securely erasing data from hard drives, tapes, and other magnetic storage devices.

- Uses a powerful magnetic field to erase data stored on magnetic media.
- Ensures permanently removal, also effective for bulk erasure.
- Once a device is degaussed, it can no longer be used for storage.

Limitations:

- Only effective on magnetic media
- Not applicable for SSDs or flash memory devices.
- Requires a specialized equipment, which is additional costs.


## Secure Erase

Secure erase is a command and process designed to completely erase all data from a storage device, typically used with solid-state drives (SSDs) and other modern storage technologies. 

- Use built-in commands to purge the data blocks
- This makes data irretrievable from the device
- Completes the erasure process quickly compared to other methods.
- Typically implemented at the firmware level of the storage device.

Some flaws were found overtime on secure erase overtime, and this prompted the use of a newer and more secure technique called cryptographic erase.

## Cryptographic Erase 

Introduced as a replacement for Secure Erase in most modern storage devices, **Cryptographic Erase** involves destorying the decryption key to ensure that the encrypted data cannot be decrypted.

- Data is still in the device, but its now inaccessible.
- Useful for self-encrypting drives (SEDs).
- Speed advantage over Secure Erase
- Only the key is deleted and not the data blocks.
- Data storage can be repurposed without risk of data leakage.


## Declassification

Declassification is the process of sanitizing media or systems for reuse in an unclassified environment.

- Media must be properly sanitized before reuse
- Even if data is purged, new recovery methods could emerge
- Some organizations prefer destruction over reuse to ensure security


## Destruction

Destruction is the final stage of a media’s lifecycle and the most secure way to sanitize data.

- Methods include incineration, disintegration, or melting
- Some organizations destroy drive platters separately for added assurance
