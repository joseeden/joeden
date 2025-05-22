---
title: "Lambda"
description: "Run code without provisioning servers"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Serverless
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

AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. 

- They are virtual functions, no servers to manage
- Time-limited, they require short execution times
- On-demand, we are only billed when function is running
- Scaling is automated

Benefits:

- Integrated with the AWS suite of services
- It supports a lot of programming languages
- Easy monitoring through AWS CloudWatch
- Easy to get more resources per functions (up to 3GB or RAM)
- Increasing RAM will also increase the CPU and network

Pricing:

- Pay per request and compute time
- Free tier: free 1 million AWS requests and 400K GBs compute time

## Supported Languages

Lambda supports the following languages:

- NodeJS (JavaScript)
- Python
- Java
- C# (.NET Core and PowerShell)
- Golang
- Ruby
- Custom Runtime API (community supported, example Rust)    

## Integrations

AWS Lambda connects with various AWS services to enable event-driven functions.

- API Gateway
- Kinesis
- DynamoDB
- S3
- CloudFront
- CloudWatch Events and EventBridge
- CloudWatch Logs
- SNS and SQS
- AWS Cognito


## Pricing

<small>Reference: https://aws.amazon.com/lambda/pricing/</small>

- Pay per call
    - First 1 million requests are free
    - $0.20 per additional 1 million requests

- Pay per duration
    - 400K GB-seconds of compute time free
    - Equals 400K seconds with 1 GB RAM
    - Equals 3.2 million seconds with 128 MB RAM
    - $1 per additional 600K GB-seconds


## Limits per region

- **Execution**

    - Memory allocation: 128 MB - 3008 MB (64 MB increments)
    - Maximum execution time: 900 seconds (15 minutes)
    - Environment variables: 4 KB
    - Disk capacity in the function container (`/tmp`): 512 MB
    - Concurrent executions: 1000 per account (can be increased after a request)

- **Deployment**

    - Lambda function deployment size (compressed.zip): 50 MB
    - Uncrompressed deployment size: 250 MB
    - We can use `/tmp` directory to load other files at the startup    

## Event Triggers 

An event is needed to trigger Lamdba functions. Once the trigger occurs, the Lambda function run and perform the configured actions. It also gets access to:

- **Event Object** - contains metadata about the event
- **Context Object** - the action and the execution environment

![](/img/docs/1102-aws-lambda-event-triggers.png)

The context object will include:

- `functionName`
- `functionVersion`
- `invokedFunction`
- `awsRequestId`
- `logGroupName`
- `logStreamName`
- `getRemainingTimeInMills`

## Configuration 

Configuration           | Description                                                   |
------------------------|---------------------------------------------------------------|
 Timeout                | default 3s, max of 300s                                       |
 Environment variables  | variables that can be used by the function                    | 
 Allocated Memory       | 128MB, up to 3GB                                              |
 VPC                    | Lambda function can be attached to a VPC + security groups    |
 IAM Execution Role     | IAM Role used by the function                                 |

To increase performance of your Lambda functions, you can increase the memory. This will increase the CPU power which can speed up your Lambda functions but it will also increase the costs.

![](/img/docs/1102-aws-lambda-increase-memory-cpu-but-increase-cost-too.png)


## Concurrency and Throttling

- **Concurrency**

    - Concurrency up to 1000 executions.
    - Limit can be increased by raising a AWS Support ticket.
    - Invocations over the concurrency limit will trigger a throttle.

- **Throttling** 

    - If synchronous invocation - will return **ThrottleError 429**.
    - If asynchronous invocation - will retry automatically and then go to DLQ.

## Retries and Dead Letter Queue (DLQ)

Lambda handles failed asynchronous calls with retries and a Dead Letter Queue (DLQ) for unprocessed events.

- Failed invocations are retried twice
- Unprocessed events go to DLQ after retries
- DLQ can be an SNS Topic or SQS Queue
- Original event payload is sent to DLQ for easy debugging


## Monitoring and Tracing 

- **CloudWatch**

    - AWS Lambda execution logs are stored in AWS CloudWatch Logs. 
    - AWS Lambda metrics are displayed in AWS CloudWatch Metrics. 

- **X-ray**

    - Lambda code can be traced using X-Ray. 
    - Use AWS SDK in the code. 
    - Ensure Lambda function has correct IAM execution role.

## Best Practices

These are best practices to optimize AWS Lambda performance and efficiency.

- Perform heavy-duty work outside the function handler
- Use environment variables for configuration
- Minimize deployment package to essentials
- Avoid recursive code
- Only attach Lambda to a VPC if necessary

## AWS Lambda as Containers

AWS Lambda supports container images for deploying functions. This is ideal for applications needing custom runtimes or dependencies.

- Use Docker to package Lambda functions as container images
- Supports images up to 10 GB, allowing larger dependencies

**Note**: You can’t use just any Docker image; it must be compatible with AWS Lambda and include an implementation of the AWS Lambda runtime API.

## AWS Lambda@Edge

Used for running global Lambda functions alongside edge locations (for CDN for example)

- **Changing CloudFront requests and responses**

    - After CloudFront receives a request from a  viewer (viewer request)
    - Before CloudFront receives the request from the origin (origin request)
    - After CloudFront receives the response from the origin (origin response)
    - Before CloudFront forwards the response to the viewer (viewer response)
    - Customize the CDN content

- **Use cases**

    - Website security and privacy
    - Dynamic Web Application at the Edge
    - Search Engine Optimization (SEO)
    - Intelligent Route across origins and data centers
    - Bot mitigation at the Edge
    - Real-time image transformation
    - A/B testing
    - User authentication and authorization
    - User prioritization
    - User tracking and analytics


 
