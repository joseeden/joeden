---
title: "GetItDone Automation with Boto3"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 5
last_update:
  date: 7/29/2020
---

## Overview 

This project uses Boto3 to automate parts of a city service-request workflow for the **GetItDone** app. 

The lab covers the following: 

1. Store and retrieve request data with S3
2. Publish monthly reports and charts
3. Send threshold-based alerts with SNS
4. Detect objects, text, language, translations, and sentiment


## Using Boto3 

Boto3 is the Python library used to interact with AWS. It lets us manage AWS services using code instead of the console.

- Import boto3 to start using it
- Service name refers to any AWS service like S3, EC2, or IAM
- Region defines where your AWS resources live
- Access key and secret key act like a username and password

Some AWS services often used with Boto3.

- **IAM** manages user access
- **S3** stores and retrieves data in the cloud
- **SNS** sends notifications like emails or SMS
- **Comprehend** analyzes text for sentiment or meaning
- **Rekognition** detects objects or text in images
- **RDS**, **EC2**, and **Lambda** manage databases, virtual machines, and serverless functions

## Next Steps 

See the following pages for the detailed steps for this project:

1. [Initial Testing](/docs/035-Amazon-Web-Services/000-Projects/013-Boto3-Lab-GetItDone/010-Initial-Testing.md) 
2. [Monthly Report Generation](/docs/035-Amazon-Web-Services/000-Projects/013-Boto3-Lab-GetItDone/011-Monthly-Reports.md)
3. [Notification Systems](/docs/035-Amazon-Web-Services/000-Projects/013-Boto3-Lab-GetItDone/019-Notification-System.md)
4. [Text Analysis and Image Recognition](/docs/035-Amazon-Web-Services/000-Projects/013-Boto3-Lab-GetItDone/020-Pattern-Recognition.md)