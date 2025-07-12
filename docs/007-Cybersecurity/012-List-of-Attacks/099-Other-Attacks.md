---
title: "Other Attacks"
tags: [Cybersecurity]
sidebar_position: 99
last_update:
  date: 1/30/2024
---



## Cross-Site Scripting

Cross-Site Scripting (XSS) is a web security vulnerability that involves injecting malicious scripts into web pages viewed by other users. This allows the attackers to circumvent the browser's security model or trusted zones.

- Attackers inject malicious scripts into web pages.
- Scripts execute in the context of the victim's browser (client-side)
- Allows session hijacking, data theft, defacement.
- Exploitations include phishing attacks, cookie theft, form manipulation.

### Steps in an XSS Attack

1. Attacker identifies input validation vulnerability within a trusted website.
2. Attacker crafts a URL to perform code injection against the trusted website.
3. URL is posted or embedded to an email to get somebody to click it.
4. Trusted site returns a page containing the injected malicious code.
5. Malicious code is ran in client's browser with permission level of trusted site.


### Types

- **Reflected XSS**
  - Malicious script is part of the request sent to the server.
  - Server includes the script in the response, reflecting it back to the user.
  - Commonly found in search queries, error messages, or URL parameters.
  
- **Persistent XSS**
  - Malicious script is stored in the web application's database.
  - Executed whenever the compromised data is retrieved and displayed to users.
  - More dangerous as it affects all users who access the compromised data.

- **Non-persistent XSS**
  - Malicious script is injected into a web page, but it's only reflected back to the current user.
  - Often found in input fields or URL parameters.
  - Requires social engineering to trick users into visiting a specially crafted link.

- **Stored XSS**
  - Similar to persistent XSS, but the injected script is stored permanently on the server.
  - Can affect multiple users accessing the compromised data.
  - Commonly found in comment sections, message boards, or user profiles.

- **DOM-based XSS**
  - Document Object Model or DOM.
  - Client-side JavaScript code manipulates DOM, leads to execution of scripts.
  - Script execution happens within the victim's browser, without involving the server.
  - Difficult to detect and mitigate compared to server-side XSS vulnerabilities.
  - Examples of code snippets that can be used to affect the DOM:

      ```JavaScript
      document.cookie 
      document.write 
      document.location 
      ```

### Mitigations

These are some mitigation steps that you can follow to prevent XSS attacks:

- Use input validation libraries or frameworks to enforce strict input requirements.
- Encode output data before displaying in web pages, prevents execution of malicious code.
- HTML escaping functions or libraries to encode special characters into their respective HTML entities.

    ```bash
    <, >, &, etc. 
    ```

- Regular security audits/code reviews, identify and fix XSS vulnerabilities in web apps.
- Automated scanning tools and manual testing techniques to detect and remediate XSS issues.
- Raise awareness onsafe coding practices, input validation, and output encoding techniques.


:::info 

**Input validation should always be performed on the web server**. If it is placed on the endpoint or within JavaScript code, the attacker may modify or remove the input validation code. 

Input validation cannot be performed on the database server because the database server will not be able to tell the difference between SQL code provided by the web server and code provided by the user as part of the attack.

:::

In addition to the mitigation strategies mentioned above, you can implement the following:

  - **Content Security Policy (CSP)**
    - Restrict the types of content that can be loaded and executed on web pages.
    - Specify allowed sources for scripts, stylesheets, and other resources.

  - **HTTPOnly and Secure Cookies**:
    - Prevents access from client-side scripts, reducing the risk of session hijacking.
    - "Secure" flag ensures cookies are only transmitted over secure (HTTPS) connections.

  - **XSS Protection Headers**:
    - Features like X-XSS-Protection to detect and mitigate XSS attacks.
    - Block or sanitize pages when potential XSS vulnerabilities are detected.
  


## Cross-Site Request Forgery

Cross-Site Request Forgery (XSRF) is a malicious script host on the attacker's site which is used to exploit a session started on another site within the same web browser. The attacker needs to convince the victim to start a session with the targeted website.

- Manipulation of session cookies, user impersonation.
- Users are tricked into executing malicious actions without their consent.
- Form submissions, image requests, API calls.
- Impact include account takeover, unauthorized transactions.

Cross-site request forgery attacks work by submitting data to a web site (for example, by manipulating a URL) from an **authenticated trusted user without that user’s knowledge**. The malicious code that performs this attack could be executed by tricking the user to click a link in an e-mail message or on a web site.

**Mitigations:**

- Use of user-specific CSRF tokens in all form submissions.
- Add randomness and prompt for additional information.
- Require users to enter current password when changing their password.
- Use Web application firewalls (WAFs).

## Server-side Request Forgery

Server-side request forgery (SSRF) allows an attacker to make unauthorized requests from a server they control or manipulate, exploiting the server's network interaction capabilities.

- Typically involves manipulating the server to route requests internally.
- Security controls are bypassed by leveraging server’s trust to make internal requests.
- Accessing sensitive data, exploiting services, or unauthorized actions.
- Data breaches, service disruptions, or unauthorized data manipulation.

**Mitigations:**

- Rigorously validate input data, especially URLs and addresses.
- Prevent user-supplied data in URLs used for server-side requests.
- Limit access to internal services from the server.
- Apply security policies to control server interactions.
- Use network segmentation to isolate internal networks.
- Implement firewalls and access control lists (ACLs).
- Set up comprehensive logging and monitoring.

## Side Channel Attacks 

Side channel attacks exploit unintended information leakage from a system's physical implementation, such as power consumption, electromagnetic emissions, or timing variations.

Examples: Timing attacks, power analysis attacks, and electromagnetic analysis attacks.

**Mitigations:**

- Constant-time algorithms, noise injection, and secure hardware design.
- This countermeasures reduce the risk of information leakage from side channels. 
- Regularly update and patch systems to address potential vulnerabilities.
