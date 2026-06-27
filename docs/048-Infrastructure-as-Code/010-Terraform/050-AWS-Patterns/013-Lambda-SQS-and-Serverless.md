---
title: "Lambda, SQS, and Serverless"
description: "AWS Lambda and SQS patterns with Terraform"
tags: 
- DevOps
- Infrastructure as Code
- Terraform
sidebar_position: 13
last_update:
  date: 1/24/2021
---

## Overview

The serverless lab connects an SQS queue to a Python Lambda function. Failed messages are sent to a dead letter queue after the configured retry behavior.

## Main Resources

| Resource                         | Purpose                                      |
| -------------------------------- | -------------------------------------------- |
| `archive_file`                   | Packages `main.py` into `main.zip`.          |
| `aws_lambda_function`            | Deploys the Python Lambda function.          |
| `aws_iam_role`                   | Lets Lambda assume an execution role.        |
| `aws_sqs_queue`                  | Creates the main queue and dead letter queue. |
| `aws_lambda_event_source_mapping` | Connects the queue to Lambda.                |
| `aws_cloudwatch_log_group`       | Stores Lambda logs.                          |

## Lambda Handler

For a Python file named `main.py` with a function named `lambda_handler`, the handler must be:

```hcl
handler = "main.lambda_handler"
```

## Queue Permissions

The Lambda role needs permissions to read from the queue.

```hcl
actions = [
  "sqs:ReceiveMessage",
  "sqs:DeleteMessage",
  "sqs:GetQueueAttributes",
]
```

**Note**: Queue permissions belong on the Lambda execution role, and the event source mapping connects the trigger.
