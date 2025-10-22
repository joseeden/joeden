---
title: "System Hardening"
description: "Hardening and Securing the Infrastructure"
tags: [Security, Cybersecurity, Security Operations, Networking, System Hardening, Vulnerability Management]
sidebar_position: 50
last_update:
  date: 1/30/2024
---

## Overview 

Hardening is the process of applying secure configurations (to reduce the attack surface) and locking down various hardware, communications systems and software, including the operating system, web server, application server and applications, etc.

- Applying security patches
- Configure access controls
- Disable unnecessary services 
- Adopt best practices

**Reducing system elements**. Reducing the number of system elements is a system hardening technique that removes unnecessary software and services to reduce the attack surface. 

## Configurations 

### Changing Default Configurations 

New systems and devices often come with default settings that make setup easy but can introduce security risks. To improve security, it’s important to review and change these settings.

- **Default Passwords**

  - Many devices use preset passwords like `admin/admin` or `root/root`.
  - These are publicly known and easily guessed by attackers.
  - Replace default passwords with strong, unique ones during setup.

- **Unneeded Ports and Protocols**

  - Some systems enable extra services by default (e.g., Telnet, FTP).
  - These increase the attack surface if not used.
  - Disable unused protocols and replace insecure ones (e.g., use SMTPS instead of SMTP).

- **Extra Open Ports**

  - Devices may open common ports like 22, 23, 80, or 443 by default.
  - Unused open ports can be exploited by attackers.
  - Regularly review open ports and close any that aren’t needed.
  - Use firewalls to control access to only required services.

:::info 

**Update New Device Firmware First**

New network devices may sit in storage for months before being used. During that time, several firmware updates might be released. To fix any known security issues, the first thing an IT admin should do is update the device's firmware.

:::

### Configuration Management 


Configuration management ensures that only approved and tracked changes are made to systems. It helps maintain consistency, security, and stability by managing system settings, versions, and updates.

- **Identification**

  - Lists all system components, interfaces, and documentation.
  - Helps track what is being managed and protected.

- **Baseline**

  - A baseline sets the minimum required security settings.
  - Used as a reference to ensure future updates meet security standards.  
  - See: [Security Baselines](/docs/007-Cybersecurity/029-Security-Operations/049-Security-Baseline.md)

- **Change Control**

  - Formal process to propose, review, approve, and apply system changes.
  - Prevents unauthorized updates and reduces risk of disruption.
  - Includes documentation, testing, and rollback plans.

- **Verification and Audit**

  - Confirms that changes were properly applied and did not cause issues.
  - Audits compare the current state with the approved baseline
  - Performed to detect unauthorized or untracked changes.
  - Ensures compliance and system integrity over time.


## Restricting Applications

### Least Functionality

This principle ensures systems run only what’s needed. By turning off or removing unused features, services, or apps, you reduce the attack surface and lower the chances of a security breach.

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

  - Use software versions with the least number of features that meet requirements.
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

### Whitelisting Modes 

Whitelisting is a security technique that only allows approved applications or processes to run on a system.

- **Enforcement Mode**
  - Strictly allows only whitelisted applications to run
  - Blocks all other applications from executing
  - Ensures maximum security by preventing unauthorized programs
  - Causes problems when updating/patching host-based security systems.

- **Audit Mode**
  - Monitors and logs attempts to run non-whitelisted applications
  - Does not block execution but provides visibility into activities
  - Useful for testing and refining the whitelist

### Baselining 

The process of measuring changes in the network, hardware, or software environment.

- Establish normal configurations for the organization.
- By knowing what's normal, we can also identify what's considered a deviation.
- Any deviations are compared to the known baseline to determine if it is expected.

## Windows Environments 

### Group Policies 

A group policy is a set of rules or policies that can be applied to a set of users or computer accounts within an operating system. 

- In Windows environment, open Run > gpedit
- Used to create a secure baseline as part of configuration management
- Active Directory Domain Controllers hava advanced Group Policy Editor.

Each policy acts as a security template containing a set of rules:

- Password requirements 
- Account lockout policies 
- Software restrictions 
- Application restrictions

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



## SELinux 

SELinux (Security-Enhanced Linux) is a security module that provides mechanisms for supporting access control security policies, including [mandatory access controls (MAC)](/docs/007-Cybersecurity/026-Identity-and-Access-Management/008-Logical-Access.md#mandatory-access-control-mac). It is an essential component in securing Linux systems by ensuring that applications and processes have only the necessary permissions.

- Linux security is built on UNIX security. 
- SELinux provides a complete and mandatory security solution.
- Most of the security solutions focus on a part of the OS.
- If it is not specifically allowed, it will be denied. 

Due to the strict implementation of SELinux, "unknown" services will always require additional configuration to enable them in an environment where SELinux is enabled.

For more information, please see [SELinux.](/docs/003-Linux/004-Linux-Security/030-SELinux.md)