---
title: "AWS SAM"
description: "Build and deploy serverless applications"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Serverless
- Certifications
sidebar_position: 25
last_update:
  date: 7/26/2020
---



:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## AWS Serverless Application Model (SAM)

AWS Serverless Application Model (SAM) is framework for developing and deploying serverless applications in AWS.

- All the configuration for SAM is stored in YAML code. 
- Deploy the services automatically (similar to CloudFormation).
- Help to run Lambda, API Gateway and DynamoDB locally.
- SAM can used CodeDeploy for quick deployments and pipelines.

The configurations can contain settings for:

- Lambda Functions
- DynamoDB tables
- API Gateway
- Cognito User Pools

Here’s an example of a basic serverless application. This application processes requests to get all items from a database through an HTTP request. 

![](/img/docs/aws-sam-deploy.png)

It consists of the following parts:

- A function that contains the logic to process the request.

- An HTTP API to serve as communication between the client (requestor) and the application.

- A database to store items.

- Permissions for the application to run securely.

This application's infrastructure code can be defined in the following AWS SAM template:

```bash
AWSTemplateFormatVersion: 2010-09-09
Transform: AWS::Serverless-2016-10-31
Resources:
  getAllItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/get-all-items.getAllItemsHandler
      Runtime: nodejs12.x
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
    Connectors:
      MyConn:
        Properties:
        Destination:
          Id: SampleTable
          Permissions:
            - Read
  SampleTable:
    Type: AWS::Serverless::SimpleTable  
```

To learn more, please see [What is the AWS Serverless Application Model (AWS SAM)?](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)

