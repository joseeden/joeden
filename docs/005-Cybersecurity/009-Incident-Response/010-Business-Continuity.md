---
title: "Business Continuity"
description: "Sustaining operations during disruption"
tags: [Security, Cybersecurity, Incident Response, Business Continuity]
sidebar_position: 10
last_update:
  date: 1/30/2024
---


## Disaster Types 

![](/img/docs/sec+-bcp-disaster-types.png)


## Business Continuity Plan 

A Business Continuity Plan (BCP) is a pre-determined set of instructions describing how the mission/business processes of an organization will be sustained **during** and **after** a significant disruption.

Key elements involve:

- Phone trees for multiple contact methods.
- Systematic use of procedures and checklists for assigning responsibilities.
- Prompt activation with involvement from management and authorized individuals.
- Maintenance of critical contact numbers for various entities.
- Access to designated numbers and military-grade networks during severe cyberattacks or major disruptions.

### 1. Risk Assessment

Identify potential threats and vulnerabilities.

- Assess the impact of disruptions on business operations.
- When assessing risks that considers tangible and intangible assets, the recommended approach is a combination of:

    - **Quantitative risk assessment** - to calculate the potential financial loss if a critical server fails
    - **Qualitative risk assessment** - to understand the impact on the organization's reputation.

### 2. Business Impact Analysis

Prioritize mission-critical processes:

- Determine critical business functions, processes, and their dependencies.
- Quantify the impact of disruptions on these functions.
- Helps prioritize recovery efforts and allocate resources effectively.

Assess risks:

- Identify sensitive data 
- Identify single points of failure

**Business Impact:**

- Fines 
- Loss of contracts
- Reputation Loss
- Data Loss
    - Breach notification 
    - Escalation requirements 
    - Data exfiltration

For failed components, see [Failed Component Impacts.](010-Business-Continuity.md#failed-component-impacts)


### 3. Emergency Response Plan

- Define procedures for immediate response to crises.
- Outline roles and responsibilities during emergencies.

### 4. Crisis Management Plan

- Ensures that decision-making is streamlined and effective during high-stress situations.
- Involves the establishment of a command structure and responsibilities during a crisis
- Establish communication protocols for internal and external stakeholders.

### 5. Backup and Recovery 

- Implement data backup systems and offsite storage.
- Develop recovery strategies for IT systems and infrastructure.

### 6. Alternate Site and Facilities

- Identify alternate locations for business operations.
- Ensure availability of necessary facilities during disruptions.

### 7. Resource Management

- Plan for workforce continuity and remote work.
- Secure necessary resources for business recovery.

### 8. Training/Awareness Programs

- Conduct regular drills and training sessions for employees.
- Raise awareness about BCP protocols and procedures.

### 9. Supplier/Vendor Relationships

- Assess the continuity plans of key suppliers and vendors.
- Develop contingency plans for supply chain disruptions.

### 10. Testing and Exercising

- Regularly test the effectiveness of the BCP.
- Conduct simulated Business Continuity (BC) exercises to validate response strategies.

### 11. Documentation and Reporting

- Maintain up-to-date documentation of the BCP.
- Establish reporting mechanisms for incidents and recovery progress.

### 12. Continuous Improvement

- Review and update the BCP periodically.
- Incorporate lessons learned from real incidents or exercises.

Using headings helps to organize and highlight each component for better readability.

In summary: 

- List of BCP team members with multiple contact methods
- Immediate response procedures and checklists
- Notification systems and call trees
- Guidance for management, including designated authority
- Activation criteria and timelines
- Contact numbers for critical supply chain members


## Failed Component Impacts

### Mean Time To Failure (MTTF) 

    - For **non-repairable components**
    - Average time a non-repairable system or component operates before it permanently fails. 
    - Assess the expected lifespan or reliability of products 
    - Total operational time divided by the number of failures

### Mean Time Between Failures (MTBF)

    - For **repairable components**
    - Average time a system or component operates without failure
    - Total operational time divided by the number of failures over a given period. 
    - Higher MTBF values indicate greater reliability 

### Mean Time To Repair (MTTR) 

    - Measures the average time required to repair a failed system or component.
    - Total repair time divided by the number of repair events within a specific period.
    - Used to evaluate maintenance efficiency and system reliability,
    - Lower MTTR = faster repair times.


## Locating Critical Sources

- **Data discovery and classifications** 
    
    - Where is our sensitive data?
    - On-premise or in the cloud?

- **Privacy Threshold Assessment (PTA)**    

    - First step, determine nature of sensitive data
    - Understand first, before taking steps to protect the data

- **Privacy Impact Assessment (PIA)**

    - If exfiltrated or data fell to wrong hands
    - Determine impact and how to respond+


## RTO and RPO 

- **Recovery Point Objective**

    - Maximum amount of data loss that is acceptable during a disruption, usually expressed in time (e.g., 4 hours).
    - Related to backup and data replication strategies 
    - Backups ensure critical data can be restored without exceeding the acceptable loss.

- **Recovery Time Objective** 

    - Maximum amount of time tolerable for system recovery after a disruption or failure.
    - Helps determine the urgency and resources needed to restore operations within a timeframe.


## How often should an organization test its business continuity plan?

Routinely. Each individual organization must determine how often to test its BCP, but it should be tested at predefined intervals as well as when significant changes happen within the business environment. 

## Business Continuity in Action

**What does business continuity look like in action?**
Imagine that the billing department of a company suffers a complete loss in a fire. A **Business Impact Analysis (BIA)** was performed four months ago and identified the functions of the billing department as very important to the company, but not immediately affecting other areas of work.

- Overnight fire leads to complete loss in billing department
- Pre-signed agreement secures alternative workspace within a week
- Customer service handles billing inquiries during transition
- Billing personnel stay in temporary space until new permanent location is secured

In this scenario:

- BIA identifies billing and revenue dependencies
- Cash reserves allow an acceptable week without billing
- Pre-planning: alternate work area, customer service managing billing calls
- Execution ensures no material business interruption, indicating successful continuity plan.

The output of a business impact assessment is a prioritized listing of risks that might disrupt the organization's business, similar to the table shown below:

| Risk                              | Annualized Loss Expectancy    | 
|-----------------------------------|-------------------------------|
| Hurricane damage to a datacenter  | $145,000                      | 
| Fire in a data center             | $18,000                       |
| Power outage                      | $12,000                       | 
| Theft of equipment                | $3,400                        |

The planners can then use this information to select controls that mitigate the risks facing the organization within acceptable expense limits.
As seen in the example above, the expected loss are in descending order , where the highest priority is the first risk which has the highest expected loss.

**Business Continuity vs. Disaster Recovery**

- Business Continuity (BC) plans focus on **proactive** measures to prevent incidents and ensure the continuous operation of critical business functions. 

- Disaster Recovery (DR) plans, on the other hand, focus on **reactive** measures to recover IT systems, applications, and data after a disaster or major incident.


