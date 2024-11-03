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

To deploy an AWS Serverless Application Model (SAM) application manually first, you can check out the previous lab on [AWS SAM.](/docs/012-Amazon-Web-Services/010-Projects/011-Simple-AWS-SAM-Application/README.md)



## Pre-requisites 

Accounts needed:

- [AWS Account](https://aws.amazon.com/resources/create-account/)

On your local computer and on the Jenkins server, install:

- [AWS CLI](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#aws-cli)
- [AWS SAM CLI](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#aws-sam-cli)
- [Python 3.10](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#python-310)
- [Pip](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#pip)

If you are using Ubuntu 22.04, you might only be able to install Python 3.10.

- [Python 3.12](/docs/001-Personal-Notes/005-Project-Pre-requisites/005-Software.md#python-312)


## Generate Access Keys

To use the Jenkins server first create an IAM user in the AWS Console and generate access keys for that user. Attach the `AdministratorAccess` policy to this user temporarily to ensure they have the necessary permissions to run. Once you generate the key, you should have the following:

- AWS Access Key 
- AWS Secret Key

For more information, see [IAM Users and Access Keys](/docs/001-Personal-Notes/005-Project-Pre-requisites/001-AWS.md#iam-users-and-access-keys).


## Configure Credentials on Jenkins 


On the Jenkins dashboard, go to:

```
Manage Jenkins > Credentials > global > Add credentials
```

Configure the following details. For the **Secret** field, enter the AWS Access key generated from the previous step. Click **Create.**

![](/img/docs/11032024-aws-jenkins-creds-access-key.png)

Add a second credentials with the following details. Enter the AWS Secret key associated with the AWS Access key. Click **Create.**

![](/img/docs/11032024-aws-jenkins-creds-secret-key.png)


## Pipeline Stages 

The pipeline steps:

1. Checkout code 
2. Install dependencies
3. Test code 
4. Build code (`sam build`)
4. Deploy code (`sam deploy`)

Note that the Jenkins server will need the AWS Credentials.


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