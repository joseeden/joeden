---
title: "Data Handling"
description: "Classifications, Ownership, and Lifecycle"
tags: [Security, Cybersecurity, Security Operations, Data Security]
sidebar_position: 2
last_update:
  date: 1/30/2024
---


## Data Classification 

Data classification helps organizations manage and protect information based on its sensitivity and potential impact if exposed.

- **Public Data** 

   - Data that has no impact on the company if released.
   - Often posted in an open-source environment, e.g. Websites

- **Sensitive Data** 

   - Data that has minimal impact if released.
   - Organization's financial data
   - Data that can be leveraged or taken advantaged of by competitors
   - **PII (Personally Identifiable Information)** and **PHI (Protected Health Information)**

- **Private Data** 

   - Contains information that should only be used within an organization.
   - Internal data such as revenue, or social security numbers of employees
   - Example: Salary information, Organization Chart per departments

- **Confidential Data** 

   - Data that can only be viewed by approved personnel
   - Examples: intellectual property data, source code

- **Critical Data** 

   - Contains valuable information; Viewing is extremely restricted.
   - Examples: Credit card numbers


## PII and PHI

**PII** and **PHI** are two types of sensitive data that must be protected to maintain privacy and comply with laws.

- **PII (Personally Identifiable Information)**

  - Includes details like name, address, social security number, or biometric data
  - Can be used to identify an individual
  - Exposure may lead to identity theft or fraud

- **PHI (Protected Health Information)**

  - Includes medical records, diagnoses, treatment history, or insurance data
  - Tied to a person’s health and care services
  - Protected under laws like HIPAA, with strict rules for handling and sharing


## Government Classifications 

Government classifications are used to categorize information based on its sensitivity and the potential impact of its unauthorized disclosure. 

- **Unclassified**
  - Publicly available information.
  - General government publications or press releases.
  - Publicly accessible government websites or databases.
  - Non-sensitive administrative records such as meeting minutes or agendas.
  
- **Sensitive but Unclassified**
  - Critical infrastructure vulnerabilities.
  - Data shared with relevant agencies without formal classification.
  - Law enforcement records related to ongoing investigations
  - Personally identifiable information (PII) collected for specific purposes.

- **Confidential**
  - Diplomatic cables detailing sensitive negotiations.
  - Plans for the security of a high-level government event.
  - Non-public financial information related to government budgets.

- **Secret**
  - Intelligence reports on enemy troop movements.
  - Details of advanced military technologies under development.
  - Information related to ongoing covert operations or espionage activities.

- **Top Secret**
  - Nuclear launch codes.
  - Identities of undercover operatives in enemy territories.
  - Comprehensive intelligence assessments of foreign governments.


## Business Classification

Business classification levels are used to categorize information within an organization based on its sensitivity and the need for protection.

- **Confidential/Proprietary**
  - Highest level of classified data
  - If data is disclosed, could cause significant harm to the organization.
  - Examples: trade secrets, strategic plans, and personal data of executives.

- **Internal/Private**
  - Information meant for internal use within the organization.
  - Examples: internal memos, employee handbooks, and internal project plans.

- **Sensitive**
  - Requires protection due to its potential impact on the organization.
  - Examples: customer data, financial records, and intellectual property.

- **Public**
  - Can be freely shared without causing harm to the organization.
  - Examples: marketing materials, press releases, and publicly available reports.


## Data Ownership 

- **Data Owner**  

   - Legal data owner.
   - **Not the creator of the file, but a senior executive**.
   - Sets policies on how data will be managed.
   - Business leaders with overall responsibility for data.
   - Nitty-gritty decisions are delegated to a data steward. 
   - In most cases, there is a reporting relationship between the data owner and data steward.
   - Ensures that the data comply with the privacy requirements.

- **Data Controller**

   - Ensure data complies with regulations.
   - Decides the purpose and methods for storage, collection, and usage.
   - **Ultimate accountability for any breaches**

- **Data Processor**

   - Person or group **hired by the data controller** to help with processing data.
   - Processes data while adhering to laws and regulations.
   - Handle data according to guidelines.

- **Data Custodian/Steward**

   - Focused on **quality of data and associated metadata**
   - Day-to-day management of data.
   - Is aligned with policies set by data owner. 
   - Owner sets rules, custodian enacts the rules.
   - Data custodian could be the system administrator or IT staff.
   - Permissions, backup, access controls, etc.

- **Data Privacy Officer (DPO)**

   - Important data role.
   - Oversight of any privacy-related data, such as PII, SPI, or PHI.
   - Ensure data privacy regulation compliance such as GDPR.


:::info 

While the terms **Data Protection Officer (DPO)** and **Data Privacy Officer (DPO)** are often used interchangeably, they can refer to distinct roles with some overlap. The key difference lies in the formal, legal requirements often associated with the DPO role, particularly under regulations like the GDPR. 

:::


## DPO vs. DPO 

The **Data Protection Officer (DPO)** is a *legal/compliance-focused* role, often required by regulation.

The **Data Privacy Officer (DPO)/Privacy Officer** is a *broader operational or strategic* function that may include the DPO or support their work.

### Data Protection Officer 

The **Data Protection Officer (DPO)** is a mandatory role under privacy laws like the **GDPR**, focused on ensuring proper handling of personal data.

- Makes sure the organization follows data protection laws
- Serves as the main contact for regulators and data subjects
- Focuses on **legal compliance and oversight**
- Operates **independently**, reporting directly to top management

**Key Points:**

- DPOs must be chosen based on their experience and knowledge of data protection
- Regulatory authorities must be informed of the DPO’s name and contact details
- Under GDPR Article 39, organizations **cannot instruct the DPO** on how to perform their duties

