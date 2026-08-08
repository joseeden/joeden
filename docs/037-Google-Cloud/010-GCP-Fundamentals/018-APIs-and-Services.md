---
title: "APIs and Services"
description: "Enable and manage Google Cloud APIs"
tags: 
- Cloud
- Google
- Google Cloud
- Certifications
- DevOps
sidebar_position: 18
last_update:
  date: 9/21/2020
---

## Overview

Most Google Cloud services must be enabled before they can be used in a project.

The switch for a service is its API.

For example, before a project can create Compute Engine virtual machines, the Compute Engine API must be enabled.

This is true even when the user already has the correct IAM permissions.

## What an API Does

An API is the interface that allows Google Cloud, users, scripts, and applications to work with a service.

Think of a Google Cloud project as a secure building.

Inside the building are many workshops:

- Compute Engine for virtual machines
- BigQuery for analytics
- Cloud Storage for object storage
- Cloud Build for builds and tests

By default, many service doors are locked.

Enabling an API unlocks the door for that service inside the selected project.

## API and IAM

API enablement and IAM are related, but they are not the same thing.

| Requirement        | Purpose                                  | Example                                                     |
| ------------------ | ---------------------------------------- | ----------------------------------------------------------- |
| **Enabled API**    | Makes the service available in a project | The Compute Engine API is enabled for the project.          |
| **IAM permission** | Allows a principal to use the service    | A user has permission to create Compute Engine VM instances. |

Both must be in place.

If the API is disabled, resource creation can fail even when the user has the right IAM role.

If the API is enabled but the user lacks IAM permissions, the service is available but the user cannot perform the action.

## API Library

The API library is the central catalog for Google Cloud APIs.

Use it to discover and enable APIs for a project.

APIs are grouped by categories such as:

- Analytics
- Big data
- Compute
- Databases
- DevOps
- Machine learning
- Networking
- Security

The API library is project-scoped.

Make sure the correct project is selected before enabling a service API.

## Enable an API

Use these steps to enable an API in the console:

1. Select the correct project.

   Check the project name at the top of the console.

2. Open **APIs and Services**.

3. Select **Library**.

   This opens the API catalog for the selected project.

4. Search for the API.

   For example, search for `Cloud Build`.

5. Open the API details page.

   Review the service name and description before enabling it.

6. Click **Enable**.

   Google Cloud may take a short time to activate the API in the background.

7. Confirm the API is active.

   After the API is enabled, the page usually changes from **Enable** to **Manage**.

## Example: Cloud Build API

Cloud Build is used to build, test, and package code.

Before a project can use Cloud Build, the Cloud Build API must be enabled.

The flow is:

1. Go to **APIs and Services**.
2. Open **Library**.
3. Search for `Cloud Build`.
4. Open **Cloud Build API**.
5. Click **Enable**.
6. Wait for the API to finish enabling.
7. Use **Manage** to view usage, metrics, quotas, or disable options.

After this, Cloud Build is active for the selected project.

## Enabled APIs

Use **Enabled APIs and services** to see which APIs are already active in a project.

This view is useful for:

- Confirming that a required API is enabled
- Reviewing API usage
- Checking service metrics
- Checking quota
- Disabling unused APIs

A new project does not always start with zero APIs enabled.

Google Cloud may pre-enable core management APIs that are required for basic project operations.

Examples include APIs for IAM, Service Usage, and Resource Manager.

Most workload APIs, such as Compute Engine, BigQuery, and Cloud Build, usually need to be enabled before use.

## Troubleshooting

Missing APIs are a common cause of errors in scripts, applications, and labs.

When a command fails while creating or managing a resource, check:

1. The correct project is selected.
2. The required service API is enabled.
3. The user or service account has the required IAM permissions.
4. Billing is attached when the service requires billing.
5. Quota is available for the requested resource.

:::tip

When troubleshooting a new service, check API enablement before assuming the problem is IAM, networking, or application code.

:::

## Exam Notes

Remember these points for Google Cloud certification questions:

- Every Google Cloud service is controlled by an API.
- APIs are enabled per project.
- The API library is used to find and enable service APIs.
- Enabled APIs and services shows active APIs for the selected project.
- Some core management APIs may already be enabled in a new project.
- Most service APIs must be enabled before resources can be created.
- IAM decides who can use a service, and API enablement decides whether the service is available in the project.

## References

- [Enabling and disabling services](https://docs.cloud.google.com/service-usage/docs/enable-disable)
- [Getting started with Google Cloud APIs](https://docs.cloud.google.com/apis/docs/getting-started)
- [Cloud Build API](https://docs.cloud.google.com/build/docs/api)
