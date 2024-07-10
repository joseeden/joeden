---
title: "Asset and Change Management"
tags: [Cybersecurity]
sidebar_position: 70
last_update:
  date: 1/30/2024
---


##  Difference between Asset and Change Management

Asset management optimizes the performance and lifecycle of assets, while change management ensures smooth transitions during organizational changes. Together, they enhance resource utilization and facilitate successful transformations.


## Asset Management

Asset management is a systematic process of developing, operating, maintaining, and selling assets in a cost-effective manner.

- Tracks and manages physical and digital assets.
- Enhances decision-making through accurate data.
- Facilitates compliance with regulatory requirements.
- Improves lifecycle management from acquisition to disposal.

Components of asset management:

1. Assignment/Accounting 
2. Monitoring/Tracking 

### Assignment/Accounting

Assignment and accounting in asset management involve the proper allocation and financial tracking of assets to ensure efficient utilization and accountability.

- Designate departments or individuals as owners of the assets.
- Ensures proper documentation and accountability.
- Plans for asset acquisition, maintenance, and disposal.
- Assets are also classified based on function, value, or other relevant parameters.

### Monitoring/Asset Tracking

**Monitoring** involves keeping a close watch on the utilization of assets to maintain operational efficiency and compliance.

- Maintaining an inventory or record of every single asset and their specifications.
- Checking the condition and performance, plus scheduling maintenance if needed.

**Asset tracking** takes asset monitoring a bit further by monitoring and managing the location, assigned users, and any other relevant details.

- Location, status, and condition of physical assets can be managed through specialized software.
- Tracking technologies like RFID and GPS can be used track asset location.

**Enumeration** involves identifying and counting assets, especially in large organizations or during times of asset procurement or retirement.

- Using software tools and scanners to find which assets are connected to a given network.
- Determines type of software or OS are being used, as well as the overall status or health of each asset.

### Mobile Device Management (MDM)

Mobile Device Management (MDM) enables organizations to manage and secure mobile devices across various platforms (smartphones, tablets).

