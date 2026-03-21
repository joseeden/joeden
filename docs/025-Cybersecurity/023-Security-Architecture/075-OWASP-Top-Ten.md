---
title: "OWASP Top Ten"
description: "The OWASP Top 10 is a standard awareness document for developers and web application security."
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
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
| Rank | Vulnerability                                    | Description                                                                                                                                                                                                                                          |
| --- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Injection Attacks**                            | <ul><li>Attackers insert malicious code into a request executed by the server</li><li>Common example: SQL injection targeting databases</li></ul>                                                                                                    |
| 2   | **Broken Authentication and Session Management** | <ul><li>Flaws in authentication mechanisms lead to unauthorized access</li><li>Example: <a href="/docs/025-Cybersecurity/051-List-of-Attacks/005-Spoofing-Attacks.md#session-hijacking">Session hijacking</a></li></ul>                              |
| 3   | **Cross-Site Scripting (XSS)**                   | <ul><li>Attackers embed scripts in third-party websites that execute in victims’ browsers</li><li>More info: <a href="/docs/025-Cybersecurity/051-List-of-Attacks/099-Other-Attacks.md">Cross-Site Scripting (XSS)</a></li></ul>                     |
| 4   | **Insecure Direct Object References**            | <ul><li>Developers expose internal functions without proper security checks</li><li>Attackers may alter URLs to access unauthorized resources</li></ul>                                                                                              |
| 5   | **Security Misconfigurations**                   | <ul><li>Incorrect settings in complex systems like web servers, databases, and firewalls</li><li>Any misconfiguration can compromise the entire system</li></ul>                                                                                     |
| 6   | **Sensitive Data Exposure**                      | <ul><li>Insecure applications may expose sensitive data such as customer information</li><li>Lack of HTTPS encryption increases this risk</li></ul>                                                                                                  |
| 7   | **Missing Function Level Access Control**        | <ul><li>Developers fail to verify back-end access control for certain functions</li><li>Attackers can exploit this by sending unauthorized requests directly</li></ul>                                                                               |
| 8   | **Cross-Site Request Forgery (CSRF/XSRF)**       | <ul><li>Attackers exploit the fact that users often have multiple websites open</li><li>Detailed coverage in upcoming sections</li><li>More info: <a href="/docs/025-Cybersecurity/051-List-of-Attacks/099-Other-Attacks.md">CSRF/XSRF</a></li></ul> |
| 9   | **Using Components with Known Vulnerabilities**  | <ul><li>Web applications using insecure components may be compromised by attackers</li><li>Regular security patching is essential</li></ul>                                                                                                          |
| 10  | **Unvalidated Redirects and Forwards**           | <ul><li>External links through a trusted site can redirect users to malicious sites</li><li>Developers must ensure only approved redirects are allowed</li></ul>                                                                                     |
