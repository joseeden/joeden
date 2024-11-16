---
title: "Azure Security"
description: "Azure Security"
tags: [Cloud, Microsoft Azure, DevOps, Security, Certifications]
sidebar_position: 1
last_update:
  date: 7/18/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Shared Responsibility Model

The shared responsibility model outlines the distribution of security responsibilities between the organization and the cloud provider (Microsoft) based on the hosting environment (on-premises or cloud) and workload type (SaaS, IaaS, PaaS). 
- Critical for organizations considering a move to the cloud.
- Defines security tasks handled by the cloud provider (Microsoft) and those handled by the organization.

### On-Premises

- **Customer Responsibility:**
    - Responsible for all aspects of security and operations.
    - Complete ownership and control over security and operational aspects.

### IaaS (Infrastructure as a Service)
  
- **Cloud Provider Responsibility:**
    - Tangible aspects (servers, network hardware).
    - Hypervisor and physical datacenters.

- **Customer Responsibility:**
    - Securing and managing operating systems on servers.
    - Network configurations.
    - Deployed applications.
    - Identity management.
    - Data security.

### PaaS (Platform as a Service)

- **Cloud Provider Responsibility:**
    - Responsibilities from IaaS.
    - Additional responsibility for managing and securing network controls.
 
  - Cloud provider assumes more responsibilities compared to IaaS.

- **Customer Responsibility:**
    - Partial responsibility for securing and managing applications.
    - User identities.
    - Data.

### SaaS (Software as a Service)

- **Cloud Provider Responsibility:**
    - Extensive responsibility as the provider delivers the application as a service.

- **Customer Responsibility:**
    - Focus on ensuring proper data classification.
    - Shared responsibility for managing users and endpoint devices.
    - Provider handles underlying components, emphasizing service delivery.

  
## Data Protection and Identity

Azure provides various measures for data protection and identity management.
- Includes tools like encryption, access control, Key Vaults, and information protection.
- Ensures secure handling of sensitive information and identity management.
- Supports compliance and enhances overall security posture.


## Role-Based Access Control (RBAC)

RBAC allows precise control over permissions within your Azure environment.
- Defines custom or pre-defined roles to manage user access.
- Assigns roles to users or groups, ensuring appropriate access levels.
- Includes roles such as contributor, owner, reader, and various administrative roles.

## Azure Security Services 

These Azure security services collectively provide a comprehensive approach to securing workloads, managing secrets, monitoring and analyzing data, and responding to security threats across the enterprise.

### Azure Security Center

Azure Security Center is your go-to for comprehensive security management across your resources.
- Provides unified security management and advanced threat protection.
- Offers actionable recommendations and insights to enhance security.
- Foundational layer for monitoring the security of your Azure resources.


### Azure Policy

Azure Policy ensures that your deployments and configurations comply with organizational standards.
- Enforces rules and standards across your Azure environment.
- Assesses compliance with corporate and regulatory standards like GDPR.
- Helps maintain consistent governance and compliance at scale.

### Azure Blueprints

Azure Blueprints streamline the process of deploying resources according to organizational standards.
- Combines templates and policies to ensure consistent deployments.
- Includes predefined blueprints like the Security and Compliance GDPR Blueprint.
- Facilitates adherence to best practices and regulatory requirements.

### Microsoft Defender for Cloud

Microsoft Defender for Cloud is a security posture management and threat protection tool that is designed to protect workloads, track security posture, and streamline security management.

- **Secure Score**
    - Aggregated value representing security posture.
    - Higher score indicates lower identified risk.

        |[](/img/docs/azure-secure-scoreee.png)

- **Security Recommendations**
    - Guidance and tasks to harden resources.
    - Implement within Defender for Cloud.

- **Security Alerts**
    - Identifies threats and generates alerts.
    - Alerts can be viewed in Azure portal or sent via email.

### Defender Features

- **Microsoft Defender for Servers**
    - Advanced feature in Defender for Cloud that allows you to add threat detection to both Windows Machines and Linux machines, whether they're in Azure, on-prem, or in a multi cloud environment.

- **Defender for Storage**
    - Detects attempts to access or exploit storage accounts and provides you with security alerts and recommendations.

- **Defender for SQL**
    - Discovers and helps mitigate database vulnerabilities

- **Microsoft Defender for Containers**
 
  - Cloud-native solution for securing containers.

- **Microsoft Defender for App Service**
    - identifies attacks that target apps running on the app service

- **Defender for Key Vault**
    - Protects your key vaults by detecting unusual attempts to access them.