For more information, please see [Mobile Device Management.](../005-Security-Architecture/070-Evolution-of-Security.md#mobile-device-management)

### Asset Disposal and Decommissioning 

Special Publication 800-88, commonly referred to as "**Guidelines for Media Sanitization.**", provides organizations with guidance on how to conduct sanitization, destruction, and certification for asset disposal and decommissioning processes.

**Sanitization**

- Ensures that sensitive information is securely erased before disposal.
- Complies with industry standards and regulations for data protection.
- Verifies that data has been properly sanitized through audit trails.
- Sanitization techniques:
    - Overwriting
    - Degaussing
    - Secure Erase
    - Cryptographic Erase 
- For more information, please see [Data Media Sanitization.](../006-Security-Operations/004-Destroying-Data.md#data-media-sanitization)

**Destruction**

- Physically destroys media, such as hard drives and tapes, to prevent data recovery.
- Ensures complete destruction of physical devices to avoid data breaches.
- Follows secure disposal protocols to comply with legal and environmental standards.
- Destruction techniques (depending on the media type):
    - Shredding
    - Incinerating 
    - Pulverizing 
    - Melting

**Certification**

- Provides documentation to certify that assets have been properly sanitized or destroyed.
- Maintains records for compliance audits and regulatory requirements.
- Assures stakeholders that data privacy and security standards have been met.


## Change Management

Change management is a structured approach to transitioning individuals, teams, and organizations from a current state to a desired future state.

- Plans and implements changes effectively.
- Minimizes resistance and disruption during transitions.
- Aligns changes with organizational goals.
- Monitors and evaluates impact of changes.
- Provides training and support for affected personnel.

Change Management typically involves:

1. The need for change is identifies (RFC). 
2. A plan is developed. 
3. Change is implemented, often in stages. 
4. A review is conducted to assess the success of the change.

### Impact Management Analysis

Impact Management Analysis is a process used to assess the potential fallout of changes within an organization. This analysis helps to understand the change's potential impact to the organization and the broader environment.

- What could go wrong?
- What would be the immediate effects? 
- How would the long-term operations be impacted? 
- Are there unforeseen challenges that might cause an issue?

### Considerations

1. **Use of scheduled maintenance windows**
   - Schedule changes during off-peak hours to minimize impact on operations.
   - Communicate clearly with all stakeholders about the timing and expected duration.
   - Monitor systems closely during the maintenance period to address issues promptly.
   - Should not restrict change implementation, as emergencies may require immediate action.
   - Emergency change can be proposed for critical patches, which can implemented within a few hours.

2. **Creation of a backout plan**
   - Develop a detailed plan for reverting changes if they lead to unexpected problems.
   - Include steps for safely rolling back to the original state to avoid disruptions.
   - Test the backout process to ensure it can be executed smoothly and quickly.

3. **Testing of results**
   - Conduct thorough testing before full deployment to identify any potential issues.
   - Use both unit testing and integration testing to ensure all components work together.
   - Gather feedback from end-users to validate the effectiveness of the changes.

4. **Use of Standard Operating Procedures (SOPs)**
   - Establish SOPs to standardize processes and ensure consistency in change management.
   - Train staff on the SOPs to ensure they are followed correctly during the implementation.
   - Regularly review and update SOPs to incorporate lessons learned from previous changes.

### Standard Operating Procedures (SOPs)

Standard Operating Procedures (SOPs) are detailed, written instructions to achieve uniformity in the performance of a specific function. They are essential in change management to ensure that processes are executed consistently and efficiently across an organization.

- Provide clear, step-by-step instructions to ensure consistency and compliance.
- Streamline operations by providing a set of best practices for employees to follow.
- Are adaptable, allowing for updates as processes evolve.

### Technical Implications

When implementing changes in an organization, it's crucial to consider the technical impacts these changes may have on existing systems and processes. 

- **Allow and Deny Lists**
  - Used by routers and firewalls to allow or deny access to resources.  
  - Define which entities (users, devices, IP addresses) are permitted or denied access.
  - Changes on the access can inadvertently grant or restrict access to critical services.
  - Important for maintaining security by controlling access based on predefined criteria.

- **Restricted Activities**
  - Identify if there are restricted activities contained in the change before green-lighting.
  - Changes that could include accessing a protected database or shutting down a server.
  - Helps in preventing actions that could compromise system integrity or security.

- **Downtime**
  - Plan for potential downtime required for implementing changes to systems or infrastructure.
  - Communicate downtime schedules to minimize disruption to operations.

- **Service and Application Restarts**
  - Prepare for restarts of services and applications as part of the change implementation.
  - Simple restarts can be disruptive if they're applied to domain controllers.
  - Its not just about the time to restart, but also the data that may be lost in transit.
  - Ensure all stakeholders are aware and ready for potential disruptions during restarts.

- **Legacy Applications**
  - Assess the compatibility of legacy applications with new changes.
  - Still robust and reliable, but are sensitive to changes because they're less supported.
  - Plan for necessary updates or replacements to ensure continued functionality.

- **Dependencies**
  - Identify and map dependencies between different systems and components.
  - Ensure that changes do not adversely affect interdependent systems and applications.

### Documenting Changes 

Documenting changes provides a clear history of the what, when, and why for accountability and future reference.

- **Version Control**
  - Track changes over time to ensure historical accuracy.
  - Facilitate rollback to previous versions if needed.
  - Maintaining different version allows tracking of the evolution of the project.
  - Centralized place to ensure continuity and stability in the environment. 

- **Proper Documentation Updates**
  - Review and update documents to record every change.
  - Update diagrams to ensure they reflect the current state of your systems.
  - Revise policies and procedures to prevent issues from reoccuring.
  - Update change requests and associated trouble tickets.

- **Maintenance of Various Associated Records**
  - Archive related change management documents for future reference.
  - Ensure records are organized and easily accessible for audits.




