---
title: "Application Security"
description: "Application security"
tags: 
- Networking
- DevNet
- Security
- Cybersecurity
- Application Security
sidebar_position: 30
last_update:
  date: 5/25/2020
---


## Overview

Application security protects the application, the data it stores, and the data it sends across networks. A secure deployment needs encryption, input handling, dependency awareness, and authentication controls.

## Data at Rest

Data at rest is stored data. It should be protected because unauthorized users may eventually gain access to a database, disk, backup, or cloud storage location.

<div class='img-center'>

![](/img/docs/devnetencdata1.png)

</div>

Encryption makes stolen data harder to read or reuse.

<div class='img-center'>

![](/img/docs/devnetencdata2.png)

</div>

Common practices:

- Encrypt sensitive stored data.
- Store only data that the application actually needs.
- Protect encryption keys outside the same database when possible.
- Patch vulnerable libraries and frameworks.
- Encrypt data on roaming devices and portable systems.

## Data in Transit

Data in transit is data moving between clients, services, and servers. It can be exposed by interception or man-in-the-middle attacks.

Use secure protocols:

| Protocol | Purpose                                                       |
| -------- | ------------------------------------------------------------- |
| SSH      | Secure administrative access to servers and network devices.  |
| TLS      | Secure web and API traffic over HTTPS.                        |
| VPN      | Secure private access for remote users and internal services. |

## SQL Injection

SQL injection happens when user input is combined with a SQL statement in a way that lets an attacker change the query.

For more information, please see [Injection Attacks](/docs/025-Cybersecurity/051-List-of-Attacks/006-Injection-Attacks.md#sql-injections) page.

Vulnerable pattern:

```python
uid = request.args("uid")
str_sql = "SELECT * FROM Users WHERE UserId = " + uid
```

Safer pattern:

```python
cursor.execute(
    "SELECT * FROM users WHERE username = %(username)s",
    {"username": request.args.get("username")}
)
```

Use these defenses:

- Use parameterized queries or prepared statements.
- Use stored procedures only when they avoid unsafe dynamic SQL.
- Validate allowlisted values for table names, column names, and sort direction.
- Apply least privilege to database accounts.
- Use database views to limit readable fields when needed.

## OWASP

OWASP provides application security guidance, tools, and references for common web risks. The OWASP Top Ten is a useful starting point for understanding common application vulnerabilities.

For more information, please see [Application Security](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md) page.

Important application risks include:

- SQL injection.
- Cross-site scripting.
- Cross-site request forgery.
- Broken access control.
- Vulnerable dependencies.

## XSS and CSRF

Cross-site scripting happens when untrusted content is displayed to users as executable browser code. Avoid rendering untrusted content in script tags, HTML comments, tag names, attribute names, or raw CSS.

Cross-site request forgery tricks an authenticated browser into sending an unwanted request to another site. Use anti-CSRF tokens, same-site cookies, and explicit user confirmation for sensitive actions.

## Password Storage

Passwords should not be stored in cleartext. Use a slow password hashing function with a unique salt for each password.

For more information, please see [Password Attacks](/docs/025-Cybersecurity/051-List-of-Attacks/001-Password-Attacks.md) page.

Basic concepts:

- Hashing is one-way and should not be reversible.
- A salt makes identical passwords produce different hashes.
- Password reuse makes one breach more damaging.
- MFA reduces risk when a password is guessed, stolen, or reused.

## Password Attacks

Common password attacks include:

| Attack             | Description                                                   |
| ------------------ | ------------------------------------------------------------- |
| Guessing           | Tries likely passwords against a known account.               |
| Dictionary         | Tests words and common variations from prepared lists.        |
| Rainbow table      | Looks up precomputed hashes to recover weak passwords.        |
| Social engineering | Tricks users into revealing credentials or approving access.  |

Use account lockout policies, MFA, monitoring, password screening, and user education to reduce password attack risk.
