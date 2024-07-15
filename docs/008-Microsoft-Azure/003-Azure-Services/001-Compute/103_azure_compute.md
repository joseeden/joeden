---
title: "Azure Compute"
description: "Virtual machines in Azure"
tags: [Cloud, Microsoft Azure, DevOps, Certifications]
sidebar_position: 1
last_update:
  date: 7/18/2020
---

## Compute Services 

Azure compute is an on-demand computing service for running cloud-based applications.

- Virtual machines
- Containers
- Azure App Service
- Serverless computing
 

## Virtual Machines 

Azure Virtual Machines (VMs) let you create and use virtual machines in the cloud. They provide infrastructure as a service (IaaS) in the form of a virtualized server and can be used in many ways.

- Used for hosting applications; virtualization without managing physical hardware.
- Managing tasks such as configuration, patching, and software installation is necessary.

Features:

- Quick and easy setup, making them ideal for development and test environments.
- Pay-as-you-go, allows organizations to host applications in Azure cost-effectively.
- Extend on-premises data centers to Azure using virtual networks and site-to-site VPNs.

Considerations:

- Establish virtual machine naming conventions.
- Deploy VMs in locations closest to users for optimal access.
- Determine VM sizing requirements and consider Microsoft Azure's CPU and VM quotas.
- Decide on operating system and VM configuration needed for application requirements.


## Pre-requisite Resources 

To deploy an Azure virtual machine, certain prerequisite resources are essential. Generally, these resources will be automatically created if they do not exist prior to VM creation. Here are the key dependencies:


- **Resource Group**
   
   - Must exist before creating a virtual machine, as each VM needs to be contained within a resource group.

- **Virtual Network and NIC**
   
   - A virtual machine requires a virtual network, and consequently, a virtual Network Interface Card (NIC) for connectivity.

- **Storage Account (if using unmanaged disks)**
   
   - Required to hold virtual hard disks for VMs using unmanaged disks. 
   - Not needed for VMs using only managed disks.

- **Public IP Address (for remote access)**
   
   - Necessary if the virtual machine will be accessed remotely. 
   - If accessed only internally, a public IP address is not required.

- **Data Disks (optional but recommended)**
   
   - While not mandatory, attaching data disks to a virtual machine is advisable to expand storage capabilities, especially if hosting applications.


## Pricing 

There are multiple purchasing options for Azure virtual machines:

- **Pay-as-You-Go**
   - Pay for compute capacity by the second.
   - No long-term commitments or upfront payments.
   - Flexible scalability—increase or decrease capacity as needed.
   - Recommended for customers seeking cost-effectiveness and flexibility.

- **Reserved VM Instances**
   - Involves an upfront commitment to purchase a virtual machine for one or three years.
   - Offers cost savings of up to 72% compared to pay-as-you-go pricing.
   - Suitable for applications with steady-state usage or for those seeking budget predictability.
   - Requires a commitment to using the VM for at least a year.

- **Spot Pricing**
   - Allows purchase of unused Azure compute at a discount, up to 90%.
   - Workloads must tolerate interruptions, ideal for interruptible applications.
   - Not suitable for workloads that must adhere to strict SLAs.
 

## VM Options

Azure virtual machines come in various types, each tailored for specific workloads:

- **General-Purpose Virtual Machines:**
   - Balanced CPU to memory ratio.
   - Suitable for development, testing, small databases, and low-traffic web servers.

- **Compute-Optimized Virtual Machines:**
   - High CPU to memory ratios.
   - Ideal for medium traffic web servers, network appliances, batch processing, and application servers.

- **Memory-Optimized Virtual Machines:**
   - High memory to core ratios.
   - Used for relational database servers, large caches, and in-memory analytics.

- **Storage-Optimized Virtual Machines:**
   - High disk throughput and IO.
   - Perfect for big data, SQL, and NoSQL databases.

- **GPU Virtual Machines:**
   - Specialized for graphic rendering and video editing.
   - Available with single or multiple GPUs.

- **High-Performance Compute Virtual Machines:**
   - Fastest and most powerful CPU virtual machines.
   - High-performance workloads like molecular modeling and financial risk modeling.
   - Some include optional high throughput network interfaces.


## Availability and Scalability Options

![](/img/docs/azure-vms.png) 


### Availability Sets

An availability set is a logical grouping of two or more VMs that help keep your application available during planned or unplanned maintenance.

- Provides redundancy and availability for virtual machines (VMs).
- Requirement for SLA: 

   - At least two VMs
   - Two fault domains
   - Two update domains for Microsoft’s 99.95% uptime guarantee.

Components:

- **Update Domains** 
   - Groups VMs to manage planned downtime during Azure updates.
   - Update domains (up to 20) group VMs for sequential reboots during maintenance.

- **Fault Domains** 
   - Separates VMs based on different power sources and network switches.
   - This minimize downtime due to hardware failures.
   - Fault domains (up to 3) group VMs with a common power source and network switch.
   - Protects against network outages, hardware failures, and power interruptions within an Azure data center.

### Availability Zones

Availability zones protect applications from the failure of an entire Azure data center.

- A physical location within an Azure region, each zone has at least one data center.
- Consists of fault domains (1) and update domains (1).
- Protects applications from complete Azure data center failures.
- Deploying VMs in an availability zone guarantees a 99.99% VM uptime SLA.
- Three or more VMs across three zones FOR distribution across different fault and update domains.
- Used to safeguard applications from entire Azure data center failures.

   ![](/img/docs/azure-vms-az-availsets.png)


### Multi-Region Deployments 

If you need higher availability than a single region can provide, you'll have to use multiple regions. 

- In most cases, it’d be sufficient to simply back up your VMs to another region. 
- If the region where your VMs are deployed goes down, you can temporarily bring up replacement VMs in the second region by using your backups. 
- If you can’t tolerate almost any downtime, then you could have VMs running in the backup region all the time.

### Regional Pairs

When choosing a backup region, consider regional pairs for increased reliability.

- Nearly every one of Azure’s regions is paired with another region. 
- Some Azure services replicate their data across regional pairs if you choose certain options. 

For example, if you choose the geo-redundant storage option for an Azure Storage account, then your data will be replicated to the paired region.

Note:

- While storage accounts replicate data across regional pairs, VMs do not.
- Store VM backups in the paired region.
- In the event of an outage, Microsoft tries to make at least one region in each pair available.


### Scale Sets

There are two available approach to scaling a VM:

   - **Vertical Scaling:** Increase VM size individually.
   - **Horizontal Scaling:** Add more VMs for increased capacity.

Azure Virtual Machine Scale Sets let you create and manage a group of identical, load balanced VMs.

- Make the application tier stateless; store data in a shared external datastore.
- Scale sets distributes VMs across fault domains and update domains.
- It Automatically adjusts VM count based on defined rules.
- Utilizes CPU, disk, network metrics, and OS metrics (enabled through the diagnostics extension).
- Supports custom metrics from application logs.
- Configurable maximum and minimum VM count (up to 1,000 VMs in a scale set, or 600 VMs for custom images).

### Scale Set Types

- **Zonal Scale Set** 

   - Deployed in a single zone.
   - This is the default.

- **Regional Scale Set** 
   - Spans availability zones for optimal availability and scalability.

 
