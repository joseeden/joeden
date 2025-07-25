---
title: "Logical Access"
description: "Electronic methods to restrict access"
tags: [Security, Cybersecurity, Access Management, Access Control]
sidebar_position: 8
last_update:
  date: 1/30/2024
---

## Logical Access Controls

Physical access controls utilize tangible methods to limit entry to specific areas or assets, whereas logical access controls employ electronic methods to restrict access to systems, and occasionally tangible assets or areas. 

- Passwords
- Biometrics (implemented on systems like smartphones or laptops)
- Badge/token readers linked to a system

These electronic tools play an important role in restricting logical access to an asset, independent of an individual's physical access.

## Discretionary Access Control (DAC)

Discretionary Access Control (DAC) is an access control policy that allows users to assign access permissions to other users. The owners of files, computers, and other resources have the discretion to configure permissions as they see fit. This is the most common form of access controls because they provide the organization with needed flexibility.

- Assigns permissions based on data owners' decisions
- Share information with other subjects or objects
- Grant its privileges to other subjects
- Modify security attributes on various entities
- Define security attributes for newly created or revised objects
- Adjust rules governing access control (with restrictions in mandatory access controls)

### DAC in the Workplace

- In a DAC system, users can share or pass files at their discretion. 
- Asset owners decide access permissions, from digital file-sharing to low-tech measures like visitor's badges issued at the security desk.

## Mandatory Access Control (MAC)

Mandatory Access Control (MAC) is the most stringent type of access control. In MAC, the operating system itself restricts the permissions that can be granted to users and processes on system resources. Users cannot modify these permissions, which makes MAC systems less suitable for production environments outside of highly secure settings.

It ensures a uniform policy across an information system, restricting specific actions to trusted security administrators. 

- Relies on the user's clearance and security classification or labels.
- Only trusted admins modify security rules.
- Subjects have restricted privileges.
- Restricts granting of privileges.
- Governs security attributes of new objects.
- Resources are labelled and permissions are based on the assigned labels

Unlike Discretionary Access Control (DAC), MAC mandates access rights rather than relying on owner discretion.

### MAC in the Workplace

Determines access uniformly based on policies, often associated with government agencies.

- Goal is to prevent the unauthorized disclosure of classified information
- "No read up, no write down" rule
- Security clearance dictates access.
- Access determined by government policy.
- Limited individual decision-making.
- Separation of duties is common.
- Role-based access control often utilized.

### Bell and LaPadula 

The Bell and LaPadula access control model arranges subjects and objects into security levels and defines access specifications, whereby subjects can only access objects at certain levels based on their security level.

For more information, please see [Bell-LaPadula Model.](/docs/007-Cybersecurity/003-Security-Architecture/002-Security-Models.md#bell-lapadula-model)


## Attribute-Based Access Control (ABAC)

Attribute-Based Access Control (ABAC) manages access based on user, resource, and environmental attributes.
- Supports flexible and dynamic access policies.
- Ideal for complex access control needs where role-based models are insufficient.
- Examples: roles, departments, security clearances, and factors like time and location.

## Role-Based Access Control (RBAC) 

Assigns user permissions based on predefined roles, streamlining access management.

- Permissions assigned according to roles.
- Roles group users with similar permissions.
- Efficient management of user access.
- Simplifies administration tasks.
- Enhances security and reduces complexity.

### RBAC in the Workplace

Role-based access control tailors user privileges based on their organizational roles, ensuring appropriate access.

- HR staff access personnel files.
- Finance accesses bank accounts.
- Managers have access to direct reports and departments.
- System administrators may have comprehensive access.
- New employees receive minimal required access.
- Continuous monitoring prevents privilege creep.
- Careful management of evolving roles and permissions.
- Standard roles for new user creation to avoid issues.
- Ensures employees have necessary access for their roles.

**Role-Based Access Control (RBAC)** defines user access based on roles, while **Rule-Based Access Control** defines access based on rules. Here's a distinction between the two:

## Rule-Based Access Control (RBAC)

Grants or restricts access based on a set of rules or conditions, rather than roles.

- Rules can include attributes like time, location, IP addresses, or specific security clearances.
- Useful for more dynamic access control scenarios, where rules can be applied to various users or roles.
- Offers greater flexibility and contextual access management.
- Example: MFA, Device types, Location