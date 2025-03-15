---
title: "EC2 Instance Types"
description: "Based on naming convention, pricing, and purpose."
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 2
last_update:
  date: 7/26/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Instance Type Naming Convention

<div class="img-center"> 

![](/img/docs/aws-instance-type-naming-convention.png)

</div>

## Instance Types based on pricing

<small>Reference: [On-Demand vs Reserved vs Spot AWS EC2](https://blog.boltops.com/2018/07/13/on-demand-vs-reserved-vs-spot-aws-ec2-pricing-comparison/)</small>

- **On-Demand Instances**
    
    - There’s no commitment from you. You pay the most with this option.

- **Reserved Instances**
    
    - 1-year or 3-year commitment from you. You save money from that commitment.

- **Spot Instances**
    
    - Spare instances that you can bid on. The Spot price fluctuates in real-time based on supply and demand.

## Instance Types based on purpose

<small>Reference: [Amazon EC2 Instance Types](https://blog.boltops.com/2018/07/13/on-demand-vs-reserved-vs-spot-aws-ec2-pricing-comparison/)</small>

- **General Purpose**
    
    - Ideal for applications that use these resources in equal proportions such as web servers and code repositories. 
    
- **Compute Optimized**
    
    - Ideal for compute bound applications that benefit from high performance processors. 

- **Memory Optimized**
    
    - Designed to deliver fast performance for workloads that process large data sets in memory.
    
- **Accelerated Computing**
    
    - These instances use hardware accelerators, or co-processors, to perform functions, such as floating point number calculations, graphics processing, or data pattern matching, more efficiently than is possible in software running on CPUs.

- **Storage Optimized**
    
    - Designed for workloads that require high, sequential read and write access to very large data sets on local storage. They are optimized to deliver tens of thousands of low-latency, random I/O operations per second (IOPS) to applications.

- **HPC Optimized**
    
    - HPC instances are ideal for applications that benefit from high-performance processors such as large, complex simulations and deep learning workloads.

## Reserved Instance Types 

- **Standard RIs**
    - These provide the most significant discount (up to 75% off On-Demand) and are best suited for steady-state usage.

- **Convertible RIs**
    - These provide a discount (up to 54% off On-Demand) and the capability to change the attributes of the RI as long as the exchange results in the creation of Reserved Instances of equal or greater value. Like Standard RIs, Convertible RIs are best suited for steady-state usage

- **Scheduled RIs**
    - These are available to launch within the time windows you reserve. This option allows you to match your capacity reservation to a predictable recurring schedule that only requires a fraction of a day, a week, or a month

## Dedicated Instances 

By default, EC2 instances run on shared tenancy hardware. 

- **Dedicated Instances** 
    
    - EC2 instances that run on hardware that's dedicated to a single customer. Dedicated Instances that belong to different AWS accounts are physically isolated at a hardware level, even if those accounts are linked to a single payer account. However, Dedicated Instances might share hardware with other instances from the same AWS account that are not Dedicated Instances.

- **Dedicated Host** 
    
    - is also a physical server that's dedicated for your use. With a Dedicated Host, you have visibility and control over how instances are placed on the server. For more information, see [Dedicated Hosts](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-hosts-overview.html).

Features:

- Reserved Instances
- Automatic scaling
- Automatic recovery
- Dedicated Spot Instances
- Burstable performance instances 

To learn more, please see [Dedicated Instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/dedicated-instance.html)

  