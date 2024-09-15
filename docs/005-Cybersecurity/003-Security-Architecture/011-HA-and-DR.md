---
title: "HA and DR"
description: "High Availability and Disaster Recovery"
tags: [Security, Cybersecurity, Security Architecture, Security Engineering]
sidebar_position: 11
last_update:
  date: 1/30/2024
---


## Capacity Planning 

Critical strategic planning effort that ensures an organization is adequately equipped to meet any future demands at the right time and in the most cost-effective manner. 

Main aspects of an organization's capacity:

- **People**
  - Analyze current skills of the members.
  - Forecast ftuture needs for hiring or training.
  - Right number of people with right skills.

- **Technology** 
  - Assessing current resources and utilization.
  - Anticipating future needs; evaluate if current technology can accomodate future growth.

- **Infrastructure**
  - Considering physical space and utilities to support organizational needs.
  - Office spaces, warehouses, production facilities, datacenters.

- **Processes**
  - Optimize business processes to handle demand fluctuations.
  - Fluctuations can be increase or decrease in demand.
  - Enhance workflow, efficiency through automation, or outsourcing througb third-party vendor.


## High Availability 

The ability of a service to be continuously available by minimizing downtime to the lowest amount possible. 

### Uptime 

The number of minutes or hours that a system remains online over a given period.

- Usually expressed in percentage
- Gold standard - five nines or "99.999" 
- 99.999% uptime means only 5 minutes downtime in one year.

### Load Balancing 

The process of balancing workloads across multiple computing resources. 

- Provide high availability by redirecting traffic during server failures.
- Balance loads based on various algorithms, such as round-robin or least connections.
- Improve response times and optimize resource usage.

For more information, please see [LoadBalancers.](/docs/004-Networking/001-The-Basics/005-LoadBalancers.md)


### Clustering 

Multiple computers and multiple storage devices are grouped together to work as a single system.

- Redundant connections.
- Ensure no single point of failure by providing redundancy.
- Provide high levels of availability, reliability, and scalability.
- Can be combined with loadbalancing.


## Disaster Recovery

### The Goal of Disaster Recovery

Disaster recovery capabilities are designed to restore business to normal operations as quickly as possible. 

- Initial response is to contain the damage caused by the disaster.
- Recover whatever capacity may be immediately restored.
- Activities may vary widely depending upon the nature of the disaster.

During disaster recovery efforts, the focus shifts from normal business activity to a concentrated effort to restore operations.

- Employee responsibilities may change temporarily.
- Flexibility is key during a disaster response.
- Organizations should plan out responsibilities in advance.
- Employees should be provided training in advance.

After the immediate danger passes, the team shifts to assessment mode. The goal of this phase is to triage the damage to the organization and develop a plan to recover operations on a permanent basis.


:::info[NOTE]

Disaster Recovery efforts only end when the business is back to operating normally in its primary facility. 

:::


### Redundancy

Design systems with duplicate components for backup in case of failure.

- Assess the need for multiple utility service entrances for redundant communication.
- Aim for full redundancy with devices having two power supplies from diverse sources.
- Backup power sources include batteries and generators.
- In high-availability environments, generators should be redundant and fueled by different sources.

![](/img/docs/security-datacenter-redundancy.png)

### Failover 

Failover involves establishing an alternate location, such as a secondary data center or cloud infrastructure, where critical business functions can continue in case the primary site becomes unavailable due to a disaster or incident.


### DR Sites 

- **Hot Site**

  - **Fully operational duplicate** of the primary site.
  - Quickest switchover time, but most expensive.
  - Real-time data replication for immediate takeover.

- **Warm Site**

  - Has **necessary systems but lacks current data** for immediate operations.
  - Longer switchover but less expensive 
  - Hardware and connectivity are in place.
  - Data is restored from backups, which may not be up-to-date.
  - Example: A financial services company with a warm site in another city.

- **Cold Site**

  - Basic facility with power and cooling.
  - Requires significant time to become operational.
  - **No hardware, software, data, personnel**
  - Longest switchover, but cheapest option.

- **Mobile Site**
  - Can be a hot site, warm site, or a cold site.
  - Utilizes independent and portable units like trailers or tents.
  - Self-sufficient, contains everything you need.
  - Deployed to places that needs recovery quick.

- **Virtual Site**
  - Utilized cloud-based environments.
  - Offers highly flexible approach to redundancy.
  - Examples:
    - Virtual Hot Site - fully replicated and instantly accesible
    - Virtual Warm Site - Partially replicated and scalable
    - Virtual Cold Site - Minimal activation to minimize costs

### DR Tests 

- **Read-through Exercises**

  - Simplest form of DR test, also known as **checklist reviews.**
  - Each team member reviews their roles in the DR process.
  - Personnel provides feedbacks about any updates needed.
  - Evaluates procedures and protocols, not technical recovery aspects.

- **Tabletop Exercises**

  - Also known as **walk-throughs,** tabletop involves getting everyone aroung the same table.
  - Achieve same results as read-throughs, but are generally more effective.
  - Focuses on assessing procedures and protocols rather than technical recovery.
  - Presenting a scenario, prompting team members to discuss and plan their responses.
  - **Least impact on system operations** - does not involve actual disruption or cost-effective.

- **Simulation Exercise**

  - Computer-generated representations of real-world scenarios.
  - Provides a realistic scenario to assess practical incident handling.
  - Still a theoretical exercise to gather all possible respond to a a specific disaster.

- **Failover Test**

  - Verifies seamless system transition to a backup in the event of failure.
  - Require more resources, time, and energy but verify planned actions work.

- **Parallel Test**

  - Activates the DR plan, bringing up a hot or warm site.
  - Runs primary and alternate processing facilities simultaneously.
  - Primary site continues normal operations while alternate site processes backup transactions.
  - Evaluates compatibility and backup system support.
  - Least disruptive and time-consuming among disaster recovery tests.

- **Full Interruption Test**

  - Most effective test, but its also has most impact to operations
  - Shuts down primary site, relies entirely on the alternate site.
  - More disruptive and costly compared to a parallel test.


### DR Plan

Organizations often maintain diverse documents for different audiences in their Disaster Recovery Planning (DRP) efforts. These include:

- **Executive summary**: High-level plan overview.
- **Department-specific plans**: Tailored for various organizational units.
- **Technical guides**: For IT personnel handling critical backup systems.
- **Full plan copies**: For critical disaster recovery team members.
- **Checklists**: Tailored for specific roles, including:
  - Critical disaster recovery team members
  - IT personnel
  - Managers and public relations personnel





## BC vs DR

**Business Continuity (BC) plans** 

- Focuses on proactive measures to prevent incidents.
- Ensures the continuous operation of critical business functions. 

**Disaster Recovery (DR) plans**

- Focuses on reactive measures to recover IT systems, applications, and data after a disaster or major incident.




