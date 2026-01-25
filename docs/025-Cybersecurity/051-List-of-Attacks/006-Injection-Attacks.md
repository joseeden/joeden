---
title: "Injection Attacks"
tags: [Cybersecurity]
sidebar_position: 6
last_update:
  date: 1/30/2024
---



## LDAP Injections

Targets applications which construct LDAP statements based on user input. By injecting malicious LDAP statements, attackers can compromise the LDAP query, allowing them access.

- Maliciously crafted LDAP queries.
- Unauthorized access to sensitive information, data leakage, privilege escalation.
- Anomalous LDAP query patterns, unexpected changes in directory data.

**Mitigations:**

- [Input validation](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation) and sanitization, ensure only valid data is processed.
- Use parameterized queries and prepared statements.
- Regularly audit and review LDAP queries and access controls.
- Employ security tools to monitor and detect unusual LDAP activity.

:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::

## Command Injections

Attacker inserts arbitrary commands into a program that are then executed by the host operating system. This can lead to unauthorized actions and compromise system integrity.

- Injecting commands into a system shell or process.
- Unauthorized command execution, data theft, system compromise, denial of service.
- Unusual command executions, system logs showing unexpected command activity.

**Mitigations:**

- Input validation and sanitization to prevent execution of arbitrary commands.
- Least privilege principles, ensuring applications run with necessary permissions.
- Use secure coding practices to avoid direct command execution from user inputs.
- Regularly update and patch systems to fix vulnerabilities.

## SQL Injections

Attackers insert malicious SQL code into a query. This can allow unauthorized access to the database, retrieval of sensitive data, or alteration of the database structure.

- Maliciously crafted SQL queries.
- Data leakage, unauthorized database access, data manipulation, system compromise.
- Monitoring for unusual SQL query patterns, database activity monitoring.

### Structured Query Language

- SQL, or Structured Query Language
- Used for managing and manipulating relational databases. 
- Allows users to perform various operations.

### Main SQL Actions

- **SELECT**: Retrieves data from one or more tables based on specified criteria.
- **INSERT**: Adds new rows of data into a table.
- **UPDATE**: Modifies existing data in a table based on specified conditions.
- **DELETE**: Removes rows of data from a table based on specified conditions.

### Injecting SQL Commands

- Entering data 
- Modifying cookies
- Changing POST data
- Using HTTP headers 

### Mitigations

- Use parameterized queries and prepared statements to prevent SQL injection.
- Implement strict [input validation](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation) and sanitization.
- Employ [least privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege) access controls for database accounts.
- Regularly audit and review database queries and security configurations.
- Use web application firewalls (WAF) to filter and monitor SQL injection attempts.

## XML Injections

XML Injection exploits vulnerabilities in XML (eXtensible Markup Language) parsers or applications that process XML input. 

- Injection of malicious XML code into XML documents or data streams.
- Data manipulation, information leakage, denial of service.
- Unexpected behavior in XML parsing, error messages revealing XML structure.

### eXtensible Markup Language

XML, or eXtensible Markup Language defines rules for encoding in human-readable and machine-readable. 

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

### Mitigations

- [Input validation and sanitization](/docs/025-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation)
- Parameterized queries and prepared statements when incorporating XML data into database operations.
- XML schema validation to enforce data integrity and prevent injection attacks.
- Limit XML processing capabilities to reduce the attack surface.
- Regularly update XML parsers and libraries to patch known vulnerabilities.


## XML Bomb

An XML bomb is a type of denial-of-service (DoS) attack where an XML document is crafted to consume excessive system resources when parsed by an XML parser.

- Recursive or nested elements designed to expand exponentially when parsed.
- XML encodes entities that expand to exponential sizes.
- Consumes large memory, CPU, or disk space when processed by an XML parser.
- Can lead to system downtime, service disruption, or unavailability.

The reason why its also called as **Billion Laughs Attack** is because the XML entities referenced in the file are written as "lol1" through "lol9". Each of these references the line before it, with the pattern continuing all the way up until it creates a billion "lols" due to the factorial nature.

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

XML External Entity (XXE) allows an attacker to include external entities in an XML document, which can lead to information disclosure, server-side request forgery (SSRF), or remote code execution. This vulnerability arises when an XML parser processes external entities defined within the document.

- Attackers embeds a request for a local resource.
- Read local files, perform SSRF attacks, or execute arbitrary code.
- Compromise of sensitive data, unauthorized access to resources, etc.

When the below XML document is processed by an XML parser, it attempts to resolve the xxe entity, resulting in the inclusion of the contents of the /etc/passwd file within the "username" element.

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


## Process Injections

Malicious code is injected into a legitimate process to evade detection and execution restrictions. This allows the attacker to execute code within the address space of a separate live process.

- Execution is masked as a legitimate process, evading security products.
- Stealthy execution of malicious code, evasion of security mechanisms, data theft.
- Monitoring for unusual process behavior, changes in process memory.

### Ways to inject code

- Injection through DLLs 
- Thread Execution Hijacking
- Process Hollowing
- Process Doppelganging
- Asynchronous Procedure Calls
- Portable Execution Injections

### Mitigations

- Endpoint protection tools that detect and block process injection techniques.
- Use process integrity monitoring to detect changes in process behavior.
- Data execution prevention (DEP) and address space layout randomization (ASLR).
- Regularly update and patch applications and operating systems.


## Memory Injection 

Memory injection is a type of vulnerability where malicious code is injected directly into the memory space of a legitimate process, causing it to behave in unexpected ways, such as initiating outbound connections it normally wouldn't.

- Code runs without touching files on disk.
- Harder for antivirus to detect.
- Helps attackers stay hidden and persistent.

Memory injection poses a significant risk because it leverages legitimate processes, making malicious activity more difficult to detect and prevent.


## Directory Traversal

Also known as **Path Traversal**, it exploits insufficient security validation/sanitization of user-supplied file names to access directories and files outside the web root folder. 

- Manipulation of file paths to traverse directories.
- Unauthorized access to files and directories, data leakage, system compromise.
- Unusual file access patterns, log entries showing traversal sequences like `/docs/`.

How it looks like:

<div class="img-center">

![](/img/docs/sec+-directory-traversal.png)


</div>


### Hiding the traversal

Attackers can still hide traversal attempts by masking "/docs/" with:

```bash
%2e%2e%2f
```

### File Inclusion

File inclusion allows an attacker to download files or upload an executable for backdoor. 

- **Remote File Inclusion**
  - Attacker executes a script to inject a remote file into the web app.
  
- **Local File Inclusion**
  - Attacker tries to add a file that already exists.

### Mitigations

- Validate and sanitize user inputs to ensure only safe characters are allowed.
- Secure APIs to abstract file paths and prevent direct access to the filesystem.
- Configure web server to disallow requests containing traversal sequences.
- Access controls restricting aaccess to sensitive files and directories.
- Regularly audit and monitor file system access logs for suspicious activities.

