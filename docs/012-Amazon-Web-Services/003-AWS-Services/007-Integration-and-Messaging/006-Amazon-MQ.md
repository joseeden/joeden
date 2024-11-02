---
title: "Amazon MQ"
description: "Fully managed, open-source message brokers"
tags: [Cloud, AWS, DevOps, Integration, Messaging, Certifications]
sidebar_position: 6
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::

## Overview

- SQS and SNS are cloud-native, they are using proprietary protocols from AWS.
- Traditional application running on on-premise may use queues with open protocols such as: MQTT, AMQP, STOMP, Openwire, WSS.
- When migrating to cloud instead of re-engineering the application to SQS or SNS, we can use Amazon MQ.
- Amazon MQ is basically managed Apache ActiveMQ.
- Amazon MQ does not scale as much as SQS/SNS.
- It runs on a dedicated machine, can urn in HA with failover.
- It has both queue anf topic features.