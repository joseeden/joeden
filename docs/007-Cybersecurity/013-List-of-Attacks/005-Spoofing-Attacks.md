---
title: "Spoofing Attacks"
tags: [Cybersecurity]
sidebar_position: 5
last_update:
  date: 1/30/2024
---



## Overview 

Cybercriminals uses spoofing attacks to impersonate a familiar or trusted source to interact with targets, aiming to steal information, extort money, or install malicious software on their devices.

Example of spoofing attacks:

- Email Spoofing
- Caller ID Spoofing
- Website/Domain Spoofing
- IP Spoofing
- ARP Spoofing
- GPS Spoofing
- Facial Spoofing
- Man-in-the-middle attack 

**Mitigations:**

- **Email Security**: Use SPF, DKIM, and DMARC.
- **User Training**: Educate on recognizing suspicious communications.
- **Secure Authentication**: Use multifactor authentication.
- **Access Controls**: Limit sensitive system access.
- **Secure Routing**: Implement SBGP or similar protocols.
- **Network Access Control (NAC)**: Restrict unauthorized devices.
- **IDS/IPS**: Detect spoofing patterns.

<small>Reference: https://www.crowdstrike.com/cybersecurity-101/spoofing-attacks/</small>

## IP Address Spoofing

Impersonating a trusted IP address to gain unauthorized access. 

**Mitigations:**

- **Packet Filtering**: Block spoofed IP addresses.
- **Secure Routing**: Use SBGP to validate routing.
- **Network Access Control (NAC)**: Restrict unauthorized devices from network access.
- **IDS/IPS**: Monitor for spoofing patterns.

## User-Agent Spoofing

**User-agent spoofing** is an attack where the HTTP `User-Agent` header is altered to impersonate a trusted client, such as a web browser or mobile application.

- Attackers modify the `User-Agent` string to mimic legitimate traffic.
- Used to bypass API access controls or to evade user-agent-based restrictions.
- For example, spoofing a mobile app’s user-agent to access an internal API directly.

**Impacts:**

- Can lead to unauthorized access to APIs or web resources.
- May be used in combination with other attacks like session hijacking or scraping.

**Mitigation:**

- Do not rely solely on user-agent headers for access control.
- Use proper authentication (e.g., tokens, certificates).
- Implement device fingerprinting or behavior-based detection.

## Hijacking Attacks

### Session Management

Session management enables web applications to identify users consistently.

- Allows for unique identification of users across requests.
- Maintains the state of user data throughout interactions.
- Ensures that data generated by the user is assigned solely to that user.
- Information can be stored in databases or cookies.

### Cookies

Cookies are important for managing state in web applications, as HTTP is a stateless protocol.

- HTTP doesn’t store client info, so cookies are used.
- Cookies store information about users for future requests.
- Every request from the client includes the stored cookie.
- Encrypting cookies helps protect session data.
- For more information, please see [Secure Cookies.](/docs/007-Cybersecurity/007-Software-Security/010-Application-Security.md#secure-cookies)

**Types of Cookies:**

- **Session Cookies**

  - Non-persistent, only stored in the browser.
  - When browser is closed, cookies are deleted.

- **Persistent Cookies**

  - Stay around even after the browser is closed.
  - Stored in the browser cache until they're deleted by the user.
  - Delete when user "Clear cookies", or when they pass the defined expiration date.

### Session Hijacking

Session hijacking is a spoofing attack where an attacker takes over an active web session.

- Often done by stealing or altering session cookies.
- Allows attacker to impersonate a logged-in user.
- Can be performed when user is currently logged in to a web session.

### Session Prediction

In session prediction, an attacker attempts to predict session token to hijack the session.

- Works if session tokens follow a pattern or are weakly generated.
- Leads to unauthorized access, similar to session hijacking.


### URL Hijacking 

URL hijacking, also known as **typosquatting**, tricks users into visiting fake websites.

- Attackers register domain names similar to legitimate ones 
- Example: "goggle.com" instead of "google.com"
- Users are tricked into entering sensitive information or downloading malware.

**Difference from session hijacking**:
Session hijacking targets an existing user session, while URL hijacking tricks the user into connecting to a fake site before a session begins.

### Clickjacking 

Clickjacking tricks users into clicking hidden or misleading elements on a web page.

- The user thinks they are clicking something harmless
- But they’re actually clicking a hidden element
- Often uses transparent layers or invisible frames
- Force unwanted actions like submitting forms or changing settings

**Difference from URL/session hijacking**:
Clickjacking relies on visual deception, not taking over a session or redirecting to fake URLs.

:::info 

CSS being injected into a website or page is one method of performing this particular type of attack.

:::


### Cookie Poisoning

Cookie poisoning involves modifying the contents of the cookies to be sent to a client's browser.

- Modified cookies can contain fake session info or user privileges.
- Used to bypass authentication or gain unauthorized access.


## Replay Attack

Attacker intercepts and retransmits a valid data transmission to trick the receiver into unauthorized actions, often impersonating one of the legitimate parties in the communication.

- Interception and retransmission of valid data packets.
- Unauthorized access, data manipulation, session hijacking.

**Mitigations:**

- Time-stamped tokens or nonces, ensures each transaction is unique and only valid for a short period.
- Use TLS/SSL to encrypt data and make interception more difficult.
- Mutual authentication techniques, validate each other's identities.
- Maintain a session or message log to track and verify unique transactions.
- Replay detection mechanisms to identify and block replayed messages.
- Use WPA3 to avoid replay attacks.

**Difference with Session Hijacking:**

- Replay Attacks - attacker intercepts data, decides whether to retransmit it later.
- Session Hijacking - attacker alters data transmission in real-time.


## Disassociation Attack 

A disassociation attack tricks a device into disconnecting from a Wi-Fi network by sending fake disassociation frames.

- Breaks the connection without a full logout
- Commonly used to disrupt service or force reauthentication
- Often targets public or unsecured Wi-Fi networks

When the user reconnects, the attacker can capture the 4-way handshake and attempt to brute-force the Wi-Fi password.



## Deauthentication Attack 

A deauthentication attack tricks a device into logging out of the network, forcing it to reconnect.

- Helps capture authentication handshakes for password cracking
- Useful in penetration testing when traffic is low
- Performed using tools like aircrack-ng or Bettercap

## Disassociation vs. Deauthentication 

**Deauthentication** and **disassociation** are **different**, though they are related and often confused. Both are **Wi-Fi management frame types** used to disconnect devices, but they occur at different stages of the connection process.

| Feature             | **Deauthentication**                             | **Disassociation**                                      |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------- |
| **Purpose**         | Ends **authentication**                          | Ends **association** (but keeps authentication)         |
| **Stage in Wi-Fi**  | Happens **before or during** login               | Happens **after authentication**, during session        |
| **Effect**          | Fully disconnects a client (must reauthenticate) | Disconnects client but keeps session keys (temporarily) |
| **Attack Use Case** | Used to capture handshake (force re-login)       | Used to disrupt sessions                                |
| **Frame Type**      | Management frame                                 | Management frame                                        |

In simple terms:

- **Deauthentication** = “Log out now. You need to reauthenticate to come back.”
- **Disassociation** = “We're ending this session, but we still know who you are.”

