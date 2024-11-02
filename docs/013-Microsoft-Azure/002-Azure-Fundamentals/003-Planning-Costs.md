---
title: "Planning Costs"
description: "Planning your costs in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 3
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::




## Overview

Effective cost planning in Azure involves using tools to estimate and manage expenses.
- Utilize the Pricing Calculator to estimate costs before deploying resources.
- Use the Total Cost of Ownership Calculator to evaluate long-term value and potential savings.
- Implement best practices for monitoring and optimizing costs to stay within budget.


## Total Cost of Ownership

Moving IT workloads from an on-premises data center to Azure requires a thorough cost comparison between the two environments. Microsoft provides a valuable tool called the **Total Cost of Ownership (TCO) Calculator** to facilitate this process.

- Focuses on savings and benefits beyond initial costs, such as operational efficiencies and reduced downtime.
- Assesses financial outlook as well as the impact on scalability and performance.
- Helps in understanding the full value of transitioning to Azure.

This tool utilizes industry averages for both on-premises and Azure costs, helping organizations make informed decisions based on financial considerations.


### Using the TCO Calculator 

**1. Define Workloads**

    - Provide details for each workload, such as the number of servers, type of database, storage capacity, and networking requirements.
    - Categorize workloads into four main types: 
        - servers
        - databases
        - storage
        - networking.

**2. Adjust Assumptions**

    - Fine-tune assumptions used by the TCO Calculator to align with specific organizational parameters.
    - Consider factors like Microsoft Software Assurance coverage for Windows and SQL Server licenses.
    - Modify assumptions such as:
        - electricity costs
        - IT labor costs
        - currency

**3. View the Report**

    - Generate a detailed cost comparison report for a selected timeframe (one to five years).
    - Analyze potential cost savings by moving workloads to Azure.
    - Review breakdowns of on-premises and Azure costs.

### Sample Scenario 

Let's consider a scenario where an organization wants to migrate the following workloads to Azure:

- 20 Windows-based web servers running on Hyper-V.
- Two physical SQL Servers.
- One terabyte of storage.

**Using the TCO Calculator**

**1. Define Workloads (Servers)**

    - Workload Name: "Web servers"
    - Workload Type: Windows/Linux Server (Change to Virtual Machines)
    - Operating System: Windows
    - Number of Virtual Machines: 20
    - Virtualization: Hyper-V
    - Cores per Virtual Machine: 8
    - RAM per Virtual Machine: 16 GB

        |![](/img/docs/azure-tco-define-workloads.png)|
        |-|

**2. Define Workloads (Databases)**

    - Workload Name: "SQL Servers"
    - Number of Servers: 2
    - Processors per Server: 2
    - Cores per Processor: 4
    - RAM per Server: 8 GB
    - Azure Service: SQL Database Managed Instance
    - Backup Storage: 1,000 GB

        |![](/img/docs/azure-tco-databses.png)|
        |-|

**3. Define Workloads (Storage)**

    - Capacity: 1 TB
    - Backup Storage: 5 TB
    - Archive Storage: 10 TB 

        |![](/img/docs/azure-tco-storage.png)|
        |-|

**4. Define Workloads (Networking)**

    - Outbound Bandwidth: 10 TB 

        |![](/img/docs/azure-tco-networking.png)|
        |-|

**5. Adjust Assumptions**

    - Modify currency, electricity costs, and IT labor costs if necessary.
    - Indicate Microsoft Software Assurance coverage for Windows and SQL Server licenses.

        |![](/img/docs/azure-tco-adjust-assumptions.png)|
        |-|
        |![](/img/docs/azure-tco-adjust-other-costs.png)|
        |-|

**6. View the Report**

    - Examine potential cost savings over the selected timeframe.
    - Review detailed breakdowns of on-premises and Azure costs.
    - By following these steps, organizations can gain valuable insights into the financial aspects of migrating their workloads to Azure and make well-informed decisions based on the generated TCO report.

        |![](/img/docs/azure-tco-view-report.png)|
        |-|



## Azure Pricing Calculator

The Azure Pricing Calculator helps estimate the costs of Azure services before deployment.
- Allows for customizable options and scenario simulations to find cost-effective solutions.
- Provides detailed breakdowns to prevent unexpected expenses.
- Helps businesses budget accurately and optimize cloud spending.

Unlike the Total Cost of Ownership (TCO) Calculator, which focuses on migration-related savings, the Pricing Calculator provides estimates for running specific Azure services.

