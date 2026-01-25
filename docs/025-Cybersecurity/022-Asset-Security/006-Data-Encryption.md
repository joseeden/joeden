---
title: "Data Encryption"
description: "Encrypting data at rest and in motion"
tags: [Security, Cybersecurity, Security Operations, Data Security]
sidebar_position: 6
last_update:
  date: 1/30/2024
---


## Data-at-Rest Encryption

Each type of data encryption serves a specific purpose and can be used individually or in combination to protect sensitive information from unauthorized access or disclosure.

- **Full Disk Encryption (FDE):**
  - Encrypts entire hard drive, including OS and user data.
  - Data is encrypted when off, decrypted when turned on and used by user.
  - Guards against unauthorized access if device is lost.
  - Examples: BitLocker (Windows), FileVault (macOS).


    :::info 

    Full Disk Encryption (FDE) protects data by encrypting the entire drive, but two key components help ensure its effectiveness and reliability.

    **Key escrow** lets authorized users recover encrypted data if passwords are lost, the device is stolen, or hardware fails. It also allows access for legal or forensic reasons.

    **TPM (Trusted Platform Module)** is a chip found in some computers that securely stores encryption keys inside the hardware, making encryption more secure and efficient than using software alone.

    For more information, please see [Trusted Platform Module.](/docs/025-Cybersecurity/025-Cryptography/014-Encryption-Tools.md#trusted-platform-module-tpm)

    :::


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

- **Record Encryption**
  - Encrypts individual database records or fields.
  - Useful: multiple users with unequal permissions are accessing the same database.
  - Offers precise data protection.
  - Often used for compliance requirements.



## Data-in-Transit Encryption

Secures data while it's being transmitted over networks (or between two systems) to prevent interception or eavesdropping.

- **SSL/TLS**
  - Establish secure connections between clients and servers over the internet.
  - Encrypts data exchange to ensure confidentiality and integrity.
  - Securing web traffic (HTTPS), email (SMTPS, IMAPS), and other internet protocols.

- **VPNs (Virtual Private Networks)**
  - Encrypted tunnel between a user's device and a remote server or network.
  - Encrypts all traffic going through the tunnel, prevents interception or monitoring.
  - Remote access to corporate networks or for securing public Wi-Fi environments.
  - For more information, please see [VPNs.](/docs/025-Cybersecurity/024-Infrastructure-and-Network/053-VPN.md)

- **IPSec (Internet Protocol Security)**
  - Suite of protocols; secure IP communications by encrypting and authenticating data packets.
  - End-to-end security for IP traffic, ensuring confidentiality, integrity, and authenticity.
  - Often used with VPNs to encrypt traffic between network segments.
  - For more information, please see [IPSec](/docs/025-Cybersecurity/024-Infrastructure-and-Network/054-TLS-and-IPSec.md#ipsec)

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


## Encrypting USB Flash drives 

Encrypting USB flash drives helps protect sensitive data if the drive is lost or stolen. 

- Users may be asked for a passphrase when the drive is connected
- A smart card might be required to unlock the drive

**The drive can still be formatted without the passphrase**, but the data remains protected
Encryption prevents access to the contents, not the ability to erase the drive.


## Securing Data on Field Devices

When computers are used in the field or away from secure environments, the risk of loss or theft increases. To keep sensitive data safe, it's important to use a solution that protects the data even if the device is physically compromised.

**Full Disk Encryption (FDE)** is the most effective option. It encrypts all data stored on the device, making it unreadable without the decryption key. Even if someone removes the hard drive, they cannot access the data directly.

While **two-factor authentication** is helpful for login security, it only protects against unauthorized access during normal use, but it does not secure the data if the drive is accessed separately.

## Demo: AESCrypt 

As an example, we can try to use AESCrypt to encrypt a file.
I'm running WSL 2 on my Windows laptop. To install AESCrypt on the terminal:

```bash
wget https://www.aescrypt.com/download/v3/linux/AESCrypt-GUI-3.11-Linux-x86_64-Install.gz
gunzip AESCrypt-GUI-3.11-Linux-x86_64-Install.gz
chmod +x AESCrypt-GUI-3.11-Linux-x86_64-Install
./AESCrypt-GUI-3.11-Linux-x86_64-Install
```

A window prompt will appear. Click Yes > Next > Next > Finish.

![](/img/docs/cissp-aescrypt-1.png)

![](/img/docs/cissp-aescrypt-2.png)

![](/img/docs/cissp-aescrypt-3.png)

![](/img/docs/cissp-aescrypt-4.png)

Going back to the terminal, type `aescrypt` then press tab.

```bash
$ aescrypt
aescrypt         aescrypt-gui     aescrypt_keygen 
```

Create a sample with the following content:

```bash
$ cat test-file.txt
This is a file encrypted using aescrypt utility.
Once encrypted, the contents should become gibberish. 
```

Encrypte the file using AESCrypt. Provide a password when prompted.

```bash
$ aescrypt -e test-file.txt
Enter password:
Re-Enter password:
```

A second file should be created. This is encrypted file. You can now delete the original file.

```bash
$ ll | grep test
-rwxrwxrwx 1 joseeden joseeden        103 Jul 19 20:19 test-file.txt*
-rwxrwxrwx 1 joseeden joseeden        404 Jul 19 20:21 test-file.txt.aes* 

$ rm -rf test-file.txt

$ ll | grep test
-rwxrwxrwx 1 joseeden joseeden        404 Jul 19 20:21 test-file.txt.aes* 
```

Check the encrypted file:

```bash
$ cat test-file.txt.aes
AESCREATED_BYaescrypt 3.11�r.�@j�x�;�eH�I�s���K���a�q�Y6�̵���9�:ĸS���w�4��P)\3O+���J��?2����fޘ_"o����x�R6�ن�xd�[/�$��y̙"bpL��-b��&�g-r��!�Z�J�����٩��3G�r�      P���p#�[Gp�og�c�EA�s    <R�g�in���̓ׄh��l���%�����`).
                                                                                            /��!h��
                                                                                                   �cv�ClYC?    ���1v�␦&U
```

To decrypt the file, use the `aescrypt` utility with the `-d` flag. Note that if you entered an incorrect password, you'll get this warning message:

```bash
$ aescrypt -d test-file.txt.aes
Enter password:
Error: Message has been altered or password is incorrect 
```

Now provide the correct password. It will not return any response but it will create the original file.

```bash
$ aescrypt -d test-file.txt.aes

$ ll | grep test
-rwxrwxrwx 1 joseeden joseeden        103 Jul 19 21:04 test-file.txt*
-rwxrwxrwx 1 joseeden joseeden        404 Jul 19 20:21 test-file.txt.aes*

$ cat test-file.txt
This is a file encrypted using aescrypt utility.
Once encrypted, the contents should become gibberish.
```

## Demo: FileVault 

For MacOS, we can use the **FileVault** utility. Go to System Preferences > Security & Privacy > FileVault. Note that is on by default.

![](/img/docs/cissp-filevault.png)

