---
title: "Email Security"
tags: [Cybersecurity]
sidebar_position: 62
last_update:
  date: 1/30/2024
---



## Overview

Email security involves protecting email accounts and systems from unauthorized access and malicious activities. It is essential for safeguarding sensitive information and maintaining the integrity of communications.

- Protects against phishing and spoofing attacks.
- Scans incoming and outgoing emails for malware and malicious links.
- Implements encryption to safeguard email content during transmission.
- Monitors and audits email traffic to detect unusual activities and potential breaches.

Types:

- DKIM
- SPF 
- DMARC 
- Email Gateway Protocol 
- Spam Filtering

## DKIM 

DKIM (DomainKeys Identified Mail) is an email authentication method designed to detect forged sender addresses in emails, a common technique used in phishing and email spoofing.

- Cryptographic signatures is added to the headers of the email.
- Signature isvalidated against a public cryptographic key located on the domain's DNS record.
- This entire process Verifies that the email comes from the claimed domain.
- Helps ensure that the content of the email has not been altered in transit.

## SPF 

SPF (Sender Policy Framework) is an email validation system designed to prevent spam by verifying the sender's IP address against the domain's authorized list.

- Allows domain owners to specify authorized mail servers to send emails on behalf of their domain.
- Reduces the risk of unauthorized use of the domain in email communications.
- Helps prevent email spoofing and phishing attacks.

How it works:

- When an SPF-enabled mail server receives email, it checks the sender's IP first.
- Sender IP is verified againsts a list of authorized IPs in the sender's domain DNS records.
- If the sender IP is not in the SPF list, the email will be marked as spam or rejected. 

## DMARC 

DMARC (Domain-based Message Authentication, Reporting, and Conformance) uses SPF and DKIM to determine the authenticity of an email message and allows domain owners to specify how to handle non-authenticated emails.

- Policy for how emails from your domain should be handled if they fail SPF or DKIM checks.
- Offers domain owners visibility into how their domain is being used via aggregate/forensic reports.
- Helps protect the domain from being abused in phishing and spoofing attacks.

Receiving mail servers can be configured with a DMARK policy that reject emails that claim to come from the legitimate domain but have already failed the DKIM and SPF checks. The primary purpose of DMARC is to protect a domain from being used in business email compromised attacks.

## Email Gateway Protocol

Email gateway protocols are used to secure and manage the flow of email traffic within and between organizations.

- Serves as entry and exit points for emails.
- Usually relies on SMTP protocol to send and receive emails.
- Ensures emails are securely transferred between the internet and a local network.
- Acts as a filter to block malicious emails before they reach the user's inbox.

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

- Uses algorithms to detect spam based on content, sender, and other characteristics.
- Protects users from phishing attempts, scams, and potentially harmful content.
- Helps maintain the security and productivity of email systems.

Techniques used:

- **Content analysis**
  - Scans the body and subject of emails for patterns typical of spam.
  - Uses machine learning algorithms to adapt to new spam tactics.

- **Bayesian filtering**
  - Analyzes the frequency of words in emails to predict spam probability.
  - Continuously updates as new spam emails are processed.

- **DNS-based sinkhole list**
  - Maintains a list of IP addresses known to send spam.
  - Redirects traffic from these IPs to a controlled environment for further analysis.

- **General email filtering rules**
  - Applies rules based on sender reputation, message format, and known spam signatures.
  - Regularly updates rules to adapt to evolving spam strategies.
