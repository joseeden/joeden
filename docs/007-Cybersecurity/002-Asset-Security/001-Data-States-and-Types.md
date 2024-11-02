---
title: "Data States and Types"
description: "States, Types, and Classifications of Data"
tags: [Security, Cybersecurity, Security Operations, Data Security]
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Data States 

Data can exist in different states depending on how it is being handled or stored. Understanding these states is crucial for implementing appropriate security measures and ensuring data integrity and confidentiality.

### Data at Rest

Data stored in a physical location, such as a hard drive, database, or cloud storage. 

- Vulnerable to physical theft, unauthorized access, or attacks that compromise storage systems.
- It is not actively moving or being transferred between systems.
- Security measures include physical security, access controls, and monitoring.

### Data in Use

Data currently being processed, manipulated, or accessed by an application or user.

- Data being analyzed by software, accessed by a user, or used by a running application or service.
- Vulnerable to unauthorized access, application-level attacks, memory-based exploits, and insider threats.
- Application security, user authentication, authorization controls, data masking, and memory protection techniques (e.g., address space layout randomization)

### Data in Transit

Data actively moving between locations or systems, such as over networks, between servers, or through communication channels.

- Sent via email, the internet, or communication between networked devices.
- Data remains unreadable without the proper decryption key. 
- TLS (Transport Layer Security) and VPNs (Virtual Private Networks) 
- Data in transit is susceptible to interception and eavesdropping. 


## Data Types 

### By Nature

- **Structured Data**
    -  Data organized into a defined format, such as tables or databases, where elements are easily identifiable (e.g., Excel spreadsheets, SQL databases).

- **Unstructured Data**
    -  Data without a specific structure, making it harder to organize and analyze (e.g., text documents, emails, images).

- **Semi-structured Data**
    -  Data with some organization but not fully structured, often containing metadata (e.g., JSON, XML).

### By Format

- **Text Data**
    -  Information stored in a text-based format, such as documents, emails, or code.

- **Numeric Data**
    -  Data represented by numbers, like financial data, statistics, or sensor readings.

- **Binary Data**
    -  Data represented in binary form, including computer files, images, videos, or audio.


### By Use

- **Operational Data**
    -  Data used in day-to-day operations, like customer records, sales transactions, or inventory information.

- **Analytical Data**
    -  Data used for analysis and business intelligence, often derived from operational data.

- **Master Data**
    -  Core business data that remains consistent across different systems, such as customer or product information.

- **Metadata**
    -  Data about data, providing information on the properties or structure of data.

### By Origin

- **Primary Data**
    -  Data collected directly from original sources through surveys, experiments, or direct observations.

- **Secondary Data**
    -  Data derived from existing sources, such as reports, studies, or databases. 

### By Sensitivity

- **Sensitive Data**
    -  Data that requires special protection due to privacy or security concerns (e.g., personal identifiable information, financial records).
    - Examples:

      - **Regulated data**
      
         - Falls under sensitive data due to legal regulations and privacy concerns.

      - **Trade secrets**
      
         - Considered sensitive due to their confidential nature and importance to business competitiveness.

      - **Intellectual property**
      
         - Classified as sensitive due to its value and the need for protection against theft or unauthorized use.
      
      - **Legal info**
      
         - Falls under sensitive data due to the confidentiality of legal matters and attorney-client privilege.
      
      - **Financial info**
      
         - Classified as sensitive due to the potential for financial fraud or identity theft.

- **Non-sensitive Data**
    -  Data that does not require stringent security measures, generally considered public or low-risk.



