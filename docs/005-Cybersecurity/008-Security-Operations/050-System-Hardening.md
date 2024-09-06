---
title: "System Hardening"
description: "Hardening and Securing thee Infrastructure"
tags: [Security, Cybersecurity, Security Operations, Networking, System Hardening, Vulnerability Management]
sidebar_position: 50
last_update:
  date: 1/30/2024
---

## Hardening 

Hardening is the process of applying secure configurations (to reduce the attack surface) and locking down various hardware, communications systems and software, including the operating system, web server, application server and applications, etc.

- Applying security patches
- Configure access controls
- Disable unnecessary services 
- Adopt best practices

**Reducing system elements**. Reducing the number of system elements is a system hardening technique that removes unnecessary software and services to reduce the attack surface. 

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


### Configuration Management 

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

- **Whitelisting/Allowlisting**

  - Allows only authorized applications; blocks all others.
  - Requires creating a list of approved applications.
  - Greater control, prevents malware, and unauthorized applications.

- **Blacklisting/Blocklisting**

  - Preventing listed applications from running.
  - Blocks known malicious software.
  - Doesn't prevent unknown threats.

- **Graylisting**

  - Temporarily blocks emails from unknown senders.
  - Requires the sender to resend the email.



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

### AppLocker 

AppLocker is a security feature in Active Directory that allows administrators to control which applications can run within a network. It is used to create rules that specify allowed or blocked applications, helping to prevent unauthorized software from being executed.


Steps to Configure AppLocker: 

1. Open Group Policy Management by typing `gpmc.msc` in the Run dialog (`Win + R`).
2. Click on your domain, right-click on Group Policy Object (GPO), and then select New.
3. Enter the name for the new GPO. 

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-new-gpo-for-application-restrictionss.png)

    </div>

4. Edit the new GPO by right-clicking it and selecting "Edit."
5. Open `Computer Configuration > Policies > Windows Settings > Security Settings > Application Control Policies > AppLocker`.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-from-gpo.png)
   
    </div>

6. Right-click on "Executable Rules" and select "Create New Rules". 

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-executable-rules-create-new-rulesss.png)

    </div>

7.  A wizard will appear. For this example, we want to prevent all users from using the Wireshark application.
8.  Click Next to go to Permissions. Make sure Action is set to Deny, and it is applied to "Everyone". Click Next.


    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-permissions-deny.png)

    </div>


9.  In the Conditions step, select Path and then click Next.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-conditions-path.png)

    </div>


10. Click browse files in the Path step. 

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-path-browse-files.png)

    </div>



11. Search for the Wireshark application and select it.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-add-wireshark-applicationsss.png)

    </div>


12. The absolute path for the application should auto-populate. Click Create.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-add-wireshark-path-auto-populate.png)

    </div>

13. A popup warning about missing default rules will appear. Click Yes to create the default rules.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-add-wireshark-auto-default-rules.png)

    </div>


14. Back in Executable Rules, we can see the default rules and rule that stops users from running the Wireshark tool.

    <div class='img-center'>

    ![](/img/docs/networking-basics-add-applocker-add-wireshark-create-finish-summary.png)

    </div>


### Baselining 

The process of measuring changes in the network, hardware, or software environment.

- Establish normal configurations for the organization.
- By knowing what's normal, we can also identify what's considered a deviation.
- Any deviations are compared to the known baseline to determine if it is expected.

## SELinux 

SELinux (Security-Enhanced Linux) is a security module that provides mechanisms for supporting access control security policies, including mandatory access controls (MAC). It is an essential component in securing Linux systems by ensuring that applications and processes have only the necessary permissions.

- Linux security is built on UNIX security. 
- SELinux provides a complete and mandatory security solution.
- Most of the security solutions focus on a part of the OS.
- If it is not specifically allowed, it will be denied. 

Due to the strict implementation of SELinux, "unknown" services will always require additional configuration to enable them in an environment where SELinux is enabled.

For more information, please see [SELinux.](../../003-Linux/004-Linux-Security/030-SELinux.md)