---
title: "IDS and IPS"
description: "Intrusion Detection and Intrusion Prevention"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 56
last_update:
  date: 1/30/2024
---


## Intrusion 

An **intrusion** occurs when security mechanisms are bypassed, enabling unauthorized access to an organization’s resources. 

**Intrusion detection** is a monitoring method that examines recorded information and real-time events to identify abnormal activities indicative of potential incidents or intrusions. 

## Difference between IDS and IPS 

Intrusion Detection Systems (IDS) and Intrusion Prevention Systems (IPS) are both crucial for network security, designed to monitor network traffic for suspicious activity. 

- **Intrusion Detection Systems (IDS)**
  - Logs and alerts when it finds something suspicious or malicious.
  - Automates log inspection and real-time event analysis to detect intrusion attempts.
  - Recognizes anomalies and responds with alerts or alarms.
  - Does not stop an attack, but are programmed to alert based on a criteria.

- **Intrusion Protection Systems (IPS)**
  - Logs, alert on it, and take an action when it finds something suspicious or malicious.
  - Can block the traffic or prevent the application from running.
  - Should be placed at the border of the network, behind the firewall.

## Positives and Negatives

- **False Negative** - An attack occurs but is not detected, allowing it to proceed unnoticed.
- **False Positive** - Legitimate activity is incorrectly flagged as malicious, triggering unnecessary alerts.
- **True Positive** - A real attack is correctly identified and flagged by the IDS.
- **True Negative** - Normal, non-malicious activity is correctly identified as safe, with no alerts triggered.

For more information, please see [Analyzing Vulnerabilities](/docs/005-Cybersecurity/008-Security-Operations/020-Vulnerability-Management.md#analyzing-vulnerabilities)


## Types of IDS/IPS

Both IDS and IPS have similar types based on how they are deployed.

- **Network-based (NIDS/NIPS)**

  - Usually standalone devices installed on spam port or mirrored port from backbone switch.
  - Monitors network traffic patterns and supports centralized administration.
  - Detects network attacks on other systems, based on the placement of NIDS Sensor.
  - Generally more cost-effective to manage compared to HIDS.

- **Host-based (HIDS/HIPS)**

  - Usually installed on a server, configured to look for traffic to that endpoint.
  - Examines detailed events, including process calls and logs.
  - Detects specific file compromises and tracks attacker processes.
  - Can identify anomalies on the host system that network-based IDSs cannot.
  - More management-intensive, requiring attention on each system.

- **Wireless (WIDS/WIPS)**

  - Focused on wireless network, WIDS detect Denial of Service (DoS) attempts
  - Detects flooding authentication requests, de-authentication attacks, etc.

## IDS Detection Methods 

### Signature-based IDS

Signature-based IDS works by comparing network traffic against a database of known attack patterns.

- Detects intrusions by matching traffic to known signatures.
- Effective at identifying known threats.
- Low false-positive rate for known attacks.
- Requires regular updates to the signature database.
- Limited in detecting new or modified attacks.

Types:

- **Pattern-matching**
  - Specific patterns of steps recognized during an attack.
  - More common in NIDS and WIDS.

- **Stateful-matching**
  - Focus on known system baseline, reporting any changes to that state.
  - More common in HIDS.

### Anomaly-based IDS

Anomaly-based IDS detects intrusions by identifying deviations from established network behavior.

- Also known as "Behavioral-based IDS."
- Detects deviations from normal network behavior or baseline.
- Higher false-positive rate due to variations in normal activities.
- Effective at discovering new and unknown threats.
- Adapts to changing network conditions and behaviors.


:::info[NOTES]

The following terms are sometimes used interchangeably:

- Anomaly detection 
- Behavior-based detection
- Heuristic detection

:::


Types:

- **Statistical**
  - Uses statistical models to define normal behavior.
  - Detects unusual patterns; useful for known and unknown threats.
  - False positives if activity is variable; requires model updates.

- **Protocol**
  - Monitors adherence to protocol standards.
  - Detects protocol-specific attacks; ensures protocol compliance.
  - Limited to protocol violations; may miss sophisticated attacks.

- **Traffic**
  - Analyzes network traffic patterns and volumes.
  - Detects large-scale attacks like DDoS; monitors network health.
  - False positives in high-traffic environments; requires traffic analysis.

- **Rule/Heuristic**
  - Uses predefined rules and heuristics.
  - Tailored detection; effective for complex patterns.
  - Requires rule updates; may miss novel attacks.

- **Application-based**
  - Monitors specific applications.
  - Detects application-specific threats; deep insight into behavior.
  - Limited to monitored applications; requires knowledge of normal behavior.


## IPS Deployment Methods 

- **In-band (inline) deployments**

  - Device sits in the path of network communications 
  - IPS can block suspicious traffic from entering the network
  - Allows active response, but its also a single-point of failure
  - If IPS has an issue, it can disrupt communications

- **Out-of-band (passive) deployments**

  - IPS is not in the network path, sits outside of the path instead
  - Connects to a SPAN port of a switch, receiving copies of traffic
  - "Passive", device reacts after suspicious traffic enters the network
  - This means it cannot stop any attacks from entering the network