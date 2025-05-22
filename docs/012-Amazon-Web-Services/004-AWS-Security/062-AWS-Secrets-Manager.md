---
title: "AWS Secrets Manager"
description: "Centrally manage your secrets"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 62
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::




## Overview

AWS Secrets Manager allows you to store, encrypt, and rotate credentials and other types of secrets.

- Automatic secret rotation
- Built-in integration with AWS RDS
- Secret rotation for non-AWS services using Lambda functions

AWS Secrets Manager is a great service to enhance your security posture by allowing you to remove any hard-coded secrets within your application and replacing them with a simple API call to the aid of your secrets manager which then services the request with the relevant secret. As a result, AWS Secrets Manager acts as a single source of truth for all your secrets across all of your applications.

Usage:

- Your application can fetch secrets from AWS Secrets Manager via API call 
- Secrets are encrypted in-transit and at-rest using KMS
- if automatic rotation is enabled, secret rotates immediately
- if secret is deleted, it will remain for 7 days before it is fully removed 

## What is considered a secret

A secret can be any of the following:

- Passwords
- Third party API keys
- Database credentials on Amazon RDS or redshift clusters, or simply plain text. 

Essentially, it's typically something that you want to remain hidden from the open world.

## Secrets Rotation

AWS Secrets Manager enables the ease of rotating secrets and therefore enhancing the security of that secret. An example of this could be your database credentials. Other secret types can also have automatic rotation enabled through the use of lambda functions, for example, API keys. 

## Integration 

Being an enhanced security service, it also offers integration with other key AWS services such as **KMS**, the Key Management Service which is used to encrypt your secrets within AWS Secrets Manager. 

AWS CloudTrail and Amazon CloudWatch can be used to monitor the activity of your secrets, for example, when an API call is triggered to rotate a secret, CloudTrail will log this detail and cloud watch can be configured to report on this deletion through the use of CloudTrail logs and then notify your team. This provides full visibility and auditing capabilities as well as notification of any unexpected behavior, for example, a deletion of one of your secrets.

## Access 

Access to your secrets within AWS Secret Manager is governed by fine-grained IAM identity-based policies in addition to resource-based policies. 

- **Identity-based policies** are attached to identities that have been created within the IAM service and associated specific permissions to their identity. 

- **Resource-based policies** are attached to an individual resource instead of an identity.

## AWS Secrets Manager vs. AWS Systems Manager Parameter Store

AWS Secrets Manager:

- Database credentials, API keys, and passwords
- Encryption is enforced on all secrets
- Integration with AWS RDS 
- Automatic secret rotation for RDS
- Automatoc secret rotation for non-AWS services via Lambda 

AWS SSM Parameter Store

- Any parameter can be stored 
- Encryption is not mandatory 
- Integrated with AWS Systems Manager 