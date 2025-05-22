---
title: "Amazon SQS"
description: "Distributed message queuing service"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Integration
- Messaging
- Certifications
sidebar_position: 2
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Simple Queue Service (SQS)

<div class="img-center">

![](/img/docs/aws-sqs.png)

</div>


## Standard Queue

- Oldest offering on AWS (over 10 years old).
- Fully managed service, used to decouple applications.
- Can have duplicate messages (at least once delivery).
- Can have out of order messages (best effort ordering).
- Attributes:
    - Unlimited throughput.
    - Unlimited number of messages in the queue.
    - Each message is short leaved: 
        - default retention period is 4 days
        - maximum is 14 days
    - Low latency: 
        - Less than 10 ms on publish and receive
    - Limitation for message size: 
        - maximum size of a message is 256KB

## Delay Queue

- Delaying a message means the consumers wont be able to see the message for a period of time after it was sent. 
- Delay time can be up to 15 minutes.
- Delay can be set at a queue level or tt also can be set to message level using the **DelaySeconds** parameter

## FIFO Queue

- FIFO - First In First Out
- The messages will be ordered in the queue, meaning that the messages will be consumed in the same order as they were sent.
- FIFO queues have limited throughput: 300 msg/s without batching, 3000 msg/s with batching.
- Exactly-once send capability (by activating content-based deduplication).
- The name of the FIFO queue must end with the `.fifo`.

    <div class="img-center">

    ![](/img/docs/aws-sqs-fifo-queueueue.png)

    </div>


   


## Producing Messages

- Producers send messages to the queue using the SDK (SendMessage API).
- The message is persisted on the queue until a consumer deletes it.
- Message retention: default 4 days, up to 14 days.
- SQS standard has unlimited throughput.

    <div class="img-center">

    ![](/img/docs/aws-sqs-producemsgs.png)

    </div>


## Consuming messages

- Consumers are applications (running on EC2 instances, other servers or AWS Lambda).
- Consumers poll the queue for messages (they can receive up to 10 messages at a time).
- After the messages are processed the consumers delete the messages from the queue using DeleteMessage API.
- Multiple consumers:
    - Consumers receive the messages in parallel.
    - Each consumer consumes a fraction of the number of the messages sent.
    - We can scale the number of the consumers based on the throughput of processing.
- SQS with Auto Scaling Group:
    - We can scale based on the **ApproximateNumberOfMessages** metric by creating a CloudWatch alarm.

    <div class="img-center">

    ![](/img/docs/aws-sqs-consumemssgs.png)

    </div>



## Message Visibility Timeout

- After a message is polled by a consumer, it becomes invisible to other consumers.
- Default message visibility timeout is 30 seconds, which means the consumer has 30 seconds to process the message.
- After the message visibility timeout is over, the message becomes visible to other consumers.
- If the processing is not finished during the visibility timeout, there is a chance the message will be processed twice.
- If a consumer knows that the processing wont finish in time, it can use the **ChangeVisibility** API to request more time.
- If the message visibility timeout is high and the processing fails, it may take a long time for the message to be processed again.
- If the visibility timeout it too short, we may end up processing the same message twice.
- Best practice: the visibility timeout should be set to something appropriate. 
- The consumer must be implemented in a way to use the ChangeVisibility API.

## Dead Letter Queues

- If a consumer fails to process a message within the visibility timeout, the messages goes back to the queue. This can happen multiple times.
- We can set a **MaximumReceives** threshold, which denotes how many time a message should be able to go back to the queue.     
- If the MaximumReceives threshold is exceeded, the message is sent to a dead letter queue
- DLQs are useful for debugging.        
- We have to make sure the messages are processed in DLQ before expiring. It is not a good idea to set a short expiration time for the DLQ.     

    <div class="img-center">

    ![](/img/docs/aws-sqs-dlqsss.png)

    </div>


## Long Polling 

- When a consumer requests messages from the queue, it can optionally wait for messages to arrive if there are none in the queue. 
- Long polling decreases the number of API calls made to SQS while increasing efficiency.
- Wait time can be between 1 sec to 20 sec. 
- Long polling is preferable than short polling.

    <div class="img-center">

    ![](/img/docs/aws-sqs-long-pollinggggggg.png)

    </div>


## Message Consumption Flow

<div class="img-center">

![](/img/docs/aws-sqs-consumption-flow.png)

</div>



## SQS With Auto Scaling Group


Allows scaling the number of EC2 instances based on the available messages in the queue.

- In order to accomplish auto scaling we have to create a CloudWatch custom metric representing the number of available messages on the queue divided by the number of EC2 instances. 
- This metric is pushed from an EC2 instance

    <div class="img-center">

    ![](/img/docs/aws-sqs-asggg.png)

    </div>


If the variable goes above the threshold value, this may mean:
	
- There are many  messages, or
- There are not enough instances to process those messages.

When we set the threshold value, we can set maybe set TWO ALARMS:

- When variable is below threshold value
- When variable is above threshold value 

When the variable goes above the threshold value, then alarms are breached and it will do the following:

- Cloudwatch alarm can be assigned with a scaling policy on your ASG. 
- It can scale your ASG accordingly.

   
## SQS Extended Client 

- Message size limit is 256KB, how to send large messages?
- For this, use SQS Extended CLient (Java library)

    <div class="img-center">

    ![](/img/docs/aws-sqs-extended-client.png)

    </div>



## Decouple application tiers 

<div class="img-center">

![](/img/docs/aws-sqs-decouple-app-tiers.png)

</div>




## Data Ordering in SQS

- For standard SQS queues there is no data ordering.
- For SQS FIFO, if we don't use a Group ID, messages are consumed in the order they are sent, with **only one consumer**.
- Messages can be group by specifying a Group ID for the message.
- For each group we can have different consumers, which will read messages in order.


## Security

- **Encryption**

    - In-flight encryption using HTTPS.
    - At-rest encryption using KMS.
    - Client-side encryption if the client wants to perform encryption/decryption itself.

- **Access Control**

    - IAM policies to regulate access to the SQS API.

- **SQS Access Policies**

    - Useful for cross-account access to SQS queues.
    - Useful for allowing other services (SNS, S3) to write to an SQS queue.


