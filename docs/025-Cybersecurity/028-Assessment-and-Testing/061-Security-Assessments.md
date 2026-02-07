---
title: "Security Assessments"
description: "Internal and external assessments"
tags: 
- Security
- Cybersecurity
- Security Operations
- Vulnerability Management
- Security Assessment
- Security Testing
sidebar_position: 61
last_update:
  date: 1/30/2024
---



## Internal Assessments

Internal assessments help an organization find risks and weaknesses in its systems.

- Informal or formal evaluations performed internally.
- Focus on identifying weaknesses, risks, or compliance gaps.
- Typically used to improve processes before an official audit.
- Can be ongoing, periodic, or ad hoc.

Examples of internal assessments:

- Vulnerability scans
- Internal policy reviews
- Self-assessments

Most organizations use multiple tools to provide depth of testing and to ensure that more security issues or vulnerabilities are discovered, as well as to validate results of other tools. 

:::info 

Internal assessments are often broader and more flexible, while internal audits are structured, formal, and documented evaluations.

For more information, please see [Internal Audits.](/docs/025-Cybersecurity/028-Assessment-and-Testing/060-Security-Audits.md#internal-audit)

::: 

### Assessment Process 

This process ensures that organizations know their weak points and can plan how to reduce risks.

1. Identify potential threats using threat modeling
2. Use automated tools and manual checks to find vulnerabilities
3. Evaluate risks to see impact and cost of fixing them
4. Recommend mitigation strategies based on findings

### Information System Security Assessment

To perform a security assessment on an information system, follow the steps below:

1. Define the purpose or objectives.
2. Determine the scope and boundaries of the assessment.
3. Identify system components, data flows, and security controls in place.
4. Determine assessment methods (e.g., scanning, testing, interviews).
5. Collect and analyze findings to identify vulnerabilities and risks.
6. Document results and provide actionable recommendations for improvement.

### Example: Self Assessment Questionnaire

Below is an excerpt from the Self-Assessment Questionnaire provided by Cyber Security Agency of Singapore. The full questionnaire can be found [here](https://www.csa.gov.sg/docs/default-source/our-programmes/support-for-enterprises/sg-cyber-safe-programme/cyber-essentials-self-assessment-v20220897321ea6-f473-4f1f-8ecb-77531ac02665.xlsx?sfvrsn=90e46f58_1).

![](/img/docs/sec+-self-assessment-questionnaire.png)

## External Assessments 

External assessments are deeper analyses to find vulnerabilities and risks. They are conducted by outside parties but can be less formal.

- Include risk, vulnerability, and threat assessments
- Used for independent view of security or process weaknesses.
- Periodic or ad hoc, depending on agreements or contracts.
- Combine automated scans and manual testing

The types of tests that are performed during an assessment are: 

- **Personnel testing** - People and their adherence to procedures
- **Physical testing** - Physical security controls, such as gates and fencing
- **System and network testing** - Includes testing technical controls

:::info 

External assessments are more flexible and advisory, while external audits are formal, standardized, and reportable.

For more information, please see [External Audits.](/docs/025-Cybersecurity/028-Assessment-and-Testing/060-Security-Audits.md#external-audit)

:::

### Example: HIPAA Audit Checklist

Below is an excerpt from the HIPAA Audit Checklist provided by [San Bernardino County.](https://wp.sbcounty.gov/dbh/wp-content/uploads/2016/07/HIPAA_Audit_Checklist.pdf)

![](/img/docs/sec+-example-hipaa-audit-checklist.png)


## Assessment Techniques 

### Baseline Reporting

Baseline reporting involves establishing a standard for system performance and security, which serves as a reference for identifying deviations and potential issues.

- Provides an initial review of a system's security status.
- Helps in tracking changes and detecting anomalies.
- Used to ensure compliance with security policies and standards.

For more information, please [Security Baselines](/docs/025-Cybersecurity/029-Security-Operations/049-Security-Baseline.md)



### Attack Surface Review

An attack surface review assesses all potential entry points that an attacker could exploit within a system.

- Identifies and evaluates all possible vulnerabilities and exposure points.
- Helps in prioritizing security measures based on risk.
- Aims to reduce the number of potential attack vectors.

These reviews make heavy use of port, vulnerability, and application scanners. They adopt the mindset of an attacker, seeking possible ways to exploit the system.

:::info 

**Attack surface analysis** identifies and minimizes the parts of a system accessible to untrusted users.It is typically performed during the design phase of the SDLC. It uses tools to examine software components and assign a numerical value representing the system’s exposure.

:::

### Code Reviews

Code reviews involve examining the source code to identify and address security vulnerabilities and coding errors.

- Ensures that code adheres to security best practices and standards.
- Detects potential vulnerabilities before the code is deployed.
- Improves code quality and reduces the risk of security flaws.

For more information, please see [Code Reviews](/docs/025-Cybersecurity/027-Software-Security/012-Code-Reviews.md)

### Architecture Reviews

Architecture reviews assess the design and structure of a system to identify potential security weaknesses.

- Evaluates the overall system design for security gaps and risks.
- Ensures that security principles are integrated into the architecture.
- Helps in identifying and addressing potential issues early in the design phase.


### Password Cracking

Password cracking is a technique used during security assessments to test the strength and resilience of user credentials.

- Used in internal or external assessments 
- Helps identify weak, reused, or default passwords.
- Includes brute force, dictionary, and rainbow table attacks.
