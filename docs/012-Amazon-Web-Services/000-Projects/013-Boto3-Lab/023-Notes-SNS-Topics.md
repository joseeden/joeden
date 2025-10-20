---
title: "Notes: SNS"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 23
last_update:
  date: 7/29/2020
---

## Overview

Amazon Simple Notification Service (SNS) helps send alerts like emails, text messages, and push notifications easily.

- Publishers send messages to topics
- Subscribers receive the messages

In SNS, a topic acts as the central channel that connects the publisher and subscribers.

<div class='img-center'>

![](/img/docs/datacamp-sns-primer.png)

</div>

## Accessing SNS on AWS

You can use the AWS console to work with SNS.

- Open the AWS Services tab
- Search for “SNS”
- Click on “Simple Notification Service”

Once opened, you’ll be able to view and manage all topics and subscriptions.

- Topics appear on the left
- Subscriptions are also listed there
- Each topic has a unique ARN (Amazon Resource Name)

This ARN is important as it uniquely identifies your topic when using SNS in code.

<div class='img-center'>

![](/img/docs/datacamp-sns-sample-sns-topic.png)

</div>

## Topic Behavior and Permissions

SNS topics behave predictably when recreated.

- Creating a topic with the same name returns the same ARN
- It doesn’t create duplicates
- IAM permissions must allow SNS access


## Creating an SNS Topic

To create a topic:

```python
## create client
import boto3
sns = boto3.client('sns')

response = sns.create_topic(Name='MyAlerts')
topic_arn = response['TopicArn']
print(topic_arn)
```

Output example:

```
arn:aws:sns:us-east-1:123456789012:MyAlerts
```

You can now see your topic in the AWS SNS dashboard.

## Listing Existing Topics

You can see all existing SNS topics your user has access to. The response will include all Topic ARNs

```python
response = sns.list_topics()
for topic in response['Topics']:
    print(topic['TopicArn'])
```

## Deleting a Topic

When a topic is no longer needed, it’s best to remove it.

```python
sns.delete_topic(TopicArn=topic_arn)
print("Topic deleted.")
```

