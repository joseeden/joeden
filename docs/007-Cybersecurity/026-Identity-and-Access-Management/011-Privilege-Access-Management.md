---
title: "Privilege Access Management"
description: "Implementing Principle of Least Privilege"
tags: [Security, Cybersecurity, Access Management, Access Control, IAM]
sidebar_position: 11
last_update:
  date: 1/30/2024
---

## Overview

The **Principle of Least Privilege** dictates that users and programs should only have the minimum access needed to do their jobs. Access is limited to specific systems and functions required for their role. To protect confidentiality, integrity, and availability, this principle is applied through **Privileged Access Management (PAM)**, which restricts access to only what’s necessary.

- **Access Control Examples**
  - Billing personnel access consumer financial data.
  - Limited authority for data modification to a select few.

- **Temporary or Limited Access**
  - Allowed for specific time periods or business hours.
  - Access rules restricting fields based on roles.

- **Regulatory Compliance**
  - Healthcare environment compliance (e.g., HIPAA).
  - Legal and privacy laws govern access.

- **Monitoring and Alarms**
  - Systems monitor access to private information.
  - Unauthorized attempts trigger alarms.

- **Security Measures**
  - Multi-factor authentication for critical access.

## Features 

### Password Vaulting

Password vaulting is a crucial component of PAM, providing secure storage for sensitive credentials and ensuring that only authorized users can access them.

- Centralized vaults protect credentials from unauthorized access.
- Passwords can be automatically rotated to enhance security.
- User access can be granularly controlled based on roles.

### Command Proxying

Command proxying is a method used in PAM to control access to sensitive commands and scripts, ensuring that only authorized personnel can execute them.

- Permissions are granted based on user roles.
- Commands executed through the proxy can be monitored in real time.
- Activities performed via the proxy can be recorded for audits.

### Monitoring

Monitoring is an essential aspect of PAM, involving the tracking of user activities to detect unauthorized access.

- Logs provide insights into user behavior and system performance.
- Real-time alerts notify admins of suspicious activities.
- Audit trails ensure compliance and aid investigations.

### Credential Management

Credential management within PAM focuses on securely storing and controlling access to user credentials.

- Centralized storage reduces the risk of credential theft.
- Role-based access limits visibility to necessary credentials.
- Regular audits help maintain security by removing outdated credentials.


### Account Audits

Account audits in Privileged Access Management (PAM) help prevent users from having more access than they need.

- Reviews user permissions to match job roles
- Ensures access stays aligned with the principle of least privilege
- Helps reduce the risk of unauthorized access or misuse
- Identifies and removes excessive or outdated privileges



## Use Case 

Excessive privileges leading to a ransomware attack and underscores the need for controlled access.

- **Excessive Privileges**
  - IT department's inclusion in Domain Admins group.
  - Ransomware attack due to unrestricted access.

- **Damage Limitation**
  - Administrator privileges used selectively.
  - Routine tasks performed with standard access, reducing potential harm.

To enhance security, we can transition from static to just-in-time access. 

- **Static Privileges**
    - Continuous 24/7 access with full privileges.
    - Security relies on the login process.

- **Just-in-Time PAM**
    - Role-based subset privileges triggered on-demand.



## Privileged Accounts

Privileged accounts extend beyond regular user permissions, catering to diverse roles such as systems administrators, IT support, security analysts, and project-specific teams. 

### Classes of Privileged Users

Privileged users have varied responsibilities depending on their role.

- Systems administrators: Oversee OS, applications, and performance.
- Help desk/IT support: Manage endpoints, servers, and applications.
- Security analysts: Quick access to IT infrastructure and data.

### Delegation Considerations

When delegating authority, it's important to ensure alignment with the user's level of trust.

- Delegated authority should match the user’s trustworthiness.
- Measures should focus on preventing misuse or abuse of privileges.


### Risk Mitigation Measures

Mitigating risks tied to privileged accounts involves strict access control and monitoring.

- **Detailed Logging**
  - Essential for tracking actions and enforcing administrative controls.

- **Stringent Access Control**
  - Nonprivileged users should use MFA.
  - Privileged users require additional layers of authentication.
  - Explore just-in-time identity for specific access needs.

- **Trust Verification**
  - Background checks, nondisclosure agreements, and policies.
  - Financial investigations with periodic updates for privileged accounts.

### Audit Enhancement

Privileged accounts require stronger audit measures to ensure proper use.

- **Monitoring and Auditing**
  - Privileged accounts need more frequent and detailed monitoring.
  - Audit logs should be regularly reviewed with increased scrutiny compared to standard accounts.

## Segregation of Duties 

Segregation of duties (SoD) or "Separation of Duties" ensures that no single person has control over an entire high-risk transaction. It divides transactions into parts, necessitating different individuals for each segment to prevent fraud and errors.

- **Fraud Detection and Prevention**
  - Ensures different individuals handle distinct transaction phases.
  - Requires managerial approval before critical actions.

- **Collusion Awareness**
  - Guards against collusion where individuals collaborate to bypass controls.

- **Dual Control Implementation**
  - Utilizes two combination locks on vault doors.
  - Requires collaboration for access, enhancing security.

## Two-Person Integrity

The two-person rule mandates at least two individuals to be present simultaneously in an area, ensuring increased security, reducing insider threats, and providing assistance during emergencies.

Separation of duties ensures that sensitive administrative tasks are split among multiple individuals to minimize the risk of misuse or fraud.

## Authorized Versus Unauthorized Personnel

Authentication ensures the subject's legitimacy, and authorization determines their allowed actions. This is typically governed by a security matrix indicating pre-approved access levels.

- **Example: Physical Access Control**
  - **Scenario:** Presenting an ID badge to a data center door.
  - **Process:**
    - System checks ID number.
    - Compares against the security matrix.
    - Unlocks the door for authorized IDs; remains locked if not.

- **Example: File Deletion Authorization**
  - **Scenario:** User attempting to delete a file.
  - **Process:**
    - File system checks user permissions.
    - Authorizes deletion if permissions match.
    - Displays error message and retains file if unauthorized.

## How Users Are Provisioned

Provisioning new user accounts or altering privileges is essential in various scenarios:

- **New Employee Onboarding**
    - Hiring manager requests new user ID creation from the security administrator.
    - Request specifies access levels, with potential need for additional authorization.
  
- **Change of Position**
    - Employee promotion triggers adjustments in permissions and access rights.
    - New role defines added privileges, and unnecessary access is revoked.

- **Separation of Employment**
    - Upon termination, accounts are disabled, adhering to company policy.
    - Disabled accounts may be retained for a period before deletion for audit trail integrity.
    - Removal from security roles and access profiles prevents unauthorized data access.

Note: 

- Avoid copying user profiles for new users to prevent "permission or privilege creep." 
- Standard roles are recommended for creating new users based on established standards rather than duplicating an existing user's profile.