:::info 

An organization may choose to appoint an **external DPO**, such as a contractor or third-party provider, to fulfill this role.

:::

### Data Privacy Officer

The Data Privacy Officer (or Privacy Officer) is a **broader role or team* focused on privacy matters. They're not always required by law and their responsibilities may vary:

- Writing privacy policies
- Responding to data requests
- Working with legal and IT on privacy risks
- Can support or include the DPO in large organizations


## Data Lifecycle

Data undergoes a life cycle encompassing creation, usage, sharing, and modification. Various models exist, sharing common operational steps. 

1. **Collect/Create** - Creating the knowledge, which is usually tacit knowledge at this point.

2. **Store** - Storing or recording it in some fashion (which makes it explicit).

3. **Use/Process** - Using the knowledge, which may cause the information to be modified, supplemented or partially deleted.    

4. **Share** - Sharing the data with other users, whether as a copy or by moving the data from one location to another.

5. **Archive** - Archiving the data when it is temporarily not needed.

6. **Destroy** - Destroying the data when it is no longer needed.


## Identify and Assess Data

1. **Identification of Valuable Assets**
   - Recognize assets based on their value to the data owner.

2. **Risk Assessment**
   - Evaluate risks concerning data compromise, destruction, or alteration.
   - Identify vulnerabilities in the data life cycle.

3. **Data Life Cycle Stages**
   - Understand data handling practices from creation to destruction.
   - Recognize diverse risks and practices at each stage.

4. **Regulatory Compliance**
   - Adhere to government standards and regulations.
   - Examples include OSHA, HIPAA, PCI DSS, and GDPR.

5. **Geographic Considerations**
   - Be aware of regulations across different geographic areas.
   - Ensure compliance with multiple jurisdictional rules.

6. **Technical Considerations**
   - Be cautious about relying on virtual trash cans for data deletion.
   - Use appropriate tools for secure destruction, considering recovery possibilities.

7. **Compliance Protocols**
    - Follow specific protocols and processes for regulatory compliance.
    - Ensure data is irreversibly destroyed as required.

## Data Sovereignty  

Refers to the concept that digital information is subject to the laws of the country in which it is located.

- **Where did the data originate?**
- **Where does the data reside?**
- **Which laws and regulations apply?**


## Logging and Monitoring Security Events

Logging is critical for capturing events and ensuring accountability. 

According to the ISC2 Study Guide (chapter 5, module 1, under Data Handling Practices), logging and monitoring systems are characterized as being "Essential to identifying inefficient performing systems, detecting compromises, and providing a record of how systems are used".

- **Event Logging**
   - Records measurable changes caused by system events.
   - Imposes computational cost but aids in accountability.

- **Framework Emphasis**
   - Major controls frameworks stress organizational logging practices.
   - Relevant information includes user IDs, system activities, key event timestamps, and more.

- **Monitoring Health**
   - Essential for identifying system inefficiencies and compromises.
   - Enables correlation of information for a comprehensive understanding of activities.

- **Log Reviews**
   - Crucial for security assessment, incident identification, and audits.
   - Supports forensic analysis, helping determine if vulnerabilities were exploited.

- **Log Management Infrastructure**
   - Components define how interactions occur.
   - Preserves log data integrity and confidentiality.

- **Control Implementation**
   - Protects against unauthorized log changes.
   - Ensures adherence to retention policies and addresses storage capacity issues.

- **Preservation of Evidence**
   - Policies should preserve original logs.
   - Protects log data from malicious use and maintains confidentiality.

## Event Logging Best Practices

### Ingress Monitoring

- **Firewalls**
   - Surveillance and assessment of inbound communications traffic.
   - Logging and alerting capabilities for monitoring access attempts.
   - For more information, please see [Firewalls.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/055-Firewalls.md)

- **Gateways**
   - Control points for monitoring and regulating inbound traffic.
   - Provide logging and alerting features to enhance security.

- **Remote Authentication Servers**
   - Monitor and authenticate inbound access attempts.
   - Offer logging and alerting functionalities for enhanced security.

- **IDS/IPS Tools**
   - Intrusion Detection Systems/Intrusion Prevention Systems.
   - Identify and prevent unauthorized access with logging and alert features.
   - IPS monitors network traffic and detects potential threats.
   - IPS then takes action to prevent unauthorized or malicious activities.
   - For more information, please see [IDS and IPS.](/docs/007-Cybersecurity/024-Infrastructure-and-Network/056-IDS-and-IPS.md)

- **SIEM Solutions**
   - Security Information and Event Management.
   - Centralized platform for comprehensive security monitoring and logging.
   - For more information, please see [SIEM](/docs/007-Cybersecurity/009-Security-Operations/032-SIEM.md)
   
- **Anti-Malware Solutions**
   - Monitor and block malicious activities from inbound traffic.
   - Logging and alerting capabilities to enhance threat detection.

### Egress Monitoring

- **Email Content and Attachments**
   - DLP solutions inspect outgoing emails for sensitive data.

- **Copy to Portable Media**
   - Monitor and control data transfer to external devices.
   - DLP solutions ensure sensitive data is not copied without authorization.

- **File Transfer Protocol (FTP)**
   - Monitor data transfers via FTP to prevent unauthorized outbound data flow.

- **Posting to Web Pages/Websites**
   - Control and inspect data postings to external web pages.
   - DLP ensures compliance with data protection policies.

- **Applications/APIs**
   - DLP solutions regulate data leaving the organization through applications and APIs.
   - Monitor and prevent unauthorized data access and transmission.





