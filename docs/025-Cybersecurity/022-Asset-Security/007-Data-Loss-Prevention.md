---
title: "Data Loss Prevention"
description: "Identify, monitor, and protect sensitive data"
tags: 
- Security
- Cybersecurity
- Security Operations
- Data Security
sidebar_position: 7
last_update:
  date: 1/30/2024
---

## Handling Sensitive Information

Organizations handle sensitive information like trade secrets, business plans, health records, and PII.

- Types include trade secrets, business plans, health records, and PII
- Risks include security incidents, fines, and reputational damage

## Data Loss Prevention (DLP)

DLP is a technology used to identify, monitor, and protect sensitive data to prevent unauthorized access, use, or transmission.

- Blocks unauthorized access, use, or sharing of sensitive data
- Guards against accidental or intentional data breaches
- Uses policies, monitoring, and enforcement to reduce risks
- Protects data across email, web, and endpoints
- Involves discovery, classification, encryption, and policy controls

:::info 

A data loss prevention system can scan outgoing messages to determine whether they potentially contain personally identifiable information or other sensitive information.

:::

### DLP Mechanisms 

DLP solutions use the following mechanisms in action:

- **Pattern matching**  

   - Detects sensitive formats like credit card and Social Security numbers  
   - Scans for terms like "confidential", "proprietary", or "top secret"
   - Uses algorithms to minimize false positives  

- **Watermarking**  

   - Labels documents with electronic tags for tracking  
   - Monitors movement across networks to enforce policy  
   - Logs access and sharing of sensitive files for compliance  

### Identity Finder

Identity Finder is a host-based tool that scans systems for sensitive information.

- Scans for data like Social Security numbers, passwords, and credit card numbers
- Users can delete or encrypt sensitive files based on the findings

## Endpoint DLP 

Also known as **Host-based DLP**, the Endpoint DLP system is a security solution designed to monitor and control data transfers on endpoint devices such as laptops, desktops, smartphones, and tablets.

- Detects sensitive data based on predefined rules.
- Prevents unauthorized data transfers.
- Enforces data security policies consistently.
- Works like an IDS/IPS but for data 
- Can be set to **detection mode** or **prevention mode**

## Network DLP  

A Network Data Loss Prevention (DLP) system is a piece of software or hardware that monitors and control data transfers within a network infrastructure.

- Placed at the perimeter of the network.
- Detects **data-in-transit**; focused on things going out of the network.
- Scans for unencrypted sensitive data and blocks unauthorized transmissions
- Can automatically encrypt content, especially for email-related DLP systems

## Storage DLP

A Storage Data Loss Prevention (DLP) system is a software installed on a server in a datacenter that inspects the data-at-rest.

- Safeguard sensitive **data stored** across different storage platforms.
- Ensure compliance with security policies and regulations.

## Cloud-based DLP

A DLP usually offered as a SaaS and is part of the cloud service and storage needs.

- Data stored in the cloud services are protected.
- Example: Google Drive
