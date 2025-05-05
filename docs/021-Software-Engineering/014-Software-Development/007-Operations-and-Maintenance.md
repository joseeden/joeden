---
title: "Operations and Maintenance"
description: "Post-deployment of software"
tags: [Computer Science, Application Development, Software Development]
sidebar_position: 7
last_update:
  date: 6/12/2020
---

## Overview 

After software development concludes, it enters the operations and maintenance phase. This phase ensures the continued functionality, stability, and evolution of the software, whether it's for internal use or customer sales.

## Key Phases

The software lifecycle doesn’t end with development. These key phases ensure the software remains functional, stable, and adaptable.

- **Operations and Maintenance**
    - Manages software post-deployment with updates, bug fixes, and monitoring.
    - Ensures software aligns with user needs and business goals.

- **Change Management**
    - Manages code changes to prevent disruptions.
    - Controls updates through testing and approval processes.

- **Responsibility for Software**
    - Organization maintains software after development.
    - Applies updates and addresses support requests until decommissioned.

## Internal vs. Customer Software

Managing software differs based on its end users.

- **Internal Software**
    - Used within the organization, maintained by in-house teams.
    - Requires ongoing updates and fixes to meet internal needs.

- **Customer Software**
    - Developed for external clients, with higher demands.
    - Requires structured support for bug fixes, requests, and updates.


## Change Management Plan 

A Change Management Plan ensures that all project changes are reviewed, approved, and tracked in a structured way. Without it, changes can cause delays, confusion, and quality issues.

* All changes must be proposed, reviewed, tested, and approved formally
* A lack of process often leads to project delays and team frustration
* Change requests must be formally submitted (e.g., via a ticket system)
* Every request is evaluated for business need, feasibility, and effort
* Cost estimates (time and money) must be approved
* Justifying a change is separate from getting it approved

**Change Control Board (CCB)**

* Reviews all viable changes in scheduled meetings
* Decides whether changes should be tested, documented, and implemented
* Reestablishes baselines and metrics after approval

**If approved:**

* The security architect updates the project plan
* Applications must be stored and managed centrally
* Security controls must remain enforced
* Developers must use controlled code libraries
* All updates must be made to source code—not live production code

**Plan Components:**

* Track and log every change request
* Analyze and document the impact of each change
* Approve or reject changes formally
* Update project documents and plans for all approved changes
* Inform all stakeholders about any changes

## Sample Change Control Procedure 

Below is a sample procedure that outlines how changes should be handled in a controlled and organized way:

1. **Submit Change Request**

   - Submit a formal ticket in the Change Management System

2. **Analyze the Request**

   - Evaluate need, feasibility, and potential impact
   - Develop a rough implementation plan
   - Estimate cost (time and resources)
   - Review potential risks, including security impacts

3. **Document Analysis**

   - Create a detailed report
   - Report should contain findings and recommendations

4. **Submit to Change Control Board (CCB)**

   - Present request and findings for review and approval

5. **Plan Implementation** *(if approved)*

   - Finalize the change strategy based on feedback
   - Consider the approach and resource allocation

6. **Make the Change**

   - Modify code or adjust product functionality as needed

7. **Link Code Changes to Request**

   - Associate code commits with the original change ticket 
   - This ensures traceability

8. **Test the Change**

   - Submit for quality assurance and begin testing

9. **Repeat Testing as Needed**

   - Continue unit and integration tests until standards are met
   - Ensure *Separation of Duties* (developers should not test their own changes)

10. **Update Version Number**

    - Assign and record a new version to reflect the change

11. **Report to Management**

    - Summarize outcomes and confirm successful implementation

12. **Establish New Baseline**

    - Set this version as the new reference for future changes


## Change Management Process

Change management consists of three key elements:

1. Request Control
2. Change Control
3. Release Control

### 1. Request Control

Manages how modification requests are handled and prioritized.

- Users submit modification requests.
- Managers assess and prioritize based on cost and impact.
- Only high-priority requests move forward.

### 2. Change Control

Ensures modifications are reviewed and approved before implementation.

- Developers create a **Request for Change (RFC)** document.
- The **Change Advisory Board (CAB)** reviews and approves changes.
- Approved modifications proceed to implementation.

### 3. Release Control

Oversees testing and deployment of approved changes.

- **Quality Assurance (QA)** tests code to verify it meets requirements.
- Once approved, the **Release Manager** deploys the code to production.
- Developers cannot update production directly, ensuring controlled releases.


## Importance of Structured Processes

While these processes might appear bureaucratic, they are essential to:
- Maintain software stability.
- Ensure responsiveness to customer or internal needs.
- Provide documentation and accountability for all changes.