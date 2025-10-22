---
title: "Evolution of Security"
description: "Security Information and Event Management"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 70
last_update:
  date: 1/30/2024
---




## SIEM 

A SIEM (Security Information and Event Management) is a comprehensive security solution that collects, correlates, and analyzes log data from various sources across an organization's IT infrastructure.

A SIEM typically provides the following features:

- **Log consolidation**, which consists in collecting logs from various sources (like servers, firewalls or IDS/IPS) and then storing them in one central location.

- **Log retention**, which consists in storing logs for a specific period (like 90 days), so as to allow security analysts to keep track of and investigate past events.

- **Log encryption**, which is an optional feature that safeguards the confidentiality of log data.

- **Log analysis**, which involves identifying patterns, trends and anomalies related to security events, in or close to real time.

For more information, please see [SIEM](/docs/007-Cybersecurity/029-Security-Operations/032-SIEM.md)


:::info 

**Log correlation** involves analyzing and linking related events from multiple sources to detect patterns or incidents.

It’s more than just collecting logs; it’s about finding connections that indicate security issues.


:::

## Endpoint Detection and Response 

### EDR 

Endpoint Detection and Response (EDR) refers to security technologies that continuously monitor endpoint activities to detect, analyze, and respond to potential security threats.

- Continous real-time surveillance of endpoint activities to detect suspicious behaviors.
- Responding to incidents, including isolation of affected endpoints and automated response actions.
- Enables detailed investigation, including timeline reconstruction and root cause analysis.
- Gathers detailed data from endpoints to support security analysis and compliance requirements.

While SIEM centralizes log collection and analysis, it still epends on tools like EDR for endpoint data collection. EDR forwards relevant data for further review and helps incident responders quickly understand and contain threats.

**EDR Process**

1. **Data Collection**
  - Monitors endpoint activities.
  - Captures data from various sources on the endpoint:
    - System processes
    - Changes to the Registry
    - Memory Usage 
    - Patterns of Network Traffic
    - Other system activities

2. **Data Consolidation**
  - Aggregates data from multiple endpoints and sends to a database.
  - Centralizes data for easier analysis, could be on-prem or in the cloud.

3. **Threat Detection**
  - Analyzes patterns and anomalies in the data. 
  - Uses algorithms and techniques to identify potential threats.
    - Signature-based Detection
    - Behavior-based Detection

4. **Alerts and Threat Response**
  - Generates alerts for security teams when a potential attack is detected.
  - Initiates predefined response actions to mitigate threats.

5. **Threat Investigation**
  - Analyzes the cause and impact of detected threats.
  - Examines data to understand attack methods and sources.

6. **Remediation**
  - Applies fixes and updates to prevent further incidents.
  - Implements changes to improve security posture:
    - Removing malicious files 
    - Reversing changes made by the threat 
    - Restoring effective systems



### FIM

File Integrity Monitoring (FIM) is a security measure that ensures the files on a system remain unchanged by unauthorized alterations.

- Monitors files for unauthorized changes.
- Compares current file states to known good baselines.
- Alerts on discrepancies or changes.

Files that can be checked:

- Binary files 
- System and application files
- Configuration and parameter files

### XDR

Extended Detection and Response (XDR) is a security solution that provides integrated threat detection, investigation, and response capabilities across multiple security products.

- Integrates data across multiple security layers, provides unified view.
- Streamlines incident response processes and enhances threat detection with advanced analytics.
- Improves visibility and reduces response time across the security environment.
- No longer need separate solutions for network, email, and endpoint security.
- **EDR focuses on endpoints, XDR monitors endpoints, network, cloud, and email.**

## User Behavior Analytics 

### UBA 

User Behavior Analytics (UBA) involves monitoring and analyzing the behavior of users within a network to identify patterns that may indicate malicious activity or security risks.

- Analyzes normal user activities to establish baseline behaviors.
- Detects deviations from typical user behaviors that could signify threats.
- Utilizes machine learning and statistical models to identify anomalies.
- Helps in early detection of insider threats and compromised accounts.

How it works:

1. Collect and analyze data from diverse sources.
2. Employ advanced analytics methods.
3. Create a baseline for normal user behavior.
4. COntinuously monitor user activity to detect anomalies.

### UEBA

User and Entities Behavior Analytics (UEBA) extends the principles of traditional user behavior analytics to include all entities in an organization, such as devices, applications, and network connections.

- Monitors activities of both users and other entities within the network.
- Identifies unusual patterns that may indicate security threats.
- Utilizes machine learning to detect anomalies and potential security incidents.
- Provides context to understand the relationships and interactions between users and entities.

## Software Defined Networking

Software Defined Networking (SDN) is a networking approach that centralizes network control, enabling programmability and automation for improved network management and efficiency.

For more information, please see [Software Defined Networking](/docs/006-Networking/010-Technologies/050-SDN.md)






