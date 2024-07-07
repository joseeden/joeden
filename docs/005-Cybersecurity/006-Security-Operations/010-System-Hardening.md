---
title: "System Hardening"
tags: [Cybersecurity]
sidebar_position: 10
last_update:
  date: 1/30/2024
---


## Hardening 

Hardening is the process of applying secure configurations (to reduce the attack surface) and locking down various hardware, communications systems and software, including the operating system, web server, application server and applications, etc.

- Applying security patches
- Configure access controls
- Disable unnecessary services 
- Adopt best practices

## Reducing system elements

Reducing the number of system elements is a system hardening technique that removes unnecessary software and services to reduce the attack surface. 

## Configurations 

### Changing Default Configurations 

When setting up new systems or devices, default configurations are often used to simplify the initial setup process. However, these default settings can pose significant security risks if not properly managed. Below are some common default configurations that should be addressed to enhance security.

- **Default Passwords**

  - Devices and software often come with preset passwords.
  - Default credentials are widely known and can be easily exploited by attackers.
  - Examples include "admin/admin" or "root/root".
  - Always change default passwords to strong, unique ones upon installation.

    <!-- 
    <div class="img-center">

    ![](/img/docs/sec+-default-passwords.png)
    
    </div>
    -->

- **Unneeded Ports and Protocols**

  - Default configurations may enable more services than necessary.
  - Open ports and running protocols can provide additional attack surfaces.
  - Common unnecessary services include Telnet and FTP.
  - Disable or close any ports and protocols that are not required for operation.
  - If you're using SMTP, use the secure versions, SMTPS and HTTPS.


- **Extra Open Ports**

  - Systems may have several ports open by default for various services.
  - Ports 22, 23, 80, and 443 are open by default on some devices.
  - Often done by manufacturers to provide maximum compatibility.
  - Extra open ports can be entry points for unauthorized access.
  - Regularly review and close any ports that are not in use.
  - Use firewall rules to restrict access to essential ports only.


### Configuration management 

Configuration management ensures that authorized and validated changes are the only ones made to a system. It involves decision-making and control procedures, focusing on aspects like identification, establishing baselines, and applying updates and patches.

- **Identification**

    - Baseline identification of a system and all its components, interfaces and documentation.

- **Baseline**

    - A security baseline is a reference point that sets the minimum accepted level of security requirements. 
    - It ensures updates adhere to essential security standards.
    - Security baselines are used to guarantee that network devices, software, hardware and endpoints are configured consistently. 

- **Change Control**   

    - Process for requesting changes to a baseline, with a review and approval process for updates and patches.

- **Verification and Audit**    

    - Ensure system integrity after changes and an audit to validate the current baseline against its initial baseline plus approved changes.

## Restricting Applications

### Least Functionality

Ensuring systems and devices operate with the least functionality necessary reduces the attack surface and minimizes security risks. This principle involves disabling or removing all non-essential features, services, and applications.

- **Minimize Installed Applications**

  - Install only the applications needed for the system's purpose.
  - Regularly review and uninstall unnecessary software.

- **Disable Unnecessary Services**

  - Turn off services that are not required for the system's operation.
  - This includes services like file sharing, remote desktop, and print services.

- **Limit User Access**

  - Restrict user permissions to the minimum required to perform their tasks.
  - Use role-based access control (RBAC) to manage user privileges.

- **Use Minimal Software Versions**

  - Opt for software versions with the least number of features that meet requirements.
  - Avoid using versions with unnecessary add-ons or plugins.

- **Regularly Update and Patch**

  - Ensure all essential software is up-to-date with the latest security patches.
  - Remove or replace unsupported or obsolete software versions.

### Secure Baseline Image 

In large networks, the best solution is to prevent excessive installations. To achieve this, we can use a **secure baseline image** for all workstations. This image will have:

- Operating system 
- Minimum applications required
- Strict configuration policy

### Noncompliant to Security Baselines 

Whenever a device is found not compliant with the security baseline, it may be disabled or isolated into a quarantine area until it can be checked and updated

### Filtering Applications

**Whitelisting/Allowlisting**

- Allows only authorized applications; blocks all others.
- Requires creating a list of approved applications.
- Greater control, prevents malware, and unauthorized applications.

**Blacklisting/Blocklisting**

- Preventing listed applications from running.
- Blocks known malicious software.
- Doesn't prevent unknown threats.

**Graylisting**

- Temporarily blocks emails from unknown senders.
- Requires the sender to resend the email.

## Updates and Patches 

### Patch Management 

Patch Management involves updating software to address vulnerabilities and improve security.
- Ensures systems are protected against known threats.
- Key for maintaining a secure and resilient IT infrastructure.

**Challenges and Best Practices**

- Patches may disrupt system stability.
- Balancing rapid deployment with stability is crucial.
- Test patches in a qualification environment before production.
- Relying solely on vendor reputation for patch qualification is insufficient.
- Applying patches on fixed days doesn't ensure post-patch stability.

### Terms 

**Software Patch**
  
- A software patch is a quick-repair solution for programming issues. 
- Designed to address functionality problems, enhance security.
- Introduces new functionalities to improve user experience.

**Hotfix**

- Also known as "Quick-Fix", it solves a security issue.
- Cumulative package addressing specific issues in a software product.
- Should be applied immediately after being tested in a lab environment. 

**Updates**

- An update provides the system with additional functionality,
- It does not usually provide any patching of security related issues. 
- Often introduce new security vulnerabilities, which may require another hotfix.

**Service Pack**
  
- Collection of updates, fixes, or enhancements bundled into a single installable package.
- Provides comprehensive improvements to a software program.

### Recommendations

1. Designate a team to monitor vendor security patches.
2. Implement automated system-wide patching for OS and apps.
3. Extend patch management to cover cloud resources.
4. Prioritize patches as urgent, important, or non-critical.
5. Validate critical patches in test environments before deployment.
6. Keep detailed patching logs for evaluation and monitoring.
7. Define a process for assessing, testing, and applying firmware updates.
8. Establish a technical procedure for deploying urgent patches.
9. Regularly review non-critical patches for combined deployment.


## Group Policies 

A group policy is a set of rules or policies that can be applied to a set of users or computer accounts within an operating system. 

- In Windows environment, open Run > gpedit
- Each policy acts as a security template containing a set of rules:
  - Password requirements 
  - Account lockout policies 
  - Software restrictions 
  - Application restrictions
- Used to create a secure baseline as part of configuration management
- Active Directory Domain Controllers hava advanced Group Policy Editor.

### Baselining 

The process of measuring changes in the network, hardware, or software environment.

- Establish normal configurations for the organization.
- By knowing what's normal, we can also identify what's considered a deviation.
- Any deviations are compared to the known baseline to determine if it is expected.


