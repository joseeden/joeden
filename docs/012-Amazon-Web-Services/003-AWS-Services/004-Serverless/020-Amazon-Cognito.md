---
title: "Amazon Cognito"
description: "Fully managed and scalable IAM"
tags: [Cloud, AWS, DevOps, Serverless, Certifications]
sidebar_position: 20
last_update:
  date: 8/30/2020
---



:::info[NOTES]

This is not an exhaustive documentation of all the existing AWS Services. These are summarized notes that I used for the AWS Certifications.

To see the complete documentation, please go to: [AWS documentation](https://docs.aws.amazon.com/)

:::



## Overview

Cognito is used for giving users an identity to be able to communicate with a system.

- **Cognito User Pools**

    - Sign in functionality for the app users.
    - Integrates with API Gateway.

- **Cognito Identity Pool (Federated Identity)**

    - Provides AWS credentials to users which want to access AWS resources directly.
    - Integrates with Cognito User Pools as an identity provider.

- **Cognito Sync**

    - Used for synchronize data from a device to Cognito.
    - Deprecated, replaced by AppSync.

## AWS Cognito User Pools

- Serverless database for users of an application.
- Simple login provider: username (or email) / password combination.
- Possibility to verify emails/phone numbers and add MFA.
- Can enable Federated Identities (Facebook, Google, SAML, etc.). 
- **This is not the same CIP (AWS Federated Identity)!**
- Sends back a JSON Web Token (JWT).
- Can be integrated with API Gateway for authentication.

    ![](/img/docs/aws-cognito-userpools.png)



## AWS Cognito Federated Identity Pools

- Provide direct access to AWS resources from the client side.
- Log in to a federated identity provider - or remain anonymous.
- Get temporary AWS credentials from the Federated Identity Pool.
- These credentials come with pre-defined IAM policies stating their permissions.
- Examples:
    - Provide temporary access to write to a S3 bucket using Facebook login.

    ![](/img/docs/aws-cognito-identitypool.png)
    

## AWS Cognito Sync (Deprecated)

- Deprecated - use AWS AppSync.
- Can be used for cross device synchronization from any platform: iOS, Android, etc.
- It provides some offline capabilities, synchronization will happen when the device will come online.
- **Requires Federated Identity Pool in Cognito (not User Pool!)**.
- Data is stored in datasets, each dataset can have up to 1MB of data. We can have up to 20 datasets to synchronize.


 
