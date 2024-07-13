---
title: "Serverless and Lambda"
description: "Server management done by the Cloud"
tags: [Cloud, AWS, DevOps, Serverless, Certifications]
sidebar_position: 1
last_update:
  date: 8/30/2020
---



:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## What is Serverless 

A serverless architecture is a way to build and run applications and services without having to manage infrastructure. Your application still runs on servers, but all the server management is done by the cloud provider.

- Initially Serverless = FaaS (Function as a Service), but now it can mean a lot more
- Serverless was pioneered by AWS Lambda but now the concept also includes anything that is not managed: databases, messaging, storage, etc.

## Serverless in AWS

- AWS Lambda
- DynamoDB
- AWS Cognito
- AWS API Gateway
- Amazon S3
- AWS SNS and SQS
- AWS Kinesis Data Firehose
- Aurora Serverless
- Step Functions
- Fargate

## AWS Lambda

AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers. 

- AWS Lambda Functions are virtual functions, which means there are no servers to manage
- There are limited to time - they require short execution times
- They run on-demand - we are only billed when the function is running
- Scaling is automated

### Benefits 

- Lambda is integrated with the AWS suite of services
- It supports a lot of programming languages
- Easy monitoring through AWS CloudWatch
- Easy to get more resources per functions (up to 3GB or RAM)
- Increasing the RAm will also increase the CPU and network
- Easy pricing
    - Pay per request and compute time
    - Generous free tier: 1 million AWS requests for free and 400K GBs compute time

### Supported Languages

- NodeJS (JavaScript)
- Python
- Java
- C# (.NET Core and PowerShell)
- Golang
- Ruby
- Custom Runtime API (community supported, example Rust)    

### AWS Lambda Integrations

Main ones:

- API Gateway
- Kinesis
- DynamoDB
- S3
- CloudFront
- CloudWatch Events and EventBridge
- CloudWatch Logs
- SNS and SQS
- AWS Cognito


### AWS Lambda Pricing

<small>Reference: https://aws.amazon.com/lambda/pricing/</small>

- Pay per call:
    - First 1 million requests are free
    - $0.20 per 1 million requests

- Pay per duration:
    - 400K GB-seconds of compute time for free which means 400K seconds of running time if the function has 1GB of RAM, 3.2 million of seconds if the function requires 128 MB of RAM
    - After that $1 for 600K GB-seconds

### AWS Lambda Limits - per region

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

### AWS Lambda Configuration 

Configuration | Description
---------|----------
 Timeout | default 3s, max of 300s |
 Environment variables | variables that can be used by the function | 
 Allocated Memory | 128MB, up to 3GB |
 VPC | Lambda function can be attached to a VPC + security groups |
 IAM Execution Role | IAM Role used by the function |



### Concurrency  

- Concurrency up to 1000 executions.
- Limit can be increased by raising a AWS Support ticket.
- Each invocation over the concurrency limit will trigger a throttle.

### Throttling 

- If synchronous invocation - will return **ThrottleError 429**.
- If asynchronous invocation - will retry automatically and then go to DLQ.

### Retries and Dead Letter Queue (DLQ)

- If a Lambda function asynchronous invocation fails, it will be retried twice. 
- After all retries, unprocessed events go to DLQ. 
- DLQ can be an SNS Topic or a SQS Queue. 
- The original event payload is sent to DLQ. 
- This makes it easy to debug what's wrong with the function.


### Monitoring and Tracing 

- **CloudWatch**

    - AWS Lambda execution logs are stored in AWS CloudWatch Logs. 
    - AWS Lambda metrics are displayed in AWS CloudWatch Metrics. 

- **X-ray**

    - Lambda code can be traced using X-Ray. 
    - Use AWS SDK in the code. 
    - Ensure Lambda function has correct IAM execution role.

### Best Practices 

- Perform heavy-duty work outside of your function handler. 
- Use environment variables. 
- Minimize your deployment package size to it runtime necessities. 
- Avoid using recursive code. 
- Don't attach a Lambda function to a VPC unless you have to.


 


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


 
