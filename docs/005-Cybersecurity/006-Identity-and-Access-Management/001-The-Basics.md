---
title: "The Basics"
description: "Identity and Access Management"
tags: [Security, Cybersecurity, Access Management, IAM]
sidebar_position: 1
last_update:
  date: 1/30/2024
---



## IAM

Identity and Access Management (IAM) is a set of controls and processes that ensure computer systems have a consistent method to identify the entities authorized to access systems and resources, and ensure that only authorized access occurs.

IAM programs use identity models to control physical and logical access to information, systems, devices, and facilities. There are three components in an identity model:

- **Entity**

    - Entities could be physical or virtual objects and groups.
    - Non-person entities can include: business units, servers, access groups.
    - In the case of people, an entity is an actual physical person 
    - An entity could be Alice and Bob.
    
- **Identities**

    - Each entity can have one or more identities.
    - Identities can be roles that a person plays in an organization.
    - Alice could have the identity of a "Faculty member"
    - Bob could have multiple identities: "Staff", "Alumnus", and "Student"

- **Attribute**

    - Each of the identities is a collection of attributes that describe the entity.
    - Identities could also have overlapping attributes:
    - As an example, Bob's "Alumnus" identity could have the following attributes:

        - Major: CS 
        - Graduation Year: 2015

How it looks like:

<div class='img-center'>

![](/img/docs/iam-the-basicsss.png)

</div>

## Access Control Process

The access control process involves three key steps:

- **Identification**
    - Determining the identity of a user or system.
    - Usually done through unique identifiers such as usernames or IDs.
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
    - A unique identifier consisting of a first initial/first name and a last name. 
    - Should not be considered a secret, it's not for authentication. 

- **Access Cards**

    - Organizations issue identification cards that act as primary proof of employment.
    - Some cards also act as access control devices to buildings or sensitive areas.
    - Cards can serve both as an identification and authentication tool.
    - **Basic cards** use magnetic stripes - easy to duplicate so this is not secure.
    - **Smart cards** contain an integrated circuit chip that proves the card's authenticity. 

- **Biometrics**

    - Used for identification and authentication
    - Low false acceptance rates - unauthorized people should not be admitted inadvertently 
    - Low false rejection rates - should not turn away people who should be admitted
    - Low intrusiveness - pass the creepiness test with users
    - Common biometrics: fingerprint scans, eye scans, voiceprint scans, facial recognition


## Registration Process 

The registration process includes gathering information about a user and creating the corresponding entity in the system. It has four steps: 

1. **Request**: 

    - Someone must create a request to create the new entity. 
    - Example: A hiring manager can create a request to create the identity of the new hire in the system. 

2. **Approval**: 
    
    - Someone must approve the request.
    - This person should be someone different from the requester.
    - This could be a higherlevel leader
    - An approval authority should be clearly defined in the organization's security policy

3. **Identity Proofing**

    - Someone verifies the identity of the user before the account is created
    - Checking user details against a trusted source of data
    - Request user to provide some sort of identification

4. **Issuance**

    - Someone issues the credentials to the individual.
    - Best practice dictates that this should be performed by a fourth individual.


## Identity Proofing 

The level of identity proofing can vary between organizations. 

- Photo identification (multiple forms), e.g. passport, driver license
- Fingerprinting
- Background checks 

## Managing Accounts

- **Provisioning**

  - Creating new user accounts
  - Assigning them appropriate permissions
  - Providing users with access to the systems 

- **Deprovisioning**

  - Removing an individual's access rights when the rights is no longer required
  - Example scenarios: when they move to a different team or when they leave the company. 

- **Re-provisioning**

  - Reassigns privileges to an employee who has changed roles within the organization.

- **Account Revocation**

  - Process of revoking access privileges for a specific user account.

- **Self-service Password Reset**

  - Decreases help desk cases related to password changes.
  - Allows users to reset passwords without help desk assistance.
  - Reduces help desk workload, increases user autonomy.

- **Account Review** 

  - Verifies employees' privileges align with their roles within the organization.
  - Periodically examines and updates permissions for relevance and necessity.
  - Mitigates privilege creep, preventing unnecessary access accumulation.

- **Permission/Authorization Creep**

  - When user gains more and more rights during their career progression in the company.
  - often as a result of changing roles within an organization.
  - Also called as "Privilege Creep".


## Errors in Authentication

Authentication systems can experience two types of errors that affect their reliability:

- **False Acceptance**

    - When the system incorrectly identifies an unauthorized user as valid.
    - This poses a significant security risk as it grants access to an attacker.
    - Often caused by weak authentication mechanisms or overly permissive thresholds.
    - Measured by **False Acceptance Rates (FAR)**

- **False Rejection**

    - When the system incorrectly rejects an authorized user.
    - This causes frustration for legitimate users who are denied access.
    - Often a result of overly strict authentication settings or system malfunctions.
    - Measured by **False Rejection Rates (FRR)**
 
Note that both FAR and FRR are not good measures of the strength of an authentication factor because they can be easily manipulated. Configuring the system to have a high FAR to simply don't admit anybody but this could also mean a very high FRR. Allowing the system to admit anyone can ensure a perfect FRR but the system will also have an unacceptably high FAR. 

<div class='img-center'>

![](/img/docs/iam-the-basics-errors-authentication-graph.png)

</div>

The middle point where both thresholds meet is called the **Crossover Error Rate (CER)**. This is a balanced measure of authentication strength which provides the error frequency that occurs when administrators tune the system to have equal FAR and FRR.