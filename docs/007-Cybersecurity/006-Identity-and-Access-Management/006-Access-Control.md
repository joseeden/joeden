---
title: "Access Control"
description: "Protective measures for C-I-A"
tags: [Security, Cybersecurity, Access Management, Access Control]
sidebar_position: 6
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

## Location-Based Access Control 

**Geolocation** is the process of determining where a user or device is located using IP address, GPS, or network data. It's commonly used in cybersecurity to help control access and detect suspicious activity.

- Enables tracking the physical location of devices
- Useful for finding lost or stolen devices wipe them remotely.

Geolocation can be applied in several ways:

- **Geofencing** 

  - Restricts access or device use based on physical location
  - Often used to block access outside office zones or specific countries

- **Geotagging** 

  - Adds location metadata to files, photos, or logs
  - Useful for tracking data movement or detecting unusual file activity

- **Impossible Travel** 

  - Flags suspicious logins from distant locations within a short time 
  - Note that this can be bypassed using VPN or Tor


## Controls Assessment 

Risk reduction relies on the control's efficacy, adapting to changing situations. As an example, in securing a repurposed office space for confidential file storage, consider the following:

- Evaluate the necessity of biometric scanners on all doors.
- Conduct a site assessment to determine optimal scanner placement.
- Consider permanently securing or replacing non-critical doors.
- Ensure control implementation aligns with the value of the protected assets.

There are many ways organizations can evaluate their control's effectiveness:

- Track the number of compromised end-user accounts. 
- Track number of detected vulnerabilities.
- Monitor critical findings in initial web scans.
- Track number of data breaches requiring notifications.

## Privileged Access Management 

To ensure confidentiality, integrity, and availability of information, the Principle of Least Privilege is employed through **Privileged Acces ,Management**. Users receive access only to essential items, limiting exposure.

For more information, please see [PAM.](/docs/007-Cybersecurity/006-Identity-and-Access-Management/011-Privilege-Access-Management.md) 









