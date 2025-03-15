---
title: "AWS CLI and SDK"
description: "Using CLI and SDK"
tags: [Cloud, AWS, DevOps, Automation, Certifications]
sidebar_position: 1
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## AWS CLI (Command Line Interface)

Add user credentials locally using this command:

```bash
aws configure  
```

If you are using multiple AWS accounts, you can add custom profiles with seperate credentials using this command:

```bash
aws configure --profile {my-other-aws-account}  
```

If you you'd like to execute commands on a specific profile, example: 

```bash
aws s3 ls --profile {my-other-aws-account}
```
``

If you don't specify the aws profile, the commands will be executed to your **default** profile

### AWS CLI on EC2

- IAM roles can be attached to EC2 instances
- IAM roles can come with a policy authorizing exactly what the EC2 instance should be able to do. This is the best practice.
- EC2 Instances can then use these profiles automatically without any additional configurations

### CLI STS Decode Errors

- When you run API calls and they fail, you can get a long, encoded error message code.
- This error can be decoded using STS.
- Run the command: 

    ```bash
    aws sts decode-authorization-message --encoded-message {encoded_message_code}  
    ```
- Your IAM user must have the correct permissions to use this command by adding the `STS` service to your policy.




## SDK (Software Development Kit)

If you want to perform actions on AWS directly from your application's code without using a CLI, you can use an SDK.

Official SDKs:
- Java
- .NET
- Node.js
- PHP
- Python
- Ruby
- C++



### Key points 

- AWS SDK are required when coding against AWS Services such as DynamoDB.
- Fact: AWS CLI uses the Python SDK (boto3).
- The exam expects you to know when you should use an SDK.
- If you don’t specify or configure a default region, then us-east-1 will be chosen by default.

### SDK Credentials Security

- It’s recommend to use the default credential provider chain.
- The default credential provider chain works seamlessly with:
  - AWS credentials at ~/.aws/credentials (only on our computers or on premise).
  - Instance Profile Credentials using IAM Roles (for EC2 machines, etc.).
- Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY).
- Overall, NEVER EVER STORE AWS CREDENTIALS IN YOUR CODE.
- Use IAM Roles if working from within AWS Services to inherit credentials.

### Exponential Backoff

- Any API that fails because of too many calls needs to be retried with Exponential Backoff.
- These apply to rate limited API.
- Retry mechanism is included in SDK API calls.

    ![](/img/docs/aws-sdk-exponentialbackoff.png)



  

