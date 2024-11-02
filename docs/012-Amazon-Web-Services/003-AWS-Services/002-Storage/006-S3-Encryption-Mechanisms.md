---
title: "S3 Encryption Mechanisms"
description: "Methods to encrypt S3"
tags: [Cloud, AWS, DevOps, Security, Certifications]
sidebar_position: 6
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## Overview

Depending on your requirements, one method of encryption may be more appropriate than another. Here are the available encryption mechanisms for your Amazon S3 Buckets:

- **Server-side encryption with S3 managed keys, SSE-S3**

    - Requires minimal configuration 
    - Management of encryption keys used are managed by AWS
    - Just upload your data and S3 will handle all other aspects. 

- **Server-side encryption with KMS managed keys, SSE-KMS**

    - Allows S3 to use the key management service to generate your data encryption keys
    - KMS gives you a far greater flexibility of how your keys are managed
    - You are able to disable, rotate, and apply access controls to the CMK
    - You can also audit keys against their usage using AWS CloudTrail. 

- **Server-side encryption with customer provided keys, SSE-C**

    - Provide your own master key that you may already be using outside of AWS
    - Customer-provided key would then be sent with your data to S3
    - S3 would then perform the encryption for you

- **Client-side encryption with KMS, CSE-KMS**

    - Like SSE-KMS, CSE-KMS uses KMS to generate your data encryption keys
    - But KMS is called upon via the client, not S3
    - Encryption takes place client-side and encrypted data is sent to S3 to be stored

- **Client-side encryption with customer provided keys, CSE-C**

    - Able to utilize your own provided keys and use an AWS-SDK client to encrypt your data before sending it to S3 for storage. - 
