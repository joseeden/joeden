---
title: "Injection Attacks"
tags: 
- Cybersecurity
sidebar_position: 6
last_update:
  date: 1/30/2024
---



## LDAP Injections

LDAP Injection targets applications that build LDAP statements from user input. Attackers can inject malicious LDAP statements to manipulate queries and gain unauthorized access.

- Attackers craft malicious LDAP queries.
- Can lead to unauthorized access, data leakage, or privilege escalation.
- May produce abnormal LDAP queries or unexpected changes in directory data.

**Mitigations:**

- [Validate and sanitize all user inputs.](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation)
- Use parameterized queries and prepared statements.
- Regularly audit LDAP queries and access controls.
- Monitor LDAP activity to detect anomalies.

:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::

## Command Injections

Command Injection allows attackers to insert arbitrary commands into a program, which are executed by the host OS.

- Attackers inject commands into system shells or processes
- Can cause unauthorized command execution, data theft
- Can lead toystem compromise, or denial of service
- Detectable via unusual commands or unexpected entries in system logs

**Mitigations:**

- Validate and sanitize all input to prevent command execution
- Apply least privilege principles to restrict program permissions
- Avoid executing commands directly from user input in code
- Keep systems updated and patched


## SQL Injections

SQL Injection occurs when attackers insert malicious SQL code into queries, allowing unauthorized access, data retrieval, or modification.

- Malicious SQL queries
- Can cause data leakage, unauthorized access
- Includes database manipulation
- Monitor for unusual query patterns

**Main SQL Actions:**

| SQL Command | Description                             |
| ----------- | --------------------------------------- |
| `SELECT`    | Retrieves data from one or more tables. |
| `INSERT`    | Adds new rows to a table.               |
| `UPDATE`    | Modifies existing rows.                 |
| `DELETE`    | Removes rows based on conditions.       |

**Injection Methods:**

| Method       | Description / Example                         |
| ------------ | --------------------------------------------- |
| Input fields | Textboxes, search bars, forms                 |
| Cookies      | Browser-stored data sent to server            |
| `POST` data  | Data sent via HTTP POST requests              |
| HTTP headers | Custom or standard headers sent with requests |

**Mitigations:**

- Use parameterized queries and prepared statements.
- Implement strict [input validation](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation) and sanitization.
- Apply [least privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) access controls to database accounts.
- Audit database queries and security configurations regularly.
- Use web application firewalls (WAFs) to filter injection attempts.


## XML Injections

XML Injection exploits vulnerabilities in XML parsers or applications that process XML input. 

- Injects malicious XML into documents or streams.
- Can manipulate data, leak information, or cause denial of service.
- Detectable via unexpected parsing errors or abnormal behavior.

XML, or **Extensible Markup Language** defines rules for encoding in human-readable and machine-readable. 

- Structures data in a hierarchical format using tags, similar to HTML. 
- Commonly used for data exchange between different systems and platforms.

Sample XML data:

```xml
<library>    
  <book>
    <title>The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <genre>Classic</genre>
    <year>1925</year>
  </book>
  
  <book>
    <title>To Kill a Mockingbird</title>
    <author>Harper Lee</author>
    <genre>Fiction</genre>
    <year>1960</year>
  </book>
</library>
```

**Mitigations:**

- [Validate and sanitize XML input.](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation)
- Use parameterized queries when inserting XML into databases.
- Apply XML schema validation.
- Limit XML processing features.
- Keep XML parsers and libraries updated.


## XML Bomb

An XML bomb is a type of denial-of-service (DoS) attack where an XML document is crafted to consume excessive system resources when parsed by an XML parser.

- Uses recursive or nested elements that grow rapidly when parsed
- XML encodes entities that expand to exponential sizes.
- Consumes excessive memory, CPU, or disk resources
- May cause system crashes, downtime, or service outages

