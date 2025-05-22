---
title: "AWS Snowball"
description: "Migrate petabyte-scale data to AWS"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Certifications
sidebar_position: 15
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

Designed to move large amounts of data IN and OUT of AWS. Physical storage the size of a suitcase or truck. Ordered from AWS, use, then return.


![](/img/docs/aws-s3-snowball-family.png)


## Snowball

- Any data on Snowball uses KMS at rest encryption.
- 1 Gbps or 10 Gbps connection
    - 50TB or 80TB Capacity.
    - 10TB to 10PB of data is economical range.
- Good for multiple locations
- No compute

## Snowball Edge

- Includes both storage and compute
- Larger capacity vs snowball.
- Faster networking over Snowball
    - 10 Gbps or up to 100 Gbps

### Types of Snowball Edge

- **Storage optimized**
    - 80TB storage, 24 vCPU, 32 GiB RAM
    - (with EC2) includes 1TB SSD

- **Compute optimized**
    - 100TB storage, 7.68 GB NVME (fast PCI bus storage),52 vCPU, 208 GiB RAM

- **Compute with GPU**
    - Same as compute, but with GPU

## Snowmobile

Portable data center within a shipping container on a truck. This is a special order and is not available in high volume. Ideal for single location where 10 PB+ is required. Max is 100 PB per snowmobile.

![](/img/docs/aws-snowball-comparison.png)

 
