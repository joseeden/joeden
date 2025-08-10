---
title: "Social Engineering Attacks"
tags: [Cybersecurity]
sidebar_position: 3
last_update:
  date: 1/30/2024
---


## Overview 

Social Engineering refers to tenetshe manipulation of individuals or groups to gain confidential information or unauthorized access to systems, often exploiting psychological vulnerabilities.

- Creates familiarity with the target or victims.
- Creating a sense of urgency to pressure people.

## Overlap with Impersonation Attacks 

Social engineering and impersonation attacks share similarities, as both exploit trust and deception to manipulate individuals. 

- **Social Engineering** often uses psychological tactics to gain trust. 
- **Impersonation Attacks** specifically involve pretending to be someone else to deceive victims into revealing sensitive information or granting unauthorized access.

Both techniques rely on convincing the victim that the attacker is a legitimate authority or trusted individual,  and it is often done through phone calls, emails, or face-to-face interactions.

## Business Email Compromise (BEC)

**Business Email Compromise (BEC)** happens when attackers pretend to be a trusted executive or employee by email. They trick people into doing unauthorized actions, usually involving money transfers or buying gift cards.


## Website Redirection

Redirecting users from legitimate websites to malicious ones without their knowledge or consent.

  - Often achieved through compromised websites, phishing emails, or malicious scripts injected into web pages.
  - Can lead to phishing attacks, malware installation, or theft of sensitive information.
  - Targets users' trust in familiar websites to deceive them into visiting malicious domains.

**Common redirection techniques:** 

- **DNS Poisoning** - compromising a DNS server and create fake domains
- **URL Hijacking** - Redirects traffic from legitimate URLs to malicious or fraudulent websites.

For more information, please see [Session hijacking](/docs/007-Cybersecurity/013-List-of-Attacks/005-Spoofing-Attacks.md#session-hijacking)

**Mitigations:**

- Implementing secure coding practices
- Regular website security audits
- User education about potential risks



## Watering Hole Attack

Considered as a passive attack, **Watering Hole attacks** target websites that are frequently visited by a specific group of users, such as employees of a company or members of a community.

- Exploits vulnerabilities in these websites to launch phishing attacks against the targeted group.
- Often used to compromise organizations by infecting their employees' devices or stealing sensitive information.
- Mimics the behavior of predators waiting near water sources to ambush prey, hence "watering hole" attack.
  
**How it works:**

1. Identify and compromise a highly targeted website.
2. Choose a client exploit and bundle a botnet.
3. Place the malware on the compromised website.
4. Wait for infected systems to connect to the botnet.

**Mitigations:**

- Regularly updating website software
- Implementing web application firewalls
- Educating users about the risks of visiting untrusted websites.

## Adversarial Artificial Intelligence

AI systems designed to deceive, manipulate, or exploit vulnerabilities in other AI systems or human users.

- Uses advanced algorithms to generate realistic fake content or manipulate data for malicious purposes.
- Using algorithm functionalities which can improve themselves over time based on data.
- Example: Analyzing user's habit, Gathering history of compromises, etc.

## Spam 

Spam refers to mass mailing of unsolicited messages.

- Usually used to promote products or services or collect information.
- Can also be used to trick users into clicking links.

Another form of spam is **spims** which is basically just spam sent over instant messaging and SMS.

## Phishing

Sending deceptive emails or messages to trick recipients into divulging personal information or clicking malicious links. Common technique used is to intentionally deceive people to create a sense of urgency or legitimacy.

- **Smishing** - Phishing through SMS text messages.
- **Vishing** - Phishing over the phone or through call.
- **Spear Phishing** - Targeted phishing on certain individuals.
- **Whaling** - Spear phishing, but for high-ranking people.

## Typosquatting   

Attacker registers a domain name similar to a popular website. The "copycat" domain name usually contains some kind of common typographical errors.

- Goal is to victimize users who might accidentally mistype a URL.
- Can trick users pretty easily, if they're not looking carefully at the URL.
- Example: Registering "gnail.com" to impersonate gmail.com

## Pharming 

A pharming attack redirects users from legitimate websites to malicious ones by compromising DNS settings or the website itself.

- Often involves poisoning the DNS cache to reroute traffic.
- Users may unknowingly enter sensitive data, such as login credentials, on fake sites.
- Difficult to detect as the malicious sites often appear identical to the real ones.

## Fraud and Scams

- **Identity Fraud**
  - Unauthorized use of someone else's personal information.
  - Often for financial gain.
  - Can lead to financial losses and damage to credit history.

- **Identity Theft**
  - Stolen personal information used without consent.
  - Can involve impersonation, financial fraud, or accessing bank accounts.
  - Can result from various methods like phishing, data breaches, or physical theft.

- **Scams**
  - Fraudulent schemes or deceptive practices.
  - Designed to trick individuals or organizations.
  - Common types include lottery scams, romance scams, and investment scams.

- **Invoice Scam**
  - Fake or fraudulent invoices for goods or services not ordered or received.
  - Often appear legitimate with logos and contact information.
  - Scammers impersonate suppliers to request payment for fictitious products or services.


## Rubber Hose Attacks

Rubber hose attacks refer to physical coercion or psychological tactics used to extract sensitive information, such as passwords or encryption keys, from individuals.

- Involves physical/psychological threats to force someone to disclose sensitive information.
- Targets human vulnerability rather than breaking cryptographic systems.
- Difficult to defend against as it bypasses technical security measures.