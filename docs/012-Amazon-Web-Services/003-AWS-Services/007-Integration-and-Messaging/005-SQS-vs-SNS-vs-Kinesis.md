---
title: "SQS vs. SNS vs. Kinesis"
description: "Difference between the three services"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Integration
- Messaging
- Certifications
sidebar_position: 5
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

- **SQS**

    - Consumers pull data.
    - Data is deleted after being consumed.
    - Can have many consumers as we want.
    - No need to provision throughput.
    - No ordering guarantee in case of standard queues.
    - Capability to delay individual messages.

- **SNS**

    - Pub/Sub: publish data to many subscribers.
    - We can have up to 10 million subscribers per topic.
    - Data is not persisted (it is lost if not delivered).
    - Up to 10k topics per account.
    - No need to provision throughput.
    - Integrates with SQS for fan-out architecture.

- **Kinesis Data Streams**

    - Consumers "pull data".
    - We can have as many consumers as we want.
    - Possibility to replay data.
    - Recommended for real-time big data analytics and ETL.
    - Ordering happens at the shard level.
    - Data expires after X days.
    - Must provision throughput.