![](/img/docs/azure-pricing-calculator-calculate-your-estimated-hourly-or-monthly-costs.png)


### Estimating Costs

**1. Choose the Service**
    - Access the Pricing Calculator and select the Azure service you want to estimate costs for (e.g., App Service).
    - Alternatively, start typing the product name for quicker selection.

**2. Set Service-Specific Options**
    - Depending on the service (e.g., App Service), set options such as:
        - **Region**: Choose the region where the service will be deployed.
        - **Operating System**: Select the preferred operating system.
        - **Tier**: Choose the service tier (e.g., Basic, Standard, Premium).

**3. Additional Service Configuration**
    - Depending on the selected service, configure additional options such as instance type, number of instances, and hours of usage.
    - Some services may have specific configuration options (e.g., SSL connections for App Service).

**4. Review and Adjust**
    - The Pricing Calculator provides an estimated monthly cost based on the chosen configurations.
    - Review the estimate and adjust options as needed. For example, set the number of hours to "1 month" for simplicity.

**5. Optional Configuration Changes**
    - Explore additional configuration options like support plans and licensing programs, which may impact the overall cost.

**6. Add Other Services**
    - If estimating costs for multiple services, add them to the calculation.
    - The total monthly cost will reflect the combined cost of all selected services.

**7. Export, Save, or Share**
    - Once satisfied with the configurations, options, and estimates, you can export, save, or share the estimate for future reference.
    - Note: The estimated monthly cost is an approximation, and actual costs may vary. The Pricing Calculator provides a helpful tool for planning and budgeting your Azure expenses.

For more information: [Pricing Calculator](https://azure.microsoft.com/en-in/pricing/calculator/?service=dns) 



## Azure Hybrid Benefit

Azure Hybrid Benefit allows organizations to leverage existing on-premises licenses, offering substantial savings.
- Enables the use of current software licenses to avoid additional purchase costs.
- Facilitates migration by maintaining a familiar setup and maximizing existing investments.
- Provides cost incentives and operational consistency, easing the transition to Azure.

## Azure Cost Management 

Azure Cost Management provides tools for tracking and analyzing spending through a centralized dashboard.
- Allows for setting budget caps to control costs and optimize resource usage.
- Enables detailed analysis by service and resource group to identify high-cost areas.
- Helps in maintaining financial control and optimizing spending.

Here are key components and strategies for effective cost control:

- Cost Analysis
- Budgets and Alerts
- Hierarchical Cost Tracking
- Tagging
- Azure Advisor Recommendations
- Regular Monitoring

By leveraging Azure Cost Management, organizations can gain insights into their spending patterns, set proactive budgets, and receive alerts to prevent budget overruns. 

- **Cost Analysis**

    - Allows detailed analysis of costs, breaking down spending by service, region, and subscription.
    - View cost changes on a daily or monthly basis through charts and tables.
    - Provides a forecast of future spending based on current resource usage.

- **Budgets and Alerts**

    - Establish monthly spending expectations by setting budgets.
    - Configure alerts to notify when costs approach or exceed specified thresholds.
    - Multiple alerts at different levels, e.g., 75%, 90%, and 100% of the budgeted amount.
    - Receive alerts based on the forecasted spending percentage.

- **Hierarchical Cost Tracking**

    - **Levels:** Utilize three management levels for better cost tracking:
    - **Resource Groups:** Contain related resources (e.g., services for a specific application).
    - **Subscriptions:** Group resource groups; can be organized by teams or projects.
    - **Management Groups:** Aggregate subscriptions (useful for departments).

- **Tagging**

    - Apply tags to Azure resources to categorize and organize them.
    - Tags provide a mechanism to track the total cost of resources with the same tag.
    - Enables fine-grained cost attribution and analysis.

- **Azure Advisor Recommendations**

    - Azure Cost Management integrates with Azure Advisor for additional recommendations.
    - Leverage Advisor suggestions for optimizing costs and improving resource efficiency.
    
- **Regular Monitoring**

    - Instead of daily analysis, set up budgets and alerts for proactive cost control.
    - Early warnings and alerts help prevent unexpected cost overruns.


## Cost Optimization

Regularly reviewing spending data helps in managing and optimizing costs.
- Turn off underutilized resources to avoid unnecessary expenses.
- Azure Advisor offers personalized recommendations for efficient management and cost savings.
- Provides insights into cost-efficiency and performance improvements.