It is also called as **Billion Laughs Attack**  because the XML entities referenced in the file are written as `lol1` through `lol9`. Each of these references the line before it, with the pattern continuing all the way up until it creates a billion `lols` due to the factorial nature.

```xml
<!DOCTYPE lol [
  <!ENTITY lol "lol">
  <!ENTITY lol1 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
  <!ENTITY lol2 "&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;&lol1;">
  <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
  <!ENTITY lol4 "&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;&lol3;">
]>
<root>
  &lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;&lol4;
</root>
```

Another form of XML Bomb:

```xml
<!DOCTYPE bomb [
  <!ENTITY a "1234567890">
  <!ENTITY b "&a;&a;&a;&a;&a;&a;&a;&a;&a;&a;">
  <!ENTITY c "&b;&b;&b;&b;&b;&b;&b;&b;&b;&b;">
  <!ENTITY d "&c;&c;&c;&c;&c;&c;&c;&c;&c;&c;">
  <!ENTITY e "&d;&d;&d;&d;&d;&d;&d;&d;&d;&d;">
]>
<root>
  &e;&e;&e;&e;&e;&e;&e;&e;&e;&e;
</root>
 ```

**Mitigations:**

- Use secure XML parsers.
- Limit entity expansion.
- Implement resource usage limits.


## XML External Entity 

**XML External Entity (XXE)** allows an attacker to include external entities in an XML document, which can lead to information disclosure, server-side request forgery (SSRF), or remote code execution. 

- Attacker requests local or remote resources.
- Can read local files, perform SSRF, or execute code.
- Compromise sensitive data, unauthorized access to resources, etc

When this XML document is processed, the parser resolves the XXE entity. This causes the contents of `/etc/passwd` to appear in the "username" element.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE data [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<data>
  <username>&xxe;</username>
</data>
```

**Mitigations:**

- Disable external entity processing.
- Use secure XML parsers.
- [Input validation/sanitization](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation).


## Process and Memory Injections

**Process Injection:** Injects malicious code into legitimate processes to evade detection.

- Code executes within another process’s address space
- Can steal data or bypass security mechanisms
- Detectable via abnormal process behavior or memory changes

**Memory Injection:** Malicious code runs directly in memory.

- Does not touch disk, makes detection much harder
- Allows attackers to remain persistent and stealthy
- Harder for antivirus to detect

**Ways to inject code**

- Injection through DLLs 
- Thread execution hijacking
- Process hollowing
- Process doppelganging
- Asynchronous procedure calls
- Portable execution injections

**Mitigations:**

- Endpoint protection and process integrity monitoring.
- Enable DEP and ASLR.
- Keep software and systems updated.

## Directory Traversal

Also known as **Path Traversal**, it exploits insufficient security validation/sanitization of user-supplied file names to access directories and files outside the web root folder. 

- Manipulates file paths to access sensitive files
- Can lead to data leakage or system compromise
- Detectable via unusual file access patterns in logs

While log entries can show traversal sequences like `/docs/`, attackers can still hide traversal attempts by masking `/docs/` with:

```bash
%2e%2e%2f
```

How it looks like:

<div class="img-center">

![](/img/docs/sec+-directory-traversal.png)


</div>


**Mitigations:**

- Validate and sanitize user inputs.
- Secure APIs to prevent direct filesystem access.
- Configure web servers to block traversal sequences.
- Apply strict access controls.
- Monitor filesystem access logs for anomalies.


## File Inclusion

File inclusion allows an attacker to download files or upload an executable for backdoor. 

| Vulnerability Type    | Description                                              |
| --------------------- | -------------------------------------------------------- |
| Remote File Inclusion | Attacker injects a remote file into the web application. |
| Local File Inclusion  | Attacker tries to include a file that already exists.    |

**Mitigations:**

- Validate and sanitize all user inputs.
- Restrict file paths and prevent direct access to the filesystem.
- Configure the web server to block requests containing traversal sequences.
- Apply strict access controls for sensitive files and directories.
- Regularly monitor and audit file access logs for suspicious activity.