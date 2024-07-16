---
title: "Incident Response Plan"
description: "Processes and tools used in incident response"
tags: [Security, Cybersecurity, Incident Response]
sidebar_position: 2
last_update:
  date: 1/30/2024
---



## Overview

The incident response policy aligns with the plan, outlining procedures and standards. Shaped by the organization's vision, the process defines technical processes and tools used in incident response. 

The phases of incident response:

- [Overview](#overview)
- [Preparation](#preparation)
- [Detection](#detection)
- [Analysis](#analysis)
- [Containment](#containment)
- [Eradication](#eradication)
- [Recovery](#recovery)
- [Post-incident Activity](#post-incident-activity)


## Preparation

Preparation involves strengthening systems and networks to resist attacks. 

- **All about getting ready for future incidents.**
- Develop a **management-approved policy** and **communication plan,**
- Identify roles and responsibilities.
- Identify critical data, systems, and single points of failure.
- Implement an incident response team.
- Train and test your personnel with simulated incidents.

## Detection

The detection phase identifies the security incidents.

- Monitor all potential attack vectors.
- Analyze incidents using known data and threat intelligence.
- Categorize, assess, and prioritize incident response efforts.
- Standardize incident documentation.

## Analysis

Analysis involves a thorough examination and evaluation of the incident.

- Involves meticulous data collection and handling.
- Understand the scope and impact of an incident.
- In addition, provide insight and potential consequences.
- Ensure the admissibility of evidence in court.
- Notify the relevant stakeholders.

**Digital forensics**

Digital forensics plays a critical role in the analysis phase of incident response, where investigators examine collected evidence to determine what happened during a security incident and how to respond. 

For more information, please see [Digital forensics.](../007-Incident-Response/020-Digital-Forensics.md)


## Containment

After informing the relevant stakeholders, containment begins, and initial response actions are taken.

- **Limits the scope and magnitude of incident.**
- Taking immediate actions to isolate and contain the incident.
- Gather evidence.
- Choose an appropriate containment strategy.
- Disconnecting infected clients from the network, etc.

## Eradication 

Eradication begins once the incident is contained. It is focused on removing the malicious activity from a system.

- After isolating the infected resource, remove the malware.
- Reinstall a known good image to the client.

## Recovery 

Recover is focused on restoring affected systems to their normal state after the incident.

- Identify evidence that may need to be retained.
- Restore the resource from a known good backup.
- Install security patches. 
- Implement configuration updates.
- Business resumes regular activities with increased resilience.

Recovery is all about ensuring that any exploited vulnerabilities before the incident have been fully and appropriately remediated.


## Post-incident Activity

This is the last phase and only happens after containment, eradication, and a full system recovery.

- **Root Cause Analysis (RCA)**
 
  - Main purpose is not to assign blame. 
  - Instead, figure out what caused the incident.
  - Process:
      a. Define/scope the incident.
      b. Determine causal relationship that led to the incident.
      c. Identify an effective solution.
      d. Implement and track solutions

- **Lessons Learned**
  - Document experiences during the incident.
  - Identifying areas for improvement.
  - What went right, what went wrong, and what can we do better.

- **After-action Report**
  - Collect formalized information about what occured.
  - Report contains RCA and recommendations for improvement.

