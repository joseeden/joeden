---
title: "AWS Certificate Manager"
description: "Provision and manage SSL/TLS certificates"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 64
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## AWS Certificate Manager

It is a service that lets you easily provision, manage, and deploy plublic and private SSL/TLS certificates.

- These certficates can be used to secure network communications.
- Can be used to establish identiy of websites over the internet. 
- Quicker way to purchase, upload, and renew SSL/TLS certificates.
- Can be used with AWS Loadbalancers and AWS CloudFront.
- Can be automatically renewed as long as:
    - domain is purchased in AWS Route 53
    - and it is a public hosted zone
- ACM TLS/SSL certificates cannot be exported.

## How it works:

1. Add a domain name which can be:

    - Purchased through AWS Route53
    - Existing domain name added to AWS Route53

2. Validate the domain through:

    - **DNS Validation**, where you need to modify the domain name to contain a DNS record generated by ACM
    - **Email validation**, if you don't have permission to modify the DNS configuration

3. Review 
4. Validate