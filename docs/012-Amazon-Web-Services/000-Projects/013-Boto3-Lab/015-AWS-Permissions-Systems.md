---
title: AWS Permissions Systems
description: "Ways to control who can access S3 resources"
tags: 
- Linux
- Amazon Web Services
- Labs
sidebar_position: 15
last_update:
  date: 7/29/2020
---


## Overview

AWS provides several ways to control who can access S3 resources

- IAM controls access across all AWS services
- Bucket Policies control access to buckets and everything inside them
- ACLs (Access Control Lists) manage access to specific files or objects
- Presigned URLs give temporary access to files

In small setups, where only one person manages everything, we don’t need complex permission systems.

- IAM and Bucket Policies are better for multi-user setups
- For single-user environments, ACLs and presigned URLs are simpler and faster

## ACLs

ACLs define who can access specific objects in your S3 bucket.

- Each object can have its own ACL
- The two common types are `private` and `public-read`
- By default, all uploaded files are private

### Changing ACLs on Existing Files

We can change a file’s access using the Boto3 `put_object_acl` method.

- Default ACL is private when uploaded
- Changing to `public-read` allows anyone to download it

```python
import boto3

s3 = boto3.client('s3')
s3.put_object_acl(Bucket='my-bucket', Key='data.csv', ACL='public-read')
```

**Expected result::** The file `data.csv` in `my-bucket` can now be accessed publicly.

### Setting ACLs During Upload

You can make an object public at the time of upload using the `ExtraArgs` parameter.

- Add `ACL: 'public-read'` to `ExtraArgs`
- Simplifies workflow by avoiding a second ACL call

```python
s3.upload_file(
    'local-data.csv',
    'my-bucket',
    'uploads/data.csv',
    ExtraArgs={'ACL': 'public-read'}
)
```

**Expected result::** The file uploads with a `public-read` ACL, ready for public download immediately.


### Accessing Public Objects

Once an object has a public-read ACL, anyone can view it using a simple URL format.

- Format: `https://<bucket-name>.s3.amazonaws.com/<object-key>`
- Example: `https://reports-bucket.s3.amazonaws.com/2024/traffic.csv`

You can now share this link, and anyone can open or download the file directly.

## Generating Public URLs in Python

We can easily create public URLs with Python’s `format()` method.

- Define a URL string with placeholders for bucket and key
- Use `format(bucket, key)` to fill in values dynamically

```python
bucket = 'reports-bucket'
key = '2024/traffic.csv'
url = "https://{}.s3.amazonaws.com/{}".format(bucket, key)
print(url)
```

**Expected result:**

```
https://reports-bucket.s3.amazonaws.com/2024/traffic.csv
```

## How AWS Decides Access

When a request is made for an S3 object, AWS checks permissions step by step.

- If it’s a presigned URL, access is granted temporarily
- If not, AWS checks IAM and bucket policies
- If nothing allows it, access is denied by default
