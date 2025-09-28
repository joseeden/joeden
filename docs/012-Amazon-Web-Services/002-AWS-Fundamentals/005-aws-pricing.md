---
title: "AWS Pricing"
description: "AWS Pricing"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Certifications
sidebar_position: 5
last_update:
  date: 4/30/2020
---


## Overview

AWS has different ways to manage costs. You can choose pricing models, set budgets, use tags, and look for optimization opportunities.

- Learn about pricing models
- Plan with budgets
- Track with tags
- Optimize for savings

Understanding these helps you control expenses and make better use of AWS resources.

## Pricing models

AWS has flexible pricing options.

- Pay-as-you-go with no commitments
- Discounts for long-term commitments
- Savings when usage increases

Each model fits different needs, letting you balance flexibility, cost, and usage patterns.

### Pay-as-you-go

This model charges you only when you use services.

- Pay for actual usage time
- No extra fees when stopped
- No termination charges

For example, an EC2 instance only costs money while it is running, just like paying only for water when the tap is open.

```bash
# Start EC2 instance
aws ec2 run-instances --instance-type t2.micro --image-id ami-123456

# Stop EC2 instance
aws ec2 stop-instances --instance-ids i-123456
```

Expected result: You are billed only for the running duration of the instance.

This keeps costs predictable and fair since you only pay for what you use.

### Save when you commit

Long-term usage commitments reduce costs.

- Reserved instances give discounts
- Commit for 1 year or 3 years
- Bigger discounts for upfront payments

For example:

- On-demand: $734.67/month
- 1-year: ~33% savings
- 3-year: ~55% savings

Committing helps lower expenses, especially for workloads that run all the time.

### Pay less by using more

The more you use, the cheaper the cost per unit.

- Discounts as storage grows
- Larger usage unlocks lower rates
- Example with Amazon S3

```text
Up to 50TB:   $0.023/GB
Above 500TB:  $0.021/GB
```

Using more storage lowers the price per GB, helping you scale affordably.

## Free Services 

The services below are free but there might be charges associated with other AWS services that are used alongside these services.

- Amazon VPC
- Elastic Beanstalk
- Auto Scaling
- AWS CloudFormation
- AWS Identity and Access Management

## Bandwidth costs

Data transfer has different price levels depending on direction.

- Inbound traffic is free
- Transfer inside a region costs less
- Outbound to internet costs the most

```text
Same region AZ-to-AZ: lowest cost  
Region-to-region: medium cost  
Region-to-internet: highest cost  
```

Knowing these costs helps you design systems that minimize expensive data transfers.

## Total Cost of Ownership

**Total Cost of Ownership (TCO)** is a financial estimate to help identify direct and indirect costs of a system. It compares costs of running an entire infrastructure environment or specific workload on-premises versus on AWS. Below are some TCO considerations:

1. **Server Costs**
   - Hardware: Server, rack chassis power distribution units (PDUs), top-of-rack (TOR) switches, and maintenance
   - Software: Operating system (OS), virtualization licenses, and maintenance
   - Facilities: Space, power, and cooling

2. **Storage Costs**
   - Hardware: Storage disks, storage area network (SAN) or Fibre Channel (FC) switches
   - Storage administration costs

3. **Network Costs**
   - Network Hardware: Local area network (LAN) switches, load balancer bandwidth costs
   - Network administration costs

4. **IT Labor Costs**
   - Server administration costs


## Pricing calculator

AWS provides a free tool for planning.

- Create cost estimates
- Model solutions and scenarios
- Find savings opportunities

The AWS Pricing Calculator helps forecast expenses before you deploy, making cost planning more accurate and reliable.


