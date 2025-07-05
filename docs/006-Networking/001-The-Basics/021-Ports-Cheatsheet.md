---
title: "Ports Cheatsheet"
description: "Ports Cheatsheet"
tags: 
- Networking
- Security
- Cybersecurity
- Security 
- Architecture
- Security Engineering
sidebar_position: 21
last_update:
  date: 1/16/2019
---




| Port | UDP/TCP | Service/Protocol                                                | Description                                                                     |
| ---- | ------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 20   | TCP     | FTP (File Transfer Protocol) Data                               | Transfers data in FTP                                                           |
| 21   | TCP     | FTP (File Transfer Protocol) Control                            | Controls communication in FTP                                                   |
| 22   | TCP     | SSH (Secure Shell)                                              | Secure remote login and other secure network services over an unsecured network |
| 22   | TCP     | SCP (Secure Copy Protocol)                                      | Securely transfers files between hosts using SSH                                |
| 22   | TCP     | SFTP (SSH File Transfer Protocol)                               | Secure file transfer over port 22 (SSH)                                         |
| 990  | TCP     | FTPS (File Transfer Protocol Secure) Control                    | Secure file transfer over port 990                                              |
| 23   | TCP     | Telnet                                                          | Unencrypted text communications                                                 |
| 25   | TCP     | SMTP (Simple Mail Transfer Protocol)                            | Email transmission                                                              |
| 49   | TCP     | TACACS+ (Terminal Access Controller Access-Control System Plus) | Remote authentication                                                           |
| 53   | UDP/TCP | DNS (Domain Name System)                                        | Resolves domain names to IP addresses                                           |
| 67   | UDP     | DHCP (Dynamic Host Configuration Protocol) Server               | Assigns IP addresses to clients from a DHCP server                              |
| 68   | UDP     | DHCP (Dynamic Host Configuration Protocol) Client               | Client port for receiving IP configuration from DHCP server                     |
| 69   | UDP     | TFTP (Trivial File Transfer Protocol)                           | Simple, unsecured file transfer                                                 |
| 80   | TCP     | HTTP (Hypertext Transfer Protocol)                              | Web traffic; Insecure web browsing                                              |
| 88   | UDP     | Kerberos                                                        | Network Authentication Protocol                                                 |
| 110  | TCP     | POP3 (Post Office Protocol 3)                                   | Email retrieval from a server                                                   |
| 119  | TCP     | NNTP (Network News Transfer Protocol)                           | Used for accessing news groups                                                  |
| 123  | UDP     | NTP (Network Time Protocol)                                     | Network time synchronization                                                    |
| 135  | UDP/TCP | RPC (Remote Procedure Call)                                     | Facilitates communication between different system processes                    |
| 137  | UDP/TCP | NetBIOS                                                         | Networking protocol suite; Internal network names, file and printer sharing     |
| 138  | UDP/TCP | NetBIOS                                                         | Networking protocol suite; Internal network names, file and printer sharing     |
| 139  | UDP/TCP | NetBIOS                                                         | Networking protocol suite; Internal network names, file and printer sharing     |
| 143  | TCP     | IMAP (Internet Message Access Protocol)                         | Email retrieval                                                                 |
| 161  | UDP     | SNMP (Simple Network Management Protocol)                       | Network management and monitoring                                               |
| 162  | UDP     | SNMPTRAP (Simple Network Management Protocol Trap)              | Sends alerts (trap messages) from SNMP devices                                  |
| 389  | UDP/TCP | LDAP (Lightweight Directory Access Protocol)                    | Directory services                                                              |
| 443  | TCP     | HTTPS (HTTP Secure)                                             | Secure web traffic                                                              |
| 445  | TCP     | SMB (Server Message Block)                                      | Provides shared access to files and printers                                    |
| 465  | TCP     | SMTPS (Simple Mail Transfer Protocol Secure)                    | Secure email transmission                                                       |
| 587  | TCP     | SMTPS (Simple Mail Transfer Protocol Secure)                    | Secure email transmission                                                       |
| 514  | UDP     | Syslog                                                          | System logging                                                                  |
| 636  | TCP     | LDAPS (LDAP Secure)                                             | Secure version of LDAP (Lightweight Directory Access Protocol)                  |
| 989  | TCP     | FTPS (File Transfer Protocol Secure) Data                       | Secure file transfer data channel                                               |
| 993  | TCP     | IMAPS (Internet Message Access Protocol Secure)                 | Secure email retrieval using IMAP                                               |
| 995  | TCP     | POP3S (Post Office Protocol 3 Secure)                           | Secure email retrieval using POP3                                               |
| 1433 | TCP     | MS-SQL-S (Microsoft SQL Server)                                 | Microsoft SQL Server database management                                        |
| 1645 | TCP     | RADIUS TCP                                                      | Used for remote authentication, authorization, and accounting                   |
| 1646 | TCP     | RADIUS TCP                                                      | Used for remote authentication, authorization, and accounting                   |
| 1812 | UDP     | RADIUS Authentication                                           | Authentication for network access                                               |
| 1813 | UDP     | RADIUS Accounting                                               | Accounting for network access                                                   |
| 3260 | TCP     | iSCSI (Internet Small Computer Systems Interface) Target        | iSCSI targets for storage over IP networks                                      |
| 3389 | TCP     | RDP (Remote Desktop Protocol)                                   | Remote desktop access                                                           |
| 5004 | UDP     | SRTP (Secure Real-time Transport Protocol)                      | Voice over IP (VoIP) communication                                              |
| 5060 | UDP/TCP | SIP (Session Initiation Protocol)                               | Voice over IP (VoIP) and multimedia communication (unencrypted)                 |
| 5061 | TCP     | SIP-TLS (Session Initiation Protocol over TLS)                  | Secure VoIP and multimedia communication                                        |
| 6514 | TCP     | Syslog over TLS                                                 | Secure system logging                                                           |
| 8443 | TCP     | HTTPS-alt                                                       | Alternative port for secure web traffic                                         |
