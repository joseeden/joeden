---
title: Deploy Serverless Application using Jenkins
tags: [Linux, AWS, Jenkins, Labs]
sidebar_position: 12
# last_update:
#   date: 11/2/2024
---


## Overview

AWS Serverless Application Model (SAM) is framework for developing and deploying serverless applications in AWS.

- All the configuration for SAM is stored in YAML code. 
- Deploy the services automatically (similar to CloudFormation).
- Help to run Lambda, API Gateway and DynamoDB locally.
- SAM can used CodeDeploy for quick deployments and pipelines.

For more information, please see [AWS SAM.](/docs/012-Amazon-Web-Services/003-AWS-Services/004-Serverless/025-AWS-SAM.md)


## Pre-requisites 

You will need to install the following in your local terminal:

- Install AWS CLI. [More details here.](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

    ```bash
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install 
    ```

- Verify AWS CLI installation.

    ```bash
    $ aws --version

    aws-cli/2.19.1 Python/3.12.6 Linux/5.15.153.1-microsoft-standard-WSL2 exe/x86_64.ubuntu.22  
    ```

- Download the [AWS SAM CLI file.](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)


- Unzip the AWS SAM file and install.

    ```bash
    unzip aws-sam-cli-linux-x86_64.zip -d sam-installation  
    sudo ./sam-installation/install
    ```

- Verify installation.

    ```bash
    $ sam --version
    ```

    Output:

    ```bash
    SAM CLI, version 1.127.0  
    ```

- Install Python.

    ```bash
    sudo apt install -y python3.12
    ```

- Install pip.

```bash
sudo apt install python3.12-venv
python3.12 -m ensurepip --upgrade

## Ensure Python 3.12 and its pip are in your PATH
which python3.12
which pip3.12
```


If you are using Ubuntu 22.04, you might only be able to install Python 3.10.
To install Python 3.12:

```bash
## This is required to run add-apt-repository
sudo apt install -y software-properties-common

## Add the deadsnakes PPA repository.
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update

## Install 
sudo apt install -y python3.12
```

Verify:

```bash
$ python3.12 --version
Python 3.12.7
```



## Authenticate your CLI 

Create a user in IAM and provide it the necessary permissions to run AWS SAM. For testing purposes, you can provide it administrator access for now but note that **limited permissions should always be provided to IAM users.**

```
IAM user >  Create user > Enter user name > Next > Next > Create User 
```

Select your user and go to Security credentials and then under Access keys, click **Create access key.** Select CLI for use case and chekc the confirmation statement at the bottom. Click **Next** and then Create **Access key.**

<div class='img-center'>

![](/img/docs/1102-aws-sam-auth-cli.png)

</div>

<div class='img-center'>

![](/img/docs/1102-aws-sam-auth-cli-create-access-key.png)

</div>

In the **Retrieve access keys**, click Show to see the secret access key. This is the only time the secreat access key will be shown. Make sure to note it down. Click **Done.**

![](/img/docs/1102-aws-sam-auth-cli-create-access-key-show-secret-access-key.png)

To configure your CLI, run:

```bash
aws configure  
```

Then enter the access key and secret access key. You can change the region to other AWS regions.

```bash
AWS Access Key ID [None]: AKIA4LE56APQMRZJEIEV
AWS Secret Access Key [None]: ****************************************
Default region name [None]: ap-southeast-1
Default output format [None]: 
```

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