---
title: "AWS Integration and Messaging"
description: "Using CLI and SDK"
tags: [Cloud, AWS, DevOps, Integration, Messaging, Certifications]
sidebar_position: 1
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Overview

When we start deploying multiple applications, they will inevitable result in the necessity to communicate with one another. 

![](/img/docs/aws-integ-msging.png)


There are 2 types of integration communication patterns:

- Synchronous communication
- Asynchronous communication

Synchronous communication between applications can be problematic if there are sudden spikes of traffic. As a solution, we can decouple our applications using:

- SQS: queue model
- SNS: pub/sub model
- Kinesis: real-time streaming model

   
