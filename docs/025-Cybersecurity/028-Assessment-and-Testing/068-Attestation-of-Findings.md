---
title: "Attestation of Findings"
description: "Verifying software integrity and authenticity"
tags: [Security, Cybersecurity, Security Operations, Vulnerability Management, Security Assessment, Security Testing]
sidebar_position: 68
last_update:
  date: 1/30/2024
---



## Overview

This is a process that involves the formal validation or confirmation provided by an entity that is used to assert the accuracy and authenticity of a specific information.

- Signifies that the findings of the penetration testing is valid based on the evidence.
- Organizations may require a letter of attestation from the pentesting firm to show as an official record.
- Should include the summary of findings and the evidence that the security assessment is conducted.
- Evidences might include data, logs, explanations, or even some of the exploit code.
- Some evidences can be showed during the attestation meeting, but doesn't need to leave the evidence.
- In contrast to pentesting reports, which are actually delivered and left to the organization.

Types: 

- Software Attestation
- Hardware Attestation
- System Attestation


## Software Attestation

Software attestation verifies the integrity and authenticity of software running on a device, ensuring that it has not been tampered with or compromised.

- Confirms the software's integrity using cryptographic methods.
- Ensures that the software is from a trusted source.
- Detects unauthorized modifications or malware.
- Commonly used in secure boot processes to verify operating systems and applications.

## Hardware Attestation

Hardware attestation ensures that the physical hardware of a device is authentic and has not been altered or replaced with malicious components.

- Utilizes unique hardware identifiers and cryptographic signatures.
- Verifies the integrity of hardware components, such as CPUs and [TPMs.](/docs/025-Cybersecurity/025-Cryptography/014-Encryption-Tools.md#trusted-platform-module-tpm)
- Detects counterfeit or tampered hardware.
- Essential for maintaining trust in secure environments, like financial institutions and military systems.

## System Attestation

System attestation involves validating the overall security posture of an entire system, including both its hardware and software components.

- Assesses the combined integrity of hardware, firmware, and software.
- Ensures that all system components work together securely.
- Provides a comprehensive security overview of the entire device or network.

System Attestation is offten used in critical infrastructure and high-assurance systems to maintain robust security standards.


