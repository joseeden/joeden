---
title: "Cost Management"
description: "Reducing costs in your Azure solutions"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 3
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::


## Reducing Costs 

Understanding the key factors that influence Azure costs is crucial for effective budgeting and cost management. Additionally, adopting cost-saving strategies can optimize expenses. Here are some significant factors and strategies related to Azure costs:

### 1. Region Selection

    - The region where Azure resources are hosted impacts costs.
    - Some regions may have higher costs than others for the same services.
    - Consider cost differences when choosing a region, especially if data residency or latency is not a primary concern.

        ![](/img/docs/azure-rreduce-cost-region-selectino.png)
        
        
### 2. Data Transfer Costs

    - Data transfer into Azure resources (ingress) is typically free.
    - Data transfer out of Azure resources (egress) may incur costs, especially if transferred across regions or outside the Azure network.
    - Minimize egress costs by keeping resources within the same region unless specific reasons justify cross-region deployment.

        ![](/img/docs/azure-put-resources-in-same-region.png)
        


### 3. Resource Groups and Regions

    - Resource group location is irrelevant for costs; the contained resources incur charges.
    - Placing resources in different regions within a resource group does not cause additional charges.

        ![](/img/docs/azure-reducing-costs-for-data-transfer.png)
        
    
 
### 4. Reserved Capacity

    - Reserved Instances involve committing to a long-term contract (1 or 3 years) for specific Azure services.
    - Offers potential cost savings (up to 72%) compared to pay-as-you-go pricing.
    - Available for select services, and the VM region is chosen during reservation.
    - Exchanging reservations is possible, but a new reservation must be made.

        ![](/img/docs/azure-reduce-costs-reserved-capacity.png)
        
        

### 5. Azure Hybrid Benefit

    - Utilize existing Windows Server or SQL Server licenses covered by Microsoft Software Assurance on Azure.
    - Applicable to Azure VMs, Azure SQL Database, or Azure SQL Managed Instance.
    - Helps reduce costs by leveraging existing licenses.

        ![](/img/docs/azure-reduce-cost-hybrid-benefit.png)
        
    
### 6. Azure Spot Virtual Machines

    - Spot VMs offer significant cost savings (up to 90%) but may be preempted with short notice (30 seconds).
    - Suitable for non-critical workloads like batch processing, testing, or rendering.

        ![](/img/docs/azure-reduce-cost-spot-vms.png)
        

### 7. Right-Sizing Virtual Machines

    - Resize underutilized VMs to a more cost-effective option.
    - Azure Advisor provides insights into underutilized VMs and potential cost savings.
    - Consider downsizing or shutting down VMs based on usage patterns.

        ![](/img/docs/azure-reduce-cost-right-size-vm-size.png)
        

### 8. VM Deallocation and Resource Cleanup

    - Stopped (deallocated) VMs may still incur charges for associated resources like data disks and static public IP addresses.
    - Deleting a VM might not remove all associated resources; clean up data disks and public IP addresses separately.
    - Azure Advisor assists in identifying unused resources, including public IP addresses.

        ![](/img/docs/azure-reduce-cost-use-azure-advisor.png)
        


  






## Azure Cost Management 

Azure Cost Management provides essential features for managing and controlling costs within the Azure environment. Here are key components and strategies for effective cost control:

- Cost Analysis
- Budgets and Alerts
- Hierarchical Cost Tracking
- Tagging
- Azure Advisor Recommendations
- Regular Monitoring

By leveraging Azure Cost Management, organizations can gain insights into their spending patterns, set proactive budgets, and receive alerts to prevent budget overruns. 

- **Cost Analysis**

    - **Functionality:** Allows detailed analysis of costs, breaking down spending by service, region, and subscription.
    - **Usage:** View cost changes on a daily or monthly basis through charts and tables.
    - **Forecasting:** Provides a forecast of future spending based on current resource usage.

- **Budgets and Alerts**

    - **Budget Setup:** Establish monthly spending expectations by setting budgets.
    - **Alerts:** Configure alerts to notify when costs approach or exceed specified thresholds.
    - **Granularity:** Multiple alerts at different levels, e.g., 75%, 90%, and 100% of the budgeted amount.
    - **Forecast Alerts:** Receive alerts based on the forecasted spending percentage.

- **Hierarchical Cost Tracking**

    - **Levels:** Utilize three management levels for better cost tracking:
    - **Resource Groups:** Contain related resources (e.g., services for a specific application).
    - **Subscriptions:** Group resource groups; can be organized by teams or projects.
    - **Management Groups:** Aggregate subscriptions (useful for departments).

- **Tagging**

    - **Functionality:** Apply tags to Azure resources to categorize and organize them.
    - **Usage:** Tags provide a mechanism to track the total cost of resources with the same tag.
    - **Flexibility:** Enables fine-grained cost attribution and analysis.

- **Azure Advisor Recommendations**

    - **Integration:** Azure Cost Management integrates with Azure Advisor for additional recommendations.
    - **Optimization:** Leverage Advisor suggestions for optimizing costs and improving resource efficiency.
    
- **Regular Monitoring**

    - **Proactive Approach:** Instead of daily analysis, set up budgets and alerts for proactive cost control.
    - **Prevention:** Early warnings and alerts help prevent unexpected cost overruns.


## Resources 

- [Learning About Azure](https://cloudacademy.com/learning-paths/learning-about-azure-5663/)
- [AWS & Azure services comparision](https://gist.github.com/vikpande/6b8f891e2fb1ce1e255f636ee27caaee)
- [Networking services compared: AWS vs Azure vs Google Cloud](https://www.pluralsight.com/resources/blog/cloud/networking-services-compared-aws-vs-azure-vs-google-cloud)
- [osmanys/az900-training](https://github.com/osmanys/az900-training)
