---
title: Deploy Serverless Application using Jenkins
tags: [Linux, AWS, Jenkins, Labs]
sidebar_position: 12
# last_update:
#   date: 11/2/2024
---


## Overview

Using Jenkins to deploy a serverless application streamlines automation and enables continuous integration and delivery (CI/CD) for efficient and consistent deployment.

- Trigger deployments on code changes
- Use AWS SAM CLI or AWS CLI for build and deploy steps
- Set environment variables for AWS access
- Add testing and validation before deployment

To deploy an AWS Serverless Application Model (SAM) application manually first, you can check out the previous lab on [AWS SAM.](/docs/012-Amazon-Web-Services/011-Projects/011-Serverless-Application-Model/README.md)



## Pre-requisites 

You will need to install the following in your local computer:

- [AWS Account](https://aws.amazon.com/resources/create-account/)

- [AWS CLI](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#aws-cli)

- [AWS SAM CLI](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#aws-sam-cli)

- [Python 3.10](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#python-310)

- [Pip](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#pip)


If you are using Ubuntu 22.04, you might only be able to install Python 3.10.

- [Python 3.12](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#python-312)


## Authenticate Your CLI

To use the AWS SAM CLI, first create an IAM user in the AWS Console and generate access keys for that user. Attach the `AdministratorAccess` policy to this user temporarily to ensure they have the necessary permissions to run AWS SAM CLI commands.

For more information, see [IAM Users and Access Keys](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#iam-users-and-access-keys).




## Create the Base Configuration File


## Build and Package the Application 

After initializing the project, the next step is to build and package the application. Go to the project directory and run:

```bash
cd sam-app
sam build
sam deploy 
```

## Deleting the Function 

To delete the function:

```bash
sam delete 
```

Enter `y` twice to confirm:

```bash
Are you sure you want to delete the stack sam-app in the region ap-southeast-1 ? [y/N]: y
Do you want to delete the template file 0cfc681b8281d439d475f4ca2090e4ac.template in S3? [y/N]: y
- Deleting S3 object with key 472b4bdb4a2b33287061ad1bf41a08ed
- Deleting S3 object with key 0cfc681b8281d439d475f4ca2090e4ac.template
- Deleting Cloudformation stack sam-app

Deleted successfully 
```