---
title: "Amazon GuardDuty"
description: "Intelligent threat detection"
tags: [Cloud, AWS, DevOps, Security, Certifications]
sidebar_position: 48
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## Overview

AWS GuardDuty is an intelligent threat detection service that uses AI/Machine Learning to monitor one or more AWS accounts for malicious behavior.

- Leverages third-party feeds from cybersecurity partners
- Automate response and alerting using CloudWatch and Lamdba
- Monitors different sources of data:
    - CloudTrail
    - DNS 
    - VPC Flow logs 

![](/img/docs/awsguarddutyloggingandmonitoring.png)    


## Use cases

- Reconnaissance
    - Unusual API activity.
    - Unusual patterns of failed login requests.

- Instance compromise
    - Backdoor command and control (C&C) activity. 
    - Outbound instance communication with known malicious IP.

- Account compromise 
    - Attempts on disabling AWS CloudTrail logging.
    - Unusual instances/infrastructure launches. 

## How to get started

- Easy activation via console.
- If threat is detected, it will appear in GuardDuty dashboard and CloudWatch events. 
- takes 7-14 days to set a baseline.
- prices varies according to volume of data.
