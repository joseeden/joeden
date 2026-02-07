---
title: "SLA and Lifecycle"
description: "Service Level Agreement and Lifecycle Policy"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 10
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Azure Service Level Agreement (SLA)

When relying on Azure services to run critical applications, ensuring their reliability and performance is crucial for organizational success. Microsoft provides Service Level Agreements (SLAs) as guarantees, outlining the expected level of service and compensation if those levels are not met.

### Key Concepts
    
**1. Availability/Uptime**

  - Example: Azure App Service with a 99.95% SLA.
  - Calculation: Monthly calculation, considering the total minutes in a month.

      ![](/img/docs/azure-sla=claculations.png)

**2. Compensation**

  - Claim Process: Customers must submit a claim for compensation.
  - Credit Amounts: Vary based on the percentage of uptime:
      - 99% to 99.95%: 10% credit
      - 95% to 99%: 25% credit
      - Below 95%: 100% credit (rare)

          ![](/img/docs/azure-sla-compensation-claim-process-credit.png)

**3. Azure Service Health**

  - Monitoring Tool: Azure Service Health tracks outages and can be configured to send alerts.
  - Usage: Helps identify Azure-caused downtime for SLA claims.

**4. Free Tier Exclusions**

  - SLA Applicability: SLAs may not apply to free tiers; no guarantees for unpaid services.



### Factors Affecting SLAs

**1. Azure Virtual Machines (VMs)**

  - Uptime Guarantee: Varies based on VM type, disk type (HDD/SSD), and redundancy configurations.
  - Redundancy Options: Availability sets (99.95%) vs. Availability zones (99.99%).

**2. Cosmos DB**

  - Complex SLA: Offers guarantees for uptime, throughput, consistency, and latency.
  - Consideration: SLAs can be multifaceted and service-specific.

### Customer-Caused Exceptions

**1. SLA Exclusions**

  - Examples: Customer-induced downtime (e.g., shutting down a VM, application bugs).
  - Responsibility: Customers causing SLA deviations are not eligible for compensation.

  ![](/img/docs/azure-customer-caused-exceptions.png)

    
## Azure Modern Lifecycle Policy 

Microsoft Azure regularly introduces and retires services as part of its evolving ecosystem. These services undergo a lifecycle, from initial availability to retirement, with Microsoft following a **Modern Lifecycle Policy** that ensures users receive ample notice before the end of service support.

To check out the services in preview, go to the [Azure updates](https://azure.microsoft.com/updates/) page for announcements.

![](/img/docs/azure-updates-page.png)


### Preview Types 

These are the main types of preview:

- **Public Preview:**

  - Available in the Azure portal with "preview" next to the name.
  - Sometimes requires enabling preview features.

- **Private Preview:**

  - Accessible by registering as a test user.
  - Microsoft approval is required for access.

To try if there's a new Azure Portal Preview, navigate to:

```bash
www.preview.portal.azure.com
```


### Considerations for Preview Services

**Production Workloads:**

  - Although possible, running production workloads on preview services is not recommended.
  - Lack of service level agreement (SLA) means no performance guarantees.

**Pricing:**

  - Preview services may be free or have lower costs, but this isn't universal.


## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/)
