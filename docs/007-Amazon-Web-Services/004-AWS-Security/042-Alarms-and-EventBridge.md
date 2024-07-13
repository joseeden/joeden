---
title: "Alarms and EventBridge"
description: "CloudWatch Alarms and EventBridge"
tags: [Cloud, AWS, Cloud, DevOps, Security, Certifications]
sidebar_position: 42
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::


## CloudWatch Alarms

Amazon CloudWatch Alarms tightly integrate with Metrics and they allow you to implement automatic actions based on specific thresholds that you can configure relating to each metric. Examples include:

- Set an alarm to activate an auto scaling operation.
- Provisioning another instance if your CPUUtilization peaked at 75% for more than 5 minutes.
- Send a message to an SNS Topic when the same instance drops back below the 75% threshold.

### Alarm States 

There are 3 different states for any alarm associated with a metric:

- **OK** – The metric is within the defined configured threshold

- **ALARM** – The metric has exceeded the thresholds set

- **INSUFFICIENT_DATA** – The alarm has just started, the metric is not available, or not enough data is available for the metric to determine the alarm state.

### Integration 

CloudWatch alarms are also easily integrated with your dashboards as well, allowing you to quickly and easily visualize the status of each alarm.  When an alarm is triggered into a state of ALARM, it will turn red on your dashboard, giving a very obvious indication.

## CloudWatch EventBridge

CloudWatch EventBridge is a feature that has evolved from an existing feature called Amazon Events. CloudWatch EventBridge provides a means of connecting your own applications to a variety of different targets, typically AWS services, to allow you to implement a level of **real-time monitoring**, allowing you to respond to events that occur in your application as they happen.   

But what is an **event**? Basically, an event is anything that causes a change to your environment or application.

Benefits of using CloudWatch EventBridge:

- Implement a level of event-driven architecture in a real-time decoupled environment.  
- Establishes a connection between applications and specified targets to allow a data stream of events to be sent. 


### Rules

A rule acts as a filter for incoming streams of event traffic and then routes these events to the appropriate target defined within the rule.  The rule itself can route traffic to multiple targets, however the target must be in the same region. 

### Targets

Targets are where the events are sent by the rules. All events received by the target are done in a JSON format. Here are a few targets that can be used as a destination for events:

- Lambda functinos 
- Amazon EC2 instances 
- Streams in Amazon Kinesis Data Streams 
- Delivery Streams in Amazon Kinesis Data Firehose
- Log groups in Amazon CloudWatch Logs 
- Amazon ECS KodeKloud_Tasks 
- System Manager Run Command
- System Manager Automation 

For the latest list of targets, please see the relevant documentation here: 
https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-targets.html


### Event Buses

An Event Bus is the component that actually receives the Event from your applications and your rules are associated with a specific event bus.  CloudWatch EventBridge uses a default Event bus that is used to receive events from AWS services, however, you are able to create your own Event Bus to capture events from your own applications. 
