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

Serverless patterns are useful when the application can be modeled as events, queues, functions, and managed services instead of long-running servers.

Terraform commonly manages the infrastructure boundary: queues, functions, IAM roles, log groups, event mappings, alarms, and environment-specific configuration.

## Queue-Based Processing

A common production pattern connects SQS to Lambda:

- Producers send work items to an SQS queue.
- Lambda polls the queue through an event source mapping.
- Successful messages are deleted from the queue.
- Failed messages are retried according to queue and mapping behavior.
- Messages that repeatedly fail move to a dead-letter queue.

This pattern decouples producers from consumers. It also gives the system a buffer during traffic spikes or downstream failures.

## Main Resources

| Resource                          | Purpose                                                         |
| --------------------------------- | --------------------------------------------------------------- |
| `aws_sqs_queue`                   | Creates the main queue and dead-letter queue.                   |
| `aws_lambda_function`             | Runs the message processing code.                               |
| `aws_lambda_event_source_mapping` | Connects SQS polling to Lambda.                                 |
| `aws_iam_role`                    | Lets Lambda assume an execution role.                           |
| `aws_iam_role_policy`             | Grants the function access to the queue and other dependencies. |
| `aws_cloudwatch_log_group`        | Stores function logs with controlled retention.                 |
| `aws_cloudwatch_metric_alarm`     | Alerts on failures, age, errors, or throttling.                 |

## Lambda Handler

For a Python file named `main.py` with a function named `lambda_handler`, the handler must be:

```hcl
handler = "main.lambda_handler"
```

In larger projects, the function package is usually produced by a CI/CD pipeline. 

Terraform can reference that artifact from S3, ECR, or a local build output, but packaging application code should stay separate from the infrastructure design where possible.

## IAM Permissions

The Lambda role needs permissions to read from the queue.

```hcl
actions = [
  "sqs:ReceiveMessage",
  "sqs:DeleteMessage",
  "sqs:GetQueueAttributes",
]
```

Add only the actions the function actually needs. 

For example, a worker that reads from SQS and writes to DynamoDB should not receive broad access to every queue, table, or AWS service in the account.

## Reliability Settings

Important settings include:

- `visibility_timeout_seconds` on the queue.
- Lambda `timeout`.
- Lambda reserved concurrency when the worker must not overwhelm a downstream service.
- Event source mapping `batch_size`.
- Event source mapping `maximum_batching_window_in_seconds`.
- Dead-letter queue redrive policy.
- CloudWatch alarms for failed invocations and old messages.

Set the SQS visibility timeout longer than the Lambda timeout. 

This gives the function time to finish before the same message becomes visible again.

## Configuration and Secrets

Use environment variables for non-sensitive runtime configuration such as log level, table names, or feature flags.

Use AWS Secrets Manager, SSM Parameter Store, or another approved secrets system for sensitive values. 

Avoid putting secrets directly in Terraform variables, state, Lambda environment variables, or plain text files.

## When to Use This Pattern

This pattern fits:

- Background jobs.
- Event ingestion.
- File or image processing.
- Order, notification, or workflow processing.
- Integration tasks where retries and buffering matter.

It is a weaker fit for long-running tasks, workloads requiring very low latency, or processes that need persistent local state.
