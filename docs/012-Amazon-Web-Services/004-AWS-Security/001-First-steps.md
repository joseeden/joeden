---
title: "First steps"
description: "Securing your AWS Account"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 1
last_update:
  date: 8/30/2020
---

:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Securing your AWS account

- Enable multi-factor authentication (MFA).
- Enable Cloudtrail for auditing. 
- Use IAM for every future action.

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

- AWS is responsible for the security "of" the cloud. 
- customer is responsible for the security "in" the cloud.

  ![](/img/docs/awssharedresponsbilitymodel.png)


### Security of the Cloud

Protection of infrastructure that run all the offered services:

- Hardware, software, networking, and facilities. 
- Software services provided by AWS (Managed services).

### Security in the Cloud

Responsibility and management of:

- Guest OS of EC2 compute instances.
- Other application software.
- Configuration of the AWS provided security group firewall. 

AWS categorized their services into three:

![](/img/docs/awssecuritycategoriesofawsservices.png)

Shared responsibility chart:

![](/img/docs/awssharedresponsibilitychart.png)

## AWS Config 

Records and evaluate configurations of your AWS resources.

- Assess, audiit, and evaluate configurations. 
- Continuously monitors and records your AWS resource configurations. 
- Allows to automate evaluation of recorded configurations against their desired configurations.

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
