---
title: "Data States and Types"
description: "States, Types, and Classifications of Data"
tags: 
- Security
- Cybersecurity
- Security Operations
- Data Security
sidebar_position: 1
last_update:
  date: 1/30/2024
---


## Data States 

Data can exist in different states depending on how it is being handled or stored. 

### Data at Rest

Data stored in a physical location, such as a hard drive, database, or cloud storage. 

- Vulnerable to physical theft or unauthorized access
- Targeted by attacks that compromise storage systems.
- Nt actively moving or being transferred between systems.
- Protected by physical security, access controls, and monitoring.

### Data in Use

Data currently being processed, manipulated, or accessed by an application or user.

- Includes data analyzed by software or accessed by users
- Vulnerable to unauthorized access, memory exploits, and insider threats
- Protected by application security, authentication, authorization

Other methods: 

- Data masking
- Memory protection techniques (e.g., ASLR)

While data at rest and data in transit are easy to encrypt, data in use is difficult to encrypt. This is because many applications don’t understand data in its encrypted form, nor do operating systems. While not impossible to encrypt data in use, it is generally difficult and not generally done. 


### Data in Transit

Data actively moving between locations or systems, such as over networks, between servers, or through communication channels.

- Sent via email, the internet, or communication between networked devices.
- Data remains unreadable without the proper decryption key. 
- TLS (Transport Layer Security) and VPNs (Virtual Private Networks) 
- Data in transit is susceptible to interception and eavesdropping. 


## Data Types 

### By Nature

- **Structured Data**

  - Organized in a defined format, like tables or databases
  - Elements are easily identifiable
  - Example: Excel spreadsheets, SQL databases

- **Unstructured Data**

  - No specific format or structure
  - Harder to organize and analyze
  - Example: Text documents, emails, images

- **Semi-structured Data**

  - Partially organized, often with metadata
  - Not fully structured like databases
  - Example: JSON, XML

### By Format

- **Text Data**
    - Information stored in a text-based format
    - Example: documents, emails, or code.

- **Numeric Data**
    -  Data represented by numbers
    -  Financial data, statistics, or sensor readings.

- **Binary Data**
    -  Data represented in binary form
    -  Includes computer files, images, videos, or audio.


### By Use

- **Operational Data**
    -  Data used in day-to-day operations, like customer records
    -  Example: Sales transactions, or inventory information.

- **Analytical Data**
    -  Data used for analysis and business intelligence
    -  Often derived from operational data.

- **Master Data**
    -  Core business data that is consistent across different systems
    -  Example: Customer or product information.

- **Metadata**
    -  Data about data
    -  Provides information on the properties of data.

### By Origin

- **Primary Data**

  - Collected directly from original sources
  - Example: Surveys, experiments, direct observations

- **Secondary Data**

  - Derived from existing sources
  - Example: Reports, studies, databases


### By Sensitivity

- **Non-sensitive Data**

  - Low-risk or public information
  - Does not require strict security measures

- **Sensitive Data**
    - Requires special protection due to privacy or security concernS
    - Examples:

        - **Regulated data**

            - Covered by legal regulations
            - Subject to privacy rules

        - **Trade secrets**

            - Confidential information
            - Critical to business competitiveness

        - **Intellectual property**

            - Valuable creations
            - Requires protection from theft or misuse

        - **Legal information**

            - Confidential matters
            - Includes attorney-client communications

        - **Financial information**

            - Sensitive financial details
            - Protects against fraud and identity theft



