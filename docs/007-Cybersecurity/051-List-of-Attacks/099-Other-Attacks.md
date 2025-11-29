---
title: "Other Attacks"
tags: [Cybersecurity]
sidebar_position: 99
last_update:
  date: 1/30/2024
---



## Cross-Site Scripting

Cross-Site Scripting (XSS) is a web security vulnerability that involves injecting malicious scripts into web pages viewed by other users. This allows the attackers to circumvent the browser's security model or trusted zones.

- Attackers place harmful scripts into trusted pages
- Scripts run inside the victim’s browser
- Can steal sessions or modify what the user sees
- May be used for phishing or silent data theft

This attack works because the browser trusts the site and runs the injected script.

### Steps in an XSS Attack

1. Attacker finds a place where the site does not clean input
2. Attacker builds a link or input that injects code
3. Victim is tricked into clicking the link or loading the page
4. The trusted site returns a page containing the attacker’s script
5. The script runs with the same trust as the real site, affecting the victim


### Types

- **Reflected XSS**

  - Script is part of the request sent to the server
  - Server sends back the script immediately
  - Seen in search pages or error messages
  
- **Persistent XSS**

  - Script is stored in the site’s database
  - Affects all users who access the compromised data.
  - Executed whenever the compromised data is retrieved
  - Common in comments or profiles

- **Non-persistent XSS**

  - Script returns only to the user who triggered it
  - Often found in input fields or URL parameters.
  - Needs social engineering to trick users into clicking

- **Stored XSS**

  - Same with persistent XSS, but script is permanent on the server
  - Impacts multiple users who access the compromised data.
  - Found in comment sections, message boards, or user profiles.

- **DOM-based XSS**

  - Uses the browser's DOM (Document Object Model).
  - Script executes within the users's browser.
  - Script executes without needing the server.
  - Harder to detect and mitigate compared to server-side XSS.
  - Examples of code snippets that can be used to affect the DOM:

      ```JavaScript
      document.cookie 
      document.write 
      document.location 
      ```

### Mitigations

These are some mitigation steps that you can follow to prevent XSS attacks:

- Validate input to prevent unexpected characters
- Encode output before sending it to the browser
- Use escaping functions to process special characters

    ```bash
    <, >, &, etc. 
    ```

- Conduct reviews and audits for unsafe code
- Use scanning tools to find risky inputs
- Train developers on safe validation and encoding

For more information, please see [Input validation](/docs/007-Cybersecurity/027-Software-Security/010-Application-Security.md#input-validation)

:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::

In addition to the mitigation strategies mentioned above, you can implement the following:

  - **Content Security Policy (CSP)**
    - Restrict the types of content loaded and executed on web pages.
    - Limit the sources for scripts, stylesheets, and other resources.

  - **HTTPOnly and Secure Cookies**:
    - Blocks client-side scripts, reduces the risk of session hijacking.
    - `Secure` flag ensures cookies are only transmitted over HTTPS.

  - **XSS Protection Headers**:
    - Features like `X-XSS-Protection` to detect and mitigate XSS attacks.
    - Block or sanitize pages when potential XSS vulnerabilities are detected.
  


## Cross-Site Request Forgery

Cross-Site Request Forgery (XSRF) forces a logged-in user to send unwanted requests to a site they trust. This attack exploits a session started on another site within the same web browser. 

- Attacker uses a session the victim already started
- Manipulates session cookies, user impersonation.
- Users are tricked into executing actions without knowing it.
- Seen in form submissions, hidden requests, API calls.
- Impact include account takeover, unauthorized transactions.

Cross-site request forgery attacks work by submitting data to a web site (for example, by manipulating a URL) from an **authenticated trusted user without that user’s knowledge**. The malicious code that performs this attack could be executed by tricking the user to click a link in an e-mail message or on a web site.

**Mitigations:**

- Use unique CSRF tokens for forms
- Add randomness or extra confirmations
- Request password when changing sensitive details
- Use a web application firewall

## Server-side Request Forgery

Server-side request forgery (SSRF) allows an attacker to make unauthorized requests from a server they control or manipulate, exploiting the server's network interaction capabilities.

- Uses the server to reach internal systems
- Bypasses filters the user cannot bypass directly
- Can expose sensitive data or services
- May cause data leaks or service misuse

The danger comes from the server acting on behalf of the attacker, often with higher trust.

**Mitigations:**

- Validate all URLs received from users
- Avoid processing user-controlled addresses
- Restrict internal network access
- Apply strong network security rules
- Segment internal systems to reduce exposure
- Add firewalls and allowlists
- Log and monitor server activity

These steps reduce the server’s ability to make harmful or unintended internal requests.

## Side Channel Attacks 

Side channel attacks exploit unintended information leakage from a system's physical implementation.

- Uses timing differences
- Measures power or signals from hardware
- Tracks electromagnetic patterns

These leaks give attackers clues about internal data, so systems must reduce what can be indirectly observed.

**Mitigations:**

- Use constant-time operations
- Add noise to reduce patterns
- Design hardware with fewer leaks
- Keep systems patched and updated

These controls reduce the signals attackers rely on to extract hidden information.

## Covert Channels

These are unauthorized communication paths used to transfer information secretly.

- Covert storage channel
- Covert timing channel

### Covert Storage Channels

A covert storage channel is a method of secretly passing information through storage areas that were never meant for communication.

- Uses metadata or unused bits inside files or storage
- Can hide information inside file attributes or other system storage fields
- Allows communication that bypasses normal access controls
- Difficult to detect without strict auditing and monitoring

A covert storage channel works by letting one process write data to a storage area and another process read it, even though this communication is not allowed by the system’s security policy. 

This happens when a resource created for one purpose is misused for hidden communication. It often involves a higher‑level subject writing data to a storage location and a lower‑level subject reading it, creating an unauthorized flow of information.

### Covert Timing Channels

Covert timing channels describe hidden ways of sending information by modulating its resources (changing how fast or slow certain actions happen).

- Change in response time
- Unusual delays in processing
- Small shifts in timing patterns
- Hard to detect without monitoring tools

These timing changes quietly pass information without using normal communication paths, which is why they pose a hidden risk and must be controlled.

:::info 

The main difference between covert storage and covert timing channels is that **storage channels hide data in resources, while timing channels hide data in the timing of events**.

:::

## Double Login Prompt (Suspicious Behavior)

A double login prompt warns that something may be intercepting credentials.

- Often caused by tools collecting usernames and passwords
- Users may be tricked into typing credentials again
- Attackers relay and capture login attempts
- Used in proxy attacks and phishing setups

Multiple unexpected prompts suggest credential interception, so users should stop and verify the site.

## Referrer Manipulation

Referrer manipulation makes a website believe a request came from a trusted source.

- Changes the HTTP `Referer` header
- Helps attackers bypass weak trust rules
- Can break protections tied to request origin

This works because some sites trust referrer data, even though it can be easily faked.


## WAF Bypass

WAF bypass avoids detection by security filters in front of websites.

- Uses odd encodings or special characters
- Tries rare HTTP methods or unusual input shapes
- Works with injection or spoofing attacks

The main idea is to slip past automated rules, so strict validation and monitoring are necessary.
