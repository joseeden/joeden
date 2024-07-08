---
title: "Data Collection"
tags: [Cybersecurity]
sidebar_position: 21
last_update:
  date: 1/30/2024
---



## Order of Volatility

The order of volatility indicates the priority for collecting digital evidence, focusing on **preserving the most transient data first**.

1. **CPU Registers and Cache**

  - The most volatile, quickly lost upon system shutdown.

2. **RAM (Memory)**

  - Contains active programs and system state, disappears when the system is turned off.
  - This may include network-related information and system processes:
      - Routing Tables
      - ARP Cache
      - Process Tables   

3. **Swap Space/Temporary File Systems**

  - Includes operating system swap files, temporary directories, and other virtual memory spaces. 
  - Data in these areas is less volatile than RAM but still susceptible to being overwritten.
   
4. **Persistent Mass Storage**

  - Hard drives and SSDs.
  - More stable but can be altered or deleted.
  - Information is retained even after shutting down the device.

5. **Remote Logging and Monitoring Data**

  - Not on the system being analyzed, stored on SIEM and monitoring data.
  - Important, because the data is still being continuously read and being written to.

6. **Physical Configuration and network topology**

  - Useful for mapping out and collecting the information.

7. **Archival Media**
    
  - External drives, cloud storage; less volatile, more durable.
  - Backup Media, could be stored onsite or remotely.
  - Typically the least volatile but may require additional access.


## Data Collection Procedures 

These collection techniques allow investigators to recover and analyze data while preserving the integrity of the original evidence.

### Disk Imaging 

Disk imaging is the process of creating an exact, sector-by-sector copy of a storage device, such as a hard drive or SSD. This copy, or "image," preserves the original data, allowing for forensic analysis without altering the original evidence.

- **Forensic Integrity** - Ensures the original disk remains unaltered during analysis.
- **Complete Copy** - Captures all data, including deleted files and system information.
- **Forensic Tools** - Uses specialized software to create a bit-for-bit image.
- **Chain of Custody** - Maintains documentation to ensure evidence integrity.

Tools used:

- Capture and hash the system image: 

    - FTK Imager 
    - Forensic Toolkit (FTK)
    - Encase

- Capture screenshots of the machine:

    - network traffic logs 
    - videos (for CCTV)

- Analyze disk images, recover data:
    - Autopsy 
    - WinHex

- RAM Memory dumps:
    - Memdump
    - HELIX

### File Carving 

File carving is a technique used to extract files from a disk image without relying on file system structures. It is often used to recover deleted or fragmented files.

- **Data Recovery** - Recovers files that may have been deleted or corrupted.
- **File Type Identification** - Uses known patterns or "magic numbers" to identify file types.
- **File Fragmentation** - Can reassemble files that are broken into multiple fragments.
- **Forensic Tools** - Requires specialized software designed for file carving.
- **Application** - Useful when the file system is damaged or unavailable. 


## Preserving the Evidence 

### Legal Hold

Also known as a **litigation hold**, legal hold is a formal notice requiring an organization to preserve all relevant information and data for potential or ongoing litigation, investigations, or legal proceedings. 

- **Prevent evidence loss or tampering.**
- Initiated when litigation is anticipated or pending, or when an investigation is underway.
- Notify relevant individuals to ensure preservation compliance.
- Document all communications and actions related to the legal hold.
- Ensures continued preservation throughout the legal process.

**Lifting the Hold** refers to the process of removing a hold. This action typically occurs when the legal proceedings or investigation have concluded or reached a resolution. It allows previously restricted activities or information to resume normal operation or accessibility. 


### Preservation 

The goal of preservation is to maintain the integrity of the electronic information, which is essential for building a strong case or responding to legal requests.

Preservation could include: 

- Making backup copies 
- Isolating critical systems 
- Implementing access controls

### Electronic Discovery 

Commonly known as **eDiscovery**, Electronic Discovery is the process of identifying, collecting, reviewing, and producing electronically stored information (ESI) for legal or investigative purposes. 

- Emails, documents, databases, social media, text messages, multimedia files, and other digital content.
- Utilizes specialized eDiscovery tools to manage and analyze large volumes of data.
- **Legal Requirement**: Laws and regulations define how evidence must be managed and disclosed during litigation.
- **Collaboration with Legal Teams**: Coordination between IT, legal, and compliance teams.
- **Chain of Custody**: Maintains a clear record of evidence handling to ensure integrity and admissibility in court.

### Mobile Devices 

Mobile device forensics involves the investigation and analysis of digital evidence stored on mobile devices, such as smartphones, tablets, and other portable electronics.

- Prevent wirelesss communications 
- Enable airplane mode 
- Faraday bag/cage 
- Keep devices charged to preserve battery

Analysis:

- GPS Tagging - when/where pictures and videos taken
- Social media posts

