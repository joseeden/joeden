---
title: "AWS CodePipeline"
description: "Fully managed continuous delivery"
tags: [Cloud, AWS, DevOps, Automation, CICD, Certifications]
sidebar_position: 8
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

AWS CodePipeline is a fully managed continuous delivery service that helps you automate your release pipelines for fast and reliable application and infrastructure updates.

- Continuous delivery
- Visual workflow
- Source: GitHub, CodeCommit, Amazon S3
- Build: CodeBuild, Jenkins, etc...
- Load Testing: 3rd par ty tools
- Deploy: AWS CodeDeploy, Beanstalk, CloudFormation, ECS...
- Made of stages:
    - Each stage can have sequential actions and / or parallel actions.
    - Stages examples: Build, Test, Deploy, Load Test, etc...
    - Manual approval can be defined at any stage.

## CodePipeline Artifacts

Each pipeline stage can create **Artifacts**. Amazon S3 buckets that CodePipeline uses to store artifacts used by pipelines. When you first use the CodePipeline console in a region to create a pipeline, CodePipeline automatically generates this S3 bucket in the AWS region.

![](/img/docs/aws-codepipelineartifacts.png)


## CodePipeline Troubleshooting

- CodePipeline state changes happen in **AWS CloudWatch Events**, which can in return create SNS notifications.
- Example: We can create events for failed pipelines • Ex: you can create events for cancelled stages.
- If CodePipeline fails a stage, your pipeline stops and you can get information in the console.
- AWS CloudTrail can be used to audit AWS API calls.
- If Pipeline can't perform an action, make sure the “IAM Service Role” attached does have enough permissions (IAM Policy).
