---
title: "AWS CodeBuild"
description: "Fully managed continuous integration"
tags: 
- Cloud
- Amazon Web Services
- DevOps
- Automation
- CICD
- Certifications
sidebar_position: 6
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::




## Overview

AWS CodeBuild is a fully managed continuous integration service that compiles source code, runs tests, and produces ready-to-deploy software packages.

- Alternative to other build tools such as Jenkins.
- Continuous scaling (no servers to manage or provision – no build queue).
- Pay for usage: the time it takes to complete the builds.
- Leverages Docker under the hood for reproducible builds.
- Possibility to extend capabilities leveraging our own base Docker images.
- Secure: Integration with KMS for encryption of build artifacts, IAM for build permissions, and VPC for network security, CloudTrail for API calls logging.

Features:

- Source Code from GitHub / CodeCommit / CodePipeline / S3...
- Build instructions can be defined in code, define in a `buildspec.yml` file.
- Output logs to Amazon S3 & AWS CloudWatch Logs.
- Metrics to monitor CodeBuild statistics.
- Use CloudWatch Events to detect failed builds and trigger notifications. 
- Use CloudWatch Alarms to notify if you need “thresholds” for failures.
- CloudWatch Events / AWS Lambda as a Glue.
- SNS notifications
- Ability to reproduce CodeBuild locally to troubleshoot in case of errors.
- Pipelines can be defined within CodePipeline or CodeBuild itself.

## CodeBuild Supported Environments

- Java
- Ruby
- Python
- Go
- Node.js
- Android
- .NET Core
- PHP
- Docker: extend any environment we like

## How does CodeBuild work?

![](/img/docs/aws-codebuildworkshow.png)

How it works:

- Two ways to run CodeBuild:
    - Source Code
        - buildspec.yml
    - By building a Docker image
        - AWS Managed or Custom
- A CodeBuild Container is created.
- We can add an optional S3 Cache bucket
- Cache while We do multiple builds:
    - dependencies
    - artifacts
- Output to an S3 bucket.
- Save logs using CloudWatch or S3.

## CodeBuild BuildSpec

- `buildspec.yml` file must be at the root of your code.
- Define environment variables:
    - Plaintext variables
    - Secure secrets: use SSM Parameter store

Phases (specify commands to run):

- **Install:** install dependencies we may need for your build.
- **Pre build:** final commands to execute before build.
- **Build:** actual build commands.
- **Post build:** finishing touches (zip output for example).

Post-build:

- **Artifacts:** What to upload to S3 (encrypted with KMS)
- **Cache:** Files to cache (usually dependencies) to S3 for future build speedup


## CodeBuild Local Build

- In case of need of deep troubleshooting beyond logs...
- You can run CodeBuild locally on your desktop (after installing Docker) - For this, leverage the CodeBuild Agent.
- Reference: https://docs.aws.amazon.com/codebuild/latest/userguide/use-codebuild-agent.html

