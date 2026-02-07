---
title: "Notification System"
description: "Notification System"
tags: 
- Amazon Web Services
- Labs
- Pandas
sidebar_position: 12
last_update:
  date: 7/29/2020
---


## Requirement

The city wants to know when potholes and illegal dumping cases are piling up. We will build a notification system that alerts directors automatically.

- Keep track of directors’ emails, phone numbers, and department
- Create subscription lists based on the contact CSV
- Send alerts when case counts exceed thresholds
- The system can run on a schedule alongside regular reports

The system should automatically analyze backlog data and sends notifications to the right people

<div class='img-center'>

![](/img/docs/aws-boto3-building-a-notif-system.png)

</div>


## Pre-requisites

Required: 

- [Create an AWS Account](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md) 
- [Create the IAM Policy](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-policy) 
- [Create the IAM User](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-user)
- [Create the IAM Access Keys](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys)

**Note on the IAM Policy**: The IAM policy attached to your IAM must have the following permissions:

- `AmazonS3FullAccess`
- `AmazonSNSFullAccess`
- `AmazonRekognitionFullAccess`
- `TranslateFullAccess`
- `ComprehendFullAccess`

## Create the Topics

We will create topics for different types of issues and subscribe users to them.

To start with, create multi-level topics for water data notifications

```python
import boto3
import pandas as pd
sns = boto3.client('sns') 

dept_arns = {} 

for dept in departments:
  critical = sns.create_topic(Name="{}_critical".format(dept))
  extreme = sns.create_topic(Name="{}_extreme".format(dept))
  dept_arns['{}_critical'.format(dept)] = critical['TopicArn']
  dept_arns['{}_extreme'.format(dept)] = extreme['TopicArn']
```



## Subscribing Users

Directors receive alerts based on their department.

- Subscribe each email and phone to the correct department topic
- Use a function to handle subscriptions for each row in the DataFrame

As additional request, the people subscribed to 'critical' topics will only receive emails. On the other hand, people subscribed to 'extreme' topics will receive SMS - because those are pretty urgent.

```python
for index, user_row in contacts.iterrows():

  critical_tname = '{}_critical'.format(user_row['Department'])
  extreme_tname = '{}_extreme'.format(user_row['Department'])

  critical_arn = sns.create_topic(Name=critical_tname)['TopicArn']
  extreme_arn = sns.create_topic(Name=extreme_tname)['TopicArn']
  
  sns.subscribe(TopicArn = critical_arn, 
                Protocol='email', Endpoint=user_row['Email'])
  sns.subscribe(TopicArn = extreme_arn, 
                Protocol='sms', Endpoint=str(user_row['Phone']))
```

Email subscriptions require confirmation by clicking a link. SMS subscriptions are confirmed automatically.

<div class='img-center'>

![](/img/docs/aws-boto3-subscribe-users.png)

</div>

## Getting Aggregated Counts

We pull last month’s report to check backlog levels.

- Set the index on `service_name` for easy access
- Extract counts for water violations

```python
## Set index to access counts by service name
report = pd.read_csv('http://gid-reports.2019/feb/final_report.csv')
report.set_index('service_name', inplace=True)

## Get aggregated numbers
vcounts = report.at['water', 'count']
streets_count = report.at['streets', 'count']
```

## Sending Alerts

Messages are sent only when counts exceed set thresholds.

- Compare water violations to the threshold
- If exceeded, publish a message with a subject line for emails

According to the client, when there are over 100 alerts outstanding, that's considered critical. If there are over 300, that's extreme.

```python
if vcounts['water'] > 100:
  sns.publish(
    TopicArn = dept_arns['water_critical'],
    Message = "{} water issues".format(vcounts['water']),
    Subject = "Help fix water violations NOW!")

if vcounts['water'] > 300:
  sns.publish(
    TopicArn = dept_arns['water_extreme'],
    Message = "{} violations! RUN!".format(vcounts['water']),
    Subject = "THIS IS BAD.  WE ARE FLOODING!")
```

