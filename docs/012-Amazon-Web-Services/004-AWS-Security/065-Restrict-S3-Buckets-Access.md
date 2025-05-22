---
title: "Restrict S3 Buckets Access"
description: "Limiting the access on your S3 Buckets"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 65
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Bucket Policies 

AWS S3 Bucket policies are policies attached only to S3 buckets and specifies what is allowed or denied to that bucket.

- Can be used to define granualr permissions at a user-level.
- Can be used to grant cross-account access to S3 bucket without using IAM roles.
- S3 bucket policies work at a bucket level.

## S3 ACLs

- S3 ACL can be applied at an object-level. 
- Recommended way to protect objects. 
- Do not use unless required.

**Conflicts between S3 Bucket Policies vs. IAM Policies**

- The authorization decision will depend on the combination of:
    - IAM policies 
    - S3 Bucket policies
    - S3 ACLs 

- By default, everything is DENIED 
- If you allow something, it only takes one EXPLICIT DENY for the result to be denied.
- An explicit deny will always override an allow 

## AWS S3 Pre-signed URLs

- This enables you to generate a temporary URL to access S3 objects.
- Typically short-lived (seconds or minutes) but the TTL can be customized (up to 1 hour).
- Created via AWS SDK or AWS CLI.

    ```bash
    aws s3 pregin s3://bucket-name/object-name --expires-in 120
    ```

## Enable Vault Lock in AWS Glacier 

AWS Glacier is a very low cost option fort long-ter data archiving. This started as an S3 storage class but it now a dedicated AWS service.

- Data stored in AWS Glacier are called **archives**
- Data is in `.zip` or `.tar`
- Commonly used for backups 
- Allows use of vault-lock policies

### Vault Lock Policies

A vault is a container that stores one or more archives, where an archive can contain zip files. When the vault is closed, we can apply vault lock policies.

- Vault lock policies can be configured to enforce compliance controls. 
- Syntax is is SImilar to IAM policies. 
- Allows to establich retention policies.
- Ensures that archives are not tampered with, and can only be written once and read many times.

### How does it work

- Initiate lock process by attaching the policy to your vault. 
- Validate the policy within 24 hours.
- Once validated, the lock policy is immutable.
- There's no way to change policy after its validated.
- The only way to change the policy is to break the vault.

## Forcing S3 to use CloudFront 

CloudFront is a content-delivery network (CDN) that allows you to distribute your static content globally.

- Fast, highly-secure, and programmable. 
- Allows spreading content around the globe, not just regions but also edge locations.

### Securing an S3 Origin in CloudFront

CloudFront can be be used to distribute the content stored in S3 bucket:

- Create a CloudFront distribution with an S3 origin.
- Use an CloudFront Origin Access Identiy when accessing the S3 bucket.
- Restrict S3 bucket access and update permissions.

The goal is to make sure that S3 content can only be accessed through the CloudFront and that S3 bucket cannot be accessed directly.

### TLS/SSL Certificate Options with CloudFront

When you create a CloudFront distribution, you hav the following options for TLS/SSL certificates:

- Default CloudFront certificate with the domain name:

    ```bash
    *.cloudfront.net  
    ```

- Custom SSL certificate with a domain that you own

If you use the custom SSL option, you should:

- Use certificates in AWS Certificate Manager.
- The certificates should be in us-east-1 region.
- Make sure that the certificate is valid and has proper certificate chain.


