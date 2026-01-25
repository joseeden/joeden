---
title: "The Basics"
tags: [Cloud, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 2/28/2020
---


## Cloud Computing

Cloud computing involves accessing and utilizing computing resources and services over the internet, provided by third-party vendors. It offers scalability, flexibility, and reduced dependency on on-premise hardware.

- Servers 
- Storage 
- Databases 
- Networking
- Software Analytics 
- Intelligence


## Cloud Concepts 

- **Utility Model**

    - Similar to utilities like electricity.
    - Provisioned in a specific location.
    - Offers scalability, elasticity, and ease of use for IT service deployment.

- **NIST Definition**

    - National Institute of Standards and Technology (NIST) provides a widely accepted definition.
    - Described as a model enabling ubiquitous, on-demand access to a shared pool of configurable computing resources.
    - Emphasizes rapid provisioning and release with minimal management effort.

- **Responsibility Matrix**

    - A tool outlining roles and responsibilities within a project or organization.
    - Clarifies who is accountable for specific tasks or areas of work.
    - Helps ensure clear communication and accountability.

- **Third-party Vendors**

    - External entities providing goods or services to a company.
    - Often contracted for specialized expertise or resources.
    - Can include suppliers, service providers, consultants, or software vendors.
    - Require clear communication, contracts, and management to ensure successful collaboration.

- **Hybrid Solutions**

    - In the context of IT, often refers to a mix of on-premise and cloud solutions.
    - Offers flexibility by leveraging both local infrastructure and cloud services.
    - Integration and management to ensure smooth operation and maximum benefit.

## Key Considerations 

- **Availability**

    - Redundancy measures to prevent single points of failure.
    - Monitoring systems for early detection of issues.
    - Disaster recovery plans for quick restoration of services.
  
- **Cost**

    - Total cost of ownership analysis including initial setup, maintenance, and operational expenses.
    - Cost optimization strategies such as resource consolidation or automation.
    - Budget forecasting to anticipate future expenses.
  
- **Resilience**

    - Fault-tolerant architecture design.
    - Regular testing of backup and recovery procedures.
    - Geographic redundancy for data centers or cloud regions.
  
- **Responsiveness**

    - Service level agreements (SLAs) defining response times and resolution targets.
    - Proactive monitoring and alerting systems.
    - Efficient incident management processes.
  
- **Scalability**

    - Horizontal and vertical scaling capabilities.
    - Auto-scaling mechanisms based on demand fluctuations.
    - Performance testing to ensure scalability thresholds are met.
  
- **Ease of Deployment**

    - Streamlined deployment pipelines or automation tools.
    - Compatibility testing with existing infrastructure.
    - User-friendly interfaces and documentation.
  
- **Risk Transference**

    - Clearly defined contractual agreements and service level guarantees.
    - Insurance policies to mitigate financial risks.
    - Compliance with regulatory requirements and standards.
  
- **Patch Availability**

    - Patch management processes to ensure timely application of updates.
    - Vulnerability scanning and assessment tools.
  
- **Inability to Patch**

    - Risk assessment and prioritization of unpatched vulnerabilities.
    - Compensating controls or mitigation strategies.
    - Regular security audits and assessments.
  
- **Power**

    - Redundant power sources such as uninterruptible power supplies (UPS) or backup generators.
    - Monitoring and maintenance of power infrastructure.
    - Energy-efficient hardware and cooling systems.
  
- **Compute**

    - Performance benchmarks and optimization techniques.
    - Load balancing for efficient resource utilization.
    - Capacity planning based on workload requirements and growth projections.


## Managed Service Provider (MSP)

A company managing IT assets for another organization and is Commonly utilized by small- and medium-sized businesses for day-to-day IT operations.

- **Outsourcing Functions**
  - Used to outsource specific IT functions or manage entire operations.
  - Expertise provided in areas where the company lacks internal capabilities.

- **Services Provided by MSPs**
  - Network and security monitoring.
  - Patching services.
  - Cloud-based solutions, including Managed Detection and Response (MDR).

- **MDR Service Example**
  - Managed Detection and Response (MDR) involves active incident investigation and response.
  - Monitors security tools, such as firewalls, for event triaging.

- **Common MSP Implementations**
  - Augmenting in-house staff for projects.
  - Implementing products or services.
  - Providing payroll services.
  - Managing Help Desk service.
  - Responding to and managing security incidents.
  - Overseeing all in-house IT infrastructure.

## Service-Level Agreement (SLA)

It is an agreement between a cloud service provider and customer that defines the quality of cloud services, specific to cloud computing terms and roles.

- **Importance of SLA**
  - Functions as a rule book and legal contract.
  - Outlines minimum service levels, availability, security, controls, and more.

- **Purpose of SLA**
  - Documents specific parameters, service levels, and remedies for failures.
  - Addresses data ownership, return, and destruction details.

- **Key SLA Points**
  - Cloud system infrastructure and security standards.
  - Customer's right to audit legal and regulatory compliance.
  - Rights and costs associated with service use continuation/discontinuation.
  - Service availability and performance.
  - Data security, privacy, and location.
  - Disaster recovery processes and data access.
  - Data portability and problem identification/resolution.
  - Change management processes and dispute mediation.
  - Exit strategy considerations.

## Common Security Challenges 

- **Shared Physical Server Vulnerabilities**
    - Multiple users often share the same underlying physical servers in a cloud environment.
    - Isolation mechanims prevent unauthorized access between virtual machines.
    - Regular security assessments and audits of underlying hardware.
    - Implementation of hypervisor security measures to mitigate risks.

- **Inadequate Virtual Environment Security**
    - Segmentation of virtual networks and resources.
    - Intrusion detection and prevention systems within virtual environments.
    - Regular security updates and patches for virtualization software.

- **User Access Management**
    - Role-based access controls (RBAC) to limit privileges based on job roles.
    - Multi-factor authentication (MFA) for enhanced user verification.
    - Regular reviews and audits of user permissions to prevent unauthorized access.

- **Lack of Up-to-date Security Measures**
    - Continuous monitoring for security vulnerabilities and emerging threats.
    - Automated patch management systems to ensure timely updates.
    - Integration with threat intelligence feeds for proactive threat detection.

- **Single Point of Failure**
    - Redundancy and failover mechanisms across multiple data centers or availability zones.
    - Load balancing to distribute traffic and mitigate the impact of failures.
    - Disaster recovery plans to maintain operations in the event of a failure.

- **Weak Authentication and Encryption**
    - Strong encryption protocols for data transmission and storage.
    - Secure key management practices to protect encryption keys.
    - Regular password policy enforcement and password rotation.
    - For more information, please see [Data Encryption.](/docs/025-Cybersecurity/022-Asset-Security/006-Data-Encryption.md)

- **Unclear Policies and Data Remnants**
    - Clear data retention policies outlining data lifecycle management.
    - Secure data deletion procedures to ensure data remnants are properly erased.
    - Compliance with regulatory requirements regarding data privacy and disposal.

## Cloud Security Controls 

- **Instance Awareness**
    - The idea is to be aware of how many VMs are being managed.
    - "**VM Sprawl**, overprovisioning VMs which can lead to unused or forgotten VMs.
    - More VMs means increased attack surface.

- **Cloud Access Security Broker (CASB)**
    - Enforces security policies when accessing cloud resources.
    - Usually a VM that runs on-prem, acts as a middle-man.
    - Can restrict VM types that can be deployed, limit storage account size, etc. 

- **Next-Generation Secure Web Gateway (SWG)**
    - Security appliance that has the CASB functionality, with additional capabilities.
    - Web content filtering, data loss prevention (DLP), firewall abilities.

- **CSP Secure Solutions**
    - Azure and AWS Network Security Groups
    - Azure Policies; controls cloud resource deployments and compliance.

- **Data Loss Prevention (DLP) Solutions**
    - Prevents data exfiltration.
    - Azure Information Protection (AIP).
 
      ![](/img/docs/sec+-dlp-solutions-azure.png)
      

- **Cloud Monitoring**
    - Detect abnormalities or suspicious activities.
    - Utilize log reviews for "detective" security controls.
    - Employ log forwarding to aggregate logs into a centralized logs repository.
