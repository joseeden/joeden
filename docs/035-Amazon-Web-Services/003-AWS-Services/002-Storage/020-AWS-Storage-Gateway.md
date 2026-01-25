---
title: "AWS Storage Gateway"
description: "Use cloud storage with on-prem applications"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Certifications
sidebar_position: 20
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Hybrid Cloud for Storage

- Hybrid cloud:
    - Part of a company's infrastructure is in the public cloud (like AWS)
    - Part of a company's infrastructure is on-premise
- S3 is a proprietary storage technology (unlike EFS/NFS), it can be exposed to on-premise servers through a storage gateway

    ![](/img/docs/aws-s3-cloud-native-options.png)


## Storage Gateway

Bridge between on-premise data and cloud data in S3

- Uses cases for storage gateway with S3: disaster recovery, backup and restore, tiered storage.
- AWS provides 3 types of storage gateways:
    - File Gateway
    - Volume Gateway
    - Tape Gateway

        ![](/img/docs/aws-s3-storage-gw-choices.png)


## Types of Storage Gateway

### File Gateway

- Configured S3 buckets are accessible using NFS and SMB protocols
- Supports S3 Standard, S3 IA, One Zone IA
- Each buckets will have its own IAM roles in order to be accessed by the file gateway
- Most recently used data is cached in the file gateway
- File Gateway can be mounted on many servers (because of the NFS protocol)

    ![](/img/docs/aws-s3-file-gateway.png)


### Volume Gateway

- Block storage using iSCSI protocol backed by S3.
- EBS snapshots are created time to time which are stored in S3, these will help use to restore un-premise volumes.
- Volumes are usually mounter using iSCSI protocol, for on-premise it will look like a local volume.

    ![](/img/docs/aws-s3-vol-gw.png)

Types:

- **Cached volumes**: low latency access to the most recently used data.
- **Stored volumes**: entire dataset is on premise, scheduled buckets are stored in S3.

### Tape Gateway

- Some companies have backup processes using physical tapes.
- With tape gateway these companies can use the same process, but the data will backed into the cloud.
- Virtual Tape Library (VTL) backed by Amazon S3 and Glacier.
- Backup processes using iSCSI interface will work as well with tape gateway.

    ![](/img/docs/aws-s3-tape-gw.png)

### File Gateway Hardware Appliance

- Using file gateway means we need virtualization, otherwise we can use a **File Gateway Hardware Appliance**
- It is an actual hardware which can be bought from amazon.com
- Helpful for daily NFS backup in small data centers

 
