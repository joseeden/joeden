---
title: "Maturity Models"
description: "Software Development Maturity Models"
tags:
- Computer Science
- Application Development
- Software Development
sidebar_position: 5
last_update:
  date: 6/12/2020
---


## Overview

Maturity models help organizations assess their software development practices and progress toward more effective and secure coding. It identify the important components of software development processes and then organize them in an evolutionary scale that proceeds from ad hoc to mature.

## Software Capability Maturity Model (CMM)

Developed by the Software Engineering Institute (SEI), this model outlines a five-level progression to guide organizations on how to improve their software development processes.

1. **Initial**  
    - Organizations are still new to software development.
    - No defined development process.
    - Doesn't follow sound engineering practices.
    - Unstructured development, leading to inconsistent results.

2. **Repeatable**  
    - Basic processes, like code reuse, are established.  
    - Development results become predictable.
    - Key activities:
        - Requirements management
        - Subcontract management 
        - Software project planning, tracking, and oversight
        - Configuration management
        - Quality assurance

3. **Defined**  
    - Formal practices are documented and followed.  
    - Development efforts adhere to consistent procedures.
    - Key activities: 
        - Organization process focus
        - Organization process definition
        - Training programs
        - Integrated software management
        - Software product engineering
        - Intergroup coordination
        - Conducting peer reviews

      :::info 

      The CISSP official study guide shows **Defined** comes before **Managed.**

      However, the official [CMMI Levels of Capability and Performance](https://cmmiinstitute.com/learning/appraisals/levels) shows **Managed** comes before **Defined.**

      :::

4. **Managed**  
    - Quantitative measures assess development progress.  
    - Effectiveness of practices is regularly evaluated.
    - Key activities:
        - Quantitative process management
        - Software quality management 

5. **Optimizing**  
    - Continuous improvement based on feedback.  
    - Includes defect prevention and process management.
    - Key activities:
        - Defect prevention 
        - Technology change management
        - Process change management

## Capability Maturity Model Integration (CMMI)

**Capability Maturity Model Integration (CMMI)** is a comprehensive set of guidelines to improve software and system development processes. It covers different phases of a project and provides best practices for each phase.

- CMMI is a modern evolution of **Capability Maturity Model (CMM)**
- CMM focused mainly on software.
- CMMI expands to systems engineering, hardware, and services.

CMMI is **not specifically about security**, but it defines procedures and practices that help organizations develop mature and reliable processes.

Both CMM and CMMI use the same five maturity levels:

- The original CMM (1991) introduced the 5-level structure.
- CMMI later adopted and refined these levels.

The five maturity levels are:

1. **Initial** – ad hoc, chaotic processes
2. **Repeatable** – basic project management, repeatable successes
3. **Defined** – standardized and documented across the organization
4. **Managed** – quantitatively measured and controlled
5. **Optimizing** – continuous process improvement

:::info 

In some CMMI versions, the fourth level is officially called **Quantitatively Managed**, instead of just “Managed.”

At this level, the organization uses data and metrics to drive decisions. Processes are measured and predictable, with improvements aligned to stakeholder needs.

:::

## Software Assurance Maturity Model (SAMM)

The **OWASP Software Assurance Maturity Model (SAMM)** helps organizations improve secure software development by defining target maturity levels across five key business functions.

1. **Governance**

   - Sets security policies and development standards
   - Defines roles and responsibilities
   - Ensures management support for security practices

2. **Design**

   - Builds security into system architecture
   - Identifies threats early through modeling
   - Ensures security requirements are included in design

3. **Implementation**

   - Applies secure coding practices
   - Uses code reviews and automated scanning
   - Reduces vulnerabilities during development

4. **Verification**

   - Tests applications for weaknesses
   - Validates compliance with security requirements
   - Uses tools and manual techniques to confirm controls

5. **Operations**

   - Monitors deployed applications
   - Handles patching and updates
   - Responds to incidents involving software


## IDEAL Model

The IDEAL Model is another maturity model designed for process improvement and focuses more on organizational development. The IDEAL acronym represents the five key phases in the process:

1. **Initiating**  
    - Secure leadership commitment for improvement.  
    - Define clear objectives and goals.

2. **Diagnosing**  
    - Assess current processes to identify strengths and weaknesses.  
    - Gather data through interviews and surveys.

3. **Establishing**  
    - Create a detailed improvement plan with actions and timelines.  
    - Assign teams and responsibilities for implementation.

4. **Acting**  
    - Implement changes in a controlled manner.  
    - Monitor progress and adjust as necessary.

5. **Learning**  
    - Evaluate outcomes and document lessons learned.  
    - Use feedback to inform future projects.  


## Importance of Maturity Models

Using maturity models helps organizations improve their software development practices and outcomes.

- Strategic benchmarking to assess capabilities and growth areas
- Guidance for implementing best practices for quality and efficiency
- Support for anticipating and mitigating project risks
- Promotes  stronger security measures through systematic evaluations  
