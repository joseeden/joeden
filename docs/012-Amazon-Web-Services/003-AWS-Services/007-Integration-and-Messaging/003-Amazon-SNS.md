---
title: "Amazon SNS"
description: "Fully managed Pub/Sub service"
tags: [Cloud, AWS, DevOps, Integration, Messaging, Certifications]
sidebar_position: 3
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::




## Simple Notification Service (SNS)

<div class="img-center"> 

|![](/img/docs/aws-snssss.png)|
|-|

</div>

Features:

- Pub/Sub model
- The event produces only sends messages to one SNS topic.
- Each subscriber to the topic will get all the messages be default (we can filter them, if we want).
- We can have up to 10 million subscribers per topic.
- We cave up to 100K topics.
- Subscribers to the topic can be:
    - SQS
    - HTTP/HTTPS
    - Lambda
    - Emails
    - SMS messages
    - Mobile Notifications

## Integrations 

- CloudWatch (for alarms)
- Auto Scaling Groups notifications
- S3 (bucket events)
- CloudFormation (state changes)

   


## Publishing events 

- **How to publish?**

    - In order to publish we must create a topic using the SDK.
    - We may create one or many subscriptions.
    - We publish data to the topic.

- **Direct Publish (for mobile apps SDK)**

    - Create a platform application.
    - Create a platform endpoint.
    - Publish to the platform endpoint.
    - Works with Google GCM, Apple APNS, Amazon ADM.

   

## SNS + SQS Fan Out

<div class="img-center">

![](/img/docs/aws-sns-sqssss.png)

</div>

Features:

- Send a message to multiple SQS queues using SNS.
- Push one in SNS, receive in all SQS queues which are subscribers.
- Fully decouples, no data loss.
- SQS allows for data persistance, delayed processing and retries of work.
- Ability to add more SQS subscribers over time.
- SQS queues must have an allow access policy for SNS to be able to write to the queues.
- **SNS cannot send messages to SQS FIFO queues (AWS limitation)!**

Use case:

- Send S3 events to multiple queues.
- For the same combination of even type and prefix we can only have one S3 Event rule.
- In case we want to send the same S3 event to many SQS queues, we must use SNS fan-out.


   