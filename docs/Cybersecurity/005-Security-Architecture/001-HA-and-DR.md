---
title: "HA and DR"
tags: [Cybersecurity]
sidebar_position: 1
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

The process of distributing workloads across multiple computing resources.

- Optimize resource use and maximize throughput.
- Minimize response time.
- Prevent overloading of any single resource.

**Session Persistence**

- Ensures user sessions are consistently directed to the same server in a load-balanced environment.
- Useful for applications where user session state must be maintained across multiple requests.
- Often implemented through cookies or session IDs that are recognized by the load balancer.

**Round-robin**

- Incoming requests are distributed sequentially to each server in a set.
- No server-specific criteria are considered; each server gets an equal share of traffic.
- Effective for evenly distributed, stateless applications.

**Least Connections**

- Directs traffic to the server with the fewest active connections.
- BalanceS load more effectively in environments where some servers may be faster or more capable.
- Can be more efficient in handling sessions that require significant processing power.

**Weighted Value**

- Load balancing based on predefined weights assigned to each server based on capacity or performance.
- Higher weights are assigned to servers that can handle more traffic or have better performance capabilities.
- Allows for more fine-tuned control over how traffic is distributed across servers.


### Clustering 

Multiple computers and multiple storage devices are grouped together to work as a single system.

- Redundant connections.
- Ensure no single point of failure by providing redundancy.
- Provide high levels of availability, reliability, and scalability.
- Can be combined with loadbalancing.


## Disaster Recovery

### Redundancy

Design systems with duplicate components for backup in case of failure.

- Assess the need for multiple utility service entrances for redundant communication.
- Aim for full redundancy with devices having two power supplies from diverse sources.
- Backup power sources include batteries and generators.
- In high-availability environments, generators should be redundant and fueled by different sources.


![](/img/docs/security-datacenter-redundancy.png)

### Failover 

Failover involves establishing an alternate location, such as a secondary data center or cloud infrastructure, where critical business functions can continue in case the primary site becomes unavailable due to a disaster or incident.

### The Goal of Disaster Recovery

- Complements Business Continuity for IT and communication service restoration
- Guides emergency response for full recovery
- Aims to restore to last-known reliable operations
- Critical for overall business operation recovery

### Disaster Recovery Sites 

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
  - No hardware, software, data, personnel
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

### Disaster Recovery Tests 


- **Tabletop Exercises**

  - Focuses on assessing procedures and protocols rather than technical recovery.
  - Presenting a scenario, prompting team members to discuss and plan their responses.
  - **Least impact on system operations** - does not involve actual disruption or cost-effective.

- **Simulation Exercise**

  - Computer-generated representations of real-world scenarios.
  - Provides a realistic scenario to assess practical incident handling.

- **Failover Test**

  - Verifies seamless system transition to a backup in the event of failure.
  - Require more resources, time, and energy but verify planned actions work.

- **Parallel Test**

  - Runs primary and alternate processing facilities simultaneously.
  - Primary site continues normal operations while alternate site processes backup transactions.
  - Evaluates compatibility and backup system support.
  - Least disruptive and time-consuming among disaster recovery tests.

- **Full Interruption Test**

  - Shuts down primary site, relies entirely on the alternate site.
  - More disruptive and costly compared to a parallel test.

- **Checklist Reviews**

  - Evaluates procedures and protocols, not technical recovery aspects.


### Disaster Recovery Plan

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




