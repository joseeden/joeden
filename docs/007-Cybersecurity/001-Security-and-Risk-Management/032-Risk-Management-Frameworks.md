---
title: "Risk Management Frameworks"
description: "CIS, ISO, NIST etc."
tags: [Security, Cybersecurity, Risk Management]
sidebar_position: 32
last_update:
  date: 1/30/2024
---



## CIS

Center for Internet Security (CIS) is known for its CIS Controls, a set of prioritized security practices to mitigate common cyber threats.

- Provides benchmarks and guidelines for securing various technologies, including operating systems and software.
- Offers resources like risk assessments and training to help organizations strengthen their cybersecurity.

## NIST RMF/CSF

The NIST Risk Management Framework (RMF) manages cybersecurity risks for federal systems, including categorization and security control selection.

- The NIST Cybersecurity Framework (CSF) is a voluntary guideline with five core functions: Identify, Protect, Detect, Respond, and Recover.
- RMF emphasizes risk assessment, control implementation, and continuous monitoring for federal compliance.
- CSF provides flexible cybersecurity practices, adaptable to various industries and sectors.

## ISO/IEC

ISO/IEC refers to standards developed by the International Organization for Standardization (ISO) and the International Electrotechnical Commission (IEC).

- Establish best practices and frameworks for technology, information security, and related fields.
- **ISO/IEC 27001** - Information Security Management Systems (ISMS), providing a framework to protect sensitive information.

## SSAE 18 

SSAE 18 (Statement on Standards for Attestation Engagements) is an auditing standard designed for service organizations to assess their data security practices.

- "Trust Services Criteria" - availability, integrity, confidentiality, and privacy.
- Audit evaluates internal controls and processes to meet these criteria
- SOC (System and Organization Controls) reports are the result of these audits.

System and Organization Control (SOC) reports provide the results of an independent audit of a service provider. SOC 1, SOC 2, and SOC 3 reports are created based on SSAE 18 guidelines.

SSAE 18 is the **framework**, and SOC reports are the **outcomes** of audits performed under that framework.

### SOC 1

SOC 1 focuses on **controls that affect financial reporting**. It's mainly used by organizations whose services impact their clients' financial statements.

### SOC 2

SOC 2 reports assess **how a company protects customer data.**

- SOC 2 report is required for industries handling sensitive data
- Financial statement integrity ensures accurate, reliable data

SOC 2 has two types of reports that assess internal controls.

- **Type 1**
   
   - Evaluates controls at a specific point in time
   - Simply verify controls are in place 

- **Type 2** 

   - Evaluates controls over a period (6 to 12 months)
   - Verify that the controls are operating efficiently and effectively.

### SOC 3 

SOC 3 is a **public summary of a SOC 2 report**, without disclosing sensitive details. 

- Used to demonstrate security compliance to a general audience.
- Assures compliance for marketing and client trust  
- Ideal for clients needing basic security confirmation

## NIST SP 800 

The NIST Special Publications (SP) 800 series contains cybersecurity guidelines, best practices, and technical standards from the National Institute of Standards and Technology.
- Addresses various cybersecurity topics, such as risk management, data protection, and incident response.
- Publications are used by U.S. federal agencies and widely adopted by private-sector organizations.
- Key documents include:

  - **SP 800-53** for federal security controls and 
  - **SP 800-171** for non-federal handling of controlled unclassified information.


## NIST SP 800-37

NIST Special Publication 800-37 provides a structured approach to managing security and privacy risks. It outlines a comprehensive risk management framework (RMF) that helps organizations identify, assess, and mitigate risks to their information systems.

- Titled "Guide for Applying the Risk Management Framework to Federal Information Systems"
- Focuses on integrating security and risk management activities into the system development life cycle.
- Encourages continuous monitoring of information systems to address security and privacy risks in real-time.
- Provides guidelines for selecting, implementing, and assessing security controls.

Before beginning the risk management process, the organization needs to gather the following information first:

- **Technology Architecture**

  - Includes references models, segment and solutions Architecture
  - Includes business process information and information system boundaries

- **Organizational Inputs**

  - Organization-specific information
  - Laws, regulations, and policies 
  - Strategy, priorities, resource availability, and supply chain information

After gathering all the required information, the organization can then proceed with the six-step Risk Management Framework (RMF):

1. **Categorize** 

    - Define the information system and categorize it based on impact levels.
    - Normally done by performing an impact assessment.

2. **Select** 

    - Choose appropriate security controls to protect the system.
    - The selection is based upon on the system's categorization from step 1.
    - Organization selects a baseline control, adding or removing specific controls to tailor the baseline.

3. **Implement** 

    - Put the selected security controls into practice.
    - Document the implementation details.
    - Integrate controls into existing systems and processes. 

## NIST SP 800-37

NIST Special Publication 800-37, titled "Guide for Applying the Risk Management Framework to Federal Information Systems," provides a structured approach to managing security and privacy risks. It outlines a comprehensive risk management framework (RMF) that helps organizations identify, assess, and mitigate risks to their information systems.

- Focuses on integrating security and risk management activities into the system development life cycle.
- Encourages continuous monitoring of information systems to address security and privacy risks in real-time.
- Provides guidelines for selecting, implementing, and assessing security controls.

The six-step Risk Management Framework (RMF) process includes:

1. **Categorize**
   - Define the information system.
   - Determine impact levels based on potential adverse effects.

2. **Select**
   - Choose security controls based on risk assessment.
   - Tailor controls to the specific needs of the organization.

3. **Implement**
   - Put the selected security controls into practice.
   - Document the implementation details.
   - Integrate controls into existing systems and processes.

4. **Assess**
   - Evaluate the effectiveness of the security controls.
   - Conduct security control assessments.
   - Identify and address control deficiencies.
   - Are the controls implemented correctly?
   - Are they operating correctly
   - Do they meet the security requirements?

5. **Authorize**
   - Make a risk-based decision to authorize the system for operation.
   - Prepare an authorization package.
   - Grant or deny system operation based on risk assessment.

6. **Monitor**
   - Continuously monitor to ensure ongoing effectiveness.
   - Conduct periodic assessments and updates.
   - If monitoring detects significant issues, the cycle may begin anew.
   - Report security status to stakeholders.