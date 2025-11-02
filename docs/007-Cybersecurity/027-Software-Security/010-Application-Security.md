---
title: "Application Security"
description: "Securing software applications"
tags: 
- Security
- Cybersecurity
- Security Foundations
- Computer Science
- Application Development
- Software Development
- Application Security
sidebar_position: 10
last_update:
  date: 1/30/2024
---


## Overview

Application security focuses on protecting software applications from security threats by implementing measures to prevent, detect, and respond to vulnerabilities and attacks.


## Input Validation

Input validation is crucial for protecting applications from malicious data by ensuring that only safe and expected inputs are processed.

- Serves as quality control of data
- Ensure every piece of information is valid and secure.
- Prevents common vulnerabilities like SQL injection and [cross-site scripting (XSS)](/docs/007-Cybersecurity/051-List-of-Attacks/099-Other-Attacks.md)
- Ensures data integrity and application stability, early in the process.

**Validation Rules** delineate acceptable and unacceptable inputs.

- Any input not conforming to the validation rules will be flagged and detected.
- System might also prompt the user to input the data again.

:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::

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


## Code Signing

Code signing is used to verify the authenticity and integrity of software code, ensuring that it has not been tampered with.

- Verifies that the code is from a trusted developer or publisher.
- Ensures the code hasn't been modified since it was signed.
- Protects users from malicious software and unauthorized code changes.

It is important to note that the presence of digital signatures on a file or program does not guarantee its absolute security or the absence of vulnerabilities, but the digital signature confirms that the file is in the same state that the developer intended it to be when he/she distributed it.

How It Works:

- A software developer uses a private key to create a digital signature for their code.
- The digital signature is attached to the code, forming a certificate.
- A user or system uses the public key to verify the signature.
- The public key confirms the software's source and that it hasn't been tampered with.

Use Cases:

- Software distribution, ensuring safe installation of programs and updates.
- Application stores, confirming that apps meet security standards.
- Operating systems, allowing signed drivers and system software.

Common Tools:

- **Certificate Authorities (CAs)**: Organizations that issue digital certificates to verify the identity of the signer.
- **Code Signing Certificates**: Certificates issued to developers for signing their code.

Challenges:

- **Certificate Management**: Properly handling and securing code signing certificates.
- **Revocation**: Handling compromised or invalid certificates.
- **Cost**: Obtaining code signing certificates from reputable CAs can be expensive.





## Sandboxing

Sandboxing is a security mechanism used to isolate running applications to prevent them from affecting the operating system or other applications.

- Limits the access of an application to the system resources.
- Provides a controlled environment for executing untrusted code.
- Protects the system from potential malicious activity initiated by the application.
- Testing security controls before replicating them to the production environment.

Security professionals can use isolated virtual machines that has no access to the network or other resources and use them as sandbox environments to perform any testing and evaluations. When they're finish, they can simply destroy the virtual machine without any impact to the rest of the network.

## Package Monitoring

Package Monitoring involves keeping track of security of third-party packages and dependencies used.

- Ensures that packages are up-to-date with the latest security patches.
- Verifies integrity and authenticity of packages to prevent supply chain attacks.
- Alerts developers to known vulnerabilities in dependencies.
- Example tools are Snyk and Dependabot.

Since legacy systems often run outdated or unsupported software packages, monitoring these packages helps to identify which systems are legacy by revealing those with old or unpatched software versions. 

## Web Server Security 

Web server security involves protecting web servers and the services they host from various online threats. This includes securing the server software, the web applications, and the underlying infrastructure to ensure data integrity, confidentiality, and availability.

- Enable HTTPS on the web server using a PKI certs and TLS.
- Use TCP port 443 instead of port 80.
- Use TLS version 1.2 or higher.
- Secure web app user using LDAP over SSL.