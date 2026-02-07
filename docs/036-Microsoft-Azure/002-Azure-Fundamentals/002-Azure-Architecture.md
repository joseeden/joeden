---
title: "Azure Architecture"
description: "Architecting solutions in Azure"
tags:
- Cloud
- Microsoft Azure
- DevOps
- Certifications
sidebar_position: 2
last_update:
  date: 11/16/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing Azure Services. These are summarized notes for the Azure Certifications.

To see the complete documentation, please go to: [Azure documentation](https://learn.microsoft.com/en-us/azure/?product=popular)

:::



## Resource Group

Similar to a subscription, a resource group serves as a container for resources. However, a subscription can contain multiple resource groups, allowing for further organization within a subscription.

- You can’t put a resource in more than one resource group.

- You can move a resource from one resource group to another. You can even move a resource from one subscription to another.

- Resources don’t need to be in the same region as the resource group they’re in.

- Tags are simply labels that you can apply to resources for management purposes.

- You can apply tags to a resource group, but bear in mind that those tags do not get inherited by the resources in that resource group

- If you want to apply a tag to all of the resources in a resource group, you’ll have to apply it to them individually.

- When you delete a resource group, all of the resources in it get deleted, too. This is a very useful way of making sure you delete all of the resources related to a particular application or project.

Best practices for resource grouping include:

- Grouping related resources together, like a VM and its associated storage account.
- Creating and deleting resources in a group simultaneously, especially when components work together to provide a solution.

  

## Azure Architecture

### Region 

A region is a geographical area on the planet containing at least one, but potentially multiple datacenters that are nearby and networked together with a low-latency network. Azure intelligently assigns and controls the resources within each region to ensure workloads are appropriately balanced.


:::info[note]

Some services or virtual machine features are only available in certain regions, such as specific virtual machine sizes or storage types. 
 
There are also some global Azure services that do not require you to select a particular region, such as Microsoft Azure Active Directory, Microsoft Azure Traffic Manager, and Azure DNS.

:::


Azure divides the world into geographies that are defined by geopolitical boundaries or country borders. An Azure geography is a discrete market typically containing two or more regions that preserve data residency and compliance boundaries.

To learn more, please see [Azure regions](https://docs.microsoft.com/en-us/learn/modules/explore-azure-infrastructure/media/2-regions-small.png)



### Data residency

Refers to the physical or geographic location of an organization's data or information. It defines the legal or regulatory requirements imposed on data based on the country or region in which it resides and is an important consideration when planning out your application data storage.

### Availability Zone

Availability Zones are physically separate datacenters within an Azure region.Each Availability Zone is made up of one or more datacenters equipped with independent power, cooling, and networking. 

It is set up to be an isolation boundary. If one zone goes down, the other continues working. Availability Zones are connected through high-speed, private fiber-optic networks.

To learn more, please see [Availability Zone](https://docs.microsoft.com/en-us/learn/modules/explore-azure-infrastructure/media/4-availability-zones.png)


### Management Groups

Management groups provide a governance scope above subscriptions. You organize subscriptions into management groups; the governance conditions you apply cascade by inheritance to all associated subscriptions.

- Gives you enterprise-grade management at scale, no matter what type of subscriptions you might have. 
- All subscriptions within a single management group must trust the same Azure Active Directory (Azure AD) tenant.
- You can apply policies to a management group that limits the regions available for virtual machine (VM) creation. 
- This policy would be applied to all nested management groups, subscriptions, and resources and allow VM creation only in authorized regions.

The following diagram shows an example of creating a hierarchy for governance using management groups.


<div class="img-center"> 

![](/img/docs/azure-fundamentals-mggroups.png)

</div>

### Update Domain 

An update domain is a group of virtual machines and underlying physical hardware that can be rebooted at the same time. 

- When planned maintenance is performed, only one update domain is rebooted at a time. 
- This ensures that all VMs and associated hardware are not taken down at the same time.

### Fault Domain 

A fault domain is a group of virtual machines that shares a common power source and a common network switch. 

- When virtual machines are added to an availability set, they are distributed across up to:

    - three different fault domains in resource manager deployments, 
    - or across two fault domains in classic deployments.


## Azure Portal 

The Microsoft Azure portal is a browser-based graphical user interface (GUI) to help you manage resources in Azure. Although there are other ways to manage resources in Azure, such as the application programming interface (API) and command line interface (CLI), the portal is the simplest place to start.

|![](/img/docs/azure-portal-screenshot.png)|
|-|

To login: [Azure Portal](https://go.microsoft.com/fwlink/p?linkid=2165195&clcid=0x409)


## Availability of Services 

### Azure Region Types

The availability of Azure services depends on the region type. Azure has two types of regions: recommended and alternate.

- **Recommended Regions**
  - Offer the broadest range of services.
  - Support availability zones.
  - Ideal for most deployment scenarios.

- **Alternate Regions**
  - Extend Azure's footprint within a data residency boundary where a recommended region exists.
  - Help optimize latency and provide a second region for recovery.
  - Do not support availability zones.

### Service Categories

Azure services are grouped into three categories: foundational, mainstream, and strategic.

- **Foundational Services**
  - Available in all regions and alternate regions when generally available.
  - Examples: Azure Virtual Machines, Azure Storage, Azure SQL Database.

- **Mainstream Services**
  - Accessible in all recommended regions for deployment.
  - Examples: Azure App Service, Azure Kubernetes Service, Azure Cognitive Services.

- **Strategic Services**
  - Targeted offerings aimed at specific industries.
  - Examples: Azure Healthcare APIs, Azure Financial Services Compliance Program.

![](/img/docs/azure-availability-of-services-3-types.png)

To check the availability of a specific service in a region using Azure CLI:

```bash
az account list-locations --query "[].{Region:name, Recommended:metadata.regionType == 'Recommended', ServicesAvailable:servicesAvailable}"
```

Output:

```json
[
  {
    "Region": "eastus",
    "Recommended": true,
    "ServicesAvailable": [
      "Microsoft.Compute",
      "Microsoft.Storage",
      "Microsoft.Sql"
    ]
  },
  {
    "Region": "centralus",
    "Recommended": true,
    "ServicesAvailable": [
      "Microsoft.Compute",
      "Microsoft.Storage",
      "Microsoft.Sql",
      "Microsoft.AppService"
    ]
  },
  {
    "Region": "westus",
    "Recommended": false,
    "ServicesAvailable": [
      "Microsoft.Compute",
      "Microsoft.Storage"
    ]
  }
]
```
