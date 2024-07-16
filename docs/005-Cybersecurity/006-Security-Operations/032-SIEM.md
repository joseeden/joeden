---
title: "SIEM"
description: "Security Information and Event Management"
tags: [Security, Cybersecurity, Security Operations, Vulnerability Management]
sidebar_position: 32
last_update:
  date: 1/30/2024
---


## Overview

SIEM, or Security Information and Event Management, is a comprehensive approach to security management that combines SIM (Security Information Management) and SEM (Security Event Management) functions into a single, integrated solution.

SIEM can provide details such as:

- Source of the attack 
- System or data it's targeting 
- Method being used.

## Key Features

- **Log Management**

    - Collects, normalizes, and correlates log data from various sources.
    - Sources include network devices, servers, applications, and security tools.

- **Event Correlation**

    - Analyzes and correlates security events in real-time.
    - Identify patterns and detect potential security threats.

- **Incident Response**

    - Facilitates incident detection, investigation, and response.
    - Provide actionable insights and automated response capabilities.

- **Compliance Reporting**

    - Regulatory compliance through reporting and auditing capabilities.
    - Demonstrate adherence to security policies and standards.

- **Threat Intelligence Integration**

    - Incorporates threat intelligence feeds.
    - Enhance detection capabilities and prioritize security events.

- **User Activity Monitoring**

    - Monitors user activity and behavior.
    - Detects insider threats and unauthorized access attempts.

## Deployment 

A SIEM can be implemented in a couple of ways:

- Software 
- Hardware Appliances 
- Outsourced Managed Service

It can also be agent-based or agent-less.

- Agent - installed on each system, from which the SIEM needs to collect log data.
- Agentless - SIEM relies on standard protocols such as SNMP or WMI.

## Considerations  

- **Sensor**
    - Actual endpoint being monitored.
    - The sensors can feed the data up into the SIEM.

- **Sensitivity**
    - Focused on how much or how little you are logging.
    - Based on how you configure the sensor. 
    - Note that the SIIEM can also be overloaded with too much information. 

- **Trends**
    - By configuring the SIEM, we can see trends in the traffic.
    - Increasing number of failed authentication attempts can be a sign of attack.

- **Alerts**
    - We can set alerts based on certain parameters.
    - Example, alerts can be sent after five failed login attempts.

- **Correlations**
    - Information needs to be correlated to build a better picture.
    - Example, ensuring that all devices are using the same timezone.


## Recommendations

Recommendations: 

- Log all relevant events and filter irrelevant data.
- Establish and document scope of events.
- Develop use cases to define a threat. 
- Plan incident response for a threat or event.
- Establish a ticketing system to track events.
- Schedule regular threat hunting.
- Provide auditors and analysts an evidence trail. 

Available SIEM solutions:

- Splunk 
- ELK or Elastic Stack
- ArcSight
- QRadar