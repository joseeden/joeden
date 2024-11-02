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

We can create our own base configuration file, but we can also let AWS SAM initialize a base config file.

```bash
sam init 
```

It will return the following response. Enter 1 to select quickstart templates for testing and then choose the Hello World example. You can choose the runtime as well as enable tX-Ray tracing and CloudWatch Insights. For lab purposes, we just need the structured logging.


<div class='img-center'>

![](/gif/docs/sample-aws-sam.gif)

</div>



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


## Build and Package the Application 

After initializing the project, the next step is to build and package the application. Go to the project directory and run:

```bash
cd sam-app
sam build
sam deploy 
```


<div class='img-center'>

![](/gif/docs/sample-aws-sam-build-deploy.gif)

</div>


After it's done, it will print the outputs, including the application URL.

```bash
CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------------------   
Outputs                                                                                                         
-------------------------------------------------------------------------------------------------------------   
Key                 HelloWorldFunctionIamRole                                                                   
Description         Implicit IAM Role created for Hello World function                                          
Value               arn:aws:iam::848587260896:role/sam-app-HelloWorldFunctionRole-ojmSC0FUjVZg                  

Key                 HelloWorldApi                                                                               
Description         API Gateway endpoint URL for Prod stage for Hello World function                            
Value               https://6doirma1pc.execute-api.ap-southeast-1.amazonaws.com/Prod/hello/                     

Key                 HelloWorldFunction                                                                          
Description         Hello World Lambda Function ARN                                                             
Value               arn:aws:lambda:ap-southeast-1:848587260896:function:sam-app-HelloWorldFunction-             
Nob9YL9Sg1YW                                                                                                    
-------------------------------------------------------------------------------------------------------------
```

Open a web browser and enter the URL:

```bash
https://6doirma1pc.execute-api.ap-southeast-1.amazonaws.com/Prod/hello/                     
```

![](/img/docs/1102-aws-sam-deployed-appsss.png)

In the AWS dashboard, we should also see the created Lambda function.

![](/img/docs/1102-aws-sam-deployed-appsss-seen-from-landa-dashboard.png)

![](/img/docs/1102-aws-sam-deployed-appsss-seen-open-details.png)

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