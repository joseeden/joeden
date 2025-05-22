---
title: "DDOS Attacks"
description: "Distributed Denial of Service (DDoS)"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Security
- Certifications
sidebar_position: 70
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Distributed Denial of Service (DDoS) Attack 

The goal of this attack is to make your application unavailable to your users by flooding your application with requests to make the service unusable and drain your resources. Different techniques can be used:

- large botnets
- reflection 
- amplification 

## How are DDoS Attacks Mitigated

- Decrease attack surface area:

    - Minimize the exposure. 
    - Does the entry point need to be public. 
    - Use VPC or other methods for private access. 

- Enable scaling to absorb impact of an attack: 

    - Doesn't fix the attack but helps to tolerate attacks.
    - Cost of scaling versus the revenue loss due to unavailability. 

- Understand what normal behavior is and be prepared for attack:

    - Can you spot when something is happening?
    - Who do you contact?
    - How do you react?

## AWS Technologies that can help to mitigate DDoS attack

- AWS WAF, Shield, and Shield Advanced 
- Route53 
- CloudFront 
- Elastic Loadbalancer 
- Autoscaling
- CloudWatch 
