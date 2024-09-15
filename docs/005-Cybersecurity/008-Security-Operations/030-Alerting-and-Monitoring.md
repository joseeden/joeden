---
title: "Alerting and Monitoring"
description: "Alert, monitor, and scan"
tags: [Security, Cybersecurity, Security Operations, Vulnerability Management]
sidebar_position: 30
last_update:
  date: 1/30/2024
---


## Alerting

The process of generating notifications or alarms when specific conditions or thresholds indicative of security issues are met. Its purpose is to provide timely warnings about potential security threats or anomalies.

Components:

  - Automated Alerts
  - Custom Alerts
  - Real-Time Notifications

## Monitoring

The continuous observation and analysis of system activities, network traffic, and security events. Its purpose is to detect, analyze, and respond to security incidents and ensure ongoing system health.

Components:
  - Log Monitoring
  - Network Monitoring
  - Behavioral Monitoring
  - Endpoint Monitoring


## Monitoring Resources

Monitoring resources involves continuously tracking and analyzing various system and network components to ensure optimal performance and security.

### System Monitoring

Observing server and application performance metrics such as utlization and consumption of its resources in order for us to identify any potential issues that could affect the system's stability.

**Baseline** are established performance metrics for standard behavior of a system or application.

  - CPU Usage, memory utilization, disk activity, network traffic, etc.
  - Reference point to compare against when monitoring systems over time.
  - Deviations can mitigate potential issues and performance problems.
  - For more information, please [Security Baselines](/docs/005-Cybersecurity/008-Security-Operations/049-Security-Baseline.md)


### Application Monitoring

Keeping an eye on the health and performance of software applications to ensure they are running smoothly.

- Also known as **Application Performance Monitoring**.
- Tracking errors, bottlenecks, and other potential issues that can affect performance. 
- If response time is slow, this could indicate a need for additional resources.

### Infrastructure Monitoring

Infrastructure monitoring involves the continuous observation and analysis of an organization's physical and virtual IT infrastructure to ensure optimal performance, availability, and security

- Using Solarwinds or PRTG to monitor network infrastructure.
- Determine bandwodth utilization, network traffic, status of devices, etc. 
- Overloaded device could mean a need for additional capacity.


## Alerting and Monitoring Activities 

Alerting and monitoring activities are crucial for maintaining the integrity, availability, and performance of an organization's infrastructure.

- Log Aggregation 
- Alerting
- Scanning
- Reporting 
- Archiving 
- Alert Response and Remediation


### Log Aggregation

The process of collecting and consolidating log data from various sources into a central repository. It facilitate comprehensive analysis and correlation of events.

- Helps in troubleshooting system issues, security incidents, and performance problems.
- Gather logs from servers, applications, and network devices.
- Centralized log management helps us correlate events across different systems.
- Ensure logs are structured and formatted consistently.

**GDPR Compliance**

- Requires the business to maintain a comprehensive set of logs.
- Log aggregation helps in complying with GDPR and HIPAA requirements.
- Logs can easily be reviewed by auditors since they are all in one place.


### Alerting

The mechanism for generating notifications when specific events or thresholds are met.

- Provide timely warnings about potential security incidents or performance issues.
- Send alerts via email, SMS, or monitoring dashboards.
- Ensures issue resolution, incident detection, and compliance is practiced.
- Configure alert rules based on predefined conditions.
- Prioritize alerts based on severity and impact.

### Scanning

Systematically checking systems, networks, and applications for vulnerabilities, configuration issues, or policy violations.

- Identify security weaknesses and ensure compliance with standards.
- Perform regular vulnerability scans using automated tools.
- Conduct compliance scans to ensure adherence to policies.
- Analyze scan results and prioritize remediation efforts.

Tools:

- Nessus 
- OpenVAS 
- Qualys

### Reporting

The creation and distribution of reports based on monitored data and alerts. These reports can provide insights into system performance, security incidents, compliance status, and other aspects.

- Inform stakeholders about the security posture and performance of systems.
- Generate regular and ad-hoc reports on security incidents, performance metrics, etc.
- Customize reports for different audiences (e.g., technical teams, management).
- Use visualization tools to present data clearly and effectively.
- Tools like Splunk or SumoLogic can be used to generate reports.

### Archiving

The process of securely storing log data and reports for long retention periods of future reference and compliance.

- Maintain a historical record for analysis, auditing, and regulatory requirements.
- Implement data retention policies to determine the duration of storage.
- Use secure storage solutions to protect archived data.
- Ensure archived data is easily retrievable for investigations and audits.



## Alert Response and Remediation

The actions taken in response to alerts to address and mitigate identified issues.

- Investigate alerts to determine the root cause of issues.
- Implement remediation steps to resolve vulnerabilities or performance bottlenecks.
- Document response actions and lessons learned for continuous improvement.

### Remediation

**Remediation** refers to steps used to resolve identified issues or vulnerabilities which could include:

- Patching outdated software 
- Reconfiguring services 
- Modifying an application's source code.

### Validation

**Validation** involves verifying that the remediation implemented was actually successful and has effectively addressed the given vulnerability.

- **Quarantining** 
    - Isolating a system to prevent the spread of threat.
    - Limits the threat's potential impact while security team is working to remove it.

- **Alert Tuning**
    - Adjust the alert parameters to reduce the errors and [false positives](/docs/005-Cybersecurity/008-Security-Operations/020-Vulnerability-Management.md#analyzing-vulnerabilities).
    - Improves the overall relevance of the alerts being generated by the given system.

