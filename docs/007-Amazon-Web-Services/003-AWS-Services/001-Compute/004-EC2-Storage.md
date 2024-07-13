---
title: "EC2 Storage"
description: "EBS and EFS"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 4
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Instance Store 

Instance store provides temporary block-level storage for your instance. This storage is located on disks that are physically attached to the host computer.

![](/img/docs/aws-instance-store.png)

Table:

Operation | Description |
---------|----------|
 Reboot | Rebooting an instance does not shut down the instance; if an instance reboots (intentionally or unintentionally), data on the instance store persists. | C1
 Stop/Terminate | The data in an instance store persists only during the lifetime of its associated instance. If an instance is stopped or terminated, then the instance store does not persist | 

To learn more, please see [Amazon EC2 instance store](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/InstanceStorage.html).

## Amazon Elastic Block Storage (EBS)

Persistent block storage volumes. You can attach multiiple Ebs volumes to a single instance.

![](/img/docs/aws-ebs-diag.png)


To learn more, please see [Amazon EBS volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes.html).


### EBS Types

- Magnetic 
- General Purpose (SSD)
- Provisioned IOPS (SSD)

### EBS Encryption

- Use AWS KMS master keys or use a customer master key (CMK)
- Creating your own CMK gives you more control on the key.

### EBS Snapshot

- Point-in-time backup copy of an EBS volume that is stored in Amazon S3.
- Incremental, which means only the blocks that have changed after your most recent snapshot is saved.
- When snapshot is deleted, only data exclusive to that snapshot is deleted.
- Can be shared across AWS accounts or copied across regions

### EBS Migration

- EBS volumes are locked to a specific availability zone. 
- To migrate an EBS volume to a different AZ or region:
- Snapshot the volume 
- Copy the volume to a different region (optional)
- Create a volume from the snapshot.

## Amazon Elastic Filesystem (EFS) 

Amazon EFS provides scalable file storage for use with Amazon EC2. You can use an EFS file system as a common data source for workloads and applications running on multiple instances. 

![](/img/docs/aws-efs-filesystem.png)

To learn more, please see [Amazon EFS](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AmazonEFS.html).

  
