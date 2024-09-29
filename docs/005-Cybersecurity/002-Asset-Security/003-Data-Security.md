---
title: "Data Security"
description: "Securing data"
tags: [Security, Cybersecurity, Security Operations, Data Security]
sidebar_position: 3
last_update:
  date: 1/30/2024
---



## Classification

Classification involves assessing potential impacts on confidentiality, integrity, and availability.

- **Assessment**
   - Evaluate impacts on confidentiality, integrity, and availability.
   - Understand sensitivity before labeling.

- **Labeling and Handling**
   - Classify based on laws, regulations, or business expectations.
   - Labels reflect impacts, guiding protection.

- **Risk Management**
   - Classifications range from minor disruptions to severe threats.
   - Align with the organization's risk approach.

- **Efficiency in Security**
   - Enables efficient security processes.
   - Similar levels share common controls.

For more information, please see [Data Classification.](/docs/005-Cybersecurity/002-Asset-Security/002-Data-Handling.md)

## Labeling

Label information to enforce appropriate access controls.

**Data Sensitivity Levels**

1. **Highly Restricted**
    - Potential risk to the organization's future existence.
    - Could result in significant harm, loss of life, injury, or property damage.

2. **Moderately Restricted**
    - Risk of loss of temporary competitive advantage.
    - May lead to revenue loss or disruption of planned investments.

3. **Low Sensitivity (Internal Use Only)**
    - Possible minor disruptions, delays, or impacts.

4. **Unrestricted Public Data**
    - Already published; no harm from further dissemination or disclosure.

For more information, please see [Data Classification.](/docs/005-Cybersecurity/002-Asset-Security/002-Data-Handling.md)


## Retention

It is the responsibility of the organization to establish and enforce a comprehensive data retention policy.

1. **Compliance**
   - Adhere to industry standards, laws, and regulations.
   - Establish an organization-specific data retention policy.

2. **Destruction**
   - Implement systematic data destruction when assets reach their retention limits.
   - Maintain a precise inventory detailing asset location and retention requirements.

3. **Review**
   - Conduct periodic reviews of retained records.
   - Reduce information volume, retaining only necessary data.

4. **Implementation**
   - Ensure personnel understand and follow retention requirements.
   - Document specific retention guidelines for each type of information.

5. **Avoid Uniform Retention**
   - Steer clear of applying the longest retention period universally.
   - Prevent unnecessary data storage, minimizing the risk of exposure.

6. **Legal Compliance**
   - Dispose of records not mandated for retention.
   - Adhere to enterprise policies and legal requirements in the destruction process.

### Common mistake in record retention

A common mistake in record retention is applying the longest retention period without taking into account the sensitivity or importance of the corresponding information. 

Retaining unnecessary data has considerable costs in terms of storage and management. Less important or sensitive information can have shorter retention periods, thereby allowing longer retention periods for more important or sensitive information (see ISC2 Study Guide, chapter 5, module 1).


## Destruction

**Data remanence**, or residual data left on media after deletion, poses a security risk. Mitigation strategies include:

1. **Clearing**
   - Involves overwriting with random patterns.
   - Known as "zeroizing," but zeroing has risks.

2. **Purging**
   - Eliminates residual effects from original data.
   - Some technologies may retain recoverable data "ghosts."
   - Degaussing may be needed for certain media.

3. **Destruction**
   - Ultimate remedy for data remanence.
   - Involves shredding, chopping, burning, or etching.
   - Remains disposed of in protected landfills.

