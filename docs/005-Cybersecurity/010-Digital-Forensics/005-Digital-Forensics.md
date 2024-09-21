---
title: "Digital Forensics"
description: "Investigating devices to uncover evidence"
tags: [Security, Cybersecurity, Incident Response, Digital Forensics]
sidebar_position: 5
last_update:
  date: 1/30/2024
---


## Overview

Digital forensics is the process of investigating and analyzing digital devices and data to uncover evidence 

- Collect and preserve evidence for legal purposes.
- Always adhere to the organization's written procedures.
- This ensures that the investigation is performed correctly.
- Activities include data extraction from devices and network traffic 
- Diverse tools may be used to prevent evidence alteration.

## Key Principles

One of the primary principles in forensics is to avoid actions that change evidence, similar to physical forensics where contamination must be prevented.

- Precautions must also be taken to avoid evidence contamination.
- Altered evidence may leade to misinterpretation of that evidence.
- Example: Wearing gloves at a crime scene to avoid DNA contamination.

## Volatility of Evidence

Understanding volatility is critical, as different types of digital evidence have varying degrees of permanence.

- Data on hard drives is less volatile than information in RAM.
- Investigators prioritize gathering volatile evidence quickly.

The order in which evidence is collected is important for an effective investigation.

- Start with network traffic and memory contents.
- Then system configurations, process information, and temporary files.
- Finally, collect logs and archived records.

For more information, please see [Order of Volatility.](/docs/005-Cybersecurity/010-Digital-Forensics/010-Data-Collection.md#order-of-volatility)

## Non-Digital Evidence

Digital forensic investigators can also use non-digital sources that may not be considered truly digital.

- Examples: video recordings and witness statements.
- Such evidence can enhance the understanding of digital findings.

## Importance of Time

Time is crucial in digital investigations, as determining the timing of events is often a goal.

- Investigators must verify timestamps against a reliable source.
- Recording time offsets aids in later analysis.
- Tracking is vital for client billing and resource management.

## Forensics in Action 

### Network Forensics

Network forensics involves capturing and analyzing communications sent over a network. This helps forensic investigators piece together a suspect's digital interactions.

- Sent as digital signals (ones and zeros) over various media (copper, fiber-optic, wireless).
- Attackers can tap cables, intercept wireless signals, etc.or 
- Network devices can be compromised to capture communications.

Protocol analyzers like Wireshark perform **full packet capture**, recording all network traffic for further analysis. Note that full packat captures have some limitations:

- Requires significant storage capacity; impractical for long-term retention.
- Filtering relevant data requires prior knowledge of potential forensic needs.
- Incorrect filtering often leads to missed information after incidents.

As an alternative, **Netflow** data can be used to capture high-level communication details without retaining content, reducing storage needs.

- Details can include source/destination IPs, timestamps, data volumes
- Similar to a phone bill, it provides "who talked to whom" not the specific details.


### Software Forensics 

Software code can serve as crucial evidence in investigations, and software forensic techniques are employed to analyze this code for expert opinions.

Major uses of software forensics:

- **Resolving Intellectual Property Disputes**
  - Scenario: 
    -  A developer moves to a competitor.
  - Dispute: 
    - The former employer accuses the competitor of code theft, 
    - The competitor claims independent development
  - Expert Role:
    - Forensic specialists analyze code.
    - Determine origins and similarities.

- **Identifying Origins of Malware**
  - Analysis: 
    - Experts compare malware with known threats for authorship.
  - Case: 
    - A 2016 report linked Russian hackers to specific code signatures.
  - Challenge: 
    - Public signatures can be spoofed, complicating attribution.

### Embedded Devices Forensics

Embedded devices are specialized computer systems found in various objects, both personal and industrial.

- CombineS hardware and software to perform specific functions.
- Connects to cloud services for data storage and added features.

Examples of Embedded Devices:

- **Modern Vehicles**
  - Cars contain numerous embedded systems, from climate control to GPS.
  - GPS data can track vehicle locations over time, aiding investigations.

- **Smart Home Devices**
  - Includes security systems, smart thermostats, and smart lighting.
  - Track presence in buildings and environmental conditions.
  - Useful for investigations (e.g., time of death).

- **Smart Assistants**
  - Devices like Amazon Alexa and Google Home gather user data and can record audio.
  - Investigators may subpoena recordings relevant to criminal cases.
  - Example: Bentonville murder investigation.



## Data Acquisition 

The method and tools used to create a forensically sound copy of the data from a source device, such as system memory or a hard disk.

- BYOD Policies - legally complicated, as it may not be possible to search and seize the device.
- How to collect data, e.g. shutdown, collect while device is powered on.
- There could be evidence loss if device is shut down.

For more information, please see [Data Collection.](/docs/005-Cybersecurity/010-Digital-Forensics/010-Data-Collection.md)


## Code of Ethics 

### Avoid Bias

Maintaining objectivity is important in forensic investigations to ensure valid results.

- Maintain objectivity and impartiality in all analyses.
- Base conclusions on evidence, not personal beliefs or external pressures.

### Repeatable Actions

Ensuring processes are repeatable enhances the credibility of forensic findings.

- Ensure forensic processes are consistent and reproducible.
- Document methods to allow others to verify or replicate findings.

When doing forensic analysis, take note of:

- Time 
- Action
- Results

### Preservation of Evidence

Proper handling of evidence is essential to maintain its integrity throughout the investigation.

- Handle evidence in a way that maintains its integrity.
- Follow procedures to avoid contamination, tampering, or loss of evidence.



