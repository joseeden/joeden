---
title: "Audits and Assessments"
description: "Internal and external assessments"
tags: [Security, Cybersecurity, Security Operations, Vulnerability Management]
sidebar_position: 65
last_update:
  date: 1/30/2024
---



## Internal Audits

Internal Audits are systematic evaluations of the effectiveness of internal controls, compliance, and integrity of information systems and processes.

- Focuses on data protection, network security, access controls, and incident response.
- Example: Internal review of password policies, user access controls

### How it works

1. Internal audit team checks control policies and procedures agains best practices and regulatory requirements.
2. User access rights is examined ensure each employee's access is align with their responsibilities.
3. Audit team verifies user access rights processes, including approvals and timely revocation.
4. Finally, they test the effectiveness of access controls using accounts with limited permissions.
5. Findings are documented and used as basis for recommendation for procedure improvements

### Compliance

Compliance ensures that information systems and security practices meet established standards, regulations, and laws.

- Crucial for protecting sensitive data and avoiding legal penalties.
- Involves implementing specific security controls and maintaining policies and procedures.
- Regularly auditing and assessing the organization's security posture.

For more information, please see [Compliance as a Governance Element.](../001-Security-and-Risk-Management/050-Compliance.md)

### Audit Committee

A group of people responsible for supervising the organization's audit and compliance functions.

- Typically members of the company's board of directors.
- Reviews the organization's financial reporting processes and internal controls.
- Ensures the organization is in compliance with legal regulatory requirements.
- Addresses any issues raised by auditors.


## Assessment Techniques 

### Baseline Reporting

Baseline reporting involves establishing a standard for system performance and security, which serves as a reference for identifying deviations and potential issues.

- Provides an initial review of a system's security status.
- Helps in tracking changes and detecting anomalies.
- Used to ensure compliance with security policies and standards.

For more information, please [Security Baselines](/docs/005-Cybersecurity/008-Security-Operations/049-Security-Baseline.md)



### Attack Surface Review

An attack surface review assesses all potential entry points that an attacker could exploit within a system.

- Identifies and evaluates all possible vulnerabilities and exposure points.
- Helps in prioritizing security measures based on risk.
- Aims to reduce the number of potential attack vectors.

These reviews make heavy use of port, vulnerability, and application scanners. They adopt the mindset of an attacker, seeking possible ways to exploit the system.


### Code Reviews

Code reviews involve examining the source code to identify and address security vulnerabilities and coding errors.

- Ensures that code adheres to security best practices and standards.
- Detects potential vulnerabilities before the code is deployed.
- Improves code quality and reduces the risk of security flaws.

For more information, please see [Code Reviews](/docs/005-Cybersecurity/003-Security-Architecture/061-Application-Security.md#code-review)

### Architecture Reviews

Architecture reviews assess the design and structure of a system to identify potential security weaknesses.

- Evaluates the overall system design for security gaps and risks.
- Ensures that security principles are integrated into the architecture.
- Helps in identifying and addressing potential issues early in the design phase.


## Internal Assessments

An in-depth analysis to identify and assess potential risks and vulnerabilities in an organization's information systems.

- Often performed before implementing new systems or before making any changes to existing ones.
- Identify gaps in an organization's compliance efforts and to prepare for formal audits.
- Most are conducted as **Self-assessments** - conducted to gauge adherence to standards and regulations.

### Assessment Process 

1. Conducting threat modelling exercise to identify potential threats.
2. Combination of automated tools and manual testing techniques are used to assess vulnerabilities.
3. Risks assessment, for evaluating potential impact of the identified threats and the cost of implementing security measures.
4. Mitigation strategies are recommended based on the assessment results

### Example of Self Assessment Questionnaire

Below is an excerpt from the Self-Assessment Questionnaire provided by Cyber Security Agency of Singapore.
The full questionnaire can be found [here](https://www.csa.gov.sg/docs/default-source/our-programmes/support-for-enterprises/sg-cyber-safe-programme/cyber-essentials-self-assessment-v20220897321ea6-f473-4f1f-8ecb-77531ac02665.xlsx?sfvrsn=90e46f58_1).

![](/img/docs/sec+-self-assessment-questionnaire.png)


## External Audits and Assessments

### External Audits 

External Audits are systematic evaluations carried out by external entities to assess an organization's information systems and security controls.

- Provides an objective perspective to an organization's true security posture.
- Also covers data protection, network security, access controls, and incident response.
- Uncover deficiencies in policies and controls to ensure alignment with diverse regulatory standards.
- Example: Evaluating compliance with PCI DSS, HIPAA, GDPR, etc.

### External Assessments

Detailed analysis conducted by independent entities to identify vulnerabilities and risks.

- Involves combinations of automated scanning tools and manual testing techniques.
- Risk Assessment, Vulnerability Assessment, and Threat Assessment.

### Regulatory Compliance    

Objective that organizations aim to reach in adherence to applicable laws, policies, and regulations.

- Organizations are adopting the use of consolidated and harmonized set of compliance controls.
- Adherence to industry-specific requirements like HIPAA, PCI DSS, and GDPR.
- Controls, such as NIST Cybersecurity Framework for compliance mechanisms.

### Independent Third-Party Audit 

Offers validation of security practices, fostering trust with customers, stakeholders, and regulatory authorities.

- Provides an unbiased perspective of the organization's security posture.
- Identify potential weaknesses that might be overlooked in internal audits and assessments.
- Regulations include GDPR and PCI DSS.

### Example of HIPAA Audit Checklist

Below is an excerpt from the HIPAA Audit Checklist provided by [San Bernardino County.](https://wp.sbcounty.gov/dbh/wp-content/uploads/2016/07/HIPAA_Audit_Checklist.pdf)

![](/img/docs/sec+-example-hipaa-audit-checklist.png)



