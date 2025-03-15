---
title: "CICD in AWS"
description: "Set up CI/CD pipelines in AWS"
tags: [Cloud, AWS, DevOps, Automation, CICD, Certifications]
sidebar_position: 4
last_update:
  date: 7/26/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

- **Continuous Integration**

    - Developers push code to a repository (CodeCommit).
    - A testing/build server checks the code as soon as it is pushed (CodeBuild).
    - Developers get feedback about the build status and tests.
    - CI helps:
        - Find bugs early and fix them
        - Deliver faster as the code is tested
        - Deploy often

- **Continuous Delivery**

    - Ensure that software can be released reliably whenever needed.
    - Ensures deployment happens ofter and quickly.
    - We can shift away from "one release every 3 months" mindset to "5 releases a day" (lol).
    - This happens with automated deployments (CodeDeploy).

## Why use CICD?

- Ideally, we would want to set up a CICD to help you automate multiple steps to automate builds, push code to a repository and then deploy to your updated code to AWS.
- This is a faster, efficient way that also helps minimize potential mistakes as opposed to running multiple manual steps.
- Automate deployement to different stages (dev, staging, and production).
- May add manual approvals when needed.
- To be a proper AWS developer, you'd need to learn CICD.

## AWS Services for CICD 

- **AWS CodeCommit:** storing our code (similar to Github)
- **AWS CodePipeline:** automating our pipeline from code to ElasticBeanstalk
- **AWS CodeBuild:** To build and test code
- **AWS CodeDeploy:** deploying code to EC2 fleets (not Beanstalk)

    ![](/img/docs/aws-tech-stack-for-cicd.png)

