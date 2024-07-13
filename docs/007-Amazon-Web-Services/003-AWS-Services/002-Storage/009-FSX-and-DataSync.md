---
title: "FSx and DataSync"
description: "Amazon FSx and AWS DataSync"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 9
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Amazon FSx

### Amazon FSx for Windows

- EFS is a shared POSIX file system for Linux, meaning it can not be used with Windows
- FSx for Windows is a fully managed Windows file system share drive
- Supports SMB protocol and Windows NTFS
- It has Active Directory integration, ACLs and user quotas
- It is built on top of SSD, it can scale up to 10s of GB/s, millions of IOPS and 100s PB of data
- It can accessed from on-premise infrastructure
- It can be configured to be Multi-AZ (high availability)
- Data is backed-up daily to S3

### Amazon FSx for Lustre

- Lustre is a type of parallel distributed file system for large-scale computing
- Lustre is derived from "Linux" and "cluster"
- FSx for Lustre is used with machine learning and **High Performance Computing (HPC)**, example: video processing, financial modelling, electronic design automation
- Scales up to 100s GB/s, millions of IOPS, sub-ms latencies
- It has seamless integration with S3
    - Can "read" S3 as a file system
    - Can write the output of the computations back to S3
- It can be used with on-premise servers

 


## AWS DataSync

- Data transfer service TO and FROM AWS.
- This is used for migrations or for large amounts of data processing transfers.
- Designed to work at huge scales. Each agent can handle 10 Gbps and each job - can handle 50 million files.
- Transfers metadata and timestamps
- Each agent is about 100 TB per day.
- Can use bandwidth limiters to avoid customer impact
- Supports incremental and scheduled transfer options
- Compression and encryption in transit is also supported
- Has built in data validation and automatic recovery from transit errors.
- AWS service integration with S3, EFS, FSx for Windows servers.
- Pay as you use product.

### Components

- **Task**
    - job within datasync
    - defines what is being synced how quickly
    - defines two locations involved in the job

- **Agent**
    - software to read and write to on prem such as NFS or SMB
    - used to pull data off that store and move into AWS or vice versa

- **Location**
    - every task has two locations FROM and TO
    - example locations:
        - network file systems (NFS), common in Linux or Unix
        - server message block (SMB), common in Windows environments
        - AWS storage services (EFS, FSx, and S3)

 

