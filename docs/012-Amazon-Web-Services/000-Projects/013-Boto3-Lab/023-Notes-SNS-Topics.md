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

## SNS Topics 

### Topic Behavior and Permissions

SNS topics behave predictably when recreated.

- Creating a topic with the same name returns the same ARN
- It doesn’t create duplicates
- IAM permissions must allow SNS access


### Creating an SNS Topic

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

### Listing Existing Topics

You can see all existing SNS topics your user has access to. The response will include all Topic ARNs

```python
response = sns.list_topics()
for topic in response['Topics']:
    print(topic['TopicArn'])
```

### Deleting a Topic

When a topic is no longer needed, it’s best to remove it.

```python
sns.delete_topic(TopicArn=topic_arn)
print("Topic deleted.")
```

## SNS Subscriptions

Subscriptions are how users receive updates from a topic in Amazon SNS.

- Each subscription has a unique ID
- It also includes a protocol such as email or SMS
- The endpoint is the phone number or email where messages are delivered

SNS supports many types of message delivery, including

- Email, for sending notifications to email addresses
- SMS, for sending text messages to mobile numbers

### Subscription Details

Each subscription has a few key properties.

- The **protocol** defines how the message is delivered
- The **endpoint** is the specific email or phone number
- The **status** shows if the user has confirmed the subscription

Phone numbers confirm automatically, while email subscriptions require clicking a confirmation link.

### Create an SMS Subscription

To create a text message (SMS) subscription using boto3:

```python
import boto3
sns = boto3.client('sns')

response = sns.subscribe(
    TopicArn='arn:aws:sns:us-east-1:123456789012:city_alerts',
    Protocol='sms',
    Endpoint='+15551234567'
)

print(response['SubscriptionArn'])
```

This returns a `SubscriptionArn`, which uniquely identifies your subscription.

```bash
arn:aws:sns:us-east-1:123456789012:city_alerts:55555555-aaaa-bbbb-cccc-555555555555
```


### Create an Email Subscription

We can also subscribe using an email address instead of a phone number.

- Use the same `subscribe()` method
- Set the protocol to “email”
- Provide the recipient’s email address as the endpoint

```python
response = sns.subscribe(
    TopicArn='arn:aws:sns:us-east-1:123456789012:city_alerts',
    Protocol='email',
    Endpoint='user@example.com'
)
print(response)
```

At first, the status shows **pending confirmation**. The recipient must click the link in their email to activate it. Once confirmed, it changes to **confirmed** and can receive notifications.



### List Subscriptions for a Topic

You can list all subscribers connected to a topic.

```python
response = sns.list_subscriptions_by_topic(
    TopicArn='arn:aws:sns:us-east-1:123456789012:city_alerts'
)

for sub in response['Subscriptions']:
    print(sub['Protocol'], sub['Endpoint'], sub['SubscriptionArn'])
```

The response contains a list of all subscriptions for that topic

```bash
email user1@example.com arn:aws:sns:us-east-1:123456789012:city_alerts:11111111-aaaa-bbbb-cccc-111111111111
sms +15551234567 arn:aws:sns:us-east-1:123456789012:city_alerts:22222222-aaaa-bbbb-cccc-222222222222
lambda arn:aws:lambda:us-east-1:123456789012:function:process_alert arn:aws:sns:us-east-1:123456789012:city_alerts:33333333-aaaa-bbbb-cccc-333333333333
```


### List All Subscriptions

You can also view every subscription across all topics.

```python
response = sns.list_subscriptions()

for sub in response['Subscriptions']:
    print(sub['TopicArn'], sub['Protocol'], sub['Endpoint'], sub['SubscriptionArn'])
```

Output:

```bash
arn:aws:sns:us-east-1:123456789012:city_alerts sms +15551234567 arn:aws:sns:us-east-1:123456789012:city_alerts:55555555-aaaa-bbbb-cccc-555555555555
arn:aws:sns:us-east-1:123456789012:weather_updates email user@example.com arn:aws:sns:us-east-1:123456789012:weather_updates:99999999-dddd-eeee-ffff-999999999999
```

### Delete Subscriptions

To stop sending notifications to certain users:

```python
sns.unsubscribe(SubscriptionArn='arn:aws:sns:us-east-1:123456789012:abc123')
print("Subscription removed.")
```


### Remove Multiple Subscriptions

You can also remove multiple subscriptions at once, for example, all SMS-based ones.

```python
response = sns.list_subscriptions()
for sub in response['Subscriptions']:
    if sub['Protocol'] == 'sms':
        sns.unsubscribe(SubscriptionArn=sub['SubscriptionArn'])
```


## Sending Messages

Sending messages with Amazon SNS is simple and flexible. You can broadcast to many people or send a single text message to one recipient.

- You can publish to a topic
- You can send a single SMS message
- You can also customize each message

### Publishing To A Topic

When you publish to a topic, every subscriber connected to that topic receives the message. This method helps distribute one message to many recipients at once.

```python
import boto3
sns = boto3.client('sns')

sns.publish(
    TopicArn='arn:aws:sns:us-east-1:123456789012:weather_alerts',
    Message='Heavy rain expected tomorrow. Stay safe!',
    Subject='Weather Update'
)
```

Expected result:

```bash
{
  'MessageId': 'abcd1234-5678-efgh-ijkl-1234567890ab'
}
```


### Message And Subject

The message body and subject determine what the subscribers receive.

- `Message` is the main text
- `Subject` appears only in email messages
- SMS messages ignore the subject line

This keeps email messages clear and detailed, while SMS messages stay short and direct.


### Sending Custom Messages

You can create messages dynamically using variables.

```python
city = "Springfield"
temp = 35

sns.publish(
    TopicArn='arn:aws:sns:us-east-1:123456789012:weather_alerts',
    Message=f"Alert for {city}: Temperature reaching {temp}°C today!"
)
```


### Sending A Single SMS

You can also send one SMS directly to a phone number.

```python
sns.publish(
    PhoneNumber='+15551234567',
    Message='System maintenance scheduled for 10 PM tonight.'
)
```


Sending direct SMS messages works well for quick, one-time alerts.

- Good for temporary notifications
- Not ideal for repeated or automated use
- Harder to maintain in larger systems

For growing systems, topics make it easier to manage subscribers and updates.


### Topic vs Single SMS

There are two main ways to send messages.

- **Publish to a topic**

  - Reaches multiple subscribers
  - Easier to maintain

- **Send a single SMS**

  - Simple for one recipient
  - Great for quick, direct messages

