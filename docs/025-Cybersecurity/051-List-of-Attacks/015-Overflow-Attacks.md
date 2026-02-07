---
title: "Overflow Attacks"
tags: 
- Cybersecurity
sidebar_position: 15
last_update:
  date: 1/30/2024
---


## Overview

Overflow attacks exploit the limits of data storage, leading to unexpected behavior in a program.

## Integer Overflow

Integer overflow occurs when an arithmetic operation exceeds the maximum value a variable can hold.

- Developers may allocate less memory than expected; can cause an application to crash.
- Can lead to erroneous calculations and unpredictable software behavior.
- Often used to bypass [input validation](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation) or security checks.
- Scenarios where precise integer values are crucial, e.g. financial calculations, memory allocations.

Here's a [Wizardzines' comic diagram](https://wizardzines.com/comics/integer-overflow/) of how integer overflow works:

![](/img/docs/sec+-integer-overflow.png)

## Buffer Overflow Attack 

A Buffer Overflow attack involves sending malicious data to an application or system, causing it to crash or become unresponsive. 

- Takes advantage of programming errors in applications or systems.
- Allow attackers to send malicious data that exceeds the size of the allocated memory buffer.
- Causes the application or system to crash or become unresponsive.

### Buffer

- A temporary storage area where a program stores its data.
- A program reserves a chunk of system memory when started up, this area is called a **stack.**
- Stacks stores the return addresses from function calls

### Smashing the Stack

- Occurs when malicious code overwrites the return address.
- Attacker fills the buffer with **NOP** (Non-operation) instruction.
- **NOP Instruction** - tells the computer to do nothing and proceed to the next instruction.
- **NOP Slide** - NOPS is hit by non-malicious programs because buffer is already filled.
- The pointer now points to the area in the stack which contains the malicious code.
- It will "slide down" up to the last instruction, causing the pointer to branch out to the memory address where the malicious code is.

### Mitigations

- Implement strict checks for input length.
- Regularly audit code for vulnerabilities.
- Replace standard functions with bounds-checking alternatives.
- Deploy canaries for early detection of buffer overflows.
- Restrict code execution in specific memory areas.
- Keep software current to address vulnerabilities.
- Apply **ASLR** to randomize memory addresses.
  - ASLR or Address Space Layout Randomization
  - Prevents an attacker from guessing where the return pointer is.
  - Randomizes memory addresses, making buffer overflows attackers difficult. 
  - Can still be bypassed using sidechannel attacks.


## What is the Heartbleed Bug?

The Heartbleed bug is a flaw in the heartbeat extension of TLS and DTLS protocols which allows one computer to send a small amount of data to another computer to keep the connection alive and verify that the other computer is still responsive.

- A serious vulnerability in the popular OpenSSL cryptographic software library.
- Discovered in April 2014 and is officially designated as CVE-2014-0160
- Affects the heartbeat extension implemented in OpenSSL, hence the name "Heartbleed."

### How it works

1. **Heartbeat Request**: 
   - A client sends a heartbeat request to the server, which includes a payload (a small piece of data) and specifies the payload's length.
   - For example, the client might send a request with a payload of 5 characters ("hello") and specify a length of 5.

2. **Server Response**:
   - The server is supposed to respond with the same payload and length, confirming that it received the request.

3. **Exploitation**:
   - The bug occurs because the server does not properly verify the length of the payload in the request. 
   - An attacker can send a malformed heartbeat request that specifies a much larger length than the actual payload. For example, the attacker could send a request with a payload of 1 character ("A") and specify a length of 65,535.
   - The server will then respond with the payload plus additional data from its memory buffer, up to the specified length.
   - This can result in the server inadvertently sending back sensitive data from its memory, including private keys, user passwords, session tokens, and other confidential information.

### Example Scenario

1. **Normal Heartbeat Request:**

  - Client: "hello" (5 bytes) with length field = 5
  - Server: "hello" (5 bytes)

2. **Malicious Heartbeat Request:**

  - Attacker: "A" (1 byte) with length field = 65,535
  - Server: "A" followed by up to 65,534 bytes of adjacent memory data

### Mitigation and Response

- **Patch OpenSSL**: 
  - Updating OpenSSL to a version that patches the Heartbleed bug (versions 1.0.1g and later) is crucial.

- **Reissue Certificates**: 
  - After patching, affected organizations should revoke and reissue SSL/TLS certificates, as private keys may have been compromised.

- **Change Passwords**: 
  - Users should change passwords for any accounts that may have been accessed during the period the vulnerability was exploitable.

- **Monitor for Attacks**: 
  - Implement monitoring solutions to detect unusual activity that might indicate exploitation of the vulnerability.

