---
title: "The Basics"
description: "Identity and Access Management"
tags: [Security, Cybersecurity, Access Management, IAM]
sidebar_position: 1
last_update:
  date: 1/30/2024
---



## IAM

Identity and Access Management (IAM) ensures only authorized users can access systems and resources. IAM uses identity models to manage access to information, devices, systems, and facilities.

There are three components in an identity model:

- **Entity**

  - Physical or virtual objects, people, or groups.
  - Examples: employees, servers, business units, access groups.

- **Identity**

  - Each entity can have one or more identities.
  - Identities represent roles or functions.
  - Example: Alice = "Faculty", Bob = "Staff", "Alumnus", "Student".

- **Attribute**

  - Descriptive details about an identity.
  - Identities could also have overlapping attributes
  - Example: Bob’s “Alumnus” identity: Major = CS, Graduation Year = 2015.

How it looks like:

<div class='img-center'>

![](/img/docs/iam-the-basicsss.png)

</div>

## Access Control Process

The access control process involves three key steps:

- **Identification**
    - Determining the identity of a user or system.
    - Using unique identifiers such as usernames or IDs.
    - Provides a basis for further security checks.

- **Authentication**
    - Verifying the claimed identity of the user.
    - Can involve passwords, biometric scans, or security tokens.
    - Ensures that the entity is who they claim to be.

- **Authorization**
    - Granting the authenticated user appropriate access to resources.
    - Based on predefined permissions or roles.
    - Ensures users can only access what they're permitted to.

## Identification Mechanisms

These are the commonly used methods to establish a person's identity within a system or organization.

- **Usernames**

    - Most common means of identification for electronic systems.
    - Unique identifier, consists of a first initial/first name and a last name. 
    - Should not be considered a secret, it's not for authentication. 

- **Access Cards**

    - Identification cards that act as primary proof of employment.
    - Can act as access control devices to buildings or sensitive areas.
    - Examples: 

      - **Basic cards** - Uses magnetic stripes; easy to duplicate so this is not secure.
      - **Smart cards** - Contains an integrated circuit chip; proves card's authenticity. 

- **Biometrics**

    - Used for identification and authentication
    - Fingerprint scans, eye scans, voiceprint, facial recognition
    - Should be accurate, secure, and minimally intrusive.

      :::info 

      Fingerprints are made up of ridge endings and bifurcations exhibited by friction ridges and other detailed characteristics called **minutiae**. It is the distinctiveness of these minutiae that gives each individual a unique fingerprint. 

      :::


## Registration Process 

The registration process includes gathering information about a user and creating the corresponding entity in the system. It has four steps: 

1. **Request**: Submit a request to create an identity.
2. **Approval**: Another person approves the request.
3. **Identity Proofing**: Verify the user’s identity using trusted documents.
4. **Issuance**: Credentials are issued, ideally by a fourth person.


## Identity Proofing 

The level of identity proofing can vary between organizations. 

- Photo identification (multiple forms), e.g. passport, driver license
- Fingerprinting
- Background checks 


## Account Management  

Information security professionals are also responsible for performing account and privilege management tasks. These tasks includes implementing the following:

- **Principle of Least Privilege**

  - Grant users the minimum access essential to fulfill their function.
  - For more information, please see [Principle of Least Privilege](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#principle-of-least-privilege).

- **Separation of Duties**

  - Sensitive functions should require action by two separate users.
  - For more information, please see [Separation of Duties](/docs/025-Cybersecurity/026-Identity-and-Access-Management/005-IAM-Concepts.md#segregation-of-duties).

- **Job Rotation**

  - Regularly move people between jobs to prevent fraud
  - This provides teams with a diverse set of experiences
  - Allows personnel to experience different aspects of the organization.

- **Mandatory Vacation Policies**

  - Requiring staff to take a number of vacation days per year
  - Enforces a period of time when employees have no access to systems.

- **Account Lifecycle Management** 

  - Provisioning new user
  - Modifying roles when user changes jobs
  - Reviewing access on a regular basis and modifying discrepancies
  - Removing access of terminated users

## Managing Accounts

- **Provisioning**: Create accounts and assign permissions.
- **Deprovisioning**: Remove access when no longer needed.
- **Re-provisioning**: Update privileges after role changes.
- **Account Revocation**: Revoke access for specific users.
- **Self-service Password Reset**: Users reset passwords without help desk.
- **Account Review**: Check permissions regularly to prevent privilege creep.

## Authentication Errors

Authentication systems can experience two types of errors that affect their reliability:

- **False Rejection (Type 1)**
  
    - Happens when a legitimate user is incorrectly denied access.
    - Causes frustration and disrupts workflow.
    - Often due to strict authentication rules or system issues.
    - Measured by **False Rejection Rate (FRR)**

- **False Acceptance (Type 2)**

    - Occurs when an unauthorized user is mistakenly accepted.
    - Creates a security risk by granting access to attackers.
    - Often caused by weak authentication or overly permissive settings.
    - Measured by **False Acceptance Rate (FAR)**

Note that FAR and FRR alone don’t fully indicate how strong an authentication system is. Adjusting the system to lower one error often increases the other:

- Very low FAR (strict acceptance) can result in a very high FRR, blocking legitimate users.
- Very low FRR (lenient acceptance) can result in a very high FAR, letting unauthorized users in.

The middle point where both thresholds meet is called the **Crossover Error Rate (CER)**. This provides a balanced measure of authentication accuracy when both error rates are matched.

<div class='img-center'>

![](/img/docs/iam-the-basics-errors-authentication-graph.png)

</div>


## Mutual Authentication

Mutual authentication ensures that both parties verify each other before communication begins.

- Both sides authenticate to each other
- Commonly used in TLS with client and server certificates
- Reduces risk of MITM attacks during secure exchanges


## Session Management 

Session Management ensures integrity of user connections by using timeouts and screensavers to disconnect user sessions that have gone idle. 

- This prevents unauthorized individuals from taking control of an abandoned session.
- Prevents unintended users from using authenticated sessions


### Timeouts 

Timeouts are simple but effective security controls. They come in three different forms:

1. Disconnect user sessions after a pre-determined time. 

    - Easy to implement but causes user dissatisfaction. 
    - Example: Disconnect every 2 hours 

2. Disconnect user sessions after a period of inactivity. 

    - Once user goes idle, system starts a timer set to a predefined value. 
    - If no activity is detected, the system disconnects the session 
    - Example: Disconnect after 10 minutes of inactivity  

3. Require re-authentication for sensitive activities. 

    - System prevents users from performing sensitive actions instead of diconnecting session
    - Friendly approach to timeouts that is less disruptive.

:::info 

If a session key is successfully established, then secure communications can occur. This is not a reason to terminate a communications session. 

:::

### Screensavers 

Screensavers are common timeout mechanisms on workstations. Instead of disconnecting sessions after a period of inactivity, the screensaver simply activates and then requires the user to authenticate to deactivate the screensaver.

- After re-authentication, user is returned to the session that was already in progress. 
- To activate screensavers in Windows, configure it in **Control Panel** then **Appearance and Personalization**.


## NTFS Permissions

NTFS (New Technology File System) permissions are used to control access to files and folders on Windows systems. These permissions specify what actions users or groups can perform on a specific file or directory. 

Below are the common NTFS permissions:

- **Full Control**: Read, write, modify, delete, change permissions.
- **Read**: View contents only.
- **Read & Execute**: View and run files/scripts.
- **Write**: Add or modify files, cannot delete.
- **Modify**: Read, write, execute, and delete files.
