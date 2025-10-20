---
title: "Project: FixItFast"
description: "Project: FixItFast"
tags: 
- Amazon Web Services
- Labs
sidebar_position: 10
last_update:
  date: 7/29/2020
---

## Overview 

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


## Pre-requisites

Required: 

- [Create an AWS Account](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md) 
- [Create the IAM Policy](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#create-the-iam-policy) 
- [Create the IAM User](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#iam-users)
- [Create the IAM Access Keys](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys)

**Note on the IAM Policy**: The IAM policy attached to your IAM must have the following permissions:

- `AmazonS3FullAccess`
- `AmazonSNSFullAccess`
- `AmazonRekognitionFullAccess`
- `TranslateFullAccess`
- `ComprehendFullAccess`

## Project: FixItFast 

FixItFast is an app used by residents to report public issues.

- Residents report potholes or broken streetlights
- The data is sent to city systems through AWS
- Use Boto3 and other AWS tools to analyze and visualize reports