- **Defender for Resource Manager**
    - Automatically monitor resource management operations that happen within the organization.
    - Monitors these operations whether they're performed via the Azure portal, or the Azure CLI, Azure Rest APIs, or via other Azure programmatic clients.
    - Detects threats and alerts you about suspicious activity that it identifies.

- **Defender for DNS**
    - Detects suspicious activities like:
        - DNS attacks
        - Communications with domains used for malicious activities like phishing or crypto mining
    - Identify malware that's communicating with its control servers.
    - Detect data exfiltration from Azure resources through DNS tunneling.
    
- **Microsoft Defender Open-Source Relational Databases**
    - Provide alerts when it detects suspicious database access and query patterns, or when it detects suspicious database activities.

    

## Managing Security

Azure provides several tools for managing security effectively.
- Azure Sentinel detects and manages threats with comprehensive monitoring.
- Azure Information Protection helps classify and protect sensitive information.
- Azure Key Vault securely stores keys, passwords, and other secrets.

### Azure Key Vault

Azure Key Vault is a cloud solution for centrally storing and managing secrets, keys, certificates.

- Securely store things like tokens and passwords
- Key management for encryption keys
- Provision, manage, deploy TLS/SSL certificates
- Designed in such a way that Microsoft cannot, and does not, extract your data

**Authentication and Authorization**
- Authentication by Azure Active Directory.
- Authorization via role-based access control (RBAC) or Key Vault access policies.
- Supports hardware security modules (HSMs) and FIPS 140-2 Level 2 validated HSMs.
  

### Azure Monitor

Azure Monitor collects resource and activity logs and other monitoring data that can be analyzed to provide information on all resources across your entire environment.

**Events**
- Typically created by applications or services you are running 
- Usually provide information indicating when a specific resource was created or modified or when an error was detected in an application

**Features**

1. **Log Analytics:**
   - Used to write log queries and analyze log data.
   - Enables querying and extracting insights from collected log information.

2. **Data Explorer Analysis Engine:**
   - Interactively analyze log data.
   - Provides a powerful engine for working with large datasets.

3. **Application Insights Analytics Console:**
   - Located in the Azure portal.
   - Allows writing log queries and interactively analyzing log data.
   - Primarily used for application performance monitoring.

4. **Visualization:**
   - Render log data as tables or charts.
   - Pin visualizations to the Azure dashboard for quick access.

5. **Workbooks:**
   - Create workbooks to combine multiple sets of data into a single report.
   - Customize and organize data visualizations for better insights.

6. **Alert Rules:**
   - Configure log alert rules based on query results.
   - Receive notifications or trigger automated actions when defined conditions are met.

7. **Access Tools:**
   - Utilize various tools to access log query results.
     - Azure CLI
     - Azure PowerShell
     - REST API
     - Custom applications

8. **Building Workflows:**
   - Use Azure Monitor Logs to build workflows.
   - Retrieve log data and copy it to external locations using tools like Logic Apps.

  

### Azure Sentinel

Azure Sentinel is a cloud-based security information event management (SIEM) solution. All-in one solution for:

- Intelligent security analytics
- Threat intelligence
- Alert detection
- Threat visibility
- Proactive hunting
- Threat response.

**Features:**

- Determines scope and root causes of potential security threats.
- Proactively hunt for security threats.
- Built-in automation and orchestration of common tasks.
- Integration with Azure technologies (logic apps, log analytics, AI).
- Community-provided workbooks, playbooks, hunting queries.

**Onboarding Sentinel:**

- Connect it first to existing data sources.
- Available connectors for Microsoft solutions and other sources.
- After connecting, monitor your data with  .

## Firewall

Azure Firewall enhances security by filtering network traffic.
- Provides advanced threat protection for your Azure environment.
- Analyzes and controls traffic, allowing only safe connections.
- Helps protect against various network-based attacks.  

## DDoS Protection

Azure DDoS Protection safeguards against distributed denial-of-service attacks.
- Filters malicious traffic to prevent disruptions to your services.
- Ensures legitimate traffic can access your applications.
- Continuously protects against large-scale attacks to maintain service availability.

## Compliance

Azure complies with a range of global standards and certifications.
- Adheres to ISO, IEC, and GDPR requirements.
- Ensures that your operations meet rigorous regulatory standards.
- Provides assurance of data protection and legal compliance.


## Identity and Access Management 

Azure provides a comprehensive suite of access management and identity services, allowing organizations to tailor their security measures based on specific needs. 

For more information, please see the [Azure IAM](../003-Azure-Services/007-IAM/001-Azure-IAM.md) page.
