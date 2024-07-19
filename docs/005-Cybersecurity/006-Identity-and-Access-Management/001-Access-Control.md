---
title: "Access Control"
description: "Protective measures for C-I-A"
tags: [Security, Cybersecurity, Access Management, Access Control]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Security Control 

A control is a protective measure aiming to uphold the principles of Confidentiality, Integrity, and Availability (CIA Triad) for data. 

**Access control**, a subset, dictates the availability of objects to subjects based on specific rules.

For instance, a firewall is a control implemented in systems or networks to prevent external threats from compromising the environment and restrict unauthorized access to information within.

## Elements of Access Control 

Access controls involve more than just limiting access; they also encompass facilitating appropriate access for authorized personnel and processes while blocking access for unauthorized functions or individuals.

### Subjects

Subjects are the active initiators of service requests.

- Types: Users, processes, clients, programs, devices (endpoints, smartphones, etc.).
- Actively initiate access requests to resources or services.
- Request services from objects.
- Require suitable clearance (permissions) for accessing services or resources.

### Objects

By definition, anything that a subject attempts to access is referred to as an object. 

- Types: Buildings, computers, files, databases, printers, servers, memory blocks, etc.
- Passive responders to subject-initiated service requests.
- Lack their own access control logic, relying on integrated systems.
- Access is often recorded in rule bases or access control lists.
- May be classified based on access rules.

### Rules 

Access rules guide whether a subject can access an object based on their validated identity. For instance:

- Firewalls use access control lists for object access.
- Rules specify access levels, e.g., inside network to outside.
- When a user accesses a file, a rule validates and defines their access.
- Rules may compare attributes, define access levels, deny access, or apply time-based restrictions.

## Controls Assessment 

Risk reduction relies on the control's efficacy, adapting to changing situations. In securing a repurposed office space for confidential file storage, consider the following:

* Evaluate the necessity of biometric scanners on all doors.
* Conduct a site assessment to determine optimal scanner placement.
* Consider permanently securing or replacing non-critical doors.
* Ensure control implementation aligns with the value of the protected assets.

## Privileged Access Management 

To ensure confidentiality, integrity, and availability of information, the Principle of Least Privilege is employed through **Privileged Acces ,Management**. Users receive access only to essential items, limiting exposure.

For more information, please see [PAM.](./011-Privilege-Access-Management.md) 









