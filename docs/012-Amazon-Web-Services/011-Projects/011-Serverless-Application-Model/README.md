---
title: Serverless Application Model
tags: [Linux, AWS, Labs]
sidebar_position: 2
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

The detailed steps can be found here: [Getting started with AWS SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)

- Download the [AWS SAM Cli file.](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started.html)

- Unzip the file and install.

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

## Create the Base Configuration File

We can create our own base configuration file, but we can also let AWS SAM initialize a base config file.

```bash
sam init 
```

It will return the following response. Enter 1 to select quickstart templates for testing and then choose the Hello World example. You can choose the runtime as well as enable tX-Ray tracing and CloudWatch Insights. For lab purposes, we just need the structured logging

![](/gif/docs/sample-aws-sam.gif)

It will create a directory that contains the configuration files.

```bash
$ ls -la
total 24
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:48 .
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:48 ..
-rwxrwxrwx 1 joseeden joseeden 3730 Nov  2 16:48 .gitignore
-rwxrwxrwx 1 joseeden joseeden 8329 Nov  2 16:48 README.md
-rwxrwxrwx 1 joseeden joseeden    0 Nov  2 16:48 __init__.py
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:48 events
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:48 hello_world
-rwxrwxrwx 1 joseeden joseeden  669 Nov  2 16:48 samconfig.toml
-rwxrwxrwx 1 joseeden joseeden 1965 Nov  2 16:48 template.yaml
drwxrwxrwx 1 joseeden joseeden  512 Nov  2 16:48 tests
```

The Lambda function code can be found in `hello_world/app.py`: 

```bash
import json

# import requests


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """

    # try:
    #     ip = requests.get("http://checkip.amazonaws.com/")
    # except requests.RequestException as e:
    #     # Send some context about this error to Lambda Logs
    #     print(e)

    #     raise e

    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "hello world",
            # "location": ip.text.replace("\n", "")
        }),
    }
 
```

## Authenticate your CLI 

Create a user in IAM and provide it the necessary permissions to run AWS SAM. For testing purposes, you can provide it administrator access for now but note that **limited permissions should always be provided to IAM users.**





## Build and Package the Application 

After initializing the project, the next step is to build and package the application. Go to the project directory and run:

```bash
sam build
sam deploy 
```