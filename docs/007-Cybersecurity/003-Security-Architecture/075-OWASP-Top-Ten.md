---
title: "OWASP Top Ten"
description: "The OWASP Top 10 is a standard awareness document for developers and web application security."
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 75
last_update:
  date: 1/30/2024
---



## Web Security Vulnerabilities 

Web security vulnerabilities pose significant risks to the integrity of web services. Cybersecurity professionals must be vigilant in identifying and addressing these vulnerabilities.

- OWASP (Open Web Application Security Project) maintains a list of the top 10 web security risks  
- The current list was developed in 2013, with a revision expected soon  
- These risks are crucial for maintaining secure web services  

## OWASP Top 10 

Reference: https://owasp.org/www-project-top-ten/

1. **Injection Attacks**
   - Attackers insert malicious code into a request that is executed by the server
   - Common example: SQL injection targeting databases

2. **Broken Authentication and Session Management**
   - Flaws in authentication mechanisms lead to unauthorized access  
   - Example: [Session hijacking](/docs/007-Cybersecurity/013-List-of-Attacks/005-Spoofing-Attacks.md#session-hijacking)

3. **Cross-Site Scripting (XSS)**
   - Attackers embed scripts in third-party websites that execute in victims’ browsers  
   - For more information, please see [Cross-Site Scripting (XSS)](/docs/007-Cybersecurity/013-List-of-Attacks/099-Other-Attacks.md)

4. **Insecure Direct Object References**
   - Developers expose internal functions without proper security checks  
   - Attackers may alter URLs to access unauthorized resources

5. **Security Misconfigurations**
   - Incorrect settings in complex systems like web servers, databases, and firewalls  
   - Any misconfiguration can compromise the entire system

6. **Sensitive Data Exposure**
   - Insecure applications may expose sensitive data, such as customer information  
   - Lack of HTTPS encryption increases this risk

7. **Missing Function Level Access Control**
   - Developers fail to verify back-end access control for certain application functions  
   - Attackers can exploit this by directly sending unauthorized requests

8. **Cross-Site Request Forgery (CSRF/XSRF)**
   - Attackers exploit the fact that users often have multiple websites open  
   - Detailed coverage in upcoming sections
   - For more information, please see [CSRF/XSRF](/docs/007-Cybersecurity/013-List-of-Attacks/099-Other-Attacks.md)

9. **Using Components with Known Vulnerabilities**
   - Web applications using insecure components may be compromised by attackers  
   - Regular security patching is essential

10. **Unvalidated Redirects and Forwards**
   - External links through a trusted site can be exploited to redirect users to malicious sites  
   - Developers must ensure only approved redirects are allowed
