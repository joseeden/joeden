---
title: "Email Security"
description: "Protecting email accounts and systems"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 63
last_update:
  date: 1/30/2024
---



## Overview

Email security protects accounts and systems from attacks and unauthorized access. It helps keep communications safe and private.

- Protects against phishing, spoofing, and malware.
- Encrypts emails to safeguard sensitive data during transmission.
- Monitors email traffic for unusual activity and potential breaches.
- Scans messages to block malicious links and attachments.

Email security ensures that your communications remain trustworthy and that sensitive data is protected at all times. Ways to secure email includes:

- DKIM
- SPF 
- DMARC 
- Email Gateway Protocol 
- Spam Filtering

## DKIM 

**DKIM (DomainKeys Identified Mail)** is an email authentication method that checks that emails really come from the claimed sender and have not been altered.

- Adds cryptographic signatures to email headers.
- Validates signatures using public keys stored in DNS records.
- Confirms the email content is unchanged in transit.

DKIM helps maintain the integrity of email communications and prevents forgery.

## SPF 

**SPF (Sender Policy Framework)** is an email validation system designed to prevent spam by verifying the sender's IP address against the domain's authorized list.

- Domain owners list authorized mail servers in DNS records.
- Reduces risk of unauthorized use of the domain in emails.
- Helps prevent email spoofing and phishing attacks.

When an SPF-enabled server receives email:

1. The receiving servers checks sender IP against the authorized list.
2. It verifies sender's IP with the domain’s DNS records.
3. It IP is not on the list, the email is marked as spam and rejected.

## DMARC 

**DMARC (Domain-based Message Authentication, Reporting, and Conformance)** uses SPF and DKIM to determine the authenticity of an email message and allows domain owners to specify how to handle non-authenticated emails.

- Sets policies for handling emails that fail SPF or DKIM checks.
- Sends reports to domain owners about email usage and abuse.
- Helps prevent phishing and business email compromise attacks.

Receiving mail servers can be configured with a DMARK policy that reject emails that claim to come from the legitimate domain but have already failed the DKIM and SPF checks. The primary purpose of DMARC is to protect a domain from being used in business email compromised attacks.

## S/MIME 

**S/MIME (Secure Multipurpose Internet Mail Extensions)** secures email messages using encryption and digital signatures.

- Encrypts email content so only intended recipients can read it.
- Digitally signs emails to verify sender identity.
- Protects against tampering and eavesdropping.
- Keeps emails private and ensures that recipients can trust the sender.

## SASL 

**Simple Authentication and Security Layer (SASL)** is a protocol-independent framework for adding authentication to email protocols like POP3 and IMAP.

- Works with authentication mechanisms (username/password, tokens).
- Ensures credentials are transmitted securely.
- Can integrate with encryption for added security.
- Strengthens authentication and prevent unauthorized email access.

**Post Office Protocol** (POP3) is an older protocol that was originally designed to be used on only one computer. 

- Downloads emails to the local device
- Usually deletes email from the server.
- Simple and widely supported for basic email access.

**Internet Message Access Protocol (IMAP)** is an store-and-forward mail protocol that enables users to access mail on a mail server. 

- Considered as an improved version of POP3
- Same functionalities but keeps emails on the server.
- Allows syncing across multiple devices.
- Supports folder management and selective message downloads.


## Email Gateway Protocol

**Email gateway protocols** are used to secure and manage the flow of email traffic within and between organizations.

- Acts as an entry and exit point for all emails.
- Uses SMTP to send and receive messages securely.
- Filters malicious emails before they reach users.
- Block malicious emails before they reach the user.

Email gateways are implemented to help with:

- Email routing
- Email security 
- Policy enforcement 
- Encryption and decryption 

Deployment Methods:

- On-premise 
- Cloud-based 
- Hybrid

## Spam Filtering

Spam filtering is a technique used to identify and block unwanted or unsolicited email messages.

- Detect spam based on content, sender, and other characteristics.
- Prevents phishing attempts, scams, and potentially harmful content.
- Helps maintain the security and productivity of email systems.

Techniques used:

- **Content analysis**
  - Scans the body and subject of emails for patterns typical of spam.
  - Uses machine learning algorithms to adapt to new spam tactics.

- **Bayesian filtering**
  - Analyzes frequency of words in emails to predict spam probability.
  - Continuously updates as new spam emails are processed.

- **DNS-based sinkhole list (DNS Sinkhole)**
  - Maintains a list of IP addresses known to send spam.
  - Redirects traffic to a controlled environment for further analysis.
  - See [DNS Sinkhole.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/062-DNS-and-Web-Security.md#dns-sinkhole)

- **General email filtering rules**
  - Bbased on sender reputation, message format, and known spam signatures.
  - Regularly updates rules to adapt to evolving spam strategies.

