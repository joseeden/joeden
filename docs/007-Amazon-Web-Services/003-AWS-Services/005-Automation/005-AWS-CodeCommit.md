---
title: "AWS CodeCommit"
description: "Private Git repositories in AWS"
tags: [Cloud, AWS, DevOps, Automation, Git, Certifications]
sidebar_position: 1
last_update:
  date: 8/30/2020
---


:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

AWS CodeCommit is a secure, highly scalable, fully managed source control service that hosts private Git repositories.

- Private git repositories
- No size limits on the repositories (scale seamlessly)
- Fully managed and highly available
- The code is only in your AWS cloud account
- Increased security and compliance
- Secure (encrypted access control, etc)

**Version Control**

This is the ability to understand changes that happened to the code over time (and possibly roll back).

- This is enabled by using a version control system such as Git.
- A git repository can live on your machine or on a central online repository.
- Benefits:
    - Collaborate with a team of developers
    - Make sure the code is backed-up somewhere
    - Makes sure it's fully viewable and auditable

## Github vs. CodeCommit

- **Similarities**

    - Github and CodeCommit can be integrated with AWS CodeBuild.
    - Both support HTTPS and SSH authentication.

- **Differences**

    - Security
        - Github: Github Users
        - CodeCommit: AWS IAM users & roles
    - Hosted
        - Github: hosted by Github
        - CodeCommit: managed & hosted by AWS
    - UI
        - Github UI is fully featured
        - CodeCommit is minimal

## AWS CodeCommit Security

- **Authentication with Git**
    - SSH Keys: AWS Users can configure SSH keys in their IAM Console.
    - HTTPS: Done through AWS CLI Authentication helper or generate HTTPS credentials.
    - MFA: Multi Factor Authentication

- **Authorization with Git**
    - IAM Policies manage user / roles rights to the repositories.

- **Encryption**
    - Repositories are automatically encrypted at rest using KMS.
    - Encrypted in transit (can only user HTTPS or SSH  both secure).

- **Cross Account access**
    - Do not share your SSH keys.
    - Do not share your AWS credentials.
    - Use IAM Role in your AWS account and use AWS STS (with AssumeRole API). 

## AWS CodeCommit Notifications

You can trigger notifications in CodeCommit using AWS SNS(Simple Notification Service) or AWS Lambda or AWS CloudWatch Event Rules.

- **Use cases for notifications SNS / AWS Lambda notifications**
    - Deletion of branches.
    - Trigger for pushes that happens in master branch.
    - Notify external Build System.
    - Trigger AWS Lambda function to perform codebase analysis (maybe credentials got committed in the code?).

- **Use cases for CloudWatch Event Rules**
    - Trigger for pull request updates (created/updated/deleted/commented).
    - Commit comment events.
    - CloudWatch Event Rules goes into an SNS topic.
