---
title: "Risk Management Frameworks"
description: "CIS, ISO, NIST etc."
tags: 
- Security
- Cybersecurity
- Risk Management
sidebar_position: 39
last_update:
  date: 1/30/2024
---



## CIS

**Center for Internet Security (CIS)** is known for its **CIS Controls**, a set of prioritized security practices to mitigate common cyber threats.

- Benchmarks for securing operating systems, applications, and networks
- Provides tools like risk assessments and training to strengthen cybersecurity
- CIS helps organizations follow clear security practices to reduce threats.

The **CIS Controls** describes three implementation groups which describe different size organizations, and allows organizations to scale the controls based upon their size and available resources. 


## NIST RMF/CSF

The NIST RMF and CSF are two frameworks that help organizations understand, manage, and reduce cybersecurity risks in a structured and repeatable way.

The **NIST Risk Management Framework** focuses on managing risks across the full system lifecycle. It has been imposed as mandatory for use on U.S. federal government systems, within all government agencies. 

- Guides activities from categorization to continuous monitoring  
- Helps in choosing and implementing security controls  
- Ensures systems stay within acceptable risk levels
- 

The **NIST Cybersecurity Framework** is built from three main parts that guide how an organization applies cybersecurity practices.

- Framework Core  
- Implementation Tiers  
- Framework Profiles

Together, RMF and CSF provide a consistent approach for improving cybersecurity, strengthening risk decisions, and keeping risks at manageable levels across the organization.

## ISO/IEC

ISO/IEC refers to standards developed by the International Organization for Standardization (ISO) and the International Electrotechnical Commission (IEC).

- Provides structured frameworks for protecting sensitive information
- Helps organizations implement strong information security management systems (ISMS)

**ISO/IEC 27001**

Also known as *Information Security Management Systems (ISMS)*, this standard provides a framework to protect sensitive information.

## SSAE 18 

**SSAE 18 (Statement on Standards for Attestation Engagements)** is an auditing standard designed for service organizations to assess their data security practices.

- "Trust Services Criteria" - availability, integrity, confidentiality, and privacy.
- Audit evaluates internal controls and processes to meet these criteria
- SOC reports are the result of these audits.

**System and Organization Control (SOC)** reports provide the results of an independent audit of a service provider. 

- **SOC 1**: Controls affecting financial reporting
- **SOC 2**: Protects customer data, with Type 1 and Type 2 assessments
- **SOC 3**: Public summary of SOC 2 for general audiences

:::info 

SSAE 18 is the **framework**, and SOC reports are the **outcomes** of audits performed under that framework.

:::

### SOC 1

SOC 1 focuses on **controls that affect financial reporting**. It's mainly used by organizations whose services impact their clients' financial statements.

### SOC 2

SOC 2 reports assess **how a company protects customer data.**

- SOC 2 report is required for industries handling sensitive data
- Financial statement integrity ensures accurate, reliable data

SOC 2 has two types of reports that assess internal controls.

- **Type 1**
   
   - Evaluates controls at a specific *point in time*
   - Simply verify controls are in place 

- **Type 2** 

   - Evaluates controls *over a period* (6 to 12 months)
   - Verify that the controls are operating efficiently and effectively.

### SOC 3 

SOC 3 is a **public summary of a SOC 2 report**, without disclosing sensitive details. 

- Demonstrate security compliance to a general audience.
- Assures compliance for marketing and client trust  
- Ideal for clients needing basic security confirmation

## NIST SP 800 

The **NIST Special Publications (SP) 800 series** contains cybersecurity guidelines, best practices, and technical standards from the National Institute of Standards and Technology.

- Covers risk management, data protection, and incident response
- Widely used by federal agencies and private organizations

Key documents include:

- **SP 800-53**: Federal security controls 
- **SP 800-171**: Non-federal handling of controlled unclassified information


## NIST SP 800-37

**NIST Special Publication 800-37**, titled "Guide for Applying the Risk Management Framework to Federal Information Systems", outlines a comprehensive risk management framework (RMF) that helps organizations identify, assess, and mitigate risks to their information systems.

- Integrates security into the system development life cycle
- Promotes continuous monitoring and mitigation of risks
- Guides selection, implementation, and assessment of controls

Before beginning the risk management process, the organization needs to gather the following information first:

1. **Technology Architecture**

   - References models, segment and solutions Architecture
   - Business process information and information system boundaries

2. **Organizational Inputs**

   - Organization-specific information
   - Laws, regulations, and policies 
   - Strategy, priorities, resource availability
   - supply chain information

After gathering all the required information, the organization can then proceed with the six-step Risk Management Framework (RMF):

1. **Categorize** 

   - Define the system and assign impact levels.
   - Normally done by performing an impact assessment.

2. **Select** 

   - Choose security controls based on categorization.
   - Organization selects a baseline control.
   - Specific controls can be added or removed.

3. **Implement** 

   - Apply the selected security controls.
   - Document the implementation details.
   - Integrate controls into existing systems and processes. 

4. **Assess**

   - Check if controls are implemented correctly and effective
   - Identify gaps or deficiencies

5. **Authorize**

   - Make risk-based decision to approve system operation
   - Prepare authorization package

6. **Monitor**

   - Continuously track control effectiveness
   - Conduct periodic reviews and report status
   - Address issues promptly to maintain security
