---
title: Deploy Serverless Application using Jenkins
tags: 
- Linux
- Amazon Web Services
- Jenkins
- Labs
sidebar_position: 12
last_update:
  date: 2/11/2024
---


## Overview

Using Jenkins to deploy a serverless application simplifies automation and enables continuous integration and delivery (CI/CD) for efficient deployment.

- Trigger deployments on code changes
- Use AWS SAM CLI or AWS CLI for build and deploy steps
- Set environment variables for AWS access
- Add testing and validation before deployment

To deploy an AWS Serverless Application Model (SAM) application manually first, you can check out the previous lab on [AWS SAM.](/docs/035-Amazon-Web-Services/000-Projects/011-Simple-AWS-SAM-Application/README.md)



## Pre-requisites 

Accounts needed:

- [AWS Account](https://aws.amazon.com/resources/create-account/)

On your local computer and on the Jenkins server, install:

- [AWS CLI](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#aws-cli)
- [AWS SAM CLI](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#aws-sam-cli)
- [Python 3.10](/docs/001-Personal-Notes/050-Project-Pre-requisites/005-Software.md#python-310)
- [Pip](/docs/001-Personal-Notes/050-Project-Pre-requisites/005-Software.md#pip-312)
- [Python Virtual Environment](/docs/001-Personal-Notes/050-Project-Pre-requisites/005-Software.md#python-virtual-environment)

If you are using Ubuntu 22.04, you might only be able to install Python 3.10.

- [Python 3.12](/docs/001-Personal-Notes/050-Project-Pre-requisites/005-Software.md#python-312)

:::info[Note]

The SAM `template.yaml` is using Python 3.12 as runtime. If you want to use a different Python version in your Jenkins server, you need to change the runtime.

:::


If you're using EC2 instance for the Jenkins server, make sure the security group:

- Allows SSH from within the subnet
- Allows SSH from your IP 
- Allows 5000 from your IP 
- Allows 8080 from `0.0.0.0/0`

You may encounter some network connectivity issues when connecting to the Linux machines and when attempting to trigger the webhook. 

- SSH connections (from local to Linux machines) - uses port 22
- Access Jenkins UI (from local to Jenkins) - uses port 8080 
- Access application UI (from local to Prod) - uses port 5000 
- Trigger webhook (from Github to Jenkins) - uses port 8080  

If specifying your IP doesn't work, you can use a wider range like `0.0.0.0`.


## Fork the Repository 

The sample project can be found here: 

```bash
https://github.com/joseeden/test-aws-sam-hello-app 
```

:::info[Use git credentials when cloning]

In August 2021, Github removed support for using your account password from the cli.
You can either use [Personal Access Tokens (PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) or [SSH keys.](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

:::

After you sign in to Github, fork the repo and confirm the details. Clone it to your local computer. 

## Configure Web Hook 

On your Github repository, go to **Settings** > **Webhooks** > **Add webhook**. Specify the payload URL as:

```bash
http://<jenkins-ip>:8080/github-webhook/ 
```

Specify the details and click **Update webhook**.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-config-webhook-on-github-repo.png)

</div>

Once you configure the pipeline in the succeeding steps, you can check the **Recent Deliveries**.


## Generate Access Keys

To use the Jenkins server, first create an IAM user in the AWS Console and generate access keys for that user. Attach the `AdministratorAccess` policy to this user temporarily to ensure they have the necessary permissions to run. Once you generate the key, you should have the following:

- AWS Access Key 
- AWS Secret Key

For more information, see [IAM Users and Access Keys](/docs/001-Personal-Notes/050-Project-Pre-requisites/001-AWS.md#access-keys).


## Configure Credentials on Jenkins 

On the Jenkins dashboard, go to:

```
Manage Jenkins > Credentials > global > Add credentials
```

Configure the following details. For the **Secret** field, enter the AWS Access key generated from the previous step. Click **Create.**


<div class='img-center'>

![](/img/docs/11032024-aws-jenkins-creds-access-key.png)

</div>

Add a second credentials with the following details. Enter the AWS Secret key associated with the AWS Access key. Click **Create.**


<div class='img-center'>

![](/img/docs/11032024-aws-jenkins-creds-secret-key.png)

</div>


## Pipeline Stages 

The pipeline steps:

1. Checkout code 
2. Install dependencies
3. Test code 
4. Build code (`sam build`)
4. Deploy code (`sam deploy`)

Note that the Jenkins server will need the AWS Credentials.



## Setup the Pipeline

Back on the Jenkins dashboard, click New Item and enter "aws-sam-pipeline" for the Item name. Select **Pipeline** and click **OK**.


<div class='img-center'>

![](/img/docs/11032024-aws-jenkins-create-pipelineee.png)

</div>

Check the box for the following and then click Save.

```
Build Triggers > Github hook trigger for GITScm polling
```

<div class='img-center'>

![](/img/docs/1101-jenkins-single-server-deployment-github-hook-trigger-gitscm-polling.png)

</div>

Next, configure the pipeline section. Note the branch name. The common name is **main** but your branch could be using **master**. You can also specify a different branch name here.

Click **Create** afterwards.

```
Pipeline > Pipeline script from SCM > SCM > Git > Repository URL > Enter URL
Set the branch to main
Set the ScriptPath > Jenkinsfile
```

<div class='img-center'>

![](/img/docs/11032024-aws-jenkins-conofigure-pipeline-master.png)

</div>



## Create the Jenkinsfile 

Create the Jenkinsfile inside the project directory. 

See file here: [Jenkinsfile](https://github.com/joseeden/test-aws-sam-hello-app/blob/master/Jenkinsfile)


## Commit and Push 

Back in your local machine, commit and push the changes you did.

```bash
git add .
git commit -m "Added Jenkinsfile. Testing webhook" 
git push 
```

Go to the your job in the Jenkins dashboard. You should now see a job getting triggered. If successful, you should see a green check mark. 

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-triggeringgg.png)

</div>

To see the logs, click the build and go to Console Output:

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-builkd-running.png)

</div>

Scroll down to the bottom of the console output. If the deployment was successful, you should see:

```bash
CloudFormation outputs from deployed stack
-------------------------------------------------------------------------------------------------
Outputs                                                                                         
-------------------------------------------------------------------------------------------------
Key                 HelloWorldFunctionIamRole                                                   
Description         Implicit IAM Role created for Hello World function                          
Value               arn:aws:iam::841234567890:role/lambda-app-                                  
HelloWorldFunctionRole-t5rDcBkC9uNs                                                             

Key                 HelloWorldApi                                                               
Description         API Gateway endpoint URL for Prod stage for Hello World function            
Value               https://m9q48nk801.execute-api.us-east-1.amazonaws.com/Prod/hello/          

Key                 HelloWorldFunction                                                          
Description         Hello World Lambda Function ARN                                             
Value               arn:aws:lambda:us-east-1:841234567890:function:lambda-app-                  
HelloWorldFunction-S19DzuZbdDov                                                                 
-------------------------------------------------------------------------------------------------


Successfully created/updated stack - lambda-app in us-east-1 
```

Copy the HTTPs URL, open a web browser, and paste the URL.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-working-appp.png)

</div>


## Test the App 

Go back to the project directory and open `hello_world/app.py`. Change "hello world v2" to "Happy weekend!"

```python title="app.py"
import json

# import requests


def lambda_handler(event, context):


    return {
        "statusCode": 200,
        "body": json.dumps({
            "message": "Happy weekend!",
            # "location": ip.text.replace("\n", "")
        }),
    }
 
```

Commit and push.

```bash
git add .
git commit -m "Changed banner" 
git push 
```

Back in the Jenkins dashboard, a new build is triggered. 

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-build-triggered-new-commit.png)

</div>

Click the build and see the console output.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-build-new-console-output.png)

</div>

Open the web browser and refresh. The new banner message should appear.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-build-new-banner-message.png)

</div>


## Cleanup 

The AWS SAM will use CloudFormation to provision the resources. On the AWS Console, go to CloudFormation and click **Stacks.** Two resources should be created.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-cf-resources-created.png)

</div>

We need to delete both resources after testing. Select the Lambda resource first and then click **Delete**. After it's deleted, do the same to the AWS SAM resource.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-deleting-aws-sam-lambda.png)

</div>

For the AWS SAM resource, you may need to select the force delete option.

<div class='img-center'>

![](/img/docs/1103-aws-jenkins-aws-sam-force-delete.png)

</div>
