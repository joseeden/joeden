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

A **Buffer Overflow attack** occurs when an attacker sends more data than a program’s memory buffer can hold, which can cause the application or system to crash, hang, or behave unexpectedly.

- Exploits programming errors or poor memory management
- Sends data that exceeds the allocated buffer size
- Can crash the system or allow execution of malicious code

**Buffer**: Temporary memory area where a program stores data while running.

- Programs reserve memory called a **stack** at startup.
- This stores return addresses from function calls and other temporary data.

**Mitigations:**

- Validate inputs to ensure they do not exceed expected lengths
- Implement bounds checking to prevent writing beyond buffer limits
- Use safe functions that include built-in bounds checking
- Enable DEP to block code execution in non-executable memory
- Enable ASLR to randomize memory locations and make attacks harder
- Regularly patch software and libraries to fix known vulnerabilities


## Smashing the Stack

**Smashing the stack** happens when an attacker overwrites the stack’s return address and fills the buffer with **NOP** instruction to execute malicious code.

| Term                                | Description                                                                                   |
| ----------------------------------- | --------------------------------------------------------------------------------------------- |
| **NOP (No-Operation) instructions** | Tells the CPU to do nothing and proceed to the next instruction.                              |
| **NOP slide**                       | Occurs when NOPs are executed by non-malicious programs because the buffer is already filled. |

When executed, the pointer moves down the stack to reach the injected code, which then takes control of program execution.

**Mitigations:**

- Implement strict checks for input length
- Regularly audit code for vulnerabilities
- Replace standard functions with bounds-checking alternatives
- Deploy canaries for early detection of buffer overflows
- Restrict code execution in specific memory areas
- Apply ASLR to randomize memory addresses



## Heartbleed Bug

The Heartbleed bug is a critical flaw in the heartbeat extension of the TLS and DTLS protocols. It allows one computer to send a small amount of data to another to verify connectivity, but due to improper length checking, it can expose sensitive memory contents.

- A serious vulnerability in the OpenSSL cryptographic library.
- Discovered in April 2014, officially **CVE-2014-0160**.
- Exploits the heartbeat extension in OpenSSL, hence the name 

#### Heartbeat Request

The client sends a heartbeat request to the server, including a small data payload and its length. This allows the server to verify that the client is still connected.

- Helps maintain an active connection without sending full data
- Example: payload "hello" with length `5`

#### Server Response

The server replies with the same payload and length, confirming it received the request. This ensures connectivity and synchronization between client and server.

:::info 

The server normally only sends back the data sent by the client, without accessing other memory.

::: 

#### Exploitation

The vulnerability occurs because the server does not properly check the payload length. An attacker can exploit this by sending a malformed request:

- Attacker sends a request with tiny payload (e.g. `A`)
- But declares a much larger length (e.g., `65,535`).   

The server then responds with the payload plus extra memory data, up to the specified length. This may expose sensitive information, including private keys, passwords, session tokens, and other confidential data.


#### Example Scenario

Normal heartbeat request:

| Entity | Data                              |
| ------ | --------------------------------- |
| Client | "hello" (5 bytes) with length = 5 |
| Server | "hello" (5 bytes)                 |

Malicious heartbeat request:

| Entity   | Data                                    |
| -------- | --------------------------------------- |
| Attacker | "A" (1 byte) with length = 65,535       |
| Server   | "A" + up to 65,534 bytes of memory data |


#### Mitigation and Response

| Action                   | Details                                                                         |
| ------------------------ | ------------------------------------------------------------------------------- |
| Patch OpenSSL        | Update OpenSSL to a version that fixes the Heartbleed bug (1.0.1g or later).    |
| Reissue certificates | Revoke and reissue SSL/TLS certificates, as private keys may have been exposed. |
| Change passwords     | Users should reset passwords for accounts that could have been compromised.     |
| Monitor for attacks  | Use monitoring tools to detect unusual activity that may indicate exploitation. |
