---
title: "Security Requirements"
description: "Security Design Principles"
tags: 
- Security
- Cybersecurity
- Security Architecture
- Security Engineering
sidebar_position: 3
last_update:
  date: 1/30/2024
---




## Overview

The US government has long recognized the need for rigorous security programs, establishing standardized evaluation models well before the private sector. These models help assess the security requirements of various situations and the capabilities of different products.

## Trusted Computer System Evaluation Criteria (TCSEC)

The Trusted Computer System Evaluation Criteria (TCSEC), also known as the "**Orange Book**," was a key framework for evaluating the security of computer systems. It established guidelines to assess and ensure system security.

- Defined security criteria across different levels, from basic to highly secure systems
- Focused on confidentiality and controlled access to sensitive information
- Provided a benchmark for evaluating the security of computer systems

It is no longer used and was replaced in 2005 by the Common Criteria, a national standard that provides a more flexible and comprehensive approach to evaluating system security. 

<div class='img-center'>

![](/img/docs/003-Security-Requirements-tcsec.png)

</div>

## Common Criteria 

The Common Criteria (CC) allowed for international collaboration and mutual recognition of evaluation results by most NATO members. This promoted a global standard for security evaluations and allowed developers to create systems once and sell them to all NATO partners

<div class='img-center'>

![](/img/docs/003-Security-Requirements-common-criteria.png)

</div>

The evaluation is categorized into seven Evaluation Assurance Levels (EALs), each with increasing rigor and assurance.

- **EAL1: Functionally Tested**

  - Basic testing to ensure the system functions as claimed.
  - Suitable for systems requiring minimal assurance.

- **EAL2: Structurally Tested**

  - Analysis of design and testing of security features.
  - Useful for systems where developers' cooperation is available.

- **EAL3: Methodically Tested and Checked**

  - Focuses on testing and checking the system's security functions.
  - Requires evidence of developer testing and a review of the development environment.

- **EAL4: Methodically Designed, Tested, and Reviewed**

  - Involves a thorough review of the system's design and implementation.
  - Requires rigorous testing and development practices.

- **EAL5: Semiformally Designed and Tested**

  - Employs semiformally specified design and analysis methods.
  - Suitable for high assurance applications requiring rigorous validation.

- **EAL6: Semiformally Verified Design and Tested**

  - Requires detailed and comprehensive design and testing, including formal methods.
  - Ideal for systems requiring high levels of trust and security.

- **EAL7: Formally Verified Design and Tested**

  - The highest level, involving formal design verification and extensive testing.
  - Ensures the highest degree of security assurance.
  - Suitable for extremely sensitive applications.


## Certification and Accreditation 

### Certification

Certification involves a thorough assessment of an information system to verify that it meets defined security requirements of a certain level of certification. This process evaluates the technical aspects and configurations of the system.

- Involves detailed testing and evaluation of security controls
- **Government-wide decision** that a product needs to meet the requirements
- Conducted by independent assessors to ensure objectivity
- Results in a formal approval that the system complies with security standards

### Accreditation

Accreditation is the formal decision **made after certitication** to authorize a specifie information system for operation in a specific environment, based on the certification findings. It considers both technical evaluations and operational risks.

- Issued by a designated approving authority after reviewing certification results
- Considers the system’s operational environment and risk acceptance
- Grants permission for the system to process, store, and transmit information


## Accreditation Decisions

Accreditation decisions reflect the level of risk acceptable for the system's operation. When an accrediting authority makes an accreditation decision, they have four options:

- Authorization to Operate (ATO)
- Interim Authorization to Operate (IATO)
- Interim Authorization to Test (IATT)
- Denial of Authorization to Operate (DATO)

### Authorization to Operate (ATO)

Authorization to Operate (ATO) is a decision that permits an information system to function within an organization's environment. It indicates that the **system meets all security requirements** and can operate with an acceptable level of risk.

- Granted after a comprehensive review of the system’s security controls
- Valid for a specific period, after which it must be reassessed
- Requires continuous monitoring to ensure ongoing compliance

### Interim Authorization to Operate (IATO)

Interim Authorization to Operate (IATO) allows a system to operate **temporarily**, typically while certain security issues are being addressed. It is used when there is an urgent need to use the system despite incomplete compliance.

- Issued with specific conditions and limitations
- Time-bound, requiring resolution of outstanding security issues
- Ensures essential functions can continue while improvements are made

### Interim Authorization to Test (IATT)

Interim Authorization to Test (IATT) permits a system to be tested in an operational environment to evaluate its performance and security controls. It allows **testing without a full accreditation decision.**

- Granted to assess the system's impact on the operational environment
- Includes conditions to minimize potential risks during testing
- Enables identification of any security vulnerabilities before full deployment

### Denial of Authorization to Operate (DATO)

Denial of Authorization to Operate (DATO) is a decision that prohibits a system from operating within an organization due to unacceptable security risks. It reflects serious deficiencies in the system's security posture.

- Issued when a **system fails to meet** security requirements
- Requires corrective actions before reconsideration for operation
- Ensures systems with significant vulnerabilities do not compromise organizational security
