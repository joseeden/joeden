---
title: "CIA Triad"
description: "Confidentiality, Integrity, and Availability"
tags: 
- Security
- Cybersecurity
- Security Foundations
sidebar_position: 2
last_update:
  date: 1/30/2024
---




## Information Security 

**Information Security** 

- Protecting the data and information from unauthorized access, unlawful modification and disruption, disclosure, corruption, and desctruction.

**Information Systems Security**

- Protecting the systems that hold and process our critical data.
- That can be a computer, server, etc.

## CIA Triad 

![](/img/docs/security-cia-triad-diagram.png)

### Confidentiality

Confidentiality refers to protecting information from unauthorized access. It is all about ensuring only authorized individuals can access sensitive data.

- **Confidentiality Challenges**
  - Balancing confidentiality in systems with numerous guest or customer users.
  - Unknown security status of user devices complicates achieving confidentiality.

- **Security Professional's Role**
  - Obligation to regulate access.
  - Protecting sensitive data while allowing access for authorized individuals.

- **PII and Related Terms**
  - Personally Identifiable Information (PII) linked to confidentiality.
  - Other terms: Protected Health Information (PHI), classified/sensitive information.

- **Sensitivity in Information**
  - Sensitivity as a measure of information importance.
  - Harm to the organization or individuals if improperly disclosed or modified.

- **External Stakeholder Impact**
  - Sensitivity often linked to harm to external stakeholders.
  - External entities not part of information-processing organization.

### Integrity

Integrity is about safeguarding the accuracy and reliability of data. It is all about preventing unauthorized modification or tampering of information.

- **Application**
  - information or data
  - systems and processes for business operations
  - organizations
  - people and their actions

- **Data Integrity**
  - Ensures data remains unaltered in an unauthorized manner.
  - Protection during storage, processing, and transit .
  - Ppreventing modification, errors, or loss.
  - Information must be accurate, internally consistent, and useful.

      :::info 
      
      *Consistency* ensures data is uniform across systems, maintaining the same form, content, and meaning.

      *Data integrity* means that data has not been modified in an unauthorized manner. Note that even if it is shown to be unmodified, it can still be factually inaccurate.
      
      *Data accuracy* means that data is factually or contextually correct. It is a function of people rather than systems. 

      ::: 

- **System Integrity**
  - Maintaining a known good configuration and expected operational function.
  - Begins with awareness of the system's current state
  - Establishing a baseline for future comparisons.

- **Baseline for Integrity**
  - Establishing a baseline to document the state of data or a system.
  - Ongoing protection to preserve the baseline state through transactions.

- **Comparing Baseline for Integrity**
  - Regular comparison of baseline with the current state.
  - Match indicates intact integrity, while a mismatch signifies compromise.

- **Regulatory and Organizational Needs**
  - Safeguarding integrity may be dictated by laws or organizational requirements.
  - Accessing reliable, accurate information and maintaining system reliability.
  
### Availability

Availability refers to ensuring that authorized users have access to information when needed.

- **Core Concept**
  - Data accessible where and when needed, in the required form.
  - Not necessarily 100% availability; meets business requirements for timely and reliable access.

- **Criticality and Security Professional's Role**
  - Critical systems require appropriate availability levels.
  - Consultation with the business to identify and ensure availability of critical systems.

- **Association with Criticality**
  - Availability linked to criticality, reflecting the importance an organization assigns to data or information systems.
  - Crucial for operations and mission achievement.

## Relationship between Confidentiality and Integrity 

Confidentiality and integrity are separate but complementary security concepts. Confidentiality protects against unauthorized access, while integrity ensures data remains accurate and unaltered.


## DAD Triad

The DAD Triad highlights threats that counter the principles of the CIA Triad (Confidentiality, Integrity, Availability). Here are the components of the DAD Triad with brief explanations and examples:

- **Disclosure**
   - Unauthorized access to sensitive information.
   - Example: An attacker breaches a database and leaks confidential customer records.
   - Example: An employee accidentally shares a sensitive document with the wrong person.

- **Alteration**
   - Unauthorized modification of data.
   - Example: A hacker changes the financial records in a company's database.
   - Example: Malware corrupts files on a computer, altering their content.

- **Denial**
   - Disruption of access to information or resources.
   - Example: A Distributed Denial of Service (DDoS) attack overwhelms a web server, making it unavailable to users.
   - Example: A power outage causes a data center to go offline, preventing access to critical services.


## Sources of Integrity Failures

Integrity failures in information systems can arise from various sources, each posing a unique threat to the accuracy, completeness, and reliability of data. The primary sources of integrity failures include:

- **Intentional Alteration**
   - Malicious actions aimed at modifying data.
   - Example: Tampering with financial records to commit fraud.
   - Example: Introducing false information into a database to mislead decision-makers.

- **User Error**
   - Mistakes made by users due to lack of knowledge or oversight.
   - Example: Accidental deletion of important files.
   - Example: Incorrect data entry leading to inaccurate records.

- **Software or Hardware Error**
   - Failures or bugs in software or hardware components.
   - Example: A bug in a software application corrupting data.
   - Example: Hardware failure causing data loss or corruption.

- **Acts of Nature**
   - Natural disasters causing physical damage to data infrastructure.
   - Example: An earthquake damaging data centers, leading to data loss.
   - Example: A flood destroying servers, resulting in corrupted data.

## Causes of Availability Failure

Availability failures in information systems can prevent users from accessing essential data and services. The primary causes of availability failures include:

- **Malicious Attackers**
   - Intentional actions to disrupt service availability.
   - Example: Distributed Denial of Service (DDoS) attacks overwhelming a web server.
   - Example: Ransomware encrypting data and rendering systems inaccessible.

- **Component Failures**
   - Hardware failures disrupting system operations.
   - Example: A failed hard drive causing data unavailability.
   - Example: Network switch failure interrupting communication between servers.

- **Application Failures**
   - Software errors or crashes preventing access to services.
   - Example: A bug in a web application causing it to crash and become unavailable.
   - Example: Database server crash preventing data access.

- **Utility Failures**
   - Disruptions in essential utilities supporting IT infrastructure.
   - Example: Power outages shutting down data centers.
   - Example: Internet service provider outage disconnecting systems from the network.

To mitigate these causes of availability failures, the following controls can be implemented:

- **Redundant Components**
   - Ensuring backup hardware and systems are in place to take over in case of primary component failure.
   - Example: Using RAID configurations for hard drives to provide redundancy.

- **High Availability**
   - Designing systems to ensure continuous operation and minimal downtime.
   - Example: Load balancing across multiple servers to distribute the workload and prevent single points of failure.

- **Fault Tolerance**
   - Building systems that can continue to operate correctly even if some components fail.
   - Example: Implementing failover clusters that automatically switch to a backup system if the primary system fails.