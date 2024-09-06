---
title: "Application Security"
description: "Securing software applications"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 61
last_update:
  date: 1/30/2024
---


## Overview

Application security focuses on protecting software applications from security threats by implementing measures to prevent, detect, and respond to vulnerabilities and attacks.

## Input Validation

Input validation is crucial for protecting applications from malicious data by ensuring that only safe and expected inputs are processed.

- Serves as quality control of data to ensure every piece of information is valid and secure.
- Prevents common vulnerabilities like SQL injection and cross-site scripting (XSS).
- Ensures data integrity and application stability, early in the process.

**Validation Rules** delineate acceptable and unacceptable inputs.

- Any input not conforming to the validation rules will be flagged and detected.
- System might also prompt the user to input the data again.

## Secure Cookies

**Cookies** are small pieces of data stored in the user's computer by the web browser while browsing a website.

- Used to maintain stateful information between the web server and the client.
- If not properly secured, cookies can be exploited to hijack user sessions.
- Refrain from using persistent cookies for session validation.
- Always generate a fresh cookie each time the user authenticates.

**Secure cookies** enhance session security by protecting the data stored in cookies from unauthorized access and tampering. 

- Uses secure attributes to protect cookie transmission over HTTPS
- Use **HttpOnly** to secure cookies from client-side.
- Use **SameSite** to control which origin can access a given cookie.
- Both HttpOnly and SameSite attributes to prevent XSS and CSRF attacks.
- Limits the lifespan of cookies to minimize potential risks.

## Static Code Analysis

Static code analysis, also known as **Static Application Security Testing (SAST)**, involves examining the source code for vulnerabilities without executing the program, helping to identify security flaws early in the development process.

- Scans source code for potential security vulnerabilities.
- Detects issues like buffer overflows, injection flaws, and insecure data handling.
- Supports compliance with security standards and best practices.
- Usually performed using software analyzers, such as Sonarqube. Veracode, Semgrep.

## Dynamic Code Analysis

Dynamic code analysis, also known as **Dynamic Application Security Testing (DAST)**, tests the running application to identify vulnerabilities that may not be apparent in static analysis.

- Analyzes an application during execution to find runtime vulnerabilities.
- Identifies issues such as memory leaks, improper error handling, and authentication flaws.
- Provides insights into the application’s behavior under different conditions.

Common Methods:

- **Fuzzing**
  - Automatically inputs random data ("fuzz") to identify software bugs and vulnerabilities.
  - Involves automated injection of malformed data or unexpected data.
  - Helps discover unexpected application crashes and security flaws.
  - Typically used to test input validation and error handling mechanisms.

- **Stress Testing**
  - Assesses how the application performs under high load or extreme conditions.
  - Identifies potential failure points and system weaknesses under stress.
  - Useful for evaluating the application’s resilience and stability under abnormal operating conditions.

## Code Signing

Code signing is used to verify the authenticity and integrity of software code, ensuring that it has not been tampered with.

- Developer creates a cryptographic hash of the file, then encrypts it with his own private key.
- Associates code with a verified digital certificate whenever the program is sent out.
- Helps users and systems confirm the software’s source and integrity.
- Prevents the execution of unauthorized or modified software.

It is important to know that the presence of digital signatures on a file or program does not guarantee its absolute security or the absence of vulnerabilities, but the digital signature confirms that the file is in the same state that the developer intended it to be when he/she distributed it.


## Sandboxing

Sandboxing is a security mechanism used to isolate running applications to prevent them from affecting the operating system or other applications.

- Limits the access of an application to the system resources.
- Provides a controlled environment for executing untrusted code.
- Helps protect the system from potential malicious activity initiated by the application.
- Testing security controls before replicating them to the production environment.

Security professionals can use isolated virtual machines that has no access to the network or other resources and use them as sandbox environments to perform any testing and evaluations. When they're finish, they can simply destroy the virtual machine without any impact to the rest of the network.

## Package Monitoring

Package Monitoring involves keeping track of security of third-party packages and dependencies used.

- Ensures that packages are up-to-date with the latest security patches.
- Verifies the integrity and authenticity of packages to prevent supply chain attacks.
- Alerts developers to known vulnerabilities in dependencies.
- Example tools are Snyk and Dependabot.

## Web Server Security 

Web server security involves protecting web servers and the services they host from various online threats. This includes securing the server software, the web applications, and the underlying infrastructure to ensure data integrity, confidentiality, and availability.

- Enable HTTPS on the web server using a PKI certs and TLS.
- Use TCP port 443 instead of port 80.
- Use TLS version 1.2 or higher.
- Secure web app user using LDAP over SSL.