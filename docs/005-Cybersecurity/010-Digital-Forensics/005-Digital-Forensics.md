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


## Data Acquisition 

The method and tools used to create a forensically sound copy of the data from a source device, such as system memory or a hard disk.

- BYOD Policies - legally complicated, as it may not be possible to search and seize the device.
- How to collect data, e.g. shutdown, collect while device is powered on.
- There could be evidence loss if device is shut down.

## Chain of Custody

The Chain of Custody is the documented process that tracks the handling, transfer, and storage of evidence from its collection to its final presentation in court or other legal settings. 

- **Documentation** - Records each step of evidence collection, transfer, and storage.
- **Evidence Handling** - Ensures evidence is handled consistently to prevent tampering or contamination.
- **Transfer of Evidence** - Logs when evidence changes hands, including who, when, and why.
- **Storage Security** - Maintains secure storage of evidence to prevent unauthorized access or loss.
- **Legal Validity** - A clear chain of custody helps ensure evidence is admissible in court by demonstrating its integrity.

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



