---
title: "Logging to CloudWatch"
description: "Control Plane Logging to CloudWatch"
tags: 
 
  - Cloud
    - DevOps
    - Containers
    - Containerization
    - Kubernetes
    - Amazon EKS
sidebar_position: 14
last_update:
  date: 7/7/2022
---


## Overview

Since AWS manages the Control Plane, we can't directly access the hosts that manage the logs. However, we can view these logs in CloudWatch by enabling the log types we want to send.

**Log Types:**

- API
- Audit
- Authenticator
- Control Manager
- Scheduler

To access the logs, go to the CloudWatch dashboard in the AWS Management Console. 

- Each log type creates a separate CloudWatch log stream.
- Log streams are prefixed with `/aws/eks/cluster-name`.
- Storing and collecting logs may incur [additional costs](https://aws.amazon.com/cloudwatch/pricing/).

  