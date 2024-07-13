---
title: "S3 Security"
description: "Securing your S3 Bucket"
tags: [Cloud, AWS, DevOps, Certifications]
sidebar_position: 3
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## Overview 

There are two ways to secure your S3 buckets:

- **User based security**
    - Use IAM policies to specify which calls are allowed for a specified user from IAM console

- **Resource based security**

    - Use bucket policies which are bucket wide rules from the S3 console. 
    - These rules may allow cross account access to the bucket
    - We also have Object Access Control Lists (ACL) and Bucket Access Control Lists which allow finer grain control over the bucket

    - An IAM principal can access an S3 object if:
        - The user IAM permission allows it or the resource policy allows it
        - The is no explicit deny


### Bucket Policies

- Bucket policies are JSON based documents
- They can be applied to both buckets and objects in buckets
- The effect of a statement in the bucket policy can be either allow or deny
- The principle in the policy represents the account or the user for which the policy applies to
- Common use cases for S3 bucket policies:
    - Grant public access to the bucket
    - Force objects to be encrypted at the upload
    - Grant access to another account (cross account access)

### Bucket Settings for Block Public Access

- Relatively new settings that was created to block public access to buckets and objects if the account has some restrictions:
- S3 provides 4 different kind of block public access settings:
    - new access control lists
    - any access control lists
    - new public bucket or access point policies
    - block public and cross-account access to buckets and objects through any public bucket or access point policies
- These settings were created to prevent company data leaks

### Other Security Features

- **Networking**

    - S3 supports VPC Endpoints (for instances in VPC without internet access)

- **Logging and Audit**

    - S3 Access Logs can be stored in other S3 buckets
    - API calls can be logged in AWS CloudTrail

- **User Security**

    - MFA Delete can be required in versioned buckets in order to protect for accidental deletions
    - Pre-Signed URLs: ULRs that are valid only for a limited time


## S3 Object Encryption

### Encryption at rest

For protecting data at rest in Amazon S3, you have the following options:

- **SSE-S3**

    - Encrypts S3 objects using keys handled and managed by AWS
    - Keys used for encryption is managed by Amazon S3
    - Objects are encrypted in the server side
    - It uses AES-256 encryption
    - In order to have SSE-S3 encryption clients must set a header, which is x-amz-server-side-encryption": "AES256"

- **SSE-KMS**

    - Encryption keys are handled and managed by KMS
    - KMS allows the manage which keys will be used for the encryption, - Uses audit trails in to see who was using the KMS key
    - Objects are encrypted in the server-side
    - In order to have SSE-S3 encryption clients must set a header, which is x-amz-server-side-encryption": "aws:kms"

- **SSE-C**

    - Server side encryption using data keys provided by the user from the outside of AWS
    - Amazon S3 does not store the encryption key provided by the user
    - Data should be transmitted through HTTPS, because a key is sent the AWS
    - Encryption key must be provided in the header of the request for every request
    - When retrieving the object, the same encryption key must be provided in the header

- **Client Side Encryption**

    - Data must be encrypted before sending it to S3
    - This is usually accomplished by using a third party encryption library, like Amazon S3 Encryption Client
    - The user is solely responsible for encryption-decryption
    - The keys and the encryption cycle is managed by the user


### Encryption in transit

- Amazon S3 exposes:
    - HTTP endpoint for non-encrypted data
    - HTTPS endpoint for encryption in flight which relies on SSL/TLS
- Most clients for S3 will use HTTPS by default
- In case of SSE-C encryption HTTPS in mandatory


 