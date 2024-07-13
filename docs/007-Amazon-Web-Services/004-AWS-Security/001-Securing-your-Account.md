---
title: "AWS Security"
description: "Quickstarts"
tags: [Cloud, AWS, DevOps, Security, Certifications]
sidebar_position: 1
last_update:
  date: 8/30/2020
---



## First Steps on Securing your AWS account

- Enable multi-factor authentication (MFA)
- Enable Cloudtrail for auditing 
- Use IAM for every future action 

## AWS Own Security Practices 

Resources:

- [AWS Cloud Security Portal](https://aws.amazon.com/security/)
- [AWS Cloud Compliance Portal](https://aws.amazon.com/compliance/)

Compliance:

- PCi 
- DSS Compliant
- ISO 27001
- HIPAA


## AWS Shared Responsibility Model 

Security and compliance is a shared responsibility between AWS and the customer.

- AWS is responsible for the security "of" the cloud 
- customer is responsible for the security "in" the cloud

![](/img/docs/awssharedresponsbilitymodel.png)


### Security of the Cloud

Protection of infrastructure that run all the offered services:
- Hardware, software, networking, and facilities 
- Software services provided by AWS (Managed services)

### Security in the Cloud

Responsibility and management of:

- guest OS of EC2 compute instances
- other application software
- configuration of the AWS provided security group firewall 

AWS categorized their services into three:

![](/img/docs/awssecuritycategoriesofawsservices.png)

Shared responsibility chart:

![](/img/docs/awssharedresponsibilitychart.png)

## AWS Config 

Records and evaluate configurations of your AWS resources.

- assess, audiit, and evaluate configurations. 
- continuously monitors and records your AWS resource configurations. 
- allows to automate evaluation of recorded configurations against their desired configurations.

## AWS CloudTrail 

Track user activity and API usage:

- Enables governance, compliance, operational auditing, adn risk auditing og your AWS account.
- Log, continuously monitor, and retain account activity related to actions across your AWS infrastructure.
- Provides event history of your AWS account activity.

## Data Control 

How data is being encrypted.

- **AWS KMS**
    - Multi-tenant
    - Shared service 

- **AWS CloudHSM**
    - Dedicated cluster where you can store encrytion keys
    - Isolation up to the physical layer
    - Strong compliance requirement
